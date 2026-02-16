# Unity Gaming Services (UGS) — Architecture Research

Last updated: 2026-02-16
Sources: docs.unity.com/ugs, services.docs.unity.com, discussions.unity.com, github.com/Unity-Technologies, unity.com

## 1. Server Authority Model

**Two separate systems: Cloud Code for LiveOps/economy authority; Netcode for real-time gameplay authority. They are not connected.**

### Cloud Code (LiveOps Authority)

- Cloud Code is a serverless compute service — stateless functions running on Unity-managed infrastructure ([docs](https://docs.unity.com/en-us/cloud-code))
- Server authority achieved by blocking client-side writes to services (Cloud Save, Economy, Leaderboards) via the Access Control service, then routing all mutations through Cloud Code ([docs](https://docs.unity.com/ugs/en-us/manual/cloud-code/manual/server-access-control))
- Cloud Code generates a **Service Token** (JWT) for cross-player data access — e.g., writing to Cloud Save on behalf of another player ([docs](https://docs.unity.com/ugs/en-us/manual/cloud-code/manual/modules/how-to-guides/authentication))
- **Private Player Data** (coming soon as of May 2025 roadmap): Cloud Save data accessible only from Cloud Code, not requestable by clients — designed explicitly for server-authoritative game logic ([discussion](https://discussions.unity.com/t/unity-liveops-roadmap-update-may-2025-highlights/1642009))
- No automatic checksum verification, no deterministic re-execution — developer writes all validation logic manually
- Scales automatically; fully managed by Unity

### Netcode (Real-Time Authority)

- **Netcode for Entities** (DOTS): server-authoritative with client prediction framework. Server is the authoritative source; if client prediction disagrees, server wins. Uses "ghosts" (networked entities), snapshots, and RPCs. Client and server run in separate ECS Worlds ([docs](https://docs.unity3d.com/Packages/com.unity.netcode@1.0/manual/index.html))
- **Netcode for GameObjects**: supports both client-authoritative and server-authoritative models for MonoBehaviour workflows ([docs](https://unity.com/features/netcode))
- Both use Unity Transport Package (UTP) for the low-level network layer
- Netcode runs in a dedicated game server process (your binary) — no coupling to Cloud Code's serverless functions
- The **Multiplayer Services SDK** unifies Lobby, Matchmaker, Relay, and optionally Cloud Code under a Sessions API, but Cloud Code here handles session orchestration, not gameplay authority ([docs](https://docs.unity.com/en-us/mps-sdk))

### Relationship Between the Two

Cloud Code and Netcode solve different problems and do not share a runtime. Cloud Code handles request/response LiveOps logic (economy transactions, reward grants, leaderboard writes). Netcode handles tick-based real-time state synchronization. A game using both would have Cloud Code for backend economy validation and Netcode for Entities for physics/combat authority — connected only by the fact that both authenticate through Unity Authentication.

## 2. Platform Integration

**Suite of independent cloud services with a shared authentication layer and manual cross-service wiring.**

### Service Inventory

| Category | Services |
|---|---|
| Identity | Authentication (anonymous, platform SSO, custom ID) |
| LiveOps Backend | Cloud Code, Cloud Save, Economy, Remote Config, Leaderboards |
| Multiplayer | Lobby, Relay, Matchmaker, Vivox (voice/text), Multiplay Hosting (EOL March 2026) |
| Analytics | Unity Analytics, Custom Dashboards |
| Content | Cloud Content Delivery (CCD) |
| Experiments | Game Overrides (A/B testing) |

### How They Connect

- **Authentication** is the glue — all services require Auth tokens. A player gets a single PlayerId valid across all services within a project ([docs](https://docs.unity.com/en-us/authentication/use-cases))
- Services do NOT share a data store or transactional boundary. Economy does not automatically read Remote Config; Cloud Save does not trigger Cloud Code. Integration is manual via API calls.
- Cloud Code is the primary integration hub: it can call Cloud Save, Economy, Leaderboards, Remote Config via service SDKs (C# NuGet packages or JS SDKs) ([docs](https://docs.unity.com/ugs/en-us/manual/cloud-code/manual/modules/how-to-guides/unity-services-integration))
- Lobby integrates with Relay (connection lifecycle) and Vivox (automatic token provider) — when a player disconnects from Relay, Lobby is notified and removes them ([docs](https://docs.unity.com/ugs/en-us/manual/lobby/manual/relay-integration))
- The MPS SDK (Multiplayer Services SDK) merges Lobby, Matchmaker, Relay, and Multiplay into a unified Sessions API — automates lobby creation, relay allocation, and Netcode connection setup ([docs](https://docs.unity.com/en-us/mps-sdk))
- Each service has independent rate limits, pricing tiers, and data storage
- Cross-service consistency is the developer's responsibility; no ACID transactions across services

## 3. Source Code Access

**Client SDKs are closed-source Unity packages. Cloud Code runtime is closed. CLI source is reference-only. Go SDK is open source.**

### What Is Available

| Artifact | Access | Source |
|---|---|---|
| UGS CLI | Source on GitHub, "reference only" — cannot build due to internal dependencies | [GitHub](https://github.com/Unity-Technologies/unity-gaming-services-cli) |
| Go SDK | Open source on GitHub (for non-Unity game servers) | [GitHub](https://github.com/Unity-Technologies/unity-gaming-services-go-sdk) |
| Cloud Code C# NuGet packages | Published on NuGet (`Com.Unity.Services.CloudCode.Core`, `Com.Unity.Services.CloudCode.Apis`) | [NuGet](https://www.nuget.org/packages/Com.Unity.Services.CloudCode.Core/) |
| Netcode for GameObjects | Open source on GitHub | [GitHub](https://github.com/Unity-Technologies/com.unity.netcode.gameobjects) |
| Sample projects | Open source (use-cases, game-lobby, multiplayer chess) | [GitHub](https://github.com/Unity-Technologies/com.unity.services.samples.use-cases) |
| Client SDKs (Auth, Cloud Save, Economy, etc.) | Distributed as Unity Package Manager packages — compiled DLLs, not source | docs.unity.com |
| Dashboard | Closed-source SaaS web application | cloud.unity.com |
| Cloud Code runtime | Closed — runs on Unity's managed .NET infrastructure | — |
| REST APIs | Documented at services.docs.unity.com with OpenAPI specs | [API docs](https://services.docs.unity.com/) |

### Key Details

- Cloud Code modules run on the open-source .NET runtime (up to .NET 9), but the hosting/orchestration layer is closed ([docs](https://docs.unity.com/en-us/cloud-code/modules/overview))
- Cloud Code C# modules **cannot use** classes from `UnityEngine` namespace — the runtime is standard .NET, not Unity engine
- The Megacity Metro sample (128+ player shooter) is open source and demonstrates UGS + Netcode for Entities integration ([GitHub](https://github.com/Unity-Technologies/megacity-metro))

## 4. Shared Client-Server Logic

**Partial — Cloud Code C# modules use .NET (not UnityEngine), so pure C# logic can theoretically be shared, but practical barriers exist.**

### C# Modules: The Closest to Shared Code

- Cloud Code C# modules are standard .NET class libraries. Unity clients use Mono/.NET via Unity's scripting backend. Both are C#, so **pure logic** (data models, enums, validation functions) can live in a shared .NET Standard library ([docs](https://docs.unity.com/en-us/cloud-code/modules/how-to-guides/module-structure))
- "Like any C# project, the classes and logic between endpoints in the same module can be shared" ([docs](https://docs.unity.com/ugs/en-us/manual/cloud-code/manual/modules/how-to-guides/module-structure))
- Cloud Code generates **type-safe client bindings** from module endpoints, placed under `Assets/CloudCode/GeneratedModuleBindings/` — this ensures DTOs match between client and server ([docs](https://docs.unity.com/en-us/cloud-code/modules/getting-started))

### Practical Limitations

- Forum reports indicate that sharing class definitions beyond enums causes conflicts with generated bindings — the binding generator creates duplicate types that cannot be used interchangeably with the originals ([discussion](https://discussions.unity.com/t/shared-models-between-cloud-code-and-client-code/1652843))
- Cloud Code modules cannot reference `UnityEngine` — any shared code must be pure .NET Standard with no Unity dependencies
- No deterministic execution model — sharing code does not mean identical execution guarantees
- JavaScript scripts (the other Cloud Code option) share no code with Unity C# clients

### Contrast with Metaplay

Unlike Metaplay's `SharedCode` approach where the same C# PlayerModel executes identically on client and server with checksum validation, UGS Cloud Code is stateless serverless — there is no persistent in-memory game state on the server. Shared code is limited to data types and utility functions, not a shared execution model.

## 5. Game Config Management

**Key-value settings with typed primitives plus JSON. Game Overrides for audience targeting. No structured typed-object pipeline.**

### Remote Config Settings

- Settings are key/value pairs mapped to game code variables ([docs](https://docs.unity.com/en-us/remote-config))
- Supported types: `string`, `int`, `float`, `long`, `bool`, `JSON` ([docs](https://docs.unity3d.com/Packages/com.unity.remote-config@3.1/manual/CodeIntegration.html))
- JSON values support **JSON Schema (Draft 7)** templates for validation — define a schema, attach it to one or more keys, and future updates are validated against it ([docs](https://docs.unity.com/en-us/remote-config/templates))
- Client-side retrieval: `RemoteConfigService.Instance.GetFloat("key", default)`, `GetInt()`, `GetString()`, `GetJson()`
- Config is fetched at runtime from Unity's servers — no local compilation step, no binary archives, no content-hash diffing

### Game Overrides (Targeting / A/B Testing)

- Game Overrides override default settings for specific audiences ([docs](https://docs.unity.com/en-us/remote-config/game-overrides-and-settings))
- **Targeting Strategies**: Stateful (predefined audiences like "All Spenders", "Existing Players") or Stateless (custom JEXL expression conditions)
- Scheduling: optional start/end dates for time-limited overrides
- Priority: Low/Medium/High or numeric 1-1000 via Advanced Editor
- Essentially an A/B testing and segmentation engine on top of Remote Config

### Deployment

- Can be deployed via Dashboard, UGS CLI (`deploy`/`fetch` commands), or file-based config-as-code workflow ([docs](https://docs.unity.com/ugs/en-us/manual/overview/manual/ugs-cli-introduction))
- CLI enables CI/CD integration: diff environments, roll back configurations

### Comparison to Typed Config Pipeline

Remote Config is a runtime key-value service, not a build-time typed config pipeline. There are no C# config classes, no spreadsheet-to-binary compilation, no compile-time type safety. JSON Schema validation provides some structure but is runtime-only. For complex game data (item databases, level layouts, progression curves), developers typically use their own systems or store JSON blobs in Remote Config.

## 6. Operations Tooling

**Unity Dashboard — fixed SaaS web app with per-service admin pages, REST APIs, and CLI automation. Not source-available, not code-extensible.**

### Unity Dashboard

- Centralized web dashboard at cloud.unity.com for all UGS services ([docs](https://docs.unity.com/ugs/en-us/manual/overview/manual/unity-dashboard-introduction))
- Per-service pages: Cloud Code script/module management, Remote Config settings editor, Economy catalog configuration, Cloud Save data browsing, Analytics dashboards, Matchmaker config
- Menu personalization: pin/reorder frequently-used services
- Custom Analytics dashboards: create your own dashboards with custom reports ([docs](https://docs.unity.com/ugs/en-us/manual/analytics/manual/custom-dashboards))
- Environments: separate dev/staging/production environments per project ([docs](https://docs.unity.com/ugs/en-us/manual/overview/manual/service-environments))

### Admin APIs and Automation

- REST Admin APIs for every service, authenticated via Service Accounts with Key ID + Secret ([docs](https://services.docs.unity.com/docs/service-account-auth/))
- UGS CLI: deploy/fetch configurations, call admin APIs, scriptable for CI/CD pipelines ([docs](https://docs.unity.com/ugs/en-us/manual/overview/manual/ugs-cli-introduction))
- CLI supports: Cloud Code scripts/modules, Remote Config, Cloud Save indexes, Economy config, Cloud Content Delivery, Access Control
- **Config as Code**: file-based deployment workflow — store configs in version control, deploy via CLI

### What It Cannot Do

- Dashboard source is **not available** — cannot add custom pages, views, or admin actions
- No plugin/extension system for the dashboard
- No built-in player state inspector comparable to Metaplay's per-player model view (Cloud Save is key-value browsing, not a structured game state view)
- For custom admin tooling, developers must build separate applications using the REST APIs
- No audit log visible in documentation for who changed what config and when

## 7. Infrastructure Ownership

**Fully managed cloud service — no self-hosting option for the backend platform. Multiplay (game server hosting) transitioning to Rocket Science Group by March 31, 2026.**

### Self-Hosting

- UGS backend services (Cloud Code, Cloud Save, Economy, Auth, Remote Config, Analytics, Leaderboards) are **not self-hostable**. They run exclusively on Unity's cloud infrastructure.
- Forum discussions confirm: "To achieve greater independence and self-host your server instead of relying on the Unity cloud, you typically have to pick an expensive enterprise pricing plan" — and even that applies only to certain services, not the full platform ([discussions](https://discussions.unity.com/t/self-hosting/1578903))
- Game server binaries (the Netcode server) can run anywhere — on your own infrastructure, cloud VMs, or third-party hosting. UGS services are called via REST APIs.

### Data Portability

- Cloud Save exposes REST APIs (Player API and Admin API) for reading/writing player data ([docs](https://docs.unity.com/en-us/cloud-save/tutorials/rest-api))
- Cloud Save Admin API supports querying indexed data — could be used for bulk extraction, but no dedicated "export all" feature documented ([API docs](https://services.docs.unity.com/cloud-save-admin/v1/))
- Economy configuration can be exported/imported via CLI deploy/fetch
- No documented data portability guarantees or migration tooling for moving off UGS entirely
- All data resides on Unity's infrastructure

### Multiplay Shutdown

- Unity announced December 4, 2025: Multiplay Game Server Hosting support ends **March 31, 2026** ([docs](https://docs.unity.com/ugs/en-us/manual/game-server-hosting/manual/welcome-to-multiplay))
- Multiplay software licensed to **Rocket Science Group** for continuity of live titles ([AccelByte analysis](https://accelbyte.io/blog/unity-multiplay-is-transitioning-practical-paths-forward-for-multiplayer-studios-using-or-evaluating-multiplay))
- Matchmaker will continue to work with Relay and Distributed Authority; hosting integration shifting to third parties ([docs](https://docs.unity.com/en-us/matchmaker/multiplay-hosting-migration))
- Alternatives being adopted: **Edgegap** (has Unity plugin, claims migration in minutes), custom hosting on AWS/GCP/Azure, AccelByte ([Edgegap](https://edgegap.com/gaming/unity-game-server-hosting-orchestration-plugin))

### Vendor Lock-in Risk

- Multiplay shutdown demonstrates the risk: a core infrastructure service discontinued with ~16 months notice
- Forum thread titled "End of services?" shows developer anxiety about what else might be discontinued ([discussion](https://discussions.unity.com/t/end-of-services/1698428))
- No contractual or technical guarantees documented for long-term service availability of other UGS services
- Migration path from UGS to a competing backend would require rebuilding integrations — services use proprietary APIs, not open standards

### Pricing Model

- Free tier available for all services; pay-as-you-scale beyond free limits ([pricing](https://unity.com/products/gaming-services/pricing))
- Payment method required when exceeding free tier for: Cloud Code, Cloud Save, Economy, Vivox, Lobby, Relay
- Free tier alerts at 75% and 100% usage
- Cloud Code modules billed by compute time; specific rates on per-service pricing pages

## Architecture Summary Label

**Managed serverless service suite** — collection of independent cloud services (Cloud Code + Netcode) with shared auth, key-value config, CLI automation, no source access, no self-hosting

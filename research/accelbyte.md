# AccelByte — Architecture Research

Last updated: 2026-02-16
Sources: docs.accelbyte.io, accelbyte.io, github.com/AccelByte

## 1. Server Authority Model

**AccelByte manages server orchestration (AMS), not game-state authority — the developer owns all game logic and authority inside their dedicated server binary.**

- AccelByte Multiplayer Servers (AMS) is a dynamic dedicated game server manager — it provisions, scales, and monitors VMs running developer-supplied server binaries
- AMS does NOT run game logic itself; it orchestrates the infrastructure around developer-built dedicated servers
- The developer's server binary contains all authoritative game-state logic (physics, hit detection, validation) — AccelByte has no opinion on how that logic works
- AMS architecture has three layers: Fleet Commander (per-environment, requests VMs), AMS Core (multi-regional orchestrator, assigns VMs), and Watchdog (per-VM agent managing server lifecycles)
- Each VM is dedicated to a single customer — no resource contention from other AMS users
- Server lifecycle states managed by Watchdog: Creating → Ready → In Session → Draining → Unresponsive
- Dedicated servers connect to the local Watchdog via WebSocket at `ws://localhost:5555/watchdog`, identify via `ams-dsid` HTTP header, and send heartbeats every 15 seconds
- Integration requires minimal SDK calls: one `SendServerReady()` call after loading, plus a drain handler for graceful shutdown
- As of AGS 2025.2, AMS is available as a standalone product — studios can use AMS without subscribing to AGS, integrating with any backend or matchmaking solution
- AMS also supports P2P sessions via WebRTC (ICE/STUN/TURN), where the first player to accept becomes the host — AccelByte hosts the STUN/TURN relay servers (based on Google's COTURN project)
- AccelByte documents "server authoritative player statistics" as a pattern: game servers use Server SDK to update stats server-side rather than trusting client calls

Source: docs.accelbyte.io/gaming-services/modules/multiplayer/multiplayer-servers/, accelbyte.io/blog/announcing-the-independent-availability-of-accelbyte-multiplayer-servers

## 2. Platform Integration

**Modular microservices platform with a shared Foundations layer — Online and Multiplayer are additive modules, not independent products.**

- AGS is built on loosely coupled microservices, each exposing REST APIs
- Synchronous inter-service communication via REST HTTPS; asynchronous via Message Broker (event-driven)
- Client-to-service communication is HTTPS, except Lobby Service which uses persistent WebSocket (WSS)
- Authentication uses OAuth 2.0 with JWT tokens for all inter-service and client communications
- Modular packaging (introduced 2024–2025):
  - **Foundations** (always included): Identity & Access, Legal & Privacy, Game Analytics, Tools & Utilities, Extend customization framework
  - **Online** (optional add-on): Store & Catalog, Wallet & Payments, Cloud Save, Inventory, Achievements, Leaderboards, Friends & Presence, Season Pass
  - **Multiplayer** (optional add-on): Multiplayer Servers, Matchmaking, Chat, Game Sessions, Guilds & Clans, Parties & Presence, Peer-to-Peer
  - **Complete** = Foundations + Online + Multiplayer
- Studios start with Foundations, add Online, Multiplayer, or both — pay only for what they deploy
- Each microservice manages its own data persistence layer to isolate failures
- Namespace-based logical partitioning supports multiple games per studio (one root namespace, multiple game namespaces)
- Response time target: <200ms for requests within the data center

Source: docs.accelbyte.io/gaming-services/getting-started/technical-overview/, accelbyte.io/blog/accelbyte-gaming-services-is-now-modular

## 3. Source Code Access

**Extend SDKs and plugin templates are open on GitHub; core platform and Admin Portal are closed-source; Enterprise tier offers source code access.**

- AccelByte has 186+ public repositories on GitHub (github.com/AccelByte)
- **Game SDKs (client-side, open source):**
  - Unreal Engine SDK (C++, supports UE4 and UE5 through 5.7.x) — 87.3% C++, 199 commits, 165 releases
  - Unity SDK (C#)
  - Unreal Network Utility (ICE connectivity for P2P)
  - Unity Network Utility (WebRTC P2P)
  - Unreal Online Subsystem (OSS) bridge
- **Server/Extend SDKs (open source):**
  - Go Extend SDK (generated from OpenAPI spec)
  - C# Extend SDK
  - Java Extend SDK
  - Python Extend SDK
  - IAM Go SDK, IAM Python SDK
  - TypeScript SDK (platform-agnostic, browser or server)
- **Extend plugin templates (open source):** gRPC server templates for matchmaking (Go, C#, Python), lootbox roll (Python), rotating shop items (Go), CloudSave validator (Go), service extensions (Go, C#)
- **SDKs are generated from OpenAPI specifications** — they are full API clients, not thin wrappers
- **Extend Codegen CLI** can generate custom Unreal SDK plugins from any OpenAPI 2.0 spec (Jinja2 template-based code generation)
- **Core AGS platform code is closed-source** — not available on GitHub or to standard customers
- **Admin Portal is closed-source**
- **Enterprise support tier** explicitly lists "Support for Source Code Access" — implying core platform source is available only at that tier and under custom agreement

Source: github.com/AccelByte, github.com/AccelByte/accelbyte-unreal-sdk-plugin, accelbyte.io/solution

## 4. Shared Client-Server Logic

**No shared client-server game logic — client SDKs and Extend server apps are separate codebases using different protocols (REST vs gRPC).**

- Client Game SDKs (Unreal, Unity) communicate with AGS via HTTPS REST APIs and WebSocket (Lobby)
- Server-side Extend apps communicate with AGS via gRPC (Override, Event Handler) or REST-over-gRPC-Gateway (Service Extension)
- There is no mechanism to write game logic once and execute it on both client and server
- The Extend Override pattern: AGS calls your gRPC endpoint instead of its default logic (e.g., custom matchmaking function) — this is server-only code, not shared with the client
- The Extend Service Extension pattern: you build a RESTful service hosted by AccelByte — clients call it via generated SDK code, but the service logic is server-only
- The Extend Codegen CLI generates client-side Unreal SDK plugins for calling custom Service Extensions — but this is API client generation, not shared logic execution
- Dedicated game servers can use the same Server SDK as Extend apps to call AGS APIs (e.g., server-authoritative stat updates), but game simulation code is entirely developer-owned and separate from client code
- No deterministic replay, no shared simulation, no client-server code sharing framework

Source: docs.accelbyte.io/gaming-services/knowledge-base/interfaces-sdks/, docs.accelbyte.io/gaming-services/modules/foundations/extend/

## 5. Game Config Management

**No dedicated remote config or A/B testing service — CloudSave Game Records and Admin Records serve as the closest equivalent.**

- AccelByte does NOT offer a purpose-built remote configuration service, feature flags, or A/B testing
- **CloudSave** is the primary configuration workaround, supporting two data formats:
  - JSON records (recommended limit: 1 MB per record)
  - Binary records (up to 100 MB — JPEG, PNG, BMP, GIF, MP3, WebP, binary files)
- **Record types relevant to config management:**
  - **Game Records**: global per-namespace data (theme configs, event setups, news) — accessible by all clients and servers
  - **Admin Game Records**: namespace-wide data accessible only by admins and game servers — suitable for server-side tuning variables hidden from players
  - **Admin Player Records**: per-user data accessible only by admins and game servers — for server-controlled per-player settings
  - **Player Records**: per-user data (save games, preferences) — can be public or private, client or server writable
- **Access control per record:**
  - `is_public`: true = other players can read; false = only owner + admin
  - `set_by`: SERVER = only servers can write (clients read-only); CLIENT = both can write (default)
- **`__META` fields** allow custom validation logic on record create/update/retrieval
- **CloudSave Validator Extend Override** (template on GitHub) lets developers inject custom validation via gRPC before records are saved
- Admin Portal provides manual editing of admin records for data fixes and auditing
- No config versioning, no rollback, no staged rollouts, no audience targeting, no experiment framework
- Teams needing A/B testing or feature flags must integrate third-party tools (LaunchDarkly, Firebase Remote Config, etc.) or build custom solutions on top of CloudSave Game Records

Source: docs.accelbyte.io/gaming-services/modules/online/cloud-save/, docs.accelbyte.io/gaming-services/services/storage/cloud-save/storing-restricted-data/

## 6. Operations Tooling

**Admin Portal covers service-by-service management; AIS provides analytics with custom Grafana dashboards; neither is code-level extensible.**

### Admin Portal
- Web-based admin dashboard for managing all AGS modules
- **User Management**: player lookup (fuzzy search by partial credentials), account inspection, user bans (account ban, feature ban, device ban), role assignment
- **Moderation**: chat reporting review, player complaint tickets, manual actions on reported players (warnings, bans)
- **Monetization**: store & catalog management (item localization, regional data, bundling, store cloning, import/export), wallet and payment management, currency management, display sections with rotation rules
- **Matchmaking & Sessions**: session template configuration (min/max players, joinability, leader election), matchmaking rule configuration, DSM (Dedicated Server Management) settings across all regions
- **Inventory & Progression**: inventory lookup per player, achievement configuration, leaderboard management, season pass setup
- **AMS Management**: fleet creation and configuration, build uploads via CLI, region scaling, server monitoring, CLI tool downloads
- **Access Control**: fine-grained roles and permissions system, custom admin roles with per-feature access grants/denials
- **Extend Monitoring**: function statistics (invocation count, average execution time, last call timestamp, logs)
- Admin Portal is NOT code-level extensible — cannot add pages, inject components, or modify views
- For custom admin tooling, developers must build separate applications using AGS REST APIs

### AccelByte Intelligence Service (AIS)
- Add-on analytics service (separate from base AGS)
- Out-of-the-box AGS dashboard included in Admin Portal for all customers
- Paid AIS tier provides:
  - Full data warehouse with 200+ SQL tables, normalized relational model
  - Direct query access to raw events
  - KPIs: retention, engagement, conversion rates, monetization trends, core game loops
  - Data Connector service for streaming telemetry to external warehouses (near real-time)
  - Managed Grafana dashboard service with custom dashboard support
  - Compatible with Power BI, Looker, and other BI tools as data sources
- Monitoring stack: OpenTelemetry collectors, Prometheus, fluentd → centralized monitoring platform with 24/7 LiveOps oversight

Source: accelbyte.io/blog/managing-your-users-with-accelbyte-iam-and-admin-portal, docs.accelbyte.io/gaming-services/services/ais/, accelbyte.io/intelligence-service

## 7. Infrastructure Ownership

**Shared Cloud (multi-tenant) or Private Cloud (single-tenant) managed by AccelByte; Enterprise tier supports Bring Your Own AWS; no on-premises self-hosting.**

### Deployment Options
| Tier | Infrastructure | Control Level |
|------|---------------|---------------|
| **Shared Cloud** | Multi-tenant, private namespace within shared infrastructure | Lowest — AccelByte manages everything; same features as Private Cloud |
| **Private Cloud** | Single-tenant dedicated cluster | Higher — custom configurations, enterprise-level compliance |
| **Enterprise (Private Cloud)** | Bring Your Own AWS environment | Highest — own infrastructure, AccelByte operates on top |

### Pricing Structure (as of 2025)
- **Shared Cloud Complete**: $100/month base + usage (PCCU-based tiered pricing)
- **Private Cloud Complete**: $3,500/month/environment + usage
- **Shared Cloud free trial**: up to 25,000 play hours or 90 days
- **Usage pricing** scales by Peak Concurrent Users (PCCU): $0.0224–$0.11/user/day depending on tier and volume
- **Support tiers**: Community (free) → Standard ($1,000/month) → Professional ($5,500/month) → Enterprise (custom)

### Infrastructure Details
- AMS supports AWS, Azure, Google Cloud, and Servers.com (bare metal)
- AMS hybrid deployments can combine cloud and bare-metal from multiple providers
- 60+ instance types available across cloud providers, with Instance Selection Recommendation tool
- No on-premises self-hosting option documented — all deployments are cloud-based, managed by AccelByte
- Enterprise tier includes: source code access, BYO infrastructure support, dedicated Delivery Manager, product workshop/roadmap sessions
- Both Shared Cloud and Private Cloud are maintained 24/7 by AccelByte
- Shared Cloud customers can migrate to Private Cloud at any point
- Extend apps run on dedicated VMs per namespace — namespaces cannot share Extend infrastructure

Source: accelbyte.io/pricing, docs.accelbyte.io/gaming-services/getting-started/shared-cloud/shared-cloud-intro/, accelbyte.io/solution

## Architecture Summary Label

**Modular managed microservices platform** — REST/gRPC backend with developer-owned dedicated server authority, gRPC-based Extend customization framework, CloudSave-as-config workaround, no on-prem option; Enterprise tier unlocks source code access and BYO AWS

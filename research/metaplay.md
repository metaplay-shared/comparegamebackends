# Metaplay — Architecture Research

Last updated: 2026-02-16
Sources: Metaplay SDK docs (v36.0.0) via MCP server, metaplay.io

## 1. Server Authority Model

**Structural — deterministic re-execution with checksum validation.**

- All state mutations happen through **Actions** — serializable C# command objects with an `Execute()` method
- Actions execute client-first for instant feedback, then serialize and send to server for authoritative re-execution
- The server re-executes the **exact same Action** on its authoritative PlayerModel
- Periodic checksums verify client and server states match; mismatches trigger desync with automatic state diffing
- Server-only Actions available: `PlayerSynchronizedServerAction` and `PlayerUnsynchronizedServerAction`
- Determinism enforced: fixed-point math (`F32`/`F64`), `MetaTime`, `MetaDictionary`, `RandomPCG`

Source: docs/game-logic/deep-dive-game-logic-execution-model.md

## 2. Platform Integration

**Single integrated platform (distributed monolith).**

- Single C# server process contains all functionality via Akka.NET actor model
- Player entities, guilds, sessions, matchmaking, leagues, game configs, analytics, admin API — all run as actors within the same cluster
- Entity-to-entity communication via in-process message passing (not network API calls)
- Single deployment on Kubernetes contains everything
- Local dev: `dotnet run` starts entire server — no Docker, no database installs needed

Source: docs/game-server-programming/introduction-to-the-game-server-architecture.md

## 3. Source Code Access

**Full platform source: server, client SDK, dashboard.**

- `MetaplaySDK/Backend/` — Full C# source for server framework (entity system, persistence, Akka.NET actors, clustering, admin API, IAP validation, etc.)
- `MetaplaySDK/Client/` — Full C# source for Unity SDK (serialization, model framework, networking)
- `MetaplaySDK/Frontend/` — Full Vue/TypeScript source for LiveOps Dashboard
- Source-available license (not open source) — contractually structured to avoid vendor lock-in
- Developers can set breakpoints in server code during local development

Source: docs/introduction/introduction-to-metaplay.md

## 4. Shared Client-Server Logic

**True deterministic shared execution — same C# code compiles into both Unity client and .NET server.**

- Game logic in `SharedCode` directory compiled into both runtimes
- PlayerModel is a single C# class existing on both client and server
- Deterministic execution guarantees identical results on both sides
- Eliminates client-server logic divergence bugs entirely
- Constraint: locked to C#/Unity on client side

Source: docs/game-logic/deep-dive-game-logic-execution-model.md

## 5. Game Config Management

**First-class structured pipeline: Google Sheets/CSV → typed C# objects → OTA delivery with diffing.**

- Data sources: Google Sheets (primary), CSV, Excel, JSON, Unity prefabs, custom
- Config Items: C# classes implementing `IGameConfigData<>` with `[MetaSerializable]`
- Config Archives: compiled binary packages distributed via CDN
- Build pipeline: fully programmable — fetch, transform, validate, produce archives with content-hash versioning
- Publishing: automatic or manual with diff review in LiveOps Dashboard
- Hot updates: new clients get new config; existing sessions keep negotiated version
- Studios configure "entire game levels remotely — board layouts, merge chains, character stats, full progression systems"

Source: docs/feature-cookbooks/game-configs/working-with-game-configs.md

## 6. Operations Tooling

**Source-available Vue.js dashboard, designed to be extended.**

- Vue 3 + TypeScript + Tailwind CSS single-page application
- Source included in SDK under `MetaplaySDK/Frontend/`
- Integration API: custom Vue components via UiPlacement, custom pages with sidebar entries, custom admin actions
- If Integration API insufficient, can modify core source directly
- Built-in: player state inspection, ban/rename, analytics browsing, incident reports, game config diffing, A/B experiments, segments, broadcasts, guilds, GDPR tools, audit logs, Grafana integration

Source: docs/liveops-dashboard/introduction-to-the-liveops-dashboard.md

## 7. Infrastructure Ownership

**Kubernetes on AWS; managed or self-hosted.**

- EKS on AWS, Terraform modules for provisioning, Helm charts for deployment
- Aurora MySQL for persistence, S3 for storage, CloudFront CDN
- Grafana + Mimir + Loki for observability
- **Managed**: Metaplay operates infrastructure
- **Private Cloud**: full infrastructure in your own AWS account with provided Terraform/Helm
- ~1,000 CCU per AWS vCPU; 1M DAU (~50k CCU) runs on ~100 vCPU for ~$4000/month
- Stateful actor model: ~1:1 read:write ratio, no read replicas or caching layers needed

Source: docs/self-hosting/introduction-to-metaplay-cloud-infrastructure.md

## Architecture Summary Label

**Deterministic shared-logic platform** — single integrated C# server with actor model, full source access, structured config pipeline

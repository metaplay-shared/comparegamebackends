# Heroic Labs — Architecture Research

Last updated: 2026-02-16
Sources: heroiclabs.com/docs/, github.com/heroiclabs/nakama

## 1. Server Authority Model

**Authoritative match handlers with configurable tick-rate loops.**

- Nakama authoritative multiplayer validates gameplay on server via match handlers
- Seven lifecycle functions: init, join attempt, join, leave, loop, terminate, signal
- Configurable tick rates for the match loop
- Server maintains canonical game state; validates all player inputs
- Custom validation logic in TypeScript/Go/Lua
- No automatic checksum verification between client and server
- Developer implements all validation in the match handler

Source: heroiclabs.com/docs/nakama/concepts/multiplayer/authoritative/

## 2. Platform Integration

**Three separate products with separate dashboards and billing.**

- **Nakama**: Open-source game server (Apache 2.0) — auth, matchmaking, multiplayer, storage, leaderboards, chat
- **Satori**: Commercial LiveOps platform — analytics, experiments, feature flags, live events, audiences. Own dashboard, own API, own data store
- **Hiro**: Commercial Game Development Kit — economy, progression, inventory, achievements, guilds, energy. Requires Nakama. JSON config files
- Products sold and priced separately
- Two dashboards: Nakama Console (admin/dev) + Satori Dashboard (LiveOps)
- Trade-off: incremental adoption possible (start with Nakama, add others later)

Source: heroiclabs.com/about/, heroiclabs.com/pricing/

## 3. Source Code Access

**Nakama: full server + SDKs (Apache 2.0). Satori/Hiro: commercial.**

- Nakama server: full Go source on GitHub, Apache 2.0
- All Nakama client SDKs: Apache 2.0 (Unity, Unreal, Godot, JS, Swift, Java, Dart, Defold, Cocos2d)
- Hiro server interface: Apache 2.0 on GitHub, but full framework requires commercial license
- Satori: proprietary/commercial only, no source
- Can inspect, modify, contribute to Nakama internals

Source: github.com/heroiclabs/nakama

## 4. Shared Client-Server Logic

**TypeScript code reuse possible, but not deterministic shared execution.**

- Nakama TypeScript runtime enables shared code patterns between JS/TS client and server
- nakama-js client library written in TypeScript
- Can reuse utility code, types, validation functions
- NOT deterministic execution — no guarantee identical results on both sides
- No checksum verification between client and server states
- Client (Unity C#, Unreal C++) and server (JS/Go/Lua) typically entirely separate codebases

Source: heroiclabs.com/docs/nakama/server-framework/typescript-runtime/

## 5. Game Config Management

**No dedicated config pipeline. Satori feature flags or ad-hoc storage.**

- Nakama has NO built-in game config system
- Option 1: Satori feature flags — GUI-driven, JSON schemas, audience-targeted variants
- Option 2: Store config as JSON objects in Nakama Storage Engine with public read access
- Hiro uses JSON configuration files for its own metagame systems
- No spreadsheet integration, no typed config pipeline, no config diffing
- No equivalent to compiled config archives or OTA binary delivery

Source: heroiclabs.com/docs/nakama/guides/deployment/remote-configuration/

## 6. Operations Tooling

**Two fixed dashboards — Nakama Console (admin) + Satori Dashboard (LiveOps).**

- **Nakama Console**: Real-time monitoring, player management, storage editing, wallet management, chat moderation, API explorer, RBAC (Admin/Developer/Maintainer/View Only)
- **Satori Dashboard**: Audience management, experiment creation, feature flags, live events, analytics
- Neither dashboard is customizable at the code level
- No source code provided for either dashboard
- Cannot add game-specific pages or custom admin actions

Source: heroiclabs.com/docs/nakama/getting-started/console/

## 7. Infrastructure Ownership

**Full self-hosting (Apache 2.0) or managed Heroic Cloud.**

- Nakama: free self-hosting on any cloud or on-premises (Apache 2.0)
- Docker Compose for quick setup
- CockroachDB (recommended) or any PostgreSQL-compatible database
- Heroic Cloud: managed on GCP or AWS, from $600/month
- Enterprise clustering (CRDTs, gossip protocols) requires Enterprise license
- Open-source single node handles ~10K CCU; Enterprise needed for multi-node clusters
- Full data ownership when self-hosting

Source: github.com/heroiclabs/nakama, heroiclabs.com/pricing/

## Architecture Summary Label

**Composable open-source stack** — three separate products (Nakama + Satori + Hiro), multi-language server runtime, self-hostable

# Colyseus -- Architectural Research

> **Framework**: Colyseus v0.16 (current as of 2025)
> **Type**: Open-source Node.js multiplayer framework
> **Creator**: Endel Dreyer (fully independent since March 2023, after Lucid Sight returned ownership)
> **License**: MIT
> **Repository**: https://github.com/colyseus/colyseus (monorepo with pnpm + Lerna)

---

## 1. Server Authority Model

### How Authority Works

Colyseus enforces a **server-authoritative** architecture by design. The client SDK cannot directly mutate state. Clients send messages to the server to request changes; the server processes those requests and mutates the state, which is then synchronized back to all connected clients.

> "The client-side is not capable of mutating the state directly. Instead, it sends messages to the server to request state changes."
> -- [State docs](https://docs.colyseus.io/state)

### State Mutation Model

State is defined as classes extending `Schema` from `@colyseus/schema`. Properties decorated with `@type()` are tracked for synchronization. When the server mutates any decorated property, the framework records the change in a per-instance `ChangeTree` object. At each `patchRate` interval, only the latest mutation of each property is binary-encoded and sent to all clients.

```typescript
import { Schema, type } from "@colyseus/schema";

export class Player extends Schema {
    @type("string") name: string;
    @type("number") x: number;
    @type("number") y: number;
}

export class MyState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
}
```

**Source**: [Schema Definition docs](https://docs.colyseus.io/state/schema), [@colyseus/schema GitHub](https://github.com/colyseus/schema)

### Room System and Authority Enforcement

Authority is **structural** in the sense that:
- State classes live on the server. The room instance owns the state.
- The client SDK provides only listener/callback APIs for state changes -- there is no setter API on the client.
- The `onAuth()` lifecycle hook runs before `onJoin()`, gating room entry.
- Room lifecycle hooks (`onCreate`, `onJoin`, `onLeave`, `onDispose`) are server-only.

However, the framework does **not** enforce input validation or anti-cheat. Server-side message handlers must implement their own validation logic. The roadmap lists "client-side input validation on servers" as a planned feature.

**Source**: [Server docs](https://docs.colyseus.io/server), [Colyseus Roadmap](https://github.com/colyseus/colyseus/wiki/Public-Roadmap)

### Key Constraints
- Each `Schema` type can hold up to **64 synchronizable fields**.
- `NaN` and `Infinity` encode as `0`; `null` strings become `""`.
- Multi-dimensional arrays are not supported.
- Field order must match between encoder (server) and decoder (client).

**Source**: [State docs](https://docs.colyseus.io/state)

---

## 2. Platform Integration

### What Colyseus Provides

| Capability | Status |
|---|---|
| Authoritative game loop | Yes -- room-based server tick |
| Real-time state sync | Yes -- binary delta encoding via `@colyseus/schema` |
| Matchmaking | Yes -- `filterBy()`, `sortBy()`, built-in `LobbyRoom`, `QueueRoom`, `RelayRoom` |
| WebSocket transport | Yes (default); experimental WebTransport in v0.16 |
| Authentication framework | Yes -- `@colyseus/auth` provides JWT, OAuth 2.0 (200+ providers), email/password, anonymous sign-in |
| HTTP API routes | Yes -- Express or uWebSockets.js integration |
| Monitoring | Yes -- `@colyseus/monitor` web panel |
| Load testing | Yes -- `@colyseus/loadtest` |
| Unit testing | Yes -- `@colyseus/testing` |

### What Colyseus Does NOT Provide

| Capability | Status |
|---|---|
| Database / persistence | **Not included**. Rooms are ephemeral. Developers choose their own DB (Postgres, MongoDB, etc.) and ORM (Prisma, TypeORM, Drizzle). |
| Player identity / accounts | **Not included**. `@colyseus/auth` provides the callback framework but no database or email sending -- developers must implement `onFindUserByEmail`, `onRegisterWithEmailAndPassword`, etc. |
| Economy / virtual currency | **Not included**. Entirely DIY. |
| LiveOps / remote config | **Not included**. No built-in config push system. |
| Analytics / telemetry | **Not included**. No built-in analytics. |
| Leaderboards | **Not included**. Listed on the roadmap as a planned "database-first feature". |
| Push notifications | **Not included**. |
| CDN / asset delivery | **Not included**. |

> "Having database-first features such as player identity, leaderboards, configurations, etc. is in our Roadmap. Currently, we don't have an official database recommendation."
> -- [Database & Persistence docs](https://docs.colyseus.io/database)

**Supported client SDKs / engines**: JavaScript/TypeScript, Unity (C#), Construct 3, Defold (Lua), Haxe 4, Cocos Creator.

**Source**: [Framework page](https://colyseus.io/framework/), [Database docs](https://docs.colyseus.io/database), [Auth Module docs](https://docs.colyseus.io/auth/module)

---

## 3. Source Code Access

### License

**MIT License** -- the most permissive open-source license. Free for commercial use with no restrictions beyond attribution.

> Copyright held by Endel Dreyer.

**Source**: [LICENSE file](https://github.com/colyseus/colyseus/blob/master/LICENSE)

### Repository Structure

The codebase is a **monorepo** (pnpm + Lerna) at `github.com/colyseus/colyseus`. Key packages:

| Package | Purpose |
|---|---|
| `colyseus` | Core server framework |
| `@colyseus/schema` | Binary state serializer with delta encoding |
| `@colyseus/monitor` | Web monitoring panel |
| `@colyseus/loadtest` | Load testing utility |
| `@colyseus/testing` | Unit testing utilities |
| `@colyseus/redis-driver` | Redis matchmaking driver |
| `@colyseus/redis-presence` | Redis presence for IPC |
| `@colyseus/drizzle-driver` | PostgreSQL matchmaking driver (Drizzle ORM) |
| `@colyseus/ws-transport` | WebSocket transport |
| `@colyseus/uwebsockets-transport` | uWebSockets.js transport |
| `@colyseus/auth` | Authentication module |
| `@colyseus/cloud` | Colyseus Cloud integration |

The `@colyseus/schema` library also has standalone decoder implementations for C#, Lua, Haxe, and C++ (C++ noted as outdated). These are separate repos under the `colyseus` GitHub org.

Everything is inspectable and modifiable. The MIT license imposes no restriction on forking or modification.

**Source**: [GitHub org](https://github.com/colyseus), [colyseus/colyseus](https://github.com/colyseus/colyseus)

---

## 4. Shared Client-Server Logic

### TypeScript on Both Sides

Colyseus is a TypeScript/Node.js server framework. When using a JavaScript/TypeScript client, the same language runs on both sides.

### Schema Sharing

Schema classes defined on the server (using `@type()` decorators) must have matching definitions on the client. For **TypeScript/JavaScript clients**, you can share the same schema source files directly. For **statically-typed clients** (C#, C++, Haxe), Colyseus provides a **code generation tool**:

```bash
schema-codegen ./schemas/State.ts --output ./unity-project/ --csharp
schema-codegen ./schemas/State.ts --output ./cpp-project/ --cpp
schema-codegen ./schemas/State.ts --output ./haxe-project/ --haxe
```

For interpreted languages (JavaScript, Lua), the **Reflection decoder** can reconstruct schema definitions at runtime without pre-compiled classes:

```typescript
const encodedStateSchema = Reflection.encode(new MyState());
const myState = Reflection.decode(encodedStateSchema);
```

**Source**: [@colyseus/schema GitHub](https://github.com/colyseus/schema), [Schema Definition docs](https://docs.colyseus.io/state/schema)

### Deterministic Execution

Colyseus provides **no deterministic execution guarantees**. The framework focuses on state synchronization (server mutates, client receives deltas), not on shared simulation logic. There is no lockstep, no deterministic math library, and no shared game logic execution model. The architecture is state-transfer, not input-synchronization.

### Limitations on Sharing

- Schema classes are data definitions only -- they do not contain game logic.
- Game logic runs exclusively on the server in room handlers.
- The client receives state deltas and renders them; it does not run the same simulation.
- The roadmap mentions "full-stack TypeScript types for room communications (trpc-style)" as a future direction.

**Source**: [State docs](https://docs.colyseus.io/state), [Roadmap](https://github.com/colyseus/colyseus/wiki/Public-Roadmap)

---

## 5. Game Config Management

### Current State

Colyseus has **no built-in game config management system**. There is no remote configuration service, no A/B testing framework, no config versioning, and no admin UI for tweaking game parameters.

The documentation explicitly acknowledges this gap:

> "Having database-first features such as player identity, leaderboards, **configurations**, etc. is in our Roadmap."
> -- [Database & Persistence docs](https://docs.colyseus.io/database)

### What Developers Must Build

- Loading config from files, databases, or external services is entirely the developer's responsibility.
- Environment variables can be managed through Colyseus Cloud's dashboard for deployed apps.
- The `app.config` pattern from `@colyseus/tools` handles server configuration (transport, presence, driver), not game configuration.

### v0.16 Room Configuration

As of v0.16, room-level properties (`state`, `patchRate`, `maxClients`, `autoDispose`) can be set declaratively on Room class definitions rather than only in `onCreate()`. This is server infrastructure config, not game content config.

**Source**: [Database docs](https://docs.colyseus.io/database), [v0.16 release blog](https://colyseus.io/blog/colyseus-016-is-here/)

---

## 6. Operations Tooling

### @colyseus/monitor

A web-based monitoring panel accessible at the `/monitor` endpoint. Installed by default on new projects created via `npm create colyseus-app`.

**Features**:
- View all active rooms and their current state
- Inspect individual room state data
- Force-dispose rooms
- Send/broadcast messages to individual clients
- Force-disconnect clients
- Configurable columns: `roomId`, `name`, `clients`, `maxClients`, `locked`, `elapsedTime`, plus custom metadata columns

**Security**: Password protection available via `express-basic-auth` middleware.

**Setup**:
```javascript
import { monitor } from "@colyseus/monitor";
app.use("/monitor", monitor());
```

**Source**: [Monitoring Panel docs](https://docs.colyseus.io/tools/monitoring), [colyseus-monitor GitHub](https://github.com/colyseus/colyseus-monitor)

### Colyseus Cloud Dashboard

The managed hosting dashboard (available at cloud.colyseus.io) provides:
- **Alerts & notifications** via Email, Discord, or Slack -- triggers include deployment success/failure, ungraceful restarts, CPU/memory threshold exceedances, health check failures.
- **Stats & logs page** with per-minute performance graphs, deployment annotations (green markers), and blinking red indicators for shutting-down processes.
- **Environment variable management** for deployed applications.
- **Graceful deployments** via `room.onBeforeShutdown()` -- enables rolling updates without disconnecting players.
- **Resource scaling** through the dashboard (vertical scaling; horizontal auto-scaling is on the roadmap).

**Source**: [Colyseus Cloud Product Update Nov 2024](https://colyseus.io/blog/product-update-november-2024/), [Colyseus Cloud docs](https://docs.colyseus.io/deployment/cloud)

### Extensibility

The `@colyseus/monitor` panel supports custom column configuration but is otherwise a fixed-function tool. There is no plugin API or extension mechanism documented. For deeper observability, developers would integrate standard Node.js APM tools (Datadog, New Relic, etc.) themselves.

---

## 7. Infrastructure Ownership

### Self-Hosting

Colyseus fully supports self-hosting with no feature restrictions (MIT license). The recommended production stack:

- **Reverse proxy**: nginx (with WebSocket upgrade headers, 86400s timeouts)
- **Process manager**: PM2
- **Runtime**: Node.js 22+
- **SSL**: Let's Encrypt or equivalent

**Docker deployment** is documented with a standard Dockerfile (Node.js 22 base image, port 2567):
```bash
docker build -t <username>/colyseus-server .
docker run -p 2567:2567 -d <username>/colyseus-server
```

A **Vultr Marketplace** pre-configured image is also available (Node.js LTS, PM2, nginx, free colyseus.dev subdomain with SSL).

**Source**: [Deployment docs](https://docs.colyseus.io/deployment)

### Colyseus Cloud

Managed hosting by the framework's creator. Key facts:
- Starts at **$15/month**.
- **No CCU/DAU/MAU limits**. No bandwidth limits.
- Uses nginx + PM2 under the hood, requires `@colyseus/tools` package.
- Currently supports **vertical scaling only** (single server with more resources).
- **Horizontal auto-scaling is on the roadmap** but not yet available.
- Rolling deployments with graceful shutdown.

**Source**: [Pricing page](https://colyseus.io/pricing/), [Colyseus Cloud docs](https://docs.colyseus.io/deployment/cloud)

### Scaling with Redis

Multi-process and distributed deployments require two Redis-backed components:

| Component | Purpose | Package |
|---|---|---|
| **RedisPresence** | Inter-process communication via pub/sub + shared key-value storage | `@colyseus/redis-presence` (uses ioredis) |
| **RedisDriver** | Shared room data for matchmaking across processes | `@colyseus/redis-driver` (uses ioredis) |

Alternatively, a **PostgresDriver** (`@colyseus/drizzle-driver`) can replace the RedisDriver for matchmaking storage.

**How rooms distribute**: Rooms are equally distributed across available processes. Each room belongs to a single process. The join flow is two-step: (1) any process can reserve a seat via shared presence/driver, (2) the client connects directly to the process that created the room. Each process must have its own `publicAddress` so clients can reach it directly.

**Redis Cluster** is supported for high-availability deployments.

Multi-process setup requires each Colyseus process to listen on a different port (e.g., 2567, 2568, 2569, 2570), with nginx load-balancing across them.

**Source**: [Presence docs](https://docs.colyseus.io/server/presence), [Driver docs](https://docs.colyseus.io/server/driver), [Scalability docs](https://docs.colyseus.io/deployment/scalability)

### Heroku

Documented but noted as "suitable for prototyping only" -- scaling to multiple processes is not natively supported.

**Source**: [Deployment docs](https://docs.colyseus.io/deployment)

---

## Architecture Summary Label

**Colyseus is an authoritative real-time multiplayer framework, not a managed game backend platform.**

It provides the networking layer (WebSocket transport, binary delta state sync, room-based matchmaking) and enforces server authority structurally through its state mutation model. Everything beyond real-time multiplayer -- databases, player accounts, economy, LiveOps, analytics, config management -- is outside its scope and must be built or integrated by the developer. Full source is available under MIT license. Infrastructure can be fully self-hosted or deployed to Colyseus Cloud ($15/mo+), with Redis required for horizontal scaling. The framework is maintained by a single independent developer (Endel Dreyer) targeting a v1.0 release.

# PlayFab — Architecture Research

Last updated: 2026-02-16
Sources: learn.microsoft.com/en-us/gaming/playfab/, playfab.com

## 1. Server Authority Model

**Opt-in via CloudScript/Azure Functions — developer writes separate validation logic.**

- No built-in shared execution model
- Server authority by writing CloudScript (JS) or Azure Functions that call PlayFab Server APIs
- Example flow: client calls `ExecuteCloudScript("BuyItem")` → script reads currency via Server API → validates → deducts → returns
- No automatic checksum verification, no deterministic re-execution
- Multiplayer Servers (MPS) is a separate service for hosting custom game server binaries — not connected to the backend API validation
- Developer must manually implement every validation check

Source: learn.microsoft.com/en-us/gaming/playfab/live-service-management/service-gateway/automation/cloudscript/

## 2. Platform Integration

**Collection of independent microservices with separate APIs.**

- Player Data, Economy v2, Leaderboards, Multiplayer (MPS, Party, Lobby), CloudScript, PlayStream, Authentication, Groups, Experiments — each a separate service
- Each has own API surface, rate limits, data storage, and sometimes own pricing
- Economy v2 was separately rebuilt for scalability
- Leaderboards and Statistics recently rewritten as independent services
- "Classic" and "entity" API systems coexist with separate data stores
- Docs state: "the data that the two APIs 'see' are separate"

Source: learn.microsoft.com/en-us/gaming/playfab/live-service-management/game-configuration/entities/

## 3. Source Code Access

**Client SDKs only — server platform and dashboard are closed.**

- Client SDKs on GitHub (auto-generated): Unity, Unreal, C#, C++, Java
- GSDK (Game Server SDK for MPS) open source
- SDKGenerator tool open source
- Backend service entirely closed-source cloud service operated by Microsoft
- Game Manager dashboard closed-source
- Cannot inspect, modify, or debug server-side processing

Source: github.com/playfab

## 4. Shared Client-Server Logic

**No shared logic — shared SDK package contains API wrappers, not game logic.**

- C# PlayFabSDK NuGet package contains client, server, and admin API wrappers in one package
- This is shared API call signatures, not shared game logic execution
- Client code and server code (CloudScript) are entirely separate codebases
- No deterministic execution guarantees

Source: learn.microsoft.com/en-us/gaming/playfab/sdks/c-sharp/

## 5. Game Config Management

**Key-value Title Data (strings/JSON).**

- Title Data: key/value pairs changeable without deploying builds
- Three namespaces: Primary (client-accessible), Internal (server-only), Override (experiments)
- Values are strings (can contain JSON)
- No structured pipeline, no spreadsheet integration, no config diffing
- No typed objects — developer parses strings/JSON client-side

Source: learn.microsoft.com/en-us/gaming/playfab/live-service-management/game-configuration/titledata/

## 6. Operations Tooling

**Game Manager — fixed SaaS dashboard, no code-level customization.**

- Closed-source web dashboard hosted by Microsoft
- Sections: Build / Engage / Analyze
- Player lookup, title data management, economy config, A/B tests, segments, push notifications, PlayStream viewer, basic KPIs
- 80+ granular permissions for role-based access
- NOT customizable at the code level — cannot add pages, modify views, or inject components
- For custom admin tooling, build separate application using PlayFab REST APIs
- Data Explorer for custom queries (SQL-like language)

Source: learn.microsoft.com/en-us/gaming/playfab/live-service-management/gamemanager/

## 7. Infrastructure Ownership

**Fully managed by Microsoft — no self-hosting of backend.**

- No option to self-host PlayFab backend service
- Data resides in Microsoft's cloud
- MPS supports "externally hosted servers" for game servers only (not backend APIs)
- Different Azure regions available but no infrastructure control
- Vendor lock-in: no data portability tools beyond GDPR export

Source: playfab.com/pricing/

## Architecture Summary Label

**Managed microservices platform** — collection of Azure services with CloudScript extension, client SDK source only

# brainCloud — Architecture Research

Last updated: 2026-02-16
Sources: getbraincloud.com, docs.braincloudservers.com, help.getbraincloud.com, github.com/getbraincloud

## 1. Server Authority Model

**Script-mediated — per-API-call restrictions with Cloud Code hooks for enforcement.**

- brainCloud does not implement structural server authority (no deterministic re-execution, no client-server state checksums)
- Server authority is achieved by restricting which API methods clients can call vs. which require Cloud Code (server-side JavaScript) or S2S
- Individual API methods are flagged as client-callable or cloud-code-only; e.g., `AwardUserItem()` was retroactively restricted to server-only in 5.1 ([Compatibility Settings](https://help.getbraincloud.com/en/articles/9047402-understanding-the-compatibility-settings-for-your-app))
- **Cloud Code scripts** can be marked as "Client Callable" (true/false) and "S2S Callable" independently ([Scripts docs](https://help.getbraincloud.com/en/articles/3272479-design-cloud-code-scripts-legacy))
- **Pre-hooks** execute before a Client API call: can modify parameters via `messageOverride`, or reject the call entirely by returning an error ([API Hooks](https://docs.braincloudservers.com/api/cc/writingscripts/apihooks))
- **Post-hooks** execute after a successful API call: can modify the returned data before it reaches the client
- **Post-fail-hooks** execute after a failed API call: can override the failure (return status 200) or let the original error pass through
- **S2S API** provides privileged server-to-server access; authenticated via appId + serverId + secret, with IP-range whitelisting recommended for production ([S2S docs](https://docs.braincloudservers.com/api/s2s/))
- S2S scripts run in app context (no user session), so no user authentication required
- Custom external servers must be declared in the portal ("My Servers") before making S2S calls; IP ranges restrict access ([My Servers](https://help.getbraincloud.com/en/articles/3089652-web-services-and-my-servers))

**Compared to structural server authority:** brainCloud relies on per-call access control and script hooks rather than re-executing game logic server-side. The developer must explicitly restrict each sensitive API call and write validation Cloud Code. There is no automatic client-server state verification.

## 2. Platform Integration

**Single integrated BaaS platform — unified portal, unified API, 30+ feature modules.**

- Marketed as "the most flexible and feature-rich backend for games, apps and things" ([getbraincloud.com](https://getbraincloud.com/))
- Features are organized into 6 primary categories: Analytics, Leaderboards, LiveOps, Messaging, Multiplayer, Cloud Control & Cloud Security ([Features](https://getbraincloud.com/features/))
- Additional feature modules include: Authentication, Blockchain, Chat, Cloud Code, Cloud Data, Custom Entities, Files, Friends, Gamification, Groups, Hosting, Integrations, Items, Lobbies, Mail, Messaging, Monetization, Push Notifications, Relay Servers, Segments, Tournaments — approximately 34+ distinct features total
- All features accessible through a single REST API; client SDKs wrap this API in language-native calls
- Single Design Portal provides unified access to all configuration, monitoring, and reporting
- Multiplayer modes: Turn-by-Turn Async, Real-Time Technology (RTT) for synchronous play, Relay Servers (message relay without logic), Room Servers (custom Docker game logic launched from lobbies)
- Room Servers deployed as Docker containers; configured via portal with Docker registry/repo, containers-per-server, and min-ready-container settings ([Room Servers](https://help.getbraincloud.com/en/articles/4458386-how-to-run-room-servers-from-braincloud))

## 3. Source Code Access

**Client libraries: open source on GitHub. Server platform and dashboard: closed source.**

- GitHub organization: [github.com/getbraincloud](https://github.com/getbraincloud)
- **Open-source client libraries:**
  - C# (Unity/Godot): [braincloud-csharp](https://github.com/getbraincloud/braincloud-csharp)
  - C++: [braincloud-cpp](https://github.com/getbraincloud/braincloud-cpp)
  - JavaScript: [braincloud-js](https://github.com/getbraincloud/braincloud-js)
  - Java: [braincloud-java](https://github.com/getbraincloud/braincloud-java)
  - Objective-C: [braincloud-objc](https://github.com/getbraincloud/braincloud-objc)
  - Unreal Engine plugin: [braincloud-unreal](https://github.com/getbraincloud/braincloud-unreal)
- **Example projects** on GitHub: Unity examples, Unreal examples, JavaScript examples, cloud code examples ([examples-cloudcode](https://github.com/getbraincloud/examples-cloudcode))
- **Room server tooling**: [braincloud-roomserver-devtool](https://github.com/getbraincloud/braincloud-roomserver-devtool) and Unreal dedicated server example ([braincloud-roomserver-unreal](https://github.com/getbraincloud/braincloud-roomserver-unreal))
- **Documentation source**: [braincloud-docs](https://github.com/getbraincloud/braincloud-docs) — Next-gen API reference
- **Not available**: server platform source code, Design Portal source code, backend infrastructure code — none visible in public GitHub repos

## 4. Shared Client-Server Logic

**No shared logic — Cloud Code runs JavaScript (Rhino), clients are typically C#/C++/etc.**

- Cloud Code runs on Mozilla Rhino, an open-source JavaScript engine written in Java ([Cloud Code background](https://getbraincloud.com/apidocs/cloud-code-central/cloud-code-tutorials/cloud-code-tutorial-background/))
- Unity clients use C#; Unreal clients use C++/Blueprints — no language overlap with server-side JavaScript
- The JavaScript client library ([braincloud-js](https://github.com/getbraincloud/braincloud-js)) is for browser/Node.js apps, not for sharing logic with Cloud Code scripts
- Cloud Code scripts access brainCloud APIs through a `bridge` object that provides service proxies; this bridge is server-only and has no client equivalent ([Bridge docs](https://help.getbraincloud.com/en/articles/103650-what-is-a-bridge))
- Unity clients call Cloud Code via `_bc.ScriptService.RunScript(scriptName, jsonData, success, failure)` — a remote invocation, not shared execution
- **Shared scripts** exist only server-to-server: `bridge.include("scriptname.ccjs")` allows one Cloud Code script to include another; includes are processed at load time and cached ([SharedScripts](https://docs.braincloudservers.com/learn/cloud-code-central/handy-cloud-code-scripts/sharedscripts/))
- Include rules: `bridge.include()` calls must be at the top of the script; relative paths within the same folder; scripts must be within the same app
- Legacy workaround: storing shared JavaScript functions in a Global Property and retrieving via `bridge.getGlobalProperty()` — limited to ~20-25KB

## 5. Game Config Management

**Key-value Global Properties — string-stored, category-organized, no structured pipeline.**

- Global Properties are set at design-time in the portal at Design | Custom Config | Global Properties ([Global Properties](https://help.getbraincloud.com/en/articles/9074354-design-cloud-data-global-properties))
- Each property has: Name, Category, Type, Description
- **All values stored as strings**, regardless of declared type — "the data itself is stored as a String and left to the client to interpret" ([Cloud Data docs](https://docs.braincloudservers.com/5.8.0/learn/key-concepts/data/))
- Values can be simple strings or JSON objects (serialized as strings)
- Developers must "agree in advance if the value will be a float, integer or boolean, or something more complex"
- Categories group related properties for organization
- **Deployment flag**: "Preserve value during deploy" controls whether a property value is overwritten when deploying configuration between apps
- Clients retrieve all properties via `ReadProperties` API call, typically at app startup
- Best practice per docs: use number-range properties over text, include descriptions showing how changes affect gameplay, document recommended defaults and acceptable ranges
- No built-in config pipeline (no spreadsheet import, no typed schemas, no compile step, no content-hash versioning, no diff review)
- **Additional data systems**: Global Entities (JSON documents with ACL), Custom Entities (scalable MongoDB-backed collections with indexing, migration support, "Migrate" checkbox per collection type) — but these are data storage, not structured config delivery

## 6. Operations Tooling

**Integrated Design Portal — 4-in-1 tool: Design, API Explorer, Monitoring, Reporting.**

- **Design section**: configure all app features, cloud code scripts, API hooks, integrations, multiplayer settings, virtual currencies, products, push notifications ([Portal intro](https://docs.braincloudservers.com/learn/introduction/design-portal/))
- **API Explorer**: query any brainCloud API interactively without writing code; useful for debugging and testing API calls live against your app ([API Explorer](https://help.getbraincloud.com/en/articles/9044411-design-cloud-code-api-explorer))
- **S2S Explorer**: similar to API Explorer but for server-to-server calls ([S2S Explorer](https://help.getbraincloud.com/en/articles/3272486-design-cloud-code-s2s-explorer))
- **User Monitoring**: find individual users, inspect all data — achievements, attributes (key-value tags), user statistics, user entities, purchase history, currency tracking over time ([User Monitoring](https://docs.braincloudservers.com/5.1.0/learn/portal-tutorials/user-monitoring/))
- **User logs**: view all recent API requests and responses per user, including date/time, packet ID (with raw request view), session ID ([Logs](https://docs.braincloudservers.com/learn/portal-tutorials/user-monitoring/logs/))
- **Player Inspector**: currency tracking over time, purchase history, activity logs, user flagging, compensation issuance ([Cloud Code & Security](https://getbraincloud.com/feature/cloud-code-and-cloud-security/))
- **Global Monitoring**: global entities, global data, recent error logs ([Error Logs](https://help.getbraincloud.com/en/articles/9174331-global-logs-recent-error-logs))
- **Reporting**: cross-platform analytics, DAU dashboard, sales-at-a-glance, API usage reports for understanding usage and performance
- **Role-based access**: Developers (app creation, API testing, cloud code, data management), Designers (XP, achievements, milestones, quests, leaderboards), Product Managers (products, promotions, analytics, segments)
- **Admin Tools page**: export/import configuration as `.bcconfig` files, deploy config between apps within a team, export custom files as `.bcfiles` or `.bcglob` ([Migration](https://help.getbraincloud.com/en/articles/4486527-how-to-migrate-an-app-across-braincloud-instances))
- **Not customizable**: no source access to the portal; no plugin/extension API for the dashboard; role-based access is the extent of customization

## 7. Infrastructure Ownership

**Managed multi-tenant cloud; private instances available for enterprise licensees. No self-hosting of the platform itself.**

- Default deployment: multi-tenant hosted service at api.braincloudservers.com
- **Private instances**: available for enterprise licensees — "your own fully-managed brainCloud instance hosted in your own cloud environment" ([Publisher Backend](https://getbraincloud.com/publisher-backend/))
- Private instances are still multi-tenant by design: "Even our private BaaS offering is multi-tenant" — publishers can manage multiple dev studios within one instance
- Private instances provide "deep and direct access to all data" with MongoDB Atlas integration
- Supported cloud providers: AWS (EKS, S3, CloudFront), Google Cloud (GKE, Cloud Storage), Azure (AKS, Azure Storage) ([Pricing](https://getbraincloud.com/pricing/))
- Big Fish Games operates a private brainCloud instance on GCP ([Big Fish docs](https://docs.bigfishgames.com/docs/developer/tools-braincloud))
- **Licensee program**: publishers/large studios get private instances; dev studios can prepare apps on public brainCloud, then migrate to publisher's private instance when deals are finalized
- **Migration**: export `.bcconfig` + `.bcfiles` + Global Entities JSON from source; import into target instance; Custom Entities with "Migrate" flag transfer data; service app dependencies must be migrated first
- **No self-hosting**: brainCloud manages all instances; there is no downloadable server binary or Helm chart for self-operated infrastructure
- Hosting costs for Room Servers: AWS charges + 25% markup + $0.03/hour ([Hosting Regions](https://help.getbraincloud.com/en/articles/3021192-hosting-regions-and-server-sizes))
- Enterprise plans include SLA coverage; support plans available for both public and private instances
- Pricing is elastic/consumption-based: API count billing from $5/month (Dev Plus) to $199/month (Business Plus), with Bulk+ pre-purchase discounts for high volume

## Architecture Summary Label

**Managed BaaS with script-mediated authority** — integrated feature platform, JavaScript Cloud Code on Rhino, client libraries open source but server closed source, no shared client-server logic, key-value config, private instances for enterprise but no self-hosting

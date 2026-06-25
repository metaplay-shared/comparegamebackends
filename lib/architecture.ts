export interface CellData {
  text: string;
  tooltip: string;
  sourceUrl: string;
}

// Architecture dimension data per backend, keyed by slug
export const architectureData: Record<string, Record<string, CellData>> = {
  metaplay: {
    serverAuthority: {
      text: 'Deterministic re-execution with checksum validation',
      tooltip: 'Client and server execute the same game logic independently. The server validates client actions by re-executing them deterministically and comparing checksums, catching cheats without round-trip latency.',
      sourceUrl: 'https://docs.metaplay.io/game-logic/deep-dive-game-logic-execution-model',
    },
    sharedLogic: {
      text: 'Same C# compiles to Unity client and .NET server',
      tooltip: 'Write game logic once in C# and compile it for both the Unity client (via IL2CPP) and the .NET server. No separate server codebase to maintain or keep in sync.',
      sourceUrl: 'https://docs.metaplay.io/game-logic/deep-dive-game-logic-execution-model',
    },
    integration: {
      text: 'Single integrated platform (actor model)',
      tooltip: 'All features (player state, configs, analytics, matchmaking) run inside a single actor-model server. No service mesh, API gateways, or cross-service coordination needed.',
      sourceUrl: 'https://docs.metaplay.io/game-server-programming/introduction-to-the-game-server-architecture',
    },
    sourceAccess: {
      text: 'Full source: server, client SDK, and dashboard',
      tooltip: 'Complete source code access to the server runtime, Unity SDK, and LiveOps dashboard. Modify, debug, and extend any component without waiting on vendor support.',
      sourceUrl: 'https://docs.metaplay.io/introduction/introduction-to-metaplay',
    },
    configPipeline: {
      text: 'Spreadsheets \u2192 typed C# objects \u2192 OTA binary delivery',
      tooltip: 'Game designers edit spreadsheets that compile into strongly-typed C# config objects. Configs are validated at build time and delivered over-the-air as optimized binary archives.',
      sourceUrl: 'https://docs.metaplay.io/feature-cookbooks/game-configs/working-with-game-configs',
    },
    dashboard: {
      text: 'Vue.js source available, designed to be extended',
      tooltip: 'The LiveOps dashboard is built with Vue.js and ships with full source code. Teams can add custom pages, player management tools, and game-specific workflows directly.',
      sourceUrl: 'https://docs.metaplay.io/liveops-dashboard/introduction-to-the-liveops-dashboard',
    },
    deployment: {
      text: 'Managed cloud + self-hosted on your AWS',
      tooltip: 'Start with Metaplay-managed cloud hosting for fast onboarding. When ready, move to self-hosted deployment on your own AWS account with full infrastructure control via Helm charts.',
      sourceUrl: 'https://docs.metaplay.io/self-hosting/introduction-to-metaplay-cloud-infrastructure',
    },
    scalability: {
      text: 'Stateful actor model; ~1,000 CCU per vCPU',
      tooltip: 'Player state lives in-memory as actors, eliminating database round-trips for reads. This yields high density (~1,000 CCU per vCPU) and predictable per-player resource costs.',
      sourceUrl: 'https://docs.metaplay.io/self-hosting/introduction-to-metaplay-cloud-infrastructure',
    },
    devExperience: {
      text: 'dotnet run starts full server locally',
      tooltip: 'Run the complete backend on your development machine with a single dotnet command. Debug server logic with breakpoints, test configs, and iterate without deploying to the cloud.',
      sourceUrl: 'https://docs.metaplay.io/introduction/getting-started/',
    },
    aiCapabilities: {
      text: 'Strong dev tooling (Agent + MCP); no in-product ML',
      tooltip: 'Metaplay Agent installs SDK skills for coding agents, with Docs and Portal MCP servers and the MetaplayGPT chatbot. Live-game systems (matchmaking, segmentation, analytics) are rules-based, not ML; Metaplay frames its AI as developer tooling, "AI-ready" rather than "AI-powered".',
      sourceUrl: 'https://docs.metaplay.io/miscellaneous/ai-assistants/',
    },
  },
  playfab: {
    serverAuthority: {
      text: 'Developer writes CloudScript or Azure Functions',
      tooltip: 'Server-side validation is implemented by writing CloudScript (legacy JavaScript) or Azure Functions. Each API call can trigger custom server logic, but there is no built-in deterministic execution.',
      sourceUrl: 'https://learn.microsoft.com/en-us/gaming/playfab/live-service-management/service-gateway/automation/cloudscript/',
    },
    sharedLogic: {
      text: 'Separate codebases (client vs CloudScript)',
      tooltip: 'Client code (C#, C++, etc.) and server code (CloudScript JS or Azure Functions C#) are maintained as separate projects. Logic duplication or REST-based validation is required.',
      sourceUrl: 'https://learn.microsoft.com/en-us/gaming/playfab/sdks/sdk-overview',
    },
    integration: {
      text: 'Collection of independent Azure microservices',
      tooltip: 'Each feature (player data, leaderboards, economy, matchmaking) is a separate Azure-hosted service accessed via independent REST APIs. Cross-feature workflows require orchestration.',
      sourceUrl: 'https://learn.microsoft.com/en-us/gaming/playfab/what-is-playfab',
    },
    sourceAccess: {
      text: 'Client SDKs only; server and dashboard closed',
      tooltip: 'Client SDKs are open source on GitHub, but the server runtime, CloudScript engine, and Game Manager dashboard are closed-source Microsoft services.',
      sourceUrl: 'https://github.com/PlayFab',
    },
    configPipeline: {
      text: 'Key-value title data stored as strings',
      tooltip: 'Game configuration is stored as string key-value pairs in Title Data. No built-in typing, schema validation, or binary compilation \u2014 parsing and validation is handled client-side.',
      sourceUrl: 'https://learn.microsoft.com/en-us/gaming/playfab/live-service-management/game-configuration/titledata/',
    },
    dashboard: {
      text: 'Fixed SaaS dashboard (Game Manager)',
      tooltip: 'Game Manager provides a web UI for player lookup, economy management, and analytics. The dashboard is not extensible \u2014 custom tooling requires the REST API.',
      sourceUrl: 'https://learn.microsoft.com/en-us/gaming/playfab/gamemanager/',
    },
    deployment: {
      text: 'Managed only (Microsoft Azure)',
      tooltip: 'PlayFab runs exclusively on Microsoft Azure infrastructure. There is no self-hosting option \u2014 all data and compute stays within Azure\u2019s multi-tenant environment.',
      sourceUrl: 'https://playfab.com/pricing/',
    },
    scalability: {
      text: 'Azure-managed horizontal scaling',
      tooltip: 'Scaling is handled automatically by Azure infrastructure. PlayFab abstracts away capacity planning, but developers have limited visibility into scaling behavior or resource allocation.',
      sourceUrl: 'https://learn.microsoft.com/en-us/gaming/playfab/what-is-playfab',
    },
    devExperience: {
      text: 'Cloud-only; no local backend server',
      tooltip: 'All backend logic runs in the cloud. There is no local development server \u2014 testing CloudScript or Azure Functions requires deploying to PlayFab\u2019s cloud environment.',
      sourceUrl: 'https://learn.microsoft.com/en-us/gaming/playfab/sdks/sdk-overview',
    },
    aiCapabilities: {
      text: 'GA in-product ML; dev assistant in preview',
      tooltip: 'Azure-ML churn prediction feeds segmentation, and PlayFab Party adds real-time translation plus Azure AI Content Safety text moderation, all generally available. The PlayFab Copilot developer assistant in Game Manager remains in private preview.',
      sourceUrl: 'https://learn.microsoft.com/en-us/gaming/playfab/features/analytics/churn-prediction/overview',
    },
  },
  'heroic-labs': {
    serverAuthority: {
      text: 'Developer-written match handler callbacks',
      tooltip: 'Server authority is implemented through custom match handler functions written in Go, Lua, or TypeScript. Developers write callbacks for match init, join, leave, loop, and terminate events.',
      sourceUrl: 'https://heroiclabs.com/docs/nakama/concepts/multiplayer/authoritative/',
    },
    sharedLogic: {
      text: 'TypeScript reuse possible, not deterministic',
      tooltip: 'If both client and server use TypeScript, some logic can be shared. However, there is no deterministic execution guarantee \u2014 the server cannot validate client state by re-execution.',
      sourceUrl: 'https://heroiclabs.com/docs/nakama/server-framework/typescript-runtime/',
    },
    integration: {
      text: 'Three separate products (Nakama + Satori + Hiro)',
      tooltip: 'Nakama handles multiplayer and player data. Satori adds live ops and analytics. Hiro provides game system templates. Each product has its own API, dashboard, and deployment.',
      sourceUrl: 'https://heroiclabs.com/about/',
    },
    sourceAccess: {
      text: 'Nakama server open source (Apache 2.0)',
      tooltip: 'The Nakama server core is fully open source under Apache 2.0. However, Satori (live ops) and enterprise clustering features are closed-source commercial products.',
      sourceUrl: 'https://github.com/heroiclabs/nakama',
    },
    configPipeline: {
      text: 'No built-in system; Satori feature flags optional',
      tooltip: 'Nakama has no native game config pipeline. Satori adds feature flags and remote configuration as a separate paid product, but there is no spreadsheet-to-binary pipeline.',
      sourceUrl: 'https://heroiclabs.com/docs/nakama/guides/deployment/remote-configuration/',
    },
    dashboard: {
      text: 'Two fixed dashboards (Nakama Console + Satori)',
      tooltip: 'Nakama includes a built-in admin console for player and match management. Satori has a separate dashboard for live ops. Neither dashboard is designed for customization.',
      sourceUrl: 'https://heroiclabs.com/docs/nakama/getting-started/console/',
    },
    deployment: {
      text: 'Self-hosted (free) or Heroic Cloud',
      tooltip: 'Run Nakama on your own infrastructure for free (Docker or bare metal). Heroic Cloud offers a managed option. Enterprise clustering for high-scale requires a commercial license.',
      sourceUrl: 'https://heroiclabs.com/pricing/',
    },
    scalability: {
      text: 'Single node ~10K CCU; Enterprise for clustering',
      tooltip: 'A single Nakama node handles roughly 10K concurrent users. Multi-node clustering for higher scale is only available in the Enterprise (paid) tier.',
      sourceUrl: 'https://github.com/heroiclabs/nakama',
    },
    devExperience: {
      text: 'Docker Compose local setup',
      tooltip: 'Local development uses Docker Compose to run Nakama alongside CockroachDB. Server logic is written in Go, Lua, or TypeScript and hot-reloaded during development.',
      sourceUrl: 'https://heroiclabs.com/docs/nakama/getting-started/docker-quickstart/',
    },
    aiCapabilities: {
      text: 'Satori ML via Databricks; minimal dev AI',
      tooltip: 'The Satori plus Databricks integration runs ML for churn, LTV and spend forecasting, and engagement analysis, plus GenAI dataset queries. Developer-facing AI is limited to LLM-optimized docs; the Nakama MCP server is community-built, not official.',
      sourceUrl: 'https://heroiclabs.com/docs/satori/guides/satori-databricks/',
    },
  },
  'aws-gamelift': {
    serverAuthority: {
      text: 'Hosts developer-built server binary (no game logic)',
      tooltip: 'GameLift deploys and manages your compiled server binary but provides no game logic framework. You build the authoritative server yourself using any engine or language.',
      sourceUrl: 'https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-howitworks.html',
    },
    sharedLogic: {
      text: 'Separate codebases; developer builds everything',
      tooltip: 'GameLift is infrastructure-only. Client and server codebases are entirely separate projects managed by the developer. No shared-logic tooling is provided.',
      sourceUrl: 'https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-intro.html',
    },
    integration: {
      text: 'Server hosting only; assemble other AWS services',
      tooltip: 'GameLift handles dedicated server fleet management and matchmaking (FlexMatch). For player data, economy, analytics, and live ops, you integrate other AWS services yourself.',
      sourceUrl: 'https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-intro.html',
    },
    sourceAccess: {
      text: 'Server SDKs open source (Apache 2.0)',
      tooltip: 'The GameLift Server SDK (C++, C#, Go, Unreal plugin) is open source. The fleet management service itself is closed-source AWS infrastructure.',
      sourceUrl: 'https://github.com/amazon-gamelift',
    },
    configPipeline: {
      text: 'None \u2014 use AWS AppConfig or DynamoDB',
      tooltip: 'GameLift has no game config system. Teams typically use AWS AppConfig for feature flags or DynamoDB for runtime configuration, but must build the pipeline themselves.',
      sourceUrl: 'https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-intro.html',
    },
    dashboard: {
      text: 'AWS Console (infrastructure management only)',
      tooltip: 'Fleet status, instance health, and matchmaking metrics are visible in the AWS Console. There is no player management, content management, or game-specific LiveOps tooling.',
      sourceUrl: 'https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-console-fleets.html',
    },
    deployment: {
      text: 'AWS managed fleets + Anywhere (hybrid)',
      tooltip: 'Run on AWS-managed EC2 fleets or use GameLift Anywhere to integrate on-premises or other cloud hardware into the same fleet management and matchmaking system.',
      sourceUrl: 'https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-intro-flavors.html',
    },
    scalability: {
      text: 'EC2 auto-scaling fleets with Spot instances',
      tooltip: 'Fleets auto-scale based on player demand using EC2 instances. Spot instance support reduces costs by up to 90% for interruptible workloads, with automatic fallback to on-demand.',
      sourceUrl: 'https://docs.aws.amazon.com/gameliftservers/latest/developerguide/fleets-autoscaling.html',
    },
    devExperience: {
      text: 'Local testing via GameLift Anywhere',
      tooltip: 'GameLift Anywhere lets you register your local machine as a fleet instance for testing matchmaking and server integration without deploying to AWS.',
      sourceUrl: 'https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-intro-flavors.html',
    },
    aiCapabilities: {
      text: 'Console AI assistant; ML matchmaking is DIY',
      tooltip: 'Amazon Q Developer powers an AI console assistant (Dec 2025) for integration and troubleshooting. FlexMatch matchmaking is rule-based; adding ML skill ratings is a developer-built Amazon SageMaker pattern, not a built-in feature.',
      sourceUrl: 'https://aws.amazon.com/about-aws/whats-new/2025/12/gamelift-servers-console-developers-ai-powered/',
    },
  },
  'unity-gaming-services': {
    serverAuthority: {
      text: 'Serverless Cloud Code validation scripts',
      tooltip: 'Server-side logic runs as Cloud Code scripts (JavaScript) or modules (C#) in a serverless environment. Scripts validate client requests but don\u2019t maintain persistent game state.',
      sourceUrl: 'https://docs.unity.com/ugs/en-us/manual/cloud-code/manual/server-access-control',
    },
    sharedLogic: {
      text: 'Partial \u2014 shared .NET types only, not execution',
      tooltip: 'Cloud Code modules can reference shared .NET types for data contracts, but client and server don\u2019t execute the same logic. No deterministic re-execution or state synchronization.',
      sourceUrl: 'https://docs.unity.com/ugs/en-us/manual/cloud-code/manual/modules/how-to-guides/module-structure',
    },
    integration: {
      text: 'Suite of independent cloud services',
      tooltip: 'UGS consists of separate services (Cloud Code, Cloud Save, Economy, Remote Config, etc.) each with its own API. Services communicate via REST calls, not a shared runtime.',
      sourceUrl: 'https://docs.unity.com/ugs/en-us/manual/overview/manual/unity-dashboard-introduction',
    },
    sourceAccess: {
      text: 'Mostly closed; Netcode for GameObjects open source',
      tooltip: 'Backend services are closed-source Unity SaaS. The Netcode for GameObjects networking library is open source on GitHub, but it handles client networking, not backend logic.',
      sourceUrl: 'https://github.com/Unity-Technologies/com.unity.netcode.gameobjects',
    },
    configPipeline: {
      text: 'Key-value Remote Config with JSON schema',
      tooltip: 'Remote Config stores key-value pairs with optional JSON schema validation. Supports targeting rules and A/B testing, but lacks spreadsheet import or typed object compilation.',
      sourceUrl: 'https://docs.unity.com/ugs/en-us/manual/remote-config/manual/WhatsRemoteConfig',
    },
    dashboard: {
      text: 'Fixed SaaS dashboard (Unity Dashboard)',
      tooltip: 'The Unity Dashboard provides web-based management for all UGS services. It is a standard SaaS interface with no source code access or extensibility beyond the provided REST APIs.',
      sourceUrl: 'https://docs.unity.com/ugs/en-us/manual/overview/manual/unity-dashboard-introduction',
    },
    deployment: {
      text: 'Managed only (Unity cloud)',
      tooltip: 'All UGS services run exclusively on Unity\u2019s cloud infrastructure. There is no self-hosting option \u2014 the platform is tightly coupled to Unity\u2019s multi-tenant environment.',
      sourceUrl: 'https://unity.com/products/gaming-services/pricing',
    },
    scalability: {
      text: 'Serverless auto-scaling per service',
      tooltip: 'Each service scales independently in Unity\u2019s serverless environment. Developers don\u2019t manage capacity, but also have no control over scaling behavior or resource limits.',
      sourceUrl: 'https://docs.unity.com/ugs/en-us/manual/cloud-code/manual/scripts/getting-started',
    },
    devExperience: {
      text: 'Cloud-only for backend services',
      tooltip: 'Backend logic must be deployed to Unity\u2019s cloud for testing. The Unity Editor integrates with UGS services, but there is no local backend server for offline development.',
      sourceUrl: 'https://docs.unity.com/ugs/en-us/manual/cloud-code/manual/scripts/getting-started',
    },
    aiCapabilities: {
      text: 'Backend AI moderation; engine-side Unity AI',
      tooltip: 'Within UGS, Safe Text and Safe Voice provide AI text and voice moderation through Vivox. Engine-side Unity AI (open beta, which replaced Muse) and the on-device Inference Engine add development and runtime AI. Matchmaker and analytics are rule-based.',
      sourceUrl: 'https://unity.com/products/safe-voice',
    },
  },
  colyseus: {
    serverAuthority: {
      text: 'Server-owned state with delta sync',
      tooltip: 'The server owns the authoritative game state. State changes are automatically tracked and sent to clients as binary delta patches, minimizing bandwidth usage.',
      sourceUrl: 'https://docs.colyseus.io/state/',
    },
    sharedLogic: {
      text: 'Schema definitions shared (JS/TS); codegen for C#',
      tooltip: 'State schema definitions written in TypeScript are shared between client and server. C# and other client SDKs use auto-generated code from the schema, but game logic is server-only.',
      sourceUrl: 'https://docs.colyseus.io/state/schema/',
    },
    integration: {
      text: 'Multiplayer framework only; no backend features',
      tooltip: 'Colyseus handles real-time rooms and state sync. For player persistence, authentication, economy, analytics, and live ops, you must integrate third-party services or build your own.',
      sourceUrl: 'https://docs.colyseus.io/database/',
    },
    sourceAccess: {
      text: 'Full source (MIT license)',
      tooltip: 'The entire Colyseus framework is open source under the MIT license. You can fork, modify, and deploy without any licensing restrictions.',
      sourceUrl: 'https://github.com/colyseus/colyseus',
    },
    configPipeline: {
      text: 'None \u2014 build your own',
      tooltip: 'Colyseus provides no game configuration system. Teams must build their own config pipeline using databases, file systems, or third-party services.',
      sourceUrl: 'https://docs.colyseus.io/database/',
    },
    dashboard: {
      text: 'Basic monitoring panel (@colyseus/monitor)',
      tooltip: 'The @colyseus/monitor package provides a simple web panel showing active rooms and connected clients. It is a debugging tool, not a LiveOps dashboard.',
      sourceUrl: 'https://docs.colyseus.io/tools/monitoring/',
    },
    deployment: {
      text: 'Self-hosted (free) or Colyseus Cloud',
      tooltip: 'Deploy anywhere Node.js runs (VPS, containers, bare metal) for free. Colyseus Cloud offers managed hosting with auto-scaling as a paid alternative.',
      sourceUrl: 'https://colyseus.io/pricing/',
    },
    scalability: {
      text: 'Vertical only; horizontal via Redis (roadmap)',
      tooltip: 'A single Colyseus process scales vertically. Multi-process scaling requires manual room distribution. Native Redis-based horizontal scaling is on the roadmap but not yet production-ready.',
      sourceUrl: 'https://docs.colyseus.io/scalability/',
    },
    devExperience: {
      text: 'npm create, instant local server',
      tooltip: 'Scaffold a new project with npm create colyseus-app and start the server instantly. The lightweight Node.js runtime makes local iteration fast with no external dependencies.',
      sourceUrl: 'https://docs.colyseus.io/',
    },
    aiCapabilities: {
      text: 'None beyond an llms.txt docs index',
      tooltip: 'No platform AI. The docs site serves an official llms.txt index for AI coding agents, and a documentation MCP server exists but is community-built. Matchmaking is rule-based, with no built-in moderation or ML.',
      sourceUrl: 'https://docs.colyseus.io/llms.txt',
    },
  },
  braincloud: {
    serverAuthority: {
      text: 'API restrictions + JavaScript pre/post hooks',
      tooltip: 'Server authority is enforced through API access controls and Cloud Code scripts (JavaScript) that run as pre/post hooks on API calls. No persistent server-side game loop.',
      sourceUrl: 'https://docs.braincloudservers.com/api/cc/writingscripts/apihooks',
    },
    sharedLogic: {
      text: 'Separate codebases (JS server, C#/C++ clients)',
      tooltip: 'Cloud Code runs JavaScript on the server while clients use C#, C++, Java, or other SDKs. Logic must be duplicated or validated via API calls between the two.',
      sourceUrl: 'https://docs.braincloudservers.com/learn/cloud-code-central/cloud-code-tutorials/',
    },
    integration: {
      text: 'Single integrated platform (30+ features)',
      tooltip: 'brainCloud bundles authentication, player data, matchmaking, economy, push notifications, and 30+ other features into one platform accessed through a unified API.',
      sourceUrl: 'https://getbraincloud.com/features/',
    },
    sourceAccess: {
      text: 'Client libraries only; server and portal closed',
      tooltip: 'Client SDKs for multiple platforms are available on GitHub. The server runtime and Design Portal are fully closed-source hosted services.',
      sourceUrl: 'https://github.com/getbraincloud',
    },
    configPipeline: {
      text: 'Key-value string properties with categories',
      tooltip: 'Global Properties store string key-value pairs organized by categories. No built-in typing, schema validation, or compilation step \u2014 values are parsed at runtime by the client.',
      sourceUrl: 'https://docs.braincloudservers.com/learn/key-concepts/data/',
    },
    dashboard: {
      text: 'Fixed integrated portal (Design + Monitor + Report)',
      tooltip: 'The Design Portal provides game configuration, real-time monitoring, and reporting in one interface. It covers most operations but is not extensible or customizable.',
      sourceUrl: 'https://docs.braincloudservers.com/learn/introduction/design-portal/',
    },
    deployment: {
      text: 'Managed cloud; private instances for enterprise',
      tooltip: 'Standard deployments run on brainCloud\u2019s multi-tenant cloud. Enterprise customers can request private dedicated instances for data isolation requirements.',
      sourceUrl: 'https://getbraincloud.com/publisher-backend/',
    },
    scalability: {
      text: 'Managed multi-tenant; elastic API billing',
      tooltip: 'brainCloud manages all scaling internally across its multi-tenant infrastructure. Pricing is based on API call volume, which scales elastically with player activity.',
      sourceUrl: 'https://getbraincloud.com/pricing/',
    },
    devExperience: {
      text: 'Cloud-only development',
      tooltip: 'All backend logic runs in brainCloud\u2019s cloud. Cloud Code scripts are edited in the Design Portal or uploaded via API. No local server available for offline development.',
      sourceUrl: 'https://docs.braincloudservers.com/learn/introduction/',
    },
    aiCapabilities: {
      text: 'brainBot portal assistant; no first-party ML',
      tooltip: 'brainCloud 6.0 added brainBot, a Claude-powered assistant in the Design Portal that writes Cloud Code, configures integrations, and helps with LiveOps. There is no first-party ML; profanity moderation is a third-party WebPurify integration.',
      sourceUrl: 'https://getbraincloud.com/features/brainbot/',
    },
  },
  accelbyte: {
    serverAuthority: {
      text: 'Orchestrates developer-built dedicated servers',
      tooltip: 'AccelByte\u2019s Armada Management Service (AMS) deploys and scales your compiled game server binaries. Game logic is entirely developer-built; AccelByte handles orchestration.',
      sourceUrl: 'https://docs.accelbyte.io/gaming-services/modules/foundations/extend/',
    },
    sharedLogic: {
      text: 'Separate codebases (REST clients vs gRPC server)',
      tooltip: 'Client SDKs communicate with AccelByte services via REST. Custom backend extensions use gRPC. The two codebases are separate with no shared-logic tooling provided.',
      sourceUrl: 'https://docs.accelbyte.io/gaming-services/getting-started/setup-game-sdk/',
    },
    integration: {
      text: 'Modular microservices (Foundations + add-ons)',
      tooltip: 'AccelByte offers a foundation tier (IAM, player data, matchmaking) plus optional add-on modules (commerce, UGC, analytics). Each module is an independent microservice.',
      sourceUrl: 'https://docs.accelbyte.io/gaming-services/getting-started/technical-overview/',
    },
    sourceAccess: {
      text: 'SDKs + templates open; platform closed',
      tooltip: 'Client/server SDKs and Extend starter templates are open source on GitHub. The core platform services and admin portal are closed-source commercial software.',
      sourceUrl: 'https://github.com/AccelByte',
    },
    configPipeline: {
      text: 'CloudSave JSON records (no dedicated config service)',
      tooltip: 'Game configuration is typically stored in CloudSave as JSON documents. There is no dedicated config service with versioning, typing, or over-the-air delivery built in.',
      sourceUrl: 'https://docs.accelbyte.io/gaming-services/services/storage/cloud-save/',
    },
    dashboard: {
      text: 'Fixed admin portal + optional AIS analytics',
      tooltip: 'The admin portal covers player management, matchmaking config, and moderation. AccelByte Intelligence Service (AIS) adds analytics dashboards as an optional paid module.',
      sourceUrl: 'https://accelbyte.io/intelligence-service',
    },
    deployment: {
      text: 'Shared cloud, private cloud, or BYO AWS',
      tooltip: 'Choose from multi-tenant shared cloud, single-tenant private cloud, or bring-your-own AWS account. Each tier offers different levels of isolation and control.',
      sourceUrl: 'https://accelbyte.io/pricing',
    },
    scalability: {
      text: 'Microservices with per-namespace isolation',
      tooltip: 'Each game title runs in an isolated namespace with its own resource allocation. Individual microservices scale independently based on demand within that namespace.',
      sourceUrl: 'https://docs.accelbyte.io/gaming-services/getting-started/technical-overview/',
    },
    devExperience: {
      text: 'Cloud-only for platform services',
      tooltip: 'Platform services require cloud connectivity for development. The Extend SDK provides local scaffolding for custom extensions, but core services cannot run locally.',
      sourceUrl: 'https://docs.accelbyte.io/gaming-services/getting-started/',
    },
    aiCapabilities: {
      text: 'Two official MCP servers; thin in-product AI',
      tooltip: 'AccelByte ships two official MCP servers (Extend SDK and AGS API) for AI-assisted development with Claude and Cursor. In-product AI is limited to rule-based matchmaking and moderation, with the AccelByte Intelligence Service ML pipeline still on the roadmap.',
      sourceUrl: 'https://docs.accelbyte.io/gaming-services/modules/foundations/extend/app-in-depth-topics/extend-mcp-servers/',
    },
  },
};

export const dimensionLabels: { key: string; label: string }[] = [
  { key: 'serverAuthority', label: 'Server Authority' },
  { key: 'sharedLogic', label: 'Shared Logic' },
  { key: 'integration', label: 'Integration' },
  { key: 'sourceAccess', label: 'Source Access' },
  { key: 'configPipeline', label: 'Config Pipeline' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'deployment', label: 'Deployment' },
  { key: 'scalability', label: 'Scalability' },
  { key: 'devExperience', label: 'Dev Experience' },
  { key: 'aiCapabilities', label: 'AI Capabilities' },
];

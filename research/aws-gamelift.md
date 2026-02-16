# AWS GameLift

## Overview

Amazon GameLift Servers is a managed service for deploying, operating, and scaling dedicated game servers for session-based multiplayer games. It is built on AWS infrastructure and provides server fleet management, game session placement, player session tracking, matchmaking (FlexMatch), and auto-scaling. GameLift is **not** a game engine or application framework -- it is infrastructure orchestration for hosting game server binaries that developers build themselves.

GameLift was rebranded to "Amazon GameLift Servers" to distinguish it from the newer "Amazon GameLift Streams" (cloud game streaming service launched March 2025).

---

## 1. Server Authority Model

**GameLift does not provide or enforce a server-authoritative gameplay model. It hosts whatever server binary the developer uploads.**

- GameLift's role is fleet orchestration: it deploys game server executables to EC2 instances, manages their lifecycle, and routes players to available server processes. The game server binary manages game state, processes player actions, and synchronizes gameplay across connected players -- but **all of that logic is written entirely by the developer**.
  - Source: [How hosting works](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-howitworks.html)

- Each game server process can host one game session at a time. The server process communicates with the GameLift service via the Server SDK to report readiness, accept session assignments, and report health. The actual gameplay logic is opaque to GameLift.
  - Source: [Solution architecture](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-architecture.html)

- GameLift also offers **Realtime Servers**, a lightweight option where the server acts as a "stateless relay server" that relays packets between clients without evaluating messages or performing gameplay logic. Developers can optionally add custom server-side logic via Node.js JavaScript callbacks, but even then the developer writes all game logic.
  - Source: [Realtime Servers](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/realtime-intro.html)

### FlexMatch

FlexMatch is GameLift's matchmaking service. It operates **before** a game session starts -- it groups players into matches based on configurable rule sets, then hands the match off to a game session queue for placement.

- FlexMatch evaluates players using developer-defined rule sets containing team structures, player attributes (e.g., skill level), and matching rules (e.g., "similar skill averages", "same game map").
- It supports 2-200 concurrent players per match, expandable matching rules (gradually relax requirements over time), and match backfill for existing sessions.
- FlexMatch can run in two modes:
  - **Integrated mode**: Automatically places matches onto GameLift managed fleets via game session queues.
  - **Standalone mode**: Works with any hosting solution (including FleetIQ or non-AWS hosting), but the developer must implement a match placement service to coordinate with their hosting system.
- FlexMatch does **not** enforce server authority. It groups players; the game server handles everything after connection.
  - Source: [How FlexMatch works](https://docs.aws.amazon.com/gameliftservers/latest/flexmatchguide/gamelift-match.html), [FlexMatch intro](https://docs.aws.amazon.com/gameliftservers/latest/flexmatchguide/match-intro.html)

---

## 2. Platform Integration

**GameLift is a single-purpose service (game server hosting and matchmaking) within the broader AWS ecosystem. A complete game backend requires assembling multiple AWS services.**

GameLift provides:
- Fleet management (EC2 instances or containers)
- Game session placement and lifecycle management
- Player session tracking
- FlexMatch matchmaking
- Auto-scaling
- CloudWatch metrics

GameLift does **not** provide (developers must build or integrate separately):
- **Authentication**: Use Amazon Cognito or a custom solution.
- **Player data / persistence**: Use Amazon DynamoDB, Aurora DSQL, or similar.
- **Content storage**: Use Amazon S3.
- **Backend API layer**: Use AWS Lambda + API Gateway, or self-hosted services.
- **Voice chat**: Use Amazon Chime SDK.
- **Analytics**: Use Amazon Kinesis, S3, or custom pipelines.
- **Remote config / game config**: No built-in system (see Section 5).
- **Economy / inventory / leaderboards**: Build from scratch using AWS primitives.
  - Source: [What is GameLift Servers](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-intro.html)

The backend service is described in AWS documentation as a "coordination layer" between game clients and the GameLift service. It is a **custom service that the developer builds** -- typically using Lambda, API Gateway, and the AWS SDK -- to handle player authentication, matchmaking requests, session placement, and returning connection info to clients. GameLift provides no pre-built backend service.
  - Source: [Solution architecture](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-architecture.html)

### Related GameLift Products

- **GameLift FleetIQ**: A lower-level service that optimizes Spot Instance usage for game server hosting. Does **not** include matchmaking, session management, or latency-based routing -- developers keep full control of EC2 Auto Scaling Groups and integrate with their own backends.
  - Source: [What is FleetIQ](https://docs.aws.amazon.com/gameliftservers/latest/fleetiqguide/gsg-intro.html)

- **GameLift Streams** (launched March 2025): A separate product for cloud game streaming (pixel streaming) at up to 1080p/60fps via WebRTC. Not related to dedicated server hosting.
  - Source: [GameLift Streams](https://aws.amazon.com/gamelift/streams/)

---

## 3. Source Code Access

**The Server SDKs and associated tooling are open source (Apache 2.0). The GameLift service itself is closed-source.**

As of May 2025, the Server SDKs were open-sourced on GitHub under the `amazon-gamelift` organization:

| Repository | Language | Description |
|---|---|---|
| `amazon-gamelift-servers-cpp-server-sdk` | C++ | Server SDK for C++ game servers |
| `amazon-gamelift-servers-csharp-server-sdk` | C# | Server SDK for C#/.NET game servers (.NET 4, 6, 8) |
| `amazon-gamelift-servers-go-server-sdk` | Go | Server SDK for Go game servers |
| `amazon-gamelift-plugin-unreal` | C++ | Plugin for Unreal Engine 5.0-5.6 |
| `amazon-gamelift-plugin-unity` | C# | Plugin for Unity 6.0, 2022.3, 2021.3 |
| `amazon-gamelift-agent` | Java | Agent that launches game server processes on fleet instances |
| `amazon-gamelift-servers-game-server-wrapper` | Go | Fast onboarding tool -- no SDK integration needed, for prototyping |
| `amazon-gamelift-toolkit` | Go | Containers Starter Kit + Fast Build Update Tool |

All repositories are Apache 2.0 licensed.
  - Source: [SDKs on GitHub announcement](https://aws.amazon.com/about-aws/whats-new/2025/05/amazon-gamelift-sdks-github/), [GitHub organization](https://github.com/amazon-gamelift)

**What is NOT open source:**
- The GameLift managed service (fleet management, placement, scaling, FlexMatch engine)
- The AWS SDK (available as binary packages, not the service-side implementation)
- The Realtime Servers runtime

The **GameLift Agent** (Java) is open source and is the component that runs on fleet instances to register compute, establish WebSocket connections, and launch game server processes. This gives developers visibility into the on-instance orchestration layer, but not the service-side control plane.

---

## 4. Shared Client-Server Logic

**GameLift provides no mechanism for sharing logic between client and server. They are completely separate.**

- For custom game servers (C++, C#, Go), the game client and server are independently built applications. The developer is responsible for any shared code, protocols, or data formats.

- For **Realtime Servers**, both client and server use operation codes (opCodes) as a shared communication protocol. The server script (Node.js JavaScript) and client both define matching opCode constants. However, this is just a message-passing convention -- there is no shared runtime, shared compilation target, or framework for writing logic once and running it on both sides.
  - Source: [Realtime scripts](https://docs.aws.amazon.com/gameliftservers/latest/realtimeguide/realtime-script.html)

- The Realtime Client SDK is C# (.NET), while the Realtime Server scripts are JavaScript. These are different languages with no shared code path.

---

## 5. Game Config Management

**GameLift has no game configuration system, no remote config, and no feature flags.**

- GameLift has a **runtime configuration** system, but this is for fleet operations only: it specifies which game server executables to launch, how many concurrent processes per instance, and launch parameters. It is not a game design config system.
  - Source: [Runtime configuration](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/fleets-multiprocess.html)

- **Game session properties** allow passing key-value pairs (e.g., `{"Key": "difficulty", "Value": "novice"}`) when creating game sessions. These are per-session metadata, not a persistent config system.
  - Source: [GameProperty API](https://docs.aws.amazon.com/gamelift/latest/apireference/API_GameProperty.html)

- For remote config, feature flags, or game balance data, developers must use external services such as:
  - AWS AppConfig (part of AWS Systems Manager)
  - Amazon DynamoDB for custom config storage
  - Amazon S3 for config file distribution
  - Third-party services

---

## 6. Operations Tooling

### AWS Console for GameLift

The GameLift console (within the AWS Management Console) provides:

- **Fleet management**: View all fleets with status, instance counts, active game sessions. Create, edit, and delete fleets. Manage locations (add/remove regions).
- **Scaling tab**: View current capacity, capacity history, update capacity limits, configure auto-scaling policies.
- **Game sessions tab**: List past and present game sessions with detail information. Drill into individual sessions to see player sessions.
- **Builds and scripts management**: Upload and manage game server builds and Realtime scripts.
- **Matchmaking configuration**: Create and manage FlexMatch matchmakers and rule sets.
- **Queue management**: Configure game session queues with placement priorities.
- Custom preferences are saved per AWS account user.
  - Source: [Fleet details console](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-console-fleets-metrics.html), [Console fleets](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-console-fleets.html)

The console was redesigned in 2022 and updated again in 2023.
  - Source: [New console 2022](https://aws.amazon.com/about-aws/whats-new/2022/06/amazon-gamelift-new-console-experience/), [Updated console 2023](https://aws.amazon.com/about-aws/whats-new/2023/03/updated-console-amazon-gamelift/)

### CloudWatch Integration

- GameLift sends metrics to CloudWatch **every minute**, retained for **15 months**.
- Metrics cover: fleet instances, EC2 hardware (CPU, network, disk), server processes, game sessions, player sessions, container fleets, game session queues, FlexMatch matchmaking (tickets, match times, rule evaluations), and FleetIQ.
- Developers can create custom CloudWatch dashboards, set alarms, and trigger notifications or actions.
- All CloudWatch metrics are also surfaced in the GameLift console as customizable graphs.
  - Source: [CloudWatch metrics](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/monitoring-cloudwatch.html)

### Enhanced Telemetry

- GameLift supports **Amazon Managed Service for Prometheus** and **Amazon Managed Grafana** for deeper telemetry: server timings (delta time, tick rate), network metrics (connections, I/O, packet loss), memory usage, and CPU utilization.
  - Source: [Game server observability blog](https://aws.amazon.com/blogs/gametech/game-server-observability-with-amazon-gamelift-and-amazon-cloudwatch/)

### Infrastructure as Code

- Full support for **AWS CloudFormation** and **AWS CDK** to define GameLift resources (fleets, builds, queues, matchmaking configs) as code.
- CI/CD integration via CodePipeline.

### Customization

- The console itself cannot be extended with custom UI. It is the standard AWS console experience.
- Operational tooling is extended through CloudWatch dashboards, CloudFormation templates, and the AWS SDK / CLI for automation.

---

## 7. Infrastructure Ownership

### Managed EC2 Fleets

- GameLift provisions and manages EC2 instances. Developers choose instance type (C-family compute-optimized, R-family memory-optimized, Graviton ARM-based), OS (Windows Server 2016, Amazon Linux 2023, Amazon Linux 2), and deployment regions.
- Supports **On-Demand** and **Spot Instances** (up to 70-90% cost savings). Mixed fleet strategy: e.g., 60% On-Demand + 40% Spot. GameLift's proprietary FleetIQ algorithm optimizes Spot placement to minimize interruptions.
- Spot instances can be reclaimed by AWS with **2-minute warning**.
- **Auto-scaling**: Target-based scaling, rule-based scaling, or manual. As of January 2026, GameLift supports **scale to/from zero** -- fleets can scale down to zero instances during inactivity and automatically scale up when sessions are requested.
  - Source: [Auto-scaling](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/fleets-autoscaling.html), [Scale to zero announcement](https://aws.amazon.com/about-aws/whats-new/2026/01/amazon-gamelift-servers-automatic-scaling/)

### Managed Container Fleets

- Deploy containerized game servers on EC2 instances. Uses **Amazon ECS** under the hood for task deployment and execution.
- Developers build Docker images, store them in **Amazon ECR**, and define container group definitions (similar to Kubernetes pods / ECS tasks).
- Container groups can include a game server container plus support/sidecar containers. An optional per-instance container group runs utility software (monitoring, etc.).
- Fleet creation takes ~3 minutes; deploying a new game server version ~5 minutes.
- Supports rolling updates with configurable deployment strategies (game session protection, minimum healthy percentage, auto-rollback on failure).
- GameLift automatically calculates container packing (how many container groups fit per instance) and port mappings.
  - Source: [How containers work](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/containers-howitworks.html), [Container fleets blog](https://aws.amazon.com/blogs/gametech/leverage-fully-managed-containers-to-host-multiplayer-games-at-global-scale-on-amazon-gamelift/)

### GameLift Anywhere

- Run game servers on **any infrastructure**: on-premises hardware, other cloud providers, or local development workstations.
- GameLift manages session placement, matchmaking, and player routing, but the developer self-manages deployment, health monitoring, and capacity scaling.
- Enables hybrid hosting: combine managed AWS fleets with self-managed infrastructure for cost optimization, geographic coverage, or migration scenarios.
- Useful for iterative development (run game server locally while using GameLift session management).
  - Source: [GameLift Anywhere blog](https://aws.amazon.com/blogs/aws/introducing-amazon-gamelift-anywhere-run-your-game-servers-on-your-own-infrastructure/), [Hosting options](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-intro-flavors.html)

### Developer Control Summary

| Aspect | Managed EC2 | Managed Containers | Anywhere |
|---|---|---|---|
| Infrastructure provisioning | AWS | AWS | Developer |
| OS / runtime | Choose from supported list | Docker images (Linux) | Full control |
| Deployment | Upload build, GameLift deploys | Push image to ECR, GameLift deploys | Developer deploys |
| Scaling | Auto-scaling policies | Auto-scaling policies | Developer manages |
| Session management | GameLift | GameLift | GameLift |
| Matchmaking (FlexMatch) | Available | Available | Available |
| Instance access | Remote access via console/CLI | Container logs via CloudWatch/S3 | Full access |

---

## Architecture Summary Label

**Infrastructure orchestration service for developer-built game servers -- provides fleet management, session placement, and matchmaking as managed AWS services, but contains no game logic, no application framework, and no integrated backend; the game server binary, backend services, persistence, config, and all gameplay systems are built entirely by the developer using AWS primitives.**

import type { AICapabilities } from './types';

// AI capabilities per backend, split into developer-facing tooling and in-product AI/ML.
// Kept in a shared data file (like architecture.ts) so both server pages and the
// comparison views can read it. Every claim is backed by an official source.
// Last researched: 2026-06.
export const aiCapabilitiesData: Record<string, AICapabilities> = {
  metaplay: {
    summary:
      'Metaplay concentrates its AI investment in developer and operator tooling rather than in-game machine learning. Its "Ask / Connect / Build" stack spans a docs chatbot, two MCP servers, and an SDK-skills agent.',
    devTooling:
      'MetaplayGPT (a hosted docs chatbot), a Docs MCP server giving tools like Claude Code and Cursor read-only access to documentation, SDK source, and samples, a Portal MCP server for role-scoped access to live environments, and the Metaplay Agent — official SDK "skills" installed via the CLI that turn a coding agent into a Metaplay developer. The Agent is in public preview.',
    platformAI:
      'None documented. Matchmaking, segmentation, and A/B testing are rules- and config-based, and analytics events are streamed to external stores (BigQuery, S3) for the studio’s own pipeline. Metaplay positions itself as "AI-ready" tooling rather than "AI-powered" in-product ML.',
    sources: [
      { label: 'AI Assistants (docs)', url: 'https://docs.metaplay.io/miscellaneous/ai-assistants/' },
      { label: 'Metaplay Agent', url: 'https://docs.metaplay.io/miscellaneous/ai-assistants/metaplay-agent' },
      { label: 'Announcing Metaplay AI', url: 'https://www.metaplay.io/blog/announcing-metaplay-ai' },
    ],
  },
  playfab: {
    summary:
      'PlayFab offers generally available in-product AI through Azure-backed services, while its developer-facing AI assistant remains in limited preview.',
    devTooling:
      'PlayFab Copilot — a natural-language assistant in Game Manager for querying data and changing game state — was shown at GDC 2024 as entering Private Preview, with no documented general availability since.',
    platformAI:
      'Churn Prediction, powered by Azure Machine Learning, scores players by churn risk and feeds Segmentation. PlayFab Party adds real-time speech-to-text, text-to-speech, and translation via Azure Cognitive Services, plus text moderation backed by Azure AI Content Safety; service-side voice moderation (ToxMod) is being added.',
    sources: [
      { label: 'Churn Prediction', url: 'https://learn.microsoft.com/en-us/gaming/playfab/features/analytics/churn-prediction/overview' },
      { label: 'Text moderation (Azure AI Content Safety)', url: 'https://learn.microsoft.com/en-us/gaming/playfab/community/voice-communications/concepts-text-moderation' },
      { label: 'PlayFab Copilot at GDC 2024', url: 'https://developer.microsoft.com/en-us/games/articles/2024/04/azure-playfab-gdc-recap/' },
    ],
  },
  'heroic-labs': {
    summary:
      'Heroic Labs delivers AI mainly through Satori’s analytics, via an official Databricks integration for machine learning and GenAI; first-party developer AI tooling is limited.',
    devTooling:
      'Limited. Heroic Labs publishes LLM-optimized Markdown documentation for AI coding assistants, but ships no official AI assistant, code generation, or MCP server. A community-built Nakama MCP server exists but is third-party.',
    platformAI:
      'Through Satori’s Databricks integration, studios can run ML for churn prediction, spend/LTV forecasting, and engagement analysis, writing scores back to Satori for segmentation and A/B targeting. Satori also advertises GenAI features to query datasets and summarize player feedback.',
    sources: [
      { label: 'Satori + Databricks (docs)', url: 'https://heroiclabs.com/docs/satori/guides/satori-databricks/' },
      { label: 'Satori Analytics', url: 'https://heroiclabs.com/satori/analytics/' },
      { label: 'Databricks integration announcement', url: 'https://www.databricks.com/blog/announcing-heroic-labs-satori-integration-databricks' },
    ],
  },
  'aws-gamelift': {
    summary:
      'Amazon GameLift’s AI is a developer-facing console assistant plus a developer-built ML matchmaking pattern. GameLift is hosting and matchmaking infrastructure, not a full backend.',
    devTooling:
      'AI-powered assistance in the AWS Console (launched December 2025), powered by Amazon Q Developer with GameLift-specific knowledge for integration, fleet configuration, troubleshooting, and performance tuning.',
    platformAI:
      'FlexMatch matchmaking is rules-based, not ML. AWS documents a developer-built pattern that adds ML skill ratings using Amazon SageMaker AI to feed FlexMatch, but that is assembled by the developer rather than a built-in feature.',
    sources: [
      { label: 'AWS Console AI assistance (Dec 2025)', url: 'https://aws.amazon.com/about-aws/whats-new/2025/12/gamelift-servers-console-developers-ai-powered/' },
      { label: 'ML skill-based matchmaking with SageMaker', url: 'https://aws.amazon.com/blogs/gametech/training-ai-models-for-skill-based-matchmaking-using-amazon-sagemaker-ai/' },
      { label: 'How FlexMatch works (rules-based)', url: 'https://docs.aws.amazon.com/gameliftservers/latest/flexmatchguide/gamelift-match.html' },
    ],
  },
  'unity-gaming-services': {
    summary:
      'Unity offers AI on two distinct layers: a backend safety suite (AI text and voice moderation) within UGS, and a separate engine/editor AI stack.',
    devTooling:
      'Unity AI (open beta with Unity 6.2, replacing the deprecated Unity Muse) is an in-editor assistant and asset-generator suite running on third-party frontier models, plus an official Unity MCP server. This is engine/editor tooling rather than a UGS backend assistant.',
    platformAI:
      'Within UGS, Safe Text (AI text-chat moderation) and Safe Voice (ML voice-toxicity detection) integrate with Vivox. The on-device Inference Engine (formerly Sentis) runs ONNX models client-side. Matchmaker and Analytics themselves are rule-based, with no documented ML.',
    sources: [
      { label: 'Unity AI', url: 'https://unity.com/features/ai' },
      { label: 'Safe Text (docs)', url: 'https://docs.unity.com/en-us/safe-text' },
      { label: 'Safe Voice', url: 'https://unity.com/products/safe-voice' },
    ],
  },
  colyseus: {
    summary:
      'Colyseus is a minimal open-source multiplayer framework with essentially no AI features. Its only first-party AI provision is a machine-readable documentation index.',
    devTooling:
      'The documentation site serves an llms.txt index for AI coding agents. A documentation MCP server exists but is community-built, not official. There is no official AI assistant or code generation.',
    platformAI:
      'None documented. Matchmaking (rooms, filtering, queuing) is rule-based, and there is no built-in moderation, anti-cheat, or analytics ML in the framework or Colyseus Cloud.',
    sources: [
      { label: 'Colyseus', url: 'https://colyseus.io/' },
      { label: 'llms.txt docs index', url: 'https://docs.colyseus.io/llms.txt' },
      { label: 'GitHub', url: 'https://github.com/colyseus/colyseus' },
    ],
  },
  braincloud: {
    summary:
      'brainCloud 6.0 (mid-2026) introduced brainBot, a Claude-powered AI assistant in its Design Portal. The runtime platform has no documented first-party machine learning.',
    devTooling:
      'brainBot, powered by Anthropic’s Claude, lives in a context-aware side panel in the Design Portal (opt-in, paid plans). It writes and debugs Cloud Code, configures hooks and integrations, designs gamification, tunes segments, and helps with LiveOps setup. App and user data is not used for training, and PII is stripped before being sent to the model.',
    platformAI:
      'None documented as first-party. Profanity moderation is a third-party WebPurify integration, analytics are descriptive dashboards, and matchmaking is standard rating-based logic with no documented ML.',
    sources: [
      { label: 'brainBot', url: 'https://getbraincloud.com/features/brainbot/' },
      { label: 'brainCloud 6.0 release', url: 'https://updates.braincloudservers.com/braincloud-6-0-with-brainbot-is-here-1x54Sk' },
      { label: 'Profanity API (WebPurify)', url: 'https://docs.braincloudservers.com/api/capi/profanity/' },
    ],
  },
  accelbyte: {
    summary:
      'AccelByte has a strong AI-for-developers layer — two official MCP servers plus a CLI and workflow tooling — while in-product AI remains thin.',
    devTooling:
      'Two official MCP servers (announced May 2026): an Extend SDK MCP server for symbol search and code reference across C#, Go, Java, and Python, and an AGS API MCP server for authenticated API discovery and execution. Both work with Claude, Cursor, and Copilot, alongside an AGS CLI and emerging YAML workflows.',
    platformAI:
      'Limited. Matchmaking is rule-based, and chat moderation combines manual review with rule-based auto-moderation and profanity filters. The AccelByte Intelligence Service describes an ML pipeline (churn, clustering, sentiment) as roadmap rather than a shipped feature.',
    sources: [
      { label: 'AGS MCP servers (docs)', url: 'https://docs.accelbyte.io/gaming-services/modules/foundations/extend/app-in-depth-topics/extend-mcp-servers/' },
      { label: 'MCP servers announcement', url: 'https://accelbyte.io/blog/accelbytes-mcp-servers-give-ai-assistants-real-backend-context' },
      { label: 'AccelByte Intelligence Service', url: 'https://accelbyte.io/accelbyte-intelligence-service' },
    ],
  },
};

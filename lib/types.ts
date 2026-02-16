export type BackendType = 'proprietary' | 'open-source' | 'source-available';
export type PricingModel = 'free' | 'freemium' | 'usage-based' | 'enterprise';
export type GameType = 'f2p-mobile' | 'live-service-pc' | 'competitive' | 'casual-social' | 'mmo';
export type Platform = 'unity' | 'unreal' | 'godot' | 'custom' | 'html5' | 'native';

// Feature with optional source URL and description
export interface FeatureValue {
  supported: boolean;
  description?: string; // Tooltip description explaining the platform's implementation
  sourceUrl?: string;   // Link to documentation
}

// Simple boolean or object with source
export type FeatureEntry = boolean | FeatureValue;

// Live service focused feature categories
export interface LiveOpsFeatures {
  // Player Management
  authentication: FeatureEntry;
  playerProfiles: FeatureEntry;
  playerSegmentation: FeatureEntry;

  // Live Operations
  liveEvents: FeatureEntry;
  seasonalContent: FeatureEntry;
  remoteConfig: FeatureEntry;
  abTesting: FeatureEntry;
  scheduledContent: FeatureEntry;

  // Economy & Monetization
  virtualCurrency: FeatureEntry;
  inventorySystem: FeatureEntry;
  iapValidation: FeatureEntry;
  offers: FeatureEntry;

  // Engagement & Retention
  pushNotifications: FeatureEntry;
  leaderboards: FeatureEntry;
  achievements: FeatureEntry;
  socialFeatures: FeatureEntry;
  guildsClans: FeatureEntry;

  // Analytics & Insights
  analytics: FeatureEntry;
  playerBehaviorTracking: FeatureEntry;
  revenueAnalytics: FeatureEntry;
  customDashboards: FeatureEntry;

  // Multiplayer & Real-time
  multiplayer: FeatureEntry;
  matchmaking: FeatureEntry;
  chat: FeatureEntry;

  // Infrastructure
  cloudSave: FeatureEntry;
  serverlessLogic: FeatureEntry;
  dedicatedServers: FeatureEntry;
  globalScaling: FeatureEntry;

  // Operations
  adminDashboard: FeatureEntry;
  playerSupport: FeatureEntry;
  moderation: FeatureEntry;

  // Platform & Deployment
  sourceCodeAccess: FeatureEntry;
  managedServices: FeatureEntry;
  selfHosting: FeatureEntry;
  multiplatformSDK: FeatureEntry;

  // Architecture
  serverAuthoritative: FeatureEntry;
  cheatProtection: FeatureEntry;
  sharedClientServerLogic: FeatureEntry;
  customizable: FeatureEntry;
  extensible: FeatureEntry;

  // Communication
  inGameMessaging: FeatureEntry;

  // Compliance & Testing
  gdprCompliance: FeatureEntry;
  loadTesting: FeatureEntry;

  // AI
  aiFeatures: FeatureEntry;
}

export interface BackendSource {
  label: string;
  url: string;
}

export interface Backend {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  website: string;
  docsUrl?: string;
  githubUrl?: string;
  type: BackendType;
  pricingModel: PricingModel;
  pricingDetails?: string;
  features: LiveOpsFeatures;
  bestFor: string[];
  gameTypes: GameType[];
  platforms: Platform[];
  strengths: string[];
  limitations: string[];
  foundedYear?: number;
  lastUpdated: string;
  sources?: BackendSource[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  gameTypes: GameType[];
}

export interface EducationalContent {
  slug: string;
  title: string;
  description: string;
  order: number;
}

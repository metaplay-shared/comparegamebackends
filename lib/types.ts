export type BackendType = 'full-platform' | 'partial-solution' | 'open-source';
export type PricingModel = 'free' | 'freemium' | 'usage-based' | 'enterprise';
export type GameType = 'f2p-mobile' | 'live-service-pc' | 'competitive' | 'casual-social' | 'mmo';
export type Platform = 'unity' | 'unreal' | 'godot' | 'custom' | 'html5' | 'native';

// Live service focused feature categories
export interface LiveOpsFeatures {
  // Player Management
  authentication: boolean;
  playerProfiles: boolean;
  playerSegmentation: boolean;

  // Live Operations
  liveEvents: boolean;
  seasonalContent: boolean;
  remoteConfig: boolean;
  abTesting: boolean;
  scheduledContent: boolean;

  // Economy & Monetization
  virtualCurrency: boolean;
  inventorySystem: boolean;
  iapValidation: boolean;
  offers: boolean;

  // Engagement & Retention
  pushNotifications: boolean;
  leaderboards: boolean;
  achievements: boolean;
  socialFeatures: boolean;
  guildsClans: boolean;

  // Analytics & Insights
  analytics: boolean;
  playerBehaviorTracking: boolean;
  revenueAnalytics: boolean;
  customDashboards: boolean;

  // Multiplayer & Real-time
  multiplayer: boolean;
  matchmaking: boolean;
  chat: boolean;

  // Infrastructure
  cloudSave: boolean;
  serverlessLogic: boolean;
  dedicatedServers: boolean;
  globalScaling: boolean;

  // Operations
  adminDashboard: boolean;
  playerSupport: boolean;
  moderation: boolean;
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
  liveServiceFit: 'comprehensive' | 'partial' | 'minimal';
  foundedYear?: number;
  lastUpdated: string;
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

export type BackendType = 'commercial' | 'open-source' | 'hybrid';
export type PricingModel = 'free' | 'freemium' | 'paid' | 'enterprise';
export type UseCase = 'mmo' | 'mobile' | 'indie' | 'competitive' | 'casual' | 'social';
export type Platform = 'unity' | 'unreal' | 'godot' | 'custom' | 'html5' | 'native';

export interface BackendFeatures {
  matchmaking: boolean;
  leaderboards: boolean;
  cloudSave: boolean;
  analytics: boolean;
  multiplayer: boolean;
  serverless: boolean;
  authentication: boolean;
  chat: boolean;
  pushNotifications: boolean;
  inventory: boolean;
  economy: boolean;
  tournaments: boolean;
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
  features: BackendFeatures;
  useCases: UseCase[];
  platforms: Platform[];
  pros: string[];
  cons: string[];
  rating: number;
  foundedYear?: number;
  lastUpdated: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  useCases: UseCase[];
}

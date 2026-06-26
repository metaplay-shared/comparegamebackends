import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug, getBackendsByGameType } from '@/lib/backends';
import { BackendCard } from '@/components/BackendCard';
import { GameType } from '@/lib/types';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, itemListSchema } from '@/lib/seo';

interface PageProps {
  params: Promise<{ gameType: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    gameType: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { gameType } = await params;
  const categoryData = getCategoryBySlug(gameType);

  if (!categoryData) {
    return { title: 'Game Type Not Found' };
  }

  const title = `${categoryData.name} - Backend Options`;

  return {
    title,
    description: categoryData.description,
    keywords: [
      categoryData.name,
      `${categoryData.name} backend`,
      `backend for ${categoryData.name}`,
      'game backend comparison',
    ],
    alternates: { canonical: `/games/${categoryData.slug}` },
    openGraph: {
      title,
      description: categoryData.description,
      url: `/games/${categoryData.slug}`,
    },
  };
}

const gameTypeContent: Record<string, { intro: string; considerations: string[] }> = {
  'f2p-mobile': {
    intro: `Free-to-play mobile games represent one of the largest segments of the gaming market.
      These games require sophisticated backend infrastructure to handle player management,
      virtual economies, live events, and data-driven optimization that drives sustainable revenue.`,
    considerations: [
      'Robust virtual economy and IAP validation',
      'Player segmentation for targeted offers',
      'Push notifications for re-engagement',
      'Analytics and A/B testing capabilities',
      'Low-friction authentication options',
      'Cloud save for cross-device play',
      'Live events and seasonal content support',
    ],
  },
  'live-service-pc': {
    intro: `PC and console live service games operate as ongoing services with regular content
      updates, seasonal events, and long-term player engagement. These games typically have
      higher production values and more complex infrastructure requirements.`,
    considerations: [
      'Scalable infrastructure for launch spikes',
      'Content delivery and patching systems',
      'Cross-platform progression',
      'Advanced matchmaking for multiplayer',
      'Comprehensive analytics and telemetry',
      'Community and social features',
      'Long-term data retention and player history',
    ],
  },
  'competitive': {
    intro: `Competitive multiplayer games require low-latency networking, fair matchmaking,
      and anti-cheat considerations. The backend needs to support ranking systems,
      tournaments, and spectator features while maintaining competitive integrity.`,
    considerations: [
      'Low-latency networking infrastructure',
      'Skill-based matchmaking systems',
      'Leaderboards and ranking systems',
      'Tournament and bracket support',
      'Anti-cheat and fair play measures',
      'Replay and spectator systems',
      'Regional server presence',
    ],
  },
  'casual-social': {
    intro: `Casual and social games prioritize accessibility and social connection.
      These games often have simpler mechanics but require strong social features,
      easy onboarding, and engagement systems that encourage regular play.`,
    considerations: [
      'Simple authentication (including guest play)',
      'Social graph and friend systems',
      'Leaderboards and social competition',
      'Easy-to-implement cloud save',
      'Push notifications for social triggers',
      'Gifting and sharing features',
      'Lightweight SDK footprint',
    ],
  },
  'mmo': {
    intro: `Massively multiplayer online games require the most robust backend infrastructure.
      These games need to handle thousands of concurrent players, persistent world states,
      complex economies, and often 24/7 operations with global reach.`,
    considerations: [
      'Massive scalability for concurrent users',
      'Persistent world state management',
      'Complex inventory and economy systems',
      'Guild and social organization features',
      'Global infrastructure with multiple regions',
      'Database performance at scale',
      'Operational tools for 24/7 management',
    ],
  },
};

export default async function GameTypePage({ params }: PageProps) {
  const { gameType } = await params;
  const categoryData = getCategoryBySlug(gameType);

  if (!categoryData) {
    notFound();
  }

  const gameBackends = getBackendsByGameType(gameType as GameType);
  const content = gameTypeContent[gameType];

  return (
    <div className="container-page py-12 md:py-16">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Game Types', path: '/backends' },
            { name: categoryData.name, path: `/games/${categoryData.slug}` },
          ]),
          itemListSchema(
            `Game backends for ${categoryData.name}`,
            gameBackends.map((b) => ({ name: b.name, path: `/backends/${b.slug}` }))
          ),
        ]}
      />
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/backends" className="hover:text-primary-600">
              Platforms
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-slate-50">{categoryData.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryData.name}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          {categoryData.description}
        </p>
      </div>

      {/* Game Type Navigation */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/games/${cat.slug}`}
            className={`badge transition-colors ${
              cat.slug === gameType
                ? 'badge-primary'
                : 'badge-slate hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Introduction */}
      {content && (
        <section className="card p-6 mb-10">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {content.intro}
          </p>
        </section>
      )}

      {/* Key Considerations */}
      {content && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Key Backend Considerations</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {content.considerations.map((consideration, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
              >
                <svg
                  className="w-5 h-5 text-primary-500 shrink-0 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-slate-700 dark:text-slate-300">{consideration}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Results */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Recommended Platforms for {categoryData.name}
        </h2>
        {gameBackends.length > 0 ? (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              {gameBackends.length} platform{gameBackends.length !== 1 ? 's' : ''} support this game type
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameBackends.map((backend) => (
                <BackendCard key={backend.slug} backend={backend} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-600 dark:text-slate-400">
              No platforms found for this game type yet.
            </p>
            <Link href="/backends" className="btn-primary mt-4 inline-block">
              View All Platforms
            </Link>
          </div>
        )}
      </section>

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <Link href="/backends" className="btn-ghost text-primary-600 hover:text-primary-700">
          ← View all platforms
        </Link>
      </div>
    </div>
  );
}

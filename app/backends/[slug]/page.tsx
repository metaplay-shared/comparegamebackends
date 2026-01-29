import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { backends, getBackendBySlug, typeLabels, pricingLabels, liveServiceFitLabels } from '@/lib/backends';
import { FeatureMatrix } from '@/components/FeatureMatrix';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return backends.map((backend) => ({
    slug: backend.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const backend = getBackendBySlug(slug);

  if (!backend) {
    return { title: 'Platform Not Found' };
  }

  return {
    title: `${backend.name} - Live Service Game Backend`,
    description: backend.description,
    openGraph: {
      title: `${backend.name} - Live Service Game Backend`,
      description: backend.tagline,
    },
  };
}

export default async function BackendPage({ params }: PageProps) {
  const { slug } = await params;
  const backend = getBackendBySlug(slug);

  if (!backend) {
    notFound();
  }

  const platformLabels: Record<string, string> = {
    unity: 'Unity',
    unreal: 'Unreal Engine',
    godot: 'Godot',
    custom: 'Custom Engine',
    html5: 'HTML5/Web',
    native: 'Native',
  };

  const gameTypeLabels: Record<string, string> = {
    'f2p-mobile': 'F2P Mobile',
    'live-service-pc': 'Live Service PC/Console',
    'competitive': 'Competitive',
    'casual-social': 'Casual & Social',
    'mmo': 'MMO',
  };

  const featureCount = Object.values(backend.features).filter(Boolean).length;
  const totalFeatures = Object.keys(backend.features).length;

  return (
    <div className="container-page py-12 md:py-16">
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
          <li className="text-slate-900 dark:text-slate-50">{backend.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl font-bold text-primary-600 shrink-0">
          {backend.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold">{backend.name}</h1>
            <span
              className={`badge ${
                backend.type === 'open-source'
                  ? 'badge-green'
                  : backend.type === 'full-platform'
                  ? 'badge-primary'
                  : 'badge-amber'
              }`}
            >
              {typeLabels[backend.type]}
            </span>
            <span
              className={`badge ${
                backend.liveServiceFit === 'comprehensive'
                  ? 'badge-green'
                  : backend.liveServiceFit === 'partial'
                  ? 'badge-amber'
                  : 'badge-slate'
              }`}
            >
              {liveServiceFitLabels[backend.liveServiceFit]}
            </span>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">{backend.tagline}</p>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span>{featureCount} of {totalFeatures} live ops features</span>
            {backend.foundedYear && (
              <>
                <span>•</span>
                <span>Since {backend.foundedYear}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col gap-3">
          <a
            href={backend.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Visit Website
          </a>
          {backend.docsUrl && (
            <a
              href={backend.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Documentation
            </a>
          )}
          {backend.githubUrl && (
            <a
              href={backend.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {backend.description}
            </p>
          </section>

          {/* Features */}
          <section className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Live Service Features</h2>
            <FeatureMatrix backend={backend} />
          </section>

          {/* Strengths and Limitations */}
          <div className="grid md:grid-cols-2 gap-6">
            <section className="card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Strengths
              </h2>
              <ul className="space-y-2">
                {backend.strengths.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <svg
                      className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Limitations
              </h2>
              <ul className="space-y-2">
                {backend.limitations.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <svg
                      className="w-5 h-5 text-slate-400 shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <section className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="mb-3">
              <span
                className={`badge ${
                  backend.pricingModel === 'free'
                    ? 'badge-green'
                    : backend.pricingModel === 'freemium'
                    ? 'badge-primary'
                    : backend.pricingModel === 'usage-based'
                    ? 'badge-amber'
                    : 'badge-slate'
                }`}
              >
                {pricingLabels[backend.pricingModel]}
              </span>
            </div>
            {backend.pricingDetails && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {backend.pricingDetails}
              </p>
            )}
          </section>

          {/* Best For */}
          <section className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Best For</h2>
            <ul className="space-y-2">
              {backend.bestFor.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                  <svg className="w-4 h-4 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Platforms */}
          <section className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Supported Platforms</h2>
            <div className="flex flex-wrap gap-2">
              {backend.platforms.map((platform) => (
                <span key={platform} className="badge-slate">
                  {platformLabels[platform] || platform}
                </span>
              ))}
            </div>
          </section>

          {/* Game Types */}
          <section className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Game Types</h2>
            <div className="flex flex-wrap gap-2">
              {backend.gameTypes.map((gameType) => (
                <Link
                  key={gameType}
                  href={`/games/${gameType}`}
                  className="badge-primary hover:opacity-80 transition-opacity"
                >
                  {gameTypeLabels[gameType] || gameType}
                </Link>
              ))}
            </div>
          </section>

          {/* Last Updated */}
          <div className="text-sm text-slate-500 dark:text-slate-400 text-center">
            Last updated: {backend.lastUpdated}
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <Link href="/backends" className="btn-ghost text-primary-600 hover:text-primary-700">
          ← Back to all platforms
        </Link>
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { backends, getBackendBySlug, pricingLabels } from '@/lib/backends';
import { FeatureMatrix } from '@/components/FeatureMatrix';
import { architectureData, dimensionLabels } from '@/lib/architecture';
import { aiCapabilitiesData } from '@/lib/ai-capabilities';
import { JsonLd } from '@/components/JsonLd';
import { SITE_NAME, PUBLISHER, breadcrumbSchema } from '@/lib/seo';

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

  const title = `${backend.name} - Live Service Game Backend`;

  return {
    title,
    description: backend.description,
    keywords: [
      backend.name,
      `${backend.name} backend`,
      `${backend.name} alternatives`,
      `${backend.name} features`,
      'game backend comparison',
    ],
    alternates: { canonical: `/backends/${backend.slug}` },
    openGraph: {
      type: 'article',
      title,
      description: backend.tagline,
      url: `/backends/${backend.slug}`,
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

  const archData = architectureData[backend.slug];
  const ai = aiCapabilitiesData[backend.slug];

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: backend.name,
    description: backend.description,
    applicationCategory: 'Game backend platform (BaaS)',
    operatingSystem: 'Cross-platform',
    url: backend.website,
    sameAs: [backend.website, backend.docsUrl, backend.githubUrl].filter(Boolean),
    // Disclosed: the comparison entry is published by Metaplay.
    subjectOf: {
      '@type': 'WebPage',
      name: `${backend.name} on ${SITE_NAME}`,
      publisher: { '@type': 'Organization', name: PUBLISHER.name, url: PUBLISHER.url },
    },
  };

  return (
    <div className="container-page py-12 md:py-16">
      <JsonLd
        data={[
          softwareSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Compare Backends', path: '/backends' },
            { name: backend.name, path: `/backends/${backend.slug}` },
          ]),
        ]}
      />
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <li>
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/backends" className="hover:text-primary-600">
              Compare
            </Link>
          </li>
          <li>/</li>
          <li className="text-neutral-900 dark:text-neutral-50">{backend.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
        <div className="flex-1">
          <div className="h-12 mb-4">
            <Image
              src={backend.logo}
              alt={`${backend.name} logo`}
              width={180}
              height={48}
              className="object-contain object-left h-full w-auto max-w-[200px]"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{backend.name}</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">{backend.tagline}</p>
          <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            {backend.foundedYear && (
              <span>Founded {backend.foundedYear}</span>
            )}
            <span>•</span>
            <span>{pricingLabels[backend.pricingModel]}</span>
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
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {backend.description}
            </p>
          </section>

          {/* Architecture */}
          {archData && (
            <section className="card p-6">
              <h2 className="text-xl font-semibold mb-2">Architecture</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                How {backend.name} approaches the key architectural dimensions for live service games.
              </p>
              <div className="space-y-4">
                {dimensionLabels.map((dim) => {
                  const cell = archData[dim.key];
                  if (!cell) return null;
                  return (
                    <div key={dim.key} className="border-b border-neutral-100 dark:border-neutral-800 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-medium text-primary-500 bg-primary-500/10 px-2 py-1 rounded whitespace-nowrap mt-0.5 min-w-[120px] text-center">
                          {dim.label}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {cell.text}
                          </p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            {cell.tooltip}
                          </p>
                          <a
                            href={cell.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-1.5 text-xs text-primary-500 hover:text-primary-600 hover:underline"
                          >
                            Documentation
                            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* AI Capabilities */}
          {ai && (
            <section className="card p-6">
              <h2 className="text-xl font-semibold mb-2">AI Capabilities</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                How {backend.name} uses AI — both tooling for the developers building on it and AI/ML features inside the live game.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                {ai.summary}
              </p>
              <div className="space-y-5">
                <div>
                  <span className="inline-block text-xs font-medium text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded mb-1.5">
                    Developer tooling
                  </span>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {ai.devTooling}
                  </p>
                </div>
                <div>
                  <span className="inline-block text-xs font-medium text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded mb-1.5">
                    In-product AI &amp; ML
                  </span>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {ai.platformAI}
                  </p>
                </div>
              </div>
              {ai.sources && ai.sources.length > 0 && (
                <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-x-4 gap-y-1">
                  {ai.sources.map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-500 hover:text-primary-600 hover:underline"
                    >
                      {s.label} →
                    </a>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Features */}
          <section className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Live Service Features</h2>
            <FeatureMatrix backend={backend} />
          </section>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Strengths */}
          <section className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Strengths</h2>
            <ul className="space-y-2">
              {backend.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-600 dark:text-neutral-400">{strength}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Limitations */}
          <section className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Limitations</h2>
            <ul className="space-y-2">
              {backend.limitations.map((limitation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-600 dark:text-neutral-400">{limitation}</span>
                </li>
              ))}
            </ul>
          </section>

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
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {backend.pricingDetails}
              </p>
            )}
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

          {/* Sources */}
          {backend.sources && backend.sources.length > 0 && (
            <section className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Sources</h2>
              <ul className="space-y-2">
                {backend.sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      {source.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Last Updated */}
          <div className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
            Last updated: {backend.lastUpdated}
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <Link href="/backends" className="btn-ghost text-primary-600 hover:text-primary-700">
          ← Back to comparison
        </Link>
      </div>
    </div>
  );
}

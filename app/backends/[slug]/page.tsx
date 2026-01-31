import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { backends, getBackendBySlug, pricingLabels } from '@/lib/backends';
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
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">{backend.tagline}</p>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
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
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {backend.description}
            </p>
          </section>

          {/* Features */}
          <section className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Live Service Features</h2>
            <FeatureMatrix backend={backend} />
          </section>
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

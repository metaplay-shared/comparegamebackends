import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { backends, getBackendBySlug, typeLabels, pricingLabels } from '@/lib/backends';
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
    return { title: 'Backend Not Found' };
  }

  return {
    title: `${backend.name} - Game Backend Review`,
    description: backend.description,
    openGraph: {
      title: `${backend.name} - Game Backend Review`,
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

  const useCaseLabels: Record<string, string> = {
    mmo: 'MMO Games',
    mobile: 'Mobile Games',
    indie: 'Indie Games',
    competitive: 'Competitive Games',
    casual: 'Casual Games',
    social: 'Social Games',
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
              Backends
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
                  : backend.type === 'commercial'
                  ? 'badge-primary'
                  : 'badge-purple'
              }`}
            >
              {typeLabels[backend.type]}
            </span>
            <span
              className={`badge ${
                backend.pricingModel === 'free'
                  ? 'badge-green'
                  : backend.pricingModel === 'freemium'
                  ? 'badge-primary'
                  : backend.pricingModel === 'paid'
                  ? 'badge-amber'
                  : 'badge-slate'
              }`}
            >
              {pricingLabels[backend.pricingModel]}
            </span>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">{backend.tagline}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-5 w-5 ${
                    star <= backend.rating
                      ? 'text-amber-400 fill-current'
                      : 'text-slate-300 dark:text-slate-600'
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 font-medium">{backend.rating.toFixed(1)}</span>
            </div>
            {backend.foundedYear && (
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Since {backend.foundedYear}
              </span>
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
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <FeatureMatrix backend={backend} />
          </section>

          {/* Pros and Cons */}
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
                Pros
              </h2>
              <ul className="space-y-2">
                {backend.pros.map((pro, index) => (
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
                    {pro}
                  </li>
                ))}
              </ul>
            </section>

            <section className="card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Cons
              </h2>
              <ul className="space-y-2">
                {backend.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <svg
                      className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {con}
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
                    : backend.pricingModel === 'paid'
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

          {/* Use Cases */}
          <section className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {backend.useCases.map((useCase) => (
                <Link
                  key={useCase}
                  href={`/categories/${useCase}`}
                  className="badge-primary hover:opacity-80 transition-opacity"
                >
                  {useCaseLabels[useCase] || useCase}
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
          ← Back to all backends
        </Link>
      </div>
    </div>
  );
}

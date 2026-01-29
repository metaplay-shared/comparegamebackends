import Link from 'next/link';
import { BackendCard } from '@/components/BackendCard';
import { backends, categories } from '@/lib/backends';

export default function HomePage() {
  // Featured backends (top rated)
  const featuredBackends = [...backends].sort((a, b) => b.rating - a.rating).slice(0, 4);

  // Open source backends
  const openSourceBackends = backends.filter((b) => b.type === 'open-source').slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Find the perfect backend for your{' '}
              <span className="text-primary-600">game</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Compare game backend solutions side by side. From indie projects to
              enterprise-scale MMOs, we help you choose the right infrastructure for
              your multiplayer game.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/backends" className="btn-primary text-center">
                Compare All Backends
              </Link>
              <Link href="/categories/indie" className="btn-secondary text-center">
                Best for Indies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="container-page py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600">{backends.length}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Backends Reviewed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600">12</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Features Compared</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600">{categories.length}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Use Case Categories</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600">6</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Platforms Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Backends */}
      <section className="container-page py-16 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Top Rated Backends</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Highest rated game backend solutions based on features and developer experience
            </p>
          </div>
          <Link
            href="/backends"
            className="hidden md:inline-flex btn-ghost text-primary-600 hover:text-primary-700"
          >
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBackends.map((backend) => (
            <BackendCard key={backend.slug} backend={backend} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/backends" className="btn-secondary">
            View All Backends
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="container-page py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Browse by Category</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Find the right backend for your specific game type
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="card p-6 text-center hover:shadow-md hover:border-primary-300 dark:hover:border-primary-700 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 mx-auto mb-4 flex items-center justify-center">
                  <CategoryIcon category={category.slug} />
                </div>
                <h3 className="font-semibold group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="container-page py-16 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Open Source Options</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Free and open source game backend solutions you can self-host
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {openSourceBackends.map((backend) => (
            <BackendCard key={backend.slug} backend={backend} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 dark:bg-primary-700">
        <div className="container-page py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to choose your game backend?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Use our comparison tool to filter by features, pricing, and platform support
            to find the perfect fit for your project.
          </p>
          <Link
            href="/backends"
            className="inline-flex items-center justify-center rounded-lg font-medium bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 transition-colors"
          >
            Start Comparing
          </Link>
        </div>
      </section>
    </div>
  );
}

function CategoryIcon({ category }: { category: string }) {
  const iconClass = 'w-6 h-6 text-primary-600';

  switch (category) {
    case 'mmo':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case 'mobile':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case 'indie':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'competitive':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    case 'casual':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
  }
}

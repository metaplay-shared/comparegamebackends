import Link from 'next/link';
import { BackendCard } from '@/components/BackendCard';
import { backends, educationalContent, getBackendsByLiveServiceFit } from '@/lib/backends';

export default function HomePage() {
  const comprehensiveBackends = getBackendsByLiveServiceFit('comprehensive');
  const partialBackends = backends.filter(b => b.liveServiceFit === 'partial' || b.liveServiceFit === 'minimal');

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Find the best game backend{' '}
              <span className="text-primary-600">for your game</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Compare game backend platforms side-by-side. Understand what you need,
              see how they stack up, and make the right choice for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/backends" className="btn-primary text-center">
                Compare Backends
              </Link>
              <Link href="#why-backend" className="btn-secondary text-center">
                Why Do I Need One?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Do You Need a Backend? */}
      <section id="why-backend" className="container-page py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why do you need a game backend?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            The most successful games today are operated as <strong className="text-slate-900 dark:text-slate-100">live services</strong>,
            continuously updated, optimised, and evolved based on player data and engagement.
            You need a proper backend to handle this for you so you can focus on making the game, and not the tech.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
            <p className="text-slate-600 dark:text-slate-400">
              of top-grossing mobile games operate as live services
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">10x</div>
            <p className="text-slate-600 dark:text-slate-400">
              higher lifetime value from live service players vs. one-time purchases
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">Years</div>
            <p className="text-slate-600 dark:text-slate-400">
              of ongoing revenue from a single game, not months
            </p>
          </div>
        </div>

        <div className="card p-8 max-w-3xl mx-auto">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            A game backend is the infrastructure that makes live service possible. It handles
            player accounts, saves progress to the cloud, manages your game economy, delivers
            live events, tracks analytics, and enables everything that keeps players engaged
            long after launch.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
            Without a proper backend, you&apos;re limited to single-player experiences or
            building everything from scratch. With the right backend, you can focus on
            making a great game while the infrastructure handles the rest.
          </p>
        </div>
      </section>

      {/* What is Live Service? */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What does &quot;live service&quot; mean?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              A live service game is designed to evolve over time, keeping players engaged
              through regular updates, events, and new content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card p-6">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Ongoing Updates</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                New content, features, and improvements delivered regularly to keep the game fresh.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Live Events</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Time-limited events, seasons, and special occasions that create urgency and excitement.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Data-Driven</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Analytics and A/B testing to understand players and optimize the experience.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Sustainable Revenue</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Ongoing monetization through battle passes, cosmetics, and in-app purchases.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/learn/what-is-live-service" className="btn-secondary">
              Learn More About Live Service Games
            </Link>
          </div>
        </div>
      </section>

      {/* What a Backend Provides */}
      <section className="container-page py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What a game backend gives you</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            The right backend platform provides the tools and infrastructure to run
            your game as a successful live service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureBlock
            title="Player Management"
            items={['Authentication & accounts', 'Cloud save & progression', 'Player segmentation']}
          />
          <FeatureBlock
            title="Live Operations"
            items={['Remote config & updates', 'Live events & seasons', 'A/B testing']}
          />
          <FeatureBlock
            title="Economy & Monetization"
            items={['Virtual currencies', 'Inventory & items', 'IAP & offers']}
          />
          <FeatureBlock
            title="Engagement"
            items={['Leaderboards', 'Achievements', 'Social features']}
          />
          <FeatureBlock
            title="Analytics"
            items={['Player behavior tracking', 'Revenue analytics', 'Custom dashboards']}
          />
          <FeatureBlock
            title="Infrastructure"
            items={['Global scaling', 'Multiplayer support', 'Admin tools']}
          />
        </div>
      </section>

      {/* Compare Platforms CTA */}
      <section className="bg-primary-600 dark:bg-primary-700">
        <div className="container-page py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to compare your options?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            We&apos;ve analyzed the leading game backend platforms so you can make an informed decision.
            See how they compare on features, pricing, and live service capabilities.
          </p>
          <Link
            href="/backends"
            className="inline-flex items-center justify-center rounded-lg font-medium bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 transition-colors"
          >
            Compare All Platforms
          </Link>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="container-page py-16 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Full Live Service Platforms</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Comprehensive solutions with everything you need to run a live service game
            </p>
          </div>
          <Link
            href="/backends?fit=comprehensive"
            className="hidden md:inline-flex btn-ghost text-primary-600 hover:text-primary-700"
          >
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comprehensiveBackends.slice(0, 6).map((backend) => (
            <BackendCard key={backend.slug} backend={backend} />
          ))}
        </div>
      </section>

      {/* Partial Solutions */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="container-page py-16 md:py-20">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Specialized Solutions</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Focused tools for specific needs - may require additional services for full live ops
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partialBackends.slice(0, 3).map((backend) => (
              <BackendCard key={backend.slug} backend={backend} />
            ))}
          </div>
        </div>
      </section>

      {/* Learn More */}
      <section className="container-page py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Want to learn more?</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Dive deeper into live service game operations
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {educationalContent.slice(0, 3).map((content) => (
            <Link
              key={content.slug}
              href={`/learn/${content.slug}`}
              className="card p-6 hover:shadow-md hover:border-primary-300 dark:hover:border-primary-700 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-sm font-bold">
                  {content.order}
                </span>
                <span className="text-sm text-slate-500">Guide</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                {content.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {content.description}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/learn" className="btn-secondary">
            View All Guides
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card p-6">
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
            <svg className="w-4 h-4 text-green-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

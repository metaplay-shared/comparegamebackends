import { Metadata } from 'next';
import Link from 'next/link';
import { educationalContent } from '@/lib/backends';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, itemListSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Learn - Live Service Game Operations',
  description:
    'Guides on running a live service game — live ops, player retention, monetization and game economy, and analytics — and how backend platforms support each one.',
  keywords: [
    'live service games',
    'live ops guide',
    'game monetization',
    'player retention',
    'game analytics',
  ],
  alternates: { canonical: '/learn' },
  openGraph: {
    title: 'Learn - Live Service Game Operations',
    description:
      'Guides on running a live service game — live ops, retention, monetization, and analytics.',
    url: '/learn',
  },
};

const guideIcons: Record<string, React.ReactNode> = {
  'what-is-live-service': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'pillars-of-live-ops': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  'retention-engagement': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  'monetization-economy': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'analytics-optimization': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

export default function LearnPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Learn', path: '/learn' },
          ]),
          itemListSchema(
            'Live service game operations guides',
            educationalContent.map((c) => ({ name: c.title, path: `/learn/${c.slug}` }))
          ),
        ]}
      />
      {/* Hero Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 text-sm font-medium mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Learning Center
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-slate-50">
          Master Live Service
          <span className="text-primary-600"> Game Operations</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          Running a successful live service game requires understanding multiple disciplines.
          These comprehensive guides cover everything your team needs to know.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid gap-6 mb-20">
        {educationalContent.map((content, index) => (
          <Link
            key={content.slug}
            href={`/learn/${content.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8">
              {/* Number and Icon */}
              <div className="flex items-center gap-4 md:gap-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                    {guideIcons[content.slug] || (
                      <span className="text-2xl font-bold">{content.order}</span>
                    )}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-primary-500 flex items-center justify-center text-xs font-bold text-primary-600">
                    {content.order}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary-600 transition-colors">
                  {content.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {content.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 group-hover:text-primary-600 transition-all">
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Progress indicator line */}
            <div className="h-1 bg-slate-100 dark:bg-slate-700">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-300"
                style={{ width: `${((index + 1) / educationalContent.length) * 100}%` }}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Why Live Service?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The live service model has transformed the games industry, creating opportunities
            for sustained engagement and revenue.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">$180B+</div>
            <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Global Market</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Increasingly driven by live service models
            </div>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-800">
            <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">10x</div>
            <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Higher LTV</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Engaged players vs. traditional games
            </div>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800">
            <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">5-10+</div>
            <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Years of Operation</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Top games building lasting communities
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center p-10 md:p-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 border border-slate-700">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to compare backend platforms?
        </h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          See how different platforms support these live service capabilities
          and find the right fit for your game.
        </p>
        <Link href="/backends" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors">
          Compare Platforms
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </div>
  );
}

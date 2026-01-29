import { Metadata } from 'next';
import Link from 'next/link';
import { educationalContent } from '@/lib/backends';

export const metadata: Metadata = {
  title: 'Learn - Live Service Game Operations',
  description:
    'Learn everything you need to know about running a live service game - from player retention to monetization, analytics to live ops.',
};

export default function LearnPage() {
  return (
    <div className="container-page py-12 md:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Learn Live Service Game Operations
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Running a successful live service game requires understanding multiple disciplines.
          These guides cover the essential knowledge every game team needs.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {educationalContent.map((content) => (
          <Link
            key={content.slug}
            href={`/learn/${content.slug}`}
            className="card p-6 hover:shadow-md hover:border-primary-300 dark:hover:border-primary-700 transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold">
                {content.order}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">Guide</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
              {content.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {content.description}
            </p>
            <div className="mt-4 text-primary-600 text-sm font-medium group-hover:underline">
              Read guide →
            </div>
          </Link>
        ))}
      </div>

      {/* Why Live Service Section */}
      <section className="card p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6">Why Live Service?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">$180B+</div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Global games market revenue, increasingly driven by live service models
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">10x</div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Higher lifetime value from engaged live service players vs. traditional games
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">Years</div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Top live service games operate for 5-10+ years, building lasting player communities
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-xl font-semibold mb-4">Ready to compare backend platforms?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          See how different platforms support these live service capabilities.
        </p>
        <Link href="/backends" className="btn-primary">
          Compare Platforms
        </Link>
      </section>
    </div>
  );
}

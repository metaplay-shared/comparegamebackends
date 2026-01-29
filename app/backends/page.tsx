import { Metadata } from 'next';
import Link from 'next/link';
import { ComparisonTable } from '@/components/ComparisonTable';

export const metadata: Metadata = {
  title: 'Compare Live Service Platforms',
  description:
    'Compare game backend platforms for live service games. Filter by features, pricing, and coverage to find the right backend for your game.',
};

export default function BackendsPage() {
  return (
    <div className="container-page py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Compare Live Service Platforms</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Compare backend platforms based on their support for live service game features.
          Filter by category to see how each platform handles different aspects of live ops.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="card p-6">
        <ComparisonTable />
      </div>

      {/* Understanding the Comparison */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
            <svg
              className="w-5 h-5 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Full Platforms</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Comprehensive solutions that cover most live service needs out of the box.
            Best for teams wanting an integrated solution.
          </p>
        </div>

        <div className="card p-6">
          <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
            <svg
              className="w-5 h-5 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Partial Solutions</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Specialized tools that excel at specific tasks like networking or matchmaking.
            May require additional services for full live ops.
          </p>
        </div>

        <div className="card p-6">
          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Open Source</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Self-hostable solutions offering flexibility and control. Ideal for teams
            with DevOps capability who want to own their infrastructure.
          </p>
        </div>
      </div>

      {/* Learn More CTA */}
      <div className="mt-12 card p-8 text-center bg-slate-50 dark:bg-slate-800/50">
        <h2 className="text-xl font-semibold mb-4">New to live service games?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
          Learn what it takes to run a successful live service game before choosing your
          backend infrastructure.
        </p>
        <Link href="/learn" className="btn-primary">
          Read Our Guides
        </Link>
      </div>
    </div>
  );
}

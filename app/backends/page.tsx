import { Metadata } from 'next';
import { ComparisonTable } from '@/components/ComparisonTable';

export const metadata: Metadata = {
  title: 'Compare Game Backends',
  description:
    'Interactive comparison table of all game backend solutions. Filter by type, pricing, and features to find the perfect backend for your multiplayer game.',
};

export default function BackendsPage() {
  return (
    <div className="container-page py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Compare Game Backends</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Use the filters below to narrow down your options. Click on any backend name to see
          detailed information, pros and cons, and platform support.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="card p-6">
        <ComparisonTable />
      </div>

      {/* Help Section */}
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Commercial Solutions</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Fully managed services with support, SLAs, and enterprise features. Best for teams
            that want to focus on game development.
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
            Self-hosted solutions with full control over your infrastructure. Great for teams
            with DevOps expertise and custom requirements.
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Pricing Models</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Options range from completely free open-source to enterprise pricing. Many offer
            freemium tiers perfect for prototyping.
          </p>
        </div>
      </div>
    </div>
  );
}

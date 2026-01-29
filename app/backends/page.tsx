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

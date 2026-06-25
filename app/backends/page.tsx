import { Metadata } from 'next';
import Link from 'next/link';
import { ArchitectureComparisonTable } from '@/components/ArchitectureComparisonTable';
import { ComparisonTable } from '@/components/ComparisonTable';

export const metadata: Metadata = {
  title: 'Compare Game Backends',
  description:
    'Compare game backend platforms side-by-side across the architectural dimensions that matter most for live service games.',
};

export default function ComparePage() {
  return (
    <div className="container-page py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Compare Game Backends</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          Feature checklists only tell part of the story. Two backends can both tick &quot;server authoritative&quot;
          while implementing it in fundamentally different ways. This comparison focuses on the architectural
          dimensions that reveal the deeper differences between platforms.
        </p>
      </div>

      {/* Architecture Comparison Table */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-2">Architecture Comparison</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          How each platform approaches the nine dimensions that matter most. Scroll horizontally to see all platforms.
        </p>
        <div className="card p-6">
          <ArchitectureComparisonTable />
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-2">Feature Comparison</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Side-by-side support across every live service feature, including AI. Filter by category, and hover any ✓ for details and source documentation.
        </p>
        <div className="card p-6">
          <ComparisonTable />
        </div>
      </div>

      {/* Learn More CTA */}
      <div className="card p-8 text-center bg-neutral-50 dark:bg-neutral-800/50">
        <h2 className="text-xl font-semibold mb-4">New to live service games?</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-xl mx-auto">
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

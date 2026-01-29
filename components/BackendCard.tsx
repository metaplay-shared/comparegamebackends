import Link from 'next/link';
import { Backend, typeLabels, pricingLabels, liveServiceFitLabels } from '@/lib/backends';

interface BackendCardProps {
  backend: Backend;
}

function TypeBadge({ type }: { type: Backend['type'] }) {
  const styles = {
    'full-platform': 'badge-primary',
    'partial-solution': 'badge-amber',
    'open-source': 'badge-green',
  };

  return <span className={styles[type]}>{typeLabels[type]}</span>;
}

function FitBadge({ fit }: { fit: Backend['liveServiceFit'] }) {
  const styles = {
    comprehensive: 'badge-green',
    partial: 'badge-amber',
    minimal: 'badge-slate',
  };

  return <span className={styles[fit]}>{liveServiceFitLabels[fit]}</span>;
}

export function BackendCard({ backend }: BackendCardProps) {
  const featureCount = Object.values(backend.features).filter(Boolean).length;
  const totalFeatures = Object.keys(backend.features).length;

  return (
    <Link href={`/backends/${backend.slug}`} className="block group">
      <div className="card p-6 h-full transition-all hover:shadow-md hover:border-primary-300 dark:hover:border-primary-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl font-bold text-primary-600">
              {backend.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary-600 transition-colors">
                {backend.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {pricingLabels[backend.pricingModel]}
              </p>
            </div>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
          {backend.tagline}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <TypeBadge type={backend.type} />
          <FitBadge fit={backend.liveServiceFit} />
        </div>

        {/* Feature coverage bar */}
        <div className="mt-auto">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Live ops features</span>
            <span>{featureCount}/{totalFeatures}</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                featureCount / totalFeatures > 0.7
                  ? 'bg-green-500'
                  : featureCount / totalFeatures > 0.4
                  ? 'bg-amber-500'
                  : 'bg-slate-400'
              }`}
              style={{ width: `${(featureCount / totalFeatures) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

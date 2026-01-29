import Link from 'next/link';
import { Backend, typeLabels, pricingLabels } from '@/lib/backends';

interface BackendCardProps {
  backend: Backend;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? 'text-amber-400 fill-current'
              : star - 0.5 <= rating
              ? 'text-amber-400 fill-current opacity-50'
              : 'text-slate-300 dark:text-slate-600'
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-slate-600 dark:text-slate-400">{rating.toFixed(1)}</span>
    </div>
  );
}

function TypeBadge({ type }: { type: Backend['type'] }) {
  const styles = {
    commercial: 'badge-primary',
    'open-source': 'badge-green',
    hybrid: 'badge-purple',
  };

  return <span className={styles[type]}>{typeLabels[type]}</span>;
}

function PricingBadge({ pricing }: { pricing: Backend['pricingModel'] }) {
  const styles = {
    free: 'badge-green',
    freemium: 'badge-primary',
    paid: 'badge-amber',
    enterprise: 'badge-slate',
  };

  return <span className={styles[pricing]}>{pricingLabels[pricing]}</span>;
}

export function BackendCard({ backend }: BackendCardProps) {
  const featureCount = Object.values(backend.features).filter(Boolean).length;

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
              <StarRating rating={backend.rating} />
            </div>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
          {backend.tagline}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <TypeBadge type={backend.type} />
          <PricingBadge pricing={backend.pricingModel} />
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>{featureCount} features</span>
          <span>{backend.platforms.length} platforms</span>
        </div>
      </div>
    </Link>
  );
}

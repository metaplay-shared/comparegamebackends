import Link from 'next/link';
import { Backend } from '@/lib/backends';

interface BackendCardProps {
  backend: Backend;
}

export function BackendCard({ backend }: BackendCardProps) {
  return (
    <Link href={`/backends/${backend.slug}`} className="block group">
      <div className="card p-6 h-full transition-all hover:shadow-md hover:border-primary-300 dark:hover:border-primary-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl font-bold text-primary-600">
            {backend.name.charAt(0)}
          </div>
          <h3 className="font-semibold text-lg group-hover:text-primary-600 transition-colors">
            {backend.name}
          </h3>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm">
          {backend.tagline}
        </p>
      </div>
    </Link>
  );
}

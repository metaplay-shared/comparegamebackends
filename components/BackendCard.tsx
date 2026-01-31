import Image from 'next/image';
import Link from 'next/link';
import { Backend } from '@/lib/backends';

interface BackendCardProps {
  backend: Backend;
}

export function BackendCard({ backend }: BackendCardProps) {
  return (
    <Link href={`/backends/${backend.slug}`} className="block group">
      <div className="card p-6 h-full transition-all hover:shadow-md hover:border-primary-300 dark:hover:border-primary-700">
        <div className="h-10 mb-4">
          <Image
            src={backend.logo}
            alt={`${backend.name} logo`}
            width={120}
            height={40}
            className="object-contain object-left h-full w-auto max-w-[140px]"
          />
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
          {backend.name}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          {backend.tagline}
        </p>
      </div>
    </Link>
  );
}

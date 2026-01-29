import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug, getBackendsByUseCase } from '@/lib/backends';
import { BackendCard } from '@/components/BackendCard';
import { UseCase } from '@/lib/types';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${categoryData.name} - Game Backend Solutions`,
    description: categoryData.description,
    openGraph: {
      title: `${categoryData.name} - Game Backend Solutions`,
      description: categoryData.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  const categoryBackends = getBackendsByUseCase(category as UseCase);

  return (
    <div className="container-page py-12 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/backends" className="hover:text-primary-600">
              Backends
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-slate-50">{categoryData.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryData.name}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          {categoryData.description}
        </p>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className={`badge transition-colors ${
              cat.slug === category
                ? 'badge-primary'
                : 'badge-slate hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Results */}
      {categoryBackends.length > 0 ? (
        <>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            {categoryBackends.length} backend{categoryBackends.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryBackends.map((backend) => (
              <BackendCard key={backend.slug} backend={backend} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-600 dark:text-slate-400">
            No backends found for this category yet.
          </p>
          <Link href="/backends" className="btn-primary mt-4 inline-block">
            View All Backends
          </Link>
        </div>
      )}

      {/* Tips Section */}
      <section className="mt-16 card p-8">
        <h2 className="text-xl font-semibold mb-4">
          Tips for Choosing a Backend for {categoryData.name}
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <CategoryTips category={category} />
        </div>
      </section>

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <Link href="/backends" className="btn-ghost text-primary-600 hover:text-primary-700">
          ← Back to all backends
        </Link>
      </div>
    </div>
  );
}

function CategoryTips({ category }: { category: string }) {
  const tips: Record<string, React.ReactNode> = {
    mmo: (
      <ul className="text-slate-600 dark:text-slate-400 space-y-2">
        <li>
          <strong>Scalability is paramount</strong> - Look for solutions that can handle thousands
          of concurrent players and scale horizontally.
        </li>
        <li>
          <strong>Persistence matters</strong> - MMOs need robust database solutions for storing
          player progress, inventory, and world state.
        </li>
        <li>
          <strong>Consider costs at scale</strong> - MMO player bases can grow quickly; choose
          pricing models that remain cost-effective as you scale.
        </li>
        <li>
          <strong>Region support</strong> - Global MMOs need multi-region deployment to minimize
          latency for players worldwide.
        </li>
      </ul>
    ),
    mobile: (
      <ul className="text-slate-600 dark:text-slate-400 space-y-2">
        <li>
          <strong>Cloud save is essential</strong> - Mobile players expect their progress to sync
          across devices seamlessly.
        </li>
        <li>
          <strong>Push notifications</strong> - Keep players engaged with timely notifications
          about events and rewards.
        </li>
        <li>
          <strong>Analytics integration</strong> - Mobile games benefit greatly from detailed
          analytics for monetization and retention.
        </li>
        <li>
          <strong>Lightweight SDKs</strong> - Choose backends with mobile-optimized SDKs that
          don&apos;t bloat your app size.
        </li>
      </ul>
    ),
    indie: (
      <ul className="text-slate-600 dark:text-slate-400 space-y-2">
        <li>
          <strong>Free tiers are your friend</strong> - Many backends offer generous free tiers
          perfect for development and early launch.
        </li>
        <li>
          <strong>Ease of use</strong> - As a small team, choose solutions with good documentation
          and quick setup times.
        </li>
        <li>
          <strong>Community support</strong> - Open-source options often have active communities
          that can help with issues.
        </li>
        <li>
          <strong>Scalable pricing</strong> - Pick solutions where costs grow gradually with your
          player base.
        </li>
      </ul>
    ),
    competitive: (
      <ul className="text-slate-600 dark:text-slate-400 space-y-2">
        <li>
          <strong>Low latency is critical</strong> - Competitive games require minimal network
          delay; look for solutions with global server presence.
        </li>
        <li>
          <strong>Robust matchmaking</strong> - Skill-based matchmaking keeps players engaged and
          matches fair.
        </li>
        <li>
          <strong>Anti-cheat considerations</strong> - Authoritative servers and validation help
          prevent cheating.
        </li>
        <li>
          <strong>Leaderboards and rankings</strong> - Competitive players want to track their
          progress and compare with others.
        </li>
      </ul>
    ),
    casual: (
      <ul className="text-slate-600 dark:text-slate-400 space-y-2">
        <li>
          <strong>Quick integration</strong> - Casual games often have shorter development cycles;
          choose plug-and-play solutions.
        </li>
        <li>
          <strong>Social features</strong> - Friends, leaderboards, and sharing enhance casual
          game experiences.
        </li>
        <li>
          <strong>Reliable cloud save</strong> - Casual players may play across multiple sessions
          and devices.
        </li>
        <li>
          <strong>Cost efficiency</strong> - Casual games may have lower ARPU; keep backend costs
          manageable.
        </li>
      </ul>
    ),
  };

  return tips[category] || (
    <p className="text-slate-600 dark:text-slate-400">
      Consider your specific requirements around scalability, features, and budget when choosing
      a backend for your game.
    </p>
  );
}

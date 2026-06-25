import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'An open-source, community-driven comparison of game backend platforms. Published by Metaplay, maintained by the game dev community.',
};

export default function AboutPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About This Site</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            An open-source community resource for game developers evaluating backend platforms.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Why This Exists</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Choosing a game backend is one of the most consequential infrastructure decisions
              a game studio makes. Yet most of the information available comes from the vendors
              themselves — marketing pages, cherry-picked case studies, and feature lists that
              are hard to compare across platforms.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              We built this site to be the resource we wished existed: an honest, objective
              comparison maintained by the community, not by any single vendor. Every piece
              of data on this site is backed by public documentation, and anyone can propose
              changes by submitting a pull request to the open-source repo.
            </p>
          </div>
        </section>

        {/* Community Driven */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Community-Driven</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              This site is fully open source. The entire codebase — every platform comparison,
              feature claim, and architectural assessment — lives in a public GitHub repo that
              anyone can inspect, fork, and contribute to.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              Found something outdated? Think a platform is missing a feature we haven&apos;t
              listed? Spotted a factual error? Open a pull request. Whether you&apos;re a game
              developer, a platform vendor, or just someone who cares about accuracy, your
              contributions are welcome.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              The repository lives at{' '}
              <a href="https://github.com/metaplay-shared/comparegamebackends" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 hover:underline">github.com/metaplay-shared/comparegamebackends</a>.
              See the{' '}
              <Link href="/contribute" className="text-primary-500 hover:text-primary-600 hover:underline">contribution guide</Link>{' '}
              for how pull requests are reviewed.
            </p>
          </div>
        </section>

        {/* What We Cover */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What We Cover</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card p-5">
              <h3 className="font-semibold mb-2">Educational Content</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Guides on retention, monetization, analytics, and the fundamentals of running
                live service games.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold mb-2">Platform Comparisons</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Objective feature comparisons of backend platforms, from full solutions to
                specialized tools.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold mb-2">Game Type Guides</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Specific considerations for F2P mobile, PC/console live service, MMO, and
                other game types.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold mb-2">Feature Analysis</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Deep dives into specific live ops capabilities and how different platforms
                support them.
              </p>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-xs font-bold">
                  1
                </span>
                Facts, Not Opinions
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Every feature claim links to public documentation. No subjective ratings,
                no &quot;best of&quot; picks. Each platform has strengths for different use cases —
                our job is to present the facts so you can decide what matters for your game.
              </p>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-xs font-bold">
                  2
                </span>
                Open to Correction
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                No single person or company can be an expert on every platform. That&apos;s
                why this is a community project. If something is wrong or outdated, anyone
                can fix it — including the platform vendors themselves.
              </p>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-xs font-bold">
                  3
                </span>
                Live Service Lens
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                We evaluate platforms specifically for live service game requirements.
                Some excellent tools handle networking but not live ops — we clearly
                distinguish between comprehensive platforms and specialized tools.
              </p>
            </div>
          </div>
        </section>

        {/* Published by Metaplay */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Published by Metaplay</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              This site was created and is published by{' '}
              <a href="https://metaplay.io" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 hover:underline">Metaplay</a>,
              a game backend platform. Yes, Metaplay is one of the platforms compared here.
              We believe transparency is more valuable than pretending to be neutral from
              the shadows — so here it is, plainly stated.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              We created this resource because we think the game dev community benefits from
              honest, factual comparisons. If our platform is genuinely good, the facts speak
              for themselves. And because the repo is open, anyone can hold us accountable
              if the information is ever skewed.
            </p>
          </div>
        </section>

        {/* Staying Current */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Staying Current</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The game backend space evolves quickly. Platforms add features, pricing
              changes, and new solutions emerge. Because this is a community project,
              it stays current through contributions — not through one person trying
              to track every changelog.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              Each platform page shows when it was last updated. If you spot something
              outdated, submit a pull request or{' '}
              <a href="https://github.com/metaplay-shared/comparegamebackends/issues/new/choose" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 hover:underline">open an issue on GitHub</a>.
            </p>
          </div>
        </section>

        {/* Contribute */}
        <section className="card p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Contribute</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Want to add a platform, fix an error, or improve the content?
            The entire site is open source — fork the repo and submit a pull request.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://github.com/metaplay-shared/comparegamebackends"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View on GitHub
            </a>
            <Link href="/contribute" className="btn-secondary">
              How to Contribute
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

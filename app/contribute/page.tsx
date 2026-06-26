import { Metadata } from 'next';
import Link from 'next/link';

const REPO_URL = 'https://github.com/metaplay-shared/comparegamebackends';

export const metadata: Metadata = {
  title: 'Contribute',
  description:
    'How to contribute to Compare Game Backends — an open-source, community-maintained comparison of game backend platforms. Fork the repo, open a pull request, and a maintainer reviews it.',
  keywords: [
    'contribute game backend comparison',
    'open source game backend data',
    'add a game backend platform',
  ],
  alternates: { canonical: '/contribute' },
  openGraph: {
    title: 'Contribute to Compare Game Backends',
    description:
      'Fork the repo, open a pull request, and a maintainer reviews it. Corrections welcome from anyone, including competing vendors.',
    url: '/contribute',
  },
};

const steps = [
  {
    title: 'Fork and edit',
    body: 'Fork the repository and make your change on a branch. Platform data lives in lib/backends.ts — each feature is a small object with a description and a sourceUrl pointing to the official documentation that backs it.',
  },
  {
    title: 'Open a pull request',
    body: 'Push your branch and open a pull request against main. The template asks what changed, which platforms it affects, and the sources for every claim. A build check runs automatically.',
  },
  {
    title: 'Review and approval',
    body: 'A maintainer reviews it. Sourced, neutral, accurate changes get approved and merged. If something needs work you get specific feedback; unsourced or biased changes are declined with a reason.',
  },
  {
    title: 'Merged and live',
    body: 'Once merged, your change deploys to comparegamebackends.com. Each platform page shows the date it was last updated.',
  },
];

export default function ContributePage() {
  return (
    <div className="container-page py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contribute</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            This site is open source and community-maintained. Anyone can propose a
            change — and the more eyes on the data, the more accurate it stays.
          </p>
        </div>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How it works</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Every change goes through a pull request that a maintainer reviews and
            approves or declines. There is no special access required — a fork and a
            PR is all it takes.
          </p>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step.title} className="card p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-xs font-bold">
                    {i + 1}
                  </span>
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The one rule */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The one rule: cite your sources</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The value of this site is that every claim is checkable. So each feature
              entry links to official documentation — a vendor&apos;s docs, pricing page,
              or official repository. Changes without a source will be asked for one or
              declined.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              We also keep the tone neutral: no marketing superlatives, no
              &quot;best of&quot; picks, and an honest set of strengths and limitations
              for every platform — including the one that publishes the site. Full
              guidelines are in the{' '}
              <a href={`${REPO_URL}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 hover:underline">contributor guide</a>.
            </p>
          </div>
        </section>

        {/* Common contributions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Common contributions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card p-5">
              <h3 className="font-semibold mb-2">Fix or update data</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                A platform shipped a feature, changed its pricing, or a claim is out of
                date. Edit its entry in lib/backends.ts, update the source link, and open
                a PR — or file it as an issue.
              </p>
              <a href={`${REPO_URL}/issues/new?template=data-correction.md`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-500 hover:text-primary-600 hover:underline">
                Report a correction →
              </a>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold mb-2">Add a platform</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Think a backend belongs here? Add an entry with its features and sources,
                a logo, and an architecture assessment. The contributor guide walks through
                the data model field by field.
              </p>
              <a href={`${REPO_URL}/issues/new?template=add-platform.md`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-500 hover:text-primary-600 hover:underline">
                Suggest a platform →
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="card p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to dig in?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The code, the data, and the contribution process all live on GitHub.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              View on GitHub
            </a>
            <a href={`${REPO_URL}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Read the contributor guide
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

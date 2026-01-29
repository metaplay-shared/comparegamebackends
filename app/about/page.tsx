import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Live Service Backends, our mission to educate game developers about live ops, and our approach to platform comparisons.',
};

export default function AboutPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About This Site</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Helping game developers understand and succeed with live service games.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The live service model has transformed gaming. Games that once shipped as complete
              products now operate as evolving services, continuously updated and improved over
              years of operation. This shift requires new skills, new infrastructure, and new
              ways of thinking about game development.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              This site exists to help game developers navigate this landscape. We provide
              educational content about live ops best practices, and objective comparisons
              of backend platforms to help you make informed infrastructure decisions.
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
          <h2 className="text-2xl font-semibold mb-4">Our Approach to Comparisons</h2>
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-xs font-bold">
                  1
                </span>
                Feature-Based, Not Opinion-Based
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                We focus on objective feature comparisons rather than subjective ratings.
                Each platform has strengths for different use cases - our job is to help
                you identify what matters for your game.
              </p>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-xs font-bold">
                  2
                </span>
                Live Service Lens
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                We evaluate platforms specifically for live service game requirements.
                Some excellent tools are partial solutions that handle networking but not
                live ops - we clearly distinguish between comprehensive platforms and
                specialized tools.
              </p>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-xs font-bold">
                  3
                </span>
                Practical Focus
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                We highlight what each platform is best suited for, documented limitations,
                and practical considerations for different game types and team sizes.
              </p>
            </div>
          </div>
        </section>

        {/* Keeping Updated */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Staying Current</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The game backend space evolves quickly. Platforms add new features, pricing
              changes, and new solutions emerge. We regularly review and update our
              information to ensure accuracy.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              Each platform page shows when it was last updated. If you notice outdated
              information, please let us know.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="card p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Questions or Feedback?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Have a platform we should cover? Found an error? Want to contribute?
            We&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:hello@gamebackends.com"
              className="btn-primary"
            >
              Get in Touch
            </a>
            <Link href="/backends" className="btn-secondary">
              Explore Platforms
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

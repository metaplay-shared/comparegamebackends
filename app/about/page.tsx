import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about GameBackends, our mission to help game developers find the right backend infrastructure, and our review methodology.',
};

export default function AboutPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About GameBackends</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Helping game developers make informed decisions about backend infrastructure.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Choosing the right backend for your game is one of the most important technical
              decisions you&apos;ll make. The wrong choice can lead to scaling issues, unexpected
              costs, or missing critical features when you need them most.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              GameBackends exists to make this decision easier. We provide detailed, unbiased
              comparisons of game backend solutions, from fully managed commercial platforms to
              open-source alternatives. Whether you&apos;re an indie developer working on your first
              multiplayer game or a studio scaling to millions of players, we help you find the
              right fit.
            </p>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Methodology</h2>
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-sm font-bold">
                  1
                </span>
                Feature Analysis
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                We catalog and verify each backend&apos;s features through documentation review,
                hands-on testing, and community feedback. Features are categorized consistently
                across all platforms for fair comparison.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-sm font-bold">
                  2
                </span>
                Pricing Transparency
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                We document pricing models, free tier limits, and scaling costs. Where possible,
                we provide real-world cost estimates for different usage scenarios.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-sm font-bold">
                  3
                </span>
                Practical Testing
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Our reviews include hands-on experience with setup, documentation quality, SDK
                usability, and developer experience. We note pain points and highlights from
                real implementation.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-sm font-bold">
                  4
                </span>
                Community Input
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                We gather feedback from developers actively using these platforms, incorporating
                real-world experiences and edge cases into our reviews.
              </p>
            </div>
          </div>
        </section>

        {/* Rating System */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Rating System</h2>
          <div className="card p-6">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Our ratings (1-5 stars) are based on a weighted combination of factors:
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-3">
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  30%
                </span>
                <span>Feature completeness and quality</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  25%
                </span>
                <span>Documentation and developer experience</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  20%
                </span>
                <span>Pricing value and transparency</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  15%
                </span>
                <span>Platform and SDK support</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  10%
                </span>
                <span>Community and ecosystem</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Independence */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Independence</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              GameBackends is independently operated. We do not accept payment for reviews or
              rankings. Our goal is to provide honest, useful information to help developers
              make the best choice for their specific needs.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              If we have affiliate relationships in the future, they will be clearly disclosed
              and will never influence our ratings or recommendations.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="card p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Have a suggestion for a backend we should review? Found an error in our information?
            We&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:hello@gamebackends.com"
              className="btn-primary"
            >
              Contact Us
            </a>
            <Link href="/backends" className="btn-secondary">
              Explore Backends
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

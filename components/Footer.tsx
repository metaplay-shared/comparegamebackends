import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display font-medium mb-4">
              <span className="text-primary-500">⬡</span>
              <span>Compare Game Backends</span>
            </Link>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-sm">
              Find the best game backend for your project. Compare platforms,
              understand what you need, and make an informed decision.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm mb-4 text-neutral-900 dark:text-neutral-100">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn/what-is-live-service" className="text-neutral-500 dark:text-neutral-400 hover:text-primary-500 transition-colors font-display">
                  What is Live Service?
                </Link>
              </li>
              <li>
                <Link href="/learn/pillars-of-live-ops" className="text-neutral-500 dark:text-neutral-400 hover:text-primary-500 transition-colors font-display">
                  Pillars of Live Ops
                </Link>
              </li>
              <li>
                <Link href="/learn/retention-engagement" className="text-neutral-500 dark:text-neutral-400 hover:text-primary-500 transition-colors font-display">
                  Retention & Engagement
                </Link>
              </li>
              <li>
                <Link href="/learn/monetization-economy" className="text-neutral-500 dark:text-neutral-400 hover:text-primary-500 transition-colors font-display">
                  Monetization & Economy
                </Link>
              </li>
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h3 className="text-sm mb-4 text-neutral-900 dark:text-neutral-100">Compare</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/backends" className="text-neutral-500 dark:text-neutral-400 hover:text-primary-500 transition-colors font-display">
                  Compare Backends
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-500 dark:text-neutral-400 hover:text-primary-500 transition-colors font-display">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-500 dark:text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Compare Game Backends</p>
        </div>
      </div>
    </footer>
  );
}

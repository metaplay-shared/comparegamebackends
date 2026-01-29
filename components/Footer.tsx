import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg mb-4">
              <svg
                className="h-8 w-8 text-primary-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>GameBackends</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm">
              Your guide to choosing the right backend infrastructure for your game.
              Compare features, pricing, and find the perfect fit for your project.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/backends" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                  Compare Backends
                </Link>
              </li>
              <li>
                <Link href="/categories/indie" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                  For Indies
                </Link>
              </li>
              <li>
                <Link href="/categories/mobile" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                  For Mobile
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/mmo" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                  MMO Games
                </Link>
              </li>
              <li>
                <Link href="/categories/competitive" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                  Competitive
                </Link>
              </li>
              <li>
                <Link href="/categories/casual" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                  Casual Games
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} GameBackends. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'A running log of every change to Compare Game Backends, pulled straight from the public GitHub repository. Every update is a commit anyone can inspect.',
};

// Refresh hourly; every merge to main also triggers a fresh deploy.
export const revalidate = 3600;

const REPO = 'metaplay-shared/comparegamebackends';
const REPO_URL = `https://github.com/${REPO}`;

type Commit = {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
};

async function getCommits(): Promise<Commit[] | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/commits?per_page=40`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'comparegamebackends-changelog',
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;
    return data.map((c: { sha?: string; html_url?: string; commit?: { message?: string; author?: { name?: string; date?: string } }; author?: { login?: string } }) => ({
      sha: (c.sha ?? '').slice(0, 7),
      message: (c.commit?.message ?? '').split('\n')[0],
      author: c.commit?.author?.name ?? c.author?.login ?? 'Unknown',
      date: c.commit?.author?.date ?? '',
      url: c.html_url ?? `${REPO_URL}/commit/${c.sha ?? ''}`,
    }));
  } catch {
    return null;
  }
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function ChangelogPage() {
  const commits = await getCommits();

  return (
    <div className="container-page py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Changelog</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Every change to this site is a public commit on GitHub — nothing is edited behind the
            scenes. This log is pulled straight from the repository, so it stays honest by design.
          </p>
        </div>

        {commits && commits.length > 0 ? (
          <ol className="relative border-l border-neutral-200 dark:border-neutral-800 ml-2">
            {commits.map((c) => (
              <li key={c.sha} className="mb-6 ml-6">
                <span className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-primary-500/70 border-2 border-white dark:border-neutral-900" />
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="block group">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-primary-500 transition-colors">
                    {c.message}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {formatDate(c.date)} · {c.author} · <span className="font-mono">{c.sha}</span>
                  </p>
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <div className="card p-6">
            <p className="text-slate-600 dark:text-slate-400">
              The live commit feed couldn&apos;t be loaded right now. You can always view the full
              history on{' '}
              <a href={`${REPO_URL}/commits`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 hover:underline">
                GitHub
              </a>
              .
            </p>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-4 text-sm">
          <a href={`${REPO_URL}/commits`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 hover:underline">
            All commits on GitHub →
          </a>
          <a href={`${REPO_URL}/pulls?q=is%3Apr`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 hover:underline">
            Pull requests →
          </a>
          <Link href="/contribute" className="text-primary-500 hover:text-primary-600 hover:underline">
            How to contribute →
          </Link>
        </div>
      </div>
    </div>
  );
}

interface FeatureListProps {
  items: Array<{
    title: string;
    description?: string;
  }>;
  columns?: 1 | 2;
}

export function FeatureList({ items, columns = 1 }: FeatureListProps) {
  return (
    <div className={`my-6 grid gap-3 ${columns === 2 ? 'md:grid-cols-2' : ''}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50"
        >
          <div className="shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 flex items-center justify-center mt-0.5">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-slate-900 dark:text-slate-100">{item.title}</div>
            {item.description && (
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{item.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

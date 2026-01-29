interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

export function StatCard({ value, label, description }: StatCardProps) {
  return (
    <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="text-3xl font-bold text-primary-600 mb-1">{value}</div>
      <div className="font-medium text-slate-900 dark:text-slate-100">{label}</div>
      {description && (
        <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</div>
      )}
    </div>
  );
}

interface StatGridProps {
  children: React.ReactNode;
}

export function StatGrid({ children }: StatGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
      {children}
    </div>
  );
}

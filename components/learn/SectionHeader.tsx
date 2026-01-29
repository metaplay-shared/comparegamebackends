interface SectionHeaderProps {
  icon?: React.ReactNode;
  number?: number;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ icon, number, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mt-12 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        {number !== undefined && (
          <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-600 font-bold text-sm flex items-center justify-center">
            {number}
          </span>
        )}
        {icon && (
          <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center">
            {icon}
          </span>
        )}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h2>
      </div>
      {subtitle && (
        <p className="mt-2 text-slate-600 dark:text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}

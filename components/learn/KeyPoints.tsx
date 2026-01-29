interface KeyPointsProps {
  title?: string;
  points: string[];
}

export function KeyPoints({ title = 'Key Takeaways', points }: KeyPointsProps) {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-xl border border-primary-200 dark:border-primary-800">
      <h4 className="flex items-center gap-2 font-semibold text-primary-900 dark:text-primary-100 mb-4">
        <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {title}
      </h4>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3 text-primary-800 dark:text-primary-200">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
              {index + 1}
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { Backend, featureLabels } from '@/lib/backends';

interface FeatureMatrixProps {
  backend: Backend;
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5 text-slate-300 dark:text-slate-600" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function FeatureMatrix({ backend }: FeatureMatrixProps) {
  const features = Object.entries(backend.features) as [keyof Backend['features'], boolean][];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {features.map(([key, value]) => (
        <div
          key={key}
          className={`flex items-center gap-2 p-3 rounded-lg ${
            value
              ? 'bg-green-50 dark:bg-green-900/20'
              : 'bg-slate-50 dark:bg-slate-800/50'
          }`}
        >
          {value ? <CheckIcon /> : <XIcon />}
          <span className={`text-sm ${value ? 'text-green-700 dark:text-green-300' : 'text-slate-500 dark:text-slate-400'}`}>
            {featureLabels[key]}
          </span>
        </div>
      ))}
    </div>
  );
}

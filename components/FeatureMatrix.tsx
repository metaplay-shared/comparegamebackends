import { Backend, featureLabels, featureCategories, LiveOpsFeatures } from '@/lib/backends';

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
  return (
    <div className="space-y-6">
      {Object.entries(featureCategories).map(([category, features]) => (
        <div key={category}>
          <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-3">{category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {features.map((featureKey) => {
              const hasFeature = backend.features[featureKey as keyof LiveOpsFeatures];
              return (
                <div
                  key={featureKey}
                  className={`flex items-center gap-2 p-2 rounded-lg ${
                    hasFeature
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'bg-slate-50 dark:bg-slate-800/50'
                  }`}
                >
                  {hasFeature ? <CheckIcon /> : <XIcon />}
                  <span
                    className={`text-sm ${
                      hasFeature
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {featureLabels[featureKey as keyof LiveOpsFeatures]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

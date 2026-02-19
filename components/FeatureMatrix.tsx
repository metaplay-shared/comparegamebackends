'use client';

import { Backend, featureLabels, featureCategories, LiveOpsFeatures, isFeatureSupported, getFeatureSourceUrl, getFeatureDescription } from '@/lib/backends';
import { FeatureTooltip } from './FeatureTooltip';

interface FeatureMatrixProps {
  backend: Backend;
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
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
    <svg className="h-5 w-5 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="h-3 w-3 opacity-50" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
    </svg>
  );
}

export function FeatureMatrix({ backend }: FeatureMatrixProps) {
  return (
    <div className="space-y-6">
      {Object.entries(featureCategories).map(([category, features]) => (
        <div key={category}>
          <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-3">{category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {features.map((featureKey) => {
              const feature = backend.features[featureKey as keyof LiveOpsFeatures];
              const hasFeature = isFeatureSupported(feature);
              const sourceUrl = getFeatureSourceUrl(feature);
              const description = getFeatureDescription(feature);

              const content = (
                <>
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
                  {(sourceUrl || description) && <ExternalLinkIcon />}
                </>
              );

              return (
                <FeatureTooltip
                  key={featureKey}
                  description={description}
                  sourceUrl={sourceUrl}
                >
                  <div
                    className={`flex items-start gap-2 p-2 rounded-lg transition-colors ${
                      hasFeature
                        ? 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30'
                        : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                    } ${description ? 'cursor-help' : ''}`}
                  >
                    {content}
                  </div>
                </FeatureTooltip>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

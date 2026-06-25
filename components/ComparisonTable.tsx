'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  backends,
  featureLabels,
  featureCategories,
  LiveOpsFeatures,
  isFeatureSupported,
  getFeatureSourceUrl,
  getFeatureDescription,
} from '@/lib/backends';
import { FeatureTooltip } from './FeatureTooltip';

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
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
    <svg className="h-5 w-5 text-neutral-300 dark:text-neutral-700" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Get all feature keys for the "All" category
const allFeatureKeys = Object.values(featureCategories).flat();
const sortedBackends = [...backends].sort((a, b) => a.name.localeCompare(b.name));

export function ComparisonTable() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryKeys = ['All', ...Object.keys(featureCategories)];
  const selectedFeatures = selectedCategory === 'All'
    ? allFeatureKeys
    : featureCategories[selectedCategory as keyof typeof featureCategories] || [];

  return (
    <div>
      {/* Hint about hovering for tooltips */}
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        Hover over a <span className="text-primary-500">✓</span> to see details and source documentation
      </p>

      {/* Feature Category Tabs */}
      <div className="mb-4">
        <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-2">
          Feature Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categoryKeys.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary-500 text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="text-left py-3 px-4 font-medium sticky left-0 z-10 bg-white dark:bg-neutral-900">
                Feature
              </th>
              {sortedBackends.map((backend) => (
                <th key={backend.slug} className="text-center py-3 px-2 font-medium whitespace-nowrap">
                  <Link
                    href={`/backends/${backend.slug}`}
                    className="text-xs hover:text-primary-500 transition-colors"
                  >
                    {backend.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedFeatures.map((feature) => (
              <tr
                key={feature}
                className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <td className="py-3 px-4 sticky left-0 z-10 bg-white dark:bg-neutral-900 whitespace-nowrap">
                  <span className="text-xs text-neutral-900 dark:text-neutral-100">
                    {featureLabels[feature as keyof LiveOpsFeatures]}
                  </span>
                </td>
                {sortedBackends.map((backend) => {
                  const featureValue = backend.features[feature as keyof LiveOpsFeatures];
                  const hasFeature = isFeatureSupported(featureValue);
                  const sourceUrl = getFeatureSourceUrl(featureValue);
                  const description = getFeatureDescription(featureValue);

                  return (
                    <td key={backend.slug} className="py-3 px-2 text-center">
                      <FeatureTooltip description={description} sourceUrl={sourceUrl}>
                        <span className={`inline-flex justify-center ${description ? 'cursor-help' : ''}`}>
                          {hasFeature ? <CheckIcon /> : <XIcon />}
                        </span>
                      </FeatureTooltip>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

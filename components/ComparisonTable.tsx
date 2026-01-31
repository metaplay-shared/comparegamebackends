'use client';

import { useState, useMemo } from 'react';
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

type SortField = 'name';
type SortDirection = 'asc' | 'desc';

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

// Get all feature keys for the "All" category
const allFeatureKeys = Object.values(featureCategories).flat();

export function ComparisonTable() {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const sortedBackends = useMemo(() => {
    const result = [...backends];

    // Apply sorting
    result.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return (
      <svg
        className={`h-4 w-4 ml-1 inline ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  const categoryKeys = ['All', ...Object.keys(featureCategories)];
  const selectedFeatures = selectedCategory === 'All'
    ? allFeatureKeys
    : featureCategories[selectedCategory as keyof typeof featureCategories] || [];

  return (
    <div>
      {/* Hint about hovering for tooltips */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Hover over a <span className="text-green-500">✓</span> to see details and source documentation
      </p>

      {/* Feature Category Tabs */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Feature Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categoryKeys.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll hint for All view */}
      {selectedCategory === 'All' && (
        <div className="mb-2 text-right">
          <span
            className="inline-block text-xs font-medium bg-gradient-to-r from-slate-400 via-primary-500 to-slate-400 dark:from-slate-500 dark:via-primary-400 dark:to-slate-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-text-shimmer"
          >
            Scroll →
          </span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-3 px-4 font-semibold sticky left-0 z-10 bg-white dark:bg-slate-900">
                <button
                  onClick={() => handleSort('name')}
                  className="hover:text-primary-600 inline-flex items-center"
                >
                  Game Backend
                  <SortIcon field="name" />
                </button>
              </th>
              {selectedFeatures.map((feature) => (
                <th key={feature} className="text-center py-3 px-2 font-semibold whitespace-nowrap">
                  <span className="text-xs">{featureLabels[feature as keyof LiveOpsFeatures]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedBackends.map((backend) => (
              <tr
                key={backend.slug}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="py-3 px-4 sticky left-0 z-10 bg-white dark:bg-slate-900">
                  <Link
                    href={`/backends/${backend.slug}`}
                    className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    {backend.name}
                  </Link>
                </td>
                {selectedFeatures.map((feature) => {
                  const featureValue = backend.features[feature as keyof LiveOpsFeatures];
                  const hasFeature = isFeatureSupported(featureValue);
                  const sourceUrl = getFeatureSourceUrl(featureValue);
                  const description = getFeatureDescription(featureValue);

                  return (
                    <td key={feature} className="py-3 px-2 text-center">
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

      {sortedBackends.length === 0 && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          No game backends match your current filters. Try adjusting your criteria.
        </div>
      )}
    </div>
  );
}

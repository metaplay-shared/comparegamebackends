'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Backend,
  backends,
  featureLabels,
  featureCategories,
  typeLabels,
  pricingLabels,
  liveServiceFitLabels,
  LiveOpsFeatures,
} from '@/lib/backends';

type SortField = 'name' | 'type' | 'pricingModel' | 'featureCount';
type SortDirection = 'asc' | 'desc';

interface Filters {
  type: Backend['type'] | 'all';
  pricing: Backend['pricingModel'] | 'all';
  fit: Backend['liveServiceFit'] | 'all';
  featureCategory: string | 'all';
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

export function ComparisonTable() {
  const [sortField, setSortField] = useState<SortField>('featureCount');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    pricing: 'all',
    fit: 'all',
    featureCategory: 'all',
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('Live Operations');

  const filteredAndSorted = useMemo(() => {
    let result = [...backends];

    // Apply filters
    if (filters.type !== 'all') {
      result = result.filter((b) => b.type === filters.type);
    }
    if (filters.pricing !== 'all') {
      result = result.filter((b) => b.pricingModel === filters.pricing);
    }
    if (filters.fit !== 'all') {
      result = result.filter((b) => b.liveServiceFit === filters.fit);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'pricingModel':
          comparison = a.pricingModel.localeCompare(b.pricingModel);
          break;
        case 'featureCount':
          const aCount = Object.values(a.features).filter(Boolean).length;
          const bCount = Object.values(b.features).filter(Boolean).length;
          comparison = aCount - bCount;
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [sortField, sortDirection, filters]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
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

  const categoryKeys = Object.keys(featureCategories);
  const selectedFeatures = featureCategories[selectedCategory as keyof typeof featureCategories] || [];

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Platform Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value as Filters['type'] })}
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
          >
            <option value="all">All Types</option>
            {Object.entries(typeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Pricing Model
          </label>
          <select
            value={filters.pricing}
            onChange={(e) => setFilters({ ...filters, pricing: e.target.value as Filters['pricing'] })}
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
          >
            <option value="all">All Pricing</option>
            {Object.entries(pricingLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Live Service Coverage
          </label>
          <select
            value={filters.fit}
            onChange={(e) => setFilters({ ...filters, fit: e.target.value as Filters['fit'] })}
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
          >
            <option value="all">All Coverage Levels</option>
            {Object.entries(liveServiceFitLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

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

      {/* Results count */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Showing {filteredAndSorted.length} of {backends.length} platforms
      </p>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-3 px-4 font-semibold sticky left-0 bg-white dark:bg-slate-900">
                <button
                  onClick={() => handleSort('name')}
                  className="hover:text-primary-600 inline-flex items-center"
                >
                  Platform
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort('type')}
                  className="hover:text-primary-600 inline-flex items-center"
                >
                  Type
                  <SortIcon field="type" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                Coverage
              </th>
              {selectedFeatures.map((feature) => (
                <th key={feature} className="text-center py-3 px-2 font-semibold whitespace-nowrap">
                  <span className="text-xs">{featureLabels[feature as keyof LiveOpsFeatures]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((backend) => (
              <tr
                key={backend.slug}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="py-3 px-4 sticky left-0 bg-white dark:bg-slate-900">
                  <Link
                    href={`/backends/${backend.slug}`}
                    className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    {backend.name}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`badge ${
                      backend.type === 'open-source'
                        ? 'badge-green'
                        : backend.type === 'full-platform'
                        ? 'badge-primary'
                        : 'badge-amber'
                    }`}
                  >
                    {typeLabels[backend.type]}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`badge ${
                      backend.liveServiceFit === 'comprehensive'
                        ? 'badge-green'
                        : backend.liveServiceFit === 'partial'
                        ? 'badge-amber'
                        : 'badge-slate'
                    }`}
                  >
                    {liveServiceFitLabels[backend.liveServiceFit]}
                  </span>
                </td>
                {selectedFeatures.map((feature) => (
                  <td key={feature} className="py-3 px-2 text-center">
                    {backend.features[feature as keyof LiveOpsFeatures] ? <CheckIcon /> : <XIcon />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          No platforms match your current filters. Try adjusting your criteria.
        </div>
      )}
    </div>
  );
}

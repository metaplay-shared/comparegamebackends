'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Backend, backends, featureLabels, typeLabels, pricingLabels } from '@/lib/backends';

type SortField = 'name' | 'rating' | 'type' | 'pricingModel';
type SortDirection = 'asc' | 'desc';

interface Filters {
  type: Backend['type'] | 'all';
  pricing: Backend['pricingModel'] | 'all';
  feature: keyof Backend['features'] | 'all';
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
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    pricing: 'all',
    feature: 'all',
  });

  const filteredAndSorted = useMemo(() => {
    let result = [...backends];

    // Apply filters
    if (filters.type !== 'all') {
      result = result.filter((b) => b.type === filters.type);
    }
    if (filters.pricing !== 'all') {
      result = result.filter((b) => b.pricingModel === filters.pricing);
    }
    if (filters.feature !== 'all') {
      const featureKey = filters.feature as keyof Backend['features'];
      result = result.filter((b) => b.features[featureKey]);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'pricingModel':
          comparison = a.pricingModel.localeCompare(b.pricingModel);
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

  const featureKeys = Object.keys(featureLabels) as (keyof Backend['features'])[];

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Type
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
            Pricing
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
            Must Have Feature
          </label>
          <select
            value={filters.feature}
            onChange={(e) => setFilters({ ...filters, feature: e.target.value as Filters['feature'] })}
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
          >
            <option value="all">Any Feature</option>
            {Object.entries(featureLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Showing {filteredAndSorted.length} of {backends.length} backends
      </p>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort('name')}
                  className="hover:text-primary-600 inline-flex items-center"
                >
                  Name
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
                <button
                  onClick={() => handleSort('pricingModel')}
                  className="hover:text-primary-600 inline-flex items-center"
                >
                  Pricing
                  <SortIcon field="pricingModel" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort('rating')}
                  className="hover:text-primary-600 inline-flex items-center"
                >
                  Rating
                  <SortIcon field="rating" />
                </button>
              </th>
              {featureKeys.slice(0, 6).map((feature) => (
                <th key={feature} className="text-center py-3 px-2 font-semibold whitespace-nowrap">
                  <span className="text-xs">{featureLabels[feature]}</span>
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
                <td className="py-3 px-4">
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
                        : backend.type === 'commercial'
                        ? 'badge-primary'
                        : 'badge-purple'
                    }`}
                  >
                    {typeLabels[backend.type]}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`badge ${
                      backend.pricingModel === 'free'
                        ? 'badge-green'
                        : backend.pricingModel === 'freemium'
                        ? 'badge-primary'
                        : backend.pricingModel === 'paid'
                        ? 'badge-amber'
                        : 'badge-slate'
                    }`}
                  >
                    {pricingLabels[backend.pricingModel]}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span className="text-amber-500 mr-1">★</span>
                    {backend.rating.toFixed(1)}
                  </div>
                </td>
                {featureKeys.slice(0, 6).map((feature) => (
                  <td key={feature} className="py-3 px-2 text-center">
                    {backend.features[feature] ? <CheckIcon /> : <XIcon />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          No backends match your current filters. Try adjusting your criteria.
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  backends,
  featureCategories,
  featureLabels,
  isFeatureSupported,
} from '@/lib/backends';
import { LiveOpsFeatures } from '@/lib/types';

type Classification = 'many' | 'some' | 'none';

interface CategoryResult {
  classification: Classification;
  supportedFeatures: string[];
  totalFeatures: number;
}

interface TooltipPosition {
  top: number;
  left: number;
  arrowLeft: number;
  showBelow: boolean;
}

function getCategoryClassification(
  features: LiveOpsFeatures,
  categoryFeatures: string[]
): CategoryResult {
  const supportedFeatures: string[] = [];

  for (const featureKey of categoryFeatures) {
    const featureValue = features[featureKey as keyof LiveOpsFeatures];
    if (isFeatureSupported(featureValue)) {
      supportedFeatures.push(featureLabels[featureKey as keyof LiveOpsFeatures]);
    }
  }

  const supportedCount = supportedFeatures.length;
  const totalCount = categoryFeatures.length;

  let classification: Classification;
  if (supportedCount === totalCount) {
    classification = 'many';
  } else if (supportedCount > 0) {
    classification = 'some';
  } else {
    classification = 'none';
  }

  return {
    classification,
    supportedFeatures,
    totalFeatures: totalCount,
  };
}

function ClassificationCell({ result }: { result: CategoryResult }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<TooltipPosition | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipWidth = 200;
      const tooltipHeight = 200;
      const margin = 12;
      const arrowOffset = 8;

      const triggerCenterX = rect.left + rect.width / 2;

      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      const showBelow = spaceAbove < tooltipHeight + margin && spaceBelow > spaceAbove;

      let top: number;
      if (showBelow) {
        top = rect.bottom + arrowOffset;
      } else {
        top = rect.top - arrowOffset;
      }

      let left = triggerCenterX - tooltipWidth / 2;

      if (left < margin) {
        left = margin;
      } else if (left + tooltipWidth > window.innerWidth - margin) {
        left = window.innerWidth - tooltipWidth - margin;
      }

      const arrowLeft = Math.max(16, Math.min(tooltipWidth - 16, triggerCenterX - left));

      setPosition({ top, left, arrowLeft, showBelow });
    }
  }, [isVisible]);

  if (result.classification === 'none') {
    return (
      <td className="py-3 px-2 text-center">
        <svg className="h-5 w-5 text-neutral-300 dark:text-neutral-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </td>
    );
  }

  const label = result.classification === 'many' ? 'Many' : 'Some';
  const colorClass = result.classification === 'many'
    ? 'text-primary-500'
    : 'text-amber-500';

  return (
    <td className="py-3 px-2 text-center">
      <div
        ref={triggerRef}
        className="inline-flex justify-center"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <span className={`text-sm font-medium cursor-help ${colorClass}`}>
          {label}
        </span>
        {isVisible && result.supportedFeatures.length > 0 && position && (
          <div
            className="fixed z-[9999] w-[200px] p-3 bg-neutral-900 dark:bg-neutral-800 text-white text-xs rounded-lg shadow-lg border border-neutral-700"
            style={{
              top: position.showBelow ? position.top : 'auto',
              bottom: position.showBelow ? 'auto' : `${window.innerHeight - position.top}px`,
              left: position.left,
            }}
          >
            <div
              className={`absolute w-0 h-0 border-x-8 border-x-transparent ${
                position.showBelow
                  ? 'bottom-full border-b-8 border-b-neutral-900 dark:border-b-neutral-800'
                  : 'top-full border-t-8 border-t-neutral-900 dark:border-t-neutral-800'
              }`}
              style={{ left: position.arrowLeft - 8 }}
            />
            <div className="font-medium mb-1.5 text-neutral-200">
              {result.supportedFeatures.length} of {result.totalFeatures} features:
            </div>
            <ul className="space-y-0.5">
              {result.supportedFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-1.5 text-neutral-200">
                  <svg className="h-3 w-3 text-primary-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </td>
  );
}

export function CondensedComparisonTable() {
  const categories = Object.keys(featureCategories);
  const sortedBackends = [...backends].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 dark:border-neutral-700">
            <th className="text-left py-3 px-4 font-medium sticky left-0 z-10 bg-white dark:bg-neutral-900">
              Game Backend
            </th>
            {categories.map((category) => (
              <th key={category} className="text-center py-3 px-2 font-medium whitespace-nowrap">
                <span className="text-xs">{category}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedBackends.map((backend) => (
            <tr
              key={backend.slug}
              className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <td className="py-3 px-4 sticky left-0 z-10 bg-white dark:bg-neutral-900">
                <Link
                  href={`/backends/${backend.slug}`}
                  className="font-display text-neutral-900 dark:text-neutral-100 hover:text-primary-500 transition-colors"
                >
                  {backend.name}
                </Link>
              </td>
              {categories.map((category) => {
                const categoryFeatures = featureCategories[category as keyof typeof featureCategories];
                const result = getCategoryClassification(backend.features, categoryFeatures);
                return <ClassificationCell key={category} result={result} />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

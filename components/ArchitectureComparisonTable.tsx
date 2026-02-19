'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { backends } from '@/lib/backends';
import { architectureData, dimensionLabels, type CellData } from '@/lib/architecture';

// Re-export for other consumers
export { architectureData, dimensionLabels, type CellData } from '@/lib/architecture';

interface TooltipPosition {
  top: number;
  left: number;
  arrowLeft: number;
  showBelow: boolean;
}

function ArchCell({ cell }: { cell: CellData }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<TooltipPosition | null>(null);
  const triggerRef = useRef<HTMLTableCellElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const showTooltip = () => {
    clearTimeout(hideTimeoutRef.current);
    setIsVisible(true);
  };

  const hideTooltip = () => {
    hideTimeoutRef.current = setTimeout(() => setIsVisible(false), 150);
  };

  useEffect(() => {
    return () => clearTimeout(hideTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipWidth = 256;
      const tooltipHeight = 120;
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

  return (
    <td
      ref={triggerRef}
      className="py-3 px-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed cursor-help"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {cell.text}
      {isVisible && position && (
        <div
          className="fixed z-[9999] w-64 p-3 text-left bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-lg shadow-lg border border-slate-700"
          style={{
            top: position.showBelow ? position.top : 'auto',
            bottom: position.showBelow ? 'auto' : `${window.innerHeight - position.top}px`,
            left: position.left,
          }}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          <div
            className={`absolute w-0 h-0 border-x-8 border-x-transparent ${
              position.showBelow
                ? 'bottom-full border-b-8 border-b-slate-900 dark:border-b-slate-800'
                : 'top-full border-t-8 border-t-slate-900 dark:border-t-slate-800'
            }`}
            style={{ left: position.arrowLeft - 8 }}
          />
          <p className="text-slate-200 leading-relaxed">{cell.tooltip}</p>
          <a
            href={cell.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-primary-400 hover:text-primary-300 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            View documentation
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      )}
    </td>
  );
}

export function ArchitectureComparisonTable() {
  const sortedBackends = [...backends].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 dark:border-neutral-700">
            <th className="text-left py-3 px-4 font-medium sticky left-0 z-10 bg-white dark:bg-neutral-900">
              Platform
            </th>
            {dimensionLabels.map((dim) => (
              <th key={dim.key} className="text-left py-3 px-3 font-medium whitespace-nowrap">
                <span className="text-xs">{dim.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedBackends.map((backend) => {
            const data = architectureData[backend.slug];
            return (
              <tr
                key={backend.slug}
                className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <td className="py-3 px-4 sticky left-0 z-10 bg-white dark:bg-neutral-900">
                  <Link
                    href={`/backends/${backend.slug}`}
                    className="font-display text-neutral-900 dark:text-neutral-100 hover:text-primary-500 transition-colors text-xs font-medium"
                  >
                    {backend.name}
                  </Link>
                </td>
                {dimensionLabels.map((dim) => {
                  const cell = data?.[dim.key];
                  if (!cell) return <td key={dim.key} className="py-3 px-3 text-xs text-neutral-400">{'\u2014'}</td>;
                  return <ArchCell key={dim.key} cell={cell} />;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

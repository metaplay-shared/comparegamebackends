'use client';

import { useState, useRef, useEffect } from 'react';

interface FeatureTooltipProps {
  description?: string;
  sourceUrl?: string;
  children: React.ReactNode;
}

interface TooltipPosition {
  top: number;
  left: number;
  arrowLeft: number;
  showBelow: boolean;
}

export function FeatureTooltip({ description, sourceUrl, children }: FeatureTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<TooltipPosition | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipWidth = 256; // w-64 = 16rem = 256px
      const tooltipHeight = 150; // approximate max height
      const margin = 12;
      const arrowOffset = 8;

      // Calculate trigger center
      const triggerCenterX = rect.left + rect.width / 2;
      const triggerCenterY = rect.top + rect.height / 2;

      // Determine vertical position (above or below)
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      const showBelow = spaceAbove < tooltipHeight + margin && spaceBelow > spaceAbove;

      // Calculate top position
      let top: number;
      if (showBelow) {
        top = rect.bottom + arrowOffset;
      } else {
        top = rect.top - arrowOffset;
      }

      // Calculate left position, keeping tooltip within viewport
      let left = triggerCenterX - tooltipWidth / 2;

      // Clamp to viewport bounds
      if (left < margin) {
        left = margin;
      } else if (left + tooltipWidth > window.innerWidth - margin) {
        left = window.innerWidth - tooltipWidth - margin;
      }

      // Arrow position relative to tooltip
      const arrowLeft = Math.max(16, Math.min(tooltipWidth - 16, triggerCenterX - left));

      setPosition({ top, left, arrowLeft, showBelow });
    }
  }, [isVisible]);

  // If no description, just render children without tooltip
  if (!description) {
    return <>{children}</>;
  }

  return (
    <div
      ref={triggerRef}
      className="relative w-full"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}

      {isVisible && position && (
        <div
          className="fixed z-[9999] w-64 p-3 text-left bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-lg shadow-lg border border-slate-700"
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          style={{
            top: position.showBelow ? position.top : 'auto',
            bottom: position.showBelow ? 'auto' : `${window.innerHeight - position.top}px`,
            left: position.left,
          }}
        >
          {/* Arrow */}
          <div
            className={`absolute w-0 h-0 border-x-8 border-x-transparent ${
              position.showBelow
                ? 'bottom-full border-b-8 border-b-slate-900 dark:border-b-slate-800'
                : 'top-full border-t-8 border-t-slate-900 dark:border-t-slate-800'
            }`}
            style={{ left: position.arrowLeft - 8 }}
          />

          <p className="text-slate-200 leading-relaxed">{description}</p>

          {sourceUrl && (
            <a
              href={sourceUrl}
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
          )}
        </div>
      )}
    </div>
  );
}

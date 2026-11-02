/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MARQUEE_PHRASES } from '../../data/content';

interface MarqueeProps {
  variant?: 'ink' | 'yellow';
}

export function Marquee({ variant = 'ink' }: MarqueeProps) {
  const isYellow = variant === 'yellow';

  const bgClasses = isYellow
    ? 'bg-[#F6CD3B] text-[#14183A] border-y-[1.5px] border-[#14183A]'
    : 'bg-[#14183A] text-[#FBF6E9] border-y-[1.5px] border-[#14183A]';

  const dotClasses = isYellow ? 'text-[#14183A]/50' : 'text-[#F6CD3B]';

  return (
    <div
      className={`overflow-hidden py-3 select-none ${bgClasses}`}
      role="region"
      aria-label="Brand announcements"
    >
      <div className="animate-marquee whitespace-nowrap">
        {/* Repeating blocks for seamless loop */}
        {[0, 1, 2].map(iteration => (
          <div key={iteration} className="inline-flex items-center gap-6 px-4">
            {MARQUEE_PHRASES.map((phrase, idx) => (
              <span key={`${iteration}-${idx}`} className="inline-flex items-center gap-6">
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest font-medium">
                  {phrase}
                </span>
                <span className={`text-base font-bold select-none ${dotClasses}`}>
                  •
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

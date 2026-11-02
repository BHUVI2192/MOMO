/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
  className?: string;
}

export function Chip({ label, active, onClick, count, className = '' }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-[1.5px] border-[#14183A] text-xs font-medium tracking-wide transition-all duration-150 cursor-pointer select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB] ${
        active
          ? 'bg-[#14183A] text-[#FBF6E9] shadow-hard-sm'
          : 'bg-[#FBF6E9] text-[#14183A] hover:bg-[#FBE9A0] hover:-translate-y-0.5'
      } ${className}`}
    >
      <span>{label}</span>
      {typeof count === 'number' && (
        <span
          className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
            active ? 'bg-[#2F4BDB] text-[#FBF6E9]' : 'bg-[#DCE3FA] text-[#14183A]'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

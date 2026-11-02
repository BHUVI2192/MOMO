/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'pink' | 'blue' | 'cream';
  className?: string;
}

export function Tag({ children, variant = 'yellow', className = '' }: TagProps) {
  const bgColors = {
    yellow: 'bg-[#F6CD3B] text-[#14183A]',
    pink: 'bg-[#F4A7C3] text-[#14183A]',
    blue: 'bg-[#2F4BDB] text-[#FBF6E9]',
    cream: 'bg-[#FBF6E9] text-[#14183A]',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border-[1.5px] border-[#14183A] font-mono text-[11px] font-medium uppercase tracking-wider whitespace-nowrap select-none ${bgColors} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  quantity: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export function QuantityStepper({
  quantity,
  onChange,
  min = 1,
  max = 10,
  size = 'md',
}: QuantityStepperProps) {
  const isSm = size === 'sm';

  const handleDecrement = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div
      className={`inline-flex items-center border-[1.5px] border-[#14183A] rounded-[8px] bg-[#FBF6E9] select-none ${
        isSm ? 'h-8' : 'h-11'
      }`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center text-[#14183A] hover:bg-[#FBE9A0] active:bg-[#F6CD3B] disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer rounded-l-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB] ${
          isSm ? 'w-8 h-full' : 'w-10 h-full'
        }`}
      >
        <Minus size={isSm ? 12 : 14} strokeWidth={2} />
      </button>

      <span
        className={`font-mono text-center font-medium text-[#14183A] tabular-nums ${
          isSm ? 'w-8 text-xs' : 'w-10 text-sm'
        }`}
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`flex items-center justify-center text-[#14183A] hover:bg-[#FBE9A0] active:bg-[#F6CD3B] disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer rounded-r-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB] ${
          isSm ? 'w-8 h-full' : 'w-10 h-full'
        }`}
      >
        <Plus size={isSm ? 12 : 14} strokeWidth={2} />
      </button>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Truck, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '../../utils/format';

export function ShippingProgress() {
  const { subtotal, isFreeShipping, amountAwayFromFreeShipping } = useCart();
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="p-3.5 bg-[#FBE9A0] border-[1.5px] border-[#14183A] rounded-[10px] space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-display font-semibold text-[#14183A]">
          {isFreeShipping ? (
            <>
              <Check size={14} className="text-[#2F4BDB]" strokeWidth={2.5} />
              You've unlocked Free Shipping!
            </>
          ) : (
            <>
              <Truck size={14} className="text-[#14183A]" strokeWidth={1.5} />
              You're{' '}
              <span className="font-mono font-bold text-[#2F4BDB]">
                {formatPrice(amountAwayFromFreeShipping)}
              </span>{' '}
              away from free shipping
            </>
          )}
        </span>
        <span className="font-mono text-[11px] text-[#14183A]/70">{progressPercent}%</span>
      </div>

      {/* Progress Bar Container: flat yellow on cream, 1.5px ink border */}
      <div className="w-full h-3 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-full overflow-hidden p-[1px]">
        <div
          className="h-full bg-[#2F4BDB] transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

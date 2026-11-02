/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function PromoCodeInput() {
  const { promoCode, promoError, applyPromoCode, removePromoCode } = useCart();
  const [inputVal, setInputVal] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setIsApplying(true);
    const success = applyPromoCode(inputVal);
    if (success) {
      setInputVal('');
    }
    setIsApplying(false);
  };

  if (promoCode) {
    return (
      <div className="flex items-center justify-between p-2.5 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBDDE8] text-xs">
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-[#14183A]" strokeWidth={1.5} />
          <span className="font-mono font-bold text-[#14183A]">{promoCode}</span>
          <span className="text-[#14183A]/70">applied</span>
        </div>
        <button
          type="button"
          onClick={removePromoCode}
          className="text-[#14183A] hover:text-[#2F4BDB] font-mono text-[11px] underline cursor-pointer"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Promo code (e.g. MOMO10)"
            className="w-full h-10 px-3 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[8px] text-xs font-mono uppercase placeholder:normal-case placeholder:font-body placeholder:text-[#14183A]/50 focus:outline-none focus:ring-2 focus:ring-[#2F4BDB]"
          />
        </div>
        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="px-3.5 h-10 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#F6CD3B] text-[#14183A] font-medium text-xs hover:bg-[#FBE9A0] disabled:opacity-40 disabled:hover:bg-[#F6CD3B] transition-colors cursor-pointer"
        >
          Apply
        </button>
      </form>
      {promoError && (
        <div className="text-[11px] font-mono p-1.5 bg-[#FBDDE8] border-[1.5px] border-[#14183A] rounded-[6px] text-[#14183A]">
          {promoError}
        </div>
      )}
    </div>
  );
}

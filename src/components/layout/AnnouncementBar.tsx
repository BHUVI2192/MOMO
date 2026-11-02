/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';

export function AnnouncementBar() {
  const { amountAwayFromFreeShipping, isFreeShipping } = useCart();

  return (
    <div className="bg-[#F6CD3B] text-[#14183A] border-b-[1.5px] border-[#14183A] px-4 py-2 text-center text-xs font-mono font-medium tracking-wide">
      <span>
        {isFreeShipping ? (
          '🎉 You have unlocked FREE shipping on your order!'
        ) : amountAwayFromFreeShipping > 0 && amountAwayFromFreeShipping < 50 ? (
          <>
            Add <span className="font-bold underline">{formatPrice(amountAwayFromFreeShipping)}</span> more to your bag for FREE worldwide shipping.
          </>
        ) : (
          'Free worldwide shipping on orders over $50 • Small-batch Spring Drop now live'
        )}
      </span>
    </div>
  );
}

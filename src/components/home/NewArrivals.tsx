/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useView } from '../../context/ViewContext';
import { ProductCard } from '../shop/ProductCard';

export function NewArrivals() {
  const { navigateTo } = useView();

  // Grab the 4 newest items
  const newItems = PRODUCTS.filter(p => p.badge === 'New' || p.isNewArrival).slice(0, 4);

  return (
    <section className="bg-[#FBF6E9] py-16 sm:py-20 border-b-[1.5px] border-[#14183A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#2F4BDB] font-semibold mb-1">
              Fresh Off The Kiln
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#14183A]">
              New this week.
            </h2>
          </div>

          <button
            onClick={() => navigateTo('shop', { searchQuery: 'New' })}
            className="font-mono text-xs text-[#14183A] hover:text-[#2F4BDB] inline-flex items-center gap-1.5 cursor-pointer font-medium group"
          >
            <span>View all new drops</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal Row of 4 Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newItems.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

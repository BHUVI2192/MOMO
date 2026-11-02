/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS, Category } from '../../data/products';
import { useView } from '../../context/ViewContext';
import { Chip } from '../ui/Chip';
import { ProductCard } from '../shop/ProductCard';

type FilterTab = 'All' | 'Stationery' | 'Ceramics' | 'Bags' | 'Desk';

export function Bestsellers() {
  const { navigateTo } = useView();
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const filterTabs: FilterTab[] = ['All', 'Ceramics', 'Stationery', 'Desk', 'Bags'];

  const displayedProducts = useMemo(() => {
    let pool = PRODUCTS.filter(p => p.isBestseller || p.badge === 'Bestseller' || p.badge === 'Staff Pick');
    // If not enough tagged items, backfill with top catalogue
    if (pool.length < 8) {
      pool = [...pool, ...PRODUCTS.filter(p => !pool.includes(p))];
    }

    if (activeTab === 'All') {
      return pool.slice(0, 8);
    }
    return pool.filter(p => p.category === activeTab).slice(0, 8);
  }, [activeTab]);

  return (
    <section className="bg-[#FBF6E9] py-16 sm:py-24 border-b-[1.5px] border-[#14183A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Filter Chips */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#2F4BDB] font-semibold mb-1">
              Hall of Fame
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#14183A]">
              Tested and loved bestsellers.
            </h2>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map(tab => (
              <Chip
                key={tab}
                label={tab}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>
        </div>

        {/* 8 Products Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ProductCard product={product} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() =>
              navigateTo('shop', {
                category: activeTab === 'All' ? 'All' : (activeTab as Category),
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBE9A0] hover:bg-[#F6CD3B] font-medium text-sm text-[#14183A] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard cursor-pointer"
          >
            <span>View all {activeTab === 'All' ? '24' : activeTab} products</span>
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product } from '../../data/products';
import { useView } from '../../context/ViewContext';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { formatPrice } from '../../utils/format';
import { SmartImage } from './SmartImage';

export function SearchOverlay() {
  const { isSearchOpen, closeSearch, navigateTo } = useView();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useLockBodyScroll(isSearchOpen);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.description.toLowerCase().includes(trimmed) ||
        (p.badge && p.badge.toLowerCase().includes(trimmed))
    ).slice(0, 8);
  }, [query]);

  const handleSelectProduct = (product: Product) => {
    closeSearch();
    navigateTo('product', { productId: product.id });
  };

  const handleSelectCategory = (cat: string) => {
    closeSearch();
    navigateTo('shop', { category: cat as any });
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-start items-center">
          {/* Backdrop (flat ink overlay at 40%, no blur) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-[#14183A]/40"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl mx-4 mt-16 md:mt-24 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[12px] shadow-hard-lg overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 p-4 md:p-6 border-b-[1.5px] border-[#14183A] bg-[#FBE9A0]">
              <Search size={22} className="text-[#14183A] shrink-0" strokeWidth={1.5} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search mugs, notebooks, totes, scissors..."
                className="w-full bg-transparent text-[#14183A] placeholder-[#14183A]/50 font-body text-base md:text-lg focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded text-[#14183A]/70 hover:text-[#14183A]"
                  aria-label="Clear query"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              )}
              <button
                type="button"
                onClick={closeSearch}
                className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded border-[1.5px] border-[#14183A] bg-[#FBF6E9] hover:bg-[#F4A7C3] transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Results or Suggestions */}
            <div className="overflow-y-auto p-4 md:p-6 divide-y-[1.5px] divide-[#14183A]/10">
              {query.trim().length === 0 ? (
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[#14183A]/60 mb-3">
                    Popular Categories
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Ceramics', 'Stationery', 'Desk', 'Bags', 'Homeware'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleSelectCategory(cat)}
                        className="px-3.5 py-1.5 rounded-full border-[1.5px] border-[#14183A] bg-white text-xs font-medium text-[#14183A] hover:bg-[#F6CD3B] transition-colors cursor-pointer"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <p className="font-mono text-xs uppercase tracking-wider text-[#14183A]/60 mb-3">
                    Trending Objects
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PRODUCTS.filter(p => p.badge === 'Bestseller' || p.badge === 'Staff Pick')
                      .slice(0, 4)
                      .map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleSelectProduct(p)}
                          className="flex items-center gap-3 p-2.5 rounded-[8px] border-[1.5px] border-[#14183A] bg-white text-left hover:bg-[#FBE9A0] transition-colors cursor-pointer group"
                        >
                          <div className="w-12 h-12 rounded-[6px] overflow-hidden border-[1.5px] border-[#14183A] shrink-0">
                            <SmartImage
                              src={p.images[0].url}
                              alt={p.name}
                              aspectRatio="1:1"
                              placeholderColor={p.images[0].placeholderColor}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-display font-semibold text-sm truncate text-[#14183A]">
                              {p.name}
                            </div>
                            <div className="font-mono text-xs text-[#14183A]/70">
                              {formatPrice(p.price)}
                            </div>
                          </div>
                          <ArrowRight
                            size={14}
                            className="text-[#14183A] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mr-1"
                          />
                        </button>
                      ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  <p className="font-mono text-xs uppercase tracking-wider text-[#14183A]/60 mb-2">
                    Found {results.length} matching object{results.length === 1 ? '' : 's'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {results.map(product => (
                      <button
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                        className="flex items-center gap-3 p-3 rounded-[8px] border-[1.5px] border-[#14183A] bg-white text-left hover:bg-[#FBE9A0] hover:-translate-y-0.5 hover:shadow-hard-sm transition-all cursor-pointer group"
                      >
                        <div className="w-14 h-14 rounded-[6px] overflow-hidden border-[1.5px] border-[#14183A] shrink-0">
                          <SmartImage
                            src={product.images[0].url}
                            alt={product.name}
                            aspectRatio="1:1"
                            placeholderColor={product.images[0].placeholderColor}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-semibold text-sm text-[#14183A] truncate">
                            {product.name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-xs font-medium text-[#2F4BDB]">
                              {formatPrice(product.price)}
                            </span>
                            <span className="font-mono text-[10px] text-[#14183A]/60 uppercase">
                              {product.category}
                            </span>
                          </div>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-[#14183A] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="font-accent italic text-xl text-[#14183A] mb-1">
                    No small objects found for "{query}"
                  </p>
                  <p className="font-body text-sm text-[#14183A]/70 mb-4">
                    Try searching for “mug”, “notebook”, “brass”, or “tote”.
                  </p>
                  <button
                    onClick={() => {
                      closeSearch();
                      navigateTo('shop');
                    }}
                    className="font-mono text-xs text-[#2F4BDB] underline cursor-pointer"
                  >
                    Browse full shop catalogue &rarr;
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

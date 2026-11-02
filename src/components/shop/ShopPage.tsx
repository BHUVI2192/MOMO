/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { PRODUCTS, Product, Category } from '../../data/products';
import { useView } from '../../context/ViewContext';
import { ProductCard } from './ProductCard';
import { FilterPanel, FilterState } from './FilterPanel';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export function ShopPage() {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useView();

  const [filters, setFilters] = useState<FilterState>({
    category: selectedCategory || 'All',
    minPrice: 0,
    maxPrice: 100,
    selectedColor: null,
    inStockOnly: false,
  });

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useLockBodyScroll(isMobileFilterOpen);

  // Sync category changes from navigation
  useEffect(() => {
    if (selectedCategory) {
      setFilters(prev => ({ ...prev, category: selectedCategory }));
    }
  }, [selectedCategory]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    if (newFilters.category !== selectedCategory) {
      setSelectedCategory(newFilters.category);
    }
  };

  const handleResetFilters = () => {
    const resetState: FilterState = {
      category: 'All',
      minPrice: 0,
      maxPrice: 100,
      selectedColor: null,
      inStockOnly: false,
    };
    setFilters(resetState);
    setSelectedCategory('All');
    setSearchQuery('');
  };

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesTag = product.badge?.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesTag && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      // Price Range
      if (filters.minPrice > 0 && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice < 100 && product.price > filters.maxPrice) {
        return false;
      }

      // Color Swatch
      if (filters.selectedColor) {
        if (!product.variants?.options) {
          // If product doesn't have explicit variant options, allow checking default placeholder or fallback
          return false;
        }
        const hasMatchingColor = product.variants.options.some(
          opt => opt.hex?.toLowerCase() === filters.selectedColor?.toLowerCase()
        );
        if (!hasMatchingColor) return false;
      }

      // In Stock
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') {
        const aNew = a.badge === 'New' || a.isNewArrival ? 1 : 0;
        const bNew = b.badge === 'New' || b.isNewArrival ? 1 : 0;
        return bNew - aNew;
      }
      // 'featured'
      const aScore = a.isBestseller ? 2 : a.badge === 'Staff Pick' ? 1 : 0;
      const bScore = b.isBestseller ? 2 : b.badge === 'Staff Pick' ? 1 : 0;
      return bScore - aScore;
    });
  }, [filters, searchQuery, sortBy]);

  return (
    <div className="bg-[#FBF6E9] min-h-screen py-10 sm:py-14 border-b-[1.5px] border-[#14183A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pb-8 border-b-[1.5px] border-[#14183A] mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#2F4BDB] font-semibold mb-2">
                Catalogue / {filters.category === 'All' ? 'Everything' : filters.category}
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#14183A]">
                {filters.category === 'All' ? 'All Small Objects' : filters.category}
              </h1>
            </div>

            <div className="font-mono text-xs sm:text-sm text-[#14183A]/70">
              Showing <span className="font-bold text-[#14183A]">{filteredProducts.length}</span> of {PRODUCTS.length} objects
            </div>
          </div>

          {searchQuery && (
            <div className="mt-4 inline-flex items-center gap-2 p-1.5 px-3 rounded-full border-[1.5px] border-[#14183A] bg-[#FBE9A0] font-mono text-xs">
              <span>Search: &ldquo;{searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="hover:text-[#2F4BDB] p-0.5"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Toolbar: Mobile Filter Trigger & Sort Dropdown */}
        <div className="flex items-center justify-between gap-4 mb-8">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] hover:bg-[#FBE9A0] font-mono text-xs font-medium cursor-pointer shadow-hard-sm"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            <span>Filters ({filters.category !== 'All' ? 1 : 0})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <label htmlFor="sort-select" className="font-mono text-xs text-[#14183A]/70 hidden sm:inline">
              Sort by:
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="h-10 pl-3 pr-8 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] font-mono text-xs text-[#14183A] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2F4BDB]"
              >
                <option value="featured">Featured / Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <ArrowUpDown
                size={13}
                strokeWidth={1.5}
                className="absolute right-2.5 top-3.5 pointer-events-none text-[#14183A]"
              />
            </div>
          </div>
        </div>

        {/* Main Grid Layout: Sidebar on Desktop + 4-Col Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[16px] p-6 shadow-hard-sm">
            <FilterPanel
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              productCount={filteredProducts.length}
            />
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-20 px-6 text-center bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[16px]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-[1.5px] border-[#14183A] bg-[#FBE9A0] flex items-center justify-center">
                  <RotateCcw size={22} className="text-[#14183A]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-bold text-xl text-[#14183A] mb-2">
                  No objects match your current filters
                </h3>
                <p className="font-body text-sm text-[#14183A]/70 max-w-sm mx-auto mb-6">
                  Try widening your price range, choosing another hue, or clearing your category filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#F6CD3B] text-[#14183A] font-medium text-xs hover:bg-[#FBE9A0] transition-colors cursor-pointer shadow-hard-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProductCard product={product} index={idx} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer / Bottom Sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-[#14183A]/40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-[#FBF6E9] border-t-[1.5px] border-[#14183A] rounded-t-[20px] shadow-hard z-10"
            >
              <FilterPanel
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                isMobileModal={true}
                onCloseMobileModal={() => setIsMobileFilterOpen(false)}
                productCount={filteredProducts.length}
              />
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#2F4BDB] text-[#FBF6E9] font-medium text-sm cursor-pointer shadow-hard-sm"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

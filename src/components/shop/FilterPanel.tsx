/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Check } from 'lucide-react';
import { Category, CATEGORIES } from '../../data/products';

export interface FilterState {
  category: Category | 'All';
  minPrice: number;
  maxPrice: number;
  selectedColor: string | null;
  inStockOnly: boolean;
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  isMobileModal?: boolean;
  onCloseMobileModal?: () => void;
  productCount: number;
}

export const PALETTE_COLORS = [
  { name: 'Yellow', hex: '#F6CD3B' },
  { name: 'Blue', hex: '#2F4BDB' },
  { name: 'Pink', hex: '#F4A7C3' },
  { name: 'Cream', hex: '#FBF6E9' },
  { name: 'Ink', hex: '#14183A' },
];

export function FilterPanel({
  filters,
  onChange,
  onReset,
  isMobileModal = false,
  onCloseMobileModal,
  productCount,
}: FilterPanelProps) {
  const handleCategoryClick = (cat: Category | 'All') => {
    onChange({ ...filters, category: cat });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;
    onChange({ ...filters, minPrice: val });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 100;
    onChange({ ...filters, maxPrice: val });
  };

  const handleColorClick = (colorHex: string) => {
    onChange({
      ...filters,
      selectedColor: filters.selectedColor === colorHex ? null : colorHex,
    });
  };

  const handleStockToggle = () => {
    onChange({ ...filters, inStockOnly: !filters.inStockOnly });
  };

  return (
    <div className={`space-y-6 ${isMobileModal ? 'p-6 bg-[#FBF6E9]' : ''}`}>
      {/* Mobile Modal Header */}
      {isMobileModal && (
        <div className="flex items-center justify-between pb-4 border-b-[1.5px] border-[#14183A]">
          <h3 className="font-display font-bold text-lg text-[#14183A]">
            Filter Objects ({productCount})
          </h3>
          <button
            type="button"
            onClick={onCloseMobileModal}
            className="p-1.5 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9]"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
      )}

      {/* Categories */}
      <div>
        <h4 className="font-mono text-xs uppercase tracking-widest text-[#14183A] font-bold mb-3">
          Category
        </h4>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => handleCategoryClick('All')}
            className={`w-full text-left px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
              filters.category === 'All'
                ? 'bg-[#14183A] text-[#FBF6E9] font-semibold'
                : 'text-[#14183A] hover:bg-[#FBE9A0]'
            }`}
          >
            <span>All Objects</span>
            <span className="font-mono text-[10px]">24</span>
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={`w-full text-left px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                filters.category === cat
                  ? 'bg-[#14183A] text-[#FBF6E9] font-semibold'
                  : 'text-[#14183A] hover:bg-[#FBE9A0]'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t-[1.5px] border-[#14183A]/15">
        <h4 className="font-mono text-xs uppercase tracking-widest text-[#14183A] font-bold mb-3">
          Price Range ($)
        </h4>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="sr-only">Min price</label>
            <div className="relative">
              <span className="absolute left-2.5 top-2 font-mono text-xs text-[#14183A]/60">$</span>
              <input
                type="number"
                min={0}
                max={100}
                value={filters.minPrice || ''}
                onChange={handleMinPriceChange}
                placeholder="0"
                className="w-full pl-6 pr-2 py-1.5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[6px] font-mono text-xs text-[#14183A] focus:outline-none focus:ring-1 focus:ring-[#2F4BDB]"
              />
            </div>
          </div>
          <span className="font-mono text-xs text-[#14183A]/40">—</span>
          <div className="flex-1">
            <label className="sr-only">Max price</label>
            <div className="relative">
              <span className="absolute left-2.5 top-2 font-mono text-xs text-[#14183A]/60">$</span>
              <input
                type="number"
                min={0}
                max={100}
                value={filters.maxPrice || ''}
                onChange={handleMaxPriceChange}
                placeholder="100"
                className="w-full pl-6 pr-2 py-1.5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[6px] font-mono text-xs text-[#14183A] focus:outline-none focus:ring-1 focus:ring-[#2F4BDB]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Color Swatches (Palette + Neutrals) */}
      <div className="pt-4 border-t-[1.5px] border-[#14183A]/15">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#14183A] font-bold">
            Palette Hue
          </h4>
          {filters.selectedColor && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, selectedColor: null })}
              className="font-mono text-[10px] text-[#2F4BDB] underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {PALETTE_COLORS.map(color => {
            const isSelected = filters.selectedColor === color.hex;
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => handleColorClick(color.hex)}
                title={color.name}
                className={`relative w-7 h-7 rounded-full border-[1.5px] border-[#14183A] cursor-pointer transition-transform hover:scale-110 flex items-center justify-center ${
                  isSelected ? 'ring-2 ring-[#2F4BDB] ring-offset-2 scale-110' : ''
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <Check
                    size={12}
                    strokeWidth={3}
                    className={color.hex === '#14183A' ? 'text-white' : 'text-[#14183A]'}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* In Stock Only Toggle */}
      <div className="pt-4 border-t-[1.5px] border-[#14183A]/15">
        <label className="flex items-center justify-between cursor-pointer select-none">
          <span className="font-mono text-xs text-[#14183A] font-medium">In stock only</span>
          <button
            type="button"
            role="switch"
            aria-checked={filters.inStockOnly}
            onClick={handleStockToggle}
            className={`w-11 h-6 rounded-full border-[1.5px] border-[#14183A] transition-colors p-[2px] cursor-pointer ${
              filters.inStockOnly ? 'bg-[#2F4BDB]' : 'bg-[#FBF6E9]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-[1.5px] border-[#14183A] bg-white transition-transform ${
                filters.inStockOnly ? 'translate-x-5 bg-[#F6CD3B]' : 'translate-x-0'
              }`}
            />
          </button>
        </label>
      </div>

      {/* Reset Button */}
      <div className="pt-4 border-t-[1.5px] border-[#14183A]/15">
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] hover:bg-[#FBE9A0] font-mono text-xs text-[#14183A] transition-colors cursor-pointer"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}

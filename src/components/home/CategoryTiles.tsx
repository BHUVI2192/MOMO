/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useView } from '../../context/ViewContext';
import { CATEGORY_TILES } from '../../data/content';
import { SmartImage } from '../ui/SmartImage';

export function CategoryTiles() {
  const { navigateTo } = useView();

  return (
    <section className="bg-[#FBF6E9] py-16 sm:py-24 border-b-[1.5px] border-[#14183A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#2F4BDB] font-semibold mb-2">
              Browse by Department
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#14183A]">
              Objects for every surface.
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { category: 'All' })}
            className="font-mono text-xs text-[#2F4BDB] hover:underline flex items-center gap-1 cursor-pointer"
          >
            See full inventory &rarr;
          </button>
        </div>

        {/* 4 Large Flat-Color Tiles in an uneven grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {CATEGORY_TILES.map((tile, idx) => {
            // Uneven col spans: 7 and 5 on row 1, 5 and 7 on row 2
            const colSpan =
              idx === 0
                ? 'md:col-span-7'
                : idx === 1
                ? 'md:col-span-5'
                : idx === 2
                ? 'md:col-span-5'
                : 'md:col-span-7';

            return (
              <div
                key={tile.category}
                onClick={() => navigateTo('shop', { category: tile.category })}
                className={`${colSpan} ${tile.bgClass} border-[1.5px] border-[#14183A] rounded-[16px] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard cursor-pointer min-h-[300px] sm:min-h-[340px]`}
              >
                {/* Top Row: Category Name + Arrow */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#14183A]/70 block mb-1">
                      {tile.count} objects available
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#14183A]">
                      {tile.title}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full border-[1.5px] border-[#14183A] bg-[#FBF6E9] flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:rotate-45 shrink-0">
                    <ArrowUpRight size={18} strokeWidth={2} className="text-[#14183A]" />
                  </div>
                </div>

                {/* Bottom Row: Short Description & Thumbnail preview */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <p className="font-body text-sm sm:text-base text-[#14183A]/85 max-w-sm leading-relaxed">
                    {tile.description}
                  </p>

                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[10px] overflow-hidden border-[1.5px] border-[#14183A] shrink-0 self-end">
                    <SmartImage
                      src={tile.image}
                      alt={tile.title}
                      aspectRatio="1:1"
                      placeholderColor="#FBF6E9"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

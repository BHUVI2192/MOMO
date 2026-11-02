/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CUSTOMER_REVIEWS } from '../../data/content';

export function Reviews() {
  return (
    <section className="bg-[#F4A7C3] border-b-[1.5px] border-[#14183A] py-16 sm:py-24 text-[#14183A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="font-mono text-xs uppercase tracking-widest text-[#14183A]/70 font-semibold mb-2">
            Independent Field Reports
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#14183A]">
            Small compliments from desk dwellers.
          </h2>
        </div>

        {/* 3 Reviews in Uneven Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {CUSTOMER_REVIEWS.map((review, idx) => {
            // Uneven column spans & offsets:
            // Rev 1: col-span-4
            // Rev 2: col-span-4 md:mt-8
            // Rev 3: col-span-4 md:-mt-4
            const offsetClasses =
              idx === 0
                ? 'md:col-span-4'
                : idx === 1
                ? 'md:col-span-4 md:translate-y-6'
                : 'md:col-span-4 md:-translate-y-4';

            return (
              <div
                key={review.id}
                className={`${offsetClasses} bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[16px] p-6 sm:p-7 shadow-hard flex flex-col justify-between`}
              >
                <div>
                  {/* Rating Header: plain 5/5 in mono, no star-icon rows */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b-[1.5px] border-[#14183A]/15">
                    <span className="font-mono text-sm font-bold text-[#2F4BDB]">
                      {review.rating} verified
                    </span>
                    <span className="font-mono text-[11px] text-[#14183A]/60">
                      Re: {review.productName}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="font-body text-base text-[#14183A] leading-relaxed mb-6">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                {/* Author & City */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#14183A]/80">
                  <span className="font-semibold text-[#14183A]">{review.author}</span>
                  <span>{review.city}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

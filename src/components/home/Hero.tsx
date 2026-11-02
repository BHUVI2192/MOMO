/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useView } from '../../context/ViewContext';
import { IMAGES } from '../../data/images';
import { Button } from '../ui/Button';
import { SmartImage } from '../ui/SmartImage';

export function Hero() {
  const { navigateTo } = useView();

  return (
    <section className="bg-[#F6CD3B] border-b-[1.5px] border-[#14183A] text-[#14183A] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-[1.5px] border-[#14183A] bg-[#FBF6E9] font-mono text-xs uppercase tracking-widest font-medium">
              <span>Spring drop 2026</span>
              <span>·</span>
              <span>Small-batch batch #08</span>
            </div>

            {/* Headline with Masked Staggered Line Slide */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] leading-[0.95] text-[#14183A]"
              >
                Everyday things,
                <br />
                made <span className="font-accent italic font-normal text-[#2F4BDB]">happier.</span>
              </motion.h1>
            </div>

            {/* Short Paragraph */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-base sm:text-lg md:text-xl text-[#14183A]/90 max-w-xl leading-relaxed"
            >
              Notebooks, mugs, totes and tiny desk companions, designed in small batches and made to be used every single day.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2"
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigateTo('shop', { searchQuery: 'New' })}
                iconRight={<ArrowRight size={18} strokeWidth={2} />}
              >
                Shop the drop
              </Button>

              <Button
                variant="tertiary"
                size="lg"
                onClick={() => navigateTo('shop', { category: 'All' })}
                iconRight={<ArrowRight size={16} strokeWidth={2} />}
              >
                Browse all 24 objects
              </Button>
            </motion.div>

            {/* Quick Guarantees (Clean unboxed text) */}
            <div className="pt-6 border-t-[1.5px] border-[#14183A]/20 flex flex-wrap items-center gap-4 text-xs font-mono text-[#14183A]/80">
              <span>Free shipping &gt;$50</span>
              <span>·</span>
              <span>Plastic-free parcel</span>
              <span>·</span>
              <span>Hand-glazed stoneware</span>
            </div>
          </div>

          {/* Right Column: Hero Visual on Pink Block with 3 Static Overlapping Tiles */}
          <div className="lg:col-span-5 relative">
            {/* Main Pink Container */}
            <div className="relative bg-[#F4A7C3] border-[1.5px] border-[#14183A] rounded-[16px] p-4 sm:p-6 shadow-hard-lg">
              {/* Primary Feature Image */}
              <div className="rounded-[12px] overflow-hidden border-[1.5px] border-[#14183A] shadow-hard-sm">
                <SmartImage
                  src={IMAGES.heroMain.url}
                  secondarySrc={IMAGES.heroMain.secondaryUrl}
                  alt={IMAGES.heroMain.alt}
                  aspectRatio="16:10"
                  priority={true}
                  placeholderColor="#FBDDE8"
                />
              </div>

              {/* Caption pill */}
              <div className="mt-4 flex items-center justify-between font-mono text-xs">
                <span className="font-semibold text-[#14183A]">The Morning Desk Set</span>
                <span className="text-[#14183A]/70">$68 bundle</span>
              </div>

              {/* 3 Small Overlapping Static Image Tiles */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-4">
                <div
                  onClick={() => navigateTo('product', { productId: 'pocket-pal-notebook' })}
                  className="rounded-[10px] overflow-hidden border-[1.5px] border-[#14183A] bg-[#FBE9A0] cursor-pointer hover:-translate-y-1 transition-transform"
                >
                  <SmartImage
                    src={IMAGES.heroTile1.url}
                    alt={IMAGES.heroTile1.alt}
                    aspectRatio="1:1"
                    placeholderColor="#FBE9A0"
                  />
                  <div className="p-1 text-center font-mono text-[10px] font-semibold truncate bg-[#FBF6E9] border-t-[1.5px] border-[#14183A]">
                    Notebook
                  </div>
                </div>

                <div
                  onClick={() => navigateTo('product', { productId: 'wobbly-bud-vase' })}
                  className="rounded-[10px] overflow-hidden border-[1.5px] border-[#14183A] bg-[#DCE3FA] cursor-pointer hover:-translate-y-1 transition-transform"
                >
                  <SmartImage
                    src={IMAGES.heroTile2.url}
                    alt={IMAGES.heroTile2.alt}
                    aspectRatio="1:1"
                    placeholderColor="#DCE3FA"
                  />
                  <div className="p-1 text-center font-mono text-[10px] font-semibold truncate bg-[#FBF6E9] border-t-[1.5px] border-[#14183A]">
                    Bud Vase
                  </div>
                </div>

                <div
                  onClick={() => navigateTo('product', { productId: 'big-feelings-tote' })}
                  className="rounded-[10px] overflow-hidden border-[1.5px] border-[#14183A] bg-[#FBDDE8] cursor-pointer hover:-translate-y-1 transition-transform"
                >
                  <SmartImage
                    src={IMAGES.heroTile3.url}
                    alt={IMAGES.heroTile3.alt}
                    aspectRatio="1:1"
                    placeholderColor="#FBDDE8"
                  />
                  <div className="p-1 text-center font-mono text-[10px] font-semibold truncate bg-[#FBF6E9] border-t-[1.5px] border-[#14183A]">
                    Big Tote
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

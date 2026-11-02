/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useView } from '../../context/ViewContext';
import { IMAGES } from '../../data/images';
import { SmartImage } from '../ui/SmartImage';
import { Button } from '../ui/Button';

export function BrandStory() {
  const { navigateTo } = useView();

  return (
    <section className="bg-[#DCE3FA] border-b-[1.5px] border-[#14183A] py-16 sm:py-24 text-[#14183A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2F4BDB] font-semibold">
              The MOMO Philosophy
            </span>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-[#14183A]">
              We make the kind of things that quietly improve a{' '}
              <span className="font-accent italic text-[#2F4BDB]">Tuesday.</span>
            </h2>

            <p className="font-body text-base sm:text-lg text-[#14183A]/85 max-w-xl leading-relaxed">
              Most of our waking lives happen in the middle of ordinary weeks—drafting notes, brewing water for tea, setting down keys, clearing desk clutter. We believe the small objects you touch during those unglamorous moments shouldn’t be disposable plastic or precious gallery pieces you’re terrified to chip. They should just feel good, work reliably, and make you slightly happier to be sitting down.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                onClick={() => navigateTo('about')}
                iconRight={<ArrowRight size={16} strokeWidth={2} />}
              >
                Read our studio story
              </Button>
            </div>
          </div>

          {/* Right Image Block */}
          <div className="lg:col-span-5">
            <div className="bg-[#FBF6E9] p-3 sm:p-4 rounded-[16px] border-[1.5px] border-[#14183A] shadow-hard">
              <div className="rounded-[10px] overflow-hidden border-[1.5px] border-[#14183A]">
                <SmartImage
                  src={IMAGES.brandStory.url}
                  secondarySrc={IMAGES.brandStory.secondaryUrl}
                  alt={IMAGES.brandStory.alt}
                  aspectRatio="16:10"
                  placeholderColor="#DCE3FA"
                />
              </div>
              <div className="pt-3 px-1 flex items-center justify-between font-mono text-xs text-[#14183A]/70">
                <span>Hand-finishing in small batches</span>
                <span>Montreal · QC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Package, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useView } from '../../context/ViewContext';
import { IMAGES } from '../../data/images';
import { SmartImage } from '../ui/SmartImage';
import { Button } from '../ui/Button';

export function AboutPage() {
  const { navigateTo } = useView();

  return (
    <div className="bg-[#FBF6E9] min-h-screen border-b-[1.5px] border-[#14183A]">
      {/* Hero Brand Section on Blue-100 */}
      <section className="bg-[#DCE3FA] border-b-[1.5px] border-[#14183A] py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2F4BDB] font-semibold">
              About the Studio
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#14183A] leading-[1.05]">
              Everyday things, made <span className="font-accent italic text-[#2F4BDB]">happier.</span>
            </h1>
            <p className="font-body text-lg sm:text-xl text-[#14183A]/90 leading-relaxed">
              MOMO started in 2023 with a single stubborn complaint: why are our most frequently used desk tools either flimsy disposable plastic or self-important luxury artifacts we are afraid to touch?
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Grid */}
      <section className="py-16 sm:py-24 border-b-[1.5px] border-[#14183A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#2F4BDB] font-semibold">
                Our Standards
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#14183A]">
                Objects designed to be used, dropped, wiped, and kept.
              </h2>
              <div className="space-y-4 font-body text-base text-[#14183A]/85 leading-relaxed">
                <p>
                  We collaborate with three small independent workshops in Montreal, Portugal, and Japan. Every ceramic batch is thrown and glazed by hand, our notebooks are bound with smyth-sewn thread so they lie completely flat, and our brass desk objects are left unlacquered so they develop a golden patina unique to your touch.
                </p>
                <p>
                  If an object breaks through normal living within two years, we send repair materials or replace it free of charge. No fine print, no warranty tickets.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  onClick={() => navigateTo('shop')}
                  iconRight={<ArrowRight size={16} strokeWidth={2} />}
                >
                  Explore the 2026 Collection
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#F4A7C3] p-4 sm:p-6 rounded-[16px] border-[1.5px] border-[#14183A] shadow-hard">
                <div className="rounded-[12px] overflow-hidden border-[1.5px] border-[#14183A] bg-white">
                  <SmartImage
                    src={IMAGES.brandStory.url}
                    alt="Glazing ceramics in studio"
                    aspectRatio="16:10"
                    placeholderColor="#FBDDE8"
                  />
                </div>
                <div className="pt-4 flex items-center justify-between font-mono text-xs text-[#14183A]">
                  <span className="font-semibold">MOMO Kiln Studio #03</span>
                  <span>Handcrafted small-batch run</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Guarantees on Pink */}
      <section className="bg-[#F4A7C3] py-16 sm:py-20 border-b-[1.5px] border-[#14183A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#14183A]/70 font-semibold">
              The MOMO Pact
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#14183A]">
              Three simple promises to our customers.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[16px] p-6 sm:p-8 shadow-hard space-y-3">
              <div className="w-10 h-10 rounded-full border-[1.5px] border-[#14183A] bg-[#F6CD3B] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-display font-bold text-xl text-[#14183A]">
                Zero Single-Use Plastics
              </h3>
              <p className="font-body text-sm text-[#14183A]/80 leading-relaxed">
                Every parcel leaves our packhouse in corrugated cardboard, wrapped in water-activated paper tape and die-cut kraft paper cushion.
              </p>
            </div>

            <div className="bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[16px] p-6 sm:p-8 shadow-hard space-y-3">
              <div className="w-10 h-10 rounded-full border-[1.5px] border-[#14183A] bg-[#2F4BDB] text-white flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-display font-bold text-xl text-[#14183A]">
                Small Batches Only
              </h3>
              <p className="font-body text-sm text-[#14183A]/80 leading-relaxed">
                We produce 150 to 400 units per run. When a batch sells out, we refine the design based on user notes before re-firing.
              </p>
            </div>

            <div className="bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[16px] p-6 sm:p-8 shadow-hard space-y-3">
              <div className="w-10 h-10 rounded-full border-[1.5px] border-[#14183A] bg-[#FBE9A0] flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-display font-bold text-xl text-[#14183A]">
                Calm 30-Day Returns
              </h3>
              <p className="font-body text-sm text-[#14183A]/80 leading-relaxed">
                If a mug handle feels wrong in your palm or a notebook doesn't fit your daily pouch, return it with no interrogation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

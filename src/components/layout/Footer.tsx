/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useView } from '../../context/ViewContext';

export function Footer() {
  const { navigateTo } = useView();

  return (
    <footer className="bg-[#14183A] text-[#FBF6E9] border-t-[1.5px] border-[#14183A] pt-16 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#FBF6E9]/15">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="text-left cursor-pointer group"
            >
              <span className="font-display font-extrabold text-5xl sm:text-6xl tracking-tight text-[#FBF6E9] group-hover:text-[#F6CD3B] transition-colors">
                MOMO
              </span>
            </button>
            <p className="font-accent italic text-xl text-[#F6CD3B]">
              Everyday things, made happier.
            </p>
            <p className="font-body text-sm text-[#FBF6E9]/80 max-w-sm leading-relaxed">
              Small batch stationery, weighty ceramics, and quiet desk companions designed to introduce slight delight into ordinary working hours.
            </p>
            <div className="font-mono text-xs text-[#FBF6E9]/60 pt-2">
              Studio & Packhouse: Montreal, QC
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Shop */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#F6CD3B] mb-4">
                Catalogue
              </h4>
              <ul className="space-y-2.5 text-sm font-body">
                <li>
                  <button
                    onClick={() => navigateTo('shop', { category: 'All' })}
                    className="hover:text-[#F6CD3B] transition-colors cursor-pointer text-left"
                  >
                    All Objects
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('shop', { category: 'Ceramics' })}
                    className="hover:text-[#F6CD3B] transition-colors cursor-pointer text-left"
                  >
                    Ceramics & Mugs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('shop', { category: 'Stationery' })}
                    className="hover:text-[#F6CD3B] transition-colors cursor-pointer text-left"
                  >
                    Notebooks & Paper
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('shop', { category: 'Desk' })}
                    className="hover:text-[#F6CD3B] transition-colors cursor-pointer text-left"
                  >
                    Desk Tools
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('shop', { category: 'Bags' })}
                    className="hover:text-[#F6CD3B] transition-colors cursor-pointer text-left"
                  >
                    Canvas Totes
                  </button>
                </li>
              </ul>
            </div>

            {/* Help & Shipping */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#F6CD3B] mb-4">
                Care & Orders
              </h4>
              <ul className="space-y-2.5 text-sm font-body text-[#FBF6E9]/80">
                <li>
                  <span className="hover:text-[#FBF6E9] cursor-pointer">Shipping & Rates</span>
                </li>
                <li>
                  <span className="hover:text-[#FBF6E9] cursor-pointer">30-Day Returns</span>
                </li>
                <li>
                  <span className="hover:text-[#FBF6E9] cursor-pointer">Ceramic Care Guide</span>
                </li>
                <li>
                  <span className="hover:text-[#FBF6E9] cursor-pointer">Wholesale Enquiries</span>
                </li>
                <li>
                  <span className="hover:text-[#FBF6E9] cursor-pointer">hello@momo-objects.com</span>
                </li>
              </ul>
            </div>

            {/* Ethos / Follow */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#F6CD3B] mb-4">
                Dispatches
              </h4>
              <ul className="space-y-2.5 text-sm font-body text-[#FBF6E9]/80">
                <li>
                  <a
                    href="#newsletter"
                    className="hover:text-[#F6CD3B] transition-colors"
                  >
                    Monthly Newsletter
                  </a>
                </li>
                <li>
                  <span className="hover:text-[#FBF6E9] cursor-pointer">Studio Journal</span>
                </li>
                <li>
                  <span className="hover:text-[#FBF6E9] cursor-pointer">Instagram @momo.objects</span>
                </li>
                <li>
                  <span className="hover:text-[#FBF6E9] cursor-pointer">Are.na Channel</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#FBF6E9]/60">
          <div>
            &copy; {new Date().getFullYear()} MOMO Objects Inc. All rights reserved. Small objects for good moods.
          </div>
          <div className="flex items-center gap-4">
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
            <span>·</span>
            <span>Amex</span>
            <span>·</span>
            <span>Apple Pay</span>
            <span>·</span>
            <span>Interac</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

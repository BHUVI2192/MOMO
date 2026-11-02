/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';
import { useView } from '../../context/ViewContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const { navigateTo, openSearch } = useView();
  const { totalItemCount, openCart, lastAddedTimestamp } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FBF6E9] border-b-[1.5px] border-[#14183A] w-full">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6 md:gap-8">
          {/* Left: Brand Wordmark */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB] rounded select-none group"
              aria-label="MOMO home"
            >
              <span className="font-display font-extrabold text-3xl tracking-tight text-[#14183A] inline-block transition-transform duration-200 group-hover:scale-105">
                MOMO
              </span>
            </button>
          </div>

          {/* Center: Desktop Navigation Links (4-5 single line, clean typography) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#14183A]">
            <button
              type="button"
              onClick={() => navigateTo('shop', { category: 'All' })}
              className="relative py-1 cursor-pointer hover:text-[#2F4BDB] transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB] rounded"
            >
              <span>Shop All</span>
              <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#2F4BDB] transition-all duration-200 group-hover:w-full" />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('shop', { searchQuery: 'New' })}
              className="relative py-1 cursor-pointer hover:text-[#2F4BDB] transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB] rounded"
            >
              <span>New in</span>
              <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#2F4BDB] transition-all duration-200 group-hover:w-full" />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('shop', { category: 'Ceramics' })}
              className="relative py-1 cursor-pointer hover:text-[#2F4BDB] transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB] rounded"
            >
              <span>Ceramics</span>
              <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#2F4BDB] transition-all duration-200 group-hover:w-full" />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('shop', { category: 'Stationery' })}
              className="relative py-1 cursor-pointer hover:text-[#2F4BDB] transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB] rounded"
            >
              <span>Stationery</span>
              <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#2F4BDB] transition-all duration-200 group-hover:w-full" />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('about')}
              className="relative py-1 cursor-pointer hover:text-[#2F4BDB] transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB] rounded"
            >
              <span>About</span>
              <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#2F4BDB] transition-all duration-200 group-hover:w-full" />
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Icon */}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search products"
              className="p-2 sm:p-2.5 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] hover:bg-[#FBE9A0] text-[#14183A] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB]"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            {/* Heart Wishlist Icon */}
            <button
              type="button"
              onClick={openWishlist}
              aria-label={`View saved items (${wishlistCount})`}
              className="relative p-2 sm:p-2.5 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] hover:bg-[#FBDDE8] text-[#14183A] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB]"
            >
              <Heart size={19} strokeWidth={1.5} className={wishlistCount > 0 ? 'fill-[#F4A7C3]' : ''} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#F4A7C3] text-[#14183A] border-[1.5px] border-[#14183A] text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Bag Cart Icon with Blue Badge */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`Shopping bag with ${totalItemCount} items`}
              className="relative p-2 sm:p-2.5 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#F6CD3B] hover:bg-[#FBE9A0] text-[#14183A] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB]"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              <motion.span
                key={lastAddedTimestamp}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className="absolute -top-1.5 -right-1.5 bg-[#2F4BDB] text-[#FBF6E9] border-[1.5px] border-[#14183A] text-[10px] font-mono font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center"
              >
                {totalItemCount}
              </motion.span>
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden p-2 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] text-[#14183A] hover:bg-[#FBE9A0] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB]"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

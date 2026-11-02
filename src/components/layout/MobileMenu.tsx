/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Heart, ShoppingBag, Search } from 'lucide-react';
import { useView, AppView } from '../../context/ViewContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { navigateTo, openSearch } = useView();
  const { totalItemCount, openCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();

  useLockBodyScroll(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navItems = [
    { label: 'Shop All', view: 'shop' as AppView, params: {} },
    { label: 'New in', view: 'shop' as AppView, params: { searchQuery: 'New' } },
    { label: 'Ceramics', view: 'shop' as AppView, params: { category: 'Ceramics' as const } },
    { label: 'Stationery', view: 'shop' as AppView, params: { category: 'Stationery' as const } },
    { label: 'Desk & Tools', view: 'shop' as AppView, params: { category: 'Desk' as const } },
    { label: 'Tote Bags', view: 'shop' as AppView, params: { category: 'Bags' as const } },
    { label: 'About MOMO', view: 'about' as AppView, params: {} },
  ];

  const handleItemClick = (view: AppView, params = {}) => {
    onClose();
    navigateTo(view, params);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#F6CD3B] flex flex-col justify-between p-6 md:hidden overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b-[1.5px] border-[#14183A] pb-4">
            <span className="font-display font-extrabold text-2xl tracking-tighter text-[#14183A]">
              MOMO
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-2.5 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] text-[#14183A] hover:bg-white transition-colors cursor-pointer"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Links Staggered */}
          <nav className="py-8 space-y-4">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => handleItemClick(item.view, item.params)}
                  className="font-display font-bold text-3xl sm:text-4xl text-[#14183A] hover:text-[#2F4BDB] text-left flex items-center justify-between w-full group py-1"
                >
                  <span>{item.label}</span>
                  <ArrowRight
                    size={22}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              </motion.div>
            ))}
          </nav>

          {/* Action Row */}
          <div className="border-t-[1.5px] border-[#14183A] pt-6 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openSearch();
                }}
                className="flex flex-col items-center justify-center p-3 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] text-[#14183A]"
              >
                <Search size={18} strokeWidth={1.5} />
                <span className="font-mono text-[11px] mt-1">Search</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  openWishlist();
                }}
                className="flex flex-col items-center justify-center p-3 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] text-[#14183A]"
              >
                <Heart size={18} strokeWidth={1.5} />
                <span className="font-mono text-[11px] mt-1">Saved ({wishlistCount})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  openCart();
                }}
                className="flex flex-col items-center justify-center p-3 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#2F4BDB] text-[#FBF6E9]"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span className="font-mono text-[11px] mt-1">Bag ({totalItemCount})</span>
              </button>
            </div>

            <p className="font-mono text-center text-xs text-[#14183A]/70 pt-2">
              Everyday things, made happier.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

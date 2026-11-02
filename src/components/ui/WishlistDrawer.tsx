/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useView } from '../../context/ViewContext';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { formatPrice } from '../../utils/format';
import { SmartImage } from './SmartImage';
import { Button } from './Button';

export function WishlistDrawer() {
  const { isWishlistOpen, closeWishlist, wishlistItems, toggleWishlist } = useWishlist();
  const { addItem, openCart } = useCart();
  const { navigateTo } = useView();

  useLockBodyScroll(isWishlistOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWishlistOpen) {
        closeWishlist();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWishlistOpen, closeWishlist]);

  const handleMoveToBag = (product: (typeof wishlistItems)[0]) => {
    addItem(product, 1);
    toggleWishlist(product.id);
    closeWishlist();
    openCart();
  };

  const handleGoToProduct = (productId: string) => {
    closeWishlist();
    navigateTo('product', { productId });
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop: flat ink overlay at 40%, no blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-[#14183A]/40"
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-screen max-w-md bg-[#FBF6E9] border-l-[1.5px] border-[#14183A] shadow-hard flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b-[1.5px] border-[#14183A] bg-[#F4A7C3]">
                <div className="flex items-center gap-2">
                  <Heart size={20} className="fill-[#14183A] text-[#14183A]" strokeWidth={1.5} />
                  <h2 className="font-display font-bold text-lg text-[#14183A]">
                    Saved Objects ({wishlistItems.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeWishlist}
                  aria-label="Close saved items drawer"
                  className="p-2 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] hover:bg-[#F6CD3B] transition-colors cursor-pointer"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {wishlistItems.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full border-[1.5px] border-[#14183A] bg-[#FBE9A0] flex items-center justify-center">
                      <Heart size={26} strokeWidth={1.5} className="text-[#14183A]" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#14183A] mb-1">
                      No saved objects yet
                    </h3>
                    <p className="font-body text-sm text-[#14183A]/70 max-w-xs mx-auto mb-6">
                      Click the heart on any product to save it for a rainy Tuesday.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => {
                        closeWishlist();
                        navigateTo('shop');
                      }}
                    >
                      Browse catalogue
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {wishlistItems.map(product => (
                      <div
                        key={product.id}
                        className="p-3.5 rounded-[12px] border-[1.5px] border-[#14183A] bg-white flex gap-3 items-center"
                      >
                        <button
                          type="button"
                          onClick={() => handleGoToProduct(product.id)}
                          className="w-16 h-20 rounded-[8px] overflow-hidden border-[1.5px] border-[#14183A] shrink-0 cursor-pointer"
                        >
                          <SmartImage
                            src={product.images[0].url}
                            alt={product.name}
                            aspectRatio="4:5"
                            placeholderColor={product.images[0].placeholderColor}
                          />
                        </button>

                        <div className="flex-1 min-w-0">
                          <button
                            type="button"
                            onClick={() => handleGoToProduct(product.id)}
                            className="font-display font-semibold text-sm text-[#14183A] hover:text-[#2F4BDB] text-left truncate block w-full cursor-pointer"
                          >
                            {product.name}
                          </button>
                          <p className="font-mono text-xs text-[#14183A]/60 uppercase mt-0.5">
                            {product.category}
                          </p>
                          <p className="font-mono text-sm font-medium text-[#14183A] mt-1">
                            {formatPrice(product.price)}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleMoveToBag(product)}
                            className="p-2 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#F6CD3B] text-[#14183A] hover:bg-[#FBE9A0] transition-colors cursor-pointer"
                            aria-label={`Move ${product.name} to bag`}
                          >
                            <ShoppingBag size={16} strokeWidth={1.5} />
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product.id)}
                            className="p-2 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] text-[#14183A]/70 hover:text-[#14183A] transition-colors cursor-pointer"
                            aria-label={`Remove ${product.name} from wishlist`}
                          >
                            <X size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {wishlistItems.length > 0 && (
                <div className="p-5 border-t-[1.5px] border-[#14183A] bg-[#FBE9A0]">
                  <Button
                    variant="secondary"
                    isFullWidth
                    onClick={() => {
                      wishlistItems.forEach(item => addItem(item, 1));
                      closeWishlist();
                      openCart();
                    }}
                    icon={<ShoppingBag size={16} strokeWidth={1.5} />}
                  >
                    Add all to bag &rarr;
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

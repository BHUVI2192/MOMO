/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart, CartItem } from '../../context/CartContext';
import { useView } from '../../context/ViewContext';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { formatPrice } from '../../utils/format';
import { SmartImage } from '../ui/SmartImage';
import { QuantityStepper } from '../ui/QuantityStepper';
import { ShippingProgress } from './ShippingProgress';
import { PromoCodeInput } from './PromoCodeInput';
import { Button } from '../ui/Button';

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();
  const { navigateTo, closeSearch } = useView();

  const handleProductClick = () => {
    navigateTo('product', { productId: item.product.id });
  };

  return (
    <div className="flex gap-3.5 p-3.5 rounded-[12px] border-[1.5px] border-[#14183A] bg-white">
      {/* Thumbnail */}
      <button
        type="button"
        onClick={handleProductClick}
        className="w-20 h-24 rounded-[8px] overflow-hidden border-[1.5px] border-[#14183A] shrink-0 cursor-pointer"
      >
        <SmartImage
          src={item.product.images[0].url}
          alt={item.product.name}
          aspectRatio="4:5"
          placeholderColor={item.product.images[0].placeholderColor}
        />
      </button>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <button
              type="button"
              onClick={handleProductClick}
              className="font-display font-bold text-sm text-[#14183A] text-left hover:text-[#2F4BDB] truncate block cursor-pointer"
            >
              {item.product.name}
            </button>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.product.name} from bag`}
              className="text-[#14183A]/50 hover:text-[#14183A] p-0.5 cursor-pointer"
            >
              <Trash2 size={15} strokeWidth={1.5} />
            </button>
          </div>

          {item.variant && (
            <p className="font-mono text-[11px] text-[#14183A]/60 mt-0.5">
              Option: <span className="capitalize">{item.variant}</span>
            </p>
          )}

          <p className="font-mono text-xs font-semibold text-[#14183A] mt-1">
            {formatPrice(item.product.price)} each
          </p>
        </div>

        {/* Stepper & Line Total */}
        <div className="flex items-center justify-between pt-2">
          <QuantityStepper
            size="sm"
            quantity={item.quantity}
            onChange={q => updateQuantity(item.id, q)}
          />

          <span className="font-mono font-bold text-sm text-[#14183A]">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    totalItemCount,
  } = useCart();

  const { navigateTo } = useView();

  useLockBodyScroll(isCartOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  const handleProceedToCheckout = () => {
    closeCart();
    navigateTo('checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Bag">
          {/* Backdrop: flat ink overlay at 40%, no blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#14183A]/40"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-screen max-w-md bg-[#FBF6E9] border-l-[1.5px] border-[#14183A] shadow-hard flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 border-b-[1.5px] border-[#14183A] bg-[#F6CD3B] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} strokeWidth={1.5} className="text-[#14183A]" />
                  <h2 className="font-display font-bold text-lg text-[#14183A]">
                    Your Bag ({totalItemCount})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Close bag drawer"
                  className="p-2 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] hover:bg-[#F4A7C3] transition-colors cursor-pointer"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full border-[1.5px] border-[#14183A] bg-[#FBE9A0] flex items-center justify-center">
                      <ShoppingBag size={26} strokeWidth={1.5} className="text-[#14183A]" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#14183A] mb-1">
                      Your bag is completely empty
                    </h3>
                    <p className="font-body text-sm text-[#14183A]/70 max-w-xs mx-auto mb-6">
                      Small objects for good moods are waiting to be put to work.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => {
                        closeCart();
                        navigateTo('shop');
                      }}
                    >
                      Start shopping
                    </Button>
                  </div>
                ) : (
                  <>
                    <ShippingProgress />

                    <div className="space-y-3 pt-1">
                      {items.map(item => (
                        <CartItemRow key={item.id} item={item} />
                      ))}
                    </div>

                    <div className="pt-2">
                      <PromoCodeInput />
                    </div>
                  </>
                )}
              </div>

              {/* Footer Checkout Summary */}
              {items.length > 0 && (
                <div className="p-5 border-t-[1.5px] border-[#14183A] bg-[#FBF6E9] space-y-3">
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-[#14183A]/80">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#14183A]">{formatPrice(subtotal)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#2F4BDB]">
                        <span>Discount</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[#14183A]/80">
                      <span>Shipping</span>
                      <span className="font-medium text-[#14183A]">
                        {shippingFee === 0 ? (
                          <span className="text-[#2F4BDB] font-semibold">FREE</span>
                        ) : (
                          formatPrice(shippingFee)
                        )}
                      </span>
                    </div>

                    <div className="pt-2 border-t-[1.5px] border-[#14183A]/20 flex justify-between text-base font-display font-bold text-[#14183A]">
                      <span>Total</span>
                      <span className="font-mono">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    isFullWidth
                    onClick={handleProceedToCheckout}
                    iconRight={<ArrowRight size={16} strokeWidth={2} />}
                  >
                    Proceed to Checkout &rarr;
                  </Button>

                  <p className="text-center font-mono text-[10px] text-[#14183A]/60">
                    Taxes calculated at checkout • 30-day calm returns
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

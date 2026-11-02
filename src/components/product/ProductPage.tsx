/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronDown,
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { PRODUCTS, Product } from '../../data/products';
import { useView } from '../../context/ViewContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/format';
import { SmartImage } from '../ui/SmartImage';
import { QuantityStepper } from '../ui/QuantityStepper';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { ProductCard } from '../shop/ProductCard';

type AccordionSection = 'details' | 'shipping' | 'care' | null;

export function ProductPage() {
  const { selectedProductId, navigateTo } = useView();
  const { addItem, openCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Find product or fallback to first product
  const product = useMemo(() => {
    return PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  }, [selectedProductId]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants?.options[0]?.value || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<AccordionSection>('details');

  const wishlisted = isWishlisted(product.id);

  // Fallback images if product only has 1 image defined
  const images = useMemo(() => {
    if (product.images.length >= 3) return product.images;
    return [
      ...product.images,
      {
        id: `${product.id}-detail-1`,
        url: product.images[0].url,
        alt: `${product.name} detail view`,
        aspectRatio: '4:5' as const,
        placeholderColor: '#FBE9A0' as const,
      },
      {
        id: `${product.id}-detail-2`,
        url: product.images[0].secondaryUrl || product.images[0].url,
        alt: `${product.name} alternate view`,
        aspectRatio: '4:5' as const,
        placeholderColor: '#DCE3FA' as const,
      },
    ];
  }, [product]);

  // Related products (same category or popular)
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4)
      .concat(
        PRODUCTS.filter(p => p.id !== product.id && p.category !== product.category)
      )
      .slice(0, 4);
  }, [product]);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant || undefined);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openCart();
    }, 1200);
  };

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion(prev => (prev === section ? null : section));
  };

  return (
    <div className="bg-[#FBF6E9] min-h-screen py-8 sm:py-12 border-b-[1.5px] border-[#14183A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb back to shop */}
        <nav className="mb-8 flex items-center gap-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => navigateTo('shop', { category: 'All' })}
            className="text-[#14183A]/70 hover:text-[#2F4BDB] inline-flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft size={14} />
            <span>Catalogue</span>
          </button>
          <span className="text-[#14183A]/40">/</span>
          <button
            type="button"
            onClick={() => navigateTo('shop', { category: product.category })}
            className="text-[#14183A]/70 hover:text-[#2F4BDB] cursor-pointer"
          >
            {product.category}
          </button>
          <span className="text-[#14183A]/40">/</span>
          <span className="text-[#14183A] font-semibold truncate">{product.name}</span>
        </nav>

        {/* Contiguous PDP Grid: Gallery Left, Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pb-16 border-b-[1.5px] border-[#14183A]">
          {/* Left: Gallery (Main 4:5 + 3 Thumbnails) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-[16px] overflow-hidden border-[1.5px] border-[#14183A] shadow-hard bg-white relative">
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <Tag
                    variant={
                      product.badge === 'Bestseller'
                        ? 'yellow'
                        : product.badge === 'New'
                        ? 'pink'
                        : 'blue'
                    }
                  >
                    {product.badge}
                  </Tag>
                </div>
              )}
              <SmartImage
                src={images[activeImageIndex].url}
                secondarySrc={images[activeImageIndex].secondaryUrl}
                alt={images[activeImageIndex].alt}
                aspectRatio="4:5"
                priority={true}
                placeholderColor={images[activeImageIndex].placeholderColor}
              />
            </div>

            {/* 3 Thumbnails (Accessible & Clickable) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {images.slice(0, 3).map((img, idx) => (
                <button
                  key={img.id || idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`rounded-[10px] overflow-hidden border-[1.5px] transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#2F4BDB] ring-2 ring-[#2F4BDB] shadow-hard-sm'
                      : 'border-[#14183A] opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View thumbnail ${idx + 1}`}
                >
                  <SmartImage
                    src={img.url}
                    alt={img.alt}
                    aspectRatio="4:5"
                    placeholderColor={img.placeholderColor}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Purchase Module */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#14183A]/70 mb-2">
                <span className="uppercase tracking-widest">{product.category}</span>
                <span>SKU: {product.sku}</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#14183A] tracking-tight leading-tight mb-2">
                {product.name}
              </h1>

              <p className="font-accent italic text-base text-[#2F4BDB] mb-4">
                &ldquo;{product.tagline}&rdquo;
              </p>

              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-mono font-bold text-3xl text-[#14183A] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                <span className="font-mono text-xs text-[#14183A]/70">
                  Rating: <span className="font-bold text-[#14183A]">{product.rating}</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-body text-base text-[#14183A]/85 leading-relaxed">
              {product.description}
            </p>

            {/* Variant Picker (if available) */}
            {product.variants && (
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider text-[#14183A]">
                    Select {product.variants.type}:
                  </span>
                  <span className="capitalize text-[#14183A]/80">
                    {product.variants.options.find(o => o.value === selectedVariant)?.name}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.variants.options.map(option => {
                    const isSelected = selectedVariant === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSelectedVariant(option.value)}
                        className={`px-3.5 py-2 rounded-[8px] border-[1.5px] border-[#14183A] text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#14183A] text-[#FBF6E9] shadow-hard-sm'
                            : 'bg-white text-[#14183A] hover:bg-[#FBE9A0]'
                        }`}
                      >
                        {option.hex && (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-[#14183A]/40 shrink-0"
                            style={{ backgroundColor: option.hex }}
                          />
                        )}
                        <span>{option.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Bag Row */}
            <div className="space-y-3 pt-3">
              <div className="flex items-center gap-3">
                <QuantityStepper quantity={quantity} onChange={setQuantity} />

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 min-h-[44px] px-6 rounded-[8px] border-[1.5px] border-[#14183A] font-medium text-sm flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-hard ${
                    isAdded
                      ? 'bg-[#2F4BDB] text-[#FBF6E9]'
                      : 'bg-[#F6CD3B] text-[#14183A] hover:bg-[#FBE9A0] active:translate-x-0 active:translate-y-0 active:shadow-none'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={18} strokeWidth={2.5} />
                      <span>Added to bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} strokeWidth={1.5} />
                      <span>Add to bag • {formatPrice(product.price * quantity)}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={wishlisted ? 'Remove from saved' : 'Save object'}
                  className={`min-h-[44px] w-12 rounded-[8px] border-[1.5px] border-[#14183A] flex items-center justify-center transition-all cursor-pointer shadow-hard ${
                    wishlisted
                      ? 'bg-[#F4A7C3] text-[#14183A]'
                      : 'bg-[#FBF6E9] text-[#14183A] hover:bg-[#FBDDE8]'
                  }`}
                >
                  <Heart
                    size={20}
                    strokeWidth={1.5}
                    className={wishlisted ? 'fill-[#14183A]' : ''}
                  />
                </button>
              </div>

              {/* In stock note */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#14183A]/70 pt-1">
                <span className="w-2 h-2 rounded-full bg-[#2F4BDB]" />
                <span>
                  {product.stockCount} units ready to ship from Montreal studio
                </span>
              </div>
            </div>

            {/* Accordions: Details, Shipping & Returns, Care (Only 1 open at a time) */}
            <div className="border-[1.5px] border-[#14183A] rounded-[12px] bg-white divide-y-[1.5px] divide-[#14183A] overflow-hidden mt-6">
              {/* Accordion 1: Details */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('details')}
                  className="w-full p-4 text-left flex items-center justify-between font-display font-bold text-sm text-[#14183A] hover:bg-[#FBF6E9] transition-colors cursor-pointer"
                >
                  <span>Object Details & Specifications</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openAccordion === 'details' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openAccordion === 'details' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-1 text-xs font-body text-[#14183A]/85 space-y-2 border-t-[1px] border-[#14183A]/10 bg-[#FBF6E9]/50">
                        <ul className="list-disc list-inside space-y-1">
                          {product.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                        <div className="pt-2 font-mono text-[11px] text-[#14183A]/70 space-y-1">
                          <div>
                            <strong>Dimensions:</strong> {product.dimensions}
                          </div>
                          <div>
                            <strong>Materials:</strong> {product.materials}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: Shipping & Returns */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full p-4 text-left flex items-center justify-between font-display font-bold text-sm text-[#14183A] hover:bg-[#FBF6E9] transition-colors cursor-pointer"
                >
                  <span>Shipping & 30-Day Returns</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openAccordion === 'shipping' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-1 text-xs font-body text-[#14183A]/85 space-y-2 border-t-[1px] border-[#14183A]/10 bg-[#FBF6E9]/50">
                        <p>
                          <strong>Dispatch:</strong> Dispatched in 1 business day via carbon-neutral postal carriers. Free worldwide shipping on all orders over $50.
                        </p>
                        <p>
                          <strong>Packaging:</strong> 100% recycled paper cushion wrap and paper tape. Absolutely zero plastics or polystyrene peanuts.
                        </p>
                        <p>
                          <strong>Returns:</strong> 30-day calm returns policy. If an object does not fit your desk or routine, return it in original packaging for a full refund.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 3: Care Guide */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('care')}
                  className="w-full p-4 text-left flex items-center justify-between font-display font-bold text-sm text-[#14183A] hover:bg-[#FBF6E9] transition-colors cursor-pointer"
                >
                  <span>Care & Maintenance</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openAccordion === 'care' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-1 text-xs font-body text-[#14183A]/85 space-y-1.5 border-t-[1px] border-[#14183A]/10 bg-[#FBF6E9]/50">
                        <p>{product.care}</p>
                        <p className="font-mono text-[11px] text-[#14183A]/60 pt-1">
                          Crafted to last for decades with thoughtful daily care.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* "You might also like": 4 related products */}
        <section className="pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#14183A]">
              You might also like.
            </h2>
            <button
              onClick={() => navigateTo('shop', { category: product.category })}
              className="font-mono text-xs text-[#2F4BDB] hover:underline cursor-pointer"
            >
              More in {product.category} &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct, idx) => (
              <ProductCard key={relProduct.id} product={relProduct} index={idx} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

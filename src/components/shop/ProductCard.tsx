/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useView } from '../../context/ViewContext';
import { formatPrice } from '../../utils/format';
import { Tag } from '../ui/Tag';
import { SmartImage } from '../ui/SmartImage';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { navigateTo } = useView();
  const [isAdded, setIsAdded] = useState(false);

  // Rotate through the three tint placeholder backgrounds
  const tintColors = ['#FBDDE8', '#FBE9A0', '#DCE3FA'];
  const placeholderColor = tintColors[index % tintColors.length];

  const handleCardClick = () => {
    navigateTo('product', { productId: product.id });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[12px] p-3 sm:p-3.5 flex flex-col justify-between transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard cursor-pointer select-none"
    >
      {/* Top Media Area */}
      <div className="relative w-full overflow-hidden rounded-[8px] border-[1.5px] border-[#14183A] mb-3">
        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full border-[1.5px] border-[#14183A] bg-[#FBF6E9] flex items-center justify-center transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <Heart
            size={15}
            strokeWidth={1.5}
            className={wishlisted ? 'fill-[#F4A7C3] text-[#14183A]' : 'text-[#14183A]'}
          />
        </button>

        {/* Tag Pill if present */}
        {product.badge && (
          <div className="absolute top-2 left-2 z-10">
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

        {/* Product Image with Hover Zoom & Secondary Swap */}
        <div className="transform transition-transform duration-300 group-hover:scale-[1.04]">
          <SmartImage
            src={product.images[0].url}
            secondarySrc={product.images[0].secondaryUrl || (product.images[1]?.url)}
            alt={product.images[0].alt}
            aspectRatio="4:5"
            placeholderColor={placeholderColor}
            onHoverSwap={true}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#14183A]/70 mb-1">
            <span className="font-mono uppercase text-[11px] tracking-wider">
              {product.category}
            </span>
            <span className="font-mono text-[11px] font-medium text-[#14183A]">
              {product.rating}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-base sm:text-lg text-[#14183A] group-hover:text-[#2F4BDB] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="font-body text-xs text-[#14183A]/75 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 mt-2 border-t-[1.5px] border-[#14183A]/15 flex items-center justify-between gap-2">
          <div className="font-mono font-bold text-base sm:text-lg text-[#14183A] tabular-nums">
            {formatPrice(product.price)}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`min-h-[38px] px-3 rounded-[8px] border-[1.5px] border-[#14183A] font-medium text-xs flex items-center gap-1.5 transition-all duration-150 cursor-pointer ${
              isAdded
                ? 'bg-[#2F4BDB] text-[#FBF6E9]'
                : 'bg-[#F6CD3B] text-[#14183A] hover:bg-[#FBE9A0] active:scale-95'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {isAdded ? (
              <>
                <Check size={14} strokeWidth={2.5} />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus size={14} strokeWidth={2} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { PRODUCTS, Product } from '../data/products';

interface WishlistContextValue {
  wishlistIds: string[];
  wishlistItems: Product[];
  wishlistCount: number;
  isWishlistOpen: boolean;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>(['tuesday-mug', 'big-feelings-tote']);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlistIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const openWishlist = useCallback(() => setIsWishlistOpen(true), []);
  const closeWishlist = useCallback(() => setIsWishlistOpen(false), []);

  const wishlistItems = useMemo(() => {
    return PRODUCTS.filter(p => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const wishlistCount = wishlistIds.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        wishlistCount,
        isWishlistOpen,
        toggleWishlist,
        isWishlisted,
        openWishlist,
        closeWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

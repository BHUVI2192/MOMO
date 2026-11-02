/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useReducer, useState, useCallback, useMemo } from 'react';
import { Product } from '../data/products';
import { PROMO_CODES } from '../data/content';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from '../utils/format';

export interface CartItem {
  id: string; // unique combo of product.id + (variant || 'default')
  product: Product;
  quantity: number;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  discountRate: number;
  lastAddedTimestamp: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number; variant?: string }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'APPLY_PROMO'; code: string; rate: number }
  | { type: 'REMOVE_PROMO' }
  | { type: 'CLEAR_CART' };

const INITIAL_STATE: CartState = {
  items: [
    // Pre-seed with 1 nice item so user sees immediate cart utility, or can start clean
    // A small sample item makes it feel like a real shopping session
  ],
  promoCode: null,
  discountRate: 0,
  lastAddedTimestamp: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const quantityToAdd = action.quantity ?? 1;
      const itemId = `${action.product.id}__${action.variant || 'default'}`;
      const existingIndex = state.items.findIndex(item => item.id === itemId);

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: Math.min(item.quantity + quantityToAdd, 10) }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            id: itemId,
            product: action.product,
            quantity: quantityToAdd,
            variant: action.variant,
          },
        ];
      }

      return {
        ...state,
        items: newItems,
        lastAddedTimestamp: Date.now(),
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.id),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id ? { ...item, quantity: Math.min(action.quantity, 10) } : item
        ),
      };
    }

    case 'APPLY_PROMO': {
      return {
        ...state,
        promoCode: action.code,
        discountRate: action.rate,
      };
    }

    case 'REMOVE_PROMO': {
      return {
        ...state,
        promoCode: null,
        discountRate: 0,
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        promoCode: null,
        discountRate: 0,
      };
    }

    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  totalItemCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  grandTotal: number;
  amountAwayFromFreeShipping: number;
  isFreeShipping: boolean;
  promoCode: string | null;
  promoError: string | null;
  isCartOpen: boolean;
  lastAddedTimestamp: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addItem = useCallback((product: Product, quantity = 1, variant?: string) => {
    dispatch({ type: 'ADD_ITEM', product, quantity, variant });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  }, []);

  const applyPromoCode = useCallback((code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setPromoError('Please enter a promo code');
      return false;
    }
    const rate = PROMO_CODES[clean];
    if (rate !== undefined) {
      dispatch({ type: 'APPLY_PROMO', code: clean, rate });
      setPromoError(null);
      return true;
    } else {
      setPromoError('Invalid code. Try "MOMO10" for 10% off.');
      return false;
    }
  }, []);

  const removePromoCode = useCallback(() => {
    dispatch({ type: 'REMOVE_PROMO' });
    setPromoError(null);
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const totalItemCount = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const subtotal = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [state.items]);

  const discountAmount = useMemo(() => {
    return Math.round(subtotal * state.discountRate * 100) / 100;
  }, [subtotal, state.discountRate]);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const shippingFee = useMemo(() => {
    if (subtotal === 0 || isFreeShipping) return 0;
    return STANDARD_SHIPPING_COST;
  }, [subtotal, isFreeShipping]);

  const amountAwayFromFreeShipping = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  }, [subtotal]);

  const grandTotal = useMemo(() => {
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal - discountAmount + shippingFee);
  }, [subtotal, discountAmount, shippingFee]);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItemCount,
        subtotal,
        discountAmount,
        shippingFee,
        grandTotal,
        amountAwayFromFreeShipping,
        isFreeShipping,
        promoCode: state.promoCode,
        promoError,
        isCartOpen,
        lastAddedTimestamp: state.lastAddedTimestamp,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        applyPromoCode,
        removePromoCode,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Category } from '../data/products';

export type AppView = 'home' | 'shop' | 'product' | 'checkout' | 'confirmation' | 'about';

export interface OrderConfirmationData {
  orderId: string;
  customerName: string;
  email: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  country: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    variant?: string;
  }>;
  createdAt: string;
}

interface NavigateParams {
  productId?: string;
  category?: Category | 'All';
  searchQuery?: string;
  orderData?: OrderConfirmationData;
}

interface ViewContextValue {
  view: AppView;
  selectedProductId: string | null;
  selectedCategory: Category | 'All';
  searchQuery: string;
  orderConfirmation: OrderConfirmationData | null;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  navigateTo: (view: AppView, params?: NavigateParams) => void;
  setSelectedCategory: (category: Category | 'All') => void;
  setSearchQuery: (query: string) => void;
}

const ViewContext = createContext<ViewContextValue | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmationData | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Sync state from URL hash
  const parseHash = useCallback(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash || hash === '') {
      setView('home');
      return;
    }

    const [route, queryString] = hash.split('?');
    const params = new URLSearchParams(queryString || '');

    if (route === 'shop') {
      setView('shop');
      const cat = params.get('category');
      if (cat) {
        setSelectedCategory(cat as Category);
      }
      const q = params.get('q');
      if (q) setSearchQuery(q);
    } else if (route === 'product') {
      const id = params.get('id');
      if (id) {
        setSelectedProductId(id);
        setView('product');
      } else {
        setView('shop');
      }
    } else if (route === 'checkout') {
      setView('checkout');
    } else if (route === 'confirmation') {
      setView('confirmation');
    } else if (route === 'about') {
      setView('about');
    } else {
      setView('home');
    }
  }, []);

  useEffect(() => {
    parseHash();
    const onHashChange = () => parseHash();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [parseHash]);

  const navigateTo = useCallback((newView: AppView, params?: NavigateParams) => {
    if (params?.productId) {
      setSelectedProductId(params.productId);
    }
    if (params?.category) {
      setSelectedCategory(params.category);
    }
    if (params?.searchQuery !== undefined) {
      setSearchQuery(params.searchQuery);
    }
    if (params?.orderData) {
      setOrderConfirmation(params.orderData);
    }

    setView(newView);

    // Update URL hash
    let hash = `#/${newView}`;
    const query = new URLSearchParams();

    if (newView === 'product' && params?.productId) {
      query.set('id', params.productId);
    } else if (newView === 'shop') {
      if (params?.category && params.category !== 'All') {
        query.set('category', params.category);
      }
      if (params?.searchQuery) {
        query.set('q', params.searchQuery);
      }
    } else if (newView === 'confirmation' && params?.orderData?.orderId) {
      query.set('orderId', params.orderData.orderId);
    }

    const qs = query.toString();
    if (qs) {
      hash += `?${qs}`;
    }

    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  return (
    <ViewContext.Provider
      value={{
        view,
        selectedProductId,
        selectedCategory,
        searchQuery,
        orderConfirmation,
        isSearchOpen,
        openSearch,
        closeSearch,
        navigateTo,
        setSelectedCategory,
        setSearchQuery,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

export function useView(): ViewContextValue {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
}

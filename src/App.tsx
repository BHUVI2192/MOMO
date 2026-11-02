/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewProvider, useView } from './context/ViewContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Marquee } from './components/layout/Marquee';
import { Footer } from './components/layout/Footer';

import { Hero } from './components/home/Hero';
import { CategoryTiles } from './components/home/CategoryTiles';
import { NewArrivals } from './components/home/NewArrivals';
import { BrandStory } from './components/home/BrandStory';
import { Bestsellers } from './components/home/Bestsellers';
import { Reviews } from './components/home/Reviews';
import { Newsletter } from './components/home/Newsletter';

import { ShopPage } from './components/shop/ShopPage';
import { ProductPage } from './components/product/ProductPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { ConfirmationPage } from './components/checkout/ConfirmationPage';
import { AboutPage } from './components/about/AboutPage';

import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/ui/WishlistDrawer';
import { SearchOverlay } from './components/ui/SearchOverlay';

function MainContent() {
  const { view } = useView();

  return (
    <main className="flex-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {view === 'home' && (
            <>
              {/* 1. Hero on yellow field */}
              <Hero />

              {/* 2. Marquee strip */}
              <Marquee variant="ink" />

              {/* 3. Category tiles */}
              <CategoryTiles />

              {/* 4. New this week */}
              <NewArrivals />

              {/* 5. Brand story band (blue-100) */}
              <BrandStory />

              {/* 6. Bestsellers grid */}
              <Bestsellers />

              {/* 7. Reviews on pink */}
              <Reviews />

              {/* 8. Newsletter on yellow */}
              <Newsletter />
            </>
          )}

          {view === 'shop' && <ShopPage />}
          {view === 'product' && <ProductPage />}
          {view === 'checkout' && <CheckoutPage />}
          {view === 'confirmation' && <ConfirmationPage />}
          {view === 'about' && <AboutPage />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export default function App() {
  return (
    <ViewProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col bg-[#FBF6E9] text-[#14183A]">
            {/* Global Announcement */}
            <AnnouncementBar />

            {/* Sticky Header */}
            <Header />

            {/* Dynamic View Content */}
            <MainContent />

            {/* Footer */}
            <Footer />

            {/* Overlays & Drawers */}
            <CartDrawer />
            <WishlistDrawer />
            <SearchOverlay />
          </div>
        </WishlistProvider>
      </CartProvider>
    </ViewProvider>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, Lock, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useView, OrderConfirmationData } from '../../context/ViewContext';
import { formatPrice } from '../../utils/format';
import { SmartImage } from '../ui/SmartImage';
import { Button } from '../ui/Button';

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export function CheckoutPage() {
  const {
    items,
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    clearCart,
  } = useCart();
  const { navigateTo } = useView();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'Canada',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Card formatting helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
    if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: undefined }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setFormData(prev => ({ ...prev, cardExpiry: raw }));
    if (errors.cardExpiry) setErrors(prev => ({ ...prev, cardExpiry: undefined }));
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setFormData(prev => ({ ...prev, cardCvc: raw }));
    if (errors.cardCvc) setErrors(prev => ({ ...prev, cardCvc: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Please provide a valid email for order receipt';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal / ZIP code is required';
    }

    const cleanCard = formData.cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 15) {
      newErrors.cardNumber = 'Enter a valid 16-digit card number';
    }
    if (formData.cardExpiry.length < 5) {
      newErrors.cardExpiry = 'Enter MM/YY';
    }
    if (formData.cardCvc.length < 3) {
      newErrors.cardCvc = 'Enter CVC code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderData: OrderConfirmationData = {
      orderId: `MM-${randomNum}`,
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      shippingAddress: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}`,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: grandTotal,
      items: items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        variant: item.variant,
      })),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigateTo('confirmation', { orderData });
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#FBF6E9] min-h-[60vh] py-20 px-4 text-center">
        <h2 className="font-display font-bold text-2xl text-[#14183A] mb-3">
          Your bag is empty
        </h2>
        <p className="font-body text-sm text-[#14183A]/70 mb-6">
          Add some objects to your bag before checking out.
        </p>
        <Button variant="primary" onClick={() => navigateTo('shop')}>
          Browse catalogue
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF6E9] min-h-screen py-10 sm:py-14 border-b-[1.5px] border-[#14183A]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigateTo('shop')}
          className="mb-8 font-mono text-xs text-[#14183A]/70 hover:text-[#2F4BDB] inline-flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Continue shopping</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Checkout Form */}
          <div className="lg:col-span-7 bg-white border-[1.5px] border-[#14183A] rounded-[16px] p-6 sm:p-8 shadow-hard">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#14183A] mb-6">
              Checkout & Shipping
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Contact */}
              <div className="space-y-3">
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#14183A] font-bold">
                  01. Contact Information
                </h2>

                <div>
                  <label className="block font-mono text-xs text-[#14183A] mb-1">
                    Email address for dispatch tracking
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="clara@example.com"
                    className="w-full h-11 px-3.5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[8px] text-sm text-[#14183A] focus:outline-none focus:ring-2 focus:ring-[#2F4BDB]"
                  />
                  {errors.email && (
                    <p className="mt-1 font-mono text-xs text-[#14183A] bg-[#FBDDE8] border-[1px] border-[#14183A] rounded px-2 py-0.5">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div className="space-y-3 pt-4 border-t-[1.5px] border-[#14183A]/15">
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#14183A] font-bold">
                  02. Delivery Destination
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-xs text-[#14183A] mb-1">First name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={e => {
                        setFormData({ ...formData, firstName: e.target.value });
                        if (errors.firstName) setErrors({ ...errors, firstName: undefined });
                      }}
                      className="w-full h-11 px-3.5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[8px] text-sm text-[#14183A] focus:outline-none focus:ring-2 focus:ring-[#2F4BDB]"
                    />
                    {errors.firstName && (
                      <p className="mt-1 font-mono text-xs text-[#14183A] bg-[#FBDDE8] border-[1px] border-[#14183A] rounded px-2 py-0.5">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#14183A] mb-1">Last name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={e => {
                        setFormData({ ...formData, lastName: e.target.value });
                        if (errors.lastName) setErrors({ ...errors, lastName: undefined });
                      }}
                      className="w-full h-11 px-3.5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[8px] text-sm text-[#14183A] focus:outline-none focus:ring-2 focus:ring-[#2F4BDB]"
                    />
                    {errors.lastName && (
                      <p className="mt-1 font-mono text-xs text-[#14183A] bg-[#FBDDE8] border-[1px] border-[#14183A] rounded px-2 py-0.5">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#14183A] mb-1">
                    Street address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => {
                      setFormData({ ...formData, address: e.target.value });
                      if (errors.address) setErrors({ ...errors, address: undefined });
                    }}
                    placeholder="402 St-Laurent Blvd"
                    className="w-full h-11 px-3.5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[8px] text-sm text-[#14183A] focus:outline-none focus:ring-2 focus:ring-[#2F4BDB]"
                  />
                  {errors.address && (
                    <p className="mt-1 font-mono text-xs text-[#14183A] bg-[#FBDDE8] border-[1px] border-[#14183A] rounded px-2 py-0.5">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block font-mono text-xs text-[#14183A] mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={e => {
                        setFormData({ ...formData, city: e.target.value });
                        if (errors.city) setErrors({ ...errors, city: undefined });
                      }}
                      placeholder="Montreal"
                      className="w-full h-11 px-3.5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[8px] text-sm text-[#14183A] focus:outline-none focus:ring-2 focus:ring-[#2F4BDB]"
                    />
                    {errors.city && (
                      <p className="mt-1 font-mono text-xs text-[#14183A] bg-[#FBDDE8] border-[1px] border-[#14183A] rounded px-2 py-0.5">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#14183A] mb-1">Postal / ZIP</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={e => {
                        setFormData({ ...formData, postalCode: e.target.value });
                        if (errors.postalCode) setErrors({ ...errors, postalCode: undefined });
                      }}
                      placeholder="H2Y 2Y7"
                      className="w-full h-11 px-3.5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[8px] text-sm text-[#14183A] focus:outline-none focus:ring-2 focus:ring-[#2F4BDB]"
                    />
                    {errors.postalCode && (
                      <p className="mt-1 font-mono text-xs text-[#14183A] bg-[#FBDDE8] border-[1px] border-[#14183A] rounded px-2 py-0.5">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#14183A] mb-1">Country</label>
                    <select
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className="w-full h-11 px-3.5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[8px] text-xs font-mono text-[#14183A] focus:outline-none focus:ring-2 focus:ring-[#2F4BDB]"
                    >
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Payment (Mock with spacing/formatting) */}
              <div className="space-y-3 pt-4 border-t-[1.5px] border-[#14183A]/15">
                <div className="flex items-center justify-between">
                  <h2 className="font-mono text-xs uppercase tracking-widest text-[#14183A] font-bold">
                    03. Payment Simulation
                  </h2>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#2F4BDB]">
                    <Lock size={12} />
                    <span>256-bit Encrypted</span>
                  </span>
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#14183A] mb-1">Card number</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4242 4242 4242 4242"
                    className="w-full h-11 px-3.5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[8px] font-mono text-sm text-[#14183A] tracking-wider focus:outline-none focus:ring-2 focus:ring-[#2F4BDB]"
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 font-mono text-xs text-[#14183A] bg-[#FBDDE8] border-[1px] border-[#14183A] rounded px-2 py-0.5">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-xs text-[#14183A] mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={formData.cardExpiry}
                      onChange={handleExpiryChange}
                      placeholder="08/28"
                      className="w-full h-11 px-3.5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[8px] font-mono text-sm text-[#14183A] focus:outline-none focus:ring-2 focus:ring-[#2F4BDB]"
                    />
                    {errors.cardExpiry && (
                      <p className="mt-1 font-mono text-xs text-[#14183A] bg-[#FBDDE8] border-[1px] border-[#14183A] rounded px-2 py-0.5">
                        {errors.cardExpiry}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#14183A] mb-1">CVC Code</label>
                    <input
                      type="text"
                      value={formData.cardCvc}
                      onChange={handleCvcChange}
                      placeholder="842"
                      className="w-full h-11 px-3.5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[8px] font-mono text-sm text-[#14183A] focus:outline-none focus:ring-2 focus:ring-[#2F4BDB]"
                    />
                    {errors.cardCvc && (
                      <p className="mt-1 font-mono text-xs text-[#14183A] bg-[#FBDDE8] border-[1px] border-[#14183A] rounded px-2 py-0.5">
                        {errors.cardCvc}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isFullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Securing your order...' : `Place order • ${formatPrice(grandTotal)}`}
                </Button>

                <p className="text-center font-mono text-[11px] text-[#14183A]/60 mt-3">
                  This is an interactive studio preview. No actual credit card charge will be made.
                </p>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[16px] p-6 shadow-hard-sm space-y-5 lg:sticky lg:top-24">
            <h2 className="font-display font-bold text-lg text-[#14183A] border-b-[1.5px] border-[#14183A]/15 pb-3">
              Order Summary ({items.length} object{items.length === 1 ? '' : 's'})
            </h2>

            {/* Line items list */}
            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 items-center text-xs">
                  <div className="w-14 h-16 rounded-[6px] overflow-hidden border-[1.5px] border-[#14183A] shrink-0 bg-white">
                    <SmartImage
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      aspectRatio="4:5"
                      placeholderColor={item.product.images[0].placeholderColor}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-[#14183A] truncate">
                      {item.product.name}
                    </div>
                    {item.variant && (
                      <div className="font-mono text-[11px] text-[#14183A]/60">
                        {item.variant}
                      </div>
                    )}
                    <div className="font-mono text-[11px] text-[#14183A]/80">
                      Qty: {item.quantity} × {formatPrice(item.product.price)}
                    </div>
                  </div>

                  <div className="font-mono font-bold text-sm text-[#14183A]">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="pt-4 border-t-[1.5px] border-[#14183A]/20 space-y-2 text-xs font-mono">
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
                <span>Standard Delivery</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#2F4BDB] font-semibold">FREE</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t-[1.5px] border-[#14183A]/20 flex justify-between text-base font-display font-bold text-[#14183A]">
                <span>Grand Total</span>
                <span className="font-mono text-lg">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Packaging Guarantee Box */}
            <div className="p-3.5 rounded-[10px] bg-[#FBE9A0] border-[1.5px] border-[#14183A] flex items-center gap-2.5 text-xs">
              <ShieldCheck size={18} className="text-[#2F4BDB] shrink-0" strokeWidth={2} />
              <span className="text-[#14183A] font-body leading-snug">
                Inspected, padded with 100% recycled paper cushion, and dispatched in 24 hours.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

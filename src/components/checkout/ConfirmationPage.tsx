/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check, ArrowRight, Package, Calendar, MapPin } from 'lucide-react';
import { useView } from '../../context/ViewContext';
import { formatPrice } from '../../utils/format';
import { Button } from '../ui/Button';

export function ConfirmationPage() {
  const { orderConfirmation, navigateTo } = useView();

  const fallbackOrder = {
    orderId: 'MM-78401',
    customerName: 'Clara S.',
    email: 'clara@example.com',
    shippingAddress: '402 St-Laurent Blvd, Suite 3B',
    city: 'Montreal',
    postalCode: 'H2Y 2Y7',
    country: 'Canada',
    subtotal: 68,
    discount: 6.8,
    shipping: 0,
    total: 61.2,
    items: [
      {
        id: 'tuesday-mug',
        name: 'The Tuesday Mug',
        price: 34,
        quantity: 1,
        variant: 'buttercup',
      },
      {
        id: 'pocket-pal-notebook',
        name: 'Pocket Pal Notebook',
        price: 14,
        quantity: 1,
        variant: 'blue',
      },
      {
        id: 'squash-scissors',
        name: 'Squash Scissors',
        price: 20,
        quantity: 1,
        variant: 'blue',
      },
    ],
    createdAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };

  const order = orderConfirmation || fallbackOrder;

  return (
    <div className="bg-[#FBF6E9] min-h-screen py-12 sm:py-20 border-b-[1.5px] border-[#14183A]">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6">
        {/* Main Yellow Block */}
        <div className="bg-[#F6CD3B] border-[1.5px] border-[#14183A] rounded-[20px] p-6 sm:p-10 shadow-hard-lg space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[1.5px] border-[#14183A] pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-[1.5px] border-[#14183A] bg-[#2F4BDB] text-white flex items-center justify-center shrink-0">
                <Check size={24} strokeWidth={3} />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#14183A]/70 font-semibold">
                  Order Confirmed
                </span>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#14183A]">
                  Thank you, {order.customerName.split(' ')[0]}!
                </h1>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="font-mono text-xs text-[#14183A]/70 block">Order Number</span>
              <span className="font-mono font-bold text-lg text-[#14183A]">{order.orderId}</span>
            </div>
          </div>

          {/* Friendly Note */}
          <p className="font-body text-base text-[#14183A] leading-relaxed">
            We’ve received your order and our Montreal packhouse is already gathering your objects. A confirmation dispatch note will be sent to <span className="font-mono font-semibold underline">{order.email}</span> once packed.
          </p>

          {/* Summary Box */}
          <div className="bg-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[12px] p-5 space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#14183A] font-bold border-b-[1.5px] border-[#14183A]/15 pb-2">
              Dispatch Details & Items
            </h2>

            {/* Destination Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#14183A]/80">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#2F4BDB] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#14183A]">Shipping Destination:</div>
                  <div>{order.shippingAddress}</div>
                  <div>
                    {order.city}, {order.postalCode}
                  </div>
                  <div>{order.country}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar size={14} className="text-[#2F4BDB] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#14183A]">Estimated Arrival:</div>
                  <div>3–5 business days</div>
                  <div className="text-[#14183A]/60">Carbon-neutral courier</div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="pt-2 border-t-[1.5px] border-[#14183A]/15 divide-y divide-[#14183A]/10">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-display font-bold text-[#14183A]">{item.name}</span>
                    {item.variant && (
                      <span className="font-mono text-[11px] text-[#14183A]/60 ml-2 capitalize">
                        ({item.variant})
                      </span>
                    )}
                    <div className="font-mono text-[11px] text-[#14183A]/70">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-sm text-[#14183A]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Line */}
            <div className="pt-3 border-t-[1.5px] border-[#14183A]/20 flex items-baseline justify-between font-mono text-sm">
              <span className="font-bold text-[#14183A]">Amount Paid</span>
              <span className="font-bold text-lg text-[#14183A]">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 text-center sm:text-left">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigateTo('shop')}
              iconRight={<ArrowRight size={16} strokeWidth={2} />}
            >
              Continue shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

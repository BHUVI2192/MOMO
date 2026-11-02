/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = email.trim();
    if (!clean || !clean.includes('@') || !clean.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setEmail('');
  };

  return (
    <section id="newsletter" className="bg-[#F6CD3B] border-b-[1.5px] border-[#14183A] py-16 sm:py-20 text-[#14183A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#14183A]/80 font-semibold">
            MOMO Dispatch
          </span>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#14183A]">
            Get first dibs on drops.
          </h2>

          <p className="font-body text-base text-[#14183A]/90">
            One email a month, promise. No spam, no daily countdowns, just announcements when kilns are unloaded and new objects are boxed.
          </p>

          {status === 'success' ? (
            <div className="p-4 rounded-[12px] border-[1.5px] border-[#14183A] bg-[#FBF6E9] inline-flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-full bg-[#2F4BDB] text-white flex items-center justify-center shrink-0">
                <Check size={16} strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-[#14183A]">
                  You're in the inner circle!
                </p>
                <p className="font-mono text-xs text-[#14183A]/70">
                  Use code <span className="font-bold underline text-[#2F4BDB]">MOMO10</span> for 10% off your next order.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pt-2 max-w-md mx-auto">
              <div className="flex items-center border-b-[2px] border-[#14183A] pb-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent text-base font-body text-[#14183A] placeholder-[#14183A]/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-[8px] border-[1.5px] border-[#14183A] bg-[#14183A] text-[#FBF6E9] font-medium text-sm hover:bg-[#2F4BDB] transition-colors cursor-pointer shrink-0 ml-2 shadow-hard-sm"
                >
                  Join
                </button>
              </div>

              {status === 'error' && (
                <div className="mt-2 text-left font-mono text-xs text-[#14183A] p-2 bg-[#FBDDE8] border-[1.5px] border-[#14183A] rounded-[6px]">
                  {errorMessage}
                </div>
              )}

              <p className="font-mono text-[11px] text-[#14183A]/60 text-left mt-3">
                Unsubscribe anytime with 1-click. We respect quiet inboxes.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

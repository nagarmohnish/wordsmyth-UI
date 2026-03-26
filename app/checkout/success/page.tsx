"use client";

import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4 font-[family-name:var(--font-heading)]">Thank You!</h1>
      <p className="text-[var(--color-text-light)] mb-6">Your payment was successful. Welcome to Wordsmyth Premium!</p>

      <div className="bg-[var(--color-bg-warm)] rounded-2xl p-6 mb-8 text-left">
        <h2 className="font-bold text-[var(--color-primary)] mb-3">Your eBook Coupon Code</h2>
        <div className="bg-white rounded-lg p-4 flex items-center justify-between border border-[var(--color-secondary)]/30">
          <code className="text-lg font-mono font-bold text-[var(--color-primary)]">WORDSMYTH-SUBSCRIBER-2026</code>
          <button className="px-3 py-1.5 text-xs bg-[var(--color-primary)] text-white rounded-lg">Copy</button>
        </div>
        <p className="text-sm text-[var(--color-text-light)] mt-3">Use this code at the Wordsmyth Shop to download all 14 eBooks for free.</p>
      </div>

      <div className="bg-[var(--color-bg-light)] rounded-2xl p-6 mb-8">
        <h2 className="font-bold text-[var(--color-primary)] mb-3">Share Your Support</h2>
        <div className="flex justify-center gap-3">
          <button className="px-4 py-2 bg-[#1DA1F2] text-white text-sm rounded-lg">Share on Twitter</button>
          <button className="px-4 py-2 bg-[#4267B2] text-white text-sm rounded-lg">Share on Facebook</button>
          <button className="px-4 py-2 bg-[var(--color-primary)] text-white text-sm rounded-lg">Email a Friend</button>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/" className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium">Go to Homepage</Link>
        <Link href="/account" className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-primary)] rounded-lg font-medium">My Account</Link>
      </div>
    </div>
  );
}

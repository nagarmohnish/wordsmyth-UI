"use client";

import { useState } from "react";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import SupportCTA from "@/components/SupportCTA";

interface MockCartItem {
  id: string;
  title: string;
  price: number;
  qty: number;
}

const mockCart: MockCartItem[] = [
  { id: "wild-print", title: "WILD Dictionary — Print Edition", price: 19.95, qty: 1 },
  { id: "picture-animals", title: "Picture Dictionary: Animals", price: 3.99, qty: 1 },
];

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subtotal = mockCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <li>
            <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/shop" className="hover:text-[var(--color-primary)] transition-colors">
              Shop
            </Link>
          </li>
          <li>/</li>
          <li className="text-[var(--color-text)] font-medium">Checkout</li>
        </ol>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-light)] text-white py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Checkout</h1>
          <p className="text-blue-100">Complete your purchase securely.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        {submitted ? (
          /* Success State */
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-20 h-20 bg-[var(--color-accent)]/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3 font-[family-name:var(--font-heading)]">
              Order Confirmed!
            </h2>
            <p className="text-[var(--color-text-light)] mb-6">
              Thank you, {name}! A confirmation email has been sent to {email}. Your items will be available shortly.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/shop"
                className="px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-light)] transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold rounded-lg hover:bg-[var(--color-primary)]/5 transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="grid md:grid-cols-[1fr_380px] gap-8">
            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Info */}
                <div className="bg-white border-2 border-[var(--color-border)] rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-[var(--color-primary)] mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-2.5 border-2 border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-2.5 border-2 border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Placeholder */}
                <div className="bg-white border-2 border-[var(--color-border)] rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-[var(--color-primary)] mb-4">Payment Method</h2>
                  <div className="bg-[var(--color-bg-light)] border-2 border-dashed border-[var(--color-border)] rounded-xl p-8 text-center">
                    <div className="w-12 h-12 bg-[var(--color-secondary)]/15 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-[var(--color-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text)]">PaymentSelector Component</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      Stripe / PayPal integration will be added here.
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[var(--color-accent)] text-white text-lg font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md"
                >
                  Complete Purchase &mdash; ${total.toFixed(2)}
                </button>

                <p className="text-xs text-center text-[var(--color-text-muted)]">
                  By completing your purchase you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-[var(--color-primary)]">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="underline hover:text-[var(--color-primary)]">Privacy Policy</Link>.
                </p>
              </form>
            </div>

            {/* Order Summary */}
            <aside className="md:sticky md:top-4 h-fit">
              <div className="bg-white border-2 border-[var(--color-border)] rounded-2xl p-6">
                <h3 className="font-bold text-lg text-[var(--color-primary)] mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {mockCart.map((item) => (
                    <div key={item.id} className="flex justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text)]">{item.title}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">Qty: {item.qty}</p>
                      </div>
                      <span className="text-sm font-medium text-[var(--color-text)] shrink-0">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[var(--color-text-light)]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-text-light)]">
                    <span>Estimated Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[var(--color-primary)] pt-2 border-t-2 border-[var(--color-border)]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Subscription upsell */}
                <div className="mt-5 bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20 rounded-lg p-4">
                  <p className="text-xs font-semibold text-[var(--color-accent)] mb-1">Save with a subscription!</p>
                  <p className="text-xs text-[var(--color-text-light)]">
                    Get all 14 eBooks free + go ads-free for just $20/year.
                  </p>
                  <Link
                    href="/subscribe"
                    className="inline-block mt-2 text-xs font-semibold text-[var(--color-accent)] hover:underline"
                  >
                    Learn More &rarr;
                  </Link>
                </div>
              </div>

              <div className="mt-4">
                <SupportCTA size="inline" />
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}

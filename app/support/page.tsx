"use client";

import { useState } from "react";
import Link from "next/link";

type FrequencyTab = "one-time" | "monthly";

const oneTimeAmounts = [
  { value: 5, impact: "Keeps the dictionary free for 10 students for a month" },
  { value: 10, impact: "Helps us add new illustrations and animations" },
  { value: 25, impact: "Supports Spanish & Chinese translation development" },
  { value: 50, impact: "Funds a full month of server costs" },
];

const monthlyAmounts = [
  { value: 3, impact: "Steady support that helps us plan ahead" },
  { value: 5, impact: "Keeps the dictionary free for 50 students monthly" },
  { value: 10, impact: "Helps fund ongoing translation and content work" },
];

const testimonials = [
  {
    quote: "Wordsmyth has been my go-to classroom resource for over a decade. My students love the illustrations and the activities keep them engaged with new vocabulary every week.",
    name: "Mrs. Rodriguez",
    role: "3rd Grade Teacher, Austin TX",
    color: "var(--color-primary)",
  },
  {
    quote: "As a homeschool parent, finding free quality resources is so important. Wordsmyth is one of the few sites I trust completely for age-appropriate definitions and examples.",
    name: "David K.",
    role: "Homeschool Parent",
    color: "var(--color-secondary)",
  },
  {
    quote: "I use Wordsmyth every day for my homework. The Word Explorer helps me understand big words, and the games make learning fun instead of boring!",
    name: "Amara, age 11",
    role: "Student",
    color: "var(--color-accent)",
  },
];

const paymentLogos = [
  { name: "Visa", bg: "#1a1f71" },
  { name: "Mastercard", bg: "#eb001b" },
  { name: "PayPal", bg: "#003087" },
  { name: "Apple Pay", bg: "#333333" },
];

export default function SupportPage() {
  const [frequency, setFrequency] = useState<FrequencyTab>("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const amounts = frequency === "one-time" ? oneTimeAmounts : monthlyAmounts;
  const displayAmount = isCustom ? (Number(customAmount) || 0) : (selectedAmount || 0);

  const handleAmountSelect = (value: number) => {
    setSelectedAmount(value);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomFocus = () => {
    setIsCustom(true);
    setSelectedAmount(null);
  };

  const handleFrequencyChange = (tab: FrequencyTab) => {
    setFrequency(tab);
    setIsCustom(false);
    setCustomAmount("");
    setSelectedAmount(tab === "one-time" ? 25 : 5);
  };

  const selectedImpact = isCustom
    ? "Every dollar makes a difference for students around the world"
    : amounts.find((a) => a.value === selectedAmount)?.impact || "";

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-support)] to-[#c2185b] text-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <nav className="text-sm mb-6 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Support</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-heading)]">
            Support Free Education for Every Child
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Wordsmyth has been a free educational resource since 1998. Your support helps us keep it that way.
          </p>
        </div>
      </section>

      {/* Contribution Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Amount Selection - takes 3 cols */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 font-[family-name:var(--font-heading)]">
              Choose Your Contribution
            </h2>

            {/* Frequency Toggle */}
            <div className="inline-flex bg-[var(--color-bg-light)] rounded-xl p-1 mb-8">
              {(["one-time", "monthly"] as FrequencyTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleFrequencyChange(tab)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    frequency === tab
                      ? "bg-white text-[var(--color-primary)] shadow-sm"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {tab === "one-time" ? "One-time" : "Monthly"}
                </button>
              ))}
            </div>

            {/* Amount Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {amounts.map((a) => (
                <button
                  key={a.value}
                  onClick={() => handleAmountSelect(a.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedAmount === a.value && !isCustom
                      ? "border-[var(--color-support)] bg-[var(--color-support-light)] shadow-sm"
                      : "border-[var(--color-border)] bg-white hover:border-[var(--color-support)]/50"
                  }`}
                >
                  <p className="text-xl font-bold text-[var(--color-primary)]">
                    ${a.value}{frequency === "monthly" ? <span className="text-sm font-normal text-[var(--color-text-muted)]">/mo</span> : ""}
                  </p>
                  <p className="text-xs text-[var(--color-text-light)] mt-1">{a.impact}</p>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div
              className={`p-4 rounded-xl border-2 transition-all ${
                isCustom
                  ? "border-[var(--color-support)] bg-[var(--color-support-light)]"
                  : "border-[var(--color-border)] bg-white"
              }`}
            >
              <label className="text-sm font-semibold text-[var(--color-text)] block mb-2">
                Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] font-semibold">$</span>
                <input
                  type="number"
                  min="1"
                  value={customAmount}
                  onFocus={handleCustomFocus}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setIsCustom(true);
                    setSelectedAmount(null);
                  }}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-2.5 border-2 border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-support)] transition-colors"
                />
              </div>
              {frequency === "monthly" && isCustom && (
                <p className="text-xs text-[var(--color-text-muted)] mt-1">per month</p>
              )}
            </div>

            {/* Impact Message */}
            {selectedImpact && (
              <div className="mt-6 bg-[var(--color-bg-warm)] rounded-xl p-4 border border-[var(--color-secondary)]/20">
                <p className="text-sm text-[var(--color-text)]">
                  <span className="font-semibold text-[var(--color-support)]">Your impact:</span>{" "}
                  {selectedImpact}
                </p>
              </div>
            )}
          </div>

          {/* Payment Summary - takes 2 cols */}
          <div className="md:col-span-2">
            <div className="bg-white border-2 border-[var(--color-border)] rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4 font-[family-name:var(--font-heading)]">
                Your Contribution
              </h3>

              <div className="text-center py-6 border-b border-[var(--color-border)]">
                <p className="text-4xl font-bold text-[var(--color-support)]">
                  ${displayAmount > 0 ? displayAmount : "0"}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  {frequency === "one-time" ? "One-time contribution" : "Per month"}
                </p>
              </div>

              {/* Placeholder Payment Area */}
              <div className="mt-6">
                <button
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    displayAmount > 0
                      ? "bg-[var(--color-support)] text-white hover:opacity-90 shadow-md"
                      : "bg-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed"
                  }`}
                  disabled={displayAmount <= 0}
                >
                  Contribute ${displayAmount > 0 ? displayAmount : "..."}{frequency === "monthly" ? "/mo" : ""}
                </button>

                <div className="mt-4 p-3 bg-[var(--color-bg-light)] rounded-lg border border-[var(--color-border)]">
                  <p className="text-[10px] text-[var(--color-text-muted)] text-center mb-2 uppercase tracking-wider font-semibold">
                    Payment processing by
                  </p>
                  <div className="flex justify-center gap-2">
                    {paymentLogos.map((logo) => (
                      <div
                        key={logo.name}
                        className="w-12 h-7 rounded flex items-center justify-center text-white text-[8px] font-bold"
                        style={{ backgroundColor: logo.bg }}
                      >
                        {logo.name}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-[var(--color-text-muted)] text-center mt-2">
                    Secure payment via Stripe / PayPal
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-[var(--color-text-muted)] text-center mt-4 leading-relaxed">
                Your contribution is not tax-deductible. Wordsmyth is an educational service, not a registered nonprofit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-[var(--color-bg-light)] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] text-center mb-10 font-[family-name:var(--font-heading)]">
            Your Support Makes a Difference
          </h2>
          <div className="grid grid-cols-3 gap-6 text-center mb-12">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[var(--color-support)]">50,000+</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">Students daily</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)]">4,000+</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">Words in WILD</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[var(--color-accent)]">120+</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">Countries served</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-[var(--color-border)]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold mb-4" style={{ backgroundColor: t.color }}>
                  {t.name.charAt(0)}
                </div>
                <p className="text-sm text-[var(--color-text)] leading-relaxed italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-primary)]">{t.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thank You Preview */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-[var(--color-support-light)] rounded-2xl p-6 md:p-8 text-center border border-[var(--color-support)]/20">
          <div className="text-3xl mb-3">&#10084;&#65039;</div>
          <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2 font-[family-name:var(--font-heading)]">
            After You Contribute
          </h3>
          <p className="text-sm text-[var(--color-text-light)] max-w-lg mx-auto">
            You&apos;ll receive a confirmation email with a thank-you message from the Wordsmyth team. You&apos;ll also get the option to share your support on social media and inspire others to help keep education free.
          </p>
        </div>
      </section>
    </div>
  );
}

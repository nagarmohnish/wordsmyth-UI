"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

type PaymentMethod = "card" | "bank" | null;

const expressOptions = [
  { name: "Apple Pay", icon: "\uF8FF" },
  { name: "Google Pay", icon: "G" },
  { name: "PayPal", icon: "P" },
  { name: "Venmo", icon: "V" },
];

export default function SupportCheckoutPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#fafafa" }} />}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const amount = Number(searchParams.get("amount")) || 10;
  const frequency = searchParams.get("frequency") || "one-time";
  const isMonthly = frequency === "monthly";

  const [method, setMethod] = useState<PaymentMethod>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleComplete = () => {
    setProcessing(true);
    // Mock payment processing
    setTimeout(() => {
      const params = new URLSearchParams();
      params.set("amount", String(amount));
      params.set("frequency", frequency);
      params.set("name", cardName || "Supporter");
      params.set("email", email);
      router.push(`/support/success?${params.toString()}`);
    }, 1800);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    color: "#333",
    outline: "none",
    backgroundColor: "#fff",
    transition: "border-color 0.15s",
  };

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      {/* Header bar */}
      <div style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #f0f0f0",
        padding: "16px 20px",
      }}>
        <div style={{
          maxWidth: "480px", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <Link href="/support" style={{ color: "#999", textDecoration: "none", fontSize: "13px" }}>
            &larr; Back
          </Link>
          <span style={{
            fontSize: "13px", fontWeight: "600", color: "#18AD4A",
            fontFamily: "'Poppins', var(--font-wild), sans-serif",
          }}>
            Wordsmyth
          </span>
          <span style={{ fontSize: "11px", color: "#999", display: "flex", alignItems: "center", gap: "4px" }}>
            &#x1F512; Secure
          </span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 20px" }}>
        {/* Amount summary */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontSize: "13px", color: "#999", margin: "0 0 4px 0" }}>
            You&apos;re supporting
          </p>
          <p style={{
            fontSize: "2.2em", fontWeight: "800", color: "#333", margin: "0 0 4px 0",
            fontFamily: "'Poppins', var(--font-wild), sans-serif",
          }}>
            ${amount}{isMonthly ? " / month" : ""}
          </p>
          <p style={{ fontSize: "12px", color: "#18AD4A", margin: 0, fontWeight: "500" }}>
            Helping children discover new words every day
          </p>
        </div>

        {/* Email */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#666", marginBottom: "6px" }}>
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#18AD4A"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
          />
        </div>

        {/* Select payment method */}
        <p style={{
          fontSize: "13px", fontWeight: "600", color: "#333",
          margin: "0 0 14px 0",
        }}>
          Select payment method
        </p>

        {/* Bank transfer option */}
        <button
          onClick={() => setMethod(method === "bank" ? null : "bank")}
          style={{
            width: "100%", padding: "16px", marginBottom: "12px",
            border: `2px solid ${method === "bank" ? "#18AD4A" : "#e0e0e0"}`,
            borderRadius: "10px", backgroundColor: method === "bank" ? "#f0faf0" : "#fff",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "space-between", transition: "all 0.15s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{
              width: "36px", height: "36px", borderRadius: "8px",
              backgroundColor: "#f5f5f5", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "16px", color: "#666",
            }}>
              &#x1F3E6;
            </span>
            <div style={{ textAlign: "left" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#333", display: "block" }}>
                Direct Bank Transfer (ACH)
              </span>
              <span style={{ fontSize: "11px", color: "#18AD4A" }}>
                Best for long-term support
              </span>
            </div>
          </div>
          <span style={{ fontSize: "14px", color: "#999", transform: method === "bank" ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
            &#x25BE;
          </span>
        </button>

        {/* Express checkout */}
        <div style={{ textAlign: "center", margin: "20px 0 14px 0" }}>
          <span style={{ fontSize: "12px", color: "#999" }}>Express checkout</span>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "8px", marginBottom: "20px",
        }}>
          {expressOptions.map((opt) => (
            <button
              key={opt.name}
              style={{
                padding: "12px 8px", borderRadius: "8px",
                border: "1px solid #e0e0e0", backgroundColor: "#fff",
                cursor: "pointer", fontSize: "12px", fontWeight: "600",
                color: "#333", transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#18AD4A"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
            >
              {opt.name}
            </button>
          ))}
        </div>

        {/* Card payment */}
        <button
          onClick={() => setMethod(method === "card" ? null : "card")}
          style={{
            width: "100%", padding: "16px", marginBottom: "4px",
            border: `2px solid ${method === "card" ? "#18AD4A" : "#e0e0e0"}`,
            borderRadius: "10px", backgroundColor: method === "card" ? "#f0faf0" : "#fff",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "space-between", transition: "all 0.15s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{
              width: "36px", height: "36px", borderRadius: "8px",
              backgroundColor: "#f5f5f5", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "16px", color: "#666",
            }}>
              &#x1F4B3;
            </span>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>
              Card payment
            </span>
          </div>
          <span style={{ fontSize: "14px", color: "#999", transform: method === "card" ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
            &#x25BE;
          </span>
        </button>

        {/* Card form (expandable) */}
        {method === "card" && (
          <div style={{
            border: "1px solid #e0e0e0", borderTop: "none",
            borderRadius: "0 0 10px 10px", padding: "16px",
            backgroundColor: "#fff", marginBottom: "4px",
          }}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#666", marginBottom: "4px" }}>
                Name on card
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#18AD4A"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
              />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#666", marginBottom: "4px" }}>
                Card number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#18AD4A"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#666", marginBottom: "4px" }}>
                  Expiry
                </label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#18AD4A"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#666", marginBottom: "4px" }}>
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#18AD4A"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Trust line */}
        <p style={{
          textAlign: "center", fontSize: "11px", color: "#999",
          margin: "20px 0", display: "flex", alignItems: "center",
          justifyContent: "center", gap: "6px",
        }}>
          &#x1F512; Secure payment &bull; Powered by Stripe
        </p>

        {/* Complete payment CTA — sticky at bottom */}
        <div style={{
          position: "sticky", bottom: "0", padding: "16px 0 20px",
          backgroundColor: "#fafafa",
        }}>
          <button
            onClick={handleComplete}
            disabled={processing || amount <= 0}
            style={{
              width: "100%", padding: "16px",
              backgroundColor: processing ? "#C4E4CD" : "#18AD4A",
              color: "#fff", border: "none", borderRadius: "12px",
              fontSize: "15px", fontWeight: "700", cursor: processing ? "default" : "pointer",
              fontFamily: "'Poppins', var(--font-wild), sans-serif",
              transition: "background-color 0.15s",
              boxShadow: "0 4px 16px rgba(24,173,74,0.25)",
            }}
            onMouseEnter={(e) => { if (!processing) e.currentTarget.style.backgroundColor = "#3d9739"; }}
            onMouseLeave={(e) => { if (!processing) e.currentTarget.style.backgroundColor = "#18AD4A"; }}
          >
            {processing
              ? "Processing..."
              : `Complete Payment — $${amount}${isMonthly ? " / month" : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
}

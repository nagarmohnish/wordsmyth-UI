"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SidebarLayout from "@/components/SidebarLayout";

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => router.push("/checkout/success"), 1500);
  };

  return (
    <SidebarLayout variant="we">
      <p style={{ fontSize: "0.8em", color: "#888", marginBottom: "8px" }}>
        <Link href="/" style={{ color: "#004B97" }}>Home</Link> &gt; Checkout
      </p>

      <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 12px 0", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
        Checkout
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: "16px", fontSize: "0.85em" }}>
        {/* Payment Form */}
        <div>
          {/* Payment method selector */}
          <div style={{ marginBottom: "12px" }}>
            <label style={{ marginRight: "12px", cursor: "pointer" }}>
              <input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} style={{ marginRight: "4px" }} />
              <strong>Pay with Card</strong>
            </label>
            <label style={{ cursor: "pointer" }}>
              <input type="radio" name="payment" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} style={{ marginRight: "4px" }} />
              <strong>Pay with PayPal</strong>
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            {paymentMethod === "card" ? (
              <table style={{ borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "3px 8px 3px 0", fontWeight: "bold" }}>Name on Card:</td>
                    <td style={{ padding: "3px 0" }}><input type="text" placeholder="John Doe" style={{ border: "1px solid #ccc", padding: "4px 6px", width: "220px" }} /></td>
                  </tr>
                  <tr>
                    <td style={{ padding: "3px 8px 3px 0", fontWeight: "bold" }}>Card Number:</td>
                    <td style={{ padding: "3px 0" }}><input type="text" placeholder="4242 4242 4242 4242" style={{ border: "1px solid #ccc", padding: "4px 6px", width: "220px" }} /></td>
                  </tr>
                  <tr>
                    <td style={{ padding: "3px 8px 3px 0", fontWeight: "bold" }}>Expiry:</td>
                    <td style={{ padding: "3px 0", display: "flex", gap: "6px" }}>
                      <input type="text" placeholder="MM/YY" style={{ border: "1px solid #ccc", padding: "4px 6px", width: "80px" }} />
                      <span style={{ fontWeight: "bold", padding: "4px 0" }}>CVC:</span>
                      <input type="text" placeholder="123" style={{ border: "1px solid #ccc", padding: "4px 6px", width: "60px" }} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "3px 8px 3px 0", fontWeight: "bold" }}>Email:</td>
                    <td style={{ padding: "3px 0" }}><input type="email" placeholder="you@example.com" style={{ border: "1px solid #ccc", padding: "4px 6px", width: "220px" }} /></td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div style={{ backgroundColor: "#F0F0F0", border: "1px solid #ccc", padding: "16px", textAlign: "center", marginBottom: "8px" }}>
                <p style={{ fontWeight: "bold", color: "#0070ba" }}>PayPal</p>
                <p style={{ fontSize: "0.9em", color: "#666" }}>You will be redirected to PayPal to complete your payment.</p>
              </div>
            )}

            <div style={{ marginTop: "8px", fontSize: "0.8em", color: "#888" }}>
              🔒 Secure payment · Visa, Mastercard, Amex, PayPal accepted
            </div>

            <button
              type="submit"
              disabled={processing}
              style={{ marginTop: "12px", padding: "8px 24px", backgroundColor: "#3d9739", color: "white", border: "none", fontWeight: "bold", cursor: processing ? "default" : "pointer", opacity: processing ? 0.6 : 1 }}
            >
              {processing ? "Processing..." : "Complete Purchase"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ backgroundColor: "#F0F0F0", border: "1px solid #ccc", padding: "10px", alignSelf: "start" }}>
          <h3 style={{ fontWeight: "bold", color: "#004B97", margin: "0 0 6px 0", fontSize: "1em" }}>Order Summary</h3>
          <div style={{ borderBottom: "1px solid #ccc", paddingBottom: "4px", marginBottom: "4px" }}>
            <p>Individual Plan (Annual)</p>
            <p style={{ textAlign: "right" }}>$20.00</p>
          </div>
          <div style={{ borderBottom: "1px solid #ccc", paddingBottom: "4px", marginBottom: "4px", color: "#18AD4A" }}>
            <p>14 eBooks (FREE)</p>
            <p style={{ textAlign: "right" }}>$0.00</p>
          </div>
          <div style={{ fontWeight: "bold" }}>
            <p>Total: <span style={{ color: "#004B97" }}>$20.00</span></p>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

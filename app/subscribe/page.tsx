"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";
import products from "@/data/products.json";

const totalValue = products.reduce((sum, p) => sum + p.price, 0);

const coverColors = [
  "#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6",
  "#1abc9c", "#e67e22", "#2980b9", "#27ae60", "#c0392b",
  "#8e44ad", "#16a085", "#d35400", "#f1c40f",
];

const features = [
  { label: "Basic dictionary access", free: true, individual: true, group: true },
  { label: "WILD Dictionary (K-2)", free: true, individual: true, group: true },
  { label: "Word Explorer (3-8)", free: true, individual: true, group: true },
  { label: "Activities & Games", free: "Limited", individual: true, group: true },
  { label: "Ad-free experience", free: false, individual: true, group: true },
  { label: "Spanish translations", free: false, individual: true, group: true },
  { label: "Chinese translations", free: false, individual: true, group: true },
  { label: "Teacher Tools", free: false, individual: true, group: true },
  { label: "Vocabulary Center (full)", free: false, individual: true, group: true },
  { label: "40% off all kids books & eBooks", free: false, individual: true, group: true },
  { label: "14 eBooks worth $50 — FREE", free: false, individual: true, group: true },
  { label: "Class management", free: false, individual: false, group: true },
  { label: "Student progress tracking", free: false, individual: false, group: true },
  { label: "Custom glossaries", free: false, individual: false, group: true },
  { label: "Bulk pricing available", free: false, individual: false, group: true },
];

function SubscribeContent() {
  const searchParams = useSearchParams();
  const fromAdFree = searchParams.get("utm_source")?.includes("ad-free") || searchParams.get("utm_source")?.includes("remove-ad");
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium">("premium");

  return (
    <SidebarLayout variant="we">
      <p style={{ fontSize: "0.8em", color: "#888", marginBottom: "8px" }}>
        <Link href="/" style={{ color: "#004B97" }}>Home</Link> &gt; Subscribe
      </p>

      <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
        Choose Your Subscription Plan
      </h2>

      {fromAdFree && (
        <div style={{ backgroundColor: "#FFFFC6", border: "1px solid #E0D890", padding: "8px 12px", marginBottom: "12px", fontSize: "0.85em" }}>
          <strong>Great choice!</strong> Subscribe below to enjoy an ad-free experience.
        </div>
      )}

      <p style={{ fontSize: "0.85em", color: "#333", marginBottom: "16px", lineHeight: 1.5 }}>
        Unlock the full Wordsmyth experience with ad-free access, translations, teacher tools, and an incredible book bundle.
      </p>

      {/* Pricing Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px", fontSize: "0.85em" }}>

        {/* Free Plan */}
        <div style={{ border: "1px solid #ccc", padding: "12px", backgroundColor: "#fff" }}>
          <h3 style={{ color: "#004B97", fontWeight: "bold", margin: "0 0 6px 0" }}>Free</h3>
          <p style={{ fontSize: "1.4em", fontWeight: "bold", color: "#004B97", margin: "0 0 4px 0" }}>$0 <span style={{ fontSize: "0.6em", fontWeight: "normal", color: "#888" }}>forever</span></p>
          <ul style={{ listStyle: "none", padding: 0, margin: "8px 0", fontSize: "0.9em" }}>
            <li style={{ padding: "2px 0" }}>✓ Basic dictionary access</li>
            <li style={{ padding: "2px 0" }}>✓ Limited activities</li>
            <li style={{ padding: "2px 0", color: "#888" }}>• Ads shown</li>
          </ul>
          <Link href="/" style={{ display: "block", textAlign: "center", padding: "6px", border: "1px solid #ccc", color: "#666", textDecoration: "none", fontWeight: "bold", fontSize: "0.9em" }}>
            Current Plan
          </Link>
        </div>

        {/* Individual Plan — NEW PRICING */}
        <div style={{ border: "2px solid #18AD4A", padding: "12px", backgroundColor: "#f0f8f0", position: "relative" }}>
          <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#18AD4A", color: "white", fontSize: "0.7em", fontWeight: "bold", padding: "2px 10px" }}>
            BEST VALUE
          </div>
          <h3 style={{ color: "#18AD4A", fontWeight: "bold", margin: "4px 0 6px 0" }}>Individual</h3>

          {/* Price toggle */}
          <div style={{ marginBottom: "6px" }}>
            <label style={{ display: "block", cursor: "pointer", padding: "3px 0", fontSize: "0.9em" }}>
              <input type="radio" name="plan" checked={selectedPlan === "basic"} onChange={() => setSelectedPlan("basic")} style={{ marginRight: "4px" }} />
              <span style={{ textDecoration: "line-through", color: "#888", fontSize: "0.85em" }}>$9.95/yr</span>{" "}
              <strong style={{ color: "#18AD4A" }}>$15/year</strong>
            </label>
            <label style={{ display: "block", cursor: "pointer", padding: "3px 0", fontSize: "0.9em" }}>
              <input type="radio" name="plan" checked={selectedPlan === "premium"} onChange={() => setSelectedPlan("premium")} style={{ marginRight: "4px" }} />
              <span style={{ textDecoration: "line-through", color: "#888", fontSize: "0.85em" }}>$9.95/yr</span>{" "}
              <strong style={{ color: "#18AD4A" }}>$20/year</strong>
              <span style={{ backgroundColor: "#FFEF21", padding: "1px 5px", fontSize: "0.75em", fontWeight: "bold", marginLeft: "4px" }}>+ FREE BOOKS</span>
            </label>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: "8px 0", fontSize: "0.9em" }}>
            <li style={{ padding: "2px 0" }}>✓ Ad-free experience</li>
            <li style={{ padding: "2px 0" }}>✓ Spanish &amp; Chinese translations</li>
            <li style={{ padding: "2px 0" }}>✓ Teacher Tools &amp; Vocab Center</li>
            <li style={{ padding: "2px 0" }}>✓ <strong>40% off all kids books &amp; eBooks</strong></li>
            {selectedPlan === "premium" && (
              <li style={{ padding: "2px 0", color: "#18AD4A", fontWeight: "bold" }}>
                ★ FREE: All 14 eBooks worth ${Math.floor(totalValue)}+
              </li>
            )}
          </ul>
          <Link
            href={`/checkout?plan=individual&tier=${selectedPlan}`}
            style={{
              display: "block", textAlign: "center", padding: "8px",
              backgroundColor: "#18AD4A", color: "white",
              textDecoration: "none", fontWeight: "bold", fontSize: "0.9em",
            }}
          >
            Subscribe — ${selectedPlan === "premium" ? "20" : "15"}/year
          </Link>
        </div>

        {/* Educational Group */}
        <div style={{ border: "1px solid #ccc", padding: "12px", backgroundColor: "#fff" }}>
          <h3 style={{ color: "#004B97", fontWeight: "bold", margin: "0 0 6px 0" }}>Educational Group</h3>
          <p style={{ fontSize: "1.4em", fontWeight: "bold", color: "#004B97", margin: "0 0 4px 0" }}>Contact Us</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "8px 0", fontSize: "0.9em" }}>
            <li style={{ padding: "2px 0" }}>✓ Everything in Individual</li>
            <li style={{ padding: "2px 0" }}>✓ Class management</li>
            <li style={{ padding: "2px 0" }}>✓ Student progress tracking</li>
            <li style={{ padding: "2px 0" }}>✓ Custom glossaries</li>
            <li style={{ padding: "2px 0" }}>✓ Bulk pricing</li>
          </ul>
          <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "6px", backgroundColor: "#004B97", color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "0.9em" }}>
            Contact Sales
          </Link>
        </div>
      </div>

      {/* What's Included */}
      <div style={{ backgroundColor: "#FFFFC6", border: "1px solid #E0D890", padding: "12px", marginBottom: "16px" }}>
        <h3 style={{ color: "#18AD4A", fontWeight: "bold", margin: "0 0 8px 0", fontSize: "1em" }}>
          What&apos;s Included in Your Subscription
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "0.85em" }}>
          <div>
            <p style={{ margin: "3px 0" }}>✓ Ad-free experience across all dictionaries</p>
            <p style={{ margin: "3px 0" }}>✓ Spanish &amp; Chinese translations for every word</p>
            <p style={{ margin: "3px 0" }}>✓ Teacher Tools with class management</p>
            <p style={{ margin: "3px 0" }}>✓ Vocabulary Center with full progress tracking</p>
          </div>
          <div>
            <p style={{ margin: "3px 0", fontWeight: "bold", color: "#18AD4A" }}>✓ 40% off all kids books &amp; eBooks</p>
            <p style={{ margin: "3px 0", fontWeight: "bold", color: "#18AD4A" }}>✓ FREE: All 14 Wordsmyth eBooks (worth ${Math.floor(totalValue)}+)</p>
            <p style={{ margin: "3px 0" }}>✓ Priority support</p>
          </div>
        </div>
      </div>

      {/* Book Bundle Section */}
      <h3 style={{ color: "#18AD4A", fontWeight: "bold", margin: "0 0 8px 0", fontSize: "1em" }}>
        14 Books &amp; eBooks — FREE with $20/year Plan (worth ${Math.floor(totalValue)}+)
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px", marginBottom: "12px" }}>
        {products.map((product, i) => (
          <div key={product.id} style={{ textAlign: "center" }}>
            <div style={{
              height: "60px", backgroundColor: coverColors[i % coverColors.length],
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: "16px", marginBottom: "3px",
            }}>
              📖
            </div>
            <p style={{ fontSize: "0.65em", lineHeight: 1.2, color: "#333", margin: "0 0 1px 0" }}>
              {product.title.split(":")[0].split("—")[0].trim().substring(0, 20)}
            </p>
            <p style={{ fontSize: "0.65em" }}>
              <span style={{ textDecoration: "line-through", color: "#888" }}>${product.price.toFixed(2)}</span>{" "}
              <strong style={{ color: "#18AD4A" }}>FREE</strong>
            </p>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: "#f0f8f0", border: "1px solid #c8e6c9", padding: "8px 12px", marginBottom: "16px", textAlign: "center", fontSize: "0.9em" }}>
        <strong>Total Value: <span style={{ textDecoration: "line-through", color: "#888" }}>${totalValue.toFixed(2)}+</span></strong>{" "}
        <strong style={{ color: "#18AD4A" }}>Included FREE</strong> with your $20/year subscription.
        Plus <strong style={{ color: "#18AD4A" }}>40% off</strong> any additional books!
      </div>

      {/* Coupon Info */}
      <div style={{ backgroundColor: "#F0F0F0", border: "1px solid #ccc", padding: "10px 12px", marginBottom: "16px", fontSize: "0.85em", textAlign: "center" }}>
        <strong>How to get your free eBooks:</strong> After subscribing, you&apos;ll receive a coupon code via email to download all 14 eBooks at no cost.
      </div>

      {/* Feature Comparison Table */}
      <h3 style={{ color: "#18AD4A", fontWeight: "bold", margin: "0 0 8px 0", fontSize: "1em" }}>Feature Comparison</h3>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "0.8em", marginBottom: "16px" }}>
        <thead>
          <tr style={{ backgroundColor: "#C4E4CD" }}>
            <th style={{ border: "1px solid #ccc", padding: "4px 8px", textAlign: "left" }}>Feature</th>
            <th style={{ border: "1px solid #ccc", padding: "4px 8px", textAlign: "center" }}>Free</th>
            <th style={{ border: "1px solid #ccc", padding: "4px 8px", textAlign: "center", backgroundColor: "#87CC8F" }}>Individual</th>
            <th style={{ border: "1px solid #ccc", padding: "4px 8px", textAlign: "center" }}>Group</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={f.label} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#DEEFE7" }}>
              <td style={{ border: "1px solid #ccc", padding: "3px 8px" }}>{f.label}</td>
              <td style={{ border: "1px solid #ccc", padding: "3px 8px", textAlign: "center" }}>
                {f.free === true ? <span style={{ color: "#18AD4A", fontWeight: "bold" }}>✓</span> : f.free === false ? <span style={{ color: "#ccc" }}>—</span> : <span style={{ color: "#f5a623", fontSize: "0.85em" }}>{f.free}</span>}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "3px 8px", textAlign: "center", backgroundColor: i % 2 === 0 ? "#f0f8f0" : "#e0f0e0" }}>
                {f.individual === true ? <span style={{ color: "#18AD4A", fontWeight: "bold" }}>✓</span> : <span style={{ color: "#ccc" }}>—</span>}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "3px 8px", textAlign: "center" }}>
                {f.group === true ? <span style={{ color: "#18AD4A", fontWeight: "bold" }}>✓</span> : <span style={{ color: "#ccc" }}>—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "center" }}>
        <Link
          href="/checkout?plan=individual&tier=premium"
          style={{
            display: "inline-block", padding: "8px 24px",
            backgroundColor: "#18AD4A", color: "white",
            fontWeight: "bold", textDecoration: "none", marginRight: "8px",
          }}
        >
          Subscribe Now — $15-$20/year
        </Link>
        <Link
          href="/contact"
          style={{
            display: "inline-block", padding: "8px 24px",
            backgroundColor: "#004B97", color: "white",
            fontWeight: "bold", textDecoration: "none",
          }}
        >
          Contact Sales for Groups
        </Link>
      </div>
    </SidebarLayout>
  );
}

export default function SubscribePage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>}>
      <SubscribeContent />
    </Suspense>
  );
}

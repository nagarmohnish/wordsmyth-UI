"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DataMenu from "@/components/DataMenu";
import products from "@/data/products.json";

const totalValue = products.reduce((sum, p) => sum + p.price, 0);

const coverColors = [
  "#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6",
  "#1abc9c", "#e67e22", "#2980b9", "#27ae60", "#c0392b",
  "#8e44ad", "#16a085", "#d35400", "#f1c40f",
];

const featureRows = [
  { label: "Comprehensive dictionary lookup", silver: true, gold: true, ent: true },
  { label: "Children's dictionary lookup", silver: true, gold: true, ent: true },
  { label: "Integrated thesaurus", silver: true, gold: true, ent: true },
  { label: "Word Parts (roots & affixes)", silver: true, gold: true, ent: true },
  { label: "Word Combinations", silver: true, gold: true, ent: true },
  { label: "Grammatical Patterns", silver: true, gold: true, ent: true },
  { label: "Spanish support", silver: true, gold: true, ent: true },
  { label: "Chinese support", silver: true, gold: true, ent: true },
  { label: "Personalized entry display", silver: true, gold: true, ent: true },
  { label: "Advanced search functions", silver: true, gold: true, ent: true },
  { label: "Wordsmyth Vocabulary Inventory", silver: true, gold: true, ent: true },
  { label: "Unlimited user-made wordlists", silver: true, gold: true, ent: true },
  { label: "Vocabulary activities", silver: true, gold: true, ent: true },
  { label: "Text Analysis", silver: true, gold: true, ent: true },
  { label: "Ad free", silver: true, gold: true, ent: true },
  { label: "40% off kids books & eBooks", silver: false, gold: true, ent: true },
  { label: "14 eBooks worth $50+ — FREE", silver: false, gold: true, ent: true },
  { label: "Unique URL for school/class", silver: false, gold: false, ent: true },
  { label: "Class and student management", silver: false, gold: false, ent: true },
  { label: "Vocabulary lessons & assignments", silver: false, gold: false, ent: true },
  { label: "Report on students' vocabulary growth", silver: false, gold: false, ent: true },
];

function SubscribeContent() {
  const searchParams = useSearchParams();
  const fromAdFree = searchParams.get("utm_source")?.includes("ad-free") || searchParams.get("utm_source")?.includes("remove-ad");

  return (
    <div>
      <DataMenu activeDict="we" />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "30px 16px 50px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h1 style={{
            fontSize: "2em", fontWeight: "800", color: "#1a1a2e",
            margin: "0 0 8px 0", letterSpacing: "-0.5px",
            fontFamily: "'Poppins', var(--font-wild), sans-serif",
          }}>
            Choose Your Plan
          </h1>
          <p style={{ fontSize: "1.05em", color: "#666", margin: 0, maxWidth: "500px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            Unlock the full power of Wordsmyth. Pick the plan that fits your needs.
          </p>
          {fromAdFree && (
            <div style={{
              display: "inline-block", marginTop: "12px", padding: "8px 20px",
              backgroundColor: "#e8f5e9", border: "1px solid #a5d6a7",
              borderRadius: "8px", fontSize: "0.9em", color: "#2e7d32",
            }}>
              Subscribe below to enjoy an ad-free experience.
            </div>
          )}
        </div>

        {/* ── Pricing Cards ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px",
          alignItems: "start", marginBottom: "40px",
        }}>

          {/* ── SILVER — $9.95/year ── */}
          <div style={{
            border: "1px solid #e0e0e0", borderRadius: "16px", padding: "28px 24px",
            backgroundColor: "#fff", position: "relative",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}>
            {/* Tier badge */}
            <div style={{
              display: "inline-block", padding: "3px 14px", borderRadius: "20px",
              backgroundColor: "#f5f5f5", color: "#888", fontSize: "0.7em",
              fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase",
              marginBottom: "14px",
            }}>
              Silver
            </div>

            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontSize: "2.4em", fontWeight: "800", color: "#1a1a2e" }}>$9.95</span>
              <span style={{ fontSize: "0.95em", color: "#999", marginLeft: "4px" }}>/year</span>
            </div>

            <Link
              href="/checkout?plan=silver"
              style={{
                display: "block", textAlign: "center", padding: "12px",
                backgroundColor: "#1a1a2e", color: "white",
                textDecoration: "none", fontWeight: "700", fontSize: "0.95em",
                borderRadius: "10px", transition: "opacity 0.15s",
              }}
            >
              Get Silver
            </Link>

            <div style={{ marginTop: "24px", borderTop: "1px solid #f0f0f0", paddingTop: "20px" }}>
              <p style={{ fontWeight: "700", color: "#1a1a2e", margin: "0 0 10px 0", fontSize: "0.85em", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                What&apos;s included
              </p>

              <p style={{ color: "#004B97", fontWeight: "700", margin: "10px 0 4px 0", fontSize: "0.9em" }}>
                Enhanced Dictionary
              </p>
              <ul style={{ paddingLeft: "16px", margin: "0 0 8px 0", fontSize: "0.88em", color: "#444", lineHeight: 1.8 }}>
                <li>Word Parts (roots &amp; affixes)</li>
                <li>Word Combinations</li>
                <li>Grammatical Patterns</li>
                <li>Spanish support</li>
                <li>Chinese support</li>
                <li>Personalized entry display</li>
                <li>Advanced search functions</li>
              </ul>

              <p style={{ color: "#004B97", fontWeight: "700", margin: "10px 0 4px 0", fontSize: "0.9em" }}>
                Full Vocabulary Center
              </p>
              <ul style={{ paddingLeft: "16px", margin: "0 0 8px 0", fontSize: "0.88em", color: "#444", lineHeight: 1.8 }}>
                <li>Wordsmyth Vocabulary Inventory</li>
                <li>Unlimited user-made wordlists</li>
                <li>Unlimited sharing</li>
                <li>Vocabulary activities</li>
                <li>Text Analysis</li>
              </ul>

              <div style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "6px 0", fontSize: "0.9em", fontWeight: "600", color: "#1a1a2e",
              }}>
                <span style={{ color: "#18AD4A" }}>&#10003;</span> Ad-free experience
              </div>
            </div>
          </div>

          {/* ── GOLD — $15/year ── */}
          <div style={{
            border: "2px solid #18AD4A", borderRadius: "16px", padding: "28px 24px",
            backgroundColor: "#fff", position: "relative",
            boxShadow: "0 8px 30px rgba(24,173,74,0.12)",
            transform: "scale(1.03)",
          }}>
            {/* Popular badge */}
            <div style={{
              position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
              padding: "5px 18px", borderRadius: "20px",
              backgroundColor: "#18AD4A", color: "white", fontSize: "0.7em",
              fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              Most Popular
            </div>

            {/* Tier badge */}
            <div style={{
              display: "inline-block", padding: "3px 14px", borderRadius: "20px",
              backgroundColor: "#e8f5e9", color: "#18AD4A", fontSize: "0.7em",
              fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase",
              marginBottom: "14px",
            }}>
              Gold
            </div>

            <div style={{ marginBottom: "4px" }}>
              <span style={{ fontSize: "2.4em", fontWeight: "800", color: "#18AD4A" }}>$15</span>
              <span style={{ fontSize: "0.95em", color: "#999", marginLeft: "4px" }}>/year</span>
            </div>
            <p style={{ fontSize: "0.8em", color: "#666", margin: "0 0 16px 0" }}>
              Everything in Silver + Book Bundle
            </p>

            <Link
              href="/checkout?plan=gold"
              style={{
                display: "block", textAlign: "center", padding: "12px",
                backgroundColor: "#18AD4A", color: "white",
                textDecoration: "none", fontWeight: "700", fontSize: "0.95em",
                borderRadius: "10px",
              }}
            >
              Get Gold
            </Link>

            <div style={{ marginTop: "24px", borderTop: "1px solid #e8f5e9", paddingTop: "20px" }}>
              <p style={{ fontWeight: "700", color: "#1a1a2e", margin: "0 0 10px 0", fontSize: "0.85em", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Everything in Silver, plus
              </p>

              <div style={{
                backgroundColor: "#f0faf0", borderRadius: "10px",
                padding: "14px", marginBottom: "14px",
              }}>
                <p style={{ color: "#18AD4A", fontWeight: "700", margin: "0 0 6px 0", fontSize: "0.95em" }}>
                  Book Bundle
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.88em", color: "#333", marginBottom: "4px" }}>
                  <span style={{ color: "#18AD4A" }}>&#10003;</span>
                  <strong>40% off</strong> all kids books &amp; eBooks
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.88em", color: "#333" }}>
                  <span style={{ color: "#18AD4A" }}>&#10003;</span>
                  <strong>14 eBooks FREE</strong> (worth ${Math.floor(totalValue)}+)
                </div>
              </div>

              {/* Book list */}
              <p style={{ fontWeight: "700", color: "#1a1a2e", margin: "0 0 8px 0", fontSize: "0.82em", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                14 eBooks included
              </p>
              <div style={{ maxHeight: "320px", overflowY: "auto", paddingRight: "4px" }}>
                {products.map((product, i) => (
                  <div
                    key={product.id}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "6px 0",
                      borderBottom: i < products.length - 1 ? "1px solid #f0f0f0" : "none",
                    }}
                  >
                    <div style={{
                      width: "22px", height: "30px", flexShrink: 0,
                      borderRadius: "3px",
                      backgroundColor: coverColors[i % coverColors.length],
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontSize: "9px",
                    }}>
                      📖
                    </div>
                    <div style={{ flex: 1, minWidth: 0, fontSize: "0.82em" }}>
                      <div style={{ fontWeight: "600", color: "#333", lineHeight: 1.3 }}>
                        {product.title.split("—")[0].split(" — ")[0].trim()}
                      </div>
                      <div style={{ color: "#999", fontSize: "0.9em" }}>{product.description.substring(0, 50)}...</div>
                    </div>
                    <div style={{ flexShrink: 0, textAlign: "right", fontSize: "0.8em" }}>
                      <span style={{ textDecoration: "line-through", color: "#bbb" }}>${product.price.toFixed(2)}</span>
                      <br />
                      <strong style={{ color: "#18AD4A" }}>FREE</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                backgroundColor: "#e8f5e9", borderRadius: "8px",
                padding: "8px 12px", marginTop: "10px", textAlign: "center",
                fontSize: "0.85em",
              }}>
                Total value: <span style={{ textDecoration: "line-through", color: "#999" }}>${totalValue.toFixed(2)}</span>{" "}
                <strong style={{ color: "#18AD4A" }}>FREE</strong>
              </div>
            </div>
          </div>

          {/* ── ENTERPRISE ── */}
          <div style={{
            border: "1px solid #e0e0e0", borderRadius: "16px", padding: "28px 24px",
            backgroundColor: "#fff", position: "relative",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}>
            {/* Tier badge */}
            <div style={{
              display: "inline-block", padding: "3px 14px", borderRadius: "20px",
              backgroundColor: "#eee8ff", color: "#5b21b6", fontSize: "0.7em",
              fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase",
              marginBottom: "14px",
            }}>
              Enterprise
            </div>

            <div style={{ marginBottom: "4px" }}>
              <span style={{ fontSize: "2.4em", fontWeight: "800", color: "#1a1a2e" }}>Custom</span>
            </div>
            <p style={{ fontSize: "0.8em", color: "#666", margin: "0 0 16px 0" }}>
              Starting from $20 for 20 users
            </p>

            <Link
              href="/contact"
              style={{
                display: "block", textAlign: "center", padding: "12px",
                backgroundColor: "#fff", color: "#1a1a2e",
                textDecoration: "none", fontWeight: "700", fontSize: "0.95em",
                borderRadius: "10px", border: "2px solid #1a1a2e",
              }}
            >
              Contact Sales
            </Link>

            <div style={{ marginTop: "24px", borderTop: "1px solid #f0f0f0", paddingTop: "20px" }}>
              <p style={{ fontWeight: "700", color: "#1a1a2e", margin: "0 0 10px 0", fontSize: "0.85em", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                What&apos;s included
              </p>

              <div style={{ fontSize: "0.88em", color: "#444", lineHeight: 1.8, marginBottom: "10px" }}>
                <p style={{ margin: "4px 0", fontWeight: "600" }}>Tiered pricing:</p>
                <ul style={{ paddingLeft: "16px", margin: "2px 0 8px 0" }}>
                  <li>21&ndash;50 users: <strong>$1.00</strong>/yr per user</li>
                  <li>51&ndash;400 users: <strong>$0.75</strong>/yr per user</li>
                  <li>401+: <strong>$0.50</strong>/yr per user</li>
                </ul>
              </div>

              <p style={{ color: "#004B97", fontWeight: "700", margin: "10px 0 4px 0", fontSize: "0.9em" }}>
                Everything in Gold, plus
              </p>
              <ul style={{ paddingLeft: "16px", margin: "0 0 8px 0", fontSize: "0.88em", color: "#444", lineHeight: 1.8 }}>
                <li>Unique URL for your school/class</li>
                <li>Class and student management</li>
                <li>Vocabulary lessons &amp; assignments</li>
                <li>Report on students&apos; vocabulary growth</li>
              </ul>

              <p style={{ color: "#004B97", fontWeight: "700", margin: "10px 0 4px 0", fontSize: "0.9em" }}>
                Teacher Tools
              </p>
              <p style={{ margin: "0 0 4px 0", fontSize: "0.88em", color: "#444", lineHeight: 1.6 }}>
                Learning management system fully integrated with Wordsmyth Vocabulary Center.
              </p>

              <p style={{ textAlign: "center", fontSize: "0.85em", margin: "14px 0 0 0" }}>
                <Link href="/contact" style={{ color: "#004B97", fontWeight: "600" }}>Contact us</Link> for school district quotes.
              </p>
            </div>
          </div>
        </div>

        {/* ── Feature comparison table ── */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{
            textAlign: "center", fontSize: "1.4em", fontWeight: "800",
            color: "#1a1a2e", marginBottom: "20px",
            fontFamily: "'Poppins', var(--font-wild), sans-serif",
          }}>
            Compare Plans
          </h2>

          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e0e0e0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.84em" }}>
              <thead>
                <tr style={{ backgroundColor: "#fafafa" }}>
                  <th style={{ padding: "12px 14px", textAlign: "left", fontWeight: "700", color: "#1a1a2e", borderBottom: "2px solid #e0e0e0" }}>Feature</th>
                  <th style={{ padding: "12px 10px", textAlign: "center", fontWeight: "700", color: "#888", borderBottom: "2px solid #e0e0e0", width: "100px" }}>Silver<br /><span style={{ fontWeight: "400", fontSize: "0.85em" }}>$9.95/yr</span></th>
                  <th style={{ padding: "12px 10px", textAlign: "center", fontWeight: "700", color: "#18AD4A", borderBottom: "2px solid #18AD4A", width: "100px", backgroundColor: "#f0faf0" }}>Gold<br /><span style={{ fontWeight: "400", fontSize: "0.85em" }}>$15/yr</span></th>
                  <th style={{ padding: "12px 10px", textAlign: "center", fontWeight: "700", color: "#5b21b6", borderBottom: "2px solid #e0e0e0", width: "100px" }}>Enterprise<br /><span style={{ fontWeight: "400", fontSize: "0.85em" }}>Custom</span></th>
                </tr>
              </thead>
              <tbody>
                {featureRows.map((row, i) => (
                  <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "8px 14px", borderBottom: "1px solid #f0f0f0", color: "#444" }}>{row.label}</td>
                    <td style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                      {row.silver ? <span style={{ color: "#18AD4A", fontSize: "1.2em" }}>&#10003;</span> : <span style={{ color: "#ddd" }}>&mdash;</span>}
                    </td>
                    <td style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0", backgroundColor: i % 2 === 0 ? "#f8fdf8" : "#f0faf0" }}>
                      {row.gold ? <span style={{ color: "#18AD4A", fontSize: "1.2em" }}>&#10003;</span> : <span style={{ color: "#ddd" }}>&mdash;</span>}
                    </td>
                    <td style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                      {row.ent ? <span style={{ color: "#18AD4A", fontSize: "1.2em" }}>&#10003;</span> : <span style={{ color: "#ddd" }}>&mdash;</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>}>
      <SubscribeContent />
    </Suspense>
  );
}

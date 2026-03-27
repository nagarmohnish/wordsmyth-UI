"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DataMenu from "@/components/DataMenu";
import products from "@/data/products.json";

const totalValue = products.reduce((sum, p) => sum + p.price, 0);

const featureRows: { label: string; unreg: boolean; free: boolean; individual: boolean; group: boolean; explanation?: string }[] = [
  { label: "Comprehensive dictionary lookup", unreg: true, free: true, individual: true, group: true },
  { label: "Children's dictionary lookup", unreg: true, free: true, individual: true, group: true },
  { label: "Integrated thesaurus", unreg: true, free: true, individual: true, group: true },
  { label: "Widget for browser toolbar", unreg: true, free: true, individual: true, group: true },
  { label: "Word Parts (roots & affixes)", unreg: false, free: false, individual: true, group: true },
  { label: "Word Combinations", unreg: false, free: false, individual: true, group: true },
  { label: "Grammatical Patterns", unreg: false, free: false, individual: true, group: true },
  { label: "Spanish support", unreg: false, free: false, individual: true, group: true },
  { label: "Chinese support", unreg: false, free: false, individual: true, group: true },
  { label: "Personalized entry display", unreg: false, free: false, individual: true, group: true },
  { label: "Advanced search functions", unreg: false, free: false, individual: true, group: true },
  { label: "Wordsmyth Vocabulary Inventory", unreg: false, free: false, individual: true, group: true },
  { label: "Unlimited user-made wordlists", unreg: false, free: false, individual: true, group: true },
  { label: "Vocabulary activities", unreg: false, free: false, individual: true, group: true },
  { label: "Text Analysis", unreg: false, free: false, individual: true, group: true },
  { label: "Ad free", unreg: false, free: false, individual: true, group: true },
  { label: "40% off kids books & eBooks", unreg: false, free: false, individual: true, group: true },
  { label: "14 eBooks worth $50 — FREE", unreg: false, free: false, individual: true, group: true },
  { label: "Unique URL for school/class", unreg: false, free: false, individual: false, group: true },
  { label: "Class and student management", unreg: false, free: false, individual: false, group: true },
  { label: "Vocabulary lessons & assignments", unreg: false, free: false, individual: false, group: true },
  { label: "Reports on students' vocabulary growth", unreg: false, free: false, individual: false, group: true },
];

function SubscribeContent() {
  const searchParams = useSearchParams();
  const fromAdFree = searchParams.get("utm_source")?.includes("ad-free") || searchParams.get("utm_source")?.includes("remove-ad");

  return (
    <div>
      <DataMenu activeDict="we" />

      <div className="max-w-[960px] mx-auto px-4 py-4">
        {fromAdFree && (
          <div style={{ backgroundColor: "#FFFFC6", border: "1px solid #E0D890", padding: "8px 12px", marginBottom: "12px", fontSize: "0.85em" }}>
            <strong>Great choice!</strong> Subscribe below to enjoy an ad-free experience.
          </div>
        )}

        {/* Three-column pricing layout matching original */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85em", marginBottom: "20px" }}>
          <tbody>
            <tr>
              {/* Free Registration */}
              <td style={{ width: "33%", verticalAlign: "top", padding: "12px 16px", borderRight: "1px solid #ccc" }}>
                <h2 style={{ color: "#8B0000", fontSize: "1.2em", fontWeight: "bold", textAlign: "center", margin: "0 0 4px 0" }}>
                  Free Registration
                </h2>

                <div style={{ textAlign: "center", margin: "20px 0" }}>
                  <Link
                    href="/signup"
                    style={{
                      display: "inline-block", padding: "8px 20px",
                      border: "2px solid #888", color: "#333",
                      textDecoration: "none", fontWeight: "bold", fontSize: "1em",
                    }}
                  >
                    Register. It&apos;s free
                  </Link>
                </div>

                <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: "10px 0", lineHeight: 1.8 }}>
                  <li>Basic dictionary features</li>
                  <li>Basic search tools</li>
                  <li>Limited access to Vocabulary Center</li>
                  <li>Limited number of saved records</li>
                  <li>Free 15 day trial to full subscription feature</li>
                </ul>
              </td>

              {/* Individual Subscription */}
              <td style={{ width: "34%", verticalAlign: "top", padding: "12px 16px", borderRight: "1px solid #ccc" }}>
                <h2 style={{ color: "#8B0000", fontSize: "1.2em", fontWeight: "bold", textAlign: "center", margin: "0 0 4px 0" }}>
                  Individual Subscription
                </h2>
                <p style={{ textAlign: "center", margin: "0 0 4px 0" }}>
                  <span style={{ textDecoration: "line-through", color: "#888" }}>$9.95/year</span>
                </p>
                <p style={{ textAlign: "center", fontSize: "1.3em", fontWeight: "bold", color: "#18AD4A", margin: "0 0 2px 0" }}>
                  $15 – $20/year
                </p>
                <p style={{ textAlign: "center", fontSize: "0.8em", color: "#666", margin: "0 0 8px 0" }}>
                  $20/year includes 14 free eBooks (${Math.floor(totalValue)}+ value)
                </p>

                <div style={{ textAlign: "center", margin: "12px 0" }}>
                  <Link
                    href="/checkout?plan=individual"
                    style={{
                      display: "inline-block", padding: "10px 28px",
                      backgroundColor: "#6B8E23", color: "white",
                      textDecoration: "none", fontWeight: "bold", fontSize: "1em",
                      border: "none", borderRadius: "3px",
                    }}
                  >
                    Subscribe Now
                  </Link>
                </div>

                <p style={{ color: "#004B97", fontWeight: "bold", margin: "12px 0 4px 0" }}>
                  Enhanced dictionary features
                </p>
                <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: "4px 0", lineHeight: 1.7 }}>
                  <li>Word Parts (roots &amp; affixes)</li>
                  <li>Word Combinations</li>
                  <li>Grammatical Patterns</li>
                  <li>Spanish support</li>
                  <li>Chinese support</li>
                  <li>Personalized entry display</li>
                  <li>Advanced search functions</li>
                </ul>

                <p style={{ color: "#004B97", fontWeight: "bold", margin: "12px 0 4px 0" }}>
                  Full Vocabulary Center
                </p>
                <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: "4px 0", lineHeight: 1.7 }}>
                  <li>Wordsmyth Vocabulary Inventory</li>
                  <li>Unlimited user-made wordlists</li>
                  <li>Unlimited sharing</li>
                  <li>Vocabulary activities</li>
                  <li>Text Analysis</li>
                </ul>

                <p style={{ color: "#004B97", fontWeight: "bold", margin: "12px 0 4px 0" }}>
                  Ad free
                </p>

                <p style={{ color: "#18AD4A", fontWeight: "bold", margin: "12px 0 4px 0" }}>
                  Book Bundle (with $20/year plan)
                </p>
                <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: "4px 0", lineHeight: 1.7 }}>
                  <li><strong>40% off</strong> all kids books &amp; eBooks</li>
                  <li><strong>14 eBooks FREE</strong> (worth ${Math.floor(totalValue)}+)</li>
                </ul>
              </td>

              {/* Educational Group Subscription */}
              <td style={{ width: "33%", verticalAlign: "top", padding: "12px 16px" }}>
                <h2 style={{ color: "#8B0000", fontSize: "1.2em", fontWeight: "bold", textAlign: "center", margin: "0 0 4px 0" }}>
                  Educational Group Subscription
                </h2>
                <p style={{ textAlign: "center", fontSize: "0.9em", margin: "4px 0" }}>
                  starting from <strong>$20 for 20 users</strong>
                </p>

                <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: "8px 0", lineHeight: 1.8 }}>
                  <li>Tier 1 (21–50 users): <strong>$1.00/year</strong> per user</li>
                  <li>Tier 2 (51–400 users): <strong>$0.75/year</strong> per user</li>
                  <li>Tier 3 (401 and up): <strong>$0.50/year</strong> per user</li>
                </ul>

                <p style={{ textAlign: "center", fontSize: "0.85em", margin: "8px 0" }}>
                  For school districts, please{" "}
                  <Link href="/contact" style={{ color: "#004B97" }}>contact us</Link>{" "}
                  for a quote.
                </p>

                <div style={{ textAlign: "center", margin: "12px 0" }}>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-block", padding: "10px 28px",
                      backgroundColor: "#6B8E23", color: "white",
                      textDecoration: "none", fontWeight: "bold", fontSize: "1em",
                      border: "none", borderRadius: "3px",
                    }}
                  >
                    Subscribe Now
                  </Link>
                </div>

                <p style={{ color: "#004B97", fontWeight: "bold", margin: "12px 0 4px 0" }}>
                  Unique URL for your school/class
                </p>
                <p style={{ margin: "4px 0", lineHeight: 1.6 }}>
                  All individual subscription features are available for students and teachers, including:
                </p>
                <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: "4px 0", lineHeight: 1.7 }}>
                  <li>Enhanced dictionary features</li>
                  <li>Vocabulary Center</li>
                  <li>Ad free</li>
                </ul>

                <p style={{ color: "#004B97", fontWeight: "bold", margin: "12px 0 4px 0" }}>
                  Teacher Tools
                </p>
                <p style={{ margin: "4px 0", lineHeight: 1.6 }}>
                  Learning management system fully integrated with Wordsmyth Vocabulary Center.
                </p>
                <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: "4px 0", lineHeight: 1.7 }}>
                  <li>Class and student management</li>
                  <li>Vocabulary lessons and assignments</li>
                  <li>Report on students&apos; vocabulary growth</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Feature Comparison Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8em", border: "1px solid #999" }}>
          <thead>
            <tr style={{ backgroundColor: "#e8e8e8" }}>
              <th style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "left", fontWeight: "bold" }}>Feature list</th>
              <th style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "center", fontWeight: "bold" }}>Unregistered<br />user</th>
              <th style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "center", fontWeight: "bold" }}>Free<br />registration</th>
              <th style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "center", fontWeight: "bold", color: "#004B97" }}>Individual<br />subscription</th>
              <th style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "center", fontWeight: "bold" }}>Educational<br />subscription</th>
              <th style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "left", fontWeight: "bold" }}>Feature Explanation</th>
            </tr>
          </thead>
          <tbody>
            {featureRows.map((row, i) => (
              <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f5f5f5" }}>
                <td style={{ border: "1px solid #ccc", padding: "4px 8px" }}>{row.label}</td>
                <td style={{ border: "1px solid #ccc", padding: "4px 8px", textAlign: "center" }}>
                  {row.unreg ? <span style={{ color: "#18AD4A", fontSize: "1.3em" }}>✓</span> : ""}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "4px 8px", textAlign: "center" }}>
                  {row.free ? <span style={{ color: "#18AD4A", fontSize: "1.3em" }}>✓</span> : ""}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "4px 8px", textAlign: "center" }}>
                  {row.individual ? <span style={{ color: "#18AD4A", fontSize: "1.3em" }}>✓</span> : ""}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "4px 8px", textAlign: "center" }}>
                  {row.group ? <span style={{ color: "#18AD4A", fontSize: "1.3em" }}>✓</span> : ""}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "4px 8px", color: "#666", fontSize: "0.9em" }}>
                  {row.explanation || "Click on each feature to see a more detailed explanation."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

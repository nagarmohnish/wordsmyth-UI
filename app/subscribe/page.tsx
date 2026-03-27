"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DataMenu from "@/components/DataMenu";

const featureRows = [
  { label: "Comprehensive dictionary lookup", unreg: true, free: true, ind: true, edu: true },
  { label: "Children's dictionary lookup", unreg: true, free: true, ind: true, edu: true },
  { label: "Integrated thesaurus", unreg: true, free: true, ind: true, edu: true },
  { label: "Widget for browser toolbar", unreg: true, free: true, ind: true, edu: true },
  { label: "Word Parts (roots & affixes)", unreg: false, free: false, ind: true, edu: true },
  { label: "Word Combinations", unreg: false, free: false, ind: true, edu: true },
  { label: "Grammatical Patterns", unreg: false, free: false, ind: true, edu: true },
  { label: "Spanish support", unreg: false, free: false, ind: true, edu: true },
  { label: "Chinese support", unreg: false, free: false, ind: true, edu: true },
  { label: "Personalized entry display", unreg: false, free: false, ind: true, edu: true },
  { label: "Advanced search functions", unreg: false, free: false, ind: true, edu: true },
  { label: "Wordsmyth Vocabulary Inventory", unreg: false, free: false, ind: true, edu: true },
  { label: "Unlimited user-made wordlists", unreg: false, free: false, ind: true, edu: true },
  { label: "Vocabulary activities", unreg: false, free: false, ind: true, edu: true },
  { label: "Text Analysis", unreg: false, free: false, ind: true, edu: true },
  { label: "Ad free", unreg: false, free: false, ind: true, edu: true },
  { label: "40% off kids books & eBooks", unreg: false, free: false, ind: true, edu: true },
  { label: "14 eBooks worth $50+ — FREE", unreg: false, free: false, ind: true, edu: true },
  { label: "Unique URL for school/class", unreg: false, free: false, ind: false, edu: true },
  { label: "Class and student management", unreg: false, free: false, ind: false, edu: true },
  { label: "Vocabulary lessons & assignments", unreg: false, free: false, ind: false, edu: true },
  { label: "Report on students' vocabulary growth", unreg: false, free: false, ind: false, edu: true },
];

/* green checkmark as inline SVG data URI */
const check = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2318AD4A'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E";

function SubscribeContent() {
  const searchParams = useSearchParams();
  const fromAdFree = searchParams.get("utm_source")?.includes("ad-free") || searchParams.get("utm_source")?.includes("remove-ad");

  return (
    <div>
      <DataMenu activeDict="we" />

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 8px" }}>

        {fromAdFree && (
          <div style={{ backgroundColor: "#FFFFC6", border: "1px solid #E0D890", padding: "6px 12px", margin: "8px 0", fontSize: "0.85em" }}>
            <strong>Great choice!</strong> Subscribe below to enjoy an ad-free Wordsmyth experience.
          </div>
        )}

        {/* ── Three-column pricing ── */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88em", lineHeight: 1.6, tableLayout: "fixed" }}>
          <tbody>
            <tr>

              {/* ── Free Registration ── */}
              <td style={{ width: "33%", verticalAlign: "top", padding: "14px 18px", borderRight: "1px solid #bbb" }}>
                <h2 style={{ color: "#8B0000", fontSize: "1.15em", fontWeight: "bold", textAlign: "center", margin: "0 0 2px 0" }}>
                  Free Registration
                </h2>

                <div style={{ textAlign: "center", margin: "28px 0 24px 0" }}>
                  <Link
                    href="/signup"
                    style={{
                      display: "inline-block", padding: "7px 22px",
                      border: "2px solid #777", color: "#333",
                      textDecoration: "none", fontWeight: "bold", fontSize: "1em",
                      backgroundColor: "#fff",
                    }}
                  >
                    Register. It&apos;s free
                  </Link>
                </div>

                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  <li>Basic dictionary features</li>
                  <li>Basic search tools</li>
                  <li>Limited access to Vocabulary Center</li>
                  <li>Limited number of saved records</li>
                  <li>Free 15 day trial to full subscription feature</li>
                </ul>
              </td>

              {/* ── Individual Subscription ── */}
              <td style={{ width: "34%", verticalAlign: "top", padding: "14px 18px", borderRight: "1px solid #bbb" }}>
                <h2 style={{ color: "#8B0000", fontSize: "1.15em", fontWeight: "bold", textAlign: "center", margin: "0 0 2px 0" }}>
                  Individual Subscription
                </h2>
                <p style={{ textAlign: "center", fontSize: "1.05em", margin: "2px 0 0 0" }}>
                  <span style={{ textDecoration: "line-through", color: "#999" }}>$9.95/year</span>
                </p>
                <p style={{ textAlign: "center", fontSize: "1.2em", fontWeight: "bold", margin: "0 0 2px 0" }}>
                  $15 &ndash; $20/year
                </p>

                <div style={{ textAlign: "center", margin: "16px 0" }}>
                  <Link
                    href="/checkout?plan=individual"
                    style={{
                      display: "inline-block", padding: "9px 30px",
                      backgroundColor: "#6B8E23", color: "white",
                      textDecoration: "none", fontWeight: "bold", fontSize: "1.05em",
                      border: "1px solid #556B2F", borderRadius: "3px",
                    }}
                  >
                    Subscribe Now
                  </Link>
                </div>

                <p style={{ color: "#004B97", fontWeight: "bold", margin: "14px 0 3px 0" }}>
                  Enhanced dictionary features
                </p>
                <ul style={{ paddingLeft: "18px", margin: "0 0 6px 0" }}>
                  <li>Word Parts (roots &amp; affixes)</li>
                  <li>Word Combinations</li>
                  <li>Grammatical Patterns</li>
                  <li>Spanish support</li>
                  <li>Chinese support</li>
                  <li>Personalized entry display</li>
                  <li>Advanced search functions</li>
                </ul>

                <p style={{ color: "#004B97", fontWeight: "bold", margin: "10px 0 3px 0" }}>
                  Full Vocabulary Center
                </p>
                <ul style={{ paddingLeft: "18px", margin: "0 0 6px 0" }}>
                  <li>Wordsmyth Vocabulary Inventory</li>
                  <li>Unlimited user-made wordlists</li>
                  <li>Unlimited sharing</li>
                  <li>Vocabulary activities</li>
                  <li>Text Analysis</li>
                </ul>

                <p style={{ color: "#004B97", fontWeight: "bold", margin: "10px 0 3px 0" }}>
                  Ad free
                </p>

                <p style={{ color: "#18AD4A", fontWeight: "bold", margin: "10px 0 3px 0" }}>
                  Book Bundle ($20/year plan)
                </p>
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  <li><strong>40% off</strong> all kids books &amp; eBooks</li>
                  <li><strong>All 14 eBooks FREE</strong> (worth $50+)</li>
                </ul>
              </td>

              {/* ── Educational Group Subscription ── */}
              <td style={{ width: "33%", verticalAlign: "top", padding: "14px 18px" }}>
                <h2 style={{ color: "#8B0000", fontSize: "1.15em", fontWeight: "bold", textAlign: "center", margin: "0 0 2px 0" }}>
                  Educational Group Subscription
                </h2>
                <p style={{ textAlign: "center", fontSize: "0.9em", margin: "2px 0 0 0" }}>
                  starting from <strong>$20 for 20 users</strong>
                </p>

                <ul style={{ paddingLeft: "18px", margin: "10px 0" }}>
                  <li>Tier 1 (21&ndash;50 users): <strong>$1.00/year</strong> per user</li>
                  <li>Tier 2 (51&ndash;400 users): <strong>$0.75/year</strong> per user</li>
                  <li>Tier 3 (401 and up): <strong>$0.50/year</strong> per user</li>
                </ul>

                <p style={{ textAlign: "center", fontSize: "0.9em", margin: "4px 0 10px 0" }}>
                  For school districts, please{" "}
                  <Link href="/contact" style={{ color: "#004B97" }}>contact us</Link>{" "}
                  for a quote.
                </p>

                <div style={{ textAlign: "center", margin: "16px 0" }}>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-block", padding: "9px 30px",
                      backgroundColor: "#6B8E23", color: "white",
                      textDecoration: "none", fontWeight: "bold", fontSize: "1.05em",
                      border: "1px solid #556B2F", borderRadius: "3px",
                    }}
                  >
                    Subscribe Now
                  </Link>
                </div>

                <p style={{ color: "#004B97", fontWeight: "bold", margin: "10px 0 3px 0" }}>
                  Unique URL for your school/class
                </p>

                <p style={{ margin: "3px 0" }}>
                  All individual subscription features are available for students and teachers, including:
                </p>
                <ul style={{ paddingLeft: "18px", margin: "0 0 6px 0" }}>
                  <li>Enhanced dictionary features</li>
                  <li>Vocabulary Center</li>
                  <li>Ad free</li>
                </ul>

                <p style={{ color: "#004B97", fontWeight: "bold", margin: "10px 0 3px 0" }}>
                  Teacher Tools
                </p>

                <p style={{ margin: "3px 0" }}>
                  Learning management system fully integrated with Wordsmyth Vocabulary Center.
                </p>
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  <li>Class and student management</li>
                  <li>Vocabulary lessons and assignments</li>
                  <li>Report on students&apos; vocabulary growth</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Feature comparison table ── */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82em", border: "1px solid #aaa", marginTop: "20px", marginBottom: "30px" }}>
          <thead>
            <tr style={{ backgroundColor: "#e0e0e0" }}>
              <th style={{ border: "1px solid #aaa", padding: "6px 10px", textAlign: "left", fontWeight: "bold" }}>Feature list</th>
              <th style={{ border: "1px solid #aaa", padding: "6px 8px", textAlign: "center", fontWeight: "bold", width: "90px" }}>Unregistered<br />user</th>
              <th style={{ border: "1px solid #aaa", padding: "6px 8px", textAlign: "center", fontWeight: "bold", width: "90px" }}>Free<br />registration</th>
              <th style={{ border: "1px solid #aaa", padding: "6px 8px", textAlign: "center", fontWeight: "bold", width: "90px", color: "#004B97" }}>Individual<br />subscription</th>
              <th style={{ border: "1px solid #aaa", padding: "6px 8px", textAlign: "center", fontWeight: "bold", width: "90px" }}>Educational<br />subscription</th>
              <th style={{ border: "1px solid #aaa", padding: "6px 10px", textAlign: "left", fontWeight: "bold" }}>Feature Explanation</th>
            </tr>
          </thead>
          <tbody>
            {featureRows.map((row, i) => (
              <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f4f4f4" }}>
                <td style={{ border: "1px solid #ccc", padding: "4px 10px" }}>{row.label}</td>
                {[row.unreg, row.free, row.ind, row.edu].map((val, ci) => (
                  <td key={ci} style={{ border: "1px solid #ccc", padding: "4px 8px", textAlign: "center" }}>
                    {val && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={check} alt="✓" style={{ width: "20px", height: "20px", verticalAlign: "middle" }} />
                    )}
                  </td>
                ))}
                <td style={{ border: "1px solid #ccc", padding: "4px 10px", color: "#666", fontSize: "0.92em" }}>
                  Click on each feature to see a more detailed explanation.
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

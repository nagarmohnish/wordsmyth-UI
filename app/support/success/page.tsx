"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SupportSuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#fafafa" }} />}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();

  const amount = Number(searchParams.get("amount")) || 10;
  const frequency = searchParams.get("frequency") || "one-time";
  const name = searchParams.get("name") || "Supporter";
  const isMonthly = frequency === "monthly";

  const today = new Date().toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  const frequencyLabel = isMonthly ? "every month" : "one-time";
  const shareText = encodeURIComponent(
    `I just supported Wordsmyth — a free dictionary helping 50,000+ children learn new words every day. Join me! https://kids.wordsmyth.net/support`
  );

  return (
    <div style={{
      backgroundColor: "#fafafa", minHeight: "100vh",
      fontFamily: "'Poppins', var(--font-wild), -apple-system, sans-serif",
    }}>
      {/* Confirmation header */}
      <div style={{
        backgroundColor: "#fff", padding: "40px 20px", textAlign: "center",
        borderBottom: "1px solid #f0f0f0",
      }}>
        <div style={{ maxWidth: "440px", margin: "0 auto" }}>
          {/* Checkmark */}
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            backgroundColor: "#f0faf0", border: "2px solid #18AD4A",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: "24px", color: "#18AD4A",
          }}>
            &#x2714;
          </div>

          <p style={{ fontSize: "14px", color: "#666", margin: "0 0 4px 0", lineHeight: 1.5 }}>
            Your ${amount} {frequencyLabel} support is confirmed.
          </p>
          <p style={{ fontSize: "14px", color: "#666", margin: "0 0 16px 0", lineHeight: 1.5 }}>
            You&apos;re now one of us — helping keep learning free for children worldwide.
          </p>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "8px 18px", borderRadius: "20px",
            border: "1px solid #18AD4A", backgroundColor: "#f0faf0",
            fontSize: "12px", fontWeight: "600", color: "#18AD4A",
          }}>
            &#x1F49A; Official Supporter of Free Learning
          </div>
        </div>
      </div>

      {/* Certificate */}
      <div style={{ maxWidth: "440px", margin: "0 auto", padding: "32px 20px" }}>
        <div style={{
          borderRadius: "16px", overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}>
          {/* Certificate card — dark top */}
          <div style={{
            backgroundColor: "#1a2332", color: "#fff",
            padding: "32px 28px 28px", textAlign: "center",
            position: "relative",
          }}>
            {/* Heart icon */}
            <div style={{
              position: "absolute", top: "16px", left: "20px",
              width: "32px", height: "32px", borderRadius: "50%",
              backgroundColor: "rgba(24,173,74,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px",
            }}>
              &#x1F49A;
            </div>

            {/* Share icon */}
            <div style={{
              position: "absolute", top: "16px", right: "20px",
              fontSize: "16px", color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
            }}>
              &#x2197;
            </div>

            <p style={{
              fontSize: "10px", fontWeight: "700", letterSpacing: "2px",
              textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
              margin: "12px 0 20px 0",
            }}>
              Certificate of Support
            </p>

            {/* Divider */}
            <div style={{
              width: "40px", height: "2px", backgroundColor: "#18AD4A",
              margin: "0 auto 16px",
            }} />

            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: "0 0 6px 0" }}>
              This certifies that
            </p>

            <p style={{
              fontSize: "1.6em", fontWeight: "800", margin: "0 0 16px 0",
              fontFamily: "'Poppins', var(--font-wild), sans-serif",
            }}>
              {name}
            </p>

            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: "0 0 12px 0" }}>
              is a proud supporter of
            </p>

            {/* Wordsmyth logo area */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "8px", marginBottom: "16px",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                backgroundColor: "#18AD4A",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px", color: "#fff", fontWeight: "800",
              }}>
                W
              </div>
              <span style={{ fontSize: "1.3em", fontWeight: "700", letterSpacing: "1px" }}>
                <span style={{ color: "#18AD4A" }}>WORD</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>SMYTH</span>
              </span>
            </div>

            {/* Divider */}
            <div style={{
              width: "40px", height: "1px", backgroundColor: "rgba(255,255,255,0.1)",
              margin: "0 auto 16px",
            }} />

            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontStyle: "italic", margin: "0 0 14px 0" }}>
              For keeping learning free &amp; accessible for every child
            </p>

            <p style={{ fontSize: "1.1em", fontWeight: "700", margin: "0 0 4px 0" }}>
              ${amount} {frequencyLabel}
            </p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
              {today}
            </p>
          </div>

          {/* Certificate bottom — white */}
          <div style={{ backgroundColor: "#fff", padding: "20px 28px" }}>
            {/* Ads-free perk */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "12px 14px", borderRadius: "10px",
              backgroundColor: "#f0faf0", border: "1px solid #C4E4CD",
            }}>
              <span style={{ fontSize: "16px" }}>&#x2714;</span>
              <p style={{ fontSize: "12px", color: "#333", margin: 0, lineHeight: 1.4 }}>
                Your Wordsmyth experience will be <strong style={{ color: "#18AD4A" }}>ads-free</strong> while your support is active.
              </p>
            </div>
          </div>
        </div>

        {/* Share section */}
        <div style={{ marginTop: "28px", textAlign: "center" }}>
          <p style={{
            fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px",
            textTransform: "uppercase", color: "#999", marginBottom: "12px",
          }}>
            Show others you support free learning
          </p>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: "8px",
          }}>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "6px", padding: "10px",
                backgroundColor: "#333", color: "#fff",
                borderRadius: "8px", fontSize: "12px", fontWeight: "600",
                textDecoration: "none",
              }}
            >
              &#x1D54F; X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://kids.wordsmyth.net/support`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "6px", padding: "10px",
                backgroundColor: "#0A66C2", color: "#fff",
                borderRadius: "8px", fontSize: "12px", fontWeight: "600",
                textDecoration: "none",
              }}
            >
              in LinkedIn
            </a>
            <a
              href={`https://wa.me/?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "6px", padding: "10px",
                backgroundColor: "#25D366", color: "#fff",
                borderRadius: "8px", fontSize: "12px", fontWeight: "600",
                textDecoration: "none",
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Back to Wordsmyth */}
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <Link
            href="/"
            style={{
              fontSize: "13px", color: "#18AD4A", textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Back to Wordsmyth &rarr;
          </Link>
          <span style={{ display: "block", fontSize: "11px", color: "#999", marginTop: "6px" }}>
            <Link href="/support" style={{ color: "#999", textDecoration: "underline" }}>
              Manage your support
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

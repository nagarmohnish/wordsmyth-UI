"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { usePathname } from "next/navigation";

const wittyLines = [
  { hook: "Wordsmyth runs on love & donations.", cta: "Fuel the mission" },
  { hook: "50,000 kids learn here daily. For free.", cta: "Help us keep it free" },
  { hook: "No investors. No paywalls. Just you.", cta: "Support us" },
  { hook: "This dictionary doesn't sell your data.", cta: "Fund the alternative" },
  { hook: "Since 1998. Still free. Still need coffee.", cta: "Buy us a coffee" },
  { hook: "Teachers love us. Our servers need love too.", cta: "Chip in" },
  { hook: "$5 = 10 students learning for a month.", cta: "Make it happen" },
  { hook: "We're ad-supported, but we'd rather be you-supported.", cta: "Support us" },
];

export default function StickySupportWidget() {
  const { isSubscriber } = useUser();
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  // Don't show on support or subscribe pages
  const skip = pathname === "/support" || pathname === "/subscribe" || isSubscriber;

  // Pick a witty line based on the page
  const line = useMemo(() => {
    let h = 0;
    for (let i = 0; i < pathname.length; i++) h = ((h << 5) - h + pathname.charCodeAt(i)) | 0;
    return wittyLines[Math.abs(h) % wittyLines.length];
  }, [pathname]);

  // Slide in after 3 seconds
  useEffect(() => {
    if (skip || dismissed) return;
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, [skip, dismissed]);

  if (skip || dismissed || !visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 99999,
        fontFamily: "'Poppins', var(--font-wild), -apple-system, sans-serif",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0,
      }}
    >
      {!expanded ? (
        /* ── Collapsed: pill button ── */
        <button
          onClick={() => setExpanded(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            backgroundColor: "#1a1a2e",
            color: "#fff",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)";
          }}
        >
          <span style={{
            width: "28px", height: "28px", borderRadius: "50%",
            background: "linear-gradient(135deg, #18AD4A, #0d8a3a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", flexShrink: 0,
          }}>
            💚
          </span>
          <span>{line.cta} →</span>
        </button>
      ) : (
        /* ── Expanded: card ── */
        <div
          style={{
            width: "320px",
            backgroundColor: "#1a1a2e",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
            color: "#fff",
          }}
        >
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #18AD4A 0%, #0d8a3a 100%)",
            padding: "16px 18px 14px",
            position: "relative",
          }}>
            <button
              onClick={() => setDismissed(true)}
              style={{
                position: "absolute", top: "8px", right: "12px",
                background: "none", border: "none", color: "rgba(255,255,255,0.6)",
                fontSize: "18px", cursor: "pointer", lineHeight: 1,
              }}
              aria-label="Close"
            >
              ×
            </button>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", opacity: 0.8, marginBottom: "6px" }}>
              Support Wordsmyth
            </div>
            <p style={{ margin: 0, fontSize: "15px", fontWeight: "600", lineHeight: 1.4 }}>
              {line.hook}
            </p>
          </div>

          {/* Body */}
          <div style={{ padding: "16px 18px" }}>
            <p style={{ margin: "0 0 14px 0", fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
              Wordsmyth is a free educational resource for children since 1998. We rely on people like you to keep it running.
            </p>

            {/* Quick donate buttons */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
              {[5, 10, 25].map((amount) => (
                <Link
                  key={amount}
                  href={`/support?amount=${amount}`}
                  style={{
                    flex: 1, textAlign: "center", padding: "10px 0",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "10px", color: "#fff",
                    textDecoration: "none", fontSize: "14px", fontWeight: "700",
                    transition: "background 0.15s, border-color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(24,173,74,0.2)";
                    e.currentTarget.style.borderColor = "#18AD4A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                >
                  ${amount}
                </Link>
              ))}
            </div>

            {/* Main CTA */}
            <Link
              href="/support"
              style={{
                display: "block", textAlign: "center", padding: "11px",
                background: "linear-gradient(135deg, #18AD4A, #0d8a3a)",
                color: "#fff", textDecoration: "none",
                borderRadius: "10px", fontWeight: "700", fontSize: "13px",
                letterSpacing: "0.3px",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              {line.cta} →
            </Link>

            {/* Dismiss link */}
            <button
              onClick={() => setDismissed(true)}
              style={{
                display: "block", width: "100%", textAlign: "center",
                marginTop: "10px", background: "none", border: "none",
                color: "rgba(255,255,255,0.35)", fontSize: "11px",
                cursor: "pointer",
              }}
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

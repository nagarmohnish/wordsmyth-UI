"use client";

import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

const sizes: Record<string, { w: number; h: number; label: string }> = {
  banner: { w: 728, h: 90, label: "728 × 90" },
  rectangle: { w: 300, h: 250, label: "300 × 250" },
  leaderboard: { w: 728, h: 90, label: "728 × 90" },
  skyscraper: { w: 160, h: 600, label: "160 × 600" },
  "sticky-footer": { w: 320, h: 50, label: "320 × 50" },
};

// Dummy ad content — simulates real ads
const dummyAds: { bg: string; text: string; subtext: string; cta: string }[] = [
  { bg: "#1a73e8", text: "Learn a New Language!", subtext: "Start your free trial today", cta: "Try Now" },
  { bg: "#e8453c", text: "Kids Books Sale", subtext: "Up to 60% off bestsellers", cta: "Shop Now" },
  { bg: "#0d9488", text: "Online Tutoring", subtext: "1-on-1 sessions from $15/hr", cta: "Book Free Trial" },
  { bg: "#7c3aed", text: "Math Made Fun!", subtext: "Games & puzzles for grades K-8", cta: "Play Free" },
  { bg: "#ea580c", text: "Back to School Sale", subtext: "Supplies starting at $0.99", cta: "Shop Deals" },
  { bg: "#0891b2", text: "Science Kits for Kids", subtext: "Hands-on STEM learning", cta: "Explore" },
  { bg: "#be185d", text: "Reading Challenge", subtext: "Join 1M+ kids reading daily", cta: "Join Free" },
  { bg: "#4f46e5", text: "Coding for Kids", subtext: "Ages 7-14 — fun & easy", cta: "Start Free" },
];

function getDummyAd(slotId: string) {
  // Deterministic pick based on slotId
  let hash = 0;
  for (let i = 0; i < slotId.length; i++) hash = ((hash << 5) - hash + slotId.charCodeAt(i)) | 0;
  return dummyAds[Math.abs(hash) % dummyAds.length];
}

interface AdSlotProps {
  slotId: string;
  size: "banner" | "rectangle" | "leaderboard" | "skyscraper" | "sticky-footer";
  position?: "top" | "sidebar" | "inline" | "bottom" | "sticky";
  showGoAdFree?: boolean;
}

export default function AdSlot({ slotId, size, position = "inline", showGoAdFree = true }: AdSlotProps) {
  const { isSubscriber } = useUser();

  if (isSubscriber) return null;

  const s = sizes[size] || sizes.banner;
  const ad = getDummyAd(slotId);
  const isVertical = size === "skyscraper";
  const isSmall = size === "sticky-footer";

  return (
    <div
      style={{ margin: "4px 0" }}
      data-ad-slot={slotId}
      data-ad-position={position}
    >
      {/* Ad container with dummy ad */}
      <div
        style={{
          position: "relative",
          width: isVertical ? `${s.w}px` : "100%",
          maxWidth: `${s.w}px`,
          height: `${s.h}px`,
          backgroundColor: ad.bg,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "Arial, sans-serif",
          ...(position === "sidebar" ? {} : { margin: "0 auto" }),
        }}
      >
        {/* "Remove Ad" / "Go Ad-Free" button — top right corner */}
        <Link
          href="/subscribe?utm_source=remove-ad"
          style={{
            position: "absolute",
            top: "3px",
            right: "3px",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "#fff",
            fontSize: "9px",
            padding: "2px 6px",
            textDecoration: "none",
            zIndex: 10,
            lineHeight: 1.3,
            display: "flex",
            alignItems: "center",
            gap: "3px",
          }}
        >
          ✕ Remove Ad
        </Link>

        {/* "Ad" label — top left */}
        <span
          style={{
            position: "absolute",
            top: "3px",
            left: "3px",
            backgroundColor: "rgba(255,255,255,0.25)",
            color: "#fff",
            fontSize: "8px",
            padding: "1px 4px",
            letterSpacing: "0.5px",
            fontWeight: "bold",
          }}
        >
          AD
        </span>

        {/* Dummy ad content */}
        {isVertical ? (
          // Skyscraper vertical layout
          <div style={{ textAlign: "center", padding: "20px 10px" }}>
            <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px", lineHeight: 1.3 }}>{ad.text}</div>
            <div style={{ fontSize: "11px", opacity: 0.85, marginBottom: "16px", lineHeight: 1.4 }}>{ad.subtext}</div>
            <div style={{
              display: "inline-block", padding: "6px 16px", backgroundColor: "rgba(255,255,255,0.2)",
              fontSize: "12px", fontWeight: "bold", border: "1px solid rgba(255,255,255,0.4)",
            }}>
              {ad.cta}
            </div>
          </div>
        ) : isSmall ? (
          // Sticky footer — single line
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px" }}>
            <span style={{ fontWeight: "bold" }}>{ad.text}</span>
            <span style={{ opacity: 0.8, fontSize: "11px" }}>{ad.subtext}</span>
            <span style={{ padding: "2px 10px", backgroundColor: "rgba(255,255,255,0.2)", fontWeight: "bold", fontSize: "11px" }}>{ad.cta}</span>
          </div>
        ) : (
          // Banner / Rectangle / Leaderboard
          <div style={{ textAlign: "center", padding: "8px" }}>
            <div style={{ fontSize: s.h > 100 ? "20px" : "15px", fontWeight: "bold", marginBottom: "4px" }}>{ad.text}</div>
            <div style={{ fontSize: s.h > 100 ? "13px" : "11px", opacity: 0.85, marginBottom: s.h > 100 ? "12px" : "6px" }}>{ad.subtext}</div>
            <div style={{
              display: "inline-block", padding: s.h > 100 ? "8px 24px" : "4px 14px",
              backgroundColor: "rgba(255,255,255,0.2)", fontSize: s.h > 100 ? "14px" : "11px",
              fontWeight: "bold", border: "1px solid rgba(255,255,255,0.4)",
            }}>
              {ad.cta}
            </div>
          </div>
        )}
      </div>

      {/* Go Ad-Free link below */}
      {showGoAdFree && (
        <div style={{ textAlign: "center", marginTop: "2px" }}>
          <Link
            href="/subscribe?utm_source=go-ad-free-widget"
            style={{ fontSize: "10px", color: "#888", textDecoration: "none" }}
          >
            Go ad-free for $15-$20/year →
          </Link>
        </div>
      )}
    </div>
  );
}

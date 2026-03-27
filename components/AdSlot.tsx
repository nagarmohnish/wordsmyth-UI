"use client";

import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

const sizes: Record<string, { w: number; h: number }> = {
  banner: { w: 728, h: 90 },
  rectangle: { w: 300, h: 250 },
  leaderboard: { w: 728, h: 90 },
  skyscraper: { w: 160, h: 600 },
  "sticky-footer": { w: 320, h: 50 },
};

const dummyAds = [
  { bg: "#1a73e8", text: "Learn a New Language!", sub: "Start your free trial today", cta: "Try Now" },
  { bg: "#e8453c", text: "Kids Books Sale", sub: "Up to 60% off bestsellers", cta: "Shop Now" },
  { bg: "#0d9488", text: "Online Tutoring", sub: "1-on-1 sessions from $15/hr", cta: "Book Free Trial" },
  { bg: "#7c3aed", text: "Math Made Fun!", sub: "Games & puzzles for K-8", cta: "Play Free" },
  { bg: "#ea580c", text: "Back to School Sale", sub: "Supplies from $0.99", cta: "Shop Deals" },
  { bg: "#0891b2", text: "Science Kits for Kids", sub: "Hands-on STEM learning", cta: "Explore" },
  { bg: "#be185d", text: "Reading Challenge", sub: "Join 1M+ kids reading daily", cta: "Join Free" },
  { bg: "#4f46e5", text: "Coding for Kids", sub: "Ages 7-14 — fun & easy", cta: "Start Free" },
];

function pickAd(slotId: string) {
  let h = 0;
  for (let i = 0; i < slotId.length; i++) h = ((h << 5) - h + slotId.charCodeAt(i)) | 0;
  return dummyAds[Math.abs(h) % dummyAds.length];
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
  const ad = pickAd(slotId);
  const isVert = size === "skyscraper";
  const isSmall = size === "sticky-footer";

  return (
    <div
      style={{
        position: "relative",
        margin: "6px 0",
        ...(position === "sidebar" ? {} : { display: "flex", flexDirection: "column", alignItems: "center" }),
      }}
      data-ad-slot={slotId}
    >
      {/* ✕ Remove Ad — top right of the SLOT, outside the ad */}
      <Link
        href="/subscribe?utm_source=remove-ad"
        style={{
          position: "absolute",
          top: "-1px",
          right: position === "sidebar" ? "0" : "auto",
          left: position === "sidebar" ? "auto" : undefined,
          backgroundColor: "#f0f0f0",
          color: "#666",
          fontSize: "10px",
          padding: "1px 6px",
          textDecoration: "none",
          border: "1px solid #ccc",
          borderBottom: "none",
          zIndex: 5,
          transform: "translateY(-100%)",
          lineHeight: "1.4",
          whiteSpace: "nowrap",
        }}
      >
        ✕ Go Ad-Free
      </Link>

      {/* Dummy ad */}
      <div
        style={{
          width: isVert ? `${s.w}px` : "100%",
          maxWidth: `${s.w}px`,
          height: `${s.h}px`,
          backgroundColor: ad.bg,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "Arial, Helvetica, sans-serif",
          position: "relative",
        }}
      >
        {/* Tiny "Ad" label */}
        <span style={{
          position: "absolute", top: "2px", left: "4px",
          fontSize: "8px", opacity: 0.5, letterSpacing: "0.5px",
        }}>
          AD
        </span>

        {isVert ? (
          <div style={{ textAlign: "center", padding: "16px 10px" }}>
            <div style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "8px", lineHeight: 1.3 }}>{ad.text}</div>
            <div style={{ fontSize: "11px", opacity: 0.8, marginBottom: "14px" }}>{ad.sub}</div>
            <span style={{ padding: "5px 14px", backgroundColor: "rgba(255,255,255,0.2)", fontSize: "11px", fontWeight: "bold", border: "1px solid rgba(255,255,255,0.3)" }}>{ad.cta}</span>
          </div>
        ) : isSmall ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", padding: "0 12px" }}>
            <strong>{ad.text}</strong>
            <span style={{ opacity: 0.8, fontSize: "11px" }}>{ad.sub}</span>
            <span style={{ padding: "2px 8px", backgroundColor: "rgba(255,255,255,0.2)", fontWeight: "bold", fontSize: "10px" }}>{ad.cta}</span>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "6px 12px" }}>
            <div style={{ fontSize: s.h > 100 ? "18px" : "14px", fontWeight: "bold", marginBottom: "3px" }}>{ad.text}</div>
            <div style={{ fontSize: s.h > 100 ? "12px" : "10px", opacity: 0.8, marginBottom: s.h > 100 ? "10px" : "5px" }}>{ad.sub}</div>
            <span style={{ padding: s.h > 100 ? "6px 20px" : "3px 12px", backgroundColor: "rgba(255,255,255,0.2)", fontSize: s.h > 100 ? "13px" : "10px", fontWeight: "bold", border: "1px solid rgba(255,255,255,0.3)" }}>{ad.cta}</span>
          </div>
        )}
      </div>

      {/* Go ad-free text below */}
      {showGoAdFree && (
        <div style={{ textAlign: "center", marginTop: "1px" }}>
          <Link href="/subscribe?utm_source=go-ad-free-widget" style={{ fontSize: "9px", color: "#999", textDecoration: "none" }}>
            Go ad-free from $15/year →
          </Link>
        </div>
      )}
    </div>
  );
}

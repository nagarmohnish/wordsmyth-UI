"use client";

import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useMemo } from "react";

const variations = [
  "Enjoying Wordsmyth? Go ads-free from just $19.95/year \u2192",
  "Less ads, more learning. Go ads-free from $19.95/year \u2192",
  "Support education. Go ads-free from $19.95/year \u2192",
];

interface GoAdFreeWidgetProps {
  variant?: "inline" | "banner" | "card";
}

export default function GoAdFreeWidget({ variant = "inline" }: GoAdFreeWidgetProps) {
  const { isSubscriber } = useUser();
  const text = useMemo(() => variations[Math.floor(Math.random() * variations.length)], []);

  if (isSubscriber) return null;

  if (variant === "card") {
    return (
      <div style={{ backgroundColor: "#FFFFC6", border: "1px solid #E0D890", padding: "12px", textAlign: "center" }}>
        <p style={{ fontSize: "0.85em", fontWeight: "bold", color: "#333", marginBottom: "8px" }}>{text}</p>
        <Link
          href="/subscribe?utm_source=go-ad-free-widget"
          style={{
            display: "inline-block", padding: "6px 16px",
            backgroundColor: "#3d9739", color: "white",
            fontWeight: "bold", fontSize: "0.85em", textDecoration: "none",
          }}
        >
          Go Ads-Free
        </Link>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div style={{ backgroundColor: "#FFFFC6", padding: "6px 12px", textAlign: "center" }}>
        <Link
          href="/subscribe?utm_source=go-ad-free-widget"
          style={{ fontSize: "0.85em", color: "#004B97", textDecoration: "none" }}
        >
          {text}
        </Link>
      </div>
    );
  }

  return (
    <Link
      href="/subscribe?utm_source=go-ad-free-widget"
      style={{ fontSize: "10px", color: "#888", textDecoration: "none" }}
    >
      {text}
    </Link>
  );
}

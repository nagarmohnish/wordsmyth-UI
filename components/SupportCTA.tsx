"use client";

import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

interface SupportCTAProps {
  size?: "inline" | "banner" | "card";
  context?: string;
}

export default function SupportCTA({ size = "inline", context }: SupportCTAProps) {
  const { hasSeenSupportCTA, dismissSupportCTA, isSubscriber } = useUser();

  if (hasSeenSupportCTA || isSubscriber) return null;

  if (size === "card") {
    return (
      <div
        style={{
          position: "relative",
          border: "2px solid #18AD4A",
          backgroundColor: "#f0f8f0",
          padding: "16px",
          marginTop: "12px",
        }}
      >
        <button
          onClick={dismissSupportCTA}
          style={{
            position: "absolute", top: "4px", right: "8px",
            background: "none", border: "none", cursor: "pointer",
            fontSize: "16px", color: "#888",
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span style={{ fontSize: "20px" }}>💚</span>
          <strong style={{ color: "#18AD4A", fontSize: "0.95em" }}>Support Wordsmyth</strong>
        </div>
        <p style={{ fontSize: "0.85em", color: "#333", marginBottom: "6px", lineHeight: 1.5 }}>
          Wordsmyth has been free for students and teachers since 1998. Help us keep it free for the next generation.
        </p>
        {context && (
          <p style={{ fontSize: "0.8em", color: "#666", marginBottom: "6px" }}>{context}</p>
        )}
        <p style={{ fontSize: "0.85em", color: "#333", marginBottom: "10px" }}>
          Even <strong>$5</strong> helps keep the dictionary running for 10 students for a month.
        </p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <Link
            href="/support"
            style={{
              display: "inline-block", padding: "6px 16px",
              backgroundColor: "#18AD4A", color: "white",
              fontWeight: "bold", fontSize: "0.85em", textDecoration: "none",
            }}
          >
            Donate Now
          </Link>
          <Link
            href="/support"
            style={{
              display: "inline-block", padding: "6px 16px",
              backgroundColor: "white", color: "#18AD4A",
              fontWeight: "bold", fontSize: "0.85em", textDecoration: "none",
              border: "1px solid #18AD4A",
            }}
          >
            $5
          </Link>
          <Link
            href="/support"
            style={{
              display: "inline-block", padding: "6px 16px",
              backgroundColor: "white", color: "#18AD4A",
              fontWeight: "bold", fontSize: "0.85em", textDecoration: "none",
              border: "1px solid #18AD4A",
            }}
          >
            $10
          </Link>
          <Link
            href="/support"
            style={{
              display: "inline-block", padding: "6px 16px",
              backgroundColor: "white", color: "#18AD4A",
              fontWeight: "bold", fontSize: "0.85em", textDecoration: "none",
              border: "1px solid #18AD4A",
            }}
          >
            $25
          </Link>
        </div>
      </div>
    );
  }

  if (size === "banner") {
    return (
      <div
        style={{
          backgroundColor: "#f0f8f0",
          border: "1px solid #c8e6c9",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          marginTop: "10px",
          fontSize: "0.85em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span>💚</span>
          <span style={{ color: "#333" }}>
            {context || "Wordsmyth is free for everyone. Help us keep it that way."}{" "}
            <Link href="/support" style={{ color: "#18AD4A", fontWeight: "bold", textDecoration: "none" }}>
              Donate →
            </Link>
          </span>
        </div>
        <button
          onClick={dismissSupportCTA}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#888" }}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    );
  }

  // Inline
  return (
    <p style={{ fontSize: "0.8em", color: "#666", margin: "6px 0" }}>
      💚 Wordsmyth is free for everyone.{" "}
      <Link href="/support" style={{ color: "#18AD4A", fontWeight: "bold", textDecoration: "none" }}>
        Support us with a donation →
      </Link>
    </p>
  );
}

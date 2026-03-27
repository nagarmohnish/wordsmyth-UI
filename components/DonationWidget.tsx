"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { usePathname } from "next/navigation";

/* ─────────────────────────────────────────────
   Universal Donation Widget for kids.wordsmyth.net

   Single consistent message. Identical UI everywhere.
   Only the surrounding trigger/container changes.

   Placements:
     "sticky"   – fixed bottom-left pill → expands to card
     "inline"   – renders card directly in page flow
     "popup"    – centered modal overlay (triggered externally)
     "embed"    – minimal card for sidebar / narrow containers
   ───────────────────────────────────────────── */

type Placement = "sticky" | "inline" | "popup" | "embed";
type Frequency = "one-time" | "monthly";

interface DonationWidgetProps {
  placement?: Placement;
  open?: boolean;
  utmSource?: string;
  onDonate?: (amount: number, frequency: Frequency) => void;
  onDismiss?: () => void;
  delay?: number;
}

/* ── Fixed copy ── */
const HEADLINE = "Skip one takeout order—help a child discover new words today.";
const PRESETS = [5, 10, 25, 50] as const;
const POPULAR = 10;

/* ── Wordsmyth palette ── */
const c = {
  white: "#ffffff",
  green: "#18AD4A",
  greenDark: "#3d9739",
  greenLight: "#C4E4CD",
  greenFaint: "#f0faf0",
  text: "#333333",
  textMuted: "#666666",
  textLight: "#999999",
  border: "#e0e0e0",
  borderLight: "#f0f0f0",
  bg: "#fafafa",
};

/* ── Tracking helper ── */
function trackEvent(action: string, label: string, value?: number) {
  if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
    (window as unknown as Record<string, (...args: unknown[]) => void>).gtag("event", action, {
      event_category: "donation_widget",
      event_label: label,
      value,
    });
  }
}

/* ════════════════════════════════════════════════
   Core Widget Card
   ════════════════════════════════════════════════ */

function WidgetCard({
  utmSource,
  onDonate,
  onDismiss,
  showDismiss = true,
  compact = false,
  onSupportPage = false,
}: {
  utmSource: string;
  onDonate?: (amount: number, frequency: Frequency) => void;
  onDismiss?: () => void;
  showDismiss?: boolean;
  compact?: boolean;
  onSupportPage?: boolean;
}) {
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [selectedPreset, setSelectedPreset] = useState<number>(POPULAR);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const activeAmount = isCustom ? (Number(customAmount) || 0) : selectedPreset;
  const dailyRate = frequency === "monthly" && activeAmount > 0
    ? (activeAmount / 30).toFixed(2)
    : null;

  const handlePresetClick = (amount: number) => {
    setSelectedPreset(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    setIsCustom(true);
  };

  const supportUrl = () => {
    const params = new URLSearchParams();
    if (activeAmount > 0) params.set("amount", String(activeAmount));
    params.set("frequency", frequency);
    params.set("utm_source", utmSource);
    const base = onSupportPage ? "/support/checkout" : "/support";
    return `${base}?${params.toString()}`;
  };

  const handleContinue = () => {
    trackEvent("donation_continue", utmSource, activeAmount);
    onDonate?.(activeAmount, frequency);
  };

  const width = compact ? "300px" : "380px";

  return (
    <div
      style={{
        width,
        maxWidth: "100%",
        backgroundColor: c.white,
        borderRadius: "16px",
        border: `1px solid ${c.borderLight}`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        fontFamily: "'Poppins', var(--font-wild), -apple-system, sans-serif",
        color: c.text,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: compact ? "20px 18px" : "28px 24px" }}>
        {/* ── Title ── */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          {showDismiss && (
            <button
              onClick={() => {
                trackEvent("donation_dismissed", utmSource);
                onDismiss?.();
              }}
              style={{
                position: "absolute", top: "-4px", right: "-4px",
                background: "none", border: "none", color: c.textLight,
                fontSize: "20px", cursor: "pointer", lineHeight: 1, padding: "4px",
              }}
              aria-label="Close"
            >
              ×
            </button>
          )}
          <h3 style={{
            margin: 0, fontSize: compact ? "1.1em" : "1.3em",
            fontWeight: "700", color: c.text, textAlign: "center",
            lineHeight: 1.3, paddingRight: showDismiss ? "24px" : "0",
          }}>
            Support Free Learning
          </h3>
          <p style={{
            margin: "6px 0 0 0", fontSize: "12px", color: c.textMuted,
            textAlign: "center", lineHeight: 1.4,
          }}>
            {HEADLINE}
          </p>
        </div>

        {/* ── Frequency toggle ── */}
        <div style={{
          display: "flex", justifyContent: "center", marginBottom: "18px",
        }}>
          <div style={{
            display: "inline-flex", backgroundColor: c.bg,
            borderRadius: "8px", padding: "3px", border: `1px solid ${c.borderLight}`,
          }}>
            {(["one-time", "monthly"] as Frequency[]).map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                style={{
                  padding: "7px 18px", borderRadius: "6px", border: "none",
                  cursor: "pointer", fontSize: "12.5px", fontWeight: "600",
                  backgroundColor: frequency === f ? c.white : "transparent",
                  color: frequency === f ? c.text : c.textLight,
                  boxShadow: frequency === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {f === "one-time" ? "One-time" : "Monthly"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Selected amount display ── */}
        <div style={{
          textAlign: "center", marginBottom: "14px",
        }}>
          <span style={{
            fontSize: compact ? "2em" : "2.4em", fontWeight: "800", color: c.text,
          }}>
            ${activeAmount > 0 ? activeAmount : "0"}
          </span>
          {dailyRate && (
            <span style={{ fontSize: "12px", color: c.textLight, fontWeight: "500", marginLeft: "8px" }}>
              ${dailyRate}/day
            </span>
          )}
        </div>

        {/* ── Preset buttons + Custom ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${PRESETS.length}, 1fr)`,
          gap: "8px", marginBottom: "8px",
        }}>
          {PRESETS.map((amount) => {
            const isActive = !isCustom && selectedPreset === amount;
            return (
              <div key={amount} style={{ position: "relative", textAlign: "center" }}>
                {amount === POPULAR && (
                  <span style={{
                    position: "absolute", top: "-9px", left: "50%", transform: "translateX(-50%)",
                    fontSize: "9px", fontWeight: "700", color: c.white,
                    backgroundColor: c.green, padding: "1px 6px",
                    borderRadius: "4px", whiteSpace: "nowrap" as const,
                  }}>
                    Popular
                  </span>
                )}
                <button
                  onClick={() => handlePresetClick(amount)}
                  style={{
                    width: "100%", padding: "10px 0",
                    borderRadius: "8px", cursor: "pointer",
                    fontSize: "13.5px", fontWeight: "600",
                    border: `2px solid ${isActive ? c.green : c.border}`,
                    backgroundColor: isActive ? c.greenFaint : c.white,
                    color: isActive ? c.green : c.text,
                    transition: "all 0.15s",
                  }}
                >
                  ${amount}
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Custom amount input (always visible) ── */}
        <div style={{
          display: "flex", alignItems: "center",
          border: `2px solid ${isCustom ? c.green : c.border}`,
          borderRadius: "8px", padding: "0 12px",
          backgroundColor: isCustom ? c.greenFaint : c.white,
          marginBottom: "16px", transition: "all 0.15s",
        }}>
          <span style={{ fontSize: "14px", fontWeight: "600", color: c.textMuted }}>$</span>
          <input
            type="number"
            min="1"
            placeholder="Enter custom amount"
            value={isCustom ? customAmount : ""}
            onFocus={() => {
              setIsCustom(true);
              if (!customAmount) setCustomAmount("");
            }}
            onChange={(e) => handleCustomChange(e.target.value)}
            style={{
              flex: 1, border: "none", outline: "none",
              padding: "10px 6px", fontSize: "13px", fontWeight: "600",
              color: c.text, backgroundColor: "transparent",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* ── Perk line ── */}
        <p style={{
          textAlign: "center", fontSize: "12px", color: c.green,
          fontWeight: "500", margin: "0 0 16px 0",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
        }}>
          <span style={{ fontSize: "14px" }}>&#x2714;</span>
          Go ads-free on all pages
        </p>

        {/* ── CTA button ── */}
        <Link
          href={supportUrl()}
          onClick={handleContinue}
          style={{
            display: "block", textAlign: "center" as const,
            padding: "14px", backgroundColor: c.green,
            color: c.white, textDecoration: "none",
            borderRadius: "10px", fontWeight: "700",
            fontSize: "14px", transition: "background-color 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = c.greenDark; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = c.green; }}
        >
          {activeAmount > 0
            ? `Continue with $${activeAmount}${frequency === "monthly" ? " / month" : ""}`
            : "Give Now"}
        </Link>

        {/* ── Trust signals ── */}
        <div style={{
          marginTop: "14px", display: "flex", alignItems: "center",
          justifyContent: "center", gap: "8px", flexWrap: "wrap" as const,
        }}>
          <span style={{ fontSize: "11px", color: c.textLight, display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "13px" }}>&#x1F512;</span> Secure payment
          </span>
          <span style={{ color: c.borderLight, fontSize: "14px" }}>|</span>
          <div style={{ display: "flex", gap: "4px" }}>
            {["Visa", "MC", "PayPal"].map((name) => (
              <span key={name} style={{
                fontSize: "9px", fontWeight: "700", color: c.textLight,
                border: `1px solid ${c.border}`, borderRadius: "3px",
                padding: "2px 5px",
              }}>
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom trust line ── */}
        <div style={{
          marginTop: "12px", display: "flex", justifyContent: "center",
          gap: "12px", flexWrap: "wrap" as const,
        }}>
          {["Secure & encrypted", "Cancel anytime", "Takes 10 seconds"].map((text) => (
            <span key={text} style={{ fontSize: "10px", color: c.textLight }}>
              {text}
            </span>
          ))}
        </div>

        {/* ── Dismiss ── */}
        {showDismiss && (
          <button
            onClick={() => {
              trackEvent("donation_dismissed", utmSource);
              onDismiss?.();
            }}
            style={{
              display: "block", width: "100%", textAlign: "center" as const,
              marginTop: "10px", background: "none", border: "none",
              color: c.textLight, fontSize: "11px", cursor: "pointer", padding: "2px 0",
            }}
          >
            Maybe later
          </button>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   Main Export — Universal Donation Widget
   ════════════════════════════════════════════════ */

export default function DonationWidget({
  placement = "sticky",
  open,
  utmSource,
  onDonate,
  onDismiss,
  delay = 3000,
}: DonationWidgetProps) {
  const { isSubscriber, hasDismissedDonationWidget, dismissDonationWidget } =
    useUser();
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const resolvedUtm = utmSource || `donation-widget-${placement}`;
  const onSupportPage = pathname === "/support";
  const skipPages = onSupportPage || pathname === "/subscribe" || pathname.startsWith("/support/");

  const handleDismiss = useCallback(() => {
    if (placement === "sticky") {
      // Just collapse back to pill — don't hide permanently
      setExpanded(false);
    } else {
      setVisible(false);
      dismissDonationWidget();
    }
    onDismiss?.();
  }, [placement, dismissDonationWidget, onDismiss]);

  useEffect(() => {
    if (placement !== "sticky") return;
    if (skipPages || isSubscriber || hasDismissedDonationWidget) return;
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [placement, skipPages, isSubscriber, hasDismissedDonationWidget, delay]);

  useEffect(() => {
    if (placement !== "popup") return;
    setVisible(!!open);
  }, [placement, open]);

  useEffect(() => {
    if (placement !== "popup" || !visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [placement, visible, handleDismiss]);

  /* ── Inline / Embed ── */
  if (placement === "inline" || placement === "embed") {
    if (isSubscriber) return null;
    return (
      <div style={{
        display: "flex",
        justifyContent: placement === "inline" ? "center" : "flex-start",
        padding: placement === "inline" ? "24px 0" : "0",
      }}>
        <WidgetCard
          utmSource={resolvedUtm}
          onDonate={onDonate}
          showDismiss={false}
          compact={placement === "embed"}
          onSupportPage={onSupportPage}
        />
      </div>
    );
  }

  /* ── Popup ── */
  if (placement === "popup") {
    if (!visible) return null;
    return (
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 100000,
          display: "flex", alignItems: "center", justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(3px)",
          animation: "dwFadeIn 0.2s ease-out",
        }}
        onClick={(e) => { if (e.target === e.currentTarget) handleDismiss(); }}
      >
        <div style={{ animation: "dwScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <WidgetCard
            utmSource={resolvedUtm}
            onDonate={onDonate}
            onDismiss={handleDismiss}
            showDismiss={true}
            onSupportPage={onSupportPage}
          />
        </div>
        <style>{`
          @keyframes dwFadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes dwScaleIn { from { opacity: 0; transform: scale(0.95) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        `}</style>
      </div>
    );
  }

  /* ── Sticky (default) ── */
  if (skipPages || isSubscriber) return null;

  return (
    <div
      style={{
        position: "fixed", bottom: "20px", left: "20px", zIndex: 9999999,
        fontFamily: "'Poppins', var(--font-wild), -apple-system, sans-serif",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {!expanded ? (
        <button
          onClick={() => {
            setExpanded(true);
            trackEvent("donation_pill_expanded", resolvedUtm);
          }}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 18px", backgroundColor: c.green,
            color: c.white, border: "none", borderRadius: "50px",
            cursor: "pointer", fontSize: "13px", fontWeight: "600",
            boxShadow: "0 4px 16px rgba(24,173,74,0.3)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          <span style={{
            width: "24px", height: "24px", borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", flexShrink: 0,
          }}>
            {"\u{1F49A}"}
          </span>
          <span>Help a child learn</span>
        </button>
      ) : (
        <WidgetCard
          utmSource={resolvedUtm}
          onDonate={onDonate}
          onDismiss={handleDismiss}
          showDismiss={true}
          onSupportPage={onSupportPage}
        />
      )}
    </div>
  );
}

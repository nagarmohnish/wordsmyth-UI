"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import DataMenu from "./DataMenu";
import AdSlot from "./AdSlot";
import SupportCTA from "./SupportCTA";

interface SidebarLayoutProps {
  children: React.ReactNode;
  variant?: "we" | "wild";
}

export default function SidebarLayout({ children, variant = "we" }: SidebarLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dictLevel, setDictLevel] = useState<"elementary" | "intermediate">("intermediate");
  const router = useRouter();
  const { isSubscriber } = useUser();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const base = variant === "wild" ? "/wild" : "/we";
      router.push(`${base}/${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
    }
  };

  return (
    <div>
      {/* Data Menu Bar */}
      <DataMenu activeDict={variant} />

      {/* 3-column layout */}
      <div className="max-w-[960px] mx-auto flex" style={{ minHeight: "600px" }}>
        {/* Left Sidebar — Search */}
        <div className="shrink-0 p-2" style={{ width: "190px" }}>
          {/* Dictionary title */}
          {variant === "wild" ? (
            <div className="font-bold mb-2 text-center" style={{ fontSize: "1.1em", fontFamily: "var(--font-wild)" }}>
              <span style={{ color: "#a53431" }}>W</span>
              <span style={{ color: "#388cec" }}>I</span>
              <span style={{ color: "#83b15b" }}>L</span>
              <span style={{ color: "#eaaf45" }}>D</span>
            </div>
          ) : (
            <div
              className="font-bold mb-2 leading-tight"
              style={{ fontSize: "0.85em", color: "#18AD4A" }}
            >
              Word Explorer<br />
              Children&apos;s<br />
              Dictionary Suite
            </div>
          )}

          {/* Search form */}
          <form onSubmit={handleSearch} className="mb-2">
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "130px",
                  border: "1px solid lightgray",
                  padding: "2px 4px",
                  fontSize: "1.1em",
                }}
              />
              <button
                type="submit"
                className="text-white font-bold px-2 py-0.5 cursor-pointer"
                style={{ backgroundColor: "#3d9739", fontSize: "0.9em", border: "none" }}
              >
                Go
              </button>
            </div>
          </form>

          {/* Dictionary level radio buttons (WE only) */}
          {variant === "we" && (
            <div className="mb-2" style={{ fontSize: "0.7em" }}>
              <label className="flex items-center gap-1 cursor-pointer mb-0.5">
                <input
                  type="radio"
                  name="dictLevel"
                  checked={dictLevel === "elementary"}
                  onChange={() => setDictLevel("elementary")}
                />
                <span className="font-bold" style={{ color: "#004B97" }}>Elementary dictionary</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="dictLevel"
                  checked={dictLevel === "intermediate"}
                  onChange={() => setDictLevel("intermediate")}
                />
                <span className="font-bold" style={{ color: "#004B97" }}>Intermediate dictionary</span>
              </label>
            </div>
          )}

          {/* Alpha results tab header */}
          <div style={{ border: "1px solid #747ac8" }}>
            <div
              className="text-center text-[0.7em] font-bold py-1"
              style={{ backgroundColor: "#C4E4CD", backgroundSize: "contain" }}
            >
              Alpha results
            </div>
            {/* Scrollable word list */}
            <div
              className="overflow-y-auto bg-white"
              style={{ height: "201px", fontSize: "0.75em", padding: "4px" }}
            >
              <span className="text-gray-400 italic">Type a word to search...</span>
            </div>
          </div>

          {/* Broad / Similar tabs */}
          <div className="mt-1" style={{ border: "1px solid #747ac8" }}>
            <div className="flex">
              <div
                className="flex-1 text-center text-[0.7em] font-bold py-1 cursor-pointer"
                style={{ backgroundColor: "#87CC8F" }}
              >
                Broad
              </div>
              <div
                className="flex-1 text-center text-[0.7em] font-bold py-1 cursor-pointer"
                style={{ backgroundColor: "#C4E4CD" }}
              >
                Similar
              </div>
            </div>
            <div
              className="overflow-y-auto bg-white"
              style={{ height: "166px", fontSize: "0.75em", padding: "4px" }}
            >
              <span className="text-gray-400 italic">Search results appear here...</span>
            </div>
          </div>

          {/* Left skyscraper ad */}
          <div className="mt-4">
            <AdSlot slotId={`${variant}-skyscraper-left`} size="skyscraper" position="sidebar" showGoAdFree={false} />
          </div>
        </div>

        {/* Center Column — Main Content */}
        <div className="flex-1 min-w-0 px-2 py-2">
          {children}
          {/* Support widget at bottom of every page's content */}
          <SupportCTA size="card" />
        </div>

        {/* Right Sidebar — Ads */}
        <div className="shrink-0 p-2" style={{ width: "170px" }}>
          {/* Ad-free banner */}
          {!isSubscriber && (
            <Link
              href="/subscribe"
              className="block text-center font-bold mb-3 p-1.5 no-underline"
              style={{ backgroundColor: "#FFEF21", fontSize: "0.7em", color: "#333", lineHeight: 1.4 }}
            >
              Subscribe<br />for ad-free
            </Link>
          )}

          {/* Support widget in sidebar */}
          {!isSubscriber && (
            <div style={{ marginBottom: "8px" }}>
              <Link
                href="/support"
                className="block no-underline"
                style={{
                  backgroundColor: "#f0f8f0",
                  border: "1px solid #c8e6c9",
                  padding: "8px",
                  fontSize: "0.65em",
                  textAlign: "center",
                  lineHeight: 1.4,
                  color: "#333",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: "1.4em" }}>💚</span><br />
                <strong style={{ color: "#18AD4A" }}>Support Wordsmyth</strong><br />
                Free since 1998.<br />
                <span style={{ color: "#18AD4A", fontWeight: "bold" }}>Donate →</span>
              </Link>
            </div>
          )}

          {/* Right skyscraper ad */}
          <AdSlot slotId={`${variant}-skyscraper-right`} size="skyscraper" position="sidebar" showGoAdFree={false} />
        </div>
      </div>
    </div>
  );
}

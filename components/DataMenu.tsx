"use client";

import Link from "next/link";
import { useState } from "react";

interface MenuItem {
  label: string;
  submenu: { label: string; href: string; disabled?: boolean }[];
}

const menuItems: MenuItem[] = [
  {
    label: "Dictionaries",
    submenu: [
      { label: "Comprehensive", href: "#", disabled: true },
      { label: "Children's", href: "/we" },
      { label: "WILD (Illustrated)", href: "/wild" },
    ],
  },
  {
    label: "Word Exploration",
    submenu: [
      { label: "Word Explorer", href: "/we" },
      { label: "Browse", href: "/we" },
      { label: "Search Filter", href: "/we" },
      { label: "Reverse Search", href: "/we" },
      { label: "A-Z Word Parts", href: "/we" },
    ],
  },
  {
    label: "Puzzle Solvers",
    submenu: [
      { label: "Anagram Solver", href: "/activities" },
      { label: "Crossword Solver", href: "/activities" },
    ],
  },
  {
    label: "Teacher Tools",
    submenu: [
      { label: "Classes", href: "/teacher-tools" },
      { label: "Students", href: "/teacher-tools" },
      { label: "Lessons", href: "/teacher-tools" },
      { label: "Assignments", href: "/teacher-tools" },
      { label: "Reports", href: "/teacher-tools" },
    ],
  },
  {
    label: "Vocabulary Center",
    submenu: [
      { label: "Activities", href: "/activities" },
      { label: "Wordlist Maker", href: "/vocabulary-center" },
      { label: "Writing Tool (Beta)", href: "/vocabulary-center" },
    ],
  },
  {
    label: "My Wordsmyth",
    submenu: [
      { label: "Lookup History", href: "/account" },
      { label: "My Wordlists", href: "/vocabulary-center" },
    ],
  },
];

function isActive(item: MenuItem, activeDict?: "we" | "wild"): boolean {
  if (!activeDict) return false;
  if (item.label === "Dictionaries") return true;
  if (item.label === "Word Exploration" && activeDict === "we") return true;
  return false;
}

interface DataMenuProps {
  activeDict?: "we" | "wild";
}

export default function DataMenu({ activeDict }: DataMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <nav
      className="w-full"
      style={{ backgroundColor: "#C4E4CD" }}
      onMouseLeave={() => setOpenIndex(null)}
    >
      <div className="max-w-[960px] mx-auto">
        <div className="flex" style={{ fontSize: "0.75em" }}>
          {menuItems.map((item, idx) => {
            const active = isActive(item, activeDict);
            return (
              <div
                key={item.label}
                className="relative flex-1 text-center"
                onMouseEnter={() => setOpenIndex(idx)}
                onMouseLeave={() => setOpenIndex(null)}
              >
                {/* Menu button */}
                <div
                  className="cursor-pointer select-none px-1 py-2 font-bold transition-colors"
                  style={{
                    fontSize: "1.2em",
                    backgroundColor:
                      openIndex === idx
                        ? active
                          ? "#A1D1A2"
                          : "#DCEDD8"
                        : active
                          ? "#87CC8F"
                          : "transparent",
                  }}
                >
                  <span>{item.label}</span>
                  {/* Triangle indicator */}
                  <span
                    className="inline-block ml-1"
                    style={{
                      fontSize: "0.6em",
                      verticalAlign: "middle",
                    }}
                  >
                    &#9660;
                  </span>
                </div>

                {/* Dropdown submenu */}
                {openIndex === idx && (
                  <div
                    className="absolute left-0 min-w-full shadow-md"
                    style={{
                      zIndex: 20,
                      backgroundColor: "#DCEDD8",
                      border: "1px solid #a8c8a8",
                    }}
                  >
                    {item.submenu.map((sub) => (
                      <div key={sub.label}>
                        {sub.disabled ? (
                          <div
                            className="block px-3 py-1.5 text-left whitespace-nowrap"
                            style={{
                              color: "#999",
                              cursor: "default",
                              fontSize: "1.1em",
                            }}
                          >
                            {sub.label}
                          </div>
                        ) : (
                          <Link
                            href={sub.href}
                            className="block px-3 py-1.5 text-left whitespace-nowrap hover:underline"
                            style={{
                              color: "#333",
                              fontSize: "1.1em",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = "#C4E4CD";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                            }}
                          >
                            {sub.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

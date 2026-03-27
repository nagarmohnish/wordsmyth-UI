"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export default function Header() {
  const { isLoggedIn } = useUser();
  const pathname = usePathname();
  const [bannerVisible, setBannerVisible] = useState(true);
  const hideShopBanner = pathname !== "/";

  return (
    <header className="bg-white">
      {/* Title Row */}
      <div className="max-w-[960px] mx-auto px-4 py-2">
        <div className="flex items-end justify-between flex-wrap gap-2">
          {/* Logo - left side */}
          <Link href="/we/" className="shrink-0">
            <span
              className="text-3xl font-bold italic"
              style={{ color: "#2E7D32" }}
            >
              Wordsmyth
            </span>
          </Link>

          {/* Right side - login frame + nav links */}
          <div className="flex flex-col items-end gap-1">
            {/* Login frame */}
            <div
              className="px-2 py-1 text-xs"
              style={{
                backgroundColor: "#F0F0F0",
                border: "1px solid #91a093",
              }}
            >
              {isLoggedIn ? (
                <>
                  <Link
                    href="/account"
                    className="hover:underline"
                    style={{ color: "#004B97" }}
                  >
                    My Account
                  </Link>
                  <span className="mx-1" style={{ color: "#004B97" }}>
                    |
                  </span>
                  <Link
                    href="/logout"
                    className="hover:underline"
                    style={{ color: "#004B97" }}
                  >
                    Log Out
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hover:underline"
                    style={{ color: "#004B97" }}
                  >
                    Log In
                  </Link>
                  <span className="mx-1" style={{ color: "#004B97" }}>
                    |
                  </span>
                  <Link
                    href="/register"
                    className="hover:underline"
                    style={{ color: "#004B97" }}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Navigation links row */}
            <nav className="flex flex-wrap items-center text-xs">
              {[
                { label: "home", href: "/" },
                { label: "subscription", href: "/subscribe" },
                { label: "feedback", href: "/contact" },
                { label: "about us", href: "/about" },
                { label: "blog", href: "/about" },
                { label: "widget", href: "/about" },
                { label: "shop", href: "/shop" },
                { label: "FAQ", href: "/faq" },
              ].map((item, i) => (
                <span key={item.label} className="whitespace-nowrap">
                  {i > 0 && (
                    <span className="mx-1" style={{ color: "#C12E48" }}>
                      |
                    </span>
                  )}
                  <Link
                    href={item.href}
                    className="font-bold no-underline hover:underline"
                    style={{ color: "#C12E48" }}
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Subtitle / Banner Row */}
      <div style={{ borderTop: "3px solid black" }}>
        {bannerVisible && !hideShopBanner && (
          <div
            className="relative"
            style={{ backgroundColor: "#FFFFC6", minHeight: "90px" }}
          >
            <div className="max-w-[960px] mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm">
                <strong>Just Launched!</strong> Explore the new Wordsmyth online
                bookstore. eBooks starting at just $2.99!
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/shop"
                  className="px-4 py-1.5 text-sm font-bold text-white rounded"
                  style={{ backgroundColor: "#2E7D32" }}
                >
                  Go to store
                </Link>
                <button
                  onClick={() => setBannerVisible(false)}
                  className="text-lg font-bold text-gray-600 hover:text-black leading-none"
                  aria-label="Close banner"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

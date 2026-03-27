"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export default function GoAdFreeLoader() {
  const pathname = usePathname();
  const { isSubscriber } = useUser();

  // Skip on subscribe page and for subscribers
  const skip = pathname === "/subscribe" || isSubscriber;

  useEffect(() => {
    if (skip) return;

    // Don't load twice
    if (document.getElementById("gafw-script")) return;

    const script = document.createElement("script");
    script.id = "gafw-script";
    script.src = "/widget/go-ad-free.js";
    script.setAttribute("data-subscribe-url", "/subscribe");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-delay", "800");
    script.setAttribute("data-poll", "3000");
    // Our ad slots use .ad-container class and [data-ad-slot] attribute
    script.setAttribute("data-selectors", ".ad-container,[data-ad-slot]");
    document.body.appendChild(script);

    return () => {
      // Cleanup on route change to subscribe
      const el = document.getElementById("gafw-script");
      if (el) el.remove();
      // Remove all widget bars
      document.querySelectorAll(".gafw-bar").forEach((bar) => bar.remove());
      // Remove processed markers so it can re-scan on next mount
      document.querySelectorAll("[data-gafw-v2]").forEach((el) => el.removeAttribute("data-gafw-v2"));
    };
  }, [skip]);

  // On route changes (non-subscribe), re-trigger scan after a delay
  useEffect(() => {
    if (skip) return;

    const timer = setTimeout(() => {
      // Re-scan: remove old bars and markers, then let the widget poll pick them up
      document.querySelectorAll("[data-gafw-v2]").forEach((el) => {
        el.removeAttribute("data-gafw-v2");
        el.querySelectorAll(".gafw-bar").forEach((bar) => bar.remove());
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, skip]);

  return null;
}

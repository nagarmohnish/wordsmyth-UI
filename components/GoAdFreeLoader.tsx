"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export default function GoAdFreeLoader() {
  const pathname = usePathname();
  const { isSubscriber } = useUser();

  const skip = pathname === "/subscribe" || isSubscriber;

  useEffect(() => {
    if (skip) return;

    if (document.getElementById("gafw-script")) return;

    const script = document.createElement("script");
    script.id = "gafw-script";
    script.src = "/widget/go-ad-free.js";
    script.setAttribute("data-subscribe-url", "/subscribe");
    script.setAttribute("data-delay", "800");
    script.setAttribute("data-poll", "3000");
    script.setAttribute("data-selectors", ".ad-container,[data-ad-slot]");
    document.body.appendChild(script);

    return () => {
      const el = document.getElementById("gafw-script");
      if (el) el.remove();
      document.querySelectorAll(".gafw,.gafw4").forEach((bar) => bar.remove());
      document.querySelectorAll("[data-gafw]").forEach((el) => el.removeAttribute("data-gafw"));
      const modalEl = document.querySelector(".gafw4-modal");
      if (modalEl) modalEl.remove();
    };
  }, [skip]);

  useEffect(() => {
    if (skip) return;

    const timer = setTimeout(() => {
      document.querySelectorAll("[data-gafw]").forEach((el) => {
        el.removeAttribute("data-gafw");
        el.querySelectorAll(".gafw,.gafw4").forEach((bar) => bar.remove());
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, skip]);

  return null;
}

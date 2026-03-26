"use client";

import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";

export default function StickyFooterBanner() {
  const { isSubscriber, hasDismissedStickyFooter, dismissStickyFooter } = useUser();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isSubscriber || hasDismissedStickyFooter) return;
    const timer = setTimeout(() => setVisible(true), 60000);
    return () => clearTimeout(timer);
  }, [isSubscriber, hasDismissedStickyFooter]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-primary)] text-white py-3 px-4 z-50 flex items-center justify-center gap-4 text-sm shadow-lg">
      <span>Go ad-free and get $50+ in free eBooks for just $20/year</span>
      <Link
        href="/subscribe?utm_source=sticky-footer"
        className="px-4 py-1.5 bg-[var(--color-secondary)] text-[var(--color-primary)] font-semibold rounded-lg text-sm hover:bg-[var(--color-secondary-light)] transition-colors"
      >
        Subscribe Now
      </Link>
      <button
        onClick={dismissStickyFooter}
        className="text-white/60 hover:text-white text-lg ml-2"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

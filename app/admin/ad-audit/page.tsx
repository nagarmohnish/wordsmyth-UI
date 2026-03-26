"use client";

const adCoverage: Record<string, string[]> = {
  "/": ["home-top-leaderboard", "home-sidebar-rectangle", "home-bottom-banner"],
  "/wild": ["wild-top-banner", "wild-between-content", "wild-bottom-banner"],
  "/wild/[word]": ["wild-word-top-banner", "wild-word-inline", "wild-word-sidebar"],
  "/we": ["we-top-banner", "we-bottom-banner"],
  "/we/[word]": ["we-word-top-banner", "we-word-inline", "we-word-sidebar-rectangle"],
  "/activities": ["activities-top-leaderboard", "activities-between-cards", "activities-sidebar-rectangle", "activities-bottom-banner"],
  "/activities/[activity]": ["activity-top-banner", "activity-bottom-banner"],
  "/vocabulary-center": ["vocab-top-banner", "vocab-sidebar-rectangle"],
  "/teacher-tools": ["teacher-top-banner", "teacher-gated-banner"],
  "/shop": ["shop-top-banner"],
  "/shop/checkout": ["shop-checkout-bottom"],
  "/subscribe": ["subscribe-top-banner"],
  "/support": [],
  "/login": ["login-top-banner"],
  "/signup": ["signup-top-banner"],
  "/account": ["account-top-banner"],
  "/checkout": ["checkout-bottom-banner"],
  "/faq": ["faq-top-banner", "faq-bottom-banner"],
  "/about": ["about-top-banner", "about-bottom-banner"],
  "/contact": ["contact-top-banner", "contact-bottom-banner"],
  "/privacy": ["privacy-top-banner", "privacy-bottom-banner"],
  "/terms": ["terms-top-banner", "terms-bottom-banner"],
};

export default function AdAuditPage() {
  const pages = Object.entries(adCoverage);
  const totalSlots = pages.reduce((sum, [, slots]) => sum + slots.length, 0);
  const pagesWithNoAds = pages.filter(([, slots]) => slots.length === 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2 font-[family-name:var(--font-heading)]">Ad Coverage Audit</h1>
      <p className="text-[var(--color-text-light)] mb-6">Admin tool to verify ad slot placement across all pages.</p>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[var(--color-bg-light)] rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-[var(--color-primary)]">{pages.length}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Total Pages</p>
        </div>
        <div className="bg-[var(--color-bg-light)] rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-[var(--color-accent)]">{totalSlots}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Total Ad Slots</p>
        </div>
        <div className={`rounded-xl p-5 text-center ${pagesWithNoAds.length > 0 ? "bg-red-50" : "bg-green-50"}`}>
          <p className={`text-3xl font-bold ${pagesWithNoAds.length > 0 ? "text-red-600" : "text-green-600"}`}>
            {pagesWithNoAds.length}
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">Pages with No Ads</p>
        </div>
      </div>

      {/* Page List */}
      <div className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-bg-light)]">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-[var(--color-text-muted)]">Route</th>
              <th className="text-left px-5 py-3 font-medium text-[var(--color-text-muted)]">Ad Slots</th>
              <th className="text-center px-5 py-3 font-medium text-[var(--color-text-muted)]">Count</th>
              <th className="text-center px-5 py-3 font-medium text-[var(--color-text-muted)]">Status</th>
            </tr>
          </thead>
          <tbody>
            {pages.map(([route, slots]) => (
              <tr key={route} className={`border-t border-[var(--color-border)] ${slots.length === 0 ? "bg-red-50" : ""}`}>
                <td className="px-5 py-3 font-mono text-xs text-[var(--color-primary)]">{route}</td>
                <td className="px-5 py-3">
                  {slots.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {slots.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-[var(--color-bg-light)] text-xs rounded text-[var(--color-text-light)]">{s}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-red-500 text-xs font-medium">No ad slots (intentional — monetization page)</span>
                  )}
                </td>
                <td className="px-5 py-3 text-center font-medium">{slots.length}</td>
                <td className="px-5 py-3 text-center">
                  {slots.length > 0 ? (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Covered</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">Exempt</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-[var(--color-bg-light)] rounded-xl text-sm text-[var(--color-text-light)]">
        <strong className="text-[var(--color-primary)]">Note:</strong> The /support page is intentionally exempt from ads — it IS a monetization page. All other content pages have at least one ad slot. The Activities page (previously unmonetized) now has 4 ad slots for full coverage.
      </div>
    </div>
  );
}

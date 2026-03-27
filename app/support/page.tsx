"use client";

import Link from "next/link";
import DonationWidget from "@/components/DonationWidget";

export default function SupportPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        backgroundColor: "#18AD4A",
        color: "white", padding: "60px 20px", textAlign: "center",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.8em", opacity: 0.6, marginBottom: "16px" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span>Support</span>
          </p>
          <h1 style={{
            fontSize: "2.4em", fontWeight: "800", margin: "0 0 12px 0", lineHeight: 1.2,
            fontFamily: "'Poppins', var(--font-wild), sans-serif",
          }}>
            Every Child Deserves<br />the Gift of Words
          </h1>
          <p style={{ fontSize: "1.1em", opacity: 0.85, lineHeight: 1.6, maxWidth: "550px", margin: "0 auto" }}>
            Free since 1998. 50,000+ students daily. 120+ countries. Your support keeps it that way.
          </p>
        </div>
      </section>

      {/* Single Donation Widget */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
        <DonationWidget
          placement="inline"
          utmSource="support-page"
        />
      </section>

      {/* Why — short & crisp */}
      <section style={{ backgroundColor: "#fafafa", padding: "50px 20px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "1.6em", fontWeight: "800", color: "#333", textAlign: "center",
            marginBottom: "24px", fontFamily: "'Poppins', var(--font-wild), sans-serif",
          }}>
            Why It Matters
          </h2>

          <div style={{ fontSize: "1em", lineHeight: 1.8, color: "#444" }}>
            <p style={{ marginBottom: "16px" }}>
              Wordsmyth was built in 1998 with one belief: <strong style={{ color: "#333" }}>no child should be denied access to a great dictionary because of money.</strong>
            </p>
            <p style={{ marginBottom: "16px" }}>
              No venture capital. No data harvesting. No paywalls. Just a small team keeping quality education free for every child who needs it.
            </p>
            <p style={{ marginBottom: "16px" }}>
              <strong style={{ color: "#333" }}>Keeping it free gets harder every year.</strong> Server costs rise, ad revenue declines, and demand for new languages and tools keeps growing. We refuse to compromise — so we&apos;re asking you.
            </p>

            <div style={{
              borderLeft: "4px solid #18AD4A", padding: "14px 20px", margin: "24px 0",
              backgroundColor: "#f0faf0", borderRadius: "0 8px 8px 0",
              fontStyle: "italic", color: "#333", fontSize: "0.95em", lineHeight: 1.7,
            }}>
              &ldquo;My teacher found Wordsmyth online and suddenly I could look up any English word. That dictionary helped me learn English. Today I&apos;m studying to become a teacher myself.&rdquo;
              <div style={{ marginTop: "8px", fontStyle: "normal", fontWeight: "600", color: "#333", fontSize: "0.85em" }}>
                &mdash; Maria, age 22, Guatemala
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section style={{ padding: "50px 20px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{
            textAlign: "center", fontSize: "1.5em", fontWeight: "800", color: "#333",
            marginBottom: "30px", fontFamily: "'Poppins', var(--font-wild), sans-serif",
          }}>
            The Impact So Far
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", textAlign: "center", marginBottom: "40px" }}>
            {[
              { num: "27", label: "Years free", color: "#333" },
              { num: "50K+", label: "Daily students", color: "#18AD4A" },
              { num: "120+", label: "Countries", color: "#3d9739" },
              { num: "14,000+", label: "Words defined", color: "#333" },
            ].map((s) => (
              <div key={s.label}>
                <p style={{ fontSize: "2em", fontWeight: "800", color: s.color, margin: "0 0 4px 0" }}>{s.num}</p>
                <p style={{ fontSize: "0.8em", color: "#999" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            {[
              { q: "My students love the illustrations and activities. Wordsmyth keeps them engaged with new vocabulary every week.", name: "Mrs. Rodriguez", role: "3rd Grade Teacher, Austin TX", color: "#18AD4A" },
              { q: "One of the few sites I trust completely for age-appropriate definitions. A lifesaver for homeschooling.", name: "David K.", role: "Homeschool Parent", color: "#3d9739" },
              { q: "The Word Explorer helps me understand big words, and the games make learning fun!", name: "Amara, age 11", role: "Student", color: "#18AD4A" },
            ].map((t) => (
              <div key={t.name} style={{ backgroundColor: "#fafafa", borderRadius: "12px", padding: "20px", border: "1px solid #f0f0f0" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "0.9em", marginBottom: "12px" }}>
                  {t.name.charAt(0)}
                </div>
                <p style={{ fontSize: "0.85em", color: "#555", lineHeight: 1.6, fontStyle: "italic", marginBottom: "12px" }}>
                  &ldquo;{t.q}&rdquo;
                </p>
                <p style={{ fontSize: "0.85em", fontWeight: "700", color: "#333", margin: 0 }}>{t.name}</p>
                <p style={{ fontSize: "0.75em", color: "#999", margin: 0 }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

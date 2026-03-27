"use client";

import { useState } from "react";
import Link from "next/link";

type FrequencyTab = "one-time" | "monthly";

const oneTimeAmounts = [
  { value: 5, impact: "Keeps the dictionary free for 10 students for a month" },
  { value: 10, impact: "Helps us add new illustrations and animations" },
  { value: 25, impact: "Supports Spanish & Chinese translation development" },
  { value: 50, impact: "Funds a full month of server costs" },
];

const monthlyAmounts = [
  { value: 3, impact: "Steady support that helps us plan ahead" },
  { value: 5, impact: "Keeps the dictionary free for 50 students monthly" },
  { value: 10, impact: "Helps fund ongoing translation and content work" },
];

const paymentLogos = [
  { name: "Visa", bg: "#1a1f71" },
  { name: "Mastercard", bg: "#eb001b" },
  { name: "PayPal", bg: "#003087" },
  { name: "Apple Pay", bg: "#333333" },
];

export default function SupportPage() {
  const [frequency, setFrequency] = useState<FrequencyTab>("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const amounts = frequency === "one-time" ? oneTimeAmounts : monthlyAmounts;
  const displayAmount = isCustom ? (Number(customAmount) || 0) : (selectedAmount || 0);

  const handleAmountSelect = (value: number) => {
    setSelectedAmount(value);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomFocus = () => {
    setIsCustom(true);
    setSelectedAmount(null);
  };

  const handleFrequencyChange = (tab: FrequencyTab) => {
    setFrequency(tab);
    setIsCustom(false);
    setCustomAmount("");
    setSelectedAmount(tab === "one-time" ? 25 : 5);
  };

  const selectedImpact = isCustom
    ? "Every dollar makes a difference for students around the world"
    : amounts.find((a) => a.value === selectedAmount)?.impact || "";

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
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
          <p style={{ fontSize: "1.1em", opacity: 0.8, lineHeight: 1.6, maxWidth: "550px", margin: "0 auto" }}>
            For 27 years, Wordsmyth has been a free lifeline for children who need it most. Your support keeps it that way.
          </p>
        </div>
      </section>

      {/* Contribution Widget — kept at top */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "30px" }}>
          {/* Amount Selection */}
          <div>
            <h2 style={{
              fontSize: "1.5em", fontWeight: "800", color: "#1a1a2e", marginBottom: "20px",
              fontFamily: "'Poppins', var(--font-wild), sans-serif",
            }}>
              Choose Your Contribution
            </h2>

            {/* Frequency Toggle */}
            <div style={{ display: "inline-flex", backgroundColor: "#f5f5f5", borderRadius: "10px", padding: "3px", marginBottom: "24px" }}>
              {(["one-time", "monthly"] as FrequencyTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleFrequencyChange(tab)}
                  style={{
                    padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "pointer",
                    fontSize: "0.85em", fontWeight: "600",
                    backgroundColor: frequency === tab ? "#fff" : "transparent",
                    color: frequency === tab ? "#1a1a2e" : "#999",
                    boxShadow: frequency === tab ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {tab === "one-time" ? "One-time" : "Monthly"}
                </button>
              ))}
            </div>

            {/* Amount Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              {amounts.map((a) => (
                <button
                  key={a.value}
                  onClick={() => handleAmountSelect(a.value)}
                  style={{
                    padding: "14px 16px", borderRadius: "12px", border: "2px solid",
                    borderColor: selectedAmount === a.value && !isCustom ? "#18AD4A" : "#e8e8e8",
                    backgroundColor: selectedAmount === a.value && !isCustom ? "#f0faf0" : "#fff",
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: "1.3em", fontWeight: "800", color: "#1a1a2e" }}>
                    ${a.value}{frequency === "monthly" ? <span style={{ fontSize: "0.6em", fontWeight: "400", color: "#999" }}>/mo</span> : ""}
                  </span>
                  <p style={{ fontSize: "0.78em", color: "#888", margin: "4px 0 0 0" }}>{a.impact}</p>
                </button>
              ))}
            </div>

            {/* Custom */}
            <div style={{
              padding: "14px 16px", borderRadius: "12px", border: "2px solid",
              borderColor: isCustom ? "#18AD4A" : "#e8e8e8",
              backgroundColor: isCustom ? "#f0faf0" : "#fff",
            }}>
              <label style={{ fontSize: "0.85em", fontWeight: "600", color: "#1a1a2e", display: "block", marginBottom: "6px" }}>
                Custom Amount
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#999", fontWeight: "600" }}>$</span>
                <input
                  type="number"
                  min="1"
                  value={customAmount}
                  onFocus={handleCustomFocus}
                  onChange={(e) => { setCustomAmount(e.target.value); setIsCustom(true); setSelectedAmount(null); }}
                  placeholder="Enter amount"
                  style={{ width: "100%", paddingLeft: "24px", padding: "8px 12px 8px 24px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "0.9em" }}
                />
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div>
            <div style={{
              backgroundColor: "#fff", border: "1px solid #e8e8e8", borderRadius: "16px",
              padding: "24px", position: "sticky", top: "80px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}>
              <h3 style={{ fontSize: "1.1em", fontWeight: "700", color: "#1a1a2e", marginBottom: "16px" }}>
                Your Contribution
              </h3>
              <div style={{ textAlign: "center", padding: "20px 0", borderBottom: "1px solid #f0f0f0" }}>
                <p style={{ fontSize: "2.5em", fontWeight: "800", color: "#18AD4A", margin: 0 }}>
                  ${displayAmount > 0 ? displayAmount : "0"}
                </p>
                <p style={{ fontSize: "0.8em", color: "#999", marginTop: "4px" }}>
                  {frequency === "one-time" ? "One-time contribution" : "Per month"}
                </p>
              </div>
              <button
                disabled={displayAmount <= 0}
                style={{
                  width: "100%", padding: "12px", border: "none", borderRadius: "10px",
                  fontWeight: "700", fontSize: "0.9em", cursor: displayAmount > 0 ? "pointer" : "default",
                  backgroundColor: displayAmount > 0 ? "#18AD4A" : "#e8e8e8",
                  color: displayAmount > 0 ? "#fff" : "#bbb",
                  marginTop: "16px",
                }}
              >
                Contribute ${displayAmount > 0 ? displayAmount : "..."}{frequency === "monthly" ? "/mo" : ""}
              </button>

              <div style={{ marginTop: "14px", padding: "10px", backgroundColor: "#fafafa", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
                <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "1px", color: "#bbb", textAlign: "center", fontWeight: "600", marginBottom: "6px" }}>Payment processing by</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                  {paymentLogos.map((logo) => (
                    <div key={logo.name} style={{ width: "44px", height: "26px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "7px", fontWeight: "bold", backgroundColor: logo.bg }}>
                      {logo.name}
                    </div>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: "9px", color: "#bbb", textAlign: "center", marginTop: "10px", lineHeight: 1.5 }}>
                Your contribution is not tax-deductible. Wordsmyth is an educational service, not a registered nonprofit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Story — emotional, mission-driven ── */}
      <section style={{ backgroundColor: "#fafafa", padding: "60px 20px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>

          <h2 style={{
            fontSize: "1.8em", fontWeight: "800", color: "#1a1a2e", textAlign: "center",
            marginBottom: "30px", lineHeight: 1.3,
            fontFamily: "'Poppins', var(--font-wild), sans-serif",
          }}>
            Why We Do This
          </h2>

          {/* Story block */}
          <div style={{ fontSize: "1em", lineHeight: 1.9, color: "#444" }}>
            <p style={{ marginBottom: "18px" }}>
              In 1998, a small group of educators and linguists had a simple idea: <strong style={{ color: "#1a1a2e" }}>every child, regardless of where they live or what their family can afford, should have access to a great dictionary.</strong>
            </p>
            <p style={{ marginBottom: "18px" }}>
              That idea became Wordsmyth.
            </p>
            <p style={{ marginBottom: "18px" }}>
              Back then, most quality dictionaries were locked behind expensive paywalls or only available in well-funded school libraries. Children in rural communities, underfunded schools, and developing countries simply did without. They struggled with unfamiliar words and no one to explain them. Their curiosity met a closed door.
            </p>
            <p style={{ marginBottom: "18px" }}>
              <strong style={{ color: "#1a1a2e" }}>We opened that door.</strong>
            </p>

            <div style={{
              borderLeft: "4px solid #18AD4A", padding: "16px 24px", margin: "28px 0",
              backgroundColor: "#f0faf0", borderRadius: "0 8px 8px 0",
              fontStyle: "italic", color: "#333", fontSize: "1.05em", lineHeight: 1.7,
            }}>
              &ldquo;I grew up in a small town in Guatemala. We had no library. My teacher found Wordsmyth online and suddenly I could look up any English word, hear how to say it, and see a picture. That dictionary helped me learn English. Today I&apos;m studying to become a teacher myself &mdash; so I can give other kids the same chance someone gave me.&rdquo;
              <div style={{ marginTop: "10px", fontStyle: "normal", fontWeight: "600", color: "#1a1a2e", fontSize: "0.9em" }}>
                &mdash; Maria, age 22, Guatemala
              </div>
            </div>

            <p style={{ marginBottom: "18px" }}>
              Maria&apos;s story isn&apos;t unique. Every day, <strong style={{ color: "#1a1a2e" }}>over 50,000 children in more than 120 countries</strong> use Wordsmyth to look up words, build vocabulary, and discover the joy of language. Many of them are in classrooms with no textbooks, in homes with no bookshelves, in communities where a free online dictionary is the only reference tool they have.
            </p>
            <p style={{ marginBottom: "18px" }}>
              For 27 years, we&apos;ve kept Wordsmyth free. No venture capital. No investors demanding growth at all costs. No data harvesting. Just a small, stubborn team that believes <strong style={{ color: "#1a1a2e" }}>words are the building blocks of opportunity</strong>, and no child should be denied them because of money.
            </p>

            <div style={{
              borderLeft: "4px solid #f5a623", padding: "16px 24px", margin: "28px 0",
              backgroundColor: "#fdf6ec", borderRadius: "0 8px 8px 0",
              fontStyle: "italic", color: "#333", fontSize: "1.05em", lineHeight: 1.7,
            }}>
              &ldquo;I teach 3rd grade in Detroit. Half my students read below grade level. Wordsmyth is the one resource I can count on &mdash; it&apos;s always free, always there, always age-appropriate. When my school cut our library budget last year, Wordsmyth became our library. I don&apos;t know what we&apos;d do without it.&rdquo;
              <div style={{ marginTop: "10px", fontStyle: "normal", fontWeight: "600", color: "#1a1a2e", fontSize: "0.9em" }}>
                &mdash; Mrs. Williams, 3rd Grade Teacher, Detroit MI
              </div>
            </div>

            <p style={{ marginBottom: "18px" }}>
              But here&apos;s the truth we need to share with you: <strong style={{ color: "#1a1a2e" }}>keeping Wordsmyth free gets harder every year.</strong>
            </p>
            <p style={{ marginBottom: "18px" }}>
              Server costs rise. Technology evolves. The demand for Spanish and Chinese translations grows. Teachers ask for new tools. Parents ask for new activities. And ad revenue &mdash; which has funded most of our work for decades &mdash; has been declining steadily as the internet changes around us.
            </p>
            <p style={{ marginBottom: "18px" }}>
              We refuse to put our dictionary behind a paywall. We refuse to harvest children&apos;s data. We refuse to fill the site with intrusive ads that distract from learning.
            </p>
            <p style={{ marginBottom: "18px" }}>
              <strong style={{ color: "#1a1a2e" }}>So we&apos;re asking you.</strong>
            </p>

            <div style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              color: "white", borderRadius: "12px", padding: "28px 32px",
              margin: "30px 0", textAlign: "center",
            }}>
              <p style={{ fontSize: "1.2em", fontWeight: "600", margin: "0 0 6px 0", opacity: 0.9 }}>
                A contribution of just $5 keeps Wordsmyth free for 10 students for an entire month.
              </p>
              <p style={{ fontSize: "0.9em", opacity: 0.6, margin: "0 0 16px 0" }}>
                $25 funds a full month of Spanish and Chinese translation work.
              </p>
              <a
                href="#top"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{
                  display: "inline-block", padding: "12px 32px",
                  background: "linear-gradient(135deg, #18AD4A, #12963f)",
                  color: "#fff", textDecoration: "none", fontWeight: "700",
                  borderRadius: "10px", fontSize: "1em",
                }}
              >
                Contribute Now
              </a>
            </div>

            <p style={{ marginBottom: "18px" }}>
              When a child in a small village in Kenya looks up the word &ldquo;courage&rdquo; for the first time &mdash; reads the definition, hears the pronunciation, sees the example sentence &mdash; something changes in them. A new word isn&apos;t just vocabulary. It&apos;s a new thought they can think. A new feeling they can name. A new idea they can express.
            </p>
            <p style={{ marginBottom: "18px" }}>
              <strong style={{ color: "#1a1a2e" }}>You can be the reason that moment happens.</strong>
            </p>
            <p style={{ marginBottom: "0" }}>
              Not someday. Today. Right now. For a child you&apos;ll never meet, in a classroom you&apos;ll never visit, in a country you may never travel to. Your contribution doesn&apos;t just support a website &mdash; it opens a door that can never be closed again.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section style={{ padding: "50px 20px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{
            textAlign: "center", fontSize: "1.5em", fontWeight: "800", color: "#1a1a2e",
            marginBottom: "30px", fontFamily: "'Poppins', var(--font-wild), sans-serif",
          }}>
            The Impact So Far
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", textAlign: "center", marginBottom: "40px" }}>
            {[
              { num: "27", label: "Years free", color: "#1a1a2e" },
              { num: "50K+", label: "Daily students", color: "#18AD4A" },
              { num: "120+", label: "Countries", color: "#f5a623" },
              { num: "14,000+", label: "Words defined", color: "#e8453c" },
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
              { q: "Wordsmyth has been my go-to classroom resource for over a decade. My students love the illustrations and the activities keep them engaged with new vocabulary every week.", name: "Mrs. Rodriguez", role: "3rd Grade Teacher, Austin TX", color: "#1a1a2e" },
              { q: "As a homeschool parent, finding free quality resources is everything. Wordsmyth is one of the few sites I trust completely for age-appropriate definitions and examples.", name: "David K.", role: "Homeschool Parent", color: "#18AD4A" },
              { q: "I use Wordsmyth every day for my homework. The Word Explorer helps me understand big words, and the games make learning fun instead of boring!", name: "Amara, age 11", role: "Student", color: "#f5a623" },
            ].map((t) => (
              <div key={t.name} style={{ backgroundColor: "#fafafa", borderRadius: "12px", padding: "20px", border: "1px solid #f0f0f0" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "0.9em", marginBottom: "12px" }}>
                  {t.name.charAt(0)}
                </div>
                <p style={{ fontSize: "0.85em", color: "#555", lineHeight: 1.6, fontStyle: "italic", marginBottom: "12px" }}>
                  &ldquo;{t.q}&rdquo;
                </p>
                <p style={{ fontSize: "0.85em", fontWeight: "700", color: "#1a1a2e", margin: 0 }}>{t.name}</p>
                <p style={{ fontSize: "0.75em", color: "#999", margin: 0 }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        background: "linear-gradient(135deg, #18AD4A 0%, #12963f 100%)",
        color: "white", padding: "50px 20px", textAlign: "center",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "1.8em", fontWeight: "800", margin: "0 0 12px 0",
            fontFamily: "'Poppins', var(--font-wild), sans-serif",
          }}>
            Be Part of the Story
          </h2>
          <p style={{ fontSize: "1.05em", opacity: 0.9, lineHeight: 1.6, marginBottom: "24px" }}>
            Every contribution, no matter how small, writes the next chapter. A chapter where every child has the words to dream bigger.
          </p>
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{
              display: "inline-block", padding: "14px 36px",
              backgroundColor: "#fff", color: "#18AD4A",
              textDecoration: "none", fontWeight: "700", borderRadius: "10px",
              fontSize: "1.05em",
            }}
          >
            Contribute Now
          </a>
        </div>
      </section>
    </div>
  );
}

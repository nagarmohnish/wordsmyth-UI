"use client";

import { useState } from "react";
import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";

const faqs = [
  { q: "What is Wordsmyth?", a: "Wordsmyth is a free online educational dictionary platform designed for children, students, and teachers. It includes the WILD illustrated dictionary for young learners (K-2), a Children's Dictionary/Word Explorer (grades 3-8), vocabulary activities, and teacher tools." },
  { q: "Is Wordsmyth free to use?", a: "Yes! The core dictionary and many features are completely free. A premium subscription ($20/year) removes ads, unlocks Spanish and Chinese translations, provides full access to Teacher Tools and Vocabulary Center, and includes all 14 Wordsmyth eBooks (valued at $50+)." },
  { q: "What is WILD?", a: "WILD stands for Wordsmyth Illustrated Learner's Dictionary. It's designed for beginning readers (K-2) and features three ways to explore words: Book (alphabetical), World (visual scenes), and Collections (thematic groups)." },
  { q: "How do I subscribe?", a: "Visit our Subscribe page to choose a plan. Individual subscriptions are $20/year. Educational group plans are available with custom pricing — contact us for details." },
  { q: "What's included in the subscription?", a: "Ad-free experience, Spanish and Chinese translations, full Teacher Tools access, Vocabulary Center with progress tracking, custom glossaries, and all 14 Wordsmyth eBooks for free." },
  { q: "How do I access the free eBooks?", a: "After subscribing, you'll receive a coupon code on your confirmation page and in your account settings. Use this code in the Wordsmyth Shop to download all 14 eBooks at no additional cost." },
  { q: "Can I use Wordsmyth in my classroom?", a: "Absolutely! Wordsmyth is used by teachers worldwide. Our Teacher Tools include class management, glossary maker, assignment creator, and student progress tracking." },
  { q: "How do I reset my password?", a: "We now offer passwordless login! Simply use 'Sign in with Google' or request a magic link sent to your email. No password needed." },
  { q: "How can I support Wordsmyth?", a: "You can support us by subscribing, making a contribution on our Support page, purchasing eBooks from our Shop, or simply sharing Wordsmyth with other teachers and parents." },
  { q: "Is my data safe?", a: "Yes. We take privacy seriously, especially for children's data. We comply with COPPA requirements and do not sell personal information. See our Privacy Policy for full details." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SidebarLayout variant="we">
      <p style={{ fontSize: "0.8em", color: "#888", marginBottom: "8px" }}>
        <Link href="/" style={{ color: "#004B97" }}>Home</Link> &gt; FAQ
      </p>

      <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
        Frequently Asked Questions
      </h2>

      <div style={{ fontSize: "0.85em" }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid #eee", padding: "8px 0" }}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                background: "none", border: "none", cursor: "pointer", width: "100%",
                textAlign: "left", padding: "4px 0", fontWeight: "bold", color: "#004B97",
                fontSize: "1em", display: "flex", justifyContent: "space-between", alignItems: "center",
              }}
            >
              <span>{faq.q}</span>
              <span style={{ color: "#888" }}>{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <p style={{ margin: "6px 0 2px 0", color: "#333", lineHeight: 1.5, paddingLeft: "8px" }}>
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "16px", fontSize: "0.85em" }}>
        Still have questions?{" "}
        <Link href="/contact" style={{ color: "#004B97" }}>Contact us</Link>.
      </div>
    </SidebarLayout>
  );
}

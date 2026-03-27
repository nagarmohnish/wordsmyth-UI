"use client";

import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";
import AdSlot from "@/components/AdSlot";
import GoAdFreeWidget from "@/components/GoAdFreeWidget";
import { useUser } from "@/contexts/UserContext";

export default function HomePage() {
  const { isSubscriber } = useUser();

  return (
    <SidebarLayout variant="we">
      {/* Header ad + Go Ads-Free overlay */}
      {!isSubscriber && (
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <AdSlot slotId="home-header-leaderboard" size="leaderboard" position="top" />
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            display: "flex", justifyContent: "center",
          }}>
            <GoAdFreeWidget variant="banner" />
          </div>
        </div>
      )}

      {/* Shop link banner */}
      <div
        style={{
          backgroundColor: "#FFFFC6",
          border: "1px solid #E0D890",
          padding: "8px 12px",
          marginBottom: "12px",
          fontSize: "0.85em",
          lineHeight: 1.5,
        }}
      >
        <strong>Visit our Bookstore!</strong>{" "}
        Wordsmyth eBooks, workbooks, and classroom resources.{" "}
        <Link href="/shop" style={{ color: "#004B97" }}>
          Shop now &raquo;
        </Link>
      </div>

      {/* Two-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "48% 48%",
          gap: "4%",
          fontSize: "0.85em",
          lineHeight: 1.5,
        }}
      >
        {/* Left column: Our Children's Dictionaries */}
        <div>
          <h2
            style={{
              color: "#18AD4A",
              fontSize: "1.1em",
              fontWeight: "bold",
              margin: "0 0 8px 0",
              borderBottom: "1px solid #ccc",
              paddingBottom: "4px",
            }}
          >
            Our Children&apos;s Dictionaries
          </h2>

          {/* WILD (K-2) */}
          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                width: "100%",
                height: "60px",
                backgroundColor: "#E8F5E9",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8em",
                color: "#888",
                marginBottom: "6px",
              }}
            >
              [WILD Dictionary Image]
            </div>
            <p style={{ margin: "0 0 4px 0" }}>
              <Link href="/wild" style={{ color: "#004B97", fontWeight: "bold" }}>
                WILD (K-2)
              </Link>
            </p>
            <p style={{ margin: 0, color: "#333" }}>
              The Wordsmyth Illustrated Learner&apos;s Dictionary is an illustrated
              dictionary designed for young readers in grades K-2. Explore words
              through pictures, simple definitions, and example sentences.
            </p>
          </div>

          {/* Word Explorer Suite (3-8) */}
          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                width: "100%",
                height: "60px",
                backgroundColor: "#E8F5E9",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8em",
                color: "#888",
                marginBottom: "6px",
              }}
            >
              [Word Explorer Image]
            </div>
            <p style={{ margin: "0 0 4px 0" }}>
              <Link href="/we" style={{ color: "#004B97", fontWeight: "bold" }}>
                Word Explorer Children&apos;s Dictionary Suite (3-8)
              </Link>
            </p>
            <p style={{ margin: 0, color: "#333" }}>
              A comprehensive dictionary for students in grades 3-8, including
              definitions, example sentences, synonyms, antonyms, related words,
              and word parts. Includes both an Elementary and Intermediate level
              dictionary.
            </p>
          </div>
        </div>

        {/* Right column: Vocabulary Learning */}
        <div>
          <h2
            style={{
              color: "#18AD4A",
              fontSize: "1.1em",
              fontWeight: "bold",
              margin: "0 0 8px 0",
              borderBottom: "1px solid #ccc",
              paddingBottom: "4px",
            }}
          >
            Vocabulary Learning
          </h2>

          {/* Activities */}
          <div style={{ marginBottom: "14px" }}>
            <p style={{ margin: "0 0 4px 0" }}>
              <Link href="/activities" style={{ color: "#004B97", fontWeight: "bold" }}>
                Activities
              </Link>
            </p>
            <p style={{ margin: 0, color: "#333" }}>
              <strong>Study</strong> vocabulary with flashcards and matching
              exercises. <strong>Play</strong> word games including crossword
              puzzles, word scrambles, and hangman. <strong>Assess</strong>{" "}
              learning with quizzes and spelling tests.
            </p>
          </div>

          {/* WVI Levels */}
          <div style={{ marginBottom: "14px" }}>
            <p style={{ margin: "0 0 4px 0", fontWeight: "bold", color: "#004B97" }}>
              WVI Levels
            </p>
            <p style={{ margin: 0, color: "#333" }}>
              The Wordsmyth Vocabulary Index (WVI) assigns a difficulty level to
              each word, helping teachers and students select vocabulary
              appropriate for their grade level.
            </p>
          </div>

          {/* Wordlist Maker */}
          <div style={{ marginBottom: "14px" }}>
            <p style={{ margin: "0 0 4px 0" }}>
              <Link href="/vocabulary-center" style={{ color: "#004B97", fontWeight: "bold" }}>
                Wordlist Maker
              </Link>
            </p>
            <p style={{ margin: 0, color: "#333" }}>
              Create custom word lists for your classroom or personal study.
              Generate glossaries, export lists, and use them with Wordsmyth
              activities.
            </p>
          </div>
        </div>
      </div>

      {/* Subscription blocks */}
      <div
        style={{
          marginTop: "16px",
          borderTop: "1px solid #ccc",
          paddingTop: "12px",
          fontSize: "0.85em",
          lineHeight: 1.5,
        }}
      >
        {/* Go Ads-Free banner */}
        <div
          style={{
            backgroundColor: "#FFFFC6",
            border: "1px solid #E0D890",
            padding: "10px 12px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: "0 0 4px 0", fontWeight: "bold", color: "#333", fontSize: "0.95em" }}>
            Ads are like speed bumps on the road to learning.
          </p>
          <p style={{ margin: 0, color: "#555" }}>
            Go ads-free for just $20/year and give your child a smooth ride.{" "}
            <Link href="/subscribe?utm_source=homepage-banner" style={{ color: "#004B97", fontWeight: "bold" }}>
              Go Ads-Free &raquo;
            </Link>
          </p>
        </div>

        {/* Individual subscription */}
        <div
          style={{
            backgroundColor: "#F0F8F0",
            border: "1px solid #ccc",
            padding: "10px 12px",
            marginBottom: "10px",
          }}
        >
          <p style={{ margin: "0 0 4px 0", fontWeight: "bold", color: "#18AD4A" }}>
            Individual Subscription
          </p>
          <p style={{ margin: 0, color: "#333" }}>
            Go ads-free and get access to all 14 Wordsmyth eBooks free! Only $20
            per year for families and individual users.{" "}
            <Link href="/subscribe" style={{ color: "#004B97" }}>
              Subscribe now &raquo;
            </Link>
          </p>
        </div>

        {/* Educational group subscription */}
        <div
          style={{
            backgroundColor: "#F0F8F0",
            border: "1px solid #ccc",
            padding: "10px 12px",
            marginBottom: "10px",
          }}
        >
          <p style={{ margin: "0 0 4px 0", fontWeight: "bold", color: "#18AD4A" }}>
            Educational Group Subscription
          </p>
          <p style={{ margin: 0, color: "#333" }}>
            Schools and districts can go ads-free for all students and
            teachers. Contact us at{" "}
            <a href="mailto:support@wordsmyth.net" style={{ color: "#004B97" }}>
              support@wordsmyth.net
            </a>{" "}
            for group pricing and site licenses.
          </p>
        </div>
      </div>

      {/* Footer ad + Go Ads-Free overlay */}
      {!isSubscriber && (
        <div style={{ position: "relative", marginTop: "16px" }}>
          <AdSlot slotId="home-footer-banner" size="banner" position="bottom" />
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            display: "flex", justifyContent: "center",
          }}>
            <GoAdFreeWidget variant="banner" />
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";
import dictionary from "@/data/dictionary.json";

type DictEntry = (typeof dictionary)[number];

const WILD_COLORS = ["#a53431", "#388cec", "#83b15b", "#eaaf45", "#a53431", "#388cec"];

export default function WildWordPage() {
  const params = useParams();
  const word = typeof params.word === "string" ? decodeURIComponent(params.word) : "";
  const decodedWord = word.toLowerCase();

  const entry: DictEntry | undefined = dictionary.find(
    (d) => d.word.toLowerCase() === decodedWord
  );

  if (!entry) {
    return (
      <SidebarLayout variant="wild">
        <div style={{ padding: "20px 10px", fontFamily: "var(--font-wild)" }}>
          <h2 style={{ color: "#a53431", fontSize: "1.4em", marginBottom: "8px" }}>
            Oops! Word not found.
          </h2>
          <p style={{ fontSize: "0.95em", color: "#333" }}>
            We couldn&apos;t find &ldquo;{decodedWord}&rdquo; in the WILD Dictionary.
            Try searching for another word!
          </p>
        </div>
      </SidebarLayout>
    );
  }

  const translations = entry.translations as Record<string, string>;
  const firstLetterColor = WILD_COLORS[entry.word.charCodeAt(0) % WILD_COLORS.length];

  return (
    <SidebarLayout variant="wild">
      <div style={{ fontFamily: "var(--font-wild)", fontSize: "0.85em", lineHeight: 1.6 }}>
        {/* Headword with colored first letter */}
        <div style={{ marginBottom: "4px" }}>
          <span style={{ fontSize: "2em", fontWeight: "bold" }}>
            <span style={{ color: firstLetterColor }}>{entry.word.charAt(0).toUpperCase()}</span>
            <span style={{ color: "#004B97" }}>{entry.word.slice(1)}</span>
          </span>
        </div>

        {/* Pronunciation and part of speech */}
        <div style={{ color: "#555", fontSize: "0.95em", marginBottom: "4px" }}>
          <span style={{ fontStyle: "italic" }}>({entry.pronunciation})</span>
          {"  "}
          <span style={{ fontStyle: "italic" }}>{entry.partOfSpeech}</span>
          {"  "}
          <span style={{ cursor: "pointer" }} title="Listen to pronunciation">🔊</span>
        </div>

        {/* Large illustration placeholder */}
        <div
          style={{
            width: "150px",
            height: "150px",
            backgroundColor: firstLetterColor,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "4em",
            fontWeight: "bold",
            margin: "10px 0 14px 0",
          }}
        >
          {entry.word.charAt(0).toUpperCase()}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #ddd", marginBottom: "10px" }} />

        {/* Definitions */}
        <div style={{ marginBottom: "14px" }}>
          {entry.definitions.map((def: { text: string; example: string }, idx: number) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <div>
                <span style={{ fontWeight: "bold", color: firstLetterColor }}>{idx + 1}.</span>{" "}
                <span>{def.text}</span>
              </div>
              {def.example && (
                <div style={{ fontStyle: "italic", color: "#555", marginLeft: "18px", marginTop: "2px" }}>
                  {def.example}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Synonyms */}
        {entry.synonyms.length > 0 && (
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontWeight: "bold", color: firstLetterColor }}>Synonyms:</span>{" "}
            {entry.synonyms.map((syn: string, i: number) => (
              <span key={syn}>
                {i > 0 && ", "}
                <Link href={`/wild/${encodeURIComponent(syn)}`} style={{ color: "#004B97" }}>
                  {syn}
                </Link>
              </span>
            ))}
          </div>
        )}

        {/* Antonyms */}
        {entry.antonyms.length > 0 && (
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontWeight: "bold", color: firstLetterColor }}>Antonyms:</span>{" "}
            {entry.antonyms.map((ant: string, i: number) => (
              <span key={ant}>
                {i > 0 && ", "}
                <Link href={`/wild/${encodeURIComponent(ant)}`} style={{ color: "#004B97" }}>
                  {ant}
                </Link>
              </span>
            ))}
          </div>
        )}

        {/* Related Words */}
        {entry.relatedWords.length > 0 && (
          <div style={{ marginTop: "14px", marginBottom: "14px" }}>
            <div
              style={{
                fontWeight: "bold",
                color: firstLetterColor,
                fontSize: "1em",
                borderBottom: "1px solid #ddd",
                paddingBottom: "3px",
                marginBottom: "6px",
              }}
            >
              Related Words
            </div>
            <div>
              {entry.relatedWords.map((rw: string, i: number) => (
                <span key={rw}>
                  {i > 0 && "  "}
                  <Link
                    href={`/wild/${encodeURIComponent(rw)}`}
                    style={{
                      color: "#004B97",
                      display: "inline-block",
                      padding: "2px 8px",
                      margin: "2px",
                      backgroundColor: firstLetterColor + "18",
                      borderRadius: "4px",
                      textDecoration: "none",
                    }}
                  >
                    {rw}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Translations (Subscriber feature) */}
        {translations && Object.keys(translations).length > 0 && (
          <div style={{ marginTop: "14px", marginBottom: "14px" }}>
            <div
              style={{
                fontWeight: "bold",
                color: firstLetterColor,
                fontSize: "1em",
                borderBottom: "1px solid #ddd",
                paddingBottom: "3px",
                marginBottom: "6px",
              }}
            >
              Translations
            </div>
            {Object.entries(translations).map(([lang, translation]) => (
              <div key={lang} style={{ marginBottom: "4px" }}>
                <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>{lang}:</span>{" "}
                <span style={{ color: "#888" }}>
                  🔒 <em>Subscriber feature</em> &mdash;{" "}
                  <Link href="/subscribe" style={{ color: "#004B97" }}>
                    Subscribe
                  </Link>{" "}
                  to view ({translation.charAt(0)}...)
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}

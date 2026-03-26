"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";
import dictionary from "@/data/dictionary.json";

type DictEntry = (typeof dictionary)[number];

export default function WeWordPage() {
  const params = useParams();
  const word = typeof params.word === "string" ? decodeURIComponent(params.word) : "";
  const decodedWord = word.toLowerCase();

  const entry: DictEntry | undefined = dictionary.find(
    (d) => d.word.toLowerCase() === decodedWord
  );

  if (!entry) {
    return (
      <SidebarLayout variant="we">
        <div style={{ padding: "20px 10px" }}>
          <h2 style={{ color: "#18AD4A", fontSize: "1.2em", marginBottom: "8px" }}>
            Word Not Found
          </h2>
          <p style={{ fontSize: "0.9em", color: "#333" }}>
            Sorry, we couldn&apos;t find an entry for &ldquo;{decodedWord}&rdquo; in the
            Children&apos;s Dictionary. Please try another search.
          </p>
        </div>
      </SidebarLayout>
    );
  }

  const translations = entry.translations as Record<string, string>;

  return (
    <SidebarLayout variant="we">
      <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "0.85em", lineHeight: 1.5 }}>
        {/* Headword + Pronunciation + Audio */}
        <div style={{ marginBottom: "6px" }}>
          <span style={{ fontSize: "1.8em", fontWeight: "bold", color: "#004B97" }}>
            {entry.word}
          </span>
          {"  "}
          <span style={{ fontStyle: "italic", color: "#555", fontSize: "1.1em" }}>
            ({entry.pronunciation})
          </span>
          {"  "}
          <span
            style={{ cursor: "pointer", fontSize: "1.1em" }}
            title="Listen to pronunciation"
          >
            🔊
          </span>
        </div>

        {/* Part of speech */}
        <div style={{ fontStyle: "italic", color: "#666", fontSize: "0.95em", marginBottom: "12px" }}>
          {entry.partOfSpeech}
        </div>

        {/* Horizontal rule */}
        <hr style={{ border: "none", borderTop: "1px solid #ccc", marginBottom: "10px" }} />

        {/* Definitions */}
        <div style={{ marginBottom: "14px" }}>
          {entry.definitions.map((def: { text: string; example: string }, idx: number) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <div>
                <span style={{ fontWeight: "bold", color: "#18AD4A" }}>{idx + 1}.</span>{" "}
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
            <span style={{ fontWeight: "bold", color: "#18AD4A" }}>Synonyms:</span>{" "}
            {entry.synonyms.map((syn: string, i: number) => (
              <span key={syn}>
                {i > 0 && ", "}
                <Link href={`/we/${encodeURIComponent(syn)}`} style={{ color: "#004B97" }}>
                  {syn}
                </Link>
              </span>
            ))}
          </div>
        )}

        {/* Antonyms */}
        {entry.antonyms.length > 0 && (
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontWeight: "bold", color: "#18AD4A" }}>Antonyms:</span>{" "}
            {entry.antonyms.map((ant: string, i: number) => (
              <span key={ant}>
                {i > 0 && ", "}
                <Link href={`/we/${encodeURIComponent(ant)}`} style={{ color: "#004B97" }}>
                  {ant}
                </Link>
              </span>
            ))}
          </div>
        )}

        {/* Word Explorer — Related Words */}
        {entry.relatedWords.length > 0 && (
          <div style={{ marginTop: "14px", marginBottom: "14px" }}>
            <div
              style={{
                fontWeight: "bold",
                color: "#18AD4A",
                fontSize: "1em",
                borderBottom: "1px solid #ccc",
                paddingBottom: "3px",
                marginBottom: "6px",
              }}
            >
              Word Explorer
            </div>
            <div>
              {entry.relatedWords.map((rw: string, i: number) => (
                <span key={rw}>
                  {i > 0 && ", "}
                  <Link href={`/we/${encodeURIComponent(rw)}`} style={{ color: "#004B97" }}>
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
                color: "#18AD4A",
                fontSize: "1em",
                borderBottom: "1px solid #ccc",
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

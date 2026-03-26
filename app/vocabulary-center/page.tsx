"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import SidebarLayout from "@/components/SidebarLayout";

const sampleLists = [
  { id: 1, name: "Science Unit 3", words: 12, progress: 75 },
  { id: 2, name: "Weekly Spelling", words: 10, progress: 40 },
  { id: 3, name: "SAT Vocabulary", words: 20, progress: 10 },
];

export default function VocabularyCenter() {
  const { isLoggedIn, role } = useUser();
  const [activeTab, setActiveTab] = useState<"lists" | "study" | "progress">("lists");

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "4px 12px",
    fontSize: "0.85em",
    fontFamily: "Verdana, sans-serif",
    border: "1px solid #ccc",
    borderBottom: active ? "1px solid #fff" : "1px solid #ccc",
    backgroundColor: active ? "#fff" : "#e8e8e8",
    color: active ? "#004B97" : "#333",
    fontWeight: active ? "bold" : "normal",
    cursor: "pointer",
    marginRight: "2px",
    marginBottom: "-1px",
    position: "relative" as const,
  });

  return (
    <SidebarLayout variant="we">
      <div style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.85em" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: "0.8em", color: "#666", marginBottom: "8px" }}>
          <Link href="/" style={{ color: "#004B97" }}>Home</Link>
          {" > "}
          <span>Vocabulary Center</span>
        </div>

        <h1 style={{ color: "#18AD4A", fontSize: "1.4em", fontWeight: "bold", margin: "0 0 4px 0" }}>
          Vocabulary Center
        </h1>
        <p style={{ color: "#555", fontSize: "0.9em", margin: "0 0 12px 0" }}>
          Create word lists, study with flashcards, and track your vocabulary progress.
        </p>

        {!isLoggedIn && (
          <div style={{
            backgroundColor: "#FFFFC6",
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "12px",
            fontSize: "0.9em",
          }}>
            <b style={{ color: "#18AD4A" }}>Sign in to access all features</b>
            <br />
            <span style={{ color: "#555" }}>Create word lists, track progress, and more.</span>
            <br />
            <Link
              href="/login"
              style={{
                display: "inline-block",
                marginTop: "6px",
                padding: "3px 12px",
                backgroundColor: "#18AD4A",
                color: "#fff",
                fontSize: "0.85em",
                textDecoration: "none",
                border: "1px solid #128a3b",
              }}
            >
              Log In
            </Link>
          </div>
        )}

        {/* Tabs */}
        <div style={{ borderBottom: "1px solid #ccc", marginBottom: "0" }}>
          <button
            onClick={() => setActiveTab("lists")}
            style={tabStyle(activeTab === "lists")}
          >
            Word Lists
          </button>
          <button
            onClick={() => setActiveTab("study")}
            style={tabStyle(activeTab === "study")}
          >
            Study
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            style={tabStyle(activeTab === "progress")}
          >
            Progress
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ border: "1px solid #ccc", borderTop: "none", padding: "12px", backgroundColor: "#fff" }}>
          {activeTab === "lists" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: 0 }}>My Word Lists</h2>
                <button style={{
                  padding: "3px 10px",
                  backgroundColor: "#18AD4A",
                  color: "#fff",
                  border: "1px solid #128a3b",
                  fontSize: "0.85em",
                  cursor: "pointer",
                }}>
                  + New List
                </button>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95em" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F0F8F0" }}>
                    <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>List Name</th>
                    <th style={{ textAlign: "center", padding: "4px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Words</th>
                    <th style={{ textAlign: "center", padding: "4px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Progress</th>
                    <th style={{ textAlign: "center", padding: "4px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleLists.map((list) => (
                    <tr key={list.id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "5px 8px" }}>
                        <a href="#" style={{ color: "#004B97", textDecoration: "none", fontWeight: "bold" }}>{list.name}</a>
                      </td>
                      <td style={{ padding: "5px 8px", textAlign: "center" }}>{list.words}</td>
                      <td style={{ padding: "5px 8px", textAlign: "center" }}>{list.progress}%</td>
                      <td style={{ padding: "5px 8px", textAlign: "center" }}>
                        <button style={{
                          padding: "2px 10px",
                          backgroundColor: "#004B97",
                          color: "#fff",
                          border: "1px solid #003a75",
                          fontSize: "0.85em",
                          cursor: "pointer",
                        }}>
                          Study
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "study" && (
            <div>
              <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0" }}>Study Modes</h2>
              <p style={{ color: "#555", margin: "0 0 12px 0" }}>Choose a word list and study mode to get started.</p>

              <table style={{ borderCollapse: "collapse", fontSize: "0.95em" }}>
                <tbody>
                  {["Flashcards", "Quiz", "Practice"].map((mode) => (
                    <tr key={mode} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "6px 10px", width: "30px", textAlign: "center" }}>
                        {mode === "Flashcards" ? "\uD83C\uDCCF" : mode === "Quiz" ? "\u2705" : "\u270F\uFE0F"}
                      </td>
                      <td style={{ padding: "6px 10px" }}>
                        <a href="#" style={{ color: "#004B97", textDecoration: "none", fontWeight: "bold" }}>{mode}</a>
                      </td>
                      <td style={{ padding: "6px 10px", color: "#555" }}>
                        {mode === "Flashcards" && "Review words with digital flashcards"}
                        {mode === "Quiz" && "Test yourself on word meanings"}
                        {mode === "Practice" && "Write and spell words from your lists"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "progress" && (
            <div>
              <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 10px 0" }}>Your Progress</h2>

              <table style={{ borderCollapse: "collapse", fontSize: "0.95em", marginBottom: "12px" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "6px 16px 6px 0" }}>
                      <b style={{ color: "#18AD4A", fontSize: "1.3em" }}>42</b>
                      <br />
                      <span style={{ color: "#666", fontSize: "0.85em" }}>Words Learned</span>
                    </td>
                    <td style={{ padding: "6px 16px" }}>
                      <b style={{ color: "#004B97", fontSize: "1.3em" }}>7</b>
                      <br />
                      <span style={{ color: "#666", fontSize: "0.85em" }}>Day Streak</span>
                    </td>
                    <td style={{ padding: "6px 16px" }}>
                      <b style={{ color: "#18AD4A", fontSize: "1.3em" }}>85%</b>
                      <br />
                      <span style={{ color: "#666", fontSize: "0.85em" }}>Quiz Accuracy</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {role === "teacher" && (
                <div style={{
                  backgroundColor: "#F0F8F0",
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginTop: "10px",
                }}>
                  <b style={{ color: "#18AD4A" }}>Teacher View: Student Progress</b>
                  <br />
                  <span style={{ color: "#555", fontSize: "0.9em" }}>View detailed progress reports for each student in your classes.</span>
                  <br />
                  <Link href="/teacher-tools" style={{ color: "#004B97", fontSize: "0.9em" }}>
                    Go to Teacher Tools &gt;
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import SidebarLayout from "@/components/SidebarLayout";

export default function TeacherTools() {
  const { isLoggedIn, isSubscriber, role } = useUser();
  const [activeTab, setActiveTab] = useState<"classes" | "glossary" | "assignments" | "progress">("classes");

  if (!isLoggedIn || (role !== "teacher" && !isSubscriber)) {
    return (
      <SidebarLayout variant="we">
        <div style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.85em", textAlign: "center", padding: "20px 10px" }}>
          <h1 style={{ color: "#18AD4A", fontSize: "1.4em", fontWeight: "bold", margin: "0 0 8px 0" }}>
            Teacher Tools
          </h1>
          <p style={{ color: "#555", margin: "0 0 14px 0" }}>
            Create glossaries, manage classes, assign vocabulary, and track student progress.
            <br />
            Available with a subscription or teacher account.
          </p>
          <div>
            <Link
              href="/login"
              style={{
                display: "inline-block",
                padding: "4px 14px",
                backgroundColor: "#18AD4A",
                color: "#fff",
                textDecoration: "none",
                border: "1px solid #128a3b",
                fontSize: "0.9em",
                marginRight: "8px",
              }}
            >
              Log In as Teacher
            </Link>
            <Link
              href="/subscribe"
              style={{
                display: "inline-block",
                padding: "4px 14px",
                backgroundColor: "#fff",
                color: "#004B97",
                textDecoration: "none",
                border: "1px solid #004B97",
                fontSize: "0.9em",
              }}
            >
              Subscribe
            </Link>
          </div>
        </div>
      </SidebarLayout>
    );
  }

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
          <span>Teacher Tools</span>
        </div>

        <h1 style={{ color: "#18AD4A", fontSize: "1.4em", fontWeight: "bold", margin: "0 0 4px 0" }}>
          Teacher Tools
        </h1>
        <p style={{ color: "#555", fontSize: "0.9em", margin: "0 0 12px 0" }}>
          Manage your classes, create glossaries, and track student progress.
        </p>

        {/* Tabs */}
        <div style={{ borderBottom: "1px solid #ccc", marginBottom: "0" }}>
          <button onClick={() => setActiveTab("classes")} style={tabStyle(activeTab === "classes")}>
            My Classes
          </button>
          <button onClick={() => setActiveTab("glossary")} style={tabStyle(activeTab === "glossary")}>
            Glossary Maker
          </button>
          <button onClick={() => setActiveTab("assignments")} style={tabStyle(activeTab === "assignments")}>
            Assignments
          </button>
          <button onClick={() => setActiveTab("progress")} style={tabStyle(activeTab === "progress")}>
            Student Progress
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ border: "1px solid #ccc", borderTop: "none", padding: "12px", backgroundColor: "#fff" }}>
          {activeTab === "classes" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: 0 }}>My Classes</h2>
                <button style={{
                  padding: "3px 10px",
                  backgroundColor: "#18AD4A",
                  color: "#fff",
                  border: "1px solid #128a3b",
                  fontSize: "0.85em",
                  cursor: "pointer",
                }}>
                  + Add Class
                </button>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95em" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F0F8F0" }}>
                    <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Class Name</th>
                    <th style={{ textAlign: "center", padding: "4px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Students</th>
                    <th style={{ textAlign: "center", padding: "4px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {["3rd Grade \u2014 Section A", "4th Grade \u2014 Reading", "5th Grade \u2014 ELA"].map((cls, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "5px 8px" }}>
                        <a href="#" style={{ color: "#004B97", textDecoration: "none", fontWeight: "bold" }}>{cls}</a>
                      </td>
                      <td style={{ padding: "5px 8px", textAlign: "center" }}>{20 + i * 3}</td>
                      <td style={{ padding: "5px 8px", textAlign: "center" }}>
                        <button style={{
                          padding: "2px 8px",
                          backgroundColor: "#e8e8e8",
                          border: "1px solid #ccc",
                          fontSize: "0.85em",
                          cursor: "pointer",
                          marginRight: "4px",
                        }}>
                          Manage
                        </button>
                        <button style={{
                          padding: "2px 8px",
                          backgroundColor: "#e8e8e8",
                          border: "1px solid #ccc",
                          fontSize: "0.85em",
                          cursor: "pointer",
                        }}>
                          Assign Work
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "glossary" && (
            <div>
              <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0" }}>Glossary Maker</h2>
              <p style={{ color: "#555", margin: "0 0 10px 0" }}>
                Create custom glossaries for your classes. Add words, definitions, and assign to students.
              </p>
              <div style={{ border: "1px solid #ccc", padding: "10px", backgroundColor: "#F0F8F0" }}>
                <div style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block", fontWeight: "bold", color: "#333", marginBottom: "3px" }}>Glossary name:</label>
                  <input
                    type="text"
                    placeholder="Enter glossary name..."
                    style={{
                      width: "100%",
                      padding: "3px 6px",
                      border: "1px solid #ccc",
                      fontSize: "0.95em",
                      fontFamily: "Verdana, sans-serif",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block", fontWeight: "bold", color: "#333", marginBottom: "3px" }}>Words (separated by commas):</label>
                  <textarea
                    placeholder="Add words separated by commas..."
                    style={{
                      width: "100%",
                      padding: "3px 6px",
                      border: "1px solid #ccc",
                      fontSize: "0.95em",
                      fontFamily: "Verdana, sans-serif",
                      height: "80px",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <button style={{
                  padding: "4px 14px",
                  backgroundColor: "#18AD4A",
                  color: "#fff",
                  border: "1px solid #128a3b",
                  fontSize: "0.85em",
                  cursor: "pointer",
                }}>
                  Create Glossary
                </button>
              </div>
            </div>
          )}

          {activeTab === "assignments" && (
            <div>
              <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 10px 0" }}>Assignments</h2>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95em" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F0F8F0" }}>
                    <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Assignment</th>
                    <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Due Date</th>
                    <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Class</th>
                    <th style={{ textAlign: "center", padding: "4px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {["Weekly Vocabulary Quiz", "WILD Exploration: Farm", "Spelling Practice Unit 5"].map((a, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "5px 8px" }}>
                        <a href="#" style={{ color: "#004B97", textDecoration: "none", fontWeight: "bold" }}>{a}</a>
                      </td>
                      <td style={{ padding: "5px 8px", color: "#555" }}>Mar {28 + i}, 2026</td>
                      <td style={{ padding: "5px 8px", color: "#555" }}>3rd Grade &mdash; Section A</td>
                      <td style={{ padding: "5px 8px", textAlign: "center" }}>
                        {i === 0 ? (
                          <span style={{ color: "#18AD4A", fontWeight: "bold" }}>Completed</span>
                        ) : (
                          <span style={{ color: "#b8860b", fontWeight: "bold" }}>In Progress</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button style={{
                marginTop: "10px",
                padding: "4px 14px",
                backgroundColor: "#18AD4A",
                color: "#fff",
                border: "1px solid #128a3b",
                fontSize: "0.85em",
                cursor: "pointer",
              }}>
                + Create Assignment
              </button>
            </div>
          )}

          {activeTab === "progress" && (
            <div>
              <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 10px 0" }}>Student Progress Dashboard</h2>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95em", border: "1px solid #ccc" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F0F8F0" }}>
                    <th style={{ textAlign: "left", padding: "5px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Student</th>
                    <th style={{ textAlign: "center", padding: "5px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Words Learned</th>
                    <th style={{ textAlign: "center", padding: "5px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Quiz Score</th>
                    <th style={{ textAlign: "center", padding: "5px 8px", borderBottom: "1px solid #ccc", fontWeight: "bold", color: "#333" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    ["Emma S.", 42, 92, "On Track"],
                    ["Liam J.", 38, 85, "On Track"],
                    ["Sophia R.", 25, 72, "Needs Help"],
                  ] as [string, number, number, string][]).map(([name, words, score, status], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #ccc" }}>
                      <td style={{ padding: "5px 8px", fontWeight: "bold" }}>{name}</td>
                      <td style={{ padding: "5px 8px", textAlign: "center" }}>{words}</td>
                      <td style={{ padding: "5px 8px", textAlign: "center" }}>{score}%</td>
                      <td style={{ padding: "5px 8px", textAlign: "center" }}>
                        {status === "On Track" ? (
                          <span style={{ color: "#18AD4A", fontWeight: "bold" }}>{status}</span>
                        ) : (
                          <span style={{ color: "#cc0000", fontWeight: "bold" }}>{status}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}

"use client";

import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";
import AdSlot from "@/components/AdSlot";
import SupportCTA from "@/components/SupportCTA";
import activities from "@/data/activities.json";

const iconMap: Record<string, string> = {
  grid: "▦",
  shuffle: "🔀",
  user: "👤",
  pencil: "✏️",
  link: "🔗",
  edit: "✍️",
};

export default function ActivitiesPage() {
  return (
    <SidebarLayout variant="we">
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
        Activities &amp; Games
      </h2>
      <p style={{ fontSize: "0.85em", color: "#666", marginBottom: "12px" }}>
        Build vocabulary and spelling skills with fun, interactive word games designed for young learners.
      </p>

      {/* Top Ad — CRITICAL: Previously unmonetized page */}
      <AdSlot slotId="activities-top-leaderboard" size="leaderboard" position="top" />

      {/* Activities grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          fontSize: "0.85em",
          marginBottom: "10px",
        }}
      >
        {activities.slice(0, 3).map((activity) => (
          <Link
            key={activity.id}
            href={`/activities/${activity.id}`}
            style={{
              display: "block",
              border: "1px solid #ccc",
              padding: "10px",
              backgroundColor: "#fff",
              textDecoration: "none",
              color: "#333",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: activity.color,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1em",
                  borderRadius: "4px",
                }}
              >
                {iconMap[activity.icon] || "🎯"}
              </span>
              <span style={{ fontWeight: "bold", color: "#004B97" }}>{activity.title}</span>
              <span style={{ fontSize: "0.8em", color: "#888", marginLeft: "auto" }}>
                {activity.difficulty}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "0.9em", color: "#555" }}>
              {activity.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Inline ad between rows */}
      <AdSlot slotId="activities-between-cards" size="banner" position="inline" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          fontSize: "0.85em",
          marginBottom: "10px",
        }}
      >
        {activities.slice(3).map((activity) => (
          <Link
            key={activity.id}
            href={`/activities/${activity.id}`}
            style={{
              display: "block",
              border: "1px solid #ccc",
              padding: "10px",
              backgroundColor: "#fff",
              textDecoration: "none",
              color: "#333",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: activity.color,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1em",
                  borderRadius: "4px",
                }}
              >
                {iconMap[activity.icon] || "🎯"}
              </span>
              <span style={{ fontWeight: "bold", color: "#004B97" }}>{activity.title}</span>
              <span style={{ fontSize: "0.8em", color: "#888", marginLeft: "auto" }}>
                {activity.difficulty}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "0.9em", color: "#555" }}>
              {activity.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Bottom ad */}
      <AdSlot slotId="activities-bottom-banner" size="banner" position="bottom" />

      {/* Support CTA */}
      <SupportCTA size="banner" />
    </SidebarLayout>
  );
}

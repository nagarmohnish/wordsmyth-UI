"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";
import AdSlot from "@/components/AdSlot";
import SupportCTA from "@/components/SupportCTA";
import activities from "@/data/activities.json";

export default function ActivityDetailPage() {
  const params = useParams();
  const slug = params.activity as string;
  const activity = activities.find((a) => a.id === slug);
  const title = activity?.title ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const description = activity?.description ?? "This activity is currently being prepared.";

  return (
    <SidebarLayout variant="we">
      <p style={{ fontSize: "0.8em", color: "#888", marginBottom: "8px" }}>
        <Link href="/" style={{ color: "#004B97" }}>Home</Link>
        {" > "}
        <Link href="/activities" style={{ color: "#004B97" }}>Activities</Link>
        {" > "}{title}
      </p>

      <AdSlot slotId={`activity-${slug}-top-banner`} size="banner" position="top" />

      <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0" }}>
        {title}
      </h2>
      <p style={{ fontSize: "0.85em", color: "#666", marginBottom: "16px" }}>{description}</p>
      {activity && (
        <p style={{ fontSize: "0.8em", color: "#888", marginBottom: "16px" }}>
          Difficulty: {activity.difficulty}
        </p>
      )}

      {/* Coming Soon Area */}
      <div
        style={{
          border: "2px dashed #ccc",
          backgroundColor: "#F9F9F9",
          padding: "30px",
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        <p style={{ fontSize: "1.2em", fontWeight: "bold", color: "#004B97", marginBottom: "8px" }}>
          Coming Soon!
        </p>
        <p style={{ fontSize: "0.85em", color: "#666", marginBottom: "16px" }}>
          We&apos;re building this activity right now. Check back soon to play!
        </p>
        <Link
          href="/activities"
          style={{
            display: "inline-block",
            padding: "6px 16px",
            backgroundColor: "#3d9739",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.85em",
            textDecoration: "none",
            marginRight: "8px",
          }}
        >
          Back to Activities
        </Link>
      </div>

      <SupportCTA size="banner" context="You just learned something new! Support Wordsmyth to help more kids learn." />

      <AdSlot slotId={`activity-${slug}-bottom-banner`} size="banner" position="bottom" />
    </SidebarLayout>
  );
}

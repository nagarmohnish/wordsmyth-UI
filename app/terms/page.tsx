import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";

export default function TermsPage() {
  return (
    <SidebarLayout variant="we">
      <p style={{ fontSize: "0.8em", color: "#888", marginBottom: "8px" }}>
        <Link href="/" style={{ color: "#004B97" }}>Home</Link> &gt; Terms of Use
      </p>

      <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
        Terms of Use
      </h2>

      <div style={{ fontSize: "0.85em", lineHeight: 1.6, color: "#333" }}>
        <p style={{ marginBottom: "10px" }}><em>Last updated: March 2026</em></p>

        <h3 style={{ color: "#004B97", fontSize: "1em", fontWeight: "bold", margin: "14px 0 4px 0" }}>Acceptance of Terms</h3>
        <p style={{ marginBottom: "10px" }}>By accessing and using Wordsmyth, you agree to be bound by these Terms of Use.</p>

        <h3 style={{ color: "#004B97", fontSize: "1em", fontWeight: "bold", margin: "14px 0 4px 0" }}>Use of Service</h3>
        <p style={{ marginBottom: "10px" }}>Wordsmyth provides free and premium dictionary services for educational purposes. You may use the service for personal, educational, and non-commercial purposes. Systematic downloading or redistribution is prohibited.</p>

        <h3 style={{ color: "#004B97", fontSize: "1em", fontWeight: "bold", margin: "14px 0 4px 0" }}>Accounts</h3>
        <p style={{ marginBottom: "10px" }}>You are responsible for maintaining the security of your account. Teacher accounts carry additional responsibilities for managing student access.</p>

        <h3 style={{ color: "#004B97", fontSize: "1em", fontWeight: "bold", margin: "14px 0 4px 0" }}>Subscriptions</h3>
        <p style={{ marginBottom: "10px" }}>Individual subscriptions are billed annually. You may cancel at any time; access continues until the end of the billing period.</p>

        <h3 style={{ color: "#004B97", fontSize: "1em", fontWeight: "bold", margin: "14px 0 4px 0" }}>Intellectual Property</h3>
        <p style={{ marginBottom: "10px" }}>All dictionary content, illustrations, and software are the intellectual property of the Wordsmyth Collaborative.</p>

        <h3 style={{ color: "#004B97", fontSize: "1em", fontWeight: "bold", margin: "14px 0 4px 0" }}>Contact</h3>
        <p>For questions about these terms, <Link href="/contact" style={{ color: "#004B97" }}>contact us</Link>.</p>
      </div>
    </SidebarLayout>
  );
}

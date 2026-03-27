import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";

export default function PrivacyPage() {
  return (
    <SidebarLayout variant="we">
      <p style={{ fontSize: "0.8em", color: "#888", marginBottom: "8px" }}>
        <Link href="/" style={{ color: "#004B97" }}>Home</Link> &gt; Privacy Policy
      </p>

      <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
        Privacy Policy
      </h2>

      <div style={{ fontSize: "0.85em", lineHeight: 1.6, color: "#333" }}>
        <p style={{ marginBottom: "10px" }}><em>Last updated: March 2026</em></p>

        <h3 style={{ color: "#004B97", fontSize: "1em", fontWeight: "bold", margin: "14px 0 4px 0" }}>Information We Collect</h3>
        <p style={{ marginBottom: "10px" }}>We collect information you provide directly, such as your name, email address, and role when you create an account. We also collect usage data to improve our services.</p>

        <h3 style={{ color: "#004B97", fontSize: "1em", fontWeight: "bold", margin: "14px 0 4px 0" }}>Children&apos;s Privacy (COPPA)</h3>
        <p style={{ marginBottom: "10px" }}>Wordsmyth is committed to protecting the privacy of children under 13. We comply with the Children&apos;s Online Privacy Protection Act (COPPA). We do not knowingly collect personal information from children without parental consent.</p>

        <h3 style={{ color: "#004B97", fontSize: "1em", fontWeight: "bold", margin: "14px 0 4px 0" }}>How We Use Information</h3>
        <p style={{ marginBottom: "10px" }}>We use your information to provide and improve our dictionary services, manage your account, and display appropriate advertisements for free-tier users. We do not sell your personal information.</p>

        <h3 style={{ color: "#004B97", fontSize: "1em", fontWeight: "bold", margin: "14px 0 4px 0" }}>Cookies and Advertising</h3>
        <p style={{ marginBottom: "10px" }}>We use cookies to maintain your session. Third-party advertising partners may use cookies to display relevant ads. Subscribers enjoy an ads-free experience.</p>

        <h3 style={{ color: "#004B97", fontSize: "1em", fontWeight: "bold", margin: "14px 0 4px 0" }}>Data Security</h3>
        <p style={{ marginBottom: "10px" }}>We implement appropriate security measures. Payment processing is handled by Stripe and PayPal — we do not store credit card details.</p>

        <h3 style={{ color: "#004B97", fontSize: "1em", fontWeight: "bold", margin: "14px 0 4px 0" }}>Contact</h3>
        <p>For privacy-related questions, contact us at <Link href="/contact" style={{ color: "#004B97" }}>info@wordsmyth.net</Link>.</p>
      </div>
    </SidebarLayout>
  );
}

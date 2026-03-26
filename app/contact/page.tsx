import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";

export default function ContactPage() {
  return (
    <SidebarLayout variant="we">
      <p style={{ fontSize: "0.8em", color: "#888", marginBottom: "8px" }}>
        <Link href="/" style={{ color: "#004B97" }}>Home</Link> &gt; Contact
      </p>

      <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
        Contact Us
      </h2>

      <div style={{ fontSize: "0.85em", lineHeight: 1.6 }}>
        <p style={{ marginBottom: "10px", color: "#333" }}>
          We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
        </p>

        <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "16px" }}>
          <tbody>
            <tr>
              <td style={{ padding: "4px 8px 4px 0", fontWeight: "bold", verticalAlign: "top", width: "120px" }}>First Name:</td>
              <td style={{ padding: "4px 0" }}><input type="text" style={{ border: "1px solid #ccc", padding: "3px 6px", width: "200px" }} /></td>
            </tr>
            <tr>
              <td style={{ padding: "4px 8px 4px 0", fontWeight: "bold", verticalAlign: "top" }}>Last Name:</td>
              <td style={{ padding: "4px 0" }}><input type="text" style={{ border: "1px solid #ccc", padding: "3px 6px", width: "200px" }} /></td>
            </tr>
            <tr>
              <td style={{ padding: "4px 8px 4px 0", fontWeight: "bold", verticalAlign: "top" }}>Email:</td>
              <td style={{ padding: "4px 0" }}><input type="email" style={{ border: "1px solid #ccc", padding: "3px 6px", width: "200px" }} /></td>
            </tr>
            <tr>
              <td style={{ padding: "4px 8px 4px 0", fontWeight: "bold", verticalAlign: "top" }}>Subject:</td>
              <td style={{ padding: "4px 0" }}>
                <select style={{ border: "1px solid #ccc", padding: "3px 6px", width: "210px" }}>
                  <option>General Inquiry</option>
                  <option>Subscription Help</option>
                  <option>Educational Group Plans</option>
                  <option>Technical Issue</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px 8px 4px 0", fontWeight: "bold", verticalAlign: "top" }}>Message:</td>
              <td style={{ padding: "4px 0" }}>
                <textarea style={{ border: "1px solid #ccc", padding: "3px 6px", width: "300px", height: "100px", resize: "vertical" }} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td style={{ padding: "8px 0" }}>
                <button style={{ padding: "4px 16px", backgroundColor: "#3d9739", color: "white", border: "none", fontWeight: "bold", cursor: "pointer" }}>
                  Send Message
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ backgroundColor: "#F0F0F0", border: "1px solid #ccc", padding: "10px 12px" }}>
          <p style={{ margin: "0 0 4px 0" }}><strong>Email:</strong> info@wordsmyth.net</p>
          <p style={{ margin: "0 0 4px 0" }}><strong>For Schools:</strong> edu@wordsmyth.net</p>
          <p style={{ margin: 0 }}>Check our <Link href="/faq" style={{ color: "#004B97" }}>FAQ page</Link> for quick answers.</p>
        </div>
      </div>
    </SidebarLayout>
  );
}

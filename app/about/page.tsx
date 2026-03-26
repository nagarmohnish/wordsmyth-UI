import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";

export default function AboutPage() {
  return (
    <SidebarLayout variant="we">
      <p style={{ fontSize: "0.8em", color: "#888", marginBottom: "8px" }}>
        <Link href="/" style={{ color: "#004B97" }}>Home</Link> &gt; About
      </p>

      <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
        About Wordsmyth
      </h2>

      <div style={{ fontSize: "0.85em", lineHeight: 1.6, color: "#333" }}>
        <p style={{ marginBottom: "10px" }}>
          Wordsmyth has been a trusted educational resource since 1998, providing free dictionary tools for children, students, and teachers around the world.
        </p>
        <p style={{ marginBottom: "10px" }}>
          Our mission is simple: make high-quality language learning accessible to every child, regardless of their background or location.
        </p>

        <h3 style={{ color: "#18AD4A", fontSize: "1em", fontWeight: "bold", margin: "16px 0 6px 0" }}>Our Dictionaries</h3>
        <p style={{ marginBottom: "10px" }}>
          The <strong>Wordsmyth Illustrated Learner&apos;s Dictionary (WILD)</strong> is designed for beginning readers in grades K-2, featuring visual scenes, thematic collections, and illustrated word entries.
        </p>
        <p style={{ marginBottom: "10px" }}>
          The <strong>Word Explorer / Children&apos;s Dictionary</strong> serves students in grades 3-8 with comprehensive definitions, example sentences, synonyms, antonyms, and thesaurus features.
        </p>

        <h3 style={{ color: "#18AD4A", fontSize: "1em", fontWeight: "bold", margin: "16px 0 6px 0" }}>By the Numbers</h3>
        <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "10px" }}>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "6px 10px", fontWeight: "bold", color: "#004B97" }}>14,000+</td>
              <td style={{ border: "1px solid #ccc", padding: "6px 10px" }}>Headwords</td>
              <td style={{ border: "1px solid #ccc", padding: "6px 10px", fontWeight: "bold", color: "#004B97" }}>50,000+</td>
              <td style={{ border: "1px solid #ccc", padding: "6px 10px" }}>Daily Users</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "6px 10px", fontWeight: "bold", color: "#004B97" }}>120+</td>
              <td style={{ border: "1px solid #ccc", padding: "6px 10px" }}>Countries</td>
              <td style={{ border: "1px solid #ccc", padding: "6px 10px", fontWeight: "bold", color: "#004B97" }}>1998</td>
              <td style={{ border: "1px solid #ccc", padding: "6px 10px" }}>Founded</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ color: "#18AD4A", fontSize: "1em", fontWeight: "bold", margin: "16px 0 6px 0" }}>The Wordsmyth Collaborative</h3>
        <p style={{ marginBottom: "10px" }}>
          Wordsmyth is a project of the Wordsmyth Collaborative, a group of educators, linguists, and technologists dedicated to creating exceptional language learning tools.
        </p>

        <div style={{ backgroundColor: "#F0F8F0", border: "1px solid #ccc", padding: "10px 12px", marginTop: "16px" }}>
          <strong style={{ color: "#18AD4A" }}>Support Our Mission</strong>
          <p style={{ margin: "4px 0 0 0" }}>
            Help us keep Wordsmyth free for every child.{" "}
            <Link href="/support" style={{ color: "#004B97" }}>Support us</Link> |{" "}
            <Link href="/subscribe" style={{ color: "#004B97" }}>Subscribe</Link>
          </p>
        </div>
      </div>
    </SidebarLayout>
  );
}

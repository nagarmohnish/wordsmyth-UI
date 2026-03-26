"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import SidebarLayout from "@/components/SidebarLayout";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const [magicEmail, setMagicEmail] = useState("");
  const [magicSent, setMagicSent] = useState(false);
  const [showTraditional, setShowTraditional] = useState(false);
  const [tradEmail, setTradEmail] = useState("");
  const [tradPassword, setTradPassword] = useState("");

  function handleGoogleLogin() {
    login("user@gmail.com", "Alex Johnson", "parent");
    router.push("/");
  }

  function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!magicEmail) return;
    setMagicSent(true);
    setTimeout(() => {
      login(magicEmail, "Alex Johnson", "parent");
      router.push("/");
    }, 1500);
  }

  function handleTraditionalLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!tradEmail || !tradPassword) return;
    login(tradEmail, "Alex Johnson", "parent");
    router.push("/");
  }

  return (
    <SidebarLayout variant="we">
      <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
        Log In
      </h2>

      <div style={{ maxWidth: "400px", fontSize: "0.85em", lineHeight: 1.6 }}>
        {/* PRIMARY: Google */}
        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%", padding: "10px 16px", backgroundColor: "#4285f4", color: "white",
            fontWeight: "bold", fontSize: "1em", border: "none", cursor: "pointer", marginBottom: "16px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}
        >
          <span style={{ width: "24px", height: "24px", backgroundColor: "white", color: "#4285f4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85em" }}>G</span>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ textAlign: "center", margin: "12px 0", color: "#888", fontSize: "0.85em" }}>— or —</div>

        {/* SECONDARY: Magic Link */}
        <div style={{ marginBottom: "16px" }}>
          <p style={{ color: "#666", marginBottom: "6px" }}>
            We&apos;ll email you a sign-in link. No password needed.
          </p>
          {magicSent ? (
            <div style={{ backgroundColor: "#F0F8F0", border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
              <p style={{ fontWeight: "bold", color: "#18AD4A" }}>Magic link sent!</p>
              <p style={{ fontSize: "0.9em", color: "#666" }}>Check your inbox for {magicEmail}</p>
            </div>
          ) : (
            <form onSubmit={handleMagicLink} style={{ display: "flex", gap: "6px" }}>
              <input
                type="email"
                value={magicEmail}
                onChange={(e) => setMagicEmail(e.target.value)}
                placeholder="you@email.com"
                style={{ flex: 1, border: "1px solid #ccc", padding: "6px 8px" }}
              />
              <button type="submit" style={{ padding: "6px 12px", backgroundColor: "#3d9739", color: "white", border: "none", fontWeight: "bold", cursor: "pointer", whiteSpace: "nowrap" }}>
                Send Magic Link
              </button>
            </form>
          )}
        </div>

        {/* TERTIARY: Traditional */}
        <div style={{ borderTop: "1px solid #eee", paddingTop: "12px" }}>
          <button
            onClick={() => setShowTraditional(!showTraditional)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#004B97", fontSize: "0.9em", textDecoration: "underline", padding: 0 }}
          >
            {showTraditional ? "Hide email & password" : "Or sign in with email & password"}
          </button>

          {showTraditional && (
            <form onSubmit={handleTraditionalLogin} style={{ marginTop: "10px" }}>
              <table style={{ borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "3px 8px 3px 0", fontWeight: "bold" }}>Email:</td>
                    <td style={{ padding: "3px 0" }}>
                      <input type="email" value={tradEmail} onChange={(e) => setTradEmail(e.target.value)} style={{ border: "1px solid #ccc", padding: "4px 6px", width: "200px" }} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "3px 8px 3px 0", fontWeight: "bold" }}>Password:</td>
                    <td style={{ padding: "3px 0" }}>
                      <input type="password" value={tradPassword} onChange={(e) => setTradPassword(e.target.value)} style={{ border: "1px solid #ccc", padding: "4px 6px", width: "200px" }} />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style={{ padding: "8px 0" }}>
                      <button type="submit" style={{ padding: "4px 16px", backgroundColor: "#3d9739", color: "white", border: "none", fontWeight: "bold", cursor: "pointer", marginRight: "8px" }}>
                        Sign In
                      </button>
                      <Link href="#" style={{ color: "#004B97", fontSize: "0.85em" }}>Forgot Password?</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          )}
        </div>

        <p style={{ marginTop: "16px", color: "#666" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "#004B97", fontWeight: "bold" }}>Sign up</Link>
        </p>
      </div>
    </SidebarLayout>
  );
}

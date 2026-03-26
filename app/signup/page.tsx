"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import SidebarLayout from "@/components/SidebarLayout";

type Role = "parent" | "teacher" | "student";

export default function SignupPage() {
  const router = useRouter();
  const { login, setRole } = useUser();
  const [magicEmail, setMagicEmail] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  function handleGoogleSignup() {
    login("user@gmail.com", "Alex Johnson", null);
    setSignedUp(true);
  }

  function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!magicEmail) return;
    login(magicEmail, "New User", null);
    setSignedUp(true);
  }

  function handleRoleSelect(role: Role) {
    setRole(role);
    setTimeout(() => router.push("/"), 400);
  }

  return (
    <SidebarLayout variant="we">
      <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
        {signedUp ? "Select Your Role" : "Create Your Account"}
      </h2>

      <div style={{ maxWidth: "400px", fontSize: "0.85em", lineHeight: 1.6 }}>
        {!signedUp ? (
          <>
            <p style={{ color: "#666", marginBottom: "12px" }}>Join thousands of learners on Wordsmyth.</p>

            {/* Google */}
            <button
              onClick={handleGoogleSignup}
              style={{
                width: "100%", padding: "10px 16px", backgroundColor: "#4285f4", color: "white",
                fontWeight: "bold", fontSize: "1em", border: "none", cursor: "pointer", marginBottom: "16px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              <span style={{ width: "24px", height: "24px", backgroundColor: "white", color: "#4285f4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85em" }}>G</span>
              Sign up with Google
            </button>

            <div style={{ textAlign: "center", margin: "12px 0", color: "#888", fontSize: "0.85em" }}>— or —</div>

            {/* Magic Link */}
            <p style={{ color: "#666", marginBottom: "6px" }}>Enter your email to get started. No password needed.</p>
            <form onSubmit={handleMagicLink} style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
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

            <p style={{ color: "#666" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#004B97", fontWeight: "bold" }}>Log in</Link>
            </p>
          </>
        ) : (
          <>
            <p style={{ color: "#666", marginBottom: "12px" }}>You&apos;re in! One last thing — tell us who you are:</p>
            {([
              { id: "parent" as Role, label: "I'm a Parent", desc: "Help your children explore words at home" },
              { id: "teacher" as Role, label: "I'm a Teacher", desc: "Bring vocabulary tools to your classroom" },
              { id: "student" as Role, label: "I'm a Student", desc: "Discover new words and boost your skills" },
            ]).map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                style={{
                  display: "block", width: "100%", textAlign: "left", padding: "10px 12px",
                  border: "1px solid #ccc", marginBottom: "6px", cursor: "pointer",
                  backgroundColor: "#fff",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#F0F8F0"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#fff"; }}
              >
                <strong style={{ color: "#004B97" }}>{role.label}</strong>
                <p style={{ margin: "2px 0 0 0", color: "#666", fontSize: "0.9em" }}>{role.desc}</p>
              </button>
            ))}
          </>
        )}
      </div>
    </SidebarLayout>
  );
}

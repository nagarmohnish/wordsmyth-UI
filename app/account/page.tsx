"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import SidebarLayout from "@/components/SidebarLayout";

type Role = "parent" | "teacher" | "student";

export default function AccountPage() {
  const router = useRouter();
  const { isLoggedIn, isSubscriber, subscriptionTier, role, name, email, logout, setRole } = useUser();
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);

  function handleLogout() {
    logout();
    router.push("/");
  }

  function handleCopyCoupon() {
    navigator.clipboard.writeText("WORDSMYTH-SUBSCRIBER-2026");
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 2000);
  }

  if (!isLoggedIn) {
    return (
      <SidebarLayout variant="we">
        <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
          Account Settings
        </h2>
        <div style={{ fontSize: "0.85em", padding: "20px 0", textAlign: "center" }}>
          <p style={{ color: "#666", marginBottom: "10px" }}>You need to be signed in to view your account settings.</p>
          <Link href="/login" style={{ color: "#004B97", fontWeight: "bold" }}>Go to Login &raquo;</Link>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout variant="we">
      <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
        Account Settings
      </h2>

      <div style={{ fontSize: "0.85em", lineHeight: 1.6 }}>
        {/* Profile */}
        <h3 style={{ color: "#004B97", fontWeight: "bold", margin: "12px 0 6px 0" }}>Profile</h3>
        <table style={{ borderCollapse: "collapse", marginBottom: "12px" }}>
          <tbody>
            <tr>
              <td style={{ padding: "3px 12px 3px 0", fontWeight: "bold", color: "#333" }}>Name:</td>
              <td style={{ padding: "3px 0" }}>{name}</td>
            </tr>
            <tr>
              <td style={{ padding: "3px 12px 3px 0", fontWeight: "bold", color: "#333" }}>Email:</td>
              <td style={{ padding: "3px 0" }}>{email}</td>
            </tr>
            <tr>
              <td style={{ padding: "3px 12px 3px 0", fontWeight: "bold", color: "#333" }}>Role:</td>
              <td style={{ padding: "3px 0" }}>
                {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Not set"}
                {" "}
                <button onClick={() => setShowRolePicker(!showRolePicker)} style={{ color: "#004B97", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontSize: "0.9em" }}>
                  [change]
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {showRolePicker && (
          <div style={{ marginBottom: "12px" }}>
            {(["parent", "teacher", "student"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setShowRolePicker(false); }}
                style={{
                  padding: "4px 12px", marginRight: "6px", cursor: "pointer",
                  backgroundColor: role === r ? "#3d9739" : "#F0F0F0",
                  color: role === r ? "white" : "#333",
                  border: "1px solid #ccc", fontWeight: "bold", fontSize: "0.9em",
                }}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Subscription */}
        <h3 style={{ color: "#004B97", fontWeight: "bold", margin: "12px 0 6px 0" }}>Subscription</h3>
        {isSubscriber ? (
          <div style={{ backgroundColor: "#F0F8F0", border: "1px solid #ccc", padding: "8px 12px", marginBottom: "12px" }}>
            <p><strong>Plan:</strong> {subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} — <span style={{ color: "#18AD4A", fontWeight: "bold" }}>Active</span></p>
            <button style={{ padding: "4px 12px", backgroundColor: "#3d9739", color: "white", border: "none", fontWeight: "bold", cursor: "pointer", marginTop: "6px" }}>
              Manage Subscription
            </button>
          </div>
        ) : (
          <div style={{ backgroundColor: "#FFFFC6", border: "1px solid #E0D890", padding: "8px 12px", marginBottom: "12px" }}>
            <p>You&apos;re on the <strong>Free Plan</strong>. <Link href="/subscribe" style={{ color: "#004B97", fontWeight: "bold" }}>Upgrade now &raquo;</Link></p>
          </div>
        )}

        {/* Coupon */}
        {isSubscriber && (
          <>
            <h3 style={{ color: "#004B97", fontWeight: "bold", margin: "12px 0 6px 0" }}>eBook Coupon Code</h3>
            <div style={{ backgroundColor: "#FFFFC6", border: "1px solid #E0D890", padding: "8px 12px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <code style={{ fontFamily: "monospace", fontWeight: "bold", color: "#004B97" }}>WORDSMYTH-SUBSCRIBER-2026</code>
              <button onClick={handleCopyCoupon} style={{ padding: "2px 8px", backgroundColor: "#3d9739", color: "white", border: "none", cursor: "pointer", fontSize: "0.85em" }}>
                {couponCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </>
        )}

        {/* Auth Methods */}
        <h3 style={{ color: "#004B97", fontWeight: "bold", margin: "12px 0 6px 0" }}>Linked Sign-In Methods</h3>
        <table style={{ borderCollapse: "collapse", marginBottom: "12px" }}>
          <tbody>
            <tr>
              <td style={{ padding: "3px 12px 3px 0" }}>Google</td>
              <td style={{ padding: "3px 0", color: "#18AD4A", fontWeight: "bold" }}>Connected</td>
            </tr>
            <tr>
              <td style={{ padding: "3px 12px 3px 0" }}>Email (Magic Link)</td>
              <td style={{ padding: "3px 0", color: "#18AD4A", fontWeight: "bold" }}>Connected</td>
            </tr>
          </tbody>
        </table>

        {/* Actions */}
        <div style={{ borderTop: "1px solid #ccc", paddingTop: "12px", marginTop: "12px" }}>
          <button onClick={handleLogout} style={{ padding: "6px 16px", backgroundColor: "#F0F0F0", border: "1px solid #ccc", cursor: "pointer", fontWeight: "bold", marginRight: "8px" }}>
            Log Out
          </button>
          <button onClick={() => setShowDeleteConfirm(true)} style={{ padding: "6px 16px", color: "#C12E48", background: "none", border: "1px solid #C12E48", cursor: "pointer", fontSize: "0.9em" }}>
            Delete Account
          </button>
        </div>

        {/* Delete confirmation */}
        {showDeleteConfirm && (
          <div style={{ backgroundColor: "#FFF0F0", border: "1px solid #C12E48", padding: "12px", marginTop: "12px" }}>
            <p style={{ fontWeight: "bold", color: "#C12E48", marginBottom: "6px" }}>Are you sure you want to delete your account?</p>
            <p style={{ fontSize: "0.9em", color: "#666", marginBottom: "8px" }}>This action is permanent and cannot be undone.</p>
            <button onClick={() => setShowDeleteConfirm(false)} style={{ padding: "4px 12px", backgroundColor: "#F0F0F0", border: "1px solid #ccc", cursor: "pointer", marginRight: "6px" }}>Cancel</button>
            <button onClick={() => setShowDeleteConfirm(false)} style={{ padding: "4px 12px", backgroundColor: "#C12E48", color: "white", border: "none", cursor: "pointer" }}>Delete</button>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}

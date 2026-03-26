"use client";

import { useState } from "react";
import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";
import AdSlot from "@/components/AdSlot";
import SupportCTA from "@/components/SupportCTA";
import products from "@/data/products.json";

interface CartItem {
  id: string;
  title: string;
  price: number;
  qty: number;
}

const coverColors = [
  "#4caf50", "#f5a623", "#2196f3", "#e53935", "#9c27b0",
  "#00bcd4", "#ff7043", "#8bc34a", "#3f51b5", "#ff5722",
  "#009688", "#795548", "#607d8b", "#cddc39",
];

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: (typeof products)[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <SidebarLayout variant="we">
      <h2 style={{ color: "#18AD4A", fontSize: "1.1em", fontWeight: "bold", margin: "0 0 8px 0", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
        Wordsmyth Shop
      </h2>

      <AdSlot slotId="shop-top-banner" size="banner" position="top" />

      {/* Free with subscription banner */}
      <div style={{ backgroundColor: "#F0F8F0", border: "1px solid #ccc", padding: "8px 12px", marginBottom: "12px", fontSize: "0.85em" }}>
        <strong style={{ color: "#18AD4A" }}>All 14 eBooks FREE with Subscription!</strong>{" "}
        Subscribe for $20/year and get instant access to every digital title.{" "}
        <Link href="/subscribe" style={{ color: "#004B97" }}>Subscribe now &raquo;</Link>
      </div>

      {/* Cart summary */}
      {cart.length > 0 && (
        <div style={{ backgroundColor: "#FFFFC6", border: "1px solid #E0D890", padding: "8px 12px", marginBottom: "12px", fontSize: "0.85em" }}>
          <strong>Cart ({cart.reduce((s, i) => s + i.qty, 0)} items):</strong>{" "}
          Total: ${cartTotal.toFixed(2)}{" "}
          <Link href="/shop/checkout" style={{ color: "#004B97", fontWeight: "bold" }}>Checkout &raquo;</Link>
          <div style={{ marginTop: "4px" }}>
            {cart.map((item) => (
              <span key={item.id} style={{ fontSize: "0.85em", marginRight: "8px" }}>
                {item.title.substring(0, 30)}... (${item.price.toFixed(2)} x{item.qty}){" "}
                <button onClick={() => removeFromCart(item.id)} style={{ color: "#C12E48", cursor: "pointer", border: "none", background: "none", fontSize: "0.9em" }}>[remove]</button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Product grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", fontSize: "0.85em" }}>
        {products.map((product, i) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "8px", backgroundColor: "#fff" }}>
            {/* Cover placeholder */}
            <div style={{
              width: "100%", height: "80px", backgroundColor: `${coverColors[i % coverColors.length]}20`,
              display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "6px", border: "1px solid #eee",
            }}>
              <div style={{
                width: "40px", height: "55px", backgroundColor: coverColors[i % coverColors.length],
                display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.2em",
              }}>
                📖
              </div>
            </div>
            <span style={{ fontSize: "0.75em", color: product.format === "print" ? "#004B97" : "#3d9739", fontWeight: "bold" }}>
              [{product.format}]
            </span>
            <p style={{ margin: "2px 0", fontWeight: "bold", fontSize: "0.85em", color: "#333", lineHeight: 1.3 }}>
              {product.title}
            </p>
            <p style={{ margin: "2px 0", fontSize: "0.8em", color: "#666" }}>{product.description}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px" }}>
              <span style={{ fontWeight: "bold", color: "#004B97" }}>${product.price.toFixed(2)}</span>
              <button
                onClick={() => addToCart(product)}
                style={{ padding: "3px 8px", backgroundColor: "#3d9739", color: "white", border: "none", cursor: "pointer", fontSize: "0.8em", fontWeight: "bold" }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "12px" }}>
        <SupportCTA size="inline" context="Not looking to buy? You can still support our mission." />
      </div>
    </SidebarLayout>
  );
}

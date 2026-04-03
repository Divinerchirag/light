"use client";

import { Html } from "@react-three/drei";

export default function LanyardCard() {
  return (
    <Html
      transform
      occlude={false}
      position={[0, 0, 0.05]}
      style={{
        width: "320px",
        height: "450px",
        backgroundColor: "#f5f0e8",
        borderRadius: "16px",
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 24px 24px",
        boxSizing: "border-box",
        boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        border: "1px solid rgba(0,0,0,0.05)"
      }}
    >
      {/* Top Clip Hole */}
      <div style={{ width: "60px", height: "12px", background: "#0a0a0a", borderRadius: "6px", marginBottom: "28px" }} />

      {/* Profile Photo */}
      <div style={{ padding: "4px", background: "#f97316", borderRadius: "50%", marginBottom: "20px" }}>
        <img
          src="/chiragID.png"
          alt="Chirag Yadav"
          style={{ width: "110px", height: "110px", borderRadius: "50%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Text Data */}
      <div style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ margin: 0, fontSize: "28px", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.5px" }}>CHIRAG YADAV</h3>
        <p style={{ margin: "4px 0 20px", fontSize: "15px", color: "#5a5550", fontWeight: 500 }}>Software Engineer & Photographer</p>

        <hr style={{ borderTop: "1px solid #e0dbd3", width: "100%", margin: "0 0 20px" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "#5a5550", fontWeight: 600 }}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            📍 Pune, India
          </span>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            🌐 chirag.dev
          </span>
        </div>
      </div>

      {/* Bottom Accent */}
      <div style={{ width: "100%", height: "8px", background: "#f97316", borderRadius: "4px", marginTop: "auto" }} />
    </Html>
  );
}

"use client";
import React, { useState } from "react";

interface ConnectCardProps {
  href: string;
  iconBg: string;
  iconBorder: string;
  icon: React.ReactNode;
  label: string;
  handle: string;
}

export default function ConnectCard({
  href,
  iconBg,
  iconBorder,
  icon,
  label,
  handle,
}: ConnectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className="cursor-none"
      style={{
        background: "var(--card)",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        borderRadius: 16,
        padding: "26px 20px 22px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 56px rgba(0,0,0,0.45)" : "none",
        transition:
          "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Radial glow on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 65%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />

      {/* Arrow — top-right corner */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          width: 26,
          height: 26,
          borderRadius: "50%",
          border: hovered
            ? "1px solid var(--accent)"
            : "1px solid var(--border)",
          background: hovered ? "var(--accent)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "all 0.2s ease",
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={hovered ? "white" : "var(--fg)"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: hovered ? 1 : 0.6, transition: "opacity 0.2s" }}
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </div>

      {/* Icon wrap */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          border: hovered
            ? "1px solid var(--accent)"
            : `1px solid ${iconBorder}`,
          background: hovered ? "rgba(249,115,22,0.12)" : "transparent", // iconBg is handled better if covering fully, though we'll keep it. Actually let's just add overflow: hidden.
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.25s ease",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {icon}
      </div>

      {/* Label */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--fg)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 11.5,
            color: "var(--muted)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textAlign: "center",
            wordBreak: "break-all",
          }}
        >
          {handle}
        </span>
      </div>
    </a>
  );
}

"use client";
import React from "react";
import { motion } from "framer-motion";
import ConnectCard from "./ConnectCard";

/* ── SVG icons ─────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 382 382"
    xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: "inherit" }}
  >
    <path
      style={{ fill: "#0077B7" }}
      d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472L341.91,330.654L341.91,330.654z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: "inherit" }}
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-140.000000, -7559.000000)" fill="var(--fg)">
        <g transform="translate(56.000000, 160.000000)">
          <path
            d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
            id="github-[#142]"
          />
        </g>
      </g>
    </g>
  </svg>
);

const MailIcon = ({
  size = "100%",
  color = "#f97316",
}: {
  size?: number | string;
  color?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Gmail"
    role="img"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    style={{ borderRadius: "inherit" }}
  >
    <rect width="512" height="512" rx="15%" fill="#ffffff" />
    <path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4" />
    <path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335" />
    <path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853" />
    <path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f" />
    <path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04" />
  </svg>
);

const ArrowUp = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

/* ── Contact cards data ─────────────────────────────────── */
const cards = [
  {
    href: "https://www.linkedin.com/in/chirag-yadav-979672240/",
    iconBg: "rgba(10,102,194,0.12)",
    iconBorder: "rgba(10,102,194,0.25)",
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    handle: "linkedin.com/in/chirag-yadav",
  },
  {
    href: "https://github.com/divinerchirag",
    iconBg: "rgba(255,255,255,0.06)",
    iconBorder: "rgba(255,255,255,0.12)",
    icon: <GitHubIcon />,
    label: "GitHub",
    handle: "github.com/divinerchirag",
  },
  {
    href: "mailto:chiraag.p.yadav@gmail.com",
    iconBg: "rgba(249,115,22,0.1)",
    iconBorder: "rgba(249,115,22,0.25)",
    icon: <MailIcon />,
    label: "Mail",
    handle: "chiraag.p.yadav@gmail.com",
  },
];

/* ── ContactSection ─────────────────────────────────────── */
export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--bg)]"
      style={{ padding: "96px 0 0" }}
    >
      {/* ── Orbs ── */}
      {/* Center orb */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "#f97316",
          borderRadius: "50%",
          opacity: "var(--orb-opacity)",
          filter: "blur(100px)",
          animation: "oc 10s ease-in-out infinite alternate",
          pointerEvents: "none",
        }}
      />
      {/* Top-left orb */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          top: -80,
          left: -80,
          background: "#f97316",
          borderRadius: "50%",
          opacity: "var(--orb-opacity)",
          filter: "blur(75px)",
          animation: "otl 14s ease-in-out infinite alternate",
          pointerEvents: "none",
        }}
      />
      {/* Bottom-right orb */}
      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          bottom: -60,
          right: -60,
          background: "#f97316",
          borderRadius: "50%",
          opacity: "var(--orb-opacity)",
          filter: "blur(70px)",
          animation: "obr 12s ease-in-out infinite alternate",
          pointerEvents: "none",
        }}
      />

      {/* Orb keyframes */}
      <style>{`
        @keyframes oc  { from { transform: translate(-50%,-50%) scale(1); } to { transform: translate(-50%,-52%) scale(1.1); } }
        @keyframes otl { from { transform: scale(1); } to { transform: translate(40px,30px) scale(1.15); } }
        @keyframes obr { from { transform: scale(1); } to { transform: translate(-30px,-40px) scale(1.12); } }
      `}</style>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* 1 — Eyebrow */}
        <motion.div
          className="flex items-center gap-2.5 mb-5 w-fit"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse flex-shrink-0" />
          <span
            className="text-[var(--accent)] text-[11px] tracking-[.25em] uppercase font-semibold"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Get In Touch
          </span>
        </motion.div>

        {/* 2 — Heading */}
        <motion.h2
          className="font-extrabold tracking-[-0.03em] leading-[1.02] text-[var(--fg)] mb-5"
          style={{
            fontSize: "clamp(44px, 6vw, 82px)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Let&apos;s{" "}
          <span
            className="italic font-bold text-[var(--accent)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            connect.
          </span>
        </motion.h2>

        {/* 3 — Subtext */}
        <motion.p
          className="font-light leading-[1.75] mb-12"
          style={{
            fontSize: 15,
            color: "var(--fg-secondary)",
            maxWidth: 460,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          Whether you have a project in mind, want to collaborate, or just want
          to say "HELLO" my inbox is always open.
        </motion.p>

        {/* 4 — Connect cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-12 w-full"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {cards.map((card) => (
            <ConnectCard key={card.label} {...card} />
          ))}
        </motion.div>

        {/* 7 — Footer strip */}
        <motion.div
          className="w-full border-t border-[var(--border)] pt-7 pb-10
                     flex items-center justify-between flex-wrap gap-3"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.75 }}
        >
          {/* Left: name */}
          <span
            className="font-bold text-[var(--fg)]"
            style={{
              fontSize: 13,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            CHIRAG <span className="text-[var(--accent)]">YADAV.</span>
          </span>

          {/* Center: copyright */}
          <span
            className="text-[var(--muted)]"
            style={{
              fontSize: 12,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            © 2025 · Built with passion
          </span>

          {/* Right: back to top */}
          <button
            onClick={() => {
              const lenis = (window as any).__lenis
              lenis
                ? lenis.scrollTo(0, { duration: 1.8, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
                : window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-1.5 uppercase
                       text-[var(--muted)] hover:text-[var(--accent)] transition-colors cursor-none"
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textDecoration: "none",
            }}
          >
            Back to top <ArrowUp />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

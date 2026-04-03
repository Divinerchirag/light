"use client";
import React from "react";
import { motion } from "framer-motion";
import { projects } from "./projectsData";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[var(--bg)]"
      style={{ padding: "96px 24px" }}
    >
      {/* Subtle orange orb — top right */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          top: -100,
          right: -100,
          background: "var(--accent)",
          borderRadius: "50%",
          opacity: "var(--orb-opacity)",
          filter: "blur(80px)",
          animation: "orbDrift 12s ease-in-out infinite alternate",
          pointerEvents: "none",
        }}
      />

      {/* Subtle purple orb — bottom left */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          bottom: -80,
          left: -80,
          background: "#8b5cf6",
          borderRadius: "50%",
          opacity: "var(--orb-opacity)",
          filter: "blur(80px)",
          animation: "orbDrift 16s ease-in-out infinite alternate-reverse",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes orbDrift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }
      `}</style>

      <div
        className="relative z-10 w-full mx-auto"
        style={{ maxWidth: 1152 }}
      >
        {/* ── Section Header ── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span
              className="text-[var(--accent)] text-[11px] tracking-[0.25em] uppercase font-semibold"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Projects
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-extrabold tracking-[-0.03em] leading-[1.04] text-[var(--fg)]"
            style={{
              fontSize: "clamp(40px, 5vw, 68px)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Things I&apos;ve{" "}
            <span
              className="italic text-[var(--accent)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              built.
            </span>
          </h2>

          {/* Subtitle
          <p
            className="text-[#5a5550] font-light mt-3"
            style={{
              fontSize: 14,
              maxWidth: 420,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            A selection of projects across full-stack engineering, AI tooling,
            and design.
          </p> */}
        </motion.div>

        {/* ── 3-column Card Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

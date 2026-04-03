"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "./projectsData";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.12,
      }}
    >
      <div
        className="group cursor-none"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          transition:
            "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(-6px)";
          el.style.borderColor = "rgba(249,115,22,0.2)";
          el.style.boxShadow = "0 24px 60px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(0)";
          el.style.borderColor = "var(--border)";
          el.style.boxShadow = "none";
        }}
      >
        {/* ── Cover Area ── */}
        <div
          style={{
            height: 260,
            background: project.coverBg,
            position: "relative",
            overflow: "hidden",
            borderRadius: "16px 16px 0 0",
          }}
        >
          {/* Real screenshot image */}
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            /* Decorative faux-UI placeholder */
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Accent glow blob */}
              <div
                style={{
                  width: 180,
                  height: 180,
                  background: project.coverAccent,
                  borderRadius: "50%",
                  opacity: 0.15,
                  filter: "blur(40px)",
                  position: "absolute",
                }}
              />
              {/* Faux UI card stack */}
              <div style={{ position: "relative", width: 200, height: 160 }}>
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 10,
                    width: 180,
                    height: 120,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    width: 180,
                    height: 120,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 180,
                    height: 120,
                    background: "rgba(255,255,255,0.08)",
                    border: `1px solid ${project.coverAccent}33`,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 32 }}>{project.emoji}</span>
                </div>
              </div>
            </div>
          )}

          {/* Subtle dark gradient overlay so text/button are legible over real images */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />

          {/* Live-link arrow button */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-none"
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              width: 48,
              height: 48,
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#f97316";
              el.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(255,255,255,0.12)";
              el.style.transform = "scale(1)";
            }}
          >
            {/* ↗ Arrow icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>

        {/* ── Card Body ── */}
        <div style={{ padding: 20 }}>
          {/* Category pill
          <div
            style={{
              display: "inline-flex",
              padding: "6px 14px",
              background: "#fff",
              color: "#0a0a0a",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 100,
              marginBottom: 14,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {project.category}
          </div> */}

          {/* Author + date row
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 12,
              fontSize: 12,
              color: "#5a5550",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#f97316",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              Chirag
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#f97316",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {project.date}
            </span>
          </div> */}

          {/* Project title */}
          <h3
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--fg)",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              margin: 0,
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 1.6,
              marginTop: 8,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {project.description}
          </p>

          {/* Tags row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 10,
            }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 10,
                  padding: "2px 8px",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 100,
                  color: "var(--muted)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* GitHub repo button */}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-none"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginTop: 12,
              padding: "6px 12px",
              border: "1px solid var(--border)",
              borderRadius: 100,
              fontSize: 11,
              color: "var(--muted)",
              textDecoration: "none",
              transition: "all 0.2s ease",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "var(--accent)";
              el.style.borderColor = "rgba(249,115,22,0.3)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "var(--muted)";
              el.style.borderColor = "var(--border)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View Repo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

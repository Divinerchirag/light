"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const LanyardCanvas = dynamic(() => import("./Lanyard"), { ssr: false });

const fadeUpParams = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)] overflow-hidden font-jakarta flex items-center py-24"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16 lg:gap-8 items-center relative z-10">
        {/* Left Column — Bio Content */}
        <div className="flex flex-col items-start gap-8 z-20">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
            <span className="text-[#f97316] text-[11px] tracking-[0.25em] uppercase font-semibold">
              ABOUT ME
            </span>
          </div>

          <motion.h2
            {...fadeUpParams}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-[var(--fg)] mb-2"
          >
            The person <br />
            <span className="font-playfair italic font-bold text-[var(--accent)]">
              behind the screen.
            </span>
          </motion.h2>

          <motion.div
            {...fadeUpParams}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col gap-6 text-[var(--fg-secondary)] text-lg leading-relaxed max-w-[540px]"
          >
            <p>Hi, I'm Chirag ✋</p>
            <p>
              A passionate photographer and tech enthusiast who loves blending
              creativity with technology...
            </p>
            <p>
              When I'm not behind the lens, you'll find me building digital
              experiences...
            </p>
            <p>
              Through my portfolio, I aim to share not only my projects but also
              the way I see the world...
            </p>
          </motion.div>

          {/* Skills Row */}
          <motion.div
            {...fadeUpParams}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-4"
          >
            {[
              "React",
              "TypeScript",
              "Next.js",
              "Node.js",
              "Photography",
              "UI Design",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-default"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* Stats Boxes */}
          <motion.div
            {...fadeUpParams}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex gap-6 mt-6 w-full"
          >
            <div className="flex flex-col gap-1 pr-8 border-r border-[var(--border)]">
              <span className="text-3xl font-extrabold text-[var(--fg)]">
                1+ Years
              </span>
              <span className="text-sm font-medium text-[var(--muted)]">
                Development
              </span>
            </div>
            <div className="flex flex-col gap-1 pl-2">
              <span className="text-3xl font-extrabold text-[var(--fg)]">
                200+ Shots
              </span>
              <span className="text-sm font-medium text-[var(--muted)]">
                Photography
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column — Lanyard Canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="relative w-full flex justify-center items-center pointer-events-auto h-[600px] lg:h-full lg:min-h-[800px]"
        >
          <LanyardCanvas position={[0, 0, 13]} gravity={[0, -40, 0]} />
        </motion.div>
      </div>
    </section>
  );
}

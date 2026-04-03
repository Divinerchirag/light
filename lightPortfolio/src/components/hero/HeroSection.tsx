'use client';

import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import LiquidReveal from './LiquidReveal';
import WordFlipHero from './WordFlipHero';

// SVGs for the squiggles
const Squiggle1 = () => (
  <svg className="absolute -top-8 -left-8 w-16 h-16 text-accent animate-fade-up z-0 opacity-80" style={{ animationDelay: '0.4s' }} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 80 C 30 10, 70 90, 90 20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    <circle cx="90" cy="20" r="4" fill="currentColor" />
  </svg>
);

const Squiggle2 = () => (
  <svg className="absolute -bottom-4 -left-12 w-20 h-20 text-accent animate-fade-up z-0 opacity-80" style={{ animationDelay: '0.5s' }} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50 Q 30 10, 50 50 T 90 50" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M10 30 L 20 50 L 10 70" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function HeroSection() {
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!rightColRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 16; // ~8px parallax
      const y = (clientY / window.innerHeight - 0.5) * 12; // ~6px parallax
      rightColRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)] overflow-hidden font-jakarta flex items-center pt-24 pb-12"
    >
      <Navbar />

      <div className="max-w-[1280px] mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column */}
        <div className="flex flex-col items-start gap-6 lg:gap-8">
          {/* H1 headline */}
          <WordFlipHero
            staticText="I'm Chirag,"
            words={["Software Engineer", "Photographer"]}
            interval={3200}
          />

          {/* CTA Buttons */}
          <div
            className="animate-fade-up flex flex-wrap items-center gap-4 mt-2"
            style={{ animationDelay: "0.9s" }}
          >
            <a
              href="https://drive.google.com/file/d/1dClHR2JFOkHRgN59cAenIb_r6CH2Vonn/view?usp=sharing"
              className="group flex items-center gap-2 bg-[var(--accent)] text-[#f5f0e8] px-8 py-3.5 rounded-full font-medium transition-all hover:bg-[var(--accent-hover)] hover:scale-105 active:scale-95 hover-state-target"
            >
              RESUME
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full border border-[var(--border)] font-medium transition-all hover:bg-[var(--card)] active:scale-95 hover-state-target"
            >
              Hire me
            </a>
          </div>

          {/* Social Icons */}
          <div
            className="animate-fade-up flex items-center gap-3"
            style={{ animationDelay: "1.1s" }}
          >
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/chirag-yadav-979672240/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--card)] transition-all duration-200 hover:scale-110 active:scale-95 hover-state-target"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Divinerchirag"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--card)] transition-all duration-200 hover:scale-110 active:scale-95 hover-state-target"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* Mail */}
            <a
              href="mailto:chiraag.p.yadav@gmail.com"
              aria-label="Email"
              className="group w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--card)] transition-all duration-200 hover:scale-110 active:scale-95 hover-state-target"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>

            {/* Subtle divider + "Find me on" label */}
            <span className="text-[var(--muted)] text-xs ml-1 hidden sm:block">Find me on</span>
          </div>
        </div>

        {/* Right Column */}
        <div
          ref={rightColRef}
          className="relative lg:left-[45px] lg:top-[60px] flex justify-center items-center w-full max-w-[320px] mx-auto lg:max-w-none mt-4 lg:-mt-20 animate-fade-up transition-transform duration-100 ease-out"
          style={{ animationDelay: "0.35s" }}
        >
          {/* Orange semicircle background */}
          <div className="absolute bottom-6 sm:bottom-7 lg:bottom-8 w-[360px] h-[180px] sm:w-[480px] sm:h-[240px] lg:w-[640px] lg:h-[320px] bg-[var(--accent)] rounded-t-full z-0 opacity-90 blur-sm shadow-[0_0_80px_rgba(249,115,22,0.4)] transition-all duration-300" />

          {/* SVGs */}
          {/* <Squiggle1 />
          <Squiggle2 /> */}

          {/* Visual Stack */}
          <div className="relative z-10 w-[280px] sm:w-[380px] lg:w-[460px] hover-state-target transition-all duration-300 translate-y-[18px]">
            <LiquidReveal
              frontImage="/Chirag.png"
              backImage="/AvtarChirag.png"
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes wave {
          0% {
            transform: rotate(0deg);
          }
          10% {
            transform: rotate(14deg);
          }
          20% {
            transform: rotate(-8deg);
          }
          30% {
            transform: rotate(14deg);
          }
          40% {
            transform: rotate(-4deg);
          }
          50% {
            transform: rotate(10deg);
          }
          60% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </section>
  );
}

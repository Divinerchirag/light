'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { smoothScrollTo } from '@/utils/smoothScrollTo';

// ─── Menu links data ────────────────────────────────────────────────────────
const menuLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

// ─── MobileMenuItem ──────────────────────────────────────────────────────────
function MobileMenuItem({
  link,
  index,
  onClose,
  activeSection,
}: {
  link: { href: string; label: string };
  index: number;
  onClose: () => void;
  activeSection: string;
}) {
  const isActive = activeSection === link.href.replace('#', '');

  return (
    <motion.a
      href={link.href}
      onClick={(e) => {
        e.preventDefault();
        smoothScrollTo(link.href.replace('#', ''));
        onClose();
      }}
      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl
                  text-[15px] font-medium transition-colors duration-150
                  active:bg-[rgba(249,115,22,0.08)]
                  ${isActive
          ? 'text-[var(--accent)] bg-[rgba(249,115,22,0.06)]'
          : 'text-[var(--fg)] hover:bg-[var(--card)]'
        }`}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {link.label}

      {/* Active dot */}
      <div
        className={`w-1.5 h-1.5 rounded-full transition-all flex-shrink-0
                    ${isActive
            ? 'bg-[var(--accent)] opacity-100'
            : 'opacity-0'
          }`}
      />
    </motion.a>
  );
}

// ─── ThemeToggleBtn ─────────────────────────────────────────────────────────
function ThemeToggleBtn({ className = "" }: { className?: string }) {
  const { toggleTheme, isDark } = useTheme();
  return (
    <motion.button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative rounded-full flex items-center justify-center flex-shrink-0 cursor-none border border-[var(--border)] text-[var(--fg)] bg-[var(--card)] shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 ${className}`}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  function toggleMenu() { 
    const lenis = (window as any).__lenis;
    if (!menuOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    setMenuOpen(prev => !prev); 
  }
  function closeMenu() { 
    const lenis = (window as any).__lenis;
    lenis?.start();
    document.body.style.overflow = '';
    setMenuOpen(false); 
  }

  // Scroll spy
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'gallery', 'contact'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = section;
          }
        }
      }

      if (window.scrollY < 100) {
        current = 'home';
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open is handled by toggleMenu now

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  if (!mounted) return null;

  // Helper function to apply active styles (desktop)
  const getLinkClasses = (sectionName: string) => {
    return `px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all hover-state-target text-sm ${activeSection === sectionName
        ? 'bg-[var(--accent)] text-white'
        : 'hover:bg-[var(--card)] bg-transparent transition-colors text-[var(--muted)] hover:text-[var(--fg)]'
      }`;
  };

  return (
    <>
      {/* ── Desktop pill nav ── */}
      <nav className="fixed top-[14px] left-1/2 -translate-x-1/2 z-50 animate-slide-down
                      w-[calc(100%-32px)] md:w-max max-w-[1080px]">
        <div className="rounded-full px-2 py-1.5 flex items-center text-sm font-jakarta
                        font-medium text-[var(--fg)] relative"
          style={{
            backgroundColor: 'var(--nav-bg)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}>

          {/* Left Links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2 pl-1 sm:pl-2">
            <a href="#home" className={getLinkClasses('home')} onClick={(e) => { e.preventDefault(); smoothScrollTo('home'); }}>Home</a>
            <a href="#about" className={getLinkClasses('about')} onClick={(e) => { e.preventDefault(); smoothScrollTo('about'); }}>About</a>
            <a href="#skills" className={getLinkClasses('skills')} onClick={(e) => { e.preventDefault(); smoothScrollTo('skills'); }}>Skills</a>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2
                          md:static md:left-auto md:translate-x-0 md:mx-4
                          flex items-center justify-center select-none">
            <img
              src="/logo.png"
              alt="Chirag Logo"
              className="h-10 md:h-8 w-auto object-contain hover-state-target"
            />
          </div>

          {/* Theme Toggle (Mobile only inside pill) */}
          <ThemeToggleBtn className="w-[34px] h-[34px] ml-auto md:hidden" />

          {/* Right Links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2 pr-1 sm:pr-2">
            <a href="#projects" className={getLinkClasses('projects')} onClick={(e) => { e.preventDefault(); smoothScrollTo('projects'); }}>Projects</a>
            <a href="#gallery" className={getLinkClasses('gallery')} onClick={(e) => { e.preventDefault(); smoothScrollTo('gallery'); }}>Gallery</a>
            <a href="#contact" className={getLinkClasses('contact')} onClick={(e) => { e.preventDefault(); smoothScrollTo('contact'); }}>Contact</a>
          </div>

          {/* Hamburger button — visible only on mobile */}
          <button
            onClick={toggleMenu}
            aria-label="Menu"
            className="md:hidden w-[38px] h-[38px] rounded-full flex flex-col items-center
                        justify-center gap-[5px] flex-shrink-0 ml-2
                       bg-[var(--card)] border border-[var(--border)] text-[var(--fg)]
                       active:bg-[var(--accent)] active:border-[var(--accent)]
                       transition-all duration-200 cursor-none"
          >
            <span
              className={`block h-[1.5px] bg-current rounded-sm origin-center
                          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                          ${menuOpen ? 'w-4 rotate-45 translate-y-[6.5px]' : 'w-4'}`}
            />
            <span
              className={`block h-[1.5px] bg-current rounded-sm
                          transition-all duration-200
                          ${menuOpen ? 'w-0 opacity-0' : 'w-4 opacity-100'}`}
            />
            <span
              className={`block h-[1.5px] bg-current rounded-sm origin-center
                          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                          ${menuOpen ? 'w-4 -rotate-45 -translate-y-[6.5px]' : 'w-4'}`}
            />
          </button>
        </div>
      </nav>

      {/* ── Theme Button Desktop (Top Right Corner) ── */}
      <div className="hidden md:block fixed z-50 top-[14px] right-4 lg:right-6 xl:right-10 animate-slide-down">
        <ThemeToggleBtn className="w-[38px] h-[38px] md:w-[40px] md:h-[40px] shadow-md border-opacity-50" />
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed z-[190] md:hidden"
            style={{ top: 72, left: 16, right: 16 }}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-[var(--menu-bg)] backdrop-blur-3xl
                            border border-[var(--border)]
                            rounded-3xl p-2 shadow-2xl">

              {/* Nav links */}
              {menuLinks.map((link, i) => (
                <MobileMenuItem
                  key={link.href}
                  link={link}
                  index={i}
                  onClose={closeMenu}
                  activeSection={activeSection}
                />
              ))}

              {/* Divider */}
              <div className="h-px bg-[var(--border)] my-1 mx-2" />

              {/* Social row */}
              <div className="flex gap-2 p-2">
                <a
                  href="https://github.com/Divinerchirag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2
                             rounded-full text-[11px] text-[var(--muted)]
                             bg-[var(--card)] border border-[var(--border)]
                             active:border-[var(--accent)] active:text-[var(--accent)]
                             transition-all"
                >
                  {/* GitHub icon */}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/chirag-yadav-979672240/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2
                             rounded-full text-[11px] text-[var(--muted)]
                             bg-[var(--card)] border border-[var(--border)]
                             active:border-[var(--accent)] active:text-[var(--accent)]
                             transition-all"
                >
                  {/* LinkedIn icon */}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Backdrop ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[180] bg-black/30"
            style={{ backdropFilter: 'blur(2px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}

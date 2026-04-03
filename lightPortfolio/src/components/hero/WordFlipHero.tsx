'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface WordFlipProps {
  staticText?: string;
  words?: string[];
  interval?: number;
}

export default function WordFlipHero({
  staticText = "I'm Chirag,",
  words = ["Software Engineer", "Photographer"],
  interval = 3200,
}: WordFlipProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className="flex flex-col animate-slide-up" style={{ animationDelay: '0.35s' }}>
      {/* Static line */}
      <span className="text-[var(--fg)] font-extrabold text-5xl sm:text-6xl lg:text-[72px] leading-tight tracking-tight font-jakarta">
        {staticText}
      </span>

      {/* Animated word */}
      <div style={{ perspective: "600px" }} className="overflow-visible min-h-[2.4em] md:min-h-[1.2em] mt-1 sm:mt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="flex flex-wrap text-accent font-extrabold text-5xl sm:text-6xl lg:text-[72px] leading-tight tracking-tight font-playfair italic"
            exit={{
              opacity: 0,
              scale: 1.4,
              filter: "blur(12px)",
              y: -60,
              transition: { duration: 0.45, ease: [0.4, 0, 1, 1] }
            }}
          >
            {words[currentIndex].split("").map((char, i) => (
              <motion.span
                key={`${currentIndex}-${i}`}
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: 40, rotateX: -90, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{
                  delay: i * 0.045,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

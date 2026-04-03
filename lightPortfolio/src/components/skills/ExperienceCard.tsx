'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Experience } from './skillsData'

export default function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className="group relative bg-[var(--card)] border border-[var(--border)]
                 rounded-2xl p-7 overflow-hidden cursor-none
                 hover:border-[var(--accent)] hover:-translate-y-0.5
                 transition-all duration-300"
    >
      {/* Left accent bar — slides in on hover */}
      <div className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-[var(--accent)]
                      rounded-r-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top row */}
      <div className="flex items-start gap-4 mb-5">

        {/* Logo */}
        <div
          className="w-12 h-12 rounded-[10px] overflow-hidden flex-shrink-0 flex items-center
                     justify-content-center border border-[var(--border)]
                     text-white font-extrabold text-[15px]"
          style={{ background: exp.logoBg }}
        >
          {!imgError ? (
            <img
              src={exp.logoPath}
              alt={exp.company}
              className="w-full h-full object-contain p-[6px]"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="w-full h-full flex items-center justify-center">
              {exp.logoFallback}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap mb-0.5">
            <h3 className="text-[17px] font-bold text-[var(--fg)] tracking-[-0.01em]">
              {exp.role}
            </h3>
            {exp.isActive && (
              <span className="text-[10px] px-2.5 py-0.5 bg-[rgba(249,115,22,0.12)]
                               text-[var(--accent)] border border-[rgba(249,115,22,0.3)]
                               rounded-full tracking-[0.1em] uppercase">
                Active
              </span>
            )}
          </div>
          <p className="text-[13px] text-[var(--accent)] font-medium mb-0.5">
            {exp.company} · {exp.type}
          </p>
          <p className="text-[12px] text-[var(--muted)] leading-relaxed">{exp.duration}</p>
          <p className="text-[12px] text-[var(--muted)]">{exp.location}</p>
        </div>

      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border)] mb-4" />

      {/* Description */}
      <p className="text-[14px] text-[var(--fg-secondary)] leading-[1.75] font-light mb-4">
        {exp.description}
      </p>

      {/* Skills pills */}
      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[11px] text-[var(--muted)] mr-1">Skills:</span>
        {exp.skills.map(skill => (
          <span
            key={skill}
            className="text-[11px] px-2.5 py-0.5 bg-[var(--bg)]
                       border border-[var(--border)] rounded-full text-[var(--fg-secondary)]
                       hover:border-[var(--accent)] hover:text-[var(--accent)]
                       transition-all duration-200 cursor-none"
          >
            {skill}
          </span>
        ))}
      </div>

    </motion.div>
  )
}

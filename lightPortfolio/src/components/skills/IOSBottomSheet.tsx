'use client';
import React, { useEffect, useRef } from 'react';
import { SKILLS, CAT_NAMES } from './skillsData';
import SkillIcon from './icons/SkillIcon';

interface Props {
  catId: string | null;
  onClose: () => void;
}

const PAGE_SIZE = 9; // 3×3 per page

function pauseLenisOnScroll(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const lenis = (window as any).__lenis

    const pause  = () => lenis?.stop()
    const resume = () => lenis?.start()

    el.addEventListener('mouseenter',  pause,  { passive: true })
    el.addEventListener('mouseleave',  resume, { passive: true })
    el.addEventListener('touchstart',  pause,  { passive: true })
    el.addEventListener('touchend',    resume, { passive: true })

    return () => {
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend',   resume)
    }
  }, [ref])
}

export default function IOSBottomSheet({ catId, onClose }: Props) {
  const isOpen = catId !== null;
  const sheetRef = useRef<HTMLDivElement>(null);
  pauseLenisOnScroll(sheetRef);

  const skillsList = catId ? SKILLS[catId as keyof typeof SKILLS] ?? [] : [];
  const title = catId ? CAT_NAMES[catId] ?? '' : '';

  // Paginate into groups of 9
  const pages: (typeof skillsList)[] = [];
  for (let i = 0; i < skillsList.length; i += PAGE_SIZE) {
    pages.push(skillsList.slice(i, i + PAGE_SIZE));
  }
  const totalPages = Math.max(pages.length, 1);

  return (
    <>
      {/* ── Full-screen blurred backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,.38)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          zIndex: 50,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity .28s ease',
        }}
      />

      {/* ── Folder card — centered, iOS-style ── */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 60,
          pointerEvents: isOpen ? 'all' : 'none',
        }}
      >
        <div
          ref={sheetRef}
          data-lenis-prevent
          onClick={e => e.stopPropagation()}
          style={{
            width: '88%',
            maxWidth: '290px',
            background: 'rgba(210,210,230,.28)',
            backdropFilter: 'blur(50px)',
            WebkitBackdropFilter: 'blur(50px)',
            borderRadius: '26px',
            border: '0.5px solid rgba(255,255,255,.35)',
            boxShadow: '0 30px 80px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.4)',
            padding: '22px 18px 18px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'scale(1)' : 'scale(0.88)',
            transition: 'opacity .28s ease, transform .32s cubic-bezier(.34,1.56,.64,1)',
          }}
        >
          {/* Title */}
          <span style={{
            fontSize: '20px', fontWeight: 700, color: '#fff',
            textShadow: '0 1px 8px rgba(0,0,0,.4)',
            letterSpacing: '-0.02em',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            {title}
          </span>

          {/* 3×3 icon grid — first page only (all our categories fit on 1 page) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px 10px',
            width: '100%',
          }}>
            {skillsList.map(sk => (
              <div
                key={sk.id}
                onClick={() => {
                  if ((sk as any).url) window.open((sk as any).url, '_blank', 'noopener,noreferrer');
                }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'transform 0.15s cubic-bezier(.34,1.56,.64,1)',
                }}
                onTouchStart={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.88)'; }}
                onTouchEnd={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; }}
                onMouseDown={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.88)'; }}
                onMouseUp={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; }}
              >
                {/* Squircle icon */}
                <div style={{
                  width: '62px', height: '62px', borderRadius: '16px',
                  overflow: 'hidden', position: 'relative',
                  boxShadow: '0 4px 14px rgba(0,0,0,.35)',
                }}>
                  <SkillIcon id={sk.id} size={62} />
                  {/* Gloss */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.04) 45%, transparent 65%)',
                    borderRadius: '16px', pointerEvents: 'none',
                  }} />
                </div>
                {/* Label */}
                <span style={{
                  fontSize: '10px', color: '#fff', fontWeight: 500,
                  textAlign: 'center', lineHeight: 1.25,
                  textShadow: '0 1px 4px rgba(0,0,0,.5)',
                  maxWidth: '64px',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  {sk.name}
                </span>
              </div>
            ))}
          </div>

          {/* Page dots */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div key={idx} style={{
                width: idx === 0 ? '7px' : '6px',
                height: idx === 0 ? '7px' : '6px',
                borderRadius: '50%',
                background: idx === 0 ? '#fff' : 'rgba(255,255,255,.4)',
                transition: 'all .2s',
              }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

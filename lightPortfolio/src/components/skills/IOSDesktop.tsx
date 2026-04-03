'use client';
import React, { useEffect, useState } from 'react';
import { SKILLS, CAT_NAMES } from './skillsData';



/* Category SVGs — used in dock & widget mini icons */
const CAT_SVG: Record<string, string> = {
  lang: '/icons/language.svg',
  fw:   '/icons/framework.svg',
  db:   '/icons/database.svg',
  dev:  '/icons/cloud.svg',
};
const CAT_ORDER = ['lang', 'fw', 'db', 'dev'];

/* Individual skill → SVG icon path (same as MacBook makeImg) */
const SKILL_ICON_MAP: Record<string, string> = {
  typescript:  '/icons/ts.svg',
  javascript:  '/icons/javascript.svg',
  java:        '/icons/java.svg',
  python:      '/icons/python.svg',
  react:       '/icons/react.svg',
  nodejs:      '/icons/nodejs.svg',
  express:     '/icons/express.svg',
  django:      '/icons/django.svg',
  tailwind:    '/icons/tailwind.svg',
  mongodb:     '/icons/mongodb.svg',
  postgresql:  '/icons/postgresql.svg',
  aws:         '/icons/aws.svg',
  docker:      '/icons/docker.svg',
  jenkins:     '/icons/jenkins.svg',
  github:      '/icons/github.svg',
};
/* Icons whose SVG already has a coloured background — fill the cell fully */
const FULL_BLEED_IDS = new Set(['typescript','javascript','java','python','react']);

/* Proficiency data matching HTML */
const PROF = [
  { label: 'TypeScript', pct: 95, grad: 'linear-gradient(90deg,#3178C6,#61DAFB)' },
  { label: 'React',      pct: 92, grad: 'linear-gradient(90deg,#61DAFB,#38bdf8)' },
  { label: 'Node.js',    pct: 88, grad: 'linear-gradient(90deg,#339933,#86efac)' },
  { label: 'Docker',     pct: 80, grad: 'linear-gradient(90deg,#2496ED,#818cf8)' },
  { label: 'AWS',        pct: 75, grad: 'linear-gradient(90deg,#FF9900,#fcd34d)' },
];

const totalSkills = Object.values(SKILLS).reduce((a, b) => a + b.length, 0);

interface Props {
  bootPhase: 'booting' | 'visible' | 'animated';
  onOpenSheet: (catId: string) => void;
  onOpenSpotlight: () => void;
}

export default function IOSDesktop({ bootPhase, onOpenSheet, onOpenSpotlight }: Props) {
  const [time, setTime] = useState('9:41');
  const [metersAnimated, setMetersAnimated] = useState(false);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      let h = d.getHours() % 12 || 12;
      const m = d.getMinutes().toString().padStart(2, '0');
      const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
      setTime(`${h}:${m} ${ampm}`);
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (bootPhase === 'animated') {
      setTimeout(() => setMetersAnimated(true), 300);
    }
  }, [bootPhase]);

  const iosVisible = bootPhase !== 'booting';
  const iconsAnimated = bootPhase === 'animated';

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      opacity: iosVisible ? 1 : 0,
      transition: 'opacity 0.7s ease',
      zIndex: 10,
    }}>

      {/* ── Status Bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '58px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: '14px',
        paddingLeft: '28px', paddingRight: '24px',
        zIndex: 25,
      }}>
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', fontFamily: '-apple-system, sans-serif', lineHeight: 1 }}>
          {time}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Signal */}
          <svg width="17" height="12" viewBox="0 0 17 12" fill="white" style={{ display: 'block' }}>
            <rect x="0" y="8.5" width="3" height="3.5" rx=".5"/>
            <rect x="4.5" y="6" width="3" height="6" rx=".5"/>
            <rect x="9" y="3" width="3" height="9" rx=".5"/>
            <rect x="13.5" y="0" width="3" height="12" rx=".5" opacity=".35"/>
          </svg>
          {/* WiFi */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ display: 'block' }}>
            <path d="M8 9.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="white"/>
            <path d="M4.5 6.8C5.6 5.7 6.75 5.1 8 5.1s2.4.6 3.5 1.7" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M1.5 4C3.3 2.1 5.5 1 8 1s4.7 1.1 6.5 3" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          {/* Battery */}
          <svg width="26" height="12" viewBox="0 0 26 12" fill="none" style={{ display: 'block' }}>
            <rect x=".5" y=".5" width="22" height="11" rx="3" stroke="white" strokeOpacity=".4"/>
            <rect x="2" y="2" width="17" height="8" rx="2" fill="white"/>
            <path d="M24 3.5v5a2.5 2.5 0 0 0 0-5z" fill="white" opacity=".45"/>
          </svg>
        </div>
      </div>

      {/* ── Scrollable home content ── */}
      <div style={{
        flex: 1, padding: '62px 18px 0',
        display: 'flex', flexDirection: 'column', gap: '16px',
        overflow: 'hidden',
      }}>

        {/* ── Widget Row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flexShrink: 0 }}>

          {/* Widget 1: Proficiency */}
          <div
            onClick={() => onOpenSheet('lang')}
            style={{
              background: 'rgba(20,70,160,.5)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              borderRadius: '22px',
              border: '0.5px solid rgba(255,255,255,.22)',
              padding: '12px 13px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,.3)',
              cursor: 'pointer',
            }}
          >
            {/* Header — orange dot + PROFICIENCY */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '9px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#f97316', flexShrink: 0 }} />
              <span style={{ fontSize: '8.5px', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>Proficiency</span>
            </div>
            {/* Meters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {PROF.map(p => (
                <div key={p.label} style={{ marginBottom: '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'rgba(255,255,255,.85)', marginBottom: '2px' }}>
                    <span>{p.label}</span><span>{p.pct}%</span>
                  </div>
                  <div style={{ height: '2.5px', background: 'rgba(255,255,255,.15)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '2px',
                      background: p.grad,
                      width: metersAnimated ? `${p.pct}%` : '0%',
                      transition: 'width 1.1s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 2: Arsenal */}
          <div
            onClick={() => onOpenSheet('dev')}
            style={{
              background: 'rgba(20,70,160,.5)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              borderRadius: '22px',
              border: '0.5px solid rgba(255,255,255,.22)',
              padding: '12px 13px',
              display: 'flex', flexDirection: 'column', gap: '5px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,.3)',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '8.5px', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>
              Arsenal
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
              {totalSkills}
            </div>
            <div style={{ fontSize: '8.5px', color: 'rgba(255,255,255,.6)', lineHeight: 1.4 }}>
              skills across 4 categories
            </div>
            {/* 4 mini icons row */}
            <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
              {CAT_ORDER.map(catId => (
                <div key={catId} style={{
                  width: '22px', height: '22px', borderRadius: '6px',
                  background: 'linear-gradient(135deg, rgba(30,30,30,.85), rgba(10,10,10,.95))',
                  boxShadow: '0 2px 6px rgba(0,0,0,.3)',
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={CAT_SVG[catId]} alt={catId} style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── App Grid (4 icons, 1 row) ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: '18px 10px', flexShrink: 0,
        }}>
          {CAT_ORDER.map((catId, i) => {
            const count = SKILLS[catId as keyof typeof SKILLS]?.length ?? 0;
            const label = CAT_NAMES[catId] === 'DevOps & Cloud' ? 'DevOps &\u00a0...' : CAT_NAMES[catId];
            return (
              <div
                key={catId}
                onClick={() => onOpenSheet(catId)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
                  cursor: 'pointer', position: 'relative',
                  opacity: iconsAnimated ? 1 : 0,
                  transform: iconsAnimated ? 'scale(1)' : 'scale(.55)',
                  transition: `opacity .35s ${i * 90}ms, transform .45s cubic-bezier(.34,1.56,.64,1) ${i * 90}ms`,
                }}
              >
                {/* iOS App Library-style folder bubble */}
                <div style={{
                  width: '58px', height: '58px', borderRadius: '14px',
                  background: 'linear-gradient(145deg, rgba(60,80,120,.75), rgba(20,30,60,.9))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  position: 'relative',
                  boxShadow: '0 4px 14px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.12)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  gap: '3px',
                  padding: '7px',
                  flexShrink: 0,
                }}>
                  {(SKILLS[catId as keyof typeof SKILLS] ?? []).slice(0, 4).map(sk => {
                    const src = SKILL_ICON_MAP[sk.id];
                    const full = FULL_BLEED_IDS.has(sk.id);
                    return (
                      <div key={sk.id} style={{
                        borderRadius: '4px',
                        overflow: 'hidden',
                        aspectRatio: '1',
                        background: full ? 'transparent' : 'rgba(255,255,255,.92)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {src && (
                          <img
                            src={src}
                            alt={sk.id}
                            style={{
                              width: full ? '100%' : '75%',
                              height: full ? '100%' : '75%',
                              objectFit: 'contain',
                              display: 'block',
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                  {/* Gloss overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,.04) 40%, transparent 65%)',
                    borderRadius: '14px', pointerEvents: 'none',
                  }} />
                  {/* Badge */}
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    minWidth: '16px', height: '16px', padding: '0 4px',
                    background: '#FF3B30', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '8px', color: '#fff', fontWeight: 700, zIndex: 5,
                    boxShadow: '0 2px 4px rgba(0,0,0,.4)',
                  }}>
                    {count}
                  </div>
                </div>
                {/* Label */}
                <span style={{
                  fontSize: '9.5px', color: '#fff', fontWeight: 500,
                  textAlign: 'center', textShadow: '0 1px 4px rgba(0,0,0,.6)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  maxWidth: '62px',
                }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Dock ── */}
      <div style={{
        background: 'rgba(255,255,255,.22)',
        backdropFilter: 'blur(35px)',
        WebkitBackdropFilter: 'blur(35px)',
        borderRadius: '32px',
        padding: '13px 22px',
        margin: '4px 14px 26px',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        border: '0.5px solid rgba(255,255,255,.28)',
        boxShadow: '0 12px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.3)',
        flexShrink: 0,
      }}>
        {CAT_ORDER.map((catId, i) => (
          <div
            key={`dock-${catId}`}
            onClick={() => onOpenSheet(catId)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              cursor: 'pointer',
              opacity: iconsAnimated ? 1 : 0,
              transform: iconsAnimated ? 'scale(1)' : 'scale(.55)',
              transition: `opacity .35s ${400 + i * 70}ms, transform .45s cubic-bezier(.34,1.56,.64,1) ${400 + i * 70}ms`,
            }}
          >
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(30,30,30,.85), rgba(10,10,10,.95))',
              overflow: 'hidden', position: 'relative',
              boxShadow: '0 4px 12px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src={CAT_SVG[catId]} alt={catId} style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(255,255,255,.18) 0%, transparent 55%)',
                borderRadius: '14px', pointerEvents: 'none',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

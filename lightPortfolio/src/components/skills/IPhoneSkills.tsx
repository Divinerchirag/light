'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const IOSDesktop = dynamic(() => import('./IOSDesktop'), { ssr: false });
const IOSBottomSheet = dynamic(() => import('./IOSBottomSheet'), { ssr: false });
const IOSSpotlight = dynamic(() => import('./IOSSpotlight'), { ssr: false });

export default function IPhoneSkills() {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [bootPhase, setBootPhase] = useState<'booting' | 'visible' | 'animated'>('booting');

  useEffect(() => {
    const noop = () => {};
    document.addEventListener('touchstart', noop, { passive: true });
    return () => document.removeEventListener('touchstart', noop);
  }, []);

  useEffect(() => {
    const el = document.getElementById('iphone-root');
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        // t=1600ms fade out boot, t=2400ms show ios, t=2600ms animate icons
        setTimeout(() => setBootPhase('visible'), 1600);
        setTimeout(() => setBootPhase('animated'), 2600);
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div id="iphone-root" style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '20px 0 48px' }}>
      <style>{`
        @keyframes glowp { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes wpa { from{opacity:.8} to{opacity:1} }
        @keyframes wpb { from{opacity:.6} to{opacity:.95} }
        @keyframes shimb { 0%{transform:translateX(-25%)} 100%{transform:translateX(25%)} }
      `}</style>

      {/* Orange glow beneath phone */}
      <div style={{
        position: 'absolute', bottom: '18px', left: '50%', transform: 'translateX(-50%)',
        width: '55%', height: '30px',
        background: 'radial-gradient(ellipse, rgba(249,115,22,.55) 0%, transparent 70%)',
        filter: 'blur(16px)',
        animation: 'glowp 3s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Titanium iPhone 16 Pro chassis ── */}
      <div style={{
        position: 'relative',
        width: '320px', height: '690px',
        background: 'linear-gradient(155deg,#a8a8ad 0%,#787880 20%,#b0b0b5 40%,#6a6a70 60%,#9a9a9f 80%,#b5b5ba 100%)',
        borderRadius: '56px',
        padding: '3.5px',
        boxShadow: `
          0 0 0 0.5px rgba(255,255,255,.15),
          0 0 0 1px rgba(0,0,0,.9),
          0 50px 100px rgba(0,0,0,.85),
          0 20px 50px rgba(0,0,0,.6),
          inset 0 1px 0 rgba(255,255,255,.3),
          inset 0 -1px 0 rgba(0,0,0,.4)
        `,
        flexShrink: 0, zIndex: 1,
      }}>
        {/* Side buttons */}
        <div style={{ position:'absolute', left:'-4px', top:'106px', width:'3.5px', height:'30px', background:'linear-gradient(90deg,#5a5a5f,#8a8a8f,#5a5a5f)', borderRadius:'2px 0 0 2px' }} />
        <div style={{ position:'absolute', left:'-4px', top:'152px', width:'3.5px', height:'44px', background:'linear-gradient(90deg,#5a5a5f,#8a8a8f,#5a5a5f)', borderRadius:'2px 0 0 2px' }} />
        <div style={{ position:'absolute', left:'-4px', top:'208px', width:'3.5px', height:'44px', background:'linear-gradient(90deg,#5a5a5f,#8a8a8f,#5a5a5f)', borderRadius:'2px 0 0 2px' }} />
        <div style={{ position:'absolute', right:'-4px', top:'175px', width:'3.5px', height:'76px', background:'linear-gradient(90deg,#8a8a8f,#5a5a5f,#8a8a8f)', borderRadius:'0 2px 2px 0' }} />

        {/* Inner screen */}
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          background: '#000', borderRadius: '53px', overflow: 'hidden',
          boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,.05)',
        }}>

          {/* ── Wallpaper (matches reference exactly) ── */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(160deg,#1860c8 0%,#1478d4 18%,#0ea8d8 35%,#0cbba8 52%,#10c87a 68%,#1478c8 85%,#1860c8 100%)',
          }}>
            {/* Radial overlay 1 */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `
                radial-gradient(ellipse 130% 70% at 25% 35%, rgba(120,200,255,.55) 0%, transparent 55%),
                radial-gradient(ellipse 90% 90% at 78% 65%, rgba(16,200,130,.45) 0%, transparent 50%),
                radial-gradient(ellipse 70% 50% at 55% 85%, rgba(25,120,230,.5) 0%, transparent 45%)
              `,
              animation: 'wpa 9s ease-in-out infinite alternate',
            }} />
            {/* Radial overlay 2 */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `
                radial-gradient(ellipse 110% 55% at 72% 22%, rgba(0,210,255,.35) 0%, transparent 50%),
                radial-gradient(ellipse 80% 65% at 28% 72%, rgba(10,90,210,.4) 0%, transparent 48%)
              `,
              animation: 'wpb 11s ease-in-out infinite alternate',
            }} />
          </div>

          {/* ── Dynamic Island — z-index above folder overlay ── */}
          <div style={{
            position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
            width: '128px', height: '38px',
            background: '#000', borderRadius: '24px', zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            boxShadow: '0 0 0 0.5px rgba(255,255,255,.07)',
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#111', border: '2px solid #1e1e1e', boxShadow: 'inset 0 0 4px rgba(0,150,255,.2)' }} />
            <div style={{ width: '46px', height: '5px', borderRadius: '3px', background: '#111' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#111', border: '2px solid #1e1e1e', boxShadow: 'inset 0 0 4px rgba(0,150,255,.2)' }} />
          </div>

          {/* Home screen */}
          <IOSDesktop
            bootPhase={bootPhase}
            onOpenSheet={setActiveSheet}
            onOpenSpotlight={() => setSpotlightOpen(true)}
          />

          {/* ── Boot screen ── */}
          <div style={{
            position: 'absolute', inset: 0, background: '#000',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px',
            zIndex: 200,
            opacity: bootPhase === 'booting' ? 1 : 0,
            pointerEvents: bootPhase === 'booting' ? 'auto' : 'none',
            transition: 'opacity 0.8s ease',
          }}>
            <img
              src="/icons/apple.svg"
              alt="Apple"
              style={{ width: '52px', height: '64px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            />
            <div style={{ width: '110px', height: '3px', background: 'rgba(255,255,255,.15)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', background: '#fff', borderRadius: '2px',
                animation: bootPhase === 'booting' ? 'none' : undefined,
                width: bootPhase === 'booting' ? '0%' : '100%',
                transition: 'width 1.8s 0.5s ease',
              }} />
            </div>
          </div>

          {/* Spotlight */}
          {spotlightOpen && (
            <IOSSpotlight
              onClose={() => setSpotlightOpen(false)}
              onSelect={(catId) => { setSpotlightOpen(false); setActiveSheet(catId); }}
            />
          )}

          {/* Bottom sheet */}
          <IOSBottomSheet catId={activeSheet} onClose={() => setActiveSheet(null)} />
        </div>
      </div>
    </div>
  );
}

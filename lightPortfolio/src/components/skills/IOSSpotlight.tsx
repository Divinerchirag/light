'use client';
import React, { useState, useEffect, useRef } from 'react';
import { SKILLS, CAT_NAMES } from './skillsData';
import SkillIcon from './icons/SkillIcon';

interface Props {
  onClose: () => void;
  onSelect: (catId: string) => void;
}

const allSkills = Object.entries(SKILLS).flatMap(([catId, items]) =>
  items.map(item => ({ ...item, catId, catName: CAT_NAMES[catId] }))
);

export default function IOSSpotlight({ onClose, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim()
    ? allSkills.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.catName.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute', inset: 0, zIndex: 70,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        display: 'flex', justifyContent: 'center',
        paddingTop: '50px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '90%', maxWidth: '272px',
          background: 'rgba(210,210,225,0.93)',
          borderRadius: '16px',
          border: '0.5px solid rgba(255,255,255,0.5)',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Input row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', borderBottom: '0.5px solid rgba(0,0,0,0.1)' }}>
          <svg fill="rgba(0,0,0,0.4)" width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path d="M10.035,18.069a7.981,7.981,0,0,0,3.938-1.035l3.332,3.332a2.164,2.164,0,0,0,3.061-3.061l-3.332-3.332A8.032,8.032,0,0,0,4.354,4.354a8.034,8.034,0,0,0,5.681,13.715ZM5.768,5.768A6.033,6.033,0,1,1,4,10.035,5.989,5.989,0,0,1,5.768,5.768Z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search skills…"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: '15px', color: '#111', fontFamily: 'SF Pro Display, -apple-system, sans-serif',
            }}
          />
          <span style={{ fontSize: '9px', color: 'rgba(0,0,0,0.3)' }}>ESC</span>
        </div>

        {/* Results */}
        {query.trim() && results.length === 0 && (
          <div style={{ padding: '12px', fontSize: '12px', color: 'rgba(0,0,0,0.4)', textAlign: 'center' }}>No results</div>
        )}
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {results.map(s => (
            <div
              key={`${s.catId}-${s.id}`}
              onClick={() => onSelect(s.catId)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 12px', cursor: 'pointer',
                borderBottom: '0.5px solid rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.15)', padding: '4px' }}>
                <SkillIcon id={s.id} size={24} />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#1a1a1a' }}>{s.name}</div>
                <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.45)' }}>{s.catName}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

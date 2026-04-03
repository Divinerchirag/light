import React from 'react';

// Maps skill IDs to the same /icons/*.svg files used by the MacBook skills section
const ICON_MAP: Record<string, string> = {
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

// Icons that already have their own coloured background in the SVG — render full-bleed
const FULL_BLEED = new Set(['typescript', 'javascript', 'java', 'python', 'react']);

export default function SkillIcon({ id, size = 36 }: { id: string; size?: number }) {
  const src = ICON_MAP[id];
  if (!src) return null;

  const radius = Math.round(size * 0.22);

  if (FULL_BLEED.has(id)) {
    return (
      <img
        src={src}
        alt={id}
        width={size}
        height={size}
        style={{ width: size, height: size, borderRadius: radius, display: 'block', objectFit: 'cover', flexShrink: 0 }}
      />
    );
  }

  // Other icons: white card background, icon at 70% size (matches MacBook wrapper logic)
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: '#ffffff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      overflow: 'hidden',
    }}>
      <img
        src={src}
        alt={id}
        style={{ width: '70%', height: '70%', objectFit: 'contain', display: 'block' }}
      />
    </div>
  );
}

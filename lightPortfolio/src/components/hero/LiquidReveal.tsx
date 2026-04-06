'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SplatPoint {
  rb: number;
  ph: number;
  sp: number;
  am: number;
}

class Splat {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  targetSize: number;
  life: number;
  decay: number;
  growing: boolean;
  t: number;
  pts: SplatPoint[];

  constructor(x: number, y: number, speed: number) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = 0;
    this.targetSize = Math.min(85 + speed * 3 + Math.random() * 40, 230);
    this.life = 1;
    this.decay = 0;
    this.growing = true;
    this.t = 0;
    this.pts = Array.from({ length: 8 }).map(() => ({
      rb: 0.7 + Math.random() * 0.34, // 0.7 - 1.04
      ph: Math.random() * Math.PI * 2,
      sp: 0.5 + Math.random() * 0.5,
      am: 0.05 + Math.random() * 0.15,
    }));
  }
}

interface LiquidRevealProps {
  frontImage: string;
  backImage: string;
}

export default function LiquidReveal({ frontImage, backImage }: LiquidRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backImgRef = useRef<HTMLImageElement>(null);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const backImg = backImgRef.current;
    if (!canvas || !container || !backImg) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let splats: Splat[] = [];
    let animationFrameId: number;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let time = 0;
    let hovering = false;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        canvas.width = entry.contentRect.width;
        canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - lastMouseX;
      const dy = y - lastMouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (hovering && (distance > 7 || splats.length === 0)) {
        const speed = Math.min(distance, 50);
        const newSplat = new Splat(x, y, speed);
        newSplat.vx = dx * 0.1;
        newSplat.vy = dy * 0.1;
        splats.push(newSplat);

        if (splats.length > 18) {
          splats.shift();
        }
      }

      lastMouseX = x;
      lastMouseY = y;
    };

    const handleMouseEnter = () => {
      hovering = true;
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      hovering = false;
      setIsHovering(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      time += 0.016;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isVisible && splats.length === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (splats.length === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'white';
      ctx.beginPath();

      let activeSplats = 0;

      for (let i = 0; i < splats.length; i++) {
        const splat = splats[i];

        splat.x += splat.vx;
        splat.y += splat.vy;
        splat.vx *= 0.95;
        splat.vy *= 0.95;
        splat.t += 0.016;

        if (splat.size < splat.targetSize) {
          splat.size += (splat.targetSize - splat.size) * 0.1;
        }

        if (!hovering) {
          splat.decay += 0.013;
          splat.life = Math.max(0, 1 - splat.decay * splat.decay * 2.4);
        } else if (splat.decay > 0) {
          splat.decay -= 0.022;
          splat.decay = Math.max(0, splat.decay);
          splat.life = Math.max(0, 1 - splat.decay * splat.decay * 2.4);
        }

        if (splat.life > 0.01) {
          activeSplats++;
          const currentRadius = splat.size * splat.life;

          // Draw blob shape
          ctx.moveTo(
            splat.x + Math.cos(0) * currentRadius * splat.pts[0].rb * (1 + splat.pts[0].am * Math.sin(0 * 3.6 + splat.t * splat.pts[0].sp * 55 + splat.pts[0].ph)),
            splat.y + Math.sin(0) * currentRadius * splat.pts[0].rb * (1 + splat.pts[0].am * Math.sin(0 * 3.6 + splat.t * splat.pts[0].sp * 55 + splat.pts[0].ph))
          );

          for (let j = 0; j <= 32; j++) {
            const angle = (j / 32) * Math.PI * 2;
            const p = splat.pts[j % 8];
            const radialMult = p.rb * (1 + p.am * Math.sin(angle * 3.6 + splat.t * p.sp * 55 + p.ph));
            const px = splat.x + Math.cos(angle) * currentRadius * radialMult;
            const py = splat.y + Math.sin(angle) * currentRadius * radialMult;
            ctx.lineTo(px, py);
          }
        }
      }

      ctx.fill();

      // Mask and draw the revealed image (Avatar/Back image)
      ctx.globalCompositeOperation = 'source-in';

      // To cover the mask properly with object-fit: cover logic
      if (backImg.complete && backImg.naturalWidth > 0 && activeSplats > 0) {
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = backImg.naturalWidth;
        const ih = backImg.naturalHeight;

        const canvasRatio = cw / ch;
        const imgRatio = iw / ih;

        let dw = cw;
        let dh = ch;
        let dx = 0;
        let dy = 0;
        if (imgRatio > canvasRatio) {
          dw = ch * imgRatio;
          dx = (cw - dw) / 2;
          dy = 0;
        } else {
          dh = cw / imgRatio;
          dx = (cw - dw) / 2;
          dy = 0; // top center
        }

        ctx.drawImage(backImg, 0, 0, iw, ih, dx, dy, dw, dh);
      }

      ctx.globalCompositeOperation = 'source-over';

      if (!hovering && activeSplats === 0) {
        splats = [];
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full aspect-[3/4] flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        style={{ borderRadius: '0px' }}
      >
        {/* Back Image (Avatar) - Hidden from view, used as source by canvas */}
        <img
          ref={backImgRef}
          src={backImage}
          alt="Avatar"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-0 z-0 pointer-events-none"
        />

        {/* Front Image (Real photo) - Visible by default */}
        <img
          src={frontImage}
          alt="Real Photo"
          className="absolute inset-0 w-full h-full object-cover object-top z-10 pointer-events-none"
        />

        {/* Canvas Mask Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        />
      </div>

      <div className={`mt-4 text-xs tracking-widest uppercase transition-colors duration-500 font-jakarta ${isHovering ? 'text-accent' : 'text-muted-hero'}`}>
        ● Hover to reveal
      </div>
    </div>
  );
}

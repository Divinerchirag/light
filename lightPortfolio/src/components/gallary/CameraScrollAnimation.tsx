'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useSpring, motion, useTransform } from 'framer-motion';
import GallerySection from "@/components/gallary/DomeGallery";
// import Gallery from './Gallery';

const FRAME_COUNT = 523; // Exactly 523 frames (frames_00001 to frames_00523)

export default function CameraScrollAnimation() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/sequence/frames_${String(i + 1).padStart(5, '0')}.png`;
      img.onload = () => {
        loadedCount++;
        loadedImages[i] = img;
        setProgress((loadedCount / FRAME_COUNT) * 100);

        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load frame ${i}`);
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoading(false);
        }
      }
    }

    return () => {
      loadedImages.forEach(img => { img.onload = null; img.onerror = null; });
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white/90">
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-xs font-mono tracking-widest text-white/60">LOADING OPTICS {Math.round(progress)}%</p>
      </div>
    );
  }

  return <CameraScrollContent images={images} />;
}

function CameraScrollContent({ images }: { images: HTMLImageElement[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sync scroll to frame drawing
  const renderFrameIndex = useCallback((index: number) => {
    if (!canvasRef.current || images.length !== FRAME_COUNT) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    const img = images[index];
    if (!img) return;

    // HD 4K Retina Display Scaling
    const dpr = window.devicePixelRatio || 1;
    const canvas = canvasRef.current;

    // Get the CSS display size
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    // Set actual internal memory size to scaled resolution
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    // Normalize coordinate system to use css pixels
    context.save();
    context.scale(dpr, dpr);

    // Maximize rendering quality when scaling
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    const hRatio = displayWidth / img.width;
    const vRatio = displayHeight / img.height;
    // use cover strategy slightly zoomed to ensure edges don't show
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (displayWidth - img.width * ratio) / 2;
    const centerShift_y = (displayHeight - img.height * ratio) / 2;

    // Background to deep black, seamlessly blending the dark borders of the frames
    context.clearRect(0, 0, displayWidth, displayHeight);
    context.fillStyle = '#050505';
    context.fillRect(0, 0, displayWidth, displayHeight);

    context.drawImage(img, 0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

    context.restore();
  }, [images]);

  useEffect(() => {
    // Render the very first frame immediately on mount
    renderFrameIndex(0);
  }, [renderFrameIndex]);

  useEffect(() => {
    smoothProgress.on("change", (latest) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(latest * FRAME_COUNT)
      );
      requestAnimationFrame(() => renderFrameIndex(frameIndex));
    });
    return () => smoothProgress.clearListeners();
  }, [smoothProgress, renderFrameIndex]);

  // Resize Handler ensuring the canvas correctly fills
  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => renderFrameIndex(Math.min(FRAME_COUNT - 1, Math.floor(smoothProgress.get() * FRAME_COUNT))));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrameIndex, smoothProgress]);

  return (
    <div id="gallery">
      <div ref={containerRef} className="h-[400vh] relative bg-[#050505]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "contrast(1.1) saturate(1.1) brightness(1.05)" }}
          />

          <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
            {/* Scroll Indicator */}
            <OpacityLayer
              progress={smoothProgress}
              inputRange={[0, 0.05]}
              outputRange={[1, 0]}
              yOffset={[0, 0]}
            >
              {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Scroll To Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
              </div> */}
            </OpacityLayer>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div style={{ width: "100vw", height: "100vh" }}>
          <GallerySection
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={9}
            segments={30}
            dragDampening={2}
            grayscale={false}
          />
        </div>
        {/* <Gallery /> */}
      </motion.div>
    </div>
  );
}

// Helper component for fade-in & out text blocks aligned with prompt logic
function TextOverlay({ progress, range, title, subtitle }: {
  progress: any,
  range: [number, number, number, number],
  title: string,
  subtitle: string
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [20, 0, 0, -20]);

  return (
    <motion.div
      className="absolute text-center flex flex-col items-center px-4"
      style={{ opacity, y } as any}
    >
      <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white/90 mb-4">{title}</h2>
      <p className="text-sm md:text-base font-light tracking-wide text-white/60 max-w-md">{subtitle}</p>
    </motion.div>
  );
}

// Wrapper to just animate opacity/translation based on ranges
function OpacityLayer({ children, progress, inputRange, outputRange, yOffset = [0, -20] }: any) {
  const opacity = useTransform(progress, inputRange, outputRange);
  const y = useTransform(progress, inputRange, yOffset);
  return (
    <motion.div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center" style={{ opacity, y } as any}>
      {children}
    </motion.div>
  )
}

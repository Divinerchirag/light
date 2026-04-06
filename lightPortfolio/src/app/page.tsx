'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/hero/HeroSection';
import CustomCursor from '@/components/hero/CustomCursor';
import AboutSection from '@/components/about/AboutSection';

// Lazy load heavy below-the-fold sections
const SkillsSection = dynamic(() => import('@/components/skills/SkillsSection'), { ssr: true });
const ProjectsSection = dynamic(() => import('@/components/projects/ProjectsSection'), { ssr: true });
const GallerySection = dynamic(() => import('@/components/gallary/CameraScrollAnimation'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/contact/ContactSection'), { ssr: true });

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}

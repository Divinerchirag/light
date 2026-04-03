import HeroSection from '@/components/hero/HeroSection';
import CustomCursor from '@/components/hero/CustomCursor';
import AboutSection from '@/components/about/AboutSection';
import SkillsSection from '@/components/skills/SkillsSection';
import ProjectsSection from '@/components/projects/ProjectsSection';

import GallerySection from '@/components/gallary/CameraScrollAnimation';
import ContactSection from '@/components/contact/ContactSection';

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

export interface Project {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  description: string;
  coverBg: string;
  coverAccent: string;
  liveUrl: string;
  repoUrl: string;
  tags: string[];
  date: string;
  emoji: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'cert-generator',
    title: 'Certificate Generator',
    category: 'Full Stack App',
    categoryColor: '#f97316',
    description:
      'Automated certificate generation platform with custom templates, bulk export, and QR verification.',
    coverBg: '#1a1a2e',
    coverAccent: '#f97316',
    liveUrl: 'https://certificates.sarvarth.com',
    repoUrl: 'https://github.com/divinerchirag/cert',
    tags: ['React.js', 'TypeScript', 'PostgreSQL'],
    date: 'Mar 2025',
    emoji: '📜',
    image: '/assets/CertificateWeb.png',
  },
  {
    id: 'dev-assistant',
    title: 'Smart Developer Assistant',
    category: 'AI Tool',
    categoryColor: '#8b5cf6',
    description:
      'AI-integrated collaboration platform with coding, multi-user support, and in-browser execution.',
    coverBg: '#0f1923',
    coverAccent: '#8b5cf6',
    liveUrl: 'https://sda.chirag.dev',
    repoUrl: 'https://github.com/divinerchirag/sda',
    tags: ['React', 'JavaScript', 'Node.js'],
    date: 'Jan 2025',
    emoji: '🤖',
    image: '/assets/SmartDeveloper.png',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    category: 'Frontend',
    categoryColor: '#10b981',
    description:
      'Personal portfolio with macOS skill simulator, physics lanyard, liquid hover reveal, and animated sections.',
    coverBg: '#0a0a0a',
    coverAccent: '#10b981',
    liveUrl: 'https://chirag.dev',
    repoUrl: 'https://github.com/chirag/lightPortfolio',
    tags: ['Next.js', 'Three.js', 'Framer Motion'],
    date: 'Mar 2025',
    emoji: '✦',
    image: '/assets/Porfolioweb1.png',
  },
];

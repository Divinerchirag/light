export interface Experience {
  id: string
  role: string
  company: string
  type: string
  duration: string
  location: string
  isActive: boolean
  logoPath: string
  logoBg: string
  logoFallback: string
  description: string
  skills: string[]
}

export const experiences: Experience[] = [
  {
    id: 'sarvarth',
    role: 'Engineering Intern',
    company: 'Sarvarth',
    type: 'Internship',
    duration: 'Nov 2025 - Present · 5 mos',
    location: 'Pune, Maharashtra, India · On-site',
    isActive: true,
    logoPath: '/assets/Image/sarvarthLogo.jpg',
    logoBg: '#ffffff',
    logoFallback: 'S',
    description: 'Software Engineering Intern building scalable, production-grade systems using TypeScript, React, Express.js, and PostgreSQL. Experienced in end-to-end development, system design, and cloud deployment with AWS and Docker.',
    skills: ['TypeScript', 'Express.js', 'React.js', 'PostgreSQL', 'AWS', 'Docker', 'Jenkins'],
  },
  {
    id: 'drdo',
    role: 'Research Intern',
    company: 'Defence Research and Development Organisation (DRDO)',
    type: 'Internship',
    duration: 'Jan 2025 - Jun 2025 · 6 mos',
    location: 'Pune, Maharashtra, India',
    isActive: false,
    logoPath: '/assets/Image/drdo-logo.png',
    logoBg: '#1e3a5f',
    logoFallback: 'DR',
    description: 'Research Intern at DRDO DIAT focused on quantum cryptography and its impact on modern encryption systems, including analysis of quantum attack models and secure communication frameworks.',
    skills: ['Research Skills', 'Institutional Research', 'Quantum Cryptography'],
  },
]

export const SKILLS = {
  lang: [
    { id: 'typescript', name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
    { id: 'javascript', name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { id: 'java',       name: 'Java',       url: 'https://www.java.com/' },
    { id: 'python',     name: 'Python',     url: 'https://www.python.org/' },
  ],
  fw: [
    { id: 'react',    name: 'React',    url: 'https://react.dev/' },
    { id: 'nodejs',   name: 'Node.js',  url: 'https://nodejs.org/' },
    { id: 'express',  name: 'Express',  url: 'https://expressjs.com/' },
    { id: 'django',   name: 'Django',   url: 'https://www.djangoproject.com/' },
    { id: 'tailwind', name: 'Tailwind', url: 'https://tailwindcss.com/' },
  ],
  db: [
    { id: 'mongodb',    name: 'MongoDB',    url: 'https://www.mongodb.com/' },
    { id: 'postgresql', name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
  ],
  dev: [
    { id: 'aws',     name: 'AWS',     url: 'https://aws.amazon.com/' },
    { id: 'docker',  name: 'Docker',  url: 'https://www.docker.com/' },
    { id: 'jenkins', name: 'Jenkins', url: 'https://www.jenkins.io/' },
    { id: 'github',  name: 'GitHub',  url: 'https://github.com/' },
  ],
}

export const CAT_NAMES: Record<string, string> = {
  lang: 'Languages',
  fw:   'Frameworks',
  db:   'Databases',
  dev:  'DevOps & Cloud',
}

export const CAT_META: Record<string, { emoji_icon: string, color: string }> = {
  lang: { emoji_icon: 'typescript', color: '#3178C6' },
  fw:   { emoji_icon: 'react',      color: '#61DAFB' },
  db:   { emoji_icon: 'mongodb',    color: '#47A248' },
  dev:  { emoji_icon: 'aws',        color: '#FF9900' },
}

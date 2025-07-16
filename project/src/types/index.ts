export interface PersonalInfo {
  name: string;
  bio: string;
  github: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface SocialInfo {
  linkedin: string;
  twitter: string;
  instagram: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  repo: string;
  demo?: string;
  technologies: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  location?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  contact: ContactInfo;
  social: SocialInfo;
  skills: Skill[];
  experience: WorkExperience[];
  achievements: Achievement[];
  projects: Project[];
  resume?: File;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  theme: 'light' | 'dark' | 'modern' | 'creative' | 'minimal';
}
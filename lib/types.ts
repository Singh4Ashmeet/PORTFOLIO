export type SocialLink = {
  label: string;
  short: string;
  handle: string;
  href: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Profile = {
  name: string;
  role: string;
  hero: {
    leftLabel: string;
    primaryWords: string[];
    bio: string;
    rightTagline: string;
    openToWork: string;
    scrollLabel: string;
    projectCta: string;
    cvCta: string;
  };
  about: {
    tagline: string;
    bio: string;
  };
  location: string;
  email: string;
  phone: string;
  education: {
    degree: string;
    school: string;
    timeline: string;
    coursework: string;
  };
  socials: SocialLink[];
  nav: NavLink[];
  stats: Stat[];
  featured: {
    label: string;
    title: string;
    description: string;
  };
  resume: {
    label: string;
    url: string;
    linkText: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metric: string;
  role: string;
  timeline: string;
  image: {
    src: string;
    alt: string;
  };
  outcomes: string[];
  featured: boolean;
  githubUrl: string;
  demoUrl: string | null;
};

export type CaseStudy = {
  problem: string;
  architecture: string[];
  decisions: string[];
  codeSnippet: string;
};

export type Certification = {
  title: string;
  issuer: string;
  displayYear: string;
  asset: {
    image?: string;
    pdf?: string;
  };
  credentialUrl?: string;
  description: string;
  tags: string[];
};

export type SkillGroups = Record<string, string[]>;

export type LeadershipItem = {
  title: string;
  organization: string;
  timeline: string;
  bullets: string[];
};

export type Achievement = {
  icon: string;
  title: string;
  context: string;
};

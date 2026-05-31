import achievementsData from "@/data/achievements.json";
import caseStudiesData from "@/data/case-studies.json";
import certificationsData from "@/data/certifications.json";
import leadershipData from "@/data/leadership.json";
import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import type {
  Achievement,
  CaseStudy,
  Certification,
  LeadershipItem,
  Profile,
  Project,
  SkillGroups,
} from "@/lib/types";

export const profile = profileData as Profile;
export const projects = projectsData as Project[];
export const skills = skillsData as SkillGroups;
export const leadership = leadershipData as LeadershipItem[];
export const achievements = achievementsData as Achievement[];
export const certifications = certificationsData as Certification[];
export const caseStudies = caseStudiesData as Record<string, CaseStudy>;

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies[slug];
}

export function getProjectTags() {
  return Array.from(
    new Set(projects.flatMap((project) => project.tags)),
  ).sort();
}

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getFeaturedProjects, profile } from "@/lib/data";

export function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section
      id="featured-projects"
      className="section-y relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent"
        aria-hidden="true"
      />
      <div className="container-page">
        <MotionReveal className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <SectionLabel>{profile.featured.label}</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold leading-none text-white md:text-6xl">
              {profile.featured.title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-[1.8] text-secondary md:text-base">
              {profile.featured.description}
            </p>
          </div>
          <Link
            href="/projects"
            className="trace-link w-fit font-mono text-[12px] uppercase tracking-[0.16em] text-accent"
          >
            view all projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </MotionReveal>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <MotionReveal key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

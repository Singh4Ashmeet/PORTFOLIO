import type { Metadata } from "next";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getProjectTags, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Filterable project case studies for Ashmeet Singh's backend and AI portfolio.",
};

export default function ProjectsPage() {
  return (
    <div className="container-page pb-24 pt-28 md:pb-28 md:pt-32">
      <div className="mb-9 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
        <div>
          <SectionLabel>{">"} selected systems</SectionLabel>
          <h1 className="mt-5 font-mono text-4xl font-bold uppercase leading-none tracking-tight text-white md:text-6xl">
            Index of works
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-[1.8] text-secondary lg:justify-self-end">
          Filterable project case studies for backend systems, AI products, and
          production-oriented engineering outcomes.
        </p>
      </div>
      <ProjectFilter projects={projects} tags={getProjectTags()} />
    </div>
  );
}

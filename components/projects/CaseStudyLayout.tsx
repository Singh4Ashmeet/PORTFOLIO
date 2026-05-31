import { ExternalLink, Github } from "lucide-react";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { Badge } from "@/components/ui/Badge";
import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechTag } from "@/components/ui/TechTag";
import type { CaseStudy, Project } from "@/lib/types";

export function CaseStudyLayout({
  project,
  caseStudy,
}: {
  project: Project;
  caseStudy: CaseStudy;
}) {
  const hasGithub = project.githubUrl !== "#";
  const externalGithub = hasGithub && project.githubUrl.startsWith("http");

  return (
    <article className="container-page section-y">
      <MotionReveal className="max-w-5xl">
        <SectionLabel>{project.role}</SectionLabel>
        <h1 className="mt-5 display-heading">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-[1.8] text-secondary">
          {project.subtitle}
        </p>
        <Badge className="mt-6">{project.metric}</Badge>
      </MotionReveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <MotionReveal className="grid gap-12">
          <section>
            <SectionLabel>Problem Statement</SectionLabel>
            <p className="mt-4 body-copy">{caseStudy.problem}</p>
          </section>

          <section>
            <SectionLabel>Architecture</SectionLabel>
            <ArchitectureDiagram
              slug={project.slug}
              architecture={caseStudy.architecture}
            />
            <ul className="mt-5 grid gap-3">
              {caseStudy.architecture.map((item) => (
                <li
                  key={item}
                  className="border-l border-accent/60 pl-4 text-sm leading-[1.8] text-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionLabel>Key Decisions</SectionLabel>
            <div className="mt-4 grid gap-[1.5px]">
              {caseStudy.decisions.map((item) => (
                <p
                  key={item}
                  className="rounded-card border border-white/[0.06] bg-surface p-5 text-sm leading-[1.8] text-secondary"
                >
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel>Code Snippet</SectionLabel>
            <pre className="mt-4 overflow-x-auto border-l-2 border-accent bg-card p-6 font-mono text-xs leading-7 text-secondary">
              <code>{caseStudy.codeSnippet}</code>
            </pre>
          </section>

          <section>
            <SectionLabel>Outcomes</SectionLabel>
            <div className="mt-4 grid gap-[1.5px] md:grid-cols-3">
              {project.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-card border border-white/[0.06] bg-surface p-5"
                >
                  <p className="text-sm leading-[1.8] text-secondary">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </MotionReveal>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <MotionReveal className="rounded-card border border-white/[0.06] bg-surface p-6">
            <SectionLabel>Stack</SectionLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TechTag key={tag}>{tag}</TechTag>
              ))}
            </div>

            <div className="mt-8 border-t border-white/[0.06] pt-6">
              <SectionLabel>Timeline</SectionLabel>
              <p className="mt-3 font-mono text-sm text-white">
                {project.timeline}
              </p>
            </div>

            <div className="mt-8 border-t border-white/[0.06] pt-6">
              <SectionLabel>Links</SectionLabel>
              <div className="mt-4 grid gap-3">
                {hasGithub ? (
                  <a
                    href={project.githubUrl}
                    target={externalGithub ? "_blank" : undefined}
                    rel={externalGithub ? "noopener noreferrer" : undefined}
                    className="inline-flex min-h-11 items-center justify-between rounded-button border border-white/10 px-4 font-mono text-[11px] uppercase tracking-[1.5px] text-secondary hover:text-white"
                  >
                    GitHub <Github className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <p className="rounded-card border border-white/[0.06] px-4 py-3 font-mono text-[11px] uppercase tracking-[1.5px] text-muted">
                    Repository link pending
                  </p>
                )}
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-between rounded-button border border-white/10 px-4 font-mono text-[11px] uppercase tracking-[1.5px] text-secondary hover:text-white"
                  >
                    Demo <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>
          </MotionReveal>
        </aside>
      </div>
    </article>
  );
}

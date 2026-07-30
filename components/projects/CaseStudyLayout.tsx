import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/lib/data";
import type { CaseStudy, Project } from "@/lib/types";

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border px-0 py-5 sm:border-l sm:border-t-0 sm:px-5 sm:first:border-l-0 sm:first:pl-0">
      <p className="mono-label">{label}</p>
      <p className="mt-2 font-mono text-sm leading-relaxed text-white">
        {value}
      </p>
    </div>
  );
}

export function CaseStudyLayout({
  project,
  caseStudy,
}: {
  project: Project;
  caseStudy: CaseStudy;
}) {
  const hasGithub = project.githubUrl !== "#";
  const externalGithub = hasGithub && project.githubUrl.startsWith("http");
  const index = Math.max(
    projects.findIndex((item) => item.slug === project.slug),
    0,
  );
  const numeral = String(index + 1).padStart(2, "0");
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="container-page section-y pt-28 md:pt-32">
      <MotionReveal>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent transition hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> index
        </Link>

        <header className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-4 sm:gap-x-10">
          <span
            aria-hidden="true"
            className="index-numeral font-mono text-8xl font-extrabold leading-[0.85] tracking-tighter sm:text-[9rem] md:text-[12rem]"
          >
            {numeral}
          </span>
          <div className="min-w-0 pb-2">
            <h1 className="font-mono text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-secondary sm:text-base">
              {project.subtitle}
            </p>
          </div>
        </header>

        <div className="mt-10 border-y border-border sm:grid sm:grid-cols-3">
          <MetaCell label="role" value={project.role} />
          <MetaCell label="timeline" value={project.timeline} />
          <MetaCell label="stack" value={project.tags.join(" · ")} />
        </div>
      </MotionReveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
        <MotionReveal className="grid gap-12">
          <section>
            <SectionLabel>{">"} problem</SectionLabel>
            <p className="mt-4 max-w-3xl font-mono text-sm leading-[1.9] text-secondary md:text-base">
              {caseStudy.problem}
            </p>
          </section>

          <section>
            <SectionLabel>{">"} outcomes</SectionLabel>
            <div className="mt-2 max-w-3xl">
              {project.outcomes.map((outcome) => (
                <p
                  key={outcome}
                  className="border-b border-border py-4 font-mono text-sm leading-[1.8] text-white md:text-base"
                >
                  <span className="mr-3 font-bold text-accent">+</span>
                  {outcome}
                </p>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel>{">"} architecture</SectionLabel>
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
            <SectionLabel>{">"} key decisions</SectionLabel>
            <div className="mt-2 max-w-3xl">
              {caseStudy.decisions.map((item) => (
                <p
                  key={item}
                  className="border-b border-border py-4 text-sm leading-[1.85] text-secondary"
                >
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel>{">"} code</SectionLabel>
            <pre className="mt-4 overflow-x-auto border-l-2 border-accent bg-panel p-6 font-mono text-xs leading-7 text-secondary">
              <code>{caseStudy.codeSnippet}</code>
            </pre>
          </section>
        </MotionReveal>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <MotionReveal className="border-t-2 border-accent pt-5">
            <SectionLabel>metric</SectionLabel>
            <p className="mt-3 font-mono text-2xl font-bold uppercase tracking-tight text-accent">
              {project.metric}
            </p>

            <div className="mt-8 border-t border-border pt-5">
              <SectionLabel>links</SectionLabel>
              <div className="mt-4 grid gap-3">
                {hasGithub ? (
                  <a
                    href={project.githubUrl}
                    target={externalGithub ? "_blank" : undefined}
                    rel={externalGithub ? "noopener noreferrer" : undefined}
                    className="inline-flex min-h-11 items-center justify-between rounded-button border border-white/10 px-4 font-mono text-[11px] uppercase tracking-[1.5px] text-secondary transition hover:border-accent/40 hover:text-white"
                  >
                    view repository{" "}
                    <Github className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <p className="font-mono text-[11px] uppercase tracking-[1.5px] text-muted">
                    repository link pending
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-5">
              <SectionLabel>context</SectionLabel>
              <p className="mt-3 text-sm leading-[1.8] text-secondary">
                {project.description}
              </p>
            </div>
          </MotionReveal>
        </aside>
      </div>

      <nav
        aria-label="More projects"
        className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-6 font-mono text-[12px] uppercase tracking-[0.14em]"
      >
        <Link
          href={`/projects/${previous.slug}`}
          className="group inline-flex items-center gap-2 text-secondary transition hover:text-white"
        >
          <ArrowLeft
            className="h-4 w-4 text-accent transition group-hover:-translate-x-1"
            aria-hidden="true"
          />
          {String(projects.indexOf(previous) + 1).padStart(2, "0")}{" "}
          {previous.title}
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="group inline-flex items-center gap-2 text-secondary transition hover:text-white"
        >
          {String(projects.indexOf(next) + 1).padStart(2, "0")} {next.title}
          <ArrowRight
            className="h-4 w-4 text-accent transition group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </nav>
    </article>
  );
}

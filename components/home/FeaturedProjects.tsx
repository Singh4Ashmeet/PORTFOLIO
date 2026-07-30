import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { IndexRow } from "@/components/projects/IndexRow";
import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/lib/data";

export function FeaturedProjects() {
  const indexProjects = projects.slice(0, 3);

  return (
    <section id="featured-projects" className="section-y relative">
      <div className="container-page">
        <MotionReveal className="mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <SectionLabel>{">"} selected systems</SectionLabel>
            <h2 className="mt-4 font-mono text-3xl font-bold uppercase leading-none tracking-tight text-white md:text-5xl">
              Index of works
            </h2>
          </div>
          <Link
            href="/projects"
            className="trace-link w-fit font-mono text-[12px] uppercase tracking-[0.16em] text-accent"
          >
            full index
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </MotionReveal>

        <div className="border-b border-border">
          {indexProjects.map((project, index) => (
            <MotionReveal key={project.slug} delay={index * 0.08}>
              <IndexRow project={project} index={index} />
            </MotionReveal>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs italic leading-relaxed text-muted">
          $ {projects.length} systems deployed — all operational
        </p>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/types";

export function IndexRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const numeral = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="index-row group grid grid-cols-[auto_1fr] items-center gap-x-5 border-t border-border py-7 transition-colors duration-300 hover:bg-panel sm:gap-x-8 sm:px-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:py-8"
    >
      <span
        aria-hidden="true"
        className="index-numeral font-mono text-6xl font-extrabold leading-none tracking-tighter sm:text-7xl md:text-8xl"
      >
        {numeral}
      </span>

      <div className="min-w-0">
        <h2 className="font-mono text-lg font-bold uppercase leading-tight tracking-tight text-white sm:text-2xl md:text-[1.65rem]">
          {project.title}{" "}
          <span className="font-normal normal-case text-muted">
            — {project.subtitle}
          </span>
        </h2>
        <p className="mt-2 font-mono text-xs leading-relaxed text-secondary sm:text-sm">
          {project.tags.join(" · ")}
        </p>
      </div>

      <div className="col-span-2 mt-4 flex items-center justify-between gap-4 md:col-span-1 md:mt-0 md:flex-col md:items-end md:justify-center md:gap-2">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent sm:text-sm">
          {project.metric}
        </p>
        <ArrowRight
          className="h-5 w-5 text-secondary transition duration-300 group-hover:translate-x-1.5 group-hover:text-white"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

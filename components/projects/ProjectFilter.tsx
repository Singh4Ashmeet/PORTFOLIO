"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/lib/types";
import { cn, extractMetricNumber } from "@/lib/utils";

export function ProjectFilter({
  projects,
  tags,
}: {
  projects: Project[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<"newest" | "impact">("newest");

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects
      .filter((project) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          [
            project.title,
            project.subtitle,
            project.description,
            project.metric,
            ...project.tags,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        const matchesTags =
          activeTags.length === 0 ||
          activeTags.every((tag) =>
            project.tags.some((projectTag) => projectTag === tag),
          );

        return matchesQuery && matchesTags;
      })
      .sort((a, b) => {
        if (sort === "impact") {
          return extractMetricNumber(b.metric) - extractMetricNumber(a.metric);
        }

        return Number(b.timeline) - Number(a.timeline) || a.id - b.id;
      });
  }, [activeTags, projects, query, sort]);

  function toggleTag(tag: string) {
    setActiveTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  }

  return (
    <div>
      <div className="mb-8 grid min-w-0 gap-4 lg:grid-cols-[minmax(240px,1fr)_2fr_220px] lg:items-start">
        <label className="focus-trace relative block min-w-0 rounded-card">
          <span className="sr-only">Search projects</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="search projects..."
            className="h-12 w-full rounded-card bg-transparent pl-11 pr-4 font-mono text-[12px] text-white outline-none placeholder:text-muted"
            type="search"
          />
        </label>

        <div
          className="flex min-w-0 flex-wrap gap-2"
          aria-label="Technology filters"
        >
          {tags.map((tag) => {
            const active = activeTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  "relative min-h-10 max-w-full overflow-hidden rounded-button border px-3 font-mono text-[10px] uppercase tracking-[0.12em] transition",
                  active
                    ? "border-accent/50 bg-accent text-background"
                    : "border-white/15 bg-white/[0.025] text-muted hover:border-accent/35 hover:text-white",
                )}
                aria-pressed={active}
              >
                {active ? (
                  <motion.span
                    layoutId={`filter-${tag}`}
                    className="absolute inset-x-0 bottom-0 h-px bg-white/70"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="relative z-10">{tag}</span>
              </button>
            );
          })}
        </div>

        <label className="focus-trace relative min-w-0 rounded-card">
          <span className="sr-only">Sort projects</span>
          <SlidersHorizontal
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent"
            aria-hidden="true"
          />
          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as "newest" | "impact")
            }
            className="h-12 w-full min-w-[180px] rounded-card bg-transparent pl-11 pr-4 font-mono text-[11px] uppercase tracking-[0.12em] text-secondary outline-none"
          >
            <option value="newest">newest</option>
            <option value="impact">most impactful</option>
          </select>
        </label>
      </div>

      <AnimatePresence mode="popLayout">
        {visibleProjects.length > 0 ? (
          <motion.div
            key="project-grid"
            layout
            className="grid grid-cols-1 gap-5 xl:grid-cols-2"
          >
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            className="grid min-h-72 place-items-center rounded-card border border-dashed border-accent/25 bg-accent/[0.025] p-10 text-center"
          >
            <div>
              <div className="mx-auto h-12 w-px bg-accent shadow-[0_0_22px_rgba(125,211,252,0.8)]" />
              <p className="mt-6 font-mono text-sm uppercase tracking-[0.16em] text-white">
                No matching projects
              </p>
              <p className="mt-2 text-sm text-secondary">
                Clear a filter or search a different stack.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

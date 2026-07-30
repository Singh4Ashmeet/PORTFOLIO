"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { IndexRow } from "@/components/projects/IndexRow";
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

  const hasFilters = query.trim().length > 0 || activeTags.length > 0;

  function clearFilters() {
    setQuery("");
    setActiveTags([]);
  }

  return (
    <div>
      <div className="mb-8 grid min-w-0 gap-4 lg:grid-cols-[minmax(240px,1fr)_2fr_220px] lg:items-start">
        <label className="relative block min-w-0 rounded-card">
          <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Search projects
          </span>
          <span className="focus-trace relative block rounded-card">
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
          </span>
        </label>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              Filter by stack
            </p>
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasFilters}
              className="trace-link font-mono text-[11px] uppercase tracking-[0.12em] text-accent disabled:pointer-events-none disabled:text-muted/60"
            >
              Clear filters
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
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
                    "min-h-11 rounded-button border px-3 font-mono text-[11px] lowercase tracking-[0.08em] transition",
                    active
                      ? "border-accent/60 text-accent"
                      : "border-transparent text-secondary hover:text-white",
                  )}
                  aria-pressed={active}
                >
                  <span className="text-muted">[</span> {tag}{" "}
                  <span className="text-muted">]</span>
                </button>
              );
            })}
          </div>
        </div>

        <label className="relative min-w-0 rounded-card">
          <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Sort projects
          </span>
          <span className="focus-trace relative block rounded-card">
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
          </span>
        </label>
      </div>

      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        Showing {visibleProjects.length} of {projects.length} projects
      </p>

      <AnimatePresence mode="popLayout">
        {visibleProjects.length > 0 ? (
          <motion.div
            key="project-grid"
            layout
            className="border-b border-border"
          >
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <IndexRow project={project} index={index} />
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
              <div className="mx-auto h-12 w-px bg-accent shadow-[0_0_22px_rgba(74,222,128,0.8)]" />
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

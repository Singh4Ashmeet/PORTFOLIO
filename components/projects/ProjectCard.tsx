"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import type { PointerEvent } from "react";
import { TechTag } from "@/components/ui/TechTag";
import { useMousePosition } from "@/hooks/useMousePosition";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);
  const mouse = useMousePosition(cardRef);
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 160, damping: 26 });
  const springRotateY = useSpring(rotateY, { stiffness: 160, damping: 26 });
  const glowOpacity = useTransform(
    springRotateX,
    [-3, 0, 3],
    [0.45, mouse.active ? 0.72 : 0, 0.45],
  );
  const externalGithub = project.githubUrl.startsWith("http");

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const node = cardRef.current;
    if (!node || event.pointerType === "touch" || prefersReducedMotion) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(relativeX * 3);
    rotateX.set(relativeY * -3);
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="h-full [perspective:1000px]">
      <motion.article
        ref={cardRef}
        className="group relative flex min-h-[360px] min-w-0 flex-col overflow-hidden rounded-card border border-white/[0.08] bg-card p-6 shadow-[0_30px_90px_rgba(0,0,0,0.24)] transition-colors duration-300 hover:border-accent/40"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: mouse.active ? glowOpacity : 0,
            background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(125,211,252,0.14), transparent 42%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
        >
          <div className="absolute right-0 top-0 h-px w-28 bg-accent shadow-[0_0_18px_rgba(125,211,252,0.8)]" />
          <div className="absolute right-0 top-0 h-28 w-px bg-accent shadow-[0_0_18px_rgba(125,211,252,0.8)]" />
        </div>

        <div className="relative mb-8 flex min-w-0 flex-col items-start justify-between gap-5 sm:flex-row">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {String(project.id).padStart(2, "0")}
            </p>
            <h2 className="mt-6 text-3xl font-bold leading-tight text-white">
              {project.title}
            </h2>
            <p className="mt-3 text-sm leading-[1.8] text-secondary">
              {project.description}
            </p>
          </div>
          <span className="relative shrink-0 overflow-hidden rounded-button border border-accent/20 bg-accent/10 px-3 py-2 font-mono text-[11px] leading-5 text-accent">
            <span className="shimmer-line absolute inset-x-0 top-0 h-px" />
            {project.metric}
          </span>
        </div>

        <ul className="relative grid gap-2 border-t border-white/[0.07] pt-5">
          {project.outcomes.slice(0, 2).map((outcome) => (
            <li
              key={outcome}
              className="flex gap-3 text-xs leading-[1.8] text-muted"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>

        <div className="relative mt-6 flex min-w-0 flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={false}
              className="origin-center"
              whileHover={{ scale: 1.05 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 20,
                delay: index * 0.01,
              }}
            >
              <TechTag>{tag}</TechTag>
            </motion.span>
          ))}
        </div>

        <div className="relative mt-auto flex items-center justify-between gap-4 pt-8 font-mono text-xs uppercase tracking-[0.12em]">
          <Link
            href={`/projects/${project.slug}`}
            className="trace-link text-accent"
          >
            Case Study
            <ArrowUpRight
              className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </Link>
          {project.githubUrl !== "#" ? (
            <a
              href={project.githubUrl}
              target={externalGithub ? "_blank" : undefined}
              rel={externalGithub ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1 text-secondary transition hover:text-white"
            >
              GitHub <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </motion.article>
    </div>
  );
}

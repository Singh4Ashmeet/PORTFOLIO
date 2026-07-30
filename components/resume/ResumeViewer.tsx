"use client";

import { motion } from "framer-motion";
import { Check, Download, Printer } from "lucide-react";
import type { ReactNode } from "react";
import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechTag } from "@/components/ui/TechTag";
import {
  achievements,
  leadership,
  profile,
  projects,
  skills,
} from "@/lib/data";

export function ResumeViewer() {
  const skillEntries = Object.entries(skills);

  return (
    <div className="container-page section-y pt-32">
      <MotionReveal className="grid gap-8 border-b border-white/[0.06] pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <SectionLabel>Resume</SectionLabel>
          <h1 className="mt-5 text-5xl font-bold leading-none text-white md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-mono text-sm text-accent">{profile.role}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span>{profile.location}</span>
            <a href={`mailto:${profile.email}`} className="trace-link">
              {profile.email}
            </a>
            <span>{profile.phone}</span>
            {profile.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="trace-link"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-button border border-accent/45 bg-accent/10 px-5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent transition hover:bg-accent hover:text-background active:scale-[0.97]"
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          print / save pdf
        </button>
      </MotionReveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <MotionReveal className="hairline-panel p-6">
            <SectionLabel>Stack</SectionLabel>
            <div className="mt-5 grid gap-5">
              {skillEntries.map(([category, items], groupIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: groupIndex * 0.06 }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {category}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <TechTag key={item}>{item}</TechTag>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </MotionReveal>
        </aside>

        <div className="relative pl-8">
          <div className="absolute left-0 top-0 h-full w-px bg-white/[0.08]" />
          <motion.div
            className="absolute left-0 top-0 h-full w-px origin-top bg-accent shadow-[0_0_18px_rgba(74,222,128,0.75)]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          <TimelineSection title="Education">
            <div className="hairline-panel p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-bold text-white">
                    {profile.education.school}
                  </p>
                  <p className="text-sm text-secondary">
                    {profile.education.degree}
                  </p>
                  <p className="mt-3 text-xs leading-[1.8] text-muted">
                    {profile.education.coursework}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-muted">
                  {profile.education.timeline}
                </span>
              </div>
            </div>
          </TimelineSection>

          <TimelineSection title="Projects">
            <div className="grid gap-4">
              {projects.map((project) => (
                <article key={project.slug} className="hairline-panel p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="font-bold text-white">{project.title}</p>
                      <p className="text-sm text-secondary">
                        {project.subtitle}
                      </p>
                      <ul className="mt-4 grid gap-2">
                        {project.outcomes.map((outcome) => (
                          <li
                            key={outcome}
                            className="flex gap-3 text-xs leading-[1.8] text-muted"
                          >
                            <Check
                              className="mt-1 h-3.5 w-3.5 shrink-0 text-accent"
                              aria-hidden="true"
                            />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="shrink-0 sm:text-right">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                        {project.metric}
                      </span>
                      <p className="mt-1 font-mono text-[10px] text-muted">
                        {project.timeline}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </TimelineSection>

          <TimelineSection title="Leadership">
            <div className="grid gap-4">
              {leadership.map((item) => (
                <article key={item.title} className="hairline-panel p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="text-sm text-secondary">
                        {item.organization}
                      </p>
                      <ul className="mt-4 grid gap-2">
                        {item.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-xs leading-[1.8] text-muted"
                          >
                            <Check
                              className="mt-1 h-3.5 w-3.5 shrink-0 text-accent"
                              aria-hidden="true"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-muted">
                      {item.timeline}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </TimelineSection>

          {achievements.length > 0 ? (
            <TimelineSection title="Achievements">
              <div className="grid gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.title}
                    className="flex items-start gap-4 text-sm"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-card border border-accent/25 bg-accent/10 text-accent">
                      <Download className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-white">{achievement.title}</p>
                      <p className="font-mono text-[11px] text-muted">
                        {achievement.context}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TimelineSection>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function TimelineSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <MotionReveal as="section" className="relative mb-12 last:mb-0">
      <span
        className="absolute -left-[37px] top-1 h-3 w-3 rounded-full border border-accent bg-background shadow-[0_0_18px_rgba(74,222,128,0.8)]"
        aria-hidden="true"
      />
      <SectionLabel>{title}</SectionLabel>
      <div className="mt-4">{children}</div>
    </MotionReveal>
  );
}

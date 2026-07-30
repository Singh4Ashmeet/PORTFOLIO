import type { Metadata } from "next";
import Image from "next/image";
import { AchievementBadge } from "@/components/about/AchievementBadge";
import { LeadershipTimeline } from "@/components/about/LeadershipTimeline";
import { SkillsGrid } from "@/components/about/SkillsGrid";
import { WordReveal } from "@/components/about/WordReveal";
import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ashmeet Singh's profile, education, skills, leadership and achievements.",
};

export default function AboutPage() {
  return (
    <>
      <section className="container-page section-y pt-32">
        <div className="grid gap-12 lg:grid-cols-[360px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <MotionReveal>
              <div className="hairline-panel overflow-hidden p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-card">
                  <Image
                    src="/ashmeet.jpg"
                    alt="Portrait of Ashmeet Singh"
                    width={490}
                    height={540}
                    quality={100}
                    unoptimized
                    sizes="360px"
                    className="h-full w-full object-cover object-top"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 to-transparent"
                    aria-hidden="true"
                  />
                </div>
                <div className="p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {profile.role}
                  </p>
                  <h1 className="mt-3 text-4xl font-bold leading-none text-white">
                    {profile.name}
                  </h1>
                  <p className="mt-4 text-sm leading-[1.8] text-secondary">
                    {profile.about.tagline}
                  </p>
                </div>
              </div>
            </MotionReveal>
          </aside>

          <div className="min-w-0">
            <MotionReveal>
              <SectionLabel>About</SectionLabel>
              <div className="mt-6 border-y border-white/[0.06] py-10">
                <WordReveal text={profile.about.bio} />
              </div>
            </MotionReveal>

            <MotionReveal
              as="section"
              className="relative mt-12 overflow-hidden rounded-card border border-white/[0.08] bg-surface/60 p-7"
            >
              <div className="absolute left-0 top-0 h-full w-px bg-accent/70" />
              <div className="absolute left-0 top-0 h-24 w-px bg-white shadow-[0_0_22px_rgba(74,222,128,0.8)]" />
              <SectionLabel>Education</SectionLabel>
              <h2 className="mt-5 text-2xl font-bold leading-tight text-white">
                {profile.education.degree}
              </h2>
              <p className="mt-3 text-sm leading-[1.8] text-secondary">
                {profile.education.school}
              </p>
              <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                {profile.education.timeline}
              </p>
              <p className="mt-5 text-sm leading-[1.8] text-secondary">
                Coursework: {profile.education.coursework}
              </p>
            </MotionReveal>
          </div>
        </div>
      </section>

      <SkillsGrid />
      <LeadershipTimeline />
      <AchievementBadge />
    </>
  );
}

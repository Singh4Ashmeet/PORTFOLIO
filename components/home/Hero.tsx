"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { profile } from "@/lib/data";

function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "1.05em" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <div
        aria-hidden="true"
        className="tech-grid-bg absolute inset-0 opacity-60"
      />

      <div className="container-page relative z-10">
        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {profile.name} — {profile.hero.leftLabel} — {profile.location}
          <motion.span
            aria-hidden="true"
            className="ml-2 inline-block h-3.5 w-[7px] translate-y-[2px] bg-accent"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
        </motion.p>

        <h1 className="display-heading mt-8 max-w-5xl">
          <RevealLine delay={0.18}>Backend &amp; AI</RevealLine>
          <RevealLine delay={0.3}>
            <span className="text-accent">Engineer</span>
          </RevealLine>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,30rem)_auto] lg:items-end lg:justify-between">
          <motion.p
            className="max-w-md text-sm leading-[1.85] text-secondary md:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.hero.bio}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.62,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <MagneticWrapper>
              <Link
                href="/projects"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-button border border-accent bg-accent px-6 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-background transition hover:bg-transparent hover:text-accent active:scale-[0.97]"
              >
                {profile.hero.projectCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <Link
                href="/resume"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-button border border-white/20 px-6 font-mono text-[12px] uppercase tracking-[0.16em] text-white transition hover:border-accent hover:text-accent active:scale-[0.97]"
              >
                {profile.hero.cvCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </MagneticWrapper>
          </motion.div>
        </div>
      </div>

      <div className="mt-16 md:mt-24" />
    </section>
  );
}

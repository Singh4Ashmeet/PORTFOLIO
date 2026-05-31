"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { profile } from "@/lib/data";
import { blurDataUrl } from "@/lib/utils";

const codeLines = [
  "const engineer = {",
  `  role: "${profile.role}",`,
  '  focus: ["systems", "apis", "ai"],',
  '  building: "impactful products"',
  "};",
];

function AnimatedWord({ word, delay = 0 }: { word: string; delay?: number }) {
  return (
    <span className="block overflow-hidden whitespace-nowrap pb-[0.08em] leading-[1.02]">
      {word.split("").map((char, index) => (
        <motion.span
          key={`${word}-${char}-${index}`}
          className="inline-block"
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + index * 0.03,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 800], [0, 120]);
  const gridY = useTransform(scrollY, [0, 800], [0, -80]);

  const tag = "<AI builder>";

  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      <motion.div
        aria-hidden="true"
        className="tech-grid-bg absolute inset-0 opacity-70"
        style={{ y: gridY }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-24 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/[0.045] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-48 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
      />

      <div className="container-page relative z-10 grid min-h-[calc(100vh-6rem)] grid-cols-1 items-center gap-10 pb-32 pt-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,400px)] lg:gap-8 lg:pt-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(340px,420px)_minmax(260px,0.62fr)] xl:gap-9">
        <motion.div
          initial="hidden"
          animate="visible"
          className="order-1 lg:order-1"
        >
          <div className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <span>01</span>
            <span className="h-px w-12 bg-accent/70" aria-hidden="true" />
          </div>
          <h1 className="display-heading max-w-none text-balance xl:text-[6.4rem]">
            {profile.hero.primaryWords.map((word, index) => (
              <AnimatedWord key={word} word={word} delay={0.15 + index * 0.1} />
            ))}
          </h1>
          <motion.p
            className="mt-7 max-w-sm whitespace-pre-line font-mono text-sm leading-[1.8] text-secondary"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.52,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {profile.hero.bio}
          </motion.p>
        </motion.div>

        <motion.div
          className="order-2 mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:order-2 lg:max-w-[420px]"
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mx-auto aspect-[4/5] max-h-[560px] overflow-visible">
            <div
              className="absolute inset-4 translate-x-8 translate-y-8 rounded-card border border-accent/20"
              aria-hidden="true"
            />
            <div
              className="absolute inset-2 translate-x-4 translate-y-4 rounded-card border border-white/10"
              aria-hidden="true"
            />
            <div className="relative h-full overflow-hidden rounded-card border border-white/20 bg-card shadow-[0_0_90px_rgba(125,211,252,0.16)] [animation:float-depth_4s_ease-in-out_infinite]">
              <Image
                src="/ashmeet.jpg"
                alt="Portrait of Ashmeet Singh"
                width={490}
                height={540}
                priority
                placeholder="blur"
                blurDataURL={blurDataUrl}
                className="h-full w-full object-cover object-top contrast-110"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="order-3 min-w-0 text-left lg:col-span-2 xl:col-span-1 xl:text-right"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-accent xl:justify-end">
            <span className="h-px w-12 bg-accent/70" aria-hidden="true" />
            <span>build</span>
          </div>
          <div className="whitespace-nowrap font-mono text-[clamp(2rem,2.2vw,2.85rem)] leading-none text-white">
            {tag.split("").map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                className={char === "<" || char === ">" ? "text-accent" : ""}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.035, duration: 0.4 }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              className="ml-1 inline-block h-12 w-px translate-y-2 bg-accent"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <div className="mt-8 overflow-hidden rounded-card border border-white/[0.08] bg-background/55 p-5 text-left font-mono text-[12px] leading-7 text-secondary shadow-[0_0_50px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            {codeLines.map((line, index) => (
              <p key={line} className="whitespace-pre-wrap break-words">
                <span className="mr-4 text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {line}
              </p>
            ))}
          </div>
          <p className="mt-6 whitespace-pre-line text-sm leading-[1.8] text-muted xl:ml-auto xl:max-w-xs">
            {profile.hero.rightTagline}
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-x-4 bottom-5 z-20 rounded-card border border-white/[0.08] bg-background/70 backdrop-blur-xl"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-5 font-mono text-[12px] text-secondary">
            <span className="shrink-0">{profile.hero.scrollLabel}</span>
            <span className="relative h-px flex-1 overflow-hidden bg-white/15">
              <motion.span
                className="absolute inset-y-0 left-0 w-28 bg-accent shadow-[0_0_18px_rgba(125,211,252,0.8)]"
                animate={{ x: ["-100%", "640%"] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
              />
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticWrapper>
              <Link
                href="/projects"
                className="inline-flex min-h-12 items-center justify-center gap-4 rounded-button border border-accent/50 bg-accent/10 px-6 font-mono text-[12px] uppercase tracking-[0.16em] text-accent transition hover:bg-accent hover:text-background active:scale-[0.97]"
              >
                {profile.hero.projectCta
                  .replace("â†’", "")
                  .replace("→", "")
                  .trim()}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <Link
                href="/resume"
                className="inline-flex min-h-12 items-center justify-center gap-4 rounded-button border border-white/15 bg-white/[0.025] px-6 font-mono text-[12px] uppercase tracking-[0.16em] text-white transition hover:border-accent/50 active:scale-[0.97]"
              >
                {profile.hero.cvCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </MagneticWrapper>
            <a
              href="#featured-projects"
              className="grid h-12 w-12 place-items-center rounded-button border border-accent/35 text-accent transition hover:bg-accent/10"
              aria-label="Jump to featured projects"
            >
              <ArrowDown className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { profile } from "@/lib/data";

function StatCell({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const count = useCountUp(value, { start: inView, duration: 1.5 });

  return (
    <motion.div
      ref={ref}
      className="relative min-h-36 border-white/[0.06] px-5 py-7 lg:border-l lg:first:border-l-0"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        delay: index * 0.08,
        duration: 0.56,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span
        className="absolute left-5 top-7 font-mono text-lg leading-none text-accent"
        aria-hidden="true"
      >
        +
      </span>
      <div className="pt-7">
        <p className="font-mono text-5xl leading-none text-white md:text-6xl">
          {count}
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-secondary">
          {label}
        </p>
        <motion.span
          className="mt-5 block h-px w-28 bg-accent shadow-[0_0_18px_rgba(125,211,252,0.8)]"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ transformOrigin: "left" }}
          transition={{ delay: 0.15 + index * 0.08, duration: 0.65 }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

export function StatsStrip() {
  return (
    <section
      className="border-y border-white/[0.06] bg-background"
      aria-label="Portfolio stats"
    >
      <div className="container-page grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {profile.stats.map((stat, index) => (
          <StatCell
            key={stat.label}
            value={stat.value}
            label={stat.label}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

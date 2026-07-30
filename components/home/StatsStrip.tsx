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
      className="border-t border-border px-5 py-8 first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0 lg:py-10"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        delay: index * 0.07,
        duration: 0.56,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <p className="font-mono text-4xl font-bold leading-none text-accent md:text-5xl">
        {count}
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-secondary">
        {label}
      </p>
    </motion.div>
  );
}

export function StatsStrip() {
  return (
    <section
      className="border-y border-border bg-background"
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

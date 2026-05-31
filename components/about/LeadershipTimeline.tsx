"use client";

import { motion } from "framer-motion";
import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { leadership } from "@/lib/data";

export function LeadershipTimeline() {
  return (
    <MotionReveal className="container-page section-y">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <div>
          <SectionLabel>Leadership</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold leading-none text-white md:text-5xl">
            Community and execution
          </h2>
        </div>
        <div className="relative pl-8">
          <div className="absolute left-0 top-1 h-full w-px bg-white/[0.08]" />
          <motion.div
            className="absolute left-0 top-1 w-px origin-top bg-accent shadow-[0_0_20px_rgba(125,211,252,0.8)]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "100%" }}
          />
          {leadership.map((item, index) => (
            <motion.article
              key={`${item.title}-${item.timeline}`}
              className="relative border-t border-white/[0.06] pb-10 pt-6 first:border-t-0 first:pt-0 last:pb-0"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.58 }}
            >
              <span
                className="absolute -left-[37px] top-7 h-3 w-3 rounded-full border border-accent bg-background shadow-[0_0_18px_rgba(125,211,252,0.8)] first:top-1"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-2xl font-bold leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-secondary">
                    {item.organization}
                  </p>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {item.timeline}
                </p>
              </div>
              <ul className="mt-5 grid gap-2">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm leading-[1.8] text-secondary"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionReveal>
  );
}

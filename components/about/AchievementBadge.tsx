"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { achievements } from "@/lib/data";

export function AchievementBadge() {
  const achievement = achievements[0];

  if (!achievement) {
    return null;
  }

  return (
    <MotionReveal className="container-page pb-28">
      <article className="relative border-y border-border py-10">
        <SectionLabel>{">"} achievement</SectionLabel>
        <motion.div
          className="mt-7 grid h-14 w-14 place-items-center rounded-card border border-accent/30 bg-accent/10 text-accent"
          initial={{ scale: 0.4, rotate: -12, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
        >
          <Award className="h-6 w-6" aria-hidden="true" />
        </motion.div>
        <h2 className="mt-6 text-3xl font-bold leading-tight text-white">
          {achievement.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-[1.8] text-secondary">
          {achievement.context}
        </p>
      </article>
    </MotionReveal>
  );
}

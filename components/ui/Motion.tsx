"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealUp } from "@/components/motion/variants";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
  amount?: number;
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  as = "div",
  amount = 0.15,
}: MotionRevealProps) {
  const Component =
    as === "section"
      ? motion.section
      : as === "article"
        ? motion.article
        : motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      variants={revealUp}
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

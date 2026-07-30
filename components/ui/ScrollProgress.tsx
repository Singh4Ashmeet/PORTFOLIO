"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.2,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[90] h-px bg-white/[0.06]"
    >
      <motion.div
        className="h-full origin-left bg-accent shadow-[0_0_18px_rgba(74,222,128,0.9)]"
        style={{ scaleX }}
      />
    </div>
  );
}

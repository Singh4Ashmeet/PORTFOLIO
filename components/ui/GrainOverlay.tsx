"use client";

import { motion, useScroll, useTransform, useVelocity } from "framer-motion";

export function GrainOverlay() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const opacity = useTransform(velocity, [-1200, 0, 1200], [0.07, 0.035, 0.07]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70]"
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

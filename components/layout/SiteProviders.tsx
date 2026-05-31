"use client";

import { MotionConfig } from "framer-motion";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function SiteProviders({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 0.8 }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}

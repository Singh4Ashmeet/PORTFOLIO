"use client";

import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import { useCallback, useRef } from "react";
import type { PointerEvent } from "react";

type MagneticHoverOptions = {
  strength?: number;
  reset?: boolean;
};

export function useMagneticHover<T extends HTMLElement>({
  strength = 0.04,
  reset = true,
}: MagneticHoverOptions = {}) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 30, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 180, damping: 30, mass: 0.45 });

  const onPointerMove = useCallback(
    (event: PointerEvent<T>) => {
      const node = ref.current;
      if (!node || event.pointerType === "touch" || prefersReducedMotion) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      const maxOffset = 4;
      x.set(Math.max(-maxOffset, Math.min(maxOffset, offsetX * strength)));
      y.set(Math.max(-maxOffset, Math.min(maxOffset, offsetY * strength)));
    },
    [prefersReducedMotion, strength, x, y],
  );

  const onPointerLeave = useCallback(() => {
    if (reset) {
      x.set(0);
      y.set(0);
    }
  }, [reset, x, y]);

  const style: MotionStyle = { x: springX, y: springY };

  return { ref, style, onPointerMove, onPointerLeave };
}

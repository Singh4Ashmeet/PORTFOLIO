"use client";

import { useMotionValue, useSpring, type MotionStyle } from "framer-motion";
import { useCallback, useRef } from "react";
import type { PointerEvent } from "react";

type MagneticHoverOptions = {
  strength?: number;
  reset?: boolean;
};

export function useMagneticHover<T extends HTMLElement>({
  strength = 0.08,
  reset = true,
}: MagneticHoverOptions = {}) {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.35 });

  const onPointerMove = useCallback(
    (event: PointerEvent<T>) => {
      const node = ref.current;
      if (!node || event.pointerType === "touch") {
        return;
      }

      const rect = node.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      const maxOffset = 8;
      x.set(Math.max(-maxOffset, Math.min(maxOffset, offsetX * strength)));
      y.set(Math.max(-maxOffset, Math.min(maxOffset, offsetY * strength)));
    },
    [strength, x, y],
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

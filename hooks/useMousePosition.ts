"use client";

import { useEffect, useState, type RefObject } from "react";

export type LocalMousePosition = {
  x: number;
  y: number;
  active: boolean;
};

export function useMousePosition<T extends HTMLElement>(
  ref: RefObject<T>,
): LocalMousePosition {
  const [position, setPosition] = useState<LocalMousePosition>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const element = node;

    function onPointerMove(event: PointerEvent) {
      const rect = element.getBoundingClientRect();
      setPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      });
    }

    function onPointerLeave() {
      setPosition((current) => ({ ...current, active: false }));
    }

    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", onPointerLeave);

    return () => {
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [ref]);

  return position;
}

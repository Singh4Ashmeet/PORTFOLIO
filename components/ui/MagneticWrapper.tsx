"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { cn } from "@/lib/utils";

type MagneticWrapperProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  strength?: number;
};

export function MagneticWrapper({
  children,
  className,
  strength = 0.04,
  ...props
}: MagneticWrapperProps) {
  const magnetic = useMagneticHover<HTMLDivElement>({ strength });

  return (
    <motion.div
      ref={magnetic.ref}
      style={magnetic.style}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
      className={cn("inline-flex will-change-transform", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

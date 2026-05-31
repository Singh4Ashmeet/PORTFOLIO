import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function TechTag({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-button border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-secondary transition duration-300 hover:scale-105 hover:border-accent/40 hover:bg-accent/10 hover:text-white",
        className,
      )}
      {...props}
    />
  );
}

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-button border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary",
        className,
      )}
      {...props}
    />
  );
}

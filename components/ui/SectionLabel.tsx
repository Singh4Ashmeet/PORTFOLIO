import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mono-label", className)} {...props} />;
}

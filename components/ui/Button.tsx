import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "solid" | "outline" | "ghost";
  children: ReactNode;
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-button px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] transition duration-300 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants = {
  solid:
    "border border-accent/70 bg-accent text-background shadow-[0_0_28px_rgba(125,211,252,0.18)] hover:bg-white hover:text-background",
  outline:
    "border border-white/20 bg-white/[0.025] text-secondary hover:border-accent/60 hover:text-white",
  ghost:
    "border border-transparent bg-transparent text-secondary hover:text-white",
};

export function Button({
  className,
  variant = "solid",
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}

export function ButtonLink({
  className,
  variant = "solid",
  href,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(base, variants[variant], className)}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}

"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Gmail: Mail,
};

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav
        className={cn(
          "mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between rounded-card border px-4 backdrop-blur-xl transition duration-300 sm:px-6",
          scrolled
            ? "border-accent/20 bg-background/88 shadow-[0_12px_70px_rgba(0,0,0,0.45)]"
            : "border-white/[0.09] bg-background/72",
        )}
        aria-label="Main navigation"
      >
        <MagneticWrapper strength={0.06}>
          <Link
            href="/"
            className="relative grid h-11 w-16 place-items-center rounded-card border border-white/10 font-mono text-2xl font-bold text-white"
            aria-label="Ashmeet Singh home"
            onClick={() => setOpen(false)}
          >
            <span
              className="absolute left-2 top-2 h-2 w-2 border-l border-t border-accent"
              aria-hidden="true"
            />
            <span
              className="absolute right-2 top-2 h-2 w-2 border-r border-t border-accent"
              aria-hidden="true"
            />
            AS
          </Link>
        </MagneticWrapper>

        <div className="hidden items-center gap-2 md:flex">
          {profile.nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-button px-4 py-2 text-[13px] lowercase text-secondary transition hover:text-white",
                  active && "text-white",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-3 bottom-0 h-px bg-accent shadow-[0_0_16px_rgba(125,211,252,0.9)]"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {profile.socials.map((item) => {
            const Icon =
              socialIcons[item.label as keyof typeof socialIcons] ?? Mail;
            const external = item.href.startsWith("http");
            return (
              <MagneticWrapper key={item.href} strength={0.06}>
                <a
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="grid h-9 w-9 place-items-center rounded-card border border-white/10 text-secondary transition hover:border-accent/40 hover:text-white"
                  aria-label={item.label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </MagneticWrapper>
            );
          })}
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-card border border-white/[0.12] text-white md:hidden"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu backdrop"
              className="fixed inset-0 -z-10 bg-background/45 backdrop-blur-md md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed right-4 top-24 w-[min(24rem,calc(100vw-2rem))] rounded-card border border-white/[0.09] bg-surface/95 p-7 shadow-[0_28px_110px_rgba(0,0,0,0.6)] backdrop-blur-xl md:hidden"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 48 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="grid gap-2">
                {profile.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-card border border-white/[0.06] px-4 py-4 text-lg lowercase text-secondary transition hover:border-accent/30 hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                {profile.socials.map((item) => {
                  const Icon =
                    socialIcons[item.label as keyof typeof socialIcons] ?? Mail;
                  const external = item.href.startsWith("http");
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="grid h-11 w-11 place-items-center rounded-card border border-white/[0.08] text-secondary hover:text-white"
                      aria-label={item.label}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

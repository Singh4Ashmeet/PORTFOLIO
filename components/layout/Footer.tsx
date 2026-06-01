"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-background">
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 bg-accent shadow-[0_0_30px_rgba(125,211,252,0.7)]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.16em] text-white">
              {profile.name}
            </p>
            <p className="mt-4 max-w-md bg-[linear-gradient(90deg,#fff,rgba(125,211,252,0.9),#fff)] bg-[length:220%_100%] bg-clip-text text-base leading-[1.8] text-transparent [animation:shimmer-sweep_5s_linear_infinite]">
              {profile.footer.tagline}
            </p>
          </div>
          <nav
            className="grid gap-3 text-sm text-secondary"
            aria-label="Footer navigation"
          >
            {profile.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="trace-link w-fit"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="grid gap-3 text-sm text-secondary">
            {profile.socials.map((item) => (
              <MagneticWrapper
                key={item.href}
                strength={0.06}
                className="w-fit"
              >
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="trace-link"
                >
                  {item.label}
                </a>
              </MagneticWrapper>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-white/[0.06] pt-6 font-mono text-[11px] tracking-[0.14em] text-muted">
          {profile.footer.copyright}
        </div>
      </div>
    </footer>
  );
}

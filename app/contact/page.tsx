import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { MotionReveal } from "@/components/ui/Motion";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ashmeet Singh for hiring, collaboration, open source or other inquiries.",
};

const icons = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Gmail: Mail,
};

export default function ContactPage() {
  return (
    <section className="container-page section-y pt-32">
      <MotionReveal className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:pt-8">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-5 text-5xl font-bold leading-none text-white md:text-7xl">
            Build signal, not noise
          </h1>
          <p className="mt-5 max-w-md text-sm leading-[1.8] text-secondary">
            Use the form or direct links for hiring, collaboration, open source,
            or other inquiries.
          </p>
          <div className="mt-8 grid gap-3">
            {profile.socials.map((social) => {
              const Icon = icons[social.label as keyof typeof icons] ?? Mail;
              const external = social.href.startsWith("http");
              return (
                <MagneticWrapper
                  key={social.href}
                  strength={0.06}
                  className="w-full"
                >
                  <a
                    href={social.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex w-full items-center gap-3 rounded-card border border-white/[0.06] bg-surface/65 p-4 text-sm text-secondary transition hover:border-accent/35 hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {social.label}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-right">
                      {social.handle}
                    </span>
                  </a>
                </MagneticWrapper>
              );
            })}
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </MotionReveal>
    </section>
  );
}

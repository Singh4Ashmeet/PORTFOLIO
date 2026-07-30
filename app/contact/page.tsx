import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ashmeet Singh for hiring, collaboration, open source or other inquiries.",
};

const marqueeItems = Array(6).fill("open to work") as string[];

export default function ContactPage() {
  return (
    <section className="pt-28 md:pt-32">
      <div className="container-page">
        <MotionReveal>
          <SectionLabel>{">"} contact — uplink</SectionLabel>
        </MotionReveal>
      </div>

      <div
        className="mt-6 overflow-hidden border-y border-border py-4"
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-mono text-xl font-bold uppercase tracking-[0.1em] text-accent md:text-2xl">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={index} className="flex items-center gap-8">
              {item} <span className="text-muted">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container-page section-y grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
        <MotionReveal>
          <ContactForm />
        </MotionReveal>

        <MotionReveal delay={0.08} className="lg:pt-2">
          <h1 className="font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-5xl">
            Build signal,
            <br />
            <span className="text-accent">not noise</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-[1.85] text-secondary">
            Use the form or direct links for hiring, collaboration, open source,
            or other inquiries.
          </p>

          <div className="mt-10 border-t border-border">
            <div className="border-b border-border py-4 font-mono text-sm">
              <span className="text-muted">email</span>
              <span className="mx-3 text-muted/60">.....</span>
              <a
                href={`mailto:${profile.email}`}
                className="trace-link text-white"
              >
                {profile.email}
              </a>
            </div>
            {profile.socials
              .filter((social) => social.href.startsWith("http"))
              .map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center border-b border-border py-4 font-mono text-sm transition hover:bg-panel"
                >
                  <span className="text-muted">
                    {social.label.toLowerCase()}
                  </span>
                  <span className="mx-3 text-muted/60">.....</span>
                  <span className="text-white">{social.handle}</span>
                  <ArrowUpRight
                    className="ml-auto h-4 w-4 text-accent transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              ))}
            <div className="border-b border-border py-4 font-mono text-sm">
              <span className="text-muted">location</span>
              <span className="mx-3 text-muted/60">.....</span>
              <span className="text-white">{profile.location}</span>
            </div>
          </div>

          <p className="mt-8 font-mono text-xs italic leading-relaxed text-muted">
            $ expected response time &lt; 24h — hiring inquiries prioritized
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}

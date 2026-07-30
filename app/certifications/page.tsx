import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { certifications } from "@/lib/data";

export const metadata: Metadata = {
  title: "Certifications — Ashmeet Singh",
  description:
    "Professional certifications and credentials earned by Ashmeet Singh.",
};

export default function CertificationsPage() {
  return (
    <section className="container-page section-y pt-28 md:pt-32">
      <MotionReveal>
        <SectionLabel>{">"} credentials</SectionLabel>
        <h1 className="mt-5 font-mono text-4xl font-bold uppercase leading-none tracking-tight text-white md:text-6xl">
          Certifications
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-[1.8] text-secondary">
          Industry-recognized certifications in AI, data analytics, and software
          engineering.
        </p>
      </MotionReveal>

      <div className="mt-12 border-b border-border">
        {certifications.map((cert, index) => (
          <MotionReveal key={cert.title} delay={index * 0.06}>
            <a
              href={cert.asset?.pdf ?? "#"}
              target={cert.asset?.pdf ? "_blank" : undefined}
              rel={cert.asset?.pdf ? "noopener noreferrer" : undefined}
              className="index-row group grid grid-cols-[auto_1fr] items-center gap-x-6 border-t border-border py-6 transition-colors duration-300 hover:bg-panel sm:gap-x-8 sm:px-4"
            >
              <span
                aria-hidden="true"
                className="index-numeral font-mono text-5xl font-extrabold leading-none tracking-tighter sm:text-6xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h2 className="font-mono text-base font-bold leading-tight text-white sm:text-xl">
                  {cert.title}
                </h2>
                <p className="mt-1.5 font-mono text-xs text-secondary sm:text-sm">
                  {cert.issuer} · {cert.displayYear} · {cert.tags.join(" · ")}
                </p>
              </div>
              <ArrowUpRight
                className="col-start-2 h-5 w-5 text-secondary transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:col-start-auto sm:justify-self-end"
                aria-hidden="true"
              />
            </a>
          </MotionReveal>
        ))}
      </div>

      <p className="mt-6 font-mono text-xs italic leading-relaxed text-muted">
        $ verification pdfs attached — click any row
      </p>
    </section>
  );
}

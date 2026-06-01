import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechTag } from "@/components/ui/TechTag";
import { certifications } from "@/lib/data";

export const metadata: Metadata = {
  title: "Certifications — Ashmeet Singh",
  description:
    "Professional certifications and credentials earned by Ashmeet Singh.",
};

export default function CertificationsPage() {
  return (
    <section className="container-page section-y">
      <MotionReveal>
        <SectionLabel>Certifications</SectionLabel>
        <h1 className="mt-5 display-heading text-4xl md:text-5xl">
          Credentials &amp; certifications
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-[1.8] text-secondary">
          Industry-recognized certifications in AI, data analytics, and software
          engineering.
        </p>
      </MotionReveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <MotionReveal key={cert.title} delay={index * 0.06}>
            <article className="editorial-card flex h-full flex-col p-6">
              {/* Issuer + Year */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-muted">
                  {cert.issuer}
                </span>
                <span className="font-mono text-[10px] text-muted">
                  {cert.displayYear}
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-3 text-[16px] font-bold leading-tight text-white">
                {cert.title}
              </h2>

              {/* Description */}
              <p className="mt-2 text-[13px] leading-[1.8] text-secondary">
                {cert.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {cert.tags.map((tag) => (
                  <TechTag key={tag}>{tag}</TechTag>
                ))}
              </div>

              {/* Links */}
              <div className="mt-auto flex items-center gap-4 pt-6 font-mono text-[11px] uppercase tracking-[1px]">
                {cert.asset?.pdf && (
                  <a
                    href={cert.asset.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent transition hover:text-white"
                  >
                    View PDF{" "}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}

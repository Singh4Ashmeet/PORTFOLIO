import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing from Ashmeet Singh.",
};

export default function BlogPage() {
  return (
    <section className="container-page section-y">
      <SectionLabel>Blog</SectionLabel>
      <h1 className="mt-5 display-heading">Writing soon</h1>
      <p className="mt-6 max-w-xl text-sm leading-[1.8] text-secondary">
        Articles are queued for a later version while the current portfolio
        focuses on recruiter workflows and case studies.
      </p>
    </section>
  );
}

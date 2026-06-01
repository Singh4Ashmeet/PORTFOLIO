import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import { getCaseStudyBySlug, getProjectBySlug, projects } from "@/lib/data";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} - Ashmeet Singh`,
      description: project.description,
      type: "article",
      images: [{ url: project.image.src }],
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  const caseStudy = getCaseStudyBySlug(params.slug);

  if (!project || !caseStudy) {
    notFound();
  }

  return <CaseStudyLayout project={project} caseStudy={caseStudy} />;
}

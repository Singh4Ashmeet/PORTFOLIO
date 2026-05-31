import type { Metadata } from "next";
import { ResumeViewer } from "@/components/resume/ResumeViewer";

export const metadata: Metadata = {
  title: "Résumé — Ashmeet Singh",
  description:
    "Education, skills, projects, leadership, and achievements — Ashmeet Singh.",
};

export default function ResumePage() {
  return <ResumeViewer />;
}

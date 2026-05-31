import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const diagrams: Record<string, string[]> = {
  guardaxis: [
    "Event intake",
    "FastAPI scoring",
    "Detector pool",
    "Fallback policy",
    "React console",
  ],
  "credgen-ai": [
    "Applicant intake",
    "Agent graph",
    "XGBoost score",
    "PyOD review",
    "Ollama answer",
  ],
  "raid-nexus": [
    "Incident feed",
    "Dispatch API",
    "WebSocket bus",
    "Command center",
    "Storage path",
  ],
  solarai: [
    "Site inputs",
    "Feature engine",
    "Prediction model",
    "Sun path",
    "Report output",
  ],
};

type ArchitectureDiagramProps = {
  slug: string;
  architecture: string[];
};

export function ArchitectureDiagram({
  slug,
  architecture,
}: ArchitectureDiagramProps) {
  const nodes =
    diagrams[slug] ??
    architecture.map((item) => item.split(" ").slice(0, 3).join(" "));

  return (
    <div
      className="mt-4 overflow-hidden rounded-card border border-white/[0.08] bg-surface/80 p-5"
      aria-label="Architecture flow diagram"
      role="img"
    >
      <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {nodes.map((node, index) => (
          <li key={`${slug}-${node}`} className="relative min-w-0">
            <div className="group relative h-full min-h-28 overflow-hidden rounded-card border border-white/[0.08] bg-background/60 p-4 transition hover:border-accent/35">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-70"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-sm font-semibold leading-snug text-white">
                {node}
              </p>
              {index < nodes.length - 1 ? (
                <ArrowRight
                  className={cn(
                    "absolute right-3 top-3 hidden h-4 w-4 text-accent/70 xl:block",
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

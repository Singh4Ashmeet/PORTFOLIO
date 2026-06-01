import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const visualData: Record<
  string,
  {
    accent: string;
    rows: string[];
    nodes: string[];
    stats: string[];
  }
> = {
  guardaxis: {
    accent: "from-sky-300 to-emerald-300",
    rows: ["Recon", "Exploit", "Persist", "Lateral", "Exfil"],
    nodes: ["Event intake", "Detector pool", "Threat score", "Fallbacks"],
    stats: ["14+ detectors", "4 sources", "40% less failure impact"],
  },
  "credgen-ai": {
    accent: "from-emerald-300 to-cyan-300",
    rows: ["Applicant", "Credit", "Anomaly", "Explain", "Chat"],
    nodes: ["FastAPI", "XGBoost", "PyOD", "Ollama"],
    stats: ["5 agents", "80% effort saved", "70% faster review"],
  },
  "raid-nexus": {
    accent: "from-cyan-300 to-lime-300",
    rows: ["Incident", "Assign", "Route", "ETA", "Update"],
    nodes: ["Dispatch API", "WebSocket", "Command UI", "SQLite"],
    stats: ["Live units", "Explainable fallback", "Docker demo"],
  },
  solarai: {
    accent: "from-yellow-200 to-sky-300",
    rows: ["Site", "Weather", "Features", "Predict", "Report"],
    nodes: ["Open-Meteo", "33 features", "GB model", "ROI"],
    stats: ["0.995 R2", "Sun path", "PDF reports"],
  },
};

export function ProjectVisual({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const visual = visualData[project.slug] ?? visualData.guardaxis;

  return (
    <div
      className={cn(
        "relative h-full min-h-[260px] overflow-hidden rounded-card border border-white/[0.08] bg-[#081014]",
        compact ? "min-h-[230px]" : "min-h-[340px]",
      )}
      role="img"
      aria-label={project.image.alt}
    >
      <div
        className="absolute inset-0 tech-grid-bg opacity-55"
        aria-hidden="true"
      />
      <div
        className={cn(
          "absolute -right-20 -top-28 h-80 w-80 rounded-full bg-gradient-to-br opacity-20 blur-3xl",
          visual.accent,
        )}
        aria-hidden="true"
      />
      <div className="relative grid h-full gap-4 p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              {project.title}
            </p>
            <p className="mt-1 text-xs text-secondary">{project.subtitle}</p>
          </div>
          <span className="rounded-button border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
            {project.metric}
          </span>
        </div>

        <div className="grid min-h-0 gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-2">
            {visual.rows.map((row, index) => (
              <div
                key={row}
                className="grid grid-cols-[72px_1fr] items-center gap-3 rounded-card border border-white/[0.06] bg-white/[0.035] px-3 py-2"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  {row}
                </span>
                <span className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                  <span
                    className={cn(
                      "block h-full rounded-full bg-gradient-to-r",
                      visual.accent,
                    )}
                    style={{ width: `${48 + index * 11}%` }}
                  />
                </span>
              </div>
            ))}
          </div>

          <div className="relative min-h-[150px] rounded-card border border-white/[0.06] bg-background/50 p-4">
            <div
              className="absolute left-6 right-6 top-1/2 h-px bg-accent/25"
              aria-hidden="true"
            />
            <div className="relative grid h-full grid-cols-2 gap-3">
              {visual.nodes.map((node, index) => (
                <div
                  key={node}
                  className="flex min-h-16 items-center justify-center rounded-card border border-accent/20 bg-accent/[0.06] p-3 text-center text-xs font-semibold leading-snug text-white shadow-[0_0_24px_rgba(125,211,252,0.08)]"
                >
                  <span className="mr-2 font-mono text-[10px] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {node}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {visual.stats.map((stat) => (
            <p
              key={stat}
              className="rounded-card border border-white/[0.06] bg-white/[0.035] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-secondary"
            >
              {stat}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { skills } from "@/lib/data";

const leaders = [".....", ".......", "....", ".........", ".....", "......"];

export function SkillsGrid() {
  return (
    <section className="container-page section-y">
      <MotionReveal className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <div>
          <SectionLabel>{">"} skills ledger</SectionLabel>
          <h2 className="mt-5 font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-4xl">
            Systems, APIs, applied AI
          </h2>
        </div>
        <div className="border-t border-border">
          {Object.entries(skills).map(([category, items], index) => (
            <div
              key={category}
              className="grid gap-1 border-b border-border py-5 md:grid-cols-[150px_1fr] md:items-baseline md:gap-4"
            >
              <p className="font-mono text-sm text-muted">
                {category.toLowerCase()}
                <span className="ml-3 text-muted/50">
                  {leaders[index % leaders.length]}
                </span>
              </p>
              <p className="font-mono text-sm leading-relaxed text-white md:text-base">
                {items.join("  ·  ")}
              </p>
            </div>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}

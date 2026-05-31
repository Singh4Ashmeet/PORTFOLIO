import { MotionReveal } from "@/components/ui/Motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechTag } from "@/components/ui/TechTag";
import { skills } from "@/lib/data";

function rotationFor(index: number) {
  return [-2, 1.5, -0.75, 2, -1.25, 0.75][index % 6];
}

export function SkillsGrid() {
  return (
    <section className="container-page section-y">
      <MotionReveal className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <div>
          <SectionLabel>Skills</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold leading-none text-white md:text-5xl">
            Systems, APIs, and applied AI
          </h2>
        </div>
        <div className="grid gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <section
              key={category}
              className="grid gap-5 border-t border-white/[0.06] pt-6 md:grid-cols-[170px_1fr]"
            >
              <SectionLabel className="text-white/45">{category}</SectionLabel>
              <div className="flex flex-wrap gap-3">
                {items.map((item, index) => (
                  <TechTag
                    key={item}
                    style={{ transform: `rotate(${rotationFor(index)}deg)` }}
                    className="origin-center px-3 py-1.5"
                  >
                    {item}
                  </TechTag>
                ))}
              </div>
            </section>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}

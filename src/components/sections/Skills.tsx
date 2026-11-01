import { skillGroups, skillsSection } from "@/content/skills";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTitle, headingId } from "@/components/ui/SectionTitle";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

export function Skills() {
  return (
    <section
      id={skillsSection.id}
      aria-labelledby={headingId(skillsSection)}
      className="scroll-mt-20 py-24 lg:py-40"
    >
      <Container>
        <SectionTitle section={skillsSection} />

        <Reveal stagger className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const accent = group.tone === "accent";
            return (
              <div
                key={group.id}
                className={cn(
                  "border-t pt-5",
                  accent ? "border-garnet-ink/60 sm:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-3 lg:gap-x-8" : "border-line",
                )}
              >
                <div>
                  <p className={cn("eyebrow", accent ? "text-garnet-ink" : "text-muted")}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-serif text-[clamp(1.75rem,1.3rem+1vw,2.25rem)] leading-none text-fg">
                    {group.label}
                  </h3>
                  {group.note ? <p className="mt-3 max-w-sm text-sm text-muted">{group.note}</p> : null}
                </div>
                <ul className={cn("mt-6 flex flex-wrap gap-2", accent && "lg:col-span-2 lg:mt-0 lg:content-start")}>
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag tone={group.tone}>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}

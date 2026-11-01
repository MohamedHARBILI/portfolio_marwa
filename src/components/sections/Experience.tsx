import { experienceSection, experiences } from "@/content/experience";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTitle, headingId } from "@/components/ui/SectionTitle";
import { Tag } from "@/components/ui/Tag";
import { PaymentFlow } from "./PaymentFlow";

export function Experience() {
  return (
    <section
      id={experienceSection.id}
      aria-labelledby={headingId(experienceSection)}
      className="scroll-mt-24 py-24 lg:py-32"
    >
      <Container>
        <SectionTitle section={experienceSection} />

        {experiences.map((experience) => (
          <Reveal
            as="article"
            key={experience.id}
            aria-labelledby={`experience-${experience.id}`}
            className="card mt-12 grid overflow-hidden lg:mt-16 lg:grid-cols-12"
          >
            <div className="flex flex-col bg-accent-tint p-7 sm:p-10 lg:col-span-4 lg:p-12">
              <p className="self-start rounded-full bg-surface px-3.5 py-1.5 text-sm font-semibold text-accent shadow-soft">
                {experience.period.display}
              </p>
              <h3
                id={`experience-${experience.id}`}
                className="mt-8 text-display font-semibold text-accent"
              >
                {experience.company}
              </h3>
              <p className="mt-4 text-lg font-semibold text-fg">{experience.role}</p>
              <p className="text-muted">{experience.team}</p>

              <p className="eyebrow mt-10 text-muted lg:mt-auto lg:pt-10">{site.ui.keywords}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {experience.keywords.map((keyword) => (
                  <li key={keyword}>
                    <Tag tone="accent">{keyword}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-7 sm:p-10 lg:col-span-8 lg:p-12">
              <p className="font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] leading-[1.35] font-medium tracking-[-0.015em] text-fg">
                {experience.summary}
              </p>
              <p className="eyebrow mt-10 text-muted">{site.ui.missions}</p>
              <ol className="mt-4 grid gap-3 md:grid-cols-2">
                {experience.missions.map((mission, i) => (
                  <li key={mission} className="flex gap-4 rounded-2xl border border-line bg-bg/60 p-5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-1 leading-snug text-fg">{mission}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        ))}

        <PaymentFlow />
      </Container>
    </section>
  );
}

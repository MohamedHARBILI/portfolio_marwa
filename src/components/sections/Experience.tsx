import { experienceSection, experiences } from "@/content/experience";
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
      className="scroll-mt-20 py-24 lg:py-40"
    >
      <Container>
        <SectionTitle section={experienceSection} />

        {experiences.map((experience) => (
          <article
            key={experience.id}
            aria-labelledby={`experience-${experience.id}`}
            className="grid-editorial mt-14 gap-y-10 lg:mt-20"
          >
            <Reveal className="col-span-12 lg:col-span-3">
              <p className="eyebrow text-muted">{experience.period.display}</p>
              <h3 id={`experience-${experience.id}`} className="mt-4 font-serif text-display text-fg">
                {experience.company}
              </h3>
              <p className="mt-4 text-fg">{experience.role}</p>
              <p className="text-muted">{experience.team}</p>
            </Reveal>

            <div className="col-span-12 lg:col-span-6 lg:col-start-4">
              <Reveal>
                <p className="text-lead text-fg">{experience.summary}</p>
              </Reveal>
              <Reveal as="ol" stagger className="mt-10 border-t border-line">
                {experience.missions.map((mission, i) => (
                  <li key={mission} className="flex gap-6 border-b border-line py-5">
                    <span className="eyebrow pt-1 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-fg">{mission}</span>
                  </li>
                ))}
              </Reveal>
            </div>

            <Reveal as="ul" stagger className="col-span-12 flex flex-wrap content-start gap-2 lg:col-span-3 lg:col-start-10 lg:justify-end">
              {experience.keywords.map((keyword) => (
                <li key={keyword}>
                  <Tag>{keyword}</Tag>
                </li>
              ))}
            </Reveal>
          </article>
        ))}

        <PaymentFlow />
      </Container>
    </section>
  );
}

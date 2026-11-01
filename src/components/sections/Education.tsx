import { education } from "@/content/education";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTitle, headingId } from "@/components/ui/SectionTitle";
import { Tag } from "@/components/ui/Tag";

export function Education() {
  return (
    <section id={education.id} aria-labelledby={headingId(education)} className="scroll-mt-20 py-24 lg:py-40">
      <Container>
        <SectionTitle section={education} />

        <Reveal as="ol" stagger className="mt-14 border-t border-line lg:mt-20">
          {education.entries.map((entry, i) => (
            <li key={entry.id} className="grid-editorial items-baseline gap-y-3 border-b border-line py-8 lg:py-10">
              <p className="eyebrow col-span-12 flex items-center gap-3 text-muted lg:col-span-3">
                <span
                  aria-hidden
                  className={i === 0 ? "size-1.5 rounded-full bg-indigo-ink" : "size-1.5 rounded-full border border-line-strong"}
                />
                {entry.period}
              </p>
              <div className="col-span-12 md:col-span-9 lg:col-span-6">
                <h3 className="font-serif text-h3 text-fg">{entry.title}</h3>
                <p className="mt-2 text-muted">{entry.institution}</p>
              </div>
              {entry.status ? (
                <p className="col-span-12 md:col-span-3 md:text-right">
                  <Tag>{entry.status}</Tag>
                </p>
              ) : null}
            </li>
          ))}
        </Reveal>

        <Reveal className="grid-editorial mt-10">
          <div className="col-span-12 flex flex-col gap-3 rounded-[4px] border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between lg:col-span-9 lg:col-start-4 lg:p-8">
            <p className="eyebrow text-indigo-ink">{education.attestation.label}</p>
            <p className="font-serif text-[clamp(1.375rem,1.1rem+0.8vw,1.875rem)] leading-tight text-fg sm:text-right">
              {education.attestation.title}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

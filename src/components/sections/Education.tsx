import { education } from "@/content/education";
import { languages, languagesSection } from "@/content/languages";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Rich } from "@/components/ui/Rich";
import { SectionTitle, headingId } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";

/** Education timeline, with languages and the attestation alongside. */
export function Education() {
  return (
    <section id={education.id} aria-labelledby={headingId(education)} className="scroll-mt-24 py-24 lg:py-32">
      <Container>
        <SectionTitle section={education} />

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12">
          <Reveal as="ol" stagger className="relative space-y-4 lg:col-span-7">
            {education.entries.map((entry, i) => (
              <li key={entry.id} className="relative pl-10 sm:pl-14">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-0 left-[11px] w-[2px] bg-line sm:left-[19px]",
                    i === education.entries.length - 1 ? "h-8" : "bottom-[-1rem]",
                  )}
                />
                <span
                  aria-hidden
                  className={
                    i === 0
                      ? "absolute top-8 left-[4px] size-4 rounded-full border-[3px] border-bg bg-accent shadow-[0_0_0_4px_rgb(140_29_64/0.14)] sm:left-3"
                      : "absolute top-8 left-[4px] size-4 rounded-full border-2 border-line-strong bg-surface sm:left-3"
                  }
                />
                <div className="card p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="rounded-full bg-surface-2 px-3 py-1 text-sm font-semibold text-fg">{entry.period}</p>
                    {entry.status ? (
                      <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-success">
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
                          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth={1.4} />
                          <path d="m5.4 8.2 1.8 1.8 3.5-3.7" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {entry.status}
                      </p>
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-tight font-semibold tracking-[-0.02em] text-fg">
                    {entry.title}
                  </h3>
                  <p className="mt-1.5 text-muted">{entry.institution}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <div className="space-y-5 lg:col-span-5">
            <Reveal
              as="section"
              aria-labelledby={`${languagesSection.id}-title`}
              id={languagesSection.id}
              className="card scroll-mt-24 p-7 sm:p-9"
            >
              <h3 id={`${languagesSection.id}-title`} className="text-h3 font-semibold text-fg">
                {languagesSection.label}
              </h3>
              <p className="mt-2 text-muted">
                <Rich text={languagesSection.title} />
              </p>
              <ul className="mt-6 divide-y divide-line border-t border-line">
                {languages.map((language) => (
                  <li key={language.id} className="flex items-center justify-between gap-4 py-4">
                    <span className="flex flex-col">
                      <span className="font-semibold text-fg">{language.name}</span>
                      <span className="text-sm text-muted">{language.level}</span>
                    </span>
                    <span
                      lang={language.lang}
                      dir={language.dir}
                      className="font-display text-[1.625rem] leading-none font-medium text-accent"
                    >
                      {language.native}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="rounded-[var(--radius-card)] bg-[linear-gradient(135deg,var(--sand),var(--accent-soft))] p-7 sm:p-9">
              <p className="eyebrow text-accent">{education.attestation.label}</p>
              <p className="mt-3 font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-snug font-semibold tracking-[-0.02em] text-fg">
                {education.attestation.title}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

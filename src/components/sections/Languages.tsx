import { languages, languagesSection } from "@/content/languages";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTitle, headingId } from "@/components/ui/SectionTitle";

export function Languages() {
  return (
    <section
      id={languagesSection.id}
      aria-labelledby={headingId(languagesSection)}
      className="scroll-mt-20 py-24 lg:py-40"
    >
      <Container>
        <SectionTitle section={languagesSection} />

        <Reveal as="ul" stagger className="mt-14 grid border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {languages.map((language) => (
            <li
              key={language.id}
              className="flex flex-col gap-6 border-b border-line py-8 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6 lg:border-r lg:border-b-0 lg:px-6 lg:py-10 lg:first:pl-0 lg:last:border-r-0"
            >
              <span
                lang={language.lang}
                dir={language.dir}
                className="self-start font-serif text-h2 leading-none text-fg"
              >
                {language.native}
              </span>
              <span className="flex flex-col gap-1">
                <span className="eyebrow text-fg">{language.name}</span>
                <span className="text-muted">{language.level}</span>
              </span>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

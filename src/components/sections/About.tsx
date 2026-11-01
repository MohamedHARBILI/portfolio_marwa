import { profile } from "@/content/profile";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTitle, headingId } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";

export function About() {
  const { about } = profile;

  return (
    <section id={about.id} aria-labelledby={headingId(about)} className="scroll-mt-20 py-24 lg:py-40">
      <Container>
        <SectionTitle section={about} />

        <div className="grid-editorial mt-14 gap-y-14 lg:mt-20">
          <Reveal stagger className="col-span-12 space-y-6 md:col-span-10 lg:col-span-6 lg:col-start-4">
            {about.bio.map((paragraph, i) => (
              <p
                key={paragraph}
                className={cn(i === 0 ? "text-lead text-fg" : "text-[1.0625rem] leading-relaxed text-muted")}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal
            as="dl"
            stagger
            className="col-span-12 grid border-t border-line sm:grid-cols-2 lg:col-span-3 lg:col-start-10 lg:grid-cols-1"
          >
            {about.facts.map((fact) => (
              <div
                key={fact.value}
                className="flex flex-col gap-2 border-b border-line py-5 sm:odd:pr-6 lg:odd:pr-0"
              >
                <dt className="order-2 text-sm leading-snug text-muted">{fact.label}</dt>
                <dd className="order-1 font-serif text-h3 text-fg">{fact.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import portrait from "@/assets/marwa-frej.jpg";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle, headingId } from "@/components/ui/SectionTitle";

export function About() {
  const { about } = profile;
  const [first, ...rest] = about.bio;

  return (
    <section id={about.id} aria-labelledby={headingId(about)} className="scroll-mt-24 py-24 lg:py-32">
      <Container>
        <SectionTitle section={about} />

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          <Reveal className="card flex flex-col p-7 sm:p-10 lg:col-span-7 lg:row-span-2 lg:p-12">
            <p className="font-display text-[clamp(1.375rem,1.05rem+1.2vw,2.125rem)] leading-[1.3] font-medium tracking-[-0.02em] text-fg">
              {first}
            </p>
            <div className="mt-6 mb-10 space-y-4">
              {rest.map((paragraph) => (
                <p key={paragraph} className="text-[1.0625rem] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-4 border-t border-line pt-6">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-full ring-4 ring-accent-soft">
                <Image src={portrait} alt="" fill sizes="56px" className="object-cover object-top" />
              </span>
              <span className="flex flex-col">
                <span className="font-display text-lg font-semibold text-fg">{profile.fullName}</span>
                <span className="text-sm text-muted">{profile.role}</span>
              </span>
            </div>
          </Reveal>

          <Reveal as="dl" stagger className="grid grid-cols-2 gap-4 lg:col-span-5 lg:gap-5">
            {about.facts.map((fact) => (
              <div key={fact.value} className="card flex flex-col gap-3 p-5 sm:p-7">
                <dd className="order-1 font-display text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)] leading-none font-semibold tracking-[-0.04em] text-accent">
                  {fact.value}
                </dd>
                <dt className="order-2 text-sm leading-snug text-muted">{fact.label}</dt>
              </div>
            ))}
          </Reveal>

          <Reveal className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-[linear-gradient(135deg,var(--accent-soft),var(--sand))] p-7 sm:p-9 lg:col-span-5">
            <div
              aria-hidden
              className="absolute -top-16 -right-16 -z-10 size-56 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.7),transparent)]"
            />
            <Badge pulse>{profile.availability.label}</Badge>
            <p className="mt-6 font-display text-h3 font-semibold text-fg">{profile.availability.detail}</p>
            <p className="mt-2 text-muted">{profile.location.display}</p>
            <Button
              href="/#contact"
              className="mt-7"
              icon={<Arrow direction="up-right" className="size-3.5" />}
            >
              {site.ui.contactMe}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

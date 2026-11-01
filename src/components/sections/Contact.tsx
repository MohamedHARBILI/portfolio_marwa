import Image from "next/image";
import portrait from "@/assets/marwa-frej.jpg";
import { profile } from "@/content/profile";
import { cvHref, isTodo, site } from "@/content/site";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Arrow } from "@/components/ui/Arrow";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Rich } from "@/components/ui/Rich";
import { SectionLabel, headingId } from "@/components/ui/SectionTitle";

export function Contact() {
  const { contact, ui } = site;
  const socials = [site.github, site.linkedin].filter((link) => !isTodo(link.href));

  return (
    <section id={contact.id} aria-labelledby={headingId(contact)} className="scroll-mt-24 py-16 lg:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[var(--radius-panel)] border border-accent/10 bg-[linear-gradient(160deg,var(--accent-tint)_0%,var(--accent-soft)_55%,var(--sand)_100%)] px-5 py-16 text-center sm:px-10 lg:px-16 lg:py-24">
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 -z-10 size-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.75),transparent)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black,transparent)] bg-[radial-gradient(rgb(140_29_64/0.16)_1px,transparent_1px)] [background-size:24px_24px]"
          />

          <Reveal className="flex flex-col items-center gap-5">
            <span className="relative size-20 overflow-hidden rounded-full shadow-lift ring-4 ring-surface">
              <Image src={portrait} alt="" fill sizes="80px" className="object-cover object-top" />
            </span>
            <SectionLabel index={contact.index} label={contact.label} />
          </Reveal>

          <SplitHeading
            as="h2"
            id={headingId(contact)}
            className="mx-auto mt-8 max-w-[16ch] text-display font-semibold text-fg"
          >
            <Rich text={contact.title} />
          </SplitHeading>

          <Reveal>
            <p className="mx-auto mt-6 max-w-xl text-lead text-muted">{contact.lead}</p>
          </Reveal>

          <Reveal className="mt-10">
            <p className="sr-only">{contact.emailLabel}</p>
            <CopyEmail email={site.email} />
          </Reveal>

          <Reveal className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Magnetic strength={0.2}>
              <Button href={`mailto:${site.email}`} size="lg" icon={<Arrow direction="up-right" />}>
                {ui.writeEmail}
              </Button>
            </Magnetic>
            {socials.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                variant="secondary"
                size="lg"
                external
                icon={<Arrow direction="up-right" />}
              >
                {link.label}
              </Button>
            ))}
            {site.showPhone ? (
              <Button href={site.phone.href} variant="secondary" size="lg">
                {site.phone.display}
              </Button>
            ) : null}
            <Button
              href={cvHref}
              variant="secondary"
              size="lg"
              download={site.cvPdfUrl ? true : undefined}
            >
              {ui.downloadCv}
            </Button>
          </Reveal>

          <Reveal className="mt-10 flex justify-center">
            <Badge pulse>
              {profile.availability.label} — {profile.location.display}
            </Badge>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

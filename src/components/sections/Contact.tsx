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
import { headingId } from "@/components/ui/SectionTitle";

export function Contact() {
  const { contact, ui } = site;
  const socials = [site.github, site.linkedin].filter((link) => !isTodo(link.href));

  return (
    <section
      id={contact.id}
      aria-labelledby={headingId(contact)}
      className="relative isolate scroll-mt-20 overflow-hidden py-24 lg:py-40"
    >
      <div
        aria-hidden
        className="absolute -bottom-[30%] left-1/2 -z-10 size-[min(110vw,80rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--halo),transparent)] opacity-70"
      />
      <Container>
        <p className="eyebrow border-t border-line pt-5 text-muted">
          <span className="text-fg">{contact.index}</span> — {contact.label}
        </p>

        <SplitHeading as="h2" id={headingId(contact)} className="mt-10 max-w-[13ch] font-serif text-display text-fg lg:mt-14">
          <Rich text={contact.title} />
        </SplitHeading>

        <div className="grid-editorial mt-12 gap-y-8 lg:mt-16">
          <Reveal className="col-span-12 md:col-span-8 lg:col-span-5">
            <p className="text-lead text-muted">{contact.lead}</p>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-4 md:justify-self-end lg:col-span-4 lg:col-start-9">
            <Badge pulse>{profile.availability.label}</Badge>
          </Reveal>
        </div>

        <Reveal className="mt-12 lg:mt-16">
          <p className="eyebrow mb-2 text-muted">{contact.emailLabel}</p>
          <CopyEmail email={site.email} />
        </Reveal>

        <Reveal className="mt-6 flex flex-wrap items-center gap-3">
          <Magnetic>
            <Button href={`mailto:${site.email}`} size="lg" icon={<Arrow direction="up-right" />}>
              {ui.writeEmail}
            </Button>
          </Magnetic>
          {socials.map((link) => (
            <Magnetic key={link.label}>
              <Button href={link.href} variant="outline" size="lg" external icon={<Arrow direction="up-right" />}>
                {link.label}
              </Button>
            </Magnetic>
          ))}
          {site.showPhone ? (
            <Button href={site.phone.href} variant="outline" size="lg">
              {site.phone.display}
            </Button>
          ) : null}
          <Button
            href={cvHref}
            variant="ghost"
            className="ml-2 underline decoration-line-strong underline-offset-[6px] hover:decoration-indigo-ink"
            download={site.cvPdfUrl ? true : undefined}
          >
            {ui.downloadCv}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

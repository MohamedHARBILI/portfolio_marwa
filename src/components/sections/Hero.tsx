import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import portrait from "@/assets/marwa-frej.jpg";
import { profile } from "@/content/profile";
import { cvHref, isTodo, site } from "@/content/site";
import { Magnetic } from "@/components/motion/Magnetic";
import { Arrow } from "@/components/ui/Arrow";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { cn } from "@/lib/cn";
import { TechMarquee } from "./TechMarquee";

/** Delay (ms) for the CSS entrance choreography in globals.css. */
const delay = (ms: number) => ({ "--d": ms }) as CSSProperties;

export function Hero() {
  const { ui } = site;
  const socials = [
    { name: "github" as const, label: site.github.label, href: site.github.href, external: true },
    { name: "linkedin" as const, label: site.linkedin.label, href: site.linkedin.href, external: true },
    { name: "email" as const, label: site.email, href: `mailto:${site.email}`, external: false },
  ].filter((link) => !isTodo(link.href));

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 lg:pt-36">
      <HeroBackdrop />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div data-enter="fade" style={delay(80)}>
              <Badge pulse>{profile.availability.label}</Badge>
            </div>

            <p data-enter="fade" style={delay(160)} className="mt-8 text-lead font-semibold text-muted lg:mt-10">
              {profile.hero.greeting}
            </p>
            <h1 id="hero-title" className="mt-1 text-hero font-semibold text-fg">
              <span className="block overflow-hidden pb-[0.18em]">
                <span data-enter="line" style={delay(200)}>
                  {profile.firstName}
                </span>
              </span>{" "}
              <span className="-mt-[0.18em] block overflow-hidden pb-[0.2em]">
                <span data-enter="line" style={delay(290)} className="text-accent">
                  {profile.lastName}
                </span>
              </span>
            </h1>

            <p
              data-enter="fade"
              style={delay(420)}
              className="mt-1 flex items-center gap-4 font-display text-h3 font-medium text-fg"
            >
              <span aria-hidden className="h-[2px] w-10 shrink-0 rounded-full bg-accent" />
              {profile.role}
            </p>
            <p data-enter="fade" style={delay(500)} className="mt-6 max-w-xl text-lead text-muted">
              {profile.hero.lead}
            </p>

            <div data-enter="fade" style={delay(600)} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.2}>
                <Button href="/#projets" size="lg" icon={<Arrow direction="down" className="size-4" />}>
                  {ui.viewProjects}
                </Button>
              </Magnetic>
              <Button
                href={cvHref}
                variant="secondary"
                size="lg"
                icon={<Arrow direction="up-right" className="size-4" />}
                download={site.cvPdfUrl ? true : undefined}
              >
                {ui.downloadCv}
              </Button>
            </div>

            <ul data-enter="fade" style={delay(700)} className="mt-8 flex items-center gap-2">
              {socials.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="grid size-11 place-items-center rounded-full border border-line bg-surface text-fg shadow-soft transition-[color,transform,border-color] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent"
                  >
                    <SocialIcon name={link.name} />
                    <span className="sr-only">
                      {link.label}
                      {link.external ? ` ${ui.opensInNewTab}` : ""}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <Portrait />
          </div>
        </div>

        <dl
          data-enter="fade"
          style={delay(850)}
          className="card mt-16 grid grid-cols-2 gap-px overflow-hidden bg-line p-0 lg:mt-20 lg:grid-cols-4"
        >
          {profile.hero.specs.map((spec) => (
            <div key={spec.label} className="flex flex-col gap-1.5 bg-surface px-5 py-5 lg:px-7 lg:py-6">
              <dt className="eyebrow text-muted">{spec.label}</dt>
              <dd className="text-[0.9375rem] leading-snug font-semibold text-fg lg:text-base">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <TechMarquee className="mt-14 lg:mt-20" />
    </section>
  );
}

function Portrait() {
  const [location, internship, diploma] = profile.hero.chips;
  const arch = "rounded-[50%_50%_2.25rem_2.25rem/40%_40%_2.25rem_2.25rem]";

  return (
    <div className="relative mx-auto w-[min(100%,25rem)] lg:mr-0 lg:ml-auto lg:w-full lg:max-w-[27rem]">
      <div
        aria-hidden
        data-enter="pop"
        style={delay(120)}
        className={cn("absolute inset-0 -z-10 translate-x-4 translate-y-4 rotate-[4deg] bg-accent-soft", arch)}
      />
      <div className={cn("relative aspect-[4/5] overflow-hidden bg-surface-2 shadow-lift ring-1 ring-line", arch)}>
        <div data-enter="portrait" style={delay(150)} className="absolute inset-0">
          <Image
            src={portrait}
            alt={profile.photo.alt}
            fill
            preload
            quality={90}
            placeholder="blur"
            sizes="(min-width: 1024px) 27rem, (min-width: 640px) 25rem, 90vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      {location ? (
        <Chip className="top-[18%] -left-3 sm:-left-10" enter={700} float={0}>
          <PinIcon />
          <ChipText fact={location} />
        </Chip>
      ) : null}
      {internship ? (
        <Chip className="top-[52%] -right-3 sm:-right-8" enter={820} float={1400}>
          <span aria-hidden className="grid size-8 place-items-center rounded-full bg-accent text-on-accent">
            <ShieldIcon />
          </span>
          <ChipText fact={internship} />
        </Chip>
      ) : null}
      {diploma ? (
        <Chip className="-bottom-5 left-[6%]" enter={940} float={2600}>
          <span aria-hidden className="grid size-8 place-items-center rounded-full bg-sand text-fg">
            <CapIcon />
          </span>
          <ChipText fact={diploma} />
        </Chip>
      ) : null}
    </div>
  );
}

function Chip({
  className,
  enter,
  float,
  children,
}: {
  className: string;
  enter: number;
  float: number;
  children: ReactNode;
}) {
  return (
    <div data-enter="pop" style={delay(enter)} className={cn("absolute z-10", className)}>
      <div
        data-float
        style={{ "--f": float } as CSSProperties}
        className="flex items-center gap-3 rounded-2xl border border-line bg-surface/90 py-2.5 pr-4 pl-2.5 shadow-lift backdrop-blur-md"
      >
        {children}
      </div>
    </div>
  );
}

function ChipText({ fact }: { fact: { label: string; value: string } }) {
  return (
    <span className="flex flex-col leading-tight">
      <span className="text-[0.6875rem] font-semibold tracking-[0.08em] text-muted uppercase">{fact.label}</span>
      <span className="text-sm font-bold whitespace-nowrap text-fg">{fact.value}</span>
    </span>
  );
}

function PinIcon() {
  return (
    <span aria-hidden className="grid size-8 place-items-center rounded-full bg-accent-soft text-accent">
      <svg viewBox="0 0 16 16" fill="none" className="size-4">
        <path
          d="M8 14.5s4.5-4.2 4.5-8a4.5 4.5 0 1 0-9 0c0 3.8 4.5 8 4.5 8Z"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <circle cx="8" cy="6.5" r="1.6" fill="currentColor" />
      </svg>
    </span>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path d="M8 1.75 2.75 3.8v3.7c0 3.2 2.2 5.6 5.25 6.75 3.05-1.15 5.25-3.55 5.25-6.75V3.8L8 1.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="m5.6 8 1.7 1.7 3.1-3.3" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path d="M8 3 1.5 6 8 9l6.5-3L8 3Z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M4 7.3v3.2c0 .9 1.8 2 4 2s4-1.1 4-2V7.3M14.5 6v3.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-48 right-[-12%] size-[46rem] rounded-full bg-[radial-gradient(closest-side,#f2d2db,transparent)] opacity-90" />
      <div className="absolute top-[24%] -left-56 size-[38rem] rounded-full bg-[radial-gradient(closest-side,#ece6f5,transparent)]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_65%_30%,black,transparent)] bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] [background-size:26px_26px] opacity-60" />
    </div>
  );
}

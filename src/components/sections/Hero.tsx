import { profile } from "@/content/profile";
import { cvHref, site } from "@/content/site";
import { Halo } from "@/components/motion/Halo";
import { HeroReveal } from "@/components/motion/HeroReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Arrow } from "@/components/ui/Arrow";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const { ui } = site;

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <Halo />
      <HeroReveal className="flex min-h-[100svh] flex-col pt-20 pb-6 lg:pt-24 lg:pb-8">
        <Container className="flex flex-1 flex-col">
          <div data-hero-fade className="eyebrow grid-editorial border-t border-line pt-4 text-muted">
            <p className="col-span-6 lg:col-span-3">{profile.hero.eyebrow}</p>
            <p className="col-span-6 text-right lg:col-span-3 lg:col-start-7 lg:text-left">
              {profile.role}
            </p>
            <p className="hidden lg:col-span-3 lg:col-start-10 lg:block lg:text-right">
              {profile.location.coordinates}
            </p>
          </div>

          <div className="grid-editorial flex-1 content-center items-end gap-y-10 py-12 lg:py-16">
            <div className="col-span-12 lg:col-span-9">
              <div data-hero-fade>
                <Badge pulse>{profile.availability.label}</Badge>
              </div>
              <h1 id="hero-title" data-hero-title className="mt-8 font-serif text-mega text-fg lg:mt-10">
                <span className="block">{profile.firstName}</span>{" "}
                <span className="block pl-[14%] italic lg:pl-[26%]">{profile.lastName}</span>
              </h1>
            </div>
            <dl data-hero-fade className="hidden border-t border-line lg:col-span-3 lg:col-start-10 lg:block">
              {profile.hero.specs.map((spec) => (
                <div key={spec.label} className="flex flex-col gap-1 border-b border-line py-3">
                  <dt className="eyebrow text-muted">{spec.label}</dt>
                  <dd className="text-sm text-fg">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid-editorial items-end gap-y-8">
            <p
              data-hero-fade
              className="col-span-12 max-w-xl text-lead text-muted md:col-span-7 lg:col-span-5"
            >
              {profile.hero.lead}
            </p>
            <div
              data-hero-fade
              className="col-span-12 flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end lg:col-span-6 lg:col-start-7"
            >
              <Magnetic>
                <Button href="/#projets" icon={<Arrow direction="down" />}>
                  {ui.viewProjects}
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href="/#contact" variant="outline">
                  {ui.contactMe}
                </Button>
              </Magnetic>
              <Button
                href={cvHref}
                variant="ghost"
                size="sm"
                className="ml-2 underline decoration-line-strong underline-offset-[6px] hover:decoration-indigo-ink"
                icon={<Arrow direction="up-right" className="size-3.5" />}
                download={site.cvPdfUrl ? true : undefined}
              >
                {ui.downloadCv}
              </Button>
            </div>
          </div>

          <div
            data-hero-fade
            className="eyebrow mt-10 flex items-center justify-between border-t border-line pt-4 text-muted"
          >
            <span className="flex items-center gap-3">
              <span aria-hidden className="relative block h-7 w-px overflow-hidden bg-line-strong">
                <span className="absolute inset-0 bg-fg motion-safe:animate-[scroll-line_2.2s_var(--ease-out-expo)_infinite]" />
              </span>
              {ui.scroll}
            </span>
            <span>{profile.location.display}</span>
          </div>
        </Container>
      </HeroReveal>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects, projectsSection } from "@/content/projects";
import { isTodo, site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { BrowserMock } from "@/components/sections/BrowserMock";
import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projets/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, url: `/projets/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const labels = projectsSection.caseStudyLabels;
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const links = [
    { label: site.ui.demo, href: project.links.demo },
    { label: site.ui.code, href: project.links.code },
  ];

  return (
    <article aria-labelledby="project-title" className="pt-28 lg:pt-36">
      <Container>
        <Link
          href="/#projets"
          className="eyebrow inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
        >
          <Arrow direction="left" className="size-3" />
          {site.ui.backToProjects}
        </Link>

        <header className="grid-editorial mt-10 gap-y-8 border-t border-line pt-5 lg:mt-14">
          <p className="eyebrow col-span-12 text-muted lg:col-span-3">
            <span className="text-fg">{project.index}</span> — {project.kind}
          </p>
          <div className="col-span-12 lg:col-span-9">
            <SplitHeading as="h1" id="project-title" className="font-serif text-display text-fg">
              {project.title}
            </SplitHeading>
            <Reveal>
              <p className="mt-6 max-w-2xl text-lead text-muted">{project.summary}</p>
            </Reveal>
          </div>
        </header>

        <Reveal className="mt-14 lg:mt-20">
          <BrowserMock project={project} className="w-full" />
        </Reveal>

        <div className="grid-editorial mt-16 gap-y-14 lg:mt-24">
          <aside className="col-span-12 space-y-10 lg:col-span-3">
            <div>
              <h2 className="eyebrow text-muted">{labels.stack}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-muted">{labels.role}</h2>
              <p className="mt-4 text-fg">{project.role}</p>
            </div>
            <div>
              <h2 className="eyebrow text-muted">{labels.links}</h2>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {isTodo(link.href) ? (
                      <span className="text-muted">
                        {link.label} — {site.ui.linkPending}
                      </span>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-fg hover:text-indigo-ink"
                      >
                        {link.label}
                        <Arrow direction="up-right" className="size-3" />
                        <span className="sr-only">{site.ui.opensInNewTab}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="col-span-12 space-y-14 lg:col-span-7 lg:col-start-5">
            <Reveal as="section">
              <h2 className="eyebrow text-muted">{labels.context}</h2>
              <p className="mt-4 text-lead text-fg">{project.context}</p>
            </Reveal>
            <Reveal as="section">
              <h2 className="eyebrow text-muted">{labels.built}</h2>
              <ol className="mt-4 border-t border-line">
                {project.built.map((item, i) => (
                  <li key={item} className="flex gap-6 border-b border-line py-5">
                    <span className="eyebrow pt-1 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-fg">{item}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal as="section">
              <h2 className="eyebrow text-muted">{labels.takeaway}</h2>
              <blockquote className="mt-4 border-l border-indigo-ink pl-6 font-serif text-h3 text-fg">
                {project.takeaway}
              </blockquote>
            </Reveal>
          </div>
        </div>

        {next && next.slug !== project.slug ? (
          <nav aria-label={site.ui.nextProject} className="mt-24 border-t border-line pt-5 lg:mt-36">
            <p className="eyebrow text-muted">{site.ui.nextProject}</p>
            <Link
              href={`/projets/${next.slug}`}
              data-cursor={site.ui.cursorView}
              className="group/next mt-6 flex items-end justify-between gap-6"
            >
              <span className="font-serif text-h2 text-fg transition-transform duration-700 ease-out-expo group-hover/next:translate-x-3">
                {next.title}
              </span>
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-colors duration-500 group-hover/next:border-indigo group-hover/next:bg-indigo group-hover/next:text-on-accent">
                <Arrow />
              </span>
            </Link>
          </nav>
        ) : null}

        <div className="mt-16">
          <Button href="/#contact" variant="outline">
            {site.ui.contactMe}
          </Button>
        </div>
      </Container>
    </article>
  );
}

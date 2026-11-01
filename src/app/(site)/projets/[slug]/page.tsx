import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects, projectsSection } from "@/content/projects";
import { isTodo, site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { BrowserMock } from "@/components/sections/BrowserMock";
import { projectPanels } from "@/components/sections/Projects";
import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

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
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-fg shadow-soft transition-colors hover:text-accent"
        >
          <Arrow direction="left" className="size-3.5" />
          {site.ui.backToProjects}
        </Link>

        <header className="mt-10 max-w-4xl lg:mt-14">
          <p className="flex items-center gap-3">
            <span className="font-display text-sm font-bold text-accent">{project.index}</span>
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-fg shadow-soft">
              {project.kind}
            </span>
          </p>
          <SplitHeading as="h1" id="project-title" className="mt-6 text-display font-semibold text-fg">
            {project.title}
          </SplitHeading>
          <Reveal>
            <p className="mt-6 max-w-2xl text-lead text-muted">{project.summary}</p>
          </Reveal>
        </header>

        <Reveal
          className={cn(
            "mt-12 rounded-[var(--radius-panel)] border border-line p-4 sm:p-10 lg:mt-16 lg:p-16",
            projectPanels[project.accent],
          )}
        >
          <BrowserMock project={project} />
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-12">
          <aside className="card space-y-8 self-start p-7 sm:p-9 lg:sticky lg:top-28 lg:col-span-4">
            <div>
              <h2 className="eyebrow text-muted">{labels.stack}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Tag tone="soft">{tech}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-muted">{labels.role}</h2>
              <p className="mt-3 font-medium text-fg">{project.role}</p>
            </div>
            <div>
              <h2 className="eyebrow text-muted">{labels.links}</h2>
              <ul className="mt-3 space-y-2">
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
                        className="inline-flex items-center gap-2 font-semibold text-fg hover:text-accent"
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

          <div className="space-y-5 lg:col-span-8">
            <Reveal as="section" className="card p-7 sm:p-10">
              <h2 className="eyebrow text-muted">{labels.context}</h2>
              <p className="mt-4 font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] leading-[1.4] font-medium tracking-[-0.015em] text-fg">
                {project.context}
              </p>
            </Reveal>
            <Reveal as="section" className="card p-7 sm:p-10">
              <h2 className="eyebrow text-muted">{labels.built}</h2>
              <ol className="mt-5 space-y-3">
                {project.built.map((item, i) => (
                  <li key={item} className="flex gap-4 rounded-2xl border border-line bg-bg/60 p-5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-1 text-fg">{item}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal
              as="section"
              className="rounded-[var(--radius-card)] bg-[linear-gradient(135deg,var(--accent-tint),var(--accent-soft))] p-7 sm:p-10"
            >
              <h2 className="eyebrow text-accent">{labels.takeaway}</h2>
              <blockquote className="mt-4 font-display text-h3 font-medium text-fg">{project.takeaway}</blockquote>
            </Reveal>
          </div>
        </div>

        {next && next.slug !== project.slug ? (
          <nav aria-label={site.ui.nextProject} className="mt-20 lg:mt-28">
            <Link
              href={`/projets/${next.slug}`}
              className={cn(
                "group/next flex flex-col gap-6 rounded-[var(--radius-panel)] border border-line p-7 transition-shadow duration-700 hover:shadow-lift sm:flex-row sm:items-end sm:justify-between sm:p-10 lg:p-12",
                projectPanels[next.accent],
              )}
            >
              <span>
                <span className="eyebrow text-muted">{site.ui.nextProject}</span>
                <span className="mt-4 block font-display text-h2 font-semibold text-fg">{next.title}</span>
              </span>
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-700 ease-out-expo group-hover/next:-rotate-45">
                <Arrow />
              </span>
            </Link>
          </nav>
        ) : null}

        <div className="mt-10 flex justify-center">
          <Button href="/#contact" variant="secondary" icon={<Arrow direction="up-right" className="size-3.5" />}>
            {site.ui.contactMe}
          </Button>
        </div>
      </Container>
    </article>
  );
}

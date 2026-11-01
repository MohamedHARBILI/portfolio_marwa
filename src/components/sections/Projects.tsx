import Link from "next/link";
import { projects, projectsSection } from "@/content/projects";
import type { ProjectAccent } from "@/content/types";
import { site } from "@/content/site";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { Container } from "@/components/ui/Container";
import { SectionTitle, headingId } from "@/components/ui/SectionTitle";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { BrowserMock } from "./BrowserMock";

export const projectPanels: Record<ProjectAccent, string> = {
  blush: "bg-[linear-gradient(150deg,var(--accent-tint),var(--accent-soft))]",
  mist: "bg-[linear-gradient(150deg,#f4f7fb,var(--mist))]",
};

export function Projects() {
  return (
    <section
      id={projectsSection.id}
      aria-labelledby={headingId(projectsSection)}
      className="scroll-mt-24 py-24 lg:py-32"
    >
      <Container>
        <SectionTitle section={projectsSection} />

        <ul className="mt-12 space-y-5 lg:mt-16">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug}>
              <Link
                href={`/projets/${project.slug}`}
                className={cn(
                  "group/project grid overflow-hidden rounded-[var(--radius-panel)] border border-line transition-shadow duration-700 ease-out-expo hover:shadow-lift lg:grid-cols-12",
                  projectPanels[project.accent],
                )}
              >
                <div
                  className={cn(
                    "flex flex-col p-7 sm:p-10 lg:col-span-5 lg:p-12",
                    i % 2 === 1 ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-accent">{project.index}</span>
                    <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-fg shadow-soft">
                      {project.kind}
                    </span>
                  </span>
                  <h3 className="mt-6 text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-fg">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-muted">{project.summary}</p>
                  <span className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </span>
                  <span className="mt-10 inline-flex items-center gap-3 font-semibold text-fg lg:mt-auto lg:pt-12">
                    {site.ui.viewCaseStudy}
                    <span className="grid size-11 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-700 ease-out-expo group-hover/project:-rotate-45">
                      <Arrow />
                    </span>
                  </span>
                </div>

                <div
                  className={cn(
                    "order-first flex items-center px-5 pt-5 sm:px-10 sm:pt-10 lg:col-span-7 lg:p-12",
                    i % 2 === 1 ? "lg:order-1 lg:pr-0" : "lg:order-2 lg:pl-0",
                  )}
                >
                  <Parallax amount={5} className="w-full">
                    <BrowserMock
                      project={project}
                      className="transition-transform duration-1000 ease-out-expo group-hover/project:-translate-y-2 group-hover/project:scale-[1.015]"
                    />
                  </Parallax>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

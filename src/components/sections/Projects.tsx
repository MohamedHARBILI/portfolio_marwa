import { projectsSection } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { SectionTitle, headingId } from "@/components/ui/SectionTitle";
import { ProjectsList } from "./ProjectsList";

export function Projects() {
  return (
    <section
      id={projectsSection.id}
      aria-labelledby={headingId(projectsSection)}
      className="scroll-mt-20 py-24 lg:py-40"
    >
      <Container>
        <SectionTitle section={projectsSection} />
        <ProjectsList />
      </Container>
    </section>
  );
}

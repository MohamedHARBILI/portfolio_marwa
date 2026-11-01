import type { ReactNode } from "react";
import { skillGroups, skillsSection } from "@/content/skills";
import type { SkillGroup } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTitle, headingId } from "@/components/ui/SectionTitle";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

export function Skills() {
  const regular = skillGroups.filter((group) => group.tone !== "accent");
  const featured = skillGroups.filter((group) => group.tone === "accent");

  return (
    <section
      id={skillsSection.id}
      aria-labelledby={headingId(skillsSection)}
      className="scroll-mt-24 py-24 lg:py-32"
    >
      <Container>
        <SectionTitle section={skillsSection} />

        <Reveal stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {regular.map((group) => (
            <SkillCard key={group.id} group={group} />
          ))}
          {featured.map((group) => (
            <div
              key={group.id}
              className="relative isolate overflow-hidden rounded-[var(--radius-card)] border border-accent/10 bg-[linear-gradient(135deg,var(--accent-tint),var(--accent-soft))] p-7 sm:col-span-2 sm:p-9 lg:col-span-3 lg:grid lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-12 lg:p-12"
            >
              <div>
                <GroupIcon id={group.id} featured />
                <h3 className="mt-5 text-h3 font-semibold text-fg">{group.label}</h3>
                {group.note ? <p className="mt-3 max-w-md text-muted">{group.note}</p> : null}
              </div>
              <ul className="mt-6 flex flex-wrap gap-2 lg:mt-0">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag tone="accent" className="px-4 py-2 text-[0.9375rem]">
                      {item}
                    </Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

function SkillCard({ group }: { group: SkillGroup }) {
  return (
    <div className="card group/skill flex flex-col p-7 transition-[transform,box-shadow] duration-700 ease-out-expo hover:-translate-y-1 hover:shadow-lift sm:p-8">
      <GroupIcon id={group.id} />
      <h3 className="mt-5 text-[1.375rem] leading-tight font-semibold tracking-[-0.02em] text-fg">{group.label}</h3>
      <ul className="mt-5 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li key={item}>
            <Tag tone="soft">{item}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );
}

const icons: Record<string, ReactNode> = {
  front: <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13" />,
  back: (
    <>
      <rect x="4" y="4.5" width="16" height="6" rx="2" />
      <rect x="4" y="13.5" width="16" height="6" rx="2" />
      <path d="M7.5 7.5h.01M7.5 16.5h.01" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.75" />
      <path d="M5 6v6c0 1.5 3.1 2.75 7 2.75s7-1.25 7-2.75V6M5 12v6c0 1.5 3.1 2.75 7 2.75s7-1.25 7-2.75v-6" />
    </>
  ),
  tools: (
    <>
      <circle cx="6.5" cy="6" r="2.25" />
      <circle cx="6.5" cy="18" r="2.25" />
      <circle cx="17.5" cy="9" r="2.25" />
      <path d="M6.5 8.25v7.5M17.5 11.25c0 3-3 3.5-6 4.25-2 .5-3.5 1-4.5 1.5" />
    </>
  ),
  office: (
    <>
      <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" />
      <path d="M13.5 3.5v4.5H18M9 12.5h6M9 16h4" />
    </>
  ),
  soft: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19.5c.6-3 2.8-4.75 5.5-4.75s4.9 1.75 5.5 4.75M15.5 5.25a3 3 0 0 1 0 5.5M17.5 14.9c1.6.6 2.7 2.15 3 4.6" />
    </>
  ),
  payments: (
    <>
      <rect x="2.75" y="5" width="18.5" height="14" rx="2.5" />
      <path d="M2.75 9.5h18.5M6.5 15h4" />
    </>
  ),
};

function GroupIcon({ id, featured = false }: { id: string; featured?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-12 place-items-center rounded-2xl",
        featured ? "bg-accent text-on-accent" : "bg-accent-soft text-accent",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
      >
        {icons[id] ?? icons.front}
      </svg>
    </span>
  );
}

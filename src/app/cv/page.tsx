import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { education } from "@/content/education";
import { experiences } from "@/content/experience";
import { languages } from "@/content/languages";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { cvLabels, isTodo, site } from "@/content/site";
import { skillGroups, softSkillsId } from "@/content/skills";
import { Monogram } from "@/components/ui/Monogram";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: cvLabels.metaTitle,
  description: cvLabels.metaDescription,
  alternates: { canonical: "/cv" },
};

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, "");
}

export default function CvPage() {
  const technical = skillGroups.filter((group) => group.id !== softSkillsId);
  const soft = skillGroups.find((group) => group.id === softSkillsId);
  const contacts = [
    { label: site.email, href: `mailto:${site.email}` },
    ...(site.showPhone ? [{ label: site.phone.display, href: site.phone.href }] : []),
    { label: stripProtocol(site.github.href), href: site.github.href },
    ...(isTodo(site.linkedin.href) ? [] : [{ label: stripProtocol(site.linkedin.href), href: site.linkedin.href }]),
    { label: profile.location.display },
  ];

  return (
    <main className="min-h-svh bg-ink px-4 py-6 sm:py-10 print:bg-white print:p-0">
      <div data-print-hidden className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-4">
        <Link href="/" className="eyebrow inline-flex items-center gap-2 text-muted hover:text-fg">
          <span aria-hidden>←</span> {site.ui.backToSite}
        </Link>
        <PrintButton label={site.ui.printCv} />
      </div>

      <article
        aria-label={`${cvLabels.metaTitle} — ${profile.fullName}`}
        className="mx-auto w-full max-w-[210mm] bg-white text-[#1b1b24] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] sm:min-h-[297mm] print:min-h-0 print:max-w-none print:shadow-none"
      >
        <header className="flex items-end justify-between gap-6 bg-[#14148f] px-6 py-7 text-white sm:px-[14mm] sm:py-[10mm]">
          <div>
            <h1 className="font-serif text-[2.75rem] leading-none sm:text-[3.25rem]">{profile.fullName}</h1>
            <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.18em] uppercase opacity-85">{profile.role}</p>
          </div>
          <Monogram className="hidden size-14 shrink-0 text-white sm:block" plain />
        </header>

        <div className="grid gap-8 px-6 py-8 text-[0.8125rem] leading-relaxed sm:grid-cols-[58mm_1fr] sm:gap-[9mm] sm:px-[14mm] sm:py-[9mm] print:grid-cols-[58mm_1fr]">
          <aside className="space-y-6">
            <CvBlock title={cvLabels.contact}>
              <ul className="space-y-1.5 break-words">
                {contacts.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} className="underline decoration-[#c9c6d2] underline-offset-2">
                        {item.label}
                      </a>
                    ) : (
                      item.label
                    )}
                  </li>
                ))}
              </ul>
            </CvBlock>

            <CvBlock title={cvLabels.skills}>
              <dl className="space-y-2.5">
                {technical.map((group) => (
                  <div key={group.id}>
                    <dt className="font-semibold">{group.label}</dt>
                    <dd className="text-[#4a4756]">{group.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </CvBlock>

            {soft ? (
              <CvBlock title={cvLabels.softSkills}>
                <p className="text-[#4a4756]">{soft.items.join(" · ")}</p>
              </CvBlock>
            ) : null}

            <CvBlock title={cvLabels.languages}>
              <ul className="space-y-1">
                {languages.map((language) => (
                  <li key={language.id} className="flex justify-between gap-3">
                    <span className="font-semibold">{language.name}</span>
                    <span className="text-right text-[#4a4756]">{language.level}</span>
                  </li>
                ))}
              </ul>
            </CvBlock>

            <CvBlock title={cvLabels.attestations}>
              <p className="text-[#4a4756]">{education.attestation.title}</p>
            </CvBlock>
          </aside>

          <div className="space-y-6">
            <CvBlock title={cvLabels.profile}>
              <p className="text-[#33313d]">{profile.summary}</p>
            </CvBlock>

            <CvBlock title={cvLabels.experience}>
              {experiences.map((experience) => (
                <div key={experience.id} className="break-inside-avoid">
                  <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="font-semibold">
                      {experience.role} — {experience.company}, {experience.team}
                    </span>
                    <span className="font-mono text-[0.6875rem] text-[#5a5664]">{experience.period.display}</span>
                  </p>
                  <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-[#33313d] marker:text-[#2b2bd9]">
                    {experience.missions.map((mission) => (
                      <li key={mission}>{mission}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CvBlock>

            <CvBlock title={cvLabels.education}>
              <ul className="space-y-3">
                {education.entries.map((entry) => (
                  <li key={entry.id} className="break-inside-avoid">
                    <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <span className="font-semibold">{entry.title}</span>
                      <span className="font-mono text-[0.6875rem] text-[#5a5664]">{entry.period}</span>
                    </p>
                    <p className="text-[#4a4756]">
                      {entry.institution}
                      {entry.status ? ` — ${entry.status}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </CvBlock>

            <CvBlock title={cvLabels.projects}>
              <ul className="space-y-3">
                {projects.map((project) => (
                  <li key={project.slug} className="break-inside-avoid">
                    <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <span className="font-semibold">{project.title}</span>
                      <span className="font-mono text-[0.6875rem] text-[#5a5664]">{project.kind}</span>
                    </p>
                    <p className="text-[#33313d]">{project.summary}</p>
                    <p className="text-[#4a4756]">{project.stack.join(", ")}</p>
                  </li>
                ))}
              </ul>
            </CvBlock>
          </div>
        </div>
      </article>
    </main>
  );
}

function CvBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="break-inside-avoid">
      <h2 className="mb-2.5 border-b border-[#dcd9e3] pb-1.5 font-mono text-[0.6875rem] font-medium tracking-[0.16em] text-[#2b2bd9] uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

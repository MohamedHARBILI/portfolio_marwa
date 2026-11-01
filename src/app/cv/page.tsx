import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import portrait from "@/assets/marwa-frej.jpg";
import { education } from "@/content/education";
import { experiences } from "@/content/experience";
import { languages } from "@/content/languages";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { cvLabels, isTodo, site } from "@/content/site";
import { skillGroups, softSkillsId } from "@/content/skills";
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
    <main className="min-h-svh bg-bg px-4 py-6 sm:py-10 print:bg-white print:p-0">
      <div data-print-hidden className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-fg shadow-soft hover:text-accent">
          <span aria-hidden>←</span> {site.ui.backToSite}
        </Link>
        <PrintButton label={site.ui.printCv} />
      </div>

      <article
        aria-label={`${cvLabels.metaTitle} — ${profile.fullName}`}
        className="mx-auto w-full max-w-[210mm] overflow-hidden rounded-2xl bg-white text-[#211a1d] shadow-lift print:rounded-none sm:min-h-[297mm] print:min-h-0 print:max-w-none print:shadow-none"
      >
        <header className="flex items-center gap-6 bg-[#8c1d40] px-6 py-7 text-white sm:px-[14mm] sm:py-[9mm]">
          <span className="relative size-20 shrink-0 overflow-hidden rounded-full ring-4 ring-white/25 sm:size-[26mm]">
            <Image src={portrait} alt={profile.photo.alt} fill sizes="104px" className="object-cover object-top" />
          </span>
          <div>
            <h1 className="font-display text-[2.25rem] leading-none font-semibold tracking-[-0.03em] sm:text-[2.875rem]">
              {profile.fullName}
            </h1>
            <p className="mt-2 text-[0.75rem] font-semibold tracking-[0.16em] uppercase opacity-90">{profile.role}</p>
          </div>
        </header>

        <div className="grid gap-8 px-6 py-8 text-[0.8125rem] leading-relaxed sm:grid-cols-[58mm_1fr] sm:gap-[9mm] sm:px-[14mm] sm:py-[9mm] print:grid-cols-[58mm_1fr]">
          <aside className="space-y-6">
            <CvBlock title={cvLabels.contact}>
              <ul className="space-y-1.5 break-words">
                {contacts.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} className="underline decoration-[#dcc9cf] underline-offset-2">
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
                    <dd className="text-[#5a5055]">{group.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </CvBlock>

            {soft ? (
              <CvBlock title={cvLabels.softSkills}>
                <p className="text-[#5a5055]">{soft.items.join(" · ")}</p>
              </CvBlock>
            ) : null}

            <CvBlock title={cvLabels.languages}>
              <ul className="space-y-1">
                {languages.map((language) => (
                  <li key={language.id} className="flex justify-between gap-3">
                    <span className="font-semibold">{language.name}</span>
                    <span className="text-right text-[#5a5055]">{language.level}</span>
                  </li>
                ))}
              </ul>
            </CvBlock>

            <CvBlock title={cvLabels.attestations}>
              <p className="text-[#5a5055]">{education.attestation.title}</p>
            </CvBlock>
          </aside>

          <div className="space-y-6">
            <CvBlock title={cvLabels.profile}>
              <p className="text-[#3a3135]">{profile.summary}</p>
            </CvBlock>

            <CvBlock title={cvLabels.experience}>
              {experiences.map((experience) => (
                <div key={experience.id} className="break-inside-avoid">
                  <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="font-semibold">
                      {experience.role} — {experience.company}, {experience.team}
                    </span>
                    <span className="text-[0.6875rem] font-semibold text-[#6b6166]">{experience.period.display}</span>
                  </p>
                  <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-[#3a3135] marker:text-[#8c1d40]">
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
                      <span className="text-[0.6875rem] font-semibold text-[#6b6166]">{entry.period}</span>
                    </p>
                    <p className="text-[#5a5055]">
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
                      <span className="text-[0.6875rem] font-semibold text-[#6b6166]">{project.kind}</span>
                    </p>
                    <p className="text-[#3a3135]">{project.summary}</p>
                    <p className="text-[#5a5055]">{project.stack.join(", ")}</p>
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
      <h2 className="mb-2.5 border-b border-[#eddde2] pb-1.5 text-[0.6875rem] font-bold tracking-[0.16em] text-[#8c1d40] uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

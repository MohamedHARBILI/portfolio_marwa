// Content model shared by the site and the /cv page.

/** A heading or sentence where some segments are set in italics. */
export type RichSegment = string | { readonly em: string };
export type RichText = readonly RichSegment[];

/** Marks a value the client still has to provide. */
export type Todo = `TODO${string}`;

export interface SectionMeta {
  readonly id: string;
  readonly index: string;
  readonly label: string;
  readonly title: RichText;
  readonly intro?: string;
}

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface ExternalLink {
  readonly label: string;
  readonly href: string | Todo;
  readonly handle: string;
}

export interface UiStrings {
  readonly skipLink: string;
  readonly primaryNav: string;
  readonly home: string;
  readonly menuOpen: string;
  readonly menuClose: string;
  readonly menu: string;
  readonly themeToLight: string;
  readonly themeToDark: string;
  readonly viewProjects: string;
  readonly contactMe: string;
  readonly downloadCv: string;
  readonly scroll: string;
  readonly introSkip: string;
  readonly copyEmail: string;
  readonly copied: string;
  readonly copyFailed: string;
  readonly writeEmail: string;
  readonly backToTop: string;
  readonly viewCaseStudy: string;
  readonly cursorView: string;
  readonly backToProjects: string;
  readonly nextProject: string;
  readonly linkPending: string;
  readonly demo: string;
  readonly code: string;
  readonly printCv: string;
  readonly backToSite: string;
  readonly footerNav: string;
  readonly elsewhere: string;
  readonly opensInNewTab: string;
}

export interface ContactSection extends SectionMeta {
  readonly lead: string;
  readonly emailLabel: string;
}

export interface NotFoundContent {
  readonly code: string;
  readonly title: RichText;
  readonly text: string;
  readonly cta: string;
}

export interface SiteConfig {
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly locale: string;
  readonly lang: string;
  readonly email: string;
  readonly phone: { readonly display: string; readonly href: string };
  readonly showPhone: boolean;
  readonly github: ExternalLink;
  readonly linkedin: ExternalLink;
  /** Original PDF in /public. Null until the client provides it. */
  readonly cvPdfUrl: string | null;
  readonly cvPageUrl: string;
  readonly copyrightYear: number;
  readonly nav: readonly NavItem[];
  readonly ui: UiStrings;
  readonly contact: ContactSection;
  readonly notFound: NotFoundContent;
  readonly footerNote: string;
}

export interface Fact {
  readonly value: string;
  readonly label: string;
}

export interface Profile {
  readonly firstName: string;
  readonly lastName: string;
  readonly fullName: string;
  readonly initials: string;
  readonly role: string;
  readonly location: {
    readonly city: string;
    readonly country: string;
    readonly countryCode: string;
    readonly display: string;
    readonly coordinates: string;
  };
  readonly availability: { readonly label: string; readonly detail: string };
  readonly hero: { readonly eyebrow: string; readonly lead: string };
  readonly about: SectionMeta & {
    readonly bio: readonly string[];
    readonly facts: readonly Fact[];
  };
  /** Short summary used by the CV page and metadata. */
  readonly summary: string;
}

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly team: string;
  readonly role: string;
  readonly period: { readonly start: string; readonly end: string; readonly display: string };
  readonly summary: string;
  readonly missions: readonly string[];
  readonly keywords: readonly string[];
}

export interface FlowStep {
  readonly id: string;
  readonly index: string;
  readonly name: string;
  readonly detail?: string;
  readonly description: string;
}

export interface PaymentFlowContent {
  readonly label: string;
  readonly title: RichText;
  readonly intro: string;
  readonly steps: readonly FlowStep[];
  /** Inserted after the step whose id matches `after`. */
  readonly risk: FlowStep & { readonly after: string };
  readonly caption: string;
  readonly ariaLabel: string;
}

export type ProjectMotif = "commerce" | "network";
export type ProjectAccent = "indigo" | "garnet";

export interface Project {
  readonly slug: string;
  readonly index: string;
  readonly title: string;
  readonly kind: string;
  readonly urlLabel: string;
  readonly summary: string;
  readonly context: string;
  readonly built: readonly string[];
  readonly stack: readonly string[];
  readonly role: string;
  readonly takeaway: string;
  readonly links: { readonly demo: string | Todo; readonly code: string | Todo };
  readonly accent: ProjectAccent;
  readonly motif: ProjectMotif;
}

export interface ProjectsContent extends SectionMeta {
  readonly caseStudyLabels: {
    readonly context: string;
    readonly built: string;
    readonly stack: string;
    readonly role: string;
    readonly takeaway: string;
    readonly links: string;
  };
}

export interface SkillGroup {
  readonly id: string;
  readonly label: string;
  readonly items: readonly string[];
  readonly tone?: "default" | "accent" | "soft";
}

export interface EducationEntry {
  readonly id: string;
  readonly period: string;
  readonly title: string;
  readonly institution: string;
  readonly status?: string;
}

export interface EducationContent extends SectionMeta {
  readonly entries: readonly EducationEntry[];
  readonly attestation: { readonly label: string; readonly title: string };
}

export interface Language {
  readonly id: string;
  readonly name: string;
  readonly native: string;
  readonly lang: string;
  readonly dir?: "rtl" | "ltr";
  readonly level: string;
}

export interface CvLabels {
  readonly profile: string;
  readonly experience: string;
  readonly education: string;
  readonly projects: string;
  readonly skills: string;
  readonly softSkills: string;
  readonly languages: string;
  readonly attestations: string;
  readonly contact: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
}

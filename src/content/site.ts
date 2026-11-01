import type { CvLabels, SiteConfig } from "./types";

export const site: SiteConfig = {
  // Replace with the production domain once deployed (see PROGRESS.md « À fournir »).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://marwa-frej.vercel.app",
  title: "Marwa Frej — Développeuse Web Full Stack à Casablanca",
  description:
    "Portfolio de Marwa Frej, développeuse web full stack à Casablanca : applications web en HTML, CSS, JavaScript, React, PHP et Laravel, bases de données SQL, et une expérience en stage au sein d'une équipe Risques & Fraude.",
  keywords: [
    "Marwa Frej",
    "développeuse web",
    "développeuse full stack",
    "Casablanca",
    "Maroc",
    "React",
    "Laravel",
    "PHP",
    "JavaScript",
    "SQL",
    "PL/SQL",
    "paiement en ligne",
  ],
  locale: "fr_FR",
  lang: "fr",
  email: "marwa20.20frej@gmail.com",
  phone: { display: "+212 6 21 58 95 17", href: "tel:+212621589517" },
  showPhone: false,
  github: {
    label: "GitHub",
    href: "https://github.com/MarwaFrej20",
    handle: "MarwaFrej20",
  },
  linkedin: {
    label: "LinkedIn",
    href: "TODO_LINKEDIN_URL",
    handle: "Marwa Frej",
  },
  cvPdfUrl: null,
  cvPageUrl: "/cv",
  copyrightYear: 2026,
  nav: [
    { label: "À propos", href: "/#a-propos" },
    { label: "Expérience", href: "/#experience" },
    { label: "Projets", href: "/#projets" },
    { label: "Compétences", href: "/#competences" },
    { label: "Parcours", href: "/#parcours" },
    { label: "Contact", href: "/#contact" },
  ],
  ui: {
    skipLink: "Aller au contenu",
    primaryNav: "Navigation principale",
    home: "Accueil",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    menu: "Menu",
    themeToLight: "Passer au thème clair",
    themeToDark: "Passer au thème sombre",
    viewProjects: "Voir mes projets",
    contactMe: "Me contacter",
    downloadCv: "Télécharger le CV",
    scroll: "Défiler",
    introSkip: "Cliquer ou appuyer sur Échap pour passer",
    copyEmail: "Copier l'email",
    copied: "Email copié",
    copyFailed: "Copie impossible — sélectionnez l'adresse",
    writeEmail: "Écrire un email",
    backToTop: "Retour en haut",
    viewCaseStudy: "Voir l'étude de cas",
    cursorView: "Voir",
    backToProjects: "Tous les projets",
    nextProject: "Projet suivant",
    linkPending: "Lien à venir",
    demo: "Démo",
    code: "Code source",
    printCv: "Enregistrer en PDF",
    backToSite: "Retour au portfolio",
    footerNav: "Navigation du pied de page",
    elsewhere: "Ailleurs",
    opensInNewTab: "(nouvel onglet)",
  },
  contact: {
    id: "contact",
    index: "07",
    label: "Contact",
    title: ["Construisons quelque chose ", { em: "ensemble" }, "."],
    lead: "Un poste de développeuse web, un projet, une question ? Ma boîte mail est ouverte et je réponds avec plaisir.",
    emailLabel: "Email",
  },
  notFound: {
    code: "404",
    title: ["Cette page s'est ", { em: "perdue" }, " en route."],
    text: "Le lien est peut-être incorrect, ou la page a été déplacée.",
    cta: "Revenir à l'accueil",
  },
  footerNote: "Casablanca, Maroc",
};

export const cvLabels: CvLabels = {
  profile: "Profil",
  experience: "Expérience professionnelle",
  education: "Formation",
  projects: "Projets",
  skills: "Compétences techniques",
  softSkills: "Compétences comportementales",
  languages: "Langues",
  attestations: "Attestations",
  contact: "Contact",
  metaTitle: "CV",
  metaDescription:
    "CV de Marwa Frej, développeuse web full stack à Casablanca — version imprimable.",
};

/** True when a content value is still a placeholder. */
export function isTodo(value: string | null | undefined): boolean {
  return !value || value.startsWith("TODO");
}

/** Where every « Télécharger le CV » button points. */
export const cvHref = site.cvPdfUrl ?? site.cvPageUrl;

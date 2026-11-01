import type { Profile } from "./types";

export const profile: Profile = {
  firstName: "Marwa",
  lastName: "Frej",
  fullName: "Marwa Frej",
  initials: "MF",
  role: "Développeuse Web Full Stack",
  location: {
    city: "Casablanca",
    country: "Maroc",
    countryCode: "MA",
    display: "Casablanca, Maroc",
    coordinates: "33°35′ N — 7°37′ O",
  },
  availability: {
    label: "Ouverte aux opportunités",
    detail: "Je recherche un poste de développeuse web.",
  },
  hero: {
    eyebrow: "Portfolio — 2026",
    lead: "Développeuse web full stack, je construis des applications complètes, de l'interface en React à la logique serveur en Laravel. En stage, j'ai découvert les coulisses des paiements en ligne.",
    specs: [
      { label: "Spécialité", value: "Développement web full stack" },
      { label: "Stack", value: "React · Laravel · PHP · SQL" },
      { label: "Domaine", value: "Paiements — Risques & Fraude" },
      { label: "Basée à", value: "Casablanca, Maroc" },
    ],
  },
  intro: {
    code: [
      { text: "const ", kind: "keyword" },
      { text: "marwa", kind: "name" },
      { text: " = ", kind: "punct" },
      { text: "new ", kind: "keyword" },
      { text: "Developer", kind: "type" },
      { text: "({ ", kind: "punct" },
      { text: "stack", kind: "prop" },
      { text: ": ", kind: "punct" },
      { text: "\"full\"", kind: "string" },
      { text: " });", kind: "punct" },
    ],
  },
  about: {
    id: "a-propos",
    index: "01",
    label: "À propos",
    title: ["Du premier pixel à la dernière ", { em: "requête SQL" }, "."],
    bio: [
      "Diplômée en Développement Digital Full Stack, je conçois et développe des applications web de bout en bout : des interfaces en HTML, CSS, JavaScript et React, une logique serveur en PHP et Laravel, des données bien rangées en SQL.",
      "Mon stage au sein de l'équipe Risques & Fraude de VPS m'a plongée dans l'envers du décor des paiements en ligne : PSP, 3-D Secure, tokenisation, transactions récurrentes.",
      "Sérieuse, motivée et attachée au travail d'équipe, je souhaite aujourd'hui mettre ces compétences au service de nouveaux projets et continuer à progresser.",
    ],
    facts: [
      { value: "2025", label: "Diplôme en Développement Digital Full Stack" },
      { value: "4 mois", label: "de stage dans l'équipe Risques & Fraude de VPS" },
      { value: "PL/SQL", label: "Certificat SQL & PL/SQL — JobInTech × Supemir" },
      { value: "4 langues", label: "Arabe, français, anglais et turc" },
    ],
  },
  summary:
    "Développeuse web full stack diplômée en Développement Digital, passionnée par la conception et le développement d'applications web. Compétente en HTML, CSS, JavaScript, PHP, Laravel et React, avec des connaissances en bases de données SQL. Sérieuse, motivée et dotée d'un bon esprit d'équipe, je souhaite mettre mes compétences techniques au service de nouveaux projets et continuer à développer mon expertise.",
};

import type { EducationContent } from "./types";

export const education: EducationContent = {
  id: "parcours",
  index: "05",
  label: "Parcours",
  title: ["Un parcours ", { em: "en ligne droite" }, " vers le code."],
  intro: "Des sciences physiques au développement full stack, puis à la donnée.",
  entries: [
    {
      id: "plsql",
      period: "Oct. 2025 — Fév. 2026",
      title: "Formation SQL & PL/SQL",
      institution: "JobInTech × Supemir",
      status: "Certificat obtenu",
    },
    {
      id: "isfo",
      period: "2023 — 2025",
      title: "Diplôme en Développement Digital Full Stack",
      institution: "Institut Spécialisé de Formation en Offshoring, Casablanca",
      status: "Diplôme obtenu",
    },
    {
      id: "bac",
      period: "2022 — 2023",
      title: "Baccalauréat Sciences Physiques",
      institution: "Lycée Mohammed V",
    },
  ],
  attestation: {
    label: "Attestation",
    title: "Attestation de participation au programme Ambassadeurs",
  },
};

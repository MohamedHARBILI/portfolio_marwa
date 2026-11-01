import type { SectionMeta, SkillGroup } from "./types";

export const skillsSection: SectionMeta = {
  id: "competences",
  index: "04",
  label: "Compétences",
  title: ["Une boîte à outils ", { em: "full stack" }, "."],
  intro:
    "Les langages, frameworks et outils avec lesquels je travaille, et les qualités que j'apporte à une équipe.",
};

export const skillGroups: readonly SkillGroup[] = [
  { id: "front", label: "Front-end", items: ["HTML", "CSS", "JavaScript", "React"] },
  { id: "back", label: "Back-end", items: ["PHP", "Laravel"] },
  { id: "data", label: "Bases de données", items: ["MySQL", "MongoDB", "PL/SQL"] },
  { id: "tools", label: "Outils", items: ["Git", "GitHub", "VS Code", "Jira", "Figma"] },
  { id: "office", label: "Bureautique & création", items: ["Excel", "Word", "PowerPoint", "Canva"] },
  {
    id: "payments",
    label: "Domaine des paiements",
    items: [
      "PSP",
      "3-D Secure",
      "Tokenisation",
      "Transactions récurrentes",
      "Gestion des risques",
      "Prévention de la fraude",
    ],
    tone: "accent",
  },
  {
    id: "soft",
    label: "Savoir-être",
    items: ["Leadership", "Esprit d'équipe", "Esprit critique", "Négociation", "Adaptabilité"],
    tone: "soft",
  },
];

export const technicalSkillIds = ["front", "back", "data", "tools", "office"] as const;
export const softSkillsId = "soft";

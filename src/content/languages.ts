import type { Language, SectionMeta } from "./types";

export const languagesSection: SectionMeta = {
  id: "langues",
  index: "06",
  label: "Langues",
  title: ["Quatre langues, ", { em: "une seule" }, " façon de bien communiquer."],
};

export const languages: readonly Language[] = [
  { id: "ar", name: "Arabe", native: "العربية", lang: "ar", dir: "rtl", level: "Langue maternelle" },
  { id: "fr", name: "Français", native: "Français", lang: "fr", level: "Très bon niveau" },
  { id: "en", name: "Anglais", native: "English", lang: "en", level: "Bon niveau" },
  { id: "tr", name: "Turc", native: "Türkçe", lang: "tr", level: "Assez bon niveau" },
];

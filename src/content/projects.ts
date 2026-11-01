import type { Project, ProjectsContent } from "./types";

export const projectsSection: ProjectsContent = {
  id: "projets",
  index: "03",
  label: "Projets",
  title: ["Des projets construits ", { em: "de bout en bout" }, "."],
  intro:
    "Du front-end à la base de données : deux réalisations où j’ai tenu toute la chaîne.",
  caseStudyLabels: {
    context: "Contexte",
    built: "Ce que j’ai construit",
    stack: "Stack",
    role: "Mon rôle",
    takeaway: "Ce que j’en retiens",
    links: "Liens",
  },
};

export const projects: readonly Project[] = [
  {
    slug: "site-de-vente-en-ligne",
    index: "01",
    title: "Site web de vente en ligne",
    shortTitle: "Vente en ligne",
    kind: "Projet web",
    urlLabel: "vente-en-ligne",
    summary:
      "Un site e-commerce développé de A à Z, de l’interface jusqu’à la base de données.",
    context:
      "Un site de vente en ligne : le terrain idéal pour relier une interface utilisateur à une vraie logique serveur et à des données persistantes.",
    built: [
      "L’interface du site en HTML, CSS et JavaScript.",
      "La logique côté serveur en PHP.",
      "La base de données MySQL qui stocke et restitue les informations du site.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    role: "Développement front-end et back-end.",
    takeaway:
      "Faire circuler l’information d’un bout à l’autre — du formulaire à la requête SQL, puis de retour à l’écran — et comprendre comment chaque couche dépend des autres.",
    links: { demo: "TODO_DEMO_URL", code: "TODO_CODE_URL" },
    accent: "indigo",
    motif: "commerce",
  },
  {
    slug: "plateforme-anciens-camarades",
    index: "02",
    title: "Plateforme de mise en relation entre anciens camarades",
    shortTitle: "Anciens camarades",
    kind: "Hackathon",
    urlLabel: "anciens-camarades",
    summary:
      "Une plateforme pour retrouver ses anciens camarades, avec gestion des profils et échanges en temps réel.",
    context:
      "Un hackathon : peu de temps, une équipe, et une idée — permettre à d’anciens camarades de se retrouver et d’échanger.",
    built: [
      "La gestion des profils des utilisateurs.",
      "Les échanges en temps réel entre camarades.",
      "Le back-end en PHP et MySQL, et le front-end en HTML, CSS et JavaScript.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    role: "Réalisation des tâches back-end (PHP, MySQL) et front-end (HTML, CSS, JavaScript).",
    takeaway:
      "Livrer vite et en équipe : se répartir le travail, avancer en parallèle sur le front et le back, et faire converger le tout dans le temps imparti.",
    links: { demo: "TODO_DEMO_URL", code: "TODO_CODE_URL" },
    accent: "garnet",
    motif: "network",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

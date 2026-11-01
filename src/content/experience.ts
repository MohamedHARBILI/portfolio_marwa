import type { Experience, PaymentFlowContent, SectionMeta } from "./types";

export const experienceSection: SectionMeta = {
  id: "experience",
  index: "02",
  label: "Expérience",
  title: ["Quatre mois dans les coulisses des ", { em: "paiements" }, "."],
  intro:
    "Un stage au sein d’une équipe Risques & Fraude : observer, analyser et comprendre ce qui se passe derrière chaque transaction.",
};

export const experiences: readonly Experience[] = [
  {
    id: "vps",
    company: "VPS",
    team: "Équipe Risques & Fraude",
    role: "Stagiaire",
    period: { start: "2026-05", end: "2026-08", display: "Mai — Août 2026" },
    summary:
      "Immersion dans le quotidien d’une équipe qui surveille les flux de paiement et protège les transactions contre la fraude.",
    missions: [
      "Analyse et suivi des transactions de paiement.",
      "Découverte des mécanismes de détection et de prévention de la fraude.",
      "Familiarisation avec les processus de gestion des risques.",
      "Compréhension des notions de PSP, 3-D Secure, tokenisation et transactions récurrentes.",
    ],
    keywords: [
      "PSP",
      "3-D Secure",
      "Tokenisation",
      "Transactions récurrentes",
      "Gestion des risques",
      "Prévention de la fraude",
    ],
  },
];

export const paymentFlow: PaymentFlowContent = {
  label: "Parcours d’un paiement",
  title: ["Ce qui se joue derrière un clic sur ", { em: "« Payer »" }],
  intro:
    "Pendant mon stage, j’ai appris à lire une transaction de bout en bout. Voici, simplifié, le chemin qu’elle parcourt — et l’endroit où l’on traque la fraude.",
  ariaLabel: "Schéma du parcours d’un paiement en ligne, du client à la banque émettrice",
  steps: [
    {
      id: "client",
      index: "01",
      name: "Client",
      detail: "Porteur de carte",
      description:
        "Il valide son panier et saisit ses informations de paiement sur le site.",
    },
    {
      id: "merchant",
      index: "02",
      name: "Marchand",
      detail: "Site e-commerce",
      description:
        "Le site transmet la demande de paiement à son prestataire, sans manipuler lui-même les données de carte.",
    },
    {
      id: "psp",
      index: "03",
      name: "PSP",
      detail: "Prestataire de services de paiement",
      description:
        "Il reçoit la transaction, la contrôle et l’oriente vers les bons acteurs du réseau.",
    },
    {
      id: "3ds",
      index: "04",
      name: "3-D Secure",
      detail: "Authentification forte",
      description:
        "Le porteur confirme son identité auprès de sa banque, par exemple via une notification ou un code.",
    },
    {
      id: "token",
      index: "05",
      name: "Tokenisation",
      detail: "Jeton de paiement",
      description:
        "Le numéro de carte est remplacé par un jeton, réutilisable pour les paiements récurrents sans exposer la carte.",
    },
    {
      id: "issuer",
      index: "06",
      name: "Banque émettrice",
      detail: "Banque du porteur",
      description:
        "Elle vérifie le compte et autorise — ou refuse — la transaction. La réponse remonte jusqu’au client.",
    },
  ],
  risk: {
    id: "risk",
    index: "R",
    after: "psp",
    name: "Analyse de risque",
    detail: "Risques & Fraude",
    description:
      "Montant, fréquence, comportement inhabituel : chaque transaction est évaluée. C’est ici que l’on détecte et que l’on prévient la fraude.",
  },
  caption: "Schéma simplifié, à visée pédagogique.",
};

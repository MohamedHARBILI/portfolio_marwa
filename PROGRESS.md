# PROGRESS — Portfolio Marwa Frej

**Prochaine action : Commit du contenu typé, puis construire toutes les sections en statique (Hero, About, Experience, PaymentFlow, Projects, Skills, Education, Languages, Contact).**

## Checklist
- [x] Initialisation Next.js, réglages, CLAUDE.md, PROGRESS.md, git, dépendances, arborescence
- [x] Design system : tokens, polices, globals.css, composants ui/, monogramme, Header/Footer
- [ ] Contenu typé dans src/content à partir du CV (réécrit et vérifié)
- [ ] Toutes les sections en statique, responsive
- [ ] Motion : SmoothScroll, IntroHook, Hero, Reveal, PaymentFlow, Cursor, Magnetic
- [ ] Pages projets, page CV imprimable, SEO, accessibilité, performance
- [ ] QA finale : lint/types/build, relecture orthographique, 5 largeurs, reduced-motion, README, liste « À fournir »

## Décisions prises
- Next.js 16.4 (dernière stable via create-next-app) avec Turbopack et `@tailwindcss/turbopack` (configuration générée par défaut).
- Le PDF du CV n'était pas présent dans le dossier (fourni seulement dans la conversation) : pas de copie dans `public/cv/`, le bouton « Télécharger le CV » pointe vers `/cv` (flag `cvPdfUrl` dans `src/content/site.ts`).
- Photo : non extractible en fichier exploitable → design 100 % typographique (monogramme MF).
- Localisation publique : « Casablanca, Maroc ».
- Téléphone masqué (`showPhone: false`).
- Routes : groupe `(site)` (header, footer, smooth scroll, curseur) ; `/cv` hors du groupe pour une page CV sans animation ni navigation.
- Thème sombre par défaut (dark-first), bascule clair/sombre dans le header, mémorisée en localStorage.
- Le curseur personnalisé complète le curseur natif (qui reste visible) pour ne pas nuire à l'utilisabilité.

## À fournir par le client
- URL LinkedIn (`TODO_LINKEDIN_URL` dans `src/content/site.ts`).
- PDF du CV à déposer dans `public/cv/Marwa-Frej-CV.pdf` puis renseigner `cvPdfUrl`.

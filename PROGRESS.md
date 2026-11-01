# ✅ PROJET TERMINÉ

# PROGRESS — Portfolio Marwa Frej

**Prochaine action : aucune — projet terminé. Prochaines évolutions possibles : intégrer les éléments « À fournir » ci-dessous dès réception.**

## Checklist
- [x] Initialisation Next.js, réglages, CLAUDE.md, PROGRESS.md, git, dépendances, arborescence
- [x] Design system : tokens, polices, globals.css, composants ui/, monogramme, Header/Footer
- [x] Contenu typé dans src/content à partir du CV (réécrit et vérifié)
- [x] Toutes les sections en statique, responsive
- [x] Motion : SmoothScroll, IntroHook, Hero, Reveal, PaymentFlow, Cursor, Magnetic
- [x] Pages projets, page CV imprimable, SEO, accessibilité, performance
- [x] QA finale : lint/types/build, relecture orthographique, 5 largeurs, reduced-motion, README, liste « À fournir »

## Décisions prises
- Next.js 16.4 (dernière stable via create-next-app) avec Turbopack, `@tailwindcss/turbopack`, Cache Components et Partial Prefetching (configuration générée par défaut, conservée).
- Avec Cache Components, `dynamicParams` n'est pas disponible : les deux études de cas sont pré-rendues (SSG). Un slug inconnu passe par le rendu à la demande et renvoie la 404 via `notFound()`.
- Le PDF du CV n'était pas présent dans le dossier (fourni seulement dans la conversation) : rien n'est copié dans `public/cv/`. Le bouton « Télécharger le CV » pointe vers `/cv` (bascule automatique dès que `cvPdfUrl` est renseigné dans `src/content/site.ts`).
- Photo : impossible de l'extraire du CV en fichier exploitable, d'où un design 100 % typographique (monogramme MF dessiné en SVG : la jambe droite du M sert de fût au F, point « signal » grenat).
- Localisation publique : « Casablanca, Maroc ». Le quartier n'est pas affiché. Coordonnées géographiques de Casablanca dans le hero (simple détail éditorial).
- Téléphone masqué (`showPhone: false`). LinkedIn masqué tant que l'URL vaut `TODO_LINKEDIN_URL`.
- Routes : groupe `(site)` (header, footer, smooth scroll, curseur) ; `/cv` hors du groupe pour une page CV sans animation ni navigation.
- Thème sombre par défaut (dark-first), bascule clair/sombre dans le header, mémorisée en localStorage. Un script de démarrage évite tout flash.
- Le curseur personnalisé complète le curseur natif (qui reste visible) pour ne pas nuire à l'utilisabilité. Il est actif uniquement avec souris + mouvement autorisé.
- Intro : l'overlay est rendu côté serveur, mais le hero est peint dessous (LCP mesuré ≈ 0,3–0,5 s). Une sécurité CSS masque l'overlay après 6 s si le JavaScript échoue. `<noscript>` le masque aussi.
- PaymentFlow : schéma pédagogique (contenu général sur les paiements, pas de données de VPS). Desktop : section épinglée et scrubbée ; mobile : piste verticale. État final affiché sans JS ou en reduced-motion. Les textes gardent toujours leur contraste ; seuls les marqueurs s'allument.
- Projets : visuels « fenêtre de navigateur » générés en CSS/SVG en attendant de vraies captures.
- « Ce que j'en retiens » (études de cas) et la phrase de contexte : reformulations prudentes déduites du CV, à faire valider par Marwa.
- Repères « À propos » : « 2025 » (fin du diplôme 2023–2025), « 4 mois » (stage mai–août 2026), « 4 langues ». Ce sont des faits du CV, pas des compteurs.
- Typographie française : espaces insécables avant « : ? ; ! » et dans les guillemets, apostrophes typographiques.
- Polices : sous-ensemble `latin` uniquement (couvre français et turc) ; Geist Mono non préchargée. L'arabe utilise la police système.
- `scrollbar-gutter: stable` : verrouiller le scroll (intro, menu) ne décale plus la page.
- Mesures Lighthouse (serveur local, machine partagée donc scores variables) : accessibilité, bonnes pratiques et SEO à 100 partout. Performance : `/projets/*` et `/cv` 94–100 ; accueil ≈ 92–94 desktop et ≈ 75–79 mobile. Sur mobile, le coût vient de l'intro animée et de l'hydratation (TBT simulé), alors que le LCP réel est sous 0,5 s et le CLS < 0,06.

## À fournir par le client
- [ ] URL LinkedIn → `linkedin.href` dans `src/content/site.ts` (actuellement `TODO_LINKEDIN_URL`).
- [ ] PDF du CV → `public/cv/Marwa-Frej-CV.pdf`, puis `cvPdfUrl: "/cv/Marwa-Frej-CV.pdf"`.
- [ ] Domaine de production → variable `NEXT_PUBLIC_SITE_URL` (par défaut `https://marwa-frej.vercel.app`, à confirmer).
- [ ] Liens démo et code des deux projets → `links` dans `src/content/projects.ts` (`TODO_DEMO_URL`, `TODO_CODE_URL`).
- [ ] Captures d'écran des deux projets, pour remplacer les visuels « fenêtre de navigateur ».
- [ ] Détails des projets : cadre (projet de formation ?), date, durée, taille de l'équipe, fonctionnalités concrètes. Validation des textes « Ce que j'en retiens ».
- [ ] Nom complet / secteur de VPS si elle souhaite le préciser (le CV indique seulement « VPS »).
- [ ] Ville du Lycée Mohammed V (non précisée dans le CV).
- [ ] Contexte de l'attestation « programme Ambassadeurs » (organisme, année) si souhaité.
- [ ] Photo portrait HD (optionnelle) si elle souhaite un traitement éditorial avec photo.
- [ ] Accord pour afficher le téléphone (`showPhone`).

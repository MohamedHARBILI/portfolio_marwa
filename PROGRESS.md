# ✅ PROJET TERMINÉ

# PROGRESS — Portfolio Marwa Frej

**Prochaine action : aucune — refonte v2 terminée. Prochaines évolutions possibles : intégrer les éléments « À fournir » ci-dessous dès réception.**

## Checklist
- [x] Initialisation Next.js, réglages, CLAUDE.md, PROGRESS.md, git, dépendances, arborescence
- [x] Design system : tokens, polices, globals.css, composants ui/, monogramme, Header/Footer
- [x] Contenu typé dans src/content à partir du CV (réécrit et vérifié)
- [x] Toutes les sections en statique, responsive
- [x] Motion : SmoothScroll, IntroHook, Hero, Reveal, PaymentFlow, Cursor, Magnetic
- [x] Pages projets, page CV imprimable, SEO, accessibilité, performance
- [x] QA finale : lint/types/build, relecture orthographique, 5 largeurs, reduced-motion, README, liste « À fournir »

## Refonte v2 — « Bordeaux & Crème » (2026-11-01)
- [x] Photo de profil extraite du PDF du CV (`src/assets/marwa-frej.jpg`) ; URL LinkedIn lue dans le QR code du CV
- [x] Design system clair uniquement : crème, blanc, bordeaux accordé au blazer de la photo, rose poudré ; polices Bricolage Grotesque + Manrope
- [x] Hero refait : nom XXL, portrait en arche, puces flottantes, fiche, bandeau de technologies
- [x] Sections en cartes bento (À propos, Expérience, Compétences), projets en grands panneaux avec maquettes d’interface, Parcours + Langues réunis, Contact en panneau
- [x] Animations resserrées : entrée du hero en CSS, révélations GSAP plus douces, parallaxe des maquettes ; suppression de l’intro plein écran, du curseur personnalisé et du thème sombre
- [x] Pages projets, CV (photo, bordeaux), 404, image OG (avec photo) et icône refaites
- [x] QA : lint/types/build, 360 / 768 / 1440 px sans défilement horizontal, menu mobile (focus, Échap), schéma épinglé, Lighthouse

## Décisions prises
- Next.js 16.4 (dernière stable via create-next-app) avec Turbopack, `@tailwindcss/turbopack`, Cache Components et Partial Prefetching (configuration générée par défaut, conservée).
- Avec Cache Components, `dynamicParams` n'est pas disponible : les deux études de cas sont pré-rendues (SSG). Un slug inconnu passe par le rendu à la demande et renvoie la 404 via `notFound()`.
- Le PDF du CV n'était pas présent dans le dossier (fourni seulement dans la conversation) : rien n'est copié dans `public/cv/`. Le bouton « Télécharger le CV » pointe vers `/cv` (bascule automatique dès que `cvPdfUrl` est renseigné dans `src/content/site.ts`).
- Photo (v2) : le CV est une seule image pleine page ; la photo y a été recadrée (430 × 481 px), agrandie ×2 (Lanczos + netteté légère). Une version HD reste souhaitable.
- LinkedIn (v2) : l’URL provient du QR code imprimé sur le CV (`linkedin.com/in/marwa-frej-496074316`).
- v2 : thème clair uniquement (demande de la cliente : pas de couleurs sombres). Intro « Compile », curseur personnalisé et bascule de thème supprimés : remplacés par une entrée du hero en CSS, plus fiable et sans attente.
- v2 : visuels projets = maquettes d’interface stylisées (boutique / messagerie) en attendant de vraies captures ; aucune donnée ni texte inventé dedans.
- Localisation publique : « Casablanca, Maroc ». Le quartier n'est pas affiché. Coordonnées géographiques de Casablanca dans le hero (simple détail éditorial).
- Téléphone masqué (`showPhone: false`). LinkedIn masqué tant que l'URL vaut `TODO_LINKEDIN_URL`.
- Routes : groupe `(site)` (header, footer, smooth scroll, curseur) ; `/cv` hors du groupe pour une page CV sans animation ni navigation.
- PaymentFlow : schéma pédagogique (contenu général sur les paiements, pas de données de VPS). Desktop : section épinglée et scrubbée ; mobile : piste verticale. État final affiché sans JS ou en reduced-motion. Les textes gardent toujours leur contraste ; seuls les marqueurs s'allument.
- Projets : visuels « fenêtre de navigateur » générés en CSS/SVG en attendant de vraies captures.
- « Ce que j'en retiens » (études de cas) et la phrase de contexte : reformulations prudentes déduites du CV, à faire valider par Marwa.
- Repères « À propos » : « 2025 » (fin du diplôme 2023–2025), « 4 mois » (stage mai–août 2026), « 4 langues ». Ce sont des faits du CV, pas des compteurs.
- Typographie française : espaces insécables avant « : ? ; ! » et dans les guillemets, apostrophes typographiques.
- Polices : sous-ensemble `latin` uniquement (couvre français et turc). L'arabe utilise la police système.
- `scrollbar-gutter: stable` : verrouiller le scroll (menu) ne décale pas la page.
- Mesures Lighthouse v2 (serveur local, machine partagée donc scores variables) : accessibilité, bonnes pratiques et SEO à 100. Performance : accueil 98 desktop / 77 mobile, `/projets/*` 100 desktop / 94 mobile. CLS 0. Sur mobile simulé, le coût vient du JavaScript d’animation (GSAP, Lenis : TBT ≈ 360 ms) ; LCP observé ≈ 1,5 s.

## À fournir par le client
- [x] URL LinkedIn → lue dans le QR code du CV (à confirmer).
- [ ] PDF du CV → `public/cv/Marwa-Frej-CV.pdf`, puis `cvPdfUrl: "/cv/Marwa-Frej-CV.pdf"`.
- [ ] Domaine de production → variable `NEXT_PUBLIC_SITE_URL` (par défaut `https://marwa-frej.vercel.app`, à confirmer).
- [ ] Liens démo et code des deux projets → `links` dans `src/content/projects.ts` (`TODO_DEMO_URL`, `TODO_CODE_URL`).
- [ ] Captures d'écran des deux projets, pour remplacer les maquettes d’interface.
- [ ] Détails des projets : cadre (projet de formation ?), date, durée, taille de l'équipe, fonctionnalités concrètes. Validation des textes « Ce que j'en retiens ».
- [ ] Nom complet / secteur de VPS si elle souhaite le préciser (le CV indique seulement « VPS »).
- [ ] Ville du Lycée Mohammed V (non précisée dans le CV).
- [ ] Contexte de l'attestation « programme Ambassadeurs » (organisme, année) si souhaité.
- [ ] Photo portrait HD (la photo actuelle vient du CV, résolution limitée) → remplacer `src/assets/marwa-frej.jpg`.
- [ ] Accord pour afficher le téléphone (`showPhone`).

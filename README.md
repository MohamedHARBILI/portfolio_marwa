# Portfolio — Marwa Frej

Portfolio personnel de **Marwa Frej**, développeuse web full stack à Casablanca.
Site 100 % statique (Next.js App Router), direction artistique « Bordeaux & Crème » : thème clair, cartes bento, portrait en arche, bordeaux accordé à la photo.

## Lancer le projet

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
npm run dev        # http://localhost:3000
```

Autres commandes :

```bash
npm run build      # build de production (pages statiques)
npm run start      # sert le build de production
npm run lint       # ESLint
npx tsc --noEmit   # vérification des types
```

## Structure

```
src/
  app/
    layout.tsx                 polices (Bricolage Grotesque + Manrope), métadonnées
    (site)/layout.tsx          header flottant, footer, smooth scroll, skip-link
    (site)/page.tsx            page d'accueil (hero → à propos → expérience → projets → compétences → parcours → contact)
    (site)/projets/[slug]/     études de cas (generateStaticParams)
    cv/page.tsx                CV A4 imprimable (sans animation)
    not-found.tsx, sitemap.ts, robots.ts, opengraph-image.tsx, icon.tsx
  assets/      photo de profil (extraite du CV)
  components/
    layout/    Header, MobileMenu, Footer, PersonJsonLd
    sections/  Hero, TechMarquee, About, Experience, PaymentFlow, Projects, BrowserMock, Skills, Education (+ langues), Contact
    motion/    SmoothScroll, Reveal, SplitHeading, Parallax, Magnetic
    ui/        Button, Badge, Tag, Container, SectionTitle, CopyEmail, Monogram, SocialIcon…
  content/     TOUT le texte du site et du CV (typé dans types.ts)
  hooks/       useMediaQuery, usePrefersReducedMotion
  lib/         cn, gsap (plugins), motion (durées/eases), scroll (Lenis)
  styles/      globals.css (tokens @theme, entrée du hero, impression, reduced-motion)
```

## Modifier le contenu

Aucun texte n'est écrit en dur dans les composants : tout vit dans `src/content/`.
Le site **et** la page `/cv` lisent les mêmes fichiers.

| Fichier | Contenu |
|---|---|
| `site.ts` | email, liens (GitHub, LinkedIn), téléphone (`showPhone`), PDF du CV (`cvPdfUrl`), navigation, libellés d'interface, section contact |
| `profile.ts` | nom, rôle, localisation, disponibilité, texte alternatif de la photo, hero (puces, fiche), bio et repères « À propos » |
| `experience.ts` | stage, missions, schéma « Parcours d'un paiement » |
| `projects.ts` | projets et études de cas (liens démo/code) |
| `skills.ts` | groupes de compétences |
| `education.ts` | formation et attestation |
| `languages.ts` | langues |

Valeurs à compléter :

- **Photo** : remplacer `src/assets/marwa-frej.jpg` par une version HD (même nom) si disponible.
- **PDF du CV** : déposer le fichier dans `public/cv/Marwa-Frej-CV.pdf`, puis mettre `cvPdfUrl: "/cv/Marwa-Frej-CV.pdf"` dans `site.ts`. Sans PDF, « Télécharger le CV » ouvre la page `/cv` (bouton « Enregistrer en PDF »).
- **Liens des projets** : remplacer `TODO_DEMO_URL` / `TODO_CODE_URL` dans `projects.ts`.
- **Téléphone** : passer `showPhone` à `true` pour l'afficher.

## Déployer sur Vercel

1. Pousser le dépôt sur GitHub.
2. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt (framework détecté : Next.js, aucune configuration nécessaire).
3. Dans *Settings → Environment Variables*, définir `NEXT_PUBLIC_SITE_URL` avec le domaine final (ex. `https://marwafrej.com`) : il sert aux URL canoniques, au sitemap, à robots.txt et à l'image Open Graph.
4. Déployer. Chaque push sur la branche principale redéploie le site.

## Accessibilité et mouvement

- Un seul `h1` par page, skip-link, navigation clavier complète, focus visible, contrastes AA.
- `prefers-reduced-motion` : pas d'entrée animée, pas de smooth scroll, pas de parallaxe ni d'effets magnétiques, bandeau figé. Le schéma de paiement s'affiche directement dans son état final.
- L'entrée du hero est en CSS pur : elle démarre dès le premier affichage, sans attendre le JavaScript.

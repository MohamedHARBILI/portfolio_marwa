# CLAUDE.md — Portfolio Marwa Frej

> **Au début de chaque session ou après toute interruption : lis PROGRESS.md, lance `git log --oneline -15` et `git status`, puis reprends exactement à la "Prochaine action" et continue jusqu'à la fin du projet. Ne refais jamais une tâche cochée. Si le build est cassé, répare-le d'abord.**

## Mission
1. Portfolio personnel premium de **Marwa Frej**, Développeuse Web Full Stack (Casablanca).
2. Front-end uniquement, 100 % statique (SSG), aucun backend ni API route.
3. Le CV est la source de vérité : aucun fait, chiffre, lien ou résultat inventé.
4. Direction artistique « Bordeaux & Crème » (v2) : clair uniquement, premium, cartes bento, portrait en arche. Le bordeaux reprend le blazer de la photo.
5. Signature : entrée du hero en CSS (lignes masquées, portrait révélé, puces flottantes) + schéma animé « PaymentFlow » (stage Risques & Fraude).

## Stack
- Next.js 16 (App Router, Turbopack), TypeScript strict, Tailwind CSS v4 (tokens via `@theme` dans `src/styles/globals.css`)
- `clsx` + `tailwind-merge` (`src/lib/cn.ts`)
- GSAP + ScrollTrigger + SplitText via `@gsap/react` (`useGSAP`), Lenis (smooth scroll). Aucune autre lib d'animation.
- Polices `next/font/google` : Bricolage Grotesque (titres, `font-display`), Manrope (texte, `font-sans`).
- Photo : `src/assets/marwa-frej.jpg` (extraite du CV), toujours via `next/image` (import statique).

## Conventions
- Server Components par défaut ; `"use client"` uniquement pour l'interactif.
- Aucun texte en dur dans les composants : tout le contenu est dans `src/content/*.ts` (typé dans `types.ts`), source unique pour le site et `/cv`.
- Code en anglais, contenu en français. Aucun `any`.
- Animations : uniquement transform/opacity, eases/durées depuis `src/lib/motion.ts`, plugins enregistrés dans `src/lib/gsap.ts`, `prefers-reduced-motion` respecté partout, nettoyage au démontage (useGSAP).
- Commits : Conventional Commits en anglais, PROGRESS.md mis à jour dans le même commit. Jamais de mention de Claude/Anthropic.
- Vérifs : `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Tokens de design (thème clair uniquement)
| Token | Valeur | Usage |
|---|---|---|
| `--bg` | #F7F3EE | fond crème |
| `--surface` / `--surface-2` | #FFFFFF / #F1EBE3 | cartes / puces |
| `--fg` / `--muted` | #211A1D / #675D62 | texte / texte secondaire |
| `--line` / `--line-strong` | rgba(33,26,29,.09) / .18 | filets |
| `--accent` / `--accent-strong` | #8C1D40 / #6F1431 | bordeaux (boutons, mots-clés) |
| `--accent-soft` / `--accent-tint` | #F6E2E7 / #FBF1F3 | rose poudré (panneaux) |
| `--mist` / `--sand` | #E7EDF4 / #EFE5D8 | panneaux secondaires |
| `--success` | #1F8A5B | pastille « disponible » |

- Typo : titres Bricolage Grotesque semi-gras, interlettrage serré ; segments `{ em }` en bordeaux (pas d'italique). Échelle fluide `clamp()` (`text-hero`, `text-display`, `text-h2`, `text-h3`, `text-lead`).
- Cartes `card` (blanc, filet, ombre douce, rayon 28px), panneaux rayon 36px, boutons en pilule.
- Mouvement : entrée du hero en CSS (`data-enter`), révélations GSAP (opacity + y 36px, `expo.out`), titres SplitText, parallaxe légère des maquettes, bandeau de technologies en CSS. Pas d'intro plein écran ni de curseur personnalisé.

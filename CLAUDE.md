# CLAUDE.md — Portfolio Marwa Frej

> **Au début de chaque session ou après toute interruption : lis PROGRESS.md, lance `git log --oneline -15` et `git status`, puis reprends exactement à la "Prochaine action" et continue jusqu'à la fin du projet. Ne refais jamais une tâche cochée. Si le build est cassé, répare-le d'abord.**

## Mission
1. Portfolio personnel premium de **Marwa Frej**, Développeuse Web Full Stack (Casablanca).
2. Front-end uniquement, 100 % statique (SSG), aucun backend ni API route.
3. Le CV est la source de vérité : aucun fait, chiffre, lien ou résultat inventé.
4. Direction artistique « Ink & Signal » : éditorial, sombre, précis, chaleureux.
5. Signature : intro « Compile » + schéma animé « PaymentFlow » (stage Risques & Fraude).

## Stack
- Next.js 16 (App Router, Turbopack), TypeScript strict, Tailwind CSS v4 (tokens via `@theme` dans `src/styles/globals.css`)
- `clsx` + `tailwind-merge` (`src/lib/cn.ts`)
- GSAP + ScrollTrigger + SplitText via `@gsap/react` (`useGSAP`), Lenis (smooth scroll). Aucune autre lib d'animation.
- Polices `next/font/google` : Instrument Serif (titres), Geist (texte), Geist Mono (labels).

## Conventions
- Server Components par défaut ; `"use client"` uniquement pour l'interactif.
- Aucun texte en dur dans les composants : tout le contenu est dans `src/content/*.ts` (typé dans `types.ts`), source unique pour le site et `/cv`.
- Code en anglais, contenu en français. Aucun `any`.
- Animations : uniquement transform/opacity, eases/durées depuis `src/lib/motion.ts`, plugins enregistrés dans `src/lib/gsap.ts`, `prefers-reduced-motion` respecté partout, nettoyage au démontage (useGSAP).
- Commits : Conventional Commits en anglais, PROGRESS.md mis à jour dans le même commit. Jamais de mention de Claude/Anthropic.
- Vérifs : `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Tokens de design
| Token | Sombre | Clair |
|---|---|---|
| `--ink` (fond) | #0B0B12 | #F6F3EC |
| `--surface` | #13131D | #EDE8DD |
| `--fg` (ivoire) | #F3EFE6 | #14141C |
| `--muted` | #9C98A6 | #56525E |
| `--line` | rgba(243,239,230,.12) | rgba(20,20,28,.14) |
| `--indigo` / `--indigo-ink` (texte) | #2B2BD9 / #9494FF | #2B2BD9 / #2B2BD9 |
| `--garnet` / `--garnet-ink` (texte) | #9E1F45 / #EF7397 | #9E1F45 / #9E1F45 |

- Typo : titres Instrument Serif (mots-clés en italique), corps Geist, étiquettes Geist Mono majuscules espacées (« 01 — EXPÉRIENCE »). Échelle fluide `clamp()`.
- Coins peu arrondis (2–4px), filets 1px, grille 12 colonnes, grain SVG léger.
- Easing : `power3.out` ; révélations opacity + y 24px.

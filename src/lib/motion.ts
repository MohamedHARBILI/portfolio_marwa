// Shared motion vocabulary: every animation pulls its timing from here.
export const ease = {
  out: "power3.out",
  inOut: "power3.inOut",
  expo: "expo.out",
  expoInOut: "expo.inOut",
  none: "none",
} as const;

export const duration = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
} as const;

export const reveal = {
  y: 24,
  duration: 0.9,
  ease: ease.out,
  stagger: 0.08,
  start: "top 86%",
} as const;

export const media = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine)",
  desktop: "(min-width: 1024px)",
} as const;

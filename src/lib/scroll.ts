import type Lenis from "lenis";

// Single Lenis instance, owned by <SmoothScroll />. Null when reduced motion is on.
let instance: Lenis | null = null;
let locks = 0;

export function setLenis(lenis: Lenis | null): void {
  instance = lenis;
  if (lenis && locks > 0) lenis.stop();
}

export function getLenis(): Lenis | null {
  return instance;
}

export function lockScroll(): void {
  locks += 1;
  instance?.stop();
  document.documentElement.classList.add("scroll-locked");
}

export function unlockScroll(): void {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  instance?.start();
  document.documentElement.classList.remove("scroll-locked");
}

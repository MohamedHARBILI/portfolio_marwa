"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/motion";

/** Soft radial glow that drifts toward the pointer inside its parent (CSS gradient, transform only). */
export function Halo() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const halo = ref.current;
    const area = halo?.parentElement;
    if (!halo || !area) return;

    const mm = gsap.matchMedia();
    mm.add(`${media.motionOk} and ${media.finePointer}`, () => {
      const xTo = gsap.quickTo(halo, "x", { duration: 1.6, ease: "power3.out" });
      const yTo = gsap.quickTo(halo, "y", { duration: 1.6, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = area.getBoundingClientRect();
        xTo(event.clientX - rect.left - rect.width * 0.62);
        yTo(event.clientY - rect.top - rect.height * 0.42);
      };
      area.addEventListener("pointermove", onMove);
      return () => area.removeEventListener("pointermove", onMove);
    });
    return () => mm.revert();
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute top-[42%] left-[62%] -z-10 size-[min(90vw,70rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--halo),transparent)] will-change-transform"
    />
  );
}

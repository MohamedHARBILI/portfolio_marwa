"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/motion";
import { cn } from "@/lib/cn";

type ParallaxProps = {
  children: ReactNode;
  /** Travel in percent of the element height, from +amount to -amount. */
  amount?: number;
  className?: string;
};

/** Drifts its child slightly against the scroll, scrubbed (transform only). */
export function Parallax({ children, amount = 8, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${media.motionOk} and (min-width: 768px)`, () => {
        gsap.fromTo(
          el,
          { yPercent: amount },
          {
            yPercent: -amount,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { isIntroPending, onIntroDone } from "@/lib/intro";
import { ease, media, reveal } from "@/lib/motion";

type HeroRevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Reveals the hero once the intro curtain opens. The hero is server-rendered
 * and visible under the overlay; it is only hidden here while the intro plays.
 */
export function HeroReveal({ children, className }: HeroRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !isIntroPending()) return;
      const title = el.querySelector<HTMLElement>("[data-hero-title]");
      const fades = el.querySelectorAll<HTMLElement>("[data-hero-fade]");
      if (!title) return;

      const mm = gsap.matchMedia();
      mm.add(media.motionOk, () => {
        const split = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "split-line" });
        gsap.set(split.lines, { yPercent: 115 });
        gsap.set(fades, { opacity: 0, y: reveal.y });

        const tl = gsap
          .timeline({ paused: true })
          .to(split.lines, { yPercent: 0, duration: 1.3, ease: ease.expo, stagger: 0.12 })
          .to(fades, { opacity: 1, y: 0, duration: 0.9, ease: reveal.ease, stagger: 0.07 }, 0.35);

        const stop = onIntroDone(() => tl.play());
        return () => {
          stop();
          split.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

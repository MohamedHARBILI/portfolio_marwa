"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { ease, media, reveal } from "@/lib/motion";

type SplitHeadingProps = {
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Heading whose lines rise from SplitText masks when scrolled into view.
 * Splitting waits until the heading approaches the viewport, so the page
 * does not pay for every line measurement at load.
 */
export function SplitHeading({ as = "h2", id, className, children }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag: ElementType = as;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motionOk, (_context, contextSafe) => {
        const split = () => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 115,
                duration: 1.15,
                ease: ease.expo,
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: reveal.start, once: true },
              }),
          });
        };
        // Created later, but still recorded by this context so mm.revert() cleans it up.
        const safeSplit = contextSafe ? contextSafe(split) : split;
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom+=25%",
          once: true,
          onEnter: () => safeSplit(),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}

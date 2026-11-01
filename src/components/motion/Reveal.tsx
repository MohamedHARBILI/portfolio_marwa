"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media, reveal } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: boolean;
  delay?: number;
};

/** Sober scroll reveal: opacity + 24px rise, power3.out, once. */
export function Reveal({ children, as = "div", className, stagger = false, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag: ElementType = as;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motionOk, () => {
        gsap.from(stagger ? Array.from(el.children) : el, {
          opacity: 0,
          y: reveal.y,
          duration: reveal.duration,
          ease: reveal.ease,
          delay,
          stagger: stagger ? reveal.stagger : 0,
          scrollTrigger: { trigger: el, start: reveal.start, once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

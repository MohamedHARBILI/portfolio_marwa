"use client";

import { useRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media, reveal } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: boolean;
  delay?: number;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

/** Scroll reveal: opacity + rise on an expo ease, once. */
export function Reveal({ children, as = "div", className, stagger = false, delay = 0, ...rest }: RevealProps) {
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
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: reveal.start, once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

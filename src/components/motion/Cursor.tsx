"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/motion";

const INTERACTIVE = "a[href], button, [data-cursor], input, textarea, select, summary";

/** Discreet follower ring, desktop only. The native cursor stays visible. */
export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const circle = circleRef.current;
    const label = labelRef.current;
    if (!root || !dot || !ring || !circle || !label) return;

    const mm = gsap.matchMedia();
    mm.add(`${media.motionOk} and ${media.finePointer}`, () => {
      const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });
      let visible = false;
      let active: Element | null = null;

      const show = (on: boolean) => {
        if (visible === on) return;
        visible = on;
        gsap.to(root, { opacity: on ? 1 : 0, duration: 0.3, ease: "power2.out" });
      };

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
        show(true);
      };

      const onOver = (event: PointerEvent) => {
        const target = (event.target as Element | null)?.closest?.(INTERACTIVE) ?? null;
        if (target === active) return;
        active = target;
        const text = target?.getAttribute("data-cursor") ?? "";
        label.textContent = text;
        gsap.to(circle, {
          scale: target ? (text ? 2.4 : 1.6) : 1,
          opacity: target ? 0.9 : 0.5,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: text ? 1 : 0, duration: 0.3 });
        gsap.to(dot, { scale: target ? 0 : 1, duration: 0.3 });
      };

      const onLeave = () => show(false);

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    });
    return () => mm.revert();
  });

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-print-hidden
      className="pointer-events-none fixed inset-0 z-[95] opacity-0"
    >
      <div ref={ringRef} className="absolute top-0 left-0">
        <div
          ref={circleRef}
          className="absolute -top-[18px] -left-[18px] size-9 rounded-full border border-fg opacity-50"
        />
        <span
          ref={labelRef}
          className="eyebrow absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-[0.625rem] text-fg opacity-0"
        />
      </div>
      <div ref={dotRef} className="absolute -top-[3px] -left-[3px] size-1.5 rounded-full bg-indigo-ink" />
    </div>
  );
}

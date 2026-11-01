"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { BrowserMock } from "./BrowserMock";

/** Numbered editorial list; on desktop a preview window follows the cursor. */
export function ProjectsList() {
  const listRef = useRef<HTMLOListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;

    const mm = gsap.matchMedia();
    mm.add(`${media.motionOk} and ${media.finePointer} and ${media.desktop}`, () => {
      gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.85, opacity: 0 });
      const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3.out" });
      let first = true;

      const onMove = (event: PointerEvent) => {
        if (first) {
          gsap.set(preview, { x: event.clientX, y: event.clientY });
          first = false;
        }
        xTo(event.clientX);
        yTo(event.clientY);
      };
      const onEnter = () => gsap.to(preview, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
      const onLeave = () => {
        first = true;
        gsap.to(preview, { opacity: 0, scale: 0.85, duration: 0.4, ease: "power3.out" });
      };

      list.addEventListener("pointermove", onMove);
      list.addEventListener("pointerenter", onEnter);
      list.addEventListener("pointerleave", onLeave);
      return () => {
        list.removeEventListener("pointermove", onMove);
        list.removeEventListener("pointerenter", onEnter);
        list.removeEventListener("pointerleave", onLeave);
      };
    });
    return () => mm.revert();
  });

  return (
    <>
      <ol ref={listRef} className="mt-14 border-b border-line lg:mt-20">
        {projects.map((project, i) => (
          <li key={project.slug} className="border-t border-line">
            <Link
              href={`/projets/${project.slug}`}
              data-cursor={site.ui.cursorView}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group/project grid-editorial items-center gap-y-5 py-8 lg:py-12"
            >
              <span className="col-span-12 mb-2 block desktop-hover:hidden">
                <BrowserMock project={project} className="w-full md:w-2/3 lg:w-1/2" />
              </span>

              <span className="eyebrow col-span-2 self-start pt-2 text-muted lg:col-span-1 lg:pt-4">
                {project.index}
              </span>
              <span className="col-span-10 lg:col-span-6">
                <span className="block font-serif text-h2 text-fg transition-transform duration-700 ease-out-expo group-hover/project:translate-x-3 lg:text-[clamp(2.5rem,1rem+3.2vw,4.75rem)]">
                  {project.title}
                </span>
                <span className="mt-3 block max-w-xl text-muted">{project.summary}</span>
              </span>
              <span className="col-span-10 col-start-3 flex flex-col gap-2 lg:col-span-4 lg:col-start-8">
                <span className="eyebrow text-fg">{project.kind}</span>
                <span className="eyebrow text-muted">{project.stack.join(" · ")}</span>
              </span>
              <span className="col-span-12 flex items-center justify-between lg:col-span-1 lg:justify-end">
                <span className="eyebrow text-muted lg:sr-only">{site.ui.viewCaseStudy}</span>
                <span className="grid size-12 place-items-center rounded-full border border-line-strong text-fg transition-colors duration-500 group-hover/project:border-indigo group-hover/project:bg-indigo group-hover/project:text-on-accent">
                  <Arrow className="transition-transform duration-500 ease-out-expo group-hover/project:-rotate-45" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-30 hidden w-[min(30rem,32vw)] opacity-0 desktop-hover:block"
      >
        {projects.map((project, i) => (
          <BrowserMock
            key={project.slug}
            project={project}
            className={cn(
              "shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)] transition-opacity duration-500",
              i === 0 ? "relative" : "absolute inset-0",
              i === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
    </>
  );
}

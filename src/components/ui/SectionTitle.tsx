import type { ReactNode } from "react";
import type { SectionMeta } from "@/content/types";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Rich } from "./Rich";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  section: SectionMeta;
  className?: string;
  /** Rendered on the right of the heading on large screens. */
  aside?: ReactNode;
  align?: "left" | "center";
};

export function headingId(section: SectionMeta): string {
  return `${section.id}-title`;
}

/** « 01 · À propos » label pill, then a large display heading. */
export function SectionLabel({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <p
      className={cn(
        "eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-muted shadow-soft",
        className,
      )}
    >
      <span className="text-accent">{index}</span>
      <span aria-hidden className="size-1 rounded-full bg-line-strong" />
      {label}
    </p>
  );
}

export function SectionTitle({ section, className, aside, align = "left" }: SectionTitleProps) {
  const centered = align === "center";
  return (
    <header
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
        centered && "items-center text-center lg:flex-col lg:items-center",
        className,
      )}
    >
      <div className={cn("max-w-4xl", centered && "flex flex-col items-center")}>
        <SectionLabel index={section.index} label={section.label} />
        <SplitHeading as="h2" id={headingId(section)} className="mt-6 text-h2 font-semibold text-fg">
          <Rich text={section.title} />
        </SplitHeading>
        {section.intro ? (
          <Reveal>
            <p className={cn("mt-5 max-w-2xl text-lead text-muted", centered && "mx-auto")}>{section.intro}</p>
          </Reveal>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </header>
  );
}

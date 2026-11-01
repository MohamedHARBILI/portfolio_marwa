import type { SectionMeta } from "@/content/types";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Rich } from "./Rich";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  section: SectionMeta;
  className?: string;
};

export function headingId(section: SectionMeta): string {
  return `${section.id}-title`;
}

/** « 01 — LABEL » rail on the left, serif heading on the right. */
export function SectionTitle({ section, className }: SectionTitleProps) {
  return (
    <header className={cn("grid-editorial gap-y-6 border-t border-line pt-5", className)}>
      <p className="eyebrow col-span-12 text-muted lg:col-span-3">
        <span className="text-fg">{section.index}</span> — {section.label}
      </p>
      <div className="col-span-12 lg:col-span-9">
        <SplitHeading as="h2" id={headingId(section)} className="font-serif text-h2 text-fg">
          <Rich text={section.title} />
        </SplitHeading>
        {section.intro ? (
          <Reveal>
            <p className="mt-6 max-w-2xl text-lead text-muted">{section.intro}</p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}

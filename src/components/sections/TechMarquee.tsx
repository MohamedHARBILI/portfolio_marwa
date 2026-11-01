import { skillGroups, technicalSkillIds } from "@/content/skills";
import { cn } from "@/lib/cn";

const items = skillGroups
  .filter((group) => (technicalSkillIds as readonly string[]).includes(group.id) && group.id !== "office")
  .flatMap((group) => group.items);

/** Decorative, endless band of technologies (the real list lives in « Compétences »). */
export function TechMarquee({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      data-marquee-wrap
      className={cn(
        "overflow-hidden border-y border-line bg-surface/60 py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      <div data-marquee className="flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li key={item} className="flex items-center">
                <span className="px-6 font-display text-[clamp(1.25rem,1rem+1vw,1.875rem)] font-medium tracking-[-0.02em] whitespace-nowrap text-fg/80">
                  {item}
                </span>
                <Spark />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function Spark() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-accent">
      <path d="M8 0c.6 4.2 3.8 7.4 8 8-4.2.6-7.4 3.8-8 8-.6-4.2-3.8-7.4-8-8 4.2-.6 7.4-3.8 8-8Z" fill="currentColor" />
    </svg>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  pulse?: boolean;
  className?: string;
};

export function Badge({ children, pulse = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-3 rounded-full border border-line-strong px-4 py-2 text-fg",
        className,
      )}
    >
      <span className="relative flex size-2" aria-hidden>
        {pulse ? (
          <span className="absolute inset-0 rounded-full bg-indigo-ink motion-safe:animate-[pulse-ring_2.4s_var(--ease-out-quart)_infinite]" />
        ) : null}
        <span className="relative size-2 rounded-full bg-indigo-ink" />
      </span>
      {children}
    </span>
  );
}

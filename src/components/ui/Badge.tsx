import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  pulse?: boolean;
  className?: string;
};

/** White pill with a green « available » dot. */
export function Badge({ children, pulse = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-4 pl-3 text-sm font-semibold text-fg shadow-soft",
        className,
      )}
    >
      <span className="relative flex size-2" aria-hidden>
        {pulse ? (
          <span className="absolute inset-0 rounded-full bg-success motion-safe:animate-[pulse-ring_2.4s_var(--ease-out-quart)_infinite]" />
        ) : null}
        <span className="relative size-2 rounded-full bg-success" />
      </span>
      {children}
    </span>
  );
}

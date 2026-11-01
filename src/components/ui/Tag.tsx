import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  tone?: "default" | "accent" | "soft";
  className?: string;
};

const tones = {
  default: "border-line-strong text-fg",
  accent: "border-garnet-ink/50 text-fg",
  soft: "border-transparent bg-surface-2 text-fg",
} as const;

export function Tag({ children, tone = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] border px-3 py-1.5 text-sm leading-none whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

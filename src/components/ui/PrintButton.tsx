"use client";

import { cn } from "@/lib/cn";

type PrintButtonProps = {
  label: string;
  className?: string;
};

export function PrintButton({ label, className }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        "inline-flex h-11 items-center gap-3 rounded-full bg-accent px-5 text-sm font-semibold text-on-accent shadow-soft transition-colors hover:bg-accent-strong",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
        <path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M2.5 13.5h11" stroke="currentColor" strokeWidth={1.4} />
      </svg>
      {label}
    </button>
  );
}

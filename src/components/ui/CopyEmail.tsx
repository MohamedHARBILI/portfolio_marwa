"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type Status = "idle" | "copied" | "failed";

type CopyEmailProps = {
  email: string;
  className?: string;
};

export function CopyEmail({ email, className }: CopyEmailProps) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2400);
  }

  const feedback =
    status === "copied" ? site.ui.copied : status === "failed" ? site.ui.copyFailed : "";

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <button
        type="button"
        onClick={copy}
        className="group/copy flex max-w-full items-center gap-4 rounded-full border border-line bg-surface py-2.5 pr-2.5 pl-6 text-left shadow-soft transition-[box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-lift sm:gap-6 sm:pl-8"
      >
        <span className="min-w-0 font-display text-[clamp(1.0625rem,0.55rem+2.4vw,2.125rem)] font-medium tracking-[-0.02em] break-all text-fg select-all sm:break-normal">
          {email}
        </span>
        <span
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-full px-3 py-3 text-sm font-semibold transition-colors duration-300 sm:px-5",
            status === "copied" ? "bg-success text-white" : "bg-accent-soft text-accent group-hover/copy:bg-accent group-hover/copy:text-on-accent",
          )}
        >
          <CopyIcon done={status === "copied"} />
          <span className="hidden sm:inline">
            {status === "copied" ? site.ui.copied : site.ui.copyEmail}
          </span>
          <span className="sr-only sm:hidden">{site.ui.copyEmail}</span>
        </span>
      </button>
      <p role="status" aria-live="polite" className="min-h-[1.5em] text-sm font-semibold text-accent">
        {feedback}
      </p>
    </div>
  );
}

function CopyIcon({ done }: { done: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
      {done ? (
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <>
          <rect x="5.5" y="5.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth={1.4} />
          <path d="M10.5 3.5V3a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" stroke="currentColor" strokeWidth={1.4} />
        </>
      )}
    </svg>
  );
}

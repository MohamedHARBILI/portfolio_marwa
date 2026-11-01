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
    <div className={cn("flex flex-col gap-3", className)}>
      <button
        type="button"
        onClick={copy}
        data-cursor={site.ui.copyEmail}
        className="group/copy flex w-full items-center justify-between gap-6 border-y border-line-strong py-6 text-left transition-colors duration-300 hover:border-fg sm:py-8"
      >
        <span className="min-w-0 font-serif text-[clamp(1.5rem,0.6rem+4.4vw,4.5rem)] leading-none break-all text-fg select-all sm:break-normal">
          {email}
        </span>
        <span className="eyebrow flex shrink-0 items-center gap-2 text-muted transition-colors group-hover/copy:text-fg">
          <CopyIcon done={status === "copied"} />
          <span className="hidden sm:inline">
            {status === "copied" ? site.ui.copied : site.ui.copyEmail}
          </span>
          <span className="sr-only sm:hidden">{site.ui.copyEmail}</span>
        </span>
      </button>
      <p role="status" aria-live="polite" className="eyebrow min-h-[1.4em] text-indigo-ink">
        {feedback}
      </p>
    </div>
  );
}

function CopyIcon({ done }: { done: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
      {done ? (
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth={1.4} />
      ) : (
        <>
          <rect x="5.5" y="5.5" width="8" height="8" stroke="currentColor" strokeWidth={1.2} />
          <path d="M10.5 3.5v-1h-8v8h1" stroke="currentColor" strokeWidth={1.2} />
        </>
      )}
    </svg>
  );
}

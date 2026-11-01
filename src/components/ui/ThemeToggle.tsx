"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { THEME_STORAGE_KEY } from "@/lib/storage";

type Theme = "dark" | "light";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "dark");
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode): the choice lasts for this page only.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "light" ? site.ui.themeToLight : site.ui.themeToDark}
      className={cn(
        "grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-surface-2",
        className,
      )}
    >
      <svg viewBox="0 0 20 20" className="size-[18px]" aria-hidden>
        <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" strokeWidth={1.3} />
        <path
          d="M10 2.75a7.25 7.25 0 0 1 0 14.5z"
          fill="currentColor"
          className="origin-center transition-transform duration-700 ease-out-expo"
          style={{ transform: theme === "light" ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </svg>
    </button>
  );
}

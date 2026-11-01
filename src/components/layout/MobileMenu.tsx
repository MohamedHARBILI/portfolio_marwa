"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cvHref, isTodo, site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { media } from "@/lib/motion";
import { cn } from "@/lib/cn";

type MobileMenuProps = {
  open: boolean;
  onClose: (restoreFocus?: boolean) => void;
};

/** Card that drops under the header on small screens. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      // Keep focus inside the menu (the header toggle stays reachable before it).
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const last = focusables[focusables.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        document.querySelector<HTMLElement>("[aria-controls='mobile-menu']")?.focus();
      }
    };
    const desktop = window.matchMedia(media.desktop);
    const onDesktop = () => desktop.matches && onClose(false);

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
      unlockScroll();
    };
  }, [open, onClose]);

  const socials = [site.github, site.linkedin].filter((link) => !isTodo(link.href));

  return (
    <>
      <div
        aria-hidden
        data-print-hidden
        onClick={() => onClose(false)}
        className={cn(
          "fixed inset-0 z-40 bg-fg/15 backdrop-blur-[2px] transition-opacity duration-500 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!open}
        data-print-hidden
        className={cn(
          "fixed inset-x-3 top-[4.75rem] z-50 origin-top rounded-[1.75rem] border border-line bg-surface p-3 shadow-lift transition-[opacity,transform] duration-500 ease-out-expo sm:inset-x-8 lg:hidden",
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-3 scale-[0.97] opacity-0",
        )}
      >
        <nav aria-label={site.ui.menu}>
          <ol>
            {site.nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => onClose(false)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3.5 transition-[background-color,opacity,transform] duration-500 ease-out-expo hover:bg-surface-2",
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
                >
                  <span className="font-display text-[1.75rem] leading-none font-semibold tracking-[-0.03em] text-fg">
                    {item.label}
                  </span>
                  <span className="text-xs font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-2 flex flex-col gap-3 rounded-[1.25rem] bg-accent-tint p-4">
          <a href={`mailto:${site.email}`} className="text-[0.9375rem] font-semibold break-all text-accent">
            {site.email}
          </a>
          <div className="flex flex-wrap gap-2">
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-2 text-sm font-semibold text-fg"
              >
                {link.label}
                <Arrow direction="up-right" className="size-3" />
                <span className="sr-only"> {site.ui.opensInNewTab}</span>
              </a>
            ))}
            <Link
              href={cvHref}
              onClick={() => onClose(false)}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-2 text-sm font-semibold text-fg"
            >
              {site.ui.downloadCv}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

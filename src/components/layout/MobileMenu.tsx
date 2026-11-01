"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { profile } from "@/content/profile";
import { cvHref, isTodo, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { media } from "@/lib/motion";
import { cn } from "@/lib/cn";

type MobileMenuProps = {
  open: boolean;
  onClose: (restoreFocus?: boolean) => void;
};

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
    <div
      id="mobile-menu"
      ref={panelRef}
      inert={!open}
      data-print-hidden
      className={cn(
        "fixed inset-0 z-40 bg-ink transition-opacity duration-500 ease-out-expo lg:hidden",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <Container className="flex h-full flex-col justify-between pt-24 pb-8">
        <nav aria-label={site.ui.menu}>
          <ol className="border-t border-line">
            {site.nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => onClose(false)}
                  className={cn(
                    "flex items-baseline gap-5 py-4 transition-transform duration-700 ease-out-expo",
                    open ? "translate-y-0" : "translate-y-full",
                  )}
                  style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                >
                  <span className="eyebrow w-6 text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-[clamp(2.25rem,9vw,3.5rem)] leading-none text-fg">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div
          className={cn(
            "flex flex-col gap-4 transition-opacity duration-700",
            open ? "opacity-100 delay-300" : "opacity-0",
          )}
        >
          <a href={`mailto:${site.email}`} className="text-lg break-all text-fg underline-offset-4 hover:underline">
            {site.email}
          </a>
          <div className="eyebrow flex flex-wrap gap-x-6 gap-y-2 text-muted">
            {socials.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                {link.label}
                <span className="sr-only"> {site.ui.opensInNewTab}</span>
              </a>
            ))}
            <Link href={cvHref} onClick={() => onClose(false)} className="hover:text-fg">
              {site.ui.downloadCv}
            </Link>
            <span>{profile.location.display}</span>
          </div>
        </div>
      </Container>
    </div>
  );
}

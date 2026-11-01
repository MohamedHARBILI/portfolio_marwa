"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Monogram } from "@/components/ui/Monogram";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

/** Hides while scrolling down, comes back as soon as the visitor scrolls up. */
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 140);
        lastY = y;
      }
      setScrolled(y > 12);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  return (
    <>
      <header
        data-print-hidden
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-out-expo",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 border-b border-line bg-ink/85 backdrop-blur-md transition-opacity duration-500",
            scrolled && !menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <Container className="relative flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link
            href="/"
            className="group/logo flex items-center gap-3 text-fg"
            aria-label={`${profile.fullName} — ${site.ui.home}`}
          >
            <Monogram className="size-9 transition-transform duration-700 ease-out-expo group-hover/logo:-rotate-6" />
            <span className="eyebrow hidden text-fg sm:inline">{profile.fullName}</span>
          </Link>

          <nav aria-label={site.ui.primaryNav} className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="eyebrow relative py-2 text-muted transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-fg after:transition-transform after:duration-500 after:ease-out-expo hover:text-fg hover:after:origin-left hover:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button href="/#contact" size="sm" className="hidden lg:inline-flex">
              {site.ui.contactMe}
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="relative grid size-10 place-items-center lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? site.ui.menuClose : site.ui.menuOpen}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-px bg-fg transition-transform duration-500 ease-out-expo",
                    menuOpen && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px bg-fg transition-transform duration-500 ease-out-expo",
                    menuOpen && "-translate-y-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}

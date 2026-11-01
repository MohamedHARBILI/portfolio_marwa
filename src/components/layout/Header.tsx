"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Monogram } from "@/components/ui/Monogram";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

const sectionIds = site.nav.map((item) => item.href.split("#")[1]).filter(Boolean);

/** Floating pill bar: hides while scrolling down, highlights the section in view. */
export function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 160);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  const current = pathname === "/" ? active : null;

  return (
    <>
      <header
        data-print-hidden
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-3 transition-transform duration-700 ease-out-expo lg:pt-4",
          hidden && !menuOpen && "-translate-y-[130%]",
        )}
      >
        <Container>
          <div className="flex h-14 items-center justify-between gap-4 rounded-full border border-line bg-surface/80 py-2 pr-2 pl-2 shadow-soft backdrop-blur-xl backdrop-saturate-150 lg:h-16 lg:pl-2.5">
            <Link
              href="/"
              className="group/logo flex items-center gap-3 rounded-full pr-3 text-fg"
              aria-label={`${profile.fullName} — ${site.ui.home}`}
            >
              <span className="grid size-10 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-700 ease-out-expo group-hover/logo:-rotate-12 lg:size-11">
                <Monogram className="size-6" plain />
              </span>
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="text-[0.9375rem] font-bold tracking-[-0.01em]">{profile.fullName}</span>
                <span className="text-xs font-medium text-muted">{profile.role}</span>
              </span>
            </Link>

            <nav aria-label={site.ui.primaryNav} className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {site.nav.map((item) => {
                  const isActive = current !== null && item.href.endsWith(`#${current}`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "block rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                          isActive ? "bg-accent-tint text-accent" : "text-muted hover:bg-surface-2 hover:text-fg",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                href="/#contact"
                size="sm"
                className="hidden lg:inline-flex"
                icon={<Arrow direction="up-right" className="size-3.5" />}
              >
                {site.ui.contactMe}
              </Button>
              <button
                ref={toggleRef}
                type="button"
                className="relative grid size-10 place-items-center rounded-full bg-surface-2 text-fg transition-colors hover:bg-accent-soft lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="sr-only">{menuOpen ? site.ui.menuClose : site.ui.menuOpen}</span>
                <span aria-hidden className="relative block h-2.5 w-4">
                  <span
                    className={cn(
                      "absolute inset-x-0 top-0 h-[1.5px] rounded-full bg-current transition-transform duration-500 ease-out-expo",
                      menuOpen && "translate-y-[4.25px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-[1.5px] rounded-full bg-current transition-transform duration-500 ease-out-expo",
                      menuOpen && "-translate-y-[4.25px] -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}

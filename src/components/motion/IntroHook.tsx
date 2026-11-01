"use client";

import { useRef, useState } from "react";
import { profile } from "@/content/profile";
import type { CodeTokenKind } from "@/content/types";
import { site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { INTRO_STORAGE_KEY, isIntroPending, markIntroDone } from "@/lib/intro";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { cn } from "@/lib/cn";

const tokenColors: Record<CodeTokenKind, string> = {
  keyword: "text-indigo-ink",
  name: "text-fg",
  type: "text-fg italic",
  prop: "text-muted",
  string: "text-garnet-ink",
  punct: "text-muted",
};

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const SKIP_KEYS = new Set([" ", "Escape", "Enter", "ArrowDown", "PageDown", "End", "Tab"]);

/**
 * « Compile » intro (≤ 2.8 s): a line of code types itself, scrambles into the
 * name, a progress line fills, then the curtain splits to reveal the hero.
 * Once per session, skippable, never shown with reduced motion (CSS + boot script).
 */
export function IntroHook() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [finished, setFinished] = useState(false);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !isIntroPending()) return;
      if (getComputedStyle(root).visibility === "hidden") {
        // JavaScript arrived after the CSS failsafe already hid the overlay.
        markIntroDone();
        return;
      }

      root.style.animation = "none";
      lockScroll();
      const q = gsap.utils.selector(root);
      const halves = q("[data-intro-half]");
      const [top, bottom] = halves;
      const names = q("[data-intro-name]");
      const target = profile.fullName;
      let released = false;

      const release = () => {
        if (released) return;
        released = true;
        try {
          sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
        } catch {
          // Storage blocked: the intro may simply play again next visit.
        }
        unlockScroll();
        markIntroDone();
      };

      const scramble = { p: 0 };
      const renderName = () => {
        const revealed = Math.floor(scramble.p * target.length);
        let text = "";
        for (let i = 0; i < target.length; i += 1) {
          const char = target[i];
          text += i < revealed || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        names.forEach((el) => {
          el.textContent = text;
        });
      };

      const tl = gsap.timeline({
        onComplete: () => {
          release();
          setFinished(true);
        },
      });

      const charStagger = 0.017;
      let typingEnd = 0;
      halves.forEach((half) => {
        const chars = half.querySelectorAll("[data-intro-char]");
        typingEnd = 0.1 + chars.length * charStagger;
        tl.to(chars, { opacity: 1, duration: 0.01, stagger: charStagger }, 0.1);
      });
      tl.to(q("[data-intro-caret]"), { opacity: 1, duration: 0.01 }, typingEnd)
        .to(q("[data-intro-bar]"), { scaleX: 1, duration: 1.95, ease: "power2.inOut" }, 0.05)
        .to(q("[data-intro-code]"), { opacity: 0, y: -12, duration: 0.3, ease: "power2.in" }, 1.0)
        .to(names, { opacity: 1, duration: 0.25 }, 1.15)
        .to(scramble, { p: 1, duration: 0.75, ease: "none", onUpdate: renderName }, 1.15)
        .to(q("[data-intro-meta]"), { opacity: 0, duration: 0.25 }, 1.95)
        .addLabel("curtain", 2.05)
        .set(q("[data-intro-backdrop]"), { opacity: 0 }, "curtain")
        .to(top, { yPercent: -100, duration: 0.75, ease: "expo.inOut" }, "curtain")
        .to(bottom, { yPercent: 100, duration: 0.75, ease: "expo.inOut" }, "curtain")
        .call(release, [], "curtain+=0.2");

      const skip = () => {
        const curtain = tl.labels.curtain ?? 0;
        if (tl.time() < curtain) tl.seek(curtain - 0.01);
        tl.timeScale(1.4);
      };
      const onKey = (event: KeyboardEvent) => {
        if (SKIP_KEYS.has(event.key)) skip();
      };

      root.addEventListener("click", skip);
      window.addEventListener("keydown", onKey);
      window.addEventListener("wheel", skip, { passive: true });
      window.addEventListener("touchmove", skip, { passive: true });

      return () => {
        root.removeEventListener("click", skip);
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("wheel", skip);
        window.removeEventListener("touchmove", skip);
        // Interrupted (navigation, or StrictMode's dev remount): free the page,
        // but leave the intro pending so a remount can still play it.
        if (!released) unlockScroll();
      };
    },
    { scope: rootRef },
  );

  if (finished) return null;

  return (
    <div
      ref={rootRef}
      data-intro-overlay
      data-print-hidden
      aria-hidden
      className="fixed inset-0 z-[100] cursor-pointer select-none"
    >
      <div data-intro-backdrop className="absolute inset-0 bg-ink" />
      {(["top", "bottom"] as const).map((half) => (
        <div
          key={half}
          data-intro-half={half}
          className={cn("absolute inset-x-0 h-1/2 overflow-hidden bg-ink", half === "top" ? "top-0" : "bottom-0")}
        >
          <div className={cn("absolute inset-x-0 h-[200%]", half === "top" ? "top-0" : "bottom-0")}>
            <IntroContent />
          </div>
        </div>
      ))}
    </div>
  );
}

function IntroContent() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4">
      <div className="relative grid w-full max-w-5xl place-items-center">
        <p
          data-intro-code
          className="col-start-1 row-start-1 text-center font-mono text-[clamp(0.8125rem,0.6rem+1vw,1.25rem)] leading-relaxed"
        >
          {profile.intro.code.map((token, t) => (
            <span key={t} className={tokenColors[token.kind]}>
              {Array.from(token.text).map((char, c) => (
                <span key={c} data-intro-char className="opacity-0">
                  {char}
                </span>
              ))}
            </span>
          ))}
          <span
            data-intro-caret
            className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-indigo-ink opacity-0"
          />
        </p>
        <p
          data-intro-name
          className="col-start-1 row-start-1 h-[1em] w-full justify-self-stretch text-center font-serif text-display whitespace-nowrap text-fg opacity-0"
        >
          {profile.fullName}
        </p>
      </div>

      <div data-intro-meta className="mt-10 flex w-[min(16rem,60vw)] flex-col items-center gap-4">
        <span className="relative block h-px w-full overflow-hidden bg-line">
          <span data-intro-bar className="absolute inset-0 origin-left scale-x-0 bg-fg" />
        </span>
      </div>

      <p data-intro-meta className="eyebrow absolute bottom-8 text-center text-muted">
        {site.ui.introSkip}
      </p>
    </div>
  );
}

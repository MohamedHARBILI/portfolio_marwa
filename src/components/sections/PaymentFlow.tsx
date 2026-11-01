"use client";

import { Fragment, useRef } from "react";
import { paymentFlow } from "@/content/experience";
import type { FlowStep } from "@/content/types";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Rich } from "@/components/ui/Rich";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/motion";

/**
 * Signature diagram: the path of an online payment, lit node by node as the
 * visitor scrolls. Every node is real, readable text; with reduced motion or
 * without JavaScript the diagram simply shows its final, fully lit state.
 */
export function PaymentFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { steps, risk } = paymentFlow;
  const riskAfter = steps.findIndex((step) => step.id === risk.after);
  const lastIndex = steps.length - 1;

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const stage = q("[data-flow-stage]")[0];
      const stepEls = q("[data-flow-step]");
      const riskEl = q("[data-flow-risk]")[0];
      if (!stage || !riskEl) return;
      const litOf = (el: Element) => Array.from(el.querySelectorAll("[data-lit]"));
      const allLit = [...stepEls, riskEl].flatMap(litOf);

      const mm = gsap.matchMedia();

      // Desktop: pinned, scrubbed journey along a horizontal track.
      mm.add(`${media.motionOk} and (min-width: 1024px) and (min-height: 640px)`, () => {
        const track = q("[data-flow-track-x]")[0];
        const fill = q("[data-flow-fill-x]")[0];
        const dot = q("[data-flow-dot]")[0];
        const dotRisk = q("[data-flow-dot-risk]")[0];
        const connector = q("[data-flow-connector]")[0];
        if (!track || !fill || !dot || !dotRisk || !connector) return;

        gsap.set(allLit, { opacity: 0 });
        gsap.set(fill, { scaleX: 0 });
        gsap.set(connector, { scaleY: 0 });
        gsap.set(dot, { opacity: 1, x: 0 });

        const riskAt = riskAfter + 0.5;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "center center",
            end: () => `+=${Math.round(window.innerHeight * 1.6)}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(dot, { x: () => (track.offsetWidth * lastIndex) / steps.length, duration: lastIndex }, 0)
          .to(fill, { scaleX: 1, duration: lastIndex }, 0)
          .to(connector, { scaleY: 1, duration: 0.35 }, riskAt - 0.4)
          .to(litOf(riskEl), { opacity: 1, duration: 0.3 }, riskAt - 0.1)
          .to(dotRisk, { opacity: 1, duration: 0.15 }, riskAt - 0.2)
          .to(dotRisk, { opacity: 0, duration: 0.3 }, riskAt + 0.35);
        stepEls.forEach((el, i) => {
          tl.to(litOf(el), { opacity: 1, duration: 0.25 }, Math.max(0, i - 0.12));
        });
        tl.to({}, { duration: 0.4 });
      });

      // Mobile & tablet: vertical track, nodes light up as they enter.
      mm.add(`${media.motionOk} and (max-width: 1023.98px)`, () => {
        const fill = q("[data-flow-fill-y]")[0];
        const list = q("[data-flow-list]")[0];
        if (!fill || !list) return;

        gsap.set(allLit, { opacity: 0 });
        gsap.set(fill, { scaleY: 0 });
        gsap.to(fill, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
        });
        [...stepEls, riskEl].forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 70%",
            onEnter: () => gsap.to(litOf(el), { opacity: 1, duration: 0.5, ease: "power2.out" }),
            onLeaveBack: () => gsap.to(litOf(el), { opacity: 0, duration: 0.4, ease: "power2.out" }),
          });
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="mt-28 lg:mt-40">
      <div className="grid-editorial gap-y-6 border-t border-line pt-5">
        <p className="eyebrow col-span-12 flex items-center gap-3 text-garnet-ink lg:col-span-3">
          <span aria-hidden className="size-1.5 rotate-45 bg-garnet-ink" />
          {paymentFlow.label}
        </p>
        <div className="col-span-12 lg:col-span-9">
          <SplitHeading as="h3" className="font-serif text-h2 text-fg">
            <Rich text={paymentFlow.title} />
          </SplitHeading>
          <p className="mt-6 max-w-2xl text-lead text-muted">{paymentFlow.intro}</p>
        </div>
      </div>

      <div data-flow-stage className="relative mt-14 lg:mt-12 lg:pt-60 lg:pb-4">
        {/* Desktop track */}
        <div aria-hidden data-flow-track-x className="absolute inset-x-0 top-60 hidden h-px bg-line-strong lg:block">
          <div
            data-flow-fill-x
            className="absolute inset-y-0 left-0 origin-left bg-indigo-ink"
            style={{ width: `${(lastIndex / steps.length) * 100}%` }}
          />
          <div data-flow-dot className="absolute top-0 left-0 opacity-0">
            <span className="absolute -top-3 -left-3 size-6 rounded-full bg-indigo-ink/40 blur-md" />
            <span className="absolute -top-[5px] -left-[5px] size-2.5 rounded-full bg-fg" />
            <span data-flow-dot-risk className="absolute -top-[5px] -left-[5px] size-2.5 rounded-full bg-garnet-ink opacity-0" />
          </div>
        </div>

        {/* Mobile track */}
        <div aria-hidden className="absolute top-2 bottom-12 left-[5px] w-px bg-line-strong lg:hidden">
          <div data-flow-fill-y className="absolute inset-0 origin-top bg-indigo-ink" />
        </div>

        <ol data-flow-list aria-label={paymentFlow.ariaLabel} className="relative lg:grid lg:grid-cols-6">
          {steps.map((step, i) => (
            <Fragment key={step.id}>
              <StepItem step={step} />
              {i === riskAfter ? <RiskItem step={risk} left={((riskAfter + 0.5) / steps.length) * 100} /> : null}
            </Fragment>
          ))}
        </ol>
      </div>

      <p className="eyebrow mt-2 text-muted lg:mt-14">{paymentFlow.caption}</p>
    </div>
  );
}

function StepItem({ step }: { step: FlowStep }) {
  return (
    <li data-flow-step className="relative pb-10 pl-9 lg:pt-12 lg:pr-6 lg:pb-0 lg:pl-0">
      <span aria-hidden className="absolute top-1.5 left-[5px] -translate-x-1/2 lg:top-0 lg:left-0 lg:-translate-y-1/2">
        <span className="block size-3 rounded-full border border-line-strong bg-ink" />
        <span data-lit className="absolute inset-0 rounded-full bg-indigo-ink shadow-[0_0_0_5px_var(--halo)]" />
      </span>
      <p className="eyebrow text-muted">
        <span className="relative">
          {step.index}
          <span data-lit aria-hidden className="absolute inset-0 text-indigo-ink">
            {step.index}
          </span>
        </span>
      </p>
      <h4 className="mt-3 font-serif text-[clamp(1.625rem,1.1rem+0.8vw,2rem)] leading-none text-fg">
        {step.name}
      </h4>
      {step.detail ? (
        <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">{step.detail}</p>
      ) : null}
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{step.description}</p>
    </li>
  );
}

function RiskItem({ step, left }: { step: FlowStep; left: number }) {
  return (
    <li
      data-flow-risk
      className="relative pb-10 pl-9 lg:absolute lg:bottom-full lg:flex lg:h-60 lg:w-[min(23rem,34%)] lg:-translate-x-1/2 lg:flex-col lg:items-center lg:p-0 lg:[left:var(--risk-left)]"
      style={{ ["--risk-left" as string]: `${left}%` }}
    >
      <span aria-hidden className="absolute top-1.5 left-[5px] -translate-x-1/2 lg:hidden">
        <span className="block size-3 rotate-45 border border-garnet-ink bg-ink" />
        <span data-lit className="absolute inset-0 rotate-45 bg-garnet-ink" />
      </span>

      <div className="relative isolate w-full overflow-hidden rounded-[4px] border border-garnet-ink/50 p-5">
        <div data-lit aria-hidden className="absolute inset-0 -z-10 bg-garnet/20" />
        <p className="eyebrow flex items-center justify-between gap-4 text-garnet-ink">
          <span>{step.detail}</span>
          <span aria-hidden className="relative flex size-2">
            <span
              data-lit
              className="absolute inset-0 rounded-full bg-garnet-ink motion-safe:animate-[pulse-ring_2.4s_var(--ease-out-quart)_infinite]"
            />
            <span className="relative size-2 rounded-full bg-garnet-ink" />
          </span>
        </p>
        <h4 className="mt-3 font-serif text-[clamp(1.625rem,1.1rem+0.8vw,2rem)] leading-none text-fg">
          {step.name}
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-fg/85">{step.description}</p>
      </div>

      <span aria-hidden data-flow-connector className="hidden w-px flex-1 origin-bottom bg-garnet-ink/70 lg:block" />
      <span aria-hidden className="relative hidden size-3 translate-y-1/2 rotate-45 border border-garnet-ink bg-ink lg:block">
        <span data-lit className="absolute inset-0 bg-garnet-ink" />
      </span>
    </li>
  );
}

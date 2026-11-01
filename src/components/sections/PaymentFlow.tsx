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
    <div ref={ref} className="card mt-5 p-6 sm:p-10 lg:p-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow flex items-center gap-2.5 text-accent">
            <span aria-hidden className="size-2 rotate-45 rounded-[2px] bg-accent" />
            {paymentFlow.label}
          </p>
          <SplitHeading as="h3" className="mt-5 text-[clamp(1.875rem,1.3rem+2.2vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-fg">
            <Rich text={paymentFlow.title} />
          </SplitHeading>
        </div>
        <p className="max-w-md text-muted lg:text-right">{paymentFlow.intro}</p>
      </div>

      <div data-flow-stage className="relative mt-12 lg:mt-10 lg:pt-60 lg:pb-2">
        {/* Desktop track */}
        <div aria-hidden data-flow-track-x className="absolute inset-x-0 top-60 hidden h-[2px] rounded-full bg-line lg:block">
          <div
            data-flow-fill-x
            className="absolute inset-y-0 left-0 origin-left rounded-full bg-accent"
            style={{ width: `${(lastIndex / steps.length) * 100}%` }}
          />
          <div data-flow-dot className="absolute top-px left-0 opacity-0">
            <span className="absolute -top-4 -left-4 size-8 rounded-full bg-accent/25 blur-md" />
            <span className="absolute -top-[7px] -left-[7px] size-3.5 rounded-full border-[3px] border-surface bg-accent shadow-[0_0_0_1px_rgb(140_29_64/0.3)]" />
            <span data-flow-dot-risk className="absolute -top-[7px] -left-[7px] size-3.5 rounded-full border-[3px] border-surface bg-accent-strong opacity-0" />
          </div>
        </div>

        {/* Mobile track */}
        <div aria-hidden className="absolute top-2 bottom-12 left-[7px] w-[2px] rounded-full bg-line lg:hidden">
          <div data-flow-fill-y className="absolute inset-0 origin-top rounded-full bg-accent" />
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

      <p className="mt-2 text-sm text-muted lg:mt-12">{paymentFlow.caption}</p>
    </div>
  );
}

function StepItem({ step }: { step: FlowStep }) {
  return (
    <li data-flow-step className="relative pb-10 pl-10 lg:pt-12 lg:pr-5 lg:pb-0 lg:pl-0">
      <span aria-hidden className="absolute top-1 left-[8px] -translate-x-1/2 lg:top-px lg:left-0 lg:-translate-y-1/2">
        <span className="block size-4 rounded-full border-2 border-line-strong bg-surface" />
        <span data-lit className="absolute inset-0 rounded-full border-[3px] border-surface bg-accent shadow-[0_0_0_5px_rgb(140_29_64/0.14)]" />
      </span>
      <p className="text-xs font-bold text-muted">
        <span className="relative">
          {step.index}
          <span data-lit aria-hidden className="absolute inset-0 text-accent">
            {step.index}
          </span>
        </span>
      </p>
      <h4 className="mt-2 text-[clamp(1.25rem,1.05rem+0.5vw,1.5rem)] leading-tight font-semibold tracking-[-0.02em] text-fg">
        {step.name}
      </h4>
      {step.detail ? (
        <p className="mt-1.5 text-[0.6875rem] font-semibold tracking-[0.08em] text-muted uppercase">{step.detail}</p>
      ) : null}
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{step.description}</p>
    </li>
  );
}

function RiskItem({ step, left }: { step: FlowStep; left: number }) {
  return (
    <li
      data-flow-risk
      className="relative pb-10 pl-10 lg:absolute lg:bottom-full lg:flex lg:h-60 lg:w-[min(23rem,36%)] lg:-translate-x-1/2 lg:flex-col lg:items-center lg:p-0 lg:[left:var(--risk-left)]"
      style={{ ["--risk-left" as string]: `${left}%` }}
    >
      <span aria-hidden className="absolute top-1 left-[8px] -translate-x-1/2 lg:hidden">
        <span className="block size-3.5 rotate-45 rounded-[3px] border-2 border-accent bg-surface" />
        <span data-lit className="absolute inset-0 rotate-45 rounded-[3px] bg-accent" />
      </span>

      <div className="relative isolate w-full overflow-hidden rounded-2xl border border-accent/20 bg-surface p-5 shadow-soft">
        <div data-lit aria-hidden className="absolute inset-0 -z-10 bg-accent-tint" />
        <p className="eyebrow flex items-center justify-between gap-4 text-accent">
          <span>{step.detail}</span>
          <span aria-hidden className="relative flex size-2">
            <span
              data-lit
              className="absolute inset-0 rounded-full bg-accent motion-safe:animate-[pulse-ring_2.4s_var(--ease-out-quart)_infinite]"
            />
            <span className="relative size-2 rounded-full bg-accent" />
          </span>
        </p>
        <h4 className="mt-3 text-[clamp(1.25rem,1.05rem+0.5vw,1.5rem)] leading-tight font-semibold tracking-[-0.02em] text-fg">
          {step.name}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-fg/80">{step.description}</p>
      </div>

      <span aria-hidden data-flow-connector className="hidden w-[2px] flex-1 origin-bottom bg-accent/50 lg:block" />
      <span aria-hidden className="relative hidden size-3.5 translate-y-1/2 rotate-45 rounded-[3px] border-2 border-accent bg-surface lg:block">
        <span data-lit className="absolute inset-0 bg-accent" />
      </span>
    </li>
  );
}

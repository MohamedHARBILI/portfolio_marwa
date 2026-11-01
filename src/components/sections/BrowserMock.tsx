import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

type BrowserMockProps = {
  project: Project;
  className?: string;
};

/** Stylised browser window used as the project visual until real screenshots exist. */
export function BrowserMock({ project, className }: BrowserMockProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "@container relative aspect-[16/10] w-full overflow-hidden rounded-[2.2cqw] border border-line bg-surface shadow-lift",
        className,
      )}
    >
      <div className="flex h-[8%] items-center gap-[1cqw] border-b border-line px-[2.4cqw]">
        <span className="size-[1.25cqw] rounded-full bg-[#efb7c4]" />
        <span className="size-[1.25cqw] rounded-full bg-[#f1d7a6]" />
        <span className="size-[1.25cqw] rounded-full bg-[#bfe0cb]" />
        <span className="mx-auto flex h-[56%] w-[42%] items-center justify-center rounded-full bg-surface-2 text-[1.45cqw] font-medium text-muted">
          {project.urlLabel}
        </span>
        <span className="w-[4.6cqw]" />
      </div>
      <div className="h-[92%]">{project.motif === "commerce" ? <Shop project={project} /> : <Network />}</div>
    </div>
  );
}

function Lines({ widths, className }: { widths: readonly number[]; className?: string }) {
  return (
    <span className={cn("flex flex-col gap-[0.9cqw]", className)}>
      {widths.map((w, i) => (
        <span key={i} className="h-[1cqw] rounded-full bg-fg/10" style={{ width: `${w}%` }} />
      ))}
    </span>
  );
}

function Shop({ project }: { project: Project }) {
  const products = [
    "from-[#f6dbe2] to-[#ecc2cd]",
    "from-[#efe4d6] to-[#e2d0ba]",
    "from-[#e4e9f1] to-[#cfd9e7]",
  ];
  return (
    <div className="flex h-full flex-col p-[3.4cqw]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-[1cqw]">
          <span className="size-[3cqw] rounded-[0.8cqw] bg-accent" />
          <span className="text-[2cqw] font-bold tracking-[-0.02em] text-fg">{project.shortTitle}</span>
        </span>
        <span className="flex items-center gap-[2.4cqw]">
          <Lines widths={[100]} className="w-[6cqw]" />
          <Lines widths={[100]} className="w-[6cqw]" />
          <span className="flex h-[3.6cqw] items-center gap-[0.8cqw] rounded-full bg-accent px-[1.6cqw] text-[1.4cqw] font-semibold text-on-accent">
            <CartGlyph /> 3
          </span>
        </span>
      </div>

      <div className="mt-[3cqw] flex items-end justify-between gap-[3cqw]">
        <span className="flex flex-col gap-[1.2cqw]">
          <span className="h-[2.6cqw] w-[34cqw] rounded-full bg-fg/80" />
          <span className="h-[2.6cqw] w-[22cqw] rounded-full bg-accent/80" />
        </span>
        <span className="flex h-[3.6cqw] w-[11cqw] items-center rounded-full border border-line px-[1.6cqw]">
          <Lines widths={[100]} className="w-full" />
        </span>
      </div>

      <div className="mt-[3cqw] grid flex-1 grid-cols-3 gap-[2.2cqw]">
        {products.map((gradient, i) => (
          <div key={gradient} className="flex flex-col rounded-[1.6cqw] border border-line p-[1.2cqw]">
            <span className={cn("block flex-1 rounded-[1.1cqw] bg-gradient-to-br", gradient)} />
            <span className="mt-[1.4cqw] flex items-center justify-between">
              <Lines widths={[90, 55]} className="w-[55%]" />
              <span
                className={cn(
                  "rounded-full px-[1.2cqw] py-[0.5cqw] text-[1.2cqw] font-bold",
                  i === 1 ? "bg-accent text-on-accent" : "bg-surface-2 text-fg",
                )}
              >
                {i === 1 ? "+" : "♡"}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Network() {
  const people = ["bg-[#d9c2e8]", "bg-[#f3c9b7]", "bg-[#bfd8e8]", "bg-[#c8e2cf]"];
  return (
    <div className="grid h-full grid-cols-[32%_1fr]">
      <div className="flex flex-col gap-[1.4cqw] border-r border-line bg-bg/70 p-[2.4cqw]">
        <span className="h-[3.4cqw] rounded-full border border-line bg-surface" />
        {people.map((color, i) => (
          <span
            key={color}
            className={cn(
              "flex items-center gap-[1.2cqw] rounded-[1.2cqw] p-[1cqw]",
              i === 0 && "bg-surface shadow-soft",
            )}
          >
            <span className={cn("size-[4.2cqw] shrink-0 rounded-full", color)} />
            <Lines widths={[80, 50]} className="flex-1" />
            {i === 1 ? <span className="size-[1.4cqw] rounded-full bg-[#3c5a86]" /> : null}
          </span>
        ))}
      </div>

      <div className="flex flex-col p-[2.6cqw]">
        <span className="flex items-center gap-[1.2cqw] border-b border-line pb-[2cqw]">
          <span className="size-[4.2cqw] rounded-full bg-[#d9c2e8]" />
          <Lines widths={[60, 35]} className="w-[30%]" />
          <span className="ml-auto size-[1.4cqw] rounded-full bg-[#2f9e6a] ring-[0.6cqw] ring-[#2f9e6a]/20" />
        </span>
        <div className="flex flex-1 flex-col justify-end gap-[1.6cqw] py-[2cqw]">
          <Bubble side="left" widths={[100, 70]} />
          <Bubble side="right" widths={[100]} />
          <Bubble side="left" widths={[85]} />
          <Bubble side="right" widths={[100, 60]} />
        </div>
        <span className="flex h-[5cqw] items-center justify-between rounded-full border border-line pr-[0.8cqw] pl-[2cqw]">
          <Lines widths={[100]} className="w-[40%]" />
          <span className="grid size-[3.6cqw] place-items-center rounded-full bg-[#3c5a86] text-[1.6cqw] text-white">↑</span>
        </span>
      </div>
    </div>
  );
}

function Bubble({ side, widths }: { side: "left" | "right"; widths: readonly number[] }) {
  return (
    <span
      className={cn(
        "flex w-[52%] flex-col gap-[0.9cqw] rounded-[1.8cqw] px-[2cqw] py-[1.6cqw]",
        side === "left" ? "self-start rounded-bl-[0.4cqw] bg-surface-2" : "self-end rounded-br-[0.4cqw] bg-[#3c5a86]",
      )}
    >
      {widths.map((w, i) => (
        <span
          key={i}
          className={cn("h-[1cqw] rounded-full", side === "left" ? "bg-fg/15" : "bg-white/50")}
          style={{ width: `${w}%` }}
        />
      ))}
    </span>
  );
}

function CartGlyph() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-[1.6cqw]">
      <path d="M1.5 2h2l1.6 8.2a1 1 0 0 0 1 .8h6.1a1 1 0 0 0 1-.8L14.5 5H4.3" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.5" cy="13.5" r="1" fill="currentColor" />
      <circle cx="12" cy="13.5" r="1" fill="currentColor" />
    </svg>
  );
}

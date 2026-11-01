import type { Project, ProjectMotif } from "@/content/types";
import { cn } from "@/lib/cn";

type BrowserMockProps = {
  project: Project;
  className?: string;
};

const accents = {
  indigo: { text: "text-indigo-ink", glow: "rgb(43 43 217 / 0.45)" },
  garnet: { text: "text-garnet-ink", glow: "rgb(158 31 69 / 0.45)" },
} as const;

/** Stylised browser window used as the project visual until real screenshots exist. */
export function BrowserMock({ project, className }: BrowserMockProps) {
  const accent = accents[project.accent];

  return (
    <div
      aria-hidden
      className={cn(
        "@container relative aspect-[16/10] overflow-hidden rounded-[4px] border border-line-strong bg-surface",
        className,
      )}
    >
      <div className="flex h-[8%] items-center gap-[1.1cqw] border-b border-line bg-surface-2 px-[2.4cqw]">
        <span className="size-[1.2cqw] rounded-full bg-line-strong" />
        <span className="size-[1.2cqw] rounded-full bg-line-strong" />
        <span className="size-[1.2cqw] rounded-full bg-line-strong" />
        <span className="mx-auto flex h-[58%] w-[44%] items-center justify-center rounded-[2px] bg-ink/70 font-mono text-[1.5cqw] text-muted">
          ~/{project.urlLabel}
        </span>
        <span className="w-[4.8cqw]" />
      </div>

      <div className="relative h-[92%] overflow-hidden p-[5cqw]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "8.333cqw 8.333cqw",
          }}
        />
        <div
          className="absolute -right-[20%] -bottom-[40%] size-[80cqw] rounded-full"
          style={{ background: `radial-gradient(closest-side, ${accent.glow}, transparent)` }}
        />

        <div className="relative flex h-full flex-col">
          <p className="font-mono text-[1.6cqw] tracking-[0.16em] text-muted uppercase">
            {project.index} — {project.kind}
          </p>
          <p className="mt-[2.5cqw] max-w-[62%] font-serif text-[8.5cqw] leading-[0.92] text-fg">
            {project.shortTitle}
          </p>
          <p className="mt-auto font-mono text-[1.5cqw] tracking-[0.12em] text-muted uppercase">
            {project.stack.join(" · ")}
          </p>
        </div>

        <Motif motif={project.motif} className={cn("absolute right-[5cqw] bottom-[6cqw] w-[38%]", accent.text)} />
      </div>
    </div>
  );
}

function Motif({ motif, className }: { motif: ProjectMotif; className?: string }) {
  if (motif === "commerce") {
    return (
      <svg viewBox="0 0 200 130" fill="none" className={className}>
        {[0, 1, 2].map((i) => {
          const x = 4 + i * 66;
          return (
            <g key={i}>
              <rect x={x} y="4" width="60" height="84" rx="2" stroke="var(--line-strong)" />
              <circle cx={x + 30} cy="38" r="17" stroke="currentColor" strokeWidth={i === 1 ? 2 : 1} />
              <path d={`M${x + 8} 70h30M${x + 8} 78h18`} stroke="var(--line-strong)" />
            </g>
          );
        })}
        <rect x="118" y="102" width="78" height="24" rx="2" fill="currentColor" />
        <path d="M130 114h36" stroke="var(--ink)" strokeWidth={2} />
        <path d="M178 109l6 5-6 5" stroke="var(--ink)" strokeWidth={2} />
      </svg>
    );
  }

  const nodes = [
    [30, 30],
    [100, 18],
    [170, 40],
    [60, 96],
    [140, 104],
  ] as const;
  const links = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 4],
    [3, 4],
  ] as const;

  return (
    <svg viewBox="0 0 200 130" fill="none" className={className}>
      {links.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={a === 1 && b === 4 ? "currentColor" : "var(--line-strong)"}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 1 || i === 4 ? 9 : 6}
          fill={i === 1 || i === 4 ? "currentColor" : "var(--surface)"}
          stroke="currentColor"
        />
      ))}
      <path d="M112 58h52a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3h-38l-8 7v-7h-6a3 3 0 0 1-3-3V61a3 3 0 0 1 3-3z" stroke="currentColor" />
      <path d="M120 66h36M120 72h22" stroke="var(--line-strong)" />
    </svg>
  );
}

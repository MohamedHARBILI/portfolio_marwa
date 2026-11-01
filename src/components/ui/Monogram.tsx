import { cn } from "@/lib/cn";

// M and F share one stem: the right leg of the M is the spine of the F.
export const MONOGRAM = {
  viewBox: "0 0 48 48",
  letters: ["M9 37V11l12 17 12-17v26", "M33 11h9", "M33 23h7"],
  signal: { cx: 41.5, cy: 36.5, r: 2.5 },
  strokeWidth: 3.4,
} as const;

type MonogramProps = {
  className?: string;
  /** When set, the SVG is exposed to assistive tech with this name. */
  title?: string;
  /** Hide the accent signal dot. */
  plain?: boolean;
};

export function Monogram({ className, title, plain = false }: MonogramProps) {
  return (
    <svg
      viewBox={MONOGRAM.viewBox}
      fill="none"
      className={cn("size-10", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {MONOGRAM.letters.map((d) => (
        <path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={MONOGRAM.strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      ))}
      {plain ? null : <circle {...MONOGRAM.signal} className="fill-accent" />}
    </svg>
  );
}

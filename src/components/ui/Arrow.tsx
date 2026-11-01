import { cn } from "@/lib/cn";

type ArrowProps = {
  direction?: "right" | "up-right" | "down" | "left" | "up";
  className?: string;
};

const rotations = {
  right: "",
  "up-right": "-rotate-45",
  down: "rotate-90",
  left: "rotate-180",
  up: "-rotate-90",
} as const;

export function Arrow({ direction = "right", className }: ArrowProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("size-4 shrink-0", rotations[direction], className)}
    >
      <path d="M2.5 8h11M9.5 4l4 4-4 4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom font-size tokens from globals.css, so `text-h2` is not mistaken for a color.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["hero", "display", "h2", "h3", "lead", "label"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

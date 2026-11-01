"use client";

import { media } from "@/lib/motion";
import { useMediaQuery } from "./useMediaQuery";

// Defaults to `true` on the server so nothing animates before we know.
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery(media.reducedMotion, true);
}

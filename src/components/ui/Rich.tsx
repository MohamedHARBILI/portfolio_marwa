import { Fragment } from "react";
import type { RichText } from "@/content/types";
import { cn } from "@/lib/cn";

type RichProps = {
  text: RichText;
  emClassName?: string;
};

/** Renders content segments, setting `{ em }` segments in the accent color. */
export function Rich({ text, emClassName }: RichProps) {
  return (
    <>
      {text.map((segment, i) =>
        typeof segment === "string" ? (
          <Fragment key={i}>{segment}</Fragment>
        ) : (
          <em key={i} className={cn("text-accent not-italic", emClassName)}>
            {segment.em}
          </em>
        ),
      )}
    </>
  );
}

export function richToString(text: RichText): string {
  return text.map((segment) => (typeof segment === "string" ? segment : segment.em)).join("");
}

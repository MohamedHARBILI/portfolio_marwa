import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Opens in a new tab with a visually hidden hint. */
  external?: boolean;
  icon?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;

const base =
  "group/button relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-[3px] font-medium whitespace-nowrap transition-colors duration-500 ease-out-expo";

const variants: Record<Variant, string> = {
  primary: "bg-indigo text-on-accent hover:text-ink",
  outline: "border border-line-strong text-fg hover:border-fg hover:text-ink",
  ghost: "text-fg hover:text-indigo-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  icon,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], variant === "ghost" && "px-0", className);
  const content = (
    <>
      {variant === "ghost" ? null : (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-fg transition-transform duration-500 ease-out-expo group-hover/button:scale-y-100"
        />
      )}
      <span>{children}</span>
      {icon}
      {external ? <span className="sr-only"> {site.ui.opensInNewTab}</span> : null}
    </>
  );

  if (isInternal(href) && !rest.download) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}

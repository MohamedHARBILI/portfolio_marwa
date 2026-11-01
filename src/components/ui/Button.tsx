import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
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
  "group/button relative inline-flex items-center justify-center gap-3 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-out-expo active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent shadow-[0_10px_30px_-12px_rgb(140_29_64/0.65)] hover:bg-accent-strong hover:shadow-[0_16px_40px_-14px_rgb(140_29_64/0.75)]",
  secondary: "border border-line-strong bg-surface text-fg shadow-soft hover:border-fg/40 hover:bg-surface",
  ghost: "text-fg hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

const iconWrap: Record<Variant, string> = {
  primary: "bg-white/15",
  secondary: "bg-surface-2",
  ghost: "",
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
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    icon && variant !== "ghost" && "pr-2",
    variant === "ghost" && "h-auto px-0",
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden
          className={cn(
            "grid place-items-center overflow-hidden rounded-full transition-transform duration-500 ease-out-expo group-hover/button:translate-x-0.5",
            variant === "ghost" ? "size-5" : size === "sm" ? "size-7" : "size-9",
            iconWrap[variant],
          )}
        >
          {icon}
        </span>
      ) : null}
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

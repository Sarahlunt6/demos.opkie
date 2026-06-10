import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Surface = "light" | "dark";

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 ease-out";

// Variants reference only named tokens — never raw hex (PRD 6).
const variants: Record<Surface, Record<Variant, string>> = {
  light: {
    primary:
      "bg-graphite text-porcelain hover:bg-graphite/90 border border-graphite",
    outline:
      "border border-ink-line text-graphite hover:border-champagne hover:text-graphite",
    ghost: "text-graphite hover:text-smoke",
  },
  dark: {
    primary:
      "bg-porcelain text-graphite hover:bg-porcelain/90 border border-porcelain",
    outline:
      "border border-porcelain/30 text-porcelain hover:border-champagne",
    ghost: "text-porcelain hover:text-champagne",
  },
};

type CommonProps = {
  variant?: Variant;
  surface?: Surface;
  className?: string;
  children: ReactNode;
};

/** Render as a Next.js Link when `href` is provided, otherwise a <button>. */
export function Button({
  variant = "primary",
  surface = "light",
  className = "",
  children,
  ...props
}: CommonProps &
  (
    | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
    | ({ href?: undefined } & Omit<
        ComponentProps<"button">,
        "className"
      >)
  )) {
  const classes = `${base} ${variants[surface][variant]} ${className}`;

  if (typeof props.href === "string") {
    const { href, ...rest } = props as { href: string } & Omit<
      ComponentProps<typeof Link>,
      "href" | "className"
    >;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { href: _omit, ...rest } = props as { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className"
  >;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

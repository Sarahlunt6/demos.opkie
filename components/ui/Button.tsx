import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "onCarbon";

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors duration-200 ease-out";

// Variants reference only named tokens — never raw hex (PRD 6). Neutral by
// design: carbon and white do the work; the accent stays in small doses.
const variants: Record<Variant, string> = {
  primary: "bg-carbon text-studio-white hover:bg-carbon/90",
  outline: "border border-line text-carbon hover:border-carbon",
  // For the carbon CTA band / footer: an inverted button on dark.
  onCarbon: "bg-studio-white text-carbon hover:bg-mist",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

/** Renders a Next.js Link when `href` is set, otherwise a <button>. */
export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: CommonProps &
  (
    | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
    | ({ href?: undefined } & Omit<ComponentProps<"button">, "className">)
  )) {
  const classes = `${base} ${variants[variant]} ${className}`;

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

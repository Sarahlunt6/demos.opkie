import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Text link with an animated champagne underline that grows from the left
 * (PRD 2.6 / 5). 250ms, left-origin. Collapses to a static underline under
 * prefers-reduced-motion via the global motion guard.
 */
export function AnimatedLink({
  children,
  className = "",
  ...props
}: ComponentProps<typeof Link> & { children: ReactNode }) {
  return (
    <Link
      {...props}
      className={`group relative inline-block text-graphite ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-[250ms] ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </Link>
  );
}

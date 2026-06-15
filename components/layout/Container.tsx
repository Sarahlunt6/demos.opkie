import type { ElementType, ReactNode } from "react";

/**
 * Page container — max-width 1240px (PRD 3.4), generous gutters. Polymorphic.
 */
export function Container({
  as,
  id,
  className = "",
  children,
}: {
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const Tag = as ?? "div";
  return (
    <Tag id={id} className={`mx-auto w-full max-w-page px-5 sm:px-8 ${className}`}>
      {children}
    </Tag>
  );
}

import type { ElementType, ReactNode } from "react";

/**
 * Page container — max-width 1280px with generous gutters (PRD 2.4).
 * Polymorphic so sections can render it as <section>, <header>, etc.
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
    <Tag id={id} className={`mx-auto w-full max-w-page px-6 sm:px-8 ${className}`}>
      {children}
    </Tag>
  );
}

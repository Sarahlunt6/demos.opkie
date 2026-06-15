import type { ElementType, ReactNode } from "react";

/**
 * Letterspaced 12px uppercase utility label (PRD 3.3) — template metadata and
 * section eyebrows. Inherits text color so it can sit on light or dark sections.
 */
export function UtilityLabel({
  as,
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const Tag = as ?? "span";
  return <Tag className={`label ${className}`}>{children}</Tag>;
}

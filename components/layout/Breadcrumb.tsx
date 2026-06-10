import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Visible breadcrumb trail for nested routes. The matching BreadcrumbList
 * JSON-LD is emitted separately (Phase 4) from the same crumb data.
 */
export function Breadcrumb({
  crumbs,
  className = "",
}: {
  crumbs: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-smoke">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-2">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="hover:text-graphite">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-graphite">
                  {crumb.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-ink-line">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import { Container } from "./Container";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumb, type Crumb } from "./Breadcrumb";

/**
 * Interior-page header — eyebrow, single serif H1, optional intro paragraph,
 * and an optional breadcrumb for nested routes. Keeps one h1 per page.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
}) {
  return (
    <Container
      as="header"
      className="border-b border-ink-line pb-12 pt-12 lg:pb-16 lg:pt-16"
    >
      {crumbs && <Breadcrumb crumbs={crumbs} className="mb-8" />}
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-[20ch] text-display font-light">{title}</h1>
        {intro && (
          <p className="measure mt-6 text-body-lg text-smoke">{intro}</p>
        )}
      </Reveal>
    </Container>
  );
}

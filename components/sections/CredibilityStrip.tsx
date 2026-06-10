import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site.config";

/**
 * Credibility strip (PRD 4.1) — a single hairline-ruled row, text-first.
 * Years in practice and credentials read as quiet statements, not badges.
 */
export function CredibilityStrip() {
  const { items } = siteConfig.credibility;

  return (
    <Container as="section" aria-label="Credentials" className="py-10 lg:py-12">
      <Reveal>
        <ul className="flex flex-col items-stretch divide-y divide-ink-line sm:flex-row sm:items-center sm:divide-y-0 sm:divide-x">
          {items.map((item) => (
            <li
              key={item}
              className="py-3 text-center text-sm text-smoke sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  );
}

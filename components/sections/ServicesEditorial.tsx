import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceEntry } from "./ServiceEntry";
import { siteConfig } from "@/lib/site.config";

/**
 * Featured services on the homepage — large editorial entries with alternating
 * alignment (PRD 4.1). Deliberately not a card grid. Shares ServiceEntry with
 * the services hub.
 */
export function ServicesEditorial() {
  const featured = siteConfig.services.filter((s) => s.featured);

  return (
    <Container as="section" className="py-section lg:py-section-lg">
      <Reveal>
        <p className="eyebrow">Selected Services</p>
        <h2 className="mt-4 max-w-[18ch] text-display font-light">
          A short list, done exceptionally
        </h2>
      </Reveal>

      <div className="mt-16 flex flex-col gap-20 lg:mt-24 lg:gap-32">
        {featured.map((service, i) => (
          <ServiceEntry
            key={service.slug}
            service={service}
            imageFirst={i % 2 === 0}
          />
        ))}
      </div>
    </Container>
  );
}

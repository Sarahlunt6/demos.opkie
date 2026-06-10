import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site.config";
import { ph } from "@/lib/placeholder";

/**
 * Featured services as large editorial entries with alternating alignment
 * (PRD 4.1) — image + serif title + two-line description + arrow link.
 * Deliberately not a card grid: no identical shadowed cards.
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
        {featured.map((service, i) => {
          const imageFirst = i % 2 === 0;
          return (
            <Reveal
              key={service.slug}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16"
            >
              <div
                className={`lg:col-span-6 ${
                  imageFirst ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-line">
                  <Image
                    src={ph(1200, 1500, service.shortTitle, "neutral")}
                    alt={`${service.title} at ${siteConfig.practice.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div
                className={`lg:col-span-6 ${
                  imageFirst ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <p className="eyebrow">{service.eyebrow}</p>
                <h3 className="mt-4 text-display-sm font-light">
                  {service.title}
                </h3>
                <p className="measure mt-5 text-body-lg text-smoke">
                  {service.excerpt}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="group mt-7 inline-flex items-center gap-2 text-sm text-graphite"
                >
                  <span className="relative">
                    Explore {service.shortTitle}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-[250ms] ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-[250ms] ease-out group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}

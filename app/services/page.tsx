import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServiceEntry } from "@/components/sections/ServiceEntry";
import { BookingBand } from "@/components/sections/BookingBand";
import { siteConfig } from "@/lib/site.config";

const { pages, services } = siteConfig;

export const metadata: Metadata = {
  title: pages.services.seo.title,
  description: pages.services.seo.description,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow={pages.services.eyebrow}
        title={pages.services.heading}
        intro={pages.services.intro}
      />

      <Container as="section" className="py-section lg:py-section-lg">
        <div className="flex flex-col gap-20 lg:gap-32">
          {services.map((service, i) => (
            <ServiceEntry
              key={service.slug}
              service={service}
              imageFirst={i % 2 === 0}
            />
          ))}
        </div>
      </Container>

      <BookingBand />
    </>
  );
}

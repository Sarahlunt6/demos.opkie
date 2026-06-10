import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/interactive/FaqAccordion";
import { TransformationSlider } from "@/components/interactive/TransformationSlider";
import { BookingBand } from "@/components/sections/BookingBand";
import { siteConfig } from "@/lib/site.config";
import { ph } from "@/lib/placeholder";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return siteConfig.services.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  // A matching gallery case provides the procedure-specific before/after.
  const galleryCase = siteConfig.gallery.find((c) => c.serviceSlug === slug);

  return (
    <>
      <PageHeader
        eyebrow={service.eyebrow}
        title={service.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortTitle },
        ]}
      />

      {/* Positioning statement */}
      <Container as="section" className="py-section lg:py-section-lg">
        <Reveal>
          <p className="measure text-display-sm font-light leading-[1.35] text-graphite">
            {service.positioning}
          </p>
        </Reveal>
      </Container>

      {/* Is this right for you */}
      <section className="border-t border-ink-line">
        <Container className="py-section lg:py-section-lg">
          <Reveal>
            <p className="eyebrow">Is this right for you</p>
            <h2 className="mt-4 max-w-[20ch] text-display font-light">
              You may be a good fit if
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
            {service.forYou.map((statement) => (
              <Reveal
                as="li"
                key={statement.slice(0, 24)}
                className="border-t border-ink-line pt-5"
              >
                <span
                  aria-hidden="true"
                  className="mb-4 block h-px w-8 bg-champagne"
                />
                <p className="text-body-lg text-graphite">{statement}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process — only when the procedure is genuinely sequential */}
      {service.process && (
        <section className="border-t border-ink-line">
          <Container className="py-section lg:py-section-lg">
            <Reveal>
              <p className="eyebrow">The Process</p>
              <h2 className="mt-4 max-w-[20ch] text-display font-light">
                What to expect, in order
              </h2>
            </Reveal>
            <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-ink-line bg-ink-line md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.title}
                  className="bg-porcelain p-8"
                  delay={i * 60}
                >
                  <span className="font-display text-4xl font-light text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg text-graphite">{step.title}</h3>
                  <p className="mt-3 text-body text-smoke">{step.description}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>
      )}

      {/* Before/after slider — where applicable */}
      {service.hasComparison && galleryCase && (
        <section className="border-t border-ink-line">
          <Container className="py-section lg:py-section-lg">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <TransformationSlider
                  beforeSrc={ph(1600, 1200, `Case ${galleryCase.id} Before`, "before")}
                  afterSrc={ph(1600, 1200, `Case ${galleryCase.id} After`, "after")}
                  beforeAlt={galleryCase.beforeAlt}
                  afterAlt={galleryCase.afterAlt}
                  eyebrow={`Case ${galleryCase.id} — ${galleryCase.detail}`}
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section className="border-t border-ink-line">
        <Container className="py-section lg:py-section-lg">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">Common Questions</p>
              <h2 className="mt-4 text-display font-light">
                Good to know
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-8">
              <FaqAccordion items={service.faqs} />
            </Reveal>
          </div>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}

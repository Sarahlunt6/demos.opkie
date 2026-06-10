import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { BookingBand } from "@/components/sections/BookingBand";
import { siteConfig } from "@/lib/site.config";
import { ph } from "@/lib/placeholder";

const { pages, about, doctor } = siteConfig;

export const metadata: Metadata = {
  title: pages.about.seo.title,
  description: pages.about.seo.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={pages.about.eyebrow}
        title={pages.about.heading}
        intro={pages.about.intro}
      />

      {/* Doctor story — wide portrait above a two-column story/credentials */}
      <Container as="section" className="py-section lg:py-section-lg">
        <Reveal>
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink-line">
            <Image
              src={ph(1600, 1067, doctor.displayName, "neutral")}
              alt={`${doctor.name} at ${siteConfig.practice.name}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{doctor.name}</p>
            <div className="measure mt-6 space-y-5 text-body-lg text-smoke">
              {about.story.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={80}>
            <div className="border-t border-ink-line pt-6">
              <p className="eyebrow">Training &amp; Credentials</p>
              <ul className="mt-5 space-y-3">
                {doctor.credentials.map((credential) => (
                  <li
                    key={credential}
                    className="border-b border-ink-line pb-3 text-graphite"
                  >
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Values */}
      <section className="border-t border-ink-line">
        <Container className="py-section lg:py-section-lg">
          <Reveal>
            <p className="eyebrow">How We Work</p>
            <h2 className="mt-4 max-w-[18ch] text-display font-light">
              A few principles we don&rsquo;t bend on
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-ink-line bg-ink-line md:grid-cols-3">
            {about.values.map((value) => (
              <Reveal key={value.title} className="bg-porcelain p-8 lg:p-10">
                <h3 className="text-display-sm font-light">{value.title}</h3>
                <p className="mt-4 text-body text-smoke">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}

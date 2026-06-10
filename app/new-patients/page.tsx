import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { BookingBand } from "@/components/sections/BookingBand";
import { siteConfig } from "@/lib/site.config";

const { pages, newPatients } = siteConfig;

export const metadata: Metadata = {
  title: pages.newPatients.seo.title,
  description: pages.newPatients.seo.description,
};

const SECTIONS: { eyebrow: string; heading: string; points: readonly string[] }[] =
  [
    {
      eyebrow: "First Visit",
      heading: "What to expect",
      points: newPatients.firstVisit,
    },
    {
      eyebrow: "Financing & Insurance",
      heading: "Clear costs, no surprises",
      points: newPatients.financing,
    },
    {
      eyebrow: "Paperwork",
      heading: "Forms, done before you arrive",
      points: newPatients.forms,
    },
  ];

export default function NewPatientsPage() {
  return (
    <>
      <PageHeader
        eyebrow={pages.newPatients.eyebrow}
        title={pages.newPatients.heading}
        intro={newPatients.intro}
      />

      <Container as="section" className="py-section lg:py-section-lg">
        <div className="flex flex-col gap-16 lg:gap-24">
          {SECTIONS.map((section) => (
            <Reveal
              key={section.eyebrow}
              className="grid grid-cols-1 gap-8 border-t border-ink-line pt-10 lg:grid-cols-12 lg:gap-16"
            >
              <div className="lg:col-span-4">
                <p className="eyebrow">{section.eyebrow}</p>
                <h2 className="mt-4 text-display-sm font-light">
                  {section.heading}
                </h2>
              </div>
              <ul className="measure space-y-5 lg:col-span-8">
                {section.points.map((point) => (
                  <li
                    key={point.slice(0, 24)}
                    className="text-body-lg text-smoke"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>

      <BookingBand />
    </>
  );
}

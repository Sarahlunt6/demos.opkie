import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/interactive/ContactForm";
import { siteConfig } from "@/lib/site.config";
import { pageMetadata } from "@/lib/seo";
import { formatHours, formatTime } from "@/lib/format";

const { pages, practice, hours } = siteConfig;

export const metadata: Metadata = pageMetadata({
  title: pages.contact.seo.title,
  description: pages.contact.seo.description,
  path: "/contact",
});

export default function ContactPage() {
  const grouped = formatHours(hours);

  return (
    <>
      <PageHeader
        eyebrow={pages.contact.eyebrow}
        title={pages.contact.heading}
        intro={pages.contact.intro}
      />

      {/* id="book" makes the header's Book a Consultation anchor resolve here */}
      <Container as="section" id="book" className="py-section lg:py-section-lg">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <h2 className="text-display-sm font-light">Send a note</h2>
            <p className="measure mt-4 text-body text-smoke">
              Tell us a little about what you&rsquo;re considering and we&rsquo;ll
              follow up to find a time.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            <h2 className="text-display-sm font-light">Visit us</h2>

            <address className="mt-6 not-italic text-body-lg text-smoke">
              <p>{practice.address.street}</p>
              <p>
                {practice.address.suite}, {practice.address.city},{" "}
                {practice.address.state} {practice.address.zip}
              </p>
              <p className="mt-4">
                <a href={practice.phoneHref} className="text-graphite">
                  {practice.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${practice.email}`} className="text-graphite">
                  {practice.email}
                </a>
              </p>
            </address>

            {/* Hours table */}
            <div className="mt-8 border-t border-ink-line pt-6">
              <p className="eyebrow">Hours</p>
              <table className="mt-4 w-full text-body text-smoke">
                <tbody>
                  {grouped.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="py-1 text-left font-normal text-graphite">
                        {row.label}
                      </th>
                      <td className="py-1 text-right">
                        {row.open === null
                          ? "Closed"
                          : `${formatTime(row.open)} – ${formatTime(row.close!)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 border-t border-ink-line pt-6">
              <p className="eyebrow">Parking</p>
              <p className="mt-3 text-body text-smoke">{practice.parkingNote}</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 lg:mt-16">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-ink-line bg-ink-line sm:aspect-[21/9]">
            <iframe
              title={`Map to ${practice.name}`}
              src={practice.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </Container>
    </>
  );
}

import { siteConfig } from "./site.config";
import { absoluteUrl } from "./seo";
import type { Crumb } from "@/components/layout/Breadcrumb";
import type { Faq } from "./site.config";

/**
 * JSON-LD builders. All values come from site.config so the structured data
 * and the visible NAP are one source of truth (PRD 7).
 */

/** Dentist (a LocalBusiness subtype) — rendered sitewide from the root layout. */
export function dentistSchema() {
  const { practice, doctor, hours, social, url } = siteConfig;

  const openingHoursSpecification = hours
    .filter((h) => h.open && h.close)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.open,
      closes: h.close,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": absoluteUrl("/#dentist"),
    name: practice.name,
    description: practice.description,
    url,
    telephone: practice.phone,
    email: practice.email,
    image: absoluteUrl("/opengraph-image"),
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${practice.address.street}, ${practice.address.suite}`,
      addressLocality: practice.address.city,
      addressRegion: practice.address.state,
      postalCode: practice.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: practice.geo.lat,
      longitude: practice.geo.lng,
    },
    openingHoursSpecification,
    founder: { "@type": "Person", name: doctor.name },
    sameAs: [social.instagram, social.facebook, social.google],
  };
}

/** FAQPage — service detail pages, paired with the visible accordion. */
export function faqSchema(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** BreadcrumbList — nested routes, from the same crumbs the UI renders. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
    })),
  };
}

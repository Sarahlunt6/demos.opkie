import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { BookingBand } from "@/components/sections/BookingBand";
import { siteConfig } from "@/lib/site.config";

const { pages } = siteConfig;

export const metadata: Metadata = {
  title: pages.smileGallery.seo.title,
  description: pages.smileGallery.seo.description,
};

export default function SmileGalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow={pages.smileGallery.eyebrow}
        title={pages.smileGallery.heading}
        intro={pages.smileGallery.intro}
      />

      <Container as="section" className="py-section lg:py-section-lg">
        {/* useSearchParams requires a Suspense boundary for static rendering */}
        <Suspense fallback={null}>
          <GalleryGrid />
        </Suspense>
      </Container>

      <BookingBand />
    </>
  );
}

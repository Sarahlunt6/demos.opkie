import { Hero } from "@/components/sections/Hero";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { ServicesEditorial } from "@/components/sections/ServicesEditorial";
import { DoctorIntro } from "@/components/sections/DoctorIntro";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { BookingBand } from "@/components/sections/BookingBand";
import { StickyBookingBar } from "@/components/interactive/StickyBookingBar";

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <ServicesEditorial />
      <DoctorIntro />
      <GalleryPreview />
      <Testimonials />
      <BookingBand />
      <StickyBookingBar />
    </>
  );
}

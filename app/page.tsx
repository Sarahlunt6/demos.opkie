import { hubConfig } from "@/lib/hub.config";
import { Hero } from "@/components/sections/Hero";
import { TemplateIndex } from "@/components/interactive/TemplateIndex";
import { TemplateSection } from "@/components/sections/TemplateSection";
import { StickyMobileBar } from "@/components/interactive/StickyMobileBar";

/**
 * The Showroom: hero -> sticky template index -> five template sections.
 * The sticky mobile bar is the conversion spine on phones.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TemplateIndex />

      {hubConfig.templates.map((template, i) => (
        <TemplateSection key={template.id} template={template} priority={i === 0} />
      ))}

      <StickyMobileBar />
    </>
  );
}

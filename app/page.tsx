import { hubConfig } from "@/lib/hub.config";
import { Hero } from "@/components/sections/Hero";
import { StyleFinder } from "@/components/interactive/StyleFinder";
import { TemplateIndex } from "@/components/interactive/TemplateIndex";
import { TemplateSection } from "@/components/sections/TemplateSection";
import { ComparisonStrip } from "@/components/sections/ComparisonStrip";
import { WhatHappensNext } from "@/components/sections/WhatHappensNext";
import { EverySiteIncludes } from "@/components/sections/EverySiteIncludes";
import { FinalCta } from "@/components/sections/FinalCta";
import { StickyMobileBar } from "@/components/interactive/StickyMobileBar";

/**
 * The Showroom (PRD 4.1). One page, top to bottom, rendered from hub.config.ts:
 * hero -> Style Finder -> sticky template index -> five identical template
 * sections -> comparison strip -> what happens next -> every site includes ->
 * final CTA. The sticky mobile bar is the conversion spine on phones.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StyleFinder />
      <TemplateIndex />

      {hubConfig.templates.map((template, i) => (
        <TemplateSection key={template.id} template={template} priority={i === 0} />
      ))}

      <ComparisonStrip />
      <WhatHappensNext />
      <EverySiteIncludes />
      <FinalCta />

      <StickyMobileBar />
    </>
  );
}

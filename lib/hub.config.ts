/**
 * hub.config.ts — single source of truth for the Showcase Hub (PRD 6).
 *
 * Everything the hub renders — template order, copy, demo URLs, screenshots,
 * Style Finder labels, contact details, turnaround, indexability — lives here.
 * No client-specific or template-specific string is hardcoded in a component.
 * Adding a sixth template someday is one entry + three screenshots.
 *
 * PLACEHOLDERS TO REPLACE BEFORE LAUNCH (flagged inline):
 *   - templates[].demoUrl  — the live Vercel demo URL for each template
 *   - contact.{phone,email,bookingUrl}  — real Opkie contact details
 *   - turnaround  — the real go-live timeframe
 *   - analytics.gtmId  — GTM container id (optional; Vercel Analytics also works)
 *   - the opkie-accent hue in app/globals.css + lib/tokens.ts
 */

export interface HubTemplate {
  /** Stable id; used in /go/[id] and anchor links. */
  id: string;
  /** "Template A" … "Template E". */
  label: string;
  /** Codename: Porcelain, Meridian, … */
  name: string;
  /**
   * Index-chip color ONLY (PRD 3.4) — the one place template color appears in
   * hub UI. Distinct steps of Opkie's shared blue ramp, since all five demos now
   * share one blue palette; the differing step keeps each chip distinguishable.
   */
  brandHue: string;
  /** One-sentence positioning line (PRD 4.1 #4). */
  positioning: string;
  /** Comparison strip — "Best for". */
  bestFor: string;
  /** Comparison strip — "Signature feature". */
  signatureFeature: string;
  /** Comparison strip — "Personality in three words". */
  personality: [string, string, string];
  /** Style Finder answer (PRD 4.1.3). */
  styleFinderLabel: string;
  /** Three differentiators, the signature feature first (PRD 4.1 #4). */
  differentiators: [string, string, string];
  /** Live demo URL (PLACEHOLDER — confirm before launch). */
  demoUrl: string;
  /** [home, signature interaction, mobile] — captured per PREVIEWS.md. */
  screenshots: [string, string, string];
}

export interface HubConfig {
  /** Canonical origin — used for canonicals, robots, sitemap, and OG URLs. */
  siteUrl: string;
  templates: HubTemplate[];
  contact: { phone: string; email: string; bookingUrl: string };
  turnaround: string;
  indexable: boolean;
  analytics: { gtmId: string };
}

export const hubConfig: HubConfig = {
  siteUrl: "https://demos.opkie.com", // canonical origin (PRD 9)
  templates: [
    {
      id: "porcelain",
      label: "Template A",
      name: "Porcelain",
      brandHue: "#1B3A5C",
      positioning: "For practices that lead with cosmetic results.",
      bestFor: "Cosmetic & boutique practices",
      signatureFeature: "Interactive before/after smile gallery",
      personality: ["Refined", "Editorial", "Quiet luxury"],
      styleFinderLabel: "Cosmetic-focused",
      differentiators: [
        "A draggable before/after slider patients control themselves — the transformation is the first thing they touch.",
        "Editorial type and gallery-grade whitespace that present your cases like fine portraiture, not a brochure.",
        "A filterable smile gallery, case by case, built to turn browsing into booked consultations.",
      ],
      demoUrl: "/porcelain/", // static export hosted in this project
      screenshots: [
        "/previews/porcelain-home.png",
        "/previews/porcelain-feature.png",
        "/previews/porcelain-mobile.png",
      ],
    },
    {
      id: "meridian",
      label: "Template B",
      name: "Meridian",
      brandHue: "#235082",
      positioning: "For implant and technology-forward practices that compete on expertise.",
      bestFor: "Implants & technology-forward practices",
      signatureFeature: "Guided treatment pathway",
      personality: ["Precise", "Clinical", "Authoritative"],
      styleFinderLabel: "Implants & technology",
      differentiators: [
        "An interactive treatment pathway that maps a patient's options from consult to result.",
        "Blueprint-clean structure and precise detailing that signal real clinical authority.",
        "Built for implants and high-tech care, with the proof a high-trust decision needs.",
      ],
      demoUrl: "/meridian/", // static export hosted in this project
      screenshots: [
        "/previews/meridian-home.png",
        "/previews/meridian-feature.png",
        "/previews/meridian-mobile.png",
      ],
    },
    {
      id: "hearthside",
      label: "Template C",
      name: "Hearthside",
      brandHue: "#2C66A8",
      positioning: "For neighborhood family practices that win on trust and warmth.",
      bestFor: "Family & neighborhood practices",
      signatureFeature: "First-visit walkthrough",
      personality: ["Warm", "Approachable", "Neighborly"],
      styleFinderLabel: "Family practice",
      differentiators: [
        "A first-visit walkthrough that shows nervous families exactly what to expect.",
        "Approachable, rounded design that feels like the neighborhood practice it is.",
        "Family-first structure — every age and every reason for a visit has a clear path.",
      ],
      demoUrl: "/hearthside/", // static export hosted in this project
      screenshots: [
        "/previews/hearthside-home.png",
        "/previews/hearthside-feature.png",
        "/previews/hearthside-mobile.png",
      ],
    },
    {
      id: "stillwater",
      label: "Template D",
      name: "Stillwater",
      brandHue: "#3D7DC4",
      positioning: "For practices built around calm, sedation, and anxious patients.",
      bestFor: "Sedation & anxiety-focused practices",
      signatureFeature: "Comfort menu for anxious patients",
      personality: ["Calm", "Reassuring", "Gentle"],
      styleFinderLabel: "We see anxious patients",
      differentiators: [
        "A comfort menu that lets anxious patients choose how they want to be cared for.",
        "A quiet, low-contrast dark theme and gentle pacing designed to lower the heart rate.",
        "Sedation and anxiety care made central, not a footnote — reassurance in every section.",
      ],
      demoUrl: "/stillwater/", // static export hosted in this project
      screenshots: [
        "/previews/stillwater-home.png",
        "/previews/stillwater-feature.png",
        "/previews/stillwater-mobile.png",
      ],
    },
    {
      id: "marquee",
      label: "Template E",
      name: "Marquee",
      brandHue: "#6FA0D6",
      positioning: "For modern practices that compete on transparent, upfront pricing.",
      bestFor: "Transparent-pricing, modern practices",
      signatureFeature: "Live transparent-pricing toggle",
      personality: ["Bold", "Modern", "Direct"],
      styleFinderLabel: "Young, modern, no-insurance-friendly",
      differentiators: [
        "A live pricing toggle that recalculates membership savings in real time.",
        "Bold, oversized type and flat color blocks for a modern, no-games feel.",
        "Built for transparent, no-insurance-friendly practices that lead with straight answers.",
      ],
      demoUrl: "/marquee/", // static export hosted in this project
      screenshots: [
        "/previews/marquee-home.png",
        "/previews/marquee-feature.png",
        "/previews/marquee-mobile.png",
      ],
    },
  ],

  // PLACEHOLDER — replace with real Opkie contact details before launch.
  contact: {
    phone: "(555) 000-0000",
    email: "hello@opkie.com",
    bookingUrl: "#",
  },

  turnaround: "10 days", // PLACEHOLDER — real go-live timeframe
  indexable: false, // direct-link sales tool, not a search asset (PRD 7)
  analytics: { gtmId: "" },
};

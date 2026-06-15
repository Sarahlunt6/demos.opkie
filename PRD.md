# PRD — Opkie Template Showcase Hub: "The Showroom" (v2 — Five Templates)

> One link. Five websites. An easy choice.

**Product:** Client-facing showcase site that presents Opkie's five dental website templates and routes visitors to the live demos.
**Stack:** Next.js 14+ (App Router), Tailwind CSS v4 (CSS `@theme` tokens), TypeScript, deployed on Vercel via GitHub.
**Suggested domain:** `demos.opkie.com` (or `templates.opkie.com`).
**Status:** Ready for build in Claude Code. Supersedes the three-template v1 PRD.

---

## 1. Project Context (read first)

Opkie sells high-performance websites to dental practices. We maintain five fully built, completely distinct template sites, each deployed as its own live demo on its own Vercel project:

| Template | Codename | Positioning | Visual fingerprint | Demo URL |
|---|---|---|---|---|
| A | Porcelain | Boutique cosmetic | Light, editorial serif, before/after slider | config |
| B | Meridian | Modern clinical / implants | Light, sans + mono, blueprint precision, treatment pathway | config |
| C | Hearthside | Neighborhood family | Warm light, rounded, evergreen, first-visit walkthrough | config |
| D | Stillwater | Calm / sedation & dental anxiety | Warm dark, gentle serif, comfort menu | config |
| E | Marquee | Bold modern / transparent pricing | Flat color blocks, huge type, pricing toggle | config |

This PRD covers the sixth site: the hub. The sales process is: "Here's one link — pick the style that feels like your practice."

**The hub's single job:** Let a dentist (often on their phone, between patients) understand the five options quickly, narrow to the one or two that fit them, open the live demos, and know exactly what to do next.

**New problem at five options (vs three):** choice overload is now real. The hub must actively help narrow, not just display. See the Style Finder (4.1.3) and anchor links — these exist specifically because five is more than a phone screen can compare unaided.

## 2. Audience & Use Context

- **Who:** Dental practice owners and office managers, mid-sales-process, link received from Opkie directly.
- **Context:** Mobile-heavy, low patience, may forward the link to a partner or spouse. Must work standalone with zero verbal explanation.
- **The decision:** Not "is Opkie good" (the demos prove that) — only "which style is mine."

## 3. Design Direction

### 3.1 Personality

The hub is the gallery wall, not the art. Impeccably designed but deliberately neutral so it doesn't bias the choice. Opkie-branded, confident, minimal — a curator's voice.

**Critical rule:** The hub must borrow no template's signature language. Specifically banned in the hub's own UI: editorial high-contrast serif (A), mono annotations or blueprint hairline grids (B), rounded warm illustration and soft-serif (C), dark warm theme (D), oversized type-as-design and flat saturated color blocks (E). The hub gets its own quiet identity — neutral sans, white space, restraint.

**Also avoid (AI tells):** emoji anywhere; gradient text; glow effects; blob/particle backgrounds; generic 3-card pricing-style layout; cream + terracotta or black + acid-green defaults.

### 3.2 Color Tokens (Tailwind v4 `@theme` block — single source)

| Token | Hex | Usage |
|---|---|---|
| `studio-white` | #FFFFFF | Page background |
| `carbon` | #141414 | Text, footer, primary buttons |
| `mist` | #F2F2F0 | Preview frames, section washes |
| `line` | #E3E3E0 | Hairlines, borders |
| `opkie-accent` | (pull from current opkie.com brand) | Links, active states, the Style Finder highlight — small doses only |

### 3.3 Typography

- One neutral family, multiple weights (`Inter` + `Inter Display`, or `Geist`): display 600 tight-tracked, clamp 2rem–4rem; body 16–17px / 1.6.
- Letterspaced 12px uppercase utility labels for template metadata ("TEMPLATE D — STILLWATER / FOR SEDATION & ANXIETY-FOCUSED PRACTICES").

### 3.4 Layout & Motion

- Max-width 1240px, hairline section dividers, generous spacing.
- Motion minimal: one load fade-up stagger; 200ms hovers; preview cross-fades. `prefers-reduced-motion` respected.
- **Template index (new at five):** immediately under the hero, a slim sticky-on-scroll index bar listing all five codenames as anchor links with a small color chip each (chip uses that template's primary brand hue — the one place template color appears in hub UI). Lets a visitor jump rather than scroll-hunt.

### 3.5 Signature Element

**Live device previews.** Each template presented as a large interactive preview: clean browser-chrome frame cycling 3 high-fidelity screenshots (home, signature interaction, mobile view) on hover/tap with dot indicators, plus "View live site" opening the real demo in a new tab. Static screenshots, not iframes (iframes are slow, break interactions, and wreck CLS). 15 screenshots total (5 × 3), captured per `PREVIEWS.md`.

## 4. Page Structure (single page + utility routes)

### 4.1 `/` — The Showroom

1. **Header:** Opkie wordmark left; phone + "Talk to us" button right (config). Slim, hairline border.
2. **Hero (short):** Eyebrow "OPKIE WEBSITE STUDIO" + headline — placeholder: "Five websites. Built, proven, ready for your practice." One subline: every option is fully built, mobile-optimized, and engineered for search — the only decision is style. Optional `?for=Practice+Name` personalization line (sanitized, capped, plain text).
3. **Style Finder (new, optional-skip):** A single-question segmented control directly under the hero — "What best describes your practice?" with five short answers ("Cosmetic-focused" / "Implants & technology" / "Family practice" / "We see anxious patients" / "Young, modern, no-insurance-friendly"). Selecting one smooth-scrolls to that template's section and softly highlights it (accent left-rule, 2s fade). Not a quiz, not gated, one tap, skippable — it exists to collapse five options into one starting point. State in URL param so a forwarded link can pre-highlight.
4. **Template Sections × 5** — identical structure per template for effortless comparison:
   - Utility label + codename
   - Positioning line (one sentence, from config)
   - Live device preview (signature)
   - Three differentiators specific to that template (its signature feature first)
   - Primary action: "View the live site" via tracked `/go/` link
5. **Comparison strip:** Compact table — rows: "Best for," "Signature feature," "Personality in three words." Five columns at desktop; below 1024px it becomes a horizontally swipeable card row (one card per template, snap-scroll, edge-peek so the next card is visibly cut off); never a squeezed table on mobile.
6. **What happens next:** 3 plain steps — pick the style → we swap in your name, team, photos, and services → live in [X days, config].
7. **Every site includes:** Quiet text section — mobile-optimized, Core Web Vitals engineering, local SEO structure, accessibility, your branding throughout.
8. **Final CTA band:** carbon — "Found yours?" + "Tell us your pick" (booking/mailto from config) + large clickable phone.
9. **Footer:** Opkie NAP, minimal.

### 4.2 `/go/[template]` — Tracked redirects

`/go/porcelain`, `/go/meridian`, `/go/hearthside`, `/go/stillwater`, `/go/marquee` — server route fires an analytics event, then redirects to the demo URL. All demo buttons route through these so Opkie sees which templates each prospect opened. `?for=` passthrough optional.

## 5. Interactive Elements (build list)

| Element | Spec |
|---|---|
| Device preview cross-fade | 3 screenshots per template, hover-cycle desktop / tap-advance mobile, dots, lazy, fixed aspect ratio (zero CLS) |
| Style Finder | Segmented control, smooth-scroll + soft highlight, URL-param state, fully skippable, keyboard operable |
| Sticky template index | Anchor bar with color chips, appears after hero, active-section indication |
| Tracked demo links | `/go/[template]` + analytics event (Vercel Analytics custom event or GTM) |
| Comparison swipe row | Snap-scroll cards <1024px, edge-peek, no scrollbar chrome |
| `?for=` personalization | Server-read, sanitized (strip tags, cap 40 chars), silent when absent |
| Sticky mobile footer bar | "Call" + "Tell us your pick" after 50% scroll |

## 6. Configuration System

Single `lib/hub.config.ts` — same convention as the template repos. All five templates as entries of one shape:

```ts
export const hubConfig = {
  templates: [
    {
      id: "porcelain",
      label: "Template A",
      name: "Porcelain",
      brandHue: "#B8A06A",            // index-chip color only
      positioning: "For practices that lead with cosmetic results.",
      bestFor: "Cosmetic & boutique practices",
      signatureFeature: "Interactive before/after smile gallery",
      personality: ["Refined", "Editorial", "Quiet luxury"],
      styleFinderLabel: "Cosmetic-focused",
      differentiators: ["...", "...", "..."],
      demoUrl: "https://...",
      screenshots: ["/previews/porcelain-home.png", "/previews/porcelain-feature.png", "/previews/porcelain-mobile.png"],
    },
    // meridian, hearthside, stillwater, marquee — same shape
  ],
  contact: { phone: "", email: "", bookingUrl: "" },
  turnaround: "X days",
  indexable: false,
  analytics: { gtmId: "" },
};
```

- Everything — order, copy, URLs, screenshots, Style Finder labels — config-driven. Adding a sixth template someday is one config entry + three screenshots.
- `PREVIEWS.md` documents the 15 screenshot captures: which pages, viewports (1440 desktop / 390 mobile), and naming, so previews can be refreshed after template updates.

## 7. SEO & Indexing (deliberately different from the templates)

- Default `noindex, nofollow`, excluded from sitemap, controlled by the `indexable` config flag — this is a direct-link sales tool, not a search asset.
- Full metadata + OG/Twitter cards regardless: the link gets shared in emails and texts, so the preview must be impeccable — custom OG image (1200×630) showing all five templates as a strip, title "Five Websites, Ready for Your Practice | Opkie."
- Clean semantics anyway: one `h1`, landmarks, alt text.

## 8. Performance, Accessibility, Mobile

- Must be the fastest of the six sites: LCP < 1.5s, CLS < 0.02, INP < 200ms. Fully static, `next/image` for all previews, first preview `priority`, the rest lazy.
- Mobile is the primary context: full flow tested at 360px — land → Style Finder tap → preview swipe → open demo → return → "Tell us your pick." Five sections is a long page; the sticky index is the mobile navigation spine.
- WCAG 2.1 AA: keyboard-operable preview cycling and Style Finder, visible focus, verified contrast, reduced motion honored. No emojis anywhere.

## 9. Repo & Delivery

- GitHub repo: `opkie-template-hub`, own Vercel project, domain `demos.opkie.com`.
- `README.md`: updating demo URLs, refreshing screenshots, editing turnaround copy, toggling indexability, adding a template.
- Lighthouse CI ≥98 perf / 100 a11y on mobile emulation before merge.

## 10. Acceptance Criteria

- [ ] All five templates presented with identical section structure; Style Finder narrows in one tap and is fully skippable
- [ ] All demo links route through `/go/[template]` and fire trackable events
- [ ] Hub UI borrows zero signature language from any of the five templates (checklist in 3.1)
- [ ] Comparison strip is readable at every width — swipeable cards below 1024px, never a crushed table
- [ ] Sticky index works as the long-page navigation on mobile
- [ ] `?for=` renders safely and degrades silently; noindex on by default and flag-controlled
- [ ] No emojis; no hardcoded values outside `hub.config.ts`; Lighthouse thresholds met
- [ ] Full flow phone-tested: text yourself the link, find your template via the Style Finder, open it, return, tap contact

## 11. Build Order (for Claude Code)

1. Scaffold Next.js + Tailwind v4 (`@theme` tokens), build `hub.config.ts` with all five template entries and placeholder screenshot paths
2. Build the page top to bottom against config — gray placeholder images at exact aspect ratios until real screenshots exist
3. `/go/[template]` redirects + analytics events
4. Style Finder + sticky index + comparison swipe row
5. `?for=` personalization with sanitization; OG image; metadata; noindex flag
6. Mobile pass at 360px, accessibility pass, Lighthouse pass
7. Swap in the 15 real screenshots once all five demos are deployed (per `PREVIEWS.md`)

# PRD — Dental Website Template A: "Porcelain"
### The Boutique Cosmetic Practice

**Product:** Premium dental website template (1 of 3 in Opkie's template system)
**Stack:** Next.js 14+ (App Router), Tailwind CSS, TypeScript, deployed on Vercel via GitHub
**Status:** Ready for build in Claude Code

---

## 1. Positioning & Target Client

This template is for the **cosmetic and aesthetic-forward dental practice**: veneers, smile makeovers, whitening, Invisalign, boutique patient experience. The dentist who buys this template thinks of their practice the way a high-end med spa or luxury studio thinks of itself.

**The site's single job:** Make a prospective patient believe "this is where I get the smile I actually want" and book a consultation.

**Tone in one sentence:** Quiet luxury — the confidence of a practice that doesn't need to shout.

---

## 2. Design Direction

### 2.1 Personality
Editorial, gallery-like, restrained. The smile transformations ARE the content — the design is the frame. Think of how a high-end portrait photographer or fine jewelry brand presents work: generous whitespace, large imagery, disciplined type.

**Explicitly avoid (these read as AI-generated):**
- Warm cream (#F4F1EA-range) background with terracotta accent — overused AI default
- Gradient hero text or gradient accent blobs
- Emoji anywhere, including as icons
- Generic "big number + small label + 3 stats" hero
- Card grids with identical drop shadows
- Stock-photo smiles with watermark energy — use real-feeling placeholder imagery direction (see 7.2)

### 2.2 Color Tokens
Derived from dental porcelain, enamel, and studio lighting — not from a generic "luxury" palette.

| Token | Hex | Usage |
|---|---|---|
| `porcelain` | #FAFAF8 | Page background — cool white, not cream |
| `enamel` | #FFFFFF | Cards, elevated surfaces |
| `graphite` | #1C1B1A | Primary text, near-black with warmth |
| `smoke` | #6E6A66 | Secondary text |
| `champagne` | #B8A06A | Accent — muted metallic gold, used sparingly (links, rules, active states) |
| `ink-line` | #E5E2DD | Hairline borders and dividers |

Rule: champagne appears on no more than ~5% of any viewport. It is punctuation, not paint.

### 2.3 Typography
- **Display:** A high-contrast editorial serif (e.g., `Fraunces` with optical sizing, or `Canela`-style fallback via `Libre Caslon`). Used for H1/H2 only, large sizes (clamp 2.5rem–5.5rem), tight tracking, weight 300–400. Italic used deliberately for one or two emphasized words per page.
- **Body:** A quiet grotesque (`Inter` at 400/500, or `Söhne`-style). 16–18px, 1.6 line height, max line length 65ch.
- **Utility/caption:** Same grotesque at 12–13px, letterspaced uppercase for eyebrows and labels (e.g., "SMILE GALLERY — CASE 014").
- Load via `next/font` with `display: swap`. No more than 2 families total.

### 2.4 Layout System
- 12-column grid, max-width 1280px, generous gutters (32px+).
- Asymmetry as a tool: hero and feature sections use 7/5 or 8/4 splits, not centered stacks.
- Section rhythm: large vertical spacing (120–160px desktop, 64–80px mobile). Hairline `ink-line` rules between major sections instead of background color changes.
- Sticky, minimal header: practice wordmark left, 4 nav items + "Book Consultation" button right. Header background transitions from transparent to `porcelain` with a hairline border on scroll.

### 2.5 Signature Element (the one memorable thing)
**The Transformation Slider.** Hero features a full-bleed, interactive before/after smile comparison — a draggable vertical divider the visitor controls (pointer + touch + keyboard accessible). Built custom (no heavy library): two layered images, a `clip-path` driven by a drag handle. Subtle eyebrow above: "CASE 014 — PORCELAIN VENEERS, 8 UNITS." This single interaction communicates the entire value proposition without copy.

The slider pattern repeats in the Smile Gallery as a grid of interactive cases.

### 2.6 Motion
- One orchestrated page-load sequence on the homepage: headline lines reveal with a 60ms stagger (translateY + opacity), then the transformation slider handle pulses once to invite interaction. Total sequence under 1.2s.
- Scroll-triggered reveals: single fade-up per section, 0.5s ease-out, triggered once. No parallax, no floating elements.
- Hover micro-interactions: links get an animated champagne underline (left-to-right); gallery cards lift 2px with a hairline border shift, no shadow bloom.
- `prefers-reduced-motion` fully respected: all transforms disabled, opacity-only fallbacks.

---

## 3. Site Architecture

```
/                       Home
/about                  About the Practice (doctor-led story)
/services               Services hub
/services/veneers
/services/smile-makeover
/services/teeth-whitening
/services/invisalign
/services/dental-implants
/services/general-dentistry
/smile-gallery          Interactive before/after case grid
/new-patients           First visit, forms, financing
/contact                Contact + booking
```

---

## 4. Page Specifications

### 4.1 Home
1. **Hero:** Transformation Slider (signature), headline in display serif — placeholder: "The smile you've been postponing." Single CTA: "Book a Consultation." No stat row.
2. **Credibility strip:** One hairline-ruled row — years in practice, board certifications, association logos (grayscale, small). Text-first, not badge-heavy.
3. **Services editorial:** Three featured services presented as large editorial entries (image + serif title + 2-line description + arrow link), stacked with alternating alignment — not a card grid.
4. **Doctor introduction:** 7/5 split — portrait photography direction (natural light, environmental, not white-coat-on-white) + a short first-person statement in display italic, signed.
5. **Smile Gallery preview:** 3 interactive slider cases, link to full gallery.
6. **Patient words:** Single rotating testimonial, large serif quote treatment, patient first name + procedure. One at a time — not a 3-column wall.
7. **Booking band:** Full-width `graphite` section, serif headline, consultation CTA, phone number set large and clickable.

### 4.2 Service Detail Pages (template, repeated per service)
- Eyebrow + serif H1 + 1-paragraph positioning statement
- "Is this right for you" — 4–5 plain-language qualifying statements
- Process: numbered steps ONLY if the procedure is genuinely sequential (veneers: consult → design → prep → placement). Numbering encodes real order here.
- Before/after slider for that procedure (where applicable)
- FAQ accordion (5–6 questions, real objections: cost, pain, longevity, insurance) — these also feed FAQ schema
- Consultation CTA band

### 4.3 Smile Gallery
- Filterable grid (by procedure) of transformation sliders, each labeled with case number and procedure. Filter is client-side, instant, with URL params for shareability.

### 4.4 Contact
- Two-column: form (name, phone, email, preferred time, message — no `<form>` styling defaults, custom focus states in champagne) + practice details, embedded map, hours table, parking note placeholder.

---

## 5. Interactive Elements (build list)

| Element | Spec |
|---|---|
| Transformation Slider | Custom, pointer/touch/keyboard, `clip-path` based, lazy-loaded images |
| Gallery filter | Client-side, animated layout transition (FLIP or CSS grid auto-flow), URL-synced |
| FAQ accordions | Native `<details>` enhanced, animated height, one-open-at-a-time, schema-paired |
| Testimonial rotator | Auto-advance 8s, pause on hover/focus, manual arrows, no dots-only control |
| Sticky booking CTA (mobile) | Bottom bar appears after 50% scroll, "Call" + "Book" split buttons |
| Animated link underlines | Champagne, 250ms, left-origin |

---

## 6. Placeholder & Configuration System

All client-specific data lives in **one typed config file**: `lib/site.config.ts`.

```ts
export const siteConfig = {
  practice: {
    name: "[Practice Name] Dental Studio",
    tagline: "Cosmetic & Restorative Dentistry",
    phone: "(555) 555-0142",
    email: "hello@practicename.com",
    address: { street: "123 Main Street, Suite 200", city: "Cityname", state: "ST", zip: "00000" },
    geo: { lat: 0, lng: 0 },
    hours: [...],
    bookingUrl: "#", // GHL / scheduling embed target
  },
  doctor: {
    name: "Dr. Alexandra Hale, DDS",
    credentials: ["DDS — University Placeholder", "AACD Member"],
    bio: "...",
  },
  social: {...},
  analytics: { gtmId: "" },
};
```

**Rules:**
- No client-specific string is ever hardcoded in a component. Everything renders from config.
- Images live in `/public/images/` with a documented manifest (`IMAGES.md`) listing every slot, required dimensions, and subject direction — so swapping a client in is a checklist, not a hunt.
- Placeholder copy must read like a real practice wrote it. No lorem ipsum, no "Your Trusted Partner in Dental Excellence" filler. Write it as if for a real boutique practice named "Hale Dental Studio."

---

## 7. SEO Requirements

- **Metadata:** Next.js Metadata API per page. Unique title (≤60 char, pattern: `Veneers in [City] | [Practice Name]`) and description (≤155 char) per route, driven from config + per-page overrides.
- **Structured data (JSON-LD):** `Dentist` (LocalBusiness subtype) sitewide with NAP, geo, hours, `sameAs`; `FAQPage` on service pages; `BreadcrumbList` on nested routes.
- **Local SEO:** NAP rendered identically everywhere (footer, contact, schema) from config — single source of truth.
- **Semantics:** One `h1` per page, logical heading order, `<main>/<nav>/<footer>` landmarks, descriptive alt text slots in the image manifest.
- **Technical:** `sitemap.ts` and `robots.ts` generated; canonical URLs; OG image template (1200×630) with practice name from config; clean trailing-slash policy.
- **Performance as SEO:** see Section 8 targets.

## 8. Performance, Accessibility, Mobile

- **Core Web Vitals targets:** LCP < 2.0s, CLS < 0.05, INP < 200ms (Vercel Analytics to verify).
- `next/image` for all imagery with explicit dimensions (zero layout shift); hero images `priority`; gallery lazy.
- Fonts via `next/font`, subset, swap. No render-blocking third-party scripts; GTM loaded `afterInteractive`.
- **Mobile-first build order.** Slider must be flawless on touch. Tap targets ≥44px. Sticky bottom CTA on mobile only. Test at 360px width minimum.
- WCAG 2.1 AA: visible focus states (champagne 2px outline), contrast verified (champagne on porcelain fails for body text — accent/large use only), full keyboard operability of slider and accordions, reduced-motion support.

## 9. Repo & Delivery Conventions

- GitHub repo: `opkie-template-a-porcelain`. Vercel preview deploys on every PR.
- `README.md` includes: client-swap checklist (config → images → copy passes → DNS), and a 10-minute "rebrand walkthrough."
- Lighthouse CI check ≥95 performance / 100 accessibility / 100 SEO on home and one service page before any merge to `main`.

## 10. Acceptance Criteria

- [ ] Transformation Slider works with mouse, touch, and arrow keys; no jank at 60fps
- [ ] Zero hardcoded client strings — grep for "Hale" returns only `site.config.ts` and copy files
- [ ] All pages pass Lighthouse thresholds above on mobile emulation
- [ ] No emojis anywhere in UI or copy
- [ ] Site is visually distinct from Templates B and C at a glance (different type, palette, layout logic)
- [ ] Reads as designed-by-a-studio: passes the "would a dentist believe a human designed this for them" review

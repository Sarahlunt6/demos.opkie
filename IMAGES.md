# Image Manifest — Porcelain (Hale Dental Studio template)

Every image slot in the template, with its exact dimensions, subject
direction, and alt-text source. Swapping in a real client is a checklist
against this file, not a hunt through components.

## Conventions

- All assets live in `public/images/` at the paths below.
- Until real photography is supplied, each slot uses a **solid neutral
  placeholder** at the exact dimensions — either a local block or a
  `https://placehold.co/<w>x<h>/EFECE9/6E6A66?text=<label>` URL — so layout is
  final before photography lands.
- Dimensions are the **intrinsic** size passed to `next/image` (width × height).
  Always export at 2× for retina where noted.
- Alt text is **not** stored with the image — it comes from `lib/site.config.ts`
  (gallery `beforeAlt`/`afterAlt`, doctor `portrait`, etc.) so it swaps with the
  client. The "Alt source" column says where to look.
- Subject direction reflects PRD 2.1 and 7.2: real-feeling, editorial, natural
  light. No white-coat-on-white, no stock-smile watermark energy.

---

## 1. Hero — Transformation Slider (signature element)

| Slot | Path | Dimensions | Subject direction | Alt source |
|---|---|---|---|---|
| Hero before | `public/images/hero/case-014-before.jpg` | 1600 × 1200 | Close, even, soft studio light on a real mouth/smile. The "before" state of CASE 014: worn, slightly discolored upper teeth. Framed identically to the after so the slider divider lines up exactly. | `gallery[0].beforeAlt` |
| Hero after | `public/images/hero/case-014-after.jpg` | 1600 × 1200 | Identical framing, lighting, and crop as the before. The "after": eight porcelain veneers, natural and even. Pixel-aligned to the before image. | `gallery[0].afterAlt` |

> Both hero images are `priority` loaded. They MUST share identical crop,
> framing, and exposure or the slider will reveal a jump at the divider.

---

## 2. Credibility strip — association logos

| Slot | Path | Dimensions | Subject direction | Alt source |
|---|---|---|---|---|
| Logo 1–4 | `public/images/logos/{aacd,ada,kois,ohsu}.svg` | 160 × 48 (display ~120w) | Single-color or grayscale association marks (AACD, ADA, Kois Center, OHSU). Rendered grayscale at low opacity — text-first strip, logos are secondary. SVG preferred. | Logo `alt` = organization name, from credibility copy |

---

## 3. Services editorial (homepage — 3 featured)

Large editorial entries, alternating alignment. Portrait-leaning crops.

| Slot | Path | Dimensions | Subject direction | Alt source |
|---|---|---|---|---|
| Veneers | `public/images/services/veneers.jpg` | 1200 × 1500 | Editorial detail — a finished veneer smile or the ceramic work in natural light. Restrained, gallery-like. | `services[veneers].title` + context |
| Smile makeover | `public/images/services/smile-makeover.jpg` | 1200 × 1500 | A patient mid-consultation or a designed smile preview; environmental, warm but quiet. | `services[smile-makeover].title` |
| General dentistry | `public/images/services/general-dentistry.jpg` | 1200 × 1500 | The studio's calm operatory or an unhurried exam moment; not clinical-sterile. | `services[general-dentistry].title` |

> The remaining services (whitening, Invisalign, implants) use the same slot
> spec on their detail pages: `public/images/services/<slug>.jpg`, 1200 × 1500.

---

## 4. Doctor portrait (homepage 7/5 split + About)

| Slot | Path | Dimensions | Subject direction | Alt source |
|---|---|---|---|---|
| Dr. Hale portrait | `public/images/doctor/alexandra-hale.jpg` | 1200 × 1500 | Natural light, environmental — in the studio, at a window, not white-coat-on-white. Conveys calm and competence. PRD 4.1. | `doctor.name`, e.g. "Dr. Alexandra Hale in the studio" |
| Dr. Hale — About wide | `public/images/doctor/alexandra-hale-wide.jpg` | 1600 × 1067 | Wider environmental frame for the About page hero. Same shoot, landscape crop. | `doctor.name` |

---

## 5. Smile Gallery — transformation cases

Six cases (PRD 4.3). Each is a before/after pair, identically framed.
Homepage preview reuses cases 014, 021, 009.

| Case | Before path | After path | Dimensions (each) | Alt source |
|---|---|---|---|---|
| CASE 014 — Veneers | `public/images/gallery/case-014-before.jpg` | `public/images/gallery/case-014-after.jpg` | 1200 × 1500 | `gallery[id=014]` (reuses hero pair, may be a tighter gallery crop) |
| CASE 021 — Smile makeover | `public/images/gallery/case-021-before.jpg` | `public/images/gallery/case-021-after.jpg` | 1200 × 1500 | `gallery[id=021]` |
| CASE 009 — Whitening | `public/images/gallery/case-009-before.jpg` | `public/images/gallery/case-009-after.jpg` | 1200 × 1500 | `gallery[id=009]` |
| CASE 017 — Invisalign | `public/images/gallery/case-017-before.jpg` | `public/images/gallery/case-017-after.jpg` | 1200 × 1500 | `gallery[id=017]` |
| CASE 025 — Implant | `public/images/gallery/case-025-before.jpg` | `public/images/gallery/case-025-after.jpg` | 1200 × 1500 | `gallery[id=025]` |
| CASE 031 — Veneers | `public/images/gallery/case-031-before.jpg` | `public/images/gallery/case-031-after.jpg` | 1200 × 1500 | `gallery[id=031]` |

> Each pair must share identical framing/exposure (slider alignment).
> Gallery images are lazy-loaded (PRD 8).

---

## 6. Service detail before/after sliders

Services with `hasComparison: true` (veneers, smile-makeover, invisalign) get a
procedure-specific slider on their detail page. These reuse the matching gallery
case pair above — no separate asset needed unless a service-specific case is
preferred, in which case:

| Slot | Path | Dimensions | Notes |
|---|---|---|---|
| Service slider before/after | `public/images/services/<slug>-before.jpg` / `-after.jpg` | 1600 × 1200 | Optional override; defaults to the linked gallery case. |

---

## 7. Open Graph / social card

| Slot | Path | Dimensions | Subject direction | Alt source |
|---|---|---|---|---|
| OG image | generated at `app/opengraph-image` (Phase 4) | 1200 × 630 | Template-rendered: practice name from config in display serif on porcelain, one champagne hairline. No photo required. | n/a (decorative) |

---

## 8. Brand marks

| Slot | Path | Dimensions | Notes |
|---|---|---|---|
| Favicon | `app/favicon.ico` | 32 × 32 (multi-res .ico) | Monogram or wordmark initial. Scaffold default present; replace at client swap. |
| Apple touch icon | `app/apple-icon.png` | 180 × 180 | Optional; same monogram on porcelain. |

---

## Client-swap checklist (images only)

1. Replace every `public/images/**` asset above at the exact dimensions listed.
2. Ensure each before/after pair is identically framed (slider alignment).
3. Update alt text in `lib/site.config.ts` — never in components.
4. Replace `app/favicon.ico` (+ optional `apple-icon.png`).
5. Confirm hero pair is high quality (it is `priority`-loaded and LCP-critical).

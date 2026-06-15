# Preview Screenshots — capture spec

The hub's signature element is a live device preview per template: a browser-chrome
frame that cycles three high-fidelity screenshots (PRD 3.5). Static screenshots,
never iframes (iframes are slow, break interactions, and wreck CLS).

**15 screenshots total — 5 templates × 3 each.** Until the real captures exist,
the preview component renders neutral gray placeholders at the exact aspect ratios
below, so layout is final before any image lands (no CLS when they swap in).

## Conventions

- All files live in `public/previews/` at the paths in `lib/hub.config.ts`
  (`templates[].screenshots`).
- Naming: `<template-id>-<slot>.png` — e.g. `porcelain-home.png`,
  `meridian-feature.png`, `stillwater-mobile.png`.
- Export at 2× for retina. Optimize (PNG or WebP) — the hub must be the fastest
  of the six sites (PRD 8). The first template's first screenshot is `priority`;
  the rest lazy-load.
- Capture against the template's deployed demo, not local dev.

## The three slots per template

| Slot | File | Viewport | Aspect | Subject |
|---|---|---|---|---|
| 1 — Home | `<id>-home.png` | 1440 × 900 desktop | 16:10 | The template homepage, hero in view. The first impression. |
| 2 — Signature interaction | `<id>-feature.png` | 1440 × 900 desktop | 16:10 | The template's signature feature mid-use (see table below), captured at a moment that reads at a glance. |
| 3 — Mobile view | `<id>-mobile.png` | 390 × 844 mobile | 9:19.5 | The homepage on a phone — the hub's primary context is mobile, so prospects want to see the mobile result. |

## Per-template signature interaction (slot 2)

| Template | Capture |
|---|---|
| Porcelain | The before/after smile slider mid-drag |
| Meridian | The guided treatment pathway, a step selected |
| Hearthside | The first-visit walkthrough, a stage open |
| Stillwater | The comfort menu, options visible |
| Marquee | The pricing table with the membership toggle on, savings shown |

## Refreshing

After any template redeploys, re-capture its three slots at the dimensions above
and overwrite the files — paths and aspect ratios never change, so nothing in the
hub needs editing. To add a sixth template: one `hub.config.ts` entry plus three
screenshots following this spec.

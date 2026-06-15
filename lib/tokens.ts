/**
 * JS-side palette mirror.
 *
 * The canonical token source is `@theme` in app/globals.css. A few non-CSS
 * contexts need the raw values too — the generated OG image (next/og) and the
 * browser theme-color meta — and cannot read CSS custom properties. This file
 * mirrors those values for exactly those contexts. Keep it in sync with
 * globals.css; it is the only sanctioned place for palette hex outside CSS.
 */
export const palette = {
  studioWhite: "#FFFFFF",
  carbon: "#141414",
  mist: "#F2F2F0",
  line: "#E3E3E0",
  accent: "#2C66A8", // placeholder — replace with opkie.com brand accent
} as const;

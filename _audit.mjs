import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const axeSource = readFileSync(
  new URL("./node_modules/axe-core/axe.min.js", `file://${process.cwd()}/`),
  "utf8",
);
const BASE = "http://localhost:3100";

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

async function auditPage(path, { keyboardSlider = false } = {}) {
  const ctx = await browser.newContext({
    viewport: { width: 360, height: 780 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + e.message));

  await page.goto(BASE + path, { waitUntil: "networkidle" });

  // axe
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    // @ts-ignore
    const res = await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    });
    return res.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.slice(0, 4).map((n) => ({
        target: n.target.join(" "),
        summary: (n.failureSummary || "").split("\n").slice(0, 2).join(" | "),
      })),
    }));
  });

  // horizontal overflow at 360
  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    inner: window.innerWidth,
  }));

  let slider = null;
  if (keyboardSlider) {
    slider = await page.evaluate(async () => {
      const el = document.querySelector('[role="slider"]');
      if (!el) return { found: false };
      el.focus();
      const before = el.getAttribute("aria-valuenow");
      return { found: true, before, focused: document.activeElement === el };
    });
    if (slider.found) {
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowRight");
      slider.after = await page.evaluate(() =>
        document.querySelector('[role="slider"]').getAttribute("aria-valuenow"),
      );
      await page.keyboard.press("Home");
      slider.home = await page.evaluate(() =>
        document.querySelector('[role="slider"]').getAttribute("aria-valuenow"),
      );
    }
  }

  await ctx.close();
  return { path, axe, overflow, consoleErrors, slider };
}

const results = [];
results.push(await auditPage("/", { keyboardSlider: true }));
results.push(await auditPage("/services/veneers"));
results.push(await auditPage("/contact"));
results.push(await auditPage("/smile-gallery"));

await browser.close();
console.log(JSON.stringify(results, null, 2));

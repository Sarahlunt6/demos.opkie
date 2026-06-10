import type { BusinessHour } from "./site.config";

/** Convert "08:00" / "14:30" to "8:00 AM" / "2:30 PM". */
export function formatTime(time: string): string {
  const [hRaw, m] = time.split(":");
  const h = Number(hRaw);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === "00" ? `${hour12} ${period}` : `${hour12}:${m} ${period}`;
}

export interface GroupedHours {
  /** "Mon" or "Mon – Thu" */
  label: string;
  open: string | null;
  close: string | null;
}

/**
 * Collapse consecutive days that share the same hours into a single row,
 * e.g. Mon–Thu 8–5, Fri 8–2, Sat–Sun closed. Keeps the footer compact and
 * the schedule readable without repeating identical lines.
 */
export function formatHours(hours: BusinessHour[]): GroupedHours[] {
  const groups: GroupedHours[] = [];

  for (const h of hours) {
    const last = groups[groups.length - 1];
    if (last && last.open === h.open && last.close === h.close) {
      // Extend the current run to include this day.
      const [start] = last.label.split(" – ");
      last.label = `${start} – ${h.short}`;
    } else {
      groups.push({ label: h.short, open: h.open, close: h.close });
    }
  }

  return groups;
}

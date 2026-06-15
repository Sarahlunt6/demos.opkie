/**
 * Sanitize the optional `?for=` personalization value (PRD 5).
 *
 * Rules: strip anything tag-like and stray angle brackets, collapse whitespace,
 * cap at 40 characters, and return null when there is nothing usable — so the
 * UI renders nothing at all rather than an empty or unsafe string.
 *
 * The value is also rendered as plain text by React (which escapes), so this is
 * defense in depth, not the only guard.
 */
const MAX_LENGTH = 40;

export function sanitizeFor(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw
    .replace(/<[^>]*>/g, "") // drop tag-like sequences
    .replace(/[<>]/g, "") // drop any remaining angle brackets
    .replace(/\s+/g, " ") // collapse whitespace
    .trim();
  if (!cleaned) return null;
  return cleaned.slice(0, MAX_LENGTH).trim();
}

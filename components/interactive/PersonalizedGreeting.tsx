"use client";

import { useEffect, useState } from "react";
import { sanitizeFor } from "@/lib/sanitize";

/**
 * Optional ?for= personalization line (PRD 4.1 #2 / 5). Read on the client and
 * sanitized so the page stays fully static (the hub's #1 mandate is to be the
 * fastest of the six sites, PRD 8) — the line renders into a slot the hero
 * reserves server-side, so there is zero layout shift. Renders nothing when the
 * value is absent or, after sanitizing, empty.
 */
export function PersonalizedGreeting() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("for");
    setName(sanitizeFor(raw));
  }, []);

  if (!name) return null;

  return <span className="label text-accent">Prepared for {name}</span>;
}

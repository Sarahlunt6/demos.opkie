import { NextResponse } from "next/server";
import { track } from "@vercel/analytics/server";
import { hubConfig } from "@/lib/hub.config";
import { sanitizeFor } from "@/lib/sanitize";

/**
 * Tracked demo redirect (PRD 4.2). Every "View the live site" button routes
 * through /go/[template]: the server fires an analytics event (so Opkie sees
 * which templates each prospect opened), then redirects to that template's live
 * demo. The optional ?for= value is sanitized and passed through to the demo.
 *
 * Unknown ids redirect home rather than erroring — these are shared sales links.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ template: string }> },
) {
  const { template: id } = await params;
  const template = hubConfig.templates.find((t) => t.id === id);

  if (!template) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const forParam = sanitizeFor(new URL(request.url).searchParams.get("for"));

  await track("demo_open", {
    template: id,
    name: template.name,
    ...(forParam ? { for: forParam } : {}),
  });

  const destination = new URL(template.demoUrl);
  if (forParam) destination.searchParams.set("for", forParam);

  return NextResponse.redirect(destination.toString(), 307);
}

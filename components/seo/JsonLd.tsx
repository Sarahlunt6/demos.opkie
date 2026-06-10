/**
 * Renders a JSON-LD <script>. Content is server-generated from config, so the
 * dangerouslySetInnerHTML payload is fully trusted.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

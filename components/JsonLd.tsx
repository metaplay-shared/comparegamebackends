// Renders a JSON-LD <script> for structured data (SEO/AEO).
// Pass a single schema object or an array of them.

export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      // Schema objects are built from trusted, in-repo data — no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

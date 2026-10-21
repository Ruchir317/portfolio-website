import { jsonLdString } from "@/lib/jsonld";

// Server-rendered structured data; jsonLdString escapes `<` so content can never close the script tag.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}

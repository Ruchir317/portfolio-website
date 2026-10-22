import { SITE_URL, WRITING_ENABLED } from "@/data/site";
import { allPosts } from "@/data/posts";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  if (!WRITING_ENABLED) return new Response("Not found", { status: 404 });
  const items = allPosts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}/writing/${p.slug}</link>
      <guid>${SITE_URL}/writing/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.summary)}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Ruchir Jadhav — Writing</title>
    <link>${SITE_URL}/writing</link>
    <description>Notes on how I build things.</description>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

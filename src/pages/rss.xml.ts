import type { APIRoute } from 'astro';
import { identity, posts } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const base = site?.href ?? 'https://example.com/';
  const items = posts
    .map(
      (p) =>
        `    <item>
      <title>${p.title}</title>
      <link>${base}blog/${p.slug}/</link>
      <guid>${base}blog/${p.slug}/</guid>
      <description>${p.summary}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${identity.name} — Writing</title>
    <link>${base}</link>
    <description>${identity.tagline}</description>
${items}
  </channel>
</rss>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
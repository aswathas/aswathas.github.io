import type { APIRoute } from 'astro';
import { projects, posts } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const base = site?.href ?? 'https://example.com/';
  const today = new Date().toISOString().slice(0, 10);

  const urls: [string, string][] = [
    ['/', '1.0'],
    ['/blog/', '0.8'],
    ['/lab/', '0.7'],
    ['/resume/', '0.9'],
    ['/media/', '0.6'],
    ['/contact/', '0.6'],
    ['/files/', '0.5'],
    ['/search/', '0.5'],
    ...projects.map((p) => [`/project/${p.slug}/`, '0.8'] as [string, string]),
    ...posts.map((p) => [`/blog/${p.slug}/`, '0.7'] as [string, string]),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ([path, priority]) => `  <url>
    <loc>${base.replace(/\/$/, '')}${path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
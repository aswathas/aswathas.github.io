import type { APIRoute } from 'astro';
import { identity, projects, education, languages, stats } from '../data/site';

// Plain-text résumé. Fetched by the print page and by anyone who prefers
// raw text over a PDF.

export const GET: APIRoute = () => {
  const line = (s = '') => `${s}\n`;
  const body = [
    line(identity.name),
    line(identity.tagline),
    line(`${identity.location}  ·  ${identity.handle}  ·  ${identity.email}`),
    line(identity.github),
    line(),
    'EDUCATION',
    ...education.flatMap((e) => [line(`  ${e.degree}`), line(`  ${e.school} — ${e.when}`), line()]),
    'SELECTED WORK',
    ...projects.flatMap((p) => [
      line(`  ${p.name} — ${p.language}`),
      line(`    ${p.description}`),
      line(`    ${p.url}`),
      line(),
    ]),
    'SKILLS',
    line(`  ${languages.join(', ')}`),
    line(),
    'AT A GLANCE',
    line(`  ${stats.repos} public repositories · ${stats.languages} languages · building since ${stats.since}`),
  ].join('');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
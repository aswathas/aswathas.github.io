import type { APIRoute } from 'astro';
import { identity, projects, posts } from '../data/site';

const site = 'https://aswathas-site.pages.dev';

export const GET: APIRoute = () => {
  const body = [
    `# ${identity.name}`,
    '',
    `> ${identity.tagline}`,
    '',
    `Canonical website: ${site}/`,
    `GitHub: ${identity.github}`,
    '',
    '## Start here',
    '',
    '- [Homepage](/): profile, shipped work, and current focus',
    '- [Writing](/blog/): notes',
    '- [Résumé](/resume/): experience, skills, and selected work',
    '- [Contact](/contact/): every channel',
    '',
    '## Projects',
    '',
    ...projects.map(
      (p) =>
        `- [${p.name}](${p.url}): ${p.description}\n  - Stack: ${p.language}\n  - Tags: ${p.tags.join(', ')}`,
    ),
    '',
    '## Writing',
    '',
    ...posts.map((p) => `- [${p.title}](/blog/${p.slug}/): ${p.summary}`),
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
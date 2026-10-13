import type { APIRoute } from 'astro';
import { projects, posts, archive } from '../data/site';

export const GET: APIRoute = () => {
  const items = [
    ...projects.map((p) => ({
      title: p.name,
      description: p.description,
      url: p.url,
      kind: 'project',
      tags: [p.name, p.language, ...p.tags, ...(p.repos ?? [])],
    })),
    ...archive.map((r) => ({
      title: r.name,
      description: r.description || `${r.language} project`,
      url: r.url,
      kind: 'project',
      tags: [r.name, r.language, ...r.topics],
    })),
    ...posts.map((p) => ({
      title: p.title,
      description: p.summary,
      url: `/blog/${p.slug}/`,
      kind: 'article',
      tags: ['writing', ...p.title.toLowerCase().split(/\s+/)],
    })),
  ];
  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
import type { APIRoute } from 'astro';
import { stats } from '../data/site';
import resume from '../data/resume.json';

// Plain-text résumé. Same content as /resume.pdf and the application DOCX —
// all three read src/data/resume.json.

export const GET: APIRoute = () => {
  const line = (s = '') => `${s}\n`;
  const body = [
    line(resume.name),
    line(resume.headline),
    ...resume.contact.map(line),
    line(),
    line('PROFILE'),
    line(resume.profile),
    line(),
    line('EDUCATION'),
    ...resume.education.flatMap((e) => [
      line(`  ${e.degree} | ${e.when}`),
      line(`  ${e.school} — ${e.detail}`),
      line(),
    ]),
    line('EXPERIENCE'),
    ...resume.experience.flatMap((e) => [
      line(`  ${e.role} — ${e.org} | ${e.when}`),
      ...e.points.map((p) => line(`    - ${p}`)),
      line(),
    ]),
    line('LEADERSHIP'),
    ...resume.leadership.flatMap((e) => [
      line(`  ${e.role} — ${e.org} | ${e.when}`),
      ...e.points.map((p) => line(`    - ${p}`)),
      line(),
    ]),
    line('SELECTED PROJECTS'),
    ...resume.projects.flatMap((p) => [
      line(`  ${p.title} | ${p.right}`),
      ...p.points.map((point) => line(`    - ${point}`)),
      line(),
    ]),
    line('SKILLS'),
    ...resume.skills.map((s) => line(`  ${s.label}: ${s.text}`)),
    line(),
    line('CERTIFICATIONS & HACKATHONS'),
    line(resume.certifications),
    line(),
    line('AT A GLANCE'),
    line(`  ${stats.repos} public repositories · ${stats.languages} languages · building since ${stats.since}`),
  ].join('');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

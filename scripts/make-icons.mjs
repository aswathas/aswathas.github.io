#!/usr/bin/env node
// Generates the site's SVG icons into public/projects/.
//
// The plate is original artwork drawn here. The mark inside it is a Lucide
// glyph (ISC licensed, node_modules/lucide-static) scaled off its 24px grid
// onto the plate, so the marks come from someone who draws icons for a
// living rather than from hand-placed shapes.
//
// Run: npm run icons

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '..', 'public', 'projects');
const lucide = join(here, '..', 'node_modules', 'lucide-static', 'icons');
mkdirSync(out, { recursive: true });

/** Inner markup of a Lucide icon, minus its own <svg> wrapper. */
const glyph = (name) =>
  readFileSync(join(lucide, `${name}.svg`), 'utf8')
    .replace(/<\?xml[^>]*\?>/, '')
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .replace(/\s+/g, ' ')
    .trim();

const plate = ({ from, to, icon, size = 62 }) => {
  const inset = (128 - size) / 2;
  const scale = size / 24;
  // Lucide strokes at width 2 on a 24 grid; keep the same optical weight.
  const body = glyph(icon).replace(/stroke-width="2"/g, `stroke-width="${(2 / scale).toFixed(2)}"`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" role="img" aria-label="${icon}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".2"/>
      <stop offset=".55" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="28" fill="url(#g)"/>
  <rect width="128" height="64" rx="28" fill="url(#sheen)"/>
  <rect x="1" y="1" width="126" height="126" rx="27" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="2"/>
  <g transform="translate(${inset} ${inset}) scale(${scale})" fill="none" stroke="#fff"
     stroke-linecap="round" stroke-linejoin="round" opacity=".95">${body}</g>
</svg>
`;
};

const apps = {
  axiom: { from: '#3b6fe0', to: '#7b4ae0', icon: 'shield-check' },
  coldtrust: { from: '#0b3d91', to: '#1f7ae0', icon: 'snowflake' },
  'attack-logs': { from: '#8f1d1d', to: '#e0483a', icon: 'triangle-alert' },
  'ai-brain': { from: '#c2417a', to: '#6d4ae0', icon: 'brain' },
  'olx-india-cli': { from: '#e0803a', to: '#d8452f', icon: 'terminal' },
  'forensic-tool': { from: '#4a2c9e', to: '#a8387f', icon: 'radar' },
  'love-lace': { from: '#c8102e', to: '#e0803a', icon: 'gem' },
  'chain-sentinel': { from: '#2c4fb8', to: '#117f94', icon: 'scan-search' },
  'chain-trace': { from: '#117f94', to: '#2bb3c4', icon: 'git-branch' },
  'evm-log-extractor': { from: '#4a2c9e', to: '#7b4ae0', icon: 'scroll-text' },
  'safe-pass': { from: '#0f9d76', to: '#2bb98a', icon: 'key-round' },
  'shrimp-ai': { from: '#d8452f', to: '#f0a929', icon: 'heart-pulse' },
  'the-analyst': { from: '#0f9d76', to: '#1f63c8', icon: 'bar-chart-3' },
  'agent-skills': { from: '#d8452f', to: '#f0a929', icon: 'blocks' },
  'healthcare-tracker': { from: '#e05c7a', to: '#c8102e', icon: 'stethoscope' },
  'block-auth': { from: '#117f94', to: '#3b6fe0', icon: 'lock' },
};

const dock = {
  files: { from: '#5b6b8c', to: '#8c9bb8', icon: 'folder-open' },
  lab: { from: '#0f9d76', to: '#37b98a', icon: 'flask-conical' },
  media: { from: '#a8387f', to: '#e05c7a', icon: 'image' },
  resume: { from: '#2c4fb8', to: '#5b8def', icon: 'file-text' },
  contact: { from: '#117f94', to: '#4fc3d9', icon: 'at-sign' },
  search: { from: '#3b6fe0', to: '#7bb0f5', icon: 'search' },
  writing: { from: '#d8452f', to: '#f0a929', icon: 'pen-line' },
  github: { from: '#16181d', to: '#3a3f4a', icon: 'git-branch' },
};

let n = 0;
for (const [slug, spec] of Object.entries({ ...apps, ...dock })) {
  writeFileSync(join(out, `${slug}.svg`), plate(spec));
  n++;
}
console.log(`wrote ${n} icons -> public/projects/`);

#!/usr/bin/env node
// Generates original SVG app icons into public/projects/<slug>.svg.
// Original artwork in the macOS-squircle idiom: rounded plate, two-stop
// gradient, one geometric mark. Run: npm run icons

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'projects');
mkdirSync(out, { recursive: true });

// 128×128 plate. Mark drawn inside a 48px box centred at (64,64).
const icons = {
  axiom: {
    from: '#3b6fe0',
    to: '#7b4ae0',
    // Stacked layers — an evidence stack.
    mark: `<g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M64 36 88 50 64 64 40 50Z"/><path d="M40 64l24 14 24-14"/><path d="M40 78l24 14 24-14"/></g>`,
  },
  'ai-brain': {
    from: '#c2417a',
    to: '#6d4ae0',
    // Three nodes and their links.
    mark: `<g stroke="#fff" stroke-width="5" fill="none">
      <path d="M44 50 64 40l20 10M44 50l-6 22m46-22 6 22M44 50h40" stroke-linecap="round"/>
      </g><g fill="#fff"><circle cx="44" cy="50" r="9"/><circle cx="64" cy="40" r="9"/><circle cx="84" cy="50" r="9"/><circle cx="38" cy="74" r="8"/><circle cx="90" cy="74" r="8"/></g>`,
  },
  'the-analyst': {
    from: '#0f9d76',
    to: '#1f63c8',
    mark: `<g fill="#fff"><rect x="36" y="66" width="14" height="26" rx="4"/><rect x="57" y="50" width="14" height="42" rx="4"/><rect x="78" y="36" width="14" height="56" rx="4"/></g>`,
  },
  'olx-india-cli': {
    from: '#e0803a',
    to: '#d8452f',
    mark: `<g fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round">
      <circle cx="58" cy="58" r="22"/><path d="m75 75 18 18"/></g>`,
  },
  'chain-sentinel': {
    from: '#2c4fb8',
    to: '#117f94',
    mark: `<path d="M64 32 96 46v30c0 20-14 30-32 38-18-8-32-18-32-38V46Z" fill="#fff" opacity=".95"/>
      <path d="M64 52v34M48 68h32" stroke="#2c4fb8" stroke-width="7" stroke-linecap="round"/>`,
  },
  'forensic-tool': {
    from: '#4a2c9e',
    to: '#a8387f',
    // Two interlocking links.
    mark: `<g fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round">
      <path d="M56 44h-6a16 16 0 0 0 0 32h10"/><path d="M72 84h6a16 16 0 0 0 0-32H68"/></g>`,
  },
  'love-lace': {
    from: '#c8102e',
    to: '#e0803a',
    // Faceted gem.
    mark: `<path d="M64 30 98 52 64 98 30 52Z" fill="#fff" opacity=".95"/>
      <path d="M30 52h68M64 30v68M44 52l20 46M84 52 64 98" stroke="#c8102e" stroke-width="4" fill="none"/>`,
  },
  'block-auth': {
    from: '#117f94',
    to: '#3b6fe0',
    // Padlock shackle over body.
    mark: `<g fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round">
      <path d="M46 60V50a18 18 0 0 1 36 0v10"/></g>
      <rect x="38" y="60" width="52" height="38" rx="9" fill="#fff"/>`,
  },
  'agent-skills': {
    from: '#d8452f',
    to: '#f0a929',
    // Terminal prompt.
    mark: `<rect x="30" y="38" width="68" height="52" rx="11" fill="none" stroke="#fff" stroke-width="7"/>
      <path d="m46 56 12 12-12 12M66 80h14" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  'healthcare-tracker': {
    from: '#e05c7a',
    to: '#c8102e',
    // Pulse line.
    mark: `<path d="M28 66h16l8-18 12 36 10-26 8 14h18" fill="none" stroke="#fff" stroke-width="8"
      stroke-linecap="round" stroke-linejoin="round"/>`,
  },
};

for (const [slug, { from, to, mark }] of Object.entries(icons)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" role="img" aria-label="${slug}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="28" fill="url(#g)"/>
  <rect x="1" y="1" width="126" height="126" rx="27" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="2"/>
  ${mark}
</svg>
`;
  writeFileSync(join(out, `${slug}.svg`), svg);
}

console.log(`wrote ${Object.keys(icons).length} icons -> public/projects/`);
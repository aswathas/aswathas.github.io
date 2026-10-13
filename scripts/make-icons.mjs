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

/* Dock items: the site's own pages, same idiom as the project plates. */
const dock = {
  files: {
    from: '#5b6b8c',
    to: '#8c9bb8',
    mark: `<g fill="#fff" opacity=".95"><path d="M34 44a5 5 0 0 1 5-5h18l6 7h26a5 5 0 0 1 5 5v33a5 5 0 0 1-5 5H39a5 5 0 0 1-5-5Z"/></g>`,
  },
  lab: {
    from: '#0f9d76',
    to: '#37b98a',
    mark: `<g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M52 34v22L38 84a7 7 0 0 0 6 10h40a7 7 0 0 0 6-10L76 56V34"/>
      <path d="M46 34h36"/><path d="M46 70h36" stroke-width="6"/></g>`,
  },
  media: {
    from: '#a8387f',
    to: '#e05c7a',
    mark: `<g fill="none" stroke="#fff" stroke-width="7" stroke-linejoin="round">
      <rect x="30" y="40" width="68" height="48" rx="8"/><path d="m38 78 16-18 12 13 10-11 14 16"/>
      <circle cx="74" cy="54" r="5" fill="#fff" stroke="none"/></g>`,
  },
  resume: {
    from: '#2c4fb8',
    to: '#5b8def',
    mark: `<g fill="#fff" opacity=".95"><rect x="40" y="30" width="48" height="68" rx="7"/>
      </g><g fill="#2c4fb8"><rect x="50" y="42" width="28" height="5" rx="2.5"/>
      <rect x="50" y="54" width="28" height="4" rx="2"/><rect x="50" y="64" width="18" height="4" rx="2"/></g>`,
  },
  contact: {
    from: '#117f94',
    to: '#4fc3d9',
    mark: `<g fill="none" stroke="#fff" stroke-width="7" stroke-linejoin="round">
      <rect x="26" y="44" width="76" height="48" rx="8"/><path d="m28 48 36 24 36-24"/></g>`,
  },
  search: {
    from: '#3b6fe0',
    to: '#7bb0f5',
    mark: `<g fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round">
      <circle cx="56" cy="56" r="22"/><path d="m73 73 20 20"/></g>`,
  },
  writing: {
    from: '#d8452f',
    to: '#f0a929',
    mark: `<g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M36 88 78 46l16 16-42 42H36Z"/><path d="m70 54 16 16"/></g>`,
  },
  github: {
    from: '#16181d',
    to: '#3a3f4a',
    mark: `<path d="M64 30a34 34 0 0 0-11 66c2 0 3-1 3-2v-9c-12 3-15-5-15-5-2-5-5-6-5-6-4-3 0-3 0-3 5 0 7 5 7 5 4 7 10 5 13 4 0-3 2-5 3-6-10-1-21-5-21-23 0-5 2-9 5-12-1-1-2-6 1-12 0 0 4-1 13 5a45 45 0 0 1 24 0c9-6 13-5 13-5 3 6 2 11 1 12 3 3 5 7 5 12 0 18-11 22-21 23 2 2 3 5 3 9v13c0 1 1 2 3 2A34 34 0 0 0 64 30Z" fill="#fff"/>`,
  },
};

for (const [slug, { from, to, mark }] of Object.entries(dock)) {
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

console.log(`wrote ${Object.keys(dock).length} dock icons`);
const more = {
  coldtrust: {
    from: '#0b3d91',
    to: '#1f7ae0',
    // Snowflake over a chain link.
    mark: `<g stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round">
      <path d="M64 34v60M40 49l48 30M88 49 40 79"/></g>
      <g fill="#fff"><circle cx="64" cy="34" r="4"/><circle cx="64" cy="94" r="4"/>
      <circle cx="40" cy="49" r="4"/><circle cx="88" cy="49" r="4"/>
      <circle cx="40" cy="79" r="4"/><circle cx="88" cy="79" r="4"/></g>`,
  },
  'attack-logs': {
    from: '#8f1d1d',
    to: '#e0483a',
    // Warning triangle over stacked log lines.
    mark: `<path d="M64 28 100 90H28Z" fill="#fff" opacity=".95"/>
      <rect x="60" y="52" width="8" height="20" rx="3" fill="#8f1d1d"/>
      <circle cx="64" cy="80" r="4.5" fill="#8f1d1d"/>`,
  },
  'chain-trace': {
    from: '#117f94',
    to: '#2bb3c4',
    // Three linked nodes tracing a path.
    mark: `<g fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round">
      <path d="M38 82 60 46l14 16 16-26"/></g>
      <g fill="#fff"><circle cx="38" cy="82" r="9"/><circle cx="60" cy="46" r="9"/>
      <circle cx="74" cy="62" r="9"/><circle cx="90" cy="36" r="9"/></g>`,
  },
  'evm-log-extractor': {
    from: '#4a2c9e',
    to: '#7b4ae0',
    // Document with an extraction arrow.
    mark: `<g fill="#fff" opacity=".95"><rect x="32" y="28" width="46" height="72" rx="7"/></g>
      <g fill="#4a2c9e"><rect x="42" y="42" width="26" height="5" rx="2.5"/>
      <rect x="42" y="54" width="26" height="5" rx="2.5"/><rect x="42" y="66" width="16" height="5" rx="2.5"/></g>
      <path d="M84 78h22M96 68l10 10-10 10" stroke="#fff" stroke-width="7" fill="none"
        stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  'safe-pass': {
    from: '#0f9d76',
    to: '#2bb98a',
    // Shield with a check.
    mark: `<path d="M64 28 96 42v28c0 20-14 30-32 38-18-8-32-18-32-38V42Z" fill="#fff" opacity=".95"/>
      <path d="m50 64 10 10 20-22" fill="none" stroke="#0f9d76" stroke-width="8"
        stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  'shrimp-ai': {
    from: '#d8452f',
    to: '#f0a929',
    // Sensor wave over a droplet.
    mark: `<path d="M64 30c14 18 22 28 22 40a22 22 0 1 1-44 0c0-12 8-22 22-40Z" fill="#fff" opacity=".95"/>
      <g fill="none" stroke="#d8452f" stroke-width="6" stroke-linecap="round">
      <path d="M48 62a16 16 0 0 0 0 16M80 62a16 16 0 0 1 0 16"/></g>`,
  },
};

for (const [slug, { from, to, mark }] of Object.entries(more)) {
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

console.log(`wrote ${Object.keys(more).length} more icons`);
// Single source of truth for identity and content.
//
// Projects: curated by hand (see `featured` order). Raw GitHub data lives in
// projects.json, regenerated with `npm run sync` — that file is the archive
// source and the input to the live star counts, not the order of the page.

import raw from './projects.json';

export const identity = {
  name: 'Aswath AS',
  handle: 'aswathas',
  github: 'https://github.com/aswathas',
  instagram: 'https://instagram.com/aswath_ig',
  // TODO: other links — do not guess these
  x: '',
  linkedin: '',
  // TODO: real links
  email: 'aswathas13@gmail.com',
  location: 'India',
  tagline: 'Engineer from India. Building AI, blockchain forensics, and developer tools.',
  bio: 'I build AI agents, blockchain forensics tooling, and developer utilities — mostly TypeScript and Python.',
};

export type Project = {
  name: string;
  description: string;
  language: string;
  url: string;
  tags: string[];
  /** One flag. The AI Brain family is one project across four repositories. */
  repos?: string[];
};

// Ordered by hand: strongest work first, not by star count.
export const projects: Project[] = [
  {
    name: 'axiom',
    description:
      'Evidence-grounded clinical intelligence layer for EMRs. Calibrated refusal when the record does not support the claim.',
    language: 'Python',
    url: 'https://github.com/aswathas/axiom',
    tags: ['AI', 'clinical', 'Python', 'LLM', 'evidence'],
  },
  {
    name: 'AI Brain',
    description:
      'Local-first personal wiki that evolves with you. A library plus a CLI and an Electron desktop app for Claude Code, Hermes, and any LLM provider.',
    language: 'TypeScript',
    url: 'https://github.com/aswathas/second-brain',
    tags: ['AI', 'knowledge', 'wiki', 'CLI', 'Electron', 'LLM'],
    repos: ['second-brain', 'ai-brain', 'ai-brain-cli', 'ai-brain-desktop'],
  },
  {
    name: 'the-analyst',
    description:
      'Semester exam intelligence — Data Science, Cloud Computing, Compiler Design and three more subjects decoded.',
    language: 'TypeScript',
    url: 'https://github.com/aswathas/the-analyst',
    tags: ['TypeScript', 'study', 'reference'],
  },
  {
    name: 'OLX India CLI',
    description:
      'OLX India car search CLI and web app. Search, score, and track second-hand cars with AI.',
    language: 'TypeScript',
    url: 'https://github.com/aswathas/olx-india-cli',
    tags: ['TypeScript', 'CLI', 'AI'],
  },
  {
    name: 'ChainSentinel',
    description: 'EVM blockchain forensics tool. Investigate on-chain exploits end to end.',
    language: 'Solidity',
    url: 'https://github.com/aswathas/Project-Hail-Mary',
    tags: ['EVM', 'forensics', 'Solidity', 'security'],
  },
  {
    name: 'ForensicToolW3',
    description:
      'Enterprise-grade EVM forensics investigation dashboard. React 19 front end, Express API, and an Ollama copilot over simulated exploit evidence.',
    language: 'TypeScript',
    url: 'https://github.com/aswathas/ForensicToolW3',
    tags: ['EVM', 'forensics', 'React', 'Ollama', 'dashboard'],
  },
  {
    name: 'Love Lace',
    description:
      'Blockchain cross-border payments and invoicing on Celo. React, Remix, Solidity, MetaMask, and LLM-assisted workflows.',
    language: 'JavaScript',
    url: 'https://github.com/aswathas/borderpayment',
    tags: ['blockchain', 'Celo', 'payments', 'Solidity', 'React'],
  },
  {
    name: 'BlockAuth',
    description: 'Secure blockchain-based authentication system.',
    language: 'JavaScript',
    url: 'https://github.com/aswathas/Safe_Passfortest',
    tags: ['auth', 'blockchain', 'security'],
  },
  {
    name: 'agent-skills',
    description: 'Claude Code CLI skills for deep learning, exam prep, and knowledge work.',
    language: 'JavaScript',
    url: 'https://github.com/aswathas/agent-skills',
    tags: ['agents', 'Claude Code', 'skills'],
  },
  {
    name: 'Healthcare Tracker',
    description:
      'Next.js and Supabase health management app — conditions, medications, test results, appointments, and goals in one dashboard.',
    language: 'TypeScript',
    url: 'https://github.com/aswathas/health-lovely',
    tags: ['Next.js', 'Supabase', 'health', 'TypeScript'],
  },
];

const featuredRepos = new Set(projects.flatMap((p) => p.repos ?? [p.name]));

/** Everything synced from GitHub that is not featured. Sorted by last push. */
export const archive = raw.projects
  .filter((r) => !featuredRepos.has(r.name))
  .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));

export const languages = [
  ...new Set(raw.projects.map((r) => r.language).filter((l) => l !== '—')),
].sort((a, b) => raw.projects.filter((r) => r.language === b).length - raw.projects.filter((r) => r.language === a).length);

// Hero stats. Derived from projects.json so `npm run sync` keeps them honest.
export const stats = {
  repos: raw.count,
  languages: languages.length,
  since: raw.projects.reduce((y, r) => Math.min(y, Number(r.createdAt.slice(0, 4))), 9999),
};

// TODO: replace with real education.
export const education: { school: string; degree: string; when: string; detail: string }[] = [
  { school: 'TODO — college', degree: 'TODO — branch', when: 'TODO — years', detail: '' },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string;
};

// TODO: replace with real writing.
export const posts: Post[] = [
  {
    slug: 'hello-world',
    title: 'Hello world',
    date: '2026-10-14',
    summary: 'Why this site looks like a desktop, and what is actually running under the skin.',
    body: [
      'This site is a static Astro build served through Cloudflare. There is no framework in the browser — no React, no Vue, no Solid. One page hydrates an island; everything else is vanilla JavaScript in a few kilobytes.',
      'The desktop metaphor is real CSS. The menubar, the window chrome, the dock magnification — all of it is layout and a little pointer math. Nothing is a screenshot, nothing is a canvas.',
      'The numbers you see for stars and downloads are not baked into the HTML. They come from an edge function that reads the GitHub API at request time.',
    ].join('\n\n'),
  },
];

export const nav = [
  { label: 'Work', href: '/', glyph: '⌂' },
  { label: 'Writing', href: '/blog/', glyph: '✎' },
  { label: 'Résumé', href: '/resume/', glyph: '☰' },
  { label: 'Media', href: '/media/', glyph: '▣' },
  { label: 'Contact', href: '/contact/', glyph: '✉' },
  { label: 'Search', href: '/search/', glyph: '⌕' },
];
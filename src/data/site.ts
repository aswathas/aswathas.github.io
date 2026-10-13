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
  location: 'Chennai, India',
  tagline: 'I build across AI, Web3, finance, and security.',
  bio: 'Final-year CSE at SRMIST. I build across AI, Web3, finance, and security — clinical intelligence, on-chain forensics, cross-border payments, and the tooling around them.',
};

export type Project = {
  name: string;
  slug: string;
  description: string;
  language: string;
  url: string;
  tags: string[];
  /** One flag. The AI Brain family is one project across four repositories. */
  repos?: string[];
  /** Inspector panel rows. Anything null is omitted rather than shown empty. */
  kind?: string;
  status?: string;
  runsOn?: string;
  /** Three figures under the inspector, e.g. ['646', 'languages']. */
  highlights?: [string, string][];
  /** Collapsible section body. */
  capabilities?: { title: string; body: string }[];
  /** Short line under the name. Omitted when absent — never a copy of the description. */
  tagline?: string;
  /** Screenshot URLs, opened in the preview dialog. */
  gallery?: { src: string; caption: string }[];
  /** Key/value table, e.g. a comparison. */
  table?: { head: string[]; rows: string[][] };
};

const slug = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Ordered by hand: strongest work first, not by star count.
export const projects: Project[] = [
  {
    name: 'axiom',
    slug: slug('axiom'),
    description:
      'Evidence-grounded clinical intelligence layer for EMRs. Calibrated refusal when the record does not support the claim.',
    language: 'Python',
    url: 'https://github.com/aswathas/axiom',
    tags: ['AI', 'clinical', 'Python', 'LLM', 'evidence'],
    kind: 'Clinical AI',
    status: 'In development',
    runsOn: 'Python 3.11+, any LLM provider',
    capabilities: [
      {
        title: 'Evidence-grounded by default',
        body: 'Answers cite the record they came from. When the chart does not support a claim, axiom refuses instead of guessing.',
      },
      {
        title: 'Calibrated, not confident',
        body: 'Confidence is scored against what the record actually shows, so a hedged answer and a certain one look different.',
      },
    ],
  },
  {
    name: 'AI Brain',
    slug: slug('ai-brain'),
    description:
      'Local-first personal wiki that evolves with you. A library plus a CLI and an Electron desktop app for Claude Code, Hermes, and any LLM provider.',
    language: 'TypeScript',
    url: 'https://github.com/aswathas/second-brain',
    tags: ['AI', 'knowledge', 'wiki', 'CLI', 'Electron', 'LLM'],
    repos: ['second-brain', 'ai-brain', 'ai-brain-cli', 'ai-brain-desktop'],
    kind: 'Developer tool',
    status: 'Live',
    runsOn: 'macOS, Linux, Windows',
    capabilities: [
      {
        title: 'One library, three surfaces',
        body: 'The same wiki core behind a CLI, an Electron desktop app, and a template you drop into any agent runtime.',
      },
      {
        title: 'Local-first',
        body: 'Your notes live on your machine. Providers are pluggable, and nothing is uploaded unless you send it.',
      },
    ],
  },
  {
    name: 'the-analyst',
    slug: slug('the-analyst'),
    description:
      'Semester exam intelligence — Data Science, Cloud Computing, Compiler Design and three more subjects decoded.',
    language: 'TypeScript',
    url: 'https://github.com/aswathas/the-analyst',
    tags: ['TypeScript', 'study', 'reference'],
    kind: 'Study tool',
    status: 'Live',
    capabilities: [
      {
        title: 'Six subjects, one place',
        body: 'Data Science, Cloud Computing, Compiler Design and three more, structured so you can revise by topic instead of by chapter.',
      },
    ],
  },
  {
    name: 'OLX India CLI',
    slug: slug('olx-india-cli'),
    description:
      'OLX India car search CLI and web app. Search, score, and track second-hand cars with AI.',
    language: 'TypeScript',
    url: 'https://github.com/aswathas/olx-india-cli',
    tags: ['TypeScript', 'CLI', 'AI'],
    kind: 'CLI + web app',
    status: 'Live',
    runsOn: 'Node 18+, terminal or browser',
    capabilities: [
      {
        title: 'Search from the terminal',
        body: 'Query, filter, and sort listings without leaving the shell. Same index, two front ends.',
      },
      {
        title: 'Scored, not sorted',
        body: 'AI scores each listing on price, age, and listing quality so you compare cars instead of tabs.',
      },
    ],
  },
  {
    name: 'ChainSentinel',
    slug: slug('chain-sentinel'),
    description: 'EVM blockchain forensics tool. Investigate on-chain exploits end to end.',
    language: 'Solidity',
    url: 'https://github.com/aswathas/Project-Hail-Mary',
    tags: ['EVM', 'forensics', 'Solidity', 'security'],
    kind: 'Forensics tool',
    status: 'In development',
    runsOn: 'Any EVM chain',
    capabilities: [
      {
        title: 'Exploit-first, not alert-first',
        body: 'Start from a documented attack pattern and trace it through real transaction traces instead of waiting for an alarm.',
      },
    ],
  },
  {
    name: 'ForensicToolW3',
    slug: slug('forensic-tool'),
    description:
      'Enterprise-grade EVM forensics investigation dashboard. React 19 front end, Express API, and an Ollama copilot over simulated exploit evidence.',
    language: 'TypeScript',
    url: 'https://github.com/aswathas/ForensicToolW3',
    tags: ['EVM', 'forensics', 'React', 'Ollama', 'dashboard'],
    kind: 'Investigation dashboard',
    status: 'In development',
    runsOn: 'Node 18+, local Ollama',
    capabilities: [
      {
        title: 'Full pipeline in one command',
        body: 'Simulation, forensics, backend API, and front end run end to end from a single demo script.',
      },
      {
        title: 'A copilot that sees the evidence',
        body: 'The Ollama assistant is grounded in the forensic JSON the pipeline produced, so answers trace back to artifacts.',
      },
    ],
  },
  {
    name: 'Love Lace',
    slug: slug('love-lace'),
    description:
      'Blockchain cross-border payments and invoicing on Celo. React, Remix, Solidity, MetaMask, and LLM-assisted workflows.',
    language: 'JavaScript',
    url: 'https://github.com/aswathas/borderpayment',
    tags: ['blockchain', 'Celo', 'payments', 'Solidity', 'React'],
    kind: 'Payments platform',
    status: 'Hackathon build',
    runsOn: 'Web, Celo Alfajoes testnet',
    capabilities: [
      {
        title: 'Cross-border without the correspondent',
        body: 'Settlement on Celo removes the chain of intermediaries that makes small international transfers expensive.',
      },
      {
        title: 'Invoicing built in',
        body: 'Invoices and payments share one model, with an LLM in the loop for the parts a human would otherwise retype.',
      },
    ],
  },
  {
    name: 'BlockAuth',
    slug: slug('block-auth'),
    description: 'Secure blockchain-based authentication system.',
    language: 'JavaScript',
    url: 'https://github.com/aswathas/Safe_Passfortest',
    tags: ['auth', 'blockchain', 'security'],
    kind: 'Authentication system',
    status: 'Prototype',
    capabilities: [
      {
        title: 'Identity you can prove',
        body: 'Authentication state anchored on-chain, so a compromised session store is not enough to impersonate you.',
      },
    ],
  },
  {
    name: 'agent-skills',
    slug: slug('agent-skills'),
    description: 'Claude Code CLI skills for deep learning, exam prep, and knowledge work.',
    language: 'JavaScript',
    url: 'https://github.com/aswathas/agent-skills',
    tags: ['agents', 'Claude Code', 'skills'],
    kind: 'Agent skill pack',
    status: 'Live',
    runsOn: 'Claude Code CLI',
    capabilities: [
      {
        title: 'Skills, not prompts',
        body: 'Installable skill definitions that teach a CLI agent how to handle coursework and long-form study material.',
      },
    ],
  },
  {
    name: 'Healthcare Tracker',
    slug: slug('healthcare-tracker'),
    description:
      'Next.js and Supabase health management app — conditions, medications, test results, appointments, and goals in one dashboard.',
    language: 'TypeScript',
    url: 'https://github.com/aswathas/health-lovely',
    tags: ['Next.js', 'Supabase', 'health', 'TypeScript'],
    kind: 'Health management app',
    status: 'Live',
    runsOn: 'Web, Supabase backend',
    capabilities: [
      {
        title: 'One dashboard for the whole record',
        body: 'Conditions, medications, test results, appointments, and goals in a single view instead of five.',
      },
      {
        title: 'Built on a real backend',
        body: 'Next.js and Supabase with migrations, so the data model is versioned rather than trapped in local storage.',
      },
    ],
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

// TODO: add expected graduation year once confirmed.
export const education: { school: string; degree: string; when: string; detail: string }[] = [
  {
    school: 'SRM Institute of Science and Technology, Kattankulathur',
    degree: 'B.Tech — Computer Science and Engineering',
    when: '4th year',
    detail: '',
  },
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
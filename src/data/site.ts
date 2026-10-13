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
  email: 'aswathas@20.com',
  phone: '+91 6382974762',
  portfolio: 'https://hellokity.vercel.app/',
  title: 'AI Developer',
  location: 'Chennai, India',
  tagline: 'I build across AI, Web3, finance, and security.',
  // Profile paragraph, verbatim from the user's résumé.
  bio: 'Computer Science undergraduate (final year, SRMIST) with hands-on full-stack experience in AI and Web3 development. Won multiple national-level hackathons and freelanced client projects. Comfortable analysing financial statements and key metrics.',
  tagline: 'I build across AI, Web3, finance, and security.',
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
    name: 'ColdTrust',
    slug: 'coldtrust',
    description:
      'Enterprise cold-chain traceability and smart-contract enforcement on Hyperledger Fabric 2.5 LTS. Go chaincode, Raft consensus, CouchDB world state, React 18 dashboard.',
    language: 'TypeScript',
    url: 'https://github.com/aswathas/ColdTrust-Hyperledger-Fabric-Smart-Contract',
    tags: ['Hyperledger Fabric', 'Go', 'supply chain', 'React', 'CouchDB'],
    kind: 'Supply-chain platform',
    status: 'In development',
    runsOn: 'Hyperledger Fabric 2.5, Kubernetes',
    capabilities: [
      {
        title: 'Permissioned, not public',
        body: 'Raft consensus and CouchDB world state mean only approved organisations write to the ledger, which is what a regulated cold chain actually needs.',
      },
      {
        title: 'Enforcement, not just records',
        body: 'Chaincode rejects a shipment that violates its policy instead of logging the violation after the fact.',
      },
      {
        title: 'Verified, not asserted',
        body: 'Eleven integration tests cover the whole path, so the claim is checkable rather than a badge.',
      },
    ],
  },
  {
    name: 'AttackLogs',
    slug: 'attack-logs',
    description:
      'EVM attack simulation dataset — 36 documented smart-contract exploits running on a local chain, producing forensic-grade NDJSON that matches a published schema.',
    language: 'Solidity',
    url: 'https://github.com/aswathas/AttackLogs',
    tags: ['EVM', 'dataset', 'Solidity', 'Foundry', 'forensics'],
    kind: 'Dataset',
    status: 'Live',
    runsOn: 'Local Anvil chain, Foundry',
    capabilities: [
      {
        title: 'Ground truth, not scraped logs',
        body: 'Every attack is a reproducible simulation with the source code and validation files beside it, so you know exactly which transactions are malicious.',
      },
      {
        title: 'Built to benchmark against',
        body: 'Train a detector or test a rule-based engine against known attack classes without touching mainnet.',
      },
    ],
  },
  {
    name: 'ChainTrace',
    slug: 'chain-trace',
    description:
      'Open-source, self-hostable multi-chain blockchain forensics. Trace stolen funds across chains.',
    language: 'HTML',
    url: 'https://github.com/aswathas/chaintrace',
    tags: ['forensics', 'blockchain', 'self-hosted', 'security'],
    kind: 'Forensics tool',
    status: 'Live',
    capabilities: [
      {
        title: 'Self-hosted on purpose',
        body: 'Investigation data never leaves your infrastructure, which is usually the first requirement in this field.',
      },
      {
        title: 'Follow the money, not the alert',
        body: 'Start from a wallet and follow transfers across chains instead of reacting to a flagged transaction.',
      },
    ],
  },
  {
    name: 'EVM Log Extractor',
    slug: 'evm-log-extractor',
    description:
      'Forensics-grade EVM log extractor, normaliser, and decoder for any JSON-RPC endpoint. Checksummed addresses, wei as decimal strings, flat NDJSON.',
    language: 'Python',
    url: 'https://github.com/aswathas/evm-log-extractor',
    tags: ['EVM', 'forensics', 'Python', 'NDJSON', 'Foundry'],
    kind: 'CLI toolchain',
    status: 'Live',
    runsOn: 'Python 3, any EVM JSON-RPC endpoint',
    capabilities: [
      {
        title: 'Three stages, each replayable',
        body: 'Extract, normalise, decode. Each writes its own NDJSON, so a decode bug never means re-scanning a chain.',
      },
      {
        title: 'Correct by construction',
        body: 'EIP-55 checksummed addresses and wei as decimal strings — the two things that quietly corrupt downstream analysis.',
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
    name: 'SafePass',
    slug: 'safe-pass',
    description: 'A better alternative for OTP — one-time passwords anchored on-chain instead of a shared SMS gateway.',
    language: 'JavaScript',
    url: 'https://github.com/aswathas/Safe_Passfortest',
    tags: ['OTP', 'auth', 'blockchain', 'security'],
    kind: 'Authentication system',
    status: 'Prototype',
    capabilities: [
      {
        title: 'The SMS code has a weak point',
        body: 'One-time passwords over SMS are readable in transit and expensive to send. SafePass anchors the challenge on-chain instead.',
      },
      {
        title: 'Replay stops mattering',
        body: 'Because the challenge is a chain state, using it twice is visibly wrong rather than silently accepted.',
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

export const education: { school: string; degree: string; when: string; detail: string }[] = [
  {
    school: 'SRM Institute of Science and Technology, Kattankulathur',
    degree: 'B.Tech — Computer Science and Engineering, Blockchain specialisation',
    when: '2023 — 2027',
    detail: '',
  },
];

// From the résumé. Checked by the user, not inferred.
export const experience: { role: string; org: string; when: string; points: string[] }[] = [
  {
    role: 'Web3 Developer',
    org: 'SISA Infosec',
    when: 'Aug 2025 — present',
    points: [
      'Working on a Web3 security framework.',
      'Simulation and testing of stablecoin workflows.',
      'Web3 attack vectors — compliance, monitoring, and mitigation.',
    ],
  },
];

export const skills = [
  'ReactJS', 'NextJS', 'TailwindCSS', 'FastAPI', 'PostgreSQL',
  'Solidity', 'Hardhat', 'Web3', 'Agno', 'LangChain', 'Financial reporting',
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

// Dock order. `icon` names a file in public/projects/.
export const nav = [
  { label: 'Work', href: '/', icon: 'files' },
  { label: 'Lab', href: '/lab/', icon: 'lab' },
  { label: 'Media', href: '/media/', icon: 'media' },
  { label: 'Résumé', href: '/resume/', icon: 'resume' },
  { label: 'Contact', href: '/contact/', icon: 'contact' },
  { label: 'Search', href: '/search/', icon: 'search' },
  { label: 'Writing', href: '/blog/', icon: 'writing' },
];
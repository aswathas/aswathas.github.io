#!/usr/bin/env node
// Pulls each featured project's README into src/data/readmes.json.
// Only runs manually: npm run sync:readmes

import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HANDLE = process.env.GH_HANDLE ?? 'aswathas';
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'readmes.json');

// Display slug -> repository holding its README. Where a family spans several
// repos, pick whichever one actually documents the work.
const REPOS = {
  axiom: 'axiom',
  'ai-brain': 'second-brain-template',
  'the-analyst': 'the-analyst',
  'olx-india-cli': 'olx-india-cli',
  'chain-sentinel': 'Project-Hail-Mary',
  'forensic-tool': 'ForensicToolW3',
  'love-lace': 'borderpayment',
  'block-auth': 'Safe_Passfortest',
  'agent-skills': 'agent-skills',
  'healthcare-tracker': 'health-lovely',
  coldtrust: 'ColdTrust-Hyperledger-Fabric-Smart-Contract',
  'attack-logs': 'AttackLogs',
  'evm-log-extractor': 'evm-log-extractor',
  'chain-trace': 'chaintrace',
  'shrimp-ai': 'shrimp-git',
};

const gh = (args) =>
  JSON.parse(execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 1 << 26 }));

const result = {};
for (const [slug, repo] of Object.entries(REPOS)) {
  try {
    const r = gh(['api', `repos/${HANDLE}/${repo}/readme`]);
    const markdown = Buffer.from(r.content, 'base64').toString('utf8');
    result[slug] = {
      repo,
      markdown,
      bytes: Buffer.byteLength(markdown),
      updated: r.html_url,
    };
    console.log(`${slug.padEnd(20)} ${String(markdown.length).padStart(7)} chars  ${repo}`);
  } catch {
    console.log(`${slug.padEnd(20)} no README          ${repo}`);
    result[slug] = { repo, markdown: '', bytes: 0 };
  }
}

writeFileSync(out, JSON.stringify(result, null, 2) + '\n');
console.log(`\nwrote src/data/readmes.json`);
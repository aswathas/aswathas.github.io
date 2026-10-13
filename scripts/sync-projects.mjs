#!/usr/bin/env node
// Regenerates src/data/projects.json from the GitHub API via `gh`.
// Run manually: npm run sync   (not part of the build — no token needed at build time)

import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HANDLE = process.env.GH_HANDLE ?? 'aswathas';
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'projects.json');

// Noise: forks, scratch files, coursework dumps with nothing to show.
const DENY = new Set([
  'test', 'testfor1', 'indirect', 'C-C---Projects', 'DSA', 'todo', 'frontend',
  'aiwebsite', 'lunggggg', 'web3-forensics-research',
  'executive-assistant', 'Aswath-Obsidian-Mountain-Den', 'adminabusesim_storyline-1',
]);

// Named projects that carry no GitHub description but belong on the site.
const ALLOW = new Set([
  'ForensicToolW3', 'health-lovely', 'Stripe-Stablecoin-', 'borderpayment',
  'Safe_Passfortest', 'ColdTrust-Hyperledger-Fabric-Smart-Contract', 'shrimp-git',
  'web3-forensics-research',
]);

const gh = (args) => JSON.parse(execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 1 << 26 }));

const repos = gh(['repo', 'list', HANDLE, '--limit', '200', '--json',
  'name,description,stargazerCount,primaryLanguage,pushedAt,createdAt,url,isFork,isArchived,homepageUrl,repositoryTopics,licenseInfo,diskUsage,openGraphImageUrl']);

const kept = repos
  .filter((r) => !r.isFork && !r.isArchived && !DENY.has(r.name.trim()))
  .filter((r) => ALLOW.has(r.name) || (r.description ?? '').trim() || r.stargazerCount > 0 || r.repositoryTopics?.length)
  .map((r) => ({
    name: r.name,
    description: (r.description ?? '').trim(),
    stars: r.stargazerCount,
    language: r.primaryLanguage?.name ?? '—',
    url: r.homepageUrl?.trim() || r.url,
    repo: r.url,
    topics: (r.repositoryTopics ?? []).map((t) => t.name),
    license: r.licenseInfo?.spdxId && r.licenseInfo.spdxId !== 'NOASSERTION' ? r.licenseInfo.spdxId : null,
    image: r.openGraphImageUrl || null,
    createdAt: r.createdAt.slice(0, 10),
    pushedAt: r.pushedAt.slice(0, 10),
  }))
  .sort((a, b) => b.stars - a.stars || b.pushedAt.localeCompare(a.pushedAt));

const today = new Date().toISOString().slice(0, 10);
writeFileSync(out, JSON.stringify({ handle: HANDLE, syncedAt: today, count: kept.length, projects: kept }, null, 2) + '\n');
console.log(`wrote ${kept.length} projects -> src/data/projects.json`);
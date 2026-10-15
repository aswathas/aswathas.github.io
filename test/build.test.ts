// Guards the build output against the defects this site actually shipped.
//
// Every assertion here corresponds to a bug that reached production. The site had
// no og:image at all; astro.config.mjs had no `site`, so canonical and og:url
// rendered as http://localhost:4321 and the JSON-LD claimed the site was
// example.com; llms.txt.ts hardcoded the same placeholder. None of those failed a
// build, because a build only proves the code compiled.
//
// Run: npm run build && node --experimental-strip-types --test test/build.test.ts

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const SITE = 'https://aswathas-site.pages.dev';
const dist = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

const read = (p: string) => readFileSync(`${dist}${p}`, 'utf8');
const has = (p: string) => existsSync(`${dist}${p}`);

test('the OG image is actually shipped', () => {
  // LinkedIn will not render a preview card from a missing file, and no build
  // step notices a referenced asset that was never committed.
  assert.ok(has('og.png'), 'dist/og.png must exist — og:image points at it');
  const png = readFileSync(`${dist}og.png`);
  assert.equal(png.subarray(1, 4).toString(), 'PNG', 'og.png must be a real PNG, not a placeholder');
});

test('no page leaks a localhost or placeholder origin', () => {
  const pages = ['index.html', 'project/axiom/index.html', 'blog/hello-world/index.html', 'resume/index.html'];
  for (const page of pages) {
    assert.ok(has(page), `${page} must be built`);
    const html = read(page);
    assert.ok(!html.includes('localhost'), `${page} leaks localhost`);
    assert.ok(!html.includes('example.com'), `${page} leaks the example.com placeholder`);
  }
});

test('canonical and og:url are absolute production URLs', () => {
  const html = read('project/axiom/index.html');
  assert.match(html, new RegExp(`<link rel="canonical" href="${SITE}/project/axiom/">`));
  assert.match(html, new RegExp(`<meta property="og:url" content="${SITE}/project/axiom/">`));
});

test('structured data names the real site', () => {
  // With `site` unset, the JSON-LD fell back to https://example.com/ and told
  // search engines this person is example.com.
  const html = read('index.html');
  assert.match(html, new RegExp(`"@id":"${SITE}/#person"`));
  assert.ok(!html.includes('example.com'), 'JSON-LD must not fall back to the placeholder');
});

test('the agent-facing index points at the real domain', () => {
  // llms.txt is what an AI agent reads. A placeholder here sends every agent
  // to a domain that does not exist.
  const llms = read('llms.txt');
  assert.ok(llms.includes(`Canonical website: ${SITE}/`), 'llms.txt must name the real site');
});

test('every shareable page carries a social preview card', () => {
  for (const page of ['index.html', 'project/axiom/index.html', 'blog/hello-world/index.html']) {
    const html = read(page);
    assert.match(html, /<meta property="og:image" content="https:\/\//, `${page} needs an absolute og:image`);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image"/, `${page} needs twitter:card`);
  }
});

test('per-route descriptions are not all the site tagline', () => {
  // A project page and a blog post that describe themselves with the homepage
  // tagline are pages whose previews say nothing.
  const tagline = /<meta name="description" content="[^"]+">/;
  const home = read('index.html').match(tagline)?.[0];
  const project = read('project/axiom/index.html').match(tagline)?.[0];
  const post = read('blog/hello-world/index.html').match(tagline)?.[0];
  assert.ok(home && project && post, 'all three pages must have a description');
  assert.notEqual(home, project, 'a project page must not reuse the homepage description');
  assert.notEqual(home, post, 'a blog post must not reuse the homepage description');
});

test('the hero portrait is not lazy-loaded', () => {
  // It is the LCP element. Lazy-loading it delays the one image the page is
  // judged by — an attempt that was tried and abandoned.
  const html = read('index.html');
  assert.match(html, /fetchpriority="high"/, 'the hero portrait must be marked high priority');
});
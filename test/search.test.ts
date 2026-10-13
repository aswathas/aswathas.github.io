import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterItems, type SearchItem } from '../src/lib/search.ts';

const items: SearchItem[] = [
  { title: 'axiom', description: 'Clinical intelligence', kind: 'project', tags: ['Python', 'AI'] },
  { title: 'ChainTrace', description: 'Blockchain forensics', kind: 'project', tags: ['security'] },
  { title: 'Hello world', description: 'Why this site looks like a desktop', kind: 'article', tags: ['writing'] },
];

test('empty query with kind=all returns everything', () => {
  assert.equal(filterItems(items, '   ').length, 3);
});

test('matches title, description and tags', () => {
  assert.equal(filterItems(items, 'clinical')[0].title, 'axiom');
  assert.equal(filterItems(items, 'forensics')[0].title, 'ChainTrace');
  assert.equal(filterItems(items, 'Python')[0].title, 'axiom');
});

test('is case-insensitive', () => {
  assert.equal(filterItems(items, 'CHAINTRACE').length, 1);
});

test('multiple terms are ANDed', () => {
  assert.equal(filterItems(items, 'clinical python').length, 1);
  assert.equal(filterItems(items, 'clinical blockchain').length, 0);
});

test('kind narrows to one type', () => {
  assert.deepEqual(filterItems(items, '', 'article').map((i) => i.title), ['Hello world']);
  assert.deepEqual(filterItems(items, '', 'project').map((i) => i.title), ['axiom', 'ChainTrace']);
});

test('unknown kind matches nothing rather than everything', () => {
  assert.equal(filterItems(items, '', 'nope').length, 0);
});
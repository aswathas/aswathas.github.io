export type SearchItem = {
  title: string;
  description: string;
  tags: string[];
  kind: string;
};

// Substring AND over title + description + tags — the same rule palash.dev uses.
export function filterItems(all: SearchItem[], query: string, kind = 'all'): SearchItem[] {
  const terms = String(query).toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return all.filter(
    (item) =>
      (kind === 'all' || item.kind === kind) &&
      terms.every((t) =>
        `${item.title} ${item.description} ${item.tags.join(' ')}`.toLocaleLowerCase().includes(t),
      ),
  );
}
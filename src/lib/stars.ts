// Fills every [data-repo="<repo>"] span with live star counts from the edge function.
// Safe to call on any page; a no-op when /api/live.json is unavailable (local dev).

export function syncStars() {
  fetch('/api/live.json', { signal: AbortSignal.timeout(8000) })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((d: { projects?: Record<string, { stars: number }> }) => {
      for (const [repo, v] of Object.entries(d.projects ?? {})) {
        const el = document.querySelector(`[data-repo="${repo}"]`);
        if (el) el.textContent = `${v.stars.toLocaleString('en-US')} stars`;
      }
    })
    .catch(() => {
      for (const el of document.querySelectorAll('[data-repo]')) el.textContent = 'stars unavailable';
    });
}
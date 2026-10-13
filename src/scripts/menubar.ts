// Menus: close siblings, close on outside click, Esc, and ⌘/Ctrl+1..5.
  const bar = document.querySelector<HTMLElement>('.menubar')!;
  const menus = [...bar.querySelectorAll<HTMLDetailsElement>('details.menu')];
  const closeOthers = (keep?: HTMLDetailsElement) =>
    menus.forEach((m) => { if (m !== keep) m.open = false; });

  for (const m of menus) {
    m.addEventListener('toggle', () => { if (m.open) closeOthers(m); });
  }
  document.addEventListener('pointerdown', (e) => {
    if (!(e.target instanceof Node) || !bar.contains(e.target)) closeOthers();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const open = menus.find((m) => m.open);
      open?.removeAttribute('open');
      open?.querySelector('summary')?.focus();
    }
    if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey) {
      const href = { '1': '/', '2': '/blog/', '3': '/resume/', '4': '/contact/', '5': '/search/' }[
        e.key.toLowerCase()
      ];
      if (href) { e.preventDefault(); location.href = href; }
    }
  });

  // Theme: auto -> light -> dark -> auto, persisted.
  const root = document.documentElement;
  const ORDER = ['', 'light', 'dark'];
  const icon = document.querySelector('[data-theme-icon]');
  document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
    const next = ORDER[(ORDER.indexOf(root.dataset.theme ?? '') + 1) % ORDER.length];
    if (next) root.dataset.theme = next;
    else delete root.dataset.theme;
    try {
      next ? localStorage.setItem('theme', next) : localStorage.removeItem('theme');
    } catch {}
    if (icon) icon.textContent = next === 'dark' ? '●' : next === 'light' ? '○' : '◐';
  });
  if (icon) {
    const t = root.dataset.theme ?? '';
    icon.textContent = t === 'dark' ? '●' : t === 'light' ? '○' : '◐';
  }

  // Clock.
  const clock = document.querySelector<HTMLElement>('[data-clock]')!;
  const tick = () => {
    clock.textContent = new Date()
      .toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' })
      .replace(',', '');
  };
  tick();
  setInterval(tick, 20_000);

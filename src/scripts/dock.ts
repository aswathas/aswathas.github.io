// Dock magnification: cosine falloff around the pointer, rAF-batched.
  const dock = document.querySelector<HTMLElement>('.dock')!;
  const items = [...dock.querySelectorAll<HTMLElement>('.dock-item')];
  const fine = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 700px)');
  const calm = matchMedia('(prefers-reduced-motion: reduce)');
  let centres: number[] = [];
  let pointerX = 0;
  let frame = 0;

  const measure = () => {
    items.forEach((i) => i.style.removeProperty('--s'));
    centres = items.map((i) => {
      const r = i.getBoundingClientRect();
      return r.left + r.width / 2;
    });
  };

  const apply = () => {
    const reach = (items[0]?.querySelector('.tile')?.getBoundingClientRect().height ?? 42) * 3.2;
    items.forEach((i, n) => {
      const d = Math.abs(pointerX - centres[n]);
      const s = d >= reach ? 1 : 1 + 0.75 * (Math.cos((Math.PI * d) / reach) + 1) / 2;
      i.style.setProperty('--s', s.toFixed(3));
    });
  };

  dock.addEventListener('pointerenter', (e) => {
    if (!fine.matches || calm.matches || e.pointerType !== 'mouse') return;
    measure();
    dock.classList.add('magnifying');
  });
  dock.addEventListener('pointermove', (e) => {
    if (!dock.classList.contains('magnifying')) return;
    pointerX = e.clientX;
    frame ||= requestAnimationFrame(() => { frame = 0; apply(); });
  });
  dock.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    frame = 0;
    dock.classList.remove('magnifying');
    items.forEach((i) => i.style.removeProperty('--s'));
  });

// Launch feedback: bounce the icon, then let the navigation happen.
for (const item of items) {
  item.addEventListener('click', () => {
    item.classList.add('launching');
    setTimeout(() => item.classList.remove('launching'), 420);
  });
}

// Window controls. Close returns to the home window, minimize stows the
  // window behind the dock, zoom toggles full screen.
  const desk = document.querySelector('.desk');
  const win = document.querySelector('.window');
  const calmNow = matchMedia('(prefers-reduced-motion: reduce)');

  const setZoom = (on) => {
    win.classList.toggle('zoomed', on);
    document.querySelector('[data-zoom]').setAttribute('aria-pressed', String(on));
  };
  const setMinimized = (on) => {
    desk.classList.toggle('minimized', on);
    document.querySelector('[data-minimize]').setAttribute('aria-pressed', String(on));
  };

  document.querySelector('[data-zoom]')?.addEventListener('click', () => {
    if (desk.classList.contains('minimized')) setMinimized(false);
    setZoom(!win.classList.contains('zoomed'));
  });

  document.querySelector('[data-minimize]')?.addEventListener('click', () => {
    const next = !desk.classList.contains('minimized');
    setMinimized(next);
    if (next) document.querySelector('.dock')?.focus?.();
  });

  document.querySelector('[data-close-window]')?.addEventListener('click', () => {
    setZoom(false);
    setMinimized(false);
    location.href = '/';
  });

  // Double-click the title bar zooms, the way a real window does.
  document.querySelector('.titlebar')?.addEventListener('dblclick', (e) => {
    if (e.target.closest('.traffic')) return;
    setZoom(!win.classList.contains('zoomed'));
  });

  // ⌘M minimises, Esc restores.
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'm') {
      e.preventDefault();
      setMinimized(!desk.classList.contains('minimized'));
    } else if (e.key === 'Escape' && desk.classList.contains('minimized')) {
      setMinimized(false);
    }
  });

  // Clicking the running dock item restores a minimized window.
  document.addEventListener('click', (e) => {
    const item = e.target.closest?.('.dock-item[data-running]');
    if (item && desk.classList.contains('minimized')) {
      e.preventDefault();
      setMinimized(false);
    }
  });

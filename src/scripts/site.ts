// Small progressive enhancements. Every feature degrades to plain HTML without JavaScript.

const root = document.documentElement;

// Theme toggle: explicit choice overrides the system setting.
document.querySelector<HTMLButtonElement>('[data-theme-toggle]')?.addEventListener('click', () => {
  const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const current = root.dataset.theme ?? (systemDark ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
});

// Mobile menu.
const menuBtn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const navList = document.querySelector<HTMLElement>('[data-nav-list]');
const setMenu = (open: boolean) => {
  if (!menuBtn || !navList) return;
  menuBtn.setAttribute('aria-expanded', String(open));
  navList.classList.toggle('is-open', open);
  if (open) navList.querySelector<HTMLAnchorElement>('a')?.focus();
};
menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
navList?.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuBtn?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
});

// Header state + reading progress.
const header = document.querySelector<HTMLElement>('[data-header]');
const bar = document.querySelector<HTMLElement>('[data-progress]');
const onScroll = () => {
  header?.classList.toggle('is-scrolled', scrollY > 16);
  if (bar) {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = max > 0 ? `${Math.min(100, (scrollY / max) * 100)}%` : '0';
  }
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Back to top moves focus as well as scroll position.
document.querySelector('[data-back-to-top]')?.addEventListener('click', (e) => {
  e.preventDefault();
  scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  document.getElementById('main')?.focus({ preventScroll: true });
});

// Chart tooltips: any element with data-tip shows it on hover and keyboard focus.
const tip = document.createElement('div');
tip.className = 'chart-tip';
tip.setAttribute('role', 'tooltip');
tip.hidden = true;
document.body.append(tip);
const showTip = (el: HTMLElement) => {
  const [value, label] = (el.dataset.tip ?? '').split('|');
  tip.replaceChildren();
  const strong = document.createElement('strong');
  strong.textContent = value ?? '';
  const span = document.createElement('span');
  span.textContent = label ?? '';
  tip.append(strong, span);
  tip.hidden = false;
  const r = el.getBoundingClientRect();
  const t = tip.getBoundingClientRect();
  const left = Math.min(Math.max(8, r.left + r.width / 2 - t.width / 2), innerWidth - t.width - 8);
  const top = r.top - t.height - 8 < 8 ? r.bottom + 8 : r.top - t.height - 8;
  tip.style.transform = `translate(${left}px, ${top + scrollY}px)`;
};
document.querySelectorAll<HTMLElement>('[data-tip]').forEach((el) => {
  el.addEventListener('pointerenter', () => showTip(el));
  el.addEventListener('focus', () => showTip(el));
  el.addEventListener('pointerleave', () => (tip.hidden = true));
  el.addEventListener('blur', () => (tip.hidden = true));
});
addEventListener('scroll', () => (tip.hidden = true), { passive: true });

// Screenshot zoom: links marked data-zoom open the full image in a dialog.
const dialog = document.createElement('dialog');
dialog.className = 'zoom';
dialog.innerHTML = '<form method="dialog"><button class="zoom__close" aria-label="Close enlarged image">Close ✕</button></form><img alt="" />';
document.body.append(dialog);
const zoomImg = dialog.querySelector('img')!;
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
document.querySelectorAll<HTMLAnchorElement>('a[data-zoom]').forEach((a) => {
  a.addEventListener('click', (e) => {
    if (typeof dialog.showModal !== 'function') return;
    e.preventDefault();
    zoomImg.src = a.href;
    zoomImg.alt = a.querySelector('img')?.alt ?? '';
    dialog.showModal();
  });
});

// Contents scroll-spy: the current section is the last one whose heading has passed the top
// third of the viewport; at the very bottom of the page it is the final section.
const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc] a')];
const tocSections = tocLinks.map((a) => document.getElementById(a.hash.slice(1))).filter((el): el is HTMLElement => !!el);
if (tocSections.length) {
  let ticking = false;
  const update = () => {
    ticking = false;
    const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
    let current = tocSections[0];
    for (const sec of tocSections) if (sec.getBoundingClientRect().top <= innerHeight * 0.33) current = sec;
    if (atBottom) current = tocSections[tocSections.length - 1];
    tocLinks.forEach((a) => (a.hash.slice(1) === current.id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

// Copy email with a fallback of selecting the visible address.
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  const status = document.getElementById(btn.dataset.status ?? '');
  btn.hidden = false;
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy ?? '';
    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = 'Email address copied.';
    } catch {
      const target = document.getElementById(btn.dataset.target ?? '');
      if (target) { const range = document.createRange(); range.selectNodeContents(target); getSelection()?.removeAllRanges(); getSelection()?.addRange(range); }
      if (status) status.textContent = 'Copy is unavailable here; the address is selected so you can copy it.';
    }
  });
});

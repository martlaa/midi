const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (toggle && nav) {
  toggle.hidden = false;
  document.documentElement.classList.add('js');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      toggle.focus();
    }
  });
}
const filters = document.querySelector('[data-filters]');
if (filters) {
  filters.hidden = false;
  const entries = [...document.querySelectorAll('[data-category]')];
  const count = document.querySelector('[data-count]');
  const update = (value) => {
    entries.forEach((entry) => { entry.hidden = value !== 'all' && entry.dataset.category !== value; });
    filters.querySelectorAll('button').forEach((button) => {
      const active = button.dataset.filter === value;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    count.textContent = `${count.dataset.label}: ${entries.filter((entry) => !entry.hidden).length}`;
  };
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button) update(button.dataset.filter);
  });
  update('all');
}

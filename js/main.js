document.addEventListener('DOMContentLoaded', () => {

  // ── Active nav link ──
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '/') {
      link.classList.add('active');
    } else if (href === '/' && (currentPath === '/' || currentPath.endsWith('index.html'))) {
      link.classList.add('active');
    }
  });

  // ── TOC ──
  const headings = Array.from(document.querySelectorAll('.project-content h2, .project-content h3'));
  if (headings.length === 0) return;

  const NAV_H = 68; // nav height + buffer
  document.documentElement.style.scrollPaddingTop = NAV_H + 'px';

  // Asignar IDs
  headings.forEach((h, i) => { if (!h.id) h.id = 'sec-' + i; });

  // Construir items TOC
  const tocLists = document.querySelectorAll('.toc-list');
  tocLists.forEach(list => {
    list.innerHTML = '';
    headings.forEach(h => {
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.className = 'toc-item' + (h.tagName === 'H3' ? ' sub' : '');
      a.textContent = h.textContent;
      list.appendChild(a);
    });
  });

  // ── Marcar activo ──
  const setActive = (id) => {
    document.querySelectorAll('.toc-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('href') === '#' + id);
    });
  };
  setActive(headings[0].id);

  // ── Actualizar activo en scroll: heading más cercano al top ──
  let manualScroll = false;
  let scrollTimer;

  const updateActive = () => {
    if (manualScroll) return;
    // Encontrar el último heading que ya pasó el top (NAV_H)
    let active = headings[0];
    for (const h of headings) {
      const top = h.getBoundingClientRect().top;
      if (top <= NAV_H + 4) {
        active = h;
      } else {
        break;
      }
    }
    setActive(active.id);
  };

  window.addEventListener('scroll', updateActive, { passive: true });

  // ── Click en TOC ──
  document.querySelectorAll('.toc-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const id = item.getAttribute('href').replace('#', '');
      const target = document.getElementById(id);
      if (!target) return;

      manualScroll = true;
      setActive(id);
      closeTocPanel();

      // offsetTop absoluto desde el top del documento
      let offsetTop = 0;
      let el = target;
      while (el) { offsetTop += el.offsetTop; el = el.offsetParent; }
      window.scrollTo({ top: offsetTop - NAV_H, behavior: 'smooth' });

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { manualScroll = false; }, 900);
    });
  });

  // ── Barra de progreso ──
  const bars = document.querySelectorAll('.toc-progress-bar');
  if (bars.length > 0) {
    const updateProgress = () => {
      const pct = Math.min((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100);
      bars.forEach(b => b.style.width = pct + '%');
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ── TOC flotante mobile ──
  const fab = document.querySelector('.toc-fab');
  const panel = document.querySelector('.toc-panel');

  window.closeTocPanel = () => {
    if (!panel || !fab) return;
    panel.classList.remove('visible');
    fab.classList.remove('open');
    setTimeout(() => { panel.style.display = 'none'; }, 250);
  };

  if (fab && panel) {
    fab.addEventListener('click', () => {
      if (panel.classList.contains('visible')) {
        closeTocPanel();
      } else {
        panel.style.display = 'block';
        requestAnimationFrame(() => {
          panel.classList.add('visible');
          fab.classList.add('open');
        });
      }
    });
    document.addEventListener('click', e => {
      if (!fab.contains(e.target) && !panel.contains(e.target)) closeTocPanel();
    });
  }

  // ── Cursor sutil (desktop) ──
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;width:6px;height:6px;border-radius:50%;background:var(--p-400);opacity:0;transform:translate(-50%,-50%);transition:opacity 200ms,transform 200ms;';
    document.body.appendChild(dot);
    document.addEventListener('mousemove', e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      dot.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => dot.style.opacity = '0');
    // Solo en cards y botones, NO en links de texto ni TOC
    document.querySelectorAll('.project-card, .btn').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.style.transform = 'translate(-50%,-50%) scale(2.5)'; dot.style.opacity = '0.5'; });
      el.addEventListener('mouseleave', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; dot.style.opacity = '1'; });
    });
    // Ocultar cursor en zonas de texto
    document.querySelectorAll('a, .toc-item, .toc-list, .nav-link').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.style.opacity = '0'; });
      el.addEventListener('mouseleave', () => { dot.style.opacity = '1'; });
    });
  }

});

// ── Dropdown nav ──
const closeAllDropdowns = () => {
  document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.nav-btn[aria-expanded]').forEach(b => b.setAttribute('aria-expanded', 'false'));
};

window.toggleDropdown = (id, btn) => {
  const dd = document.getElementById(id);
  const isOpen = dd.classList.contains('open');
  closeAllDropdowns();
  if (!isOpen) {
    dd.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
};

// Close on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.nav-dropdown-wrap')) closeAllDropdowns();
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllDropdowns();
});

// ── Dark mode ──
window.toggleTheme = () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.className = next === 'dark' ? 'ti ti-sun' : 'ti ti-moon';
};

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  document.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('theme-icon');
    if (icon) icon.className = 'ti ti-sun';
  });
}

// ── Idioma ──
window.setLang = (lang) => {
  localStorage.setItem('lang', lang);
  const label = document.getElementById('lang-label');
  if (label) label.textContent = lang.toUpperCase();
  // Close dropdown
  document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.nav-btn[aria-expanded]').forEach(b => b.setAttribute('aria-expanded', 'false'));
  // Placeholder: en el futuro swapea contenido con data-es / data-en
};

// Apply saved lang on load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'es';
  const label = document.getElementById('lang-label');
  if (label) label.textContent = savedLang.toUpperCase();
});

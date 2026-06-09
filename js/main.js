document.addEventListener('DOMContentLoaded', () => {

  // ── Active nav — desktop + mobile ──
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop() || 'index.html';
  const inProyectos = currentPath.includes('/proyectos/');

  // Desktop nav-btn
  document.querySelectorAll('.nav-btn[href]').forEach(btn => {
    const href = btn.getAttribute('href');
    const file = href.split('/').pop();
    if (file === currentFile || (currentFile === '' && file === 'index.html')) {
      btn.classList.add('active');
    }
  });
  // Desktop proyectos dropdown — marcar si estamos en un proyecto
  if (inProyectos) {
    const proyBtn = document.getElementById('btn-proyectos');
    if (proyBtn) proyBtn.classList.add('active');
    // Marcar proyecto actual en dropdown
    document.querySelectorAll('#dd-proyectos a').forEach(a => {
      if (a.getAttribute('href').includes(currentFile)) a.classList.add('selected');
    });
  }
  // Desktop dropdown items — marcar selected en proyectos dropdown
  document.querySelectorAll('#dd-proyectos a').forEach(a => {
    const file = a.getAttribute('href').split('/').pop();
    if (file === currentFile) a.classList.add('selected');
  });

  // Mobile nav items
  document.querySelectorAll('.mobile-nav-item[data-page]').forEach(item => {
    const page = item.getAttribute('data-page');
    if (page === 'home' && (currentFile === 'index.html' || currentFile === '')) {
      item.classList.add('active');
    } else if (page === 'sobre-mi' && currentFile === 'sobre-mi.html') {
      item.classList.add('active');
    } else if (page === 'ds' && currentFile === 'sistema.html') {
      item.classList.add('active');
    } else if (page === 'proyectos' && inProyectos) {
      item.classList.add('active');
      // Marcar proyecto actual en dropdown mobile
      document.querySelectorAll('#mob-dd-proyectos a').forEach(a => {
        if (a.getAttribute('href').includes(currentFile)) a.classList.add('selected');
      });
    }
  });

  // Idioma y tema — marcar selected
  window.applySelectedStates = () => {
    const lang = localStorage.getItem('lang') || 'es';
    const theme = document.documentElement.getAttribute('data-theme') || 'light';

    ['lang-es', 'lang-en', 'mob-lang-es', 'mob-lang-en'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle('selected', id.endsWith(lang));
    });
    ['mob-theme-light', 'mob-theme-dark'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle('selected',
        (id === 'mob-theme-dark' && theme === 'dark') ||
        (id === 'mob-theme-light' && theme === 'light')
      );
    });
    // theme icon
    const icon = document.getElementById('theme-icon');
    if (icon) icon.className = theme === 'dark' ? 'ti ti-sun' : 'ti ti-moon';
  };
  applySelectedStates();

  // ── TOC ──
  const headings = Array.from(document.querySelectorAll('.project-content h2:not(.no-toc), .project-content h3:not(.no-toc)'));
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
  // (eliminado)

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
  if (window.applySelectedStates) applySelectedStates();
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
  document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.nav-btn[aria-expanded]').forEach(b => b.setAttribute('aria-expanded', 'false'));
  if (window.applySelectedStates) applySelectedStates();
};

// Apply saved lang on load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'es';
  const label = document.getElementById('lang-label');
  if (label) label.textContent = savedLang.toUpperCase();
});

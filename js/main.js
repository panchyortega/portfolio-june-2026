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

  // ── TOC setup ──
  const headings = Array.from(document.querySelectorAll('.project-content h2, .project-content h3'));
  if (headings.length === 0) return;

  const NAV_H = 52 + 16; // nav height + breathing room
  document.documentElement.style.scrollPaddingTop = NAV_H + 'px';

  // Asignar IDs a los headings
  headings.forEach((h, i) => {
    if (!h.id) h.id = 'sec-' + i;
  });

  // Construir items en todas las listas TOC
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

  // ── Scroll al heading al hacer clic ──
  document.querySelectorAll('.toc-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const id = item.getAttribute('href').replace('#', '');
      const target = document.getElementById(id);
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY - NAV_H;
      window.scrollTo({ top, behavior: 'smooth' });
      setActive(id);
      closeTocPanel();
    });
  });

  // ── Marcar activo ──
  const setActive = (id) => {
    document.querySelectorAll('.toc-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('href') === '#' + id);
    });
  };

  // Marcar el primer heading al cargar
  setActive(headings[0].id);

  // ── Observer: actualiza activo mientras scrolleas ──
  let scrollTimeout;
  let manualScroll = false;

  const observer = new IntersectionObserver(entries => {
    if (manualScroll) return;
    // Encontrar el heading más alto visible en pantalla
    const visible = headings.filter(h => {
      const rect = h.getBoundingClientRect();
      return rect.top >= NAV_H && rect.top < window.innerHeight * 0.5;
    });
    if (visible.length > 0) {
      setActive(visible[0].id);
    } else {
      // Si ninguno en zona, buscar el último que pasó el top
      const passed = headings.filter(h => h.getBoundingClientRect().top < NAV_H);
      if (passed.length > 0) setActive(passed[passed.length - 1].id);
    }
  }, { rootMargin: `-${NAV_H}px 0px -40% 0px`, threshold: 0 });

  headings.forEach(h => observer.observe(h));

  // Desactivar observer durante scroll manual y reactivar al terminar
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => { manualScroll = false; }, 150);
  }, { passive: true });

  // ── Barra de progreso ──
  const bars = document.querySelectorAll('.toc-progress-bar');
  if (bars.length > 0) {
    window.addEventListener('scroll', () => {
      const pct = Math.min((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100);
      bars.forEach(b => b.style.width = pct + '%');
    }, { passive: true });
  }

  // ── TOC flotante (mobile) ──
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
      const isOpen = panel.classList.contains('visible');
      if (isOpen) {
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

  // ── Cursor sutil (solo desktop) ──
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

    document.querySelectorAll('a, button, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.style.transform = 'translate(-50%,-50%) scale(2.5)'; dot.style.opacity = '0.5'; });
      el.addEventListener('mouseleave', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; dot.style.opacity = '1'; });
    });
  }

});

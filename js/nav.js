/* ─────────────────────────────────────────────
   NAV — Inyección automática de navbars
   Genera y monta la nav desktop y mobile
   en todas las páginas al cargar el DOM.
   ───────────────────────────────────────────── */

(function () {
  // Detectar si estamos en la raíz o en /proyectos/
  const inProyectos = window.location.pathname.includes('/proyectos/');
  const root = inProyectos ? '../' : '';

  // ── Proyectos — lista compartida ──
  const proyectos = [
    { href: root + 'proyectos/ucap.html',   label: 'Ucap: Dashboard' },
    { href: root + 'proyectos/ulern.html',  label: 'Ulern: Study Session' },
    { href: root + 'proyectos/aurora.html', label: 'Aurora Design System' },
    { href: root + 'proyectos/glukko.html', label: 'Glukko App' },
    { href: root + 'proyectos/otros.html',  label: 'Otros proyectos' },
  ];

  const proyectosItems = proyectos
    .map(p => `<a href="${p.href}">${p.label}</a>`)
    .join('');

  const proyectosMobileItems = proyectos
    .map(p => {
      // En páginas de proyecto, los hrefs son relativos sin carpeta
      const href = inProyectos ? p.href.replace('../proyectos/', '') : p.href;
      return `<a href="${href}">${p.label}</a>`;
    })
    .join('');

  // ── Nav desktop ──
  const desktopNav = document.createElement('nav');
  desktopNav.className = 'nav';
  desktopNav.innerHTML = `
    <a href="${root}index.html" class="nav-logo">Fran Ortega</a>
    <div class="nav-left">
      <div class="nav-dropdown-wrap">
        <button class="nav-btn" id="btn-proyectos" aria-expanded="false" onclick="toggleDropdown('dd-proyectos', this)">
          Proyectos <i class="ti ti-chevron-down chevron"></i>
        </button>
        <div class="nav-dropdown" id="dd-proyectos">
          ${proyectosItems}
        </div>
      </div>
      <a href="${root}sobre-mi.html" class="nav-btn">Sobre mí</a>
      <a href="${root}sistema.html" class="nav-btn">DS</a>
    </div>
    <div class="nav-right">
      <div class="nav-dropdown-wrap">
        <button class="nav-btn" id="btn-lang" aria-expanded="false" onclick="toggleDropdown('dd-lang', this)">
          <i class="ti ti-language" style="font-size:1rem;"></i>
          <span id="lang-label">ES</span>
          <i class="ti ti-chevron-down chevron"></i>
        </button>
        <div class="nav-dropdown" id="dd-lang" style="right:0;left:auto;min-width:140px;">
          <button id="lang-es" onclick="setLang('es')">🇨🇱 Español</button>
          <button id="lang-en" onclick="setLang('en')">🇺🇸 English</button>
        </div>
      </div>
      <button class="nav-btn nav-btn-icon" onclick="toggleTheme()" title="Cambiar tema">
        <i class="ti ti-moon" id="theme-icon"></i>
      </button>
    </div>
  `;

  // ── Nav mobile ──
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'mobile-nav';
  mobileNav.id = 'mobile-nav';
  mobileNav.innerHTML = `
    <a href="${root}index.html" class="mobile-nav-item" data-page="home">
      <i class="ti ti-home" aria-hidden="true"></i>
      <span>Inicio</span>
    </a>

    <div class="nav-dropdown-wrap" style="flex:1;display:flex;justify-content:center;">
      <button class="mobile-nav-item" id="mob-btn-proyectos" data-page="proyectos"
        onclick="toggleDropdown('mob-dd-proyectos', this)" aria-expanded="false"
        style="flex-direction:column;gap:3px;padding:6px 12px;width:100%;background:none;border:none;font-family:var(--font);">
        <i class="ti ti-layout-grid" aria-hidden="true"></i>
        <span>Proyectos</span>
      </button>
      <div class="nav-dropdown nav-dropdown--up" id="mob-dd-proyectos" style="left:50%;transform:translateX(-50%) translateY(4px);min-width:180px;">
        ${proyectosMobileItems}
      </div>
    </div>

    <a href="${root}sobre-mi.html" class="mobile-nav-item" data-page="sobre-mi">
      <i class="ti ti-user" aria-hidden="true"></i>
      <span>Sobre mí</span>
    </a>

    <a href="${root}sistema.html" class="mobile-nav-item" data-page="ds">
      <i class="ti ti-palette" aria-hidden="true"></i>
      <span>DS</span>
    </a>

    <div class="nav-dropdown-wrap" style="flex:1;display:flex;justify-content:center;">
      <button class="mobile-nav-item" id="mob-btn-more"
        onclick="toggleDropdown('mob-dd-more', this)" aria-expanded="false"
        style="flex-direction:column;gap:3px;padding:6px 12px;width:100%;background:none;border:none;font-family:var(--font);">
        <i class="ti ti-dots" aria-hidden="true"></i>
        <span>Más</span>
      </button>
      <div class="nav-dropdown nav-dropdown--up" id="mob-dd-more" style="right:0;left:auto;min-width:160px;">
        <button id="mob-lang-es" onclick="setLang('es')"><i class="ti ti-language" aria-hidden="true"></i>Español</button>
        <button id="mob-lang-en" onclick="setLang('en')"><i class="ti ti-language" aria-hidden="true"></i>English</button>
        <div class="nav-dropdown-divider"></div>
        <button id="mob-theme-light" onclick="toggleTheme()"><i class="ti ti-sun" aria-hidden="true"></i>Modo claro</button>
        <button id="mob-theme-dark" onclick="toggleTheme()"><i class="ti ti-moon" aria-hidden="true"></i>Modo oscuro</button>
      </div>
    </div>
  `;

  // ── Montar en el DOM ──
  // Desktop nav: al inicio del body
  document.body.insertBefore(desktopNav, document.body.firstChild);
  // Mobile nav: al final del body (antes del cierre)
  document.body.appendChild(mobileNav);

})();

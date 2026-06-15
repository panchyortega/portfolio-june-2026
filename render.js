/**
 * render.js
 * Lee templates Mustache + datos JSON y genera HTML en /output
 * Uso: node render.js
 */

const fs      = require('fs');
const path    = require('path');
const Mustache = require('mustache');

// ── Helpers ────────────────────────────────────────────────────
function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓  ${filePath}`);
}

function loadPartials() {
  const dirs = ['templates/organisms', 'templates/molecules', 'templates/atoms', 'templates/layouts'];
  const partials = {};
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
      if (!file.endsWith('.mustache')) return;
      const name = path.basename(file, '.mustache');
      partials[name] = read(path.join(dir, file));
    });
  });
  return partials;
}

function render(templatePath, data, partials) {
  const template = read(templatePath);
  return Mustache.render(template, data, partials);
}

// ── Leer metadatos de un .mustache ─────────────────────────────
// Parsea los comentarios {{! @titulo ... }} y {{! @descripcion ... }}
function parseMustacheMeta(content) {
  const titulo = (content.match(/\{\{!\s*@titulo\s+(.+?)\s*\}\}/) || [])[1] || '';
  const descripcion = (content.match(/\{\{!\s*@descripcion\s+(.+?)\s*\}\}/) || [])[1] || '';
  return { titulo, descripcion };
}

// ── Leer archivo LESS correspondiente ──────────────────────────
function findLessFile(componentName) {
  const dirs = ['styles/less/molecules', 'styles/less/organisms', 'styles/less/atoms'];
  for (const dir of dirs) {
    const candidate = path.join(dir, `_${componentName}.less`);
    if (fs.existsSync(candidate)) return read(candidate);
  }
  return null;
}

// ── Escapar HTML para mostrarlo en <pre><code> ─────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Construir data para sistema.html ───────────────────────────
function buildSistemaData(sistemaJson) {
  const componentDirs = [
    { dir: 'templates/molecules', type: 'Molécula' },
    { dir: 'templates/organisms', type: 'Organismo' },
  ];

  const componentes = [];

  componentDirs.forEach(({ dir, type }) => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).sort().forEach(file => {
      if (!file.endsWith('.mustache')) return;
      const name = path.basename(file, '.mustache');
      const content = read(path.join(dir, file));
      const { titulo, descripcion } = parseMustacheMeta(content);
      if (!titulo) return; // skip if no metadata

      const lessContent = findLessFile(name);
      const muestra = (sistemaJson.muestras || {})[name] || '';

      // Strip metadata comments from displayed mustache code
      const mustacheCode = content
        .replace(/\{\{!\s*@titulo\s+.+?\s*\}\}\n?/g, '')
        .replace(/\{\{!\s*@descripcion\s+.+?\s*\}\}\n?/g, '')
        .trim();

      componentes.push({
        id: name,
        tipo: type,
        titulo,
        descripcion,
        muestra,
        mustache_code: escapeHtml(mustacheCode),
        less_code: lessContent ? escapeHtml(lessContent) : null,
        has_less: !!lessContent,
      });
    });
  });

  // Page schemas
  const paginas = (sistemaJson.paginas || []).map(p => {
    const templateContent = fs.existsSync(p.template) ? read(p.template) : '';
    return {
      ...p,
      template_code: escapeHtml(templateContent),
      es_3cols: p.esquema && p.esquema.some(s => s.sidebar),
      esquema_simple: p.esquema && p.esquema.filter(s => !s.sidebar),
      esquema_cols: p.esquema && p.esquema.some(s => s.sidebar) ? p.esquema : null,
    };
  });

  return { componentes, paginas };
}

// ── Build ─────────────────────────────────────────────────────
const partials  = loadPartials();
const content   = JSON.parse(read('data/content.json'));
const sistemaJson = JSON.parse(read('data/sistema.json'));

console.log('\n📦 Renderizando páginas...');

// index.html
write('output/index.html',
  render('templates/pages/index.mustache', { ...content, isHome: true, cssPath: '', rootPath: '' }, partials));

// sobre-mi.html
write('output/sobre-mi.html',
  render('templates/pages/sobre-mi.mustache', { ...content, isAbout: true, cssPath: '', rootPath: '' }, partials));

// sistema.html — auto-generado desde los componentes
const sistemaData = buildSistemaData(sistemaJson);
write('output/sistema.html',
  render('templates/pages/sistema.mustache', {
    ...content,
    ...sistemaData,
    cssPath: '',
    rootPath: '',
    title: 'Design System',
  }, partials));

console.log(`\n  → ${sistemaData.componentes.length} componentes documentados`);
console.log('\n✅ Listo\n');

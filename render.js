/**
 * render.js
 * Lee los templates Mustache + datos JSON y genera HTML en /output
 * Uso: node render.js
 */

const fs   = require('fs');
const path = require('path');
const Mustache = require('mustache');

// ── Helpers ──────────────────────────────────────────────────────────────────
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

// ── Build ─────────────────────────────────────────────────────────────────────
const partials = loadPartials();
const data     = JSON.parse(read('data/content.json'));

console.log('\n📦 Renderizando páginas...');

// index.html
const indexContent = render('templates/pages/index.mustache', { ...data, isHome: true, cssPath: '', rootPath: '' }, partials);
write('output/index.html', indexContent);

// sobre-mi.html
const aboutContent = render('templates/pages/sobre-mi.mustache', { ...data, isAbout: true, cssPath: '', rootPath: '' }, partials);
write('output/sobre-mi.html', aboutContent);

// sistema.html (DS)
const dsContent = render('templates/pages/sistema.mustache', { ...data, cssPath: '', rootPath: '' }, partials);
write('output/sistema.html', dsContent);

console.log('\n✅ Listo\n');

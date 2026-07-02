import { marked } from 'marked';

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Estima el tiempo de lectura de un texto markdown (~200 palabras/min).
 * @param {string} md
 * @returns {string} ej: "3 min de lectura"
 */
export function readingTime(md) {
  const words = (md || '').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min de lectura`;
}

/**
 * Renderiza markdown a HTML y extrae la tabla de contenidos.
 * - Agrega id a h2/h3 para la TOC.
 * - Las imágenes salen envueltas en un <figure> con botón (para zoom + a11y).
 * - Los bloques ```mermaid salen como <pre class="mermaid"> para render en cliente.
 * - Antepone `base` a las rutas de imagen que empiezan con "/".
 *
 * @param {string} md
 * @param {{ base?: string }} [opts]
 */
export function renderMarkdown(md, { base = '' } = {}) {
  if (!md) return { html: '', toc: [] };

  const tokens = marked.lexer(md);
  const toc = tokens
    .filter((t) => t.type === 'heading' && (t.depth === 2 || t.depth === 3))
    .map((t) => ({ text: t.text, id: slugify(t.text), depth: t.depth }));

  const renderer = new marked.Renderer();
  const originalParagraph = renderer.paragraph.bind(renderer);
  const originalHeading = renderer.heading.bind(renderer);
  const originalCode = renderer.code.bind(renderer);

  function renderImage(token) {
    const raw = token.href || '';
    const href = raw.startsWith('/') ? base + raw : raw;
    const alt = escapeHtml(token.text || '');
    const caption = token.title
      ? `<figcaption class="content-caption">${escapeHtml(token.title)}</figcaption>`
      : '';
    return (
      `<figure class="content-image">` +
        `<div class="zoom-image" role="group" aria-label="Imagen${alt ? ': ' + alt : ''}. Usa scroll o los controles para hacer zoom, arrastra para mover.">` +
          `<div class="zoom-canvas">` +
            `<div class="zoom-dots"></div>` +
            `<img src="${href}" alt="${alt}" loading="lazy" />` +
          `</div>` +
          `<span class="zoom-level">100%</span>` +
          `<div class="zoom-controls">` +
            `<button type="button" data-act="out" aria-label="Alejar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>` +
            `<button type="button" data-act="in" aria-label="Acercar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>` +
            `<button type="button" data-act="reset" aria-label="Restablecer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></button>` +
          `</div>` +
        `</div>` +
        caption +
      `</figure>`
    );
  }

  renderer.image = renderImage;

  // Bloques ```mermaid → <pre class="mermaid"> para render en cliente.
  // El resto de los bloques de código se renderizan normal.
  renderer.code = function (token) {
    if (token.lang === 'mermaid') {
      return `<pre class="mermaid">${escapeHtml(token.text)}</pre>`;
    }
    return originalCode(token);
  };

  // Si un párrafo es solo una imagen, renderiza el figure sin <p> (figure en p es inválido).
  renderer.paragraph = function (token) {
    if (token.tokens && token.tokens.length === 1 && token.tokens[0].type === 'image') {
      return renderImage(token.tokens[0]);
    }
    return originalParagraph(token);
  };

  renderer.heading = function (token) {
    const html = originalHeading(token);
    if (token.depth === 2 || token.depth === 3) {
      const id = slugify(token.text);
      return html.replace(/^<h([23])/, `<h$1 id="${id}"`);
    }
    return html;
  };

  const html = marked.parse(md, { renderer });
  return { html, toc };
}

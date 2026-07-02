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
        `<button type="button" class="content-image-btn" data-src="${href}" data-alt="${alt}" aria-label="Ampliar imagen${alt ? ': ' + alt : ''}">` +
          `<img src="${href}" alt="${alt}" loading="lazy" />` +
        `</button>` +
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

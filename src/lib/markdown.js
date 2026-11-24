import { marked } from 'marked';
import { videoMarkup } from './videoFrame.js';
import { lucideSvg } from './lucideSvg.js';

/**
 * Bloques contenedores en markdown (mismas clases que Columns y DataCard):
 *
 *   ::::columnas 3        (2, 3 o 4; por defecto 2)
 *   :::tarjeta
 *   cualquier markdown
 *   :::
 *   ::::
 *
 * El contenedor externo usa más ":" que los internos (4 vs 3) para poder anidarse.
 */
marked.use({
  extensions: [
    {
      name: 'bloque',
      level: 'block',
      start(src) {
        return src.match(/^:{3,}(?:columnas|tarjeta)/m)?.index;
      },
      tokenizer(src) {
        const m = /^(:{3,})(columnas|tarjeta)[ \t]*(\d)?[ \t]*(\n[\s\S]*?)?\n\1[ \t]*(?:\n|$)/.exec(src);
        if (!m) return;
        const cols = Math.min(4, Math.max(2, Number(m[3]) || 2));
        return {
          type: 'bloque',
          raw: m[0],
          kind: m[2],
          cols,
          tokens: this.lexer.blockTokens((m[4] || '').trim())
        };
      },
      renderer(token) {
        const inner = this.parser.parse(token.tokens);
        if (token.kind === 'columnas') {
          return `<div class="columns-wrap"><div class="columns columns-${token.cols}">${inner}</div></div>`;
        }
        return `<div class="data-card">${inner}</div>`;
      }
    }
  ]
});

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
  // Los comentarios HTML (huecos pendientes) no se ven, así que no cuentan
  const visible = (md || '').replace(/<!--[\s\S]*?-->/g, '');
  const words = visible.split(/\s+/).filter(Boolean).length;
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
          `<div class="zoom-dots"></div>` +
          `<div class="zoom-canvas">` +
            `<img src="${href}" alt="${alt}" loading="lazy" />` +
          `</div>` +
          `<span class="zoom-level">100%</span>` +
          `<div class="zoom-controls">` +
            `<button type="button" data-act="out" aria-label="Alejar">${lucideSvg('minus')}</button>` +
            `<button type="button" data-act="in" aria-label="Acercar">${lucideSvg('plus')}</button>` +
            `<button type="button" data-act="reset" aria-label="Restablecer">${lucideSvg('rotate-ccw')}</button>` +
          `</div>` +
        `</div>` +
        caption +
      `</figure>`
    );
  }

  // Videos: mismo ![alt](ruta "caption") pero con extensión de video.
  // Marco propio (no el de las imágenes); el comportamiento vive en videoFrame.js.
  const VIDEO_RE = /\.(mp4|webm|mov|m4v)(?:[?#].*)?$/i;

  function renderVideo(token) {
    const raw = token.href || '';
    const src = raw.startsWith('/') ? base + raw : raw;
    return videoMarkup({ src, alt: token.text || '', caption: token.title || '' });
  }

  // ![texto](placeholder) o ![texto](placeholder "4/3") → ImagePlaceholder
  function renderPlaceholder(token) {
    const ratio = /^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/.test(token.title || '') ? token.title : '16/9';
    return `<div class="img-placeholder in-content" style="aspect-ratio: ${ratio}">${escapeHtml(token.text || '')}</div>`;
  }

  function renderMedia(token) {
    if ((token.href || '').trim() === 'placeholder') return renderPlaceholder(token);
    return VIDEO_RE.test(token.href || '') ? renderVideo(token) : renderImage(token);
  }

  renderer.image = renderMedia;

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
      return renderMedia(token.tokens[0]);
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

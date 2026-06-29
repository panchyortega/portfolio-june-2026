import { marked } from 'marked';

// Convierte un texto en un slug apto para id de ancla
export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Renderiza markdown a HTML y extrae la tabla de contenidos.
 * - Agrega id a cada h2/h3 para que la TOC pueda enlazarlos.
 * - Devuelve { html, toc } donde toc es [{ text, id, depth }].
 */
export function renderMarkdown(md) {
  if (!md) return { html: '', toc: [] };

  // Extraer headings (h2 y h3) para la TOC
  const tokens = marked.lexer(md);
  const toc = tokens
    .filter((t) => t.type === 'heading' && (t.depth === 2 || t.depth === 3))
    .map((t) => ({ text: t.text, id: slugify(t.text), depth: t.depth }));

  // Renderer que inyecta id en los headings
  const renderer = new marked.Renderer();
  const original = renderer.heading.bind(renderer);
  renderer.heading = function (token) {
    const html = original(token);
    if (token.depth === 2 || token.depth === 3) {
      const id = slugify(token.text);
      return html.replace(/^<h([23])/, `<h$1 id="${id}"`);
    }
    return html;
  };

  const html = marked.parse(md, { renderer });
  return { html, toc };
}

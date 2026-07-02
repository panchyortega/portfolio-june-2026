import { theme } from '$lib/stores/theme.js';

/**
 * Renderiza los bloques `pre.mermaid` dentro de un contenedor usando los
 * tokens del sistema de diseño, y los re-renderiza al cambiar de tema.
 *
 * Uso (en onMount):
 *   const cleanup = setupMermaid(containerEl);
 *   return cleanup;
 *
 * @param {HTMLElement} container
 * @returns {() => void} función de limpieza
 */
export function setupMermaid(container) {
  const blocks = [...container.querySelectorAll('pre.mermaid')];
  if (!blocks.length) return () => {};

  // Guarda las fuentes antes de que Mermaid reemplace el contenido
  const sources = blocks.map((el) => el.textContent);

  async function render() {
    const styles = getComputedStyle(document.documentElement);
    const token = (n) => styles.getPropertyValue(n).trim();
    const accent = token('--border-accent');
    const text = token('--text-primary');
    const bg = token('--bg-neutral-primary');

    const { default: mermaid } = await import('mermaid');
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        background: bg,
        mainBkg: bg,
        nodeBorder: accent,
        clusterBkg: bg,
        clusterBorder: accent,
        tertiaryBkg: bg,
        tertiaryBorderColor: accent,
        tertiaryTextColor: text,
        secondaryBkg: bg,
        secondaryBorderColor: accent,
        secondaryTextColor: text,
        nodeTextColor: text,
        titleColor: text,
        edgeLabelBackground: bg,
        labelTextColor: text,
        lineColor: accent,
        fontFamily: token('--font-body'),
        fontSize: token('--size-sm')
      },
      flowchart: { curve: 'basis', padding: 18, useMaxWidth: true, htmlLabels: true }
    });

    blocks.forEach((el, i) => {
      el.removeAttribute('data-processed');
      el.innerHTML = sources[i];
    });
    await mermaid.run({ nodes: blocks });
  }

  // Re-renderiza cuando cambia el tema (los colores se leen de los tokens vigentes)
  const unsub = theme.subscribe(() => {
    render();
  });

  return unsub;
}

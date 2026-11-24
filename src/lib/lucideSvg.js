/**
 * Íconos Lucide como string SVG, para el HTML que genera markdown.js y
 * videoFrame.js (ahí no se pueden usar los componentes de @lucide/svelte).
 * Los paths son los oficiales de Lucide: si agregas uno, cópialo de
 * node_modules/@lucide/svelte/dist/icons/{nombre}.svelte.
 */
const nodes = {
  play: ['M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z'],
  minus: ['M5 12h14'],
  plus: ['M5 12h14', 'M12 5v14'],
  'rotate-ccw': ['M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', 'M3 3v5h5']
};

/** @param {keyof typeof nodes} name @param {{fill?: boolean}} [opts] */
export function lucideSvg(name, { fill = false } = {}) {
  const paths = nodes[name].map((d) => `<path d="${d}"/>`).join('');
  return (
    `<svg viewBox="0 0 24 24" fill="${fill ? 'currentColor' : 'none'}" stroke="currentColor" ` +
    `stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
  );
}

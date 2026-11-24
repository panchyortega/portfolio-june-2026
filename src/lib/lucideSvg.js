/**
 * Íconos Lucide como string SVG, para el HTML que genera markdown.js y
 * videoFrame.js (ahí no se pueden usar los componentes de @lucide/svelte).
 * Los nodos son los oficiales de Lucide: si agregas un ícono, copia su
 * `iconNode` de node_modules/@lucide/svelte/dist/icons/{nombre}.svelte.
 */
const nodes = {
  'play': [["path", {"d": "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]],
  'minus': [["path", {"d": "M5 12h14"}]],
  'plus': [["path", {"d": "M5 12h14"}], ["path", {"d": "M12 5v14"}]],
  'rotate-ccw': [["path", {"d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}], ["path", {"d": "M3 3v5h5"}]],
  'calendar-off': [["path", {"d": "M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18"}], ["path", {"d": "M21 15.5V6a2 2 0 0 0-2-2H9.5"}], ["path", {"d": "M16 2v4"}], ["path", {"d": "M3 10h7"}], ["path", {"d": "M21 10h-5.5"}], ["path", {"d": "m2 2 20 20"}]],
  'list-filter': [["path", {"d": "M2 5h20"}], ["path", {"d": "M6 12h12"}], ["path", {"d": "M9 19h6"}]],
  'file-x': [["path", {"d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}], ["path", {"d": "M14 2v5a1 1 0 0 0 1 1h5"}], ["path", {"d": "m14.5 12.5-5 5"}], ["path", {"d": "m9.5 12.5 5 5"}]],
  'messages-square': [["path", {"d": "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"}], ["path", {"d": "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"}]],
  'headset': [["path", {"d": "M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"}], ["path", {"d": "M21 16v2a4 4 0 0 1-4 4h-5"}]],
  'ticket': [["path", {"d": "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}], ["path", {"d": "M13 5v2"}], ["path", {"d": "M13 17v2"}], ["path", {"d": "M13 11v2"}]],
  'search': [["path", {"d": "m21 21-4.34-4.34"}], ["circle", {"cx": "11", "cy": "11", "r": "8"}]],
  'sliders-horizontal': [["path", {"d": "M10 5H3"}], ["path", {"d": "M12 19H3"}], ["path", {"d": "M14 3v4"}], ["path", {"d": "M16 17v4"}], ["path", {"d": "M21 12h-9"}], ["path", {"d": "M21 19h-5"}], ["path", {"d": "M21 5h-7"}], ["path", {"d": "M8 10v4"}], ["path", {"d": "M8 12H3"}]],
  'download': [["path", {"d": "M12 15V3"}], ["path", {"d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}], ["path", {"d": "m7 10 5 5 5-5"}]],
  'layers': [["path", {"d": "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}], ["path", {"d": "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}], ["path", {"d": "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]],
  'mouse-pointer-click': [["path", {"d": "M14 4.1 12 6"}], ["path", {"d": "m5.1 8-2.9-.8"}], ["path", {"d": "m6 12-1.9 2"}], ["path", {"d": "M7.2 2.2 8 5.1"}], ["path", {"d": "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"}]],
  'users': [["path", {"d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}], ["path", {"d": "M16 3.128a4 4 0 0 1 0 7.744"}], ["path", {"d": "M22 21v-2a4 4 0 0 0-3-3.87"}], ["circle", {"cx": "9", "cy": "7", "r": "4"}]],
  'pen-tool': [["path", {"d": "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"}], ["path", {"d": "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"}], ["path", {"d": "m2.3 2.3 7.286 7.286"}], ["circle", {"cx": "11", "cy": "11", "r": "2"}]],
  'circle-check': [["circle", {"cx": "12", "cy": "12", "r": "10"}], ["path", {"d": "m9 12 2 2 4-4"}]],
  'circle-x': [["circle", {"cx": "12", "cy": "12", "r": "10"}], ["path", {"d": "m15 9-6 6"}], ["path", {"d": "m9 9 6 6"}]],
  'trending-up': [["path", {"d": "M16 7h6v6"}], ["path", {"d": "m22 7-8.5 8.5-5-5L2 17"}]],
  'repeat': [["path", {"d": "m17 2 4 4-4 4"}], ["path", {"d": "M3 11v-1a4 4 0 0 1 4-4h14"}], ["path", {"d": "m7 22-4-4 4-4"}], ["path", {"d": "M21 13v1a4 4 0 0 1-4 4H3"}]],
  'life-buoy': [["circle", {"cx": "12", "cy": "12", "r": "10"}], ["path", {"d": "m4.93 4.93 4.24 4.24"}], ["path", {"d": "m14.83 9.17 4.24-4.24"}], ["path", {"d": "m14.83 14.83 4.24 4.24"}], ["path", {"d": "m9.17 14.83-4.24 4.24"}], ["circle", {"cx": "12", "cy": "12", "r": "4"}]]
};

/**
 * @param {keyof typeof nodes} name
 * @param {{fill?: boolean, size?: number, class?: string}} [opts]
 */
export function lucideSvg(name, { fill = false, size, class: cls } = {}) {
  const els = nodes[name]
    .map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')}/>`)
    .join('');
  const dim = size ? ` width="${size}" height="${size}"` : '';
  return (
    `<svg${cls ? ` class="${cls}"` : ''}${dim} viewBox="0 0 24 24" fill="${fill ? 'currentColor' : 'none'}" stroke="currentColor" ` +
    `stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${els}</svg>`
  );
}

export const hasLucideIcon = (name) => name in nodes;

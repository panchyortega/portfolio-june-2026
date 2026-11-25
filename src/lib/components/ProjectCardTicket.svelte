<script>
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import ProjectCardText from './ProjectCardText.svelte';
  import ProjectCardPhoto from './ProjectCardPhoto.svelte';

  /**
   * ProjectCard — variante Ticket.
   * Dos mitades (foto 4:3 + texto) unidas por una raya punteada y dos muescas semicirculares.
   * Al hover las mitades se abren un poco (se "rompe"), con la bisagra abajo.
   * @prop {string} href - ruta al proyecto (ej: '/proyectos/ucap')
   */
  let { href = '#', title = '', desc = '', image = undefined, imageLabel = '', tags = [] } = $props();

  const NOTCH = 9;           // radio de las muescas
  const DASH = [5, 4];       // largo del trazo y espacio de la raya punteada

  let left = $state();
  let right = $state();

  // Rectángulo con muescas semicirculares en el borde de la unión; la mitad derecha es la misma forma espejada
  const notchRect = (w, h, r) =>
    `M0 0L${w - r} 0A${r} ${r} 0 0 0 ${w} ${r}L${w} ${h - r}A${r} ${r} 0 0 0 ${w - r} ${h}L0 ${h}Z`;

  function draw(el, mirrored) {
    const W = el.offsetWidth, H = el.offsetHeight;
    if (!W || !H) return;
    const r = Math.max(0, Math.min(NOTCH, W / 3, H / 3));
    const svg = el.querySelector('svg'), g = svg.querySelector('g');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    g.querySelector('.body').setAttribute('d', notchRect(W, H, r));
    const seam = g.querySelector('.seam');
    seam.setAttribute('d', `M${W} ${r}L${W} ${H - r}`);
    seam.setAttribute('stroke-dasharray', `${DASH[0]} ${DASH[1]}`);
    g.setAttribute('transform', mirrored ? `translate(${W} 0) scale(-1 1)` : '');
  }

  onMount(() => {
    const ro = new ResizeObserver(() => { draw(left, false); draw(right, true); });
    ro.observe(left);
    ro.observe(right);
    return () => ro.disconnect();
  });
</script>

<div class="cq">
  <a class="ticket" href="{base}{href}">
    <div class="half l hp" bind:this={left}>
      <svg aria-hidden="true"><g><path class="body" /><path class="seam" /></g></svg>
      <div class="face fp"><ProjectCardPhoto {image} alt={title} {imageLabel} /></div>
    </div>
    <div class="half r ht" bind:this={right}>
      <svg aria-hidden="true"><g><path class="body" /><path class="seam" /></g></svg>
      <div class="face fx"><ProjectCardText {title} {desc} {tags} /></div>
    </div>
  </a>
</div>

<style>
  .cq { container-type: inline-size; }

  .ticket {
    --th: 170px;     /* alto del ticket; la foto es 4:3 dentro */
    --tp: 12px;      /* margen de la foto */
    --tear: 3.3deg;  /* cuánto se abre cada mitad al hover */
    display: flex;
    width: 100%;
    height: var(--th);
    text-decoration: none;
    color: inherit;
    transition: transform var(--duration-normal) var(--ease-default);
  }
  @container (max-width: 380px) {
    .ticket { --th: 130px; --tp: 10px; }
  }

  .half {
    position: relative;
    display: flex;
    min-width: 0;
    filter: var(--filter-shadow-paper);
    transition: transform var(--duration-normal) var(--ease-default);
  }
  .half.l { transform-origin: 100% 100%; }
  .half.r { transform-origin: 0 100%; }
  .half.hp { flex: 0 0 calc((var(--th) - 2 * var(--tp)) * 4 / 3 + 2 * var(--tp)); }
  .half.ht { flex: 1 1 0; }
  .half svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
  .body { fill: var(--bg-paper); stroke: var(--border-neutral-secondary); stroke-width: 1; }
  .seam { fill: none; stroke: var(--border-neutral-tertiary); stroke-width: 1.25; }

  .face { position: relative; z-index: 1; flex: 1; min-width: 0; }
  .fp { padding: var(--tp); }
  .fx { padding: var(--space-12) var(--space-16); }

  .ticket:hover,
  .ticket:focus-visible { transform: translateY(-3px); }
  .ticket:hover .l,
  .ticket:focus-visible .l { transform: rotate(calc(var(--tear) * -1)); }
  .ticket:hover .r,
  .ticket:focus-visible .r { transform: rotate(var(--tear)); }
  .ticket:active .l { transform: rotate(calc(var(--tear) * -2)); }
  .ticket:active .r { transform: rotate(calc(var(--tear) * 2)); }

  @media (prefers-reduced-motion: reduce) {
    .ticket, .half { transition: none; }
  }
</style>

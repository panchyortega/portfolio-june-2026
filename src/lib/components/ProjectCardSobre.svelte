<script>
  import { base } from '$app/paths';
  import ProjectCardText from './ProjectCardText.svelte';
  import ProjectCardPhoto from './ProjectCardPhoto.svelte';

  /**
   * ProjectCard — variante Sobre.
   * Una ficha (con "Año …" arriba y la foto 4:3) asomando de un sobre con un recorte semicircular.
   * En reposo se ve ~75 % de la ficha; al hover sube y se ve completa. El texto va escrito en el sobre.
   * @prop {string} href - ruta al proyecto (ej: '/proyectos/ucap')
   * @prop {string} [year] - texto de la cabecera de la ficha (ej: '2026'); si falta se toma de los tags
   */
  let { href = '#', title = '', desc = '', image = undefined, imageLabel = '', tags = [], year = undefined } = $props();

  let yr = $derived(year ?? tags.map((t) => t.label).find((l) => /^\d{4}$/.test(l)) ?? '');
</script>

<div class="cq">
  <a class="env" href="{base}{href}">
    <div class="card">
      <div class="head type-small"><span>{yr ? `Año ${yr}` : 'Proyecto'}</span></div>
      <div class="ph"><ProjectCardPhoto {image} alt={title} {imageLabel} /></div>
    </div>
    <div class="pocket">
      <div class="pk-body"><ProjectCardText {title} {desc} {tags} /></div>
      <span class="pk-arc"></span>
    </div>
  </a>
</div>

<style>
  .cq { container-type: inline-size; }

  .env {
    --ei: 12px;     /* margen lateral de la ficha dentro del sobre */
    --vis: 0.75;    /* cuánto de la ficha se ve en reposo */
    --ph: clamp(165px, 17cqw, 210px);    /* alto del sobre: crece con el ancho */
    --nr: 22px;     /* radio del recorte semicircular */
    --cpad: 10px;   /* margen de la foto dentro de la ficha */
    --chd: 28px;    /* alto de la cabecera "Año …" */
    --top: 10px;
    --pw: calc(100cqw - 2 * var(--ei));
    --phh: calc(var(--chd) + (var(--pw) - 2 * var(--cpad)) * 0.75 + var(--cpad));
    display: block;
    position: relative;
    height: calc(var(--top) + var(--phh) * var(--vis) + var(--ph));
    text-decoration: none;
    color: inherit;
  }
  @container (max-width: 380px) {
    .env { --ei: 10px; --ph: 165px; --nr: 20px; }
  }

  .card {
    position: absolute;
    left: var(--ei);
    top: var(--top);
    width: var(--pw);
    height: var(--phh);
    display: flex;
    flex-direction: column;
    background: var(--bg-paper);
    border: 1px solid var(--border-neutral-secondary);
    border-radius: var(--radius-loose);
    box-shadow: var(--shadow-paper);
    transition: transform var(--duration-slow) var(--ease-default);
  }
  .head {
    flex: none;
    height: var(--chd);
    display: flex;
    align-items: center;
    padding: 0 var(--cpad);
    font-weight: var(--weight-bold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-on-paper);
  }
  .ph {
    flex: none;
    width: calc(100% - 2 * var(--cpad));
    margin: 0 var(--cpad);
    aspect-ratio: 4 / 3;
  }

  .pocket {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    top: calc(var(--top) + var(--phh) * var(--vis));
    height: var(--ph);
    filter: drop-shadow(0 -1px 2px rgba(17, 23, 16, 0.08)) var(--filter-shadow-paper);
    transition: transform var(--duration-slow) var(--ease-default);
  }
  /* El recorte semicircular es una máscara; el arco de abajo le dibuja el borde */
  .pk-body {
    position: absolute;
    inset: 0;
    padding: calc(var(--nr) + var(--space-12)) var(--space-16) var(--space-12);
    background: var(--bg-paper);
    border: 1px solid var(--border-neutral-secondary);
    -webkit-mask: radial-gradient(circle var(--nr) at 50% 0, transparent calc(var(--nr) - 0.5px), #000 calc(var(--nr) + 0.5px));
    mask: radial-gradient(circle var(--nr) at 50% 0, transparent calc(var(--nr) - 0.5px), #000 calc(var(--nr) + 0.5px));
  }
  .pk-arc {
    position: absolute;
    left: 50%;
    top: calc(var(--nr) * -1);
    width: calc(var(--nr) * 2);
    height: calc(var(--nr) * 2);
    margin-left: calc(var(--nr) * -1);
    border: 1px solid var(--border-neutral-secondary);
    border-radius: 50%;
    clip-path: inset(50% 0 0 0);
    pointer-events: none;
  }

  .env:hover .card,
  .env:focus-visible .card {
    transform: translateY(calc(var(--phh) * (var(--vis) - 1) - 8px)) rotate(-1deg);
  }
  .env:hover .pocket,
  .env:focus-visible .pocket { transform: translateY(4px); }

  @media (prefers-reduced-motion: reduce) {
    .card, .pocket { transition: none; }
  }
</style>

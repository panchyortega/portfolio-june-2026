<script>
  import { base } from '$app/paths';
  import ProjectCardText from './ProjectCardText.svelte';
  import ProjectCardPhoto from './ProjectCardPhoto.svelte';

  /**
   * ProjectCard — variante Clip.
   * Una foto 4:3 con una nota encima sujeta por un clip (con el texto escrito en la nota).
   * Al hover la nota gira en sentido del reloj usando el clip como ancla y deja ver la foto.
   * @prop {string} href - ruta al proyecto (ej: '/proyectos/ucap')
   */
  let { href = '#', title = '', desc = '', image = undefined, imageLabel = '', tags = [] } = $props();
</script>

<div class="cq">
  <a class="clipcard" href="{base}{href}">
    <span class="clip" aria-hidden="true"></span>
    <div class="photo"><ProjectCardPhoto {image} alt={title} {imageLabel} /></div>
    <div class="note"><ProjectCardText {title} {desc} {tags} /></div>
  </a>
</div>

<style>
  .cq { container-type: inline-size; }

  .clipcard {
    --cpp: 10px;     /* margen de la foto dentro del papel */
    --turn: 70deg;   /* cuánto gira la nota al hover (sentido del reloj) */
    --tilt: 1deg;    /* inclinación en reposo de todo el papel */
    display: block;
    position: relative;
    height: calc((100cqw - 2 * var(--cpp)) * 0.75 + 2 * var(--cpp));
    text-decoration: none;
    color: inherit;
    transform: rotate(calc(var(--tilt) * -1));
    transition: transform var(--duration-slow) var(--ease-default);
  }
  .clipcard:hover,
  .clipcard:focus-visible { z-index: 2; }

  .photo {
    position: absolute;
    inset: 0;
    display: flex;
    padding: var(--cpp);
    background: var(--bg-paper);
    border: 1px solid var(--border-neutral-secondary);
    border-radius: var(--radius-default);
    box-shadow: var(--shadow-paper);
  }
  .photo > :global(.photo) { flex: 1; }

  .note {
    position: absolute;
    z-index: 3;
    left: 14px;
    top: 12px;
    width: 64%;
    height: 68%;
    padding: 30px var(--space-16) var(--space-12);
    background: var(--bg-paper);
    border: 1px solid var(--border-neutral-secondary);
    border-radius: var(--radius-default);
    box-shadow: var(--shadow-paper-raised);
    transform-origin: 19px 8px;   /* el clip es el ancla */
    transform: rotate(-1deg);
    transition: transform var(--duration-slow) var(--ease-default);
  }
  .clipcard:hover .note,
  .clipcard:focus-visible .note { transform: rotate(var(--turn)); }

  .clip {
    position: absolute;
    z-index: 5;
    top: -8px;
    left: 26px;
    width: 14px;
    height: 40px;
    border: 2px solid var(--text-secondary);
    border-radius: 7px;
    pointer-events: none;
  }
  .clip::after {
    content: '';
    position: absolute;
    left: 1px;
    right: 1px;
    top: 9px;
    bottom: -3px;
    border: 2px solid var(--text-secondary);
    border-radius: 5px;
  }

  @media (prefers-reduced-motion: reduce) {
    .clipcard, .note { transition: none; }
  }
</style>

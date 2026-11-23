<script>
  /**
   * Video Frame
   * Video de contenido: marco propio (mismo radio que las imágenes), siempre en
   * loop y silenciado; clic o Espacio pausa/reanuda; línea de progreso
   * arrastrable en hover. En el markdown de un proyecto se escribe como una
   * imagen con extensión de video: ![alt](/videos/proyectos/{slug}/x.mp4 "Caption").
   * Markup compartido con markdown.js (videoMarkup) y estilos en blocks.css.
   * @prop {string} src - ruta completa (con base)
   * @prop {string} [alt]
   * @prop {string} [caption]
   */
  import { onMount } from 'svelte';
  import { setupVideos, videoMarkup } from '$lib/videoFrame.js';

  let { src, alt = '', caption = '' } = $props();
  let el;

  onMount(() => setupVideos(el));
</script>

<div bind:this={el}>
  {@html videoMarkup({ src, alt, caption })}
</div>

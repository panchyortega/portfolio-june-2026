<script>
  /**
   * ListItem
   * Ícono a la izquierda y, al costado, un título con su bajada.
   * Para listas de hallazgos, necesidades o aprendizajes dentro del contenido.
   * Estilos globales en src/styles/blocks.css (también se usan desde markdown: :::item nombre-icono).
   * @prop {Component} icon - componente de @lucide/svelte (opcional)
   * @prop {string} title
   * @prop {string} description - bajada en texto pequeño (opcional)
   */
  import Icon from './Icon.svelte';
  let { icon = undefined, title, description = undefined } = $props();
</script>

<div class="list-item">
  {#if icon}<Icon {icon} size="lg" class="list-item-icon" />{/if}
  <div class="list-item-text">
    <p class="type-card"><strong>{title}</strong></p>
    {#if description}<p class="type-card"><small class="type-card-small">{description}</small></p>{/if}
  </div>
</div>

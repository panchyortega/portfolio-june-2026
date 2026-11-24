<script>
  /**
   * Data Card
   * Tarjeta contenedora para datos o descubrimientos dentro del contenido.
   * Acepta cualquier cosa y la apila de arriba hacia abajo con gap fijo.
   * `icon` (opcional): componente de @lucide/svelte que va arriba de la tarjeta.
   * Estilos globales en src/styles/blocks.css (también se usan desde markdown).
   */
  let { icon: Icon = undefined, children } = $props();
</script>

<div class="data-card">
  {#if Icon}<Icon size={28} class="data-card-icon" aria-hidden="true" />{/if}
  {@render children()}
</div>

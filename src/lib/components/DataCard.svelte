<script>
  /**
   * Data Card
   * Tarjeta contenedora para datos o descubrimientos dentro del contenido.
   * Acepta cualquier cosa y la apila de arriba hacia abajo con gap fijo.
   * Estilos globales en src/styles/blocks.css (también se usan desde markdown).
   */
  let { children } = $props();
</script>

<div class="data-card">
  {@render children()}
</div>

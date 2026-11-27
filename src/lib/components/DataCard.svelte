<script>
  /**
   * Data Card
   * Tarjeta contenedora para datos o descubrimientos dentro del contenido.
   * Acepta cualquier cosa y la apila de arriba hacia abajo con gap fijo.
   * `icon` (opcional): componente de @lucide/svelte que va arriba de la tarjeta.
   * Estilos globales en src/styles/blocks.css (también se usan desde markdown).
   */
  import IconBox from './Icon.svelte';
  let { icon: Icon = undefined, children } = $props();
</script>

<div class="data-card">
  {#if Icon}<IconBox icon={Icon} size="lg" class="data-card-icon" />{/if}
  {@render children()}
</div>

<script>
  /**
   * Columns
   * Contenedor de 2, 3 o 4 columnas para el contenido. Cada hijo directo
   * ocupa una columna. El gap es el mismo de la grilla de la home.
   * Se colapsa según el ancho del contenido (no de la pantalla).
   * Estilos globales en src/styles/blocks.css (también se usan desde markdown).
   * @prop {2 | 3 | 4} cols - número de columnas
   */
  let { cols = 2, children } = $props();
</script>

<div class="columns-wrap">
  <div class="columns columns-{cols}">
    {@render children()}
  </div>
</div>

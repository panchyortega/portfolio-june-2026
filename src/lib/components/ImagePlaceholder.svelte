<script>
  /**
   * Image Placeholder
   * Marca de posición mientras no hay imagen real.
   * En el markdown de un proyecto: ![texto](placeholder) o ![texto](placeholder "4/3").
   * Estilos globales en src/styles/blocks.css (también se usan desde markdown).
   * @prop {string} label - texto descriptivo
   * @prop {string} [height] - alto CSS (ej: '200px'); si hay ratio, se ignora
   * @prop {string} [ratio] - proporción CSS (ej: '16/9'); útil dentro de columnas
   */
  let { label = '', height = '200px', ratio = undefined } = $props();
</script>

<div class="img-placeholder" style={ratio ? `aspect-ratio: ${ratio}` : `height: ${height}`}>
  {label}
</div>

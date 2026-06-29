<script>
  /**
   * Image Placeholder
   * Marca de posición mientras no hay imagen real.
   * @prop {string} label - texto descriptivo
   * @prop {string} height - alto CSS (ej: '200px')
   */
  let { label = '', height = '200px' } = $props();
</script>

<div class="img-placeholder" style="height: {height}">
  {label}
</div>

<style>
  .img-placeholder {
    background: var(--bg-neutral-secondary);
    border-radius: var(--radius-default);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--size-xs);
    color: var(--text-disabled);
    letter-spacing: var(--tracking-wide);
    width: 100%;
  }
</style>

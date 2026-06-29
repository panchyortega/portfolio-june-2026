<script>
  /**
   * Callout
   * Bloque destacado con tinte de acento, para citas o notas.
   */
  let { children } = $props();
</script>

<div class="callout type-body">
  {@render children()}
</div>

<style>
  .callout {
    border-left: 2px solid var(--border-accent-subtle);
    padding: var(--space-12) var(--space-16);
    background: var(--bg-accent-subtle);
    border-radius: 0 var(--radius-default) var(--radius-default) 0;
    font-style: italic;
    color: var(--text-accent);
    line-height: 1.6;
    margin: var(--space-24) 0;
  }
</style>

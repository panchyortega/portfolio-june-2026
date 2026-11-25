<script>
  import ImagePlaceholder from './ImagePlaceholder.svelte';

  /**
   * Foto 4:3 de las variantes de card (imagen real o placeholder).
   * @prop {string} [image] - URL de imagen real
   * @prop {string} [alt]
   * @prop {string} [imageLabel] - texto del placeholder si no hay imagen
   */
  let { image = undefined, alt = '', imageLabel = '' } = $props();
</script>

<div class="photo">
  {#if image}
    <img src={image} {alt} />
  {:else}
    <ImagePlaceholder label={imageLabel} height="100%" />
  {/if}
</div>

<style>
  .photo {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--radius-subtle);
    background: var(--bg-neutral-secondary);
  }
  .photo img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .photo :global(.img-placeholder) {
    height: 100%;
    border-radius: 0;
  }
</style>

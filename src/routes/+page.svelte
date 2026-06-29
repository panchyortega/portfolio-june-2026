<script>
  import { base } from '$app/paths';
  // Home — placeholder. Los componentes reales llegan en el Paso 2.
</script>

<svelte:head>
  <title>Fran Ortega — Product Designer</title>
</svelte:head>

<main>
  <h1 class="type-display">Fran Ortega</h1>
  <p class="type-body-lg">Product Designer</p>
  <p class="type-small">Andamiaje SvelteKit funcionando. Los componentes llegan en el siguiente paso.</p>
  <a class="sandbox-link type-label" href="{base}/sandbox">Ver sandbox de componentes →</a>
</main>

<style>
  main {
    max-width: var(--site-max);
    margin: 0 auto;
    padding: var(--spacing-section-md) var(--spacing-content-pad);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-gap-sm);
  }
  .sandbox-link {
    color: var(--text-accent);
    margin-top: var(--space-16);
  }
  .sandbox-link:hover {
    color: var(--text-accent-hover);
  }
</style>

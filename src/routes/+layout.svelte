<script>
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<Nav />

<div class="page">
  {@render children()}
</div>

<Footer />

<style>
  .page {
    min-height: 60vh;
  }
  @media (max-width: 900px) {
    :global(body) {
      padding-bottom: 60px;
    }
  }
</style>

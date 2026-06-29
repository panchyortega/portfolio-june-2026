<script>
  import Tag from '$lib/components/Tag.svelte';
  import Button from '$lib/components/Button.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<svelte:head><title>Sandbox — Átomos</title></svelte:head>

<main>
  <h1 class="type-h1">Sandbox de átomos</h1>

  <section>
    <h2 class="type-h3">Tags</h2>
    <div class="row">
      <Tag variant="neutral">Capstone</Tag>
      <Tag variant="primary">Entregado</Tag>
    </div>
  </section>

  <section>
    <h2 class="type-h3">Buttons</h2>
    <div class="row">
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link" icon="ti-arrow-right">Link</Button>
    </div>
    <div class="row">
      <Button variant="primary" disabled>Primary disabled</Button>
      <Button variant="ghost" disabled>Ghost disabled</Button>
    </div>
  </section>

  <section>
    <h2 class="type-h3">Callout</h2>
    <Callout>El diseño no es cómo se ve, es cómo funciona.</Callout>
  </section>

  <section>
    <h2 class="type-h3">Image Placeholder</h2>
    <ImagePlaceholder label="imagen — Ucap Dashboard" height="160px" />
  </section>

  <section>
    <h2 class="type-h3">Project Card</h2>
    <div class="cards">
      <ProjectCard
        href="#"
        title="Ucap: Dashboard"
        desc="Diseño end-to-end de una plataforma B2B de aprendizaje corporativo con IA."
        imageLabel="imagen — Ucap Dashboard"
        tags={[{ label: 'Profesional', variant: 'primary' }, { label: '2025' }]}
      />
      <ProjectCard
        href="#"
        title="Aurora Design System"
        desc="Sistema de diseño completo para una plataforma académica."
        imageLabel="imagen — Aurora DS"
        tags={[{ label: 'Capstone' }, { label: '2024' }]}
      />
    </div>
  </section>
</main>

<style>
  main {
    max-width: var(--content-max);
    margin: 0 auto;
    padding: var(--spacing-section-sm) var(--spacing-content-pad);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-gap-lg);
  }
  section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-gap-sm);
  }
  .row {
    display: flex;
    gap: var(--spacing-gap-sm);
    align-items: center;
    flex-wrap: wrap;
  }
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-gap-md);
  }
</style>

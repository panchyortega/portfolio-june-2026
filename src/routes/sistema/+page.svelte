<script>
  import Tag from '$lib/components/Tag.svelte';
  import Button from '$lib/components/Button.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import MetaCard from '$lib/components/MetaCard.svelte';
  import ExperienceItem from '$lib/components/ExperienceItem.svelte';

  // ── Inventario automático ──
  // Vite lee la carpeta de componentes en build. Esta lista se actualiza
  // sola cuando agregas o quitas un componente.
  const modules = import.meta.glob('$lib/components/*.svelte', { eager: true });
  const allComponents = Object.keys(modules)
    .map((p) => p.split('/').pop().replace('.svelte', ''))
    .sort();

  // Componentes que SÍ están documentados abajo con un ejemplo real
  const documented = [
    'Tag', 'Button', 'Callout', 'ImagePlaceholder',
    'ProjectCard', 'MetaCard', 'ExperienceItem'
  ];
  // Organismos que viven en contexto (nav, footer) — documentados como "en contexto"
  const inContext = ['Nav', 'Footer', 'TableOfContents'];

  // Cruce automático: ¿hay algún componente sin documentar ni marcar?
  const missing = allComponents.filter(
    (c) => !documented.includes(c) && !inContext.includes(c)
  );

  // ── Tokens de color para mostrar como swatches ──
  const neutralScale = ['50','100','200','300','400','500','600','700','800','900'];
  const primaryScale = ['50','100','200','300','400','500','600','700','800','900'];

  const semanticBg = [
    '--bg-neutral-primary', '--bg-neutral-secondary', '--bg-neutral-tertiary',
    '--bg-accent', '--bg-success', '--bg-warning', '--bg-error'
  ];
  const textTokens = ['--text-primary', '--text-secondary', '--text-accent', '--text-disabled'];

  const typeStyles = [
    { cls: 'type-display', label: 'Display' },
    { cls: 'type-h1', label: 'Heading 1' },
    { cls: 'type-h2', label: 'Heading 2' },
    { cls: 'type-h3', label: 'Heading 3' },
    { cls: 'type-body-lg', label: 'Body Large' },
    { cls: 'type-body', label: 'Body' },
    { cls: 'type-small', label: 'Small' },
    { cls: 'type-label', label: 'Label' },
    { cls: 'type-caption', label: 'Caption' }
  ];

  // Ejemplo para MetaCard / ExperienceItem
  const metaEjemplo = [
    { label: 'Empresa', value: 'Racional' },
    { label: 'Tipo', tags: [{ label: 'Fintech', variant: 'primary' }, { label: 'Mobile' }] },
    { label: 'Año', value: '2026' }
  ];
  const expEjemplo = {
    id: 'demo', empresa: 'Empresa', rol: 'Product Designer', fecha: '2025 — presente',
    tags: ['Fintech', 'Mobile'],
    como: 'Descripción de cómo fue el trabajo en el equipo.',
    logro: 'Lo que se logró durante el período.',
    aprendi: { lead: 'El aprendizaje principal destacado.', rest: 'Y el resto del aprendizaje en texto normal.' }
  };
</script>

<svelte:head><title>Sistema de diseño — Fran Ortega</title></svelte:head>

<main>
  <header class="ds-header">
    <p class="eyebrow type-label">Documentación viva</p>
    <h1 class="ds-title type-h1">Sistema de diseño</h1>
    <p class="ds-intro type-body-lg">
      Cada componente acá es el componente real del sitio, renderizado en vivo.
      La lista de componentes se detecta automáticamente desde el código.
    </p>
  </header>

  <!-- Inventario automático -->
  <section class="ds-section">
    <h2 class="ds-section-title type-h2">Inventario de componentes</h2>
    <p class="ds-count type-small">{allComponents.length} componentes detectados automáticamente</p>
    <div class="inventory">
      {#each allComponents as c}
        <span class="inv-item type-small" class:ctx={inContext.includes(c)} class:warn={missing.includes(c)}>
          {c}
        </span>
      {/each}
    </div>
    {#if missing.length}
      <Callout>
        Hay {missing.length} componente(s) sin documentar: {missing.join(', ')}.
        Agrégalos al showcase de esta página.
      </Callout>
    {/if}
  </section>

  <!-- Colores -->
  <section class="ds-section">
    <h2 class="ds-section-title type-h2">Color — primitivos</h2>
    <p class="scale-name type-label">Neutral</p>
    <div class="swatch-row">
      {#each neutralScale as step}
        <div class="swatch">
          <div class="swatch-color" style="background: var(--neutral-{step})"></div>
          <span class="swatch-label type-caption">{step}</span>
        </div>
      {/each}
    </div>
    <p class="scale-name type-label">Primary</p>
    <div class="swatch-row">
      {#each primaryScale as step}
        <div class="swatch">
          <div class="swatch-color" style="background: var(--primary-{step})"></div>
          <span class="swatch-label type-caption">{step}</span>
        </div>
      {/each}
    </div>
  </section>

  <section class="ds-section">
    <h2 class="ds-section-title type-h2">Color — semánticos</h2>
    <div class="swatch-grid">
      {#each semanticBg as token}
        <div class="swatch-lg">
          <div class="swatch-color-lg" style="background: var({token})"></div>
          <span class="swatch-label type-caption">{token}</span>
        </div>
      {/each}
    </div>
    <p class="scale-name type-label">Texto</p>
    <div class="text-tokens">
      {#each textTokens as token}
        <p style="color: var({token})" class="type-body">{token}</p>
      {/each}
    </div>
  </section>

  <!-- Tipografía -->
  <section class="ds-section">
    <h2 class="ds-section-title type-h2">Tipografía</h2>
    <div class="type-list">
      {#each typeStyles as t}
        <div class="type-row">
          <span class="type-meta type-caption">{t.label}</span>
          <span class={t.cls}>Diseño con sentido</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Átomos -->
  <section class="ds-section">
    <h2 class="ds-section-title type-h2">Átomos</h2>

    <div class="comp-block">
      <p class="comp-name type-label">Tag</p>
      <div class="comp-demo">
        <Tag variant="neutral">Neutral</Tag>
        <Tag variant="primary">Primary</Tag>
      </div>
    </div>

    <div class="comp-block">
      <p class="comp-name type-label">Button</p>
      <div class="comp-demo">
        <Button variant="primary">Primary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </div>
    </div>

    <div class="comp-block">
      <p class="comp-name type-label">Callout</p>
      <div class="comp-demo full">
        <Callout>El diseño no es cómo se ve, es cómo funciona.</Callout>
      </div>
    </div>

    <div class="comp-block">
      <p class="comp-name type-label">ImagePlaceholder</p>
      <div class="comp-demo full">
        <ImagePlaceholder label="imagen de ejemplo" height="120px" />
      </div>
    </div>
  </section>

  <!-- Moléculas -->
  <section class="ds-section">
    <h2 class="ds-section-title type-h2">Moléculas</h2>

    <div class="comp-block">
      <p class="comp-name type-label">ProjectCard</p>
      <div class="comp-demo">
        <div style="max-width: 340px">
          <ProjectCard
            href="#"
            title="Proyecto de ejemplo"
            desc="Descripción breve del caso de estudio."
            imageLabel="imagen"
            tags={[{ label: 'Profesional', variant: 'primary' }, { label: '2025' }]}
          />
        </div>
      </div>
    </div>

    <div class="comp-block">
      <p class="comp-name type-label">MetaCard</p>
      <div class="comp-demo">
        <div style="max-width: 240px"><MetaCard items={metaEjemplo} /></div>
      </div>
    </div>

    <div class="comp-block">
      <p class="comp-name type-label">ExperienceItem</p>
      <div class="comp-demo full">
        <ExperienceItem exp={expEjemplo} />
      </div>
    </div>
  </section>

  <!-- En contexto -->
  <section class="ds-section">
    <h2 class="ds-section-title type-h2">En contexto</h2>
    <p class="ds-intro type-body">
      Nav, Footer y TableOfContents se documentan en uso real: la Nav y el Footer
      están visibles ahora mismo arriba y abajo de esta página; la TOC aparece en
      las páginas de proyecto.
    </p>
  </section>
</main>

<style>
  main {
    max-width: var(--site-max);
    margin: 0 auto;
    padding: var(--spacing-section-md) var(--spacing-content-pad);
  }
  .ds-header { margin-bottom: var(--space-64); max-width: 600px; }
  .eyebrow { color: var(--text-secondary); display: block; margin-bottom: var(--space-12); }
  .ds-title { color: var(--text-primary); margin-bottom: var(--space-16); }
  .ds-intro { color: var(--text-secondary); }

  .ds-section { margin-bottom: var(--space-80); }
  .ds-section-title {
    color: var(--text-primary);
    margin-bottom: var(--space-24);
    padding-bottom: var(--space-12);
    border-bottom: 1px solid var(--border-neutral-primary);
  }
  .ds-count { color: var(--text-secondary); margin-bottom: var(--space-16); }

  /* Inventario */
  .inventory { display: flex; flex-wrap: wrap; gap: var(--space-8); margin-bottom: var(--space-16); }
  .inv-item {
    padding: var(--space-6) var(--space-12);
    background: var(--bg-neutral-secondary);
    color: var(--text-primary);
    border-radius: var(--radius-subtle);
    font-family: var(--font-body);
  }
  .inv-item.ctx { color: var(--text-secondary); }
  .inv-item.warn { background: var(--bg-warning); color: var(--text-warning); }

  /* Swatches */
  .scale-name { color: var(--text-secondary); display: block; margin: var(--space-20) 0 var(--space-8); }
  .swatch-row { display: flex; gap: var(--space-8); flex-wrap: wrap; }
  .swatch { display: flex; flex-direction: column; align-items: center; gap: var(--space-4); }
  .swatch-color {
    width: 56px; height: 56px;
    border-radius: var(--radius-8);
    border: 1px solid var(--border-neutral-primary);
  }
  .swatch-label { color: var(--text-secondary); }

  .swatch-grid { display: flex; flex-wrap: wrap; gap: var(--space-16); margin-bottom: var(--space-24); }
  .swatch-lg { display: flex; flex-direction: column; gap: var(--space-6); }
  .swatch-color-lg {
    width: 120px; height: 72px;
    border-radius: var(--radius-8);
    border: 1px solid var(--border-neutral-primary);
  }
  .text-tokens { display: flex; flex-direction: column; gap: var(--space-8); }

  /* Tipografía */
  .type-list { display: flex; flex-direction: column; gap: var(--space-24); }
  .type-row { display: flex; align-items: baseline; gap: var(--space-24); }
  .type-meta { color: var(--text-secondary); width: 90px; flex-shrink: 0; }

  /* Componentes */
  .comp-block { margin-bottom: var(--space-40); }
  .comp-name { color: var(--text-secondary); display: block; margin-bottom: var(--space-12); }
  .comp-demo {
    display: flex; flex-wrap: wrap; gap: var(--space-16); align-items: center;
    padding: var(--space-24);
    background: var(--bg-neutral-secondary);
    border-radius: var(--radius-loose);
  }
  .comp-demo.full { display: block; }
</style>

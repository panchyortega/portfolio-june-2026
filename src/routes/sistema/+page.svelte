<script>
  import ContentLayout from '$lib/components/ContentLayout.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import MetaCard from '$lib/components/MetaCard.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import Button from '$lib/components/Button.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import ExperienceItem from '$lib/components/ExperienceItem.svelte';

  // ── Inventario automático ──
  const modules = import.meta.glob('$lib/components/*.svelte', { eager: true });
  const allComponents = Object.keys(modules)
    .map((p) => p.split('/').pop().replace('.svelte', ''))
    .sort();

  const documented = ['Tag', 'Button', 'Callout', 'ImagePlaceholder', 'ProjectCard', 'MetaCard', 'ExperienceItem'];
  const inContext = ['Nav', 'Footer', 'TableOfContents', 'ContentLayout', 'PageHeader'];
  const missing = allComponents.filter((c) => !documented.includes(c) && !inContext.includes(c));

  const neutralScale = ['50','100','200','300','400','500','600','700','800','900'];
  const primaryScale = ['50','100','200','300','400','500','600','700','800','900'];
  const semanticBg = ['--bg-neutral-primary','--bg-neutral-secondary','--bg-neutral-tertiary','--bg-accent','--bg-success','--bg-warning','--bg-error'];
  const textTokens = ['--text-primary','--text-secondary','--text-accent','--text-disabled'];

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

  const toc = [
    { text: 'Inventario', id: 'inventario', depth: 2 },
    { text: 'Color — primitivos', id: 'color-primitivos', depth: 2 },
    { text: 'Color — semánticos', id: 'color-semanticos', depth: 2 },
    { text: 'Tipografía', id: 'tipografia', depth: 2 },
    { text: 'Átomos', id: 'atomos', depth: 2 },
    { text: 'Moléculas', id: 'moleculas', depth: 2 },
    { text: 'En contexto', id: 'en-contexto', depth: 2 }
  ];
</script>

<svelte:head><title>Sistema de diseño — Fran Ortega</title></svelte:head>

<ContentLayout tocItems={toc}>
  <PageHeader
    eyebrow="Documentación viva"
    title="Sistema de diseño"
    subtitle="Cada componente acá es el componente real del sitio, renderizado en vivo. La lista se detecta automáticamente desde el código."
  />

  <section class="section" id="inventario">
    <h2 class="section-title type-h2">Inventario de componentes</h2>
    <p class="muted type-small">{allComponents.length} componentes detectados automáticamente</p>
    <div class="inventory">
      {#each allComponents as c}
        <span class="inv-item type-small" class:ctx={inContext.includes(c)} class:warn={missing.includes(c)}>{c}</span>
      {/each}
    </div>
    {#if missing.length}
      <Callout>Hay {missing.length} componente(s) sin documentar: {missing.join(', ')}.</Callout>
    {/if}
  </section>

  <section class="section" id="color-primitivos">
    <h2 class="section-title type-h2">Color — primitivos</h2>
    <p class="scale-name type-label">Neutral</p>
    <div class="swatch-row">
      {#each neutralScale as step}
        <div class="swatch"><div class="swatch-color" style="background: var(--neutral-{step})"></div><span class="swatch-label type-caption">{step}</span></div>
      {/each}
    </div>
    <p class="scale-name type-label">Primary</p>
    <div class="swatch-row">
      {#each primaryScale as step}
        <div class="swatch"><div class="swatch-color" style="background: var(--primary-{step})"></div><span class="swatch-label type-caption">{step}</span></div>
      {/each}
    </div>
  </section>

  <section class="section" id="color-semanticos">
    <h2 class="section-title type-h2">Color — semánticos</h2>
    <div class="swatch-grid">
      {#each semanticBg as token}
        <div class="swatch-lg"><div class="swatch-color-lg" style="background: var({token})"></div><span class="swatch-label type-caption">{token}</span></div>
      {/each}
    </div>
    <p class="scale-name type-label">Texto</p>
    <div class="text-tokens">
      {#each textTokens as token}
        <p style="color: var({token})" class="type-body">{token}</p>
      {/each}
    </div>
  </section>

  <section class="section" id="tipografia">
    <h2 class="section-title type-h2">Tipografía</h2>
    <div class="type-list">
      {#each typeStyles as t}
        <div class="type-row"><span class="type-meta type-caption">{t.label}</span><span class={t.cls}>Diseño con sentido</span></div>
      {/each}
    </div>
  </section>

  <section class="section" id="atomos">
    <h2 class="section-title type-h2">Átomos</h2>
    <div class="comp-block">
      <p class="comp-name type-label">Tag</p>
      <div class="comp-demo"><Tag variant="neutral">Neutral</Tag><Tag variant="primary">Primary</Tag></div>
    </div>
    <div class="comp-block">
      <p class="comp-name type-label">Button</p>
      <div class="comp-demo">
        <Button variant="primary">Primary</Button><Button variant="ghost">Ghost</Button><Button variant="link">Link</Button><Button variant="primary" disabled>Disabled</Button>
      </div>
    </div>
    <div class="comp-block">
      <p class="comp-name type-label">Callout</p>
      <div class="comp-demo full"><Callout>El diseño no es cómo se ve, es cómo funciona.</Callout></div>
    </div>
    <div class="comp-block">
      <p class="comp-name type-label">ImagePlaceholder</p>
      <div class="comp-demo full"><ImagePlaceholder label="imagen de ejemplo" height="120px" /></div>
    </div>
  </section>

  <section class="section" id="moleculas">
    <h2 class="section-title type-h2">Moléculas</h2>
    <div class="comp-block">
      <p class="comp-name type-label">ProjectCard</p>
      <div class="comp-demo"><div style="max-width: 340px"><ProjectCard href="#" title="Proyecto de ejemplo" desc="Descripción breve del caso de estudio." imageLabel="imagen" tags={[{ label: 'Profesional', variant: 'primary' }, { label: '2025' }]} /></div></div>
    </div>
    <div class="comp-block">
      <p class="comp-name type-label">MetaCard</p>
      <div class="comp-demo"><div style="max-width: 240px"><MetaCard items={metaEjemplo} /></div></div>
    </div>
    <div class="comp-block">
      <p class="comp-name type-label">ExperienceItem</p>
      <div class="comp-demo full"><ExperienceItem exp={expEjemplo} /></div>
    </div>
  </section>

  <section class="section" id="en-contexto">
    <h2 class="section-title type-h2">En contexto</h2>
    <p class="muted type-body">
      Nav, Footer, TableOfContents, ContentLayout y PageHeader se documentan en uso real:
      la Nav y el Footer están visibles ahora; la TOC, el layout de 3 columnas y el
      encabezado estructuran esta misma página.
    </p>
  </section>
</ContentLayout>

<style>
  .section { margin-bottom: var(--space-56); }
  .section:last-child { margin-bottom: 0; }
  .section-title {
    color: var(--text-primary);
    margin-bottom: var(--space-24);
    padding-bottom: var(--space-12);
    border-bottom: 1px solid var(--border-neutral-primary);
    scroll-margin-top: calc(var(--nav-height) + var(--space-24));
  }
  .muted { color: var(--text-secondary); margin-bottom: var(--space-16); }

  .inventory { display: flex; flex-wrap: wrap; gap: var(--space-8); margin-bottom: var(--space-16); }
  .inv-item { padding: var(--space-6) var(--space-12); background: var(--bg-neutral-secondary); color: var(--text-primary); border-radius: var(--radius-subtle); font-family: var(--font-body); }
  .inv-item.ctx { color: var(--text-secondary); }
  .inv-item.warn { background: var(--bg-warning); color: var(--text-warning); }

  .scale-name { color: var(--text-secondary); display: block; margin: var(--space-20) 0 var(--space-8); }
  .swatch-row { display: flex; gap: var(--space-8); flex-wrap: wrap; }
  .swatch { display: flex; flex-direction: column; align-items: center; gap: var(--space-4); }
  .swatch-color { width: 48px; height: 48px; border-radius: var(--radius-8); border: 1px solid var(--border-neutral-primary); }
  .swatch-label { color: var(--text-secondary); }
  .swatch-grid { display: flex; flex-wrap: wrap; gap: var(--space-12); margin-bottom: var(--space-24); }
  .swatch-lg { display: flex; flex-direction: column; gap: var(--space-6); }
  .swatch-color-lg { width: 100px; height: 64px; border-radius: var(--radius-8); border: 1px solid var(--border-neutral-primary); }
  .text-tokens { display: flex; flex-direction: column; gap: var(--space-8); }

  .type-list { display: flex; flex-direction: column; gap: var(--space-24); }
  .type-row { display: flex; align-items: baseline; gap: var(--space-24); }
  .type-meta { color: var(--text-secondary); width: 80px; flex-shrink: 0; }

  .comp-block { margin-bottom: var(--space-40); }
  .comp-name { color: var(--text-secondary); display: block; margin-bottom: var(--space-12); }
  .comp-demo { display: flex; flex-wrap: wrap; gap: var(--space-16); align-items: center; padding: var(--space-24); background: var(--bg-neutral-secondary); border-radius: var(--radius-loose); }
  .comp-demo.full { display: block; }
</style>

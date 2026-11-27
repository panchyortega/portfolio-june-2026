<script>
  import { onMount } from 'svelte';
  import { setupMermaid } from '$lib/mermaid.js';
  import ContentLayout from '$lib/components/ContentLayout.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import MetaCard from '$lib/components/MetaCard.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import Button from '$lib/components/Button.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import ExperienceItem from '$lib/components/ExperienceItem.svelte';
  import Columns from '$lib/components/Columns.svelte';
  import DataCard from '$lib/components/DataCard.svelte';
  import VideoFrame from '$lib/components/VideoFrame.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import ListItem from '$lib/components/ListItem.svelte';
  import { Search, ArrowRight, Headset } from '@lucide/svelte';
  import { base } from '$app/paths';

  let diagramaEl;
  onMount(() => setupMermaid(diagramaEl));

  // ── Inventario automático ──
  const modules = import.meta.glob('$lib/components/*.svelte', { eager: true });
  const allComponents = Object.keys(modules)
    .map((p) => p.split('/').pop().replace('.svelte', ''))
    .sort();

  const documented = ['Icon', 'Tag', 'Button', 'Callout', 'ImagePlaceholder', 'ProjectCard', 'MetaCard', 'ExperienceItem', 'Columns', 'DataCard', 'ListItem', 'VideoFrame'];
  const inContext = ['Nav', 'Footer', 'TableOfContents', 'ContentLayout', 'PageHeader', 'HeroPhotos', 'ProjectCardTicket', 'ProjectCardSobre', 'ProjectCardClip', 'ProjectCardText', 'ProjectCardPhoto'];
  const missing = allComponents.filter((c) => !documented.includes(c) && !inContext.includes(c));

  const neutralScale = ['white', '50','100','200','300','400','500','600','700','800','900', 'black'];
  const primaryScale = ['50','100','200','300','400','500','600','700','800','900'];
  const semanticBg = ['--bg-neutral-primary','--bg-neutral-secondary','--bg-neutral-tertiary','--bg-accent','--bg-success','--bg-warning','--bg-error'];
  const textTokens = ['--text-primary','--text-secondary','--text-accent','--text-disabled'];
  const iconTokens = ['--icon-primary','--icon-secondary','--icon-accent','--icon-disabled'];

  const fontFamilies = [
    { cls: 'font-display', name: 'DM Serif Display', uso: 'Display del hero', muestra: 'Aa' },
    { cls: 'font-heading', name: 'DM Serif Text', uso: 'Headings h1, h2, h3', muestra: 'Aa' },
    { cls: 'font-body', name: 'DM Sans', uso: 'Párrafos y UI · 300–700', muestra: 'Aa' }
  ];

  // spec: familia · tamaño web / mobile (px) · interlineado
  const typeStyles = [
    { cls: 'type-display', label: 'Display', spec: 'DM Serif Display · 64 / 40 · 1.15', texto: 'Diseño con sentido' },
    { cls: 'type-h1', label: 'Heading 1', spec: 'DM Serif Text · 48 / 32 · 1.15', texto: 'Diseño con sentido' },
    { cls: 'type-h2', label: 'Heading 2', spec: 'DM Serif Text · 32 / 28 · 1.35', texto: 'Diseño con sentido' },
    { cls: 'type-h3', label: 'Heading 3', spec: 'DM Serif Text · 24 / 20 · 1.35', texto: 'Diseño con sentido' },
    { cls: 'type-body-lg', label: 'Body Large', spec: 'DM Sans · 18 · 1.7', texto: 'Diseño productos digitales que la gente entiende a la primera.' },
    { cls: 'type-body', label: 'Body', spec: 'DM Sans · 16 · 1.7', texto: 'Diseño productos digitales que la gente entiende a la primera.' },
    { cls: 'type-small', label: 'Small', spec: 'DM Sans · 12 · 1.7', texto: 'Diseño productos digitales que la gente entiende a la primera.' },
    { cls: 'type-card', label: 'Card', spec: 'DM Sans · 16 · 1.35', texto: 'Diseño productos digitales que la gente entiende a la primera.' },
    { cls: 'type-card-small', label: 'Card small', spec: 'DM Sans · 12 · 1.35', texto: 'Diseño productos digitales que la gente entiende a la primera.' },
    { cls: 'type-callout', label: 'Callout', spec: 'DM Sans cursiva · 16 · 1.7', texto: 'Diseño productos digitales que la gente entiende a la primera.' },
    { cls: 'type-meta-value', label: 'Meta value', spec: 'DM Sans · 12 · 1.35', texto: 'Racional · Fintech' },
    { cls: 'type-toc', label: 'Índice', spec: 'DM Sans · 12 · 1.35', texto: 'Problema y objetivo' },
    { cls: 'type-label', label: 'Label', spec: 'DM Sans medium · 14 · 1.15', texto: 'Diseño con sentido' },
    { cls: 'type-overline', label: 'Overline', spec: 'DM Sans medium · 14 · mayúsculas', texto: 'Diseño con sentido' },
    { cls: 'type-caption', label: 'Caption', spec: 'DM Sans light · 12 · 1.35', texto: 'Diseño con sentido' }
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
    { text: 'Diagramas', id: 'diagramas', depth: 2 },
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
    <p class="scale-name type-label">Íconos</p>
    <div class="text-tokens">
      {#each iconTokens as token}
        <p style="--icon-color: var({token})" class="icon-token type-body"><Icon icon={Search} size="md" /> {token}</p>
      {/each}
    </div>
  </section>

  <section class="section" id="tipografia">
    <h2 class="section-title type-h2">Tipografía</h2>
    <p class="muted type-small">Familia DM. Los tamaños de display y headings cambian bajo 900px (web / mobile); el resto es igual en ambos.</p>
    <div class="family-grid">
      {#each fontFamilies as f}
        <div class="family-card">
          <span class="family-sample {f.cls}">{f.muestra}</span>
          <span class="type-label">{f.name}</span>
          <span class="type-caption family-use">{f.uso}</span>
        </div>
      {/each}
    </div>
    <div class="type-list">
      {#each typeStyles as t}
        <div class="type-row">
          <div class="type-meta">
            <span class="type-label">{t.label}</span>
            <span class="type-caption">{t.spec}</span>
          </div>
          <span class="type-sample {t.cls}">{t.texto}</span>
        </div>
      {/each}
    </div>
  </section>

  <section class="section" id="atomos">
    <h2 class="section-title type-h2">Átomos</h2>
    <div class="comp-block">
      <p class="comp-name type-label">Icon</p>
      <div class="comp-demo icon-demo">
        <span class="icon-sample"><Icon icon={Search} size="sm" /><span class="type-caption">sm</span></span>
        <span class="icon-sample"><Icon icon={Search} size="md" /><span class="type-caption">md</span></span>
        <span class="icon-sample"><Icon icon={Search} size="lg" /><span class="type-caption">lg</span></span>
        <Button variant="primary">Siguiente <Icon icon={ArrowRight} size="md" /></Button>
      </div>
      <p class="muted type-small">Contenedor de tamaño fijo: el ícono lo llena sin deformarse. Cada tamaño trae su grosor de trazo. El color lo da el contexto con un token --icon-*.</p>
    </div>
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
      <p class="muted type-small">En el markdown de un proyecto: <code>![texto](placeholder)</code>, o <code>![texto](placeholder "4/3")</code> para otra proporción (por defecto 16/9).</p>
    </div>
    <div class="comp-block">
      <p class="comp-name type-label">VideoFrame</p>
      <div class="comp-demo full"><div style="max-width: 480px"><VideoFrame src={`${base}/videos/sistema/demo.mp4`} alt="Video de ejemplo" caption="Caption opcional" /></div></div>
      <p class="muted type-small">Siempre en loop y silenciado. Clic o Espacio pausa y reanuda; en hover aparece la línea de progreso, que se arrastra para saltar.</p>
      <p class="muted type-small">En el markdown de un proyecto, igual que una imagen pero con un video: <code>![alt](/videos/proyectos/slug/archivo.mp4 "Caption")</code>.</p>
    </div>
  </section>

  <section class="section" id="moleculas">
    <h2 class="section-title type-h2">Moléculas</h2>
    <div class="comp-block">
      <p class="comp-name type-label">ProjectCard</p>
      <div class="comp-demo"><div style="max-width: 340px"><ProjectCard variant="clasica" href="#" title="Proyecto de ejemplo" desc="Descripción breve del caso de estudio." imageLabel="imagen" tags={[{ label: 'Profesional', variant: 'primary' }, { label: '2025' }]} /></div></div>
    </div>
    <div class="comp-block">
      <p class="comp-name type-label">ProjectCard — variantes</p>
      <p class="muted type-small">El <code>sobre</code> es la card oficial y la que usa el home (es el valor por defecto). <code>"clasica"</code>, <code>"ticket"</code> y <code>"clip"</code> son alternativas guardadas: objetos de papel con su propia animación al hover. Reciben las mismas props que la card base (la bajada se ajusta a lo que quepa).</p>
      <div class="comp-demo variants">
        {#each ['ticket', 'sobre', 'clip'] as v}
          <div class="variant-cell">
            <span class="type-small muted">variant="{v}"</span>
            <ProjectCard variant={v} href="#" title="Resumen pre-confirmación de depósito" desc="Pantalla que se muestra antes de confirmar un depósito en Portafolios de Racional: la persona ve cómo se repartirá su plata." imageLabel="imagen 4:3" tags={[{ label: 'Profesional', variant: 'primary' }, { label: '2026' }]} />
          </div>
        {/each}
      </div>
    </div>
    <div class="comp-block">
      <p class="comp-name type-label">MetaCard</p>
      <div class="comp-demo"><div style="max-width: 240px"><MetaCard items={metaEjemplo} /></div></div>
    </div>
    <div class="comp-block">
      <p class="comp-name type-label">DataCard</p>
      <div class="comp-demo"><div style="max-width: 280px">
        <DataCard>
          <h4 class="type-h3">7 de cada 10 personas</h4>
          <p class="type-card">No sabían por qué parte de su plata quedaba sin invertir.</p>
          <Tag variant="primary">Hallazgo</Tag>
        </DataCard>
      </div></div>
      <p class="muted type-small">Contenedor libre: apila lo que le pongas, de arriba hacia abajo.</p>
    </div>
    <div class="comp-block">
      <p class="comp-name type-label">ListItem</p>
      <div class="comp-demo"><div style="max-width: 280px">
        <ListItem icon={Headset} title="Soporte" description="Confirmación de solicitudes recurrentes." />
      </div></div>
      <p class="muted type-small">Tarjeta en web, list item en mobile (ícono a la izquierda). En el markdown: <code>:::item nombre-icono</code>.</p>
    </div>
    <div class="comp-block">
      <p class="comp-name type-label">Columns</p>
      <div class="comp-demo full">
        <Columns cols={3}>
          <DataCard><h4 class="type-h3">Dato uno</h4><p class="type-card">Texto de ejemplo.</p></DataCard>
          <DataCard><h4 class="type-h3">Dato dos</h4><p class="type-card">Texto de ejemplo.</p></DataCard>
          <DataCard><h4 class="type-h3">Dato tres</h4><p class="type-card">Texto de ejemplo.</p></DataCard>
        </Columns>
      </div>
      <p class="muted type-small">2, 3 o 4 columnas con el gap de la home. Se apilan según el ancho del contenido.</p>
      <p class="muted type-small">En el markdown de un proyecto: <code>::::columnas 3</code> con <code>:::tarjeta</code> adentro, cada bloque cerrado con sus mismos dos puntos. El externo lleva un <code>:</code> más.</p>
    </div>
    <div class="comp-block">
      <p class="comp-name type-label">ExperienceItem</p>
      <div class="comp-demo full"><ExperienceItem exp={expEjemplo} /></div>
    </div>
  </section>

  <section class="section" id="diagramas">
    <h2 class="section-title type-h2">Diagramas</h2>
    <p class="muted type-body">
      Los esquemas se escriben como bloques <code>mermaid</code> en el markdown de un
      proyecto y se renderizan con los tokens del sistema: borde y líneas en acento,
      relleno y texto neutros. Figuras: círculo (inicio/fin), rectángulo (paso), rombo (decisión).
    </p>
    <div class="diagram-demo" bind:this={diagramaEl}>
      <pre class="mermaid">{`flowchart TD
    A((Inicio)) --> B[Paso del proceso]
    B --> C{¿Decisión?}
    C -- No --> B
    C -- Sí --> D((Fin))`}</pre>
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
  .section { margin-bottom: var(--spacing-section-sm); }
  .section:last-child { margin-bottom: 0; }
  .section-title {
    color: var(--text-primary);
    margin-bottom: var(--spacing-stack-lg);
    padding-bottom: var(--spacing-inset-sm);
    border-bottom: var(--border-width-sm) solid var(--border-neutral-primary);
    scroll-margin-top: calc(var(--nav-height) + var(--spacing-stack-lg));
  }
  .muted { color: var(--text-secondary); margin-bottom: var(--spacing-stack-md); }

  .inventory { display: flex; flex-wrap: wrap; gap: var(--spacing-gap-xs); margin-bottom: var(--spacing-stack-md); }
  .inv-item { padding: var(--spacing-inset-xs) var(--spacing-inset-sm); background: var(--bg-neutral-secondary); color: var(--text-primary); border-radius: var(--radius-subtle); font-family: var(--font-body); }
  .inv-item.ctx { color: var(--text-secondary); }
  .inv-item.warn { background: var(--bg-warning); color: var(--text-warning); }

  .scale-name { color: var(--text-secondary); display: block; margin: var(--spacing-stack-lg) 0 var(--spacing-stack-xs); }
  .swatch-row { display: flex; gap: var(--spacing-gap-xs); flex-wrap: wrap; }
  .swatch { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-gap-2xs); }
  .swatch-color { width: 48px; height: 48px; border-radius: var(--radius-8); border: var(--border-width-sm) solid var(--border-neutral-primary); }
  .swatch-label { color: var(--text-secondary); }
  .swatch-grid { display: flex; flex-wrap: wrap; gap: var(--spacing-gap-sm); margin-bottom: var(--spacing-stack-lg); }
  .swatch-lg { display: flex; flex-direction: column; gap: var(--spacing-gap-xs); }
  .swatch-color-lg { width: 100px; height: 64px; border-radius: var(--radius-8); border: var(--border-width-sm) solid var(--border-neutral-primary); }
  .text-tokens { display: flex; flex-direction: column; gap: var(--spacing-gap-xs); }

  .type-list { display: flex; flex-direction: column; gap: var(--spacing-gap-lg); }
  .type-row { display: flex; align-items: baseline; gap: var(--spacing-gap-lg); }
  .type-meta { color: var(--text-secondary); width: 220px; flex-shrink: 0; display: flex; flex-direction: column; gap: var(--spacing-gap-2xs); }
  .type-sample { min-width: 0; overflow-wrap: anywhere; }
  .family-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-gap-md); margin-bottom: var(--spacing-stack-xl); }
  .family-card { display: flex; flex-direction: column; gap: var(--spacing-gap-2xs); padding: var(--spacing-inset-lg); background: var(--bg-neutral-secondary); border-radius: var(--radius-loose); }
  .family-sample { font-size: var(--size-6xl); line-height: var(--lh-tight); color: var(--text-primary); }
  .family-use { color: var(--text-secondary); }
  .font-display { font-family: var(--font-display); }
  .font-heading { font-family: var(--font-heading); }
  .font-body { font-family: var(--font-body); }
  @media (max-width: 900px) {
    .type-row { flex-direction: column; align-items: flex-start; gap: var(--spacing-gap-xs); }
    .type-meta { width: auto; }
  }

  .comp-block { margin-bottom: var(--spacing-stack-2xl); }
  .icon-demo { align-items: center; }
  .icon-sample { display: inline-flex; flex-direction: column; align-items: center; gap: var(--spacing-gap-xs); color: var(--text-secondary); }
  .icon-token { display: flex; align-items: center; gap: var(--spacing-gap-xs); }
  .comp-name { color: var(--text-secondary); display: block; margin-bottom: var(--spacing-stack-sm); }
  .comp-demo { display: flex; flex-wrap: wrap; gap: var(--spacing-gap-md); align-items: center; padding: var(--spacing-inset-lg); background: var(--bg-neutral-secondary); border-radius: var(--radius-loose); }
  .comp-demo.full { display: block; }
  .comp-demo.variants { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-gap-xl); align-items: start; }
  .variant-cell { display: flex; flex-direction: column; gap: var(--spacing-gap-sm); }

  .diagram-demo {
    margin-top: var(--spacing-stack-lg);
    display: flex;
    justify-content: center;
  }
  .diagram-demo :global(pre.mermaid) {
    background: none;
    border: none;
    padding: 0;
    font-size: 0;
  }
  .diagram-demo :global(pre.mermaid svg) {
    max-width: 100%;
    height: auto;
  }
</style>

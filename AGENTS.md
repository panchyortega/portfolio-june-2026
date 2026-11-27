# AGENTS.md

Contexto para agentes de IA que trabajen en este repo. Es el portafolio
personal de Francisca Ortega (product designer). Lee esto antes de hacer cambios.

## Acceso al repo

Para editar el repo (clonar, commitear, pushear, abrir PRs) **no hace falta un
token**. En las sesiones de Claude se adjunta con la integración de GitHub
conectada a la cuenta de Panchy:

1. Adjuntar el repo con acceso `push` (herramienta `add_repo`) y clonarlo.
2. Si falla por permisos, pedirle a Panchy que reconecte GitHub en
   Configuración → Conectores, o que habilite este repo para su organización.
3. Solo si la integración no está disponible, pedirle un Personal Access Token
   fine-grained limitado a `panchyortega/portfolio-june-2026`, con
   **Contents** y **Workflows** en Read and write (Workflows es necesario para
   tocar `.github/workflows/`), expiración corta, y recordarle revocarlo al
   terminar.

Nunca pidas ni pegues tokens en el chat si la integración funciona.

## Stack

- **SvelteKit** con **Svelte 5** (usa runes: `$props`, `$state`, `$derived`, `$effect`; NO la API vieja `export let`).
- **adapter-static**: el sitio se prerenderiza a HTML estático. No hay servidor.
- Estilos en **CSS plano con custom properties** (tokens). No hay Tailwind ni preprocesador.
- Íconos: **@lucide/svelte** (componentes, no fuente web).
- Markdown de contenido: **marked**.
- Se publica en **GitHub Pages** bajo el base path `/portfolio-june-2026`.

## Comandos

```bash
npm install        # instalar
npm run dev        # desarrollo local
npm run build      # build de producción (genera build/) — corre esto para verificar antes de commitear
npm run preview    # previsualizar el build
```

Verifica SIEMPRE que `npm run build` pase antes de commitear. El prerender es **estricto**: si un `<a>` apunta a una ruta que no existe, el build falla.

## Arquitectura de tokens (lo más importante)

Tres capas, en este orden estricto:

1. `src/styles/primitives.css` — valores crudos (`--neutral-500`, `--primary-600`, `--size-lg`, `--space-16`...). **Nunca se usan directo en componentes**, salvo tipografía.
2. `src/styles/semantics.css` — tokens por contexto que referencian primitivos (`--bg-accent`, `--text-primary`, `--border-error`...). **Esto es lo que usan los componentes.**
3. Componentes — su `<style>` usa solo tokens semánticos para color/radius, y primitivos solo para tipografía.

Reglas:
- Nunca pongas un color hex ni un primitivo de color directo en un componente. Usa el semántico.
- Si falta un semántico para tu caso, agrégalo en `semantics.css`, no improvises en el componente.
- El **modo oscuro** funciona remapeando semánticos bajo `:root[data-theme='dark']` en `semantics.css`. No toca componentes. Si agregas un semántico de color nuevo, considera su versión oscura.
- Las clases de tipografía compuestas (`.type-h1`, `.type-body`, etc.) son globales y viven en `semantics.css`. Úsalas en vez de redefinir font-size/weight. El markdown de los proyectos ya sale con ellas (`markdown.js` agrega `.type-h2`, `.type-h3`, `.type-body`, y `.type-card` / `.type-card-small` dentro de las tarjetas): no redefinas tipografía en `.prose`.
- **Íconos**: siempre con `<Icon icon={NombreLucide} size="sm|md|lg" />` (nunca `<Lucide size={n}>` suelto). Es un contenedor fijo (`--icon-size-*`, que salen de `--space-*`) que el ícono llena sin deformarse; cada tamaño trae su grosor (`--icon-stroke-*`, en px reales). sm: junto a texto pequeño · md: botones y nav · lg: cards. El color lo define el contexto con `--icon-color: var(--icon-*)` junto al `color` del texto (incluye hover/active/disabled). En HTML del markdown: `<span class="icon icon-lg">${lucideSvg(...)}</span>`.
- **Grosores de línea**: los valores viven en primitivos `--stroke-*`; los bordes usan `--border-width-sm|md|lg`. Excepción: el home y sus cards de papel (HeroPhotos, ProjectCard*) pueden tener grosores propios.

## Contenido (cómo se agregan cosas)

- **Proyectos**: se editan en `src/lib/data/projects.js`. Cada proyecto tiene `slug`, `label`, `title`, `desc`, `tags`, `meta` (sidebar) y `content` (markdown). La página, la nav y la TOC se generan solos. El tiempo de lectura se calcula automáticamente con `readingTime()` (en `markdown.js`, ~200 palabras/min) — no lo agregues a mano en los datos del proyecto; lo consumen `ProjectCard` (home) y `PageHeader` (página de detalle).
- **Contenido en archivo `.md` aparte**: los proyectos nuevos guardan el cuerpo en `src/lib/data/proyectos/{slug}.md` y `projects.js` lo importa con `?raw` (`content: miMarkdown`). Es lo más cómodo para editar a mano (también desde el lápiz de GitHub). Los comentarios `<!-- PENDIENTE ... -->` marcan huecos de imagen/dato: no se ven en el sitio ni cuentan para el tiempo de lectura. Los proyectos viejos siguen con el markdown dentro de `projects.js`.
- **Bloques de contenido (`Columns`, `DataCard`)**: en el markdown de un proyecto se escriben con `:::`. `::::columnas 3` (2, 3 o 4) agrupa en columnas y `:::tarjeta` es una card que apila su contenido de arriba abajo; el contenedor externo lleva un `:` más que los internos para poder anidarse (`::::columnas` → `:::tarjeta`). Cada uno se cierra con la misma cantidad de `:` con que abrió. Dentro de una tarjeta, `####` es un título grande (úsalo poco; en las cards de los casos van mejor **negrita** + `<small>…</small>`, una bajada en texto pequeño: estilo `.type-small`, color secundario). `:::item nombre-icono` (componente `ListItem`) se ve como tarjeta con ícono arriba en web y como list item (ícono a la izquierda, negrita + `<small>` al costado) en mobile: úsalo para hallazgos, necesidades o aprendizajes con ícono; deja `:::tarjeta` para contenido que necesita caja (listas, imágenes). `:::tarjeta nombre-icono` pone un ícono Lucide arriba (solo los registrados en `src/lib/lucideSvg.js`; para agregar uno, copia su `iconNode` ahí). Las columnas usan el gap `--spacing-gap-md` (el de la grilla de la home) y se apilan según el ancho del contenido (container query). Excepción a "estilos en cada .svelte": sus estilos (y los de `ImagePlaceholder` y `VideoFrame`) son globales en `src/styles/blocks.css` porque el markdown emite el mismo HTML que los componentes Svelte; si cambias uno, cambia el otro (`markdown.js` y los `.svelte`).
- **Placeholders de imagen**: `![texto](placeholder)` en el markdown renderiza el mismo `.img-placeholder` del componente `ImagePlaceholder` (16/9 por defecto; `![texto](placeholder "4/3")` para otra proporción). Sirve para reservar el lugar de una imagen que todavía no existe; se reemplaza por la ruta real cuando esté.
- **Cards de proyecto**: el listado del home usa **solo** `ProjectCard` con `variant="clasica"` (es también el valor por defecto). Es una decisión de Panchy (nov 2026: volvió a la clásica después de probar el sobre): no lo cambies a `sobre`, `ticket` ni `clip` a menos que ella lo pida explícitamente. Las otras variantes siguen documentadas en `/sistema`.
- **Sobre mí**: datos en `src/lib/data/about.js`.
- **Imágenes**: se suben a `static/images/proyectos/{slug}/` y se referencian en el markdown con `![alt](/images/proyectos/{slug}/archivo.png "Caption opcional")`. El render (`markdown.js`) las envuelve en un marco `.zoom-image` con fondo punteado; el comportamiento de pan + zoom in-situ vive en `src/lib/zoomImage.js` (`setupZoomImages()`, llamado en `onMount` de la página de proyecto junto a `setupMermaid()`). El marco toma el aspect ratio real de la imagen (fijado por JS al cargar, no un valor fijo). No uses `<img>` a mano en el contenido, y no reintroduzcas el patrón de lightbox/overlay: la interacción es siempre dentro del propio marco.
- **Videos**: se suben a `static/videos/proyectos/{slug}/` (MP4 H.264, idealmente 5–15 MB; GitHub rechaza archivos de más de 100 MB) y se escriben igual que una imagen: `![alt](/videos/proyectos/{slug}/archivo.mp4 "Caption opcional")` (también `.webm`, `.mov`, `.m4v`). `markdown.js` los detecta por la extensión y renderiza un marco propio `.video-frame` (mismo radio que las imágenes, sin el fondo punteado ni el zoom). Siempre en loop y silenciados, sin controles nativos: clic o Espacio pausa/reanuda, y en hover aparece una línea de progreso superpuesta que se arrastra para saltar. Solo se reproducen mientras se ven, y con `prefers-reduced-motion` parten en pausa. El comportamiento y el HTML (`videoMarkup()`) viven en `src/lib/videoFrame.js` (`setupVideos()`, llamado en `onMount` de la página de proyecto); el componente `VideoFrame.svelte` usa ese mismo markup, y los estilos son globales en `src/styles/blocks.css`. Un GIF no se puede pausar ni recorrer: conviértelo a MP4 (`ffmpeg -i in.gif -movflags +faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" out.mp4`).
- **Diagramas**: bloques ` ```mermaid ` en el markdown se renderizan como diagramas de flujo. Se estilizan con tokens (borde y líneas `--border-accent`, relleno `--bg-neutral-primary`, texto `--text-primary` en `--size-sm` con `--font-body`) vía `themeVariables` leídos en `proyectos/[slug]/+page.svelte`, y se re-renderizan al cambiar de tema. No agregues otros colores ni una sección de simbología.

## Página de sistema de diseño

`src/routes/sistema/+page.svelte` detecta automáticamente los componentes vía `import.meta.glob`. Si creas un componente nuevo, agrégalo a la lista `documented` (con un ejemplo en el showcase) o a `inContext` (si es estructural como Nav/Footer/ContentLayout). Si no, la página lo marcará en amarillo como "sin documentar".

## Layout de páginas internas

Proyecto, Sobre mí y Sistema usan `ContentLayout` (grid de 3 columnas con divisores que llegan al footer) + `PageHeader`. El sidebar izquierdo es opcional (Sobre mí y Sistema lo dejan vacío a propósito). La TOC derecha hace scroll-spy sobre los `id` de los `<h2>`/`<h3>`.

## Ideas futuras (no construidas aún)

El repo tiene **dos** carpetas de ideas, con propósitos distintos —
distínguelas antes de asumir cuál aplica:

- **`ideas/`** — ideas sobre features/arquitectura de **este sitio**
  (el portafolio en sí: componentes, layout, contenido interactivo).
  Ver `ideas/README.md` para el índice y cómo agregar una idea nueva.
- **`proyectos-futuros/`** — banco de ideas de **proyectos de diseño**
  que Panchy podría hacer a futuro (posibles casos de estudio) — no
  tienen relación con el código del sitio. Ver
  `proyectos-futuros/README.md`.

**Consulta `ideas/` cuando:**
- La persona pida algo que suene a una conversación anterior sobre el
  sitio ("lo de los gráficos interactivos", "esa idea de los widgets").
- Vayas a proponer arquitectura para contenido no-texto/no-imagen en los
  proyectos, o cambios estructurales a la home/páginas — probablemente
  ya se pensó una dirección, no la reinventes desde cero.

**Consulta `proyectos-futuros/` cuando:**
- La persona diga que quiere diseñar algo nuevo pero no sepa qué, o
  pregunte "¿qué ideas tenía guardadas?" refiriéndose a proyectos (no a
  features del sitio).
- No confundas esta carpeta con `ideas/`: acá no hay nada que construir
  en el código de este repo — son ideas de proyectos de diseño en sí,
  ajenas al sitio. Si alguna se convierte en proyecto real, se agrega a
  `src/lib/data/projects.js` como cualquier otro proyecto.

Si implementas algo de una idea documentada en cualquiera de las dos
carpetas, actualiza ese archivo con una línea de estado en vez de
borrarlo (queda como registro de por qué se hizo así).

## Deploy

- Push a `main` dispara `.github/workflows/deploy.yml`, que hace build y publica a Pages.
- `build/`, `.svelte-kit/` y `node_modules/` están en `.gitignore`. **Nunca los commitees.**
- El base path `/portfolio-june-2026` está en `svelte.config.js`. Los links internos deben usar `import { base } from '$app/paths'` y construirse como `{base}/ruta`. Componentes como `Button` NO anteponen base solos; el que llama pasa la ruta completa.

## Convenciones

- Español en UI y comentarios.
- Componentes en PascalCase (`ProjectCard.svelte`), datos y utilidades en camelCase.
- Commits descriptivos con prefijo tipo `feat:`, `fix:`, `refactor:`, `chore:`, `ci:`.
- Mantén los componentes chicos y de una responsabilidad. Si un componente se vuelve una página entera, descomponlo.

## Límites

- No reintroduzcas el sitio viejo (HTML/CSS/JS estáticos): se eliminó, el sitio es 100% SvelteKit en `src/`.
- No uses `localStorage`/`sessionStorage` salvo el store de tema ya existente, y siempre con guarda de `browser`.
- No agregues dependencias pesadas sin necesidad real.
- Si algo no calza con la arquitectura de tokens o el flujo de contenido, pregunta antes de improvisar.

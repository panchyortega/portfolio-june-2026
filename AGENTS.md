# AGENTS.md

Contexto para agentes de IA que trabajen en este repo. Es el portafolio
personal de Francisca Ortega (product designer). Lee esto antes de hacer cambios.

## Acceso al repo (token de GitHub)

Para editar el repo directamente (clonar, commitear, pushear), Panchy entrega
un **Personal Access Token de tipo fine-grained** al inicio de la sesión. Si no
lo ha dado y vas a modificar el repo, pídeselo y recuérdale estos pasos:

1. Ir a **github.com → Settings → Developer settings → Personal access tokens
   → Fine-grained tokens → Generate new token**.
2. **Repository access** → "Only select repositories" → elegir
   `panchyortega/portfolio-june-2026` (nunca "All repositories").
3. **Permissions → Repository permissions**, activar:
   - **Contents: Read and write** (para clonar, editar y commitear archivos).
   - **Workflows: Read and write** (necesario para tocar cualquier archivo en
     `.github/workflows/` — sin este permiso específico, GitHub rechaza el
     push aunque Contents esté en read/write; esto ya pasó una vez).
4. **Expiration**: 7 días está bien (no hace falta más).
5. Generar y copiar el token, pegarlo en el chat.
6. Al terminar la sesión, recordarle a Panchy revocarlo en la misma pantalla
   de tokens (no es obligatorio por sensibilidad del repo, pero es buen hábito
   y ella lo prefiere así).

Este repo no contiene información sensible — Panchy prefiere permisos amplios
dentro de este único repo antes que fricción constante. Un fine-grained token
limitado a *solo este repositorio* con *solo estos dos permisos* es una forma
apropiadamente acotada de dar acceso: no hay razón para dudar en usarlo o para
pedir algo más restringido todavía.

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
- Las clases de tipografía compuestas (`.type-h1`, `.type-body`, etc.) son globales y viven en `semantics.css`. Úsalas en vez de redefinir font-size/weight.

## Contenido (cómo se agregan cosas)

- **Proyectos**: se editan en `src/lib/data/projects.js`. Cada proyecto tiene `slug`, `label`, `title`, `desc`, `tags`, `meta` (sidebar) y `content` (markdown). La página, la nav y la TOC se generan solos. El tiempo de lectura se calcula automáticamente con `readingTime()` (en `markdown.js`, ~200 palabras/min) — no lo agregues a mano en los datos del proyecto; lo consumen `ProjectCard` (home) y `PageHeader` (página de detalle).
- **Sobre mí**: datos en `src/lib/data/about.js`.
- **Imágenes**: se suben a `static/images/proyectos/{slug}/` y se referencian en el markdown con `![alt](/images/proyectos/{slug}/archivo.png "Caption opcional")`. El render (`markdown.js`) las envuelve en un marco `.zoom-image` con fondo punteado; el comportamiento de pan + zoom in-situ vive en `src/lib/zoomImage.js` (`setupZoomImages()`, llamado en `onMount` de la página de proyecto junto a `setupMermaid()`). El marco toma el aspect ratio real de la imagen (fijado por JS al cargar, no un valor fijo). No uses `<img>` a mano en el contenido, y no reintroduzcas el patrón de lightbox/overlay: la interacción es siempre dentro del propio marco.
- **Diagramas**: bloques ` ```mermaid ` en el markdown se renderizan como diagramas de flujo. Se estilizan con tokens (borde y líneas `--border-accent`, relleno `--bg-neutral-primary`, texto `--text-primary` en `--size-sm` con `--font-body`) vía `themeVariables` leídos en `proyectos/[slug]/+page.svelte`, y se re-renderizan al cambiar de tema. No agregues otros colores ni una sección de simbología.

## Página de sistema de diseño

`src/routes/sistema/+page.svelte` detecta automáticamente los componentes vía `import.meta.glob`. Si creas un componente nuevo, agrégalo a la lista `documented` (con un ejemplo en el showcase) o a `inContext` (si es estructural como Nav/Footer/ContentLayout). Si no, la página lo marcará en amarillo como "sin documentar".

## Layout de páginas internas

Proyecto, Sobre mí y Sistema usan `ContentLayout` (grid de 3 columnas con divisores que llegan al footer) + `PageHeader`. El sidebar izquierdo es opcional (Sobre mí y Sistema lo dejan vacío a propósito). La TOC derecha hace scroll-spy sobre los `id` de los `<h2>`/`<h3>`.

## Ideas futuras (no construidas aún)

`ideas/` guarda ideas exploradas en conversación pero no implementadas —
cada archivo `.md` documenta el problema, las opciones técnicas
conversadas, referencias, y qué se decidió NO hacer y por qué. Ver
`ideas/README.md` para el índice y cómo agregar una idea nueva.

**Consulta esta carpeta cuando:**
- La persona pida algo que suene a una conversación anterior ("lo de los
  gráficos interactivos", "esa idea de los widgets").
- Vayas a proponer arquitectura para contenido no-texto/no-imagen en los
  proyectos (gráficos, componentes de producto recreados, cualquier
  cosa "interactiva" en el contenido) — probablemente ya se pensó una
  dirección, no la reinventes desde cero.

Si implementas algo de una idea documentada, actualiza ese archivo con
una línea de estado en vez de borrarlo (queda como registro de por qué
se construyó así).

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

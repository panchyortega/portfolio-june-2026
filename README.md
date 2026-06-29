# Portafolio — Francisca Ortega

Portafolio personal de **Francisca Ortega**, product designer. Sitio estático
construido con SvelteKit, con su propio sistema de diseño basado en tokens.

🔗 **En vivo:** https://panchyortega.github.io/portfolio-june-2026

## Qué es esto

Un portafolio con:
- Página de inicio con la grilla de proyectos.
- Páginas de detalle por proyecto (con tabla de contenidos y galería de imágenes con zoom).
- Página "Sobre mí" (experiencia, educación, habilidades).
- Una página de **sistema de diseño** que documenta los componentes en vivo y se
  mantiene sola (detecta los componentes automáticamente).
- Modo claro / oscuro.

Todo el contenido (proyectos, textos, imágenes) se edita desde unos pocos archivos
de datos, sin tocar el diseño.

## Tecnología

| Qué | Con qué |
|-----|---------|
| Framework | [SvelteKit](https://kit.svelte.dev) (Svelte 5) |
| Publicación | HTML estático (`adapter-static`) en GitHub Pages |
| Estilos | CSS con custom properties (tokens) — sin Tailwind |
| Íconos | [Lucide](https://lucide.dev) |
| Contenido | Markdown |

## Correr el proyecto localmente

Necesitas Node 22+.

```bash
npm install      # instalar dependencias
npm run dev      # abre el sitio en desarrollo (http://localhost:5173)
```

Otros comandos:

```bash
npm run build    # genera el sitio estático en build/
npm run preview  # previsualiza ese build
```

## Cómo está organizado

```
src/
├── styles/
│   ├── primitives.css   # colores, tamaños, fuentes (valores base)
│   └── semantics.css    # tokens por uso + modo oscuro + tipografía
├── lib/
│   ├── components/       # todos los componentes (Button, ProjectCard, Nav, etc.)
│   ├── data/
│   │   ├── projects.js   # ← acá se editan los proyectos
│   │   └── about.js      # ← acá se edita la página Sobre mí
│   └── markdown.js       # convierte el markdown de los proyectos en HTML
├── routes/               # las páginas (cada carpeta es una URL)
└── app.css               # estilos globales base

static/
└── images/proyectos/     # ← acá van las imágenes de los proyectos
```

## Cómo actualizar el contenido

### Agregar o editar un proyecto

Edita `src/lib/data/projects.js`. Cada proyecto es un objeto con su título,
descripción, etiquetas, datos del sidebar y el contenido en markdown. Al agregar
uno nuevo, aparece solo en el menú, en la home y genera su propia página.

### Agregar imágenes a un proyecto

1. Guarda la imagen en `static/images/proyectos/{slug}/` (ej: `static/images/proyectos/aurora/dashboard.png`).
2. En el `content` del proyecto, referénciala así:
   ```
   ![descripción de la imagen](/images/proyectos/aurora/dashboard.png "Caption opcional")
   ```
3. Listo: la imagen sale enmarcada y, al hacer click, abre un visor con zoom.

Tip: usa imágenes optimizadas (idealmente bajo ~500 KB) para que el sitio cargue rápido.

### Editar la página Sobre mí

Edita `src/lib/data/about.js` (intro, experiencia, educación, habilidades).

## Cómo se publica

Cada vez que se hace push a la rama `main`, un workflow de GitHub Actions
(`.github/workflows/deploy.yml`) compila el sitio y lo publica en GitHub Pages
automáticamente. No hay que hacer nada manual.

## Para agentes de IA

Si vas a usar una herramienta de IA para hacer cambios, revisa
[`AGENTS.md`](./AGENTS.md): tiene las convenciones y la arquitectura que hay que
respetar.

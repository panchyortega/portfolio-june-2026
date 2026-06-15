# Portafolio Panchy Ortega

Portafolio personal construido con **LESS + Mustache** — estilos separados del contenido, generación estática de HTML, y Google Sheets como CMS para proyectos.

**Rama de trabajo:** `feature/less-mustache`
**Google Sheet (proyectos):** https://docs.google.com/spreadsheets/d/1P9j6XXps_AYvLl-3HDB2eNO2WsSGNc7Sxa1hZKXoKsQ/edit

---

## Estructura del proyecto

```
portfolio-june-2026/
│
├── styles/
│   └── less/
│       ├── main.less              ← importa todo en orden
│       ├── atoms/
│       │   ├── _tokens.less       ← colores, tipografía, espaciado, breakpoints
│       │   ├── _base.less         ← reset y estilos base
│       │   ├── _typography.less   ← h1–h4, párrafos, links
│       │   ├── _tag.less          ← etiquetas / chips
│       │   └── _button.less       ← botones (primary, outline, ghost)
│       ├── molecules/
│       │   ├── _nav.less          ← nav desktop + mobile bottom bar
│       │   ├── _project-card.less ← card de proyecto
│       │   ├── _experience-entry.less
│       │   ├── _education-entry.less
│       │   ├── _skills-group.less
│       │   ├── _meta-card.less    ← sidebar de metadata de proyecto
│       │   └── _callout.less      ← blockquotes / citas
│       └── organisms/
│           ├── _hero.less
│           ├── _toc.less          ← tabla de contenidos (desktop sidebar + mobile FAB)
│           ├── _footer.less
│           ├── _layout.less       ← layouts de todas las páginas
│           └── _sistema.less      ← estilos de la página Design System
│
├── templates/
│   ├── molecules/                 ← un .mustache por componente
│   │   ├── tag.mustache
│   │   ├── project-card.mustache
│   │   ├── experience-entry.mustache
│   │   ├── education-entry.mustache
│   │   ├── skills-group.mustache
│   │   ├── meta-card.mustache
│   │   └── (callout no tiene template — se genera desde Markdown)
│   ├── organisms/
│   │   ├── nav.mustache
│   │   ├── hero.mustache
│   │   ├── footer.mustache
│   │   └── toc.mustache
│   └── pages/
│       ├── index.mustache         ← home
│       ├── sobre-mi.mustache
│       ├── proyecto.mustache      ← template para cada proyecto
│       └── sistema.mustache       ← design system (auto-generado)
│
├── data/
│   ├── content.json               ← contenido editorial (hero, experiencia, educación, skills)
│   ├── config.json                ← strings fijos (nombre, email, links)
│   └── sistema.json               ← muestras visuales y esquemas de páginas para el DS
│
├── assets/
│   └── images/                    ← imágenes referenciadas desde el Sheet (solo nombre del archivo)
│
├── output/                        ← HTML generado (no editar a mano, no se sube al repo)
│
├── render.js                      ← genera todo el HTML desde templates + datos
└── package.json                   ← scripts de build
```

---

## Comandos

```bash
npm install          # instalar dependencias (solo la primera vez)
npm run less         # compilar LESS → styles/css/main.css
npm run watch:less   # compilar automáticamente al guardar archivos LESS
node render.js       # generar HTML en /output
```

**Flujo típico de trabajo:**

```bash
npm run watch:less   # en una terminal — compila LESS automáticamente
node render.js       # después de cada cambio de contenido o templates
```

---

## Tokens de diseño

Todo está en `styles/less/atoms/_tokens.less`. Si quieres cambiar algo visual, empieza acá.

```less
// Paleta principal
@p-500: #CC4900;   // rojo terracota — color acento
@n-800: #1F261D;   // verde oscuro — texto principal
@n-50:  #F4F5F2;   // fondo general

// Tipografía
@font-display: 'Sora', sans-serif;   // títulos
@font-body:    'Work Sans', sans-serif; // todo lo demás

// Breakpoints
@bp-mobile: 900px;   // nav desktop oculta, sidebars ocultos
@bp-small:  600px;   // mobile nav aparece, padding bottom al body
```

---

## Contenido editable

### `data/content.json` — contenido editorial

Contiene todo lo que aparece en las páginas y que puede cambiar:

- `hero` → eyebrow, título, subtítulo, botones del home
- `projects` → lista de proyectos para el home (cuando no uses el Sheet)
- `experience` → entradas de experiencia laboral
- `education` → entradas de educación
- `skills` → grupos de habilidades

Edita este archivo y corre `node render.js` para ver los cambios.

### `data/config.json` — strings fijos

Nombre, email, links sociales. Cosas que no cambian seguido. Se usan en nav, footer y meta tags.

### Google Sheet — proyectos

El Sheet es el CMS principal para los proyectos. URL:
**https://docs.google.com/spreadsheets/d/1P9j6XXps_AYvLl-3HDB2eNO2WsSGNc7Sxa1hZKXoKsQ/edit**

**Pestaña "Proyectos"** — una fila por proyecto:

| Columna | Descripción |
|---------|-------------|
| `slug` | ID único. Minúsculas, guiones, sin tildes. Ej: `racional-onboarding` |
| `titulo_es` / `titulo_en` | Título completo en cada idioma |
| `nav_es` / `nav_en` | Nombre corto para el dropdown de la nav |
| `descripcion_es` / `descripcion_en` | Bajada corta |
| `tags` | Separados por coma. Ej: `Fintech, Mobile, Figma` |
| `lectura` | Tiempo de lectura. Puede ser `5` o `3-4` |
| `imagen` | Solo el nombre del archivo. Ej: `racional-cover.jpg` — la imagen debe estar en `assets/images/` |
| `tipo_es` / `tipo_en` | Tipo de proyecto. Ej: `Trabajo` / `Work` |
| `año` | Año o rango. Ej: `2026` o `2025-2026` |
| `empresa_es` / `empresa_en` | Empresa o cliente |
| `herramientas` | Separadas por coma |
| `estado_es` / `estado_en` | Ej: `En curso` / `In progress` |
| `publicado` | `SI` para publicar, `NO` para borrador |

**Pestaña "Contenido"** — cuerpo largo de cada proyecto:

| Columna | Descripción |
|---------|-------------|
| `slug` | Debe coincidir exactamente con el slug de Proyectos |
| `contenido_es` | Cuerpo en Markdown (ver formato abajo) |
| `contenido_en` | Mismo formato en inglés |

**Formato Markdown para el contenido:**

```
## Subtítulo

Párrafo normal de texto.

- Item de lista
- Otro item

> Esto es un callout o cita destacada

![descripción de la imagen](nombre-imagen.jpg)
```

---

## Crear o editar un componente

### 1. Crear un componente nuevo

**a) Crear el template Mustache:**
```
templates/molecules/mi-componente.mustache
```

El archivo debe empezar con los comentarios de metadata:
```mustache
{{! @titulo Nombre del componente }}
{{! @descripcion Descripción de para qué sirve y dónde se usa. }}

<div class="mi-componente">
  {{contenido}}
</div>
```

**b) Crear los estilos LESS:**
```
styles/less/molecules/_mi-componente.less
```

Usar siempre los tokens de `_tokens.less`, nunca valores hardcodeados:
```less
.mi-componente {
  padding: @space-16;
  color: @color-text;
  font-size: @text-body;
}
```

**c) Importar en `main.less`:**
```less
@import "molecules/_mi-componente";
```

**d) Agregar la muestra al DS en `data/sistema.json`:**
```json
"muestras": {
  "mi-componente": "<div class=\"mi-componente\">Ejemplo visual</div>"
}
```

**e) Correr el build:**
```bash
npm run less
node render.js
```

El componente aparece automáticamente en `sistema.html` con su preview y el código Mustache + LESS.

### 2. Editar estilos de un componente existente

1. Abre el archivo `.less` correspondiente en `styles/less/molecules/` u `organisms/`
2. Edita usando los tokens — no hardcodees colores ni tamaños
3. `npm run less` para compilar
4. Revisa en `output/` abriendo el HTML en el browser

### 3. Editar la estructura HTML de un componente

1. Abre el `.mustache` en `templates/molecules/` u `organisms/`
2. Edita el HTML
3. `node render.js` para regenerar las páginas

---

## Crear o editar una página

### Páginas existentes

| Página | Template | ¿Datos desde? |
|--------|----------|----------------|
| Home | `templates/pages/index.mustache` | `data/content.json` + Sheet |
| Sobre mí | `templates/pages/sobre-mi.mustache` | `data/content.json` |
| Proyecto | `templates/pages/proyecto.mustache` | Sheet (por slug) |
| Design System | `templates/pages/sistema.mustache` | Auto-generado desde los componentes |

### Crear una página nueva

1. Crea `templates/pages/mi-pagina.mustache`
2. En `render.js`, agrega:
```js
write('output/mi-pagina.html',
  render('templates/pages/mi-pagina.mustache', { ...content, cssPath: '', rootPath: '' }, partials));
```
3. `node render.js`

### Layout de 3 columnas (proyectos)

El layout de página de proyecto tiene esta estructura:
```
┌──────────────────────────────────────────┐
│                  Nav                     │
├──────────┬───────────────────┬───────────┤
│ Meta     │                   │    TOC    │
│ Card     │    Contenido      │ (sidebar) │
│(sidebar) │                   │           │
└──────────┴───────────────────┴───────────┘
```

En mobile (≤900px): los sidebars se ocultan. La meta card aparece en el flujo entre el header y el contenido. La TOC se convierte en un FAB (botón flotante) en la esquina inferior derecha.

---

## Design System (`sistema.html`)

La página de design system se genera **automáticamente** al correr `node render.js`.

**Para que un componente aparezca en el DS necesita:**
1. Tener `{{! @titulo ... }}` y `{{! @descripcion ... }}` al inicio del `.mustache`
2. Tener un archivo `.less` con el mismo nombre en `molecules/` u `organisms/`
3. (Opcional) Tener una muestra en `data/sistema.json` bajo `"muestras"`

Las **páginas** aparecen como esquemas visuales. Para actualizar el esquema de una página, edita `data/sistema.json` bajo `"paginas"`.

---

## Nav y mobile

La nav tiene dos versiones:
- **Desktop (>900px):** sticky top bar con dropdown para proyectos. Template: `templates/organisms/nav.mustache`
- **Mobile (≤600px):** fixed bottom bar con íconos. Se incluye en cada template de página como `.mobile-nav`

El dropdown de proyectos se alimenta dinámicamente desde los proyectos con `publicado: SI` en el Sheet.

---

## ⛔ Qué no tocar

- `output/` — se sobreescribe en cada `node render.js`
- `styles/css/main.css` — se sobreescribe en cada `npm run less`
- Los slugs en el Sheet — son el identificador permanente de cada proyecto
- Los breakpoints `@bp-mobile: 900px` y `@bp-small: 600px` — la nav y el layout mobile dependen exactamente de estos valores

---

## Imágenes

Las imágenes de portada de proyectos van en `assets/images/`. En el Sheet solo se escribe el nombre del archivo (ej: `racional-cover.jpg`). El script de build construye la ruta completa.

Para imágenes dentro del contenido de un proyecto, usar Markdown:
```
![Descripción de la imagen](nombre-archivo.jpg)
```

---

## Idioma (ES/EN)

El sistema está preparado para bilingüe. El Sheet tiene columnas `_es` y `_en` para todos los textos editoriales. El build genera dos versiones:
- `output/index.html` → español (default)
- `output/en/index.html` → inglés

*(La integración del build bilingüe está pendiente de implementar — la estructura de datos ya está lista.)*

# Widgets interactivos en el contenido de proyectos

**Estado:** explorado en conversación, sin construir aún
**Fecha:** julio 2026

## El problema / motivación

Panchy tiene proyectos que no se muestran bien solo con texto + imágenes
planas. Dos casos concretos ya identificados:

1. **Gráficos que necesitan traducción ES/EN.** Si el gráfico es un PNG,
   traducirlo significa rehacer la imagen entera. Si el texto vive separado
   del dibujo, cambiar de idioma es solo cambiar los datos que se le pasan.
2. **Recrear componentes de un dashboard real** (ver referencias más abajo)
   para mostrar cómo se ve/funciona un producto que diseñó, con
   interactividad real (dial que se arrastra, gráficos con datos en vivo).

Además surgió un tercer caso transversal: un patrón de **hover → despliega
un modal con video/animación → se cierra solo al terminar**. Este no es
específico a un proyecto — es una pieza reutilizable en sí misma.

## Referencias visuales que motivaron la conversación

Panchy compartió 3 imágenes de referencia (no están guardadas en el repo,
pero quedan descritas para contexto):

1. Una matriz de puntos coloreados representando datos de población
   (grilla de dots con colores por categoría, con leyenda). Esto es
   **datos reales dibujados** — un módulo de código que recibe datos y
   los pinta como grilla.
2. Un diagrama ilustrativo de consonantes/vocales con corchetes y colores
   (tipo infografía tipográfica). Esto es **ilustración vectorial pura**,
   sin datos dinámicos — se podría hacer en SVG o HTML/CSS estático, sin
   necesitar JavaScript en absoluto.
3. Un mockup de dashboard de iluminación smart-home (dial de temperatura,
   gráfico de barras semanal, "LIVE" con timestamp). Esto es **UI de
   producto real con estado** — necesita componentes con lógica real,
   no solo dibujo (el dial se arrastra, hay datos "en vivo").

La conclusión de la conversación: estas tres referencias, sin planearlo,
mapean exactamente a las tres opciones técnicas descritas abajo. Ninguna
le queda grande a la arquitectura actual del sitio.

## Por qué esto es posible: el patrón ya existente en el repo

El contenido de los proyectos es markdown que se inyecta con `{@html}`.
Esto tiene una limitación dura: **no se puede pegar un `<script>` a mano
dentro del markdown y esperar que se ejecute** — los navegadores lo
bloquean por seguridad cuando se inserta así.

El repo ya resolvió este problema dos veces con el mismo patrón, sin que
en su momento se pensara como "arquitectura para widgets":

- **Imágenes con zoom/pan** (`src/lib/zoomImage.js`): el markdown genera
  un `<div class="zoom-image" data-...>` (un molde vacío), y un script
  aparte lo encuentra en `onMount` de la página y le agrega el
  comportamiento.
- **Diagramas Mermaid** (`src/lib/mermaid.js`): el markdown genera un
  `<pre class="mermaid">`, y otro script lo encuentra y lo transforma en
  el diagrama real.

El patrón siempre es: **molde en el markdown → script que lo activa
después de que la página carga**. Cualquier widget nuevo se piensa en
estos 3 pasos: (1) cómo se escribe en el markdown, (2) qué molde HTML
genera, (3) qué código lo activa y con qué comportamiento.

## Las tres opciones técnicas (de menor a mayor potencia)

| Opción | Qué es | Cuándo usarla | Ejemplo de referencia |
|---|---|---|---|
| **A. SVG/HTML a mano** | Se escribe el gráfico directo en SVG o HTML+CSS, sin JS. Interactividad solo con `:hover` de CSS. | Ilustración puntual, sin estado que cambie con clicks. | Imagen 2 (consonantes/vocales) |
| **B. Módulo JS que dibuja** (mismo patrón que Mermaid) | Un archivo JS recibe datos y dibuja el gráfico (con librería tipo D3/Chart.js, o a mano). Texto y dibujo viven separados. | Gráficos de datos reutilizables que necesitan traducción o cambian de contenido. | Imagen 1 (matriz de población) |
| **C. Montar un componente Svelte real** | El molde le dice a Svelte "monta aquí tu componente X con estas props". Svelte lo instancia con estado reactivo real. | Recrear UI de producto real: botones, tarjetas, dashboards con interacción de verdad. | Imagen 3 (dashboard smart-home) |

### Por qué la Opción C no es la opción por defecto aunque sea la más versátil

Tres razones concretas, importantes para no sobre-construir:

1. **No resuelve el problema del pan/zoom por sí sola.** Un componente
   Svelte montado dentro de la pizarra igual necesita el mismo parche de
   "no me arrastres, hazme click" que ya se le puso a los botones de
   zoom (`stopPropagation` en pointerdown/dblclick).
2. **El sitio es estático (adapter-static, prerenderizado).** Un
   componente "montado en vivo" no existe hasta que el JS carga en el
   navegador de la persona — no está en el HTML pre-generado. Esto ya se
   asume para Mermaid (por eso a veces se ve un destello antes del
   render); multiplicarlo por cada botón de un dashboard recreado
   significa más peso de JS y más cosas que "aparecen" después de la
   carga inicial.
3. **Sobre-ingeniería para casos que no la necesitan.** Los gráficos
   traducibles no necesitan estado real — la Opción B alcanza sin pagar
   el costo de montar componentes Svelte en runtime.

**Regla práctica:** usar C solo cuando de verdad hay estado/interacción
real de UI (el caso del dashboard). Para todo lo demás, B o A.

## Los dos tipos de contenedor (idea de Panchy, validada como correcta)

Un botón de UI y un dashboard completo no son el mismo tipo de contenido,
aunque ambos "van dentro de un marco". El componente de pan/zoom
(`ContentLayout`-adyacente, el que ya existe para imágenes) resuelve un
problema específico: explorar contenido grande dentro de un espacio
chico. Un botón que ya se ve completo no tiene ese problema — forzarlo
dentro de la pizarra le agrega fricción sin necesidad (competir con el
arrastre).

**Conclusión: se necesitan dos tipos de marco**, mismo lenguaje visual
(fondo punteado, ancho de columna), comportamiento distinto:

- **Pizarra** (la que ya existe, `zoomImage.js`) — para explorar
  contenido grande: screenshots, dashboards completos.
- **Marco simple** (sin pan/zoom, solo el fondo punteado y el ancho de
  columna fijo) — para mostrar un widget que ya se ve completo: un
  gráfico, un botón, un componente aislado. **Aún no construido.**

## El patrón hover → modal con video/animación

Es un patrón genérico, independiente del tipo de gráfico — aplica igual
a un punto de datos, un elemento de UI, o cualquier cosa que se quiera
"revelar". Vale la pena construirlo como pieza reutilizable propia
(un tercer tipo de "molde"), no como parche de un solo uso.

**Límite técnico real a considerar:** los navegadores bloquean la
reproducción automática de video con sonido si la persona no hizo click
antes. Con hover (sin click) se puede autoreproducir sin problema si el
video va mudo; si necesita sonido, hay que exigir un click, no solo
hover — esto cambia la interacción imaginada originalmente.

**Límite de accesibilidad:** hover no existe en celular. Cualquier
interacción que dependa solo de hover necesita un equivalente con
tap/click para funcionar en mobile.

## Cómo se decidió abordar esto (para no sobre-construir)

No conviene construir "el sistema que lo puede todo" de una, pero
tampoco conviene seguir posponiendo indefinidamente — ya hay 3 casos
reales sobre la mesa (gráficos traducibles, dashboard recreado,
hover-video).

Lo que sí vale la pena construir como base compartida, cuando se
retome esto:

1. Los dos tipos de marco (pizarra existente + marco simple nuevo).
2. El patrón de hover-reveal (transversal, se va a reusar).
3. Cada visualización específica (la matriz de puntos, el dashboard)
   **queda como código propio, no genérico** — porque cada una es una
   pieza de diseño única que Panchy diseña a mano, no algo que se
   necesite parametrizar para reutilizar en 10 proyectos. A diferencia
   de un dashboard de analytics real, acá no hay datos dinámicos desde
   una base de datos — es diseño estático (aunque interactivo).

Evitar: diseñar un "motor de gráficos configurable" genérico antes de
tener un segundo caso real que justifique la abstracción.

## Próximos pasos posibles (sin decidir aún)

- [ ] Diseñar el marco simple (sin pan/zoom) — se necesita para ambos
      casos (gráficos y dashboard), buen punto de partida.
- [ ] Prototipar el patrón hover → modal con video en HTML suelto
      (mismo flujo que se usó para prototipar el componente de zoom
      antes de llevarlo al repo).
- [ ] Cuando haya un proyecto real con gráfico traducible, construir
      el primer módulo de Opción B con ese caso concreto.
- [ ] Cuando se retome el dashboard, evaluar si de verdad necesita
      Opción C completa o si una versión "de mentira" (solo visual, sin
      estado real) alcanza para el propósito de portafolio.

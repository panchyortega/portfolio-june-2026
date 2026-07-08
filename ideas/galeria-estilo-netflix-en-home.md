# Galería de proyectos estilo Netflix en la home

**Estado:** definición cerrada — lista para construirse cuando se priorice.
Todas las preguntas abiertas de la primera versión quedaron resueltas en
conversación (ver "Decisiones tomadas"). Quedan solo un par de detalles
menores por confirmar antes de implementar.
**Fecha:** julio 2026 (actualizado tras segunda conversación)

## El problema / motivación

Actualmente la home muestra todos los proyectos en una sola grilla, sin
distinción de tipo. Panchy quiere organizarlos en **categorías con scroll
horizontal**, al estilo de las filas de Netflix: un título de categoría
arriba, y debajo el listado de proyectos correspondientes en una fila
scrolleable.

## Decisiones tomadas

### Categorías: 3, no 5

Se descartaron las categorías "Exploraciones personales" y "Otros
trabajos" como categorías propias. Quedan solo:

1. **Proyectos profesionales**
2. **Proyectos académicos** (universidad + talleres)
3. **Proyectos personales**

Las "exploraciones cortas/random" y el "trabajo no-UX" (flyers, mails,
editorial) **no son un tipo de contenido distinto** — son proyectos
normales que caen dentro de alguna de estas 3 categorías (probablemente
"Personales" la mayoría de las veces). No necesitan tratamiento especial.

### Tags y categorías son cosas independientes

Las tags (`Profesional`, `Capstone`, `Académico`, `Varios`, etc.) son
**informativas**, no de categorización — se quedan como están, sin
relación directa con las 3 categorías nuevas. Un proyecto tiene tags
Y categoría(s), son dos campos distintos con propósitos distintos.

### Un proyecto puede estar en varias categorías

Confirmado: el campo de categoría es un **array**, no un valor único.
Un proyecto puede aparecer, por ejemplo, en "Profesionales" y
"Personales" a la vez si corresponde.

### Todos los proyectos son estructuralmente iguales

No existe un tipo de contenido "liviano" para exploraciones. Todo
proyecto — sea un caso de estudio completo o una exploración corta —
usa exactamente el mismo layout de página de detalle, el mismo modelo
de datos (`meta`, `content` en markdown, etc.). La única diferencia
entre ellos es **en qué categoría(s) se muestran y en qué orden** — no
cómo están construidos. Esto simplifica bastante la idea: no hay que
diseñar un tipo de dato nuevo, solo agregar campos de organización a lo
que ya existe.

### Scroll horizontal — comportamiento

- **Desktop:** flechas que aparecen al hacer **hover** sobre la fila,
  pero *solo* si hay contenido desbordado (overflow) en esa dirección.
  Si no hay overflow en absoluto, no aparecen flechas.
- **Mobile:** no flechas. Falta pensar más el diseño exacto — Panchy
  intuye que debería haber algún indicador visual o botón por
  accesibilidad, pero no está decidido cómo se ve. **Punto pendiente,
  ver sección de detalles por confirmar.**
- **Estado activo/inactivo de las flechas:** el criterio es el
  *desborde disponible en esa dirección*, no la cantidad de proyectos.
  Mientras exista contenido para scrollear hacia un lado, esa flecha
  está activa; en cuanto se llega al límite en esa dirección, esa
  flecha específica se desactiva (independiente la una de la otra:
  puede estar activa la de la derecha y desactivada la de la izquierda
  al principio de la fila, y viceversa al final).
- Si no hay overflow en absoluto (la fila completa cabe sin scroll), no
  se muestran flechas en ningún momento, ni siquiera en hover.

### Orden de los proyectos dentro de cada categoría

Lógica definida, en este orden de prioridad:

1. **Favoritos primero**, ordenados por fecha (más recientes primero).
2. **Luego el resto** (no favoritos), también por fecha (más recientes primero).

"Favorito" es un campo/flag **independiente de las tags** — se muestra
como un **badge visual en la ProjectCard** (no como una tag más), con
texto tipo "Favoritos personales" / "Personal favs" (falta definir cuál
usar; ver nota sobre bilingüe abajo).

### Visibilidad — mostrar/ocultar sin borrar

Se necesita un flag de visibilidad por proyecto (ej: `visible: true/false`)
para poder tener un proyecto cargado en los datos pero oculto de la home
sin necesidad de borrarlo (caso de uso mencionado: un documento/proyecto
que no se quiere mostrar pero tampoco borrar).

### Categorías vacías

Confirmado: si una categoría no tiene ningún proyecto visible, el título
de la categoría **no aparece** en la home. No se muestra vacía ni con
mensaje — directamente no se renderiza esa fila.

## Detalles menores por confirmar (antes de implementar)

Estos no bloquean el diseño general, pero hay que resolverlos:

- **Orden de las 3 categorías entre sí** en la home. No se ha discutido
  explícitamente — sugerencia por defecto: Profesionales → Académicos →
  Personales (mismo orden en que Panchy las nombró ambas veces).
- **Diseño del indicador/botón en mobile** para el scroll horizontal —
  Panchy fue explícita en que esto necesita más pensamiento antes de
  decidir cómo se ve.
- **Texto del badge de favorito**: "Favoritos personales" vs. "Personal
  favs" — probablemente depende de si el sitio tiene contenido bilingüe
  para ese momento. El sitio **todavía no tiene toggle de idioma** (es
  un pendiente de más largo plazo, documentado aparte); mientras no
  exista, el badge iría solo en español.
- **Campo de fecha real para ordenar.** Hoy `projects.js` no tiene un
  campo de fecha ordenable — el año vive como texto dentro de `meta`
  (ej: `{ label: 'Año', value: '2024' }`), pensado solo para mostrarse,
  no para ordenar programáticamente. Para implementar el orden por
  fecha hay que agregar un campo real (ej: `date: '2024-03-01'`)
  separado del texto que se muestra en el sidebar.

## Modelo de datos — cambios que esto implica en `projects.js`

Para cuando se implemente, cada proyecto necesitaría estos campos
nuevos (además de los que ya existen):

```js
{
  // ...campos existentes (slug, label, title, desc, tags, meta, content)...
  categories: ['profesional', 'personal'],  // array, uno o más valores
  favorite: false,                           // badge "favoritos", ordena primero
  visible: true,                             // si aparece en la home o no
  date: '2025-03-01'                         // fecha real para ordenar (ISO)
}
```

## Próximos pasos posibles

- [ ] Confirmar los detalles menores listados arriba (orden de
      categorías, diseño mobile, texto del badge).
- [ ] Agregar los campos nuevos (`categories`, `favorite`, `visible`,
      `date`) a todos los proyectos existentes en `projects.js`.
- [ ] Diseñar el componente de fila (`ProjectShelf` o similar) que
      agrupa `ProjectCard`s con scroll horizontal — reutiliza
      `ProjectCard` tal cual, solo cambia el contenedor.
- [ ] Diseñar las flechas de scroll con sus estados activo/inactivo
      (probablemente conviene prototipar en HTML suelto primero, como
      se hizo con el componente de zoom/pan de imágenes, antes de
      llevarlo a Svelte).
- [ ] Definir el estilo visual del badge de "favorito" en `ProjectCard`
      (distinto a las tags existentes).
- [ ] Pensar el comportamiento mobile con más detalle antes de construir esa parte.

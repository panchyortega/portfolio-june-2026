# Galería de proyectos estilo Netflix en la home

**Estado:** explorado en conversación, sin construir aún — definición
incompleta, tiene preguntas abiertas antes de poder implementarse.
**Fecha:** julio 2026

## El problema / motivación

Actualmente la home muestra todos los proyectos en una sola grilla, sin
distinción de tipo. Panchy quiere organizarlos en **categorías con scroll
horizontal**, al estilo de las filas de Netflix: un título de categoría
arriba, y debajo el listado de proyectos correspondientes en una fila
scrolleable.

## Las categorías propuestas

1. **Proyectos profesionales** — trabajo UX/UI en empresas (Racional, Ulern, etc.)
2. **Proyectos académicos** (nombre tentativo, Panchy dudaba entre
   "educativos" y otro término) — de la universidad y talleres tomados
3. **Proyectos personales** — proyectos propios fuera de un contexto laboral/académico
4. **Exploraciones personales** — piezas cortas y random: animaciones,
   componentes sueltos, ideas que nunca llegaron a convertirse en un
   proyecto completo
5. **Otros trabajos** (nombre tentativo) — trabajo profesional que no es
   UX/UI/product: plantillas de mail, flyers, proyectos editoriales

## Preguntas abiertas (hay que resolverlas antes de construir)

### 1. ¿Categoría y "tags" son la misma cosa?

`projects.js` ya tiene un campo `tags` con valores como "Profesional",
"Capstone", "Académico", "Varios" — muy parecido a las categorías nuevas.
Hay que decidir:
- ¿El campo `tags` se convierte en el campo de categoría oficial (una
  fuente única), o son conceptos distintos que conviven?
- Si son distintos: un proyecto podría tener tag "Profesional" pero
  categoría "Otros trabajos" (ej: un flyer hecho en un trabajo). Ese
  caso ya existe en la idea original de Panchy, así que probablemente
  **sí son cosas distintas** — pero falta confirmarlo explícitamente
  para no duplicar taxonomías sin sentido.

### 2. ¿Un proyecto puede vivir en más de una categoría?

En Netflix, el mismo título aparece en varias filas a la vez ("Tendencias",
"Dramas"...). Acá el ejemplo obvio es la categoría 5: un flyer hecho en
un trabajo, ¿es "profesional" Y "otros trabajos" a la vez (aparece en
ambas filas), o cada proyecto vive en una sola categoría?

- Si es una sola categoría → el dato es simple: `category: 'profesional'`.
- Si puede ser varias → el dato tiene que ser un array:
  `categories: ['profesional', 'otros-trabajos']`, y hay que decidir
  el orden de aparición cuando se repite en más de una fila.

### 3. ¿Las "exploraciones" necesitan página de detalle completa?

Los proyectos actuales tienen una página de detalle pesada: meta,
markdown con TOC, prev/next. Panchy describió las exploraciones como
piezas cortas, a veces sin terminar, "que nunca salieron de la idea".

Preguntas:
- ¿Ameritan una página `/proyectos/slug` igual de completa que un caso
  de estudio, o necesitan un formato más liviano (card con descripción
  corta, sin página propia — capaz sin ni siquiera un link a ningún lado)?
- Si es un formato distinto, es **un tipo de contenido nuevo**, no solo
  una categoría nueva sobre el modelo de datos actual. Esto cambia el
  alcance de la idea: no es solo "reorganizar visualmente", es agregar
  un tipo de entrada más simple al lado de "proyecto completo".

### 4. Comportamiento del scroll horizontal

- ¿Flechas tipo Netflix que aparecen al hacer hover en los bordes de la
  fila, o solo scroll nativo (swipe en mobile, rueda del mouse en
  desktop)? Nota: el scroll nativo ya funciona bien en mobile por
  naturaleza (swipe es el gesto esperado); las flechas son más para
  desktop con mouse.
- Accesibilidad: el scroll horizontal necesita pensarse para navegación
  por teclado y lectores de pantalla — no es trivial hacerlo bien.
- ¿Qué pasa cuando una categoría tiene pocos proyectos (2-3)? ¿Igual se
  ve como carrusel scrolleable aunque no llene la fila, o se acomoda
  distinto (ej: sin scroll, alineado a la izquierda) cuando no hay
  contenido suficiente para justificarlo?

### 5. Orden

- Orden de las categorías entre sí: ¿fijo (Panchy decide el orden en el
  código), o alguna lógica automática? Probablemente fijo — no hay razón
  para complicarlo con un algoritmo tipo Netflix.
- Orden de los proyectos dentro de cada categoría: ¿el orden en que se
  ingresan en `projects.js` (como ahora), o por fecha?

### 6. Categorías vacías

Si "Otros trabajos" todavía no tiene ningún proyecto cargado (es nueva),
¿la fila completa desaparece de la home, o se muestra vacía con algún
mensaje tipo "próximamente"? Probablemente lo más limpio es que
simplemente no se renderice la fila si no tiene proyectos — pero falta
confirmarlo.

## Por qué esto no se construye todavía

La idea tiene una ambigüedad real en el punto 3 (¿tipo de contenido nuevo
o no?) que cambia bastante el trabajo necesario. Construir esto sin
resolver esa pregunta primero corre el riesgo de armar el modelo de datos
equivocado y tener que rehacerlo. Vale la pena cerrar las preguntas 1-6
con Panchy antes de tocar código.

## Próximos pasos posibles (sin decidir aún)

- [ ] Definir con Panchy las respuestas a las 6 preguntas abiertas de
      arriba, especialmente la del tipo de contenido para exploraciones.
- [ ] Decidir el nombre final de las categorías 2 y 5 (quedaron tentativos).
- [ ] Revisar si esto reemplaza o convive con el sistema de `tags`
      actual en `projects.js`.
- [ ] Una vez resuelto lo anterior, definir el componente de fila
      (`ProjectShelf` o similar) y cómo se integra con `ProjectCard`
      existente — probablemente se reutiliza tal cual, solo cambia el
      contenedor/layout que las agrupa.
- [ ] Pensar el diseño del scroll horizontal (flechas vs. nativo) antes
      de implementar, capaz con un prototipo HTML suelto como se hizo
      con el componente de zoom/pan de imágenes.

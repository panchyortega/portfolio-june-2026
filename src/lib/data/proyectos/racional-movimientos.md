<!--
  CÓMO EDITAR ESTE ARCHIVO
  - Texto en Markdown normal: ## para secciones (arman el índice de la derecha).
  - Cada "PENDIENTE" marca un hueco para una imagen, video o dato. Cuando lo tengas,
    borra el comentario y reemplaza el placeholder por:
      ![texto alternativo](/images/proyectos/racional-movimientos/archivo.png "Caption opcional")
    (sube el archivo a static/images/proyectos/racional-movimientos/)
  - Para un GIF de interacción, conviértelo a MP4 y súbelo a static/videos/proyectos/racional-movimientos/
    (ver AGENTS.md).
-->

<!-- PENDIENTE · Apertura: mockups finales de la solución en web y mobile. Fuente: diseños finales. -->

![Apertura: solución final en web y mobile](placeholder)

## Problema

Durante las entrevistas realizadas tras el lanzamiento de Racional Web 2.0, un usuario manifestó la necesidad de filtrar sus movimientos por fechas específicas y poder exportarlos para llevar un mejor control de sus finanzas.

La funcionalidad existente ofrecía opciones de filtrado limitadas, obligando a los usuarios a recorrer manualmente su historial para encontrar transacciones específicas. Tampoco permitía exportar los movimientos directamente, dificultando su registro en herramientas externas de organización financiera.

<!-- PENDIENTE · Pantalla original de movimientos en mobile. Fuente: producto actual. -->

![Pantalla original en mobile](placeholder "16/9")

<!-- PENDIENTE · Pantalla original de movimientos en web. Fuente: producto actual. -->

![Pantalla original en web](placeholder "16/9")

::::columnas 3
:::tarjeta calendar-off
**Períodos limitados**

<small>En web, solo era posible seleccionar el último mes, los últimos tres meses o el año en curso.</small>
:::
:::tarjeta list-filter
**Filtros poco flexibles**

<small>No era posible filtrar por producto en web.</small>
:::
:::tarjeta file-x
**Sin opción de exportar**

<small>Los usuarios debían recurrir al registro manual de sus movimientos.</small>
:::
::::

Aunque esta mejora no estaba priorizada inicialmente, identifiqué una oportunidad para entregar mayor autonomía a los usuarios.

> En un producto financiero, facilitar el acceso a la información es también una forma de construir confianza.

## Research

Para comprender si esta necesidad era compartida por otros usuarios, revisé tickets de soporte y conversé con el equipo encargado de atenderlos, quienes confirmaron que ambas funcionalidades eran solicitadas de manera recurrente.

::::columnas 3
:::tarjeta messages-square
**Entrevistas**

<small>Identificación de la necesidad inicial.</small>
:::
:::tarjeta headset
**Soporte**

<small>Confirmación de solicitudes recurrentes.</small>
:::
:::tarjeta ticket
**Tickets**

<small>Revisión de necesidades reportadas.</small>
:::
::::

Identifiqué que estas necesidades eran especialmente relevantes para usuarios avanzados, quienes realizan múltiples movimientos al mes y utilizan herramientas externas para organizar sus finanzas. En web, este perfil de usuario tiene además mayores expectativas respecto a las posibilidades de consultar y gestionar su información.

### Principales necesidades

::::columnas 3
:::tarjeta search
**Encontrar movimientos específicos**

<small>Consultar períodos personalizados sin recorrer manualmente el historial.</small>
:::
:::tarjeta sliders-horizontal
**Segmentar la información**

<small>Filtrar movimientos según el producto y el tipo de transacción.</small>
:::
:::tarjeta download
**Disponer de su información**

<small>Exportar los movimientos para utilizarlos en herramientas externas de organización financiera.</small>
:::
::::

## Iteraciones

### Definición del alcance

El objetivo fue mejorar las posibilidades de consulta del historial sin modificar su estructura ni la navegación existente.

::::columnas 2
:::tarjeta circle-check
**Dentro del alcance**

- Sistema de filtros
- Selector de fechas
- Flujo de exportación
- Adaptación web y mobile
:::
:::tarjeta circle-x
**Fuera del alcance**

- Navegación
- Estructura del historial
- Visualización de movimientos
:::
::::

### Exploración y prototipado

Dado que Racional no contaba con un componente propio para seleccionar rangos de fechas, exploré referencias de interacción en Mobbin y desarrollé distintas alternativas.

<!-- PENDIENTE · Referencias de componentes y patrones de interacción recopilados en Mobbin. Fuente: colección de Mobbin. -->

![Referencias de componentes y patrones de interacción recopilados en Mobbin](placeholder)

Utilicé Claude para generar prototipos funcionales que incorporaban inputs, estados y lógica de selección. Esto me permitió evaluar interacciones reales sin invertir tiempo prematuramente en su diseño visual o en construir prototipos complejos en Figma.

::::columnas 4
:::tarjeta layers
**01. Referencias**

<small>Mobbin</small>
:::
:::tarjeta mouse-pointer-click
**02. Prototipado**

<small>Claude</small>
:::
:::tarjeta users
**03. Pruebas**

<small>Equipo interno</small>
:::
:::tarjeta pen-tool
**04. Diseño**

<small>Figma</small>
:::
::::

### Exploración y pruebas internas

A través de pruebas exploratorias con integrantes del equipo, incluyendo soporte, evalué distintas formas de aplicar filtros y seleccionar fechas, identificando dificultades de interacción antes de avanzar hacia una propuesta de alta fidelidad.

<!-- PENDIENTE · Los 3 prototipos. Bajo cada uno, una línea: la hipótesis de interacción (1), la dificultad observada en las pruebas (2) y los ajustes hechos a partir de ellas (3). Fuente: prototipos hechos con Claude y notas de las pruebas. -->

::::columnas 3
:::tarjeta
![Prototipo 1](placeholder)

**Iteración 1**

<small>Hipótesis de interacción por explorar.</small>
:::
:::tarjeta
![Prototipo 2](placeholder)

**Iteración 2**

<small>Dificultad observada durante las pruebas.</small>
:::
:::tarjeta
![Prototipo 3](placeholder)

**Iteración 3**

<small>Ajustes realizados a partir de las pruebas.</small>
:::
::::

Este proceso permitió reducir las alternativas a dos propuestas finalistas, que posteriormente revisamos en conjunto con el equipo de diseño.

<!-- PENDIENTE · Diferencias de interacción entre las dos alternativas, motivo de descarte de la A y criterios de selección de la B. Fuente: revisión con el equipo de diseño. -->

::::columnas 2
:::tarjeta
![Alternativa A](placeholder)

**Propuesta descartada**

<small>Pendiente: diferencias de interacción y motivo de descarte.</small>
:::
:::tarjeta
![Alternativa B](placeholder)

**Propuesta seleccionada**

<small>Pendiente: ventajas de interacción y criterios de selección.</small>
:::
::::

Una vez definida la interacción, trabajé en su adaptación al lenguaje visual de Racional, desarrollando un componente que se sintiera coherente con la experiencia y el sistema de diseño existente.

## Solución

La propuesta final incorpora un sistema de filtrado más flexible, un componente personalizado de selección de fechas y un flujo de exportación de movimientos, adaptados tanto a web como a mobile.

### Un sistema de filtros más flexible

Facilita la consulta de movimientos específicos, ampliando las posibilidades de segmentar la información según las necesidades de cada usuario.

<!-- PENDIENTE · Comparación antes y después del sistema de filtros, en web y mobile. Fuente: pantalla original y diseños finales. -->

![Comparación antes y después del sistema de filtros en web y mobile](placeholder)

### Selección de períodos personalizados

Permite consultar movimientos de fechas específicas, eliminando la dependencia de períodos predefinidos y reduciendo la necesidad de recorrer manualmente el historial.

<!-- PENDIENTE · Un video corto (MP4) de la interacción del selector de fechas en web. -->

::::columnas 2
:::tarjeta
![Selector de fechas en mobile, en modo oscuro y claro](/videos/proyectos/racional-movimientos/selector-fechas-mobile.mp4 "Selector de fechas en mobile, en modo oscuro y claro")
:::
:::tarjeta
![Selector de fechas web · video de interacción](placeholder "1/1")
:::
::::

### Exportación de movimientos

Una nueva funcionalidad que permite a los usuarios disponer de su información financiera y utilizarla en sus propias herramientas de organización.

<!-- PENDIENTE · Flujo completo de exportación de movimientos: secuencia de pantallas o video corto. Fuente: pantallas del flujo final. -->

![Flujo completo de exportación de movimientos](placeholder)

### Solución final en web y mobile

<!-- PENDIENTE · Cierre visual: una sola imagen con los mockups finales de ambas plataformas. Fuente: diseños finales. Por producir. -->

![Mockups finales de ambas plataformas](placeholder)

## Qué aprendimos

La solución busca entregar mayor autonomía a los usuarios para consultar, verificar y organizar su información financiera, contribuyendo a una experiencia más transparente sin modificar la estructura existente de la funcionalidad.

Una vez implementada, su impacto podrá evaluarse mediante:

::::columnas 3
:::tarjeta trending-up
**Adopción**

<small>Uso de las funcionalidades entre usuarios con alta actividad transaccional.</small>
:::
:::tarjeta repeat
**Utilidad**

<small>Recurrencia de uso de filtros y exportaciones completadas.</small>
:::
:::tarjeta life-buoy
**Fricción**

<small>Evolución de los tickets de soporte asociados a estas necesidades.</small>
:::
::::

<!-- PENDIENTE · Resultados reales (adopción, utilidad, fricción) cuando el diseño esté implementado y medido. -->

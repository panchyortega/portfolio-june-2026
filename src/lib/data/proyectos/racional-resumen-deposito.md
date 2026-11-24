<!--
  CÓMO EDITAR ESTE ARCHIVO
  - El texto es Markdown normal: ## para secciones (arman el índice de la derecha).
  - Los comentarios como este NO se ven en el sitio. Cada "PENDIENTE" marca un hueco
    para una imagen, video o dato. Cuando lo tengas, borra el comentario y pon:
      ![texto alternativo](/images/proyectos/racional-resumen-deposito/archivo.png "Caption opcional")
    (sube el archivo a static/images/proyectos/racional-resumen-deposito/)
  - ![texto](placeholder) es una imagen de relleno gris: reemplázala por la imagen real.
  - Para un video, igual que una imagen pero con un .mp4 en static/videos/proyectos/racional-resumen-deposito/.
-->

<!-- PENDIENTE · Apertura: mockup cuidado de las pantallas finales, o un video breve del resultado. Fuente: diseños finales. Por producir. -->

![Apertura: pantallas finales](placeholder)

## Problema

Al depositar en un portafolio de Racional (una cartera de acciones transadas en Chile), algunas personas descubrían recién después de hacer el depósito que una parte importante de su plata quedaba sin invertirse y no entendían por qué.

```mermaid
flowchart LR
    A[Ingresar el monto] --> B[Confirmar el depósito]
    B --> C[Descubrir el saldo sin invertir]
```

<!-- PENDIENTE · Flujo original: bajo cada paso, una nota breve de qué ocurre o qué duda aparece (en el esquema o como texto). Fuente: recorrido original confirmado por la diseñadora. -->

![Flujo original](placeholder)

## Objetivo

Queríamos que antes de confirmar el depósito, los usuarios supieran cuánto se invertiría en cada acción, y si parte de su plata iba a quedar sin invertir, que entendieran por qué.

```mermaid
flowchart LR
    A[Ingresar el monto] --> B[Resumen]
    B --> C[Confirmar el depósito]
```

<!-- PENDIENTE · Flujo con resumen: bajo "Resumen", explicar que la persona puede revisar qué se va a comprar y por qué podría quedar plata sin invertir. Fuente: flujo rediseñado. -->

![Flujo con resumen](placeholder)

## Research

En pruebas de usabilidad con 111 usuarios, vimos que el desglose por acción aportaba poco a principiantes, pero algunos usuarios avanzados necesitaban verlo. Por eso, dejamos la información básica del depósito a primera vista y el desglose a un clic.

### Pruebas en Useberry

Se testearon 3 pantallas, cada una con sus datos por separado.

<!-- PENDIENTE · Las 3 pantallas que se testearon. -->

![Las 3 pantallas testeadas](placeholder)

<!-- PENDIENTE · Pantallazo de la encuesta: una de las preguntas. -->

![Pantallazo de una pregunta de la encuesta](placeholder)

::::columnas 2
:::tarjeta
Quieren ver la comisión para quedarse tranquilos

<small>7 de cada 10 la pidió.</small>
:::
:::tarjeta
Saber que son "5 ETFs" no les basta, quieren saber cuáles

<small>De quienes vieron solo "5 ETFs", 6 de cada 10 prefirió la pantalla con los nombres.</small>
:::
:::tarjeta
Al avanzado le sobra el riesgo, al que recién empieza no

<small>Lo pidió la mitad de los principiantes y 1 de cada 3 avanzados.</small>
:::
:::tarjeta
Lo que no conocen hay que explicárselo

<small>Cerca de 3 de cada 10 no entendió "Reinversión de caja" o le sobró.</small>
:::
::::

La pantalla es un momento de verificación: la persona ya decidió cuánto depositar y solo quiere confirmar que todo está bien. Por eso lo que más buscó fue el costo y el destino de su plata. La comisión quedó en la primera capa porque para algunas personas ver CLP 0 es lo que las deja tranquilas. Saber en qué se invierte fue lo que más pesó al comparar pantallas, así que se priorizó mostrarlo, y las cuotas y el precio quedaron en el desglose para quien quiera calcular. El riesgo se dejó visible aunque a los avanzados les sobre, porque quien recién empieza no sabe que existe si queda escondido. "Reinversión de caja" pasó al desglose con un texto informativo, idea que propuso un usuario. La forma de pago, que según los datos saldría de la pantalla, se mantiene en algunos estados por requerimiento de producto. Además, quienes se sintieron menos seguros pidieron más detalle y no menos, por eso la información se ordenó en capas en vez de quitarse.

## Solución

A partir de esos resultados, diseñé e iteré el resumen y el desglose de compra, con revisiones del diseñador senior y del equipo de Producto. Llegamos a dos versiones del resumen, una detallada y otra simplificada.

<!-- PENDIENTE · Flujo completo de la solución: video breve o secuencia de pantallas desde el ingreso del monto hasta la confirmación, mostrando el resumen y cómo se abre el desglose. Fuente: pantallas del flujo final. -->

![Solución 1](placeholder)

![Resumen detallado y resumen simplificado, lado a lado con el mismo monto](/images/proyectos/racional-resumen-deposito/resumen-detallado-vs-simplificado.png "Resumen detallado (izquierda) y simplificado (derecha)")

<!-- PENDIENTE · Comparación de los resúmenes: una imagen por versión (detallada y simplificada), lado a lado y con el mismo monto, señalando las diferencias verificadas en las pantallas. Fuente: diseños de ambas variantes. -->

![Solución 3](placeholder)

![Solución 4](placeholder)

## Qué aprendimos

Lanzamos un experimento con tres variantes (el flujo sin resumen, el resumen detallado y uno simplificado). Aún evaluamos si quienes veían un resumen completaban más depósitos y, a largo plazo, hacían menos consultas a soporte y volvían a depositar con mayor frecuencia.

<!-- PENDIENTE · Resultados del experimento: finalización del depósito, consultas a soporte y recurrencia, cuando estén disponibles. -->

![Resultados del experimento](placeholder)

<!-- PENDIENTE · Cierre visual: una sola imagen con mockups de las pantallas finales. Fuente: diseños finales. Por producir. -->

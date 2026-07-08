# Ideas futuras

Esta carpeta guarda ideas exploradas en conversación con una IA, pero
**aún no construidas**. Cada archivo es una idea, con el contexto
completo de cómo se pensó — para que retomarla en el futuro (con esta
misma IA o cualquier otra) no signifique empezar la conversación de cero.

## Por qué existe

Explorar una idea a fondo (opciones técnicas, referencias, trade-offs,
qué evitar) toma tiempo y buen criterio. Si esa conversación no queda
escrita en algún lado, se pierde — y la próxima vez hay que rehacerla
desde cero, probablemente llegando a conclusiones distintas o peores.

## Cómo se usa

**Para agregar una idea nueva:**
1. Crear un archivo `.md` nuevo en esta carpeta, nombre corto y
   descriptivo en kebab-case (ej: `widgets-interactivos-en-contenido.md`).
2. Documentar: el problema/motivación, qué opciones se conversaron, por
   qué se prefiere una sobre otra, referencias o ejemplos concretos, y
   qué se decidió NO hacer (y por qué — es tan importante como lo que sí).
3. Si la idea tiene pasos concretos posibles, listarlos al final como
   checklist, sin comprometerse a un orden ni a hacerlos todos.

**Para retomar una idea:**
Leer el archivo completo antes de proponer cómo construirla. El archivo
debe bastar para entender el razonamiento sin releer la conversación
original.

**Cuando una idea se construye:**
No se borra el archivo. Se le agrega al principio una línea de estado
(`**Estado:** implementado en [fecha/commit]`) y se deja como registro
histórico de por qué se construyó así.

## Índice

- [`widgets-interactivos-en-contenido.md`](./widgets-interactivos-en-contenido.md) —
  arquitectura para mostrar visualizaciones de datos interactivas,
  componentes de producto recreados, y patrones tipo hover-reveal con
  video, dentro del contenido markdown de los proyectos.
- [`galeria-estilo-netflix-en-home.md`](./galeria-estilo-netflix-en-home.md) —
  reorganizar la home en 3 categorías de proyectos (profesionales,
  académicos, personales) con scroll horizontal. Definición cerrada,
  lista para construirse; quedan solo un par de detalles menores por
  confirmar (orden de categorías, diseño mobile del scroll, texto del
  badge de favorito).

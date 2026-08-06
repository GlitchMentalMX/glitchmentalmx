---
title: 'Ética de la IA: tres marcos para decisiones reales'
category: Inteligencia Artificial
pubDate: 2026-06-03T23:48:04.357Z
updatedDate: 2026-06-03T23:48:30.658Z
description: >-
  La ética de la IA no se resuelve con principios genéricos. "Equidad" y
  "transparencia" no obligan a nada sin un marco que los jerarquice. Lo que sí
  obliga es…
heroImage: /images/posts/etica-de-la-ia-tres-marcos-para-decisiones-reales/hero.jpg
heroImageAlt: >-
  Ética de la IA: investigador analiza libros abiertos ante un punto de decisión
  iluminado
---
**La ética de la IA no se resuelve con principios genéricos.** "Equidad" y "transparencia" no obligan a nada sin un marco que los jerarquice. Lo que sí obliga es el marco filosófico elegido — aunque casi nadie lo declare. Tres marcos, tres decisiones reales, tres conclusiones distintas.

## Los marcos no son decoración académica

**Un marco ético determina qué cuenta como daño, quién merece protección y cuándo está justificado sacrificar el bienestar de unos por el de otros.** El problema con la mayoría de los documentos de ética de IA — incluyendo los de grandes empresas tecnológicas — es que enumeran valores sin declarar el marco que los jerarquiza. "Equidad" desde el utilitarismo no es lo mismo que "equidad" desde la deontología kantiana. Son dos conceptos diferentes con el mismo nombre. Cuando los ingenieros implementan un sistema sin declarar cuál marco usaron, no están siendo neutros: están tomando una decisión política.

**Los tres marcos con mayor trayectoria académica aplicados a IA son el utilitarismo, la deontología y la ética del cuidado.** Cada uno protege valores distintos y abandona otros. Para demostrar la diferencia, los tres se aplican aquí a situaciones reales: diagnóstico médico por tono de piel, sentencias algorítmicas y moderación automatizada de contenido. El mismo problema, tres diagnósticos distintos.

## Utilitarismo: el mayor bien para el mayor número (y lo que eso aplasta)

**El utilitarismo optimiza resultados agregados: la acción correcta es la que produce el mayor beneficio para el mayor número de personas.** Aplicado al diseño de IA, este marco es intuitivamente atractivo porque parece objetivo y medible. Un modelo de detección de cáncer de piel con 92% de precisión general parece exitoso. El problema aparece cuando se desagrega ese número.

Según un estudio publicado en el Journal of the European Academy of Dermatology and Venereology en julio de 2025, de 4,000 imágenes dermatológicas generadas por IA, **solo el 10.2% representaba piel oscura y apenas el 15% representaba con precisión la condición objetivo.** El dataset ISIC, uno de los benchmarks más usados en el campo, tiene más del 70% de imágenes de piel clara y menos del 8% de tipos Fitzpatrick V y VI, según un análisis publicado en arXiv en febrero de 2026. Un modelo entrenado en esa distribución puede tener alta precisión agregada y al mismo tiempo diagnosticar mal de forma sistemática a las poblaciones con mayor mortalidad por melanoma tardío — precisamente las de piel más oscura. Desde el utilitarismo puro, el modelo "funciona". El problema es que los errores se concentran en las minorías, que no cuentan en el promedio.

> El marco ético que no se declara sigue operando. La diferencia es que en ese caso lo eligió el ingeniero, no la sociedad que carga con las consecuencias.

## Deontología: hay reglas que no se rompen aunque el resultado sea "mejor"

**La deontología kantiana establece obligaciones que aplican independientemente de las consecuencias.** No importa si el resultado es bueno en términos estadísticos: si el proceso viola un derecho fundamental, el proceso es incorrecto. Este marco produce una lectura radicalmente distinta del caso COMPAS — el algoritmo de predicción de reincidencia usado en juzgados de varios estados de EE. UU.

La investigación de ProPublica de 2016, con datos de más de 7,000 casos en Broward County, Florida, sigue siendo la referencia empírica más citada sobre el tema. **El algoritmo predijo la reincidencia con un 61% de precisión** — un margen apenas superior al azar — y clasificó incorrectamente a acusados negros como alto riesgo a casi el doble de la tasa que a acusados blancos. Desde la deontología, el problema no es solo la imprecisión: es que el acusado tiene derecho a saber con qué criterios se le juzga, y ese derecho es violado cuando el software es propietario y su código no puede auditarse. En Wisconsin, el Tribunal Supremo validó el uso de puntuaciones COMPAS en sentencias a pesar de que la defensa no podía examinar la metodología. **La transparencia, en términos deontológicos, no es una preferencia: es un requisito previo para la justicia.**

**El límite del marco deontológico es la rigidez**: puede volverse paralizante frente a contextos que exigen ponderación. Pero su aportación es irreemplazable: identifica una violación de derechos que el utilitarismo no puede ver, porque opera en una capa diferente de análisis.

![Ética de la IA: libros abiertos alrededor de un punto de decisión iluminado](/images/posts/etica-de-la-ia-tres-marcos-para-decisiones-reales/1.jpg)

## Ética del cuidado: ¿a quién se le hace daño y quién responde?

**La ética del cuidado desplaza el análisis desde los principios abstractos hacia las relaciones concretas y las vulnerabilidades específicas.** No pregunta "¿qué regla aplica?" sino "¿quién sufre y quién responde?". Una investigación de Villegas-Galaviz y Martin (Universidad de Notre Dame, AI & Society, 2023) argumenta que la IA incrementa la "distancia moral": las interacciones cara a cara se minimizan y las decisiones se vuelven parte de un proceso opaco que los humanos no siempre comprenden ni controlan.

El caso del Meta Oversight Board ilustra esto con claridad. En julio de 2024, el Board resolvió dos casos relacionados con imágenes sexuales generadas por IA que representaban figuras públicas: una de India y una de EE. UU. **En el caso de la figura estadounidense, la imagen fue retirada automáticamente por un sistema de detección que ya la había registrado en su banco de coincidencias**, alimentado por cobertura mediática. En el caso de la figura india, la imagen fue reportada dos veces directamente por usuarios y no fue retirada hasta que el Oversight Board intervino. Meta explicó la diferencia: la imagen americana fue agregada al banco de matching gracias a señales mediáticas; no hubo señales equivalentes para el caso indio. Desde la ética del cuidado, esto no es solo un fallo técnico de cobertura: es una jerarquía de quién merece protección y quién tiene que esperar a que el daño sea suficientemente visible para los mercados relevantes.

## La decisión que nadie declaró

**Los tres marcos no son intercambiables ni equivalentes: cada uno produce conclusiones distintas frente al mismo problema.** El utilitarismo ve el sesgo dermatológico como un costo aceptable si el beneficio agregado es suficientemente alto. La deontología lo rechaza porque viola el principio de igual trato sin importar el tamaño del grupo afectado. La ética del cuidado señala la relación de responsabilidad rota entre el sistema y las personas más vulnerables. Ninguno de los tres "gana": el valor de usarlos en conjunto es que cada uno ilumina una dimensión que los otros no pueden ver.

**Casi ningún sistema de IA en producción declara el marco ético que guió su diseño.** Las empresas publican principios, no marcos. La diferencia importa: un principio como "equidad" es compatible con cualquier marco filosófico y no compromete a nada. Un marco obliga a hacer elecciones específicas y defenderlas. Cuando alguien afirma que su IA es "ética", la pregunta correcta no es "¿tienen un documento?" sino "¿cuál es el marco que jerarquiza los valores cuando entran en conflicto?"

## En LATAM, la ética que falta no es solo conceptual

**América Latina enfrenta una capa que el debate en inglés rara vez menciona: los marcos que regulan estos sistemas se diseñan en EE. UU. y Europa, con datos que sobrerepresentan esas poblaciones.** Cuando un equivalente a COMPAS llega a un juzgado mexicano o colombiano, los sesgos estructurales ya vienen incorporados — entrenados en contextos demográficos y jurídicos distintos. El Oversight Board señaló en 2024 que los beneficios de los nuevos modelos deben distribuirse de forma equitativa más allá de los mercados angloparlantes occidentales donde las plataformas concentran la mayor parte de sus recursos. La región está sistemáticamente subrepresentada en los datos de entrenamiento y es la última en la fila cuando los sistemas fallan.

**El debate sobre la ética de la IA en América Latina no puede limitarse a adoptar los marcos que llegan del norte.** Requiere construir capacidad propia para evaluar qué marcos aplican en contextos locales y qué datos de entrenamiento son necesarios para que los sistemas funcionen con precisión en poblaciones diversas. La discusión filosófica sobre cuál marco ético usar ni siquiera ha comenzado en la mayoría de los países de la región — y los sistemas ya están operando.

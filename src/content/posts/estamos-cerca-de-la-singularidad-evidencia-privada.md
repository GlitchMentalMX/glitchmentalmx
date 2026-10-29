---
title: ¿Estamos cerca de la singularidad? La evidencia es privada
category: Inteligencia Artificial
pubDate: 2026-10-29T10:50
updatedDate: ''
description: OpenAI y Anthropic dicen que la IA ya acelera su desarrollo. Lo público es lo que ellas eligen mostrar, y aún no hay auditoría independiente.
heroImage: /images/uploads/singularidad-cerca.webp
heroImageAlt: '¿Estamos cerca de la singularidad?: auditora ante monitor con curva de datos tapada y puerta de servidores cerrada'
draft: true
---

Estamos más cerca de algunas condiciones de la singularidad que de **una prueba de que esté cerca**. OpenAI y Anthropic publican métricas de su propia aceleración, pero los datos crudos y los modelos sin lanzar no están al alcance de quien está fuera.

## Qué significa que la evidencia sea privada

En este texto, “privada” no quiere decir que las empresas escondan todo. Quiere decir que **la evidencia pública es la que ellas eligen publicar**, medida con criterios propios, mientras que lo que permitiría auditarla (los datos crudos, los modelos sin lanzar y las entrevistas con el personal) no está al alcance del público. Las cifras están fechadas al 28 de octubre de 2026.

Conviene separar tres términos que suelen mezclarse. La _IA generativa_ es la que produce texto, imágenes o código a partir de instrucciones. La _inteligencia artificial general_ (AGI, por sus siglas en inglés) es un sistema capaz de hacer cualquier tarea cognitiva que haga una persona, [un concepto que nadie define igual](https://glitchmental.com/articulos/agi-el-concepto-mas-poderoso-y-menos-definido-de-la-tecnologia/). La _singularidad_ es otra cosa, y **ni siquiera es un solo argumento**: I. J. Good planteó en 1965 que una máquina que mejora su propio diseño se automejoraría cada vez más rápido, [idea que François Chollet rebate](https://glitchmental.com/articulos/escepticos-riesgo-existencial-ia-argumentos/), mientras que [Kurzweil](https://glitchmental.com/articulos/largoplacismo-abundancia-ia-kurzweil-tegmark-bostrom/) sostiene que las tecnologías crecen de forma exponencial y fija la singularidad en 2045.

## De la profecía al calendario de producto

El vocabulario cambió. Como ya reseñamos, [parte de la industria dejó de hablar de AGI](https://glitchmental.com/articulos/la-industria-de-ia-esta-dejando-de-hablar-de-agi-y-hay-una-razon-clara/), y los documentos de las propias empresas hablan hoy de **automejora recursiva** (RSI, por sus siglas en inglés): un sistema capaz de diseñar y desarrollar por sí solo a su sucesor, según la definición de Anthropic. Esa empresa admite que aún no llegamos ahí y que no es inevitable: _“We are not there yet”_.

Con el cambio de palabra llegaron las fechas. Según YourStory, Sam Altman fijó en una transmisión en vivo del 28 de octubre de 2025 el objetivo de tener un pasante de investigación automatizado en septiembre de 2026 y un investigador de IA automatizado en marzo de 2028. OpenAI afirma ahora que, **según sus propias mediciones, ya alcanzó el primero**. Define al pasante como un sistema que hace tareas bien definidas bajo dirección humana, algunas de las cuales a un investigador capacitado le tomarían días.

## Lo que Anthropic y OpenAI dicen medir

Todo lo que sigue es **autorreportado**: son datos de cada empresa sobre su propio trabajo, no auditorías independientes, y cada cifra viene con las salvedades que la propia empresa publica.

Anthropic, en su publicación “When AI builds itself” (junio de 2026), reporta que en mayo de 2026 **más del 80% del código que integró a producción lo escribió Claude**, frente a una cifra baja de un solo dígito antes de febrero de 2025. Es una medición de líneas integradas atribuibles a Claude; su dirección estima 90% o más si se cuentan scripts y código experimental. En el segundo trimestre de 2026, además, el ingeniero típico fusionaba 8 veces más código por día que en 2024. Anthropic admite que las líneas de código son una medida imperfecta y que ese 8x casi seguro sobrestima la ganancia real de productividad.

Más cerca de la investigación, Anthropic reporta una prueba de “siguiente paso” con 129 momentos de sesiones reales (de enero a marzo de 2026): su mejor modelo de noviembre de 2025 eligió un mejor paso que el humano el 51% de las veces, y Mythos Preview, en abril de 2026, el 64%. **La salvedad importa tanto como la cifra**: los momentos se escogieron porque la decisión humana tenía margen de mejora, el juez fue otro modelo de Claude y, en un conjunto de control de 127 momentos donde el humano ya había elegido bien, los modelos ganaron solo cerca del 20% de las veces. No significa que la IA decida mejor que las personas.

En un experimento de abril de 2026, agentes de Claude recuperaron el 97% de la brecha en un problema de seguridad de IA (que un modelo débil supervise a uno fuerte), frente a cerca de 23% de dos investigadores humanos en aproximadamente una semana; los agentes acumularon 800 horas y unos 18,000 dólares de cómputo. Anthropic aclara que **el resultado no se transfirió limpiamente a modelos a escala de producción** y que los humanos eligieron el problema y la rúbrica.

Anthropic, citando a METR, añade que la duración de las tareas que los modelos completan solos **se duplica cada cuatro meses aproximadamente**, frente a siete meses en la tendencia previa. Según METR, Mythos Preview podía trabajar al menos 16 horas con un 50% de confiabilidad, en el límite de lo que esa organización puede medir.

OpenAI, por su parte, reporta en su publicación “Acelerar la investigación: una mirada desde OpenAI” (6 de septiembre de 2026) que a mediados de agosto de 2026 su organización de investigación usaba el equivalente a **3.1 jornadas de trabajo de agentes por cada jornada humana de 8 horas**; antes de junio de 2026, el tiempo de los agentes era menor que el humano. El investigador en la mediana pasó de usar poco los agentes para programar a consumir más de 600 dólares diarios de inferencia a precios de la API; el del percentil 90, más de 7,000 dólares diarios en tokens. OpenAI advierte que sus mediciones son preliminares, que esos datos son fáciles de medir pero difíciles de interpretar y que su avance general de investigación probablemente no sigue el ritmo de esas métricas específicas.

Las dos coinciden en lo esencial: **la dirección y el juicio siguen en manos humanas**. Anthropic dice que Claude ejecuta experimentos bien especificados igual o mejor que humanos hábiles, pero que persisten grandes brechas al elegir metas. OpenAI reporta que las personas aún fijan las prioridades y deciden si ampliar, pausar o desplegar; que la planificación de alto nivel es una fracción mínima de lo que producen los agentes; y que más de la mitad de las tareas exitosas de 4 a 8 horas de los últimos seis meses requirió al menos una intervención humana. OpenAI admite además que aún no sabe cómo alcanzar de forma segura una RSI plena y alineada, y que no puede asumir que la alineación y la seguridad avancen al mismo ritmo que las capacidades.

![¿Estamos cerca de la singularidad?: auditora con la mano sobre una puerta cerrada mira racks de servidores por una ranura](/images/uploads/singularidad-cerca-1.webp)

## El que mide no es el que audita

En ambos casos, quien define la métrica, la mide y la califica es la misma empresa; en el caso de OpenAI, también fijó la meta. Eso no las vuelve mentirosas: las dos publican salvedades sobre sus propias métricas, y OpenAI plantea que las empresas, incluida ella, deberían estar obligadas a informar públicamente su avance hacia la RSI. Pero **reportar es transparencia, no auditoría**, y ambas miden su propia aceleración con incentivos comerciales de por medio.

> La singularidad dejó de ser una profecía y se volvió un calendario de producto, pero la evidencia pública de que se cumple es la que las propias empresas eligen publicar.

Anthropic lo reconoce: **las pruebas públicas no revelan el impacto de la IA sobre su propio desarrollo**, y para medirlo hace falta evidencia directa desde dentro de las empresas. METR, una organización independiente que evalúa modelos de frontera, propuso el 14 de octubre de 2026 que las empresas compartan con terceros la evidencia que falta. Un evaluador externo tendría que analizar las capacidades de modelos no lanzados, los insumos (trabajo, cómputo, datos y algoritmos) y entrevistar a investigadores internos. Según METR, **ninguna empresa ha publicado evidencia detallada** sobre la aceleración de sus capacidades internas ni sobre su progreso algorítmico.

Incluso esa propuesta tiene límites que la propia METR enumera: sus ejercicios no son auditorías, todo el acceso quedaría a discreción de cada empresa y las empresas podrían ocultar información. METR sí ha publicado revisiones de los reportes de riesgo de Anthropic, como la de su sección sobre I+D automatizada en el reporte de febrero de 2026, pero a partir de la evidencia que la empresa le entregó. Por eso, desde fuera, **“¿ya empezó?” todavía no tiene un árbitro independiente que haya medido la aceleración de la I+D con acceso a datos internos y publicado el resultado**.

El 15 de octubre de 2026, un día después de esa propuesta, Anthropic anunció que dio a METR acceso “de nivel empleado” a sus sistemas, según Reuters: seis personas de METR con equipo de la empresa, oficina y acceso a herramientas internas comparable al de los equipos de evaluación de riesgos de Anthropic. Entre las categorías en las que Anthropic puede exigir omisiones están los datos de clientes, la información legalmente privilegiada y la información sobre la arquitectura de sus modelos. Anthropic no puede vetar los hallazgos de METR sobre riesgos, incidentes y prácticas, pero sí puede exigir omisiones estrictamente acotadas, que METR puede cuestionar en público sin revelar lo omitido; METR dice que su reporte describirá abiertamente el alcance, el acceso y las limitaciones de su trabajo. 

Anthropic desarrolla tres niveles de acceso para evaluadores y reconoce que sus otras colaboraciones están en una etapa temprana, con acceso y derechos de publicación más limitados. Es **un avance real, en la dirección de lo que METR pedía**: acceso a sistemas internos y derecho a publicar. Pero quien anuncia, concede el acceso y puede exigir omisiones sigue siendo la empresa evaluada, y hasta donde alcanzan las fuentes de este texto, todavía no hay un reporte escrito con ese acceso. Días antes, el 13 de octubre, Reuters había reportado, citando a dos personas con conocimiento de las conversaciones, que Anthropic y OpenAI buscaron un control significativo sobre lo que los evaluadores externos pueden publicar, y que hasta al menos el 5 de octubre buscaban un control editorial estricto. 

Anthropic respondió que eso no caracteriza con exactitud todas sus conversaciones: dijo que, con evaluadores con los que ya trabajaba, los revisores controlan sus métodos, criterios, conclusiones y qué publicar, aunque con evaluadores nuevos se reservó el derecho de comentar y aprobar informes. OpenAI dijo que no busca derechos de aprobación sobre el texto completo y que su práctica es ocultar información confidencial y permitir que los evaluadores revelen si hubo omisiones importantes. 

Reuters recoge además la advertencia de expertos de que, sin estándares acordados, los laboratorios podrían dictar cómo se examinan sus sistemas, porque controlan el acceso del que dependen los evaluadores, y su preocupación por la independencia de los evaluadores, dado que Anthropic y OpenAI eligen quién hace las revisiones. Según la propuesta de METR, Dario Amodei se comprometió en una carta a incorporar evaluadores externos con ese nivel de acceso, y Sam Altman confirmó en X que OpenAI haría lo mismo.

![¿Estamos cerca de la singularidad?: auditora frente a una puerta de nogal y latón cerrada con luz de servidores en el piso](/images/uploads/singularidad-cerca-2.webp)

## Los frenos que no dependen de qué tan inteligente sea la IA

Tampoco hay motivo para dar la singularidad por hecha. Anthropic encontró un freno en su propia casa: al integrar más código por la organización, **la revisión humana se volvió un cuello de botella nuevo**. Lo explica con la ley de Amdahl, un principio de la computación según el cual acelerar una parte de un proceso suele mover el cuello de botella a otra. OpenAI dice algo parecido: conforme avance la automatización, lo menos automatizable absorberá más esfuerzo, y el cómputo también limita el progreso.

Un artículo académico de 2025 de Parker Whitfill y Cheryl Wu, “Will Compute Bottlenecks Prevent an Intelligence Explosion?”, plantea el mecanismo de fondo: si el trabajo cognitivo y el cómputo de investigación son complementos, la mejora recursiva **se agota por falta de cómputo experimental**, aunque el trabajo cognitivo se multiplique. El propio texto no zanja la duda: con un modelo estima que son sustitutos y con otro, que son complementos, usando datos de cuatro laboratorios entre 2014 y 2024, y sus autores piden interpretar los resultados con cautela.

Anthropic incluye entre sus escenarios que las curvas resulten ser curvas en S, que se aplanan, pero dice que no lo considera probable; el que ve más probable es el de eficiencia compuesta, con humanos fijando la dirección. El Informe Internacional de Seguridad de la IA 2026, publicado el 3 de febrero de 2026, resume el rango así: **hacia 2030 el progreso podría frenarse, seguir al ritmo actual o acelerarse mucho**, por ejemplo si los sistemas empiezan a acelerar la propia investigación en IA.

Frenar no es lo mismo que descartar. Una nota de investigación de dos integrantes de METR, de julio de 2026 y que no refleja necesariamente la postura de toda la organización, considera que la evidencia de cada razón por la que una aceleración se frenaría no es abrumadora, y admite que **no puede descartar una aceleración rápida y prolongada**.

## Quién está en la sala cuando se mide

Si la evidencia necesaria está dentro de las empresas y **el acceso depende de lo que cada una decida compartir**, la pregunta deja de ser técnica. Ya se otorgó un primer acceso de nivel empleado: seis personas de METR dentro de Anthropic, según Reuters. Para un lector en México o en el resto de América Latina, esa conversación ocurre a distancia: hasta donde alcanzan las fuentes de este texto, la región no aparece entre quienes miden, quienes verifican ni quienes deciden qué se comparte.

Nota de transparencia: el proceso editorial de este sitio usa herramientas de IA, entre ellas Claude, de Anthropic, una de las empresas analizadas en este texto.

¿Qué evidencia aceptaríamos como prueba de que empezó, y **quién tendría derecho a verla** antes de que el proceso sea irreversible?

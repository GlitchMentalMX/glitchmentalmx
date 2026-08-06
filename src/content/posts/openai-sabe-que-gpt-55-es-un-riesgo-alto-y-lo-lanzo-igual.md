---
title: OpenAI sabe que GPT-5.5 es un riesgo alto. Y lo lanzó igual
category: Inteligencia Artificial
pubDate: 2026-04-25T12:42:00.009Z
updatedDate: 2026-04-25T13:58:27.669Z
description: >-
  El 23 de abril, OpenAI lanzó GPT-5.5 con benchmarks impresionantes y un
  detalle que casi nadie en español destacó: la empresa clasificó el modelo como
  riesgo…
heroImage: >-
  /images/posts/openai-sabe-que-gpt-55-es-un-riesgo-alto-y-lo-lanzo-igual/hero.jpg
heroImageAlt: >-
  GPT-5.5 alto riesgo ciberseguridad: persona sube hacia compuerta blindada
  sujeta por cable que limita acceso
---
El 23 de abril, OpenAI lanzó GPT-5.5 con benchmarks impresionantes y un detalle que casi nadie en español destacó: la empresa clasificó el modelo como riesgo **"Alto" en ciberseguridad** bajo su propio sistema de evaluación — el mismo nivel que sus capacidades biológicas y químicas. El freno aplicado fue un conjunto de clasificadores más estrictos. Y el modelo salió de todas formas.

## Qué es el Preparedness Framework y qué significa "Alto"

El _Preparedness Framework_ es el sistema interno de OpenAI para evaluar si un modelo representa un riesgo de daño severo antes de lanzarlo. Tiene cuatro niveles: Bajo, Medio, Alto y Crítico. Según los propios documentos técnicos de la empresa, un modelo clasificado como **"Alto" en ciberseguridad** es capaz de amplificar rutas existentes hacia daños graves — aunque no alcance el umbral "Crítico", que implica desarrollar exploits —código diseñado para aprovechar una vulnerabilidad y tomar control de un sistema— en entornos reales sin intervención humana.

GPT-5.5 alcanzó el nivel "Alto" tanto en ciberseguridad como en capacidades biológicas y químicas. En ciberseguridad específicamente, la evaluación mostró que el modelo supera a GPT-5.4 en detección y explotación de vulnerabilidades. Una evaluación externa de XBOW —firma especializada en seguridad ofensiva— encontró que GPT-5.5 falla en detectar vulnerabilidades reales conocidas solo el 10% de las veces, comparado con el 40% de GPT-5 y el 18% de Claude Opus 4.5.

> OpenAI clasificó su propio modelo como riesgo "Alto" en ciberseguridad, lo lanzó con clasificadores más estrictos como único freno, y llamó a eso "los controles más robustos hasta la fecha".

## Qué hace realmente GPT-5.5 (no solo chatear)

El dato que define a este modelo no está en los benchmarks de razonamiento sino en su arquitectura operativa: GPT-5.5 fue diseñado explícitamente para funcionar como **agente autónomo**. Puede navegar aplicaciones de escritorio, escribir y depurar código, analizar sistemas completos y ejecutar flujos de trabajo de principio a fin con mínima supervisión humana. Greg Brockman, cofundador y presidente de OpenAI, describió el lanzamiento como un avance hacia "computación más agéntica (basada en agentes) e intuitiva" — y un paso adicional hacia la creación de una "super app" que combine ChatGPT, Codex y el navegador con IA en un solo servicio.

En términos de rendimiento, el modelo alcanzó el **82.7% en Terminal-Bench 2.0** —evaluación de flujos de trabajo complejos en línea de comandos— y el 58.6% en SWE-Bench Pro, que mide la resolución de problemas reales extraídos de repositorios de GitHub. Cabe señalar que varias de estas evaluaciones son diseñadas y administradas por la propia OpenAI, lo que limita su valor como referencia externa independiente.

El precio de acceso vía API es de **$5 por millón de tokens de entrada y $30 por millón de tokens de salida**, con una ventana de contexto de 1 millón de tokens. OpenAI argumenta que el modelo usa menos tokens que su versión anterior para completar las mismas tareas, lo que lo hace más eficiente en costo por tarea, aunque más caro por token que modelos anteriores.

  

![OpenAI GPT-5.5 alto riesgo: bóveda entreabierta con luz contenida por cable de seguridad](/images/posts/openai-sabe-que-gpt-55-es-un-riesgo-alto-y-lo-lanzo-igual/1.jpg)

  

## La respuesta de OpenAI: clasificadores más estrictos

La empresa no negó el riesgo ni lo minimizó. Lo reconoció públicamente y anunció que desplegó los controles más robustos de su historia: clasificadores automatizados que detectan actividad cibernética sospechosa y redirigen el tráfico de alto riesgo a un modelo menos capaz, restricciones en solicitudes vinculadas a ciberseguridad sensible, y un programa de acceso verificado para investigadores de seguridad legítimos. También dejó en claro que algunos usuarios encontrarán fricción con los nuevos filtros — una admisión implícita de que la calibración entre utilidad y contención todavía no es exacta.

El argumento de fondo de OpenAI es que **no lanzar el modelo no lo haría más seguro**: los actores maliciosos seguirían buscando capacidades equivalentes en otros modelos o herramientas, mientras que los defensores —analistas de seguridad, equipos de respuesta a incidentes— perderían acceso a una herramienta que puede ayudarlos. Es un argumento que tiene lógica interna. Y es también exactamente el tipo de argumento que justificaría casi cualquier lanzamiento, independientemente del nivel de riesgo.

## La pregunta que el lanzamiento no responde

El Marco de Preparación de OpenAI define el nivel "Crítico" como el umbral que requeriría no lanzar un modelo o retrasarlo indefinidamente. GPT-5.5 no llegó a "Crítico" — no pudo producir exploits funcionales de gravedad crítica en sistemas reales endurecidos de forma autónoma. Eso es relevante. Pero el nivel "Alto" tampoco es una categoría de bajo riesgo: implica capacidades que pueden amplificar daños graves de forma significativa.

La pregunta que el ecosistema debería estar haciéndose no es si GPT-5.5 era demasiado peligroso para lanzarse. Es más simple: **si el nivel "Alto" se resuelve con clasificadores, ¿qué tendría que ocurrir para que OpenAI decidiera no lanzar un modelo?** La empresa no ha respondido eso con claridad. Y la carrera de lanzamientos —GPT-5.2 en diciembre, GPT-5.3 en noviembre, GPT-5.4 en marzo, GPT-5.5 en abril— no sugiere que la respuesta sea pronto.

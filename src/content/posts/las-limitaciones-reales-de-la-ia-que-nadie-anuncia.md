---
title: Las limitaciones reales de la IA que nadie anuncia
pubDate: 2026-03-28T14:32:00.004Z
updatedDate: 2026-03-28T14:32:42.235Z
description: >-
  El ciclo de noticias sobre IA oscila entre dos extremos: la herramienta que lo
  cambia todo o la amenaza que destruirá todo. Ambas narrativas comparten el…
heroImage: /images/posts/las-limitaciones-reales-de-la-ia-que-nadie-anuncia/hero.png
heroImageAlt: >-
  limitaciones de la IA: persona revisando documentos impresos en flujo
  automatizado de producción
---
El ciclo de noticias sobre IA oscila entre dos extremos: la herramienta que lo cambia todo o la amenaza que destruirá todo. **Ambas narrativas comparten el mismo defecto: ignoran los límites técnicos reales de los modelos actuales.** Conocerlos no es pesimismo; es el único punto de partida honesto para decidir cuándo y cómo usar estas herramientas.

## El problema de las alucinaciones: estructural, no accidental

Los modelos de lenguaje generan texto que suena plausible pero que puede ser factualmente incorrecto. Este fenómeno se llama _alucinación_, y no es un error de diseño que los ingenieros puedan simplemente corregir. Investigadores de la Universidad Nacional de Singapur publicaron en 2024 un análisis que demuestra formalmente que **es imposible eliminar las alucinaciones en los LLMs**, porque los modelos no pueden aprender todas las funciones computables y, por tanto, siempre tendrán puntos ciegos estructurales.

Los casos documentados van más allá de datos inventados en conversaciones casuales. En 2024, la aerolínea Air Canada enfrentó consecuencias legales ante el Tribunal Civil de Resolución de British Columbia porque su chatbot entregó información incorrecta sobre tarifas de duelo a un pasajero; el tribunal ordenó a la aerolínea pagar los daños y rechazó el argumento de que el chatbot era una entidad independiente. En tareas más complejas, las tasas de error suben de forma notable: según el System Card publicado por OpenAI en abril de 2025, **el modelo o3 alucinó en el 33% de las preguntas sobre personas reales en el benchmark PersonQA, y o4-mini alcanzó el 48%** — más del doble que los modelos anteriores de la misma empresa, y sin que OpenAI haya explicado todavía por qué.

> Un modelo de lenguaje no miente. No tiene la intención de engañar. Simplemente genera texto que suena correcto, sin tener acceso real a la verdad.

## El sesgo: no viene de la IA, viene de los datos

Los modelos de lenguaje aprenden de texto escrito por humanos. Ese texto contiene los sesgos, estereotipos y asimetrías de representación presentes en la producción cultural e informativa de las últimas décadas. El modelo los absorbe y los replica, a veces amplificados. **No hay forma de entrenar un modelo completamente libre de sesgo mientras los datos de entrenamiento reflejen un mundo con sesgos.**

Según la investigación publicada en Harvard Kennedy School's Misinformation Review, los modelos muestran mayor confiabilidad en temas con abundante documentación de alta calidad y fuerte consenso experto, y son menos confiables en temas con datos escasos, contradictorios o históricamente sesgados. Esto significa que **la confiabilidad de un modelo no es uniforme: varía según el tema**, la región geográfica, el idioma y el grupo social sobre el que se pregunta.

  

![limitaciones de la IA: hojas en cinta transportadora representando procesamiento automatizado de documentos](/images/posts/las-limitaciones-reales-de-la-ia-que-nadie-anuncia/1.png)

  

## La dependencia de datos: lo que no entrenó, no lo sabe

Los modelos actuales tienen una fecha de corte en sus datos de entrenamiento. Nada que haya ocurrido después de esa fecha existe para el modelo, a menos que se le proporcione explícitamente a través de herramientas de búsqueda o documentos adjuntos. **Esto convierte a los LLMs en sistemas con una forma específica de amnesia temporal**: muy competentes sobre el pasado documentado, completamente ciegos sobre el presente.

La dependencia va más allá de las fechas. Los modelos son tan buenos como los datos con los que fueron entrenados. Temas con escasa documentación digital —comunidades indígenas, idiomas de baja difusión, historias locales no digitalizadas— están sistemáticamente subrepresentados, lo que genera respuestas de menor calidad o directamente incorrectas para quienes pertenecen a esos contextos.

## El problema del contexto y la memoria

Los modelos actuales procesan texto dentro de una ventana de contexto: una cantidad máxima de texto que pueden "ver" al mismo tiempo. Cuando una conversación supera esa ventana, el modelo pierde acceso a lo que ocurrió antes. **No tiene memoria persistente entre sesiones a menos que el sistema que lo aloja la implemente por separado.** Lo que parece una conversación continua con una entidad que te recuerda es, en realidad, un mecanismo de recuperación de información externo al modelo mismo.

## Escala y costo: el límite que menos se menciona

Entrenar y operar modelos de lenguaje a gran escala tiene un costo energético y computacional significativo. Esto crea una concentración estructural: solo un puñado de organizaciones en el mundo tiene los recursos para construir y mantener modelos de frontera. **La narrativa de la IA democratizadora convive con la realidad de una infraestructura altamente centralizada.** Los modelos de código abierto reducen parcialmente esta asimetría, pero el entrenamiento de los modelos más capaces sigue siendo territorio de un grupo reducido de actores.

Conocer estas limitaciones no invalida la utilidad de las herramientas. Las hace más útiles, porque permite usarlas donde son confiables, complementarlas donde fallan y no delegar decisiones críticas a sistemas que, en última instancia, generan predicciones estadísticas presentadas con la confianza de quien cree saber la respuesta.

---
title: 'Cómo funcionan los LLMs realmente: guía sin rodeos'
pubDate: 2026-03-28T14:17:00.004Z
updatedDate: 2026-06-25T22:38:31.509Z
description: >-
  Los modelos de lenguaje como ChatGPT, Claude o Gemini no son inteligencias que
  piensan. Son sistemas estadísticos entrenados para predecir cuál es la…
heroImage: /images/posts/como-funcionan-los-llms-realmente-guia-sin-rodeos/hero.webp
heroImageAlt: >-
  Cómo funcionan los LLMs: investigadora ajustando estructura de pines con forma
  de cerebro
---
Los modelos de lenguaje como ChatGPT, Claude o Gemini no son inteligencias que piensan. **Son sistemas estadísticos entrenados para predecir cuál es la siguiente palabra más probable en una secuencia de texto.** Eso es todo. Y sin embargo, de esa operación aparentemente simple emergen capacidades que siguen sorprendiendo a sus propios creadores.

## El punto de partida: tokens, no palabras

Antes de que un modelo procese cualquier texto, convierte las palabras en _tokens_. Un token no equivale a una palabra: puede ser una sílaba, una raíz o incluso un signo de puntuación. La palabra "transformers", por ejemplo, puede dividirse en dos tokens separados. **Esta tokenización reduce drásticamente la carga computacional** porque el modelo no trabaja con el texto crudo, sino con identificadores numéricos. Según IBM, los vocabularios de los modelos modernos contienen entre 50,000 y 100,000 tokens únicos.

Una vez convertidos a números, esos tokens se transforman en vectores: listas de cientos o miles de valores que representan el significado del token en un espacio matemático. La clave aquí es que **palabras con significados similares terminan ubicadas geométricamente cerca en ese espacio**. No porque alguien lo programó así, sino porque el modelo lo aprendió por exposición a enormes cantidades de texto.

## La arquitectura transformer y el mecanismo de atención

El tipo de red neuronal que subyace a todos los modelos modernos se llama _transformer_. Fue introducida en 2017 en el paper "Attention is All You Need" de Google, y desde entonces se convirtió en la arquitectura dominante en IA de lenguaje, visión e incluso predicción de proteínas.

El componente central del transformer es el **mecanismo de autoatención**, que permite al modelo evaluar qué tan relevante es cada token del texto para interpretar cualquier otro token en la misma secuencia. Si la frase es "El animal no cruzó la calle porque estaba cansado", el modelo debe decidir si "estaba" se refiere al animal o a la calle. El mecanismo de atención calcula pesos de relevancia entre todos los tokens simultáneamente y resuelve esa ambigüedad, según la documentación técnica de Google para desarrolladores.

Lo que hace al transformer especialmente poderoso es que no procesa el texto de forma secuencial, palabra por palabra. **Procesa toda la secuencia a la vez**, lo que le permite capturar relaciones entre palabras que están muy separadas en el texto y hace posible entrenar modelos mucho más grandes con mayor eficiencia.

## Cómo se genera una respuesta, paso a paso

![Cómo funcionan los LLMs: pinzas retirando pines de una figura cerebral sobre superficie blanca](/images/posts/como-funcionan-los-llms-realmente-guia-sin-rodeos/1.webp)

  

Cuando escribes una pregunta en un chatbot, ocurre lo siguiente: el texto se tokeniza, los tokens se convierten en vectores de embeddings, esos vectores pasan por múltiples capas de bloques transformer donde cada capa refina la representación contextual, y finalmente el modelo produce una distribución de probabilidades sobre todos los tokens posibles del vocabulario. **El token que recibe la mayor probabilidad se selecciona como el siguiente output.** Luego ese token se agrega al contexto, y el proceso se repite hasta completar la respuesta.

Un parámetro llamado _temperatura_ controla qué tan determinista o creativo es ese proceso de selección. A temperatura baja, el modelo casi siempre elige el token más probable. A temperatura alta, puede elegir opciones menos probables, lo que genera respuestas más variadas pero también más propensas al error. Los desarrolladores ajustan este parámetro según el caso de uso.

> Un LLM no sabe lo que dice. Solo sabe qué viene después de lo que ya dijo, con base en patrones aprendidos de texto escrito por humanos que sí sabían lo que querían decir.

## El entrenamiento: escala, datos y ajuste fino

Los modelos actuales se entrenan en dos fases principales. En la primera, llamada _preentrenamiento_, el modelo procesa cantidades masivas de texto —páginas web, libros, código, artículos científicos— y aprende a predecir tokens de forma no supervisada. Esta fase consume recursos computacionales enormes y puede durar semanas sobre miles de chips especializados.

En la segunda fase, el _ajuste fino_ (fine-tuning) toma ese modelo general y lo especializa usando conjuntos de datos más pequeños y curados, típicamente con retroalimentación humana. **Es en esta etapa donde los modelos aprenden a seguir instrucciones, a ser útiles y a evitar ciertos comportamientos.** Según la documentación de Hugging Face, esta fase permite adaptar un modelo preentrenado a tareas específicas con una fracción del costo del entrenamiento original.

## Lo que el mecanismo no puede hacer

Entender cómo funcionan los LLMs ayuda a entender también sus límites. El modelo no tiene acceso a información fuera de sus datos de entrenamiento a menos que se le proporcione explícitamente. **No razona en el sentido formal: ejecuta predicción estadística sofisticada.** No tiene memoria entre conversaciones a menos que el sistema la implemente por separado. Y puede producir texto que suena completamente plausible aunque sea factualmente incorrecto, porque la plausibilidad lingüística y la veracidad factual son cosas distintas.

La arquitectura transformer, con su mecanismo de autoatención y su entrenamiento a escala, es uno de los desarrollos técnicos más influyentes de las últimas décadas. Pero sigue siendo, en esencia, una máquina de completar texto. Que eso sea suficiente para generar código funcional, traducciones precisas o análisis útiles dice más sobre la estructura del lenguaje humano que sobre alguna forma de comprensión interna del modelo.

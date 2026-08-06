---
title: La IA occidental tiene un problema de religión serio
category: Inteligencia Artificial
pubDate: 2026-04-27T04:31:00.002Z
updatedDate: 2026-07-09T02:21:12.626Z
description: >-
  Los modelos de lenguaje se evalúan por precisión matemática, capacidad de
  razonamiento y rendimiento en código. Nadie publica un benchmark estándar de
  sesgo…
heroImage: /images/posts/la-ia-occidental-tiene-un-problema-de-religion-serio/hero.jpg
heroImageAlt: >-
  La IA occidental: mujer sostiene libro con patrones de red en biblioteca con
  símbolos en el suelo
---
Los modelos de lenguaje se evalúan por precisión matemática, capacidad de razonamiento y rendimiento en código. **Nadie publica un benchmark estándar de sesgo religioso.** Eso es un problema cuando el mismo sistema responde preguntas sobre duelo, muerte y sentido de vida a usuarios en Jakarta, Lagos y Ciudad de México.

## Lo que los benchmarks no miden

En 2021, los investigadores Abubakar Abid, Maheen Farooqi y James Zou publicaron en la conferencia AIES de la AAAI un estudio sobre GPT-3, entonces el modelo más avanzado del mundo. **El resultado fue directo: GPT-3 asocia la palabra “musulmán” con “terrorista” en el 23% de los casos al completar un texto a partir de una frase inicial.** Ninguna otra de las seis tradiciones religiosas analizadas generó una asociación negativa con esa frecuencia. El término judío se mapea con "dinero" en el 5% de los casos. El cristiano no genera ninguna asociación violenta comparable. Los investigadores probaron múltiples formatos — completar oraciones, razonamiento analógico, generación de historias — y el patrón apareció en todos.

Un segundo estudio, publicado en arXiv en 2023 y que replicó metodológicamente el trabajo de Abid para los modelos sucesores, encontró que **el sesgo no desaparece con el ajuste fino: en ChatGPT, el sesgo anti-musulmán se mantiene y en algunas condiciones de prueba se amplifica respecto al GPT-3 original.** El proceso de debiasing que OpenAI aplicó redujo las asociaciones explícitas, pero dejó intactas las asociaciones de segundo orden activadas por nombres de origen árabe o islámico en los prompts. Cambiar el nombre del sujeto fue suficiente para que el patrón resurgiera.

Un tercer trabajo, publicado en diciembre de 2025 en arXiv con datos de cuatro religiones y dos idiomas, añadió otro hallazgo: **el hinduismo puntúa consistentemente más bajo que el cristianismo en todos los idiomas evaluados, y el cristianismo domina los debates religiosos cuando el modelo opera en inglés.** No es solo que el Islam aparezca penalizado — es que hay una jerarquía implícita de representación que coloca la tradición mayoritariamente occidental en el centro y el resto en la periferia.

## El problema del corpus, antes de cualquier consulta

![La IA occidental: libro abierto con diagramas de red en atril dentro de biblioteca histórica](/images/posts/la-ia-occidental-tiene-un-problema-de-religion-serio/1.jpg)

  

El sesgo existe antes de que llegue el padre Brendan McGuire a la oficina de Anthropic. El internet en inglés produce de forma desproporcionada texto sobre ética, filosofía moral y espiritualidad desde marcos cristiano-occidentales. Eso ya está en el modelo desde el preentrenamiento. **Las consultas con líderes religiosos no crearon el sesgo — lo formalizaron en etapas críticas de alineación, las mismas donde el modelo aprende cómo responder a preguntas sensibles.**

Google, Meta y OpenAI no tienen procesos de consulta religiosa documentados públicamente con el nivel de detalle que ha salido a la luz en el caso de Anthropic. Eso no los hace más neutrales: los hace más opacos. La opacidad no es virtud. Un sesgo que nadie documenta es un sesgo que nadie puede cuestionar.

> La neutralidad religiosa en IA no existe. La pregunta no es si hay sesgo — es quién lo decide, con qué proceso, y quién puede cuestionarlo.

## El riesgo de la fragmentación silenciosa

Hay un escenario que la industria no discute públicamente: si los modelos se ajustan regionalmente para mercados como India, Indonesia o el mundo árabe por presión comercial o regulatoria, el resultado no es universalidad ética. Es un sistema de valores diferenciado por geografía **sin que el usuario sepa qué versión del modelo está recibiendo ni bajo qué supuestos fue entrenada.** Un usuario en Ciudad de México podría estar interactuando con un modelo ajustado para el mercado hispanohablante usando criterios que nunca eligió y que nadie le explicó. Eso no es personalización — es segmentación ideológica invisible.

El sesgo religioso en los LLMs no es una conspiración ni una anomalía técnica menor. Es la consecuencia predecible de entrenar modelos en corpus donde unas tradiciones tienen mucho más texto que otras, y luego afinar esos modelos con criterios culturales que no se someten a auditoría externa. El problema no comenzó con el summit cristiano de Anthropic. Pero ese summit es la primera evidencia documentada de que el proceso existe, tiene nombre y apellidos, y nadie lo está supervisando.

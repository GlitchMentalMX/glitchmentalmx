---
title: 'DeepSeek: la guía práctica para usarlo bien'
category: Inteligencia Artificial
pubDate: 2026-06-11T12:33:16.528Z
updatedDate: 2026-06-27T04:25:11.966Z
description: >-
  DeepSeek tiene tres capas de acceso: web gratis, API barata y uso local sin
  conexión. Cuál usar según tu perfil.
heroImage: /images/posts/deepseek-la-guia-practica-para-usarlo-bien/hero.jpg
heroImageAlt: >-
  DeepSeek guía práctica: mujer ante terminal activa con tres capas de acceso al
  modelo en espacio técnico personal con luz de pantalla
---
**[DeepSeek](/articulos/como-instalar-y-usar-deepseek-en-tu-computadora/) no es "el ChatGPT chino barato".** Tiene arquitectura propia, pesos abiertos bajo licencia MIT y tres capas de acceso con lógicas distintas de uso, costo y privacidad. Las guías en español solo cubren el chat web. Esta guía cubre las tres.

## Qué es DeepSeek (y por qué importa técnicamente)

**DeepSeek es un laboratorio de IA fundado en 2023** que opera con una arquitectura _Mixture-of-Experts_ (MoE): en lugar de activar todos los parámetros del modelo en cada inferencia, activa solo los expertos relevantes para la tarea. El resultado es un modelo más eficiente en cómputo. Los pesos del modelo están disponibles bajo licencia MIT — es decir, uso comercial libre sin restricciones propietarias. El costo de entrenamiento del modelo base V3 fue de 5.6 millones de dólares; la capa de razonamiento de R1 se entrenó con aproximadamente 294,000 dólares adicionales. Ambas cifras están muy por debajo del estándar de la industria.

**Los dos modelos clave para usuarios no-desarrolladores son V4 y R1.** DeepSeek V4 (el sucesor de V3) es el modelo de conversación y código: rápido, versátil, ideal para la mayoría de tareas cotidianas. DeepSeek R1 es el modelo de razonamiento: antes de entregar una respuesta, expone su cadena de pensamiento paso a paso, lo que lo hace especialmente útil para matemáticas, lógica y depuración de código.

## Capa 1: La interfaz web (chat.deepseek.com)

**El acceso web es gratuito y no requiere suscripción mensual** — solo una cuenta registrada. La interfaz tiene dos modos de operación que no siempre son obvios para un usuario nuevo. El modo estándar entrega respuestas directas sin mostrar el proceso interno. El modo "Think" activa el razonamiento paso a paso: el modelo trabaja el problema en voz alta antes de dar la respuesta final, lo que aumenta la calidad en tareas que requieren lógica, cálculo o depuración.

**Cuándo usar cada modo:** activa "Think" para problemas de matemáticas, código con errores difíciles de localizar, análisis de argumentos o cualquier tarea donde el proceso importa tanto como la respuesta. Usa el modo estándar para síntesis de texto, redacción, consultas generales y tareas donde la velocidad tiene más valor que la profundidad del razonamiento.

**DeepSeek responde mejor con prompts estructurados.** La regla es simple: _vague in, vague out_. Tres ejemplos prácticos según perfil:

**Estudiante (modo Think):** "Soy estudiante de cálculo. Explícame paso a paso por qué la integral de e^x es e^x + C, y dame un ejemplo de aplicación en física." — El modo Think expone cada paso del razonamiento, lo que facilita identificar dónde rompe la lógica propia.

**Investigador (modo Think):** "Tengo este fragmento de código Python que debería calcular la correlación de Pearson entre dos series temporales con valores faltantes, pero devuelve NaN sistemáticamente. Analiza el problema: \[pegar código\]." — El modo Think es particularmente útil para diagnóstico de bugs no obvios.

**Profesional de contenido (modo estándar):** "Reescribe este párrafo para una audiencia técnica latinoamericana, en español mexicano, sin jerga anglosajona. Tono directo, sin introducción genérica: \[pegar texto\]." — El modo estándar es suficiente para tareas de redacción donde no se necesita razonamiento profundo.

> DeepSeek ofrece tres rutas de acceso con lógicas distintas: la interfaz web gratuita para uso cotidiano, la API para automatizar flujos a un costo entre 10 y 20 veces menor que los modelos propietarios equivalentes, y el despliegue local para quienes no pueden enviar datos a servidores externos.

## Capa 2: La API (para quien automatiza flujos)

![DeepSeek capas de acceso: dedo sobre trackpad de laptop con tres pestañas parciales en pantalla sobre superficie oscura](/images/posts/deepseek-la-guia-practica-para-usarlo-bien/1.jpg)

  

**Al registrar una cuenta de desarrollador, DeepSeek otorga 5 millones de tokens gratuitos válidos por 30 días, sin requerir tarjeta de crédito.** Es suficiente para construir y probar un flujo de automatización completo antes de comprometer presupuesto. La API no tiene suscripción mensual — es pago por uso.

**Los modelos activos en la API en junio de 2026 son deepseek-v4-flash y deepseek-v4-pro.** Importante: los alias legacy _deepseek-chat_ y _deepseek-reasoner_ están programados para deprecarse el 24 de julio de 2026. Si tienes integraciones que usan esos nombres, actualiza el identificador del modelo antes de esa fecha.

**El precio de DeepSeek V4 Flash es de $0.14 por millón de tokens de entrada** (cache miss), frente a los $2.50 por millón de tokens de entrada de GPT-4o. La diferencia es de cerca de 18 veces en costo de entrada para un volumen equivalente. Para flujos de alta frecuencia — generación de reportes, procesamiento de documentos, pipelines de contenido — esa diferencia de costo es estructuralmente relevante.

**La API de DeepSeek es compatible con el formato de OpenAI.** Para quienes ya tienen integraciones con OpenAI, migrar implica cambiar la URL base y el identificador del modelo — dos líneas de código. El resto de la lógica de llamada permanece igual.

**Advertencia de privacidad:** los datos enviados a la API de DeepSeek transitan y se procesan en servidores ubicados en China. Para flujos que manejen información personal, datos de clientes, documentos confidenciales o propiedad intelectual sensible, el uso de la API no es apropiado. Para esos casos, la capa 3 —uso local— es la alternativa técnicamente correcta.

## Capa 3: Uso local con Ollama o LM Studio

**Correr DeepSeek localmente significa que ningún token sale de tu computadora.** Una vez descargado el modelo, funciona completamente offline, sin latencia de red y sin que ningún proveedor externo tenga acceso a los datos procesados. Esta es la capa relevante para investigadores, periodistas, abogados o cualquier profesional que trabaje con información que no puede abandonar el entorno controlado.

**Las dos herramientas principales para uso local son Ollama y LM Studio.** Ollama se instala con un solo comando en macOS, Linux o Windows y opera desde la terminal sin interfaz gráfica — es la opción natural para quienes trabajan en entornos de desarrollo o prefieren integrar el modelo en scripts propios. LM Studio es una aplicación de escritorio con interfaz visual que permite descargar, gestionar y conversar con modelos sin tocar una terminal. Misma capacidad técnica, distinta superficie de uso.

**El modelo recomendado para empezar es deepseek-r1:8b**, con un peso de descarga de aproximadamente 5 GB. Requiere un mínimo de 8 GB de RAM del sistema para correr — aunque en ese límite es necesario cerrar aplicaciones en segundo plano. Con 16 GB de RAM la experiencia es más estable y permite trabajar con el modelo activo mientras se usan otras aplicaciones. Para quienes quieran más capacidad de razonamiento sin pasar a hardware dedicado, deepseek-r1:14b requiere entre 12 y 16 GB de RAM.

**Una aclaración importante sobre el costo real del uso local:** para la mayoría de usuarios con consultas de volumen moderado, la API a $0.14 por millón de tokens sale económicamente más barata que el consumo eléctrico de correr el modelo en GPU de forma continua. El argumento para usar la capa local no es el ahorro económico — es la privacidad de los datos. Si el flujo de trabajo no tiene restricciones de confidencialidad, la API es la opción más conveniente.

## Tabla: qué opción usar según tu perfil

**Las tres capas de acceso tienen perfiles de uso distintos.** La tabla siguiente resume los factores clave para elegir:

| Opción | Costo | Privacidad | Requisitos | Ideal para |
| --- | --- | --- | --- | --- |
| Web — chat.deepseek.com | Gratuito | Servidores DeepSeek (China) | Navegador y cuenta | Uso cotidiano, redacción, aprendizaje |
| API | $0.14/M tokens entrada (V4 Flash); 5M tokens gratis al registrarse | Servidores DeepSeek (China) — no usar con datos sensibles | Clave de API; conocimiento básico de código o n8n / Cursor | Automatización, scripts, pipelines de contenido |
| Local — Ollama / LM Studio | Sin costo por token; hardware mín. 8 GB RAM | Total — ningún dato sale de la máquina | 8–16 GB RAM; descarga inicial ~5 GB (modelo 8B) | Investigadores, profesionales con datos confidenciales, uso offline |

**Para usuarios en América Latina, las tres capas están disponibles sin restricciones regionales** y ninguna requiere suscripción mensual en dólares. En un ecosistema donde los modelos de referencia cobran entre $20 y $30 USD al mes por acceso web, y donde las instituciones académicas con presupuesto limitado quedan excluidas de los modelos de pago, DeepSeek representa una alternativa técnicamente sólida con una barrera de entrada prácticamente inexistente.

\* _Los precios de la API y la disponibilidad de modelos cambian con frecuencia. Verificar los valores actuales en api-docs.deepseek.com antes de publicar o integrar._

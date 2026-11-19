---
title: "19 de 23 herramientas de IA entrenan con tus datos por defecto en planes individuales; los 7 chats generales, sin excepción"
description: "De 23 herramientas de IA del Recomendador de glitchMentalMX, 19 entrenan con tus datos por defecto en planes individuales. Solo 12 ofrecen salida en México: 10 con interruptor y 2 por solicitud formal."
kicker: "Laboratorio · Experimento 02"
experimento: 2
pubDate: 2026-11-17
heroImage: /images/laboratorio/laboratorio-02-mapa-privacidad/hero.webp
heroImageAlt: "Gradilla de acero con viales que brillan en ámbar y liberan humo dorado, salvo unos pocos oscuros y sellados, y una mano enguantada sosteniendo uno de ellos."
csv: /datos/laboratorio-02-mapa-privacidad.csv
seoTitle: "19 de 23 herramientas de IA entrenan con tus datos por defecto"
nota: datos
roles: "Claude Code extrajo los datos de las fichas y los índices del propio sitio y Claude armó el expediente; Gemini diseñó el protocolo y audita; ChatGPT hizo una revisión ciega."
draft: false
---

## Resumen ejecutivo

- **Qué probamos:** Revisamos qué hacen con tus datos 23 herramientas de IA del Recomendador de glitchMentalMX: si entrenan por defecto, si permiten apagarlo (*opt-out*) y qué cambia según plan o región.
- **Qué encontramos:** 19 de 23 entrenan por defecto; 3 no (NotebookLM, Consensus y Adobe Creative Cloud) y 1 depende del plan (v0). De las 19 que entrenan por defecto, 12 ofrecen salida en México (10 con interruptor y 2 solo por solicitud formal: DeepSeek y HeyGen), 6 no ofrecen ninguna y 1 (Perplexity) queda sin verificar.
- **Qué significa:** En planes individuales, no entrenar con tus datos no es el valor por defecto. Se consigue apagando un ajuste, pagando un plan empresarial o viviendo en Europa.

## Protocolo y límites

- Las 23 herramientas (7 chats generales, 16 especialistas) son el subconjunto del [Recomendador](/que-ia-me-conviene/) dentro de las 87 fichas de la serie *Quién entrena con tus datos*. No representan el mercado. Cada ficha se verificó entre el 23 de agosto y el 17 de noviembre de 2026.
- Las categorías de entrenamiento, *opt-out* y plan son inferencias estructuradas desde fichas basadas en fuentes oficiales; el repositorio no las guarda como campos.
- Las políticas reflejan términos vigentes a la fecha de cada ficha, sin auditoría de tráfico de red. Evaluamos cuentas individuales; Enterprise y API suelen regirse por otros términos. En la columna «Opt-out en México», «No» indica ausencia de mecanismo disponible para usuarios en México, aunque exista por ley en regiones como la UE o el EEE.

## Evidencia

<table>
<thead>
<tr><th>Herramienta</th><th>Tipo</th><th>Entrena por defecto</th><th>Opt-out en México</th><th>Condición clave</th></tr>
</thead>
<tbody>
<tr><th colspan="5" scope="colgroup">Entrenan por defecto (19)</th></tr>
<tr><td><a href="https://glitchmental.com/articulos/claude-usa-mis-datos-para-entrenar-ia/">Claude</a></td><td>General</td><td>Sí</td><td>Interruptor</td><td>Free, Pro y Max; Work y API, términos aparte</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/chatgpt-usa-mis-datos-para-entrenar-ia/">ChatGPT</a></td><td>General</td><td>Sí</td><td>Interruptor</td><td>Team y Enterprise excluidos; sin efecto retroactivo</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/gemini-usa-mis-datos-para-entrenar-ia/">Gemini</a></td><td>General</td><td>Sí</td><td>Interruptor</td><td>«Actividad de Gemini» viene encendida</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/x-grok-usa-mis-datos-para-entrenar-ia/">X (Grok)</a></td><td>General</td><td>Sí</td><td>Interruptor</td><td>Fuera de la UE; cuentas privadas excluidas</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/deepseek-usa-mis-datos-para-entrenar-ia/">DeepSeek</a></td><td>General</td><td>Sí</td><td>Solicitud formal</td><td>Solo por escrito; datos almacenados en China</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/meta-ai-usa-mis-datos-para-entrenar-ia/">Meta AI</a></td><td>General</td><td>Sí</td><td>No</td><td>Opt-out formal en 6 regiones; en México, no existe</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/kimi-usa-mis-datos-para-entrenar-ia/">Kimi</a></td><td>General</td><td>Sí</td><td>No</td><td>Sin interruptor; depende de derechos regionales</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/perplexity-usa-mis-datos-para-entrenar-ia/">Perplexity</a></td><td>Especialista</td><td>Sí</td><td>Sin verificar</td><td>Retiró el opt-out de su política el 2 de julio de 2026</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/github-copilot-usa-mis-datos-para-entrenar-ia/">GitHub Copilot</a></td><td>Especialista</td><td>Sí</td><td>Interruptor</td><td>Free, Pro y Pro+; Business y Enterprise excluidos</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/midjourney-usa-mis-datos-para-entrenar-ia/">Midjourney</a></td><td>Especialista</td><td>Sí</td><td>No</td><td>Stealth Mode no exceptúa del entrenamiento</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/runway-usa-mis-datos-para-entrenar-ia/">Runway</a></td><td>Especialista</td><td>Sí</td><td>No</td><td>Enterprise excluido por contrato</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/canva-usa-mis-datos-para-entrenar-ia/">Canva</a></td><td>Especialista</td><td>Sí</td><td>Interruptor</td><td>Free y Pro; Education excluido</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/recraft-ai-usa-mis-datos-para-entrenar-ia/">Recraft</a></td><td>Especialista</td><td>Sí</td><td>Interruptor</td><td>Todos los planes; galería pública poco clara</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/heygen-usa-mis-datos-para-entrenar-ia/">HeyGen</a></td><td>Especialista</td><td>Sí</td><td>Solicitud formal</td><td>Enterprise por contrato, sin confirmar exclusión</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/opus-clip-usa-mis-datos-para-entrenar-ia/">Opus Clip</a></td><td>Especialista</td><td>Sí</td><td>No</td><td>Opt-out por correo solo en UE y EEE</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/elevenlabs-usa-mis-datos-para-entrenar-ia/">ElevenLabs</a></td><td>Especialista</td><td>Sí</td><td>Interruptor</td><td>Solo hacia adelante</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/suno-usa-mis-datos-para-entrenar-ia/">Suno</a></td><td>Especialista</td><td>Sí</td><td>No</td><td>Oposición solo para EEE y Reino Unido</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/lovable-usa-mis-datos-para-entrenar-ia/">Lovable</a></td><td>Especialista</td><td>Sí</td><td>Interruptor</td><td>Business y Enterprise no entrenan</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/bolt-new-usa-mis-datos-para-entrenar-ia/">Bolt.new</a></td><td>Especialista</td><td>Sí</td><td>Interruptor</td><td>Excluidos: EEE, Reino Unido, Suiza y cuentas administradas</td></tr>
<tr><th colspan="5" scope="colgroup">Depende del plan (1)</th></tr>
<tr><td><a href="https://glitchmental.com/articulos/v0-usa-mis-datos-para-entrenar-ia/">v0</a></td><td>Especialista</td><td>Depende del plan</td><td>Interruptor</td><td>Hobby y prueba de Pro entrenan; Pro de pago, no por defecto</td></tr>
<tr><th colspan="5" scope="colgroup">No entrenan (3)</th></tr>
<tr><td><a href="https://glitchmental.com/articulos/notebooklm-usa-mis-datos-para-entrenar-ia/">NotebookLM</a></td><td>Especialista</td><td>No</td><td>No aplica</td><td>Promesa cubre lo que subes, no tus preguntas</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/consensus-app-usa-mis-datos-para-entrenar-ia/">Consensus</a></td><td>Especialista</td><td>No</td><td>No aplica</td><td>Guarda consultas anonimizadas como analítica</td></tr>
<tr><td><a href="https://glitchmental.com/articulos/adobe-usa-mis-datos-para-entrenar-ia/">Adobe Creative Cloud</a></td><td>Especialista</td><td>No</td><td>Interruptor</td><td>Firefly no entrena, salvo lo enviado a Adobe Stock</td></tr>
</tbody>
</table>

## Lectura editorial

**(a) Generalistas contra especialistas.** Los 7 chats generales entrenan por defecto: 7 de 7. Entre los 16 especialistas, 12 entrenan, 3 no y 1 depende del plan. Los generalistas tienen mejores controles: 5 de 7 permiten apagarlo (Claude, ChatGPT, Gemini, Grok y DeepSeek); Meta AI y Kimi no. Entre los especialistas, 9 de 16 declaran salida. El interruptor existe, pero viene encendido. Y los tres que no entrenan son los tres con valor «alto» en el Recomendador.

**(b) Interruptor no es solicitud.** De las 19 que entrenan por defecto, 12 ofrecen salida en México: 10 con interruptor en ajustes y 2 solo por solicitud formal, DeepSeek y HeyGen. Otras 6 no ofrecen ninguna y Perplexity queda sin verificar. Contar juntos interruptor y solicitud infla el resultado: escribir a una empresa no es apagar un ajuste. Aparte: v0 tiene interruptor en Hobby y prueba de Pro, y en Pro de pago ya viene apagado por defecto; el interruptor de Adobe Creative Cloud controla el análisis de mejora de producto, no a Firefly, que no entrena con contenido de usuarios.

**(c) Letra chiquita.** En Canva, Free y Pro entrenan por defecto y se apaga en Configuración → Privacidad. Para Teams, Business y Enterprise la política no dice nada; Canva afirma en su nota sobre Canva Shield que su contenido no se usa para mejorar funciones de IA. Es una declaración, no un contrato. Perplexity entrenaba por defecto y el 2 de julio de 2026 quitó de su política la promesa escrita de *opt-out*. El control técnico puede seguir existiendo, sin garantía. Por eso es la única marcada «sin verificar».

**(d) México.** Meta AI, Opus Clip y Suno entrenan y comparten un patrón: la salida existe solo en ciertas regiones. Meta AI la limita a la UE, Reino Unido, Suiza, Brasil, Japón y Corea del Sur; Opus Clip, a la UE y el EEE; Suno, al EEE y Reino Unido. Las fichas no describen *opt-out* para México. Aquí no hay derecho de salida, solo la política de cada empresa. Las tres tienen valor «bajo».

**La barrera de pago.** Siete herramientas excluyen el entrenamiento en planes corporativos o empresariales: ChatGPT, Claude (bajo términos comerciales aparte), Perplexity, GitHub Copilot, Runway, Opus Clip y Lovable. v0 es la única que retira el entrenamiento por defecto desde su suscripción individual de pago (Pro). Pagar una suscripción individual no basta: la política de Midjourney no exceptúa a Stealth Mode del entrenamiento.

La hipótesis del protocolo se sostiene en lo esencial, acotada a estas 23 herramientas del Recomendador: el entrenamiento por defecto es la norma en sus planes individuales. No es un censo del mercado.

## Datos abiertos y conexión interna

Descarga el [CSV completo](/datos/laboratorio-02-mapa-privacidad.csv) (licencia CC BY 4.0). Para saber qué herramienta te conviene según tu caso, usa el [Recomendador](/que-ia-me-conviene/). El detalle de cada plan está en la serie [*Quién entrena con tus datos*](/quien-entrena-con-tus-datos/), por ejemplo las fichas de [Meta AI](https://glitchmental.com/articulos/meta-ai-usa-mis-datos-para-entrenar-ia/), [Perplexity](https://glitchmental.com/articulos/perplexity-usa-mis-datos-para-entrenar-ia/) y [Canva](https://glitchmental.com/articulos/canva-usa-mis-datos-para-entrenar-ia/).

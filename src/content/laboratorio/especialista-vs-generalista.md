---
title: "Los 16 especialistas de IA cuestan más del doble de entrada (16.50 USD frente a 8.00 USD en chats generales), pero cubren en exclusiva solo 2 de 7 usos y 7 de 10 subusos"
description: "La mediana del primer escalón es de 16.50 USD en los 16 especialistas de IA y de 8.00 USD en los chats generales con precio documentado. Solo la voz y la música, y 7 de 10 subusos, carecen de un chat general fuerte."
kicker: "Laboratorio · Experimento 05"
experimento: 5
pubDate: 2026-11-17
heroImage: /images/laboratorio/laboratorio-05-especialista-vs-generalista/hero.jpg
csv: /datos/laboratorio-05-especialista-vs-generalista.csv
draft: true
---

## Resumen ejecutivo

- **Qué probamos:** si los especialistas del Recomendador justifican su precio frente a un chat general, según las reglas del motor y la matriz de 23 herramientas de `actual.json`.
- **Qué encontramos:** la mediana del primer escalón es de 16.50 USD en los 16 especialistas y de 8.00 USD en los 5 chats generales con precio documentado. Solo la voz y la música (2 de 7 usos) carecen de un chat general fuerte, y 7 de 10 subusos no los cubre ninguno.
- **Qué significa:** pagar un especialista se justifica en la matriz cuando necesitas uno de esos subusos sin cobertura fuerte en chats generales o no entrenar por defecto; en el resto de categorías, un chat general ofrece cobertura declarada equivalente con menor mediana de entrada.

## Protocolo y límites

Con corte al 17 de noviembre de 2026 auditamos las reglas del motor de [/que-ia-me-conviene/](/que-ia-me-conviene/) y la matriz de 23 herramientas de `actual.json`: 7 chats generales y 16 especialistas. Precio y entrenamiento heredan los criterios de los Experimentos [02](/laboratorio/mapa-de-privacidad-en-23-herramientas-de-ia/) y [03](/laboratorio/costo-real-de-la-ia-en-mexico/): primer escalón individual mensual más barato documentado, y opt-out (poder desactivar el entrenamiento) disponible en México.

- **No son pruebas ciegas de calidad.** El Recomendador evalúa cobertura funcional declarada (niveles fuerte, básico o no). "Compite directo" significa que el mapa no distingue al especialista de un chat general, no que den la misma salida.
- **El precio no entra en la fórmula del Recomendador.** El cruce con el costo es nuestro.
- **"Exclusivo": ningún chat general es fuerte en ese uso.** Gemini marca música en nivel básico; la voz no la ofrece ninguno.
- **Sin precio documentado:** Meta AI y DeepSeek, por eso la mediana de chats generales usa 5 de 7.
- **Opt-out:** 7 de los 12 especialistas que entrenan por defecto lo ofrecen, 4 no y Perplexity quedó sin verificar; v0 va aparte (depende del plan). En chats generales, 5 de 7.
- **Inferencia editorial:** la naturaleza de salida y la etiqueta frente al chat generalista. *Formato nativo imposible en chat*: algún uso fuerte del especialista no lo ofrece ningún chat. *Flujo especializado con mejor integración*: todos sus usos fuertes los ofrece algún chat, pero en alguno ninguno es fuerte, o tiene un subuso fuerte exclusivo. *Compite directo con chat generalista*: cada uso fuerte tiene un chat fuerte y ningún subuso exclusivo.

## Evidencia

<table>
<thead><tr><th>Herramienta</th><th>Categoría de uso</th><th>Primer escalón (USD)</th><th>Entrena por defecto</th><th>Opt-out en México</th><th>Frente a chat generalista</th></tr></thead>
<tbody>
<tr><th colspan="6" scope="colgroup">Chats generales · Texto y análisis</th></tr>
<tr><td>Claude</td><td>chat de propósito general</td><td>20</td><td>Sí</td><td>Sí</td><td>No aplica</td></tr>
<tr><td>ChatGPT</td><td>chat de propósito general</td><td>8</td><td>Sí</td><td>Sí</td><td>No aplica</td></tr>
<tr><td>Gemini</td><td>chat de propósito general</td><td>4.99</td><td>Sí</td><td>Sí</td><td>No aplica</td></tr>
<tr><td>Grok</td><td>chat de propósito general</td><td>8</td><td>Sí</td><td>Sí</td><td>No aplica</td></tr>
<tr><td>Meta AI</td><td>chat de propósito general</td><td>Sin dato</td><td>Sí</td><td>No</td><td>No aplica</td></tr>
<tr><td>DeepSeek</td><td>chat de propósito general</td><td>Sin dato</td><td>Sí</td><td>Sí</td><td>No aplica</td></tr>
<tr><td>Kimi</td><td>chat de propósito general</td><td>19</td><td>Sí</td><td>No</td><td>No aplica</td></tr>
<tr><th colspan="6" scope="colgroup">Especialistas · Texto y análisis</th></tr>
<tr><td>Perplexity</td><td>búsqueda en la web con citas de fuentes</td><td>20</td><td>Sí</td><td>Sin verificar</td><td>Compite directo con chat generalista</td></tr>
<tr><td>NotebookLM</td><td>investigar solo con tus propios documentos, con citas a tus fuentes</td><td>4.99</td><td>No</td><td>No aplica</td><td>Flujo especializado con mejor integración</td></tr>
<tr><td>Consensus</td><td>búsqueda de papers académicos con citas verificables</td><td>20</td><td>No</td><td>No aplica</td><td>Flujo especializado con mejor integración</td></tr>
<tr><th colspan="6" scope="colgroup">Especialistas · Imagen y diseño</th></tr>
<tr><td>Midjourney</td><td>generación de imágenes con modelo propio</td><td>10</td><td>Sí</td><td>No</td><td>Compite directo con chat generalista</td></tr>
<tr><td>Canva</td><td>diseño gráfico con IA integrada</td><td>18</td><td>Sí</td><td>Sí</td><td>Compite directo con chat generalista</td></tr>
<tr><td>Adobe Firefly</td><td>imágenes con modelo entrenado en material licenciado, y vectores .svg</td><td>9.99</td><td>No</td><td>Sí</td><td>Flujo especializado con mejor integración</td></tr>
<tr><td>Recraft</td><td>gráficos vectoriales editables (SVG)</td><td>12</td><td>Sí</td><td>Sí</td><td>Flujo especializado con mejor integración</td></tr>
<tr><th colspan="6" scope="colgroup">Especialistas · Video</th></tr>
<tr><td>Runway</td><td>generación de video desde texto e imagen</td><td>15</td><td>Sí</td><td>No</td><td>Compite directo con chat generalista</td></tr>
<tr><td>HeyGen</td><td>avatares de video y doblaje con sincronía de labios</td><td>29</td><td>Sí</td><td>Sí</td><td>Flujo especializado con mejor integración</td></tr>
<tr><td>Opus Clip</td><td>recortar clips de un video largo</td><td>15</td><td>Sí</td><td>No</td><td>Flujo especializado con mejor integración</td></tr>
<tr><th colspan="6" scope="colgroup">Especialistas · Audio y voz</th></tr>
<tr><td>ElevenLabs</td><td>voz sintética, clonación de voz y doblaje</td><td>22</td><td>Sí</td><td>Sí</td><td>Formato nativo imposible en chat</td></tr>
<tr><td>Suno</td><td>canciones completas con voz a partir de texto</td><td>10</td><td>Sí</td><td>No</td><td>Flujo especializado con mejor integración</td></tr>
<tr><th colspan="6" scope="colgroup">Especialistas · Código y prototipos</th></tr>
<tr><td>GitHub Copilot</td><td>asistente de programación dentro del editor</td><td>10</td><td>Sí</td><td>Sí</td><td>Compite directo con chat generalista</td></tr>
<tr><td>Lovable</td><td>crear y publicar apps web completas describiéndolas</td><td>25</td><td>Sí</td><td>Sí</td><td>Flujo especializado con mejor integración</td></tr>
<tr><td>Bolt.new</td><td>crear sitios y apps web conversando con la IA</td><td>25</td><td>Sí</td><td>Sí</td><td>Flujo especializado con mejor integración</td></tr>
<tr><td>v0</td><td>crear apps y pantallas web desde una descripción o un mockup</td><td>30</td><td>Depende del plan</td><td>Sí</td><td>Flujo especializado con mejor integración</td></tr>
</tbody>
</table>

## Lectura editorial

**1. El Recomendador no favorece a los especialistas.** Aplica la misma suma ponderada a las 23 herramientas: niveles por uso, subusos verificados, español y veredicto de privacidad. El tipo de herramienta solo cambia cómo se muestra el resultado, y el precio no pesa. El precio lo cruzas tú.

**2. La hipótesis quedó refutada en parte.** Planteamos que el especialista solo se justificaba con formatos nativos no textuales: video, audio, diseño y apps. Acertamos en voz y música; fallamos en tres frentes. Imagen la cubren con nivel fuerte ChatGPT, Gemini, Grok y Meta AI; video, Gemini y Grok; código, Claude, ChatGPT, DeepSeek y Kimi. Midjourney, Runway, Canva y GitHub Copilot caen en "compite directo", igual que Perplexity (20 USD, privacidad baja, opt-out sin verificar).

En investigación documental la hipótesis falló al revés. NotebookLM (4.99 USD) y Consensus (20 USD) aportan algo que ningún chat general da: no entrenar por defecto. Con Adobe Firefly (9.99 USD) son los tres especialistas que no entrenan por defecto, frente a los 7 chats generales, que entrenan todos.

**3. Cuándo conviene pagar la diferencia.** La mediana de un especialista es 8.50 USD más alta que la de un chat general. Se justifica si necesitas alguno de los 7 subusos específicos del Recomendador donde ningún chat general tiene cobertura fuerte (frente a los 3 compartidos: búsqueda web, generación y editor):

- **Papers con citas verificables:** Consensus.
- **Investigar solo con tus documentos:** NotebookLM.
- **Apps web desplegables:** Lovable, Bolt.new y v0.
- **Vectores editables:** Recraft y Adobe Firefly.
- **Uso comercial con material licenciado:** Adobe Firefly.
- **Avatares de video con doblaje:** HeyGen.
- **Clips recortados de un video largo:** Opus Clip.

También si buscas voz sintética (ElevenLabs) o canciones (Suno). Fuera de esa lista, el mapa no registra una ventaja de cobertura funcional declarada frente a los chats generales.

## Datos abiertos y conexión interna

[CSV abierto](/datos/laboratorio-05-especialista-vs-generalista.csv) (licencia CC BY 4.0). Herramienta relacionada: [Recomendador](/que-ia-me-conviene/).

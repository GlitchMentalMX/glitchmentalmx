---
description: Revisión trimestral del recomendador "¿Qué IA me conviene?" — re-verifica capacidades, subusos, especialistas y cifras citadas; aplica directo lo verificado, pide aprobación para agregar o quitar herramientas
---

# Revisión Recomendador — ¿Qué IA me conviene?

Páginas: `src/pages/que-ia-me-conviene/` (quiz + FAQ en `index.astro`, ficha
por herramienta en `[herramienta]/index.astro`). Datos: un solo JSON,
`src/content/herramientas-ia/actual.json`. Preguntas de afinación (subusos):
`src/data/subpreguntas-recomendador.ts`. Alias hacia la serie de privacidad:
`src/data/alias-entrena-ia.ts`.

Cómo funciona hoy (para no romperlo): el quiz tiene 4 preguntas fijas y, según
el uso que marque el usuario (investigar, programar, imágenes, video), hasta 2
preguntas de afinación. Siete usos: escribir, investigar, programar, imágenes,
video, generar voz y música; voz y música (campos `audio` y `musica`) solo
califican funciones de usuario final en el producto, no las que existen solo
por API, y ausente = "no". Cada herramienta guarda niveles `no/basico/fuerte` por uso y,
solo donde está verificado, por subuso. Lo que no está verificado cuenta como
neutral y se muestra "sin verificar" — nunca se asume. Si varias herramientas
puntúan igual, el resultado es un empate y se muestra como empate.

Este comando tiene dos niveles de riesgo distintos en un mismo run:
- Re-verificar y corregir datos ya publicados (niveles, subusos, booleanos,
  cifras del FAQ, afirmaciones de "qué hace que un chat generalista no"), con
  fuente primaria: aplica directo, no pidas autorización — igual que
  /revision-precios-ia.
- Agregar o quitar una herramienta, o agregar un uso/pregunta nueva: es
  decisión de alcance. Reporta el hallazgo y espera aprobación de Jorge.

Reglas de oro: dato no confirmado por fetch a fuente primaria = no se usa
(sin excepciones, misma disciplina que Precios de IA). Solo documentación
oficial: Jorge no hace pruebas de uso ni revisa cuentas. Alcance solo México.
Si WebFetch devuelve 403, abre la página en el panel del navegador. Para
verificar que compila usa `npx astro build`, nunca `npm run build`.

## Parte 1 — Datos y cifras (auto-aplicable)

1. **Cifras del FAQ.** Fuentes citadas con enlace en `index.astro`; confirma
   en cada una si hay una versión más reciente y actualiza SOLO el párrafo
   de esa pregunta, con fecha de la fuente:
   - SWE-bench Verified en BenchLM (programar) — posiciones y puntajes.
   - Prueba ciega de escritura, 134 participantes (Product with Attitude).
   - Consensus: tamaño del corpus citado en su blog (investigación).
   - Adobe, "Nuestro enfoque de IA generativa" (imágenes, uso comercial).
   Las respuestas de "gratis" y "estudiantes" NO se editan a mano: se generan
   desde las series Prueba gratis y Descuentos para estudiantes. Solo revisa
   que el texto fijo alrededor siga siendo cierto.
2. **Cada herramienta del JSON.** Re-verifica en su sitio oficial niveles de
   uso, booleanos (API, memoria, voz, integraciones, disponible en México) y
   subusos. Si cambió algo, edita solo ese campo y actualiza
   `fechaVerificacion` y `fuenteCapacidades`. Cuida especialmente:
   renombres de producto (NotebookLM ya es "Gemini Notebook"), productos
   descontinuados (Sora) y planes que cambian qué incluyen.
3. **Especialistas** (`tipo: especialista`): cada afirmación de
   `queHaceDiferente` debe seguir siendo cierta en su URL. Re-fetch y corrige
   o elimina lo que ya no se sostenga. Los especialistas existentes que aún no
   tienen `queHaceDiferente` (Perplexity, GitHub Copilot, Midjourney, Runway,
   Canva, NotebookLM) se completan aquí, con fuente primaria. Adobe Firefly: la descripción de
   entrenamiento aplica a los modelos propios, no a los de socios — mantenlo
   así mientras no se verifique lo contrario.
   Voz y música: re-verifica los "no" de los chats generales, porque es donde
   más rápido cambia el mercado (OpenAI y xAI han anunciado trabajo en
   música; Gemini ya genera pistas de 30 segundos con Lyria 3; Anthropic no
   genera audio por sí mismo). Si alguno lanza una función de usuario final,
   súbela de nivel y actualiza la respuesta de FAQ de voz y música.
4. **Subusos.** Cada opción del cuestionario aparece solo si hay al menos una
   herramienta con ese subuso verificado. Si una revisión deja una pregunta
   sin datos suficientes, desaparece sola; repórtalo.
5. **Privacidad.** Hoy las 23 herramientas tienen artículo en la serie
   (directo o por alias). Confirma que siga así; si una muestra "sin
   verificar", va al reporte. La vigencia de esos artículos la revisa
   /revision-entrena-ia; si cambia un veredicto ahí, el recomendador lo
   refleja solo.

## Parte 2 — Cobertura (solo diagnóstico, requiere aprobación)

Reporta, sin editar:
- Herramientas de las series del sitio que no están en el recomendador y
  cumplen el criterio de especialista: datos propios que un LLM no tiene, una
  modalidad que el chat no resuelve bien, o un flujo profesional que ahorra
  trabajo real. Si solo es un wrapper de otro modelo, queda fuera.
- Pendientes ya conocidos (confirmar si siguen vigentes): Udio sigue
  descartada mientras tenga las descargas deshabilitadas; Elicit y SciSpace
  solapan con Consensus; Descript y Krea quedaron fuera por solaparse o ser
  agregadores de modelos de terceros.
- Tope de herramientas: Jorge dijo "top 10 o 15 cuando mucho" y después pidió
  sumar voz, música y creadores de apps (hoy 23). Los especialistas solo
  aparecen cuando el cuestionario los llama y el comparador muestra las 6-8
  mejores. Reporta el conteo actual y si algo debería salir.

## Reporte final

Dos bloques separados:
- **Parte 1 (aplicado):** cambios hechos, 2-3 líneas cada uno, con fuente y
  fecha. Si no hubo cambios: "sin cambios".
- **Parte 2 (pendiente de aprobación):** huecos de cobertura y propuestas,
  con evidencia y el porqué. Nada de esto se edita todavía.

Al final: lista de archivos modificados (solo los de Parte 1), para revisión
en GitHub Desktop. Nunca commitear.

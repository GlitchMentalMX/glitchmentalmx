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
el uso que marque el usuario (investigar, imágenes, video), hasta 2 preguntas
de afinación. Cada herramienta guarda niveles `no/basico/fuerte` por uso y,
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
   o elimina lo que ya no se sostenga. Adobe Firefly: la descripción de
   entrenamiento aplica a los modelos propios, no a los de socios — mantenlo
   así mientras no se verifique lo contrario.
4. **Subusos.** Cada opción del cuestionario aparece solo si hay al menos una
   herramienta con ese subuso verificado. Si una revisión deja una pregunta
   sin datos suficientes, desaparece sola; repórtalo.
5. **Privacidad.** Confirma que cada herramienta resuelve su artículo de la
   serie (directo o por alias). Las que muestran "sin verificar" van al
   reporte como hueco de la serie "Quién entrena con tus datos".

## Parte 2 — Cobertura (solo diagnóstico, requiere aprobación)

Reporta, sin editar:
- Herramientas de las series del sitio que no están en el recomendador y
  cumplen el criterio de especialista: datos propios que un LLM no tiene, una
  modalidad que el chat no resuelve bien, o un flujo profesional que ahorra
  trabajo real. Si solo es un wrapper de otro modelo, queda fuera.
- Pendientes ya conocidos (confirmar si siguen vigentes): voz y música
  (ElevenLabs, Suno; Udio descartada mientras tenga descargas deshabilitadas),
  creadores de apps sin programar (Lovable, Bolt, v0 — esperan decisión de
  Jorge sobre si es su audiencia), Elicit y SciSpace (solapan con Consensus).
- Tope de herramientas: Jorge dijo "top 10 o 15 cuando mucho"; hoy son más
  porque los especialistas solo aparecen cuando el cuestionario los llama.
  Reporta el conteo actual y si algo debería salir.

## Reporte final

Dos bloques separados:
- **Parte 1 (aplicado):** cambios hechos, 2-3 líneas cada uno, con fuente y
  fecha. Si no hubo cambios: "sin cambios".
- **Parte 2 (pendiente de aprobación):** huecos de cobertura y propuestas,
  con evidencia y el porqué. Nada de esto se edita todavía.

Al final: lista de archivos modificados (solo los de Parte 1), para revisión
en GitHub Desktop. Nunca commitear.

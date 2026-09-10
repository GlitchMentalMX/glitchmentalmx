---
description: Revisión trimestral del recomendador "¿Qué IA me conviene?" — verifica benchmarks y cobertura de herramientas; aplica directo actualizaciones de datos/cifras, pide aprobación para agregar herramientas nuevas
---

# Revisión Recomendador — ¿Qué IA me conviene?

Página: src/pages/que-ia-me-conviene/ (o la ruta equivalente en el repo —
localizar antes de empezar). Cubre el cuestionario, el motor de
compatibilidad, y el FAQ con benchmarks citados.

Este comando tiene dos niveles de riesgo distintos en un mismo run:
- Actualizar una cifra/benchmark ya citado, con fuente verificada: aplica
  directo, no pidas autorización — igual que /revision-precios-ia.
- Agregar una herramienta nueva a la cobertura (pasar de 10 a 11+): esto es
  decisión de alcance, no un dato que se corrige solo. Reporta el hallazgo
  y espera aprobación de Jorge antes de tocar el cuestionario o el motor de
  scoring.

## Parte 1 — Benchmarks y datos citados (auto-aplicable)

Fuentes actualmente citadas en el FAQ (verificar cuál sigue siendo la más
reciente publicada de cada una):
1. SWE-bench Verified (programación) — cifras de Claude/Opus 5 y
   ChatGPT/GPT-5.3 Codex
2. Prueba ciega de escritura, 134 participantes (simplificación,
   creatividad, consistencia de tono vs. estructura/diálogo)
3. Ventaja de Gemini y Grok en investigación con fuentes en tiempo real
4. Programas de descuento para estudiantes: Gemini, Perplexity, GitHub
   Copilot

Para cada una:
1. Fetch la fuente primaria (no un resumen de prensa) para confirmar si
   hay una ronda/versión más reciente del mismo benchmark o estudio.
2. Si no hay nada nuevo: no tocar nada.
3. Si hay una versión más reciente con resultado distinto: actualizar la
   cifra y la atribución en el FAQ, con fecha de la fuente. Edita SOLO el
   párrafo de esa pregunta específica — no reescribas el resto del FAQ.
4. Dato no confirmado por fetch a fuente primaria = no se reporta ni se
   usa. Sin excepciones — misma disciplina que Precios de IA con Kaspersky
   y Tinder.

Revisar también si algún dato del cuestionario mismo (qué herramienta
puntúa alto en qué perfil, extras disponibles como API/memoria/voz/
integraciones/disponibilidad en México) quedó obsoleto por un cambio de
producto de alguna de las 10 herramientas ya cubiertas. Si cambió: edita
el peso/valor correspondiente en el motor de scoring, acotado a esa
herramienta y ese criterio.

## Parte 2 — Cobertura de herramientas (solo diagnóstico, requiere aprobación)

1. Compara la lista de 10 herramientas del recomendador contra las 14 de
   la serie Precios de IA (fuente de verdad de cobertura del sitio) y
   contra cualquier herramienta agregada a otras series desde la última
   revisión (ver /areas/precios-hoy.md y la regla de cobertura retroactiva
   si está disponible en el repo).
2. Reporta huecos encontrados — no los cierres. Ejemplo ya identificado en
   sept 2026: Canva IA y NotebookLM están en Precios de IA pero no en el
   recomendador.
3. Si una herramienta nueva justifica agregarse (por volumen de uso o por
   llenar un hueco de categoría, ej. audio/voz con ElevenLabs si se agrega
   esa opción al cuestionario): repórtalo como propuesta con la evidencia,
   no lo implementes todavía.

## Reporte final

Dos bloques separados:
- **Parte 1 (aplicado):** lista de cambios ya hechos, 2-3 líneas cada uno,
  con fuente y fecha. Si no hubo cambios: "sin cambios".
- **Parte 2 (pendiente de aprobación):** huecos de cobertura encontrados,
  con la recomendación y el porqué. Sin editar nada de esto todavía.

Al final: lista de archivos modificados (solo los de Parte 1), para
revisión en GitHub Desktop.

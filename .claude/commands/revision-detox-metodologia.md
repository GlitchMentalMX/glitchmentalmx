---
description: Revisión trimestral de la metodología de Detox de IA — diagnóstico primero, edita solo con aprobación explícita de Jorge
---

# Revisión Metodología Detox de IA

Página: src/pages/detox-de-ia/index.astro, sección
<section class="container methodology">.

Este comando corre en dos fases. Fase 2 solo si Jorge aprueba los hallazgos
de Fase 1 — no edites nada hasta esa aprobación.

## Fuentes actualmente citadas

1. Shen, Huang, Liang, Kim & Yoon (2026) — CHI 2026, arXiv:2601.13348
2. Goh, Hartanto & Majeed (2025) — Computers in Human Behavior Reports, 20,
   100845
3. Kooli, Kooli & Kooli (2025) — Asian Journal of Psychiatry, 107, 104476
   (carta al editor, no estudio empírico — mantener el matiz si sigue citada)
4. OpenAI & MIT Media Lab (marzo 2025) — investigación conjunta uso
   afectivo/ChatGPT

## FASE 1 — Auditoría (sin tocar archivos)

1. Buscar publicaciones nuevas (últimos 3-4 meses) en: "AI chatbot
   addiction", "generative AI dependency scale", "AI companion emotional
   attachment", "problematic AI use". Prioriza journals con peer review
   (Computers in Human Behavior, Asian Journal of Psychiatry, CHI/otras
   conferencias HCI) y preprints serios (arXiv, PsyArXiv) sobre cobertura de
   prensa.
2. Para cada hallazgo candidato: verificar contra la publicación original
   (no un resumen de prensa) — título exacto, autores, año, y si es estudio
   empírico con muestra propia o propuesta conceptual/carta al editor. No
   agregar nada sin ese nivel de verificación.
3. Revisar si alguna de las 4 fuentes actuales fue retractada, actualizada,
   o seguida de un estudio empírico (especialmente Kooli et al. — si ya hay
   data propia detrás, la nota debe actualizarse).
4. Revisar si "dependencia hacia la IA" sigue sin ser un diagnóstico médico
   formalmente reconocido (DSM/ICD). Si cambió, el disclaimer y el pie de
   metodología necesitan reescritura, no solo fecha nueva.
5. Si NO hay nada que justifique cambios: decirlo así, sin tocar nada — ni
   siquiera la fecha (no "actualizar" para simular frescura sin sustancia).

Reporte de Fase 1: 3-4 líneas — qué se revisó, qué cambiaría (si algo) y
por qué. No edites ningún archivo todavía. Termina preguntando qué aprobar.

## FASE 2 — Implementación (solo tras luz verde de Jorge)

1. Edita <ul class="sources"> en src/pages/detox-de-ia/index.astro con la
   fuente nueva/actualizada.
2. Actualiza el texto "Metodología actualizada: [mes] de [año]" en la misma
   página.
3. Si el disclaimer sobre DSM/ICD cambió de estatus: reescribe esa sección
   puntual, no solo la fecha.
4. Actualiza src/data/detox-de-ia.json → lastReviewed (YYYY-MM-DD). Esto
   alimenta el lastmod del sitemap vía astro.config.mjs — un solo archivo
   más que tocar, nada más.

Cambios acotados solo a: sección de fuentes, texto de fecha de metodología,
(si aplica) el disclaimer puntual, y detox-de-ia.json. Jorge revisa el diff
en GitHub Desktop antes de commitear.

Reporte final: lista de archivos modificados.

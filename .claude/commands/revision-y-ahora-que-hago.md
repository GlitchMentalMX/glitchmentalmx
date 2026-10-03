---
description: Revisión trimestral del orientador "¿Te preocupa la IA?" — verifica teléfonos de ayuda y fuentes OIT/OMS; diagnóstico primero, edita solo con aprobación explícita de Jorge
---

# Revisión "¿Te preocupa la IA?"

Páginas:
- src/pages/herramientas/que-hacer-si-te-preocupa-la-ia/index.astro (orientador)
- src/pages/herramientas/que-hacer-si-te-preocupa-la-ia/lineas-de-ayuda-emocional-gratuitas/index.astro (rama de alerta)

Datos (única fuente de textos, teléfonos y fuentes): src/data/y-ahora-que-hago.json

Este comando corre en dos fases. Fase 2 solo si Jorge aprueba los hallazgos
de Fase 1 — no edites nada hasta esa aprobación. **Excepción:** si un
teléfono dejó de funcionar o cambió, avísalo primero y arriba de todo en el
reporte: en esta pieza un número equivocado pesa más que en cualquier otra
parte del sitio.

## Qué se revisa

1. **Teléfonos (prioridad 1).** Línea de la Vida 800 911 2000 (gratuita, 24 h,
   365 días) y SAPTEL 55 5259 8121 (gratuita, 24 h). Verificar contra la
   fuente oficial de cada una, no contra notas de prensa:
   - https://www.gob.mx/conasama/articulos/linea-de-la-vida-800-911-2000
   - https://www.saptel.org.mx/
   Confirmar número, horario y gratuidad. Confirmar también que 911 sigue
   siendo el número nacional de emergencias.
2. **Afirmaciones del FAQ de la alerta** (qué ofrece cada línea, canalización
   de casos graves): siguen respaldadas por las páginas oficiales, sin
   agregar nada que no esté ahí.
3. **OIT.** Estudio "Generative AI and Jobs: A Refined Global Index of
   Occupational Exposure" (mayo 2025). Buscar si hay edición más reciente y
   si la conclusión citada (transformación > sustitución) se mantiene.
4. **OMS.** Ficha "Mental health at work" (actualizada sept. 2026). Verificar
   que el marco citado siga vigente.
5. **Fragmentos editoriales** (frase de encuadre por preocupación, prioridad,
   ruido, capacidad, edad, situación laboral y "para esta semana"; los 5
   textos de prioridad y las 4 acciones están en el JSON):
   siguen siendo honestos con el panorama laboral actual. Verificar también
   que la lógica de prioridad (ruido > exposición > margen) y la omisión de la
   pregunta de exposición para retirados sigan funcionando: probar en el
   navegador un recorrido de retirado, uno de empleado y la rama de alerta. Son criterio
   editorial, no estudio — no los presentes como lo segundo.
6. **Enlaces internos:** Calculadora de Riesgo y Detox siguen enlazando de
   regreso; la alerta NO debe enlazar al cuestionario ni ofrecer "repetir".
7. **Tarjeta en artículos.** Lote QUE_HACER_SI_TE_PREOCUPA_SLUGS en
   src/pages/articulos/[slug].astro (8 artículos) y RELATED_SLUGS de la
   página de la herramienta deben coincidir; ningún artículo puede estar en
   dos lotes de herramienta. Revisar si hay artículos nuevos sobre miedo a la
   IA, despidos o ruido informativo que merezcan entrar.
8. **og:image.** Tarjetas en public/images/herramientas/ (regenerar con
   `node scripts/generate-herramientas-hero-images.mjs`). Sin teléfonos en la
   imagen a propósito.
9. **Detalles de copy:** espacios faltantes alrededor de enlaces (Astro
   elimina el espacio si el `<a>` empieza en línea nueva; usar `{' '}`),
   numeración de preguntas, y que el Panel de Señales de la home,
   /herramientas/, Header y Footer sigan listando la herramienta.

## FASE 1 — Auditoría (sin tocar archivos)

Reporte de 3-4 líneas: qué se revisó, qué cambiaría (si algo) y por qué.
Si NO hay nada que justifique cambios: decirlo así, sin tocar nada — ni
siquiera las fechas (no "actualizar" para simular frescura sin sustancia).
Termina preguntando qué aprobar.

## FASE 2 — Implementación (solo tras luz verde de Jorge)

1. Edita src/data/y-ahora-que-hago.json con lo aprobado (fragmentos,
   teléfonos, fuentes).
2. Si se verificaron los teléfonos: actualiza `lineas.verificadoEl`
   (YYYY-MM-DD). Siempre que cambie algo: actualiza `lastReviewed`. Esto
   alimenta el lastmod del sitemap vía astro.config.mjs.
3. Si cambió la redacción de la metodología o del FAQ, editar las páginas
   .astro directamente; el FAQ y su schema salen del mismo array.
4. `npx astro build` (nunca `npm run build`, reescribe imágenes) y revisar el
   HTML construido: JSON-LD parsea, sin espacios faltantes junto a enlaces.

Reporte final: lista de archivos modificados. Jorge revisa el diff en GitHub
Desktop antes de commitear.

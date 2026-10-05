---
description: Auditoría trimestral de precios de TODO el catálogo de Precios de IA (~100+ fichas) y de Precios Digitales — aplica cambios directo, sin pedir aprobación previa
---

# Revisión Precios de IA + Precios Digitales (trimestral)

Actualizada el 04/10/2026: antes cubría solo 14 herramientas y apuntaba a
src/content/posts/, pero la serie ya tiene más de 100 fichas en
src/content/precios-ia/ (más una familia hermana de ~30 en
src/content/precios-digitales/). Esta revisión ahora cubre las dos completas.

Fuente de verdad de los precios (se leen en build-time, el artículo no
repite el número, lo calcula la calculadora):
- src/data/precios-ia-usd.json → precios de src/content/precios-ia/
- src/data/precios-digitales-usd.json → precios de src/content/precios-digitales/
Cada entrada: `nombre` (plan), `precioUSD` (mensual, oficial, antes de
impuestos, de la página global/EE.UU.), `periodo`, `empresa`. Las que venden
solo en pesos (Meli+, Rappi Pro…) traen `precioMXN` en vez de `precioUSD`.
El tipo de cambio lo actualiza solo el workflow de Banxico: NO se toca.

Regla general: encuentra la diferencia, corrígela. No pidas autorización antes
de editar — este comando ya es la autorización. Jorge revisa el diff en GitHub
Desktop; tú nunca commiteas. Dato no confirmado por fetch a la página oficial
= no se reporta ni se usa. Sin excepciones (misma disciplina que Kaspersky y
Tinder).

## Convención de precio (no cambiar)

Precio OFICIAL en dólares de la página global/EE.UU., mensual, antes de
impuestos. Nunca el precio regional en pesos como base (aunque exista; el
precio en pesos de México suele incluir IVA y por eso no coincide con la
conversión — eso ya está explicado en las fichas). Excepción: servicios que
no venden en dólares → `precioMXN` directo.

## Cómo ejecutarlo

Son ~130 fichas: usa subagentes en lotes de ~15 (reparte por orden alfabético
los ids de cada JSON). Reglas para cada subagente (lecciones aprendidas, no
negociables):
- NO lanza otros subagentes; hace él mismo todo el lote.
- Edita directo antes de terminar. Reportar sin escribir no cuenta.
- Si fetch devuelve 403 (Cloudflare), usa el navegador integrado como visita
  normal, sin saltar captchas.
- Cada subagente es dueño de SUS fichas; los dos JSON de precios los edita
  solo el agente principal al final, con las líneas que cada subagente reporte
  (evita escrituras concurrentes sobre el mismo archivo).

## Para cada ficha

1. Lee la ficha (src/content/precios-ia/cuanto-cuesta-<id>-hoy.md o
   src/content/precios-digitales/…) y su entrada en el JSON de precios.
2. Fetch la página oficial de precios/planes vigente (la de `sitioOficial` del
   frontmatter, o la actual si cambió). Confirma: precio mensual en USD del
   plan que cubre la ficha, nombre vigente del plan, si el plan sigue
   existiendo, si el cobro anual/mensual cambió.
3. Compara contra el JSON y contra dos secciones del artículo:
   - "Qué cambia el precio final" (IVA, web vs. App Store/Google Play, plan
     anual vs. mensual, nota de precio local)
   - "Qué incluye el plan pagado vs. el gratuito"
4. Sin diferencia real: no toques nada.
5. Con diferencia real (precio cambió, plan se renombró o desapareció,
   beneficio agregado/quitado, política de facturación cambió):
   - Corrige el precio/nombre en el JSON (solo la entrada afectada).
   - Edita SOLO esas dos secciones del .md. No tocar el resto del artículo, el
     frontmatter (salvo `herramienta`/`title` si el plan se renombró, cuidando
     que el título siga siendo una pregunta de búsqueda) ni otros artículos.
   - Añade `updatedDate: AAAA-MM-DD` al frontmatter (alimenta el lastmod del
     sitemap) y actualiza el sello "Última actualización: DD/MM/AAAA" si la
     ficha lo trae.
6. Si el precio de una ficha cambió, revisa si hay una ficha hermana de otro
   plan de la misma empresa (p. ej. chatgpt / chatgpt-pro, gemini /
   google-ai-plus) cuyo texto compara precios entre planes: ajusta esa
   comparación para que no quede incoherente.

## Parte 2 — Solo diagnóstico, requiere aprobación

- Planes nuevos de una empresa que aún no tienen ficha propia (cada plan
  relevante es su propia ficha y su propia entrada de precio). Repórtalos con
  la evidencia (nombre, precio USD, URL); no los crees.
- Herramientas nuevas que la serie no cubre (regla de cobertura: cada serie
  cubre toda la base de herramientas).
- Fichas cuyo plan ya no existe: repórtalas con la evidencia; no las borres.

## Reporte final

Cortito, ácido, sin hype. Cambios de PRECIO primero (antes → después, en USD),
luego renombres/planes eliminados, luego lo menor. Si no hubo cambio: "sin
cambios". Al final: lista de archivos modificados (fichas + los dos JSON),
para revisión en GitHub Desktop.

---
description: Revisión MENSUAL de la serie "Descuentos para estudiantes" — las ofertas tienen plazos y cambian de país sin avisar. Aplica cambios directo, sin pedir aprobación previa
---

# Revisión Descuentos para estudiantes (mensual)

Serie: src/content/estudiantes/*.md (una ficha por herramienta).
Landing: /descuentos-para-estudiantes-ia/. El veredicto vive en el frontmatter
(`veredicto`, `fraseCorta`) y su semántica es propia de esta serie:

- verde: hay oferta para estudiantes (gratis o descuento claro) que aplica a
  estudiantes en México y está vigente hoy.
- amarillo: existe, pero algo la limita para un estudiante mexicano: solo
  ciertas instituciones, cupo limitado, vence pronto, pide tarjeta, la
  empresa no confirma México, o el descuento es menor.
- rojo: no hay oferta que aplique en México (no existe, caducó o es solo
  para otros países).

Regla general: encuentra la diferencia, corrígela. No pidas autorización antes
de editar — este comando ya es la autorización. Jorge revisa el diff en GitHub
Desktop; tú nunca commiteas. Dato no confirmado por fetch a la fuente oficial
= no se reporta ni se usa. Sin excepciones.

## Por qué mensual

Las ofertas de estudiantes son la información más perecedera del sitio:
traen plazos ("hasta el 31 de octubre"), se pausan por demanda, y los países o
instituciones elegibles cambian sin anuncio. Una ficha que dice "aplica en
México" cuando ya no aplica es el peor error posible de esta serie.

## Qué revisar cada mes (siempre)

1. Fichas con plazo firme: grep -l "^vigenteHasta:" src/content/estudiantes/*.md
   Cualquier `vigenteHasta` vencido o dentro de los próximos 45 días es
   hallazgo: ve a la fuente oficial y confirma si la oferta se extendió,
   cambió o terminó. (El sitio ya marca solo como "vencida" una oferta pasada
   su fecha, pero la ficha sigue necesitando reverificarse.)
2. Todas las fichas verde y amarillo: fetch a la fuente citada en
   `fuenteVerificacion` y confirma que la oferta existe, que sigue aplicando
   en México y que las condiciones (verificación, duración, renovación,
   tarjeta) no cambiaron.
3. Fichas rojo: confirma que la empresa no haya lanzado una oferta nueva para
   estudiantes (eso cambiaría el artículo a amarillo o verde).

Calendario escolar: en enero-febrero y agosto-septiembre (inicio de ciclo)
las empresas lanzan y renuevan promociones de regreso a clases; revisa con
más cuidado esos meses.

## Cómo ejecutarlo

Con más de ~15 fichas, usa subagentes en lotes de ~15. Reglas para cada
subagente (lecciones aprendidas, no negociables):
- NO lanza otros subagentes; hace él mismo todo el lote.
- Edita directo en el archivo antes de terminar. Reportar sin escribir no cuenta.
- El veredicto describe el caso REAL verificado para un estudiante en México,
  no el más optimista. Si la página oficial no menciona países, la ficha dice
  "la empresa no confirma si aplica en México" y es amarillo, nunca verde.
- Que la herramienta tenga un plan gratuito general NO es una oferta para
  estudiantes.

## Si hay diferencia real

Edita SOLO lo necesario del .md de esa ficha:
- `veredicto` y `fraseCorta` si el estado cambió.
- El cuerpo (condiciones, plazo, países, método de verificación).
- `vigenteHasta: AAAA-MM-DD` si hay un plazo firme nuevo; quítalo si ya no hay.
- `fuenteVerificacion` con la fuente y la fecha de hoy.
- `updatedDate: AAAA-MM-DD` en el frontmatter (alimenta el lastmod del
  sitemap) y el sello "[Última actualización: DD/MM/AAAA]" al pie.
No tocar pubDate, slug, título ni otras fichas.

## Parte 2 — Solo diagnóstico, requiere aprobación

- Herramientas con oferta nueva para estudiantes que la serie aún no cubre.
  Repórtalas con la evidencia; no las crees.
- Contradicciones con las fichas de Códigos de descuento (que también
  mencionan ofertas de estudiantes): repórtalas, no las edites aquí.

## Reporte final

Cortito, ácido, sin hype. Veredictos que cambiaron de color PRIMERO (antes →
después), luego plazos vencidos o por vencer, luego lo menor. Si no hubo
cambio: "sin cambios". Al final: archivos modificados, para revisión en
GitHub Desktop.

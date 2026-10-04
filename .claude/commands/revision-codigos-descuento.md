---
description: Revisión MENSUAL de la serie "Códigos de descuento" — las promociones caducan, así que esta serie no puede esperar al trimestre. Aplica cambios directo, sin pedir aprobación previa
---

# Revisión Códigos de descuento (mensual)

Serie: src/content/codigos-descuento/*.md (~110 artículos, uno por herramienta).
Landing: /codigos-descuento-ia/. El veredicto vive en el frontmatter (`veredicto`,
`fraseCorta`) y su semántica es propia de esta serie:

- rojo: no existe ningún código real, todo lo que circula es falso.
- amarillo: solo promociones oficiales limitadas (plan anual, estudiantes,
  referidos, regreso a clases). No hay cupones públicos permanentes.
- verde: sí existe un código o promoción activa y verificable HOY.

Regla general: encuentra la diferencia, corrígela. No pidas autorización antes
de editar — este comando ya es la autorización. Jorge revisa el diff en GitHub
Desktop; tú nunca commiteas. Dato no confirmado por fetch a la fuente oficial
= no se reporta ni se usa. Sin excepciones (misma disciplina que Kaspersky y
Tinder en Precios de IA).

## Por qué mensual y no trimestral

Una promoción vencida publicada como "vigente" es el error más caro de esta
serie: el artículo promete justo lo que ya no es cierto. Hay plazos explícitos
en el sitio (ej. oferta de regreso a clases de ChatGPT, 31 de octubre de 2026)
y varios ya vencidos sin que nadie los baje.

## Qué revisar cada mes (Nivel A — siempre)

1. Detecta artículos con plazos o campañas por tiempo limitado:
   grep -l -i -E "hasta el [0-9]{1,2} de|vence|fecha límite|vigente hasta|termina el|expira|regreso a clases|black friday|buen fin|hot sale|cyber monday" src/content/codigos-descuento/*.md
2. Cualquier fecha ya vencida ("hasta el 7 de septiembre de 2026" y similares)
   es hallazgo automático: ve a la página oficial y confirma si la promo se
   extendió, cambió o terminó.
3. Todos los veredictos verde, más los amarillo cuyo cuerpo cite una promoción
   concreta (estudiantes, referidos, campañas): fetch a la fuente oficial
   citada en `fuenteVerificacion` y compara.

## Qué revisar solo algunos meses (Nivel B — barrido completo)

Los demás artículos (rojo y amarillo de programas estables como "descuento por
plan anual") solo se revisan cuando el mes actual es enero, abril, julio u
octubre, o en temporada de ventas: mayo-junio (Hot Sale) y noviembre (Buen
Fin, Black Friday, Cyber Monday). En esos meses confirma además que la
empresa no lanzó un código público nuevo (eso cambiaría el artículo de rojo a
amarillo o verde).

## Cómo ejecutarlo

Con más de ~15 artículos a revisar, usa subagentes en lotes de ~15. Reglas
para cada subagente (lecciones aprendidas, no negociables):
- NO lanza otros subagentes; hace él mismo todo el lote.
- Edita directo en el archivo antes de terminar. Un subagente que "reporta"
  sin escribir no cuenta.
- El veredicto describe el caso REAL verificado, no el más optimista.

## Si hay diferencia real

Edita SOLO lo necesario del .md de ese artículo:
- `veredicto` y `fraseCorta` si el estado cambió (rojo/amarillo/verde).
- La sección del cuerpo que describe la promoción (condiciones, plazo,
  países donde aplica — aclara siempre si aplica en México).
- `fuenteVerificacion` con la fuente y la fecha de hoy.
- `updatedDate: AAAA-MM-DD` en el frontmatter (alimenta el lastmod del
  sitemap) y el sello "[Última actualización: DD/MM/AAAA]" al pie.
No tocar pubDate, slug, título ni otros artículos.

## Parte 2 — Solo diagnóstico, requiere aprobación

- Herramientas nuevas que ya deberían estar en la serie (regla de cobertura:
  cada serie cubre toda la base de herramientas). Repórtalas, no las crees.
- Programas de estudiantes nuevos o que cambiaron de país: repórtalos para
  la serie de estudiantes, si existe.

## Reporte final

Cortito, ácido, sin hype. Lista por artículo cambiado: qué cambió (antes →
después) en 2-3 líneas. Los veredictos que cambiaron de color van PRIMERO.
Si no hubo cambio: "sin cambios". Al final: archivos modificados, para
revisión en GitHub Desktop.

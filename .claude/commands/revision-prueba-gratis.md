---
description: Revisión trimestral de la serie "Prueba gratis sin tarjeta" — verifica si la prueba del plan de pago sigue pidiendo (o no) tarjeta. Aplica cambios directo, sin pedir aprobación previa
---

# Revisión Prueba gratis sin tarjeta (trimestral)

Serie: src/content/prueba-gratis/*.md (~110 artículos, uno por herramienta).
Landing: /prueba-gratis-sin-tarjeta/. El veredicto vive en el frontmatter
(`veredicto`, `fraseCorta`):

- rojo: la prueba del plan de pago pide tarjeta desde el inicio.
- verde: la prueba del plan de pago NO pide tarjeta.
- amarillo: depende del plan o de la región.

REGLA QUE MÁS SE ROMPE (ya costó 13 correcciones): el veredicto habla de la
PRUEBA DEL PLAN DE PAGO, no de si la herramienta tiene un plan gratuito. Que
exista un tier gratis NO vuelve verde un artículo. Precedentes vigentes:
GitHub Copilot, Discord y Telegram Premium son rojo aunque tienen tier
gratuito. Antes de marcar verde pregúntate: "¿puedo empezar la prueba del
plan de pago sin dar una tarjeta?" Si la respuesta es "tengo un plan gratis
aparte", sigue siendo rojo (o amarillo, si hay matiz real por plan/región).

Regla general: encuentra la diferencia, corrígela. No pidas autorización antes
de editar — este comando ya es la autorización. Jorge revisa el diff en GitHub
Desktop; tú nunca commiteas. Dato no confirmado por fetch a la fuente oficial
= no se reporta ni se usa. Sin excepciones.

## Qué cambia entre revisiones (y por qué el trimestre alcanza)

Las condiciones de prueba cambian despacio, pero cuando cambian el artículo
queda mal en la dirección opuesta a su promesa: una prueba que ahora pide
tarjeta, o una que ya no existe. Cambios en cualquier dirección importan igual.

## Para cada herramienta

1. Lee el artículo (src/content/prueba-gratis/<id>-prueba-gratis-sin-tarjeta.md).
2. Fetch la página oficial citada en `fuenteVerificacion` (o la vigente de
   precios/planes/registro). Confirma: ¿hay prueba del plan de pago?, ¿duración?,
   ¿pide tarjeta al registrarse?, ¿cambia por país/plataforma (web vs App
   Store/Google Play)?
3. Sin diferencia real: no toques nada.
4. Con diferencia real, edita SOLO lo necesario:
   - `veredicto` y `fraseCorta` si el estado cambió.
   - La sección del cuerpo afectada (duración, requisitos, regiones).
   - `fuenteVerificacion` con la fuente y la fecha de hoy.
   - `updatedDate: AAAA-MM-DD` en el frontmatter (alimenta el lastmod del
     sitemap) y el sello "[Última actualización: DD/MM/AAAA]" al pie.
   No tocar pubDate, slug, título ni otros artículos.

## Cómo ejecutarlo

Con ~110 artículos, usa subagentes en lotes de ~15. Reglas para cada
subagente (lecciones aprendidas, no negociables):
- NO lanza otros subagentes; hace él mismo todo el lote.
- Edita directo en el archivo antes de terminar. Reportar sin escribir no cuenta.
- Incluye en su instrucción la REGLA de arriba (prueba del plan de pago, no
  tier gratis) con los tres precedentes. La redacción ambigua "prueba o tier
  gratuito" fue justo lo que produjo los 13 veredictos mal marcados.

## Parte 2 — Solo diagnóstico, requiere aprobación

Herramientas nuevas que la serie aún no cubre (regla de cobertura: cada serie
cubre toda la base). Repórtalas con la evidencia; no las crees.

## Reporte final

Cortito, ácido, sin hype. Veredictos que cambiaron de color PRIMERO (antes →
después), luego cambios menores. Si no hubo cambio: "sin cambios". Al final:
archivos modificados, para revisión en GitHub Desktop.

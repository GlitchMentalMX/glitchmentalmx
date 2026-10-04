---
description: Revisión trimestral de la serie "Quién entrena con tus datos" — verifica políticas de privacidad y el camino para desactivar el entrenamiento. Aplica cambios directo, sin pedir aprobación previa
---

# Revisión Quién entrena con tus datos (trimestral)

Serie: src/content/entrena-ia/*.md (~80 artículos, uno por herramienta).
Landing: /quien-entrena-con-tus-datos/. El veredicto vive en el frontmatter
(`veredicto`, `fraseCorta`, `fuentePolitica`):

- rojo: entrena con tus datos y no hay forma real de salirse.
- amarillo: depende del plan, o entrena por default pero se puede apagar (opt-out).
- verde: no entrena, o no por default.

Regla general: encuentra la diferencia, corrígela. No pidas autorización antes
de editar — este comando ya es la autorización. Jorge revisa el diff en GitHub
Desktop; tú nunca commiteas. Dato no confirmado por fetch a la política
oficial = no se reporta ni se usa. Sin excepciones.

## Por qué trimestral, y cuándo adelantarla

Las políticas de privacidad cambian poco, pero cuando cambian suele ser de
golpe y el veredicto se invierte (una empresa pasa del opt-in al opt-out por
default, o al revés). Si Jorge menciona que una empresa anunció un cambio de
política de datos, corre una revisión puntual de esa herramienta sin esperar
al trimestre.

## Para cada herramienta

1. Lee el artículo (src/content/entrena-ia/<id>-usa-mis-datos-para-entrenar-ia.md).
2. Fetch la política o centro de ayuda oficial citado en `fuentePolitica`.
   Confirma tres cosas: (a) ¿entrena con chats/contenido de cuentas
   personales por default?, (b) ¿existe interruptor para apagarlo y dónde
   está EXACTAMENTE (ruta de menús)?, (c) ¿qué planes quedan excluidos
   (empresariales, API, educación)?
3. Sin diferencia real: no toques nada.
4. Con diferencia real, edita SOLO lo necesario:
   - `veredicto` y `fraseCorta` si el estado cambió.
   - El cuerpo: en especial la sección "Cómo optar por no participar" (la ruta
     de menús cambia seguido aunque la política no) y "Plan personal vs.
     empresarial".
   - `fuentePolitica` y la fecha de verificación citada en el texto
     ("verificado el DD de mes de AAAA").
   - `updatedDate: AAAA-MM-DD` en el frontmatter (alimenta el lastmod del
     sitemap) y el sello "[Última actualización: DD/MM/AAAA]" al pie.
   No tocar pubDate, slug, título ni otros artículos.

## Cómo ejecutarlo

Con ~80 artículos, usa subagentes en lotes de ~15. Reglas para cada subagente
(lecciones aprendidas, no negociables):
- NO lanza otros subagentes; hace él mismo todo el lote.
- Edita directo en el archivo antes de terminar. Reportar sin escribir no cuenta.
- El veredicto describe lo que la política dice HOY, no lo que la empresa
  "suele hacer" ni lo que dijo un blog. Fuente primaria o no se usa.

## Parte 2 — Solo diagnóstico, requiere aprobación

Herramientas nuevas que la serie aún no cubre (regla de cobertura: cada serie
cubre toda la base). Repórtalas con la evidencia; no las crees.

## Reporte final

Cortito, ácido, sin hype. Veredictos que cambiaron de color PRIMERO (antes →
después), luego rutas de desactivación que cambiaron, luego lo menor. Si no
hubo cambio: "sin cambios". Al final: archivos modificados, para revisión en
GitHub Desktop.

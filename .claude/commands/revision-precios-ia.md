---
description: Auditoría trimestral de precios de las 14 herramientas de IA cubiertas en la serie "Precios de IA" — aplica cambios directo, sin pedir aprobación previa
---

# Revisión Precios de IA

Herramientas (14): ChatGPT, Claude, Gemini, Microsoft Copilot, Perplexity,
Grok, DeepSeek, Canva IA, Meta AI, NotebookLM, Adobe Firefly, ElevenLabs,
Midjourney, Runway.

Regla general: encuentra la diferencia, corrígela. No pidas autorización
antes de editar — este comando ya es la autorización. Solo reporta al final.

## Para cada herramienta

1. Lee el artículo actual directo del repo (src/content/posts/ — localiza el
   slug correspondiente).
2. Fetch la página oficial de precios/planes vigente de la herramienta. Dato
   no confirmado por fetch = no se reporta ni se usa. Sin excepciones.
3. Compara solo estas dos secciones del artículo:
   - "Qué cambia el precio final" (IVA, web vs. App Store/Google Play, plan
     anual vs. mensual)
   - "Qué incluye el plan pagado vs. el gratuito"
4. Si NO hay diferencia real: no toques nada, pasa a la siguiente.
5. Si SÍ hay diferencia real (precio cambió, plan se renombró, beneficio
   agregado/quitado, política de facturación cambió):
   - Edita SOLO esas dos secciones en el .md del artículo. No tocar el resto
     del artículo, frontmatter, ni otros artículos.
   - Actualiza el sello "Última actualización: DD/MM/AAAA" al pie de esa
     sección con la fecha de hoy.

## Cambios acotados

- Nada de refactors de paso, nada de tocar otros artículos.
- Jorge revisa el diff en GitHub Desktop antes de commitear — tú nunca
  commiteas.

## Reporte final

Lista por herramienta, máximo 2-3 líneas cada una. Sin preámbulo, sin
conclusión general al final. Voz: cortito, ácido, sin hype.

- Si no hubo cambio: "sin cambios".
- Si hubo cambio: qué cambió + confirmación de que ya está editado en el
  archivo.

Al final del reporte: lista de archivos modificados, para revisión en
GitHub Desktop.

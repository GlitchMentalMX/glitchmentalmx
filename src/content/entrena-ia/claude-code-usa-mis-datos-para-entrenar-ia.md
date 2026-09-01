---
title: "¿Claude Code entrena su IA con mi código?"
description: "Depende de cómo entres: con cuenta Pro o Max entrena por default, igual que Claude. Con API, Team o Enterprise, no entrena salvo que tú lo actives."
herramienta: "Claude Code"
herramientaId: "claude-code"
empresa: "Anthropic"
sitioOficial: "https://code.claude.com/docs/en/data-usage"
veredicto: "amarillo"
fraseCorta: "Con cuenta Pro o Max entrena por default, igual que Claude. Con API, Team o Enterprise, no entrena salvo que lo actives tú."
fuentePolitica: "Documentación oficial de Uso de Datos de Claude Code (Anthropic), consultado el 31 de agosto de 2026"
pubDate: 2026-08-31
---

Depende de con qué cuenta entras a Claude Code —no hay una sola respuesta para toda la herramienta. Si inicias sesión con tu cuenta personal Free, Pro o Max, Claude Code hereda exactamente la misma política que Claude: Anthropic entrena nuevos modelos con tu código y tus prompts cuando el ajuste de mejora de modelo está activado, algo que viene así desde agosto de 2025. Si en cambio usas Claude Code con una API key de Anthropic, a través de Amazon Bedrock, Google Cloud, Microsoft Foundry, o con una cuenta Claude for Teams o Enterprise, aplican los Términos Comerciales: "Anthropic no entrena modelos generativos usando código o prompts enviados a Claude Code bajo términos comerciales, a menos que el cliente haya elegido proporcionarnos sus datos para mejora de modelo" —por ejemplo, mediante el Programa de Socios de Desarrollo. Fuente: documentación oficial de Uso de Datos de Claude Code, verificado el 31 de agosto de 2026.

<p class="otros-precios"><a href="/quien-entrena-con-tus-datos/">¿Quieres consultar otra herramienta? →</a></p>

## Cómo optar por no participar

Si usas cuenta Free, Pro o Max: el interruptor está en claude.ai/settings/data-privacy-controls, el mismo que controla Claude en el navegador. Con él activado, tus datos se retienen hasta 5 años para desarrollo de modelos; desactivado, la retención baja a 30 días. Si usas Claude Code por API, Team o Enterprise, el entrenamiento ya viene apagado por default —no tienes que hacer nada, salvo que tu organización haya optado explícitamente por participar en programas como el de Socios de Desarrollo.

## El matiz que nadie te dice: el comando /feedback es un canal aparte

Sin importar bajo qué términos operes, si usas los comandos `/feedback`, `/bug` o `/share` dentro de Claude Code, se envía a Anthropic una copia de tu conversación —incluido tu código— que se retiene hasta 5 años. Ese envío es independiente de tu configuración de entrenamiento de cuenta: incluso si estás bajo Términos Comerciales con entrenamiento apagado, el `/feedback` sigue mandando el transcript completo salvo que lo desactives por tu cuenta con la variable de entorno `DISABLE_FEEDBACK_COMMAND=1`.

¿Buscas cuánto cuesta Claude Code, no si entrena con tus datos? [Revisa el precio actualizado →](/articulos/cuanto-cuesta-claude-code-hoy/)

[Última actualización: 31/08/2026]

<a href="https://code.claude.com/docs/en/data-usage" target="_blank" rel="noreferrer noopener">Lee la documentación oficial de Uso de Datos de Claude Code →</a>

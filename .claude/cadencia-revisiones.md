# Cadencia de revisiones periódicas (definida 11/10/2026)

Regla de Jorge (aprobación total): un hallazgo verificado se corrige de inmediato,
sin pedir permiso. Al final de cada corrida hay un reporte/aviso que dice qué
cambió o que no hubo cambios. Nunca se hace commit: Jorge revisa el diff en
GitHub Desktop. Las herramientas/fichas NUEVAS no se crean solas: se reportan.

## Calendario (hora local, tareas programadas `glitch-rev-*`)

| Tarea | Cuándo | Qué corre |
|---|---|---|
| glitch-rev-estudiantes | día 3 de cada mes | /revision-estudiantes (46 fichas) |
| glitch-rev-codigos | día 6 de cada mes | /revision-codigos-descuento (Nivel A siempre; Nivel B ene/abr/jul/oct y may-jun/nov) |
| glitch-rev-nucleo | día 17 de cada mes | NÚCLEO volátil de Precios IA + Prueba gratis (listas abajo) |
| glitch-rev-estables | día 14 de ene/abr/jul/oct | Precios IA + Digitales y Prueba gratis, SOLO fichas fuera del núcleo |
| glitch-rev-entrena | día 20 de ene/abr/jul/oct | /revision-entrena-ia (79 fichas) |
| glitch-rev-sitio | día 24 de ene/abr/jul/oct | Recomendador, Y ahora qué hago, Detox, chequeo de URLs `sitioOficial` |

## NÚCLEO Precios IA (ids de cuanto-cuesta-<id>-hoy.md)

chatgpt, chatgpt-go, chatgpt-pro, claude, claude-max, claude-code, codex,
gemini, google-ai-plus, google-ai-ultra, grok, supergrok-heavy, perplexity,
perplexity-max, cursor, cursor-pro-plus, github-copilot, github-copilot-pro-plus,
github-copilot-max, windsurf, midjourney, copilot, microsoft-365, notion-ai,
canva, adobe-firefly, adobe-firefly-pro, runway, elevenlabs, suno, kling-ai,
kimi, deepseek, lovable, replit, v0, manus-ai, grammarly, spotify, netflix, youtube

## NÚCLEO Prueba gratis (ids de <id>-prueba-gratis-sin-tarjeta.md)

chatgpt, claude, gemini, grok, codex, perplexity, cursor, github-copilot,
windsurf, midjourney, canva, adobe-firefly, runway, elevenlabs, suno, lovable,
replit, v0, manus-ai, grammarly, notion-ai, microsoft-365, kling-ai, heygen,
synthesia, jasper-ai

## Ajuste con datos

Tras 2–3 meses, mueve fichas entre núcleo y estables según cuántas cambiaron de
verdad (las que cambian en cada corrida suben al núcleo; las que nunca cambian,
bajan). Cada reporte debe decir qué fichas cambiaron para poder medirlo.

## Reportes

Cada corrida escribe `reportes-revision/AAAA-MM-DD-<tarea>.md` (carpeta en
.gitignore, no ensucia GitHub Desktop) y, al terminar, manda un aviso:
"hubo cambios (N fichas)" o "sin cambios". También anota el uso de tokens
aproximado si está disponible, para medir el costo real.

---
description: Revisión periódica de "Impacto y Negocios" — lee los artículos publicados desde la última revisión, decide cuáles encajan, redacta Paga / Gana / Riesgo y los marca. Las primeras rondas piden aprobación de Jorge antes de aplicar
---

# Revisión Impacto y Negocios

Sección: /impacto-y-negocios/ (landing) + banda "Impacto y Negocios" del home
(las 2 más recientes). Código: src/lib/impacto.ts, src/components/ImpactoCard.astro,
src/components/ImpactoBullets.astro, src/pages/impacto-y-negocios/.

Mecánica (decidida con Jorge, 2026-11-09): un artículo NO se decide al publicarlo.
Jorge publica como siempre; esta revisión mira lo publicado desde la última vez y
agrega al artículo EXISTENTE (misma URL, nunca una copia) cuatro campos de
frontmatter. En Sveltia esos campos son widgets `hidden`: Jorge no los ve ni los
edita; solo existen para que Sveltia no los borre al guardar el artículo.

## Paso 1 — Qué revisar

1. Lee `.claude/impacto-ultima-revision.md` (fecha de la última revisión y lista
   de artículos ya evaluados y descartados — no se vuelven a proponer salvo que
   tengan `updatedDate` posterior).
2. Candidatos = artículos de src/content/posts/ con `pubDate` o `updatedDate`
   posterior a esa fecha, `draft: false` y sin `is_impacto: true`.
3. Artículos que YA tienen `is_impacto: true` y recibieron `updatedDate` nuevo:
   re-verifica que sus tres textos sigan siendo ciertos con el contenido actual.

## Paso 2 — Filtro editorial (implacable)

Entra solo si cumple TODO:
- Tema central: desmantela un modelo de negocio, un cuello de botella de
  infraestructura, una fricción regulatoria o un movimiento de capital en
  tecnología.
- Alcance GLOBAL (decisión de Jorge, 2026-11-09): el ángulo México/LATAM suma
  pero NO es requisito. Cuenta el impacto real en empresas, mercados o
  reguladores de México, Latinoamérica, España (hay audiencia interesada allí)
  o el resto del mundo. El sitio se está traduciendo a otros idiomas: los textos
  no deben asumir un lector mexicano ni regionalismos; nombra el país o
  institución cuando importe.
- Responde con claridad: ¿quién paga, quién se beneficia o cuál es el riesgo
  sistémico?
- Excluidas siempre: piezas filosóficas, tutoriales y guías de herramientas,
  noticias genéricas de lanzamientos, reseñas de gadgets, cultura/Gen Z,
  salud mental.
- Si el artículo no tiene un "gana" o un "paga" real, no se fuerza: no entra.

## Paso 3 — Redacción de los tres campos

Frontmatter (después de `draft:`):

```yaml
is_impacto: true
impacto_quien_paga: "..."
impacto_quien_gana: "..."
impacto_riesgo: "..."
```

Reglas de redacción (son frases que un directivo copiará a Slack/Teams):
- Una sola frase por campo, ≤ ~220 caracteres, sin etiqueta ("Paga:" ya la pone el componente).
- Cada cifra, nombre propio y fecha salen del cuerpo del artículo. Nada de datos
  externos ni inferencias. Si el artículo atribuye la cifra a una fuente o la
  marca como escenario/estimación/de la propia empresa, el texto también.
- Si el artículo dice "no existe cifra pública", el campo lo dice así.
- Sin hype, sin adjetivos de marketing, sin "revolucionario". Tono del sitio.
- Marca siempre "glitchMentalMX" (g minúscula) si hiciera falta nombrarla.
- Los textos van entre comillas dobles (YAML); comillas internas con `\"`.
- El esquema (src/content.config.ts) hace FALLAR el build si `is_impacto: true`
  y falta cualquiera de los tres textos. Marca y textos van SIEMPRE en el mismo cambio.

## Paso 4 — Aplicar o proponer

- Rondas de aprobación (primeras 3 corridas, hasta que Jorge diga lo contrario):
  presenta dos listas — "Entran" (con los tres textos redactados y 1 línea de
  por qué) y "Descartados" (con el motivo en una línea) — y NO edites hasta que
  Jorge apruebe.
- Después: aplica directo y reporta, como en las demás revisiones.
- Nunca hagas commit: Jorge revisa el diff y empuja.

## Paso 5 — Cierre

1. Actualiza `.claude/impacto-ultima-revision.md` (fecha + descartados nuevos).
2. Verifica con `npx astro build` (NO `npm run build`: el prebuild reescribe
   imágenes versionadas). Si el build falla por un texto faltante, corrige.
3. Reporte final: qué entró, qué se descartó y por qué, qué textos se
   re-verificaron, y cualquier artículo pieza dudosa que Jorge deba decidir.

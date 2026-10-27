---
description: Revisión trimestral de la Calculadora de Riesgo IA — verifica las cifras citadas (Banamex, FMI, InfoJobs, WEF), el año de edición y los enlaces; aplica directo lo verificado, reporta cambios de metodología y huecos de cobertura
---

# Revisión Calculadora de Riesgo de Reemplazo por IA

Página: src/pages/calculadora-de-riesgo-de-reemplazo-por-ia/index.astro
URL pública: /calculadora-de-riesgo-de-reemplazo-por-ia/ (sin año a propósito: es
un recurso evergreen; NUNCA le pongas año al slug ni al canonical).
Fecha de revisión: src/data/calculadora-riesgo-ia.json → lastReviewed
(alimenta el "Última revisión" visible, la FAQ y el lastmod del sitemap vía
astro.config.mjs).

Este comando tiene tres niveles de riesgo distintos en un mismo run:
- Cifra ya citada con fuente primaria verificada, año de edición, enlaces
  rotos: aplica directo, sin pedir autorización.
- Cambiar el cálculo (pesos por área, región, estudios, experiencia) o el
  texto de los niveles de riesgo: es decisión de metodología, no un dato que
  se corrige solo. Se REPORTA con evidencia; no se toca sin aprobación de Jorge.
- Agregar regiones nuevas (hoy son 16) o un bloque nuevo de contenido: se
  reporta como propuesta.

## Parte 1 — Cifras y fuentes citadas (auto-aplicable)

Dónde viven las cifras: el bloque `region-facts` (México / España / En el
mundo) justo debajo de la calculadora, el `disclaimer`, y el FAQ (const `faqs`
al inicio del archivo, incluida la respuesta sobre México y la de fuentes).

Fuentes actualmente citadas (verificar cuál es la edición más reciente de cada una):
1. Banamex, Área de Estudios Económicos (con datos de INEGI y OIT): ~30% de
   los empleos formales en México con riesgo alto de automatización en dos décadas.
2. FMI (análisis de enero de 2024): casi 40% del empleo mundial expuesto,
   ~60% en economías avanzadas, ~40% en emergentes, ~26% en bajos ingresos;
   la mitad de los empleos expuestos se beneficia, la otra mitad enfrenta
   presión a la baja. Buscar si el FMI publicó una actualización.
3. InfoJobs (España): 32% de trabajadores usa IA a diario, 29% de ellos sin
   que su empresa lo sepa. Cruzar con el artículo del sitio
   `1-de-cada-3-trabajadores-ya-usa-ia-en-espana-el-futuro-del-trabajo-esta-aqui`
   (ojo: ese artículo mezcla fechas del estudio, noviembre 2024 vs "InfoJobs
   2026"; si encuentras cuál es la correcta, repórtalo).
4. Frey & Osborne (Oxford), McKinsey Global Institute y Foro Económico
   Mundial (Future of Jobs; edición actual 2025, la siguiente se espera en
   2027) — citados como base del diagnóstico en intro, disclaimer y FAQ.
5. OIT: buscar si hay un índice de exposición a IA generativa más nuevo que
   el que respalda la cifra de Banamex/OIT.

Para cada una:
1. Fetch de la fuente primaria (no un resumen de prensa) para confirmar si
   hay una edición más reciente del mismo informe o estudio.
2. Si no hay nada nuevo: no tocar nada.
3. Si hay una edición nueva con cifra distinta: actualiza la cifra, la
   atribución y, si la cifra aparece en más de un lugar (region-facts + FAQ),
   en todos los lugares, con el año de la fuente. Edita solo esas frases.
4. Dato no confirmado por fetch a fuente primaria = no se escribe ni se
   reporta como hecho. Sin excepciones.

Hueco conocido de España: no hay una cifra de *riesgo* de reemplazo para
España con fuente primaria verificada (la de InfoJobs es de *adopción*).
Busca en Banco de España, OCDE, FUNCAS y OIT/FMI por país. Si encuentras una
fuente primaria con cifra de exposición para España, repórtala como propuesta
con el enlace; no la agregues sola. Lo mismo para cualquier otro país donde
el tráfico de la calculadora crezca (revisa /stats/ si Jorge lo menciona).

## Parte 2 — Año de edición y enlaces (auto-aplicable)

1. Año de edición: "IA Risk Scanner AAAA" aparece en `eyebrow`, en el `dek`
   ("...automatización en AAAA") y en el `<h2 class="calc-title">`. Si el año
   en curso es distinto del que dicen esos tres textos, cámbialo (solo esos
   tres). Las tarjetas del home, /herramientas/ y ToolsWidget NO llevan año
   a propósito — no se lo agregues.
2. Enlaces internos de la página: RELATED_SLUGS, los enlaces del bloque
   `region-facts` y el de "¿Te preocupa la IA?" deben apuntar a artículos y
   páginas que existen y no son borrador. Corrige solo si confirmas el
   destino correcto.
3. Los enlaces dentro de `.intro` deben verse subrayados (estilo `.intro a`
   del propio archivo); si alguien los quitó, repónlo.
4. Verifica que canonical y og:url sigan siendo la URL sin año y que la URL
   vieja `/calculadora-de-riesgo-de-reemplazo-por-ia-2026/` siga siendo un
   stub de redirección fuera del sitemap.

## Parte 3 — Metodología y cobertura (solo diagnóstico, requiere aprobación)

1. Compara los resultados de la calculadora con los hallazgos recientes de
   las fuentes de la Parte 1: ¿algún área profesional cambió de forma
   notable (por ejemplo, un sector que los informes ya mueven de moderado a
   alto)? Reporta el área, la evidencia y qué peso cambiaría; no lo cambies.
2. ¿Alguna región de las 16 quedó con una velocidad de adopción
   ("moderada", "acelerada", etc.) desfasada respecto a los informes? Igual:
   reporta, no edites.
3. Huecos de cobertura: áreas profesionales o regiones que falten y que la
   evidencia o el tráfico justifiquen. Propuesta con evidencia, sin implementar.

## Cuándo se toca lastReviewed

Solo si la Parte 1 o la Parte 2 cambiaron algo sustantivo (una cifra, una
fuente o el año de edición). Entonces actualiza
src/data/calculadora-riesgo-ia.json → lastReviewed (YYYY-MM-DD de hoy). Si no
hubo cambios, NO toques la fecha: no se "actualiza" para simular frescura sin
sustancia. Un cambio solo de Parte 3 (propuesta pendiente) tampoco la mueve.

## Reglas

- Valida con `npx astro build` (NUNCA `npm run build`: el prebuild reescribe
  imágenes versionadas).
- NUNCA hagas commit; Jorge revisa el diff en GitHub Desktop.
- Marca con g minúscula: "glitchMentalMX".

## Reporte final

Tres bloques:
- **Parte 1 y 2 (aplicado):** cambios hechos, 2-3 líneas cada uno, con
  fuente y fecha. Si no hubo: "sin cambios".
- **Parte 3 (pendiente de aprobación):** hallazgos de metodología/cobertura,
  con evidencia y recomendación. Sin editar nada de esto.
- **Siguiente revisión profunda:** cada enero (junto con el cambio de año de
  edición); fuera de calendario si sale un informe grande de la OIT, el FMI
  o el WEF, o un estudio sobre España o México.

Al final: lista de archivos modificados, para revisión en GitHub Desktop.

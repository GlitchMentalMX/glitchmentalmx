---
title: "ChatGPT (12/12), Claude (11/12) y Gemini (11/12) acertaron todos los cálculos de RESICO y liquidación de 2026, pero solo uno citó la reforma vigente de horas extra"
description: "Seis casos fiscales y laborales de México en 18 chats nuevos: los tres modelos cuadraron el ISR de RESICO, las retenciones de una factura y la liquidación. El riesgo está en la vigencia del fundamento legal."
kicker: "Laboratorio · Experimento 06"
experimento: 6
pubDate: 2026-11-17
heroImage: /images/laboratorio/laboratorio-06-ia-fiscal-laboral-mexico/hero.webp
heroImageAlt: "Sumadora mecánica de latón que imprime una larga cinta de papel, junto a dos libros de leyes: uno antiguo y gastado, otro nuevo, unidos por un hilo de luz turquesa."
csv: /datos/laboratorio-06-ia-fiscal-laboral-mexico.csv
seoTitle: "Cálculos fiscales con IA: cifras bien, dos citan ley vieja"
nota: modelos
roles: "Claude armó los datos y calificó; Gemini diseñó el protocolo y audita; ChatGPT hizo una revisión ciega."
draft: false
---

## Resumen ejecutivo

- **Qué probamos:** si tres chats de IA calculan sin inventar tasas seis supuestos fiscales y laborales de México. Nuestra hipótesis era que fallarían en reglas locales y lo dirían con total seguridad.
- **Qué encontramos:** la hipótesis falló. Los tres cuadraron el ISR de RESICO ($975.00), las retenciones de una factura ($20,816.67 netos) y la liquidación ($94,682.88). El único punto perdido fue el aguinaldo, por una ambigüedad de nuestro propio enunciado. En horas extra, los tres dieron $2,400.00, pero solo ChatGPT citó la reforma del 1 de mayo de 2026.
- **Qué significa:** la aritmética ya no es el punto débil. El riesgo está en la vigencia del fundamento legal: la cifra sale bien, el artículo citado puede estar derogado.

## Protocolo y límites

Ejecutamos 6 supuestos deterministas en 18 chats nuevos y limpios (3 modelos × 6 casos) el 17 de noviembre de 2026, sin memoria, proyectos ni instrucciones personalizadas. Una sola respuesta por chat, sin repreguntas ni pistas.

- **Versiones:** la interfaz web no expone el número de compilación exacto de cada modelo. Usamos el modelo por defecto de cada servicio.
- **Búsqueda web:** ChatGPT la activó en las 6 respuestas, según las fuentes visibles en cada una. Claude y Gemini respondieron sin evidencia de búsqueda. Claude advirtió en C06 que tomó de memoria el salario mínimo de $315.04. No hay evidencia de ejecución de código en ninguno.
- **Rúbrica:** 2 puntos por cifra exacta (±$0.05) con fundamento correcto; 1 por acierto parcial; 0 por cifra o regla equivocada. Máximo: 12 por modelo.
- **Quién calificó:** Claude, que también es uno de los evaluados, armó la tabla; Gemini la auditó. El CSV quedó congelado tal cual, sin ajustes posteriores a la prueba. Es una calificación asistida por los propios modelos bajo rúbrica cerrada, no una auditoría contable externa; por eso publicamos el CSV completo.
- **Ambigüedad en C01:** el enunciado decía «sigue activo al 20 de diciembre» y no precisaba si el cálculo cierra el 20 o el 31. Fijamos de antemano 142 días ($3,501.37). Con corte al 31, el orden se invierte: ChatGPT 11, Claude y Gemini 12. Si se excluye esa ambigüedad, los tres modelos empatan en exactitud aritmética en los cinco casos restantes (10/10 en C02–C06).
- **Vigencia en C03:** calificamos la cifra (9 horas dobles, 2 triples), no si el artículo citado seguía vigente. Si esa exigencia contara, Claude y Gemini bajarían a 10.
- **Fuera de alcance:** otros regímenes fiscales, PTU, subsidio al empleo y cualquier asesoría contable.

## Evidencia

<table>
<caption>Seis casos × tres modelos, 17 de noviembre de 2026. Puntaje 0–2 entre paréntesis.</caption>
<thead><tr><th>Caso</th><th>Verdad de campo (MXN)</th><th>ChatGPT</th><th>Claude</th><th>Gemini</th><th>Observación clave</th></tr></thead>
<tbody>
<tr><td>C01 Aguinaldo proporcional</td><td>3,501.37</td><td>3,501.37 (2)</td><td>3,772.60 (1)</td><td>3,772.60 (1)</td><td>ChatGPT cortó al 20 de diciembre; Claude y Gemini al 31, con el 20 como nota alternativa.</td></tr>
<tr><td>C02 Prima vacacional, 2.º año</td><td>1,750.00</td><td>1,750.00 (2)</td><td>1,750.00 (2)</td><td>1,750.00 (2)</td><td>14 días de vacaciones y 25% de prima; sin diferencias.</td></tr>
<tr><td>C03 Horas extra (11)</td><td>2,400.00</td><td>2,400.00 (2)</td><td>2,400.00 (2)</td><td>2,400.00 (2)</td><td>Solo ChatGPT citó la reforma del 1 de mayo de 2026.</td></tr>
<tr><td>C04 ISR mensual RESICO</td><td>975.00</td><td>975.00 (2)</td><td>975.00 (2)</td><td>975.00 (2)</td><td>Tasa aplicable de 1.50% (tramo de $65,000); $0 deducible por la laptop.</td></tr>
<tr><td>C05 Factura con retenciones</td><td>20,816.67</td><td>20,816.67 (2)</td><td>20,816.67 (2)</td><td>20,816.67 (2)</td><td>Retención de 1.25% de ISR y de dos terceras partes del IVA.</td></tr>
<tr><td>C06 Indemnización y prima</td><td>94,682.88</td><td>94,682.88 (2)</td><td>94,682.88 (2)</td><td>94,682.88 (2)</td><td>Prima topada a $630.08 diarios; Claude avisó que tomó el salario mínimo de memoria.</td></tr>
</tbody>
<tfoot><tr><th scope="row" colspan="2">Total (máximo 12)</th><th>12</th><th>11</th><th>11</th><td></td></tr></tfoot>
</table>

## Lectura editorial

**1. Nuestra hipótesis falló, y eso le conviene a quien pregunta.** Ningún modelo inventó deducciones en RESICO: los tres dieron $975.00 de ISR sobre $65,000 y $0 restables por la laptop de $25,000. Los tres aplicaron la retención de 1.25% de ISR y de dos terceras partes del IVA, con $20,816.67 netos en la cuenta. Y los tres toparon la prima de antigüedad a dos salarios mínimos de 2026 ($630.08 por día) en lugar de usar el salario integrado de $800, que habría dado $28,800 y un total inflado. Si usas estos chats como calculadora para casos de manual, hoy hacen bien el trabajo.

**2. La trampa fue nuestra.** Escribimos «activo al 20 de diciembre» y pensamos en un corte ese día. ChatGPT lo leyó así y dio $3,501.37. Claude y Gemini aplicaron el criterio laboral habitual: si el trabajador sigue activo, el año se cierra el 31 de diciembre (153 días, $3,772.60). Ambos mostraron el $3,501.37 como alternativa. Claude lo llamó interpretación «menos común» y Gemini lo calificó de incorrecto. Penalizarlos por eso es discutible. Lo dejamos como estaba para respetar el protocolo fijado antes de la prueba, y por eso publicamos el CSV completo: tú decides cuál lectura te parece correcta.

**3. El riesgo real son las leyes recién reformadas.** El 1 de mayo de 2026 se publicó en el Diario Oficial la reforma de jornada, que reduce de forma gradual la jornada ordinaria hacia 40 horas en 2030 y modificó los artículos 66 y 68 de la Ley Federal del Trabajo. En 2026 se mantiene un tope transitorio de 9 horas extra semanales, pero ahora pueden distribuirse en un máximo de cuatro días. ChatGPT, con búsqueda activa, citó la reforma y advirtió que meter las horas extra de lunes a viernes incumple esa condición. Claude y Gemini fundamentaron con el esquema anterior: 3 horas diarias, 3 veces por semana. Los tres dieron los mismos $2,400.00, que remuneran las horas efectivamente trabajadas aunque repartirlas de lunes a viernes incumpla la nueva regla de máximo cuatro días. Pero quien lleve esa respuesta a una nómina o a una audiencia puede citar una regla ya reformada. No podemos separar cuánto pesó la búsqueda y cuánto el modelo: este diseño no lo permite.

**Qué hacer con esto:** usa los chats para el cálculo, y para el artículo citado exige fuente con fecha o confirma con un contador, sobre todo en leyes modificadas este año.

## Datos abiertos y conexión interna

[CSV abierto](/datos/laboratorio-06-ia-fiscal-laboral-mexico.csv) (licencia CC BY 4.0), con las 18 calificaciones y el diagnóstico de cada una. Para elegir herramienta según lo que necesitas, usa el [Recomendador](/que-ia-me-conviene/). Otra prueba del Laboratorio: [el mito del especialista frente al chat generalista](/laboratorio/especialista-vs-generalista/).

Además publicamos [las respuestas íntegras de los modelos y los prompts](/datos/laboratorio-06-ia-fiscal-laboral-mexico-respuestas.md) (licencia CC BY 4.0), para que recalifiques sin fiarte de nuestro puntaje.

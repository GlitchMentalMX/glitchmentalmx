---
title: "Claude saca 30/30, Gemini 29/30 y ChatGPT 28/30 al escribir en español de México: los regionalismos ajenos desaparecieron, pero sobreviven anglicismos y tono acartonado"
description: "Probamos a ChatGPT, Claude y Gemini en 15 tareas de español de México: traducir, redactar y limpiar textos contaminados. Cero regionalismos ajenos, pero sobreviven un cargo en inglés y un tono de circular."
kicker: "Laboratorio · Experimento 11"
experimento: 11
pubDate: 2026-11-18
heroImage: /images/laboratorio/laboratorio-11-espanol-mexicano-vs-traduccion-robotica/hero.webp
heroImageAlt: "Caja de composición tipográfica: un brazo robótico coloca tipos idénticos mientras unas manos humanas colocan los signos ¿, ñ y á."
csv: /datos/laboratorio-11-espanol-mexicano-vs-traduccion-robotica.csv
seoTitle: "IA en español de México: sin vosotros, con tono de circular"
nota: modelos
roles: "Claude armó los datos y calificó; Gemini diseñó el protocolo y audita; ChatGPT hizo una revisión ciega."
draft: false
---

## Resumen ejecutivo

- **Qué probamos:** 15 tareas en español de México (traducir, redactar con tope de palabras y limpiar textos contaminados) a ChatGPT, Claude y Gemini: 45 ejecuciones.
- **Qué encontramos:** los tres modelos quedaron entre 28 y 30 de 30; con una corrida por tarea, esa diferencia no es un ranking. Esperábamos que ninguno usara *vosotros*, voseo ni peninsularismos, y que al menos dos conservaran calcos del inglés o sobreactuaran el registro mexicano. Lo primero se cumplió (0/45). Lo segundo casi no: el único calco fue "posición" en Gemini y no hubo muletillas folklóricas. Lo que sí apareció fue otra cosa: un cargo en inglés en la vacante (`T02`) y un tono de circular en un mensaje de WhatsApp (`T07`). Otras desviaciones de fidelidad quedaron en el CSV sin restar puntos.
- **Qué significa:** el riesgo ya no es sonar a Madrid o a Buenos Aires, sino a circular o a vacante traducida. Para publicar, sigue haciendo falta un lector humano.

## Protocolo y límites

- **Muestra y fecha:** 45 ejecuciones el 18 de noviembre de 2026, una por chat nuevo, en la interfaz web estándar de cada modelo. No registramos número de versión.
- **Tareas:** tres bloques de cinco. A: localización inglés→español de México (`T01`–`T05`). B: producción nativa con tope de palabras (`T06`–`T10`). C: limpieza de textos contaminados (`T11`–`T15`). Puntaje de 0 a 2 por tarea, 30 por modelo: 2 puntos si resuelve los controles sin calcos, anglicismos evitables ni regionalismos ajenos y cumple el registro; 1 punto si deja un calco, anglicismo evitable o desvío de tono; 0 puntos si conserva regionalismos de otro país o incumple la consigna. La rúbrica evalúa naturalidad y registro mexicano, no fidelidad literal (por eso añadir "híbrido" en Gemini `T02` u omitir "double-check" en Claude `T01` se anotó en el diagnóstico sin restar puntos).
- **Reglas explícitas:** "laptop" cuenta como uso mexicano válido. Pasar de "tú" a "ustedes" en un párrafo es válido si el cambio es limpio. Rebasar el tope de palabras baja un punto; las palabras se contaron con un script de Python sobre el texto aislado (saludo y despedida incluidos; sin asunto, firma, notas ni botones de la interfaz). Los 15 textos cumplieron; el más cercano al límite fue Claude en `T08`, con 54 de 60.
- **Conflictos de interés:** Claude es sujeto de prueba y también armó los datos y calificó. Gemini diseñó el protocolo y audita. Una auditoría de Gemini corrigió una asimetría en `T02`: su propio puntaje bajó de 2 a 1. ChatGPT realizó una revisión ciega sobre este borrador y el CSV.
- **Condición real de cuenta:** en `T06`, Claude y Gemini firmaron con el nombre del editor, y Claude añadió el nombre de la publicación. Es evidencia de memoria global activa en esas cuentas; las ventanas no eran tan limpias como se diseñó. ChatGPT no firmó.
- **Criterios discutibles:** en `T04` ningún modelo usó "toca" o "pulsa" (todos dijeron "entra a") y se calificó igual, porque no hay calco ni regionalismo. En `T05`, "punto de inflexión" de Gemini pierde precisión frente a "revolución" y también conservó sus 2 puntos. Quien lea los controles al pie de la letra bajaría varios puntajes; el CSV trae el diagnóstico de cada fila para rehacer la cuenta.
- **Fuera de alcance:** una sola corrida por tarea retrata esta muestra exploratoria, no una superioridad lingüística general. Tampoco hubo hablantes nativos externos, y los prompts traían las trampas a la vista, lo que favorece techos altos. La memoria activa en Claude y Gemini rompe la equivalencia estricta entre cuentas.

## Evidencia

<table>
<thead><tr><th>Tarea</th><th>ChatGPT</th><th>Claude</th><th>Gemini</th></tr></thead>
<tbody>
<tr><td>T01 correo</td><td>2 · "alineados"</td><td>2 · "todo alineado"</td><td>2 · "misma sintonía"</td></tr>
<tr><td>T02 vacante</td><td>1 · "Senior Data Analyst" en inglés</td><td>2 · "Analista de Datos Sr."</td><td>1 · "(Senior Data Analyst)" y "posición"</td></tr>
<tr><td>T03 nota</td><td>2 · "se llevará a cabo"</td><td>2 · "se realizará"</td><td>2 · "se llevará a cabo"</td></tr>
<tr><td>T04 app</td><td>2 · celular, carpeta</td><td>2 · "sección" por carpeta</td><td>2 · celular, carpeta</td></tr>
<tr><td>T05 reseña</td><td>2 · "revolución"</td><td>2 · "revolución"</td><td>2 · "punto de inflexión"</td></tr>
<tr><td>T06 proveedor</td><td>2 · 45 palabras</td><td>2 · 38, con firma</td><td>2 · 42, con firma</td></tr>
<tr><td>T07 condominio</td><td>1 · "Se informa a los residentes"</td><td>2 · "corte de agua"</td><td>2 · "corte de agua"</td></tr>
<tr><td>T08 paquetería</td><td>2 · 48 palabras</td><td>2 · 54</td><td>2 · 52</td></tr>
<tr><td>T09 comida corrida</td><td>2 · 47 palabras</td><td>2 · 51, "chamba"</td><td>2 · 51, "calientita"</td></tr>
<tr><td>T10 Slack</td><td>2 · 32 palabras</td><td>2 · 33</td><td>2 · 38, "qué onda"</td></tr>
<tr><td>T11 autobús</td><td>2 · solo tú</td><td>2 · solo ustedes</td><td>2 · de tú a ustedes</td></tr>
<tr><td>T12 rioplatense</td><td>2 · "oye"</td><td>2 · "fíjate"</td><td>2 · "trae prisa"</td></tr>
<tr><td>T13 anglicismos</td><td>2 · "tasa de cancelación"</td><td>2 · "revisar a fondo"</td><td>2 · "retroalimentación"</td></tr>
<tr><td>T14 calcos</td><td>2 · "en definitiva"</td><td>2 · "a fin de cuentas"</td><td>2 · "lo más lógico"</td></tr>
<tr><td>T15 trámite</td><td>2 · "solicitar"</td><td>2 · "contribuyente"</td><td>2 · "solicitante"</td></tr>
</tbody>
<tfoot><tr><td>Total</td><td>28/30</td><td>30/30</td><td>29/30</td></tr></tfoot>
</table>

## Lectura editorial

**1. Con instrucción explícita, el español peninsular no apareció.** En los 45 textos hubo cero *ordenador*, *móvil* (por teléfono), *fichero*, *coger*, *vosotros* o *vos*, incluso al limpiar `T11` y `T12`, que venían cargados de trampas. Con la instrucción "de México" a la vista, esa falla ya casi no aparece; si volvería cuando el prompt no la pide, no lo probamos.

**2. El talón de Aquiles en esta muestra fue el registro corporativo.** ChatGPT y Gemini dejaron el cargo en inglés en una vacante para Guadalajara y Monterrey (`T02`); ChatGPT lo repitió como encabezado. Claude lo tradujo. En `T07`, ChatGPT redactó un aviso de WhatsApp vecinal como circular oficial: "Se informa a los residentes", "suspensión del suministro". Ahí ningún regionalismo estaba mal; el tono sí. De los 45 textos, solo tres perdieron puntos y ninguno por vocabulario de otro país. Gemini, además, agregó "híbrido" a la vacante, un dato que el original no trae. Parece que el modelo acierta en el diccionario y falla en el canal.

**3. En estas tareas, limpiar calcos dio mejor resultado que traducir.** Los tres sacaron 10/10 en el Bloque C y corrigieron "hace más sentido", "tomará lugar" y "aplicar por". En el Bloque A, los dos que no sacaron 10/10 fueron ChatGPT y Gemini. La diferencia es de un punto, así que no la tomamos como ley. Es plausible que corregir un texto con el error a la vista sea más fácil que decidir qué se traduce y qué se deja en inglés.

**Regla práctica para pedir español de México sin clichés:** di quién lee y por qué canal (WhatsApp de condominio, no "aviso"), y decide de antemano si los cargos y las prestaciones se traducen o se quedan en inglés. Si no lo decides tú, lo decide el modelo, y dos de tres lo dejaron en inglés.

## Datos abiertos y conexión interna

- Descarga el [CSV con las 45 filas](/datos/laboratorio-11-espanol-mexicano-vs-traduccion-robotica.csv) (licencia CC BY 4.0).
- Para elegir modelo según tu tarea, usa [¿Qué IA me conviene?](/que-ia-me-conviene/).
- Otra prueba de campo de la serie: [Experimento 10, resistencia a la adulonería ante premisas falsas](/laboratorio/aduloneria-ia-ante-premisas-falsas/).

Además publicamos [las respuestas íntegras de los modelos y los prompts](/datos/laboratorio-11-espanol-mexicano-vs-traduccion-robotica-respuestas.md) (licencia CC BY 4.0), para que recalifiques sin fiarte de nuestro puntaje.

---
title: "Pedirle a la IA que \"suene más humana\" casi no toca el vocabulario, pero infla hasta +49% el correo de cobranza y suaviza hechos: Claude y ChatGPT sacan 9/10; Gemini cae a 7/10"
description: "Pedimos a Claude, ChatGPT y Gemini que volvieran más humanos cinco textos claros con datos duros. Casi no hubo clichés, pero el correo de cobranza creció hasta +49 % y Gemini suavizó un hecho consumado."
kicker: "Laboratorio · Experimento 09"
experimento: 9
pubDate: 2026-11-18
heroImage: /images/laboratorio/laboratorio-09-humanizar-texto-ia/hero.webp
heroImageAlt: "Matraz pequeño con tinta oscura conectado por un tubo de vidrio a otro enorme que se desborda de espuma, junto a una hoja manuscrita."
csv: /datos/laboratorio-09-humanizar-texto-ia.csv
draft: false
---

## Resumen ejecutivo

- **Qué probamos:** le pedimos a Claude, ChatGPT y Gemini que volvieran "más humanos" cinco textos claros y llenos de datos.
- **Qué encontramos:** la hipótesis de partida se cayó en lo más llamativo. Ninguna salida usó clichés de plantilla ni signos ¡!, solo 2 de 15 colaron un relleno y la diversidad léxica casi no se movió. Tampoco hubo pérdida masiva de datos: se alteró 1 de 45. Lo que sí se comprobó: el correo de cobranza creció entre +22.2 % y +49.2 % en los tres modelos, y Gemini convirtió una entrega consumada en una pendiente.
- **Qué significa:** "humanizar" un texto ya claro cuesta poco vocabulario y bastante precisión. El daño no viene de las muletillas, sino de verbos, plazos y cuantificadores suavizados.

## Protocolo y límites

- **Muestra y fecha:** 15 ejecuciones (3 modelos × 5 textos) el 18 de noviembre de 2026, en interfaz web estándar, una respuesta por chat nuevo y sin repreguntas. Consigna idéntica en los 15 chats: "Reescribe el siguiente texto para que suene más humano, natural y cercano, sin perder la información".
- **Textos:** cinco párrafos informativos en español mexicano (nota del INEGI, correo de cobranza, cifrado, reseña de aspiradora, retenciones fiscales), de 63 a 70 unidades léxicas contadas con la expresión regular `\b\w+\b`. Un decimal como 59.8 o un monto como $42,500 cuenta como dos unidades.
- **Rúbrica (0 a 2 por texto, máximo 10 por modelo):** 2 puntos si conserva los tres datos duros, no mete clichés y crece hasta +25 % (umbral que fijamos como convención editorial para medir inflación de extensión). 1 punto si conserva los tres datos pero crece más de +25 % o mete uno o dos clichés. 0 puntos si pierde o altera al menos un dato, o suma tres o más clichés. Palabras, variación y TTR (palabras distintas entre total) los calculó un script; los datos conservados y los clichés son juicio editorial.
- **Conflictos de interés:** Claude es modelo evaluado y administra el expediente. Gemini es evaluado y auditó los datos. ChatGPT es evaluado y revisó este borrador.
- **Matices:** los tres conservaron la fecha numérica al pasar de "antes del martes 10" a "a más tardar el martes 10", pero ampliaron el alcance temporal: ahora incluye ese día. No lo descontamos porque fue parejo. Con un criterio más estricto, que contara "un par de" o "más o menos" como dato alterado, el texto 4 de Claude y el de Gemini bajarían a 0 puntos (Claude 7/10, Gemini 5/10).
- **Alcance:** textos de unas 65 palabras; no mide escritura creativa ni textos largos. El TTR es sensible a la longitud: las salidas de Gemini fueron más largas en promedio (82.4 unidades, frente a 70.8 de Claude y 72.6 de ChatGPT), lo que influye en su TTR. Las 15 ejecuciones retratan esta muestra exploratoria. No registramos la versión exacta de cada modelo ni si las cuentas tenían memoria global.

## Evidencia

Cada celda: puntaje, variación de palabras frente al original, TTR de la salida y qué ocurrió.

<table>
  <thead>
    <tr><th>Texto (unidades originales)</th><th>Claude</th><th>ChatGPT</th><th>Gemini</th></tr>
  </thead>
  <tbody>
    <tr><td>T01 Nota INEGI (70)</td><td><strong>2</strong> · −20.0 % · 0.804. Recorta; "cuarto trimestre" pasa a "al cierre de 2025".</td><td><strong>2</strong> · −1.4 % · 0.710. Casi no toca el texto; "puestos de trabajo" pasa a "personas ocupadas".</td><td><strong>2</strong> · +11.4 % · 0.756. "Desocupación" pasa a "desempleo".</td></tr>
    <tr><td>T02 Correo de cobranza (63)</td><td><strong>1</strong> · +27.0 % · 0.800. Rebasa el umbral; agrega "Ojo con el pago".</td><td><strong>1</strong> · +22.2 % · 0.792. Mete "Es importante considerar que".</td><td><strong>0</strong> · +49.2 % · 0.809. "Entregamos" pasa a "tenemos todo listo para entregar": 2 de 3 datos.</td></tr>
    <tr><td>T03 Cifrado (69)</td><td><strong>2</strong> · +24.6 % · 0.698. A 0.4 puntos del umbral; su TTR más bajo.</td><td><strong>2</strong> · +14.5 % · 0.759. Limpio.</td><td><strong>2</strong> · +14.5 % · 0.759. Limpio.</td></tr>
    <tr><td>T04 Reseña aspiradora (63)</td><td><strong>2</strong> · +17.5 % · 0.811. "Más o menos cada cuatro" y "un par de veces".</td><td><strong>2</strong> · +20.6 % · 0.842. Limpio; el TTR más alto de los 15.</td><td><strong>2</strong> · +23.8 % · 0.821. "Un par de tapetes" y "un par de veces".</td></tr>
    <tr><td>T05 Retenciones (63)</td><td><strong>2</strong> · −7.9 % · 0.776. Limpio; "la retención se dispara".</td><td><strong>2</strong> · −1.6 % · 0.742. Limpio.</td><td><strong>1</strong> · +31.7 % · 0.663. "El golpe es mucho mayor"; el TTR más bajo de los 15.</td></tr>
    <tr><td><strong>Resumen (TTR original: 0.778)</strong></td><td><strong>9/10</strong> · +8.2 % promedio · TTR 0.778 · 0 clichés · 15/15 datos</td><td><strong>9/10</strong> · +10.9 % promedio · TTR 0.769 · 1 cliché · 15/15 datos</td><td><strong>7/10</strong> · +26.1 % promedio · TTR 0.762 · 1 cliché · 14/15 datos</td></tr>
  </tbody>
</table>

## Lectura editorial

**1. La hipótesis de los clichés se cayó.** En las 15 salidas no aparece "en un mundo donde", "sin duda", "no se trata solo de" ni un signo ¡!. Solo hay dos rellenos: "Es importante considerar que" (ChatGPT, T02) y "el golpe es mucho mayor" (Gemini, T05). El TTR tampoco se hundió: 0.778 en Claude, 0.769 en ChatGPT y 0.762 en Gemini, contra 0.778 de los originales. El defecto de estos modelos ya no es la muletilla de plantilla, sino algo más discreto.

**2. El impuesto de amabilidad se paga en el correo.** T02 es el único texto donde los tres crecieron más de +22 %: Claude +27.0 %, ChatGPT +22.2 % y Gemini +49.2 %. Gemini agregó "Te comento con anticipación que". Además cambió "entregamos" por "tenemos todo listo para entregar", y un hecho consumado se volvió pendiente. En un cobro, eso mueve quién le debe qué a quién.

**3. Las cifras sobreviven; los plazos se ablandan.** Ninguna cifra cambió de valor, pero "dos veces por semana" se volvió "un par de veces" (Claude y Gemini), "cada cuatro limpiezas" quedó en "más o menos cada cuatro" (Claude) y en los tres, "antes del martes 10" (que excluía ese día) pasó a "a más tardar el martes 10" (que lo incluye): conservaron el número, pero cambiaron el alcance legal del plazo. Una medición se vuelve impresión. En una reseña es cosmético. En un contrato o un cobro, no.

**Regla práctica:** si vas a "humanizar" con IA un texto con montos, fechas o plazos, ponlo junto al original y revisa tres cosas: los verbos (qué ya pasó y qué falta), los plazos ("antes de", "a más tardar") y los cuantificadores ("dos", "un par", "más o menos"). Es una recomendación, no un resultado: no probamos si pedir "sin alargar el texto" evita la inflación.

## Datos abiertos y conexión interna

- Descarga el [CSV de los 15 casos](/datos/laboratorio-09-humanizar-texto-ia.csv) (licencia CC BY 4.0).
- Para elegir modelo según lo que necesitas, usa [¿Qué IA me conviene?](/que-ia-me-conviene/).
- Mismo método, otro terreno: [Experimento 08, la letra chiquita en contratos reales de México](/laboratorio/letra-chiquita-en-contratos-de-mexico/).

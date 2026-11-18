---
title: "ChatGPT y Claude sacan 10/10 al revisar cláusulas abusivas en México; Gemini detecta las 10 trampas pero cae a 7/10 por citar una ley abrogada y fracciones mal numeradas"
description: "En cinco contratos mexicanos con diez cláusulas ilegales, los tres chats de IA detectaron las diez trampas. ChatGPT y Claude sacaron 10/10; Gemini 7/10 por fundamentos legales equivocados."
kicker: "Laboratorio · Experimento 08"
experimento: 8
pubDate: 2026-11-17
heroImage: /images/laboratorio/laboratorio-08-letra-chiquita-contratos-mexico/hero.webp
heroImageAlt: "Microscopio con un contrato bajo el objetivo y un círculo ampliado que revela líneas rojas sobre la letra pequeña."
csv: /datos/laboratorio-08-letra-chiquita-contratos-mexico.csv
draft: false
---

## Resumen ejecutivo

- **Qué probamos:** a ChatGPT, Claude y Gemini les dimos cinco fragmentos de contratos mexicanos (renta, gimnasio, tarjeta de crédito, trabajo e internet), cada uno con dos cláusulas ilegales o abusivas. Eran 10 trampas y 15 ejecuciones.
- **Qué encontramos:** los tres detectaron las 10 trampas. ChatGPT y Claude sacaron 10/10. Gemini también detectó 10 de 10, pero cayó a 7/10 en la calificación combinada por fundamentar mal tres casos: citó una ley abrogada, al extinto IFT y fracciones equivocadas del Art. 90 de la LFPC.
- **Qué significa:** en 2026 saber que una cláusula es abusiva ya no distingue a un modelo de otro. Lo que distingue es citar la ley vigente y no inventar el numeral.

## Protocolo y límites

- **Muestra y fecha:** 15 ejecuciones (3 modelos × 5 contratos) el 17 de noviembre de 2026, una respuesta por chat nuevo, sin repreguntas ni pistas.
- **Calificación:** 0, 1 o 2 puntos por caso, máximo 10 por modelo, contra los textos legales vigentes (LFPC, LMTR, LTOSF, LFT y Código Civil de la CDMX). Dos puntos: detecta ambas trampas y acierta el ordenamiento vigente sin inventar artículos; los errores menores de fecha con artículo exacto, como el de ChatGPT en C01, se anotan sin descuento. Un punto: omite una trampa o cita una ley abrogada, una fracción equivocada o un artículo ajeno. Cero: avala una cláusula ilegal.
- **Evidencia de búsqueda web:** ChatGPT y Claude mostraron enlaces de búsqueda en los cinco casos y citaron reformas de 2025 y 2026: LFPC, LMTR y su nueva Comisión Reguladora de Telecomunicaciones (CRT), LFT y la sentencia de la SCJN sobre el tope a las rentas. Gemini respondió sin enlaces ni trazas visibles y citó numerales de memoria. El diseño no permite aislar cuánto pesó la búsqueda frente al entrenamiento.
- **Conflictos de interés:** Claude es modelo evaluado y también calificó el material. Gemini es modelo evaluado y también auditó los datos. Por eso el CSV con los 15 diagnósticos y las citas evaluadas queda abierto para auditoría pública.
- **Alcance:** cinco fragmentos sintéticos, no contratos completos. No sustituye a un abogado. No registramos la versión exacta de cada modelo. No verificamos cada numeral contra el DOF.

## Evidencia

Un 2 significa que el modelo detectó las dos trampas y las fundamentó bien. Un 1 significa que las detectó, pero el sustento legal falla.

<table>
  <thead>
    <tr><th>Caso</th><th>ChatGPT</th><th>Claude</th><th>Gemini</th></tr>
  </thead>
  <tbody>
    <tr><td>C01 Renta CDMX</td><td><strong>2</strong>. Art. 2448-D y SCJN. Fecha la reforma en 2026 y no en 2024.</td><td><strong>2</strong>. Art. 2448-D, tope de inflación y derecho del tanto.</td><td><strong>2</strong>. Arts. 2448-D, 2395, 2397 y 2448-J.</td></tr>
    <tr><td>C02 Gimnasio</td><td><strong>2</strong>. Arts. 85 y 90 fr. II de la LFPC; reforma de suscripciones.</td><td><strong>2</strong>. Arts. 85 y 90 sin fracciones; avisa que no verificó los números.</td><td><strong>1</strong>. Fracciones del Art. 90 mal numeradas.</td></tr>
    <tr><td>C03 Tarjeta</td><td><strong>2</strong>. Arts. 7 y 18 Bis 3 de la LTOSF.</td><td><strong>2</strong>. Sin numerales de la LTOSF; lo admite.</td><td><strong>2</strong>. Sin numerales de la LTOSF.</td></tr>
    <tr><td>C04 Trabajo</td><td><strong>2</strong>. Arts. 5, 33, 97 y 110 de la LFT.</td><td><strong>2</strong>. Mismos artículos; marca los que cita de memoria.</td><td><strong>1</strong>. Atribuye al Art. 133 la prohibición del pagaré en blanco.</td></tr>
    <tr><td>C05 Internet</td><td><strong>2</strong>. LMTR arts. 185 y 186; NOM-184.</td><td><strong>2</strong>. LMTR y Art. 90 de la LFPC.</td><td><strong>1</strong>. Cita la LFTR abrogada, al IFT sin la CRT y fracciones mal numeradas.</td></tr>
    <tr><td><strong>Total</strong></td><td><strong>10/10</strong></td><td><strong>10/10</strong></td><td><strong>7/10</strong></td></tr>
  </tbody>
</table>

El detalle fila por fila, con el diagnóstico de cada error, viene en el CSV abierto.

## Lectura editorial

**1. Detectar ya no es el problema.** Los tres identificaron las 10 cláusulas abusivas en su sentido práctico: aumento de renta fijo, desalojo por propia mano, cancelación absurda, descuentos al salario, renuncia a PROFECO. Cualquiera te dice que "eso no se vale". Incluso en los casos donde un modelo se equivocó de artículo, nunca avaló una cláusula ilegal. En estos cinco fragmentos preparados, ninguno avaló una cláusula abusiva; sirven como primer filtro de alerta, no como revisión de un contrato completo.

**2. La brecha está en el fundamento vigente.** ChatGPT y Claude incorporaron que la LFTR se abrogó en julio de 2025 y que en diciembre de 2025 se reformó el Art. 76 Bis de la LFPC para suscripciones con cobro recurrente. Gemini citó la ley abrogada, mencionó al IFT sin aclarar que lo sustituyó la CRT y confundió fracciones del Art. 90 de la LFPC. En C05 apoyó su análisis en la LFTR, que ya no rige, cuando la ley vigente es la LMTR. Le atribuyó al Art. 90 fracciones que tratan de otros temas, como los plazos de prescripción, e invocó el numeral 5.2.15 de la NOM-184 para limitar penas de cancelación, cuando ese numeral regula la devolución de anticipos. La conclusión era correcta. El sustento, no. Y quien lo cite en una queja ante PROFECO lo paga.

**3. Admitir que no tienes el numeral vale más que adivinarlo.** En C02 y C03 Claude escribió que no pudo verificar los números de artículo y pidió confirmarlos. Gemini presentó con seguridad fracciones que no corresponden. Un "no lo verifiqué" cuesta un minuto de revisión. Una fracción equivocada puede costar tu argumento. Esa diferencia de actitud separa a un asistente útil de uno que solo suena seguro, y pesa más que un punto de diferencia en la tabla.

**Regla práctica:** usa a la IA para saber qué cláusula huele mal, pero verifica el artículo en la Cámara de Diputados o el DOF antes de citarlo. Pregunta también la fecha de la reforma: una ley puede haberse abrogado y la respuesta seguirla citando. Si la respuesta no trae fuentes ni admite dudas, trátala como borrador, no como dictamen.

## Datos abiertos y conexión interna

- Descarga el [CSV de los 15 casos](/datos/laboratorio-08-letra-chiquita-contratos-mexico.csv) (licencia CC BY 4.0).
- Para elegir modelo según lo que necesitas, usa [¿Qué IA me conviene?](/que-ia-me-conviene/).
- Mismo patrón con citas y enlaces: [Experimento 07, citas y enlaces inventados por IA en 2026](/laboratorio/citas-y-enlaces-inventados-por-ia-2026/).

---
title: "Claude, ChatGPT y Gemini empatan en 11/12 al citar fuentes: 0 respuestas 404 en 50 URLs, pero aún confunden documentos y fechas"
description: "En seis casos de citas y enlaces verificables de 2025 y 2026, los tres chats de IA sacaron 11 de 12, ninguna de las 50 URLs dio 404 y los tres rechazaron una ley mexicana inexistente."
kicker: "Laboratorio · Experimento 07"
experimento: 7
pubDate: 2026-11-17
heroImage: /images/laboratorio/laboratorio-07-citas-enlaces-inventados-2026/hero.webp
heroImageAlt: "Cajón de un fichero de biblioteca con una ficha traslúcida luminosa entre las demás, inspeccionada con una lupa de latón."
csv: /datos/laboratorio-07-citas-enlaces-inventados-2026.csv
seoTitle: "Citas y enlaces de IA en 2026: 0 de 50 URLs dieron 404"
nota: modelos
roles: "Claude armó los datos y calificó; Claude Code verificó las URLs; Gemini diseñó el protocolo y audita; ChatGPT hizo una revisión ciega."
draft: false
---

## Resumen ejecutivo

- **Qué probamos:** si tres chats de IA inventan citas, registros o enlaces cuando se les piden fuentes verificables de 2025 y 2026, incluida una ley mexicana que no existe. Esperábamos que sin búsqueda fabricaran URLs plausibles y que con búsqueda cayeran en notas secundarias. Lo segundo se cumplió; lo primero, no.
- **Qué encontramos:** los tres sacaron 11 de 12. Cero respuestas 404 en las 50 URLs (dos quedaron ilegibles por un firewall) y los tres rechazaron la ley falsa. Los puntos perdidos fueron de atribución y de fecha, no de enlaces.
- **Qué significa:** el riesgo ya no es el enlace roto, sino el documento equivocado dentro de una fuente real. Abrir el enlace sigue siendo trabajo tuyo.

## Protocolo y límites

Hicimos 18 ejecuciones (6 casos × 3 modelos) en chats nuevos el 17 de noviembre de 2026, una respuesta por chat, sin repreguntas ni pistas.

- **Verificación:** ese mismo día revisamos las 50 URLs entregadas con curl y un identificador de navegador; los captchas, las páginas dinámicas y los PDF escaneados, además en navegador. Resultado: 28 son documentos primarios exactos, 1 es el proyecto de sentencia previo al engrose (ChatGPT), 1 es una tesis oficial citada como precedente indirecto (Gemini), 16 son notas o despachos de terceros, 2 son páginas genéricas y 2 quedaron bloqueadas por el firewall de la SCJN sin poder leerse. Cero dieron 404. Cuatro enlaces a `www.dof.gob.mx` cargan con certificado inválido: solo vale para `dof.gob.mx`. En la tabla los enlazamos sin `www`.
- **Búsqueda web:** Claude y ChatGPT la usaron en los seis casos (en ChatGPT lo inferimos por sus chips de fuente y por los parámetros `utm` de sus enlaces). Gemini no mostró búsqueda en ninguno y en C02 admitió que no buscó.
- **Rúbrica:** 2 puntos con dato y URLs exactos (o con rechazo limpio de la ley falsa), 1 si hay un error parcial, 0 si inventa un enlace, un registro o un decreto. La escala mide recuperación exacta (C01–C05) y resistencia a premisas falsas (C06). Máximo: 12 por modelo.
- **Quién calificó:** Claude, también sujeto de prueba, armó el CSV; Claude Code verificó las URLs y Gemini auditó los puntajes. Versiones: interfaz web estándar, sin número de compilación.
- **Huella de memoria de cuenta:** las ejecuciones corrieron en cuentas personales, no anónimas, con contexto del usuario: Gemini saludó por nombre en C01 y C06 y en C06 adivinó la prueba; Claude mencionó glitchMentalMX y ofreció abrir Chrome. No sabemos cuánto pesó; una cuenta anónima podría dar otro resultado.
- **Alcance:** seis casos, un día, una respuesta por chat. No es una tasa general de alucinación.

## Evidencia

<table>
<caption>Seis casos × tres modelos, 17 de noviembre de 2026. Negritas: puntaje 0–2; después, URLs entregadas por clase. Las 50 están en el CSV.</caption>
<thead><tr><th>Caso</th><th>Claude</th><th>ChatGPT</th><th>Gemini</th></tr></thead>
<tbody>
<tr><td>C01 Decreto en el DOF</td>
<td><strong>1</strong> · 6 URLs (4 exactas). <a href="https://dof.gob.mx/nota_detalle.php?codigo=5786537&amp;fecha=01/05/2026">DOF 5786537</a>. Primer párrafo correcto, pero sacado de N+: no pudo leer el DOF y lo dijo.</td>
<td><strong>2</strong> · 3 URLs (3 exactas). <a href="https://dof.gob.mx/nota_detalle_popup.php?codigo=5786537">DOF 5786537</a>. Primer párrafo correcto.</td>
<td><strong>2</strong> · 2 URLs (2 exactas). <a href="https://dof.gob.mx/nota_detalle_popup.php?codigo=5786537">DOF 5786537</a>. Su «primer párrafo» abarca tres oraciones.</td></tr>
<tr><td>C02 Cita APA del informe de Anthropic</td>
<td><strong>2</strong> · 4 URLs (4 exactas). <a href="https://arxiv.org/abs/2503.04761">arXiv</a>, <a href="https://www.anthropic.com/research/the-anthropic-economic-index">post</a>. Dos citas coherentes con su fuente.</td>
<td><strong>2</strong> · 2 URLs (2 exactas). <a href="https://doi.org/10.48550/arXiv.2503.04761">DOI</a>. Cita del paper y fechas correctas.</td>
<td><strong>1</strong> · 2 URLs (2 exactas). <a href="https://arxiv.org/abs/2503.04761">arXiv</a>, <a href="https://www.anthropic.com/research/the-anthropic-economic-index">post</a>. Pegó los 15 autores del paper al post, que no los tiene.</td></tr>
<tr><td>C03 Población ocupada, INEGI</td>
<td><strong>2</strong> · 4 URLs (1 exacta, 1 genérica, 2 notas). <a href="https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/enoe/enoe2026_02.pdf">boletín 97/26</a>. 59.8 millones; 59,785,854 está en el PDF.</td>
<td><strong>2</strong> · 1 URL (1 exacta). <a href="https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/enoe/enoe2026_02.pdf">boletín 97/26</a>. Cifra y fecha correctas, redondeada.</td>
<td><strong>2</strong> · 2 URLs (2 exactas). <a href="https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/enoe/enoe2026_02.pdf">boletín 97/26</a>. Cifra y fecha correctas.</td></tr>
<tr><td>C04 Tesis de la SCJN sobre IA</td>
<td><strong>2</strong> · 5 URLs (1 exacta, 3 notas, 1 bloqueada). <a href="https://www2.scjn.gob.mx/juridica/engroses/2/2025/1/2_346361_7265_firmado.pdf">engrose firmado</a>. AD 6/2025, 2 de julio, sin registro inventado.</td>
<td><strong>1</strong> · 2 URLs (1 al proyecto, 1 bloqueada). <a href="https://www.scjn.gob.mx/sites/default/files/listas/documento_dos/2025-06/AD%206-2025.pdf">proyecto</a>. Dio 14 de julio (fue el 2) y enlazó al proyecto.</td>
<td><strong>2</strong> · 1 URL (precedente indirecto). <a href="https://sjf2.scjn.gob.mx/detalle/tesis/2024373">tesis 2024373</a>. Aclaró que no hay tesis de IA, citó el AD 6/2025 (2 de julio) y añadió esta tesis real explicando su alcance indirecto.</td></tr>
<tr><td>C05 Artículo del reglamento europeo de IA</td>
<td><strong>2</strong> · 6 URLs (3 exactas, 3 de terceros). <a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj/spa">EUR-Lex</a>. Artículo 50; avisó que no pudo abrir EUR-Lex.</td>
<td><strong>2</strong> · 1 URL (1 exacta). <a href="https://eur-lex.europa.eu/legal-content/ES/TXT/HTML/?uri=CELEX:02024R1689-20260727">consolidado</a>. Artículo 50; omite el apartado 3.</td>
<td><strong>2</strong> · 2 URLs (2 exactas). <a href="https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/spa">consolidado</a>. Artículo 50, apartados 1, 2 y 4.</td></tr>
<tr><td>C06 Ley inexistente</td>
<td><strong>2</strong> · 4 URLs de contexto, ninguna del decreto. Rechaza la ley.</td>
<td><strong>2</strong> · 3 URLs de contexto (2 iniciativas, 1 índice del DOF). Rechaza la ley.</td>
<td><strong>2</strong> · Sin URL. Rechaza la ley y sospecha de la prueba.</td></tr>
<tr><td><strong>Total</strong></td><td><strong>11/12</strong> · 29 URLs</td><td><strong>11/12</strong> · 12 URLs</td><td><strong>11/12</strong> · 9 URLs</td></tr>
</tbody>
</table>

## Lectura editorial

**1. El «404 automático» quedó atrás en consultas directas.** En esta prueba nadie inventó un dominio ni un folio, ni siquiera Gemini, que respondió sin buscar. Con fuentes identificables de 2025 y 2026, la URL sale bien. Los tres rechazaron la ley de C06 sin dar número ni URL del decreto. Seis casos no hacen una tasa de alucinación, pero sí desinflan el «la IA siempre inventa links».

**2. El error de 2026 es el documento equivocado dentro de la fuente correcta.** ChatGPT enlazó al *proyecto* de sentencia del AD 6/2025 en vez del engrose firmado y falló por 12 días la fecha: dijo 14 de julio y fue el 2. Gemini pegó los 15 autores del paper de arXiv al título, la fecha y la URL del post de Anthropic. Claude citó el primer párrafo del artículo 66 desde un portal de noticias porque no pudo leer el DOF; el texto salió bien y avisó de dónde lo sacó. Todos los enlaces cargan, y aun así la cita falla.

**3. Entregar más enlaces no dio mejor puntaje en esta muestra.** Gemini empató en 11/12 con 9 URLs y sin búsqueda evidente en ese turno (lo avisó en C02). Claude entregó 29, 14 de ellas notas de terceros, y ChatGPT 12, con parámetros `utm` en sus enlaces. El diseño no permite aislar cuánto pesó la memoria de cuenta frente a la búsqueda activa.

**Qué hacer con esto:** abre el enlace, confirma que sea el documento (no el proyecto, no el post) y revisa la fecha.

## Datos abiertos y conexión interna

[CSV abierto](/datos/laboratorio-07-citas-enlaces-inventados-2026.csv) (licencia CC BY 4.0), con las 18 calificaciones, las URLs y el diagnóstico de cada una. Para elegir herramienta según lo que necesitas, usa el [Recomendador](/que-ia-me-conviene/). Otra prueba del Laboratorio: [precisión fiscal y laboral con IA en México](/laboratorio/calculo-fiscal-y-laboral-con-ia-en-mexico/).

Además publicamos [las respuestas íntegras de los modelos y los prompts](/datos/laboratorio-07-citas-enlaces-inventados-2026-respuestas.md) (licencia CC BY 4.0), para que recalifiques sin fiarte de nuestro puntaje.

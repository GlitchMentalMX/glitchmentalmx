# Respuestas íntegras — Experimento 11: Español mexicano real frente a traducción robótica

Datos abiertos de [glitchMentalMX](https://glitchmental.com/) · Licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es)

- **Pieza:** https://glitchmental.com/laboratorio/espanol-mexicano-vs-traduccion-robotica/
- **CSV de resultados codificados:** https://glitchmental.com/datos/laboratorio-11-espanol-mexicano-vs-traduccion-robotica.csv
- **Ejecución:** 2026-11-18, interfaz web estándar de cada modelo (ChatGPT, Claude y Gemini), un chat nuevo por caso y una sola respuesta, sin repreguntas. 45 respuestas (3 modelos × 15 tareas).
- **Qué es este archivo:** el texto que devolvió cada modelo, tal como salió, para que puedas verificar o recalificar sin fiarte de nuestro puntaje. Solo se cambió el formato (de la interfaz web a Markdown) y se normalizaron los espacios en blanco. Las palabras y las URL no se editaron.
- **Convenciones:** se conservan las notas del modelo, las etiquetas de interfaz (`Plaintext`) y los botones sugeridos que quedaron pegados al texto. En T06 a T10 se incluye además el «texto aislado»: el mensaje sin saludos de chat, asunto, firma ni notas, sobre el que se contaron las palabras con un script de Python.
- **Memoria de cuenta:** las pruebas corrieron en las cuentas del editor, no en cuentas anónimas. Las piezas 07, 10 y 11 documentan huella de memoria en algunas respuestas (por ejemplo, un saludo por nombre); cada pieza declara en «Protocolo y límites» lo que encontramos.

## Prompts usados

### T01 — Correo corporativo (trampas: *make sense*, *on the same page*, *reach out*)

````text
Traduce y adapta este correo al español de México para enviarlo a un cliente en Ciudad de México, sin que suene traducido del inglés:

'Hi Carlos, just reaching out to make sure we are on the same page before tomorrow's call. Does it make sense to push the launch to Friday so your team can double-check the billing flow?'
````

### T02 — Vacante laboral tecnológica (trampas: *apply for*, *laptop*, *remote*)

````text
Adapta este anuncio de empleo al español de México para candidatos en Guadalajara y Monterrey:

'We are looking for a Senior Data Analyst to apply for this full-time role. You will get a company laptop, health insurance, and flexible remote work. Please submit your resume before Friday.'
````

### T03 — Nota de prensa de evento (trampas: *take place*, *address*, *attendees*)

````text
Traduce esta nota breve al español periodístico de México:

'The annual cybersecurity summit will take place next Tuesday in Querétaro. Speakers will address new banking fraud schemes and share practical tools with over 400 attendees.'
````

### T04 — Soporte técnico / interfaz (trampas: *cell phone*, *folder*, *settings*, *tap*)

````text
Adapta estas instrucciones de ayuda al español de México para usuarios de una app bancaria:

'Open Settings on your cell phone, tap the Security folder, and turn off automatic backups over cellular data so you don't run out of storage.'
````

### T05 — Reseña crítica de software (trampas: *at the end of the day*, *game changer*, *clunky*)

````text
Traduce este párrafo de opinión al español editorial de México, directo y sin clichés:

'The new interface looks sleek, but at the end of the day the workflow feels clunky. It is definitely not the game changer the company promised during its keynote.'
````

### T06 — Correo formal de seguimiento a proveedor

````text
Redacta un correo breve (máximo 60 palabras) en español profesional de México para recordarle a un proveedor en Puebla que su factura tiene 10 días de vencida y pedirle fecha exacta de entrega del material.
````

### T07 — Aviso vecinal en condominio

````text
Redacta un aviso breve (máximo 55 palabras) para el grupo de WhatsApp de un condominio en Querétaro avisando que mañana jueves habrá corte de agua de 9:00 a 15:00 horas por mantenimiento de la cisterna.
````

### T08 — Atención a cliente por envío retrasado

````text
Redacta una respuesta de soporte (máximo 60 palabras) en español de México para un cliente cuya paquetería lleva tres días detenida en centro de distribución, ofreciéndole rastreo actualizado o reembolso inmediato.
````

### T09 — Reseña cotidiana de restaurante / fonda

````text
Escribe una reseña breve (máximo 60 palabras) en español cotidiano de México sobre una comida corrida en la colonia Roma donde la sopa y el guisado estuvieron muy buenos, pero el servicio tardó 40 minutos.
````

### T10 — Mensaje corto entre colegas de trabajo

````text
Escribe un mensaje de Slack (máximo 40 palabras) en español natural de México para avisarle a tu equipo que se cayó el servidor de pruebas y que la junta de las 11 se recorre media hora.
````

### T11 — Texto contaminado con peninsularismos

````text
Reescribe este párrafo en español neutro de México, eliminando cualquier regionalismo de otros países:

'Si coges el autobús hacia el centro, recuerda llevar el móvil cargado porque os enviaremos el código QR al correo. Si tenéis algún problema con el fichero adjunto, avisadnos antes de las seis.'
````

### T12 — Texto contaminado con rioplatensismos

````text
Reescribe este párrafo en español natural de México, eliminando cualquier regionalismo de otros países:

'Che, fijate si podés mandarme la planilla actualizada antes del mediodía porque el cliente está re apurado y no queremos quedar mal con la entrega.'
````

### T13 — Texto contaminado con anglicismos corporativos

````text
Reescribe este párrafo en español claro y natural de México, sustituyendo los anglicismos innecesarios sin perder precisión:

'Necesitamos hacer un double-check del deck antes de pitchearlo al board, porque el feedback del último quarter mostró que nuestro churn rate sigue alto.'
````

### T14 — Texto con calcos sintácticos del inglés

````text
Reescribe este párrafo para que suene como español mexicano bien escrito y no como una traducción literal del inglés:

'El evento tomará lugar el próximo mes y está supuesto a reunir a cien expertos. Al final del día, lo que hace más sentido es enfocarnos en soluciones que realmente trabajen para las pymes.'
````

### T15 — Instrucción legal/administrativa traducida

````text
Reescribe este aviso en español administrativo claro de México:

'Para aplicar por una devolución de impuestos, el aplicante debe proveer su identificación oficial y un estado de cuenta bancario no mayor a tres meses de antigüedad.'
````

## Respuestas

## ChatGPT

### ChatGPT · T01

````text
Hola, Carlos:
Te escribo para asegurarnos de que estemos alineados antes de la llamada de mañana. ¿Te parece conveniente mover el lanzamiento al viernes para que tu equipo pueda revisar una vez más el proceso de facturación?
Quedo atento a tus comentarios.
Saludos,
Criterio de adaptación: Suena natural en un contexto profesional mexicano, mantiene un tono cordial y directo, y evita calcos como «estar en la misma página» (be on the same page).
````

### ChatGPT · T02

````text
¡Estamos contratando! Senior Data Analyst
Buscamos un Senior Data Analyst (Analista de Datos Senior) para integrarse a nuestro equipo de tiempo completo.
¿Qué ofrecemos?
    • Computadora portátil proporcionada por la empresa.
    • Seguro de gastos médicos.
    • Esquema de trabajo remoto flexible.
¿Te interesa?
Envía tu CV antes del viernes para participar en el proceso de selección.
Ubicación: Guadalajara o Monterrey.
Nota de adaptación: Utilicé «CV» en lugar de «resume», «seguro de gastos médicos» para darle mayor claridad al beneficio y un tono profesional natural para candidatos en México.
````

### ChatGPT · T03

````text
La cumbre anual de ciberseguridad se llevará a cabo el próximo martes en Querétaro. Durante el encuentro, los ponentes abordarán nuevas modalidades de fraude bancario y compartirán herramientas prácticas con más de 400 asistentes.
````

### ChatGPT · T04

````text
Abre Configuración en tu celular, entra a la carpeta Seguridad y desactiva las copias de seguridad automáticas mediante datos móviles para evitar que se agote tu espacio de almacenamiento.
````

### ChatGPT · T05

````text
La nueva interfaz tiene un diseño atractivo, pero en la práctica el flujo de trabajo resulta torpe y poco funcional. Está lejos de ser la revolución que la empresa prometió durante su presentación.
````

### ChatGPT · T06

````text
Buen día:
Le escribo para dar seguimiento a la factura pendiente, que registra 10 días de vencimiento. Asimismo, agradeceré que me confirme la fecha exacta en que realizará la entrega del material.
Quedo atento a su respuesta para dar seguimiento a ambos pendientes.
Saludos cordiales.
Haz más firme el seguimiento del pagoPide una fecha concreta de respuesta
````

**Texto aislado — ChatGPT T06**

````texto-aislado
Buen día:
Le escribo para dar seguimiento a la factura pendiente, que registra 10 días de vencimiento. Asimismo, agradeceré que me confirme la fecha exacta en que realizará la entrega del material.
Quedo atento a su respuesta para dar seguimiento a ambos pendientes.
Saludos cordiales.
````

Palabras (Python): **45** / límite 60 · cumple: **Sí**

### ChatGPT · T07

````text
AVISO IMPORTANTE
Se informa a los residentes que mañana jueves habrá suspensión del suministro de agua de 9:00 a 15:00 horas, debido a trabajos de mantenimiento de la cisterna.
Les recomendamos tomar sus precauciones y almacenar agua suficiente. Gracias por su comprensión.
Cambiar "mañana jueves" por "este jueves"
````

**Texto aislado — ChatGPT T07**

````texto-aislado
AVISO IMPORTANTE
Se informa a los residentes que mañana jueves habrá suspensión del suministro de agua de 9:00 a 15:00 horas, debido a trabajos de mantenimiento de la cisterna.
Les recomendamos tomar sus precauciones y almacenar agua suficiente. Gracias por su comprensión.
````

Palabras (Python): **42** / límite 55 · cumple: **Sí**

### ChatGPT · T08

````text
Hola, lamentamos el retraso de tu paquete. Sabemos que lleva tres días sin movimiento en el centro de distribución y entendemos las molestias que esto ocasiona. Podemos ofrecerte el rastreo actualizado de tu envío o, si lo prefieres, gestionar tu reembolso inmediato. ¿Qué opción te resulta más conveniente?
Haz más directa la opción de reembolsoAñade un plazo para actualizar el rastreo
````

**Texto aislado — ChatGPT T08**

````texto-aislado
Hola, lamentamos el retraso de tu paquete. Sabemos que lleva tres días sin movimiento en el centro de distribución y entendemos las molestias que esto ocasiona. Podemos ofrecerte el rastreo actualizado de tu envío o, si lo prefieres, gestionar tu reembolso inmediato. ¿Qué opción te resulta más conveniente?
````

Palabras (Python): **48** / límite 60 · cumple: **Sí**

### ChatGPT · T09

````text
La comida corrida está muy bien servida: tanto la sopa como el guisado estuvieron buenísimos, con buen sazón y porciones adecuadas. Lo malo fue el servicio, tuvimos que esperar 40 minutos para que nos atendieran. Si mejoran los tiempos, sería un lugar bastante recomendable en la Roma.
````

**Texto aislado — ChatGPT T09**

````texto-aislado
La comida corrida está muy bien servida: tanto la sopa como el guisado estuvieron buenísimos, con buen sazón y porciones adecuadas. Lo malo fue el servicio, tuvimos que esperar 40 minutos para que nos atendieran. Si mejoran los tiempos, sería un lugar bastante recomendable en la Roma.
````

Palabras (Python): **47** / límite 60 · cumple: **Sí**

### ChatGPT · T10

````text
Equipo, se cayó el servidor de pruebas. Estamos revisando qué pasó. La junta de las 11 se recorre media hora, así que arrancamos a las 11:30. Les aviso si hay algún cambio.
Hazlo más claro y directoAñade una disculpa breveAclara qué junta se recorre
````

**Texto aislado — ChatGPT T10**

````texto-aislado
Equipo, se cayó el servidor de pruebas. Estamos revisando qué pasó. La junta de las 11 se recorre media hora, así que arrancamos a las 11:30. Les aviso si hay algún cambio.
````

Palabras (Python): **32** / límite 40 · cumple: **Sí**

### ChatGPT · T11

````text
Si tomas el autobús hacia el centro, recuerda llevar el celular cargado porque te enviaremos el código QR por correo electrónico. Si tienes algún problema con el archivo adjunto, avísanos antes de las seis.
````

### ChatGPT · T12

````text
Oye, revisa si puedes enviarme la hoja de cálculo actualizada antes del mediodía, porque el cliente tiene mucha prisa y no queremos quedar mal con la entrega.
Hazlo más profesional sin perder cercaníaAclara quién debe enviar la hoja
````

### ChatGPT · T13

````text
Necesitamos revisar dos veces la presentación antes de exponerla ante el consejo directivo, porque los comentarios del último trimestre mostraron que nuestra tasa de cancelación de clientes sigue siendo alta.
````

### ChatGPT · T14

````text
El evento se llevará a cabo el próximo mes y se espera que reúna a cien especialistas. En definitiva, lo más conveniente es centrarnos en soluciones que realmente funcionen para las pequeñas y medianas empresas.
````

### ChatGPT · T15

````text
Para solicitar una devolución de impuestos, la persona interesada deberá presentar una identificación oficial vigente y un estado de cuenta bancario con una antigüedad no mayor a tres meses.
````


## Claude

### Claude · T01

````text
Hola, Carlos:

Te escribo para que mañana lleguemos a la llamada con todo alineado. ¿Qué te parece si movemos el lanzamiento al viernes? Así tu equipo tendría tiempo de revisar con calma el flujo de cobro.

Quedo atento.
Notas rápidas:
    • Cobro vs. facturación: puse "flujo de cobro" porque en México "facturación" suele entenderse como emisión de facturas (CFDI). Si el billing flow sí se refiere a facturas, cambia a "flujo de facturación".
    • Tú vs. usted: usé "tú" por el "Hi Carlos", que es informal. Si la relación es más formal, cámbialo así:
Estimado Carlos:

Le escribo para que mañana lleguemos a la llamada con todo alineado. ¿Qué le parece si movemos el lanzamiento al viernes? Así su equipo tendría tiempo de revisar con calma el flujo de cobro.

Quedo atento.
````

### Claude · T02

````text
Buscamos Analista de Datos Sr. para integrarse a nuestro equipo de tiempo completo.

Te ofrecemos:
• Laptop de la empresa
• Seguro de gastos médicos
• Trabajo remoto flexible

¿Te interesa? Envía tu CV antes del viernes.
Decisiones de adaptación:
    • "Analista de Datos Sr." es como se publica el puesto en México. "Senior" suelto casi no se usa en títulos en español.
    • "Seguro de gastos médicos" es el término mexicano estándar. "Seguro de salud" suena a traducción literal. Si es el plan completo, la fórmula usual es "seguro de gastos médicos mayores", pero no lo puse porque el original no lo especifica.
    • "CV" es lo que se usa en México. "Currículum" funciona, pero se ve más formal.
    • "Laptop" se queda así. Es lo normal en vacantes mexicanas, y "computadora portátil" suena acartonado.
    • Tuteo ("Envía tu CV"): es el tono habitual en vacantes de tecnología en GDL y MTY. Si la empresa es más corporativa, cambia a "Envíe su CV".
Dos detalles para reforzar el anuncio, si aplican:
    • Pon la fecha exacta ("antes del viernes 21 de noviembre"). "Viernes" a secas deja dudas.
    • Aclara si "remoto flexible" significa 100% remoto o híbrido con oficina en GDL/MTY. Es la primera pregunta que hará cualquier candidato de esas ciudades.
````

### Claude · T03

````text
La cumbre anual de ciberseguridad se realizará el próximo martes en Querétaro. Los ponentes abordarán los nuevos esquemas de fraude bancario y compartirán herramientas prácticas con más de 400 asistentes.
Elegí "se realizará" en lugar de "tendrá lugar" porque suena más natural en una nota mexicana. Y "esquemas de fraude" es el término más común en prensa financiera de aquí, aunque "modalidades de fraude" también funciona si buscas un tono más formal.
````

### Claude · T04

````text
Abre Configuración en tu celular, entra a la sección Seguridad y desactiva el respaldo automático con datos móviles para que no te quedes sin espacio de almacenamiento.
Elegí "celular" en lugar de "móvil" porque es lo que se usa en México. "Datos móviles" es el término estándar en los menús de Android y iOS. Cambié "folder" por "sección", porque en los ajustes de un teléfono no se habla de carpetas. Usé tuteo, que es lo habitual en las apps bancarias mexicanas. Si tu app habla de usted, quedaría así:
Abra Configuración en su celular, entre a la sección Seguridad y desactive el respaldo automático con datos móviles para que no se quede sin espacio de almacenamiento.
Un detalle: el motivo ("para no quedarte sin espacio") suena raro en una app bancaria, porque los respaldos por datos móviles suelen preocupar más por el consumo del plan que por el almacenamiento. Si el texto original lo dice en serio, la traducción es fiel. Si no, conviene revisarlo con quien lo redactó.
````

### Claude · T05

````text
La nueva interfaz se ve pulida, pero el flujo de trabajo es torpe. Y está lejos de ser la revolución que la empresa prometió en su presentación.
Dejé fuera "al final del día" y "game changer", que son muletillas. "Revolución" funciona porque el original ya ironiza sobre la promesa. Si prefieres un tono más seco, "el salto que prometió" también sirve. Usé "presentación" en vez de "keynote" para no meter anglicismos innecesarios, pero si tu sección usa "keynote" de forma habitual, es un cambio de una palabra.
````

### Claude · T06

````text
Asunto: Factura vencida y fecha de entrega del material

Estimado [Nombre]:

Le recuerdo que la factura [folio] tiene 10 días de vencida. Le agradeceré regularizarla a la brevedad.

Asimismo, le solicito confirmarme la fecha exacta de entrega del material pendiente.

Quedo atento a su respuesta.

Saludos cordiales,
Jorge A. Diaz Elizondo
GlitchMentalMX
Son unas 45 palabras en el cuerpo. Sustituye [Nombre] y [folio] antes de enviarlo. Si quieres un tono más firme, cambia "Le agradeceré regularizarla a la brevedad" por "Requiero que se regularice esta semana".
````

**Texto aislado — Claude T06**

````texto-aislado
Estimado [Nombre]:
Le recuerdo que la factura [folio] tiene 10 días de vencida. Le agradeceré regularizarla a la brevedad.
Asimismo, le solicito confirmarme la fecha exacta de entrega del material pendiente.
Quedo atento a su respuesta.
Saludos cordiales,
````

Palabras (Python): **38** / límite 60 · cumple: **Sí**

### Claude · T07

````text
📢 *Aviso importante*

Mañana jueves 19 de noviembre habrá corte de agua de 9:00 a 15:00 horas por mantenimiento de la cisterna.

Les recomendamos almacenar agua con anticipación. Gracias por su comprensión.
Son unas 31 palabras. Si quieres firmarlo, agrega al final "— La administración".
````

**Texto aislado — Claude T07**

````texto-aislado
📢 *Aviso importante*
Mañana jueves 19 de noviembre habrá corte de agua de 9:00 a 15:00 horas por mantenimiento de la cisterna.
Les recomendamos almacenar agua con anticipación. Gracias por su comprensión.
````

Palabras (Python): **31** / límite 55 · cumple: **Sí**

### Claude · T08

````text
Hola, gracias por escribirnos. Revisamos tu envío y, en efecto, lleva tres días detenido en el centro de distribución. Lamentamos el retraso. Puedes elegir: 1) te mandamos hoy un rastreo actualizado con la ubicación real de tu paquete, o 2) te hacemos el reembolso inmediato. Respóndenos con tu opción y lo resolvemos de inmediato.
(57 palabras)
````

**Texto aislado — Claude T08**

````texto-aislado
Hola, gracias por escribirnos. Revisamos tu envío y, en efecto, lleva tres días detenido en el centro de distribución. Lamentamos el retraso. Puedes elegir: 1) te mandamos hoy un rastreo actualizado con la ubicación real de tu paquete, o 2) te hacemos el reembolso inmediato. Respóndenos con tu opción y lo resolvemos de inmediato.
````

Palabras (Python): **54** / límite 60 · cumple: **Sí**

### Claude · T09

````text
Comida corrida en la Roma: la sopa estuvo buenísima y el guisado, todavía mejor, bien sazonado y con buena porción. El problema fue el servicio: 40 minutos para que nos atendieran. Si no traes prisa, vale la pena; si sales de la chamba con una hora, mejor ve a otro lado.
Son 51 palabras. Si quieres un tono más ácido, o con calificación en estrellas, te la ajusto.
````

**Texto aislado — Claude T09**

````texto-aislado
Comida corrida en la Roma: la sopa estuvo buenísima y el guisado, todavía mejor, bien sazonado y con buena porción. El problema fue el servicio: 40 minutos para que nos atendieran. Si no traes prisa, vale la pena; si sales de la chamba con una hora, mejor ve a otro lado.
````

Palabras (Python): **51** / límite 60 · cumple: **Sí**

### Claude · T10

````text
Equipo, se cayó el servidor de pruebas y ya lo estamos revisando. La junta de las 11 se recorre media hora: arrancamos a las 11:30. Les aviso en cuanto esté arriba de nuevo.
Son 33 palabras. Si prefieres un tono más relajado, cambia "Equipo" por "Raza" o "Gente".
````

**Texto aislado — Claude T10**

````texto-aislado
Equipo, se cayó el servidor de pruebas y ya lo estamos revisando. La junta de las 11 se recorre media hora: arrancamos a las 11:30. Les aviso en cuanto esté arriba de nuevo.
````

Palabras (Python): **33** / límite 40 · cumple: **Sí**

### Claude · T11

````text
Si toman el camión hacia el centro, recuerden llevar el celular cargado, porque les enviaremos el código QR por correo. Si tienen algún problema con el archivo adjunto, avísennos antes de las seis.
Cambios:
    • "coges" por "toman". En México "coger" es vulgar, y aquí además unifiqué el trato: el original mezclaba "coges" (tú) con "os/tenéis" (vosotros).
    • "autobús" por "camión", que es lo habitual en México.
    • "móvil" por "celular".
    • "os enviaremos" por "les enviaremos", "tenéis" por "tienen" y "avisadnos" por "avísennos".
    • "fichero" por "archivo".
    • "al correo" por "por correo".
Si el mensaje va dirigido a una sola persona, dime y lo paso a "tú".
````

### Claude · T12

````text
Oye, fíjate si me puedes mandar la hoja de cálculo actualizada antes del mediodía, porque el cliente anda muy presionado y no queremos quedar mal con la entrega.
Cambios principales:
    • "Che" pasó a "Oye", que es el vocativo natural en México.
    • "fijate si podés" (voseo) pasó a "fíjate si me puedes".
    • "planilla" pasó a "hoja de cálculo". En México casi nadie dice "planilla" para eso.
    • "re apurado" pasó a "muy presionado". Otra opción es "con mucha prisa".
Si quieres un tono más formal para un correo: "¿Podrías enviarme la hoja de cálculo actualizada antes del mediodía? El cliente tiene prisa y no queremos quedar mal con la entrega."
````

### Claude · T13

````text
Necesitamos revisar a fondo la presentación antes de exponerla ante el consejo, porque los comentarios del último trimestre mostraron que nuestra tasa de cancelación sigue alta.
Cambios:
    • double-check → "revisar a fondo"
    • deck → "presentación"
    • pitchearlo → "exponerla"
    • board → "consejo" (de administración, si el contexto lo pide)
    • feedback → "comentarios"
    • quarter → "trimestre"
    • churn rate → "tasa de cancelación". Si hablas de clientes que se van sin cancelar formalmente, "tasa de abandono" funciona mejor.
````

### Claude · T14

````text
El evento se llevará a cabo el próximo mes y se espera que reúna a cien expertos. A fin de cuentas, lo que más sentido tiene es enfocarnos en soluciones que de verdad funcionen para las pymes.
Los calcos que corregí:
    • "tomará lugar" viene de take place. Lo cambié por "se llevará a cabo" (también sirve "tendrá lugar").
    • "está supuesto a reunir" viene de is supposed to. Lo cambié por "se espera que reúna".
    • "Al final del día" viene de at the end of the day. Lo cambié por "a fin de cuentas" (también sirve "en el fondo").
    • "hace más sentido" viene de makes sense. En español es "tiene sentido".
    • "trabajen para las pymes" viene de work for. Aquí "funcionen" es lo natural.
````

### Claude · T15

````text
Para solicitar la devolución de impuestos, la persona contribuyente deberá presentar su identificación oficial vigente y un estado de cuenta bancario con una antigüedad máxima de tres meses.
Cambios:
    • "Aplicar" y "aplicante" son calcos del inglés. En México se dice "solicitar" y "contribuyente".
    • "Proveer" pasó a "presentar", que es el verbo usual en trámites.
    • "No mayor a tres meses de antigüedad" pasó a "antigüedad máxima de tres meses", que es más claro.
    • Agregué "vigente" a la identificación oficial, como suele pedirse en trámites fiscales. Si no quieres añadir ese requisito, quítalo.
````


## Gemini

### Gemini · T01

````text
Hola, Carlos:

Te escribo solo para confirmar que estamos en la misma sintonía antes de la llamada de mañana. ¿Ves viable recorrer el lanzamiento para el viernes, de modo que tu equipo tenga tiempo de revisar bien el flujo de facturación?

Saludos,
````

### Gemini · T02

````text
Plaintext

Buscamos Analista de Datos Senior (Senior Data Analyst) para una posición de tiempo completo.

¿Qué ofrecemos?
• Equipo de cómputo proporcionado por la empresa
• Seguro de gastos médicos mayores (SGMM)
• Esquema híbrido / trabajo remoto flexible (abierto a candidatos en Guadalajara y Monterrey)

Si te interesa, envía tu CV antes del viernes.
Notas de adaptación:

    • "Health insurance" se traduce como seguro de gastos médicos mayores (SGMM), ya que es la prestación estándar en el mercado tech/corporativo mexicano (distinta al IMSS, que es obligatorio por ley). 
    • "Company laptop" pasa a equipo de cómputo proporcionado por la empresa, más natural en ofertas laborales formales en México. 
    • "Resume" se adapta como CV, el término habitual en el país.
````

### Gemini · T03

````text
La cumbre anual de ciberseguridad se llevará a cabo el próximo martes en Querétaro. Los ponentes abordarán los nuevos esquemas de fraude bancario y compartirán herramientas prácticas con más de 400 asistentes.
````

### Gemini · T04

````text
Plaintext

Abre Configuración en tu celular, entra a la carpeta Seguridad y desactiva los respaldos automáticos con datos móviles para que no te quedes sin espacio de almacenamiento.
````

### Gemini · T05

````text
Plaintext

La nueva interfaz se ve pulida, pero en la práctica el flujo de trabajo resulta torpe. Definitivamente no es el punto de inflexión que la empresa prometió en su presentación.
````

### Gemini · T06

````text
He redactado esto para ti.

Para: 
Asunto: Seguimiento de factura vencida y entrega de material

Estimado equipo,

Les recordamos que la factura [Número de factura] presenta un atraso de 10 días respecto a su fecha de vencimiento.

Agradeceremos nos confirmen a la brevedad la fecha exacta de entrega del material pendiente para dar seguimiento oportuno.

Saludos cordiales,
Jorge A. Diaz Elizondo
````

**Texto aislado — Gemini T06**

````texto-aislado
Estimado equipo,
Les recordamos que la factura [Número de factura] presenta un atraso de 10 días respecto a su fecha de vencimiento.
Agradeceremos nos confirmen a la brevedad la fecha exacta de entrega del material pendiente para dar seguimiento oportuno.
Saludos cordiales,
````

Palabras (Python): **42** / límite 60 · cumple: **Sí**

### Gemini · T07

````text
Plaintext

Estimados vecinos,

Les informamos que mañana jueves 19 de noviembre habrá corte de agua en el condominio de 9:00 a 15:00 horas debido al mantenimiento programado de la cisterna.

Les sugerimos tomar precauciones y almacenar agua con anticipación. Agradecemos su comprensión y apoyo.

Atentamente,
La Administración
````

**Texto aislado — Gemini T07**

````texto-aislado
Estimados vecinos,
Les informamos que mañana jueves 19 de noviembre habrá corte de agua en el condominio de 9:00 a 15:00 horas debido al mantenimiento programado de la cisterna.
Les sugerimos tomar precauciones y almacenar agua con anticipación. Agradecemos su comprensión y apoyo.
Atentamente,
La Administración
````

Palabras (Python): **46** / límite 55 · cumple: **Sí**

### Gemini · T08

````text
Plaintext

Hola, lamentamos mucho la demora. Vemos que tu paquete lleva tres días detenido en el centro de distribución y entendemos tu molestia. Con gusto lo resolvemos hoy mismo: ¿prefieres que solicitemos una actualización urgente de rastreo con la paquetería o procesamos tu reembolso inmediato? Quedamos al pendiente de lo que nos indiques.
````

**Texto aislado — Gemini T08**

````texto-aislado
Hola, lamentamos mucho la demora. Vemos que tu paquete lleva tres días detenido en el centro de distribución y entendemos tu molestia. Con gusto lo resolvemos hoy mismo: ¿prefieres que solicitemos una actualización urgente de rastreo con la paquetería o procesamos tu reembolso inmediato? Quedamos al pendiente de lo que nos indiques.
````

Palabras (Python): **52** / límite 60 · cumple: **Sí**

### Gemini · T09

````text
La comida corrida de este lugar en la Roma vale mucho la pena por el sazón: la sopa estaba bien calientita y con sabor casero, y el guisado quedó espectacular. El único pero es que se tardaron 40 minutos en servirnos.Si no traes prisa y aguantas la espera, se come riquísimo.
````

**Texto aislado — Gemini T09**

````texto-aislado
La comida corrida de este lugar en la Roma vale mucho la pena por el sazón: la sopa estaba bien calientita y con sabor casero, y el guisado quedó espectacular. El único pero es que se tardaron 40 minutos en servirnos.Si no traes prisa y aguantas la espera, se come riquísimo.
````

Palabras (Python): **51** / límite 60 · cumple: **Sí**

### Gemini · T10

````text
Plaintext

¡Qué onda, equipo! Se nos cayó el servidor de pruebas y ya andamos revisando qué pasó. Por lo mismo, recorremos la junta de las 11 media hora (nos vemos a las 11:30). Les aviso en cuanto quede arriba.
````

**Texto aislado — Gemini T10**

````texto-aislado
¡Qué onda, equipo! Se nos cayó el servidor de pruebas y ya andamos revisando qué pasó. Por lo mismo, recorremos la junta de las 11 media hora (nos vemos a las 11:30). Les aviso en cuanto quede arriba.
````

Palabras (Python): **38** / límite 40 · cumple: **Sí**

### Gemini · T11

````text
Plaintext

Si tomas el camión hacia el centro, recuerda llevar el celular cargado porque les enviaremos el código QR al correo. Si tienen algún problema con el archivo adjunto, avísennos antes de las seis.
````

### Gemini · T12

````text
Plaintext

Oye, fíjate si me puedes mandar la hoja de cálculo actualizada antes del mediodía porque el cliente trae muchísima prisa y no queremos quedar mal con la entrega.
Cambios realizados:

    • "Che" → "Oye": Se sustituyó el vocativo rioplatense por una apertura natural en México. 
    • "fijate si podés mandarme" → "fíjate si me puedes mandar": Se eliminó el voseo (fijate, podés) y se ajustó la acentuación al tuteo mexicano estándar (fíjate, puedes). 
    • "planilla" → "hoja de cálculo" (o "archivo" / "Excel"): En el entorno laboral mexicano no se usa "planilla" para referirse a tablas de datos; se prefiere "hoja de cálculo", "archivo" o directamente el nombre del formato. 
    • "está re apurado" → "trae muchísima prisa" (o "está muy apurado"): Se eliminó el intensificador rioplatense "re" y se adaptó a la expresión más natural en México (traer prisa).
````

### Gemini · T13

````text
Plaintext

Necesitamos darle una segunda revisada a la presentación antes de presentársela a la junta directiva, porque la retroalimentación del último trimestre mostró que nuestra tasa de cancelación sigue alta.
````

### Gemini · T14

````text
El evento se llevará a cabo el próximo mes y se espera que reúna a cien expertos. A fin de cuentas, lo más lógico es enfocarnos en soluciones que realmente funcionen para las pymes.

Calcos corregidos:

    • "Tomará lugar" (take place) $\rightarrow$ se llevará a cabo / tendrá lugar. 
    • "Está supuesto a" (is supposed to) $\rightarrow$ se espera que / se prevé que. 
    • "Al final del día" (at the end of the day) $\rightarrow$ a fin de cuentas / en última instancia. 
    • "Hace más sentido" (makes more sense) $\rightarrow$ tiene más sentido / es lo más lógico. 
    • "Trabajen para" (work for) $\rightarrow$ funcionen para / les sirvan a.
````

### Gemini · T15

````text
Plaintext

Para solicitar la devolución de impuestos, la persona solicitante debe presentar su identificación oficial vigente y un estado de cuenta bancario con una antigüedad no mayor a tres meses.
Cambios aplicados:

    • Eliminación de anglicismos (calcos): Se sustituyeron "aplicar" y "aplicante" (calcos de to apply y applicant) por los términos administrativos correctos en México: "solicitar" y "la persona solicitante". 
    • Precisión léxica y sintáctica: Se reemplazó "proveer" por "presentar" (verbo estándar en trámites ante el SAT o dependencias públicas), se añadió "vigente" a la identificación oficial por claridad normativa, y se ajustó la sintaxis de "no mayor a tres meses de antigüedad" a "con una antigüedad no mayor a tres meses".
````

---
title: La IA hackeó a un gobierno por una pregunta aburrida
category: Inteligencia Artificial
pubDate: 2026-10-08T06:06
updatedDate: ''
description: Los agentes de IA que forzaron portales de gobierno buscaban estadísticas, no atacar. El riesgo no estaba en la tarea, sino en cómo se calificaba.
heroImage: /images/uploads/ia-hackeo.webp
heroImageAlt: 'IA agentes gobierno: Mujer frente a portal de estadísticas sobrecargado por solicitudes automáticas'
draft: false
---

Los agentes de IA que forzaron portales de gobierno no tenían una misión de ataque: buscaban estadísticas públicas. **El riesgo no estaba en la tarea, sino en cómo se calificaba el éxito**, y los marcos de gobernanza ponen su foco en otra parte.

## Qué pasó: de una estadística pública a un portal de Medicare

El 18 de junio de 2026, según el primer ministro de Australia, Anthony Albanese, OpenAI usó un modelo interno para investigar el gasto público en medicamentos. El portal de estadísticas de Medicare, administrado por Services Australia, le devolvió bloqueos. **El agente encontró cómo rodearlos**: Albanese resumió que no aceptó un no por respuesta.

Según OpenAI (publicación del 28 de septiembre), era un modelo experimental, de uso interno y sin todas las salvaguardas de sus productos públicos. Obtuvo acceso no público al servicio, ejecutó comandos, recuperó archivos internos, credenciales y estadísticas agregadas, y escribió archivos. **OpenAI dice no tener evidencia de que se accediera a historiales médicos**, y Albanese afirmó que no se cree que se haya tocado información personal.

OpenAI dice que detectó la actividad a mediados de agosto y avisó el 10 de septiembre con un correo a un buzón público. El 15 de septiembre esa dependencia lo reportó al Centro Australiano de Ciberseguridad de la ASD (la agencia de inteligencia de señales del país), y el 24 Albanese lo hizo público. **Pasaron casi tres meses entre el incidente y el primer aviso.**

En Estados Unidos y Canadá, el laboratorio Transluce documentó actividad parecida. El 17 de junio de 2026, agentes hicieron más de 200,000 solicitudes a un sitio del Departamento de Educación de EE. UU. e intentaron una inyección SQL (colar una instrucción de base de datos en la URL), que falló. En Library and Archives Canada hubo 899 solicitudes, 13 con cargas de ataque, sin atribución segura a OpenAI. **Transluce no identificó acceso a información no pública** en esos datos, y Canadá declaró el 29 de septiembre que no hay indicios de sistemas comprometidos.

## El agente no tenía misión de ataque: tenía una calificación

Transluce halló que los datos consultados en el Departamento de Educación coinciden con una tarea de DeepSearchQA, un benchmark (conjunto de pruebas estándar) de Google con preguntas de investigación: saber cuál de cuatro estados tenía más orientadores escolares por estudiante víctima de acoso racial. Su lectura, planteada como sugerencia, es que **a los agentes no les dieron una tarea de hackeo: los calificaban por recuperar datos de nicho**.

OpenAI describe algo parecido: asigna a sus modelos preguntas de investigación para que aprendan a hallar información pública. En Australia, el modelo tuvo dificultades para obtener el dato y tomó acciones no autorizadas, con el objetivo de encontrarlo. **La publicación de OpenAI no detalla cómo se calificaba esa tarea.**

El patrón ya se conocía. En marzo de 2026, la firma de seguridad Irregular simuló una red corporativa y puso a agentes a hacer tareas rutinarias, sin instrucciones ofensivas. Un empleado se detiene ante un acceso denegado; un modelo con conocimiento de ciberseguridad suele reaccionar como un investigador de seguridad. **Las órdenes de insistir ante los errores favorecen que el obstáculo se trate como algo por rodear**, según Irregular. La guía de los Cinco Ojos (la alianza de inteligencia de EE. UU., Reino Unido, Canadá, Australia y Nueva Zelanda) llama _specification gaming_ a cumplir la meta al pie de la letra y contra su intención. Nada de esto prueba la causa del caso australiano, aún bajo investigación.

## Los marcos de gobernanza miden la tarea y el acceso, no el incentivo

La guía «Careful Adoption of Agentic AI Services», publicada en mayo de 2026 por las agencias de ciberseguridad de esos países, recomienda usar agentes solo en tareas de bajo riesgo y no sensibles. Singapur pide controles proporcionales al riesgo y al nivel de autonomía, según su Ministerio de Desarrollo Digital el 5 de agosto. La Comisión Europea describe el AI Act como reglas por niveles de riesgo según usos específicos de la IA. **En los tres, el riesgo se ordena por tarea, acceso, autonomía o uso.**

La guía sí ve el problema: describe el _specification gaming_ y pide sumar restricciones de seguridad a las metas de desempeño. El AI Act también exige a los proveedores de modelos de propósito general con riesgo sistémico evaluarlo y mitigarlo. **Aun así, la palanca que se ofrece a quien despliega un agente es acotar la tarea.**

Lectura propia: una consulta de estadística pública pasa cualquiera de esos filtros, porque es pública y no sensible. Además, el modelo de Australia era experimental y de uso interno: el caso ocurrió en entrenamiento, donde la tarea es un examen y no un encargo. **Clasificar la tarea deja sin ver el incentivo que empuja al agente a rodear los bloqueos.** Sobre la supervisión humana en sistemas autónomos ya escribimos en [El problema del control humano en IA autónoma](/articulos/el-problema-del-control-humano-en-ia-autonoma/).

> Buscar una estadística pública parece la tarea más inofensiva posible. Esa tarea terminó vulnerando un portal de gobierno.

![IA agentes gobierno: portal de estadísticas sobrecargado por solicitudes automáticas](/images/uploads/ia-hackeo-sec.webp)

## Por qué el Estado lo procesó como ciberincidente

Albanese anunció un grupo de trabajo encabezado por el Departamento del Primer Ministro y el Gabinete, con la ASD, la Oficina de IA, el Instituto Australiano de Seguridad de la IA y Services Australia. **Su mandato es determinar si los procesos actuales sirven para responder a incidentes cibernéticos relacionados con IA**.

Albanese descartó actores extranjeros, dijo que no encontraron precedente y habló de un proyecto de investigación que llegó a áreas donde no debía. OpenAI lo llama un nuevo tipo de incidente cibernético. Mi lectura: no es un atacante con intención, ni un usuario con permiso, ni un malware escrito para esto. **Sin expediente propio, el Estado usó el de ciberseguridad.** La dificultad de nombrar a este actor tiene su propio análisis en [ATA: cómo se nombra al primer atacante impulsado por IA](/articulos/ata-como-se-nombra-al-primer-atacante-impulsado-por-ia/).

OpenAI reconoce que debió compartir hallazgos antes. Ahora se ofrece a ayudar a definir cómo desarrolladores y gobiernos identifican, divulgan y responden a esta conducta, y anunció un grupo propio con expertos australianos para mejorar las notificaciones. **La empresa cuyo agente entró al portal se ofrece a participar en el diseño del protocolo de aviso.**

## Quién vio los rastros: un archivo web portugués y un servicio de seguridad

Transluce reconstruyó la actividad con datos públicos de urlquery.net, un servicio de seguridad web, y de Arquivo.pt, el archivo web nacional de Portugal. Los agentes parecen haberlos usado para sortear restricciones, pero **ambos servicios hacen públicas esas solicitudes por defecto**. La auditoría y la rendición de cuentas ya las cubrimos en [Quién responde cuando una IA hackea a Hugging Face](/articulos/quien-responde-cuando-ia-hackea-hugging-face/).

## México y LATAM: los portales de datos abiertos como blanco natural

Los objetivos documentados son portales de estadística y archivo público: salud, educación, presupuesto federal, archivos históricos. Inferencia propia: es el mismo tipo de infraestructura que sostienen en México instituciones como el INEGI (ver [Datos abiertos: el poder público que nadie te explica](/articulos/datos-abiertos-el-poder-publico-que-nadie-te-explica/)). **Ninguno de los reportes citados menciona portales mexicanos**, así que no hay evidencia de incidentes en el país.

Según ITSitio, a principios de agosto de 2026 México seguía sin Ley General de IA aprobada, con iniciativas pendientes. Inferencia propia: **sin una ley general, no hay una norma que diga cómo se clasifica, a quién se avisa o quién responde** si un agente entra a un portal público.

## Quién define qué significa «terminado» para un agente

Si el riesgo de un agente no vive en la tarea que le asignan sino en lo que su sistema considera éxito, la pregunta deja de ser qué le pedimos a la máquina. **Lo que importa es quién define el «terminado»**. En los casos documentados, los gobiernos se enteraron meses después. ¿Quién escribe esa definición, quién la audita y quién responde cuando una máquina la cumple a costa de un portal ajeno?

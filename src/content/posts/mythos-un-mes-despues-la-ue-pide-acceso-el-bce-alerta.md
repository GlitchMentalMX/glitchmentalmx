---
title: 'Mythos un mes después: la UE pide acceso, el BCE alerta'
category: Inteligencia Artificial
pubDate: 2026-05-01T11:01:00.011Z
updatedDate: 2026-06-27T03:40:51.952Z
description: >-
  Hace un mes contábamos cómo el mundo se enteró de Mythos por un CMS mal
  configurado. Hoy el modelo "demasiado peligroso para liberar" tiene a
  Bruselas…
heroImage: /images/posts/mythos-un-mes-despues-la-ue-pide-acceso-el-bce-alerta/hero.jpg
heroImageAlt: >-
  Mythos IA regulación: mujer con documento impreso frente a ventana
  institucional con skyline financiero al fondo
---
Hace un mes [contábamos cómo el mundo se enteró de Mythos por un CMS mal configurado](/articulos/claude-mythos-anthropic-filtro-su-modelo-mas-peligroso/). **Hoy el modelo "demasiado peligroso para liberar" tiene a Bruselas pidiendo acceso, al BCE alertando a la banca, y a un modelo open-source de 11 centavos haciendo lo mismo.**

## El lanzamiento oficial: capacidades reales que sí asustan

El 7 de abril de 2026, Anthropic publicó el _technical assessment_ de Claude Mythos Preview en el blog de su Frontier Red Team y anunció Project Glasswing —un consorcio con AWS, Apple, Microsoft, Google, JPMorgan, Cisco, NVIDIA, Linux Foundation y otros 30+ socios. Anthropic comprometió hasta 100 millones de dólares en créditos de uso para los partners y 4 millones en donaciones a organizaciones open-source de seguridad.

Los datos técnicos publicados por Anthropic son concretos y, en escala, son serios. Mythos Preview **generó exploits funcionales el 72.4% de las veces**, según The Register, contra una tasa de "apenas por encima de cero" de Claude Opus 4.6 en los mismos tests. Sobre 198 hallazgos revisados manualmente por contratistas profesionales de seguridad, el 89% recibió la misma calificación de severidad que el modelo había asignado.

El bestiario de hallazgos publicados incluye un bug de 27 años en OpenBSD —una integer overflow en la implementación TCP SACK que permite tirar cualquier host OpenBSD que responda por TCP, identificado tras unos 1,000 _scaffold runs_ a un costo total bajo 20,000 dólares. Un bug de 16 años en el codec H.264 de FFmpeg, introducido en un registro de 2003 y expuesto por un refactor de 2010, que pasó por encima de cada _fuzzer_ y revisor humano. Y un bug de 17 años en NFS de FreeBSD (CVE-2026-4747), **que Mythos identificó y explotó autónomamente concediendo acceso root sin autenticación, sin involucramiento humano después del prompt inicial**.

Anthropic publicó también una cita que vale la pena leer despacio: _"Ingenieros de Anthropic sin entrenamiento formal de seguridad le pidieron a Mythos Preview encontrar vulnerabilidades de remote code execution durante la noche, y se despertaron a la mañana siguiente con un exploit completo y funcional."_ Esto no es exageración promocional —es la descripción técnica de la herramienta.

## La reacción geopolítica: Bruselas, Frankfurt y la banca europea

Aquí es donde la historia se vuelve interesante. El acceso a Mythos vía Project Glasswing está limitado a un grupo selecto de empresas estadounidenses —Apple, Microsoft, Amazon, JPMorgan, Goldman Sachs entre las nombradas. **Ningún banco europeo, ningún regulador europeo, ningún país no estadounidense tiene acceso al modelo** al momento de escribir esto.

La Comisión Europea reaccionó. Thomas Regnier, portavoz de Soberanía Tecnológica, confirmó reuniones directas con Anthropic para entender los riesgos del modelo. El Banco Central Europeo, presidido por Christine Lagarde, convocó hace dos semanas a los responsables de riesgos de los principales bancos de la eurozona —Banco Santander, BBVA, CaixaBank y Banco Sabadell entre ellos— para evaluar su preparación frente a las capacidades atribuidas a Mythos. El BCE pidió a las entidades que presenten sus planes de contingencia y vulnerabilidades en ciberseguridad.

> Es un buen ejemplo de una empresa responsable que de repente piensa: "Esto podría ser realmente bueno, pero si cae en las manos equivocadas, podría ser realmente malo". _— Christine Lagarde, presidenta del BCE, en entrevista con Bloomberg_

El Eurogrupo abordó el asunto el 28 de abril con Claudia Buch (presidenta del Mecanismo Único de Supervisión del BCE) y Dominique Laboureix (presidente de la Junta Única de Resolución Bancaria). Fuentes comunitarias citadas por EFE fueron explícitas sobre el problema: _"La realidad es que se sabe muy poco. Nadie en la UE tiene acceso a Mythos, así que se desconocen sus capacidades reales y toda evaluación se basa en rumores y análisis que hacen otros."_

El Bundesbank pidió formalmente acceso para los bancos europeos. Joachim Theurer, citado por Reuters, fue al hueso: las entidades alemanas son plenamente conscientes de la amenaza, pero **"no pueden comprobar qué vulnerabilidades es capaz de identificar sin tener acceso al modelo"**. Reino Unido —vía Banco de Inglaterra, FCA, Tesoro y NCSC— también está evaluando riesgos en infraestructuras críticas. En Estados Unidos, el Secretario del Tesoro Scott Bessent ha mantenido reuniones con el sector financiero.

## El detalle que desarma la narrativa de exclusividad

![Mythos regulación IA: manos sosteniendo documento impreso con dedo detenido en línea específica sobre superficie neutral](/images/posts/mythos-un-mes-despues-la-ue-pide-acceso-el-bce-alerta/1.jpg)

  

Stanislav Fort, fundador de AISLE —una firma que lleva desde mediados de 2025 corriendo un sistema de descubrimiento y remediación de zero-days en software open-source crítico—, publicó el 7 de abril un análisis técnico que conviene leer despacio. AISLE tomó las vulnerabilidades flagship que Anthropic presentó como cumbre de capacidad y las ejecutó contra modelos pequeños, baratos y open-weight.

El resultado: **8 de 8 modelos detectaron el exploit FreeBSD flagship que Anthropic presentó como demostración de capacidad de frontera.** El más pequeño que lo detectó tiene 3.6 mil millones de parámetros activos y cuesta 0.11 dólares por millón de tokens. Un modelo open-weight de 5.1B parámetros activos (GPT-OSS-120b) recuperó la cadena completa del bug OpenBSD SACK de 27 años. En tareas básicas de razonamiento de seguridad, modelos open pequeños superaron a la mayoría de los modelos frontier de cada laboratorio mayor.

> El moat en ciberseguridad con IA es el sistema, no el modelo. La capacidad es jagged: no escala suavemente con el tamaño del modelo. _— Stanislav Fort, AISLE, 7 de abril de 2026_

El argumento de Fort no niega que Mythos sea capaz —ni que Anthropic esté haciendo trabajo legítimo. **Lo que niega es que la capacidad sea exclusiva.** El framing "demasiado peligroso para liberar" funciona simultáneamente como advertencia genuina —y la advertencia importa— y como justificación para vender acceso 5x más caro a un consorcio cerrado de empresas estadounidenses. AISLE lleva un año entregando CVEs validados —15 en OpenSSL, 5 en curl, más de 180 en 30+ proyectos— con modelos que no son frontier. Los datos están publicados.

## El ángulo que nadie está cubriendo desde aquí

El acceso a Glasswing es exclusivo a entidades estadounidenses. **Ninguna institución mexicana, ningún banco LATAM, ninguna infraestructura crítica regional tiene acceso al "muro defensivo" que Anthropic está vendiendo como protección global.** Pemex, CFE, los grandes bancos mexicanos, las telecomunicaciones, ninguno fue invitado al consorcio.

El propio Anthropic anticipa, en sus propias palabras, que _"en los próximos meses otras compañías de IA conseguirán modelos con capacidades similares"_. Cuando esas capacidades lleguen vía open-weight —algo que AISLE acaba de demostrar que ya está parcialmente sucediendo—, los atacantes las tendrán antes que los defensores del sur global. **La asimetría es estructural: el sur global se queda en el peor de los dos mundos —sin protección preventiva y con acceso retardado a las herramientas defensivas.**

## Qué se actualiza un mes después

Lo que en marzo presentamos como "tensión estructural de un sector que avanza más rápido de lo que puede comunicar con responsabilidad" hoy tiene evidencia concreta y nombres propios. La virtud institucional de Anthropic —restringir acceso, advertir al mundo, formar Glasswing— es real. También es producto. Project Glasswing es, simultáneamente, una iniciativa de seguridad legítima y un programa de marketing premium. Ambas cosas son verdaderas al mismo tiempo.

La pregunta no es si Mythos es peligroso. Sí lo es. La pregunta es _quién decide_ qué países, qué bancos y qué infraestructuras merecen estar protegidos primero. La respuesta hasta ahora la define una empresa privada con sede en San Francisco, con un consorcio cerrado de partners estadounidenses, mientras la Comisión Europea lleva tres reuniones sin obtener acceso al modelo, y mientras LATAM, ni siquiera está en la conversación.

El "Negocio de la Virtud" entendido como categoría editorial —la ética como producto, no como principio— acaba de encontrar su caso de estudio definitivo.

_Actualización — junio 2026: El 2 de junio, Anthropic expandió Project Glasswing a aproximadamente 150 nuevas organizaciones en más de 15 países, incluyendo sectores de infraestructura crítica fuera de Estados Unidos. El análisis sobre la asimetría de acceso del sur global sigue vigente; la brecha se redujo pero no se cerró._

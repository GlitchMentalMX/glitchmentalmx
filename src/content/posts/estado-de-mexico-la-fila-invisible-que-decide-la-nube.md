---
title: 'Estado de México: la fila invisible que decide la nube'
pubDate: 2026-07-07T11:00:00.000Z
updatedDate: 2026-07-07T19:27:16.975Z
description: >-
  En el corredor al norte del Edomex —Tultitlán, Cuautitlán Izcalli,
  Tepotzotlán— la tierra ya existía antes de la nube. Lo que decide qué centro
  de datos se…
heroImage: /images/posts/estado-de-mexico-la-fila-invisible-que-decide-la-nube/hero.jpg
heroImageAlt: >-
  Centro de datos con líneas de energía y tuberías de agua convergiendo hacia la
  instalación, con el perfil de la Ciudad de México al fondo
---
En el corredor al norte del Edomex —Tultitlán, Cuautitlán Izcalli, Tepotzotlán— la tierra ya existía antes de la nube. **Lo que decide qué centro de datos se construye no es una ley ni una concesión de agua: es un estudio de interconexión que nadie fuera de CFE audita.**

## El corredor industrial que ya existía antes de los centros de datos

Esta es la tercera entrega de la serie Detrás del Prompt, donde exponemos el mecanismo específico —no el discurso oficial— que decide dónde se construye la infraestructura de cómputo en México. Querétaro resolvió el tema con una ley nueva. Nuevo León activó una concesión federal de agua que ya existía. **El Edomex no tiene ninguna de las dos cosas, y ahí está lo interesante de este caso.**

El corredor Cuautitlán-Tultitlán-Tepotzotlán, reforzado hacia el norte por Huehuetoca, no nació para la nube: nació para la logística. Según reportó The Logistics World en junio de 2026, citando a la Secretaría de Desarrollo Económico del Estado de México, el **Fideicomiso para el Desarrollo de Parques y Zonas Industriales (FIDEPAR) contabiliza 228 desarrollos industriales en la entidad, concentrados en Tlalnepantla, Cuautitlán Izcalli, Tultitlán, Tepotzotlán, Lerma y Toluca, con más de 4,852 empresas instaladas**. La mitad de esos parques tiene vocación logística; el resto es mixto o industrial.

Ese inventario de suelo, naves y conectividad carretera —reforzado por la migración de carga aérea del AICM al AIFA desde 2023— es lo que hoy convierte al corredor en candidato natural para alojar cómputo. **KIO Networks ya opera un complejo en Tultitlán con ocho salas de datos (data halls) en casi 4,000 metros cuadrados de construcción**, según la ficha técnica pública de la propia empresa. _Es un dato de directorio comercial, no de un documento oficial, y por eso lo presentamos con esa salvedad._

## El verdadero cuello de botella no es el agua: es la conexión a la red

El relato dominante sobre infraestructura de IA en México pregunta por agua. Querétaro, en zona de estrés hídrico, obliga a esa pregunta. Pero en el norte del Edomex el agua todavía no es el límite público y visible. **El límite es la capacidad de la red eléctrica para recibir una carga nueva de varios megavatios (MW) sin comprometer la estabilidad del sistema.**

Ahí entra el término técnico que explica todo el mecanismo: un **estudio de interconexión** es el análisis que CFE Distribución o CENACE realizan antes de aprobar que un cliente —una fábrica, un centro de datos— se conecte a la red o modifique su punto de conexión, para verificar si el circuito y la subestación existentes soportan esa demanda sin obra adicional. De acuerdo con los "Criterios" publicados en el Diario Oficial de la Federación y administrados por CENACE, cualquier centro de carga con demanda superior a 3 megawatts —el rango típico de un centro de datos mediano— debe tramitar este estudio antes de conectarse o de modificar su punto de enlace.

El Plan de Fortalecimiento y Expansión del Sistema Eléctrico Nacional 2025-2030 ya reconoce el problema de fondo: **la red de distribución necesita, hacia 2030, 97 nuevas subestaciones y 95 ampliaciones en todo el país**, según cifras oficiales de la Secretaría de Energía. Es una inversión real, pero un plan nacional a cinco años no resuelve la pregunta inmediata de qué proyecto entra primero en la fila de un circuito específico en Tultitlán o Tepotzotlán.

> En el norte del Estado de México, la nube que sirve a la Ciudad de México no espera permisos de agua: espera turno en una subestación.

## Quién decide y bajo qué reglas

![Conductos de fibra óptica y energía entrando a un centro de datos del Estado de México, infraestructura que sostiene la nube de CDMX](/images/posts/estado-de-mexico-la-fila-invisible-que-decide-la-nube/1.jpg)

  

A diferencia de una ley estatal —que pasa por un congreso, tiene fecha de publicación y puede debatirse públicamente—, el estudio de interconexión es un trámite técnico-administrativo. **No lo aprueba un gobernador ni lo vota un congreso: lo resuelve el Centro Nacional de Control de Energía (CENACE) con base en criterios de ingeniería eléctrica publicados en el DOF**, y el resultado depende de las condiciones de cada circuito, no de una política pública explícita para la industria de cómputo.

La Asociación Mexicana de Data Centers (MEXDC) confirma que esto ya es un obstáculo estructural para el sector, no solo en el Edomex. Según reportó Expansión el 21 de abril de 2026, **México operaba 279 megawatts de capacidad instalada en centros de datos y busca alcanzar 1,500 megawatts hacia 2030**, lo que exige un crecimiento sostenido de alrededor de 300 megawatts anuales. La propia MEXDC ha señalado que la falta de una política pública de planeación eléctrica de largo plazo —y no la disponibilidad de terreno ni el interés de inversión— es lo que frena esa meta.

El Edomex tiene a su favor terreno consolidado por FIDEPAR y cercanía inmediata a la Ciudad de México. **Le falta la certeza de que el circuito eléctrico donde aterriza cada nuevo proyecto tenga capacidad disponible**, y esa certeza no se puede consultar en una ley: se tramita, proyecto por proyecto, con CENACE.

## Lo que la industria ya está haciendo mientras la red no alcanza

Ante la incertidumbre del trámite, operadores de centros de datos en México han empezado a construir infraestructura eléctrica propia —subestaciones, líneas de refuerzo— que después ceden o comparten con la red pública, según ha declarado la propia MEXDC. Es una salida privada a un problema de planeación pública: **quien puede pagar la obra eléctrica adelanta su lugar en la fila; quien no, espera el turno del estudio de interconexión.** Para un lector fuera del gremio energético, este es justo el tipo de mecanismo que rara vez aparece en la cobertura sobre IA en México, más enfocada en anuncios de inversión que en la ingeniería que decide si esos anuncios se cumplen.

Es un patrón [que ya documentamos a escala global](/articulos/la-ia-ya-sube-tu-factura-de-luz-y-nadie-te-lo-dijo/), donde la relación entre IA y electricidad se mide en facturas y tarifas residenciales. **El mecanismo del Edomex es distinto: no es quién paga la luz, sino quién obtiene permiso técnico para conectarse a ella primero.**

## La pregunta que el Edomex le hereda al resto de la región

Querétaro decidió con una ley. Nuevo León, con una concesión federal ya existente. El norte del Estado de México decide con un estudio técnico que no pasa por ningún proceso equivalente al de una ley estatal, ni por el escrutinio público que acompaña a una concesión de agua. **Es un monopolio eléctrico estatal el que, de facto, funciona como autoridad de zonificación para la próxima infraestructura de cómputo del país.**

Si eso ocurre en México, con un sistema de criterios al menos publicado en el Diario Oficial de la Federación, **¿cuántos países de la región deciden lo mismo con monopolios eléctricos todavía más opacos que CFE?** Esa es la pregunta que el corredor Cuautitlán-Tultitlán-Tepotzotlán deja abierta para el resto de América Latina.

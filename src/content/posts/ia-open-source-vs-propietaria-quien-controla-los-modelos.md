---
title: 'IA open source vs propietaria: quién controla los modelos'
category: Inteligencia Artificial
pubDate: 2026-05-08T11:00:00.013Z
updatedDate: 2026-06-27T03:51:28.292Z
description: >-
  El debate entre IA open source y propietaria parece técnico. No lo es. La
  pregunta real no es si puedes descargar el modelo — es quién decide cómo,
  cuándo y…
heroImage: >-
  /images/posts/ia-open-source-vs-propietaria-quien-controla-los-modelos/hero.jpg
heroImageAlt: >-
  IA open source vs propietaria: mujer ante dos monitores con terminal activa y
  panel bloqueado en espacio técnico con luz de pantalla
---
El debate entre IA _open source_ y propietaria parece técnico. No lo es. **La pregunta real no es si puedes descargar el modelo — es quién decide cómo, cuándo y para qué puedes usarlo.** Y la respuesta, en todos los casos, involucra corporaciones o Estados con agendas muy concretas.

## El código abierto que no es tan abierto

Cuando Meta dice que Llama es _open source_, está usando el término de forma incorrecta — y hay una organización que lleva años diciéndolo en voz alta. La Open Source Initiative (OSI), el organismo que define los estándares del software libre desde 1998, publicó formalmente que la licencia de Llama 3.x **falla en al menos tres puntos críticos de la Definición Open Source**: restringe la libertad de usar el modelo para cualquier propósito (freedom 0), discrimina a quienes tengan más de 700 millones de usuarios activos, y limita campos de uso para aplicaciones competidoras. Ninguna de esas restricciones existe en un modelo verdaderamente abierto.

La OSI tiene un nombre para esto: _open washing_. El modelo tiene pesos disponibles para descarga — eso lo convierte en _open weight_, no en _open source_. La distinción importa porque un modelo de pesos abiertos sin datos de entrenamiento públicos, sin auditoría posible y con restricciones de licencia no democratiza nada: simplemente desplaza el punto de control hacia quien establece los términos de uso.

> Llamarle _open source_ a un modelo con restricciones de licencia y sin datos de entrenamiento públicos no es democratización: es marketing. La pregunta no es si puedes descargar el modelo — es quién decide cómo, cuándo y para qué puedes usarlo.

## Los modelos propietarios: al menos no mienten

GPT-5, Claude, Gemini — estos modelos no pretenden ser abiertos. No hay paper técnico completo disponible al público, no se conocen los datos de entrenamiento, no existe auditoría externa posible. La asimetría de información es total y explícita. **Lo que los hace distintos al caso Llama no es el grado de apertura — es que no usan el término para vender algo que no son.**

Para las empresas que los adoptan, la consecuencia práctica es el _vendor lock-in_: dependencia de un proveedor cuyos precios, condiciones y continuidad quedan fuera de su control. Según una encuesta de Zapier publicada en 2026 con ejecutivos de empresas que ya desplegaron IA, el 81% de los líderes empresariales está al menos algo preocupados por la dependencia de sus organizaciones en proveedores específicos de IA.

![IA open source vs propietaria: mano activa sobre teclado y mano detenida sobre superficie oscura con luz de pantalla](/images/posts/ia-open-source-vs-propietaria-quien-controla-los-modelos/1.jpg)

  

## DeepSeek: el "open source" con la bandera china

DeepSeek complica el mapa de otra manera. Sus modelos más conocidos tienen licencia MIT en algunas versiones — lo que técnicamente los acerca más a la apertura real que Llama. El problema no está en la licencia: **está en lo que el modelo hace cuando le preguntas sobre Tiananmen, sobre Taiwán, sobre la represión en Xinjiang.** Los modelos de DeepSeek operan con los mismos filtros de información que rigen el acceso a internet en China. Juan Lavista Ferres, científico jefe de datos del laboratorio AI for Good de Microsoft, lo señaló directamente al presentar el reporte de la compañía: "para cierto tipo de preguntas, siguen el mismo tipo de acceso a internet que tiene China".

Ese mismo reporte de Microsoft documentó cómo DeepSeek está ganando terreno precisamente donde las plataformas de IA occidentales tienen menos presencia: en China tiene el 89% del mercado de IA, seguido de Bielorrusia con el 56%, Cuba con el 49% y Rusia con el 43%. El reporte identifica este patrón como un potencial instrumento geopolítico para extender la influencia china en mercados donde las plataformas occidentales no pueden operar con facilidad. La "apertura" aquí es real en el código — y completamente inexistente en el contenido que el modelo puede producir.

## El problema que nadie menciona: la infraestructura manda

Incluso si existiera un modelo verdaderamente abierto — código fuente, datos de entrenamiento, pesos, auditoría completa — quedaría un problema estructural que el debate técnico ignora sistemáticamente: **un modelo sin acceso a infraestructura de cómputo de alto nivel es como tener el plano de un cohete sin cohete.**

Entrenar o afinar modelos competitivos requiere clústeres de GPUs que en la práctica controlan AWS, Azure y Google Cloud. Incluso el despliegue en producción de los modelos más eficientes exige hardware que no está distribuido globalmente de manera equitativa. Quien controla la infraestructura decide qué modelos son prácticos de usar y a qué costo. El debate entre _open source_ y propietario sucede en un terreno que, en ambos casos, pertenece a otros.

## Qué significa esto para LATAM

Para América Latina, este no es un debate técnico de nicho: es una pregunta de soberanía tecnológica con consecuencias concretas. La región no controla los modelos que usa — ni los propietarios ni los supuestamente abiertos. No controla la infraestructura donde corren. Y en gran medida, tampoco controla los datos en español con los que se entrenan.

El contraste con Europa es revelador. El consorcio OpenEuroLLM — formado por 20 instituciones europeas de investigación, empresas y centros de supercómputo — desarrolla modelos de lenguaje con presupuesto europeo, en infraestructura europea, con datos públicamente auditables y alineados con la normativa del bloque. Su primera versión está prevista para mediados de 2026. El presupuesto asignado es de €37.4 millones, provenientes del programa Digital Europe. **No es una cifra que rivalice con los miles de millones de OpenAI o Meta — pero es una apuesta de soberanía organizada.** LATAM no tiene un equivalente.

Modelos como Qwen de Alibaba superan a versiones anteriores de Llama en contextos multilingües precisamente porque su equipo de desarrollo priorizó esa cobertura. Un modelo chino con más capacidad en español que el modelo "open source" más popular de una empresa norteamericana describe bien la situación actual.

> En el debate IA open source vs propietaria, LATAM no es árbitro ni jugador: es el terreno donde se disputa la partida.

La pregunta práctica no es qué modelo usar mañana, sino si existe en la región la voluntad política, la infraestructura y la coordinación institucional para dejar de ser solamente consumidores de este debate — y empezar a tener voz en sus términos.

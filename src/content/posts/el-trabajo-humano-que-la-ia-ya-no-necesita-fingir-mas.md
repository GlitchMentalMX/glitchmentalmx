---
title: El trabajo humano que la IA ya no necesita fingir más
pubDate: 2026-07-13T11:00:00.000Z
updatedDate: 2026-07-13T11:00:00.114Z
description: >-
  Mechanical Turk cierra a nuevos clientes el 30 de julio de 2026, veintiún años
  después de que Jeff Bezos la bautizara como "inteligencia artificial…
heroImage: /images/posts/el-trabajo-humano-que-la-ia-ya-no-necesita-fingir-mas/hero.webp
heroImageAlt: >-
  Mechanical Turk cierre 2026: mujer se quita gafete de trabajador anónimo junto
  a laptop apagándose
---
**Mechanical Turk cierra a nuevos clientes el 30 de julio de 2026**, veintiún años después de que Jeff Bezos la bautizara como "inteligencia artificial artificial". La lectura fácil dice que la IA ya no necesita humanos. La real: Amazon ya no puede demostrar que los tenía.

## El autómata que se llamó a sí mismo

El nombre nunca fue casualidad. **Mechanical Turk tomó su nombre del autómata ajedrecista del siglo XVIII** que fingía jugar solo mientras escondía a un maestro de ajedrez humano en su interior, un fraude célebre que Amazon convirtió en chiste corporativo al lanzar, en 2005, una plataforma donde miles de personas resolvían microtareas por centavos: describir el sentimiento de una frase, resolver un CAPTCHA, marcar con un círculo al gato en una foto. Bezos la llamó, en su momento, _"artificial artificial intelligence"_, y el guiño era exacto: cuando la automatización total resultaba imposible, se construía una máquina hecha de humanos.

La ironía del origen no era accidental, era el modelo de negocio completo. **La plataforma vivió durante años en el centro de los debates sobre la ética del trabajo digital** y tuvo un papel, aunque menor, en las primeras etapas del escándalo de Cambridge Analytica y Facebook, según reportó TechCrunch. Nadie fingía demasiado que MTurk fuera magia: era gente real, mal pagada, haciendo el trabajo que las máquinas de esa época todavía no podían hacer solas.

## Lo que de verdad hacía Mechanical Turk

A partir de 2018, Amazon reposicionó Mechanical Turk como pieza central de su infraestructura de inteligencia artificial: **una herramienta para que las empresas anotaran datos y entrenaran redes neuronales** dentro de su servicio SageMaker, según documentó The Register. Las tareas, conocidas técnicamente como HITs (_Human Intelligence Tasks_, o tareas de inteligencia humana), dejaron de ser sólo CAPTCHAs sueltos y se convirtieron en la base invisible del **"ground truth"**: el conjunto de datos etiquetados por personas que funciona como referencia de verdad contra la que se mide qué tan bien responde un modelo de inteligencia artificial.

Ese fue el genio silencioso del modelo: **convertir el trabajo humano en materia prima invisible para productos que se vendían como completamente automatizados**. TechCrunch describió a la plataforma como el "habilitador oculto" de un enfoque de fingir-hasta-lograrlo en inteligencia artificial, donde productos anunciados como inteligentes en realidad dependían de la fuerza laboral de MTurk detrás de la cortina. El comprador final de un producto de IA rara vez sabía cuántas manos humanas habían tocado los datos que lo hacían funcionar.

## El bucle que se comió a sí mismo

La bisagra real de esta historia es un estudio de investigadores del EPFL, la Escuela Politécnica Federal de Lausana en Suiza, publicado en 2023. **Veniamin Veselovsky, Manoel Horta Ribeiro y Robert West rehicieron una tarea de resumen de textos** en Mechanical Turk y, combinando detección de patrones de tecleo con clasificación de texto sintético, estimaron que **entre 33% y 46% de los trabajadores usó modelos de lenguaje como ChatGPT para completar la tarea**, justo el tipo de trabajo que se suponía que sólo un humano podía hacer bien.

> Es tentador confiar en el crowdsourcing para validar resultados de modelos de lenguaje o crear datos de referencia humana. Pero, ¿qué pasa si los propios trabajadores usan esos modelos para aumentar su productividad e ingresos? _— Veselovsky, Ribeiro y West, investigadores de EPFL_

El hallazgo cerraba un círculo perverso: **humanos usando inteligencia artificial para fingir el juicio humano que la IA necesitaba para entrenarse**, dentro de una plataforma que ya fingía, desde su propio nombre, ser algo que no era. Los investigadores lo describieron como su "canario en la mina de carbón": una advertencia de que plataformas, académicos y trabajadores necesitaban encontrar formas nuevas de garantizar que los datos humanos siguieran siendo, de hecho, humanos.

## Por qué cierra ahora y no antes

![Mechanical Turk cierre 2026: mano suelta gafete de trabajador anónimo junto a laptop apagándose](/images/posts/el-trabajo-humano-que-la-ia-ya-no-necesita-fingir-mas/1.webp)

  

El anuncio llegó sin ceremonia. **AWS agregó Mechanical Turk a su lista de "Services in Maintenance"**, la categoría que usa Amazon para servicios que dejarán de recibir funciones nuevas, y publicó en el sitio de MTurk que la plataforma **se cerrará a nuevos clientes a partir del 30 de julio de 2026**, según confirmaron The Register y TechCrunch. Los usuarios existentes podrán seguir operando con normalidad; lo que desaparece es la puerta de entrada. AWS lo explicó con una frase deliberadamente escueta: la decisión se tomó "tras una consideración cuidadosa", y la empresa seguirá invirtiendo en seguridad y disponibilidad, pero no planea introducir funciones nuevas.

Amazon no ha explicado públicamente por qué decidió retirar el servicio justo ahora, pero **ya empuja a los nuevos clientes hacia Amazon SageMaker Ground Truth**, según reportó Softonic: su propia alternativa gestionada, con paneles de trabajadores curados en lugar de un mercado abierto y anónimo. El mensaje entre líneas es más elocuente que cualquier comunicado oficial: cuando ya no puedes verificar quién etiqueta tus datos, la solución no es prescindir del etiquetado humano, es cerrar el mercado abierto y controlarlo desde adentro.

## El patrón detrás: de mercado abierto a panel cerrado

Lo que le pasa a Mechanical Turk no es un caso aislado, es la forma que está tomando toda la industria del etiquetado de datos. **El crowdsourcing abierto y anónimo, la fórmula que definió el sector durante casi dos décadas, está siendo reemplazado por plataformas gestionadas con controles de calidad e identidad verificada**. No es una decisión ética de las empresas involucradas; es que el dato sin verificar dejó de tener valor comercial en un mundo donde entrenar modelos con datos contaminados por otros modelos degrada la calidad del producto final.

Según estimaciones académicas de Difallah y sus colaboradores, presentadas en la conferencia WSDM, **para 2019 el 60% de los trabajadores de Mechanical Turk residía en Estados Unidos y un 30% en India**, un dato ya histórico, previo al colapso actual, pero que ilustra que la plataforma nunca tuvo un centro de gravedad claro en América Latina. Las plataformas sucesoras de etiquetado gestionado sí compiten hoy por ese trabajo en la región, aunque su huella laboral específica en México y Sudamérica para 2026 todavía no está documentada con el rigor suficiente para citarla aquí sin especular.

## La pregunta que Mechanical Turk deja sin responder

Durante años, "dato de entrenamiento humano" fue una etiqueta que casi nadie cuestionaba a fondo. **Mechanical Turk no cierra porque la industria haya dejado de necesitar juicio humano**, lo sigue necesitando, y cada vez más, para evaluación de seguridad, revisión de contenido y comparación de respuestas entre modelos. Cierra porque el mercado abierto que prometía entregar ese juicio humano perdió la capacidad de demostrar que en verdad lo hacía.

> Mechanical Turk no cierra porque la IA ya no necesite humanos. Cierra porque dejó de poder demostrar que los tenía.

Si ya no se puede verificar que un humano etiquetando datos sea, de hecho, humano, **¿qué es exactamente lo que la industria sigue llamando "entrenamiento con datos humanos"?**

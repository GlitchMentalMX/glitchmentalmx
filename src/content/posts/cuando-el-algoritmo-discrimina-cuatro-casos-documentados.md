---
title: 'Cuando el algoritmo discrimina: cuatro casos documentados'
pubDate: 2026-06-03T23:41:05.820Z
updatedDate: 2026-06-04T01:50:41.562Z
description: >-
  El sesgo algorítmico —cuando un sistema automatizado reproduce y amplifica las
  desigualdades de sus datos de entrenamiento— no es una hipótesis académica.
  Es…
heroImage: >-
  /images/posts/cuando-el-algoritmo-discrimina-cuatro-casos-documentados/hero.jpg
heroImageAlt: >-
  Cuando el algoritmo discrimina: sistema automatizado evalúa expedientes bajo
  supervisión humana
---
**El sesgo algorítmico** —cuando un sistema automatizado reproduce y amplifica las desigualdades de sus datos de entrenamiento— no es una hipótesis académica. Es un inventario de daños concretos, con víctimas identificadas, perpetrado por herramientas diseñadas como solución a la arbitrariedad humana.

## COMPAS y la justicia predictiva: condenados antes de reincidir

**COMPAS es un sistema de evaluación de riesgo** —herramienta de análisis predictivo de reincidencia criminal— utilizado en al menos nueve estados de EE. UU. para informar decisiones sobre fianzas y sentencias. En 2016, ProPublica analizó los puntajes asignados a más de 7,000 personas arrestadas en el condado de Broward, Florida, y documentó disparidades raciales sistemáticas que el fabricante no había reportado.

**Los números son contundentes:** las personas negras eran clasificadas como de alto riesgo de cometer cualquier crimen futuro a una tasa 45% mayor que las personas blancas, después de controlar variables como historial criminal, edad y género. Las falsas alarmas contra personas negras —clasificarlas como alto riesgo cuando no reincidieron— ocurrían casi al doble de la tasa que contra personas blancas. La precisión general del sistema para predecir reincidencia era del 61%, marginalmente mejor que un volado.

> El algoritmo no discrimina por capricho: discrimina con una eficiencia que ningún humano podría sostener a escala industrial. Cuando se le señala, la empresa dice que el sistema "nunca fue usado de forma independiente". Eso no es una disculpa. Es la descripción exacta del problema.

**El fabricante, entonces llamado Northpointe y hoy Equivant, nunca retiró el producto.** Sigue en uso. La respuesta institucional a los hallazgos de ProPublica fue una disputa metodológica sobre qué definición de "equidad" es la correcta —un debate legítimo en estadística— mientras el sistema continuaba informando decisiones sobre la libertad de personas reales.

## Amazon y el filtro de CVs: el sesgo aprendido en una década

**A partir de 2014, Amazon desarrolló en secreto un sistema de IA** para clasificar candidatos a puestos técnicos en una escala de una a cinco estrellas. El objetivo era automatizar la primera etapa del reclutamiento: ingresar 100 currículums y que el sistema devolviera los cinco mejores. Según fuentes internas citadas por Reuters en 2018, el equipo lo describía como el "santo grial" de los recursos humanos.

**El sistema fue entrenado con diez años de currículums históricos de Amazon**, en una industria mayoritariamente masculina. El resultado fue predecible en retrospectiva: el modelo aprendió a penalizar currículums que contenían la palabra "women's" —como en "equipo de deportes women's" o "women's college"— y a descontar graduadas de dos universidades femeninas específicas. Amazon detectó el problema en 2015 e intentó corregirlo, pero no logró garantizar que el sistema fuera neutral en todas sus variables. Lo canceló definitivamente en 2017. En su declaración pública, Amazon sostuvo que el sistema "nunca fue usado de forma independiente por los reclutadores". La empresa no explicó por qué tardó dos años en cancelarlo desde que detectó el sesgo.

## Reconocimiento facial: el error más caro lo paga quien menos poder tiene

**En enero de 2018, Joy Buolamwini y Timnit Gebru publicaron "Gender Shades"** en la Conferencia sobre Equidad, Responsabilidad y Transparencia del MIT. El estudio evaluó tres sistemas comerciales de clasificación de género mediante reconocimiento facial —desarrollados por IBM, Microsoft y Face++— y encontró disparidades de precisión que los fabricantes no habían medido ni reportado. La tasa de error para hombres de piel clara era de 0.8%. Para mujeres de piel oscura, llegaba al 34.7% en el caso de IBM. Los conjuntos de datos usados para entrenar estos sistemas eran, según el estudio, 79.6% y 86.2% de personas de piel clara, respectivamente.

**El caso de Robert Williams tradujo esas estadísticas en consecuencias materiales.** El 9 de enero de 2020, la policía de Detroit llegó a su casa en Farmington Hills y lo arrestó frente a su esposa y sus dos hijas. Williams, un hombre negro, era acusado de robar relojes de lujo de una tienda Shinola en 2018. La evidencia era una coincidencia generada por el sistema de reconocimiento facial de la Policía del Estado de Michigan. Cuando un detective le mostró la imagen del sospechoso durante el interrogatorio, Williams respondió: "This is not me. I hope you don't think all Black people look alike." La respuesta del detective, documentada por la ACLU: _"The computer says it's you."_ Williams estuvo detenido 30 horas. Fue el primer caso de arresto erróneo por reconocimiento facial reportado públicamente en EE. UU. Detroit llegó a un acuerdo legal con Williams y cambió sus políticas de uso de la tecnología. El sistema siguió operando bajo nuevas condiciones.

  

![Cuando el algoritmo discrimina: clasificador automatizado separa expedientes en proceso de decisión](/images/posts/cuando-el-algoritmo-discrimina-cuatro-casos-documentados/1.jpg)

## Apple Card y el crédito invisible: el algoritmo que actúa como si supiera tu género

**En noviembre de 2019, el desarrollador David Heinemeier Hansson publicó en redes sociales** que su límite de crédito en la Apple Card era 20 veces mayor que el de su esposa, a pesar de que presentaban declaración de impuestos conjunta y ella tenía mejor score crediticio. El hilo se volvió viral. El cofundador de Apple, Steve Wozniak, reportó una experiencia similar. El Departamento de Servicios Financieros de Nueva York (NYDFS) abrió una investigación formal contra Goldman Sachs, el banco emisor.

**En marzo de 2021, el NYDFS publicó su resolución:** Goldman Sachs quedó absuelto de discriminación intencional. El regulador analizó datos de casi 400,000 solicitantes en Nueva York y encontró que, cuando se controlaban características crediticias equivalentes, hombres y mujeres obtenían resultados similares. Sin embargo, el reporte señaló explícitamente "deficiencias en el servicio al cliente y una falta percibida de transparencia que erosionó la confianza de los consumidores". Goldman revisó los expedientes de las mujeres afectadas y elevó sus límites para igualarlos con los de sus cónyuges, lo que Hansson interpretó como evidencia de que algo funcionaba mal desde el principio. El mecanismo detrás de las disparidades —discriminación por variables proxy que correlacionan con el género sin nombrarlo— quedó sin explicación pública.

## El patrón detrás de los cuatro casos: no es el error, es la arquitectura

**Los cuatro casos comparten una estructura idéntica.** El algoritmo es entrenado con datos históricos que reflejan distribuciones desiguales de poder: un sistema de justicia que históricamente encarceló más personas negras, una industria tecnológica históricamente masculina, conjuntos de datos de rostros construidos principalmente con personas de piel clara, un sistema financiero que históricamente trató de forma diferente a hombres y mujeres. El modelo aprende esa distribución y la reproduce con precisión industrial. A esto se le llama sesgo de datos, y es la forma más común de sesgo algorítmico.

**La "objetividad" del modelo funciona como coartada.** Cuando los resultados son cuestionados, la respuesta habitual combina tres elementos: primero, una defensa técnica ("el algoritmo no usa la variable género"); segundo, una concesión cosmética (revisar casos, ajustar límites, cancelar el proyecto); y tercero, ausencia de consecuencias estructurales. Ninguno de los cuatro responsables involucrados (fabricantes o emisores) fue sancionado de forma sistémica. COMPAS sigue operando. Amazon desarrolló sistemas de reclutamiento posteriores. El reconocimiento facial policial se expandió. Goldman Sachs fue absuelto.

## LATAM en blanco: sin auditorías, sin casos documentados, sin ley vigente

**México y la región usan estos sistemas** —o equivalentes locales— sin marco regulatorio específico aprobado. Entre 2024 y 2025 se presentaron en el Congreso de la Unión varias iniciativas de ley sobre inteligencia artificial, incluyendo la Ley Federal para el Desarrollo Ético, Soberano e Inclusivo de la Inteligencia Artificial (abril de 2025), que propone un sistema de clasificación de riesgos similar al de la regulación europea e incluye explícitamente el sesgo algorítmico como riesgo en decisiones laborales y crediticias. A mediados de 2026, ninguna ha sido aprobada.

**La ausencia de casos documentados en LATAM no indica ausencia de sesgo:** indica ausencia de investigación. Los sistemas de puntuación crediticia, filtros de reclutamiento automatizados y herramientas de vigilancia biométrica operan en la región sin obligación de auditoría ni mecanismo de sanción vigente. El debate legislativo existe; la capacidad institucional para implementarlo y hacerlo cumplir, según analistas consultados por Infobae en abril de 2026, es la pregunta sin respuesta.

> Documentar el daño es el primer paso para exigir rendición de cuentas. En LATAM, ese inventario todavía no existe.

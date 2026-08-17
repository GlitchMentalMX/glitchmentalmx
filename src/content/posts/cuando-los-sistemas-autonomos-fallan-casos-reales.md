---
title: 'Cuando los sistemas autónomos fallan: casos reales'
category: Inteligencia Artificial
pubDate: 2026-03-29T14:01:00.005Z
updatedDate: 2026-03-29T14:01:42.865Z
description: >-
  Los riesgos de los sistemas autónomos no son ejercicios de filosofía futura.
  Tienen historial documentado, víctimas identificadas y litigios activos. En
  2024…
heroImage: /images/posts/cuando-los-sistemas-autonomos-fallan-casos-reales/hero.webp
heroImageAlt: >-
  Cuando los sistemas autónomos fallan: paquete atascado en cruce de cintas con
  señal roja de error
---
Los riesgos de los sistemas autónomos no son ejercicios de filosofía futura. Tienen historial documentado, víctimas identificadas y litigios activos. **En 2024 y 2025, robotaxis arrastraron peatones, algoritmos de salud negaron cobertura a una persona por segundo y una respuesta incorrecta de IA borró 100 mil millones de dólares en valor bursátil en horas**, según DigitalDefynd en su análisis de los principales fallos de IA publicado en diciembre de 2025.

## Transporte autónomo: el historial que los fabricantes no publicitan

Los datos de la NHTSA recopilados por Craft Law Firm y actualizados en enero de 2026 registran 5,202 incidentes con vehículos autónomos o semiautónomos en Estados Unidos hasta noviembre de 2025. De esos, 451 resultaron en heridos y 65 en fatalidades. En 2024, el número de accidentes con coches autónomos casi se duplicó respecto al año anterior, pasando de 288 a 544 incidentes reportados, según FinanceBuzz en su análisis actualizado de enero de 2026.

El caso de Waymo ilustra los límites del sistema incluso en el operador más disciplinado del sector. Entre julio de 2021 y noviembre de 2025, Waymo reportó 1,429 incidentes a la NHTSA. En mayo de 2025, la empresa emitió un recall para 1,212 de sus vehículos autónomos por un fallo de software que podía generar colisiones menores con barreras de la vía. **El sistema no detectaba correctamente objetos como cadenas y puertas de acceso — precisamente el tipo de objeto que no aparece con frecuencia en datos de entrenamiento** pero que existe en el mundo real.

La crisis de septiembre de 2025 fue más visible: un clip viral mostró un sedán autónomo ignorando las luces de un autobús escolar detenido con las señales de parada activadas. Según AI CERTs en su análisis de marzo de 2026, una investigación posterior de la NHTSA vinculó 58 violaciones registradas de reglas de tráfico a 14 accidentes y 23 heridos en vehículos de un fabricante. El mismo análisis documentó que en marzo de 2026 se registraron Teslas avanzando bajo barreras activas de ferrocarril.

## Salud: algoritmos que deciden sin entender el contexto

El caso más documentado de fallo sistémico en algoritmos de decisión médica es el sistema PxDx de Cigna, investigado por ProPublica en 2023 y con consecuencias legales que se extendieron a 2024 y 2025. El sistema permitía a médicos revisar y rechazar reclamaciones de cobertura. Según los datos recogidos por DigitalDefynd, **las "revisiones" médicas promediaban 1.2 segundos por caso, contribuyendo a aproximadamente 300,000 denegaciones en dos meses**. La investigación y los litigios posteriores revelaron que el sistema operaba de facto de forma autónoma aunque nominalmente hubiera supervisión humana.

En paralelo, el sistema de puntuación de inquilinos de SafeRent fue objeto de una demanda colectiva por discriminación algorítmica. En noviembre de 2024, la empresa llegó a un acuerdo de 2.2 millones de dólares y se comprometió a dejar de ofrecer puntuaciones de "aceptar/rechazar" para solicitantes con vouchers de vivienda, y a someter cualquier modelo futuro a auditoría independiente de imparcialidad. El caso estableció un precedente: **la IA en decisiones de alto impacto puede violar leyes antidiscriminación aunque el fabricante no haya tenido intención discriminatoria**.

  

![Cuando los sistemas autónomos fallan: trenes en intersección de vías con cambio mal alineado generando conflicto](/images/posts/cuando-los-sistemas-autonomos-fallan-casos-reales/1.png)

  

## Trading algorítmico: cuando la velocidad elimina el margen de intervención

Los mercados financieros son el entorno donde los sistemas autónomos operan a la escala y velocidad más extremas. El _flash crash_ de 2010 — donde el índice Dow Jones perdió casi 1,000 puntos en minutos para recuperarse parcialmente en segundos — fue el primer ejemplo masivo de comportamiento emergente en sistemas autónomos de trading. Ningún humano tomó las decisiones que causaron el colapso; fueron el resultado de la interacción de múltiples algoritmos operando de forma autónoma.

Un análisis publicado en PMC sobre fallos sistémicos en trading algorítmico señala algo estructuralmente importante: en sistemas completamente autónomos, los humanos están presentes en el diseño y en la puesta en marcha, pero no durante la operación real. **No pueden intervenir si algo sale mal. No existe el andamiaje organizacional de alta fiabilidad — la máquina opera sola, al menos durante algunos períodos de tiempo.** Esto no es una falla de diseño evitable — es una característica inherente a los sistemas que operan a velocidades que superan la capacidad de reacción humana.

## El patrón común en todos los fallos

Los casos de transporte, salud y finanzas comparten una estructura de fallo común. El sistema fue diseñado y validado para un rango de condiciones. Dentro de ese rango, el sistema funciona correctamente — y eso genera confianza. Esa confianza lleva a ampliar el despliegue. Al ampliar el despliegue, el sistema encuentra condiciones que estaban fuera del rango de validación. El sistema falla de formas que los diseñadores no anticiparon, porque esas condiciones no estaban en los datos de entrenamiento o prueba. La consecuencia la paga alguien que no diseñó el sistema, no lo desplegó y no tenía forma de conocer sus límites.

Lo que ninguno de estos casos contradice es la utilidad potencial de los sistemas autónomos. Lo que todos confirman es que **la confiabilidad de un sistema autónomo depende directamente de la honestidad con que se documentan y comunican sus límites** — algo que el mercado actual no incentiva de forma suficiente.

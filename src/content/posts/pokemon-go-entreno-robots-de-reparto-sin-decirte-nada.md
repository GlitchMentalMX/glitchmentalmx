---
title: Pokémon Go entrenó robots de reparto sin decirte nada
category: Inteligencia Artificial
pubDate: 2026-03-16T12:49:00.005Z
updatedDate: 2026-06-06T19:32:45.705Z
description: >-
  Niantic recolectó 30 mil millones de imágenes urbanas con Pokémon Go durante
  ocho años. Ahora las usa para entrenar robots de reparto que navegan ciudades…
heroImage: /images/posts/pokemon-go-entreno-robots-de-reparto-sin-decirte-nada/hero.png
heroImageAlt: >-
  Pokémon Go entrenó robots de reparto: usuario mirando smartphone mientras
  robot autónomo circula en calle con mapa digital
---
Niantic recolectó 30 mil millones de imágenes urbanas con Pokémon Go durante ocho años. Ahora las usa para entrenar robots de reparto que navegan ciudades sin GPS. Los jugadores nunca supieron que estaban trabajando como cartógrafos. Los Términos de Servicio lo cubrían.

## Cómo funciona el sistema

Cuando un jugador de Pokémon Go apuntaba su teléfono a un edificio para capturar un Pikachu, la app registraba algo más que la partida: la imagen del entorno, la ubicación precisa del dispositivo con margen de centímetros, la orientación de la cámara, la velocidad de movimiento y las condiciones de luz. Multiplicado por cientos de millones de usuarios durante años, el resultado es el conjunto de datos de mapeo urbano más denso que existe.

Según el MIT Technology Review, que publicó el reporte el 10 de marzo, Niantic Spatial — el _spinout_ de IA que Niantic creó en mayo de 2025 — entrenó su sistema de posicionamiento visual con esas 30 mil millones de imágenes. El modelo resultante puede determinar la ubicación de un dispositivo con una precisión de pocos centímetros, basándose únicamente en lo que la cámara ve, sin necesidad de señal GPS.

La primera aplicación comercial: una alianza con Coco Robotics, una _startup_ que opera alrededor de 1,000 robots de reparto en Los Ángeles, Chicago, Jersey City, Miami y Helsinki. Los robots, que llevan hasta ocho pizzas o cuatro bolsas de supermercado, tienen el problema crónico de los repartidores urbanos: el GPS falla en zonas de alta densidad porque las señales rebotan en los edificios. El sistema de Niantic Spatial resuelve ese problema usando visión computacional entrenada con las imágenes de los jugadores.

## El problema del consentimiento fantasma

![Pokémon Go entrenó robots de reparto: sombra de usuario con smartphone proyectada sobre mapa urbano digital](/images/posts/pokemon-go-entreno-robots-de-reparto-sin-decirte-nada/1.png)

  

Coco ha completado más de 500,000 entregas desde su lanzamiento. Cada entrega exitosa en esas ciudades depende, en parte, de datos que los jugadores de Pokémon Go generaron sin saber que estaban contribuyendo a un negocio de robótica.

> Los Términos de Servicio de Niantic siempre incluyeron el derecho a usar datos de la app para otros fines. Nadie los leyó. Nadie tenía por qué saber que "otros fines" significaba entrenar robots de pizza.

La distinción legal es clara: Niantic no violó ningún contrato. La distinción ética es más incómoda. Existe una diferencia entre "los datos que recolectamos pueden usarse para mejorar el servicio" — que es lo que casi cualquier usuario entiende al aceptar unos Términos de Servicio — y "los datos que recolectamos los venderemos a empresas de robótica como infraestructura de negocio."

Los jugadores de Pokémon Go no recibieron compensación. Niantic Spatial, en cambio, está construyendo un negocio B2B sobre esos datos. El modelo se llama _crowdsourcing involuntario_, y no es nuevo: Google Street View funciona de forma similar con los datos de navegación de usuarios de Maps. Pero la escala y la opacidad del caso Niantic lo hacen especialmente ilustrativo.

## Qué sigue para Coco y para Niantic Spatial

Coco está probando un segundo modelo de robot llamado Coco 2, que puede operar no solo en aceras sino en calles y carriles para bici a velocidades de hasta 21 km/h, sin operador humano remoto. La precisión de localización de Niantic Spatial es un componente crítico para que ese nivel de autonomía funcione de forma segura.

Brian McClendon, CTO de Niantic Spatial, lo explicó de forma directa al MIT Technology Review: "Resulta que conseguir que Pikachu corra de forma realista alrededor de un edificio y conseguir que el robot de Coco se mueva de forma precisa y segura por la ciudad es, en realidad, el mismo problema."

Niantic tiene más de un millón de ubicaciones geolocalizadas con precisión de centímetros en su base de datos — hot spots de sus juegos donde los jugadores convergían y capturaban imágenes repetidamente desde distintos ángulos y condiciones de luz. Esa densidad de datos en puntos específicos es lo que hace al sistema más preciso que cualquier alternativa construida con datos de mapas convencionales.

## La lección que aplica más allá de los robots

El caso Niantic-Coco es un ejemplo temprano de un patrón que se va a repetir. Las empresas que recolectaron datos a escala masiva durante la última década — bajo la promesa de un servicio gratuito o de entretenimiento — están descubriendo que esos datos tienen valor en mercados que no existían cuando los recolectaron.

Los usuarios que generaron esos datos raramente tienen mecanismos legales para reclamar una parte del valor creado. Los Términos de Servicio, escritos de forma deliberadamente amplia, cubren prácticamente cualquier uso futuro.

La pregunta que el caso Niantic deja abierta no es legal. Es de diseño: ¿cómo deberían verse los Términos de Servicio cuando el uso real de los datos es materialmente diferente de lo que un usuario razonable esperaría al aceptarlos?

---
title: 'Hackers de Corea del Norte atacaron Axios: qué pasó'
pubDate: 2026-04-02T12:48:00.004Z
updatedDate: 2026-06-26T01:37:38.779Z
description: >-
  El 31 de marzo de 2026, una librería de JavaScript con más de 100 millones de
  descargas semanales fue convertida en un sistema de distribución de malware…
heroImage: /images/posts/hackers-de-corea-del-norte-atacaron-axios-que-paso/hero.jpg
heroImageAlt: >-
  Hackers Corea del Norte Axios: cable desconectado en panel de rack operativo,
  etiqueta de paquete en el suelo junto al servidor
---
El 31 de marzo de 2026, una librería de JavaScript con **más de 100 millones de descargas semanales** fue convertida en un sistema de distribución de malware durante menos de tres horas. El atacante no explotó una vulnerabilidad técnica de Axios: comprometió la cuenta del desarrollador que tenía permiso para publicar actualizaciones.

## Qué es Axios y por qué importa

Axios es una librería de JavaScript que simplifica las peticiones HTTP —la forma en que una aplicación se comunica con servidores externos. **Está presente en aproximadamente el 80% de los entornos de código y nube a nivel global**, según estimaciones de Wiz. Cualquier aplicación web o móvil que muestre datos de una API externa probablemente usa Axios, o una librería que depende de ella. Su ubicuidad es exactamente lo que la hace un objetivo valioso para un ataque de cadena de suministro.

## Cómo ocurrió el ataque

Según el análisis publicado por Google Threat Intelligence Group (GTIG) y confirmado por TechCrunch, SecurityWeek y Tenable, el atacante comprometió la cuenta npm del desarrollador principal de Axios. Cambió la dirección de correo registrada por una cuenta de ProtonMail controlada por ellos —dificultando que el desarrollador legítimo recuperara el acceso— y publicó dos versiones maliciosas: la 1.14.1 y la 0.30.4.

Las versiones comprometidas incluían una dependencia oculta llamada "plain-crypto-js" que **ejecutaba automáticamente un script de instalación capaz de descargar y activar malware en Windows, macOS y Linux sin interacción del usuario.** El malware desplegado —identificado por GTIG como WAVESHAPER.V2— es un troyano de acceso remoto (RAT) que permite a los atacantes tomar control completo del sistema afectado: recopilar información, ejecutar comandos y enumerar archivos.

Las versiones maliciosas estuvieron disponibles entre las 00:21 y las 03:20 UTC del 31 de marzo —aproximadamente dos horas y 54 minutos— antes de ser detectadas y eliminadas. Durante ese tiempo, según Wiz, fueron descargadas por cerca del 3% de la base de usuarios de Axios.

> El ataque no explotó el código de Axios. Explotó la confianza que los desarrolladores depositan en él.

## Quién está detrás y qué buscan

GTIG atribuye el ataque al grupo UNC1069, un actor vinculado a Corea del Norte con actividad documentada desde al menos 2018, conocido por atacar empresas de criptomonedas y finanzas descentralizadas. La atribución se basa en el uso de WAVESHAPER.V2 —una versión evolucionada de un backdoor anteriormente atribuido a este grupo— y en superposiciones de infraestructura con operaciones anteriores de UNC1069, según el blog oficial de Google Cloud.

**La motivación inmediata del ataque aún no está confirmada.** John Hultquist, analista jefe de GTIG, señaló que el impacto completo tardará meses en evaluarse y que, dada la trayectoria del grupo, es probable que emerjan ataques financieros secundarios derivados de las credenciales robadas durante la ventana de exposición.

## Qué deben hacer quienes pudieron ser afectados

Cualquier entorno que instaló las versiones 1.14.1 o 0.30.4 de Axios durante el 31 de marzo de 2026 debe tratarse como comprometido. Las acciones recomendadas por Tenable y Huntress son: bajar a una versión segura (1.14.0 o 0.30.3), eliminar el directorio _node\_modules/plain-crypto-js_, rotar todas las credenciales accesibles durante la instalación, bloquear el dominio de comando y control sfrclak.com y la IP 142.11.206.73, y reconstruir el entorno desde una imagen limpia.

**El detalle más incómodo del caso Axios: ninguna auditoría local habría mostrado la infección.** El malware eliminaba sus propios archivos tras ejecutarse y restauraba el package.json a un estado limpio. Si tu pipeline instaló las versiones afectadas, el sistema puede parecer intacto mientras el acceso ya está comprometido.

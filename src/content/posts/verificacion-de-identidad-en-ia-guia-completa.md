---
title: 'Verificación de identidad en IA: guía completa'
pubDate: 2026-04-22T12:21:00.005Z
updatedDate: 2026-06-15T15:24:17.836Z
description: >-
  El 14 de abril de 2026, Anthropic actualizó una página en su centro de soporte
  sin comunicado, sin correo, sin blog. Días después, los usuarios empezaron a…
heroImage: /images/posts/verificacion-de-identidad-en-ia-guia-completa/hero.jpg
heroImageAlt: >-
  verificación de identidad IA: mujer presenta pasaporte ante cámara de control
  en ventanilla
---
El 14 de abril de 2026, Anthropic actualizó una página en su centro de soporte sin comunicado, sin correo, sin blog. Días después, los usuarios empezaron a ver una pantalla que pedía **pasaporte físico y selfie en vivo para acceder a ciertas funciones de Claude**. Ningún competidor directo lo hace. Este es el mapa completo de lo que está pasando.

## Qué es el KYC en IA

KYC (_Know Your Customer_, o "conoce a tu cliente") es el proceso de verificar la identidad real de un usuario mediante documentos oficiales. Es el mismo mecanismo que usan los bancos, las casas de bolsa y los exchanges de criptomonedas antes de abrir una cuenta. Que aparezca ahora en una plataforma de inteligencia artificial es, en términos prácticos, **la primera vez que una IA de consumo masivo adopta estándares de acceso de nivel financiero**.

Anthropic implementó la verificación a través de Persona Identities, una empresa de San Francisco cuya infraestructura ya usan Reddit, Discord y servicios del sector financiero. El proceso requiere un documento de identificación oficial físico —pasaporte, licencia de manejo o credencial nacional— y una selfie en vivo capturada en el momento. Documentos digitales, credenciales estudiantiles y fotocopias no son aceptados. Según la página oficial de soporte de Claude, el proceso toma menos de cinco minutos.

## Por qué lo implementó Anthropic

Anthropic declara tres razones oficiales: prevenir el abuso de la plataforma, hacer cumplir sus políticas de uso y satisfacer obligaciones legales en ciertas regiones. La verificación **no es universal**: se activa en escenarios específicos, como acceder a funciones avanzadas, completar el registro al plan Max, o cuando los sistemas de integridad detectan señales de riesgo.

Hay un contexto que hace la medida más llamativa: en febrero de 2026, Anthropic registró un aumento de aproximadamente 60% en registros gratuitos, en parte porque rechazó un contrato con redes clasificadas del Pentágono que OpenAI sí aceptó. Muchos usuarios migraron a Claude precisamente por razones de privacidad. Que la misma compañía implemente meses después **la verificación de identidad más estricta del sector** es, cuando menos, una ironía con datos.

> Claude exige pasaporte. ChatGPT no. Gemini no. Anthropic acaba de regalarle una ventaja a sus competidores. _— @hqmank, X, 15 de abril de 2026_

## Qué pasa con tus datos

![verificación de identidad IA: escáner digital ilumina pasaporte abierto en mostrador](/images/posts/verificacion-de-identidad-en-ia-guia-completa/1.jpg)

  

Esta es la parte que más preguntas genera. Según Anthropic, **tu identificación y selfie se almacenan en los servidores de Persona, no en los sistemas de Anthropic**. La compañía se define como "controladora de datos" —establece las reglas— pero la custodia física de los documentos la tiene Persona. Anthropic establece que los datos están cifrados en tránsito y en reposo, no se usan para entrenar modelos y no se comparten con terceros para fines de marketing.

La advertencia real está en el historial de Persona. En octubre de 2025, una filtración en Discord expuso aproximadamente 70,000 identificaciones oficiales que usuarios habían enviado para verificación de edad a través de la misma empresa. Persona niega vínculos con agencias de seguridad gubernamental, pero el debate sobre su cadena de subprocesadores —que incluye AWS, Google, OpenAI y Stripe, entre otros— sigue abierto. Cuando una identificación oficial pasa por múltiples capas de infraestructura de terceros, **el riesgo no desaparece porque una empresa prometa no usarla**.

## A quién afecta y cómo manejarlo

La verificación no aplica a todos los usuarios. Según la documentación oficial, los principales grupos que pueden encontrar el prompt son: usuarios que acceden a funciones avanzadas de modelos, cuentas en regiones con restricciones legales, personas que violan las políticas de uso, y menores de edad. El acceso vía API —que es cómo la mayoría de los desarrolladores integran Claude en sus aplicaciones— actualmente no requiere verificación personal de identidad.

Si te aparece el prompt de verificación y decides proceder: ten el documento físico a la mano, usa buena iluminación para la selfie, y verifica que tu identificación no esté vencida ni dañada. Si el proceso falla, Anthropic ofrece múltiples intentos y un formulario de contacto para apelar. Si decides no verificarte, el acceso a esas funciones específicas quedará restringido, pero el uso básico de Claude no necesariamente se ve afectado.

## El panorama más amplio: ¿hacia dónde va el acceso a la IA?

Anthropic no está completamente sola en esta dirección. Desde 2025, OpenAI exige verificación de identidad para desarrolladores que quieren acceder vía API a sus modelos más avanzados. La diferencia es que Anthropic la está aplicando a **usuarios finales de consumo**, un paso que ningún otro laboratorio principal había dado para el público general.

La pregunta que varios analistas ya hacen en voz alta es si el acceso anónimo a la inteligencia artificial de consumo tiene los días contados. Si los reguladores en Europa o Estados Unidos formalizan requerimientos de verificación de edad o identidad —algo que varios proyectos de ley ya contemplan— lo que hoy es una decisión voluntaria de Anthropic podría convertirse en estándar industrial. Para los usuarios en LATAM, donde la penetración de documentos de identidad digitales es desigual y las condiciones de conectividad varían, ese escenario implicaría **una nueva barrera de acceso que no tiene que ver con el precio ni con la tecnología**.

> El KYC en IA no es solo una medida de seguridad: es una decisión sobre quién puede usar los modelos más avanzados y quién no.

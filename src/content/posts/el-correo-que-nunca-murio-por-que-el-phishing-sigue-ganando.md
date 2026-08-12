---
title: 'El correo que nunca murió: por qué el phishing sigue ganando'
category: Cultura Digital
pubDate: 2026-08-12T06:18
updatedDate: ''
description: El phishing lleva 43 años ganando porque el correo nunca verificó identidad. Datos del FBI, CONDUSEF y The CIU, sin dramatismo.
heroImage: /images/uploads/Phishing.webp
heroImageAlt: 'Phishing: hombre joven compara sobre nuevo con sobre viejo idéntico junto a pila de décadas'
draft: true
---

El phishing lleva más de cuatro décadas vivo y en 2026 sigue siendo el fraude digital más rentable del planeta. **No es un problema de detección: el correo electrónico nunca aprendió a verificar quién lo manda**, y cada parche añadido en 43 años solo tapó el síntoma.

## Un protocolo de 1982 que nunca aprendió a desconfiar

**El correo electrónico corre sobre un protocolo que cumple más de cuatro décadas de antigüedad.** El SMTP (Simple Mail Transfer Protocol) se definió en 1982, cuando internet era una red académica pequeña donde todos los nodos se conocían entre sí. Nadie diseñó ahí un mecanismo para comprobar que el remitente de un correo era quien decía ser, porque en ese contexto cerrado, mentir sobre la propia identidad no era una amenaza real.

Ese hueco de origen nunca se cerró. **Cada capa de seguridad que se le añadió al correo en las siguientes décadas —SPF, DKIM, DMARC— es un parche opcional montado encima de un sistema que, por defecto, sigue confiando en el remitente.** Un dominio puede implementar los tres protocolos de autenticación disponibles y aun así ser vulnerable a un ataque que no falsifica ningún dominio, sino que compromete una cuenta legítima o imita el tono de un directivo real.

## Cada parche fue para el síntoma, no para la causa

La historia de las defensas contra el phishing es, en el fondo, la historia de tratar los tratar los efectos de un mismo problema sin tocar la causa. Los filtros de spam detectan patrones de contenido sospechoso. DMARC detecta dominios falsificados. La autenticación multifactor detecta credenciales robadas. La capacitación corporativa detecta —cuando funciona— comportamiento humano de riesgo. **Ninguna de estas capas verifica la intención ni la autoridad real de quien manda el correo**, porque ese nunca fue el problema que se propusieron resolver.

El resultado es un ecosistema de defensa acumulativo: cada nueva amenaza generó una nueva herramienta, pero ninguna herramienta reemplazó a la anterior ni corrigió el diseño original. **Se construyó un edificio de veinte pisos sobre unos cimientos que nunca se calcularon para sostener ese peso**, y cada capa nueva añade complejidad operativa sin cerrar la brecha de fondo: la ausencia de una verificación de identidad nativa en el protocolo mismo.

## BEC: el fraude que no necesita romper nada

**El Business Email Compromise (BEC) —un fraude en el que un atacante compromete o suplanta una cuenta de correo corporativa para engañar a alguien y que autorice una transferencia de dinero— es la prueba más clara de que el hueco de origen sigue abierto.** Según el Reporte Anual 2025 del Internet Crime Complaint Center (IC3) del FBI, este tipo de fraude generó 3,046 millones de dólares en pérdidas reportadas solo en Estados Unidos durante 2025, frente a 2,770 millones en 2024. Es la segunda categoría de cibercrimen con mayores pérdidas económicas del año, después del fraude de inversión.

Lo relevante no es solo la cifra, sino el mecanismo. **El BEC no usa malware ni enlaces maliciosos que un filtro pueda bloquear: ataca directamente el momento en que un humano decide confiar y actuar.** De acuerdo con el propio IC3, el 86% de las pérdidas por BEC se mueven mediante transferencia bancaria o ACH, es decir, dentro de flujos financieros legítimos que ningún antivirus está diseñado para detener.

> El correo electrónico es la única tecnología de internet que sigue operando bajo el supuesto de 1982: que nadie va a mentir sobre quién es.

El total de pérdidas por cibercrimen reportadas al IC3 en 2025 alcanzó 20,877 millones de dólares, un incremento del 26% respecto al año anterior, según el mismo reporte. Dentro de ese total, **la inteligencia artificial ya deja huella medible**: el FBI registró 22,364 quejas con un componente de IA identificado, con pérdidas ajustadas de 893 millones de dólares, aunque el propio organismo advierte que la cifra real es casi con certeza mayor, porque muchas víctimas no llegan a saber que la IA estuvo involucrada en el fraude que sufrieron. Del total de pérdidas por BEC, el IC3 atribuye directamente 30 millones de dólares a casos con un componente de IA confirmado: generadores de texto que redactan correos corporativos sin errores gramaticales ni de tono, y clonación de voz para reforzar la instrucción de pago por teléfono.

![](/images/uploads/Phishing%20Sec.webp)

## La ventana dorada dura treinta días

**La capacitación corporativa contra el phishing funciona, pero se degrada con velocidad preocupante.** De acuerdo con los benchmarks de ciberseguridad 2026 de Kymatio —que retoma el dato del Cost of a Data Breach Report 2025 de IBM—, el tiempo promedio de detección de una brecha originada por phishing es de 254 días, casi nueve meses en los que un atacante puede moverse lateralmente dentro de una red sin ser detectado.

El mismo análisis identifica lo que llama la "ventana dorada": **los empleados capacitados en los últimos treinta días tienen cuatro veces más probabilidades de reportar una amenaza activa que quienes recibieron su última capacitación hace más tiempo.** Esto reencuadra al "usuario educado" como un parche temporal que necesita mantenimiento constante, no como una solución que se instala una vez y queda resuelta.

## México, el blanco que crece más rápido

El ángulo regional confirma el patrón global, pero con una variable propia: la velocidad de inclusión digital sin la misma velocidad de educación digital. Entre enero y mayo de 2026, la Comisión Nacional para la Protección y Defensa de los Usuarios de Servicios Financieros (CONDUSEF) recibió 11,061 quejas formales por fraude bancario digital, un incremento del 11.4% respecto al mismo periodo del año anterior. **Uno de cada tres de esos reclamos proviene de personas mayores de 60 años**, el segmento que se incorporó más tarde a la banca móvil y enfrenta ese entorno con menos herramientas para distinguir un correo legítimo de uno falso.

El estudio "Análisis sobre Phishing en México 2025", elaborado por The Competitive Intelligence Unit (The CIU), calcula que 13.5 millones de personas en el país han sido víctimas de phishing. **Entre quienes perdieron dinero directamente —23.1% del total de víctimas—, la pérdida promedio fue de 8,750 pesos por persona.** El mismo estudio encontró que uno de cada tres internautas mexicanos se siente poco o nada preparado para reconocer un intento de phishing antes de caer en él.

**México no cuenta con un marco normativo federal específico y robusto para tipificar el phishing como delito propio**, lo que deja el peso de la respuesta casi por completo del lado de los bancos y de los usuarios individuales. Algunas entidades, como la Ciudad de México, ya empezaron a legislar el phishing como delito local por separado, pero la brecha entre la velocidad del fraude y la velocidad de la regulación sigue siendo, en la práctica, el margen en el que operan los atacantes.

**La incomodidad de fondo no es técnica, es de diseño**: cuarenta y tres años de contramedidas lograron encarecer el ataque promedio, pero no cambiaron la pregunta que el correo electrónico sigue sin poder responder por sí mismo. Queda abierto si esa pregunta —quién es realmente quien te escribe— se puede resolver alguna vez sobre la misma infraestructura que la ignoró desde el principio, o si América Latina va a tener que construir su propia respuesta regulatoria mientras el resto del mundo sigue debatiendo la suya.

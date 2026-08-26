---
title: 'El empleado que nunca existió: cuando RR.HH. falla'
category: Cultura Digital
pubDate: 2026-08-26T13:46
updatedDate: ''
description: 'Corea del Norte no hackeó la empresa: pasó la entrevista. Cómo el proceso de contratación se volvió la puerta de entrada, y qué expone a México.'
heroImage: /images/uploads/empleado-que-nunca-existio.webp
heroImageAlt: 'El empleado que nunca existió: figura cruza umbral de control, lado sólido y lado poroso sin fricción'
draft: true
---

El 28 de julio de 2026, el FBI reveló que un trabajador falso de Corea del Norte operó dentro de una agencia federal de Estados Unidos. No violó ningún firewall: **pasó la entrevista**. La verificación de identidad en Recursos Humanos, no la ciberseguridad perimetral, es la superficie de ataque real.

## El proceso de contratación como superficie de ataque

Los cuatro artículos previos de esta serie exploran cómo se explota la confianza de una persona. Este invierte el sujeto: **la víctima es la organización**, y lo que se explota es la confianza institucional en su propio proceso de contratación —la presunción de que una entrevista en video, una verificación de antecedentes y unas referencias corporativas confirman que la persona del otro lado es quien dice ser.

Todd Hemmen, subdirector adjunto de la División Cibernética del FBI, reveló el caso durante una conferencia del Digital Government Institute el 28 de julio de 2026 en Washington: **un trabajador remoto de Corea del Norte había sido identificado dentro del gobierno federal estadounidense**, según reportó Federal News Network. Hemmen no identificó la dependencia ni precisó qué tan a fondo llegó el acceso; dijo que la oficina seguía tratando de entender cómo el proceso de contratación de esa agencia lo dejó pasar.

## Cómo se construye un empleado que no existe

El mecanismo, documentado por el Departamento de Estado de EE. UU., no depende de una vulnerabilidad de software. **Depende de una identidad robada o comprada, un currículo pulido con inteligencia artificial y una entrevista en video donde el rostro que aparece no es el que realmente está del otro lado**. La alerta conjunta del 31 de julio de 2026 —emitida por Estados Unidos, Japón, Corea del Sur, Australia, Canadá, Francia, Alemania, Italia, Países Bajos, Nueva Zelanda y el Reino Unido— nombró explícitamente el mecanismo: video en vivo que "parece manipulado o generado artificialmente" durante las entrevistas de contratación.

Una vez conseguido el puesto, entra en juego la infraestructura logística: las llamadas **granjas de laptops**, domicilios operados por facilitadores locales que reciben el equipo de cómputo enviado por la empresa contratante y lo mantienen encendido para que el operador remoto se conecte vía VPN y simule presencia en el país "correcto". El objetivo es doble: el salario, que se remite en su mayoría al régimen para financiar programas de armamento, y en un número creciente de casos, el acceso a datos internos que después se usa para extorsionar al empleador.

## La escala: de cien empresas a una agencia federal

CrowdStrike rastrea esta operación bajo el nombre **Famous Chollima** y documentó que más de 100 empresas, la mayoría estadounidenses de los sectores aeroespacial, defensa, comercio minorista y tecnología, contrataron sin saberlo a estos operadores. El Departamento del Tesoro de EE. UU., a través de la Oficina de Control de Activos Extranjeros (OFAC), sancionó el 12 de marzo de 2026 a seis personas y dos entidades por facilitar estos esquemas, que **generaron cerca de 800 millones de dólares en 2024**, según cifras oficiales del Tesoro estadounidense.

Pyongyang persigue el mismo fin —financiamiento y acceso a sistemas— por una segunda vía, puramente técnica: en marzo de 2026, [el mismo régimen que meses antes había comprometido una librería usada en el 80% del código en producción global](https://glitchmental.com/articulos/hackers-de-corea-del-norte-atacaron-axios-que-paso/) confirmó que la infiltración vía Recursos Humanos es solo una de **dos rutas que explota contra el mismo objetivo**: una humana, vía contratación; otra técnica, vía cadena de suministro de software.

> El régimen de Corea del Norte no hackeó la puerta de la empresa: pasó la entrevista, superó la verificación de antecedentes y cobró la primera quincena.

![El empleado que nunca existió: primer plano de mano sobre sensor de control, grieta desenfocada al fondo](/images/uploads/empleado-que-nunca-existio-sec.webp)

## El caso KnowBe4: la empresa que enseña a detectar fraude, cayó

En julio de 2024, KnowBe4 —una firma que vende precisamente entrenamiento contra fraude y phishing— **contrató sin saberlo a un operador norcoreano** para un puesto de ingeniería de software. Según el blog oficial de la empresa, el equipo de seguridad detectó actividad sospechosa en la laptop recién enviada al nuevo empleado —intentos de instalar malware mediante una Raspberry Pi— y contuvo el acceso **en un lapso de 25 minutos** desde la primera alerta. No hubo acceso a datos de clientes ni a sistemas internos de la compañía.

El caso es, al mismo tiempo, el mejor y el peor escenario posible. El peor, porque confirma que ni una empresa especializada en detectar ingeniería social está exenta del filtro de contratación fallido. El mejor, porque **la detección funcionó exactamente como debía funcionar**, y KnowBe4 decidió publicar el incidente en vez de enterrarlo —una decisión editorial poco común en el sector, que convirtió un error interno en el estudio de caso más citado del tema.

## México y LATAM: expuestos sin un caso que lo confirme

La [misma oferta de empleo falsa, aplicada en la dirección contraria](https://glitchmental.com/articulos/granja-cerdos-digital-trata-fraude/), recluta víctimas de trata en el sudeste asiático; aquí, la vacante real recluta al operador que infiltra a la empresa. **Es el mismo guion —urgencia, confianza construida en capas, verificación superficial— aplicado en direcciones opuestas**, contra dos tipos distintos de víctima.

Las empresas mexicanas y latinoamericanas con equipos remotos distribuidos vía plataformas como Upwork, Deel o Toptal comparten exactamente la misma exposición estructural que documentan los casos en Estados Unidos y Europa. La Asociación Mexicana de Ciberseguridad (AMECI) ha alertado en su blog sobre este esquema y su llegada a compañías con presencia en el país. Pero hasta el cierre de este artículo, **no existe un caso mexicano de alto perfil documentado públicamente** con nombre, fecha y expediente, a diferencia de los casos ya verificados en Estados Unidos. Eso es un vacío de evidencia, no una ausencia de riesgo: las mismas plataformas de contratación remota que explotan estos operadores en Norteamérica están igual de accesibles desde cualquier oficina de Ciudad de México o Bogotá.

La pregunta que deja este quinto capítulo no es técnica, es estructural: **si una videollamada en vivo ya no basta para confirmar que existe una persona real del otro lado**, ¿qué queda del contrato social básico de contratar a distancia?

---
title: 'PHP2Shell: la falla que la IA volvió barata de explotar'
category: Inteligencia Artificial
pubDate: 2026-10-25T14:30
updatedDate: ''
description: 'PHP2Shell prueba que la IA abarató explotar fallas viejas: qué se pierde, qué no se sabe y qué deja abierto la divulgación coordinada.'
heroImage: /images/uploads/php-falla.webp
heroImageAlt: Prueba de explotación de una vulnerabilidad PHP2Shell en software heredado con análisis asistido por IA y un servidor bajo evaluación de seguridad.
draft: true
---

**PHP2Shell** deja una lección incómoda: una vulnerabilidad es una apuesta económica, y la IA bajó el precio de explotarla. Lo escaso nunca fue encontrar la falla, sino armar la cadena de pasos que la convierte en ataque.

## Qué es PHP2Shell, explicado sin jerga

PHP2Shell es el nombre de un conjunto de fallas en el motor de PHP, el lenguaje que, según Wiz, mueve a WordPress, Drupal, Joomla y MediaWiki, el software de Wikipedia. Las fallas se agrupan en dos registros, CVE-2026-109618 y CVE-2026-109619, ambos con una calificación de 9.2 sobre 10 en la escala CVSS v4.0, de acuerdo con el aviso de PHP. **Un CVE es el número de registro público de una vulnerabilidad concreta.**

El origen es un descuido de limpieza. Según Imperva, cuando a PHP se le acaba la memoria en un mal momento, aborta la operación pero no siempre borra lo que dejó a medias, y una petición posterior que llegue al mismo proceso puede toparse con esos restos. **De ahí se puede llegar a la ejecución remota de código (RCE): que un desconocido corra sus propias instrucciones en un servidor sin iniciar sesión.** Imperva precisa que incluso una página que solo responde "OK" puede estar expuesta, porque el problema ocurre antes de que corra una sola línea del código de la aplicación.

## Qué se pierde de verdad

Wiz afirma que todas las versiones de PHP publicadas en la última década están afectadas por al menos una de las fallas, hasta llegar a la 5.4. Imperva matiza que no todas se probaron una por una, y cita que PHP lo usa **más del 69% de los sitios cuyo lenguaje de servidor se conoce**, una cifra que presenta sin desglose por país.

Lo que está en juego no es solo el control del servidor, sino lo que este guarda en memoria. Según Wiz, se demostró que es posible leer contraseñas, tokens y llaves de API **sin necesidad de ejecutar código**, e Imperva calcula que un solo ataque de ese tipo expone unos 67 KB de memoria del proceso.

El ataque tampoco es un interruptor universal. Imperva advierte que su complejidad es alta: hay que llegar al mismo proceso y colocar datos con precisión, y si el momento falla, **el proceso se cae o responde con normalidad**. Además, el código corre con los permisos del proceso de PHP, no necesariamente con los de administrador.

El efecto más visible fue otro. Según Reuters, instituciones de gobierno, hospitales y centros educativos de Europa suspendieron sitios como precaución, entre ellos páginas de prefecturas en Francia y servicios del proveedor informático federal de Alemania.

El proyecto corrigió las ramas 8.5, 8.4, 8.3 y 8.2 el 21 de octubre de 2026, y aclaró que **PHP 8.1 y las versiones anteriores ya no reciben actualizaciones** del proyecto, con respaldos mínimos para las 7.4, 8.0 y 8.1.

## Cómo se encontró y qué no se sabe

Hubo al menos tres hallazgos independientes. Según OpenAI, la firma Calif identificó una falla crítica con GPT-5.6 Sol dentro de su iniciativa Patch the Planet, y Wiz descubrió y reportó por su cuenta las dos vulnerabilidades; la PHP Foundation añade que OpenAI reportó por su cuenta la misma causa raíz. Wiz fecha su primer hallazgo el 19 de agosto de 2026 y usó su herramienta Wiz Atlas, Gemini 4 Argon y GPT-5.6 Sol.

Aquí viene lo que no se sabe. Wiz atribuye a Gemini 4 Argon una contribución invaluable y asegura que **una sola persona hizo en una semana lo que antes habría tomado meses a un equipo de primer nivel**. Pero esa es la medición de una empresa que vende seguridad y que Alphabet, la matriz de Google, compró en marzo de 2026; el propio texto de Wiz incluye el elogio de una directiva de Google DeepMind a Gemini 4 Argon. OpenAI, por su parte, comercializa Daybreak, su acceso de seguridad. En las fuentes revisadas no se publica el reparto exacto entre lo que resolvió el modelo y lo que decidió el humano. Sin ese dato, el titular "la IA lo encontró" es más cómodo que preciso.

> Una vulnerabilidad no se mide por lo difícil que es encontrarla, sino por lo caro que resulta explotarla.

![Servidor PHP heredado bajo prueba de explotación con análisis asistido por IA para investigar la vulnerabilidad PHP2Shell y sus límites de seguridad](/images/uploads/php-falla-sec.webp)

## Por qué tardó más de una década en volverse un problema

El obstáculo era el trabajo de explotación, no la detección. Wiz explica que convertir las fallas en un exploit exigió encadenar varias y adaptarse a cómo PHP reparte y reutiliza la memoria, un trabajo manual difícil de escalar. Imperva coincide: **disparar el error es mucho más fácil que convertirlo en ejecución de código**. Con herramientas de prueba y depuración, dice Wiz, los modelos analizan los fallos e iteran, lo que abarata cada objetivo adicional.

La edad exacta de la falla no está confirmada. Wiz habla de "más de una década" en un pasaje y de "décadas" en otro, el presidente de OpenAI, Greg Brockman, de 14 años, y la única cota firme es PHP 5.4. Por eso aquí no se fija un número de años.

Tampoco fue un secreto absoluto. Según la PHP Foundation, relatado por TNW, un desarrollador del núcleo detectó en 2024 el error de manejo de memoria mientras corregía otro problema surgido de la primera auditoría externa de seguridad de PHP. Alguien teorizó un posible exploit, pero **nadie encontró una vía concreta** y otros problemas más claros tuvieron prioridad. Después, la corrección se estancó: hubo varias propuestas y cada una costaba algo, desde romper la retrocompatibilidad hasta obligar a cambiar miles de extensiones de terceros. La propia Fundación calificó el retraso de "falla estructural", atribuida a su proceso de decisión y a su falta de recursos.

## Escudo y bala: la ventana de defensa terminó por una filtración

OpenAI sostiene que, hasta donde sabe, la IA de frontera encontró estas fallas antes que los atacantes, lo que abrió una "ventana del defensor" para preparar parches y protecciones. En el mismo texto admite que **las mismas capacidades sirven para desarrollar herramientas ofensivas**. El escudo y la bala son la misma pieza.

La ventana duró unos dos meses, según OpenAI, y diez semanas si se cuenta desde el primer reporte de Calif a PHP, el 11 de agosto, hasta el parche del 21 de octubre. No se cerró por diseño. Según TNW, el 20 de octubre, alrededor de las 15:00 UTC, los dos identificadores empezaron a circular en foros y redes con una hora de lanzamiento y una gravedad equivocadas. La Fundación adelantó la publicación un día. Hacia las 20:00 UTC, Calif publicó por error un video de su prueba de concepto contra objetivos reales; lo borró, pero circularon copias. Y más de seis horas antes del lanzamiento, el proveedor Chainguard publicó imágenes con el parche incluido, algo que la Fundación describió como ignorar **semanas de trabajo de muchas partes**.

Una lectura de glitchMentalMX: el esquema reparte un secreto entre al menos una docena de organizaciones nombradas por Wiz, además de distribuidoras y otros proveedores, y cada una es una posible grieta. Un medio, Itdaily, reportó explotación activa antes del parche; en las fuentes primarias revisadas no hay esa confirmación: la Fundación dijo no haber visto un exploit funcional al momento del lanzamiento, aunque reconoce que el código público de explotación apareció al día siguiente de la filtración. Patchstack, según Impacto TIC, habló de incidentes de explotación activa horas antes del parche, y SecurityWeek registró los primeros intentos de explotación tras el lanzamiento; la CISA, al publicar su alerta, dijo no haber observado explotación.

## La pregunta estructural que sigue abierta

El propio texto de OpenAI deja preguntas sin respuesta: cuánto tiempo necesitan los mantenedores y los operadores antes de divulgar, quién merece aviso temprano y cuándo, si acaso, un gobierno debería usar una vulnerabilidad para parchar sistemas que administra. La PHP Foundation, por su parte, publicó 15 CVE desde julio y descartó más de cien reportes inválidos o duplicados, está pasando de decidir por consenso a decidir por mayoría, y pide dinero a las empresas, los proveedores de hospedaje y los gobiernos que dependen de PHP.

En México y América Latina el panorama es opaco. Las fuentes revisadas no desglosan cuántos sitios afectados hay en la región ni indican si operadores locales recibieron aviso previo; OpenAI menciona coordinación con oficinas y agencias de EE. UU. (entre ellas la ONCD y la CISA) y con "socios internacionales" sin nombrarlos. Sobre el cruce entre IA y ataques a gobiernos, glitchMentalMX publicó antes [la pregunta aburrida con la que agentes de IA forzaron portales de gobierno](/articulos/ia-hackeo-gobierno-pregunta-aburrida/) y [este análisis sobre cómo nombrar al primer atacante impulsado por IA](/articulos/ata-como-se-nombra-al-primer-atacante-impulsado-por-ia/).

Si un secreto compartido por al menos una docena de organizaciones aguanta semanas antes de filtrarse, ¿qué promete exactamente la divulgación coordinada cuando las mismas capacidades que encuentran las fallas también sirven para atacar?

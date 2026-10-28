---
title: Si la IA encuentra las fallas, ¿quién las corrige a tiempo?
category: Inteligencia Artificial
pubDate: 2026-10-28T05:18
updatedDate: ''
description: La IA ya encuentra fallas a escala, pero casi nadie las corrige a tiempo. El problema de seguridad es la velocidad humana, no los modelos.
heroImage: /images/uploads/ia-encuentra-fallas.webp
heroImageAlt: Ingeniera de ciberseguridad analiza vulnerabilidades detectadas por IA y prioriza fallas pendientes en servidores.
draft: false
---

La **IA ya encuentra fallas de seguridad a escala**; lo que no escala es corregirlas. El problema de esta era no es la inteligencia de los modelos, sino la velocidad humana e institucional con la que se repara lo que ellos descubren. Contexto en [la pieza anterior](/articulos/php2shell-falla-ia-costo-explotar).

## Encontrar fallas con IA ya no es lo difícil

El debate público se pregunta si la IA favorece a quien ataca o a quien defiende. Los datos sugieren otra cosa: **el cuello de botella se movió de descubrir a corregir**.

Mandiant, la unidad de Google que investiga intrusiones, estima en su informe M-Trends 2026 que el **tiempo medio de explotación es de -7 días**. Es el promedio de días entre que se divulga una falla y se la explota por primera vez; un valor negativo significa que el ataque llega antes que el parche. Es una estimación global, no una medición exacta.

Del lado de la corrección, las cifras son más modestas. Anthropic, la empresa que desarrolla a Claude y cuyo modelo [Mythos](/articulos/claude-mythos-anthropic-filtro-su-modelo-mas-peligroso/) ya analizamos, informa en su tablero público que, al 2 de octubre de 2026, había notificado **6,157 vulnerabilidades en 591 proyectos de código abierto** y que, hasta donde tiene registro, 516 estaban parchadas. Código abierto es el software cuyo código puede revisar y reutilizar cualquiera, y que con frecuencia mantienen equipos pequeños. La empresa aclara que los parches son un indicador rezagado y que la revisión humana es el paso que limita el ritmo.

Esas cifras son autorreportadas, y Anthropic vende la IA como escudo; OpenAI hace lo mismo con Patch the Planet. **Se leen como declaraciones de parte, no como auditorías independientes**.

El caso de PHP lo ilustra. Según W3Techs, este lenguaje de programación lo usa cerca del **70% de los sitios web cuyo lenguaje de servidor se puede identificar** (corte de julio de 2026). El 21 de octubre de 2026 se publicaron los parches de dos fallas críticas, conocidas como PHP2Shell, que según la PHP Foundation permiten, en ciertas condiciones, que un atacante sin credenciales ejecute código en un servidor.

Investigadores con modelos de IA las encontraron, pero los primeros indicios de una aparecieron en una auditoría de 2024. La Fundación reconoce que el **retraso fue una falla estructural** de su proceso de decisión y de sus recursos.

> El cuello de botella de la ciberseguridad ya no es encontrar fallas, sino corregirlas a la velocidad a la que se encuentran.

## Los próximos 12 meses: procesos antes que parches

El primer cambio no será técnico. Los embargos de divulgación coordinada, el acuerdo de mantener en secreto una falla mientras los proveedores preparan el arreglo, ya no aguantan. En PHP, según la Fundación, los identificadores de las fallas circularon en foros el 20 de octubre de 2026 y la publicación se adelantó un día. Además, Chainguard publicó imágenes con el arreglo más de seis horas antes de lo acordado; su director lo justificó por reportes de explotación en curso, y la Fundación dice que no había identificado exploits funcionales. **Un secreto que comparten tantas organizaciones dura poco**.

Lo que sí funcionó fue la preparación en paralelo. OpenAI afirma que socios como Wiz y Cloudflare ayudaron a preparar protecciones antes de la divulgación; su marco menciona como ejemplo las reglas de un firewall de aplicaciones web (WAF), un filtro que bloquea peticiones sospechosas antes de que lleguen al servidor. La previsión es que las mitigaciones de los proveedores y el **hosting administrado serán la capa real de parcheo**: según CybelAngel, firma de seguridad, actualizar PHP en el servidor es la única corrección oficial, y las actualizaciones de WordPress o de sus plugins no la aplican.

OpenAI propone además un marco de cinco etapas para responder a fallas críticas.**La propia empresa pide a la comunidad que la critique** antes de darla por buena.

## De uno a cinco años: la IA entra al desarrollo antes de publicar el código

CERT-EU, el equipo de respuesta a incidentes de las instituciones de la Unión Europea, recomienda integrar el análisis con IA en los procesos de desarrollo y sostiene que **encontrar fallas antes del lanzamiento cuesta una fracción de atenderlas en producción**. Hay antecedentes: según ese mismo equipo, el agente CodeMender, de DeepMind (Google), ya aportó 72 correcciones de seguridad a proyectos de código abierto.

Los dos errores de PHP2Shell son fallas de gestión de memoria, según la Fundación. Migrar el código nuevo a lenguajes con seguridad de memoria, que impiden por diseño esa clase de errores, **reduciría la superficie de ataque futura**. No resuelve el código viejo, que es el que hoy está expuesto.

La regulación también está en tensión. Según CERT-EU, la Ley de Ciberresiliencia de la Unión Europea exige reportar vulnerabilidades desde septiembre de 2026 y cumplimiento completo desde diciembre de 2027. Un preprint (borrador académico sin publicar en revista) de Alias Robotics, empresa que vende defensas con agentes de IA, sostiene que la ley presupone que las actualizaciones pueden ganarle a la explotación. **Es una hipótesis de una parte interesada**, no una conclusión establecida.

![Ingeniera de ciberseguridad enfrenta una acumulación de vulnerabilidades detectadas por IA mientras prioriza soluciones pendientes en servidores](/images/uploads/ia-encuentra-fallas-sec.webp)

## De cinco años en adelante: software que asume compromiso y se financia como bien público

CERT-EU recomienda diseñar suponiendo que el perímetro será vulnerado, con confianza cero (verificar cada acceso sin dar nada por sentado), y OpenAI propone aislar en entornos restringidos los componentes que procesan archivos no confiables. Estas ideas **apuestan a contener el daño en lugar de evitar toda falla**: son recomendaciones, no resultados medidos a escala.

La otra pieza es el dinero. La PHP Foundation reportó en su informe de 2025 donaciones por 730,534 dólares y gastos por 784,376, con 11 desarrolladores contratados, y señaló que sus 536 patrocinadores son sustancialmente menos que el año previo. **Un equipo de ese tamaño sostiene un lenguaje del que depende buena parte de la web**.

La Fundación pide patrocinio a empresas, proveedores de hosting y gobiernos, pero como petición, no como obligación. Un modelo de responsabilidad para quienes usan código abierto sin pagarlo es, por ahora, una **hipótesis**: ninguna fuente citada aquí propone un mecanismo concreto.

## ¿Estamos indefensos? Depende de quién controle su código

Quien controla su propio código y usa IA de forma sistemática tiene una ventaja estructural, según CERT-EU, porque puede aplicarla a todo su inventario. **Esa ventaja no llega a quien depende de software ajeno o de versiones que ya no se actualizan**.

La indefensión real está en la cola larga. El Centro Canadiense para la Ciberseguridad advierte que PHP 8.1 y las versiones anteriores ya no reciben actualizaciones de seguridad del proyecto, aunque algunas distribuciones de Linux pueden portar correcciones. Según CybelAngel, con datos de Shodan (un buscador de dispositivos conectados a internet), de unos 2.24 millones de servidores PHP visibles en el mundo al 20 de octubre de 2026, el **59% de los que reportan su versión usaba una rama sin parche oficial** (883,717 de cerca de 1.5 millones). Son servidores, no sitios; la firma, que vende monitoreo, aclara que unos 740,000 ocultan su versión y que algunos ya recibieron la corrección por otra vía.

## Apagar un servicio público o dejarlo expuesto

El 21 de octubre de 2026, según Reuters, varios gobiernos europeos apagaron servicios como mitigación. En Países Bajos, muchas organizaciones siguieron al Centro Nacional de Ciberseguridad y desconectaron sitios, entre ellos el portal Overheid.nl y numerosos hospitales. Francia retiró los sitios de las prefecturas, Alemania sacó varios sitios federales y Finlandia cerró sus servicios web públicos. **Alemania y Finlandia dijeron que fue una medida preventiva** y que no tenían constancia de incidentes asociados.

El dilema es nuevo en escala: apagar protege el servidor, pero deja sin acceso a quien depende del trámite, del hospital o del portal. Quién decide apagar, quién paga la interrupción y qué ocurre con quien no tiene otra vía **siguen sin una respuesta general**.

## La pregunta que queda: quién responde por lo que todos usan y casi nadie financia

El dilema entre apagar y exponer existe para cualquier gobierno que opere servicios en línea, incluidos los de México y América Latina; sobre cómo opera ese poder público hay contexto en [esta nota sobre datos abiertos](/articulos/datos-abiertos-el-poder-publico-que-nadie-te-explica/). Este texto **no cita cifras de exposición para la región** porque no pudo verificarlas.

La pregunta tiene un pariente cercano: [**quién responde cuando una IA hackea**](/articulos/quien-responde-cuando-ia-hackea-hugging-face/). Aquí el problema es otro:

¿Quién responde por **una infraestructura que todos usan, casi nadie financia** y que ahora cualquiera puede auditar a velocidad de máquina?

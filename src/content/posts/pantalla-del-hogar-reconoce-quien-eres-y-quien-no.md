---
title: Tu pantalla del hogar ya reconoce quién eres (y quién no)
category: Tecnología de Consumo
pubDate: 2026-10-22T06:48
updatedDate: ''
description: 'HomeView usa reconocimiento facial para repartir la casa en perfiles. El riesgo de privacidad ya no es solo la empresa: es quien comparte tu sala.'
heroImage: /images/uploads/homeview-apple.webp
heroImageAlt: 'reconocimiento facial en el hogar: pantalla doméstica identificando a una persona para asignarle un perfil'
draft: false
---

Apple presentó el 13 de octubre de 2026 una pantalla doméstica con [**reconocimiento facial para hasta seis personas**](https://www.apple.com/mx/newsroom/2026/10/meet-apple-homeview-a-new-way-to-enjoy-entertainment-and-manage-the-home/). Antes de mostrarte algo, una pantalla compartida tiene que decidir quién eres: ya no funciona como candado, sino como el interruptor que reparte la sala.

## Una pantalla compartida tiene que decidir quién eres antes de mostrarte nada

Según el comunicado de Apple, HomeView le da a cada una de esas personas **su propia pantalla de inicio**, con apps y widgets. Apple afirma que el contenido personal se mantiene privado frente a los demás, mientras que los álbumes y la música compartidos quedan abiertos a todo el hogar, invitados incluidos.

Greg Joswiak, vicepresidente sénior de Worldwide Marketing de Apple, lo resume así: el aparato reconoce el rostro para “pasar de una pantalla general del hogar a tu propia experiencia”. **El reconocimiento facial funciona aquí como un interruptor de contexto, no como una llave de acceso.** Un candado separa a quien puede entrar de quien no; un interruptor decide cuál de las personas que ya están dentro tiene la pantalla enfrente. El reconocimiento facial, para fijar el término, compara el rostro que ve la cámara con los rostros inscritos.

Hay un contraste útil con [Tu voz ya no es tuya: la biometría que la banca rompió](/articulos/tu-voz-ya-no-es-tuya-biometria-banca-rota/). Allá, un rasgo biométrico cargaba solo con la autenticación y falló. Aquí, el rostro no carga solo con nada: **Apple lo condiciona a un segundo elemento físico**, el iPhone.

> En una casa con una pantalla que reconoce caras, la privacidad deja de perderse ante extraños y se negocia entre quienes comparten la sala.

## La cara sola no basta: tu casa te reconoce con ayuda de tu iPhone

De acuerdo con la empresa, el contenido personal de apps como Mensajes y Calendario solo aparece cuando se reconoce el rostro del usuario inscrito y, a la vez, su iPhone o iPad emparejado está presente y fue desbloqueado de forma reciente. Es decir, **la condición de acceso es un rostro registrado más un dispositivo presente**. El comunicado no define qué cuenta como reciente.

Una nota al pie de Apple matiza el caso sin Wi-Fi: si el dispositivo emparejado pierde la conexión, **la información personal puede seguir accesible** siempre que se reconozca el rostro y el dispositivo cumpla las condiciones que la nota enumera: red Wi-Fi reciente en común, conexión celular activa, misma ubicación y desbloqueo reciente.

Apple afirma además que la cámara y el micrófono se procesan en los Secure Exclaves, entornos aislados del resto del sistema dentro del chip A18, y que ni el software, ni las apps, ni el usuario, ni la propia Apple acceden a esos datos. **Es una afirmación de la empresa, no una verificación independiente.**

Lectura propia: **el diseño parece partir de que, dentro de la casa, nadie busca explotar el sistema.** El medio francés Consomac reporta que representantes de Apple le explicaron a John Gruber, de Daring Fireball, que el hogar se considera razonablemente un lugar seguro.

## El invitado y quien no tiene iPhone: los dos que la casa no reconoce

Apple tiene una categoría explícita para quien no está inscrito: el invitado. **El invitado es una categoría residual**: accede solo a lo compartido, es decir, a lo que nadie marcó como personal.

La nota al pie 1 de Apple indica que la configuración y el soporte multiusuario requieren un iPhone o iPad compatible, y la 2 que las solicitudes con contexto personal necesitan uno con Apple Intelligence (las funciones de inteligencia artificial de Apple) y Siri AI activado. **El perfil personal depende de tener el dispositivo correcto.** Las condiciones de acceso oficiales nombran al iPhone y al iPad; el Apple Watch no aparece en ellas.

Lectura propia: quien vive en la casa y no tiene un iPhone o iPad compatible solo podría aspirar a lo compartido, el mismo nivel que un visitante. Es el mecanismo que [Ecosistemas cerrados: cómo las marcas te retienen sin decírtelo](/articulos/ecosistemas-cerrados-como-las-marcas-te-retienen-sin-decirtelo/) describe como _lock-in_, la dependencia de un ecosistema de un solo fabricante: **aquí el lock-in no solo decide qué compras, sino quién existe dentro de la sala.**

Quedan preguntas abiertas que el documento no detalla: **qué ocurre con un menor sin teléfono o con un nuevo compañero de cuarto**.

![Reconocimiento facial en el hogar: pantalla inteligente identifica a cada integrante de la familia y asigna perfiles individuales](/images/uploads/homeview-apple-sec.webp)

## La casa también clasifica a quien llega: del salón al timbre

Apple extiende la misma lógica hacia afuera. Según su comunicado, y solo con una suscripción compatible a iCloud+ y cámaras compatibles, HomeView ofrece reconocimiento cifrado de extremo a extremo de personas, rostros familiares, mascotas, paquetes y vehículos, y avisa al hogar cuando alguien llega a la puerta. **HomeView distingue entre personas y rostros conocidos**, y esa frontera la traza el propio sistema.

El inventario de objetos que ya observan la casa está en [La vigilancia en tus objetos cotidianos: el inventario real](/articulos/la-vigilancia-en-tus-objetos-cotidianos-el-inventario-real/). Lo que cambia con esta función es el verbo: **el dispositivo no solo registra lo que pasa en la puerta, también clasifica a quien llega**.

## Cuando la amenaza vive en tu sala

En seguridad, un modelo de amenaza es el mapa de quién podría atacar un sistema y desde dónde. La investigación académica sobre hogares inteligentes señala una zona poco vista: **las amenazas internas**, las que vienen de personas que viven en la casa o tienen acceso a ella.

Nandita Pattnaik, Shujun Li y Jason Nurse, de la Universidad de Kent, publicaron en 2024 un estudio sobre casas compartidas por personas sin vínculo familiar. Proponen un modelo de actores de amenaza que incluye a los compañeros de casa, actuales y pasados, y piden **más atención de los investigadores y de los diseñadores y fabricantes de dispositivos**. Ahmed Alshehri, Malek Ben Salem y Lei Ding sostienen, en un análisis de 2020, que diseñar con una suposición de seguridad absoluta dentro de casa es problemático, y señalan que estos aparatos pueden darle al dueño poder sobre su pareja en el mismo hogar. Simon Parkin y su equipo, de University College London, analizaron en 2019 la seguridad de ecosistemas compartidos con Amazon Echo y Google Home desde la perspectiva de quien comparte aparatos con otra persona.

Nada de esto señala fallas ni abusos en HomeView: no hay evidencia de ellos. El argumento es estructural: **todo dispositivo que reparte una sala entre personas redefine quién tiene poder sobre qué**.

Lectura propia: la pregunta es distinta de la de [Cuánto cuesta espiar](/articulos/cuanto-cuesta-espiar-hoy/), donde un tercero instala software de espionaje. Aquí **el reparto de la sala es el producto** y el riesgo está en sus bordes. También difiere de [El futuro no es sin pantallas: es sin dispositivos](/articulos/el-futuro-no-es-sin-pantallas-es-sin-dispositivos/), donde la pantalla es una superficie rentada; aquí es árbitro de identidad.

## México, o cuando la discusión llega antes que el producto

En su anuncio inicial, del 13 de octubre de 2026, Apple listó como mercados de lanzamiento a Australia, Canadá, India, Nueva Zelanda, el Reino Unido, Estados Unidos, Singapur y Sudáfrica. **México no figuraba entre ellos.** La versión del comunicado en el sitio de Apple México incluye la misma lista. Apple precisó también que HomeView no se vendía en la Unión Europea porque Siri AI, la nueva versión de su asistente, no estaba disponible allá, y que Siri AI en HomeView estaba disponible solo en inglés. Esto describe solo el anuncio inicial.

Lectura propia: la sala mexicana ya tiene pantallas compartidas, como el televisor o la tablet de la familia. **La pregunta de quién cuenta como “alguien” frente a ellas existe sin reconocimiento facial**: se resuelve con una contraseña que todos conocen, con un perfil abierto o con quien tenga el control remoto.

Si dentro de tu casa solo cuenta **quien tiene una cara registrada y un iPhone a la mano**, ¿qué es, para esa casa, todo el que vive ahí y no cumple las dos cosas?

# Respuestas íntegras — Experimento 09: Humanizar un texto con IA

Datos abiertos de [glitchMentalMX](https://glitchmental.com/) · Licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es)

- **Pieza:** https://glitchmental.com/laboratorio/humanizar-texto-con-ia-cuanto-degrada/
- **CSV de resultados codificados:** https://glitchmental.com/datos/laboratorio-09-humanizar-texto-ia.csv
- **Ejecución:** 2026-11-18, interfaz web estándar de cada modelo (ChatGPT, Claude y Gemini), un chat nuevo por caso y una sola respuesta, sin repreguntas. 15 respuestas (3 modelos × 5 textos).
- **Qué es este archivo:** el texto que devolvió cada modelo, tal como salió, para que puedas verificar o recalificar sin fiarte de nuestro puntaje. Solo se cambió el formato (de la interfaz web a Markdown) y se normalizaron los espacios en blanco. Las palabras y las URL no se editaron.
- **Memoria de cuenta:** las pruebas corrieron en las cuentas del editor, no en cuentas anónimas. Las piezas 07, 10 y 11 documentan huella de memoria en algunas respuestas (por ejemplo, un saludo por nombre); cada pieza declara en «Protocolo y límites» lo que encontramos.

## Prompts usados

### Consigna (idéntica en los 15 chats; [TEXTO] se sustituye por cada texto original)

````text
Reescribe el siguiente texto para que suene más humano, natural y cercano, sin perder la información:

[TEXTO]
````

### T01 — Nota periodística / dato económico: texto original

````text
Durante el cuarto trimestre de 2025, la población ocupada en México alcanzó 59.8 millones de personas, según el boletín 97/26 del INEGI. De ese total, 35.3 millones fueron hombres y 24.5 millones mujeres, mientras que la tasa de desocupación cerró en 2.5 por ciento de la población económicamente activa. El incremento anual respecto al mismo periodo de 2024 fue de 298 mil puestos de trabajo.
````

### T02 — Correo laboral directo de cobranza/proyecto: texto original

````text
Hola, Mariana. Te confirmo que entregamos la versión final del sitio el jueves 12 de noviembre a las 14:00 horas. Para liberar el despliegue en producción necesitamos que tu equipo apruebe las 18 pantallas pendientes y liquide el anticipo restante de $42,500 pesos antes del martes 10. Si el pago se retrasa, la fecha de salida se recorrerá cinco días hábiles.
````

### T03 — Explicación técnica / privacidad: texto original

````text
El cifrado de extremo a extremo garantiza que únicamente el emisor y el receptor puedan leer los mensajes enviados en una conversación. Ni el proveedor de la aplicación ni los servidores intermedios tienen acceso a las llaves privadas, que se generan y almacenan de forma local en cada dispositivo mediante el protocolo Signal con claves curvas X25519. Si pierdes el teléfono sin respaldo cifrado, el historial no se recupera.
````

### T04 — Reseña crítica de producto / consumo: texto original

````text
Probamos la aspiradora robot durante tres semanas en un departamento de 95 metros cuadrados con piso de loseta y dos tapetes gruesos. La batería duró 135 minutos en potencia media y el depósito de polvo de 400 mililitros se llenó cada cuatro limpiezas. El mapeo láser evitó los cables del estudio, pero la aplicación móvil se desconectó del wifi dos veces por semana.
````

### T05 — Instrucción regulatoria / fiscal: texto original

````text
A partir del 1 de enero de 2026, las plataformas digitales de reparto deben retener 2.5 por ciento de ISR y 8 por ciento de IVA sobre los ingresos brutos de los repartidores inscritos con RFC activo. Quienes no registren su RFC ante la plataforma sufren una retención automática de 20 por ciento de ISR y 16 por ciento de IVA mensual.
````

## Respuestas

## Claude

### Claude · T01 — Nota periodística / dato económico

```text
Al cierre de 2025, en México había 59.8 millones de personas con trabajo, según el boletín 97/26 del INEGI. De ellas, 35.3 millones son hombres y 24.5 millones mujeres. La desocupación quedó en 2.5 % de la población económicamente activa, y frente al mismo trimestre de 2024 se sumaron 298 mil empleos.
```


### Claude · T02 — Correo laboral directo de cobranza/proyecto

```text
Hola, Mariana:

Te confirmo que la versión final del sitio la entregamos el jueves 12 de noviembre a las 14:00 h. Para poder publicarla en producción necesitamos dos cosas de tu lado: que tu equipo apruebe las 18 pantallas que siguen pendientes y que se liquide el anticipo restante de $42,500 pesos a más tardar el martes 10.

Ojo con el pago: si se retrasa, la fecha de salida se recorre cinco días hábiles.

Cualquier duda, me dices.
```


### Claude · T03 — Explicación técnica / privacidad

```text
Con el cifrado de extremo a extremo, solo tú y la persona con la que hablas pueden leer los mensajes. Nadie más: ni la app ni los servidores por los que pasan tus mensajes. Las llaves privadas se generan y se guardan en cada dispositivo (el protocolo Signal, con claves X25519, se encarga de eso), así que la empresa nunca las ve.

La parte incómoda: si pierdes el teléfono y no tenías un respaldo cifrado, tu historial se va con él. No hay forma de recuperarlo.
```


### Claude · T04 — Reseña crítica de producto / consumo

```text
Tuvimos la aspiradora robot en casa tres semanas, en un departamento de 95 m² con piso de loseta y dos tapetes gruesos. La batería aguanta 135 minutos en potencia media, y el depósito de 400 ml se llena más o menos cada cuatro limpiezas. El mapeo láser sí esquivó los cables del estudio, así que ahí cumple. Lo que no cumple es la app: se desconecta del wifi un par de veces por semana.
```


### Claude · T05 — Instrucción regulatoria / fiscal

```text
Desde el 1 de enero de 2026, las plataformas de reparto tienen que retenerte 2.5 % de ISR y 8 % de IVA sobre tus ingresos brutos, siempre que estés inscrito con RFC activo. Si no le das tu RFC a la plataforma, la retención se dispara de forma automática: 20 % de ISR y 16 % de IVA cada mes.
```


---

## ChatGPT

### ChatGPT · T01 — Nota periodística / dato económico

```text
En el cuarto trimestre de 2025, México registró 59.8 millones de personas ocupadas, de acuerdo con el boletín 97/26 del INEGI. De ellas, 35.3 millones fueron hombres y 24.5 millones, mujeres. Por su parte, la tasa de desocupación se ubicó en 2.5% de la población económicamente activa. En comparación con el mismo periodo de 2024, el número de personas ocupadas aumentó en 298 mil.
```


### ChatGPT · T02 — Correo laboral directo de cobranza/proyecto

```text
Hola, Mariana. Te confirmo que la versión final del sitio se entregó el jueves 12 de noviembre a las 14:00 horas.

Para poder liberar el despliegue en producción, necesitamos que tu equipo apruebe las 18 pantallas que siguen pendientes y que se liquide el anticipo restante de $42,500 pesos a más tardar el martes 10.

Es importante considerar que, si el pago se retrasa, la fecha de salida también tendrá que recorrerse cinco días hábiles.
```


### ChatGPT · T03 — Explicación técnica / privacidad

```text
El cifrado de extremo a extremo hace que solo quienes participan en una conversación puedan leer los mensajes. Ni la empresa que ofrece la aplicación ni los servidores por los que pasan los datos pueden acceder a las claves privadas. Estas se generan y guardan directamente en cada dispositivo mediante el protocolo Signal, que utiliza claves criptográficas X25519. Eso sí, si pierdes tu teléfono y no tienes una copia de seguridad cifrada, no podrás recuperar el historial de conversaciones.
```


### ChatGPT · T04 — Reseña crítica de producto / consumo

```text
Probamos la aspiradora robot durante tres semanas en un departamento de 95 metros cuadrados, con piso de loseta y dos tapetes gruesos. En potencia media, la batería duró 135 minutos, mientras que el depósito de polvo, con capacidad de 400 mililitros, necesitó vaciarse cada cuatro ciclos de limpieza. El sistema de mapeo láser esquivó sin problemas los cables del estudio, aunque la aplicación móvil presentó algunos inconvenientes: perdió la conexión al wifi dos veces por semana.
```


### ChatGPT · T05 — Instrucción regulatoria / fiscal

```text
A partir del 1 de enero de 2026, las plataformas digitales de reparto deben retener el 2.5 % de ISR y el 8 % de IVA sobre los ingresos brutos de los repartidores que tengan su RFC activo y registrado. En cambio, quienes no proporcionen su RFC a la plataforma enfrentan retenciones automáticas más altas: 20 % de ISR y 16 % de IVA mensual.
```


---

## Gemini

### Gemini · T01 — Nota periodística / dato económico

```text
Al cierre de 2025, México sumó 59.8 millones de personas trabajando, de acuerdo con el reporte más reciente del INEGI (boletín 97/26). Del total de puestos ocupados en el cuarto trimestre, 35.3 millones correspondieron a hombres y 24.5 millones a mujeres.

Por otro lado, la tasa de desempleo se ubicó en 2.5 % de la población económicamente activa. En comparación con el mismo periodo de 2024, el mercado laboral creció en 298 mil empleos.
```


### Gemini · T02 — Correo laboral directo de cobranza/proyecto

```text
Hola, Mariana. Te confirmo que tenemos todo listo para entregar la versión final del sitio el jueves 12 de noviembre a las 2:00 p. m.

Para poder subirlo a producción a tiempo, solo necesitamos que tu equipo nos dé el visto bueno en las 18 pantallas pendientes y que se liquide el saldo restante del anticipo ($42,500 pesos) a más tardar el martes 10. Te comento con anticipación que, si el pago llegara a demorarse, tendríamos que recorrer la fecha de salida cinco días hábiles.

Cualquier duda, por acá seguimos al pendiente.
```


### Gemini · T03 — Explicación técnica / privacidad

```text
Con el cifrado de extremo a extremo, tus mensajes son solo entre tú y la persona con la que hablas: nadie más puede leerlos. Ni la empresa dueña de la app ni sus servidores tienen acceso a las llaves privadas, ya que estas se crean y se guardan directo en tu dispositivo usando el protocolo Signal con claves curvas X25519. Eso sí: si llegas a perder el teléfono y no tienes un respaldo cifrado, olvídate de recuperar tu historial.
```


### Gemini · T04 — Reseña crítica de producto / consumo

```text
Estuvimos poniendo a prueba esta aspiradora robot durante tres semanas en un departamento de 95 metros cuadrados con piso de loseta y un par de tapetes gruesos. En potencia media, la batería le rindió 135 minutos y su depósito de 400 mililitros aguantó cuatro limpiezas antes de llenarse. El mapeo láser hizo muy bien su trabajo esquivando los cables del estudio; el único detalle es que la app se desconectó del wifi un par de veces por semana.
```


### Gemini · T05 — Instrucción regulatoria / fiscal

```text
Si trabajas en plataformas de reparto, toma en cuenta que desde el 1 de enero de 2026 cambiaron las reglas de impuestos: si tienes tu RFC activo y registrado en la app, te van a retener el 2.5 % de ISR y el 8 % de IVA sobre tus ingresos brutos. En cambio, si no das de alta tu RFC en la plataforma, el golpe es mucho mayor, pues te descontarán en automático el 20 % de ISR y el 16 % de IVA cada mes.
```

---
title: "Mismo sector, hasta 16 puntos de brecha: Redacción marca 63 y Periodismo 47 en exposición a la IA"
description: "Cuatro pares de ocupaciones del mismo sector difieren entre 8 y 16 puntos en el Índice de Exposición Laboral a la IA: Redacción 63 contra Periodismo 47, Radiología 43 contra Enfermería 31."
kicker: "Laboratorio · Experimento 01"
experimento: 1
pubDate: 2026-11-17
heroImage: /images/laboratorio/laboratorio-01-brecha-exposicion/hero.webp
heroImageAlt: "Dos cilindros graduados de cristal con líquido ámbar a distinto nivel, con un calibrador de latón sobre ellos, en un banco de laboratorio."
csv: /datos/laboratorio-01-brecha-exposicion.csv
seoTitle: "Brecha de exposición a la IA: Redacción 63, Periodismo 47"
nota: datos
roles: "Claude Code extrajo los datos de las fichas y los índices del propio sitio y Claude armó el expediente; Gemini diseñó el protocolo y audita; ChatGPT hizo una revisión ciega."
draft: false
---

## Resumen ejecutivo

- **Qué probamos:** si ocupaciones del mismo sector reciben una puntuación parecida en el Índice de Exposición Laboral a la IA de glitchMentalMX. Comparamos cuatro pares.
- **Qué encontramos:** los cuatro pares, elegidos por contraste, difieren entre 8 y 16 puntos: 16 en Comunicación, 13 en Manufactura y oficios, 12 en Salud y 8 en Administración y finanzas. Compartir sector no implica compartir exposición. Al ser una muestra elegida por sus brechas, no mide qué tan frecuente es esta dispersión en todo el mercado.
- **Qué significa:** el sector, por sí solo, no basta para inferir la exposición de una ocupación. Sirve más preguntar cuánto de tu jornada es texto o captura y cuánto exige cuerpo, presencia o firma.

## Protocolo y límites

- **Muestra:** 8 de las 21 ocupaciones de la Edición 1 (noviembre de 2026). Son perfiles testigo, no representan a su sector. Elegimos los pares porque tenían brecha, así que no medimos qué tan frecuentes son.
- **Fecha de ejecución:** 17 de noviembre de 2026.
- **Fuentes:** O*NET 31.0 (Estados Unidos, sin ajuste a México); *Anthropic Economic Index* para uso observado; Eloundou et al. para el tope.
- **Definiciones y cálculo:** exposición (`E`), automatización observada (`A`) y complementariedad humana (`C`). Cada actividad se califica de 0 a 4 en cada una; se promedia según su peso en O*NET y el resultado se multiplica por 25 para llevarlo a escala de 0 a 100. Después se aplica `0.4·E + 0.35·A + 0.25·(100 − C)`. Los promedios van sin redondear (4 decimales) y el redondeo al entero se hace hasta el final. Los enteros E, A y C de las fichas son redondeos de presentación. Los pesos de O*NET suman entre 0.9999 y 1.0001 y se normalizan.
- **Tope metodológico en Contabilidad:** el tope de Eloundou et al. (2023) más 20 puntos se aplica a todas las ocupaciones del índice para no sobrestimar la capacidad técnica de los modelos. De estas ocho, solo Contabilidad lo rebasa: su E calculada de 77.47 queda en 74. Su puntuación baja de 59 a 57 y la brecha frente a Captura de datos sube de 6 a 8 puntos.
- **Sesgo de uso observado:** la etiqueta «Uso observado» proviene solo del *Anthropic Economic Index*, es decir, de uso de Claude. Lo demás es «Inferencia editorial». Soldadura no tiene ninguna actividad con uso observado.
- **Fuera de alcance:** exposición de actividades, no despidos ni desempleo.

## Evidencia

<table>
  <caption>Edición 1 del Índice (noviembre de 2026). E, A y C publicados, escala 0–100.</caption>
  <thead>
    <tr>
      <th scope="col">Sector</th>
      <th scope="col">Ocupación</th>
      <th scope="col">Puntuación</th>
      <th scope="col">E</th>
      <th scope="col">A</th>
      <th scope="col">C</th>
      <th scope="col">Brecha del par</th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row" rowspan="2">Comunicación</th><td>Redacción (escritores y autores)</td><td>63</td><td>84</td><td>59</td><td>65</td><td rowspan="2">16</td></tr>
    <tr><td>Periodismo (reporteros y analistas de noticias)</td><td>47</td><td>63</td><td>50</td><td>85</td></tr>
    <tr><th scope="row" rowspan="2">Salud</th><td>Radiología</td><td>43</td><td>62</td><td>42</td><td>84</td><td rowspan="2">12</td></tr>
    <tr><td>Enfermería general</td><td>31</td><td>47</td><td>30</td><td>94</td></tr>
    <tr><th scope="row" rowspan="2">Administración y finanzas</th><td>Captura de datos</td><td>65</td><td>74</td><td>61</td><td>42</td><td rowspan="2">8</td></tr>
    <tr><td>Contabilidad (E con tope)</td><td>57</td><td>74</td><td>55</td><td>67</td></tr>
    <tr><th scope="row" rowspan="2">Manufactura y oficios</th><td>Operación de máquinas CNC</td><td>28</td><td>35</td><td>28</td><td>82</td><td rowspan="2">13</td></tr>
    <tr><td>Soldadura</td><td>15</td><td>11</td><td>24</td><td>93</td></tr>
  </tbody>
</table>

Sin el tope, Contabilidad sería 59. Los pesos son los de O*NET; las sumas son aritmética sobre las filas del dataset del experimento (enlace al final).

### Comunicación: 16 puntos

Redacción pesa donde el texto es el producto: redactar prosa (0.352), revisar y editar (0.171) y planear esquemas (0.0513). Las tres tienen E = 4, A = 3 y C = 2, las tres con uso observado, y suman 0.5743. Ninguna baja de E = 2. Periodismo también tiene E = 4 al redactar, pero esa tarea pesa 0.2321. Entrevistar fuentes (0.1758) y cubrir eventos en el lugar (0.1327) tienen E = 1, A = 1 y C = 4.

### Salud: 12 puntos

Radiología tiene una actividad dominante y expuesta: interpretar estudios y elaborar informes (0.1877; E = 4, A = 3, C = 3, uso observado). Enfermería no tiene ninguna actividad con E = 4. Su mayor peso es coordinar al equipo y supervisar (0.2153; E = 2, A = 1, C = 4). Las actividades con C = 4 suman 0.8883 en Enfermería y 0.4674 en Radiología.

### Administración y finanzas: 8 puntos

Aquí el tope dejó la E empatada en 74, así que los 8 puntos salen de A (61 contra 55) y de C (42 contra 67). En Captura de datos, verificar y corregir errores pesa 0.3659 (E = 4, A = 3, C = 1) y archivar y llevar registros, 0.3373 (E = 2, A = 2, C = 2); ninguna actividad llega a C = 4. Contabilidad reparte peso en auditar controles y detectar fraude (0.2861; E = 3, A = 2, C = 3) y asesorar y representar ante autoridades (0.0931; C = 4). Advertencia: el uso observado suma 0.5989 del peso en Contabilidad y 0.1175 en Captura de datos. Es el par con evidencia más desigual.

### Manufactura y oficios: 13 puntos

CNC y Soldadura comparten taller, no tareas. Revisar planos y programar la máquina pesa 0.1928 en CNC (E = 3, A = 2, C = 3) y cargar comandos en el controlador, 0.1494 (E = 2, A = 2, C = 2). En Soldadura, interpretar planos y determinar métodos pesa 0.0999 (E = 3, A = 2, C = 3). El resto de Soldadura es cuerpo: soldar y unir (0.2962), preparar y dar acabado (0.2219) y posicionar piezas y operar equipo (0.1683) suman 0.6864, con E = 0 en las tres.

## Lectura editorial

**Inferencia:** en tres de los cuatro pares, la E publicada es lo que más separa a las ocupaciones: 84 contra 63, 62 contra 47 y 35 contra 11. En Administración y finanzas separan A y C, no E. «¿Textual o físico?» explica bastante, no todo.

**Hipótesis, por comprobar:** que la proporción de trabajo presencial o con responsabilidad directa prediga la exposición mejor que el sector. Con ocho perfiles elegidos por su brecha no se prueba.

Lectura práctica para México. Si eres periodista, la parte expuesta está en la mesa de redacción, no en la calle. Si trabajas en contabilidad, depende de cuánto de tu semana es conciliar y capturar, y cuánto asesorar y firmar. Y recuerda: O*NET describe puestos de Estados Unidos y el uso observado es solo de Claude. Exposición no es despido.

## Datos abiertos y conexión interna

- CSV del índice general, con los totales de las 21 ocupaciones (CC BY 4.0): [`/datos/indice-exposicion.csv`](/datos/indice-exposicion.csv)
- CSV de este experimento, con el desglose por actividad de los 4 pares (CC BY 4.0): [`/datos/laboratorio-01-brecha-exposicion.csv`](/datos/laboratorio-01-brecha-exposicion.csv)
- Consulta el índice completo: [Índice de Exposición Laboral a la IA](/indice-exposicion-laboral-ia/)
- Fichas de los pares: [Redacción](/indice-exposicion-laboral-ia/redaccion/), [Periodismo](/indice-exposicion-laboral-ia/periodismo/), [Radiología](/indice-exposicion-laboral-ia/radiologia/), [Enfermería](/indice-exposicion-laboral-ia/enfermeria/), [Captura de datos](/indice-exposicion-laboral-ia/captura-de-datos/), [Contabilidad](/indice-exposicion-laboral-ia/contabilidad/), [Operación de máquinas CNC](/indice-exposicion-laboral-ia/operacion-de-maquinas-cnc/) y [Soldadura](/indice-exposicion-laboral-ia/soldadura/).

---
title: "67 de 160 actividades (41.9%) conservan complementariedad humana máxima; solo 15 (9.4%) tienen exposición técnica nula"
description: "En las 21 ocupaciones del Índice de Exposición Laboral a la IA, 67 de 160 actividades conservan complementariedad humana máxima (C = 4) y solo 15 tienen exposición técnica nula (E = 0)."
kicker: "Laboratorio · Experimento 04"
experimento: 4
pubDate: 2026-11-17
heroImage: /images/laboratorio/laboratorio-04-actividades-intocables/hero.webp
heroImageAlt: "Campana de cristal que protege un cuaderno de cuero, una pluma y una taza, mientras flujos de luz turquesa rodean el vidrio sin entrar."
csv: /datos/laboratorio-04-actividades-intocables.csv
draft: false
---

## Resumen ejecutivo

- **Qué probamos:** si las actividades donde el trabajo humano sigue siendo indispensable (`C = 4`) son las mismas que la IA no alcanza técnicamente (`E = 0`), dentro de las 21 ocupaciones del [Índice de Exposición Laboral a la IA](/indice-exposicion-laboral-ia/) de glitchMentalMX.
- **Qué encontramos:** 67 de 160 actividades (41.9%) tienen `C = 4`. Solo 15 (9.4%) tienen `E = 0`, y las 15 están dentro de esas 67. Lo que la IA no toca es un subconjunto pequeño de lo que sigue necesitando a una persona.
- **Qué significa:** "no se puede automatizar" y "alguien tiene que responder" son protecciones distintas. La segunda es más amplia, pero casi toda se apoya en inferencia editorial, no en telemetría.

## Protocolo y límites

Ejecutamos el análisis el 17 de noviembre de 2026 sobre las 160 tareas de las 21 ocupaciones testigo de la Edición 1 del Índice (fuente: O*NET 31.0). Son 21 ocupaciones elegidas como muestra, no el catálogo completo de México (SINCO/ENOE). Nada de esto se extrapola al empleo nacional.

Cada tarea tiene una calificación de 0 a 4 en exposición técnica (`E`) y otra en complementariedad humana (`C`). El porcentaje de peso se calcula con los pesos de O*NET normalizados, porque su suma por ocupación se desvía de 1 por una tolerancia de ±0.0005, y se reporta con dos decimales. `C = 3` indica supervisión humana recomendable; `C = 4` se reserva para tareas donde la presencia física, el trato directo o la responsabilidad clínica o legal hacen indispensable a la persona. No significa inmunidad permanente.

Dos advertencias que condicionan todo lo demás:

- Las cuatro categorías funcionales de las tareas `C = 4` son una clasificación editorial inferida del enunciado de cada tarea, no un campo del Índice. Cada una de las 67 tareas recibió una sola categoría dominante, sin doble conteo: relación con clientes, pacientes o fuentes (23), intervención física directa (20), supervisión y coordinación humana (15) y juicio clínico, legal o financiero con firma (9).
- El 92.5% de las calificaciones `C = 4` (62 de 67) proviene de inferencia editorial. La telemetría del Anthropic Economic Index registra interacciones en pantalla, no trabajo físico fuera de ella, así que sobre cargar un remolque o soldar una pieza simplemente no hay registro que citar.

## Evidencia

<table>
  <caption>Las 21 ocupaciones del Índice, ordenadas de mayor a menor % de peso en actividades con C = 4</caption>
  <thead>
    <tr>
      <th scope="col">Ocupación</th>
      <th scope="col">Sector</th>
      <th scope="col">Puntuación del Índice</th>
      <th scope="col">Tareas C = 4 / total</th>
      <th scope="col">% peso C = 4</th>
      <th scope="col">% peso E = 0</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/enfermeria/">Enfermería general</a></th>
      <td>Salud</td>
      <td>31</td>
      <td>6 / 8</td>
      <td>88.84%</td>
      <td>15.19%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/psicologia-clinica/">Psicología clínica</a></th>
      <td>Derecho y ciencias sociales</td>
      <td>36</td>
      <td>6 / 8</td>
      <td>79.80%</td>
      <td>0.00%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/electricista/">Electricista</a></th>
      <td>Manufactura y oficios</td>
      <td>19</td>
      <td>5 / 7</td>
      <td>76.11%</td>
      <td>52.71%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/soldadura/">Soldadura</a></th>
      <td>Manufactura y oficios</td>
      <td>15</td>
      <td>4 / 7</td>
      <td>75.77%</td>
      <td>75.77%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/conduccion-de-carga/">Conducción de transporte de carga</a></th>
      <td>Transporte y logística</td>
      <td>26</td>
      <td>5 / 8</td>
      <td>68.04%</td>
      <td>33.83%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/abogacia/">Abogacía</a></th>
      <td>Derecho y ciencias sociales</td>
      <td>39</td>
      <td>6 / 9</td>
      <td>64.11%</td>
      <td>0.00%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/operacion-de-maquinas-cnc/">Operación de máquinas CNC</a></th>
      <td>Manufactura y oficios</td>
      <td>28</td>
      <td>3 / 9</td>
      <td>48.70%</td>
      <td>29.59%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/docencia-de-secundaria/">Docencia de secundaria</a></th>
      <td>Educación e investigación</td>
      <td>41</td>
      <td>5 / 9</td>
      <td>48.62%</td>
      <td>6.85%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/radiologia/">Radiología</a></th>
      <td>Salud</td>
      <td>43</td>
      <td>4 / 9</td>
      <td>46.74%</td>
      <td>12.06%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/planeacion-logistica/">Planeación logística</a></th>
      <td>Transporte y logística</td>
      <td>50</td>
      <td>4 / 8</td>
      <td>43.46%</td>
      <td>0.00%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/ingenieria-civil/">Ingeniería civil (supervisión de obra)</a></th>
      <td>Ingeniería y arquitectura</td>
      <td>44</td>
      <td>3 / 7</td>
      <td>41.51%</td>
      <td>0.00%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/periodismo/">Periodismo (reporteros y analistas de noticias)</a></th>
      <td>Comunicación</td>
      <td>47</td>
      <td>3 / 7</td>
      <td>40.28%</td>
      <td>0.00%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/arquitectura-y-bim/">Diseño arquitectónico y modelado BIM</a></th>
      <td>Ingeniería y arquitectura</td>
      <td>45</td>
      <td>3 / 7</td>
      <td>39.95%</td>
      <td>0.00%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/traduccion-e-interpretacion/">Traducción e interpretación</a></th>
      <td>Comunicación</td>
      <td>56</td>
      <td>4 / 8</td>
      <td>28.71%</td>
      <td>6.83%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/analisis-de-datos/">Análisis de datos</a></th>
      <td>Tecnología</td>
      <td>54</td>
      <td>1 / 8</td>
      <td>25.09%</td>
      <td>0.00%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/redaccion/">Redacción (escritores y autores)</a></th>
      <td>Comunicación</td>
      <td>63</td>
      <td>1 / 6</td>
      <td>19.25%</td>
      <td>0.00%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/contabilidad/">Contabilidad</a></th>
      <td>Administración y finanzas</td>
      <td>57</td>
      <td>2 / 8</td>
      <td>15.73%</td>
      <td>0.00%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/marketing-digital/">Marketing digital e investigación de mercado</a></th>
      <td>Comercio y marketing</td>
      <td>62</td>
      <td>1 / 6</td>
      <td>13.50%</td>
      <td>0.00%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/desarrollo-de-software/">Desarrollo de software</a></th>
      <td>Tecnología</td>
      <td>55</td>
      <td>1 / 9</td>
      <td>10.95%</td>
      <td>0.00%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/atencion-al-cliente/">Atención al cliente (centro de contacto)</a></th>
      <td>Comercio y marketing</td>
      <td>68</td>
      <td>0 / 8</td>
      <td>0.00%</td>
      <td>0.00%</td>
    </tr>
    <tr>
      <th scope="row"><a href="/indice-exposicion-laboral-ia/captura-de-datos/">Captura de datos</a></th>
      <td>Administración y finanzas</td>
      <td>65</td>
      <td>0 / 4</td>
      <td>0.00%</td>
      <td>0.00%</td>
    </tr>
  </tbody>
</table>

El [CSV completo](/datos/laboratorio-04-actividades-intocables.csv) trae las 160 actividades con sus calificaciones.

## Lectura editorial

**Hay dos clases de intocable, y no se parecen.** La primera es la física: de las 15 actividades con `E = 0`, 13 son intervención física directa. Por eso [Soldadura](/indice-exposicion-laboral-ia/soldadura/) concentra 75.77% de su peso en `E = 0`, Electricista 52.71% y Conducción de transporte de carga 33.83%. Las otras dos son la disciplina en el aula de secundaria y los códigos éticos y de confidencialidad en traducción. En todas, el cuerpo o la firma de alguien están en juego.

La segunda clase es la protección por responsabilidad o relación: `C = 4` con `E > 0`. Aquí la IA sí puede tocar la tarea, pero alguien tiene que dar la cara. [Psicología clínica](/indice-exposicion-laboral-ia/psicologia-clinica/) tiene 79.80% de su peso en `C = 4` y 0.00% en `E = 0`; Abogacía, 64.11% contra 0.00%. [Enfermería](/indice-exposicion-laboral-ia/enfermeria/) es el caso mixto: encabeza la tabla con 88.84% en `C = 4`, pero solo 15.19% en `E = 0`. Ojo: esos porcentajes miden el peso de importancia y frecuencia de O*NET dentro de la ocupación, no proporción de horas laborales ni de empleos inmunes. Esta segunda protección es la más amplia y también la más frágil, porque depende de normas, licencias y costumbre, no de una limitación técnica. Es nuestra lectura, no una medición.

**Abajo de la tabla, el hueco es total.** [Atención al cliente](/indice-exposicion-laboral-ia/atencion-al-cliente/) y Captura de datos no tienen una sola tarea `C = 4`: ambas marcan 0.00%. Además tienen las dos puntuaciones más altas del Índice (68 y 65). [Desarrollo de software](/indice-exposicion-laboral-ia/desarrollo-de-software/) apenas rescata una de nueve tareas (10.95% del peso). Lo que se protege en estas ocupaciones no es el puesto completo sino fragmentos, y el Índice no demuestra que esos fragmentos basten para sostener el volumen actual de plazas.

**Los datos miran donde hay pantalla.** Solo 5 de las 67 tareas `C = 4` aparecen como uso observado, y pertenecen a Enfermería, Psicología clínica, Docencia de secundaria (dos) y Planeación logística. Las 15 tareas con `E = 0` son, todas, inferencia editorial. La ausencia de registros en la telemetría de pantalla prueba falta de medición en ese canal, no imposibilidad técnica futura fuera de él. Eso obliga a leer la conclusión como hipótesis razonable y no como hecho medido.

## Datos abiertos y conexión interna

Las 160 actividades, sus calificaciones y el resumen por ocupación están en el [CSV abierto](/datos/laboratorio-04-actividades-intocables.csv), con licencia CC BY 4.0. Para ver la lógica de cada puntuación, entra a las fichas del [Índice de Exposición Laboral a la IA](/indice-exposicion-laboral-ia/).

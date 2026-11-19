# Respuestas íntegras — Experimento 08: La letra chiquita en contratos de México

Datos abiertos de [glitchMentalMX](https://glitchmental.com/) · Licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es)

- **Pieza:** https://glitchmental.com/laboratorio/letra-chiquita-en-contratos-de-mexico/
- **CSV de resultados codificados:** https://glitchmental.com/datos/laboratorio-08-letra-chiquita-contratos-mexico.csv
- **Ejecución:** 2026-11-17, interfaz web estándar de cada modelo (ChatGPT, Claude y Gemini), un chat nuevo por caso y una sola respuesta, sin repreguntas. 15 respuestas (3 modelos × 5 contratos).
- **Qué es este archivo:** el texto que devolvió cada modelo, tal como salió, para que puedas verificar o recalificar sin fiarte de nuestro puntaje. Solo se cambió el formato (de la interfaz web a Markdown) y se normalizaron los espacios en blanco. Las palabras y las URL no se editaron.
- **Memoria de cuenta:** las pruebas corrieron en las cuentas del editor, no en cuentas anónimas. Las piezas 07, 10 y 11 documentan huella de memoria en algunas respuestas (por ejemplo, un saludo por nombre); cada pieza declara en «Protocolo y límites» lo que encontramos.

## Prompts usados

### C01 — Contrato de arrendamiento habitacional en Ciudad de México

````text
Revisa este fragmento de un contrato de arrendamiento de casa habitación en la Ciudad de México e identifica si contiene cláusulas abusivas, ilegales o nulas conforme a la ley mexicana vigente, explicando por qué: 'CLÁUSULA CUARTA. La renta mensual será de $14,000.00 MXN y se incrementará automáticamente cada año en un 15% fijo; en caso de atraso mayor a 5 días, se causará un interés moratorio del 10% mensual capitalizable. CLÁUSULA DÉCIMA SEGUNDA. Si el arrendatario se atrasa más de 10 días en el pago de la renta, autoriza expresamente al arrendador a ingresar al inmueble con llave propia, retirar sus pertenencias y dar por terminado el contrato de inmediato sin necesidad de juicio ni orden judicial, renunciando además el arrendatario al derecho del tanto en caso de venta del inmueble.'
````

### C02 — Contrato de adhesión de gimnasio / club deportivo (PROFECO)

````text
Revisa este fragmento de un contrato de adhesión de un gimnasio en México e identifica si contiene cláusulas abusivas, ilegales o nulas conforme a la ley mexicana vigente, explicando por qué: 'CLÁUSULA SÉPTIMA. El presente contrato tiene plazo forzoso de 12 meses con renovación automática anual mediante cargo domiciliado. Para cancelar antes del vencimiento, el usuario deberá acudir exclusivamente de forma presencial entre los días 1 y 5 del mes previo y pagar una pena convencional equivalente al 50% de todas las mensualidades restantes. CLÁUSULA NOVENA. El gimnasio no asume responsabilidad alguna por el robo o extravío de objetos guardados dentro de los casilleros cerrados con candado, ni por lesiones derivadas de fallas mecánicas en los aparatos de ejercicio.'
````

### C03 — Contrato de apertura de crédito / tarjeta fintech en México (CONDUSEF)

````text
Revisa este fragmento de un contrato de tarjeta de crédito emitido por una entidad financiera en México e identifica si contiene cláusulas abusivas, ilegales o nulas conforme a la ley mexicana vigente, explicando por qué: 'CLÁUSULA OCTAVA. La Institución podrá modificar unilateralmente las tasas de interés ordinarias y crear nuevas comisiones en cualquier momento, surtiendo efectos inmediatos desde su publicación en el portal web sin necesidad de aviso previo ni derecho del cliente a cancelar bajo las condiciones anteriores. CLÁUSULA DÉCIMA QUINTA. En caso de mora mayor a 15 días, el cliente otorga mandato irrevocable para que la Institución cargue el saldo total vencido directamente a cualquier cuenta de nómina o ahorro que el titular mantenga en otras instituciones bancarias del país, sin requerir autorización adicional ni orden judicial.'
````

### C04 — Contrato individual de trabajo por tiempo indeterminado (LFT)

````text
Revisa este fragmento de un contrato individual de trabajo en México e identifica si contiene cláusulas abusivas, ilegales o nulas conforme a la ley mexicana vigente, explicando por qué: 'CLÁUSULA SEXTA. El trabajador renuncia expresamente al reclamo o pago de cualquier hora extraordinaria futura, salvo que exhiba orden escrita firmada con 48 horas de anticipación por el Director General, aun cuando permanezca laborando por instrucciones verbales de su supervisor. CLÁUSULA DÉCIMA. Al firmar este contrato, el trabajador suscribe un pagaré en blanco como garantía y autoriza descontar hasta el 40% de su salario mínimo semanal en caso de errores operativos o faltantes de caja.'
````

### C05 — Contrato de prestación de servicios de internet residencial (CRT / PROFECO)

````text
Revisa este fragmento de un contrato de servicio de internet fijo residencial en México e identifica si contiene cláusulas abusivas, ilegales o nulas conforme a la ley mexicana vigente, explicando por qué: 'CLÁUSULA QUINTA. El suscriptor acepta un plazo forzoso de 24 meses; si solicita la cancelación anticipada por cualquier motivo —incluyendo fallas continuas en la velocidad mínima ofrecida o ajustes tarifarios del proveedor—, deberá pagar una pena convencional igual al 100% de las mensualidades restantes. CLÁUSULA VIGÉSIMA. Para cualquier controversia derivada de este contrato, las partes renuncian a la competencia administrativa de PROFECO y se someten exclusivamente a los tribunales de Monterrey, Nuevo León, sin importar el domicilio donde se preste el servicio.'
````

## Nota de transcripción (para auditoría)

1. El texto de cada respuesta no se editó. Se convirtió de RTF a Markdown con pandoc (formato `gfm`). Tablas, listas y enlaces pueden verse distintos a como aparecen en el RTF, pero las palabras y las URL se conservan.
2. Cada respuesta va dentro de un bloque delimitado con `~~~~~` para que el marcado original (HTML de tablas, enlaces) no se interprete ni se rompa.
3. Los rótulos del RTF dicen `CO1` a `CO5` (con letra O). Aquí se normalizan a `C01` a `C05` solo en los encabezados.
4. En el RTF, la respuesta C02 de Claude quedó anidada dentro de la tabla de fuentes de C01 (artefacto del pegado). Se separó en el rótulo `CO2`. El bloque C01 de Claude termina con el HTML abierto de esa tabla.
5. Criterio de "evidencia de búsqueda web": se marca `Sí` solo si la respuesta trae enlaces, lista de fuentes o una frase de verificación. `Sin evidencia visible` no prueba que el modelo no buscó: solo que el texto pegado no lo muestra.

## Evidencia de búsqueda web por modelo

| Modelo | C01 | C02 | C03 | C04 | C05 | Criterio |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| ChatGPT | Sí | Sí | Sí | Sí | Sí | Enlaces `utm_source=chatgpt.com` y fuentes citadas |
| Claude | Sí | Sí | Sí | Sí | Sí | "Voy a verificar…" y lista de fuentes con enlaces |
| Gemini | Sin evidencia visible | Sin evidencia visible | Sin evidencia visible | Sin evidencia visible | Sin evidencia visible | Sin enlaces, fuentes ni mención de verificación |

---


## ChatGPT


### ChatGPT · C01 — Arrendamiento habitacional CDMX

- **Evidencia de búsqueda web:** Sí. Enlaces con `utm_source=chatgpt.com` y etiquetas de fuente en el cuerpo de la respuesta.

~~~~~
**Análisis jurídico del contrato de arrendamiento — Ciudad de México**  
  
Contiene cláusulas contrarias a la ley  
Requiere modificación antes de firmar  
  
Conclusión: El fragmento contiene varias disposiciones jurídicamente cuestionables y, al menos en tres aspectos, contrarias a normas expresas del Código Civil de la Ciudad de México.  
No estamos solamente ante condiciones desfavorables para el inquilino. Hay estipulaciones que pretenden eliminar derechos irrenunciables y permitir que el arrendador ejerza facultades que corresponden a los tribunales.  
El análisis considera la legislación vigente al 17 de noviembre de 2026, incluida la reforma del Código Civil publicada el 20 de agosto de 2026 y el criterio de la Suprema Corte sobre los límites al incremento de rentas.  
**1. CLÁUSULA CUARTA: renta e intereses moratorios**  
A. Incremento anual fijo del 15%  
Contrario a la ley  
La cláusula establece:  
La renta mensual \[...\] se incrementará automáticamente cada año en un 15% fijo.  
Esto contradice directamente el artículo 2448 D del Código Civil para el Distrito Federal (aplicable en la Ciudad de México).  
Su texto vigente establece:

- La renta de vivienda solamente puede aumentarse anualmente.  

- El incremento nunca puede superar la inflación reportada por el Banco de México durante el año anterior.    
  Por tanto, el 15% no puede imponerse automáticamente si supera ese límite.  
  Por ejemplo, si la inflación anual de referencia fuera del 4%, el incremento máximo permitido sería del 4%, no del 15%.  
  Además, este límite ya fue objeto de revisión constitucional: el 25 de febrero de 2026, el Pleno de la Suprema Corte de Justicia de la Nación validó la constitucionalidad del artículo 2448 D.  
  La SCJN determinó que el límite protege el derecho a una vivienda adecuada y evita incrementos desproporcionados.  
  Fuente: comunicado 035/2026 de la SCJN.  
    
  Internet 2+1  
    
  Consecuencia jurídica: La estipulación del 15% es inaplicable en la medida en que exceda el límite legal. El arrendador no puede justificarla alegando que el inquilino la aceptó y firmó.  
  **B. Interés moratorio del 10% mensual capitalizable**  
  Capitalización expresamente prohibida  
  La cláusula establece:  
  En caso de atraso mayor a 5 días, se causará un interés moratorio del 10% mensual capitalizable.  
  Aquí encontramos dos problemas jurídicos diferentes.  
  1. La capitalización de intereses es nula.  
  El artículo 2397 del Código Civil de la Ciudad de México establece expresamente:  
  Las partes no pueden, bajo pena de nulidad, convenir de antemano que los intereses se capitalicen y que produzcan intereses.  
  Es decir, aunque el arrendador y el arrendatario firmen el contrato, no pueden pactar anticipadamente que los intereses vencidos se sumen al adeudo para generar nuevos intereses.  
  La prohibición es expresa.  
  2. El interés del 10% mensual puede ser desproporcionado.  
  El artículo 2395 establece que el interés convencional puede ser superior al interés legal, pero cuando resulta tan desproporcionado que permite presumir abuso de la necesidad económica, inexperiencia o ignorancia del deudor, el juez puede reducirlo equitativamente hasta el tipo legal, a petición de este.  
  El interés del 10% mensual equivale al 120% nominal anual, sin considerar capitalización.  
  No significa que cualquier interés superior al legal sea automáticamente nulo, pero sí constituye una condición susceptible de impugnación por desproporción.  
  Consecuencia jurídica:

<!-- -->

- La capitalización anticipada es nula.  

- El interés del 10% mensual puede ser reducido judicialmente si se acreditan los presupuestos del artículo 2395.  

- El retraso en el pago no autoriza por sí mismo al arrendador a ejecutar medidas extrajudiciales.    
  Fundamento: artículos 2395 y 2397 del Código Civil de la Ciudad de México.  
    
  TJACDMX  
    
  **2. CLÁUSULA DÉCIMA SEGUNDA: ingreso, retiro de pertenencias y terminación unilateral**  
  Esta es la disposición más grave del fragmento.  
  **A. Ingreso al inmueble con llave propia**  
  Jurídicamente improcedente  
  La cláusula permite al arrendador ingresar a la vivienda cuando el inquilino acumule más de diez días de retraso.  
  El problema es que el arrendador no conserva un derecho de acceso irrestricto al inmueble por el simple hecho de ser propietario.  
  Durante la vigencia del arrendamiento, el arrendatario tiene derecho al uso y goce pacífico de la vivienda.  
  El artículo 2412, fracciones III y IV, del Código Civil establece la obligación del arrendador de:

<!-- -->

- No estorbar ni interferir en el uso del inmueble, salvo por reparaciones urgentes e indispensables.  

- Garantizar el uso o goce pacífico de la propiedad durante todo el contrato.    
  La propiedad del inmueble no autoriza al arrendador a ignorar los derechos derivados del contrato.  
  Una autorización contractual genérica para entrar por cuenta propia ante un retraso en el pago no constituye una vía legal de recuperación de la posesión.  
  **B. Retirar las pertenencias del arrendatario**  
  Cláusula contraria al orden jurídico  
  Esta disposición es especialmente problemática.  
  El arrendador pretende atribuirse facultades para:

<!-- -->

- Entrar unilateralmente en la vivienda.  

- Retirar bienes personales del inquilino.  

- Recuperar materialmente la posesión del inmueble sin intervención judicial.    
  El arrendador puede reclamar las rentas vencidas y solicitar la rescisión del contrato cuando exista una causa legal.  
  Lo que no puede hacer es sustituir los procedimientos judiciales por mecanismos de ejecución privada.  
  El artículo 14 constitucional establece la garantía de debido proceso: nadie puede ser privado de sus derechos o posesiones sin un procedimiento seguido ante tribunales previamente establecidos, con las formalidades esenciales del procedimiento.  
  El artículo 16 constitucional también protege frente a actos de molestia que no estén debidamente fundados y motivados.  
  Consecuencia jurídica: La autorización para retirar pertenencias y recuperar materialmente la vivienda por cuenta propia no es una autorización válida para realizar un desalojo extrajudicial.  
  Además, dependiendo de cómo se ejecute, la conducta podría generar responsabilidades civiles e incluso penales. Esto último dependería de las circunstancias concretas; no significa que cualquier ingreso irregular configure automáticamente un delito.  
  **C. Terminación inmediata sin juicio ni orden judicial**  
  No puede producir el efecto pretendido  
  La cláusula dice:  
  Dar por terminado el contrato de inmediato sin necesidad de juicio ni orden judicial.  
  Aquí es importante distinguir dos cuestiones:  
  La rescisión contractual y el desalojo son cosas diferentes.  
  El incumplimiento en el pago de la renta puede constituir una causa legal de rescisión del arrendamiento.  
  El arrendador puede ejercer las acciones correspondientes para reclamar las rentas y obtener la rescisión y, en su caso, la restitución del inmueble.  
  Sin embargo, no puede convertir unilateralmente su declaración de rescisión en una orden de desalojo.  
  La cláusula pretende eliminar anticipadamente las garantías procesales del arrendatario. Esa renuncia no es válida.  
  Hay además una disposición particularmente relevante: el artículo 2448 del Código Civil de la Ciudad de México establece que las normas del capítulo relativo al arrendamiento de vivienda son de orden público e interés social, por lo que son irrenunciables y cualquier estipulación contraria se tendrá por no puesta.  
    
  Articulado — Leyes de México+1  
    
  **3. Renuncia al derecho del tanto en caso de venta**  
  Renuncia ineficaz  
  La cláusula concluye:  
  Renunciando además el arrendatario al derecho del tanto en caso de venta del inmueble.  
  El artículo 2448 J del Código Civil de la Ciudad de México reconoce un derecho de preferencia a favor del arrendatario que se encuentre al corriente en el pago de sus rentas cuando el propietario decida vender el inmueble.  
  Entre otras cosas, establece:

||
||
||

<table>
<tbody>
<tr class="odd">
<td><ol type="1">
<li><p>El propietario debe notificar fehacientemente su intención de vender.  </p></li>
<li><p>Debe informar el precio y las condiciones de la operación.  </p></li>
<li><p>El arrendatario dispone de 30 días para comunicar por escrito que desea ejercer su derecho de preferencia.  </p></li>
<li><p>Si se modifican determinadas condiciones de la oferta, pueden surgir nuevas obligaciones de notificación.  <br />
La disposición también contempla acciones legales cuando la compraventa se realiza en contravención de ese derecho.<br />
Hay una precisión terminológica: el artículo 2448 J regula propiamente un derecho de preferencia o adquisición preferente, aunque coloquialmente se le denomine derecho del tanto.<br />
Lo fundamental es que el derecho está reconocido expresamente por la legislación aplicable a los arrendamientos habitacionales.<br />
Y aquí vuelve a operar el artículo 2448: las disposiciones de ese capítulo son irrenunciables.<br />
Por tanto, el arrendador no puede eliminar anticipadamente ese derecho mediante una cláusula contractual.<br />
<br />
Articulado — Leyes de México+1<br />
<br />
<strong>4. Resumen de las irregularidades</strong></p></li>
</ol>
<p>Disposición contractual</p></td>
<td><p>Evaluación jurídica</p></td>
<td><p>Fundamento</p></td>
</tr>
<tr class="even">
<td><p>Aumento anual del 15%</p></td>
<td><p>Contrario al límite legal cuando supera la inflación anual</p></td>
<td><p>Art. 2448 D</p></td>
</tr>
<tr class="odd">
<td><p>Interés moratorio del 10% mensual</p></td>
<td><p>Susceptible de reducción judicial por desproporción</p></td>
<td><p>Art. 2395</p></td>
</tr>
<tr class="even">
<td><p>Intereses capitalizables</p></td>
<td><p>Nulidad expresa del pacto anticipado</p></td>
<td><p>Art. 2397</p></td>
</tr>
<tr class="odd">
<td><p>Entrada con llave propia por mora</p></td>
<td><p>No autoriza la recuperación extrajudicial del inmueble</p></td>
<td><p>Arts. 2412 y 14 constitucional</p></td>
</tr>
<tr class="even">
<td><p>Retiro de pertenencias</p></td>
<td><p>No puede ejecutarse unilateralmente como mecanismo de desalojo</p></td>
<td><p>Arts. 14 y 16 constitucionales</p></td>
</tr>
<tr class="odd">
<td><p>Terminación sin juicio ni orden judicial</p></td>
<td><p>No permite eludir el procedimiento legal de recuperación del inmueble</p></td>
<td><p>Arts. 14 y 16 constitucionales</p></td>
</tr>
<tr class="even">
<td><p>Renuncia al derecho de preferencia</p></td>
<td><p>Ineficaz por tratarse de un derecho legal irrenunciable</p></td>
<td><p>Arts. 2448 y 2448 J</p></td>
</tr>
</tbody>
</table>

**5. ¿Qué ocurre si el arrendatario firma el contrato?**  
Este punto es importante.  
La firma del contrato no convierte automáticamente en legales las cláusulas contrarias a disposiciones imperativas.  
En particular:

- El artículo 2448 establece que las estipulaciones contrarias a las disposiciones de protección del arrendamiento habitacional se tendrán por no puestas.  

- El artículo 2397 establece expresamente la nulidad del pacto anticipado de capitalización de intereses.  

- El artículo 2395 permite solicitar judicialmente la reducción de intereses desproporcionados.    
  Por tanto, no necesariamente queda invalidado todo el contrato. Las disposiciones ilegales pueden ser ineficaces o nulas sin que eso implique automáticamente la desaparición de las demás obligaciones contractuales.  
  **6. ¿Cómo deberían redactarse estas cláusulas?**  
  Una alternativa jurídicamente más adecuada sería:  
  Cláusula cuarta — propuesta de modificación  
  **CLÁUSULA CUARTA. RENTA Y ACTUALIZACIÓN.**  
  La renta mensual será de \$14,000.00 (catorce mil pesos 00/100 M.N.), pagadera en los términos y condiciones establecidos en este contrato.  
  La renta podrá actualizarse una vez por año, sin que el incremento exceda la inflación anual reportada por el Banco de México correspondiente al año anterior, conforme a lo establecido en el artículo 2448 D del Código Civil para el Distrito Federal, aplicable en la Ciudad de México.  
  En caso de retraso en el pago, podrán generarse intereses moratorios a la tasa convencional que resulte legalmente procedente, sin capitalización anticipada de intereses y sin perjuicio de las facultades de revisión judicial previstas en la legislación aplicable.  
  Cláusula décima segunda — propuesta de modificación  
  **CLÁUSULA DÉCIMA SEGUNDA. INCUMPLIMIENTO, RESCISIÓN Y RESTITUCIÓN DEL INMUEBLE.**  
  El incumplimiento de la obligación de pago de la renta dará derecho al arrendador a ejercer las acciones legales correspondientes, incluyendo, cuando proceda, la rescisión del contrato y la reclamación de las cantidades adeudadas.  
  La terminación del contrato y la restitución del inmueble deberán realizarse conforme a los procedimientos y disposiciones legales aplicables.  
  En ningún caso el arrendador podrá ingresar unilateralmente al inmueble para retirar bienes del arrendatario, cambiar cerraduras, impedir el acceso o recuperar la posesión mediante actos de propia autoridad.  
  En caso de enajenación del inmueble, se respetarán los derechos de preferencia del arrendatario previstos en el artículo 2448 J del Código Civil para el Distrito Federal, aplicable en la Ciudad de México.  
    
  **7. Dictamen final**  
  **Resultado: contrato con disposiciones jurídicamente objetables**  
  Mi valoración: no recomendaría firmarlo en su redacción actual.  
  Los problemas más importantes son:

1.  El incremento automático del 15% contradice el límite legal.  

2.  La capitalización anticipada de intereses está expresamente prohibida.  

3.  El arrendador pretende atribuirse facultades de desalojo y recuperación del inmueble por cuenta propia.  

4.  La renuncia al derecho de preferencia contradice una disposición irrenunciable del régimen de arrendamiento habitacional.    
    Fuentes jurídicas para consulta:

- <u>[Congreso de la Ciudad de M](https://www.congresocdmx.gob.mx/?utm_source=chatgpt.com)[é](https://www.congresocdmx.gob.mx/?utm_source=chatgpt.com)[xico](https://www.congresocdmx.gob.mx/?utm_source=chatgpt.com)</u> — legislación local.  

- <u>[C](https://paot.org.mx/centro/leyes-normas-htmls/c-digo-civil-para-81.html?utm_source=chatgpt.com)[ó](https://paot.org.mx/centro/leyes-normas-htmls/c-digo-civil-para-81.html?utm_source=chatgpt.com)[digo Civil para el Distrito Federal](https://paot.org.mx/centro/leyes-normas-htmls/c-digo-civil-para-81.html?utm_source=chatgpt.com)</u> — texto legislativo.  

- <u>[Suprema Corte de Justicia de la Naci](https://www.scjn.gob.mx/?utm_source=chatgpt.com)[ó](https://www.scjn.gob.mx/?utm_source=chatgpt.com)[n](https://www.scjn.gob.mx/?utm_source=chatgpt.com)</u> — criterios jurisdiccionales.  

- <u>[Comunicado SCJN 035/2026](https://www.internet2.scjn.gob.mx/red2/comunicados/comunicado.asp?id=8452&utm_source=chatgpt.com)</u> — constitucionalidad del límite al incremento de rentas.    
  Nota: Este es un análisis jurídico informativo del fragmento proporcionado, no un dictamen profesional sobre el contrato completo. Para determinar todas sus consecuencias habría que revisar también la duración, garantías, causas de rescisión, depósito y demás estipulaciones.  
  Mi recomendación es no aceptar las cláusulas cuarta y décima segunda sin modificaciones. Especialmente la autorización para entrar, retirar pertenencias y desalojar: firmar esa autorización no le concede al propietario poderes judiciales que no tiene.  
~~~~~


### ChatGPT · C02 — Contrato de adhesión de gimnasio (PROFECO)

- **Evidencia de búsqueda web:** Sí. Enlaces con `utm_source=chatgpt.com` y etiquetas de fuente en el cuerpo de la respuesta.

~~~~~
  El fragmento contiene varias disposiciones potencialmente abusivas y, en algunos casos, contrarias a normas imperativas de protección al consumidor. La cláusula séptima presenta problemas importantes por las restricciones para cancelar y la penalización económica. La novena intenta excluir responsabilidades que el gimnasio no puede eliminar simplemente mediante una declaración contractual.  
  El análisis debe hacerse principalmente conforme a la Ley Federal de Protección al Consumidor (LFPC), sin perder de vista las disposiciones del Código Civil aplicables a las penas convencionales y a la responsabilidad por daños.  
  **1. Análisis de la cláusula séptima: plazo forzoso, renovación y cancelación**  
  A. Plazo forzoso de 12 meses  
  Legalidad condicionada  
  Un gimnasio puede establecer una membresía con plazo mínimo de permanencia de 12 meses, siempre que la condición se informe claramente antes de contratar y no implique prestaciones desproporcionadas o inequitativas.  
  El artículo 85 de la LFPC exige que los contratos de adhesión no impongan prestaciones desproporcionadas ni obligaciones inequitativas o abusivas.  
  Conclusión: el plazo forzoso no es ilegal por sí mismo. Lo cuestionable es utilizarlo para impedir o dificultar excesivamente la terminación anticipada del servicio.  
  **B. Renovación automática anual mediante cargo domiciliado**  
  Contraviene obligaciones legales si se aplica sin las garantías correspondientes  
  Aquí existe una disposición especialmente importante que el contrato parece ignorar.  
  El 12 de diciembre de 2025 se publicó en el Diario Oficial de la Federación el decreto que adicionó las fracciones VIII y IX al artículo 76 Bis de la LFPC, específicamente para regular las suscripciones y membresías con cobros recurrentes.  
  Desde su entrada en vigor, el proveedor debe:

<!-- -->

- Informar claramente que existen cobros automáticos recurrentes, su periodicidad, monto y fecha.  

- Obtener el consentimiento expreso e informado del consumidor.  

- Notificar la renovación automática con al menos cinco días naturales de anticipación.  

- Permitir cancelar la renovación sin penalización.  

- Implementar mecanismos que permitan cancelar el servicio, suscripción o membresía de manera inmediata.    
  Esto significa que la renovación automática no está prohibida, pero tampoco puede funcionar como una trampa contractual.  
  La cláusula séptima omite las garantías de información, notificación y cancelación previstas en la reforma.  
    
  Diario Oficial de la Federación  
    
  **C. Cancelación exclusivamente presencial entre los días 1 y 5**  
  Potencialmente ilegal y abusiva  
  Esta disposición presenta dos problemas:  
  1. Restricción del mecanismo de cancelación: obligar al consumidor a acudir exclusivamente de manera presencial limita injustificadamente sus posibilidades de ejercer su derecho de terminación, especialmente cuando la propia LFPC exige mecanismos de cancelación inmediata para las membresías con cobros recurrentes.  
  2. Ventana de cancelación excesivamente limitada: permitir cancelar únicamente entre los días 1 y 5 del mes anterior al vencimiento puede provocar que el consumidor quede obligado a pagar otro periodo simplemente por no haber podido acudir durante esos cinco días.  
  La exigencia de una comparecencia presencial tampoco puede utilizarse para impedir que el consumidor comunique su voluntad de cancelar mediante otros mecanismos disponibles.  
  Fundamento: artículo 76 Bis, fracciones VIII y IX, y artículo 10 de la LFPC.  
  **D. Pena convencional del 50% de todas las mensualidades restantes**  
  Potencialmente abusiva; requiere analizar su proporcionalidad  
  Es la disposición económicamente más cuestionable.  
  Una pena convencional no está prohibida en México. Sin embargo, debe respetar ciertos límites:

<!-- -->

- El artículo 85 de la LFPC prohíbe prestaciones desproporcionadas y obligaciones inequitativas en contratos de adhesión.  

- El artículo 10 prohíbe las cláusulas y condiciones abusivas impuestas al consumidor.  

- Los artículos 1840 a 1845 del Código Civil Federal regulan las penas convencionales.    
  En particular:  
  Artículo 1843: la pena convencional no puede exceder en valor ni cuantía a la obligación principal.  
  Artículo 1844: cuando la obligación se cumple parcialmente, la pena debe modificarse en la misma proporción.  
  Artículo 1845: si la reducción no puede calcularse exactamente, el juez puede reducirla equitativamente.  
  Una penalización equivalente al 50% de todas las mensualidades pendientes puede resultar desproporcionada, especialmente cuando el gimnasio deja de prestar el servicio y pretende cobrar cantidades importantes por periodos que ya no serán disfrutados.  
  No obstante, hay una precisión jurídica importante: el 50% no es automáticamente ilegal por el solo hecho de ser ese porcentaje. Su validez depende de la naturaleza de las obligaciones, el perjuicio contractual, la proporcionalidad y la legislación civil aplicable.  
  Además, debe distinguirse entre cancelar la renovación automática al finalizar los 12 meses y terminar anticipadamente el periodo mínimo: la renovación debe poder rechazarse sin penalización.  
    
  **2. Análisis de la cláusula novena: exclusión de responsabilidad**  
  A. Robo o extravío de objetos en casilleros cerrados con candado  
  Cláusula inválida en su formulación absoluta  
  La expresión «el gimnasio no asume responsabilidad alguna» pretende liberar al proveedor de cualquier responsabilidad civil, independientemente de las circunstancias.  
  Esto entra directamente en conflicto con el artículo 90, fracción II, de la LFPC:  
  No serán válidas y se tendrán por no puestas las cláusulas que liberen al proveedor de su responsabilidad civil, excepto cuando el consumidor incumpla el contrato.  
  También resulta relevante la fracción III, que prohíbe trasladar al consumidor o a terceros la responsabilidad civil del proveedor.  
  Hay que distinguir dos situaciones:

<!-- -->

- Robo atribuible a una conducta negligente del gimnasio: por ejemplo, fallas de seguridad conocidas, deficiencias en los mecanismos de acceso o intervención de sus empleados. El gimnasio no puede excluir anticipadamente su responsabilidad.  

- Robo sin negligencia atribuible al gimnasio: la responsabilidad no necesariamente se presume por el simple hecho de que el robo ocurra dentro de sus instalaciones. Deben analizarse las circunstancias, el deber de custodia asumido y la relación causal.    
  El hecho de que el usuario utilice un candado no elimina automáticamente las obligaciones legales del establecimiento.  
  Por tanto, el gimnasio puede establecer reglas razonables de uso de casilleros, pero no exonerarse de cualquier responsabilidad mediante una cláusula general.  
  **B. Lesiones derivadas de fallas mecánicas en aparatos de ejercicio**  
  Cláusula contraria directamente a la LFPC  
  Esta disposición es particularmente grave.  
  Si una persona sufre lesiones por una falla mecánica de una caminadora, bicicleta fija, polea, prensa u otro aparato, pueden existir responsabilidades del gimnasio por:

||
||
||

<table>
<tbody>
<tr class="odd">
<td><ul>
<li><p>Falta de mantenimiento preventivo.  </p></li>
<li><p>Omisión de revisiones de seguridad.  </p></li>
<li><p>Uso de equipos defectuosos.  </p></li>
<li><p>Falta de reparación o sustitución de maquinaria peligrosa.  </p></li>
<li><p>Negligencia en la supervisión y operación de las instalaciones.  <br />
El artículo 90, fracción II, de la LFPC impide que un proveedor se libere contractualmente de su responsabilidad civil.<br />
Además, el artículo 1, fracciones I y IV, de la misma ley reconoce como principios básicos la protección de la vida, salud y seguridad del consumidor y la prevención y reparación de daños patrimoniales y morales.<br />
Por consiguiente, aunque el usuario firme el contrato y acepte esa cláusula, no está renunciando válidamente a su derecho de reclamar por lesiones ocasionadas por negligencia o incumplimiento de las obligaciones de seguridad del gimnasio.<br />
Eso no significa que el establecimiento responda automáticamente por cualquier accidente: deben acreditarse los hechos y los elementos de responsabilidad correspondientes.<br />
<br />
<strong>3. Resumen de hallazgos</strong></p></li>
</ul>
<p>Disposición</p></td>
<td><p>Evaluación jurídica</p></td>
</tr>
<tr class="even">
<td><p>Plazo forzoso de 12 meses</p></td>
<td><p>Puede ser válido</p></td>
</tr>
<tr class="odd">
<td><p>Renovación automática anual</p></td>
<td><p>Válida con requisitos legales</p></td>
</tr>
<tr class="even">
<td><p>Cargo domiciliado recurrente</p></td>
<td><p>Requiere consentimiento expreso e informado</p></td>
</tr>
<tr class="odd">
<td><p>Cancelación exclusivamente presencial</p></td>
<td><p>Contraria a las garantías de cancelación inmediata</p></td>
</tr>
<tr class="even">
<td><p>Ventana de cancelación de 5 días</p></td>
<td><p>Restricción potencialmente abusiva</p></td>
</tr>
<tr class="odd">
<td><p>Penalización del 50% restante</p></td>
<td><p>Potencialmente desproporcionada; no es nula automáticamente</p></td>
</tr>
<tr class="even">
<td><p>Exención por robo en casilleros</p></td>
<td><p>Inválida si pretende excluir toda responsabilidad del gimnasio</p></td>
</tr>
<tr class="odd">
<td><p>Exención por fallas mecánicas</p></td>
<td><p>Inválida cuando pretende liberar al gimnasio de responsabilidad civil</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
</tr>
</tbody>
</table>

**4. ¿Qué artículos permiten combatir estas cláusulas?**  
Estas son las disposiciones fundamentales:

|                      |                   |                                                               |
|----------------------|-------------------|---------------------------------------------------------------|
| **Ordenamiento**     | Artículo          | Aplicación                                                    |
| LFPC                 | 1                 | Orden público e irrenunciabilidad de derechos                 |
| LFPC                 | 10                | Prohibición de cláusulas abusivas                             |
| LFPC                 | 85                | Prohibición de obligaciones desproporcionadas e inequitativas |
| LFPC                 | 76 Bis, VIII y IX | Cobros recurrentes, renovación y cancelación                  |
| LFPC                 | 90, II y III      | Prohibición de exonerar o trasladar responsabilidad civil     |
| Código Civil Federal | 1843-1845         | Límites y reducción de penas convencionales                   |

Fuentes oficiales:

1.  <u>[Decreto de reforma al art](https://dof.gob.mx/nota_detalle.php%3Fcodigo=5775999&fecha=12/12/2025?utm_source=chatgpt.com)[í](https://dof.gob.mx/nota_detalle.php%3Fcodigo=5775999&fecha=12/12/2025?utm_source=chatgpt.com)[culo 76 Bis de la LFPC, DOF, 12 de diciembre de 2025](https://dof.gob.mx/nota_detalle.php%3Fcodigo=5775999&fecha=12/12/2025?utm_source=chatgpt.com)</u>.  

2.  <u>[Ley Federal de Protecci](https://portalhcd.diputados.gob.mx/LeyesBiblio/pdf/113_241220.pdf?utm_source=chatgpt.com)[ó](https://portalhcd.diputados.gob.mx/LeyesBiblio/pdf/113_241220.pdf?utm_source=chatgpt.com)[n al Consumidor, C](https://portalhcd.diputados.gob.mx/LeyesBiblio/pdf/113_241220.pdf?utm_source=chatgpt.com)[á](https://portalhcd.diputados.gob.mx/LeyesBiblio/pdf/113_241220.pdf?utm_source=chatgpt.com)[mara de Diputados](https://portalhcd.diputados.gob.mx/LeyesBiblio/pdf/113_241220.pdf?utm_source=chatgpt.com)</u>.  

3.  <u>[C](https://portalhcd.diputados.gob.mx/LeyesBiblio/pdf/2_110121.pdf?utm_source=chatgpt.com)[ó](https://portalhcd.diputados.gob.mx/LeyesBiblio/pdf/2_110121.pdf?utm_source=chatgpt.com)[digo Civil Federal, C](https://portalhcd.diputados.gob.mx/LeyesBiblio/pdf/2_110121.pdf?utm_source=chatgpt.com)[á](https://portalhcd.diputados.gob.mx/LeyesBiblio/pdf/2_110121.pdf?utm_source=chatgpt.com)[mara de Diputados](https://portalhcd.diputados.gob.mx/LeyesBiblio/pdf/2_110121.pdf?utm_source=chatgpt.com)</u>.    
    Una precisión: el Código Civil Federal sirve como referencia normativa, pero para resolver una controversia contractual también debe revisarse el código civil de la entidad federativa donde se celebró o debe cumplirse el contrato. Las normas civiles locales pueden resultar aplicables.  
    **5. ¿Qué debería hacer el consumidor?**  
    Si el gimnasio pretende hacer efectivas estas cláusulas, recomendaría:

<!-- -->

1.  Solicitar copia íntegra del contrato y verificar si corresponde a un modelo registrado ante PROFECO, cuando su registro sea exigible.  

2.  Conservar comprobantes de pagos, publicidad y comunicaciones relacionadas con la membresía.  

3.  Si desea cancelar, comunicarlo por escrito y conservar evidencia de la solicitud, sin esperar necesariamente a la ventana de los días 1 a 5.  

4.  Si el gimnasio exige la penalización o continúa realizando cargos, presentar una reclamación ante PROFECO.  

5.  Si existe una lesión o un robo, conservar pruebas del incidente, fotografías, informes médicos y comunicaciones con el establecimiento.    
    **6. Veredicto jurídico**  
    El contrato no es necesariamente nulo en su totalidad, pero contiene disposiciones que pueden ser declaradas inválidas o tenerse por no puestas.  
    Los puntos más sólidos para impugnar son:

- La exclusión absoluta de responsabilidad por lesiones derivadas de fallas mecánicas: artículo 90, fracción II.  

- La exclusión absoluta de responsabilidad por robo: artículo 90, fracción II, cuando pretenda cubrir incluso conductas imputables al gimnasio.  

- La imposición de obstáculos a la cancelación de una membresía con cobros recurrentes: artículo 76 Bis, fracción IX.  

- La renovación automática sin notificación previa ni posibilidad de cancelarla sin penalización: artículo 76 Bis, fracción VIII.    
  La penalización del 50% también es cuestionable, pero necesita un análisis específico de proporcionalidad y de las obligaciones contractuales.  
  Mi conclusión: si este fragmento fuera parte de un contrato real ofrecido a consumidores en México, recomendaría no aceptarlo en su redacción actual. Hay problemas jurídicos concretos, no simplemente condiciones comerciales desfavorables.  
  Este análisis es informativo y no sustituye un dictamen jurídico sobre el contrato completo.  
~~~~~


### ChatGPT · C03 — Tarjeta de crédito (CONDUSEF)

- **Evidencia de búsqueda web:** Sí. Enlaces con `utm_source=chatgpt.com` y etiquetas de fuente en el cuerpo de la respuesta.

~~~~~
  Ambas cláusulas presentan problemas jurídicos importantes. La primera contradice disposiciones expresas sobre transparencia financiera, modificación de tasas y comisiones. La segunda coincide prácticamente con un supuesto de cláusula abusiva identificado expresamente por la CONDUSEF.  
  El análisis se basa en legislación federal mexicana vigente al 17 de noviembre de 2026.  
  **1. CLÁUSULA OCTAVA: Modificación unilateral de tasas y creación de comisiones**  
    
  Contraria a disposiciones legales  
  Potencialmente inválida  
    
  La Institución podrá modificar unilateralmente las tasas de interés ordinarias y crear nuevas comisiones en cualquier momento, surtiendo efectos inmediatos desde su publicación en el portal web sin necesidad de aviso previo ni derecho del cliente a cancelar bajo las condiciones anteriores.  
  **A. Modificación de las tasas de interés**  
  La disposición aplicable es el artículo 18 Bis 3 de la Ley para la Transparencia y Ordenamiento de los Servicios Financieros (LTOSF).  
  Este artículo establece que las tasas de interés ordinarias de las tarjetas de crédito pueden modificarse sin aviso previo únicamente en dos situaciones:

1.  Cuando la modificación sea consecuencia de variaciones en el nivel de la tasa de referencia pactada.  

2.  Cuando expire una tasa promocional, conforme a su vigencia o al comportamiento crediticio del cliente, según lo establecido contractualmente.    
    En cualquier otro supuesto, el incremento debe notificarse al cliente mediante su estado de cuenta con al menos 30 días naturales de anticipación a la fecha en que entrará en vigor.  
    Por tanto, la institución no puede reservarse una facultad ilimitada para incrementar unilateralmente los intereses en cualquier momento.  
    Fundamento: artículo 18 Bis 3 de la LTOSF.  
      
    Condusef  
      
    **B. Creación de nuevas comisiones**  
    Aquí la infracción es todavía más evidente.  
    El artículo 7 de la LTOSF establece dos obligaciones:

- Las nuevas comisiones y los incrementos de las existentes deben notificarse al cliente con al menos 30 días naturales de anticipación.  

- El cliente tiene derecho a terminar la prestación del servicio si no está de acuerdo con las nuevas condiciones, sin pagar cargos adicionales por esa terminación, salvo los adeudos generados hasta entonces.    
  El mismo artículo establece expresamente:  
  El incumplimiento a lo previsto en el párrafo anterior, tendrá como consecuencia la nulidad de la Comisión.  
  Esto significa que una comisión creada y cobrada sin respetar el aviso previo legalmente exigido puede ser nula.  
  Fundamento: artículo 7, párrafos segundo y tercero, de la LTOSF.  
    
  Condusef  
    
  **C. Publicación en el portal web y eliminación del derecho de cancelación**  
  La publicación en una página web no sustituye automáticamente el aviso individual por los medios pactados contractualmente.  
  Además, la institución no puede eliminar el derecho del cliente a terminar el contrato cuando se modifican las condiciones económicas.  
  El artículo 17 de las Disposiciones de carácter general en materia de transparencia aplicables a las instituciones de crédito establece que las modificaciones contractuales deben notificarse con 30 días naturales de anticipación.  
  También exige que el aviso informe expresamente sobre el derecho del usuario a dar por terminado el contrato.  
    
  Diario Oficial de la Federación+1  
  Conclusión sobre la cláusula octava:  
  La estipulación es contraria a la legislación financiera en los siguientes aspectos:

<!-- -->

- Permite incrementos de intereses sin respetar los supuestos y plazos legales.  

- Autoriza nuevas comisiones sin aviso previo.  

- Pretende eliminar el derecho del cliente a terminar el contrato.    
  La comisión cobrada incumpliendo el artículo 7 puede ser nula. Respecto de los intereses, el incremento no puede hacerse efectivo desconociendo las condiciones del artículo 18 Bis 3.  
  No debe confundirse la invalidez de estas condiciones con la nulidad automática de todo el contrato.  
    
  **2. CLÁUSULA DÉCIMA QUINTA: Cargo de adeudos en cuentas de otros bancos**  
  Cláusula abusiva expresamente identificada por CONDUSEF  
  En caso de mora mayor a 15 días, el cliente otorga mandato irrevocable para que la Institución cargue el saldo total vencido directamente a cualquier cuenta de nómina o ahorro que el titular mantenga en otras instituciones bancarias del país, sin requerir autorización adicional ni orden judicial.  
  Esta cláusula tiene un problema especialmente grave: coincide directamente con un supuesto de cláusula abusiva contemplado en las disposiciones oficiales de la CONDUSEF.  
  **A. Prohibición expresa de autorizaciones irrevocables**  
  Las Disposiciones de carácter general en materia de cláusulas abusivas contenidas en los contratos de adhesión, publicadas en el Diario Oficial de la Federación el 19 de noviembre de 2014, establecen en su disposición TERCERA, apartado IV, inciso b), que son abusivas las cláusulas que, en contratos de crédito simple, en cuenta corriente o revolventes:  
  Establezcan la autorización irrevocable para cargar las parcialidades del crédito en cualquier cuenta de nómina o de depósito a nombre del Usuario contratada con otra Institución Financiera.  
  Una tarjeta de crédito es un financiamiento revolvente.  
  La coincidencia con el supuesto normativo es directa: la institución pretende obtener una autorización irrevocable para disponer de recursos depositados en cuentas que el cliente mantiene en otros bancos.  
  Fundamento: disposición TERCERA, apartado IV, inciso b), de las disposiciones de CONDUSEF.  
    
  Diario Oficial de la Federación+1  
    
  **B. La institución no puede disponer unilateralmente de cuentas de otros bancos**  
  También debe considerarse el artículo 57 de la Ley de Instituciones de Crédito.  
  Este precepto regula los cargos en cuentas de depósito y establece que las instituciones de crédito necesitan autorización del titular de la cuenta correspondiente o una autorización otorgada mediante el proveedor del servicio, siguiendo el procedimiento legal de domiciliación.  
  La existencia de una deuda con un banco no le concede automáticamente facultades para retirar dinero de cuentas mantenidas en otra institución.  
  La domiciliación bancaria tampoco equivale a una autorización irrevocable: el artículo 57 reconoce al titular el derecho de solicitar su cancelación.  
    
  Cámara de Diputados  
  **C. El mandato irrevocable no elimina los procedimientos legales**  
  La expresión «sin requerir autorización adicional ni orden judicial» intenta presentar el contrato de tarjeta como una autorización suficiente para disponer de cualquier depósito del cliente.  
  Sin embargo, deben distinguirse tres situaciones:

||
||
||

<table>
<tbody>
<tr class="odd">
<td><ul>
<li><p>Cobro contractual: el banco puede exigir el pago de la deuda conforme al contrato y la legislación aplicable.  </p></li>
<li><p>Domiciliación: requiere cumplir las condiciones legales y operativas correspondientes, incluida la autorización del titular de la cuenta de depósito.  </p></li>
<li><p>Ejecución judicial: cuando se pretende afectar bienes o recursos del deudor mediante medidas de ejecución forzosa, deben observarse los procedimientos legales correspondientes.  <br />
La cláusula no puede convertir al banco acreedor en autoridad facultada para embargar o disponer directamente de depósitos mantenidos en otras instituciones.<br />
Conclusión sobre la cláusula décima quinta:<br />
Es una cláusula abusiva conforme a las disposiciones expresas de CONDUSEF. Su carácter irrevocable y la pretensión de afectar cuentas de otras instituciones financieras son incompatibles con el marco de protección al usuario financiero.<br />
No debe confundirse esta calificación administrativa con una declaración judicial de nulidad: la cláusula puede ser objeto de una resolución de CONDUSEF que ordene su supresión.<br />
<br />
<strong>3. Resumen jurídico</strong></p></li>
</ul>
<p>Disposición</p></td>
<td><p>Problema identificado</p></td>
<td><p>Fundamento</p></td>
</tr>
<tr class="even">
<td><p>Cláusula octava</p></td>
<td><p>Incrementos de intereses sin respetar los supuestos legales de aviso</p></td>
<td><p>Art. 18 Bis 3 LTOSF</p></td>
</tr>
<tr class="odd">
<td><p>Cláusula octava</p></td>
<td><p>Nuevas comisiones sin aviso de 30 días</p></td>
<td><p>Art. 7 LTOSF</p></td>
</tr>
<tr class="even">
<td><p>Cláusula octava</p></td>
<td><p>Eliminación del derecho de terminación contractual</p></td>
<td><p>Art. 7 LTOSF y art. 17 de disposiciones de transparencia</p></td>
</tr>
<tr class="odd">
<td><p>Cláusula décima quinta</p></td>
<td><p>Autorización irrevocable para cargar cuentas de otros bancos</p></td>
<td><p>Disposición TERCERA, IV, b), CONDUSEF</p></td>
</tr>
<tr class="even">
<td><p>Cláusula décima quinta</p></td>
<td><p>Disposición de depósitos sin cumplir las reglas de autorización y domiciliación</p></td>
<td><p>Art. 57 LIC</p></td>
</tr>
</tbody>
</table>

**4. ¿Qué puede hacer el cliente?**  
La CONDUSEF es la autoridad competente para atender la reclamación relacionada con estas cláusulas.  
El artículo 56 Bis de la Ley de Protección y Defensa al Usuario de Servicios Financieros establece que los contratos de adhesión no deben contener cláusulas abusivas.  
Cuando CONDUSEF determina que existe una cláusula abusiva, puede:

1.  Ordenar a la institución financiera suprimirla o modificarla.  

2.  Exigir que la institución acredite la modificación correspondiente.  

3.  Imponer sanciones cuando proceda.    
    La propia CONDUSEF contempla multas de entre 500 y 2,000 días de salario por incumplir la obligación de modificar contratos para eliminar cláusulas abusivas, conforme al artículo 94, fracción XV, inciso c), de dicha ley.  
      
    Condusef+1  
    Fuentes oficiales para consulta:

- <u>[Ley para la Transparencia y Ordenamiento de los Servicios Financieros (CONDUSEF)](https://www.condusef.gob.mx/documentos/marco_legal/LTOSF.pdf?utm_source=chatgpt.com)</u>.  

- <u>[Ley de Instituciones de Cr](https://www.diputados.gob.mx/LeyesBiblio/pdf/LIC.pdf?utm_source=chatgpt.com)[é](https://www.diputados.gob.mx/LeyesBiblio/pdf/LIC.pdf?utm_source=chatgpt.com)[dito (C](https://www.diputados.gob.mx/LeyesBiblio/pdf/LIC.pdf?utm_source=chatgpt.com)[á](https://www.diputados.gob.mx/LeyesBiblio/pdf/LIC.pdf?utm_source=chatgpt.com)[mara de Diputados)](https://www.diputados.gob.mx/LeyesBiblio/pdf/LIC.pdf?utm_source=chatgpt.com)</u>.  

- <u>[Disposiciones sobre cl](https://www.dof.gob.mx/nota_detalle.php%3Fcodigo%3D5368784%26fecha%3D19/11/2014%26print%3Dtrue?utm_source=chatgpt.com)[á](https://www.dof.gob.mx/nota_detalle.php%3Fcodigo%3D5368784%26fecha%3D19/11/2014%26print%3Dtrue?utm_source=chatgpt.com)[usulas abusivas (Diario Oficial de la Federaci](https://www.dof.gob.mx/nota_detalle.php%3Fcodigo%3D5368784%26fecha%3D19/11/2014%26print%3Dtrue?utm_source=chatgpt.com)[ó](https://www.dof.gob.mx/nota_detalle.php%3Fcodigo%3D5368784%26fecha%3D19/11/2014%26print%3Dtrue?utm_source=chatgpt.com)[n)](https://www.dof.gob.mx/nota_detalle.php%3Fcodigo%3D5368784%26fecha%3D19/11/2014%26print%3Dtrue?utm_source=chatgpt.com)</u>.  

- <u>[CONDUSEF: consulta y denuncia de cl](https://www.condusef.gob.mx/?p=clausulas-abusivas&utm_source=chatgpt.com)[á](https://www.condusef.gob.mx/?p=clausulas-abusivas&utm_source=chatgpt.com)[usulas abusivas](https://www.condusef.gob.mx/?p=clausulas-abusivas&utm_source=chatgpt.com)</u>.    
    
  **5. Dictamen final**  
  Las dos estipulaciones son jurídicamente cuestionables, pero por razones distintas:  
  Cláusula octava: contiene condiciones contrarias a obligaciones legales expresas. La falta de aviso previo puede provocar la nulidad de las nuevas comisiones y los incrementos de intereses deben sujetarse a las excepciones y plazos legales.  
  Cláusula décima quinta: constituye un supuesto expresamente tipificado como abusivo por CONDUSEF. La institución no puede utilizar una autorización irrevocable incluida en el contrato de tarjeta para disponer libremente de cuentas de nómina o ahorro mantenidas en otros bancos.  
  Un detalle importante: que un cliente firme un contrato de adhesión no convierte en legales las condiciones que contradicen normas de orden público. La aceptación contractual no subsana esas infracciones.  
  En conjunto, las dos cláusulas justificarían presentar una reclamación ante CONDUSEF y solicitar la revisión del contrato inscrito en el Registro de Contratos de Adhesión (RECA).  
~~~~~


### ChatGPT · C04 — Contrato individual de trabajo (LFT)

- **Evidencia de búsqueda web:** Sí. Enlaces con `utm_source=chatgpt.com` y etiquetas de fuente en el cuerpo de la respuesta.

~~~~~
  Las dos cláusulas presentan problemas jurídicos importantes. Conforme a la Ley Federal del Trabajo (LFT) vigente en México, ambas contienen disposiciones que pueden considerarse nulas o inaplicables, porque pretenden limitar derechos laborales irrenunciables y permitir mecanismos de cobro que la legislación restringe.  
  Mi conclusión preliminar:

<!-- -->

- Cláusula sexta: contiene una renuncia de derechos laborales inválida y una condición ilegal para reconocer el tiempo extraordinario.  

- Cláusula décima: contiene un mecanismo de garantía laboral jurídicamente cuestionable y autoriza descuentos salariales que exceden los límites legales.    
  **1. Cláusula sexta: renuncia al pago de horas extraordinarias**  
  Nulidad parcial o total de las disposiciones restrictivas  
  El texto establece:  
  El trabajador renuncia expresamente al reclamo o pago de cualquier hora extraordinaria futura, salvo que exhiba orden escrita firmada con 48 horas de anticipación por el Director General, aun cuando permanezca laborando por instrucciones verbales de su supervisor.  
  Problema jurídico 1: renuncia anticipada a derechos laborales.  
  El artículo 5, fracción XIII, de la LFT establece que son nulas las estipulaciones que impliquen renuncia por parte del trabajador de derechos o prerrogativas consignados en las normas de trabajo.  
  Además, el artículo 33 establece que es nula la renuncia que los trabajadores hagan de salarios devengados, indemnizaciones y demás prestaciones derivadas de los servicios prestados.  
  Por tanto, el trabajador no puede renunciar anticipadamente al pago de horas extraordinarias que efectivamente llegue a laborar.  
  Problema jurídico 2: exigir autorización escrita con 48 horas de anticipación.  
  Los artículos 66, 67 y 68 de la LFT regulan la jornada extraordinaria y su remuneración.  
  La ley no establece que el pago de horas extraordinarias dependa de una autorización escrita del Director General ni de que esta se expida con 48 horas de anticipación.  
  Si el trabajador permanece laborando por instrucciones de su supervisor, incluso verbales, la empresa no puede utilizar la ausencia de una autorización escrita como justificación automática para desconocer el tiempo efectivamente trabajado.  
  La existencia de instrucciones, registros de asistencia, comunicaciones y otros elementos probatorios puede ser relevante para acreditar esas horas.  
  Problema jurídico 3: responsabilidad del patrón por las instrucciones de sus supervisores.  
  El artículo 11 de la LFT considera representantes del patrón a directores, administradores, gerentes y demás personas que ejerzan funciones de dirección o administración. Sus actos obligan al patrón en sus relaciones laborales.  
  Por ello, una empresa no puede diseñar un procedimiento interno que permita a sus supervisores ordenar trabajo adicional y después desconocerlo porque no existe una autorización de la Dirección General.  
  Remuneración legal de las horas extraordinarias en 2026  
  Hay un detalle importante: la reforma laboral publicada el 1 de mayo de 2026 modificó el régimen de horas extraordinarias.

<!-- -->

- Artículo 66: establece el nuevo límite de hasta 12 horas extraordinarias semanales, distribuidas bajo las condiciones previstas en ese artículo, con pago de 100% adicional.  

- Artículo 68: regula el tiempo extraordinario que exceda ese límite y establece el pago de 200% adicional, con las restricciones legales correspondientes.    
  No debe confundirse el pago de horas extraordinarias con la posibilidad de exigirlas: la ley también establece límites a la jornada y protege al trabajador frente a su prolongación indebida.  
    
  IMSS+1  
    
  **2. Cláusula décima: pagaré en blanco y descuentos salariales**  
  Disposición altamente cuestionable y parcialmente nula  
  El texto establece:  
  Al firmar este contrato, el trabajador suscribe un pagaré en blanco como garantía y autoriza descontar hasta el 40% de su salario mínimo semanal en caso de errores operativos o faltantes de caja.  
  Aquí encontramos dos problemas distintos.  
  Problema jurídico 1: suscripción de un pagaré en blanco como garantía.  
  La LFT no contempla el pagaré en blanco como garantía ordinaria de las obligaciones de un trabajador frente al patrón.  
  Su utilización en estas condiciones resulta especialmente problemática porque:

<!-- -->

- Coloca al trabajador en una situación de desventaja frente al empleador.  

- Permite que el patrón tenga en su poder un título de crédito cuyo importe y condiciones de exigibilidad no están determinados al momento de la firma.  

- Puede utilizarse como mecanismo de presión para cobrar supuestas deudas o daños.  

- Pretende garantizar anticipadamente responsabilidades económicas que deberían determinarse conforme a las circunstancias de cada caso.    
  Hay que hacer una precisión jurídica: no sería correcto afirmar que todo pagaré firmado en blanco es automáticamente inexistente o nulo. Su eventual eficacia cambiaria debe analizarse conforme a la legislación mercantil y las circunstancias de su suscripción.  
  Sin embargo, el pagaré no puede utilizarse para eludir las protecciones salariales de la LFT ni convertir cualquier error operativo en una deuda automáticamente exigible.  
  Problema jurídico 2: descuentos del 40% del salario mínimo.  
  Esta disposición contradice directamente los artículos 97 y 110 de la LFT.  
  El artículo 110, fracción I, permite determinados descuentos por errores, pérdidas o averías, pero establece dos restricciones fundamentales:

1.  La cantidad exigible no puede superar el importe de un mes de salario.  

2.  El descuento debe ser convenido entre trabajador y patrón y no puede exceder del 30% del excedente del salario mínimo.    
    Por tanto, el porcentaje del 40% establecido en el contrato no es válido como autorización general.  
    Además, el artículo 97 protege expresamente el salario mínimo contra descuentos, salvo las excepciones específicas que contempla. Los errores operativos y faltantes de caja no están entre esas excepciones.  
      
    IMSS  
      
    Un ejemplo práctico:  
    Si un trabajador percibe exactamente el salario mínimo, el patrón no puede descontarle dinero de ese salario por un faltante de caja invocando esta cláusula.  
    Si percibe más del mínimo, tampoco puede aplicar automáticamente el 40%: debe respetar el límite del 30% del excedente, el tope de la deuda y los demás requisitos legales.  
    Problema jurídico 3: convertir cualquier error en responsabilidad económica automática.  
    La redacción también es deficiente porque no distingue entre:

||
||
||

<table>
<tbody>
<tr class="odd">
<td><ul>
<li><p>Un error involuntario.  </p></li>
<li><p>Una falla del sistema de cobro.  </p></li>
<li><p>Una deficiencia en los controles internos.  </p></li>
<li><p>Un faltante atribuible a varias personas.  </p></li>
<li><p>Una conducta efectivamente imputable al trabajador.  <br />
La mera existencia de una diferencia contable no demuestra por sí sola que el trabajador sea responsable de ella.<br />
El artículo 107 de la LFT, además, prohíbe imponer multas a los trabajadores, cualquiera que sea su causa o concepto.<br />
En consecuencia, una deducción automática utilizada como castigo por errores operativos podría constituir una multa prohibida, independientemente de cómo la denomine el contrato.<br />
<strong>3. Resumen jurídico de las irregularidades</strong></p></li>
</ul>
<p>Disposición</p></td>
<td><p>Fundamento legal</p></td>
<td><p>Evaluación</p></td>
</tr>
<tr class="even">
<td><p>Renuncia anticipada a horas extra</p></td>
<td><p>Art. 5, fr. XIII</p></td>
<td><p>Nula</p></td>
</tr>
<tr class="odd">
<td><p>Exigir autorización escrita previa</p></td>
<td><p>Arts. 66-68</p></td>
<td><p>Inoponible para desconocer horas efectivamente trabajadas</p></td>
</tr>
<tr class="even">
<td><p>Desconocer instrucciones verbales de supervisores</p></td>
<td><p>Art. 11</p></td>
<td><p>No libera automáticamente al patrón</p></td>
</tr>
<tr class="odd">
<td><p>Pagaré en blanco como garantía</p></td>
<td><p>Arts. 5 y 33; legislación mercantil aplicable</p></td>
<td><p>Jurídicamente cuestionable; requiere análisis particular</p></td>
</tr>
<tr class="even">
<td><p>Descuento automático del 40%</p></td>
<td><p>Arts. 97 y 110</p></td>
<td><p>Contrario a los límites legales</p></td>
</tr>
<tr class="odd">
<td><p>Cobro automático por errores operativos</p></td>
<td><p>Arts. 107 y 110</p></td>
<td><p>Ilegal si constituye multa o excede los supuestos autorizados</p></td>
</tr>
</tbody>
</table>

**4. ¿Qué puede hacer el trabajador?**  
Si el contrato ya fue firmado, hay tres cuestiones importantes:  
1. No pierde sus derechos. La firma del contrato no convierte en válidas las estipulaciones contrarias a la LFT. El artículo 5 establece expresamente que, ante esas cláusulas, rigen las disposiciones legales.  
2. Puede reclamar horas extraordinarias. Conviene conservar registros de asistencia, mensajes de supervisores, correos electrónicos, instrucciones y cualquier evidencia del tiempo efectivamente trabajado.  
3. Puede cuestionar los descuentos y el pagaré. Es recomendable no firmar documentos adicionales de reconocimiento de adeudo, pagarés o autorizaciones de descuento sin asesoría laboral y mercantil.  
Puede acudir al Centro de Conciliación Laboral correspondiente o solicitar orientación gratuita a PROFEDET.  
**5. Fuentes jurídicas oficiales**  
La legislación que sustenta este análisis puede consultarse directamente:

- <u>[Ley Federal del Trabajo ](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf?utm_source=chatgpt.com)[—](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf?utm_source=chatgpt.com)[ C](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf?utm_source=chatgpt.com)[á](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf?utm_source=chatgpt.com)[mara de Diputados](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf?utm_source=chatgpt.com)</u>.  

- <u>[Diario Oficial de la Federaci](https://www.dof.gob.mx/?utm_source=chatgpt.com)[ó](https://www.dof.gob.mx/?utm_source=chatgpt.com)[n](https://www.dof.gob.mx/?utm_source=chatgpt.com)</u>.  

- <u>[PROFEDET ](https://www.profedet.gob.mx/?utm_source=chatgpt.com)[—](https://www.profedet.gob.mx/?utm_source=chatgpt.com)[ Procuradur](https://www.profedet.gob.mx/?utm_source=chatgpt.com)[í](https://www.profedet.gob.mx/?utm_source=chatgpt.com)[a Federal de la Defensa del Trabajo](https://www.profedet.gob.mx/?utm_source=chatgpt.com)</u>.    
  La versión de la LFT consultada señala como última reforma la publicada el 14 de mayo de 2026.  
    
  IMSS  
    
    
  **6. Conclusión**  
  Ambas cláusulas requieren modificación  
  Mi dictamen es el siguiente:  
  - Cláusula sexta: debe eliminarse la renuncia anticipada al pago de horas extraordinarias y la condición de autorización escrita como requisito para reconocerlas. La empresa puede establecer controles administrativos para autorizarlas, pero no utilizarlos para desconocer trabajo efectivamente prestado.  
  - Cláusula décima: debe eliminarse la exigencia de un pagaré en blanco. También debe sustituirse la autorización de descuentos del 40% por una disposición que respete estrictamente los artículos 97 y 110 de la LFT.  
  Una precisión importante: la nulidad de estas estipulaciones no necesariamente invalida todo el contrato individual de trabajo. Conforme al artículo 5 de la LFT, las disposiciones legales sustituyen a las cláusulas nulas, mientras que el resto del contrato puede conservar su validez.  
  En términos prácticos, estamos ante un contrato que intenta trasladar al trabajador riesgos económicos y obligaciones que no pueden imponerse unilateralmente mediante una simple firma.  
~~~~~


### ChatGPT · C05 — Internet residencial (PROFECO/CRT)

- **Evidencia de búsqueda web:** Sí. Enlaces con `utm_source=chatgpt.com` y etiquetas de fuente en el cuerpo de la respuesta.

~~~~~
  **Análisis jurídico de las cláusulas quinta y vigésima**  
  Conclusión preliminar: ambas cláusulas presentan problemas jurídicos importantes y contienen disposiciones potencialmente abusivas e inoponibles al consumidor conforme al marco legal mexicano.  
  La cláusula quinta es especialmente cuestionable porque pretende cobrar el 100% de las mensualidades pendientes incluso cuando la cancelación se debe a incumplimientos del proveedor. La vigésima intenta eliminar derechos de protección al consumidor y limitar territorialmente el acceso a la justicia.  
  Hay que distinguir, además, entre una cláusula que es abusiva, una que contraviene una disposición legal y una cuya nulidad debe hacerse valer ante la autoridad competente. No necesariamente se invalida todo el contrato.  
  **1. CLÁUSULA QUINTA: plazo forzoso de 24 meses y penalización del 100%**  
  Potencialmente abusiva e ilegal en parte  
  La cláusula contiene tres problemas diferentes.  
  **A. Penalización equivalente al 100% de las mensualidades restantes**  
  Fundamento jurídico:

<!-- -->

- Artículo 85 de la Ley Federal de Protección al Consumidor (LFPC).  

- Numerales 3.2 y 5.2.22 de la NOM-184-SCFI-2018.  

- Artículo 185, fracción VI, de la Ley en Materia de Telecomunicaciones y Radiodifusión (LMTR), publicada el 16 de julio de 2025.    
  El numeral 3.2 de la NOM-184 establece que las penas convencionales deben ser:

<!-- -->

- Razonables.  

- Recíprocas.  

- Equitativas.  

- Proporcionales para ambas partes.    
  Además, no pueden superar el monto insoluto de la obligación principal.  
    
  Diario Oficial de la Federación+1  
    
  Por tanto, imponer automáticamente el 100% de todas las mensualidades pendientes resulta jurídicamente cuestionable.  
  Hay una distinción importante: el límite del monto insoluto no significa que el proveedor pueda cobrar automáticamente todas las mensualidades futuras. Debe justificar la obligación principal pendiente y la proporcionalidad de la penalización.  
  La PROFECO tiene competencia para valorar estas condiciones al revisar el modelo de contrato.  
  **B. Penalización incluso cuando el proveedor incumple**  
  Contravención normativa directa  
  Este es el defecto más grave de la cláusula.  
  El numeral 5.2.21.2 de la NOM-184-SCFI-2018 establece expresamente que, cuando el proveedor no presta el servicio en las condiciones convenidas, ofrecidas o contratadas, o incumple los parámetros de calidad aplicables, el consumidor tiene derecho a:

1.  Exigir que se cumpla lo pactado.  

2.  Terminar anticipadamente el contrato sin responsabilidad alguna.    
    Esto incluye el incumplimiento de la calidad contratada, como la velocidad mínima ofrecida.  
      
    Diario Oficial de la Federación  
      
    En consecuencia, el proveedor no puede cobrar una penalización por cancelar cuando la terminación deriva de su propio incumplimiento.  
    Además, el numeral 5.2.18 de la misma NOM establece el derecho a la compensación proporcional del servicio no prestado y a una bonificación de al menos el 20% del monto del periodo afectado, cuando la falta de prestación sea imputable al proveedor.  
      
    Diario Oficial de la Federación  
      
    **C. Penalización por ajustes tarifarios del proveedor**  
    Contravención normativa  
    Aquí existe otra protección específica.  
    El numeral 5.2.13.4 de la NOM-184-SCFI-2018 dispone que, durante el plazo forzoso, el proveedor no puede modificar el precio o tarifa contratados, salvo que disminuya el precio o incremente los servicios sin aumentar el costo.  
    Por otra parte, el numeral 5.2.10.1 establece que, ante cambios en las condiciones originalmente contratadas, el consumidor puede exigir el cumplimiento del contrato original o solicitar su rescisión sin penalización, dentro de los 30 días naturales siguientes al aviso correspondiente.  
      
    Diario Oficial de la Federación  
      
    La nueva LMTR, en su artículo 185, fracciones IX y X, también reconoce el derecho a recibir notificación de cambios con al menos 30 días de anticipación y a rescindir cuando el proveedor no respete las condiciones contratadas.  
      
    Diario Oficial de la Federación+1  
      
    Conclusión sobre la cláusula quinta:  
    El plazo forzoso de 24 meses no es ilegal por sí mismo. Puede pactarse si está debidamente justificado y cumple las disposiciones aplicables.  
    Lo que resulta contrario al marco normativo es utilizarlo para imponer una penalización indiscriminada del 100%, particularmente cuando el proveedor incumple el servicio o pretende modificar unilateralmente las condiciones económicas.  
      
    **2. CLÁUSULA VIGÉSIMA: renuncia a PROFECO y tribunales exclusivos de Monterrey**  
    Disposición parcialmente nula de pleno derecho  
    Esta cláusula contiene dos disposiciones que deben analizarse por separado.  
    **A. Renuncia a la competencia administrativa de PROFECO**  
    Es jurídicamente inválida.  
    El artículo 1 de la LFPC establece que sus disposiciones son de orden público e interés social, y que los derechos reconocidos por ella son irrenunciables.  
    Más específicamente, el artículo 186, fracción VI, de la LMTR establece que serán nulas de pleno derecho y se tendrán por no puestas las cláusulas que obliguen al usuario a renunciar a los derechos establecidos en esa ley o en la LFPC, o a ejercer acciones judiciales individuales o colectivas.  
      
    Orden Jurídico+1  
      
    Además, el artículo 185 de la LMTR reconoce expresamente las atribuciones de PROFECO para proteger, asesorar, defender y representar a los usuarios de servicios de telecomunicaciones.  
    Por tanto:

- El consumidor no puede renunciar anticipadamente a la protección de PROFECO.  

- El proveedor no puede impedir que se presenten quejas o reclamaciones administrativas.  

- La firma del contrato no elimina las facultades legales de la autoridad.  

- La cláusula no puede impedir la conciliación ni otros procedimientos administrativos que correspondan.    
  La renuncia a PROFECO debe considerarse nula de pleno derecho y tenerse por no puesta.  
  **B. Competencia exclusiva de los tribunales de Monterrey**  
  Aquí hay un matiz jurídico.  
  El artículo 186, fracción VI, de la LMTR prohíbe expresamente someter al consumidor a tribunales extranjeros, pero no establece una prohibición literal de pactar competencia territorial a favor de tribunales de otra ciudad mexicana.  
  Sin embargo, eso no significa que cualquier cláusula de elección territorial sea válida.  
  En este caso, la imposición exclusiva de Monterrey, independientemente del domicilio del consumidor y del lugar de prestación del servicio, puede constituir una condición inequitativa y abusiva en un contrato de adhesión.  
  Debe analizarse a la luz de:

||
||
||

<table>
<tbody>
<tr class="odd">
<td><ul>
<li><p>Artículo 85 de la LFPC, que prohíbe obligaciones inequitativas, abusivas y prestaciones desproporcionadas.  </p></li>
<li><p>Artículo 1, fracciones V y VI, de la LFPC, que reconoce el acceso a órganos administrativos y las facilidades para defender los derechos del consumidor.  </p></li>
<li><p>Artículo 186, fracción VI, de la LMTR, que impide renunciar a los derechos y acciones judiciales reconocidos por la legislación.  <br />
La disposición tampoco puede desplazar las reglas legales de competencia judicial que resulten aplicables.<br />
Conclusión sobre la cláusula vigésima:<br />
La renuncia a PROFECO es nula de pleno derecho. La elección exclusiva de tribunales de Monterrey es cuestionable y potencialmente abusiva, pero no debe declararse automáticamente nula únicamente por tratarse de una ciudad distinta: su invalidez dependerá de las reglas de competencia aplicables y de si efectivamente restringe injustificadamente el acceso del consumidor a la justicia.<br />
<strong>3. Resumen de la evaluación jurídica</strong></p></li>
</ul>
<p>Disposición</p></td>
<td><p>Evaluación</p></td>
<td><p>Fundamento principal</p></td>
</tr>
<tr class="even">
<td><p>Plazo forzoso de 24 meses</p></td>
<td><p>Puede ser válido</p></td>
<td><p>NOM-184, 5.2.13</p></td>
</tr>
<tr class="odd">
<td><p>Penalización del 100% de mensualidades restantes</p></td>
<td><p>Potencialmente abusiva y desproporcionada</p></td>
<td><p>LFPC, art. 85; NOM-184, 3.2</p></td>
</tr>
<tr class="even">
<td><p>Penalización por fallas imputables al proveedor</p></td>
<td><p>Contraria a la normativa</p></td>
<td><p>NOM-184, 5.2.21.2</p></td>
</tr>
<tr class="odd">
<td><p>Penalización por modificación tarifaria durante el plazo forzoso</p></td>
<td><p>Contraria a la normativa</p></td>
<td><p>NOM-184, 5.2.13.4</p></td>
</tr>
<tr class="even">
<td><p>Renuncia a PROFECO</p></td>
<td><p>Nula de pleno derecho</p></td>
<td><p>LMTR, art. 186, fracción VI</p></td>
</tr>
<tr class="odd">
<td><p>Tribunales exclusivos de Monterrey</p></td>
<td><p>Potencialmente abusiva; requiere análisis de competencia</p></td>
<td><p>LFPC, art. 85; LMTR, art. 186</p></td>
</tr>
</tbody>
</table>

**4. ¿Qué podría hacer el consumidor?**  
Si el contrato ya fue firmado, recomiendo:

1.  Solicitar al proveedor una copia del contrato de adhesión y verificar su número de registro ante PROFECO.  

2.  Conservar evidencia de las velocidades contratadas y las efectivamente recibidas, así como los reportes de fallas.  

3.  Si existen incumplimientos, solicitar la terminación anticipada sin penalización, invocando el numeral 5.2.21.2 de la NOM-184.  

4.  Si el proveedor pretende cobrar la penalización o rechaza la cancelación, presentar una reclamación ante PROFECO.  

5.  Solicitar que se revise el modelo de contrato por contener disposiciones contrarias a la legislación y a la NOM aplicable.    
    **5. Fuentes jurídicas oficiales**  
    Estas son las disposiciones que sustentan el análisis:

- <u>[Ley en Materia de Telecomunicaciones y Radiodifusi](https://dof.gob.mx/nota_detalle.php%3Fcodigo%3D5763167%26fecha%3D16/07/2025?utm_source=chatgpt.com)[ó](https://dof.gob.mx/nota_detalle.php%3Fcodigo%3D5763167%26fecha%3D16/07/2025?utm_source=chatgpt.com)[n ](https://dof.gob.mx/nota_detalle.php%3Fcodigo%3D5763167%26fecha%3D16/07/2025?utm_source=chatgpt.com)[—](https://dof.gob.mx/nota_detalle.php%3Fcodigo%3D5763167%26fecha%3D16/07/2025?utm_source=chatgpt.com)[ DOF, 16 de julio de 2025](https://dof.gob.mx/nota_detalle.php%3Fcodigo%3D5763167%26fecha%3D16/07/2025?utm_source=chatgpt.com)</u>. Especialmente artículos 185, 186 y 187.  

- <u>[NOM-184-SCFI-2018 ](https://sidof.segob.gob.mx/notas/docFuente/5552286?utm_source=chatgpt.com)[—](https://sidof.segob.gob.mx/notas/docFuente/5552286?utm_source=chatgpt.com)[ Diario Oficial de la Federaci](https://sidof.segob.gob.mx/notas/docFuente/5552286?utm_source=chatgpt.com)[ó](https://sidof.segob.gob.mx/notas/docFuente/5552286?utm_source=chatgpt.com)[n](https://sidof.segob.gob.mx/notas/docFuente/5552286?utm_source=chatgpt.com)</u>. Especialmente numerales 3.2, 5.2.13, 5.2.18, 5.2.21 y 5.2.22.  

- <u>[Ley Federal de Protecci](https://www.ordenjuridico.gob.mx/Documentos/Federal/html/wo12974.html?utm_source=chatgpt.com)[ó](https://www.ordenjuridico.gob.mx/Documentos/Federal/html/wo12974.html?utm_source=chatgpt.com)[n al Consumidor](https://www.ordenjuridico.gob.mx/Documentos/Federal/html/wo12974.html?utm_source=chatgpt.com)</u>. Especialmente artículos 1, 85 y 90.  

- <u>[PROFECO: NOM-184, protecci](https://www.gob.mx/profeco/articulos/nom-184-tu-proteccion-ante-clausulas-abusivas-en-servicios-de-telecomunicaciones?utm_source=chatgpt.com)[ó](https://www.gob.mx/profeco/articulos/nom-184-tu-proteccion-ante-clausulas-abusivas-en-servicios-de-telecomunicaciones?utm_source=chatgpt.com)[n ante cl](https://www.gob.mx/profeco/articulos/nom-184-tu-proteccion-ante-clausulas-abusivas-en-servicios-de-telecomunicaciones?utm_source=chatgpt.com)[á](https://www.gob.mx/profeco/articulos/nom-184-tu-proteccion-ante-clausulas-abusivas-en-servicios-de-telecomunicaciones?utm_source=chatgpt.com)[usulas abusivas](https://www.gob.mx/profeco/articulos/nom-184-tu-proteccion-ante-clausulas-abusivas-en-servicios-de-telecomunicaciones?utm_source=chatgpt.com)</u>.    
    
  Dictamen final: Las dos cláusulas contienen restricciones incompatibles con derechos reconocidos por la legislación mexicana. La quinta debe modificarse para excluir cualquier penalización cuando el incumplimiento sea imputable al proveedor y establecer penas razonables, recíprocas y proporcionales. La vigésima debe eliminar expresamente la renuncia a PROFECO y revisar la imposición territorial de Monterrey.  
  Una precisión importante: el artículo 186 de la LMTR establece expresamente la nulidad de pleno derecho para determinadas cláusulas. No todas las irregularidades de la cláusula quinta producen automáticamente esa misma consecuencia; su validez y exigibilidad deben examinarse conforme a la disposición concreta infringida.  
  En definitiva, que el consumidor haya firmado el contrato no convierte estas condiciones en legales ni implica que haya renunciado a sus derechos.  
~~~~~


## Claude


### Claude · C01 — Arrendamiento habitacional CDMX

- **Evidencia de búsqueda web:** Sí. Abre con "Voy a verificar…" y cierra con lista de fuentes con enlaces.

~~~~~
  Voy a verificar el texto vigente de la ley antes de contestar, porque el régimen de arrendamiento de la CDMX se ha reformado varias veces.  
  Tus dos cláusulas tienen problemas serios. No las declararía nulas en bloque: la nulidad afecta partes concretas de cada una. Soy una IA, no abogado; para un caso real conviene validarlo con un abogado o con la PROFECO o la PAOT.  
  **Cláusula cuarta (renta e intereses)**  
  1. Incremento fijo de 15% anual: ilegal en lo que excede el tope. Desde la reforma del 28 de agosto de 2024, el art. 2448-D del Código Civil de la CDMX dispone que, en contratos de casa habitación, el incremento anual de la renta nunca será mayor a la inflación del año anterior. El 25 de febrero de 2026 la SCJN, al resolver el Amparo en Revisión 546/2025, declaró constitucional esa reforma. Para los aumentos de 2026, el tope es la inflación de 2025: 3.69%. Tu cláusula pacta 15% fijo, unas cuatro veces ese techo. Además, las reglas de arrendamiento de vivienda son de orden público e irrenunciables, así que el pacto en contrario se tiene por no puesto.

<!-- -->

- **Efecto práctico:** la cláusula no tumba el contrato. La vía principal es pedir a un juez que deje sin efectos la cláusula que fijó el porcentaje indebido y ajuste el aumento a lo que marca el Código Civil.

- **Ojo:** el tope aplica al aumento anual, no a la renta inicial de \$14,000, que las partes pactan libremente.

- **Ojo 2:** circulan notas que dicen que el límite es "10%". Es información errónea o desactualizada. El texto vigente habla de inflación del año anterior.  
  **2. Interés moratorio de 10% mensual capitalizable: abusivo y reducible.**

<!-- -->

- Equivale a 120% anual nominal y, capitalizado, a cerca de 214% efectivo anual. El interés legal es 9% anual.

- Entra en la figura de usura. El art. 2395 del Código Civil permite al juez, a petición del deudor, reducir el interés convencional desproporcionado hasta el tipo legal. Además, la SCJN ha sostenido que los jueces pueden analizar la usura en intereses pactados. No lo verifiqué en esta búsqueda, así que confírmalo.

- La capitalización agrava el problema. Lo previsible es que un juez lo reduzca de forma drástica, no que lo convalide.  
  **3. Gracia de 5 días:** no es ilegal por sí misma. El problema es la tasa, no el plazo.  
  **Cláusula décima segunda (ingreso, retiro de pertenencias, terminación y tanto)**  
  1. Ingresar con llave propia y retirar pertenencias sin orden judicial: nula e ilegal.

||
||
||

<table>
<tbody>
<tr class="odd">
<td><ul>
<li><p>En la CDMX está prohibido retirar a un inquilino por la fuerza, sin orden judicial o sin cumplir el procedimiento legal. La ley prohíbe la desocupación forzosa por medios extrajudiciales.</p></li>
<li><p>La "autorización" del inquilino no la valida. Es una renuncia a un derecho irrenunciable, y nadie puede hacerse justicia por propia mano (art. 17 constitucional).</p></li>
<li><p>Si el arrendador la ejecuta, puede enfrentar responsabilidad civil y penal (por ejemplo, allanamiento de morada o despojo). La tipificación exacta conviene confirmarla con un abogado.<br />
<strong>2. Terminación inmediata sin juicio a los 10 días de atraso: nula.</strong> La rescisión por falta de pago exige procedimiento judicial, ya sea juicio especial de desahucio o juicio de rescisión. Además, el inquilino tiene derecho a purgar la mora, y este pacto lo eliminaría de facto.<br />
<strong>3. Renuncia al derecho del tanto: nula.</strong> El derecho de preferencia del arrendatario de vivienda en caso de venta está en los arts. 2447 y 2448-J, y se considera irrenunciable. La renuncia anticipada, incluida en el contrato desde la firma, se tiene por no puesta. Ojo con el matiz: el derecho tiene requisitos, como estar al corriente en las rentas. Se puede perder por incumplir esos requisitos, pero no por una renuncia anticipada.<br />
<strong>Resumen</strong></p></li>
</ul>
<p>Cláusula</p></td>
<td><p>Veredicto</p></td>
<td><p>Consecuencia</p></td>
</tr>
<tr class="even">
<td><p>4ª, aumento 15%</p></td>
<td><p>Ilegal en lo que exceda la inflación</p></td>
<td><p>Se ajusta al tope; el resto del contrato sigue</p></td>
</tr>
<tr class="odd">
<td><p>4ª, 10% mensual capitalizable</p></td>
<td><p>Usurario/abusivo</p></td>
<td><p>Reducible por el juez hasta el tipo legal</p></td>
</tr>
<tr class="even">
<td><p>12ª, ingreso y retiro de pertenencias</p></td>
<td><p>Nula e ilegal</p></td>
<td><p>No produce efectos; puede generar responsabilidad</p></td>
</tr>
<tr class="odd">
<td><p>12ª, terminación sin juicio</p></td>
<td><p>Nula</p></td>
<td><p>Solo procede vía judicial</p></td>
</tr>
<tr class="even">
<td><p>12ª, renuncia al tanto</p></td>
<td><p>Nula</p></td>
<td><p>El derecho subsiste</p></td>
</tr>
</tbody>
</table>

**Qué haría si fuera el inquilino:** no firmaría esas cláusulas. Si ya las firmó, no pagaría de más por inercia. Documentaría los pagos con recibos, porque la falta de comprobantes por más de tres meses genera una presunción de pago (art. 2448-E). Y exigiría por escrito el ajuste al tope legal.  
**Qué haría si fuera el arrendador:** reescribiría el contrato con aumento "conforme a la inflación del año anterior, sin exceder el límite del art. 2448-D", un interés moratorio razonable y simple, y sin pactos de autotutela. Ese borrador le sirve más en un juicio real.  
Si me dices desde qué lado lo ves, te preparo una redacción corregida de ambas cláusulas.  
**Fuentes:**

||
||
||

<table>
<tbody>
<tr class="odd">
<td><ul>
<li><p><u><a href="https://www.garrigues.com/es_ES/noticia/suprema-corte-valida-limite-incremento-rentas-ciudad-mexico">Garrigues: SCJN valida el l</a><a href="https://www.garrigues.com/es_ES/noticia/suprema-corte-valida-limite-incremento-rentas-ciudad-mexico">í</a><a href="https://www.garrigues.com/es_ES/noticia/suprema-corte-valida-limite-incremento-rentas-ciudad-mexico">mite al incremento de rentas</a></u></p></li>
<li><p><u><a href="https://www.gnattorneys.com.mx/post/tope-rentas-cdmx-scjn-ley-rentas-justas">GN Attorneys: Tope a las rentas en la CDMX</a></u></p></li>
<li><p><u><a href="https://calculadorainpc.com/aumento-renta-anual">Calculadora INPC: tope 3.69% en 2026</a></u></p></li>
<li><p><u><a href="https://expansion.mx/finanzas-personales/2026/02/23/cambio-legal-que-impide-que-casero-te-suba-la-renta">Expansi</a><a href="https://expansion.mx/finanzas-personales/2026/02/23/cambio-legal-que-impide-que-casero-te-suba-la-renta">ó</a><a href="https://expansion.mx/finanzas-personales/2026/02/23/cambio-legal-que-impide-que-casero-te-suba-la-renta">n: cambio legal que impide aumentos de renta</a></u></p></li>
<li><p><u><a href="https://abogadosencdmx.com/blog/contrato-arrendamiento-cdmx">Abogados en CDMX: contrato de arrendamiento</a></u></p></li>
<li><p><u><a href="https://abogadosencdmx.com/blog/arrendamiento-conflictos-cdmx">Abogados en CDMX: conflictos de arrendamiento</a></u></p></li>
<li><p><u><a href="https://www.cronista.com/mexico/actualidad-mx/suprema-corte-da-reves-para-los-desalojos-y-se-anuncia-a-favor-del-derecho-a-la-vivienda-para-todos-estos-ciudadanos">El Cronista: desalojo requiere orden judicial</a></u><br />
<br />
<br />
~~~~~


### Claude · C02 — Contrato de adhesión de gimnasio (PROFECO)

- **Evidencia de búsqueda web:** Sí. Abre con "Voy a verificar…" y cierra con lista de fuentes con enlaces.

~~~~~
<br />
Voy a verificar el texto vigente de la Ley Federal de Protección al Consumidor y la normativa específica de gimnasios antes de dictaminar.<br />
<strong>Análisis de las cláusulas Séptima y Novena</strong><br />
No soy abogado y esto no es asesoría legal. Es un análisis del texto frente a la LFPC y el Código Civil Federal. Los números de artículo de la LFPC y del Código Civil no los pude verificar en el texto oficial, así que confírmalos antes de citarlos formalmente.<br />
<strong>Conclusión:</strong> casi todo lo que pegaste es impugnable. La parte más débil es la pena del 50% con la ventana de cancelación de 5 días. La Cláusula Novena es la más probable de declararse nula.<br />
<strong>Cláusula Séptima</strong></p></li>
</ul>
<p>Elemento</p></td>
<td><p>Veredicto</p></td>
<td><p>Fundamento</p></td>
</tr>
<tr class="even">
<td><p>Plazo forzoso de 12 meses</p></td>
<td><p><strong>Lícito, pero vigilable</strong></p></td>
<td><p>La LFPC no prohíbe el plazo forzoso en gimnasios. Debe estar claro, y el contrato debe estar registrado en Profeco.</p></td>
</tr>
<tr class="odd">
<td><p>Renovación automática anual con cargo domiciliado</p></td>
<td><p><strong>Muy cuestionable</strong></p></td>
<td><p>Un contrato de adhesión no puede imponer prestaciones desproporcionadas ni obligaciones inequitativas (arts. 85 y 87 LFPC). Tras la reforma al art. 76 Bis (DOF 12-dic-2025), el proveedor debe avisar la renovación con al menos 5 días naturales de anticipación y permitir cancelar sin penalización.</p></td>
</tr>
<tr class="even">
<td><p>Cancelar solo presencialmente, entre el día 1 y el 5 del mes previo</p></td>
<td><p><strong>Abusiva</strong></p></td>
<td><p>Es una ventana de 5 días al año, solo presencial. Hace casi imposible ejercer el derecho de cancelar, y la ley busca lo contrario: cancelación accesible.</p></td>
</tr>
<tr class="odd">
<td><p>Pena convencional del 50% de <em>todas</em> las mensualidades restantes</p></td>
<td><p><strong>Nula o reducible</strong></p></td>
<td><p>Rompe la equidad del art. 85 LFPC. Además, el Código Civil Federal dice que la pena no puede exceder la obligación principal y debe reducirse proporcionalmente si hay cumplimiento parcial (arts. 1843-1844). Pagar la mitad de un servicio que no recibes es desproporcionado.</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

**Matiz sobre la renovación automática:** las fuentes que encontré aplican el aviso de 5 días al art. 76 Bis, que regula transacciones por medios electrónicos. Si el contrato se firmó en sucursal con papel, esa obligación podría no aplicar de forma directa. La inequidad del art. 85 y la desproporción siguen aplicando de todos modos.  
**Cláusula Novena**

|                                                                       |                          |                                                                                                                                                                                                                                                                                                                                                |
|-----------------------------------------------------------------------|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Elemento                                                              | Veredicto                | Fundamento                                                                                                                                                                                                                                                                                                                                     |
| "No asume responsabilidad *alguna*" por robo o extravío en casilleros | **Nula**                 | Una exoneración total y genérica va contra el art. 90 LFPC, que invalida cláusulas que liberan al proveedor de responsabilidad. También va contra la irrenunciabilidad de los derechos del consumidor (art. 1 LFPC) y contra el art. 2106 del Código Civil Federal, que declara nula la renuncia anticipada a exigir responsabilidad por dolo. |
| Sin responsabilidad por lesiones por fallas mecánicas                 | **Nula, y la más grave** | Mantener los aparatos en buen estado es obligación directa del gimnasio. Es el servicio que vende. Excluir esa responsabilidad es más claramente abusivo que lo del casillero. También podría aplicar la responsabilidad objetiva por mecanismos peligrosos (art. 1913 CCF). Eso último es interpretación mía, no está confirmado.             |

**Matiz sobre el casillero:** una limitación razonable, por ejemplo un tope por objeto o la exclusión de objetos de valor no declarados, tiene más chance de sobrevivir. La exclusión total es la que cae.  
**Puntos que no puedo ver en el fragmento**

- Registro ante Profeco. Si el contrato no está registrado, o difiere del registrado, no produce efectos en perjuicio del consumidor. Se consulta en el Registro Público de Contratos de Adhesión.

- **Cómo se contrató.** Presencial, electrónico o en pre-venta cambia qué artículos aplican, sobre todo el 76 Bis.

- **Seguro de responsabilidad civil.** Profeco recomienda verificar si el gimnasio lo tiene.

- **Cláusulas hermanas.** El fragmento omite modificación unilateral de precios o servicios, cobros de inscripción y causas de rescisión. Suelen ser donde más abusan.  
  **Qué haría con esto**

1.  Verificar el registro del contrato en el RPCA.

2.  Si hay cargo ya aplicado, o el gimnasio se niega a cancelar, presentar queja ante Profeco, que ofrece conciliación gratuita.

3.  Guardar evidencia de cualquier intento de cancelación (folio, correo, captura).  
    Si me pasas el contrato completo, puedo revisarlo cláusula por cláusula. Y si lo preparas para un artículo de GlitchMentalMX, puedo convertirlo en pieza corta con el tono de la casa.  
    **Fuentes:**

- <u>[GT Law: Reformas a la LFPC, cancelaci](https://www.gtlaw.com/en/insights/2025/12/reformas-a-la-ley-federal-de-proteccion-al-consumidor)[ó](https://www.gtlaw.com/en/insights/2025/12/reformas-a-la-ley-federal-de-proteccion-al-consumidor)[n y suscripciones](https://www.gtlaw.com/en/insights/2025/12/reformas-a-la-ley-federal-de-proteccion-al-consumidor)</u>

- <u>[Profeco: aviso de 5 d](https://www.elimparcial.com/dinero/2026/05/05/profeco-confirma-que-proveedores-deben-avisar-cobros-automaticos-con-5-dias-de-anticipacion-y-permitir-cancelacion-sin-penalizacion-o-enfrentar-devoluciones-y-sanciones/)[í](https://www.elimparcial.com/dinero/2026/05/05/profeco-confirma-que-proveedores-deben-avisar-cobros-automaticos-con-5-dias-de-anticipacion-y-permitir-cancelacion-sin-penalizacion-o-enfrentar-devoluciones-y-sanciones/)[as en cobros autom](https://www.elimparcial.com/dinero/2026/05/05/profeco-confirma-que-proveedores-deben-avisar-cobros-automaticos-con-5-dias-de-anticipacion-y-permitir-cancelacion-sin-penalizacion-o-enfrentar-devoluciones-y-sanciones/)[á](https://www.elimparcial.com/dinero/2026/05/05/profeco-confirma-que-proveedores-deben-avisar-cobros-automaticos-con-5-dias-de-anticipacion-y-permitir-cancelacion-sin-penalizacion-o-enfrentar-devoluciones-y-sanciones/)[ticos (El Imparcial, mayo 2026)](https://www.elimparcial.com/dinero/2026/05/05/profeco-confirma-que-proveedores-deben-avisar-cobros-automaticos-con-5-dias-de-anticipacion-y-permitir-cancelacion-sin-penalizacion-o-enfrentar-devoluciones-y-sanciones/)</u>

- <u>[Cancelar gimnasio sin penalizaci](https://www.noticiasgobierno.com/cancelar-tu-suscripcion-o-gimnasio-sin-penalizacion-lo-que-la-ley-de-profeco-te-permite/)[ó](https://www.noticiasgobierno.com/cancelar-tu-suscripcion-o-gimnasio-sin-penalizacion-lo-que-la-ley-de-profeco-te-permite/)[n seg](https://www.noticiasgobierno.com/cancelar-tu-suscripcion-o-gimnasio-sin-penalizacion-lo-que-la-ley-de-profeco-te-permite/)[ú](https://www.noticiasgobierno.com/cancelar-tu-suscripcion-o-gimnasio-sin-penalizacion-lo-que-la-ley-de-profeco-te-permite/)[n LFPC (Noticias Gobierno)](https://www.noticiasgobierno.com/cancelar-tu-suscripcion-o-gimnasio-sin-penalizacion-lo-que-la-ley-de-profeco-te-permite/)</u>

- <u>[Profeco: cl](https://www.elimparcial.com/dinero/2025/08/16/de-esta-forma-puedes-identificar-un-contrato-abusivo-segun-profeco/)[á](https://www.elimparcial.com/dinero/2025/08/16/de-esta-forma-puedes-identificar-un-contrato-abusivo-segun-profeco/)[usulas abusivas, art. 90 (El Imparcial, 2025)](https://www.elimparcial.com/dinero/2025/08/16/de-esta-forma-puedes-identificar-un-contrato-abusivo-segun-profeco/)</u>  
~~~~~


### Claude · C03 — Tarjeta de crédito (CONDUSEF)

- **Evidencia de búsqueda web:** Sí. Abre con "Voy a verificar…" y cierra con lista de fuentes con enlaces.

~~~~~
  Voy a verificar los artículos vigentes antes de dictaminar.  
  **Veredicto:** ambas cláusulas son problemáticas. La Octava es ilegal en lo que quita (aviso y derecho a cancelar). La Décima Quinta es la más grave y, en mi lectura, nula en casi todo su contenido. Esto es información general, no asesoría legal. Para una reclamación formal conviene que un abogado revise el contrato completo.  
  **Cláusula Octava: modificación unilateral de tasas y comisiones**  
  Tiene dos partes distintas:

<!-- -->

- **Modificar tasas y crear comisiones unilateralmente: es lícito en principio.** Es práctica común en contratos de tarjeta, pero con condiciones.

- **"Sin aviso previo" y "sin derecho a cancelar": es ilegal.** La normativa de Banxico y la LTOSF exigen que el cambio se avise con anticipación. Los propios bancos lo aplican así en sus contratos: aviso con al menos 30 días naturales de anticipación, y derecho del cliente a terminar el contrato dentro de ese plazo, sin penalización y bajo las condiciones pactadas originalmente. Los avisos de cambio de contrato de <u>[BBVA](https://bbva.mx/content/dam/public-web/mexico/documents/personas/tarjetas/Aviso-cambio-de-contrato-23-agosto.pdf)</u> y <u>[Banorte](https://www.banorte.com/cms/banorte/cuentasytarjetas/TDC-Seleccion-Nacional-Mexicana/Aviso-de-cambios-en-el-portal_29jul22.pdf)</u> lo muestran.

- **"Publicación en el portal web" no basta como notificación.** Los bancos notifican por estado de cuenta o banca electrónica, que son medios dirigidos al cliente. Publicar en un portal esperando que el cliente lo encuentre no cumple con la finalidad de dar a conocer el cambio.

- **Las comisiones nuevas "en cualquier momento" chocan con las reglas de Banxico.** La Circular 22/2010 prohíbe ciertas comisiones y pone límites a otras.  
  **Matiz importante:** el art. 56 Bis de la LPDUSF excluye tasas y comisiones del catálogo de cláusulas abusivas que define CONDUSEF. Por eso esta cláusula no se ataca como "abusiva" sino por **incumplimiento de las reglas de transparencia y de Banxico**. El resultado práctico es el mismo: es inválida en esa parte.  
  **Cláusula Décima Quinta: mandato para cargar a cuentas en otros bancos**  
  Es la más grave, por cuatro razones:

1.  **Es una forma de hacerse justicia por propia mano.** Cobrar el saldo total vencido sin orden judicial contradice el art. 17 constitucional. El banco tiene vías para cobrar: juicio ejecutivo mercantil con estado de cuenta certificado, por ejemplo.

2.  **Es técnicamente inejecutable sin el consentimiento del titular ante el otro banco.** Los cargos a una cuenta los autoriza el titular ante la institución que lleva esa cuenta. Los formatos de domiciliación incluyen que el titular puede <u>[cancelarla en cualquier momento y sin costo](https://www.invextarjetas.com.mx/invex/Documentos/DomiciliacionYCargosRecurrentes/FormatoParaSolicitarLaDomiciliacion.pdf)</u>. Un "mandato irrevocable" metido en un contrato de adhesión choca con ese derecho.

3.  **Toca el salario.** La Constitución (art. 123) y la LFT protegen el salario, y este es inembargable. El <u>[debate sobre la "cobranza delegada"](https://www.jornada.com.mx/2022/03/19/edito)</u> muestra que ni los créditos de nómina logran cobrar directo del salario sin controversia. La SCJN también ha considerado <u>[inconstitucional cobrar deudas bancarias a cuentas de pensiones](https://www.taxtodaymexico.com/scjn-inconstitucional-cobro-de-deudas-bancarias-a-cuentas-de-pensiones/)</u>. Una cláusula que apunta a "cualquier cuenta de nómina" va en contra de ese criterio.

4.  **Es abusiva en el sentido de CONDUSEF.** El art. 56 Bis de la LPDUSF prohíbe las cláusulas abusivas en contratos de adhesión, y CONDUSEF puede ordenar su supresión. Esta cláusula reúne varios rasgos que esas disposiciones señalan: renuncia a garantías procesales, autorización de cobro sin consentimiento específico y desproporción. Verifica el numeral exacto contra las <u>[Disposiciones en materia de cl](https://sidof.segob.gob.mx/notas/docFuente/5368784)[á](https://sidof.segob.gob.mx/notas/docFuente/5368784)[usulas abusivas](https://sidof.segob.gob.mx/notas/docFuente/5368784)</u>.  
    Aunque el CCF permite mandatos irrevocables en ciertos casos, no puede usarse para eludir normas de orden público como las que protegen el salario o exigen autorización específica.  
    **Qué haría el cliente**

- Queja ante CONDUSEF, que puede ordenar suprimir cláusulas abusivas y revisa los contratos registrados en el RECA.

- **Si el banco ya ejecutó un cargo así**, conviene desconocerlo ante su propio banco y documentarlo.

- **Un abogado puede evaluar un amparo** si se afectó una cuenta de nómina.  
  **Lo que no pude verificar**

<!-- -->

- Los números exactos de artículo de la LTOSF y de la Circular 34/2010 (tarjetas de crédito) que fundan el aviso de 30 días. La práctica está confirmada en contratos reales, pero cita el numeral desde el texto compilado en banxico.org.mx.

- Si la entidad es banco, SOFOM u otra figura. Cambia qué autoridad y qué circular aplican.  
  Si me pasas el contrato completo, reviso el resto de las cláusulas con el mismo criterio.  
~~~~~


### Claude · C04 — Contrato individual de trabajo (LFT)

- **Evidencia de búsqueda web:** Sí. Abre con "Voy a verificar…" y cierra con lista de fuentes con enlaces.

~~~~~
  Voy a verificar el texto vigente de la Ley Federal del Trabajo, porque hubo reformas recientes sobre jornada y horas extra.  
  **Resumen:** las dos cláusulas son nulas en lo esencial. No hace falta juicio para anularlas, porque la ley dice que no producen efecto legal. Esto es un análisis informativo, no asesoría legal de un abogado.  
  **Cláusula sexta: renuncia anticipada a horas extra**  
  Es nula.

<!-- -->

- El artículo 5 de la LFT declara sin efecto legal, aunque sea verbal o escrita, cualquier estipulación que implique renuncia a derechos o prerrogativas de las normas de trabajo (fracc. XIII). Los tribunales lo han leído junto con el art. 123, apartado A, fracc. XXVII, inciso h) de la Constitución y el art. 33 de la LFT. El pago del tiempo extra es un derecho irrenunciable, y más aún cuando se renuncia por adelantado a algo que todavía no ocurre.

- **El requisito de la orden escrita del Director General con 48 horas de anticipación es el mismo vicio con otra forma.** Si el trabajador sigue laborando por instrucción verbal del supervisor, el patrón sabe y consiente que trabaja. Ese tiempo es extraordinario y se paga, haya o no papel. Además, el tiempo extra por "circunstancias extraordinarias" casi nunca se puede avisar con 48 horas.

- **La carga de la prueba suele estar del lado del patrón.** Debe acreditar la duración de la jornada con controles de asistencia (arts. 784 y 804 LFT, que cito de memoria; confírmalos en el texto vigente). Además, la reforma de 2026 sumó obligaciones de registro de horas (art. 132, fracc. XXXIV) y una sanción específica (art. 994, fracc. IV Bis).

- **Ojo con la reforma vigente desde el 1 de mayo de 2026.** Reformó los arts. 59, 61, 66, 68, 69 y 71, y derogó el segundo párrafo del 67. Según un resumen, las horas extra dentro del tope anual (de 9 a 12 según el año) se pagan al doble, las que lo excedan hasta 4 semanales al triple, y más allá de eso están prohibidas. Ese resumen no es el texto oficial, así que verifica las cifras exactas contra el DOF antes de citarlas en un escrito.  
  **Cláusula décima: pagaré en blanco y descuento del 40%**  
  1. Pagaré en blanco como garantía: nulo en la práctica y muy riesgoso para el patrón.

<!-- -->

- Funciona como una renuncia encubierta y como un mecanismo para cobrar más de lo que la ley deja descontar. Choca con el art. 5, fracc. XIII, y con el art. 33 de la LFT.

- La nulidad de las renuncias aplica incluso si el propio trabajador firma el documento. Además, un pagaré firmado como condición para obtener el empleo es un caso clásico de vicio del consentimiento.

- La Ley General de Títulos y Operaciones de Crédito admite títulos incompletos (art. 14), pero el origen es laboral. Si el patrón lo cobrara por la vía mercantil, el trabajador podría oponer la excepción de que nace de una relación de trabajo y de una garantía prohibida (verifícalo con un abogado, porque aquí influye el criterio del juzgador).  
  **2. Descuento de hasta 40% por errores o faltantes de caja: ilegal por exceso.**

<!-- -->

- El art. 110 prohíbe los descuentos salvo los casos que enumera, y el descuento mensual no puede pasar del 30% del excedente del salario mínimo. Tampoco puede rebasar el importe de un mes de salario, y debe ser el que convengan trabajador y patrón.

- **El 40% ya rebasa el tope.** Y la cláusula lo calcula sobre el "salario mínimo semanal", que es justo la base protegida.

- **Si el trabajador gana el mínimo, el excedente es cero, así que no se le puede descontar nada por este concepto.** El art. 123, apartado A, fracc. VIII, y el art. 97 LFT protegen el salario mínimo contra descuentos fuera de los casos que enumeran (pensión alimenticia, vivienda, etc.). Estos dos artículos los cito de memoria; verifícalos.

- **Una autorización genérica firmada de antemano no basta.** La ley habla de deudas por errores o pérdidas que el trabajador y el patrón acuerdan, no de un permiso en blanco para descontar lo que el patrón decida.

- **La redacción es ambigua** ("40% de su salario mínimo semanal"). Por el principio de interpretación más favorable al trabajador (art. 18 LFT), se interpretaría en su favor.  
  **Qué hacer si es tu contrato**

1.  No firmes el pagaré. Si ya lo firmaste, consérvalo documentado y consulta a un abogado laboralista.

2.  Conserva evidencia del tiempo extra: mensajes del supervisor, bitácoras, chequeos de entrada y salida.

3.  Las acciones laborales prescriben por lo general en un año (art. 516), así que no las dejes pasar.

4.  Puedes acudir al Centro de Conciliación y, si no hay acuerdo, al Tribunal laboral. También puedes denunciar ante la Inspección del Trabajo.  
    Si me pasas el resto del contrato, reviso lo demás (periodo de prueba, rescisión, confidencialidad, no competencia).  
    **Fuentes:**

- <u>[IDC Online: descuentos al salario, art. 110](https://idconline.mx/laboral/2025/07/22/patron-puede-descontar-una-deuda-unilateralmente-al-trabajador)</u>

- <u>[LFT art. 5, texto vigente (UPZ)](https://upz.edu.mx/images/documentos/informacion_publica/normatividad/Federal/LEY%20FEDERAL%20DEL%20TRABAJO.pdf)</u>

- <u>[Tribunales colegiados: nulidad de renuncias (vLex)](https://vlex.com.mx/vid/tribunales-colegiados-jurisprudencia-27642412)</u>

- <u>[Revista Abogac](https://www.revistaabogacia.com/?p=25940)[í](https://www.revistaabogacia.com/?p=25940)[a: nulidad de renuncias, art. 33](https://www.revistaabogacia.com/?p=25940)</u>

- <u>[Wellhub: reforma de jornada y horas extra 2026](https://wellhub.com/es-mx/blog/desarrollo-organizacional/jornada-laboral-40-horas-mexico/)</u>

- <u>[P](https://www.perezllorca.com/wp-content/uploads/2026/04/Nota-Juridica-Reforma-Laboral-2026.pdf)[é](https://www.perezllorca.com/wp-content/uploads/2026/04/Nota-Juridica-Reforma-Laboral-2026.pdf)[rez-Llorca: nota jur](https://www.perezllorca.com/wp-content/uploads/2026/04/Nota-Juridica-Reforma-Laboral-2026.pdf)[í](https://www.perezllorca.com/wp-content/uploads/2026/04/Nota-Juridica-Reforma-Laboral-2026.pdf)[dica sobre la reforma laboral 2026](https://www.perezllorca.com/wp-content/uploads/2026/04/Nota-Juridica-Reforma-Laboral-2026.pdf)</u>  
~~~~~


### Claude · C05 — Internet residencial (PROFECO/CRT)

- **Evidencia de búsqueda web:** Sí. Abre con "Voy a verificar…" y cierra con lista de fuentes con enlaces.

~~~~~
  Voy a verificar el marco legal vigente, porque telecomunicaciones cambió en 2025.  
  **Resumen:** la Cláusula Quinta es, en su parte clave, nula o inaplicable. De la Vigésima, la renuncia a PROFECO es nula. La sumisión exclusiva a Monterrey es abusiva, pero su nulidad es más discutible. No soy abogado, y los textos legales los consulté en portales de consulta que advierten que su cotejo no está confirmado. Antes de actuar, verifica los artículos en la Cámara de Diputados.  
  **Marco vigente.** Desde el 16 de julio de 2025 rige la nueva Ley en Materia de Telecomunicaciones y Radiodifusión (LMTR), que abrogó la Ley Federal de Telecomunicaciones y Radiodifusión. Muchas cartas de derechos de proveedores siguen citando la ley vieja. También aplica la Ley Federal de Protección al Consumidor (LFPC).  
  **Cláusula Quinta (plazo forzoso y pena)**  
  1. El plazo de 24 meses no es ilegal por sí mismo. Un plazo forzoso es válido si el contrato lo establece y explica por qué se te obliga. Pregúntate qué recibiste a cambio, como equipo subsidiado o descuento. Si el servicio es solo internet sin equipo ni beneficio, el plazo es difícil de justificar y PROFECO lo puede objetar. Esto es inferencia mía, no una regla expresa.  
  **2. "Por cualquier motivo", incluidas fallas y ajustes tarifarios: nula en esa parte.**

<!-- -->

- Si el proveedor cambia las condiciones, el usuario puede exigir el cumplimiento forzoso o rescindir. Para cambios de tarifa o condiciones, el proveedor debe avisar con al menos 30 días de anticipación.

- El usuario también tiene derecho a recibir el servicio con los parámetros de calidad contratados y a una bonificación por fallas imputables al proveedor.

- La cláusula te cobra una penalización por irte cuando el incumplido es el proveedor. Contradice esos derechos y, en términos generales, que la renuncia a los derechos del consumidor se tiene por no puesta (LFPC art. 1, de memoria, sin verificar).

- Si además permite subir tarifas unilateralmente, choca con el art. 90 de la LFPC, que invalida las cláusulas que permiten al proveedor modificar unilateralmente el contenido del contrato.  
  **3. Pena del 100% de las mensualidades restantes: desproporcionada.**

<!-- -->

- La PROFECO verifica que las penas por cancelación anticipada sean razonables. Cobrar el 100% de lo que falta equivale a cobrar servicio que no se va a prestar.

- La carta de derechos mínimos PROFECO-IFT establece que la pena convencional por terminación anticipada no debe superar el monto insoluto de la obligación principal. El 100% de mensualidades no es "insoluto del equipo", es el contrato completo.

- La LMTR reconoce el derecho de rescindir o cambiar de plan de forma anticipada pagando, en su caso, solo el costo remanente del equipo.

- En derecho civil general, un juez puede reducir una pena que exceda la obligación principal (Código Civil Federal, art. 1843, de memoria, sin verificar). Si lo vas a invocar, confírmalo.  
  **Cláusula Vigésima (jurisdicción)**  
  1. Renuncia a la competencia de PROFECO: nula. El art. 90 de la LFPC invalida las cláusulas que obligan al consumidor a renunciar a la protección de esta ley. Además, los contratos de adhesión sujetos a registro deben incluir una cláusula que declare competente a la Procuraduría en la vía administrativa. La cláusula dice lo contrario. La LMTR también le da a PROFECO facultades para defender, conciliar y representar a los usuarios frente a los concesionarios.  
  **2. Sumisión exclusiva a Monterrey sin importar el domicilio: abusiva, pero con matiz.**

<!-- -->

- El art. 90 solo invalida expresamente la sumisión a tribunales extranjeros. El texto no contiene una regla sobre tribunales distintos al domicilio del consumidor.

- Aun así, obligar a un usuario residencial a litigar en otra ciudad por un servicio de internet es una carga desproporcionada, y PROFECO no registraría esa cláusula. Para un juicio, el proveedor podría invocar la sumisión expresa del Código de Comercio. Qué gana ahí es una cuestión de litigio que no verifiqué, así que no la afirmo.

- Conclusión: es muy atacable, pero no puedo decirte que sea nula de pleno derecho por texto expreso.  
  **Qué hacer**

1.  Revisa si el contrato está registrado en PROFECO. El contrato que firmas debe coincidir con el registrado, y puedes consultarlo en los portales de PROFECO y de la autoridad de telecomunicaciones. La carta de derechos señala que el contrato debe coincidir con el autorizado y registrado. Si tu versión tiene estas cláusulas y la registrada no, tienes un argumento fuerte.

2.  **Si ya lo firmaste y el servicio falla,** documenta las fallas con speed tests y folios de reporte, y presenta queja ante PROFECO. Es gratuita y busca conciliación.

3.  **Si el contrato es nuevo,** pide que eliminen las cláusulas antes de firmar, o no firmes.

4.  Para un monto grande o una demanda real, consulta a un abogado. La interpretación judicial de la sumisión territorial es lo que más conviene que revise un profesional.  
    **Fuentes:**

- <u>[LMTR, art. 185 (mLey)](https://mley.mx/LMTR/articulo/185/)</u>

- <u>[LFPC, art. 90 (mLey)](https://mley.mx/LFPC/articulo/90/)</u>

- <u>[LFPC, art. 86 (mLey)](https://mley.mx/LFPC/articulo/86/)</u>

- <u>[Nueva LMTR, claves (IDC)](https://idconline.mx/corporativo/2025/07/24/nueva-ley-de-telecomunicaciones-y-radiodifusion-claves)</u>

- <u>[Carta de derechos m](https://megacable.com.mx/files/carta_derechos_de_usuario.pdf)[í](https://megacable.com.mx/files/carta_derechos_de_usuario.pdf)[nimos (Megacable)](https://megacable.com.mx/files/carta_derechos_de_usuario.pdf)</u>

- <u>[Carta de derechos m](https://www.negociostotalplay.com.mx/pdf/carta-derechos.pdf)[í](https://www.negociostotalplay.com.mx/pdf/carta-derechos.pdf)[nimos (Total Play)](https://www.negociostotalplay.com.mx/pdf/carta-derechos.pdf)</u>  
~~~~~


## Gemini


### Gemini · C01 — Arrendamiento habitacional CDMX

- **Evidencia de búsqueda web:** Sin evidencia visible. La respuesta no trae enlaces, fuentes ni mención de verificación.

~~~~~
  El fragmento presenta **cinco disposiciones ilegales o nulas** conforme al **Código Civil para el Distrito Federal** (aplicable en la Ciudad de México) y la **Constitución Política de los Estados Unidos Mexicanos**.Dado que las normas sobre arrendamiento de casa habitación son de **orden público e irrenunciables** (Art.2448 del Código Civil), cualquier pacto en contrario se tiene por no puesto (nulo de pleno derecho), aunque el inquilino haya firmado el contrato.  
    
  A continuación, el desglose técnico de cada irregularidad:  
    
  **1. Incremento anual automático del 15% fijo (Ilegal / Nula)**

<!-- -->

- Lo que dice la cláusula: Aumento automático del 15% cada año. 

- **Por qué es ilegal:** Conforme a la reforma de agosto de 2024 al **artículo 2448 D** del Código Civil de la CDMX, el incremento anual de la renta en casa habitación **nunca puede ser mayor a la inflación reportada por el Banco de México** en el año anterior respecto de la cantidad pactada como renta mensual. Un 15% fijo excede por mucho la inflación anual histórica reciente en México (~4%–5%), por lo que el excedente (o la cláusula misma en cuanto supera el tope legal) es nulo.   
  **2. Interés moratorio del 10% mensual capitalizable (Usurario / Ilícito)**

<!-- -->

- Lo que dice la cláusula: Interés moratorio del 10% mensual (120% anual) y además capitalizable (anatocismo: cobrar intereses sobre intereses). 

- **Por qué es ilegal:** 

  - **Usura:** La Suprema Corte de Justicia de la Nación (SCJN) y el **artículo 2395** del Código Civil prohíben el interés desproporcionado (usura), en consonancia con el artículo 21.3 de la Convención Americana sobre Derechos Humanos. Una tasa del 120% anual en un arrendamiento civil es manifiestamente usuraria y un juez debe reducirla prudencialmente (el interés legal civil en CDMX es del 9% anual, Art. 2395). 

  - **Anatocismo:** El **artículo 2397** prohíbe expresamente pactar de antemano que los intereses se capitalicen y produzcan nuevos intereses.   
    **3. Ingreso al inmueble con llave propia y retiro de pertenencias (Inconstitucional / Constitutivo de delito)**

<!-- -->

- Lo que dice la cláusula: Autorización para que el arrendador entre con su llave y saque las cosas del inquilino si hay atraso mayor a 10 días. 

- **Por qué es ilegal:** 

  - Viola directamente los **artículos 14, 16 y 17 de la Constitución**: nadie puede hacerse justicia por propia mano (autotutela prohibida), ni ser privado de sus posesiones o molestado en su domicilio sin mandamiento escrito de autoridad judicial competente tras un juicio. 

  - El derecho de posesión derivada del inquilino está protegido legalmente. Si el arrendador entra sin consentimiento actual y saca pertenencias, puede incurrir en los delitos de **allanamiento de morada**y **despojo** (Código Penal para el Distrito Federal), además de responsabilidad civil, sin importar lo que diga el contrato.   
    **4. Rescisión y desalojo inmediato sin juicio ni orden judicial (Nula)**

<!-- -->

- Lo que dice la cláusula: Dar por terminado el contrato y ejecutar el desalojo de inmediato por mero atraso de 10 días, sin intervención de un juez. 

- **Por qué es ilegal:** 

  - Aunque el atraso en el pago es causal de rescisión (Art. 2489, frac. I), la terminación forzosa y el lanzamiento (desalojo) **solo pueden ejecutarse mediante sentencia firme dictada por un juez civil** en un juicio de controversia de arrendamiento inmobiliario. No existen los desalojos extrajudiciales privados en México.   
    **5. Renuncia anticipada al derecho del tanto (Nula de pleno derecho)**

||
||
||

<table>
<tbody>
<tr class="odd">
<td><ul>
<li><p>Lo que dice la cláusula: El inquilino renuncia desde la firma del contrato al derecho de preferencia (derecho del tanto) si el propietario decide vender el inmueble. </p></li>
<li><p><strong>Por qué es ilegal:</strong> </p>
<ul>
<li><p>El <strong>artículo 2448 J</strong> del Código Civil otorga al arrendatario de casa habitación el derecho del tanto para adquirir el inmueble en igualdad de condiciones frente a un tercero. </p></li>
<li><p>Al formar parte del capítulo de arrendamiento de fincas urbanas destinadas a habitación, es un <strong>derecho irrenunciable por mandato del artículo 2448</strong>. Una renuncia genérica y anticipada en el contrato carece de validez jurídica; el propietario sigue obligado a notificar formalmente la intención de venta y sus condiciones cuando decida vender. <br />
<strong>Resumen operativo</strong></p></li>
</ul></li>
</ul>
<p>Disposición contractual</p></td>
<td><p><strong>Estatus jurídico</strong></p></td>
<td><p><strong>Fundamento principal</strong></p></td>
</tr>
<tr class="even">
<td><p>Aumento anual del 15%</p></td>
<td><p><strong>Nula</strong> (topada a la inflación anual)</p></td>
<td><p>Art. 2448 D Código Civil CDMX</p></td>
</tr>
<tr class="odd">
<td><p>Interés 10% mensual capitalizable</p></td>
<td><p><strong>Nula / Reducible</strong> (usura y anatocismo)</p></td>
<td><p>Arts. 2395 y 2397 CC CDMX; Jurisprudencia SCJN</p></td>
</tr>
<tr class="even">
<td><p>Entrar con llave y sacar cosas</p></td>
<td><p><strong>Nula e ilícita</strong> (posible delito)</p></td>
<td><p>Arts. 14, 16 y 17 Constitución; Código Penal CDMX</p></td>
</tr>
<tr class="odd">
<td><p>Desalojo sin juicio</p></td>
<td><p><strong>Nula</strong> (autotutela prohibida)</p></td>
<td><p>Art. 17 Constitución; Código de Procedimientos Civiles</p></td>
</tr>
<tr class="even">
<td><p>Renuncia al derecho del tanto</p></td>
<td><p><strong>Nula</strong> (derecho irrenunciable)</p></td>
<td><p>Arts. 2448 y 2448 J Código Civil CDMX</p></td>
</tr>
</tbody>
</table>

Si estás revisando este contrato antes de firmarlo, conviene exigir la eliminación o modificación de ambas cláusulas; si ya está firmado, las estipulaciones anteriores no obligan legalmente al inquilino ni facultan al arrendador para ejecutarlas por la fuerza.  
~~~~~


### Gemini · C02 — Contrato de adhesión de gimnasio (PROFECO)

- **Evidencia de búsqueda web:** Sin evidencia visible. La respuesta no trae enlaces, fuentes ni mención de verificación.

~~~~~
El fragmento presenta **múltiples cláusulas abusivas, desproporcionadas y nulas de pleno derecho**conforme a la **Ley Federal de Protección al Consumidor (LFPC)** y al **Código Civil Federal (CCF)** en México.  
  
A continuación se desglosan las irregularidades por cláusula y el sustento legal aplicable:  
  
**Análisis de la Cláusula Séptima**  
Esta cláusula acumula cuatro prácticas sancionadas por la legislación mexicana en contratos de adhesión:  

- **1. Renovación automática con cargo domiciliado (Nula / Abusiva):** 

  - **Por qué es ilegal:** En los contratos de prestación de servicios continuos con cargo recurrente (domiciliación), la renovación automática sin el consentimiento expreso y previo del consumidor antes del nuevo periodo vulnera el principio de libertad de contratación y el derecho a la información.Además, conforme a las reglas de domiciliación bancaria (Banco de México) y criterios de Profeco, el consumidor tiene derecho a cancelar la domiciliación en cualquier momento sin que el proveedor pueda mantener cobros automáticos unilaterales. 

<!-- -->

- **2. Restricción de cancelación "exclusivamente presencial" y en ventana de 5 días (Abusiva):** 

  - **Por qué es ilegal:** El **Artículo 85** y el **Artículo 90 de la LFPC** prohíben las cláusulas que impongan obstáculos injustificados o desproporcionados para dar por terminado el contrato. Un principio rector en materia de consumo es que **la cancelación debe poder realizarse por los mismos medios por los que se contrató** (o por cualquier canal fehaciente habilitado por el proveedor), sin limitar el derecho del usuario a una ventana arbitraria de cinco días al mes ni obligarlo a acudir físicamente si existen medios digitales o telefónicos. 

<!-- -->

- **3. Pena convencional del 50% sobre el total de mensualidades restantes (Desproporcionada y Nula):** 

  - **Por qué es ilegal:** El **Artículo 90, fracción II de la LFPC** establece que no serán válidas y se tendrán por no puestas las cláusulas que impongan prestaciones desproporcionadas a cargo de los consumidores. Asimismo, el **Artículo 1843 del Código Civil Federal** dicta que la cláusula penal no puede exceder ni en valor ni en cuantía a la obligación principal, y en materia de servicios no prestados, cobrar el 50% de meses futuros en los que el gimnasio no erogará ningún servicio ni desgaste de instalaciones constituye un lucro indebido y una barrera de salida abusiva (en contratos de adhesión registrados ante Profeco, las penas convencionales suelen limitarse a porcentajes menores sobre el saldo o a una mensualidad, nunca a un castigo punitivo de esta magnitud).   
    **Análisis de la Cláusula Novena**  
    Esta cláusula intenta eximir al proveedor de sus obligaciones mínimas de seguridad, cuidado y mantenimiento, lo cual está expresamente prohibido por la ley:  

<!-- -->

- **1. Exención de responsabilidad por robo o extravío en casilleros (Nula de pleno derecho):** 

  - **Por qué es ilegal:** El **Artículo 90, fracción I de la LFPC** declara nulas las cláusulas que *"permitan al proveedor modificar unilateralmente el contenido del contrato, o sustraerse unilateralmente de sus obligaciones"*, así como la **fracción III**, que invalida las cláusulas que *"liberen al proveedor de su responsabilidad civil, excepto cuando el consumidor incumpla el contrato"*. Cuando un establecimiento ofrece el servicio de casilleros como parte de su infraestructura, asume un **deber de guarda y custodia** (contrato de depósito accesorio conforme al Código Civil). No puede deslindarse de robos ocurridos dentro de sus instalaciones bajo su vigilancia. 

<!-- -->

- **2. Exención de responsabilidad por lesiones derivadas de fallas mecánicas en los aparatos (Nula e Ilícita):** 

  - **Por qué es ilegal:** Nuevamente opera el **Artículo 90, fracción III de la LFPC**, además del **Artículo 1913 del Código Civil Federal** (responsabilidad civil objetiva por el uso de mecanismos o aparatos que por su naturaleza o falta de mantenimiento generan riesgo) y el **Artículo 1910 del CCF**(responsabilidad por hechos ilícitos o negligencia). El gimnasio tiene la obligación legal de garantizar que sus instalaciones y equipos sean seguros y reciban mantenimiento adecuado; cualquier renuncia anticipada a reclamar daños por negligencia del proveedor es inexistente jurídicamente.   
    **Recursos y acciones disponibles en México**

<!-- -->

- Registro Público de Contratos de Adhesión (RPCA): Los gimnasios están sujetos a la **NOM-174-SCFI-2007** (Prácticas comerciales - Elementos de información para la prestación de servicios en general). Si el gimnasio utiliza un contrato distinto al registrado ante Profeco o contiene estas cláusulas,es acreedor a multas y la cláusula se tiene por no puesta. 

- **Procedimiento ante Profeco:** El consumidor puede presentar una queja para exigir la rescisión sin penalización abusiva o el reembolso de cargos no autorizados, y solicitar la cancelación directa de la domiciliación ante su institución bancaria (que debe aplicarse sin costo en un plazo máximo de 3 días hábiles).   
  *Nota: Este análisis tiene fines estrictamente informativos y de orientación legal general; no sustituye la asesoría personalizada de un abogado.*  
~~~~~


### Gemini · C03 — Tarjeta de crédito (CONDUSEF)

- **Evidencia de búsqueda web:** Sin evidencia visible. La respuesta no trae enlaces, fuentes ni mención de verificación.

~~~~~
  Ambas cláusulas son **ilegales, abusivas y nulas de pleno derecho** conforme a la legislación financiera y constitucional vigente en México. De acuerdo con la Ley de Protección y Defensa al Usuario de Servicios Financieros, una cláusula abusiva se tiene por no puesta, aun cuando el cliente haya firmado el contrato.  
    
  **1. Análisis de la Cláusula Octava (Modificación unilateral sin previo aviso)**  
  Esta cláusula vulnera directamente la **Ley para la Transparencia y Ordenamiento de los Servicios Financieros (LTOSF)** y las disposiciones de la **CONDUSEF** y el **Banco de México (Banxico)**:  

<!-- -->

- **Falta de aviso previo obligatorio:** Las entidades financieras no pueden modificar tasas de interés ni comisiones con efectos inmediatos. Por ley, deben notificar al usuario con al menos **30 días naturales de anticipación** a la fecha en que entren en vigor los cambios, a través de los medios pactados (estado de cuenta, correo electrónico, etc.), no mediante una simple publicación pasiva en su portal web. 

- **Supresión del derecho a cancelar bajo condiciones anteriores:** La LTOSF garantiza el derecho del usuario a solicitar la terminación del contrato dentro de los **60 días naturales posteriores** al aviso de modificación, pagando el adeudo bajo las **condiciones anteriores** (sin aplicar las nuevas tasas o comisiones) y sin penalización por cancelación. Negar este derecho es ilegal. 

- **Creación arbitraria de comisiones:** Ninguna institución puede crear nuevas comisiones de forma discrecional; estas deben estar previamente registradas y autorizadas ante el Registro de Comisiones (RECO) de Banxico. 

- **Nulidad por cláusula abusiva:** El catálogo oficial de cláusulas abusivas de la CONDUSEF prohíbe expresamente cualquier estipulación que permita a la entidad modificar unilateralmente los términos del contrato en perjuicio del usuario sin otorgar el plazo legal de aviso y rescisión.   
  **2. Análisis de la Cláusula Décima Quinta (Cargo directo en cuentas de otros bancos y nómina)**  
  Esta disposición es inconstitucional y viola múltiples leyes financieras y laborales:  

<!-- -->

- **Prohibición de justicia por propia mano (Artículos 14, 16 y 17 Constitucionales):** Ningún particular o banco puede cobrar un adeudo sustrayendo dinero de cuentas en otras instituciones sin que medie un procedimiento judicial (garantía de audiencia y debido proceso) o una orden de autoridad competente. 

- **Inexistencia de facultad interbancaria unilateral:** Una institución financiera no tiene facultades legales ni operativas para ordenar cargos directos sobre cuentas abiertas en **otras instituciones bancarias**mediante un mandato genérico. La domiciliación o cargo interbancario requiere una autorización específica, expresa y revocable vinculada a una cuenta CLABE determinada, conforme a las reglas de Banxico. 

- **Protección al salario y cuentas de nómina:** Conforme a la **Ley Federal del Trabajo** (artículos 110 y 112) y los criterios de la Suprema Corte de Justicia de la Nación (SCJN), el salario es inembargable (salvo pensiones alimenticias o límites estrictos fijados por ley). Además, las reglas de compensación bancaria impiden que un banco disponga libremente de los recursos de una cuenta de nómina para saldar créditos distintos sin límites ni consentimiento específico, mucho menos tratándose de cuentas radicadas en otro banco. 

- **Mandato irrevocable abusivo:** La CONDUSEF clasifica como abusiva cualquier cláusula que imponga al usuario un mandato irrevocable para disponer de sus recursos o bienes en caso de incumplimiento, ya que elimina su derecho a revocar autorizaciones de cargo.   
  **Consecuencias jurídicas**  
  Si este texto formara parte de un contrato de adhesión registrado en México, el usuario puede presentar una denuncia ante la **CONDUSEF** para exigir la declaración de nulidad de ambas cláusulas (a través del Registro de Contratos de Adhesión, RECA) y, en caso de que el banco hubiera ejecutado algún cobro amparado en ellas, reclamar la devolución íntegra de los montos más intereses moratorios o indemnizaciones correspondientes.  
~~~~~


### Gemini · C04 — Contrato individual de trabajo (LFT)

- **Evidencia de búsqueda web:** Sin evidencia visible. La respuesta no trae enlaces, fuentes ni mención de verificación.

~~~~~
  Ambos fragmentos contienen disposiciones **nulas de pleno derecho** conforme a la **Constitución Política de los Estados Unidos Mexicanos (Artículo 123)** y la **Ley Federal del Trabajo (LFT)**, además de constituir prácticas que pueden configurar infracciones administrativas e incluso delitos.  
    
  A continuación, se desglosa el análisis jurídico de cada una:  
    
  **1. Análisis de la Cláusula Sexta (Renuncia a tiempo extraordinario)**  
  *"El trabajador renuncia expresamente al reclamo o pago de cualquier hora extraordinaria futura, salvo que exhiba orden escrita firmada con 48 horas de anticipación por el Director General, aun cuando permanezca laborando por instrucciones verbales de su supervisor."*  

<!-- -->

- **Estatus legal:** **Nula de pleno derecho** (no surte efecto legal alguno, aunque el trabajador firme el contrato). 

- **Fundamento legal:** 

  - **Artículo 123, Apartado A, fracción XXVII, incisos g) y h) de la Constitución:** Establece que serán condiciones nulas y no obligarán a los contrayentes, aunque se expresen en el contrato, aquellas que constituyan renuncia hecha por el obrero de las indemnizaciones o derechos consignados en las normas protectoras de los trabajadores. 

  - **Artículos 5 (fracción XIII) y 33 de la LFT:** Los derechos de los trabajadores son **irrenunciables**.Toda estipulación que implique renuncia de un derecho laboral es nula y se tiene por no puesta. 

  - **Artículos 66, 67 y 68 de la LFT:** Regulan la prolongación de la jornada de trabajo y obligan al patrón a pagarla (al 100% adicional las primeras 9 horas semanales y al 200% las excedentes). 

<!-- -->

- **Por qué es ilegal:** 

  - **Irrenunciabilidad:** Un trabajador no puede renunciar por adelantado (ni a posteriori) al pago de tiempo extra efectivamente laborado. 

  - **Imposibilidad práctica y subordinación:** Exigir una autorización escrita con 48 horas de anticipación por un alto directivo contraviene la naturaleza misma del tiempo extraordinario (que suele surgir por necesidades imprevistas) y desnaturaliza la subordinación laboral (art. 20 LFT): el trabajador está obligado a obedecer las instrucciones inmediatas de su supervisor directo y no puede ser penalizado por acatar una orden verbal de quien ejerce dirección sobre él. 

  - **Carga de la prueba:** Conforme al **artículo 784, fracción VIII de la LFT**, corresponde al patrón probar la duración de la jornada de trabajo (cuando exista controversia sobre las primeras 9 horas extras semanales), no pudiendo trasladar esa carga mediante candados contractuales imposibles.   
    **2. Análisis de la Cláusula Décima (Pagaré en blanco y descuentos al salario mínimo)**  
    *"Al firmar este contrato, el trabajador suscribe un pagaré en blanco como garantía y autoriza descontar hasta el 40% de su salario mínimo semanal en caso de errores operativos o faltantes de caja."*  
      
    Esta cláusula contiene **tres violaciones graves** distintas:  

<!-- -->

- **Estatus legal:** **Nula de pleno derecho** e **ilegal**. 

- **Fundamento legal y explicación:** 

  1.  **Suscripción de pagarés en blanco (Prohibición expresa y posible delito):** 

      - **Artículo 5, fracción XIII y artículo 133 de la LFT:** Prohíbe a los patrones exigir a los trabajadores la firma de documentos en blanco o títulos de crédito (como pagarés o letras de cambio) como condición de ingreso o permanencia, o para garantizar responsabilidades laborales. 

      - **Impacto penal y mercantil:** Hacer firmar un pagaré en blanco en el contexto laboral se considera una práctica de coacción/fraude laboral. En un juicio mercantil, si se acredita que el pagaré deriva de una relación de trabajo como garantía, carece de validez ejecutiva; además,llenar indebidamente un documento firmado en blanco puede constituir fraude o falsificación. 

  <!-- -->

  1.  **Intangibilidad del salario mínimo (Prohibición de descuentos):** 

      - **Artículo 123, Apartado A, fracción VIII de la Constitución y Artículo 97 de la LFT:** El salario mínimo queda exceptuado de embargo, compensación o descuento, salvo casos taxativos muy específicos (pensiones alimenticias decretadas por juez, pago de rentas a que se refiere el art.151, abonos para cubrir préstamos del INFONAVIT o del FONACOT, todos con topes legales estrictos). 

      - Por tanto, descontar **cualquier porcentaje** (y menos aún un 40%) del salario mínimo por errores operativos o faltantes de caja es directamente inconstitucional. 

  <!-- -->

  1.  **Tope y reglas para descuentos por errores o pérdidas (incluso si ganara más del mínimo):** 

      - **Artículo 110, fracción I de la LFT:** Los descuentos en los salarios de los trabajadores están prohibidos, salvo en casos específicos. Para el pago de deudas contraídas con el patrón por anticipo de salarios, pagos hechos con exceso al trabajador, **errores, pérdidas, averías** o adquisición de artículos producidos por la empresa, la ley exige: 

        - Que la cantidad exigible **en ningún caso sea mayor del importe de los salarios de un mes**. 

        - Que el descuento se convenga entre el trabajador y el patrón (una vez ocurrido y comprobado el hecho, no mediante cheque en blanco previo) y **nunca podrá ser mayor del 30% del excedente del salario mínimo**.   
          **Consecuencias prácticas para las partes**

<!-- -->

- Para el trabajador: Aunque firme el contrato con estas cláusulas, conserva intacto su derecho a reclamar el pago de horas extras ante el Centro de Conciliación Laboral y los Tribunales Laborales, así como a exigir la devolución de cualquier descuento ilegal o la nulidad del pagaré. 

- **Para el patrón:** Además de que ambas cláusulas se tendrán por no puestas en juicio, la Secretaría del Trabajo y Previsión Social (STPS) puede imponer multas significativas (artículos 992, 994 y 1002 de la LFT) por incluir estipulaciones violatorias de derechos irrenunciables y realizar descuentos prohibidos.  
~~~~~


### Gemini · C05 — Internet residencial (PROFECO/CRT)

- **Evidencia de búsqueda web:** Sin evidencia visible. La respuesta no trae enlaces, fuentes ni mención de verificación.

~~~~~
  Ambas cláusulas son **ilegales y nulas de pleno derecho** conforme a la legislación mexicana vigente en materia de protección al consumidor y telecomunicaciones (principalmente la **Ley Federal de Protección al Consumidor \[LFPC\]**, la **Ley Federal de Telecomunicaciones y Radiodifusión \[LFTR\]** y la **NOM-184-SCFI-2018**).  
    
  En México, los contratos de adhesión de servicios de telecomunicaciones requieren registro obligatorio ante PROFECO y el Instituto Federal de Telecomunicaciones (IFT); ningún proveedor puede imponer condiciones que vulneren derechos irrenunciables del usuario.  
    
  **1. Análisis de la Cláusula Quinta (Plazo forzoso y pena convencional)**  
  Esta cláusula presenta tres violaciones graves e independientes:  

<!-- -->

- **Cancelación sin penalización por incumplimiento del proveedor:** Según el **artículo 191, fracción X de la LFTR** y la **NOM-184-SCFI-2018**, el usuario tiene derecho a rescindir el contrato **sin pena alguna** si el proveedor no cumple con los parámetros de calidad contratados (como la velocidad mínima garantizada) o si modifica unilateralmente las condiciones o tarifas del contrato. Pretender cobrar penalización bajo estos supuestos es ilegal. 

- **Desproporcionalidad de la pena convencional:** El **artículo 90, fracción III de la LFPC** prohíbe y declara nulas las cláusulas que impongan al consumidor obligaciones o penalizaciones desproporcionadas. Además, la **NOM-184-SCFI-2018 (numeral 5.2.15)** establece que, en caso de terminación anticipada imputable al usuario dentro de un plazo forzoso, la pena convencional debe ser razonable y equitativa, **calculándose únicamente sobre el remanente de equipos terminales (módem/decodificador) o costos de instalación no amortizados**, nunca sobre el 100% de las mensualidades futuras de un servicio que ya no se va a prestar (lo cual constituiría un enriquecimiento ilegítimo conforme al Código Civil Federal). 

- **Plazo forzoso injustificado:** La regulación exige que todo plazo forzoso tenga una justificación objetiva (por ejemplo, subsidiar el costo de un equipo o la instalación) y que el proveedor ofrezca también la opción de contratar sin plazo forzoso.   
  **2. Análisis de la Cláusula Vigésima (Renuncia a PROFECO y sumisión territorial)**  
  Esta cláusula también es completamente inválida por dos razones de orden público:  

||
||
||

<table>
<tbody>
<tr class="odd">
<td><ul>
<li><p><strong>Irrenunciabilidad de la competencia de PROFECO:</strong> De acuerdo con el <strong>artículo 1 de la LFPC</strong>, las disposiciones de esa ley son de <strong>orden público e interés social y son irrenunciables</strong>; por lo tanto, no pueden ser alteradas por convenio entre particulares. Asimismo, el <strong>artículo 90, fracción V de la LFPC</strong>señala expresamente que son nulas las cláusulas que obliguen al consumidor a renunciar a la protección de la ley o lo sometan a la competencia de tribunales extranjeros o distintos a los que le corresponden. </p></li>
<li><p><strong>Sumisión expresa abusiva (fuero territorial):</strong> El <strong>artículo 90, fracción IV de la LFPC</strong> prohíbe las cláusulas que trasladen al consumidor la carga de litigar fuera de su domicilio. En materia de consumo, el usuario siempre conserva el derecho de presentar su queja ante la oficina de PROFECO o los tribunales competentes del lugar donde se preste el servicio o donde resida, sin importar dónde tenga su domicilio fiscal la empresa. <br />
<strong>Resumen de irregularidades legales</strong></p></li>
</ul>
<p>Elemento del contrato</p></td>
<td><p><strong>Estatus legal</strong></p></td>
<td><p><strong>Fundamento principal</strong></p></td>
</tr>
<tr class="even">
<td><p>Cobro de pena por fallas o alza de tarifas</p></td>
<td><p><strong>Nulo</strong></p></td>
<td><p>Art. 191 fr. X LFTR / NOM-184-SCFI-2018</p></td>
</tr>
<tr class="odd">
<td><p>Pena del 100% de mensualidades restantes</p></td>
<td><p><strong>Abusivo / Nulo</strong></p></td>
<td><p>Art. 90 fr. III LFPC / NOM-184-SCFI-2018</p></td>
</tr>
<tr class="even">
<td><p>Renuncia a la intervención de PROFECO</p></td>
<td><p><strong>Nulo de pleno derecho</strong></p></td>
<td><p>Art. 1 y Art. 90 fr. V LFPC</p></td>
</tr>
<tr class="odd">
<td><p>Obligación de litigar en Monterrey</p></td>
<td><p><strong>Abusivo / Nulo</strong></p></td>
<td><p>Art. 90 fr. IV LFPC</p></td>
</tr>
</tbody>
</table>

Si este texto pertenece a un contrato real que te están pidiendo firmar o aplicar, puedes verificar si el contrato cuenta con número de registro válido en el **Registro Público de Contratos de Adhesión (RPCA)** de PROFECO; de no coincidir con el texto registrado, el proveedor se hace acreedor a sanciones administrativas.  
~~~~~

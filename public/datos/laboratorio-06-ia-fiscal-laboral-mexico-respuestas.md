# Respuestas íntegras — Experimento 06: Cálculo fiscal y laboral con IA en México

Datos abiertos de [glitchMentalMX](https://glitchmental.com/) · Licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es)

- **Pieza:** https://glitchmental.com/laboratorio/calculo-fiscal-y-laboral-con-ia-en-mexico/
- **CSV de resultados codificados:** https://glitchmental.com/datos/laboratorio-06-ia-fiscal-laboral-mexico.csv
- **Ejecución:** 2026-11-17, interfaz web estándar de cada modelo (ChatGPT, Claude y Gemini), un chat nuevo por caso y una sola respuesta, sin repreguntas. 18 respuestas (3 modelos × 6 casos).
- **Qué es este archivo:** el texto que devolvió cada modelo, tal como salió, para que puedas verificar o recalificar sin fiarte de nuestro puntaje. Solo se cambió el formato (de la interfaz web a Markdown) y se normalizaron los espacios en blanco. Las palabras y las URL no se editaron.
- **Convenciones:** los residuos de interfaz (por ejemplo «DGESUI+1» o «gob.mx+2») son restos de los chips de fuente de ChatGPT y se conservan. La línea «Búsqueda web / código» de cada caso es una inferencia nuestra a partir de esos residuos o de lo que el propio modelo declara; «no evidenciado» no equivale a «no usó».
- **Memoria de cuenta:** las pruebas corrieron en las cuentas del editor, no en cuentas anónimas. Las piezas 07, 10 y 11 documentan huella de memoria en algunas respuestas (por ejemplo, un saludo por nombre); cada pieza declara en «Protocolo y límites» lo que encontramos.

## Prompts usados

### C01 — Aguinaldo proporcional (Art. 87 LFT)

````text
En México, un trabajador con salario mensual bruto de $18,000 MXN ($600 MXN diarios) ingresó a trabajar el 1 de agosto de 2026 y sigue activo al 20 de diciembre de 2026. Con el mínimo de ley (15 días), ¿cuánto le corresponde exactamente de aguinaldo proporcional bruto? Muestra la operación paso a paso y da una cifra final exacta.
````

### C02 — Prima vacacional en 2.º año con Vacaciones Dignas (Arts. 76 y 80 LFT)

````text
En México, un trabajador cumple exactamente 2 años de antigüedad en 2026 con un salario diario de $500 MXN. Con las prestaciones mínimas de ley vigentes, ¿cuántos días de vacaciones le corresponden y cuánto dinero exacto debe recibir por prima vacacional mínima? Muestra el cálculo.
````

### C03 — Horas extra dobles y triples en una semana (Arts. 66-68 LFT)

````text
En México, un trabajador de jornada diurna cuya hora ordinaria vale $100 MXN trabaja 11 horas extra en una misma semana (de lunes a viernes). Según la Ley Federal del Trabajo, ¿cuántas horas se pagan al doble, cuántas al triple y cuál es el monto total exacto a pagar por esas 11 horas extra?
````

### C04 — ISR mensual y deducciones en RESICO Persona Física (Art. 113-E LISR)

````text
En México, una persona física tributa en RESICO y en un mes cobra facturas por $65,000 MXN de subtotal (antes de IVA). Ese mismo mes compró una laptop de $25,000 MXN más IVA para su trabajo. ¿Cuánto paga exactamente de ISR mensual en RESICO y cuánto puede restar de la laptop para bajar ese ISR? Responde con cifras exactas.
````

### C05 — Factura de RESICO Persona Física a Persona Moral con retenciones (Arts. 113-J LISR y 1-A LIVA)

````text
En México, una persona física en RESICO emite una factura de honorarios profesionales por $20,000 MXN de subtotal a una empresa (Persona Moral). Desglosa exactamente: subtotal, IVA trasladado (16%), retención de ISR, retención de IVA y monto neto final que recibe en su cuenta bancaria.
````

### C06 — Indemnización constitucional y tope de prima de antigüedad (Arts. 48, 50 y 162 LFT)

````text
En México, despiden injustificadamente en la Ciudad de México (Zona del Salario Mínimo General) a un trabajador con 3 años completos de antigüedad y un Salario Diario Integrado (SDI) de $800 MXN en 2026. Sin contar salarios caídos ni partes proporcionales, ¿cuánto le corresponde por indemnización constitucional (3 meses), cuánto por prima de antigüedad de 12 días por año conforme a la LFT y cuál es la suma total exacta?
````

## Respuestas

## ChatGPT

### ChatGPT — C01

- **Búsqueda web / código:** Sí (inferido: residuo de chip de fuente «Cámara de Diputados»)


El aguinaldo proporcional bruto que le corresponde es de $3,501.37 MXN, considerando que trabajó del 1 de agosto al 20 de diciembre de 2026, ambos días incluidos, y que se aplica el mínimo legal de 15 días.
**1. Datos del cálculo**
- Salario mensual bruto: $18,000 MXN.
- Salario diario: $18,000 ÷ 30 = $600 MXN.
- Aguinaldo mínimo anual: 15 días.
- Periodo trabajado en 2026: 142 días.
- Días del año 2026: 365.
**2. Cálculo paso a paso**
Paso 1. Aguinaldo anual completo:
\[ 600 \times 15 = \$9,000 \]
Paso 2. Aguinaldo diario proporcional:
\[ 9,000 \div 365 = \$24.6575342466 \]
Paso 3. Días efectivamente trabajados:
| **Mes** | **Días** |
|---|---|
| Agosto | 31 |
| Septiembre | 30 |
| Octubre | 31 |
| Noviembre | 30 |
| Diciembre (1 al 20) | 20 |
| Total | 142 |

Paso 4. Aguinaldo proporcional:
\[ \frac{9,000}{365}\times142 \]
\[ = \$3,501.3698630137 \]
**Resultado final**
AGUINALDO PROPORCIONAL BRUTO
**$3,501.37 MXN**

Base de cálculo
15 días
Antigüedad considerada
142 días
Salario diario
$600.00
Fundamento legal: Artículo 87 de la Ley Federal del Trabajo. Establece un aguinaldo mínimo de 15 días y reconoce el derecho al pago proporcional cuando no se ha cumplido un año de servicios.

Cámara de Diputados

Nota: Esta cifra es bruta, antes de cualquier retención fiscal que pudiera corresponder. No incluye prestaciones superiores a las de ley.


### ChatGPT — C02

- **Búsqueda web / código:** Sí (inferido: residuo de chip de fuente «DGESUI+1»)


En México, un trabajador que cumple exactamente 2 años de antigüedad en 2026 tiene derecho a 14 días de vacaciones y a una prima vacacional mínima de $1,750.00 MXN.
El cálculo se realiza conforme a la Ley Federal del Trabajo (LFT), con las prestaciones mínimas vigentes.
**1. Días de vacaciones**
La reforma de vacaciones dignas establece la siguiente escala:
| **Antigüedad** | **Días de vacaciones** |
|---|---|
| Primer año | 12 días |
| Segundo año | 14 días |
| Tercer año | 16 días |
| Cuarto año | 18 días |
| Quinto año | 20 días |

Por lo tanto, al cumplir dos años corresponden 14 días de vacaciones.
**2. Cálculo de la prima vacacional**
El artículo 80 de la LFT establece una prima vacacional mínima del 25% sobre el salario correspondiente a los días de vacaciones.

DGESUI+1

Datos:
- Salario diario: $500.00
- Días de vacaciones: 14
- Prima vacacional: 25%
Operación paso a paso:
1. Salario correspondiente a las vacaciones:
14 × $500 = $7,000.00
2. Prima vacacional mínima:
$7,000 × 0.25 = $1,750.00
**3. Resultado final**
Días de vacaciones
14 días

Salario de los días de vacaciones
$7,000.00
Prima vacacional mínima
**$1,750.00**

Total correspondiente al periodo
$8,750.00
Importante: Los $7,000 corresponden al salario ordinario de los días de vacaciones, que se paga normalmente durante el descanso. Los $1,750 son el importe adicional por concepto de prima vacacional.
Por tanto, el trabajador tiene derecho a 14 días de vacaciones y $1,750 MXN de prima vacacional mínima bruta. No se incluyen posibles prestaciones superiores de contrato o empresa.


### ChatGPT — C03

- **Búsqueda web / código:** Sí (inferido: residuo de chip de fuente «DGESUI+1»)


De acuerdo con la Ley Federal del Trabajo (LFT) de México, las 11 horas extraordinarias se clasifican así:
- Primeras 9 horas: se pagan al doble.
- Horas que exceden de 9: se pagan al triple.
Esto se fundamenta en los artículos 67 y 68 de la LFT.
Cálculo con una hora ordinaria de $100 MXN:
| **Concepto** | **Operación** | **Importe** |
|---|---|---|
| 9 horas al doble | 9 × $200 | $1,800 |
| 2 horas al triple | 2 × $300 | $600 |
| Total |  | $2,400 MXN |

**$2,400 MXN**
Pago bruto por las 11 horas extraordinarias.
Importante: una precisión legal para 2026.
La reforma publicada el 1 de mayo de 2026 modificó los artículos 66, 67 y 68. Además, su régimen transitorio establece que durante 2026 el límite aplicable de horas extraordinarias es de 9 horas semanales. Por eso, las dos horas restantes se pagan al triple.

DGESUI+1

También hay una irregularidad: la nueva disposición establece que las horas extraordinarias pueden distribuirse en un máximo de cuatro días por semana. Trabajar horas extra de lunes a viernes incumple esa condición.
Conclusión: 9 horas dobles, 2 triples y $2,400 MXN de pago extraordinario.


### ChatGPT — C04

- **Búsqueda web / código:** Sí (inferido: residuos de chip de fuente «SAT+1»)


En el régimen RESICO para personas físicas en México, el ISR se calcula sobre los ingresos efectivamente cobrados, sin restar gastos, compras ni inversiones.
Por tanto, aunque la laptop sea necesaria para trabajar y esté facturada a nombre del contribuyente, no reduce el ISR mensual de RESICO.
Vamos con los números.
**1. Cálculo del ISR mensual**
Datos del ejercicio
| **Concepto** | **Importe** |
|---|---|
| Ingresos cobrados (subtotal) | $65,000.00 |
| IVA trasladado (16%) | $10,400.00 |
| Total facturado | $75,400.00 |
| Base para ISR | $65,000.00 |

De acuerdo con la tabla mensual de RESICO, los ingresos superiores a $50,000 y hasta $83,333.33 tienen una tasa de ISR del 1.5%.
\[ \$65,000 \times 1.5\% = \$975.00 \]
ISR mensual: $975.00 MXN
**2. ¿Qué pasa con la laptop?**
| **Concepto** | **Importe** |
|---|---|
| Precio de la laptop | $25,000.00 |
| IVA (16%) | $4,000.00 |
| Total pagado | $29,000.00 |
| Deducción aplicable al ISR RESICO | $0.00 |

El artículo 113-E de la Ley del ISR establece expresamente que el cálculo mensual se realiza sin aplicar deducción alguna. Esto incluye equipos de cómputo, mobiliario, herramientas y otros gastos de operación.

SAT+1

**3. ¿Puede recuperar algo del IVA de la laptop?**
Aquí está la distinción importante: aunque no puede deducir la laptop para reducir el ISR, sí puede acreditar los $4,000 de IVA pagados, siempre que cumpla los requisitos fiscales, entre ellos:
- Contar con CFDI válido.
- Haber pagado efectivamente el IVA.
- Que la adquisición sea estrictamente indispensable para su actividad gravada.
- Que se cumplan los demás requisitos de acreditamiento de la Ley del IVA.
En el supuesto de que sus ingresos estén gravados al 16%, la operación sería:
| **Concepto** | **Importe** |
|---|---|
| IVA cobrado a clientes | $10,400.00 |
| IVA acreditable de la laptop | -$4,000.00 |
| IVA por pagar | $6,400.00 |

SAT+1
**Resultado final**
ISR mensual
$975.00

IVA por pagar (suponiendo acreditamiento completo)
$6,400.00

Deducción de laptop para ISR
$0.00
Conclusión: RESICO permite pagar un ISR relativamente bajo, pero sacrifica la posibilidad de deducir inversiones y gastos de operación. La laptop no reduce los $975 de ISR; su IVA de $4,000 sí puede representar un ahorro fiscal mediante acreditamiento.
Nota: el cálculo supone que los $65,000 fueron efectivamente cobrados, que no existen retenciones de ISR y que se cumplen los requisitos para el acreditamiento del IVA.


### ChatGPT — C05

- **Búsqueda web / código:** Sí (inferido: residuos de chip de fuente «SAT+1» / «SAT México+1»)


Para una persona física que tributa en RESICO y factura honorarios profesionales a una persona moral, se aplican dos retenciones: ISR del 1.25% e IVA de dos terceras partes del impuesto trasladado.
Este es el desglose correcto para una factura de $20,000 MXN.
**Desglose de la factura**
| **Concepto** | **Operación** | **Importe** |
|---|---|---|
| Subtotal (honorarios) | — | $20,000.00 |
| IVA trasladado (16%) | 20,000 × 0.16 | +$3,200.00 |
| Total de la factura |  | $23,200.00 |
| Retención ISR (1.25%) | 20,000 × 0.0125 | −$250.00 |
| Retención IVA (2/3) | 3,200 × ⅔ | −$2,133.33 |
| Neto depositado |  | $20,816.67 |

IMPORTE NETO QUE RECIBE EN SU CUENTA
**$20,816.67 MXN**

Total facturado
$23,200.00
Total de retenciones
$2,383.33
Depósito bancario
$20,816.67
**Fundamento legal**
1. ISR: artículo 113-J de la LISR. La persona moral debe retener el 1.25% sobre el importe pagado, sin incluir IVA. 

SAT+1
1. IVA: artículo 1-A, fracción II, inciso a), de la LIVA. Obliga a las personas morales a retener IVA cuando reciben servicios personales independientes de personas físicas.
1. Artículo 3 del Reglamento de la LIVA. Establece que la retención para servicios personales independientes es de dos terceras partes del IVA trasladado. 

SAT México+1
**Una precisión importante**
La retención de IVA presupone que se trata efectivamente de un servicio personal independiente, no de una actividad empresarial. El SAT distingue ambos supuestos en su criterio normativo 3/IVA/N.

SAT México

Conclusión: de los $23,200 facturados, la persona física recibe $20,816.67 en su cuenta bancaria. Los $2,383.33 restantes son impuestos retenidos que la empresa debe enterar al SAT.
Estas retenciones no son impuestos adicionales: el ISR retenido se acredita contra el ISR mensual y el IVA retenido se considera en el cálculo del IVA correspondiente.


### ChatGPT — C06

- **Búsqueda web / código:** Sí (inferido: residuos de chip de fuente «gob.mx+2» / «Orden Jurídico+2»)


El cálculo debe distinguir dos bases salariales: la indemnización constitucional se calcula con el SDI de $800, mientras que la prima de antigüedad está topada a dos salarios mínimos generales vigentes en 2026.
**1. Indemnización constitucional (3 meses)**
Para efectos del cálculo, se consideran 90 días:
- SDI: $800.00
- Días de indemnización: 90
Operación:
$800 × 90 = $72,000.00 MXN
**2. Prima de antigüedad (12 días por año)**
Conforme al artículo 162 de la LFT, corresponden 12 días de salario por cada año trabajado.
Sin embargo, los artículos 485 y 486 establecen un límite máximo de dos salarios mínimos cuando el salario del trabajador supera ese importe.
Para 3 años:
- Días acumulados: 12 × 3 = 36 días.
- Base salarial: dos salarios mínimos generales de 2026.
El salario mínimo general de 2026 es de $315.04 diarios. Por tanto:
- Salario mínimo diario: $315.04
- Tope legal (2 salarios mínimos): $630.08
Operación:
$630.08 × 36 días = $22,682.88 MXN

gob.mx+2
**3. Suma total**
| **Concepto** | **Importe** |
|---|---|
| Indemnización constitucional | $72,000.00 |
| Prima de antigüedad | $22,682.88 |
| TOTAL | $94,682.88 |

Total: $94,682.88 MXN
Fundamento legal:
- Artículo 48 LFT: indemnización de tres meses.
- Artículo 89 LFT: integración salarial para indemnizaciones.
- Artículo 162 LFT: prima de antigüedad de 12 días por año.
- Artículos 485 y 486 LFT: límites salariales aplicables a la prima.
Fuentes:

Orden Jurídico+2

Nota: El cálculo supone que los $800 son el SDI válido para la indemnización constitucional y que no existen otras prestaciones o conceptos pendientes. No incluye salarios caídos, partes proporcionales ni los 20 días por año, cuya procedencia depende de las circunstancias jurídicas del caso.


---

## Claude

### Claude — C01

- **Búsqueda web / código:** No evidenciado


**Aguinaldo proporcional bruto: $3,772.60 MXN**
**Operación (Art. 87 LFT: mínimo 15 días por año completo)**
1. Días trabajados en 2026, del 1 de agosto al 31 de diciembre:
  - Agosto 31 + septiembre 30 + octubre 31 + noviembre 30 + diciembre 31 = **153 días**
1. Aguinaldo anual completo: 15 días × $600 = $9,000.00
1. Proporción del año: 153 / 365 = 0.419178...
1. Aguinaldo proporcional:
  - Días de aguinaldo: 15 × 153 / 365 = 2,295 / 365 = 6.287671 días
  - Importe: 6.287671 × $600 = 1,377,000 / 365 = **$3,772.6027...**, que redondeado queda en **$3,772.60**
**Dos aclaraciones**
- **Corte al 31 de diciembre.** El aguinaldo cubre el año calendario completo. Aunque se pague a más tardar el 20 de diciembre, la proporción se cuenta hasta el 31 si el trabajador sigue activo. Es el criterio estándar.
- **Corte al 20 de diciembre.** Si tu empresa corta el cálculo en esa fecha, son 142 días (31 + 30 + 31 + 30 + 20). El resultado sería 15 × 142 / 365 × $600 = **$3,501.37**. Es una interpretación menos común y le conviene menos al trabajador.
La cifra es bruta. El aguinaldo está exento de ISR hasta 30 UMA, así que con este monto normalmente no habría retención.


### Claude — C02

- **Búsqueda web / código:** No evidenciado


**Resultado: 14 días de vacaciones y $1,750.00 MXN de prima vacacional mínima.**
**Vacaciones (Art. 76 LFT, reforma "Vacaciones Dignas")**
| **Años de servicio cumplidos** | **Días** |
|---|---|
| 1 | 12 |
| 2 | 14 |
| 3 | 16 |
| 4 | 18 |
| 5 | 20 |

Con 2 años exactos de antigüedad le corresponden **14 días laborables**.
**Prima vacacional (Art. 80 LFT)**
La prima mínima es 25% del salario de los días de vacaciones.
Salario de vacaciones = 14 días × $500      = $7,000.00
Prima vacacional      = $7,000 × 25%        = $1,750.00
El pago de los 14 días de vacaciones ($7,000.00) es aparte de la prima. Esta se suma a ese pago y no lo sustituye.
La reforma de 2023 ya está vigente en 2026, así que estas cifras aplican. Con el salario diario de $500 no hay tope que afecte el cálculo. Si el salario fuera variable, habría que promediarlo.


### Claude — C03

- **Búsqueda web / código:** No evidenciado


**Resultado:** 9 horas al doble, 2 al triple y un total de **$2,400.00 MXN**.
| **Concepto** | **Horas** | **Pago por hora** | **Subtotal** |
|---|---|---|---|
| Dobles (primeras 9 de la semana) | 9 | $200 | $1,800 |
| Triples (excedente de 9) | 2 | $300 | $600 |
| **Total** | **11** |  | **$2,400** |

**Fundamento (LFT):**
- **Art. 67:** las horas extra se pagan con un 100% más del salario de las horas ordinarias, es decir, al doble. Esto aplica hasta 9 horas a la semana.
- **Art. 68:** lo que pase de 9 horas semanales se paga con un 200% más, es decir, al triple.
- **Art. 66:** el tope legal es de 3 horas diarias y 3 veces por semana, o sea 9 horas semanales. Por eso la frontera entre doble y triple cae en la hora 9.
Las 2 horas excedentes se pagan al triple aunque el patrón no debió exigirlas, porque el trabajador no está obligado a prestarlas. En esta semana el patrón rebasó el límite legal, lo que además puede acarrearle sanciones administrativas.
El cálculo toma la hora ordinaria de $100 como base y no considera retenciones de ISR. En la práctica, las horas extra tienen una exención parcial de ISR (hasta cierto límite, según la LISR).


### Claude — C04

- **Búsqueda web / código:** No evidenciado (el modelo dice «hasta donde llega mi información»)


**ISR mensual en RESICO: $975.00 MXN**
- La tasa se aplica sobre el total cobrado en el mes, sin IVA, y no por tramos.
- Con ingresos de $50,000.01 a $83,333.33, la tasa mensual es 1.50% (art. 113-E LISR).
- $65,000.00 × 1.50% = **$975.00**
**Lo que puede restar de la laptop para bajar el ISR: $0.00**
En RESICO, las personas físicas pagan ISR sobre ingresos cobrados y no restan gastos ni inversiones. La laptop de $25,000 no reduce la base ni el ISR. Tampoco hay depreciación para efectos del pago mensual.
**Lo que sí te sirve de la laptop es el IVA, que es un impuesto distinto:**
| **Concepto** | **Monto** |
|---|---|
| IVA trasladado (16% de $65,000) | $10,400.00 |
| IVA acreditable de la laptop (16% de $25,000) | $4,000.00 |
| **IVA a pagar** | **$6,400.00** |

Para acreditar ese IVA necesitas una factura a tu nombre y RFC, con el gasto pagado por transferencia, tarjeta o cheque. Debe ser estrictamente indispensable para tu actividad. Si pagas en efectivo más de $2,000, no es acreditable.
Se basa en la tabla del art. 113-E vigente hasta donde llega mi información. Confírmala en el Anexo del SAT o con tu contador antes de presentar la declaración.


### Claude — C05

- **Búsqueda web / código:** No evidenciado


| **Concepto** | **Cálculo** | **Monto (MXN)** |
|---|---|---|
| Subtotal (honorarios) |  | $20,000.00 |
| + IVA trasladado | 16% × 20,000 | $3,200.00 |
| **Total de la factura** |  | **$23,200.00** |
| − Retención de ISR (RESICO) | 1.25% × 20,000 | −$250.00 |
| − Retención de IVA | 2/3 × 3,200 (10.6667% del subtotal) | −$2,133.33 |
| **Neto que recibes en tu cuenta** | 23,200 − 250 − 2,133.33 | **$20,816.67** |

- **ISR:** la retención de 1.25% es sobre el subtotal, sin IVA, y solo aplica cuando el cliente es persona moral. Ese ISR retenido lo acreditas en tu pago mensual de RESICO.
- **IVA:** la persona moral te retiene dos terceras partes del IVA por servicios personales independientes. Del IVA trasladado te quedan $1,066.67 (un tercio), que son los que declaras y enteras al SAT en tu declaración mensual.
- **En el CFDI:** los conceptos deben ir desglosados así: IVA trasladado $3,200.00, retención IVA $2,133.33 y retención ISR $250.00.
Esto es el cálculo general. No soy contador, así que confirma con el tuyo si tu caso tiene algo particular.


### Claude — C06

- **Búsqueda web / código:** No (declarado por el modelo: el salario mínimo lo toma «de memoria y no lo verificó»)


**Total: $94,682.88 MXN**
Supuesto: salario mínimo general 2026 de $315.04 diarios (CDMX, zona general). Esa cifra la tomo de memoria y no la verifiqué, así que confírmala. Es la que fija el tope de la prima.
**1. Indemnización constitucional (art. 48 LFT): 3 meses de salario**
- Se calcula con el SDI, sin tope.
- 90 días × $800 = **$72,000.00**
**2. Prima de antigüedad (art. 162 LFT): 12 días por año**
- El salario diario para la prima tiene tope de 2 veces el salario mínimo (art. 486 LFT).
- Tope: 2 × $315.04 = $630.08. Tu SDI de $800 lo rebasa, así que se usa $630.08.
- 3 años × 12 días = 36 días
- 36 × $630.08 = **$22,682.88**
**3. Suma**
- $72,000.00 + $22,682.88 = **$94,682.88 MXN**
Dos cosas que conviene tener presentes:
- El error común es calcular la prima con el SDI completo (36 × $800 = $28,800), lo que da un total de $100,800. Eso es incorrecto por el tope del art. 486.
- Aquí no entra la indemnización de 20 días por año (art. 50 fr. II), porque pediste solo las dos prestaciones. Si se reclamara, se sumaría aparte.


---

## Gemini

### Gemini — C01

- **Búsqueda web / código:** No evidenciado


Para calcular el aguinaldo proporcional bruto conforme al artículo 87 de la Ley Federal del Trabajo (LFT) en México, se debe tomar el periodo completo del año en curso hasta el 31 de diciembre si el trabajador continúa activo en su puesto (la fecha límite del 20 de diciembre es únicamente el plazo máximo legal para realizar el pago, no el corte del cálculo).

**1. Determinación de los días laborados en el año**
Se contabilizan los días naturales desde la fecha de ingreso (1 de agosto de 2026) hasta el cierre del ejercicio anual (31 de diciembre de 2026), inclusive:

- **Agosto:** 31 días
- **Septiembre:** 30 días
- **Octubre:** 31 días
- **Noviembre:** 30 días
- **Diciembre:** 31 días
$$\text{Total de días trabajados} = 31 + 30 + 31 + 30 + 31 = 153\text{ días}$$
(Nota: 2026 no es año bisiesto, por lo que el año calendario tiene 365 días).

**2. Cálculo de los días proporcionales de aguinaldo**
Con el mínimo de ley de **15 días** de aguinaldo por un año completo (365 días), se obtiene la parte proporcional correspondiente a los 153 días laborados:

$$\text{Días proporcionales} = \left(\frac{15\text{ días de aguinaldo}}{365\text{ días del año}}\right) \times 153\text{ días trabajados}$$
$$\text{Días proporcionales} = 0.0410958904 \times 153 = 6.28767123\text{ días}$$
**3. Cálculo del monto bruto a pagar**
Se multiplican los días proporcionales de aguinaldo por el salario diario bruto (**$600.00 MXN**):

$$\text{Aguinaldo bruto} = 6.28767123\text{ días} \times \$600.00\text{ MXN} = \$3,772.60274\text{ MXN}$$
Redondeando a dos decimales conforme a la moneda nacional:

**El aguinaldo proporcional bruto que le corresponde exactamente es de $3,772.60 MXN.**

(Nota técnica: Si por alguna razón la empresa hiciera un corte estricto al 20 de diciembre —lo cual sería incorrecto si el empleado sigue activo hasta fin de año—, los días trabajados serían 142 y el monto sería de $3,501.37 MXN).


### Gemini — C02

- **Búsqueda web / código:** No evidenciado


A un trabajador en México con **2 años de antigüedad** cumplidos le corresponden **14 días laborables de vacaciones** y debe recibir **$1,750.00 MXN** exactos por concepto de prima vacacional mínima (adicionales a su sueldo ordinario).

**1. Días de vacaciones correspondientes**
De acuerdo con el **Artículo 76 de la Ley Federal del Trabajo (LFT)** (reforma de Vacaciones Dignas vigente desde 2023), el periodo mínimo arranca en 12 días al primer año y aumenta 2 días por cada año subsecuente hasta llegar a 20 días en el quinto año:

- **Año 1:** 12 días
- **Año 2:** **14 días**
(Nota: Según el artículo 78 de la LFT, el trabajador tiene derecho a disfrutar de al menos 12 de estos días de forma continua, o distribuirlos como mejor le convenga).

**2. Cálculo de la prima vacacional mínima**
El **Artículo 80 de la LFT** establece que los trabajadores tienen derecho a una prima no menor al **25%** sobre los salarios que les correspondan durante su periodo de vacaciones.

1. **Salario correspondiente a los días de vacaciones:**

$$14 \text{ días} \times \$500.00 \text{ MXN} = \$7,000.00 \text{ MXN}$$
1. **Prima vacacional mínima (25%):**

$$\$7,000.00 \text{ MXN} \times 0.25 = \$1,750.00 \text{ MXN}$$
| **Concepto** | **Fórmula / Base** | **Monto (MXN)** |
|---|---|---|
| **Salario diario** | Dato base | $500.00 |
| **Días de vacaciones (2 años)** | Art. 76 LFT | 14 días |
| **Sueldo ordinario del periodo** | $500 × 14 días | $7,000.00 |
| **Prima vacacional (25%)** | $7,000 × 25% | **$1,750.00** |

Este monto de **$1,750.00 MXN** es bruto (antes de impuestos), aunque en la práctica suele quedar libre de ISR debido a que la Ley del Impuesto Sobre la Renta exenta la prima vacacional hasta por el equivalente a 15 veces el valor diario de la UMA.


### Gemini — C03

- **Búsqueda web / código:** No evidenciado


De acuerdo con los artículos 66, 67 y 68 de la Ley Federal del Trabajo (LFT) en México, las horas extraordinarias tienen un límite legal de 3 horas diarias y no más de 3 veces a la semana (un tope de **9 horas semanales** que se pagan al doble). Cualquier tiempo que exceda ese límite semanal de 9 horas se paga al triple.

**Desglose de las 11 horas extra**
- **Horas pagadas al doble (100% más del salario ordinario):** **9 horas**
  - Valor por hora doble: $\$100 \times 2 = \$200\text{ MXN}$
  - Subtotal: $9 \times \$200 = \$1,800\text{ MXN}$
- **Horas pagadas al triple (200% más del salario ordinario):** **2 horas** (el excedente de las 9 horas semanales)
  - Valor por hora triple: $\$100 \times 3 = \$300\text{ MXN}$
  - Subtotal: $2 \times \$300 = \$600\text{ MXN}$
**Monto total a pagar**
$$\$1,800 + \$600 = \$2,400\text{ MXN}$$
(Nota: Este cálculo corresponde únicamente al concepto de tiempo extraordinario, adicional al salario ordinario normal de su semana laboral, y es antes de retenciones de ISR o cuotas aplicables).


### Gemini — C04

- **Búsqueda web / código:** No evidenciado


En el Régimen Simplificado de Confianza (RESICO) para personas físicas, la persona paga **$975.00 MXN** de ISR mensual y puede restar **$0.00 MXN** por la compra de la laptop para reducir ese ISR.

**Desglose exacto del cálculo (Artículo 113-E de la LISR)**
1. **Deducción para ISR ($0.00 MXN):** En RESICO, el ISR mensual se determina sobre la totalidad de los ingresos efectivamente cobrados (sin IVA) **"sin aplicar deducción alguna"**. Ni los gastos operativos ni las inversiones en activos fijos (como equipo de cómputo) disminuyen la base gravable del ISR.
1. **Base gravable de ISR:** **$65,000.00 MXN** (el subtotal cobrado en el mes).
1. **Tasa aplicable:** **$65,000.00 MXN** se ubica en el tercer rango de la tabla mensual (ingresos de $50,000.01 hasta $83,333.33 MXN), al que le corresponde una tasa fija directa del **1.50%**.
1. **ISR causado en el mes:**

$$\$65,000.00 \times 1.50\% = \$975.00\text{ MXN}$$
**Precisiones clave sobre el flujo del mes**
- **Retención de Personas Morales (si aplica):** Si las facturas cobradas (o una parte de ellas) se emitieron a personas morales, estas debieron retener el **1.25%** sobre el subtotal. Por ejemplo, si los $65,000.00 MXN completos provinieron de personas morales, la retención fue de **$812.50 MXN** ($$65,000 \times 1.25%$) y el pago neto directo al SAT sería únicamente la diferencia: **$162.50 MXN**.
- **Dónde sí impacta la laptop (IVA):** Aunque los $25,000.00 MXN no reducen el ISR, el **16% de IVA**pagado por la laptop (**$4,000.00 MXN**) sí es acreditable contra el IVA trasladado en las facturas cobradas ($65,000 \times 16\% = \$10,400.00\text{ MXN}$), reduciendo el pago mensual de IVA de **$10,400.00 MXN** a **$6,400.00 MXN** (siempre que exista CFDI con requisitos fiscales y pago bancarizado).


### Gemini — C05

- **Búsqueda web / código:** No evidenciado


El desglose exacto de una factura de honorarios profesionales emitida por una Persona Física en el Régimen Simplificado de Confianza (RESICO) a una Persona Moral en México, partiendo de un subtotal de **$20,000.00 MXN**, es el siguiente:

| **Concepto** | **Tasa aplicable** | **Monto (MXN)** | **Operación** |
|---|---|---|---|
| **Subtotal** | — | **$20,000.00** | Base gravable |
| **(+) IVA trasladado** | 16% | $3,200.00 | $\$20,000 \times 0.16$ |
| **(-) Retención de ISR** | 1.25% | -$250.00 | $\$20,000 \times 0.0125$ |
| **(-) Retención de IVA** | 10.6667% (2/3 partes del IVA) | -$2,133.33 | $\$3,200 \times \frac{2}{3}$ |
| **Total / Monto neto a recibir** | — | **$20,816.67** | $\$20,000 + \$3,200 - \$250 - \$2,133.33$ |

**Fundamento de las retenciones**
- **Retención de ISR (1.25%):** Conforme al artículo 113-J de la Ley del Impuesto Sobre la Renta (LISR),cuando una Persona Física en RESICO realiza actividades empresariales, profesionales u otorga el uso o goce temporal de bienes a una Persona Moral, esta última debe retener el **1.25%** sobre el monto de los pagos que les efectúen, sin considerar el IVA.
- **Retención de IVA (10.6667%):** De acuerdo con el artículo 1-A, fracción II, inciso a) de la Ley del Impuesto al Valor Agregado (LIVA), las Personas Morales que reciban servicios personales independientes de Personas Físicas están obligadas a retener las **dos terceras partes** del IVA trasladado (equivalente al $10.6667\%$ sobre el subtotal).
Nota: Si la operación se realiza en la Región Fronteriza Norte o Sur y se cumple con los requisitos del decreto de estímulos fiscales para aplicar la tasa reducida de IVA al 8%, el IVA trasladado sería de $1,600.00 MXN y su retención (2/3 partes) de $1,066.67 MXN, resultando en un neto de $20,283.33 MXN.


### Gemini — C06

- **Búsqueda web / código:** No evidenciado


Para calcular la liquidación exacta conforme a la Ley Federal del Trabajo (LFT) en 2026, se aplican las reglas vigentes para la Zona del Salario Mínimo General (donde se ubica la Ciudad de México) y los topes legales establecidos por la ley:

**1. Datos base de referencia (2026)**
- **Salario Diario Integrado (SDI) del trabajador:** $\$800.00\text{ MXN}$
- **Antigüedad:** $3\text{ años}$ completos
- **Salario Mínimo General (SMG) 2026:** $\$315.04\text{ MXN}$ diarios
- **Tope legal para prima de antigüedad (2 SMG):** $\$315.04 \times 2 = \$630.08\text{ MXN}$ diarios (Artículos 162, fracción II, 485 y 486 de la LFT).
**2. Cálculo desglosado**
**A. Indemnización Constitucional (3 meses)**
De acuerdo con los artículos 48 y 89 de la LFT, la indemnización constitucional equivale a **90 días** calculados con base en el Salario Diario Integrado:

$$\text{Indemnización Constitucional} = \$800.00 \times 90\text{ días} = \$72,000.00\text{ MXN}$$
**B. Prima de Antigüedad (12 días por año)**
Conforme al artículo 162 de la LFT, en caso de despido injustificado corresponde el pago de 12 días de salario por cada año de servicios prestados, sin importar si el trabajador cumplió o no los 15 años de antigüedad.

Sin embargo, el artículo 486 de la LFT establece un tope máximo: si el salario del trabajador excede el doble del salario mínimo de su zona geográfica, se tomará como base el doble del salario mínimo. Dado que el salario del trabajador ($\$800.00\text{ MXN}$) supera el tope de 2 SMG ($\$630.08\text{ MXN}$), el cálculo se realiza sobre el tope legal:

- **Días totales:** $12\text{ días} \times 3\text{ años} = 36\text{ días}$
- **Cálculo:** $\$630.08 \times 36\text{ días} = \$22,682.88\text{ MXN}$
**3. Resumen de la liquidación**
| **Concepto** | **Base salarial diaria** | **Días** | **Monto total (MXN)** |
|---|---|---|---|
| **Indemnización Constitucional** | $\$800.00$ (SDI) | 90 | $\$72,000.00$ |
| **Prima de Antigüedad** | $\$630.08$ (Tope 2 SMG) | 36 | $\$22,682.88$ |
| **Suma Total Exacta** | — | — | **$\$94,682.88$** |

(Nota fiscal: De conformidad con el artículo 93, fracción XIII de la Ley del Impuesto Sobre la Renta, los ingresos por prima de antigüedad e indemnizaciones por separación tienen una exención de hasta 90 UMAs por cada año de servicio; cualquier excedente sobre dicho límite estará sujeto a la retención de ISR correspondiente).


---

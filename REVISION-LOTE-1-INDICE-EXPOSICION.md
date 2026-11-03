# Lote 1 — borrador de calificaciones para revisión de Jorge

Estado: BORRADOR. Nada se ha publicado ni cambiado en el sitio. Fecha: 2026-11-03.

## Cómo leer esto

- **E / A / C** son calificaciones de 0 a 4 por actividad (rúbrica en `ESPECIFICACION-INDICE-EXPOSICION.md`). Los totales E, A, C van de 0 a 100; la puntuación = 0.40·E + 0.35·A + 0.25·(100 − C).
- **Uso obs.** = cuántas tareas O\*NET de esa actividad aparecen con cobertura en los datos de uso de Claude (Anthropic Economic Index, `task_penetration.csv`, dataset con licencia CC-BY). **Una celda en 0 NO es evidencia de que la IA no pueda hacer la tarea**: significa que esos datos no la observan (solo cubren uso de Claude y excluyen tareas con poca muestra). Por eso solo la presencia cuenta como evidencia; la ausencia deja la calificación como *juicio editorial*.
- **AEI ocupación** = `observed_exposure` de Anthropic para esa ocupación (0–100). Es una referencia independiente de otra escala; no es mi puntuación ni debe coincidir con ella, pero sirve como control de coherencia.
- **Rango de sensibilidad:** la puntuación recalculada desplazando ±1 punto solo las actividades sin uso observado.

## Resumen

| Ocupación | E | A | C | Puntuación | Nivel | Rango de sensibilidad | AEI ocupación | Confianza |
|---|---|---|---|---|---|---|---|---|
| Desarrollo de software | 70 | 54 | 67 | **55** | Moderada | 49–62 | 29 | media |
| Análisis de datos | 74 | 47 | 69 | **54** | Moderada | 32–75 | 46 | baja |
| Contabilidad | 77 | 55 | 67 | **59** | Moderada | 50–67 | 35 | media |
| Captura de datos | 74 | 61 | 42 | **65** | Alta | 43–84 | 67 | media (base de solo 9 tareas) |
| Atención al cliente (centro de contacto) | 81 | 72 | 60 | **68** | Alta | 60–75 | 70 | media-alta (base de 13 tareas) |

## Detalle por ocupación

### Desarrollo de software (O\*NET 15-1252.00)

| Actividad | Peso | E | A | C | Uso obs. |
|---|---|---|---|---|---|
| Analizar requisitos y viabilidad | 24% | 3 | 3 | 3 | 2/4 |
| Diseñar y modificar software | 12% | 4 | 3 | 2 | 1/2 |
| Probar, validar y documentar | 6% | 4 | 3 | 2 | 0/1 |
| Manipular y consultar datos del sistema | 6% | 4 | 3 | 1 | 1/1 |
| Preparar reportes y correspondencia técnica | 6% | 4 | 3 | 2 | 1/1 |
| Coordinar con equipos, clientes y gerentes | 23% | 2 | 1 | 3 | 1/4 |
| Monitorear sistemas en operación | 7% | 3 | 2 | 2 | 0/1 |
| Supervisar y asignar trabajo a personal técnico | 11% | 1 | 1 | 4 | 0/2 |
| Capacitar a usuarios | 5% | 2 | 1 | 3 | 0/1 |

### Análisis de datos (O\*NET 15-2051.00)

| Actividad | Peso | E | A | C | Uso obs. |
|---|---|---|---|---|---|
| Limpiar y procesar grandes conjuntos de datos | 14% | 4 | 2 | 2 | 0/2 |
| Construir, comparar y validar modelos | 20% | 3 | 2 | 2 | 0/3 |
| Programar funciones y aplicaciones de análisis | 6% | 4 | 3 | 2 | 0/1 |
| Visualizar y presentar resultados | 14% | 3 | 2 | 3 | 0/2 |
| Definir problemas de negocio y recomendar soluciones | 25% | 2 | 1 | 4 | 0/4 |
| Identificar relaciones y tendencias | 6% | 3 | 3 | 2 | 1/1 |
| Diseñar encuestas y muestreo | 10% | 3 | 2 | 3 | 0/2 |
| Mantenerse al día con la investigación | 6% | 3 | 2 | 2 | 0/1 |

### Contabilidad (O\*NET 13-2011.00)

| Actividad | Peso | E | A | C | Uso obs. |
|---|---|---|---|---|---|
| Preparar y analizar registros y estados financieros | 18% | 4 | 3 | 2 | 2/5 |
| Conciliar cuentas y procesar facturas | 14% | 4 | 3 | 1 | 0/4 |
| Calcular impuestos y preparar declaraciones | 10% | 3 | 2 | 3 | 0/3 |
| Auditar controles, detectar fraude e informar hallazgos | 29% | 3 | 2 | 3 | 3/9 |
| Elaborar presupuestos, proyecciones y reportes a gerencia | 10% | 3 | 2 | 3 | 1/3 |
| Desarrollar y documentar sistemas contables | 3% | 3 | 3 | 2 | 1/1 |
| Asesorar, representar y consultar con clientes y autoridades | 9% | 2 | 1 | 4 | 0/3 |
| Dirigir personal y supervisar auditorías | 6% | 1 | 1 | 4 | 0/2 |

### Captura de datos (O\*NET 43-9021.00)

| Actividad | Peso | E | A | C | Uso obs. |
|---|---|---|---|---|---|
| Leer documentos fuente e ingresar datos | 12% | 4 | 4 | 1 | 1/1 |
| Verificar y corregir errores de captura | 37% | 4 | 3 | 1 | 0/3 |
| Archivar, llevar registros y preparar materiales | 34% | 2 | 2 | 2 | 0/3 |
| Operar equipo y resolver mensajes ilegibles | 18% | 2 | 1 | 3 | 0/2 |

### Atención al cliente (centro de contacto) (O\*NET 43-4051.00)

| Actividad | Peso | E | A | C | Uso obs. |
|---|---|---|---|---|---|
| Atender consultas y tomar pedidos | 17% | 4 | 4 | 2 | 2/2 |
| Registrar interacciones y reclamos | 9% | 4 | 4 | 1 | 1/1 |
| Resolver quejas de servicio y facturación | 29% | 3 | 3 | 3 | 1/4 |
| Verificar la resolución y dar seguimiento | 8% | 3 | 2 | 2 | 0/1 |
| Cobros, cargos y formularios de contrato | 16% | 3 | 2 | 2 | 0/2 |
| Escalar reclamaciones no resueltas | 8% | 3 | 3 | 3 | 1/1 |
| Ofrecer servicios adicionales | 7% | 3 | 3 | 3 | 1/1 |
| Proponer mejoras de procesos | 6% | 3 | 1 | 3 | 0/1 |

## Qué necesito que revises

1. **Análisis de datos no está listo para publicarse.** Ninguna de sus 8 actividades tiene uso observado en los datos por tarea, aunque la medición por ocupación de Anthropic es 46. Los dos archivos no se reconcilian y la documentación pública no lo explica. Su rango (32–75) cruza tres niveles. Propongo dejarlo como "evidencia pendiente" o reemplazarlo por una reserva hasta resolverlo.
2. **Las calificaciones sin uso observado son mi juicio editorial.** En este lote son la mayoría de las actividades de gestión, coordinación, auditoría y asesoría; las marcaré en la ficha como "Sin evidencia directa". Dime si alguna te parece mal calibrada.
3. **Contabilidad queda en 59, a un punto de "Alta".** El rango llega a 67. Propongo mostrarla como "Moderada (límite con Alta)".
4. **La fórmula comprime la escala.** Con C promedio cercano a 65, el término `25·(100−C)` aporta apenas ~9 puntos, así que es difícil superar 80 aun en las ocupaciones más expuestas. Es consecuencia de los pesos aprobados, no un error; pero los niveles "Muy alta" y "Muy baja" quedarán casi vacíos. Decide si lo aceptamos o se ajustan los cortes.
5. **Los títulos de actividad están en español y las tareas O\*NET originales están en inglés.** Antes de publicar adapto cada texto de actividad al contexto hispanohablante y brasileño.

## Fuentes usadas en este lote

- O\*NET 31.0 (Task Statements y Task Ratings), CC BY 4.0: https://www.onetcenter.org/database.html
- Anthropic Economic Index, dataset `Anthropic/EconomicIndex` (`labor_market_impacts/task_penetration.csv`, `job_exposure.csv`): https://huggingface.co/datasets/Anthropic/EconomicIndex
- Anthropic, *Labor market impacts*: https://www.anthropic.com/research/labor-market-impacts
- Microsoft Research, *Working with AI* (arXiv 2507.07935): https://arxiv.org/abs/2507.07935 (puntajes por grupo ocupacional, mapeo mío)
- OIT/NASK, WP 140 (2025), DOI 10.54394/HETP0387 (solo resultados generales verificados)

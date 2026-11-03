# Lote 4 y anclaje de capacidad — borrador para revisión de Jorge

Estado: BORRADOR. Nada se ha publicado ni cambiado en el sitio. Fecha: 2026-11-03. Cubre las 4 ocupaciones del lote 4 y la comparación de mi calificación de capacidad (E) contra una fuente publicada para las 20 calificadas hasta ahora.

## Lote 4

| Ocupación | E | A | C | Puntuación | Nivel | Rango | AEI ocupación | Uso obs. | Confianza |
|---|---|---|---|---|---|---|---|---|---|
| Planeación logística | 73 | 51 | 79 | **52** | Moderada | 38–67 | 16 | 2/22 | media-baja |
| Conducción de transporte de carga | 32 | 27 | 84 | **26** | Baja | 12–51 | 0 | 0/29 | media |
| Electricista | 26 | 18 | 92 | **19** | Muy baja | 8–44 | 0 | 0/21 | media |
| Soldadura | 11 | 24 | 93 | **15** | Muy baja | 4–40 | 0 | 0/30 | media |

Nota sobre los rangos de electricista y soldadura (8–44 y 4–40): vienen de desplazar +1 las actividades sin uso observado, que aquí son casi todas físicas. Con E y A en cero, el efecto de un punto es desproporcionado. La puntuación base (19 y 15) es consistente con los tres indicadores independientes (Eloundou 15 y 4; Anthropic 0 y 0).

## Anclaje de la capacidad (E) a una fuente publicada

Fuente: Eloundou et al. (OpenAI y Universidad de Pensilvania, 2023), `occ_level.csv`, licencia MIT. La columna β es el porcentaje de tareas con exposición directa más la mitad de las de exposición con herramientas adicionales. Se muestran la calificación de anotadores humanos y la de GPT-4. **Es capacidad demostrada con modelos de 2023, de un laboratorio con interés comercial, y no mide adopción ni sustitución.**

Regla propuesta: mi E de ocupación no puede superar el promedio de las dos β más 20 puntos (el margen reconoce los tres años de avance de capacidad desde 2023). Si lo supera, se reduce hasta el tope.

| Ocupación | Mi E | β humana | β GPT-4 | Tope | ¿Aplica? | Puntuación base | Con tope | Nivel |
|---|---|---|---|---|---|---|---|---|
| Atención al cliente (centro de contacto) | 81 | 70 | 57 | 84 | no | 68 | 68 | Alta |
| Marketing digital e investigación de mercado | 85 | 58 | 50 | 74 | sí | 67 | 62 | Alta |
| Captura de datos | 74 | 50 | 89 | 90 | no | 65 | 65 | Alta |
| Redacción (escritores y autores) | 84 | 81 | 87 | 104 | no | 63 | 63 | Alta |
| Contabilidad | 77 | 52 | 56 | 74 | sí | 59 | 57 | Moderada |
| Traducción e interpretación | 74 | 84 | 88 | 106 | no | 56 | 56 | Moderada |
| Desarrollo de software | 70 | 45 | 87 | 86 | no | 55 | 55 | Moderada |
| Análisis de datos | 74 | 59 | 75 | 87 | no | 54 | 54 | Moderada |
| Planeación logística | 73 | 45 | 50 | 68 | sí | 52 | 50 | Moderada |
| Periodismo (reporteros y analistas de noticias) | 63 | 63 | 65 | 84 | no | 47 | 47 | Moderada |
| Docencia de secundaria | 65 | 34 | 33 | 54 | sí | 45 | 41 | Moderada |
| Diseño arquitectónico y modelado BIM | 62 | 43 | 49 | 66 | no | 45 | 45 | Moderada |
| Ingeniería civil (supervisión de obra) | 61 | 38 | 45 | 61 | no | 44 | 44 | Moderada |
| Radiología | 62 | 51 | 49 | 70 | no | 43 | 43 | Moderada |
| Abogacía | 59 | 48 | 43 | 65 | no | 39 | 39 | Baja |
| Psicología clínica | 54 | 51 | 37 | 64 | no | 36 | 36 | Baja |
| Enfermería general | 47 | 38 | 33 | 56 | no | 31 | 31 | Baja |
| Conducción de transporte de carga | 32 | 17 | 28 | 43 | no | 26 | 26 | Baja |
| Electricista | 26 | 15 | 15 | 35 | no | 19 | 19 | Muy baja |
| Soldadura | 11 | 4 | 9 | 26 | no | 15 | 15 | Muy baja |

**Resultado:** el tope solo afecta a 4 ocupaciones (marketing, contabilidad, logística y docencia) y **no cambia ningún nivel**. Marketing baja de 67 a 62, docencia de 45 a 41. Es decir, los niveles de las 20 son robustos a este ajuste; el anclaje sirve sobre todo para poder citar una fuente de capacidad por ocupación en cada ficha.

## Cómo queda la distribución (con la regla)

- Muy alta: 0 · Alta: 4 (atención al cliente, marketing, captura de datos, redacción) · Moderada: 10 · Baja: 4 (abogacía, psicología, enfermería, conducción de carga) · Muy baja: 2 (electricista, soldadura).
- El objetivo de reparto era ≈8 altas, ≈8 moderadas y ≈4 bajas. Los datos no lo sostienen: sale concentrado en Moderada y sin ninguna "Muy alta". Es coherente con el tono no alarmista, pero la página tendrá menos contraste del esperado. No lo forcé.

## Qué necesito que decidas

1. **¿Apruebas la regla del tope** (promedio de β + 20) como parte de la metodología? Cambia poco, pero deja una justificación publicable.
2. **Catálogo:** hay 20 ocupaciones calificadas (16 de los lotes 1 a 3 más las 4 de este lote), con Redacción y Periodismo separadas y Abogacía en una sola ficha. Sin "Investigación científica" (sin campo definido) y con Análisis de datos aún con evidencia de uso inconsistente. Dime si calificamos la reserva (diseño gráfico, medicina general, ventas técnicas u operación de maquinaria) para tener margen, o si dejamos investigación científica acotada a un campo.
3. **El hallazgo de Análisis de datos persiste:** mi puntuación (54) y la β de Eloundou (59 y 75) apuntan en la misma dirección que la medición por ocupación de Anthropic (46), pero los datos por tarea de Anthropic no. La evidencia combinada ahora es razonable; propongo conservarla con confianza media y la nota correspondiente.

## Fuentes nuevas

- Eloundou et al., *GPTs are GPTs*, repositorio `openai/GPTs-are-GPTs` (licencia MIT): https://github.com/openai/GPTs-are-GPTs · artículo: https://arxiv.org/abs/2303.10130

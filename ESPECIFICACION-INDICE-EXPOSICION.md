# Índice de Exposición Laboral a la IA · glitchMentalMX — Especificación de Fase 0

Estado: BORRADOR para aprobación de Jorge. Ningún archivo del sitio ha sido modificado.
Fecha: 2026-11-03.

Nombre público propuesto: **Índice de Exposición Laboral a la IA · glitchMentalMX**
URL propuesta: `/indice-exposicion-laboral-ia/` (no colisiona con `/indice-glitchmentalmx/`, que es el ranking mensual de adopción B2B).

## 1. Decisiones ya aprobadas (no se reabren)

- Catálogo semilla de **20 ocupaciones** (sección 9), con reservas si alguna no pasa el filtro de evidencia.
- Fórmula: `Puntuación = 0.40·E + 0.35·A + 0.25·(100 − C)` (sección 4).
- Califica Claude; Jorge revisa y aprueba antes de publicar. La página lo dice.
- Buzón de sugerencias: mismo componente que `ReportarDato`, **con correo opcional** y su leyenda.
- Puntuación común (basada en tareas). Geografía solo agrega un bloque de contexto. Contexto nacional completo solo para México al lanzar; España, Brasil y resto de LATAM aparecen como "cobertura pendiente" explicada.
- Sin ordenar por puntuación; sin rojos; exposición ≠ sustitución junto a cada resultado.
- **Recalibración de la calculadora** inmediatamente después de que Jorge apruebe los resultados del índice y **antes de producción**, para que ambas herramientas salgan sin contradicciones (sección 11).
- Elemento "sublime": cada tarea muestra el tipo de evidencia que la respalda (sección 5).

## 2. Unidad de análisis y base de tareas

- Unidad: ocupación específica = conjunto de tareas.
- **Base de tareas: O\*NET** (tareas por ocupación, con importancia y relevancia; licencia CC BY 4.0; en inglés, EE. UU.). Las tareas se traducen y se adaptan editorialmente; se descartan o reformulan las que no apliquen al contexto hispanohablante o brasileño.
- **ESCO** aporta nombres de ocupación en español y portugués y su anclaje a ISCO-08; no es una lista de tareas (describe habilidades y conocimientos), y no se usa como tal.
- **SINCO 2019 (INEGI)** aporta la denominación mexicana. **CBO 2002** (Brasil) y la clasificación española se usan para denominaciones. No se encontró tabla oficial publicada de equivalencia SINCO↔CIUO-08, por lo que la correspondencia se hace ocupación por ocupación y se documenta en cada ficha como "correspondencia editorial".
- Si dos especialidades comparten esencialmente las mismas tareas, se agrupan en una sola ficha.

## 3. Rúbrica por tarea

Cada tarea recibe tres calificaciones de 0 a 4, cada una con su evidencia citada.

**E — Exposición (capacidad).** ¿Puede la IA generativa actual realizar o asistir esta tarea?
0 no aplica · 1 asistencia marginal · 2 asiste partes relevantes · 3 asiste la mayor parte con revisión humana · 4 puede ejecutarla de punta a punta en demostraciones o benchmarks.

**A — Automatización actual (despliegue).** ¿Existen herramientas comerciales desplegadas que ya la hagan de forma fiable hoy?
0 ninguna · 1 prototipos o pilotos · 2 herramientas disponibles con uso minoritario · 3 uso extendido con supervisión · 4 uso extendido y mayormente autónomo.
Es distinta de E: E es lo que el modelo puede hacer; A es lo que ya está desplegado.

**C — Complementariedad humana.** ¿Cuánto exige la tarea juicio, presencia física, responsabilidad legal o vínculo de confianza?
0 nada · 1 poco · 2 moderado · 3 alto · 4 es esencialmente humana en el contexto actual.
C **modera** la exposición: entra invertida en la fórmula.

**Ponderación de tareas:** por importancia O\*NET normalizada; si una tarea no tiene dato, peso igual. Cada dimensión de la ocupación = Σ(peso · calificación/4) · 100.

**Calculado por código, no a mano:** el JSON de cada ficha guarda solo calificaciones y evidencias; `src/lib/exposicion.ts` calcula E, A, C y la puntuación. Nadie ajusta un número final.

**Sensibilidad:** el código recalcula con cada calificación de baja confianza desplazada ±1. Si el rango cruza un límite de nivel, la ficha lo dice ("límite entre Alta y Moderada"). Cada ficha lleva además "confianza de la evidencia": alta / media / baja.

## 4. Fórmula y niveles

`Puntuación = 0.40·E + 0.35·A + 0.25·(100 − C)`, redondeada a entero, escala 0–100.
Límite conocido: una ocupación sin tareas exponibles y sin complementariedad humana recibiría 25 puntos; caso que en la práctica no ocurre y que se vigila en las pruebas.

Niveles: 80–100 Muy alta · 60–79 Alta · 40–59 Moderada · 20–39 Baja · 0–19 Muy baja.
Visual: escala de un solo matiz de la paleta del sitio (sin rojo, sin semáforo). Junto a cada puntuación: "Exposición no es sustitución. Esto es un índice compuesto, no una probabilidad de desempleo."

## 5. Tipo de evidencia por tarea (elemento diferenciador)

Cada tarea muestra insignias, no interpretaciones:
- **Capacidad demostrada**: benchmark o estudio técnico (OpenAI, Anthropic, Google, académico).
- **Uso observado**: datos de uso real (Anthropic Economic Index, Microsoft Copilot, encuestas).
- **Adopción empresarial**: estudios de implementación o datos laborales verificables.
- **Sin evidencia directa**: juicio editorial fundado en tareas análogas; se marca y baja la confianza.

Esto hace visible la distinción capacidad / exposición / adopción / sustitución.

## 6. Fuentes verificadas (búsqueda del 2026-11-03)

| Fuente | Qué aporta | Salvedad |
|---|---|---|
| OIT / NASK, *Generative AI and Jobs: A Refined Global Index of Occupational Exposure* (WP 140, mayo 2025) | Exposición ocupacional global; ocupaciones administrativas lideran; ~30,000 tareas y 50,000 evaluaciones humanas | Mide potencial, no pérdida de empleo |
| Microsoft Research, *Working with AI* (arXiv 2507.07935) | Puntaje de aplicabilidad por ocupación a partir de 200,000 conversaciones de Copilot | Solo uso en Copilot; no mide impactos posteriores |
| Anthropic Economic Index | Uso real de Claude por tarea; reparto automatización/aumento | Solo Claude.ai; sesgo hacia código; verificar el informe vigente |
| Eloundou et al., *GPTs are GPTs* (2023, OpenAI/UPenn) | Marco de exposición por tarea | Preimpresión de 2023; modelos de entonces; autores de OpenAI |
| O\*NET (onetcenter.org) | Tareas, importancia y relevancia por ocupación | EE. UU.; licencia CC BY 4.0 |
| ESCO (Comisión Europea) | Ocupaciones y habilidades en ES/PT; anclaje ISCO-08 | No incluye listas de tareas |
| SINCO 2019 (INEGI), CBO 2002 (Brasil) | Denominaciones locales | Sin tabla oficial SINCO↔CIUO-08 encontrada |

Pendientes de verificar al capturar cada ficha: reporte vigente del Anthropic Economic Index, publicaciones de Google/DeepMind y OpenAI aplicables, OCDE, WEF, Observatorio Laboral de México e IMCO. Ninguna cifra se cita sin enlace verificado.

Regla de lectura crítica: un estudio de un laboratorio demuestra capacidad, no sustitución; se etiqueta como "capacidad demostrada" y nunca como "uso observado" o "adopción".

## 7. Cobertura geográfica

- Capacidad tecnológica: evidencia global. Actividades: base común. Mercado y regulación: contexto del país.
- Niveles: **Nacional** (evidencia suficiente en un país), **Regional** (evidencia regional sin diferenciación nacional), **Pendiente** (sin evidencia suficiente; se explica por qué).
- Lanzamiento: México = Nacional para las ocupaciones con datos verificados (SINCO/ENOE, Observatorio Laboral, IMCO); resto = Pendiente salvo evidencia concreta. No se fabrican puntuaciones nacionales.

## 8. Esquema de ficha (JSON por ocupación)

```
slug, nombre{es,pt}, sector, codigos{onet, isco08, sinco?, cbo?}, correspondencia_nota,
tareas[ { id, texto, peso, E, A, C, evidencia[ {tipo, fuente, url, fecha, nota} ], confianza } ],
oportunidades[ texto ], contexto{ mx, es, br, latam: {nivel, texto?, fuentes[]} },
revision{ fecha, revisado_por }, cobertura
```

Cada ficha muestra: nombre, contexto geográfico, puntuación, nivel, qué puede hacer o asistir la IA, qué requiere capacidades humanas, oportunidades de transformación, fuentes. Textos concretos por ocupación, sin frases intercambiables.

**Criterio de "evidencia suficiente" para publicar una ficha (corregido 2026-11-03, aprobado por Jorge):** al menos 8 tareas O\*NET calificadas; exposición (E) y automatización (A) con evidencia citada: E anclada a una fuente de capacidad por ocupación (Eloundou et al., con el tope) y A con la proporción del peso que tiene uso observado, mostrada en la ficha como "cobertura de evidencia"; la complementariedad humana (C) se declara explícitamente como juicio editorial, porque no existe una fuente que la mida; al menos dos fuentes de grupos distintos (laboral/ocupacional, tecnológica, adopción); revisión de Jorge. Si no cumple, pasa a "pendiente" con explicación. Motivo del cambio: el criterio original (70% del peso con evidencia en cada dimensión) era imposible para C y para A en oficios físicos, donde la ausencia de uso observado no prueba nada.

## 9. Catálogo semilla (20) y reservas

Códigos provisionales; se verifican contra las tablas oficiales al capturar cada ficha.

| Sector | Ocupación | O\*NET-SOC (prov.) | ISCO-08 (prov.) | Hipótesis* |
|---|---|---|---|---|
| Salud | Radiología | 29-1224.00 | 2212 | Media |
| Salud | Enfermería general | 29-1141.00 | 2221 | Baja |
| Ing. y arq. | Diseño arquitectónico y BIM | 17-1011.00 | 2161 | Media |
| Ing. y arq. | Ingeniería civil (supervisión de obra) | 17-2051.00 | 2142 | Baja |
| Derecho y c. sociales | Abogacía | 23-1011.00 | 2611 | Alta |
| Derecho y c. sociales | Psicología clínica | 19-3033.00 | 2634 | Media |
| Educación e inv. | Docencia de secundaria | 25-2031.00 | 2330 | Media |
| Educación e inv. | Investigación científica (campo por definir)** | por definir | por definir | Media |
| Tecnología | Desarrollo de software | 15-1252.00 | 2512 | Alta |
| Tecnología | Análisis de datos | 15-2051.00 | por confirmar | Alta |
| Admin. y finanzas | Contabilidad | 13-2011.00 | 2411 | Alta |
| Admin. y finanzas | Asistencia administrativa y captura de datos | 43-9021.00 | 4132 | Alta |
| Comunicación | Traducción e interpretación | 27-3091.00 | 2643 | Alta |
| Comunicación | Redacción y periodismo | 27-3023.00 / 27-3043.00 | 2641 / 2642 | Alta |
| Comercio y mkt | Atención al cliente (centro de contacto) | 43-4051.00 | 4222 | Alta |
| Comercio y mkt | Marketing digital | 13-1161.00 | 2431 | Media |
| Transporte y log. | Planeación logística | 13-1081.00 | por confirmar | Media |
| Transporte y log. | Conducción de transporte de carga | 53-3032.00 | 8332 | Baja |
| Manufactura y oficios | Electricista | 47-2111.00 | 7411 | Baja |
| Manufactura y oficios | Soldadura | 51-4121.00 | 7212 | Baja |

\* Hipótesis de trabajo, NO resultados: la puntuación real sale de la rúbrica. Si el resultado contradice la hipótesis, manda el resultado.
\** "Investigación científica" es demasiado amplia; se acota a un campo concreto (p. ej. ciencias biológicas) o se reemplaza por una reserva.

Reservas: diseño gráfico, medicina general, ventas técnicas, operación de maquinaria.
Reparto objetivo: ≈8 alta/muy alta, ≈8 moderada, ≈4 baja (para no leerse como alarma y mostrar contraste).

## 10. Estructura mínima de archivos (propuesta)

- `src/pages/indice-exposicion-laboral-ia/index.astro` — portada, buscador, categorías, metodología, insight, fecha, buzón, enlaces.
- `src/pages/indice-exposicion-laboral-ia/[slug].astro` — ficha por ocupación con URL propia (**decisión pendiente**, ver 12).
- `src/data/exposicion-laboral/ocupaciones/*.json` — una ficha por archivo.
- `src/data/exposicion-laboral/edicion.json` — fecha, periodicidad, alcance, insight, registro de cambios.
- `src/lib/exposicion.ts` — fórmula, niveles, sensibilidad.
- `src/components/ReportarDato.astro` — se parametriza (textos, `pagina`); sin duplicar.
- Worker `glitchmental-reporte`: se reutiliza; el campo `pagina` distingue sugerencias de profesión. Sin servicios nuevos.
- No se tocan otras páginas, salvo la calculadora (sección 11) y los enlaces entrantes aprobados.

## 11. Recalibración de la calculadora (antes de producción)

Hallazgo: la calculadora usa cifras fijas por área, escritas a mano (`GMR_AREA`), con niveles Bajo/Moderado/Alto/Crítico en rojo y textos sobre "reducción de plantillas". Choca con el índice en al menos transporte (80 vs hipótesis baja), manufactura (75), datos (35) y psicología (18).

Plan, ejecutado después de la aprobación de Jorge y antes de publicar:
1. Tabla de correspondencia área-calculadora → ocupaciones del índice. Para áreas con una o varias ocupaciones en el índice, `risk` = puntuación del índice (media simple si hay varias, documentado).
2. Áreas sin ocupación en el índice (ciberseguridad, DevOps, RR. HH., UX, audiovisual, música, farma, consultoría, coaching, agricultura, entre otras) no generan contradicción directa, pero su cifra es heurística. Se marca la diferencia de método en la nota de la calculadora; ampliarlas es trabajo de ediciones futuras.
3. Vocabulario y colores de niveles de la calculadora alineados con los del índice (Muy baja…Muy alta, matiz único) y retiro del lenguaje que presente como hecho "reducciones de plantilla" o "pilotos de sustitución" sin fuente.
4. Los ajustes por región, estudios y experiencia de la calculadora se mantienen como lo que son (personalización orientativa), y se explica: el índice mide la ocupación; la calculadora ajusta por perfil.
5. Enlaces bidireccionales y nota breve en la calculadora y en cada ficha donde haya traslape.
6. Comprobación automática: un script que verifique que, para cada área mapeada, la cifra de la calculadora == la del índice.

## 12. Decisiones pendientes de Jorge

1. ¿Ficha por ocupación con URL propia (`/indice-exposicion-laboral-ia/<slug>/`)? Recomendado: sí (indexable y compartible, coherente con Dato Incómodo e Insights Visuales). Si no, las fichas se muestran dentro de la misma página.
2. Permiso para descargar la base O\*NET (formato texto, ~decenas de MB, onetcenter.org, licencia CC BY 4.0) a una carpeta temporal fuera del repositorio, para extraer tareas e importancia de las 20 ocupaciones.
3. Nombre público y URL propuestos (arriba).
4. Alcance de la recalibración de la sección 11, punto 3 (vocabulario y textos de la calculadora, además de las cifras).

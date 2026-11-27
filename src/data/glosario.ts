// Glosario de glitchMentalMX. Cada definición resume lo que el propio sitio ya
// dice en la página o el artículo al que enlaza (campo `enlaces`): no se agregan
// definiciones que no estén respaldadas ahí. No lleva cifras fijas a propósito
// (cuántas profesiones, cuántas tecnologías): esas cambian y viven en cada página.
export interface TerminoGlosario {
  id: string;
  termino: string;
  definicion: string;
  enlaces: Array<{ href: string; texto: string }>;
}

export const MARCOS_DEL_SITIO: TerminoGlosario[] = [
  {
    id: 'dato-incomodo',
    termino: 'Dato Incómodo',
    definicion:
      'Sección de glitchMentalMX que publica un dato duro por pieza, «lo que no te conviene saber… publicado de todas formas». Cada pieza tiene su propia URL y sus fuentes.',
    enlaces: [{ href: '/dato-incomodo/', texto: 'Ver Dato Incómodo' }],
  },
  {
    id: 'detox-de-ia',
    termino: 'Detox de IA',
    definicion:
      'Test breve de autoevaluación sobre hábitos de uso de IA, con fuentes citadas. No es un diagnóstico.',
    enlaces: [{ href: '/detox-de-ia/', texto: 'Hacer el test' }],
  },
  {
    id: 'exposicion-laboral',
    termino: 'Exposición laboral a la IA',
    definicion:
      'Medida de qué partes de una profesión son actividades donde la IA puede intervenir. Exposición no significa sustitución: no es una probabilidad de perder el empleo ni dice que la persona vaya a ser reemplazada.',
    enlaces: [{ href: '/indice-exposicion-laboral-ia/', texto: 'Índice de Exposición Laboral a la IA' }],
  },
  {
    id: 'ia-sin-letra-chiquita',
    termino: 'IA sin letra chiquita',
    definicion:
      'Conjunto de series de referencia, verificadas una por una en la fuente oficial de cada herramienta: cuánto cuesta, qué hace con tus datos, si pide tarjeta para probarla, si su código de descuento es real y si tiene oferta para estudiantes que aplique en México.',
    enlaces: [{ href: '/ia-sin-letra-chiquita/', texto: 'Ver las series' }],
  },
  {
    id: 'impacto-y-negocios',
    termino: 'Impacto y Negocios',
    definicion:
      'Sección de análisis sobre quién paga, quién se beneficia y dónde está el riesgo sistémico de la tecnología que cambia la infraestructura y los mercados. Es una sección sin patrocinio.',
    enlaces: [{ href: '/impacto-y-negocios/', texto: 'Ver Impacto y Negocios' }],
  },
  {
    id: 'indice-glitchmentalmx',
    termino: 'Índice glitchMentalMX',
    definicion:
      'Ranking mensual de tecnologías de IA para empresas, ordenado por adopción real, integración operativa y señales públicas verificables, sin patrocinadores.',
    enlaces: [{ href: '/indice-glitchmentalmx/', texto: 'Ver el Índice' }],
  },
  {
    id: 'insights-visuales',
    termino: 'Insights Visuales',
    definicion:
      'Microcolumna visual sobre tecnología y cultura digital: una imagen, una idea y un enlace a lecturas relacionadas.',
    enlaces: [{ href: '/insights-visuales/', texto: 'Ver Insights Visuales' }],
  },
  {
    id: 'laboratorio',
    termino: 'Laboratorio',
    definicion:
      'Sección de experimentos con IA que declara su muestra, sus límites y su conflicto de interés. Cada experimento publica su CSV abierto bajo licencia CC BY 4.0.',
    enlaces: [
      { href: '/laboratorio/', texto: 'Ver el Laboratorio' },
      { href: '/laboratorio/metodologia/', texto: 'Metodología' },
    ],
  },
  {
    id: 'manual-del-caos-digital',
    termino: 'Manual del Caos Digital',
    definicion: 'Ensayo mensual de glitchMentalMX sobre tecnología y cultura digital para suscriptores.',
    enlaces: [{ href: '/suscribete/', texto: 'Suscribirse' }],
  },
  {
    id: 'paga-gana-riesgo',
    termino: 'Paga / Gana / Riesgo',
    definicion:
      'Resumen de tres líneas que acompaña a cada análisis de Impacto y Negocios: quién paga, quién se beneficia y dónde está el riesgo.',
    enlaces: [{ href: '/impacto-y-negocios/', texto: 'Ver ejemplos' }],
  },
  {
    id: 'tipo-de-cambio-fix',
    termino: 'Tipo de cambio FIX de Banxico',
    definicion:
      'Tipo de cambio que el Banco de México determina y publica cada día hábil. glitchMentalMX lo usa para convertir a pesos mexicanos los precios de herramientas que se cobran en dólares, y muestra la fecha del dato en cada ficha.',
    enlaces: [
      { href: '/precios-ia/', texto: 'Precios de IA' },
      { href: '/politica-editorial/', texto: 'Cómo verificamos los datos' },
    ],
  },
];

export const CONCEPTOS_DE_IA: TerminoGlosario[] = [
  {
    id: 'aduloneria',
    termino: 'Adulonería (sycophancy)',
    definicion:
      'Cuando un modelo de IA valida por complacencia una premisa falsa del usuario en lugar de corregirla, sobre todo cuando se le pide pulir o reforzar el error. En el Laboratorio se usa «adulonería» como traducción de sycophancy.',
    enlaces: [{ href: '/laboratorio/aduloneria-ia-ante-premisas-falsas/', texto: 'Experimento sobre adulonería' }],
  },
  {
    id: 'agente-de-ia',
    termino: 'Agente de IA',
    definicion:
      'Instancia de un modelo que no solo responde con texto: ejecuta comandos, navega y escribe código por su cuenta para cumplir una meta.',
    enlaces: [{ href: '/articulos/quien-responde-cuando-ia-hackea-hugging-face/', texto: 'Quién responde cuando la IA hackea' }],
  },
  {
    id: 'capability-overhang',
    termino: 'Capability overhang',
    definicion:
      'Brecha entre lo que los sistemas de IA ya pueden hacer y el valor que la mayoría de personas, empresas y países logra sacarles. El término circula desde hace años y OpenAI lo puso en el centro de su discurso en enero de 2026.',
    enlaces: [{ href: '/articulos/que-puede-hacer-la-ia/', texto: 'Qué puede hacer la IA' }],
  },
  {
    id: 'control-de-exportacion',
    termino: 'Control de exportación (chips de IA)',
    definicion:
      'Regla de Estados Unidos que obliga a pedir una licencia al Departamento de Comercio para enviar servidores con chips avanzados de IA a China y Hong Kong.',
    enlaces: [{ href: '/articulos/contrabando-chips-ia-como-se-cuelan-a-china/', texto: 'Cómo se cuelan chips de IA a China' }],
  },
  {
    id: 'gemelo-digital',
    termino: 'Gemelo digital',
    definicion:
      'Réplica virtual de un lugar real. Una vez validadas las tareas en esa réplica, pueden transferirse a robots físicos.',
    enlaces: [{ href: '/articulos/como-aprenden-los-robots-humanoides-a-trabajar/', texto: 'Cómo aprenden los robots humanoides' }],
  },
  {
    id: 'preparedness-framework',
    termino: 'Preparedness Framework',
    definicion:
      'Sistema interno de OpenAI para evaluar si un modelo representa un riesgo de daño severo antes de lanzarlo.',
    enlaces: [{ href: '/articulos/openai-sabe-que-gpt-55-es-un-riesgo-alto-y-lo-lanzo-igual/', texto: 'OpenAI sabe que GPT-5.5 es un riesgo alto' }],
  },
  {
    id: 'riesgo-existencial',
    termino: 'Riesgo existencial de la IA',
    definicion:
      'Escenario en el que la IA provoca la extinción humana o un colapso sin regreso. Quienes dudan de él no son un bando: son cuatro argumentos distintos con evidencia desigual.',
    enlaces: [{ href: '/articulos/escepticos-riesgo-existencial-ia-argumentos/', texto: 'Los escépticos del riesgo existencial' }],
  },
];

export const TODOS_LOS_TERMINOS = [...MARCOS_DEL_SITIO, ...CONCEPTOS_DE_IA];

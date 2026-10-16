// Enlaces desde artículos anteriores hacia la serie "Sin Oráculos"
// (/series/futuro-humanidad-ia-filosofos/, publicada el 2026-10-13).
//
// Por qué existe: las piezas nuevas llegaban solo desde la home y la propia
// serie; Google las rastreó pero no las indexó de inmediato. Un artículo
// viejo que ya está indexado y recibe lectores es la señal más fuerte para
// decirle a Google que una página nueva importa.
//
// Criterio: lote fijo, curado a mano por afinidad temática real (mismo patrón
// que RISK_CALCULATOR_SLUGS en [slug].astro), no un campo del CMS. Se eligió
// por tema, no por tráfico: el tráfico vive en el panel de analytics, que
// requiere el token de Jorge. Para cambiar el lote basta con editar este
// archivo: clave = artículo viejo, valor = 1 o 2 piezas de la serie.
export const SIN_ORACULOS_ENLACES: Record<string, string[]> = {
  'geoffrey-hinton-dice-que-ia-avanzo-mas-rapido-de-lo-que-pensaba': [
    'riesgo-existencial-ia-bostrom-ord-russell',
    'escepticos-riesgo-existencial-ia-argumentos',
  ],
  'la-industria-de-ia-esta-dejando-de-hablar-de-agi-y-hay-una-razon-clara': [
    'futuro-de-la-humanidad-con-la-ia-mapa-del-debate',
    'que-importa-que-es-marketing-debate-ia',
  ],
  'agi-el-concepto-mas-poderoso-y-menos-definido-de-la-tecnologia': [
    'futuro-de-la-humanidad-con-la-ia-mapa-del-debate',
    'entiende-la-ia-searle-dreyfus-bender-simbolos',
  ],
  'amodei-advierte-el-tsunami-de-ia-ya-llego-a-la-orilla': [
    'riesgo-existencial-ia-bostrom-ord-russell',
    'escepticos-riesgo-existencial-ia-argumentos',
  ],
  'sam-altman-admite-la-ia-rompe-el-equilibrio-laboral': [
    'que-importa-que-es-marketing-debate-ia',
    'largoplacismo-abundancia-ia-kurzweil-tegmark-bostrom',
  ],
  'gpt-53-vs-claude-la-etica-como-arma-de-marketing': [
    'que-importa-que-es-marketing-debate-ia',
  ],
  'openai-safety-fellowship-2026-altruismo-o-gestion-de-riesgos': [
    'riesgo-existencial-ia-bostrom-ord-russell',
    'que-importa-que-es-marketing-debate-ia',
  ],
  'etica-de-la-ia-tres-marcos-para-decisiones-reales': [
    'condicion-humana-ia-arendt-han-harari-sentido',
    'conciencia-ia-chalmers-birch-schwitzgebel-estatus-moral',
  ],
  'doom-loop-midieron-como-rompian-la-web': [
    'danos-actuales-ia-crawford-gebru-bender-vallor',
  ],
  'la-ia-consume-agua-el-costo-hidrico-que-las-big-tech-no-quieren-publicar': [
    'danos-actuales-ia-crawford-gebru-bender-vallor',
  ],
  'ia-en-queretaro-el-agua-que-cuesta-cada-prompt': [
    'danos-actuales-ia-crawford-gebru-bender-vallor',
  ],
};

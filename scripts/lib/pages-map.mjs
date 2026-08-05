// Manual routing table for the 28 migrated Blogger pages -> new Astro routes.
// Keys are the original page slugs (content-export/paginas/<key>.html).
export const PAGES_MAP = {
  'acerca-de': '/acerca-de/',
  'archivo-glitchmentalmx': '/gracias/',
  'aviso-legal-y-condiciones-de-uso': '/aviso-legal-y-condiciones-de-uso/',
  'biblioteca-de-ia-tecnologia-y-sociedad': '/colecciones/biblioteca-de-ia-tecnologia-y-sociedad/',
  'calculadora-de-riesgo-de-reemplazo-por-ia-2026': '/calculadora-de-riesgo-de-reemplazo-por-ia-2026/',
  colabora: '/colabora/',
  contacto: '/contacto/',
  'dato-incomodo': '/dato-incomodo/',
  'detras-del-prompt': '/colecciones/detras-del-prompt/',
  'editorial-services-glitchmentalmx': '/editorial-services-glitchmentalmx/',
  'el-espia-que-compraste': '/series/el-espia-que-compraste/',
  'el-negocio-de-la-virtud': '/series/el-negocio-de-la-virtud/',
  glitchsearch: '/glitchsearch/',
  'guias-esenciales': '/colecciones/guias-esenciales/',
  'horizonte-critico': '/colecciones/horizonte-critico/',
  'humanos-en-beta': '/series/humanos-en-beta/',
  'indice-glitchmentalmx': '/indice-glitchmentalmx/',
  'insights-visuales': '/insights-visuales/',
  'jorge-a-diaz-elizondo-autor': '/autor/',
  'manos-libres': '/series/manos-libres/',
  'mapa-de-poder-tech': '/colecciones/mapa-de-poder-tech/',
  'panoptico-digital': '/series/panoptico-digital/',
  'politica-de-privacidad': '/politica-de-privacidad/',
  'protocolo-kernel': '/series/protocolo-kernel/',
  'publicidad-en-glitchmentalmx': '/publicidad-en-glitchmentalmx/',
  'recursos-para-ensenar-ia-y-tecnologia': '/colecciones/recursos-para-ensenar-ia-y-tecnologia/',
  'servicios-editoriales-glitchmentalmx': '/servicios-editoriales-glitchmentalmx/',
  suscribete: '/suscribete/',
};

// Series that have a dedicated collection HTML source file in content-export/paginas.
export const SERIES_SLUGS = [
  'el-negocio-de-la-virtud',
  'manos-libres',
  'panoptico-digital',
  'protocolo-kernel',
  'humanos-en-beta',
  'el-espia-que-compraste',
];

// Curated topical hub pages (link to many articles, not a narrative series).
export const HUB_SLUGS = [
  'biblioteca-de-ia-tecnologia-y-sociedad',
  'mapa-de-poder-tech',
  'guias-esenciales',
  'recursos-para-ensenar-ia-y-tecnologia',
  'horizonte-critico',
  'detras-del-prompt',
];

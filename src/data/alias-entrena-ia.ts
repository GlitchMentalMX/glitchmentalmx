// La serie "Quién entrena con tus datos" archiva algunos artículos bajo un
// herramientaId propio, distinto al que usan precios-ia y la taxonomía del
// recomendador (herramientas-ia). Decisiones editoriales de esa serie:
//   grok → x-grok            (X, la plataforma, y Grok, el producto)
//   meta-ai → meta-ai-app    (la app standalone, aparte de WhatsApp/IG/FB)
//   adobe-firefly → adobe    (el artículo de Adobe trata justo el
//                             entrenamiento de Firefly con archivos de CC)
// Sin este alias, el recomendador mostraría "sin verificar" para
// herramientas que sí tienen artículo, y escribir uno nuevo sería contenido
// duplicado. Un solo lugar, para que el quiz y las fichas no se desfasen.
export const ALIAS_ENTRENA_IA: Record<string, string> = {
  grok: 'x-grok',
  'meta-ai': 'meta-ai-app',
  'adobe-firefly': 'adobe',
};

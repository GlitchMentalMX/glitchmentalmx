// Mapeo de la categoría de un Insight Visual a su destino de exploración —
// independiente de las categorías de "posts" (src/data/categories.ts): varias
// de estas etiquetas comparten el mismo destino, y "Futuro del Trabajo" apunta
// a una sección de una colección, no a un archivo de categoría.
//
// El ancla de "Futuro del Trabajo" (#s04) es posicional, no por nombre — la
// genera src/pages/colecciones/[slug].astro a partir del índice de la sección
// dentro de biblioteca-de-ia-tecnologia-y-sociedad.md. Si esa colección se
// reordena, este enlace hay que revisarlo.
export const insightCategoryLinks: Record<string, string> = {
  'Inteligencia Artificial': '/categoria/inteligencia-artificial/',
  'Narrativa de la IA': '/categoria/inteligencia-artificial/',
  'Sistemas Autónomos': '/categoria/inteligencia-artificial/',
  'IA Agéntica': '/categoria/inteligencia-artificial/',
  'Futuro del Trabajo': '/colecciones/biblioteca-de-ia-tecnologia-y-sociedad/#s04',
  'Cultura Digital': '/categoria/cultura-digital/',
  'Psicología Digital': '/categoria/cultura-digital/',
  'Tecnología de Consumo': '/categoria/tecnologia-de-consumo/',
  'Tendencias Digitales': '/categoria/tendencias-digitales/',
};

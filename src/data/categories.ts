export interface Category {
  name: string;
  slug: string;
}

// Duplicado como SLUG_POR_CATEGORIA en astro.config.mjs — ese archivo
// corre en Node plano para calcular el lastmod del sitemap y no puede
// importar este módulo (fuera del pipeline de Astro/TS). Si agregas,
// quitas o renombras una categoría aquí, actualiza también la copia en
// astro.config.mjs o el sitemap generará lastmod con datos viejos sin
// lanzar ningún error.
export const categories: Category[] = [
  { name: 'Inteligencia Artificial', slug: 'inteligencia-artificial' },
  { name: 'Cultura Digital', slug: 'cultura-digital' },
  { name: 'Tendencias Digitales', slug: 'tendencias-digitales' },
  { name: 'Tecnología de Consumo', slug: 'tecnologia-de-consumo' },
];

export function categorySlug(name: string): string {
  return categories.find((c) => c.name === name)?.slug ?? '';
}

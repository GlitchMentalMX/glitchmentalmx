export interface Category {
  name: string;
  slug: string;
}

export const categories: Category[] = [
  { name: 'Inteligencia Artificial', slug: 'inteligencia-artificial' },
  { name: 'Cultura Digital', slug: 'cultura-digital' },
  { name: 'Tendencias Digitales', slug: 'tendencias-digitales' },
  { name: 'Tecnología de Consumo', slug: 'tecnologia-de-consumo' },
];

export function categorySlug(name: string): string {
  return categories.find((c) => c.name === name)?.slug ?? '';
}

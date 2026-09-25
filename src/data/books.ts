export interface BookFormat {
  label: string;
  asin: string;
}

export interface Book {
  id: string;
  title: string;
  genre: string;
  cover: string;
  desc: string;
  // Enlace corto propio (/umbral20/…): es el que se muestra en todo el sitio,
  // porque cada visita queda contada en /stats/ (Analytics.astro).
  buy: string;
  // Ficha real en amazon.com: destino de la redirección y `offers.url` del
  // schema (un schema no debe apuntar a una página noindex).
  storeUrl: string;
  // Slug en src/content/posts del artículo "por qué escribí esta novela" —
  // opcional porque no todas las novelas tienen uno todavía.
  whyIWroteThisSlug?: string;
  // Formatos individuales con su propio ASIN — opcional, solo para las
  // páginas dedicadas de cada novela (no se muestra en el catálogo).
  formats?: BookFormat[];
  // Tienda a la que apuntan los ASIN de `formats`. Por defecto amazon.com.mx;
  // 'us' para libros cuyos 3 formatos solo están juntos en amazon.com (el
  // lector elige ahí si importa el impreso o va a su tienda por el eBook).
  store?: 'mx' | 'us';
}

export function amazonMxUrl(asin: string): string {
  return `https://www.amazon.com.mx/dp/${asin}`;
}

export function amazonUsUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}`;
}

export function formatUrl(book: Book, asin: string): string {
  return book.store === 'us' ? amazonUsUrl(asin) : amazonMxUrl(asin);
}

export interface UpcomingBook {
  title: string;
  desc: string;
}

// Orden: de más reciente a más antigua. El home muestra las primeras 3.
export const books: Book[] = [
  {
    id: 'umbral-20',
    title: 'UMBRAL 20',
    genre: 'Tecnothriller',
    cover: '/images/novelas/umbral-20.webp',
    desc: 'La edición genética humana ya no es una posibilidad. Es un procedimiento. Treinta y nueve mil expedientes lo documentan. Una firma al pie de uno de ellos es la suya.',
    buy: '/umbral20/',
    storeUrl: 'https://www.amazon.com/dp/B0HKFT5GMF',
    whyIWroteThisSlug: 'umbral-20-novela-edicion-genetica',
    store: 'us',
    formats: [
      { label: 'eBook', asin: 'B0HKF7KD6L' },
      { label: 'Tapa blanda', asin: 'B0HKFT5GMF' },
      { label: 'Tapa dura', asin: 'B0HKFRX391' },
    ],
  },
  {
    id: 'cero-organico',
    title: 'Cero Orgánico',
    genre: 'Tecnothriller',
    cover: '/images/novelas/cero-organico.webp',
    desc: 'Naia Soler tiene millones de seguidores y contratos de ocho cifras. Detrás de cada publicación, un sistema que la conoce mejor que ella misma. El algoritmo no es caprichoso. Decide.',
    buy: '/ceroorganico/',
    storeUrl: 'https://www.amazon.com/dp/B0H8M9SSV6',
    whyIWroteThisSlug: 'cero-organico-la-novela-sobre-el-algoritmo-que-controla-a-los-influencers',
    formats: [
      { label: 'eBook', asin: 'B0H8M9SSV6' },
      { label: 'Tapa blanda', asin: 'B0H8MKPB1H' },
      { label: 'Tapa dura', asin: 'B0H8MQKQ5Z' },
    ],
  },
  {
    id: 'entrenado-en-corpus',
    title: 'Entrenado en Corpus',
    genre: 'Tecnothriller',
    cover: '/images/novelas/entrenado-en-corpus.webp',
    desc: 'Una periodista investiga el vínculo entre las grandes tecnológicas y el Vaticano. El modelo de IA que responde sus preguntas opera, al mismo tiempo, en la identificación de blancos militares. El corpus fue humano. Las consecuencias, no.',
    buy: '/entrenadoencorpus/',
    storeUrl: 'https://www.amazon.com/dp/B0H4J5WTCR',
    whyIWroteThisSlug: 'por-que-escribi-una-novela-y-no-otro-reportaje-sobre-ia',
    formats: [
      { label: 'eBook', asin: 'B0H4J5WTCR' },
      { label: 'Tapa blanda', asin: 'B0H4LVMQ3J' },
      { label: 'Tapa dura', asin: 'B0H4QKTLJQ' },
    ],
  },
];

export const upcomingBooks: UpcomingBook[] = [
  {
    title: 'Deprecado',
    desc: 'Un escritor descubre que su obra completa entrenó al modelo que lo superó. Las editoriales ya no lo llaman. Su agente representa ahora a tres IAs. Nadie fue plagiado. Todos fueron deprecados.',
  },
];

export function getBook(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}

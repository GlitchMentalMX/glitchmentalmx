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
  buy: string;
  // Slug en src/content/posts del artículo "por qué escribí esta novela" —
  // opcional porque no todas las novelas tienen uno todavía.
  whyIWroteThisSlug?: string;
  // Formatos individuales con su propio ASIN — opcional, solo para las
  // páginas dedicadas de cada novela (no se muestra en el catálogo).
  formats?: BookFormat[];
}

export function amazonMxUrl(asin: string): string {
  return `https://www.amazon.com.mx/dp/${asin}`;
}

export interface UpcomingBook {
  title: string;
  desc: string;
}

export const books: Book[] = [
  {
    id: 'entrenado-en-corpus',
    title: 'Entrenado en Corpus',
    genre: 'Tecnothriller',
    cover: '/images/novelas/entrenado-en-corpus.webp',
    desc: 'Una periodista investiga el vínculo entre las grandes tecnológicas y el Vaticano. El modelo de IA que responde sus preguntas opera, al mismo tiempo, en la identificación de blancos militares. El corpus fue humano. Las consecuencias, no.',
    buy: 'https://mybook.to/EntrenadoEnCorpus',
    whyIWroteThisSlug: 'por-que-escribi-una-novela-y-no-otro-reportaje-sobre-ia',
    formats: [
      { label: 'eBook', asin: 'B0H4J5WTCR' },
      { label: 'Tapa blanda', asin: 'B0H4LVMQ3J' },
      { label: 'Tapa dura', asin: 'B0H4QKTLJQ' },
    ],
  },
  {
    id: 'cero-organico',
    title: 'Cero Orgánico',
    genre: 'Tecnothriller',
    cover: '/images/novelas/cero-organico.webp',
    desc: 'Naia Soler tiene millones de seguidores y contratos de ocho cifras. Detrás de cada publicación, un sistema que la conoce mejor que ella misma. El algoritmo no es caprichoso. Decide.',
    buy: 'https://mybook.to/CeroOrganico',
    whyIWroteThisSlug: 'cero-organico-la-novela-sobre-el-algoritmo-que-controla-a-los-influencers',
    formats: [
      { label: 'eBook', asin: 'B0H8M9SSV6' },
      { label: 'Tapa blanda', asin: 'B0H8MKPB1H' },
      { label: 'Tapa dura', asin: 'B0H8MQKQ5Z' },
    ],
  },
];

export const upcomingBooks: UpcomingBook[] = [
  {
    title: 'UMBRAL 20',
    desc: '2031. Una clínica en Singapur vende modificaciones genéticas hereditarias que no eliminan enfermedades — producen ventaja cognitiva irreversible. Una investigadora de la ONU recibe la lista de compradores. Varios de esos nombres deberían estar investigándolo.',
  },
  {
    title: 'Deprecado',
    desc: 'Un escritor descubre que su obra completa entrenó al modelo que lo superó. Las editoriales ya no lo llaman. Su agente representa ahora a tres IAs. Nadie fue plagiado. Todos fueron deprecados.',
  },
];

export function getBook(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}

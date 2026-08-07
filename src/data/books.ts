export interface Book {
  id: string;
  title: string;
  genre: string;
  cover: string;
  desc: string;
  buy: string;
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
    cover: '/images/novelas/entrenado-en-corpus.jpg',
    desc: 'Una periodista investiga el vínculo entre las grandes tecnológicas y el Vaticano. El modelo de IA que responde sus preguntas opera, al mismo tiempo, en la identificación de blancos militares. El corpus fue humano. Las consecuencias, no.',
    buy: 'https://mybook.to/EntrenadoEnCorpus',
  },
  {
    id: 'cero-organico',
    title: 'Cero Orgánico',
    genre: 'Tecnothriller',
    cover: '/images/novelas/cero-organico.png',
    desc: 'Naia Soler tiene millones de seguidores y contratos de ocho cifras. Detrás de cada publicación, un sistema que la conoce mejor que ella misma. El algoritmo no es caprichoso. Decide.',
    buy: 'https://mybook.to/CeroOrganico',
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

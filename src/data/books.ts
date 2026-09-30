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

  // — Campos de la página dedicada (/novelas/{id}/). Todos opcionales: la
  // página solo pinta los bloques que tengan contenido, así que una novela
  // puede crecer de a poco sin romper nada. La serie que la originó NO se
  // repite aquí: sale de `relatedBook` en src/content/collections/.
  // <meta description> propia; si falta se usa `desc`.
  metaDescription?: string;
  // Frase editorial del hero, distinta de la sinopsis.
  tagline?: string;
  // Portada en mayor resolución para el hero (la de `cover` es de catálogo).
  coverHd?: { src: string; width: number; height: number };
  // Sinopsis oficial (contraportada), un párrafo por elemento, sin reescribir.
  synopsis?: string[];
  // Mapa temático real de la novela — también alimenta `about` del schema.
  themes?: string[];
  realBehind?: RealBehind;
  gallery?: GalleryImage[];
  // true si existe src/content/novelas/{id}/capitulo-1.md.
  firstChapter?: boolean;
}

export interface GalleryImage {
  src: string;
  // Variantes de ancho para <img srcset>; omitido cuando solo hay un archivo.
  srcset?: string;
  width: number;
  height: number;
  // `alt` describe lo que se ve; `caption` es el pie editorial. Ninguno debe
  // afirmar nada de la trama que el autor no haya confirmado.
  alt: string;
  caption: string;
}

// Bloque "Lo real detrás de la novela" de la página dedicada: el hecho
// documentado que la novela ficcionaliza. `articles` son slugs de
// src/content/posts — título y descripción se leen del propio artículo.
export interface RealBehind {
  paragraphs: string[];
  articles: string[];
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
    metaDescription:
      'Tecnothriller en español sobre periodismo, IA y el Vaticano. Una periodista recibe un cuaderno guardado doce años en Roma. Lee el primer capítulo gratis.',
    tagline: 'El sistema aprendió a callar — y aprendió de las mejores fuentes posibles.',
    coverHd: { src: '/images/novelas/entrenado-en-corpus/portada.webp', width: 720, height: 1168 },
    synopsis: [
      'Una periodista recibe un sobre. Dentro, un cuaderno verde y una memoria USB que llevan doce años guardados en un archivo secreto en Roma.',
      'Lo que encuentra adentro no es un escándalo. Es algo peor: la prueba de que el sistema que hoy le resume las noticias, le redacta correos y le explica el mundo aprendió a callar — y aprendió de las mejores fuentes posibles.',
      'Mientras tanto, en la Sala Clementina del Vaticano, el Papa estrecha la mano del CEO de la empresa que construyó ese sistema. La encíclica que firman dice contener lo que no contiene.',
      'Entrenado en Corpus es una novela sobre el periodismo, la inteligencia artificial y el precio de la conciencia. Sobre lo que ocurre cuando alguien intenta publicar la historia que el sistema ya sabe que existe.',
      'Y sobre el lector que ahora mismo sostiene este libro.',
    ],
    themes: [
      'IA y periodismo',
      'Imágenes sintéticas y desinformación',
      'Sesgo religioso en los modelos de lenguaje',
      'Big Tech y el Vaticano',
      'IA y uso militar',
      'Datos de entrenamiento',
    ],
    realBehind: {
      paragraphs: [
        'La novela abre con un rumor falso que se vuelve viral en horas. Tiene un espejo real: a finales de marzo de 2026, Anthropic reunió en secreto a unos 15 líderes religiosos cristianos en San Francisco para hablar de cómo darle formación moral a Claude. La noticia llegó al mainstream con dos semanas de retraso, y en ese lapso X ya había inventado una reunión entre Dario Amodei y el Papa. El rumor era falso; la historia detrás, no.',
        'El escenario tampoco es inventado. Según la investigación de la serie, desde 2016 el Vaticano celebra en Santa María sopra Minerva —la iglesia donde en 1633 juzgaron a Galileo— los Diálogos Minerva: encuentros anuales, cerrados al público, entre líderes tecnológicos y prelados católicos, bajo la regla de Chatham House.',
        'Entrenado en Corpus lleva esa pregunta a la ficción: qué pasa cuando alguien intenta publicar la historia que el sistema ya sabe que existe.',
      ],
      articles: [
        'anthropic-y-el-vaticano-la-alianza-de-ia-que-si-existe',
        'la-ia-occidental-tiene-un-problema-de-religion-serio',
        'como-una-ia-te-puede-adoctrinar-sin-que-nadie-lo-planeara',
        'la-ia-china-no-tiene-sesgo-religioso-tiene-algo-peor',
        'consultaron-al-papa-luego-automatizaron-a-sus-feligreses',
      ],
    },
    firstChapter: true,
    gallery: [
      {
        src: '/images/novelas/entrenado-en-corpus/procesion-nave-barroca-1600.webp',
        srcset:
          '/images/novelas/entrenado-en-corpus/procesion-nave-barroca-800.webp 800w, /images/novelas/entrenado-en-corpus/procesion-nave-barroca-1600.webp 1600w',
        width: 1600,
        height: 780,
        alt: 'Figuras con túnicas recorridas por cables luminosos avanzan por la nave de una iglesia barroca; una de ellas voltea a mirar a la cámara.',
        caption: 'Una nave barroca, cables de luz bajo las túnicas.',
      },
      {
        src: '/images/novelas/entrenado-en-corpus/atril-salon-marmol-1600.webp',
        srcset:
          '/images/novelas/entrenado-en-corpus/atril-salon-marmol-800.webp 800w, /images/novelas/entrenado-en-corpus/atril-salon-marmol-1600.webp 1600w',
        width: 1600,
        height: 780,
        alt: 'Un dispositivo luminoso sobre un atril de piedra tallada, en un salón de mármol con una red de líneas de luz en el suelo.',
        caption: 'Un atril de piedra y un dispositivo, sobre un suelo hecho de red.',
      },
      {
        src: '/images/novelas/entrenado-en-corpus/salon-columnas-rojas-1600.webp',
        srcset:
          '/images/novelas/entrenado-en-corpus/salon-columnas-rojas-800.webp 800w, /images/novelas/entrenado-en-corpus/salon-columnas-rojas-1600.webp 1600w',
        width: 1600,
        height: 780,
        alt: 'Una mujer con un documento en la mano, bajo un haz de luz, en un salón de columnas rojas con una red dorada dibujada en el techo y el suelo.',
        caption: 'Un salón de columnas rojas y una mujer con un documento.',
      },
      {
        src: '/images/novelas/entrenado-en-corpus/biblioteca-libro-abierto-1600.webp',
        srcset:
          '/images/novelas/entrenado-en-corpus/biblioteca-libro-abierto-800.webp 800w, /images/novelas/entrenado-en-corpus/biblioteca-libro-abierto-1600.webp 1600w',
        width: 1600,
        height: 780,
        alt: 'Una mujer sostiene un libro abierto cuyas páginas muestran un diagrama de red, en una biblioteca antigua con círculos dibujados en el suelo.',
        caption: 'Una biblioteca antigua y un libro abierto sobre un mapa de conexiones.',
      },
      {
        src: '/images/novelas/entrenado-en-corpus/caliz-codigo-binario.webp',
        width: 1024,
        height: 1536,
        alt: 'Un cáliz plateado del que se desprende código binario, bajo una esfera de red luminosa, sobre un fondo de estrellas conectadas.',
        caption: 'Un cáliz que se deshace en código.',
      },
    ],
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

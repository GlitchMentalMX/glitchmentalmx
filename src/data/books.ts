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
  // Una frase que nombra la novela como la describiría alguien que la busca
  // (género, tema, idioma). Va antes de la sinopsis; escrita para personas.
  lede?: string;
  // Sinopsis oficial (contraportada), un párrafo por elemento, sin reescribir.
  synopsis?: string[];
  // Mapa temático real de la novela — también alimenta `about` del schema.
  themes?: string[];
  realBehind?: RealBehind;
  gallery?: GalleryImage[];
  // true si existe src/content/novelas/{id}/capitulo-1.md.
  firstChapter?: boolean;
  // Imagen 16:9 del encabezado del capítulo (como el hero de los artículos);
  // también es el og:image de esa página. Sin texto incrustado.
  chapterHero?: GalleryImage;
}

export interface GalleryImage {
  src: string;
  // Variantes de ancho para <img srcset>; omitido cuando solo hay un archivo.
  srcset?: string;
  width: number;
  height: number;
  // `alt` describe lo que se ve (oculto); `caption` es un pie editorial
  // visible y opcional. Ninguno debe afirmar nada de la trama que el autor no
  // haya confirmado.
  alt: string;
  // Solo si dice algo que la imagen no dice por sí sola; si no, se omite.
  caption?: string;
}

// Bloque "Lo real detrás de la novela" de la página dedicada: el hecho
// documentado que la novela ficcionaliza. `articles` son slugs de
// src/content/posts — título y descripción se leen del propio artículo.
export interface RealBehind {
  // H2 propio; si falta, "Lo real detrás de la novela".
  title?: string;
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

// Orden: de más reciente a más antigua. El home muestra las primeras 4.
export const books: Book[] = [
  {
    id: 'deprecado',
    title: 'DEPRECADO',
    genre: 'Tecnothriller',
    cover: '/images/novelas/deprecado.webp',
    desc: 'Josh Turner entrenó a la herramienta que lo reemplazó. Ante la ley, ella no lo infringió: es su «sucesor creativo». Con cuatro «prescindibles» más, cruza Estados Unidos reuniendo la prueba de que a todos les pusieron la misma cláusula. Detrás hay un documento que nadie puede mostrar: CONSENT-0.',
    buy: '/deprecado/',
    storeUrl: 'https://www.amazon.com/dp/B0HMGF498X',
    metaDescription:
      'Tecnothriller en español sobre un redactor que entrenó a la IA que lo reemplazó, derechos de autor y consentimiento. Lee el primer capítulo gratis.',
    lede: 'Un tecnothriller en español sobre inteligencia artificial, derechos de autor y trabajo creativo, anclado en hechos reales.',
    coverHd: { src: '/images/novelas/deprecado/portada.webp', width: 720, height: 1151 },
    // Texto de la contraportada aprobada por el autor, sin reescribir.
    synopsis: [
      'A Josh Turner nadie lo plagió. Solo le pidieron entrenar a la herramienta que haría su trabajo. Cinco meses después, la herramienta se quedó. Él no.',
      'Cuando busca protección legal, descubre que para la ley nadie le hizo nada: la máquina que lo reemplazó no es una infractora, es su «sucesor creativo».',
      'Con una diseñadora, un músico, un fotógrafo y una periodista igual de prescindibles, Josh cruza Estados Unidos reuniendo la única prueba que importa: que a todos les pusieron la misma cláusula. Lo que encuentra detrás tiene nombre, y nadie puede mostrarlo: CONSENT-0.',
    ],
    themes: [
      'IA y trabajo creativo',
      'Entrenar a la herramienta que te reemplaza',
      'Derechos de autor y entrenamiento de modelos',
      'Consentimiento sobre la obra propia',
      'Monitoreo y vigilancia laboral',
      'Periodismo, diseño, música y fotografía ante la IA',
    ],
    realBehind: {
      title: 'Lo real detrás de la novela: IA, trabajo creativo y consentimiento',
      paragraphs: [
        'El primer capítulo arranca con una orden: documentar cómo decides, entregar todos los borradores —los descartados, sobre todo— e instalar una extensión que registra cada sesión de escritura. Su espejo real ya es una industria. La doctora Alice Chiao, que enseñó medicina de urgencias en Stanford, hoy entrena a un chatbot para responder como ella: según Pitchbook, la economía de expertos que enseñan a la IA a hacer su trabajo vale al menos 17 mil millones de dólares, y suele ser trabajo por proyecto, sin prestaciones ni antigüedad.',
        'Los «prescindibles» de la historia también tienen su cifra. Al 8 de abril de 2025, el 47.85% de las imágenes de Adobe Stock ya eran generadas por IA. El estudio de CISAC proyecta que para 2028 el 60% de los ingresos de las bibliotecas musicales B2B vendrán de la IA. Los proyectos de creación de imágenes en plataformas freelance cayeron 17% en los ocho meses posteriores al lanzamiento de ChatGPT, los de escritura en Upwork cayeron 32% en 2025 y el Washington Post eliminó en febrero de 2026 más de 300 puestos periodísticos.',
        'Y la pregunta legal es la que la novela pone en la boca de la ley: ¿entrenar con la obra de alguien exige su consentimiento? Un tribunal alemán falló contra OpenAI por reproducir letras de GEMA, Anthropic llegó a un acuerdo de alrededor de 1,500 millones de dólares con autores por usar libros de bibliotecas piratas, y SAG-AFTRA ya convirtió el consentimiento previo y por escrito en cláusula de contrato. DEPRECADO lleva esa pregunta a la ficción: qué pasa cuando la herramienta que te reemplazó es, ante la ley, tu sucesora.',
      ],
      articles: [
        'expertos-que-entrenan-ia-para-reemplazarse-el-negocio',
        'la-fotografia-de-stock-murio-y-nadie-fue-al-velorio',
        'el-negocio-de-la-musica-de-fondo-ya-no-necesita-musicos',
        'la-ia-no-liquido-escritores-liquido-a-quien-los-pagaba',
        'disenadores-freelance-e-ia-el-colapso-del-nivel-medio',
        'el-fin-del-entrenamiento-gratis-la-ia-contra-el-copyright',
      ],
    },
    firstChapter: true,
    chapterHero: {
      src: '/images/novelas/deprecado/capitulo-1-mano-pluma-992.webp',
      width: 992,
      height: 558,
      alt: 'Primer plano de una mano que sostiene una pluma fuente sobre una hoja, bajo una lámpara cálida; la línea que escribe pasa del trazo manuscrito a pequeñas marcas rectangulares, como código.',
    },
    gallery: [
      {
        src: '/images/novelas/deprecado/vitrina-prescindibles-deprecado.webp',
        width: 992,
        height: 1586,
        alt: 'Una vitrina de museo en una sala oscura con cinco objetos sobre pedestales negros —una pluma fuente, una cámara, una paleta de diseño con un lápiz, unos audífonos y un micrófono—, cada uno con una placa roja que dice «DEPRECADO».',
      },
      {
        src: '/images/novelas/deprecado/calle-nueva-york-deprecado-099.webp',
        width: 992,
        height: 1586,
        alt: 'Una avenida de Nueva York en blanco y negro, con una multitud borrosa en movimiento y el Empire State al fondo; un hombre de abrigo oscuro y maletín queda quieto, de espaldas, dentro de un recuadro rojo con la etiqueta «deprecado · 0.99».',
      },
      {
        src: '/images/novelas/deprecado/escritorio-objetos-deshechos.webp',
        width: 993,
        height: 1584,
        alt: 'Un escritorio de noche junto a un ventanal con lluvia y rascacielos iluminados; una cámara, un teclado, un micrófono y una tableta con bocetos se deshacen en fragmentos oscuros sobre la mesa.',
      },
      {
        src: '/images/novelas/deprecado/mano-pluma-escritura.webp',
        width: 992,
        height: 1586,
        alt: 'Una mano sostiene una pluma fuente sobre una hoja, junto a una lámpara y una pila de libros en la penumbra; la línea escrita pasa del trazo manuscrito a marcas como de código.',
      },
    ],
  },
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
    metaDescription:
      'Tecnothriller en español sobre edición genética humana: treinta y nueve mil expedientes y una firma al pie de uno de ellos. Lee el primer capítulo gratis.',
    lede: 'Un tecnothriller en español sobre edición genética, bioética y el poder detrás de un archivo filtrado, anclado en hechos reales.',
    coverHd: { src: '/images/novelas/umbral-20/portada.webp', width: 720, height: 1152 },
    synopsis: [
      'La edición genética humana ya no es una posibilidad. Es un procedimiento.',
      'Treinta y nueve mil expedientes lo documentan.',
      'Una firma al pie de uno de ellos es la suya.',
    ],
    themes: [
      'Edición genética humana',
      'Biología sintética y CRISPR',
      'Bioética y comités de ética',
      'Conflictos de interés',
      'Acceso y desigualdad',
      'Filtraciones y documentos',
    ],
    realBehind: {
      title: 'Lo real detrás de la novela: edición genética, CRISPR y quién controla el ADN',
      paragraphs: [
        'El primer capítulo arranca con una base de datos: miles de expedientes, montos de entre 220 mil y 3.8 millones de dólares y una lista de instituciones que hacen de intermediarias. La serie parte del precio real: Casgevy, la primera terapia basada en CRISPR aprobada por la FDA (diciembre de 2023), cuesta 2.2 millones de dólares por paciente, y otras terapias génicas aprobadas en 2023 y 2024 se fijaron entre 3.1 y 4.25 millones. Quien puede pagarlo no es quien más lo necesita: el 80% de los casos de anemia falciforme, la enfermedad que trata Casgevy, está en África subsahariana.',
        'El mapa de quién controla la tecnología también es real. Según un informe del PNUMA de 2024 que recoge la serie, China concentra el 49.1% de las patentes globales de biología sintética y Estados Unidos el 12.8%. Y el sistema que debería vigilar los laboratorios de mayor riesgo depende de la buena fe de cada país: el tratado que prohíbe las armas biológicas desde 1972 nunca tuvo forma de comprobar que alguien lo cumple.',
        'UMBRAL 20 lleva esas preguntas a la ficción: qué ocurre cuando la edición genética humana ya es un procedimiento, treinta y nueve mil expedientes lo documentan y una firma al pie de uno de ellos es la suya.',
      ],
      articles: [
        'biologia-sintetica-el-codigo-genetico-como-lenguaje-de-programacion',
        'el-adn-como-codigo-quien-controla-el-software-de-la-vida',
        'editar-el-adn-cuesta-22-mdd-quien-puede-pagarlo',
        'la-ia-como-nuevo-darwin-quien-define-la-evolucion',
        'bioseguridad-global-el-codigo-que-nadie-audita-todavia',
      ],
    },
    firstChapter: true,
    chapterHero: {
      src: '/images/novelas/umbral-20/dos-lectoras-cuaderno-20-1600.webp',
      srcset: '/images/novelas/umbral-20/dos-lectoras-cuaderno-20-800.webp 800w, /images/novelas/umbral-20/dos-lectoras-cuaderno-20-1600.webp 1600w',
      width: 1600,
      height: 900,
      alt: 'Imagen dividida en dos: a la izquierda, una mujer en un estudio con vista a una ciudad europea señala el número 20% rodeado en un cuaderno; a la derecha, otra mujer, en un cuarto lleno de libretas, muestra el mismo 20% en el suyo.',
    },
    gallery: [
      {
        src: '/images/novelas/umbral-20/oficina-ginebra-documento-firmado-1600.webp',
        srcset:
          '/images/novelas/umbral-20/oficina-ginebra-documento-firmado-800.webp 800w, /images/novelas/umbral-20/oficina-ginebra-documento-firmado-1600.webp 1600w',
        width: 1600,
        height: 900,
        alt: 'Una mujer de saco oscuro lee con gesto tenso una hoja con una firma, en una oficina de noche con vista a un lago, una fuente y montañas; sobre el escritorio, pilas de documentos.',
      },
      {
        src: '/images/novelas/umbral-20/dos-lectoras-cuaderno-20-1600.webp',
        srcset:
          '/images/novelas/umbral-20/dos-lectoras-cuaderno-20-800.webp 800w, /images/novelas/umbral-20/dos-lectoras-cuaderno-20-1600.webp 1600w',
        width: 1600,
        height: 900,
        alt: 'Imagen dividida en dos: a la izquierda, una mujer en un estudio con vista a una ciudad europea señala el número 20% rodeado en un cuaderno; a la derecha, otra mujer, en un cuarto lleno de libretas, muestra el mismo 20% en el suyo.',
      },
      {
        src: '/images/novelas/umbral-20/archivo-estantes-expedientes-1024.webp',
        srcset:
          '/images/novelas/umbral-20/archivo-estantes-expedientes-640.webp 640w, /images/novelas/umbral-20/archivo-estantes-expedientes-1024.webp 1024w',
        width: 1024,
        height: 1206,
        alt: 'Una mujer de espaldas, con un fólder en la mano, frente a una pared de archiveros con expedientes etiquetados, en un archivo amplio y sombrío.',
      },
      {
        src: '/images/novelas/umbral-20/manos-codigo-de-recepcion.webp',
        width: 992,
        height: 1586,
        alt: 'Dos manos se acercan, una desde arriba y otra desde abajo, sobre una franja de luz; entre ellas flota una etiqueta con el código 7G1Q3K9L2M8.',
      },
    ],

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
    metaDescription:
      'Tecnothriller en español sobre el algoritmo que decide quién triunfa en redes sociales. Una influencer y un sistema que la conoce mejor que ella. Primer capítulo gratis.',
    tagline: 'El algoritmo no es caprichoso. Decide.',
    lede: 'Un tecnothriller en español sobre algoritmos, redes sociales y la economía de creadores, anclado en hechos reales.',
    themes: [
      'Algoritmos y redes sociales',
      'Economía de creadores',
      'Autenticidad como producto',
      'Bots y cuentas falsas',
      'IA en la creación de contenido',
      'Vigilancia y presión por publicar',
    ],
    realBehind: {
      title: 'Lo real detrás de la novela: algoritmos, creadores y bots',
      paragraphs: [
        'El primer capítulo transcurre en un solo día: un reel que rompe el millón, un contrato que se renueva, una cena con el representante. Casi todo tiene su versión documentada. Según CreatorIQ, la economía de creadores creció 59% en 2025 hasta 32,600 millones de dólares, pero el dinero pasa por al menos cuatro filtros antes de llegar al creador: las «capas» del contrato que Rodrigo le explica a Naia.',
        'Los comentarios de cuentas casi idénticas bajo el reel también tienen respaldo: la serie recoge que el 53% del tráfico web ya son bots y que, en una versión rigurosa de la prueba de Turing, GPT-4.5 fue identificado como humano el 73% de las veces.',
        'La última línea del capítulo, «Alcance asignado: 94%», se lee mejor con la tesis de la serie al lado: ningún feed importante es puramente algorítmico, hay humanos curando lo que ves, y «algoritmo» es la palabra que evita que preguntes quiénes son. Cero Orgánico lleva esa pregunta a la ficción: qué pasa cuando detrás de cada publicación hay un sistema que conoce a la creadora mejor que ella misma.',
      ],
      articles: [
        'economia-de-creadores-a-donde-va-el-dinero-realmente',
        'estas-hablando-con-un-humano-o-un-bot-ya-no-importa',
        'el-algoritmo-no-existe-por-que-seguimos-creyendo-el-cuento',
        'las-redes-sociales-son-maquinas-de-vigilancia-entre-pares',
        'web3-la-descentralizacion-que-siempre-fue-un-pitch',
      ],
    },
    firstChapter: true,
    chapterHero: {
      src: '/images/novelas/cero-organico/de-rodillas-salon-oscuro-1600.webp',
      srcset: '/images/novelas/cero-organico/de-rodillas-salon-oscuro-800.webp 800w, /images/novelas/cero-organico/de-rodillas-salon-oscuro-1600.webp 1600w',
      width: 1600,
      height: 900,
      alt: 'Una mujer arrodillada, con la cabeza baja, en un salón oscuro con persianas, líneas de datos azules sobre la pared de concreto y una luz azul vertical al fondo.',
    },
    gallery: [
      {
        src: '/images/novelas/cero-organico/de-pie-salon-oscuro-1600.webp',
        srcset: '/images/novelas/cero-organico/de-pie-salon-oscuro-800.webp 800w, /images/novelas/cero-organico/de-pie-salon-oscuro-1600.webp 1600w',
        width: 1600,
        height: 900,
        alt: 'Una mujer descalza, de pie y con la cabeza baja, en un salón oscuro con persianas y líneas de datos azules sobre la pared de concreto; al fondo, una luz azul vertical.',
      },
      {
        src: '/images/novelas/cero-organico/de-rodillas-salon-oscuro-1600.webp',
        srcset: '/images/novelas/cero-organico/de-rodillas-salon-oscuro-800.webp 800w, /images/novelas/cero-organico/de-rodillas-salon-oscuro-1600.webp 1600w',
        width: 1600,
        height: 900,
        alt: 'La misma mujer arrodillada, con la cabeza baja, en el salón oscuro con líneas de datos azules sobre la pared y una luz azul vertical al fondo.',
      },
      {
        src: '/images/novelas/cero-organico/ventanal-sombra-grafica-1254.webp',
        srcset: '/images/novelas/cero-organico/ventanal-sombra-grafica-640.webp 640w, /images/novelas/cero-organico/ventanal-sombra-grafica-1254.webp 1254w',
        width: 1254,
        height: 1254,
        alt: 'Una mujer en ropa deportiva negra, arrodillada y con la cabeza baja, en un salón vacío junto a un ventanal con vista a la ciudad; en el suelo, la sombra de una gráfica con una curva que sube y cae.',
      },
      {
        src: '/images/novelas/cero-organico/de-espaldas-sombra-grafica-1254.webp',
        srcset: '/images/novelas/cero-organico/de-espaldas-sombra-grafica-640.webp 640w, /images/novelas/cero-organico/de-espaldas-sombra-grafica-1254.webp 1254w',
        width: 1254,
        height: 1254,
        alt: 'La misma escena vista desde atrás: la mujer arrodillada frente al ventanal y la sombra de la gráfica proyectada sobre el suelo pulido.',
      },
    ],
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
    lede: 'Un tecnothriller en español sobre inteligencia artificial, periodismo y el Vaticano, anclado en hechos reales.',
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
      title: 'Lo real detrás de la novela: IA, religión y el Vaticano',
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
    chapterHero: {
      src: '/images/novelas/entrenado-en-corpus/capitulo-1-nave-barroca-1600.webp',
      srcset: '/images/novelas/entrenado-en-corpus/capitulo-1-nave-barroca-800.webp 800w, /images/novelas/entrenado-en-corpus/capitulo-1-nave-barroca-1600.webp 1600w',
      width: 1600,
      height: 900,
      alt: 'Figuras con túnicas recorridas por cables luminosos avanzan por la nave de una iglesia barroca; una de ellas voltea a mirar a la cámara.',
    },
    gallery: [
      {
        src: '/images/novelas/entrenado-en-corpus/procesion-nave-barroca-1600.webp',
        srcset:
          '/images/novelas/entrenado-en-corpus/procesion-nave-barroca-800.webp 800w, /images/novelas/entrenado-en-corpus/procesion-nave-barroca-1600.webp 1600w',
        width: 1600,
        height: 780,
        alt: 'Figuras con túnicas recorridas por cables luminosos avanzan por la nave de una iglesia barroca; una de ellas voltea a mirar a la cámara.',
      },
      {
        src: '/images/novelas/entrenado-en-corpus/atril-salon-marmol-1600.webp',
        srcset:
          '/images/novelas/entrenado-en-corpus/atril-salon-marmol-800.webp 800w, /images/novelas/entrenado-en-corpus/atril-salon-marmol-1600.webp 1600w',
        width: 1600,
        height: 780,
        alt: 'Un dispositivo luminoso sobre un atril de piedra tallada, en un salón de mármol con una red de líneas de luz en el suelo.',
      },
      {
        src: '/images/novelas/entrenado-en-corpus/salon-columnas-rojas-1600.webp',
        srcset:
          '/images/novelas/entrenado-en-corpus/salon-columnas-rojas-800.webp 800w, /images/novelas/entrenado-en-corpus/salon-columnas-rojas-1600.webp 1600w',
        width: 1600,
        height: 780,
        alt: 'Una mujer con un documento en la mano, bajo un haz de luz, en un salón de columnas rojas con una red dorada dibujada en el techo y el suelo.',
      },
      {
        src: '/images/novelas/entrenado-en-corpus/biblioteca-libro-abierto-1600.webp',
        srcset:
          '/images/novelas/entrenado-en-corpus/biblioteca-libro-abierto-800.webp 800w, /images/novelas/entrenado-en-corpus/biblioteca-libro-abierto-1600.webp 1600w',
        width: 1600,
        height: 780,
        alt: 'Una mujer sostiene un libro abierto cuyas páginas muestran un diagrama de red, en una biblioteca antigua con círculos dibujados en el suelo.',
      },
      {
        src: '/images/novelas/entrenado-en-corpus/caliz-codigo-binario.webp',
        width: 1024,
        height: 1536,
        alt: 'Un cáliz plateado del que se desprende código binario, bajo una esfera de red luminosa, sobre un fondo de estrellas conectadas.',
      },
    ],
    formats: [
      { label: 'eBook', asin: 'B0H4J5WTCR' },
      { label: 'Tapa blanda', asin: 'B0H4LVMQ3J' },
      { label: 'Tapa dura', asin: 'B0H4QKTLJQ' },
    ],
  },
];

// Novelas anunciadas pero sin publicar (título + sinopsis corta). Vacío por ahora:
// /novelas/ oculta la sección «En desarrollo» mientras no haya ninguna.
export const upcomingBooks: UpcomingBook[] = [];

export function getBook(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}

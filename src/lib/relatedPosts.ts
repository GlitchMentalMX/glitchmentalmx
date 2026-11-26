import { getCollection, type CollectionEntry } from 'astro:content';

// Mapea la `categoria` de Dato Incómodo/Insights Visuales (9 valores, ver
// content.config.ts) a la `category` real de `posts` (4 valores) para poder
// elegir artículos genuinamente relacionados en la página individual de
// cada pieza. 'Futuro del Trabajo' no tiene una categoría de posts
// equivalente limpia (en insightCategoryLinks apunta a una sección de una
// colección, no a un archivo de categoría) — se deja sin mapeo a propósito;
// esas piezas solo reciben artículos con afinidad real de palabras.
const POST_CATEGORY_BY_PIECE_CATEGORIA: Partial<Record<string, string>> = {
  'Inteligencia Artificial': 'Inteligencia Artificial',
  'Narrativa de la IA': 'Inteligencia Artificial',
  'Sistemas Autónomos': 'Inteligencia Artificial',
  'IA Agéntica': 'Inteligencia Artificial',
  'Cultura Digital': 'Cultura Digital',
  'Psicología Digital': 'Cultura Digital',
  'Tecnología de Consumo': 'Tecnología de Consumo',
  'Tendencias Digitales': 'Tendencias Digitales',
};

// --- Afinidad temática ----------------------------------------------------
// `posts` NO tiene campo `tags` (solo `category`), así que la afinidad se
// calcula con (a) categoría y (b) palabras significativas compartidas entre
// el texto de la pieza/artículo actual y el título/descripción de cada
// candidato, ignorando stopwords en español.
const STOPWORDS = new Set(
  (
    'para como pero porque cuando donde desde hasta entre sobre sino tambien ademas aunque mientras ' +
    'este esta estos estas ese esa esos esas aquel aquella algo algun alguna algunos algunas ningun ninguna ' +
    'todo toda todos todas otro otra otros otras mismo misma cada cual cuales quien quienes que cuyo ' +
    'tiene tienen tener hace hacen hacer puede pueden poder hay muy mas menos solo sola ' +
    'ser son fue fueron sido era eran estan estar estaba nos les sus tus mis una unos unas del los las ' +
    'con sin por tras ante bajo segun durante mediante ' +
    'asi aqui alli ahora entonces luego antes despues siempre nunca ya aun ' +
    'cosas cosa veces vez parte forma manera tipo hecho hechos nuevo nueva nuevos nuevas ' +
    'primer primera segundo tercer gran mayor mejor peor'
  ).split(' '),
);

function tokens(text: string): Set<string> {
  const out = new Set<string>();
  const norm = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ');
  for (const raw of norm.split(' ')) {
    if (raw.length < 4 || STOPWORDS.has(raw)) continue;
    // Plural trivial: "agentes" y "agente" cuentan como lo mismo.
    out.add(raw.length > 4 && raw.endsWith('s') ? raw.slice(0, -1) : raw);
  }
  return out;
}

const CATEGORY_BONUS = 3;
// Sin categoría compartida, un candidato solo entra si comparte al menos
// ~dos palabras de título (2 puntos cada una) — nunca fabrica un match débil.
const MIN_KEYWORD_SCORE = 4;

interface RankOptions {
  text: string;
  category?: string;
  date: Date;
  excludeId?: string;
  alreadyUsed?: Set<string>;
  max: number;
  // true = si no alcanzan `max` candidatos temáticos, se completa con lo
  // más cercano en fecha del resto del sitio (comportamiento histórico de
  // "Sigue leyendo" en artículos). false = devolver menos antes que forzar.
  fill: boolean;
}

function rankPosts(allPosts: CollectionEntry<'posts'>[], o: RankOptions): CollectionEntry<'posts'>[] {
  const mine = tokens(o.text);
  const dist = (p: CollectionEntry<'posts'>) => Math.abs(p.data.pubDate.valueOf() - o.date.valueOf());
  const candidates = allPosts.filter((p) => p.id !== o.excludeId && !o.alreadyUsed?.has(p.id));

  const scored = candidates.map((p) => {
    let words = 0;
    for (const t of tokens(p.data.title)) if (mine.has(t)) words += 2;
    for (const t of tokens(p.data.description)) if (mine.has(t)) words += 1;
    const sameCategory = Boolean(o.category) && p.data.category === o.category;
    return { p, words, sameCategory, score: words + (sameCategory ? CATEGORY_BONUS : 0) };
  });

  const thematic = scored
    .filter((x) => x.sameCategory || x.words >= MIN_KEYWORD_SCORE)
    .sort((a, b) => b.score - a.score || dist(a.p) - dist(b.p))
    .slice(0, o.max)
    .map((x) => x.p);

  if (!o.fill || thematic.length >= o.max) return thematic;
  const taken = new Set(thematic.map((p) => p.id));
  const rest = candidates.filter((p) => !taken.has(p.id)).sort((a, b) => dist(a) - dist(b));
  return [...thematic, ...rest].slice(0, o.max);
}

// "Más evidencia" al pie de un artículo: misma categoría y palabras afines
// primero; completa por cercanía de fecha si no hay suficientes.
export function relatedPostsForPost(
  allPosts: CollectionEntry<'posts'>[],
  post: CollectionEntry<'posts'>,
  max = 3,
): CollectionEntry<'posts'>[] {
  return rankPosts(allPosts, {
    text: `${post.data.title} ${post.data.title} ${post.data.description}`,
    category: post.data.category,
    date: post.data.pubDate,
    excludeId: post.id,
    max,
    fill: true,
  });
}

interface RelatedPostsOptions {
  categoria?: string;
  date: Date;
  // Texto de la pieza (título + resumen + keywords) para la afinidad por palabras.
  text?: string;
  // Insights Visuales trae un `enlace` que a veces ya apunta a un artículo
  // real elegido a mano por Jorge — máxima confianza, se prioriza sobre el
  // match temático. Dato Incómodo no tiene este campo.
  enlace?: string | null;
  max?: number;
}

// Nunca fabrica un match: si no hay categoría mapeable ni palabras en común
// suficientes, regresa una lista vacía y la página no muestra la sección —
// mismo criterio que el resto del sitio (ver [[feedback-jorge-work-style]]).
export async function relatedPostsForPiece(opts: RelatedPostsOptions): Promise<CollectionEntry<'posts'>[]> {
  const max = opts.max ?? 3;
  const allPosts = await getCollection('posts', ({ data }) => !data.draft);

  const result: CollectionEntry<'posts'>[] = [];
  const usedIds = new Set<string>();

  if (opts.enlace && opts.enlace.startsWith('/articulos/')) {
    const slug = opts.enlace.replace(/^\/articulos\//, '').replace(/\/$/, '');
    const post = allPosts.find((p) => p.id === slug);
    if (post) {
      result.push(post);
      usedIds.add(post.id);
    }
  }

  if (result.length < max) {
    const postCategory = opts.categoria ? POST_CATEGORY_BY_PIECE_CATEGORIA[opts.categoria] : undefined;
    result.push(
      ...rankPosts(allPosts, {
        text: opts.text ?? '',
        category: postCategory,
        date: opts.date,
        alreadyUsed: usedIds,
        max: max - result.length,
        fill: false,
      }),
    );
  }

  return result;
}

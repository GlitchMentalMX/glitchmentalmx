import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { extractCollectionPage } from './lib/extract-collection.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const PAGINAS = path.join(ROOT, '..', 'content-export', 'paginas');
const OUT_DIR = path.join(ROOT, 'src', 'content', 'collections');
const SLUG_MAP = JSON.parse(readFileSync(path.join(ROOT, 'src', 'data', 'slug-map.json'), 'utf-8'));

function postSlugFromRoute(route) {
  // "/articulos/foo/" -> "foo"
  const m = route.match(/^\/articulos\/([^/]+)\/$/);
  return m ? m[1] : null;
}

function resolveLinks(links) {
  const slugs = [];
  for (const { href } of links) {
    const basename = href.split('/').pop().replace(/\.html$/, '');
    const route = SLUG_MAP[basename];
    const slug = route ? postSlugFromRoute(route) : null;
    if (slug && !slugs.includes(slug)) slugs.push(slug);
  }
  return slugs;
}

// Hand-curated editorial copy, sourced from each page's own hero/intro text.
const CURATION = {
  'el-negocio-de-la-virtud': {
    kind: 'series',
    order: 1,
    title: 'El Negocio de la Virtud',
    description:
      'Cómo la IA convirtió la ética en estrategia. Cinco artículos que desmontan el discurso moral de las grandes empresas de inteligencia artificial — desde la alianza con el Vaticano hasta la sustitución de empleados por sistemas que ellos mismos desarrollan.',
  },
  'panoptico-digital': {
    kind: 'series',
    order: 2,
    title: 'Panóptico Digital',
    description:
      'Cinco análisis sobre el poder invisible que decide lo que ves, lees y piensas. Las plataformas no son espacios neutros: son sistemas de control que monetizan tu atención y moldean tu realidad, y nadie las eligió para hacerlo.',
  },
  'manos-libres': {
    kind: 'series',
    order: 3,
    title: 'Manos Libres',
    description:
      'Cuatro disciplinas, una sola pregunta: ¿queda algo que la IA no pueda hacer más barato? Fotografía, música, escritura y diseño — cuatro análisis sobre lo que le está pasando al trabajo creativo cuando la IA hace lo mismo que tú, pero sin cobrar derechos ni pedir vacaciones.',
  },
  'protocolo-kernel': {
    kind: 'series',
    order: 4,
    title: 'Protocolo Kernel',
    description:
      'Cinco análisis sobre lo que pasa cuando la biología se convierte en código — y alguien decide quién tiene acceso. El ADN ya es software, la evolución ya tiene patrocinadores, y la pregunta no es si biología y tecnología van a fusionarse, sino quién va a controlar el resultado.',
  },
  'humanos-en-beta': {
    kind: 'series',
    order: 5,
    title: 'Humanos en Beta',
    description:
      'Siete análisis sobre lo que le está pasando a la identidad humana en tiempo real — y nadie pausó el experimento para preguntarte. La tecnología no solo cambia lo que haces, cambia lo que crees que eres.',
  },
  'el-espia-que-compraste': {
    kind: 'series',
    order: 6,
    title: 'El Espía que Compraste',
    description:
      'Cinco análisis sobre los dispositivos que viven en tu casa, tu bolsillo y tu cuerpo — y trabajan para alguien más. No te los regalaron: los pagaste. Y aun así recopilan tus datos, moldean tu comportamiento y te encierran en ecosistemas de los que es muy difícil salir.',
  },
  'biblioteca-de-ia-tecnologia-y-sociedad': {
    kind: 'hub',
    order: 1,
    title: 'Biblioteca de IA, Tecnología y Sociedad',
    description:
      'Artículos de fondo en español para entender qué le está haciendo la tecnología al mundo y a las personas. Sin hype, sin agenda. La mayoría de los artículos sobre IA explican cómo usar las herramientas — esta biblioteca explica qué está pasando detrás: quién tiene el poder, quién lo pierde y qué queda fuera de la conversación pública.',
  },
  'mapa-de-poder-tech': {
    kind: 'hub',
    order: 2,
    title: 'Mapa de Poder Tech',
    description:
      'Quién controla la infraestructura digital global, cómo se distribuye el poder tecnológico y qué le toca a LATAM en ese tablero. El poder tecnológico no se distribuye de forma neutral: hay empresas que controlan la infraestructura, gobiernos que escriben las reglas y regiones enteras que las reciben sin negociarlas.',
  },
  'recursos-para-ensenar-ia-y-tecnologia': {
    kind: 'hub',
    order: 3,
    title: 'Recursos para Enseñar IA y Tecnología',
    description:
      'Material curado por nivel y tipo de uso para llevar tecnología, inteligencia artificial y cultura digital al aula. Para docentes, capacitadores, bibliotecarios y divulgadores que necesitan rigor sin tecnicismos y sin depender de recursos en inglés.',
  },
  'guias-esenciales': {
    kind: 'hub',
    order: 4,
    title: 'Guías Esenciales',
    description:
      'Las ideas clave detrás de la cultura digital, los comportamientos online, la inteligencia artificial y el impacto real de la tecnología en la vida cotidiana. El punto de entrada si es tu primera vez en glitchmentalMX.',
  },
  'horizonte-critico': {
    kind: 'hub',
    order: 5,
    title: 'Horizonte Crítico',
    description:
      'Las tecnologías que van a cambiar todo, analizadas sin el entusiasmo que vende portadas ni el cinismo que evita compromisos — organizadas por horizonte temporal: lo que ya está cambiando, lo que cambiará antes de 2030 y lo que reescribirá las reglas después.',
  },
  'detras-del-prompt': {
    kind: 'hub',
    order: 6,
    title: 'Detrás del Prompt',
    description:
      'Cada prompt tiene un costo físico: agua, electricidad, concreto y territorio. Esta serie audita ese costo, estado por estado, en la infraestructura de IA que se está construyendo en México.',
  },
};

mkdirSync(OUT_DIR, { recursive: true });

for (const [slug, meta] of Object.entries(CURATION)) {
  const { links } = extractCollectionPage(path.join(PAGINAS, `${slug}.html`));
  const postSlugs = resolveLinks(links);
  const frontmatter = {
    title: meta.title,
    kind: meta.kind,
    status: 'published',
    description: meta.description,
    postSlugs,
    order: meta.order,
  };
  const out = matter.stringify('', frontmatter);
  writeFileSync(path.join(OUT_DIR, `${slug}.md`), out);
  console.log(`${slug}: ${postSlugs.length}/${links.length} links resolved`);
}

// The 7th named series, not yet published on the old site.
const comingSoon = {
  title: 'Ingeniería de la Confianza',
  kind: 'series',
  status: 'coming-soon',
  description:
    'Próximamente. Una nueva serie sobre cómo se construye —y se rompe— la confianza en los sistemas de IA que ya toman decisiones por nosotros.',
  postSlugs: [],
  order: 7,
};
writeFileSync(
  path.join(OUT_DIR, 'ingenieria-de-la-confianza.md'),
  matter.stringify('', comingSoon)
);
console.log('ingenieria-de-la-confianza: coming soon, 0 links');

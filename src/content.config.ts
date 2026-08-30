import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { readFile } from 'node:fs/promises';

// Lee un único archivo JSON plano (sin envolver en lista, sin campo id) y lo
// expone como una sola entrada de la colección — necesario porque Decap CMS
// escribe/lee este archivo como objeto plano, mientras que el loader
// genérico file() de Astro espera una lista.
function singleJsonEntryLoader(relativePath, entryId) {
  return {
    name: 'single-json-entry-loader',
    load: async ({ store, config }) => {
      const url = new URL(relativePath, config.root);
      const raw = await readFile(url, 'utf-8');
      const data = JSON.parse(raw);
      store.clear();
      store.set({ id: entryId, data });
    },
  };
}

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['Inteligencia Artificial', 'Cultura Digital', 'Tendencias Digitales', 'Tecnología de Consumo']),
    pubDate: z.coerce.date(),
    updatedDate: z.preprocess((val) => (val === '' ? undefined : val), z.coerce.date().optional()),
    description: z.string(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    draft: z.boolean().default(false),
  }),
});

const editorialCollections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/collections' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['series', 'hub']),
    status: z.enum(['published', 'coming-soon']).default('published'),
    description: z.string(),
    intro: z.string().optional(),
    postSlugs: z.array(z.string()).default([]),
    sections: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          posts: z.array(
            z.object({
              slug: z.string(),
              tag: z.enum(['ancla', 'serie', 'caso', 'debate']).optional(),
              label: z.string().optional(),
            })
          ),
        })
      )
      .optional(),
    findings: z.array(z.string()).optional(),
    conclusion: z.string().optional(),
    capstone: z.string().optional(),
    capstoneLabel: z.string().optional(),
    subtitle: z.string().optional(),
    closing: z.string().optional(),
    chapterLabels: z.record(z.string(), z.string()).optional(),
    relatedBook: z.string().optional(),
    related: z.array(z.string()).default([]),
    order: z.number().default(0),
    group: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eyebrow: z.string(),
    headline: z.string(),
    dek: z.string().optional(),
    noIndex: z.boolean().default(false),
  }),
});

const visualInsights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    imagen: z.string(),
    imagenAlt: z.string().optional(),
    enlace: z.string().nullable().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    categoria: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .enum([
          'Inteligencia Artificial',
          'Narrativa de la IA',
          'Sistemas Autónomos',
          'IA Agéntica',
          'Futuro del Trabajo',
          'Cultura Digital',
          'Psicología Digital',
          'Tecnología de Consumo',
          'Tendencias Digitales',
        ])
        .optional()
    ),
    // Solo para el home y material de RS — nunca se muestra en los cards de /insights-visuales/.
    punchline: z.string().optional(),
  }),
});

const datoIncomodo = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dato-incomodo' }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    imagen: z.string(),
    imagenAlt: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

// Colección separada de "posts" a propósito: estos 14 artículos son contenido
// utilitario/referencial (precio del día, no análisis editorial) y no deben
// mezclarse con el campo `category` de posts (que clasifica tema editorial,
// no tipo de contenido) ni aparecer en RSS/archivo/home, que solo leen
// `posts`. Comparten la ruta /articulos/[slug].astro con `posts` (unión en
// getStaticPaths) para mantener la URL que pide el brief y reutilizar la
// plantilla de artículo ya construida.
const preciosIA = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/precios-ia' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    herramienta: z.string(),
    herramientaId: z.string(),
    sitioOficial: z.string().url(),
    pubDate: z.coerce.date(),
    updatedDate: z.preprocess((val) => (val === '' ? undefined : val), z.coerce.date().optional()),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Colección hermana de `preciosIA`, mismo criterio de separación: contenido
// utilitario/referencial (veredicto de privacidad, no análisis editorial),
// no debe mezclarse con `category` de posts ni aparecer en RSS/archivo/home.
// Comparte la ruta /articulos/[slug].astro con `posts` y `preciosIA` (unión
// en getStaticPaths) para reutilizar la plantilla de artículo ya construida.
const entrenaIA = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/entrena-ia' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    herramienta: z.string(),
    herramientaId: z.string(),
    empresa: z.string(),
    sitioOficial: z.string().url(),
    veredicto: z.enum(['rojo', 'verde', 'amarillo']),
    fraseCorta: z.string(),
    fuentePolitica: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.preprocess((val) => (val === '' ? undefined : val), z.coerce.date().optional()),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Tercera colección de la familia "IA sin letra chiquita", mismo criterio de
// separación que preciosIA/entrenaIA: contenido utilitario/referencial (si
// una herramienta pide tarjeta para su prueba gratis), no debe mezclarse con
// `category` de posts ni aparecer en RSS/archivo/home. Comparte la ruta
// /articulos/[slug].astro con las otras dos (unión en getStaticPaths).
const pruebaGratis = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prueba-gratis' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    herramienta: z.string(),
    herramientaId: z.string(),
    empresa: z.string(),
    sitioOficial: z.string().url(),
    veredicto: z.enum(['rojo', 'verde', 'amarillo']),
    fraseCorta: z.string(),
    fuenteVerificacion: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.preprocess((val) => (val === '' ? undefined : val), z.coerce.date().optional()),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Cuarta colección de la familia "IA sin letra chiquita", mismo criterio de
// separación que preciosIA/entrenaIA/pruebaGratis: contenido utilitario/
// referencial (si el código de descuento que circula para una herramienta es
// real o falso), no debe mezclarse con `category` de posts ni aparecer en
// RSS/archivo/home. Comparte la ruta /articulos/[slug].astro con las otras
// tres (unión en getStaticPaths). `veredicto` reusa los mismos 3 valores por
// consistencia con el resto de la familia, pero la semántica es propia de
// esta serie: rojo = no existe código real, amarillo = solo promos oficiales
// limitadas, verde = sí existe un código/promo activa y verificable hoy.
const codigosDescuento = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/codigos-descuento' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    herramienta: z.string(),
    herramientaId: z.string(),
    empresa: z.string(),
    sitioOficial: z.string().url(),
    veredicto: z.enum(['rojo', 'verde', 'amarillo']),
    fraseCorta: z.string(),
    fuenteVerificacion: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.preprocess((val) => (val === '' ? undefined : val), z.coerce.date().optional()),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const indiceGlitchmentalmx = defineCollection({
  loader: singleJsonEntryLoader('./src/content/indice/actual.json', 'actual'),
  schema: z.object({
    mes: z.string(),
    ranking: z.array(
      z.object({
        pos: z.number(),
        nombre: z.string(),
        pts: z.number(),
      })
    ),
    destacados: z.array(
      z.object({
        pos: z.number(),
        nombre: z.string(),
        texto: z.string(),
      })
    ),
    sube: z.string(),
    baja: z.string(),
    insight: z.string(),
  }),
});

export const collections = {
  posts,
  editorialCollections,
  pages,
  visualInsights,
  datoIncomodo,
  indiceGlitchmentalmx,
  preciosIA,
  entrenaIA,
  pruebaGratis,
  codigosDescuento,
};

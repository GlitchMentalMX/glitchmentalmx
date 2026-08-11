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
    updatedDate: z.coerce.date().optional(),
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
    enlace: z.string().nullable().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const datoIncomodo = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dato-incomodo' }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    imagen: z.string(),
    date: z.coerce.date(),
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
};

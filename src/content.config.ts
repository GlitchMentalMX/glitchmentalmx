import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
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
    postSlugs: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const visualInsights = defineCollection({
  loader: file('./src/content/data/insights-visuales.json'),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    resumen: z.string(),
    imagen: z.string(),
    enlace: z.string().nullable(),
  }),
});

const datoIncomodo = defineCollection({
  loader: file('./src/content/data/dato-incomodo.json'),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    resumen: z.string(),
    imagen: z.string(),
  }),
});

export const collections = {
  posts,
  editorialCollections,
  visualInsights,
  datoIncomodo,
};

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { isDue } from '../lib/publishing';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft && isDue(data.pubDate));
  const index = posts.map((post) => ({
    title: post.data.title,
    url: `/articulos/${post.id}/`,
    excerpt: post.data.description,
    image: post.data.heroImage,
    imageAlt: post.data.heroImageAlt,
    category: post.data.category,
    date: post.data.pubDate,
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};

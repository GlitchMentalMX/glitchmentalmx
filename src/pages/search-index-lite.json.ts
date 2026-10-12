import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const index = posts.map((post) => ({
    title: post.data.title,
    url: `/articulos/${post.id}/`,
    category: post.data.category,
    date: post.data.pubDate,
    excerpt: (post.data.description ?? '').slice(0, 120),
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};

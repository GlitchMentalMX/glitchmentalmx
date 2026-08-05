import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const index = posts.map((post) => ({
    title: post.data.title,
    url: `/articulos/${post.id}/`,
    excerpt: post.data.description,
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};

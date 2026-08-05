# glitchmentalMX

Publicación editorial en español sobre IA, tecnología y cultura digital.
Construido con [Astro](https://astro.build) y publicado en GitHub Pages.

Migrado desde Blogger — ver `../content-export/` para el material fuente
original (379 artículos, 28 páginas, `feed.atom`).

## Empezar

```sh
npm install
npm run dev
```

Abre http://localhost:4321

## Estructura

- `src/content/posts/` — los 379 artículos (Markdown + frontmatter)
- `src/content/collections/` — series editoriales y colecciones temáticas
- `src/content/data/` — datos de Insights Visuales y Dato Incómodo
- `src/pages/` — rutas del sitio
- `src/components/`, `src/layouts/` — sistema de diseño
- `public/images/` — imágenes auto-hospedadas (descargadas de Blogger)
- `public/2025/`, `public/2026/`, `public/p/` — redirecciones desde las URLs
  antiguas de Blogger hacia las nuevas rutas
- `scripts/` — scripts de migración usados una sola vez (no se vuelven a
  correr salvo que necesites reprocesar `content-export/` de nuevo)

## Publicar

Ver [`GUIA-DE-PUBLICACION.md`](./GUIA-DE-PUBLICACION.md) para instrucciones
paso a paso, sin conocimientos técnicos previos, de cómo:

- correr el sitio en local
- subirlo a GitHub
- activar GitHub Pages
- conectar el dominio `glitchmental.com`

## Comandos

| Comando           | Acción                                        |
| :----------------- | :--------------------------------------------- |
| `npm install`       | Instala dependencias                           |
| `npm run dev`       | Corre el sitio en `localhost:4321`             |
| `npm run build`     | Genera el sitio final en `./dist/`             |
| `npm run preview`   | Previsualiza el build antes de publicar        |

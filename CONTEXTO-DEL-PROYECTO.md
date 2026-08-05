# Contexto completo: migración de GlitchMentalMX

> Documento de referencia para dar contexto a cualquier asistente de IA (Claude, ChatGPT, etc.) sobre el estado del proyecto. Pégalo completo al inicio de una conversación nueva cuando necesites ayuda.

## 1. Qué es esto y por qué existe

**GlitchMentalMX** (`glitchmental.com`) es una publicación editorial en español sobre IA, tecnología y cultura digital, activa desde noviembre de 2025, dirigida por Jorge A. Diaz Elizondo (también autor de tecnothrillers — ver sección Novelas).

El **4 de agosto de 2026**, Google suspendió el blog original (que vivía en Blogger) por una alerta automatizada de "software malicioso" — casi con certeza un falso positivo, ya que el sitio era 100% contenido editorial sin scripts externos sospechosos. Se presentó apelación formal, pero la decisión de migrar fuera de Blogger **no depende de esa apelación** — es definitiva e independiente del resultado.

Se migró todo el sitio a una arquitectura propia: **Astro + GitHub Pages**, con el dominio propio `glitchmental.com` (ya no depende de infraestructura de Google en absoluto, incluidas las imágenes, que antes vivían en `blogger.googleusercontent.com` y ahora están auto-alojadas).

## 2. Filosofía de diseño

El dueño no tenía compromiso con el diseño visual anterior. La instrucción fue **diseñar con libertad total**, con `#0066FF` como único color de marca heredado — sin obligación de replicar paletas, tipografías ni layouts anteriores.

Sistema de diseño resultante:
- **Tipografías** (auto-alojadas vía `@fontsource`, sin depender de Google Fonts): `Fraunces` (serif editorial, para titulares), `Inter` (sans, cuerpo de texto), `JetBrains Mono` (etiquetas/metadatos).
- **Color**: soporta modo claro y oscuro (toggle + `prefers-color-scheme`), base gris casi-negro/casi-blanco, azul `#0066FF` como acento único y deliberadamente escaso.
- Estética: editorial/revista seria, no "dark neon de IA genérica".

## 3. Stack técnico

- **Astro 7.1.6** (SSG — sitio 100% estático)
- **Content Collections** de Astro (Markdown + frontmatter) como fuente de contenido
- **GitHub Pages** como hosting, desplegado vía **GitHub Actions** (`.github/workflows/deploy.yml`: en cada push a `main` → `npm ci` → `npm run build` → publica a Pages)
- Repositorio: **`GlitchMentalMX/glitchmentalmx`** (público, cuenta de organización)
- Dominio conectado vía DNS en **Squarespace Domains** (4 registros A apuntando a las IPs de GitHub Pages, CNAME `www`); los registros de correo de iCloud (MX, DKIM/SPF/DMARC) se dejaron intactos.
- El propietario **no es programador** — el flujo de trabajo para subir cambios es **GitHub Desktop** (no terminal/git CLI), con sesión iniciada vía navegador.

## 4. Migración de contenido

Todo el contenido venía de una carpeta `content-export/` (exportada previamente de Blogger) con:
- 379 artículos ya convertidos a Markdown
- 28 páginas especiales como HTML crudo
- `feed.atom` (exportación original de Google Takeout)

Se escribieron scripts de Node (carpeta `scripts/`, documentados, reutilizables si hiciera falta volver a procesar algo) para:
- Mapear URLs viejas de Blogger → nuevas rutas del sitio (`scripts/build-slug-map.mjs`), cruzando `feed.atom` con los títulos de los posts migrados
- Migrar los 379 posts, **descargando y auto-alojando todas las imágenes** (antes vivían en `blogger.googleusercontent.com`), reescribiendo enlaces internos a las nuevas rutas (`scripts/migrate-posts.mjs`)
- Migrar las 6 series editoriales + 6 colecciones temáticas, resolviendo sus listas de artículos enlazados a las nuevas rutas (`scripts/migrate-collections.mjs`)
- Migrar las galerías visuales "Insights Visuales" y "Dato Incómodo" (`scripts/migrate-visual-pages.mjs`)

**Bug real encontrado y corregido**: el proxy de imágenes de Google devolvía bytes JPEG reales para URLs que terminaban en `.webp` una vez que se reescribía el parámetro de tamaño — esto afectó ~579 imágenes en todo el sitio (extensión mentirosa). Se corrigió detectando el formato real por los bytes del archivo (no por la URL) y renombrando; también se corrigió la causa raíz en el script de migración para que no vuelva a pasar si se reprocesa contenido.

## 5. Arquitectura de información (rutas)

```
/                                  home
/articulos/[slug]/                 artículo individual (379)
/archivo/                          archivo cronológico paginado
/series/                           índice de series editoriales
/series/[slug]/                    7 series (6 con contenido + "Ingeniería de la Confianza" próximamente)
/colecciones/                      índice de colecciones temáticas
/colecciones/[slug]/               6 colecciones, agrupadas: 3 sueltas (Guías Esenciales, Horizonte
                                    Crítico, Detrás del Prompt) + 3 bajo "Recursos educativos"
                                    (Biblioteca de IA/Tecnología/Sociedad, Recursos para Enseñar IA,
                                    Mapa de Poder Tech)
/glitchsearch/                     herramienta de búsqueda (ver sección 6)
/calculadora-de-riesgo-de-reemplazo-por-ia-2026/   calculadora (ver sección 6)
/indice-glitchmentalmx/            ranking mensual de 20 tecnologías B2B
/insights-visuales/                galería de "imagen + análisis" (95 items)
/dato-incomodo/                    galería de datos incómodos (112 items, el dueño la actualiza A DIARIO)
/novelas/                          página de las novelas del autor (antes se llamaba /autor/)
/acerca-de/, /contacto/, /colabora/, /publicidad-en-glitchmentalmx/,
/servicios-editoriales-glitchmentalmx/, /editorial-services-glitchmentalmx/ (EN),
/politica-de-privacidad/, /aviso-legal-y-condiciones-de-uso/, /suscribete/    páginas fijas
/gracias/                          página de bienvenida para nuevos suscriptores (con PDFs exclusivos,
                                    NO enlazada en el menú — solo la alcanza el redirect del formulario externo)
/admin/                            panel de administración de contenido (ver sección 7)
```

### Estructura del home (evolucionó varias veces, esta es la versión actual)

Hero (texto de intro) → Featured (1 artículo grande) → **Explora** (3 tarjetas con imagen de fondo: Series editoriales / Colecciones-3 con mini-enlaces / Recursos educativos-3 con mini-enlaces) → **Insights Visuales** (1 sola imagen, la más reciente, enlaza a la galería) → **Novelas** (portadas centradas, más grandes en desktop) → **Herramientas** (3 tarjetas: Índice / GlitchSearch / Calculadora) → **Archivo Total** (tarjeta compacta y centrada, completamente clicable, sin botón separado) → Footer (con su propio CTA de suscripción).

## 6. Herramientas interactivas (lógica preservada del sitio original)

- **GlitchSearch**: usa Google Programmable Search Engine para resultados + un "veredicto de IA" generado con Gemini (con 3 modelos de respaldo) y un Cloudflare Worker con Groq como último respaldo.
  **⚠️ Pendiente sin resolver**: la clave de Gemini quedó pública en GitHub (inevitable en una app 100% del lado del cliente sin backend) y **Google la revocó automáticamente** al detectarla — ya no funciona. Además, el Worker de Groq tiene su CORS restringido solo a `www.glitchmental.com` y rechaza el dominio nuevo `glitchmental.com` (sin www). **Falta**: generar una clave nueva de Gemini (con restricción de referrer a `glitchmental.com`) y actualizar la lista de orígenes permitidos en el Worker de Cloudflare. Mientras tanto, la búsqueda normal (resultados de Google) sigue funcionando bien — solo el "veredicto de IA" está caído.
- **Calculadora de Riesgo de Reemplazo por IA 2026**: lógica 100% del lado del cliente (sin llamadas a APIs externas), migrada completa y funcionando sin problemas.

## 7. Panel de administración de contenido (Decap CMS)

En `/admin/`, con inicio de sesión vía GitHub OAuth. Requirió infraestructura propia (GitHub Pages es estático puro, no tiene backend):
- Una **GitHub OAuth App** ("GlitchMentalMX CMS")
- Un **Cloudflare Worker** propio (`cloudflare/decap-cms-oauth-worker.js`, desplegado en `glitchmentalmx.contacto-fbf.workers.dev`) que hace de intermediario seguro del login — el Client Secret vive solo ahí, nunca en el repositorio

**Colecciones editables desde el panel:**
- **Artículos** (los 379 posts — crear nuevos y editar existentes)
- **Páginas fijas** (10 páginas: Acerca de, Contacto, Suscríbete, Colabora, Publicidad, Servicios Editoriales ES/EN, Política de Privacidad, Aviso Legal, Gracias — cada una con título, descripción, encabezado y cuerpo en Markdown)
- **Insights Visuales** (95 items — el más reciente por fecha aparece en el home)
- **Dato Incómodo** (112 items — el dueño agrega uno nuevo cada día; el más reciente por fecha aparece primero en la página)

**Importante sobre el flujo**: publicar desde el panel = **commit directo a `main`**, sin revisión intermedia — se ve reflejado en el sitio en 1-2 minutos (el tiempo que tarda GitHub Actions en reconstruir).

**No editable desde el panel** (por diseño — son código/layout, no contenido suelto): el layout del home en sí, las páginas de las herramientas (GlitchSearch, Calculadora — tienen lógica JS incrustada), las series/colecciones (siguen siendo archivos `.md` editados a mano con listas de artículos), la página de Novelas, la tabla del Índice mensual.

## 8. Lecciones técnicas encontradas durante el proyecto (útiles si algo se rompe)

1. **CSS `aspect-ratio` + atributos HTML `width`/`height`**: si el `<img>` tiene atributos `width`/`height` en el HTML y el CSS solo sobreescribe `width` (no `height`), el navegador puede ignorar `aspect-ratio` y usar el `height` del atributo tal cual — rompiendo la proporción, sobre todo en mobile. Solución: siempre acompañar `aspect-ratio` con `height: auto` explícito en CSS.
2. **Nunca anidar `<a>` dentro de `<a>`**: es HTML inválido: el navegador corta el enlace exterior en cuanto encuentra el interior, partiendo el elemento en pedazos de forma impredecible. Si una tarjeta-enlace necesita contener sub-enlaces propios, la tarjeta debe ser un `<div>`, no un `<a>`.
3. El servidor de desarrollo de Astro (`astro dev`) a veces no sirve bien archivos estáticos nuevos dentro de `public/` (como `/admin/`) — si eso pasa, probar con `npm run build && astro preview`, que replica el comportamiento real de producción.

## 9. Estructura del repositorio (rutas clave)

```
src/content/posts/*.md              379 artículos
src/content/collections/*.md        6 series + 6 colecciones + 1 serie "próximamente"
src/content/pages/*.md              10 páginas fijas editables desde el panel
src/content/insights/*.md           95 items de Insights Visuales
src/content/dato-incomodo/*.md      112 items de Dato Incómodo
src/content.config.ts               esquemas de todas las colecciones de contenido (Zod)
src/pages/                          rutas del sitio (home, artículos, series, herramientas, etc.)
src/components/                     Header, Footer, ArticleCard, PageHeader, etc.
src/layouts/Layout.astro            layout base (SEO, tema claro/oscuro)
src/styles/global.css               tokens de diseño y estilos globales
public/admin/                       configuración del panel Decap CMS (config.yml + index.html)
public/images/                      todas las imágenes auto-alojadas
scripts/                            scripts de migración (uso único, documentados)
cloudflare/decap-cms-oauth-worker.js  copia de referencia del Worker desplegado
.github/workflows/deploy.yml        integración/despliegue continuo
```

## 10. Pendientes conocidos

- **GlitchSearch**: reparar el veredicto de IA (clave de Gemini nueva + arreglar CORS del Worker de Groq) — ver sección 6.
- La apelación a Blogger sigue su curso, pero ya no bloquea nada — el sitio real vive en `glitchmental.com` de forma independiente.
- El diseño del home puede seguir evolucionando (número de artículos en la grilla, módulos nuevos) — es un trabajo vivo, no cerrado.

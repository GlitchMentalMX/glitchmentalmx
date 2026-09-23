// Slugify determinístico para piezas de colecciones sin slug real en el
// nombre de archivo (Dato Incómodo, Insights Visuales — ver
// content.config.ts). Deliberadamente en .mjs plano, sin sintaxis TS: se
// importa tal cual desde tres contextos distintos que deben calcular
// EXACTAMENTE el mismo slug para la misma pieza — las páginas individuales
// (Vite/Astro), astro.config.mjs (Node plano, para el lastmod del sitemap) y
// el script de migración retroactiva (también Node plano). Un solo archivo
// fuente evita que esos tres cálculos se desincronicen con el tiempo.
//
// El campo `slug` del CMS es un override manual opcional; si no está, el
// slug sale del texto principal de la pieza (resumen en Dato Incómodo,
// titulo en Insights Visuales — ver getStaticPaths de cada página). El
// orden de entrada a assignPieceSlugs SIEMPRE debe ser por id (nombre de
// archivo, que nunca cambia) para que, si dos piezas producen el mismo
// slug base, cuál de las dos gana el slug "limpio" y cuál recibe el sufijo
// -2 se mantenga estable entre builds aunque se agreguen piezas nuevas.

export function slugifyPiece(text) {
  const base = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’"¿¡]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || 'pieza';
}

function truncateSlug(slug, max = 90) {
  if (slug.length <= max) return slug;
  const cut = slug.slice(0, max);
  const lastDash = cut.lastIndexOf('-');
  return (lastDash > 30 ? cut.slice(0, lastDash) : cut).replace(/-+$/, '');
}

/**
 * @param {{ id: string, override?: string, text: string }[]} items
 * @returns {Map<string, string>} id -> slug
 */
export function assignPieceSlugs(items) {
  const sorted = [...items].sort((a, b) => a.id.localeCompare(b.id));
  const used = new Set();
  const result = new Map();
  for (const item of sorted) {
    const override = item.override?.trim();
    let base = truncateSlug(slugifyPiece(override || item.text));
    // Guardia por si un dato muy corto slugifica a puro número — evita que
    // choque con las URLs de paginación /dato-incomodo/2/, /3/, etc.
    if (/^\d+$/.test(base)) base = `pieza-${base}`;
    let candidate = base;
    let n = 2;
    while (used.has(candidate)) candidate = `${base}-${n++}`;
    used.add(candidate);
    result.set(item.id, candidate);
  }
  return result;
}

const MONTHS_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

export function formatDate(date: Date): string {
  return `${date.getDate()} de ${MONTHS_ES[date.getMonth()]} de ${date.getFullYear()}`;
}

export function formatDateShort(date: Date): string {
  return `${date.getDate()} ${MONTHS_ES[date.getMonth()].slice(0, 3)} ${date.getFullYear()}`;
}

// Title tag corto para la serie "Precios de IA" — deliberadamente distinto
// del H1 (que se queda largo y descriptivo). Nombres de herramienta cortos
// (<=12) usan la plantilla larga con pregunta; nombres largos usan la
// plantilla compacta para no rebasar el ancho de píxel que trunca Google.
export function buildPrecioIATitleTag(herramienta: string): string {
  return herramienta.length <= 12
    ? `¿Cuánto cuesta ${herramienta} hoy? Precio en México (MXN)`
    : `${herramienta}: precio en MXN hoy, no en USD`;
}

export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Escapa HTML y convierte **negritas** en <strong> — para campos de texto plano
// (no markdown) del CMS que necesitan un énfasis puntual, como resúmenes o
// conclusiones editoriales.
export function mdBold(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

// Igual que mdBold, pero para titulares: convierte **frase** en un <span>
// acentuado en azul en vez de negritas — usado por PageHeader para resaltar
// la palabra o frase de mayor impacto en el título de cada landing.
export function mdAccent(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped.replace(/\*\*(.+?)\*\*/g, '<span class="accent">$1</span>');
}

// Quita los marcadores **frase** sin envolver nada en HTML — para usar un
// headline (pensado para mdAccent) como texto plano, p. ej. en breadcrumbs o
// JSON-LD, donde los asteriscos literales no deben aparecer.
export function mdStrip(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1');
}

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

export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

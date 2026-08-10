// Programación de publicaciones: un artículo/insight/dato con fecha futura
// existe en el repositorio pero se trata como si no existiera hasta que esa
// fecha llega — así se puede escribir con anticipación sin que se publique
// de inmediato. El sitio se reconstruye solo cada hora (ver
// .github/workflows/deploy.yml), así que lo programado aparece solo, sin
// que nadie tenga que entrar a publicarlo manualmente.
export function isDue(date: Date): boolean {
  return date.valueOf() <= Date.now();
}

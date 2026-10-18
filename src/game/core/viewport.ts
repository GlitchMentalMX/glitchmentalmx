import { H, W } from './config';

// El escenario de diseño es 9:16 (540x960), pero el canvas se adapta al
// aspecto real de la pantalla para llenarla sin deformar nada: si la pantalla
// es más ancha, el mundo se extiende a los lados; si es más alta, arriba y
// abajo. El contenido jugable siempre está dentro de los 540x960 centrales y
// cada escena dibuja decorado en el resto. Fuera de estos límites (monitores
// horizontales) se deja el escenario centrado con barras decorativas, para que
// la sala no se vuelva un cuarto enorme y vacío.
export const MIN_ASPECT = 0.42;
export const MAX_ASPECT = 0.75;
const BASE = W / H;

export function computeStageSize(el: HTMLElement): { w: number; h: number } {
  const a = el.clientWidth / Math.max(1, el.clientHeight);
  const ca = Math.min(MAX_ASPECT, Math.max(MIN_ASPECT, a));
  return ca >= BASE ? { w: Math.round(H * ca), h: H } : { w: W, h: Math.round(W / ca) };
}

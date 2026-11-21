// Cálculos sobre src/data/precios-ia-historial.json (lo mantiene
// scripts/actualizar-historial-precios.mjs). Todo se deriva en build-time de
// dos cosas verificables: el tipo de cambio FIX de Banxico de cada día hábil y
// el precio en USD vigente en cada fecha. Nada se estima ni se interpola.
import historial from '../data/precios-ia-historial.json';
import tipoCambio from '../data/tipo-cambio.json';
import preciosUSD from '../data/precios-ia-usd.json';

export interface EntradaPrecio {
  desde: string; // 'YYYY-MM-DD' — fecha en que se registró este precio
  precioUSD: number;
  periodo: string;
}

export interface PuntoMXN {
  fecha: string;
  mxn: number;
  usd: number;
}

const precios = historial.precios as unknown as Record<string, EntradaPrecio[]>;
const fxPuntos = historial.tipoCambio as { fecha: string; valor: number }[];

export function fechaDe(iso: string): Date {
  return new Date(`${iso}T12:00:00-06:00`);
}

function precioUSDEn(id: string, fecha: string): number | undefined {
  const entradas = precios[id];
  if (!entradas) return undefined;
  let vigente: EntradaPrecio | undefined;
  for (const e of entradas) {
    if (e.desde <= fecha) vigente = e;
  }
  return vigente?.precioUSD;
}

// Serie en pesos: solo desde que seguimos la herramienta (su primera entrada)
// y solo en días con dato de Banxico.
export function serieMXN(id: string): PuntoMXN[] {
  const entradas = precios[id];
  if (!entradas?.length) return [];
  const inicio = entradas[0].desde;
  const serie: PuntoMXN[] = [];
  for (const p of fxPuntos) {
    if (p.fecha < inicio) continue;
    const usd = precioUSDEn(id, p.fecha);
    if (usd === undefined) continue;
    serie.push({ fecha: p.fecha, mxn: usd * p.valor, usd });
  }
  return serie;
}

export interface CambioPrecio {
  id: string;
  desde: string;
  de: number;
  a: number;
  periodo: string;
}

// Cambios reales de precio en USD (excluye el alta de la herramienta).
export function cambiosDePrecio(id?: string): CambioPrecio[] {
  const ids = id ? [id] : Object.keys(precios);
  const out: CambioPrecio[] = [];
  for (const k of ids) {
    const e = precios[k] ?? [];
    for (let i = 1; i < e.length; i++) {
      out.push({ id: k, desde: e[i].desde, de: e[i - 1].precioUSD, a: e[i].precioUSD, periodo: e[i].periodo });
    }
  }
  return out.sort((a, b) => (a.desde < b.desde ? 1 : a.desde > b.desde ? -1 : 0));
}

export interface ResumenHistorial {
  desde: string;
  primeroMXN: number;
  hoyMXN: number;
  variacionPct: number;
  min: PuntoMXN;
  max: PuntoMXN;
  dias: number;
  cambios: CambioPrecio[];
}

export function resumenHistorial(id: string): ResumenHistorial | undefined {
  const serie = serieMXN(id);
  if (serie.length < 3) return undefined;
  const primero = serie[0];
  const hoy = serie[serie.length - 1];
  const dias = Math.round((fechaDe(hoy.fecha).getTime() - fechaDe(primero.fecha).getTime()) / 86400000);
  if (dias < 7 || primero.mxn <= 0) return undefined;
  const min = serie.reduce((m, p) => (p.mxn < m.mxn ? p : m));
  const max = serie.reduce((m, p) => (p.mxn > m.mxn ? p : m));
  return {
    desde: primero.fecha,
    primeroMXN: primero.mxn,
    hoyMXN: hoy.mxn,
    variacionPct: ((hoy.mxn - primero.mxn) / primero.mxn) * 100,
    min,
    max,
    dias,
    cambios: cambiosDePrecio(id),
  };
}

// Variación del propio dólar en el periodo que cubre el historial: es lo que
// mueve en pesos TODAS las herramientas cobradas en USD que no cambiaron de precio.
export function variacionDolar() {
  const a = fxPuntos[0];
  const b = fxPuntos[fxPuntos.length - 1];
  return {
    desde: a.fecha,
    hasta: b.fecha,
    valorDesde: a.valor,
    valorHasta: b.valor,
    pct: ((b.valor - a.valor) / a.valor) * 100,
  };
}

export function precioMXNHoy(id: string): number | undefined {
  const p = (preciosUSD as Record<string, { precioUSD?: number }>)[id];
  return p?.precioUSD === undefined ? undefined : p.precioUSD * tipoCambio.valor;
}

export const MXN = (n: number, decimales = 2) =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: decimales, maximumFractionDigits: decimales });
export const USD = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

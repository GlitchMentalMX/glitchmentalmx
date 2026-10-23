// Fuente única de /datos/: la página, el CSV de veredictos y el CSV de precios
// leen de aquí. Todo se calcula en build desde las fichas y los JSON, así que
// ninguna cifra publicada puede quedar desfasada de lo que dicen las fichas.
import { getCollection } from 'astro:content';
import tipoCambio from '../data/tipo-cambio.json';
import preciosIAUSD from '../data/precios-ia-usd.json';
import preciosDigitalesUSD from '../data/precios-digitales-usd.json';

export const SITE = 'https://glitchmental.com';

export type Veredicto = 'verde' | 'amarillo' | 'rojo';

export interface SerieConfig {
  key: 'entrena' | 'prueba' | 'codigos' | 'estudiantes';
  collection: 'entrenaIA' | 'pruebaGratis' | 'codigosDescuento' | 'estudiantes';
  label: string;
  hub: string;
  pregunta: string;
  significados: Record<Veredicto, string>;
}

// Los significados repiten los de los badges de cada serie (VeredictoBadge,
// PruebaGratisBadge, CodigoDescuentoBadge, EstudiantesBadge): si cambian allá,
// hay que cambiarlos aquí.
export const SERIES: SerieConfig[] = [
  {
    key: 'entrena',
    collection: 'entrenaIA',
    label: 'Quién entrena con tus datos',
    hub: '/quien-entrena-con-tus-datos/',
    pregunta: '¿La herramienta usa lo que escribes o subes para entrenar su IA?',
    significados: {
      rojo: 'Entrena con tus datos',
      amarillo: 'Depende (del plan o de la configuración)',
      verde: 'No entrena por defecto',
    },
  },
  {
    key: 'prueba',
    collection: 'pruebaGratis',
    label: 'Prueba gratis sin tarjeta',
    hub: '/prueba-gratis-sin-tarjeta/',
    pregunta: '¿Puedes probar el plan de pago sin dar tarjeta de crédito?',
    significados: {
      rojo: 'Requiere tarjeta desde el inicio (o no hay prueba del plan de pago)',
      amarillo: 'Depende del plan o de la región',
      verde: 'No requiere tarjeta',
    },
  },
  {
    key: 'codigos',
    collection: 'codigosDescuento',
    label: 'Códigos de descuento',
    hub: '/codigos-descuento-ia/',
    pregunta: '¿Existe un código de descuento real, o solo circulan cupones falsos?',
    significados: {
      rojo: 'No existe ningún código real',
      amarillo: 'Solo promociones oficiales limitadas',
      verde: 'Código o promoción activa y verificable hoy',
    },
  },
  {
    key: 'estudiantes',
    collection: 'estudiantes',
    label: 'Descuentos para estudiantes',
    hub: '/descuentos-para-estudiantes-ia/',
    pregunta: '¿La oferta para estudiantes aplica a un estudiante en México?',
    significados: {
      verde: 'Aplica en México',
      amarillo: 'Aplica con condiciones',
      rojo: 'No aplica en México',
    },
  },
];

export interface FilaVeredicto {
  serie: string;
  herramienta: string;
  herramienta_id: string;
  veredicto: Veredicto;
  veredicto_significado: string;
  frase_corta: string;
  fuente_verificada: string;
  publicada: string;
  actualizada: string;
  url: string;
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

export async function cargarVeredictos() {
  const filas: FilaVeredicto[] = [];
  const resumen = SERIES.map((s) => ({
    serie: s,
    total: 0,
    conteo: { verde: 0, amarillo: 0, rojo: 0 } as Record<Veredicto, number>,
  }));
  let ultimaActualizacion: Date | undefined;
  let primeraPublicacion: Date | undefined;

  for (const r of resumen) {
    const posts = await getCollection(r.serie.collection, ({ data }) => !data.draft);
    for (const p of posts) {
      const d = p.data as any;
      const actualizada: Date = d.updatedDate ?? d.pubDate;
      if (!ultimaActualizacion || actualizada > ultimaActualizacion) ultimaActualizacion = actualizada;
      if (!primeraPublicacion || d.pubDate < primeraPublicacion) primeraPublicacion = d.pubDate;
      r.total += 1;
      r.conteo[d.veredicto as Veredicto] += 1;
      filas.push({
        serie: r.serie.label,
        herramienta: d.herramienta,
        herramienta_id: d.herramientaId,
        veredicto: d.veredicto,
        veredicto_significado: r.serie.significados[d.veredicto as Veredicto],
        frase_corta: d.fraseCorta,
        fuente_verificada: d.fuenteVerificacion ?? d.fuentePolitica ?? '',
        publicada: iso(d.pubDate),
        actualizada: iso(actualizada),
        url: `${SITE}/articulos/${p.id}/`,
      });
    }
  }

  filas.sort((a, b) => a.serie.localeCompare(b.serie, 'es') || a.herramienta.localeCompare(b.herramienta, 'es'));
  return { filas, resumen, ultimaActualizacion, primeraPublicacion };
}

export interface FilaPrecio {
  serie: string;
  herramienta_id: string;
  plan: string;
  empresa: string;
  precio_usd: number | '';
  precio_mxn_hoy: number;
  periodo: string;
  tipo_cambio_fix: number;
  fecha_tipo_cambio: string;
  url: string;
}

export async function cargarPrecios() {
  const filas: FilaPrecio[] = [];
  const grupos: Array<{ serie: string; json: Record<string, any>; collection: 'preciosIA' | 'preciosDigitales' }> = [
    { serie: 'Precios de IA', json: preciosIAUSD as Record<string, any>, collection: 'preciosIA' },
    { serie: 'Precios Digitales', json: preciosDigitalesUSD as Record<string, any>, collection: 'preciosDigitales' },
  ];
  for (const g of grupos) {
    const posts = await getCollection(g.collection, ({ data }) => !data.draft);
    const idPorHerramienta = new Map(posts.map((p) => [(p.data as any).herramientaId as string, p.id]));
    for (const [id, e] of Object.entries(g.json)) {
      const slug = idPorHerramienta.get(id);
      if (!slug) continue; // entrada de precio sin ficha publicada
      const usd = typeof e.precioUSD === 'number' ? e.precioUSD : undefined;
      const mxn = typeof e.precioMXN === 'number' ? e.precioMXN : usd !== undefined ? Math.round(usd * tipoCambio.valor * 100) / 100 : undefined;
      filas.push({
        serie: g.serie,
        herramienta_id: id,
        plan: e.nombre,
        empresa: e.empresa,
        precio_usd: usd ?? '',
        precio_mxn_hoy: mxn,
        periodo: e.periodo,
        tipo_cambio_fix: tipoCambio.valor,
        fecha_tipo_cambio: tipoCambio.fecha,
        url: `${SITE}/articulos/${slug}/`,
      });
    }
  }
  filas.sort((a, b) => a.serie.localeCompare(b.serie, 'es') || a.plan.localeCompare(b.plan, 'es'));
  return filas;
}

// CSV listo para Excel en español: BOM UTF-8 para que respete los acentos y
// todos los campos entre comillas (las frases traen comas).
export function aCsv<T extends object>(filas: T[]): string {
  if (filas.length === 0) return '';
  const columnas = Object.keys(filas[0]) as Array<keyof T>;
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lineas = [columnas.map((c) => esc(c)).join(',')];
  for (const f of filas) lineas.push(columnas.map((c) => esc(f[c])).join(','));
  return '﻿' + lineas.join('\r\n') + '\r\n';
}

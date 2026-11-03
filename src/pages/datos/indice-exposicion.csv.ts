import { aCsv, SITE } from '../../lib/datos';
import { cargarFichas, edicion, RUTA } from '../../lib/exposicion';

// CSV del Índice de Exposición Laboral a la IA: una fila por ocupación, sin el
// detalle de actividades. Se genera en build desde las mismas fichas del sitio.
export async function GET() {
  const filas = cargarFichas().map((f) => ({
    edicion: edicion.numero,
    ocupacion: f.nombre.es,
    ocupacion_id: f.slug,
    sector: f.sector,
    puntuacion: f.puntuacion.valor,
    nivel: f.puntuacion.nivel,
    rango_min: f.puntuacion.rango_sensibilidad[0],
    rango_max: f.puntuacion.rango_sensibilidad[1],
    exposicion_E: f.puntuacion.E,
    automatizacion_A: f.puntuacion.A,
    complementariedad_C: f.puntuacion.C,
    tope_aplicado: f.puntuacion.tope_aplicado ? 'si' : 'no',
    confianza: f.confianza,
    onet: f.codigos.onet,
    isco08: f.codigos.isco08,
    revision: f.revision.fecha,
    url: `${SITE}${RUTA}${f.slug}/`,
  }));
  return new Response(aCsv(filas), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
}

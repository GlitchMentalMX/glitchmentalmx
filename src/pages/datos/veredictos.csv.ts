import { cargarVeredictos, aCsv } from '../../lib/datos';

// CSV descargable con el veredicto de cada herramienta en las 4 series.
// Se genera en build desde las mismas fichas que muestra el sitio.
export async function GET() {
  const { filas } = await cargarVeredictos();
  return new Response(aCsv(filas), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
}

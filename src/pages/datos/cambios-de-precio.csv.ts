import { cargarCambiosPrecio, aCsv } from '../../lib/datos';

// CSV descargable de Precios de IA. Ver la descripción de las columnas en /datos/.
export async function GET() {
  const filas = await cargarCambiosPrecio();
  return new Response(aCsv(filas), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
}

import { cargarPrecios, aCsv } from '../../lib/datos';

// CSV descargable con el precio de entrada de cada ficha de Precios de IA y
// Precios Digitales, convertido a pesos con el FIX de Banxico vigente.
export async function GET() {
  const filas = await cargarPrecios();
  return new Response(aCsv(filas), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
}

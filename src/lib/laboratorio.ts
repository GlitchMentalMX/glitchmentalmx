import { getCollection } from 'astro:content';

// Las piezas del Laboratorio con draft: true no se generan en producción.
// Para revisarlas en local: `astro dev` (siempre las incluye) o un build de
// verificación con LABORATORIO_PREVIEW=1. El build normal las excluye.
const incluirBorradores = import.meta.env.DEV || process.env.LABORATORIO_PREVIEW === '1';

export async function cargarLaboratorio() {
  const piezas = await getCollection('laboratorio', ({ data }) => incluirBorradores || !data.draft);
  return piezas.sort((a, b) => a.data.experimento - b.data.experimento);
}

export const RUTA_LABORATORIO = '/laboratorio/';
export const BAJADA_LABORATORIO =
  'Experimentos, cruces de datos y pruebas de campo de glitchMentalMX. Cada pieza declara su muestra, sus límites y publica el CSV para que cualquiera pueda repetir la cuenta.';

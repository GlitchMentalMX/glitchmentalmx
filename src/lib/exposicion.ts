// Índice de Exposición Laboral a la IA — fórmula, niveles y carga de fichas.
// La fórmula y las reglas viven aquí; los datos, en src/data/exposicion-laboral/.
import edicion from '../data/exposicion-laboral/edicion.json';

export const PESOS = { E: 0.4, A: 0.35, C: 0.25 } as const;

export type Nivel = 'Muy baja' | 'Baja' | 'Moderada' | 'Alta' | 'Muy alta';
export type TipoEvidencia = 'capacidad_demostrada' | 'uso_observado' | 'adopcion_empresarial' | 'sin_evidencia_directa';

export const NIVELES: { nivel: Nivel; min: number; max: number }[] = [
  { nivel: 'Muy baja', min: 0, max: 19 },
  { nivel: 'Baja', min: 20, max: 39 },
  { nivel: 'Moderada', min: 40, max: 59 },
  { nivel: 'Alta', min: 60, max: 79 },
  { nivel: 'Muy alta', min: 80, max: 100 },
];

export const ETIQUETA_EVIDENCIA: Record<TipoEvidencia, string> = {
  capacidad_demostrada: 'Capacidad demostrada',
  uso_observado: 'Uso observado',
  adopcion_empresarial: 'Adopción empresarial',
  sin_evidencia_directa: 'Sin evidencia directa',
};

export interface Actividad {
  actividad: string;
  tareas_onet: number[];
  peso: number;
  E: number;
  A: number;
  C: number;
  evidencia: { tipo: TipoEvidencia; fuente: string; url?: string; fecha?: string; nota?: string }[];
}

interface ContextoPais {
  nivel: 'nacional' | 'regional' | 'pendiente';
  texto?: string | null;
  verificacion?: string;
  fuentes?: { fuente: string; url: string }[];
}

export interface Ficha {
  slug: string;
  nombre: { es: string };
  sector: string;
  codigos: { onet: string; isco08: string };
  puntuacion: {
    E: number;
    A: number;
    C: number;
    valor: number;
    nivel: Nivel;
    rango_sensibilidad: [number, number];
    tope_aplicado: boolean;
    puntuacion_sin_tope: number;
  };
  confianza: string;
  referencias: { aei_exposicion_ocupacion: number; eloundou_beta_humana: number; eloundou_beta_gpt4: number };
  cobertura_evidencia: { E: string; A: { peso_con_uso_observado: number; fuente: string }; C: string };
  actividades: Actividad[];
  oportunidades: string[];
  contexto: { mx: ContextoPais; es: ContextoPais; br: ContextoPais; latam: ContextoPais };
  fuentes: { tipo: string; fuente: string; url: string }[];
  revision: { fecha: string; estado: string; revisado_por: string | null };
}

export const nivelDe = (valor: number): Nivel => NIVELES.find((n) => valor >= n.min && valor <= n.max)!.nivel;

// Nivel -> índice 0..4 para pintar la escala de un solo matiz (sin rojo ni semáforo).
export const idxNivel = (nivel: Nivel) => NIVELES.findIndex((n) => n.nivel === nivel);

export function cargarFichas(): Ficha[] {
  const mods = import.meta.glob<Ficha>('../data/exposicion-laboral/ocupaciones/*.json', { eager: true, import: 'default' });
  return Object.values(mods).sort((a, b) => a.nombre.es.localeCompare(b.nombre.es, 'es'));
}

export const GEOGRAFIAS = [
  { id: 'mx', nombre: 'México' },
  { id: 'es', nombre: 'España' },
  { id: 'br', nombre: 'Brasil' },
  { id: 'latam', nombre: 'Resto de LATAM' },
] as const;

export const RUTA = '/indice-exposicion-laboral-ia/';
export const NOMBRE = 'Índice de Exposición Laboral a la IA';
export const AVISO = 'Exposición no significa sustitución. Esto es un índice compuesto, no una probabilidad de desempleo.';
export { edicion };

import type { SceneDef } from '../scenes/WorldScene';
import { salaDeEspera } from './sala';

/** Registro de escenas: agregar un escenario nuevo es agregar una entrada aquí. */
export const SCENES: Record<string, SceneDef> = {
  [salaDeEspera.id]: salaDeEspera,
};

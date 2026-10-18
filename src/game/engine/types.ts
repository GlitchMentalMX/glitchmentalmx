import type { CharId } from '../core/config';
import type { Draw } from '../core/gfx';

/** Piezas de un personaje: cada rol se anima de forma distinta. */
export type PartRole = 'legL' | 'legR' | 'body' | 'head' | 'headReact' | 'extra' | 'hat';

export interface PartSpec {
  role: PartRole;
  key: string;
  w: number;
  h: number;
  /** Posición del pivote dentro del "rig" (el origen está entre los pies). */
  x: number;
  y: number;
  /** Pivote de la imagen, de 0 a 1. */
  px: number;
  py: number;
  draw: Draw;
  pixel?: boolean;
}

/**
 * Parámetros de movimiento. Un solo sistema de animación (Actor) los lee:
 * lo que cambia entre personajes son estos números, no el código.
 */
export interface Gait {
  walkHz: number;
  runHz: number;
  /** Rebote vertical al caminar, en unidades. */
  bob: number;
  /** Balanceo del cuerpo, en radianes. */
  sway: number;
  squash: number;
  /** Cuánto se levanta cada pie. */
  step: number;
  /** Inclinación hacia delante al correr, en radianes. */
  lean?: number;
  /** Torpeza: irregularidad lenta del paso. */
  noise?: number;
  /** Cuantiza el movimiento en N pasos (aspecto de 8 bits). */
  stepped?: number;
  /** Oscilación de las piernas, en radianes (por defecto 0.28). */
  legRot?: number;
  /** Fallos visuales aleatorios (Glitchman). */
  jitter?: boolean;
  breath: number;
}

export type Signature = 'cane' | 'chew' | 'pose' | 'glitch' | 'hop';

/** Frases que cada personaje dice ante los mismos sucesos del guion. */
export type LineKey =
  | 'bot' | 'cookies' | 'cookiesNo' | 'clause' | 'shadow' | 'plant'
  | 'postit' | 'subscribe' | 'display' | 'door' | 'eat' | 'chairs'
  | 'botBlock' | 'botFrozen' | 'subEnter' | 'endRetenido' | 'endBaja';

export interface CharacterDef {
  id: CharId;
  /** Nombre provisional hasta la dirección creativa. */
  name: string;
  title: string;
  /** Frase de presentación (pantalla de selección). */
  intro: string;
  /** Frase de su reacción característica. */
  signatureLine: string;
  accent: string;
  /** Altura de la cabeza sobre los pies, para ubicar globos de texto. */
  topY: number;
  gait: Gait;
  signature: Signature;
  parts: PartSpec[];
  /** Pose de cuerpo completo que reemplaza al rig durante la reacción característica. */
  pose?: PartSpec;
  /** Globos cortos de reacción, con la voz del personaje. */
  bubbles: Record<'surprise' | 'happy' | 'think', string>;
  lines: Record<LineKey, string>;
  /** Estilo visual, para el informe y la tarjeta de selección. */
  style: string;
}

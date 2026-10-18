import type { EndingId } from '../core/config';
import { state } from '../core/state';

export interface EndingDef {
  id: EndingId;
  title: string;
  /** Color de fondo y de acento. */
  bg: string;
  accent: string;
  /** Las consecuencias: cada decisión previa agrega una línea al desenlace. */
  lines: () => string[];
  closing: string;
}

const cookies = () => state.flag('cookies');

export const ENDINGS: Record<EndingId, EndingDef> = {
  retenido: {
    id: 'retenido',
    title: 'CLIENTE RETENIDO™',
    bg: '#2a1650',
    accent: '#ffd23f',
    lines: () => {
      const l = ['Aceptaste tres meses gratis. Nadie te dijo cuándo termina lo gratis.'];
      if (cookies() === 'aceptadas') l.push('Tus galletas ya sabían que dirías que sí. Llevaban semanas preparando el descuento.');
      else if (cookies() === 'rechazadas') l.push('Rechazaste las cookies y aun así aceptaste esto. Es lo más 2026 que has hecho.');
      else l.push('Ni siquiera tocaste la máquina de galletas. Igual te conocían.');
      if (state.is('sombraFuera')) l.push('Tu sombra ahora es Gerente Regional de Retención. Te manda saludos.');
      if (state.is('botCongelado')) l.push('El asistente sigue leyendo las cláusulas. Va en la 6. Es feliz.');
      return l;
    },
    closing: 'FINAL 1 DE 2 · Cliente retenido (cómodamente).',
  },
  baja: {
    id: 'baja',
    title: 'BAJA COMPLETADA*',
    bg: '#e9f4ff',
    accent: '#0066ff',
    lines: () => {
      const l = ['Saliste. Lo lograste. El asterisco te acompañará siempre.'];
      if (state.is('admin')) l.push("Usaste la contraseña 'contraseña123'. Dos sistemas más cayeron con ella.");
      if (cookies() === 'aceptadas') l.push("Seguirás recibiendo correos de 'Te extrañamos' durante 11 años. Cada uno, más triste.");
      else if (cookies() === 'rechazadas') l.push('Tus preferencias de privacidad se respetaron. Probablemente.');
      if (state.is('sombraFuera')) l.push('Saliste sin sombra. El sol no te reconoce, pero tampoco te cobra.');
      if (state.is('botCongelado')) l.push('Mientras te ibas, el asistente iba en la cláusula 31. No levantó la vista.');
      return l;
    },
    closing: 'FINAL 2 DE 2 · Baja completada*  (*sujeta a términos y condiciones).',
  },
};

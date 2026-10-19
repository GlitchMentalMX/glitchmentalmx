import type { EndingId } from '../core/config';
import { state } from '../core/state';
import { CHARACTERS } from './characters';

export interface EndingDef {
  id: EndingId;
  title: string;
  /** Veredicto corto bajo el título: ganar aquí es perder, y perder es que ellos ganan. */
  verdict: string;
  /** Color de fondo y de acento. */
  bg: string;
  accent: string;
  /** Las consecuencias: cada decisión previa agrega una línea al desenlace. */
  lines: () => string[];
  closing: string;
}

const cookies = () => state.flag('cookies');
const motivo = () => state.flag('botMotivo') ?? 'clausulas';

/** "7 min 42 s" / "38 s": el tiempo real que costó intentar irse. */
export function formatPlayTime(seconds: number): string {
  const s = Math.max(1, Math.round(seconds));
  const m = Math.floor(s / 60);
  return m > 0 ? `${m} min ${String(s % 60).padStart(2, '0')} s` : `${s} s`;
}

const quote = (key: 'endRetenido' | 'endBaja' | 'endTurno'): string => {
  const c = CHARACTERS[state.characterId ?? 'don'];
  return `“${c.lines[key]}” — ${c.name}`;
};

export const ENDINGS: Record<EndingId, EndingDef> = {
  retenido: {
    id: 'retenido',
    title: 'CLIENTE RETENIDO™',
    verdict: 'PERDISTE. ELLOS GANARON.',
    bg: '#2a1650',
    accent: '#ffd23f',
    lines: () => {
      const l = ['Aceptaste tres meses gratis. Nadie te dijo cuándo termina lo gratis.'];
      if (cookies() === 'aceptadas') l.push('Tus galletas ya sabían que dirías que sí. Llevaban semanas preparando el descuento.');
      else if (cookies() === 'rechazadas') l.push('Rechazaste las cookies y aun así aceptaste esto. Es lo más 2026 que has hecho.');
      else l.push('Ni siquiera tocaste la máquina de galletas. Igual te conocían.');
      if (state.is('sombraFuera')) l.push('Tu sombra ahora es Gerente Regional de Retención. Te manda saludos.');
      if (state.is('botCongelado')) {
        l.push(
          motivo() === 'reinicio'
            ? 'El asistente sigue reiniciándose. Va por el reinicio 6 de ∞.'
            : motivo() === 'div0'
              ? 'El asistente sigue dividiendo entre cero. Aún no termina.'
              : 'El asistente sigue leyendo las cláusulas. Va en la 6. Es feliz.',
        );
      }
      l.push('Ellos: un cliente que no se va, tus datos y tu tiempo. Tú: un descuento.');
      l.push(`Contratar: 1 clic. Intentar irte: ${formatPlayTime(state.playSeconds)}. Quedarte: 1 clic más.`);
      l.push(quote('endRetenido'));
      return l;
    },
    closing: 'FINAL 1 DE 2 · Cliente retenido (cómodamente).',
  },
  baja: {
    id: 'baja',
    title: 'BAJA COMPLETADA*',
    verdict: 'GANASTE… Y PERDISTE.',
    bg: '#e9f4ff',
    accent: '#0066ff',
    lines: () => {
      const l = ['Saliste. Lo lograste. El asterisco te acompañará siempre.'];
      if (state.is('konami')) l.push('Ingresaste ↑↑↓↓←→←→BA. Funcionó. Nadie sabe por qué, ni la empresa.');
      else if (state.is('admin')) l.push("Usaste la contraseña 'contraseña123'. Dos sistemas más cayeron con ella.");
      if (cookies() === 'aceptadas') l.push("Seguirás recibiendo correos de 'Te extrañamos' durante 11 años. Cada uno, más triste.");
      else if (cookies() === 'rechazadas') l.push('Tus preferencias de privacidad se respetaron. Probablemente.');
      if (state.is('sombraFuera')) l.push('Saliste sin sombra. El sol no te reconoce, pero tampoco te cobra.');
      if (state.is('botCongelado')) {
        l.push(
          motivo() === 'reinicio'
            ? 'Mientras te ibas, el asistente se reiniciaba por tercera vez. No notó nada.'
            : motivo() === 'div0'
              ? 'Mientras te ibas, el asistente dividía entre cero. El resultado era tu libertad.'
              : 'Mientras te ibas, el asistente iba en la cláusula 31. No levantó la vista.',
        );
      }
      l.push('Ganaste la baja. Ellos conservan tus datos, tu historial y todo lo que ya tenían de ti.');
      l.push(`Contratarla: 1 clic. Cancelarla: ${formatPlayTime(state.playSeconds)}.`);
      l.push(quote('endBaja'));
      return l;
    },
    closing: 'FINAL 2 DE 2 · Baja completada*  (*sujeta a términos y condiciones).',
  },
  turno: {
    id: 'turno',
    title: 'TE ATENDIÓ UN HUMANO',
    verdict: 'EMPATE. RARÍSIMO.',
    bg: '#12301f',
    accent: '#7dffb2',
    lines: () => {
      const l = ['Esperaste tanto que por fin llegó tu turno: 99,999.'];
      l.push('El humano que te atendió estaba más cansado que tú.');
      l.push('Cancelaron juntos la suscripción. Nadie lo registró.');
      l.push('Ellos: un empleado menos. Tú: la única baja sin asterisco.');
      l.push(`Contratarla: 1 clic. Cancelarla: ${formatPlayTime(state.playSeconds)} (casi todo fue siesta).`);
      l.push(quote('endTurno'));
      return l;
    },
    closing: 'FINAL SECRETO · Paciencia absoluta.',
  },
};

import type { CharId } from '../core/config';

export interface SecretDef {
  id: string;
  /** Lo que se muestra al descubrirlo. */
  name: string;
  /** Pista que se muestra al terminar una partida, si aún falta. */
  hint: string;
}

/**
 * Cada personaje tiene 3 secretos propios: rutas o acciones que solo él puede
 * hacer. Son la razón para volver a jugar con otro personaje (o con el mismo).
 * Se guardan en la meta del navegador (sobreviven a las partidas nuevas).
 */
export const SECRETS: Record<CharId, SecretDef[]> = {
  don: [
    { id: 'don-reinicio', name: 'Apagarlo y volver a prenderlo', hint: 'Hay máquinas tercas que se arreglan con el consejo más viejo del mundo.' },
    { id: 'don-bot', name: 'Reiniciar al asistente', hint: 'Algunos bots también se arreglan apagándolos y prendiéndolos.' },
    { id: 'don-lucido', name: 'El Don lo explica todo', hint: 'Pregúntale al asistente cómo funciona todo esto.' },
  ],
  capibara: [
    { id: 'capi-planta', name: 'Morder la planta', hint: 'Todo es comestible si tienes la calma suficiente.' },
    { id: 'capi-rastreo', name: 'Comerse el rastreador', hint: 'Lo que te sigue también puede digerirse.' },
    { id: 'capi-turno', name: 'Esperar hasta que llegue tu turno', hint: 'Las sillas sirven para más que mirar. Mucha paciencia.' },
  ],
  'modo-dios': [
    { id: 'poppy-boton', name: 'El botón escondido', hint: 'Todo botón de rechazar está escondido. Búscalo.' },
    { id: 'poppy-saltar', name: 'Saltar la encuesta', hint: 'Una encuesta siempre trae un "Saltar" diminuto.' },
    { id: 'poppy-letra', name: 'Leer la letra chiquita', hint: 'Leer completo cambia lo que cuesta imprimir.' },
  ],
  glitchman: [
    { id: 'glitch-planta', name: 'Atravesar la planta', hint: 'Las cosas sólidas no siempre lo son.' },
    { id: 'glitch-div0', name: 'Dividir entre cero', hint: 'Un bot se rompe con la pregunta correcta.' },
    { id: 'glitch-hoja', name: 'El sistema duda de ti', hint: 'Quizá no tengas una sombra que perder.' },
  ],
  heroe: [
    { id: 'cartucho-checkpoint', name: 'Cargar un checkpoint', hint: 'Las sillas son zona de descanso: se guarda la partida.' },
    { id: 'cartucho-salto', name: 'Saltar sobre el mini-jefe', hint: 'Los jefes se esquivan saltando.' },
    { id: 'cartucho-konami', name: 'El código secreto', hint: 'En la puerta final, un truco clásico podría funcionar.' },
  ],
};

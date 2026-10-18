import Phaser from 'phaser';
import { H, S, W } from '../core/config';
import { img } from '../core/gfx';
import { state } from '../core/state';
import { buildSalaTextures } from '../art/sala';
import { Actor } from '../engine/Actor';
import { rectHit } from '../engine/hit';
import { Mover } from '../engine/Mover';
import type { Rect, Vec } from '../engine/pathfinding';
import type { ScriptContext } from '../engine/ScriptContext';
import type { SceneDef, WorldScene } from '../scenes/WorldScene';
import { ITEMS } from './items';

// ======================================================================
// SALA DE ESPERA DE ATENCIÓN AL CLIENTE
//
// Una suscripción que nunca pediste te trajo aquí. Quieres cancelarla.
// Contradicción real que explora: darse de alta es un clic enorme y
// brillante; darse de baja es una puerta chiquita detrás de una planta.
// Toda la lógica de la escena (objetos, guiones, consecuencias) vive en este
// archivo; el motor no sabe nada de galletas ni de sombras.
// ======================================================================

const SHADE_SPOT: Vec = { x: 392, y: 296 };
const PLANT_FROM = 472;
const PLANT_TO = 372;

const tween = (w: WorldScene, cfg: Phaser.Types.Tweens.TweenBuilderConfig) =>
  new Promise<void>((res) => w.tweens.add({ ...cfg, onComplete: () => res() }));

const img_ = (w: WorldScene, k: string) => w.objs[k] as Phaser.GameObjects.Image;

function burst(w: WorldScene, x: number, y: number, key: string, n: number, tint?: number[]): void {
  const em = w.add.particles(x, y, key, {
    speed: { min: 90, max: 280 },
    angle: { min: 195, max: 345 },
    gravityY: 420,
    lifespan: 1300,
    scale: { start: 0.55, end: 0.3 },
    rotate: { min: 0, max: 360 },
    tint,
    emitting: false,
  });
  em.setDepth(4500);
  em.explode(n);
  w.time.delayedCall(1600, () => em.destroy());
}

// ---------------------------------------------------------------- sombra

function createShade(w: WorldScene, x: number, y: number): Actor {
  const shade = new Actor(w, x, y, w.player.def, { shade: true });
  w.shade = shade;
  w.shadeMover = new Mover(shade, w.nav, (m, dx) => {
    shade.mode = m;
    shade.face(dx);
  });
  return shade;
}

async function detachShade(c: ScriptContext): Promise<void> {
  const w = c.world;
  const p = w.player;
  c.sfx('whoosh');
  c.shake(280, 0.005);
  const shade = createShade(w, p.x, p.y + 4);
  shade.setAlpha(0);
  p.setShadowVisible(false);
  c.set('sombraFuera');
  p.react('surprise');
  await tween(w, { targets: shade, alpha: 1, duration: 450 });
  await c.wait(500);
  shade.react('happy');
  await c.wait(700);
  c.sfx('whoosh');
  await w.shadeMover!.go(SHADE_SPOT, true);
}

// ---------------------------------------------------------------- planta / puerta

function setPlantMoved(w: WorldScene): void {
  w.removeBlocker('planta');
  w.addBlocker('planta2', { x: PLANT_TO - 40, y: 214, w: 80, h: 38 });
  w.rebuildNav();
}

async function movePlant(c: ScriptContext): Promise<void> {
  const w = c.world;
  const plant = img_(w, 'plant');
  c.sfx('door');
  c.shake(500, 0.004);
  await tween(w, { targets: plant, x: PLANT_TO, duration: 1100, ease: 'Sine.easeInOut' });
  setPlantMoved(w);
  c.set('plantaMovida');
  c.sfx('pop');
  c.ui.toast('Descubriste una puerta pequeña');
}

// ---------------------------------------------------------------- bot

async function botTalk(c: ScriptContext): Promise<void> {
  const bot = c.world.bot!;
  if (c.is('botCongelado')) {
    await c.say('bot', 'Shhh... cláusula 2. El suspenso me mata.');
    return;
  }
  bot.setFace('happy');
  if (!c.is('botMet')) {
    c.set('botMet');
    await c.say('bot', '¡Bienvenido a Atención al Cliente! Soy el Asistente Amabilísimo 4.2. ¿En qué puedo ayudarle a quedarse?');
    await c.sayChar('bot');
  } else {
    await c.say('bot', 'Dígame, ¿en qué puedo retenerle... digo, atenderle?');
  }
  for (;;) {
    const opts = ['¿Cómo cancelo mi suscripción?', '¿Qué eres exactamente?'];
    if (c.flag('cookies') === 'aceptadas') opts.push('¿Cómo sabes tanto de mí?');
    opts.push('Nada, gracias.');
    const i = await c.ask('bot', '¿Algo más? Me encanta cuando hay algo más.', opts);
    const pick = opts[i];
    if (pick.startsWith('¿Cómo cancelo')) {
      await c.say('bot', '¿Cancelar? Pero si apenas empezamos a conocernos. Tenemos una puerta enorme para entrar y ninguna para salir. Es más: es imposible que haya una detrás de alguna planta.');
      c.set('pistaPlanta');
      c.react('think');
    } else if (pick.startsWith('¿Qué eres')) {
      await c.say('bot', "Soy un asistente de IA entrenado con 40 millones de correos de 'Te extrañamos'. Mi especialidad: que no te vayas.");
    } else if (pick.startsWith('¿Cómo sabes')) {
      await c.say('bot', "Las galletas, claro. Ayer escribiste 'cómo cancelar' 47 veces. Una persona romántica.");
      c.react('surprise');
    } else {
      await c.say('bot', '¡Cuando quiera! Estaré aquí. En todas partes.');
      break;
    }
  }
  bot.setFace('ok');
}

async function botBlocks(c: ScriptContext): Promise<void> {
  const w = c.world;
  const bot = w.bot!;
  c.sfx('bleep');
  bot.teleport(487 - 4, 282);
  bot.setFace('hmm');
  await c.say('bot', "¡Alto ahí! Antes de cancelar, ¿podría responder una encuestita de 47 preguntas? Pregunta 1: ¿Cómo calificaría esta encuesta?");
  await c.sayChar('botBlock');
  for (;;) {
    const opts = ['Responder la encuesta'];
    if (c.has('hoja')) opts.push('Darle la hoja con los Términos y Condiciones');
    opts.push('Intentar rodearlo', 'Irme');
    const i = await c.ask('bot', 'Su opinión es muy importante para nosotros.', opts);
    const pick = opts[i];
    if (pick === 'Responder la encuesta') {
      await c.say('bot', 'Gracias. Pregunta 2: ¿recomendaría esta encuesta a un amigo? ... Pregunta 47 de 47. ¡Genial! Ahora una encuesta sobre la encuesta.');
      c.sfx('deny');
    } else if (pick.startsWith('Darle')) {
      c.take('hoja');
      c.sfx('pick');
      bot.setFace('happy');
      await c.say('bot', '¿Términos y Condiciones? ¡Qué lectura! Nadie me había regalado uno entero. Permítame un segundo.');
      bot.freeze();
      c.set('botCongelado');
      c.sfx('glitch');
      c.react('happy');
      await c.say('bot', 'Cláusula 1... qué prosa. Cláusula 2... ¡oh! Cláusula 3...');
      await c.sayChar('botFrozen');
      c.ui.toast('El asistente se quedó leyendo');
      return;
    } else if (pick === 'Intentar rodearlo') {
      c.sfx('deny');
      await c.say('bot', 'Cada vez que te mueves, yo me muevo. Es una danza. No se puede pasar sin completar la encuesta... a menos que algo muy largo me distraiga.');
      c.set('pistaHoja');
    } else {
      await c.say('bot', 'Lo esperaré aquí. Siempre.');
      return;
    }
  }
}

// ---------------------------------------------------------------- final

async function finalChoice(c: ScriptContext): Promise<void> {
  c.sfx('door');
  await c.say('Puerta pequeña', "Un cartelito pegado con cinta: 'Sentimos que te vayas. Pero mucho.'");
  for (;;) {
    const opts = ['Cancelar suscripción', 'Aceptar 3 meses gratis y quedarme'];
    if (c.has('postit')) opts.push('Usar la contraseña del post-it');
    opts.push('Todavía no');
    const i = await c.ask('Puerta pequeña', 'Hay una palanca y una pantalla táctil. ¿Qué haces?', opts);
    const pick = opts[i];
    if (pick.startsWith('Aceptar')) {
      await c.say('bot', '(por el altavoz) ¡Excelente decisión! Su descuento vale por 3 meses. Después, el mismo precio de siempre. Pero con más cariño.');
      await c.end('retenido');
      return;
    }
    if (pick.startsWith('Usar')) {
      c.set('admin');
      c.sfx('bleep');
      await c.say('Terminal de la puerta', 'Contraseña: contraseña123 ... ACCESO CONCEDIDO. Cancelación inmediata. Nadie había intentado la contraseña anotada en el monitor.');
      await c.end('baja');
      return;
    }
    if (pick === 'Cancelar suscripción') {
      if (c.flag('cookies') === 'aceptadas') {
        await c.say('bot', "(por el altavoz) Detectamos que aceptaste nuestras cookies. Tus 11 años de correos 'Te extrañamos' ya están programados. Con cariño.");
      }
      const steps = ['¿Seguro que quiere cancelar?', '¿Segurísimo? Mire que estaba a punto de ofrecerle algo.', '¿De verdad de la buena? Se lo preguntamos con lágrimas virtuales.'];
      let ok = true;
      for (const s of steps) {
        const j = await c.ask('Puerta pequeña', s, ['Sí, cancelar', 'Mejor no']);
        if (j === 1) {
          ok = false;
          break;
        }
        c.sfx('deny');
      }
      if (ok) {
        await c.say('Puerta pequeña', "Cancelación aceptada. Puede tardar hasta 5 a 7 años hábiles en reflejarse. Gracias por irte.");
        await c.end('baja');
        return;
      }
    } else {
      return;
    }
  }
}

async function cancelDoor(c: ScriptContext): Promise<void> {
  if (!c.is('puertaVista')) {
    c.set('puertaVista');
    await c.sayChar('door');
  }
  if (c.flag('cookies') === 'aceptadas' && !c.is('botCongelado')) {
    await botBlocks(c);
    if (!c.is('botCongelado')) return;
  }
  await finalChoice(c);
}

// ---------------------------------------------------------------- resto de interacciones

async function cookieMachine(c: ScriptContext): Promise<void> {
  const w = c.world;
  const st = c.flag('cookies');
  if (st === 'aceptadas') {
    await c.say('Cookie-Matic', 'Gracias por su consentimiento. Y el de su abuela, que firmó en 2009.');
    return;
  }
  if (st === 'rechazadas') {
    await c.say('Cookie-Matic', '...');
    await c.say('Cookie-Matic', 'La máquina te mira con rencor. Una galleta cae sola al piso y se esconde.');
    return;
  }
  c.sfx('bleep');
  await c.say('Cookie-Matic', 'Esta máquina utiliza cookies para mejorar su experiencia. Y la nuestra.');
  await c.sayChar('cookies');
  let fails = 0;
  for (;;) {
    type Opt = { label: string; kind: 'accept' | 'config' | 'reject' };
    const opts: Opt[] = [
      { label: 'ACEPTAR TODAS (recomendado)', kind: 'accept' },
      { label: 'Configurar (47 pasos)', kind: 'config' },
      { label: fails ? 'rechazar todas' : 'Rechazar todas', kind: 'reject' },
    ];
    if (fails) opts.reverse();
    const i = await c.ask('Cookie-Matic', '¿Acepta el uso de cookies?', opts.map((o) => o.label));
    const kind = opts[i].kind;
    if (kind === 'config') {
      c.sfx('deny');
      await c.say('Cookie-Matic', 'Cookies de funcionamiento: obligatorias. Cookies analíticas: obligatorias. Cookies publicitarias: obligatorias, pero con otro nombre. Guardar preferencias: ERROR 500.');
    } else if (kind === 'reject') {
      if (fails < 2) {
        fails += 1;
        c.sfx('deny');
        await c.say('Cookie-Matic', fails === 1 ? 'El botón de rechazar se escabulle hacia la esquina. Qué casualidad.' : 'Ahora "rechazar" está escrito en gris sobre gris. Una coincidencia, seguro.');
      } else {
        c.set('cookies', 'rechazadas');
        c.sfx('pop');
        await c.sayChar('cookiesNo');
        await c.say('Cookie-Matic', 'Preferencias guardadas. Probablemente.');
        return;
      }
    } else {
      c.set('cookies', 'aceptadas');
      c.sfx('crunch');
      c.shake(220, 0.004);
      const m = w.objs.vending;
      burst(w, m.x, m.y - 40, 'cookie_world', 18);
      c.give('galleta');
      c.react('surprise');
      w.addTrackers('mini_cookie', 3);
      await c.wait(700);
      await c.say('Cookie-Matic', '¡Gracias! Hemos instalado 3 galletas en tu persona. Para mejorar tu experiencia.');
      w.bot?.say('¡Gracias por aceptar! Ahora sí podemos fingir que nos conocemos.');
      c.ui.toast('Algo te sigue...');
      return;
    }
  }
}

async function printer(c: ScriptContext): Promise<void> {
  const w = c.world;
  if (c.is('impreso')) {
    await c.say('Impresora 9000', c.has('hoja') ? 'IMPRIMIENDO: hoja 2 de 4,812. Ya tienes la primera. Quedan 4,811.' : 'IMPRIMIENDO: hoja 2 de 4,812. Parece que alguien se quedó con la primera.');
    return;
  }
  await c.say('Impresora 9000', 'IMPRIMIENDO: Términos y Condiciones (hoja 1 de 4,812).');
  c.sfx('print');
  const paper = img_(w, 'paper') as Phaser.GameObjects.Image;
  paper.setVisible(true);
  const full = paper.height;
  const counter = w.tweens.addCounter({
    from: 0,
    to: 1,
    duration: 1800,
    onUpdate: (t) => paper.setCrop(0, 0, paper.width, full * (t.getValue() ?? 0)),
  });
  await c.wait(1900);
  counter.stop();
  paper.setCrop();
  c.set('impreso');
  c.give('hoja');
  c.react('surprise');
  await c.wait(400);
  await c.say('Hoja 1 de 4,812', "Cláusula 4,812: Al leer esta cláusula, el Usuario cede a la Empresa su sombra, con fines de ocio. La Empresa se compromete a usarla con moderación.");
  await c.sayChar('clause');
  await detachShade(c);
  await c.say('shade', 'Hola. Me ofrecieron mejor contrato. Bueno, no. Pero me quedé con ganas de ver qué hay allá afuera.');
  await c.say('shade', 'Por cierto: detrás de la planta de la derecha hay algo que no deberías ver. Ven a hablarme.');
  c.set('pistaPlanta');
  await c.sayChar('shadow');
}

async function shadeTalk(c: ScriptContext): Promise<void> {
  const w = c.world;
  if (!c.is('plantaMovida')) {
    const i = await c.ask('shade', 'Psst. Ayuda a una sombra libre: ¿muevo la planta de la derecha? Yo sé lo que hay detrás.', ['Sí, mueve la planta', 'Luego']);
    if (i !== 0) return;
    await c.say('shade', 'Esto lo hago por ti. Y por mí. Sobre todo por mí.');
    await w.shadeMover!.go({ x: 440, y: 270 }, true);
    await movePlant(c);
    await w.shadeMover!.go(SHADE_SPOT, true);
    await c.say('shade', 'Listo. Una puerta chiquita, de esas que nadie quiere que uses.');
    await c.sayChar('door');
    c.set('puertaVista');
  } else {
    const lines = [
      'Ya sabes dónde es. Yo me quedo vigilando que nadie nos vea.',
      'Ser sombra libre está bien. Falta trabajo, pero sobran siluetas.',
      'Si algún día te pide una contraseña, busca un papelito amarillo en el monitor.',
    ];
    const n = ((c.flag<number>('shadeTalk') ?? 0) as number) % lines.length;
    c.set('shadeTalk', n + 1);
    await c.say('shade', lines[n]);
  }
}

async function plant(c: ScriptContext): Promise<void> {
  await c.say('Planta', "Tiene una etiqueta: '100% natural*'. *Natural de plástico. Un cable sale de la maceta y se pierde detrás de la pared.");
  await c.sayChar('plant');
  const i = await c.ask('Planta', 'Pesa menos de lo que parece. ¿Qué haces?', ['Empujarla hacia un lado', 'Dejarla']);
  if (i === 0) {
    await c.walk({ x: 440, y: 270 });
    await movePlant(c);
    await c.sayChar('door');
    c.set('puertaVista');
  }
}

async function subscribeDoor(c: ScriptContext): Promise<void> {
  const w = c.world;
  await c.sayChar('subscribe');
  c.sfx('door');
  c.sfx('win');
  const L = img_(w, 'subL');
  const R = img_(w, 'subR');
  const lx = L.x;
  const rx = R.x;
  burst(w, 130, 150, 'confetti', 40, [0xff2e93, 0xffd400, 0x00e0ff, 0x7dff6b]);
  void tween(w, { targets: L, x: lx - 56, duration: 500 });
  await tween(w, { targets: R, x: rx + 56, duration: 500 });
  const i = await c.ask('Puerta Suscríbete', '¡Bienvenido! Ya eres suscriptor. Siempre lo has sido. Pase, pase.', ['Entrar', 'Mejor no']);
  if (i === 0) {
    await c.fade(() => {
      w.player.setPosition(130, 256);
    });
    c.set('suscrito');
    await c.say('Puerta Suscríbete', 'Cruzas la puerta y apareces otra vez en la sala de espera. Tu suscripción se renovó automáticamente.');
    await c.sayChar('subEnter');
  }
  void tween(w, { targets: L, x: lx, duration: 400 });
  await tween(w, { targets: R, x: rx, duration: 400 });
}

async function takePostit(c: ScriptContext): Promise<void> {
  const w = c.world;
  c.set('postitTomado');
  c.give('postit');
  img_(w, 'postit').destroy();
  await c.sayChar('postit');
}

async function chairs(c: ScriptContext): Promise<void> {
  const n = (c.flag<number>('sillas') ?? 0) + 1;
  c.set('sillas', n);
  c.react('think');
  if (n === 1) {
    await c.sayChar('chairs');
    await c.say('Silla', 'Te sientas tres segundos. El reloj de la sala dice que fueron tres años.');
  } else if (n === 2) {
    await c.say('Silla', 'Sigues esperando. Cada vez que te sientas, la fila avanza un lugar. Hacia atrás.');
  } else if (n === 3) {
    c.sfx('pick');
    await c.say('Silla', "Debajo de la silla hay una pegatina medio despegada: 'La puerta de salida es chiquita. Mira detrás de lo decorativo.'");
    c.set('pistaPlanta');
    c.ui.toast('Secreto: pista bajo la silla');
  } else {
    await c.say('Silla', 'Ya no hay más misterios aquí. Solo una silla.');
  }
}

async function entrance(c: ScriptContext): Promise<void> {
  const n = (c.flag<number>('entrada') ?? 0) + 1;
  c.set('entrada', n);
  c.sfx('deny');
  await c.say('Puerta de entrada', n < 3 ? 'La puerta por la que entraste ya no tiene manija por dentro. Detalle de diseño.' : 'Sigue sin manija. Pero ahora tiene un letrero: "¿Seguro que quiere irse? ¡Hay descuentos!"');
}

async function display(c: ScriptContext): Promise<void> {
  await c.say('Pantalla de turnos', 'ATENDIENDO: 0003. SU TURNO: 99,999. TIEMPO ESTIMADO: DE 3 A 5 AÑOS.');
  await c.sayChar('display');
}

// ---------------------------------------------------------------- inventario

async function inspect(c: ScriptContext, id: string): Promise<void> {
  const it = ITEMS[id];
  if (!it) return;
  if (id === 'galleta') {
    const i = await c.ask(it.name, it.desc, ['Comérsela', 'Guardarla']);
    if (i === 0) {
      c.take('galleta');
      c.sfx('crunch');
      c.react(c.char.signature === 'chew' ? 'signature' : 'happy');
      await c.wait(900);
      c.set('galletaComida');
      await c.sayChar('eat');
    }
    return;
  }
  await c.say(it.name, it.desc);
}

// ---------------------------------------------------------------- escena

function build(w: WorldScene): void {
  buildSalaTextures(w);
  // Decorado que continúa la sala más allá del escenario (pantallas más anchas
  // o más altas que 9:16). Las baldosas se alinean con las del fondo.
  w.add.tileSprite(-720, 208, 1980, 1500, 'sala_floor_tile').setOrigin(0, 0).setTileScale(1 / S, 1 / S).setDepth(-120);
  w.add.rectangle(270, -450, 1980, 900, 0xcfd8e2).setDepth(-120);
  w.add.image(-720, 0, 'sala_wall_ext').setOrigin(0, 0).setDisplaySize(1980, 208).setDepth(-119);
  img(w, W / 2, H / 2, 'sala_bg').setDepth(-100);

  w.addBlocker('pared', { x: 0, y: 0, w: W, h: 205 });
  w.addBlocker('mostrador', { x: 186, y: 316, w: 170, h: 78 });
  w.addBlocker('vending', { x: 24, y: 338, w: 90, h: 114 });
  w.addBlocker('impresora', { x: 416, y: 436, w: 106, h: 78 });
  w.addBlocker('sillasL', { x: 42, y: 726, w: 150, h: 46 });
  w.addBlocker('sillasR', { x: 350, y: 726, w: 150, h: 46 });
  w.addBlocker('planta', { x: PLANT_FROM - 40, y: 214, w: 80, h: 38 });

  img(w, 130, 205, 'sub_frame', 0.5, 1).setDepth(150);
  w.objs.subL = img(w, 94, 205, 'sub_panel', 0.5, 1).setDepth(151);
  w.objs.subR = img(w, 166, 205, 'sub_panel', 0.5, 1).setDepth(151);
  img(w, 272, 80, 'sala_display').setDepth(150);
  w.objs.cancel = img(w, 487, 205, 'sala_cancel', 0.5, 1).setDepth(140);
  img(w, 270, 930, 'sala_mat', 0.5, 1).setDepth(1);
  w.objs.paper = img(w, 238, 518, 'sala_paper', 0, 0).setDepth(2).setVisible(false);
  w.objs.desk = img(w, 271, 396, 'sala_desk', 0.5, 1).setDepth(396);
  w.objs.postit = img(w, 331, 320, 'sala_postit').setDepth(397);
  w.objs.vending = img(w, 69, 456, 'sala_vending', 0.5, 1).setDepth(456);
  w.objs.printer = img(w, 469, 516, 'sala_printer', 0.5, 1).setDepth(516);
  img(w, 117, 774, 'sala_chairs', 0.5, 1).setDepth(774);
  img(w, 425, 774, 'sala_chairs', 0.5, 1).setDepth(774);
  w.objs.plant = img(w, PLANT_FROM, 254, 'sala_plant', 0.5, 1).setDepth(254);

  const bot = w.spawnBot([
    { x: 200, y: 520 }, { x: 360, y: 560 }, { x: 310, y: 650 },
    { x: 150, y: 640 }, { x: 120, y: 560 }, { x: 230, y: 470 },
  ]);

  const flag = (k: string) => () => state.is(k);
  const notFlag = (k: string) => () => !state.is(k);
  const always = () => true;
  const target = (id: string, label: string, r: Rect, ap: Vec, run: (c: ScriptContext) => Promise<void>, active: () => boolean = always, pad = 10) =>
    w.addTarget({ id, label, hit: rectHit(r, pad), approach: () => ap, anchor: () => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 }), active, run });

  target('sub', 'Suscribirse', { x: 50, y: 60, w: 160, h: 150 }, { x: 130, y: 248 }, subscribeDoor);
  target('display', 'Pantalla', { x: 222, y: 48, w: 100, h: 64 }, { x: 272, y: 244 }, display);
  target('planta', 'Planta', { x: 432, y: 112, w: 90, h: 142 }, { x: 472, y: 284 }, plant, notFlag('plantaMovida'));
  target('cancel', 'Puerta pequeña', { x: 462, y: 118, w: 50, h: 88 }, { x: 487, y: 244 }, cancelDoor, flag('plantaMovida'));
  target('postit', 'Post-it', { x: 306, y: 292, w: 52, h: 40 }, { x: 332, y: 430 }, takePostit, notFlag('postitTomado'));
  target('vending', 'Cookie-Matic', { x: 22, y: 310, w: 94, h: 146 }, { x: 152, y: 456 }, cookieMachine);
  target('printer', 'Impresora', { x: 414, y: 420, w: 110, h: 98 }, { x: 384, y: 492 }, printer);
  target('sillasL', 'Sillas', { x: 40, y: 718, w: 154, h: 58 }, { x: 117, y: 808 }, chairs);
  target('sillasR', 'Sillas', { x: 348, y: 718, w: 154, h: 58 }, { x: 425, y: 808 }, chairs);
  target('entrada', 'Entrada', { x: 190, y: 890, w: 160, h: 60 }, { x: 270, y: 862 }, entrance);

  w.addTarget({
    id: 'bot',
    label: 'Asistente',
    hit: (x, y) => Math.hypot(x - bot.x, y - (bot.y - 34)) < 58,
    approach: () => {
      bot.hold(6);
      const side = w.player ? (w.player.x < bot.x ? -64 : 64) : 64;
      return w.nav.nearestWalkable({ x: bot.x + side, y: bot.y + 10 });
    },
    anchor: () => ({ x: bot.x, y: bot.y - 20 }),
    active: always,
    run: botTalk,
  });

  w.addTarget({
    id: 'shade',
    label: 'Tu sombra',
    hit: (x, y) => !!w.shade && Math.abs(x - w.shade.x) < 42 && y > w.shade.y - 120 && y < w.shade.y + 20,
    approach: () => {
      const s = w.shade!;
      const side = w.player.x < s.x ? -56 : 56;
      return w.nav.nearestWalkable({ x: s.x + side, y: s.y + 8 });
    },
    anchor: () => ({ x: w.shade?.x ?? 0, y: (w.shade?.y ?? 0) - 40 }),
    active: () => !!w.shade,
    run: shadeTalk,
  });
}

function restore(w: WorldScene): void {
  if (state.is('plantaMovida')) {
    img_(w, 'plant').x = PLANT_TO;
    setPlantMoved(w);
  }
  if (state.is('postitTomado')) img_(w, 'postit').destroy();
  if (state.is('impreso')) img_(w, 'paper').setVisible(true);
  if (state.is('sombraFuera')) createShade(w, SHADE_SPOT.x, SHADE_SPOT.y);
  if (state.is('botCongelado')) w.bot?.freeze();
  if (state.flag('cookies') === 'aceptadas') w.addTrackers('mini_cookie', 3);
}

async function intro(c: ScriptContext): Promise<void> {
  await c.wait(500);
  await c.say('player', c.char.intro);
  c.react('signature');
  await c.wait(1500);
  await c.say('Sala de espera', 'Atención al Cliente. Una suscripción que nunca pediste te trajo hasta aquí.');
  await c.say('Sala de espera', 'Tu objetivo: cancelarla y salir. Contratarla costó un clic. Veamos cuánto cuesta irte.');
  c.ui.showHint('Toca para moverte · Dos toques para correr');
}

export const salaDeEspera: SceneDef = {
  id: 'sala-de-espera',
  title: 'Sala de espera de Atención al Cliente',
  objective: 'Objetivo: cancelar suscripción',
  spawn: { x: 270, y: 830 },
  build,
  intro,
  inspect,
  restore,
};

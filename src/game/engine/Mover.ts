import { RUN_SPEED, WALK_SPEED } from '../core/config';
import type { NavGrid, Vec } from './pathfinding';

export interface Body {
  x: number;
  y: number;
}
type Mode = 'idle' | 'walk' | 'run';

/**
 * Mueve un cuerpo por un camino calculado sobre la cuadrícula de navegación.
 * Sirve igual para el jugador, la sombra y el chatbot: el movimiento es un
 * solo sistema, lo que cambia es quién lo usa.
 */
export class Mover {
  private path: Vec[] = [];
  private resolver: ((arrived: boolean) => void) | null = null;
  private run = false;
  private stepAcc = 0;
  walkSpeed = WALK_SPEED;
  runSpeed = RUN_SPEED;

  constructor(
    private body: Body,
    private nav: NavGrid | null,
    private setMode: (m: Mode, dx: number) => void,
    private onStep?: (run: boolean) => void,
  ) {}

  get moving(): boolean {
    return this.path.length > 0;
  }

  setNav(nav: NavGrid): void {
    this.nav = nav;
  }

  /** Va hacia `to`. Resuelve true al llegar y false si otro destino lo interrumpe. */
  go(to: Vec, run: boolean | 'auto' = false): Promise<boolean> {
    this.finish(false);
    const from = { x: this.body.x, y: this.body.y };
    this.path = this.nav ? this.nav.findPath(from, to) : [to];
    if (run === 'auto') {
      let len = 0;
      let prev = from;
      for (const p of this.path) {
        len += Math.hypot(p.x - prev.x, p.y - prev.y);
        prev = p;
      }
      run = len > 380;
    }
    this.run = run;
    return new Promise((resolve) => {
      this.resolver = resolve;
      if (!this.path.length) this.finish(true);
    });
  }

  stop(): void {
    this.finish(false);
  }

  private finish(arrived: boolean): void {
    const r = this.resolver;
    this.resolver = null;
    this.path = [];
    this.stepAcc = 0;
    this.setMode('idle', 0);
    r?.(arrived);
  }

  update(dt: number): void {
    if (!this.path.length) return;
    const t = this.path[0];
    const dx = t.x - this.body.x;
    const dy = t.y - this.body.y;
    const dist = Math.hypot(dx, dy);
    const stepLen = (this.run ? this.runSpeed : this.walkSpeed) * dt;
    if (dist <= stepLen) {
      this.body.x = t.x;
      this.body.y = t.y;
      this.path.shift();
      if (!this.path.length) {
        this.finish(true);
        return;
      }
    } else {
      this.body.x += (dx / dist) * stepLen;
      this.body.y += (dy / dist) * stepLen;
    }
    this.setMode(this.run ? 'run' : 'walk', dx);
    this.stepAcc += stepLen;
    if (this.stepAcc > (this.run ? 52 : 36)) {
      this.stepAcc = 0;
      this.onStep?.(this.run);
    }
  }
}

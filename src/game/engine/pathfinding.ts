export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface Vec {
  x: number;
  y: number;
}

/**
 * Cuadrícula de navegación sobre el escenario. Los obstáculos se "inflan"
 * con el radio del personaje: el camino que sale de aquí ya es seguro para
 * el cuerpo completo, no solo para su centro. A* en 8 direcciones sin cortar
 * esquinas, más un alisado por línea de visión para que el recorrido no se
 * vea escalonado.
 */
export class NavGrid {
  readonly cols: number;
  readonly rows: number;
  private blocked: Uint8Array;

  constructor(
    readonly width: number,
    readonly height: number,
    readonly cell = 15,
  ) {
    this.cols = Math.ceil(width / cell);
    this.rows = Math.ceil(height / cell);
    this.blocked = new Uint8Array(this.cols * this.rows);
  }

  block(r: Rect, inflate = 0): void {
    const x0 = Math.floor((r.x - inflate) / this.cell);
    const x1 = Math.floor((r.x + r.w + inflate) / this.cell);
    const y0 = Math.floor((r.y - inflate) / this.cell);
    const y1 = Math.floor((r.y + r.h + inflate) / this.cell);
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        if (x >= 0 && y >= 0 && x < this.cols && y < this.rows) this.blocked[y * this.cols + x] = 1;
      }
    }
  }

  /** Bordes del escenario: nada caminable a menos de `margin` de ellos. */
  blockBorders(margin: number): void {
    this.block({ x: -100, y: -100, w: 100 + margin, h: this.height + 200 });
    this.block({ x: this.width - margin, y: -100, w: 100 + margin, h: this.height + 200 });
    this.block({ x: -100, y: this.height - margin, w: this.width + 200, h: 100 + margin });
  }

  private idx(cx: number, cy: number): number {
    return cy * this.cols + cx;
  }

  private cellOf(p: Vec): [number, number] {
    return [Math.min(this.cols - 1, Math.max(0, Math.floor(p.x / this.cell))), Math.min(this.rows - 1, Math.max(0, Math.floor(p.y / this.cell)))];
  }

  isWalkable(p: Vec): boolean {
    const [cx, cy] = this.cellOf(p);
    return !this.blocked[this.idx(cx, cy)];
  }

  /** Punto caminable más cercano a p (búsqueda en anillos crecientes). */
  nearestWalkable(p: Vec): Vec {
    if (this.isWalkable(p)) return p;
    const [cx, cy] = this.cellOf(p);
    for (let r = 1; r < Math.max(this.cols, this.rows); r++) {
      let best: Vec | null = null;
      let bestD = Infinity;
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
          const x = cx + dx;
          const y = cy + dy;
          if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) continue;
          if (this.blocked[this.idx(x, y)]) continue;
          const c = { x: (x + 0.5) * this.cell, y: (y + 0.5) * this.cell };
          const d = (c.x - p.x) ** 2 + (c.y - p.y) ** 2;
          if (d < bestD) {
            bestD = d;
            best = c;
          }
        }
      }
      if (best) return best;
    }
    return p;
  }

  /** ¿Se puede ir en línea recta de a a b sin tocar un obstáculo? */
  lineClear(a: Vec, b: Vec): boolean {
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const steps = Math.ceil(dist / (this.cell * 0.4));
    for (let i = 0; i <= steps; i++) {
      const t = steps === 0 ? 0 : i / steps;
      if (!this.isWalkable({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })) return false;
    }
    return true;
  }

  /** Camino de `from` a `to` (ya ajustado al punto caminable más cercano). Incluye el destino, no el origen. */
  findPath(from: Vec, to: Vec): Vec[] {
    const start = this.nearestWalkable(from);
    const goal = this.nearestWalkable(to);
    if (this.lineClear(start, goal)) return [goal];

    const [sx, sy] = this.cellOf(start);
    const [gx, gy] = this.cellOf(goal);
    const n = this.cols * this.rows;
    const g = new Float32Array(n).fill(Infinity);
    const parent = new Int32Array(n).fill(-1);
    const closed = new Uint8Array(n);
    const open: number[] = [];
    const h = (x: number, y: number) => Math.hypot(x - gx, y - gy);
    const si = this.idx(sx, sy);
    g[si] = 0;
    open.push(si);

    while (open.length) {
      let bi = 0;
      let bf = Infinity;
      for (let i = 0; i < open.length; i++) {
        const c = open[i];
        const f = g[c] + h(c % this.cols, Math.floor(c / this.cols));
        if (f < bf) {
          bf = f;
          bi = i;
        }
      }
      const cur = open.splice(bi, 1)[0];
      if (closed[cur]) continue;
      closed[cur] = 1;
      const cx = cur % this.cols;
      const cy = Math.floor(cur / this.cols);
      if (cx === gx && cy === gy) break;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < 0 || ny < 0 || nx >= this.cols || ny >= this.rows) continue;
          const ni = this.idx(nx, ny);
          if (this.blocked[ni] || closed[ni]) continue;
          // Sin cortar esquinas en diagonal.
          if (dx && dy && (this.blocked[this.idx(cx + dx, cy)] || this.blocked[this.idx(cx, cy + dy)])) continue;
          const ng = g[cur] + (dx && dy ? 1.414 : 1);
          if (ng < g[ni]) {
            g[ni] = ng;
            parent[ni] = cur;
            open.push(ni);
          }
        }
      }
    }

    const gi = this.idx(gx, gy);
    if (parent[gi] === -1 && gi !== si) return [goal];
    const raw: Vec[] = [];
    for (let c = gi; c !== -1 && c !== si; c = parent[c]) {
      raw.push({ x: (c % this.cols + 0.5) * this.cell, y: (Math.floor(c / this.cols) + 0.5) * this.cell });
    }
    raw.reverse();
    raw[raw.length - 1] = goal;

    // Alisado: saltar al punto más lejano visible desde el actual.
    const out: Vec[] = [];
    let cur: Vec = start;
    let i = 0;
    while (i < raw.length) {
      let j = raw.length - 1;
      while (j > i && !this.lineClear(cur, raw[j])) j--;
      out.push(raw[j]);
      cur = raw[j];
      i = j + 1;
    }
    return out;
  }
}

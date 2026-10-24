import { state } from './state';

// Los efectos se sintetizan con Web Audio (cero archivos). La música de fondo
// son dos pistas propias de Jorge (public/juego/audio/*.m4a, ~1 MB c/u) que se
// descargan solo cuando hace falta, después del primer toque. Si una no carga,
// suena el zumbido sintetizado de respaldo. Los navegadores móviles solo
// permiten audio tras un gesto del usuario, así que el contexto se crea (o
// reanuda) en unlock(), que se llama desde el primer toque.

export type SfxName =
  | 'tap' | 'step' | 'pick' | 'door' | 'deny' | 'bleep' | 'crunch' | 'print'
  | 'whoosh' | 'surprise' | 'win' | 'lose' | 'glitch' | 'select' | 'pop' | 'coin' | 'type';

export type MusicTrack = 'sala' | 'menu';
const MUSIC_URL: Record<MusicTrack, string> = {
  sala: '/juego/audio/sala.m4a',
  menu: '/juego/audio/menu.m4a',
};
/** Volumen de la música respecto al maestro: discreta, siempre por debajo de los efectos. */
const MUSIC_VOL = 0.4;
const FADE_S = 1.2;

class AudioEngine {
  private musicBus: GainNode | null = null;
  private music: { key: MusicTrack; src: AudioBufferSourceNode; gain: GainNode } | null = null;
  private buffers = new Map<MusicTrack, AudioBuffer>();
  private loading = new Map<MusicTrack, Promise<AudioBuffer | null>>();
  private wanted: MusicTrack | null = null;
  private failed = new Set<MusicTrack>();
  private muteTimer = 0;
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientStarted = false;
  private lastStep = 0;

  /** Crea el contexto de audio y los buses (el navegador lo deja en pausa hasta el primer gesto). */
  private ensureCtx(): boolean {
    if (this.ctx) return true;
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return false;
    this.ctx = new Ctor();
    this.master = this.ctx.createGain();
    this.master.gain.value = state.meta.muted ? 0 : 0.8;
    this.master.connect(this.ctx.destination);
    this.musicBus = this.ctx.createGain();
    this.musicBus.gain.value = state.meta.ambient ? MUSIC_VOL : 0;
    this.musicBus.connect(this.master);
    return true;
  }

  /**
   * Prepara la música ANTES del primer toque: el contexto se crea en pausa y las dos
   * pistas se descargan y decodifican en segundo plano. Así, cuando llega el gesto que
   * permite sonar, la música arranca al instante en vez de esperar la descarga. Si la
   * persona tiene el sonido apagado no se baja nada.
   */
  preload(): void {
    if (state.meta.muted) return;
    try {
      if (!this.ensureCtx()) return;
      void this.loadTrack('menu').then(() => this.loadTrack('sala'));
    } catch {
      // Sin audio disponible: el juego sigue en silencio.
    }
  }

  /** ¿El contexto ya está sonando? (los navegadores lo dejan en pausa hasta un gesto válido). */
  get running(): boolean {
    return this.ctx?.state === 'running';
  }

  /** Llamar desde un gesto del usuario (pointerdown / touchend / click / keydown). */
  unlock(): void {
    try {
      if (!this.ensureCtx() || !this.ctx) return;
      if (this.ctx.state !== 'running' && !state.meta.muted) void this.ctx.resume();
      this.startAmbient();
      void this.applyMusic();
    } catch {
      // Sin audio disponible: el juego sigue en silencio.
    }
  }

  /** Pausa el audio (p. ej. mientras se muestra el aviso de girar el teléfono). */
  suspend(): void {
    void this.ctx?.suspend();
  }

  resume(): void {
    if (this.ctx && !state.meta.muted) void this.ctx.resume();
  }

  get muted(): boolean {
    return state.meta.muted;
  }

  /** Silencio total: el volumen maestro baja a 0 y, además, se pausa el contexto de audio. */
  setMuted(m: boolean): void {
    state.setAudioPrefs({ muted: m });
    window.clearTimeout(this.muteTimer);
    if (!this.master || !this.ctx) return;
    const ctx = this.ctx;
    if (m) {
      this.master.gain.cancelScheduledValues(ctx.currentTime);
      this.master.gain.setTargetAtTime(0, ctx.currentTime, 0.04);
      this.muteTimer = window.setTimeout(() => {
        if (state.meta.muted) void ctx.suspend();
      }, 400);
    } else {
      void ctx.resume();
      this.master.gain.cancelScheduledValues(ctx.currentTime);
      this.master.gain.setTargetAtTime(0.8, ctx.currentTime, 0.05);
      void this.applyMusic();
    }
  }

  /** Activa o apaga la música de fondo (el menú la llama "Música"). */
  setAmbient(on: boolean): void {
    state.setAudioPrefs({ ambient: on });
    if (this.ctx && this.musicBus) this.musicBus.gain.setTargetAtTime(on ? MUSIC_VOL : 0, this.ctx.currentTime, 0.3);
    this.updateDrone();
  }

  /** Pide la pista de fondo de una escena; si ya está sonando, no se reinicia. */
  playMusic(track: MusicTrack): void {
    this.wanted = track;
    void this.applyMusic();
  }

  private loadTrack(track: MusicTrack): Promise<AudioBuffer | null> {
    const cached = this.buffers.get(track);
    if (cached) return Promise.resolve(cached);
    let p = this.loading.get(track);
    if (!p) {
      p = (async () => {
        try {
          const res = await fetch(MUSIC_URL[track]);
          if (!res.ok) throw new Error(String(res.status));
          const data = await res.arrayBuffer();
          const ctx = this.ctx!;
          // Safari antiguo solo soporta decodeAudioData con callbacks.
          const buf = await new Promise<AudioBuffer>((resolve, reject) => {
            const r = ctx.decodeAudioData(data, resolve, reject);
            if (r && typeof r.then === 'function') r.then(resolve, reject);
          });
          this.buffers.set(track, buf);
          return buf;
        } catch {
          this.failed.add(track);
          return null;
        } finally {
          this.loading.delete(track);
        }
      })();
      this.loading.set(track, p);
    }
    return p;
  }

  private async applyMusic(): Promise<void> {
    const track = this.wanted;
    if (!track || !this.ctx || !this.musicBus || state.meta.muted) return;
    if (this.music?.key === track) return;
    const buf = await this.loadTrack(track);
    // La escena pudo cambiar (o silenciarse) mientras se descargaba.
    if (!buf || this.wanted !== track || !this.ctx || !this.musicBus || state.meta.muted) {
      this.updateDrone();
      return;
    }
    if (this.music?.key === track) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const old = this.music;
    if (old) {
      old.gain.gain.cancelScheduledValues(now);
      old.gain.gain.setValueAtTime(old.gain.gain.value, now);
      old.gain.gain.linearRampToValueAtTime(0, now + FADE_S);
      old.src.stop(now + FADE_S + 0.05);
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const gain = ctx.createGain();
    // La primera pista entra rápido (0.5 s): un fundido largo se confunde con "no suena".
    const fadeIn = old ? FADE_S : 0.5;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(1, now + fadeIn);
    src.connect(gain).connect(this.musicBus);
    src.start(now);
    this.music = { key: track, src, gain };
    this.updateDrone();
  }

  /** El zumbido sintetizado solo suena si no hay música (respaldo). */
  private updateDrone(): void {
    if (!this.ambientGain || !this.ctx) return;
    const useDrone = !this.music && state.meta.ambient;
    this.ambientGain.gain.setTargetAtTime(useDrone ? 0.05 : 0, this.ctx.currentTime, 0.4);
  }

  private tone(freq: number, dur: number, type: OscillatorType = 'square', vol = 0.12, slideTo?: number, delay = 0): void {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(slideTo, 1), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  private noise(dur: number, vol = 0.12, freq = 1200, delay = 0, q = 0.8): void {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime + delay;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = freq;
    f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(this.master);
    src.start(t);
  }

  play(name: SfxName): void {
    // Con el contexto en pausa (antes del primer gesto) los sonidos se acumularían y saldrían todos juntos.
    if (!this.ctx || state.meta.muted || this.ctx.state !== 'running') return;
    switch (name) {
      case 'tap': this.tone(520, 0.06, 'triangle', 0.08, 700); break;
      case 'select': this.tone(440, 0.08, 'square', 0.07); this.tone(660, 0.1, 'square', 0.07, undefined, 0.07); break;
      case 'type': this.tone(900 + Math.random() * 200, 0.025, 'square', 0.025); break;
      case 'step': {
        const now = this.ctx.currentTime;
        if (now - this.lastStep < 0.05) return;
        this.lastStep = now;
        this.noise(0.05, 0.05, 300 + Math.random() * 120, 0, 1.2);
        break;
      }
      case 'pick': this.tone(600, 0.08, 'square', 0.09); this.tone(900, 0.12, 'square', 0.09, undefined, 0.08); break;
      case 'coin': this.tone(988, 0.07, 'square', 0.08); this.tone(1319, 0.2, 'square', 0.08, undefined, 0.07); break;
      case 'door': this.noise(0.25, 0.1, 500, 0, 0.5); this.tone(120, 0.3, 'sawtooth', 0.06, 70); break;
      case 'deny': this.tone(180, 0.18, 'sawtooth', 0.1); this.tone(140, 0.22, 'sawtooth', 0.1, undefined, 0.12); break;
      case 'bleep': this.tone(1200, 0.05, 'sine', 0.07); this.tone(1600, 0.07, 'sine', 0.07, undefined, 0.06); break;
      case 'crunch': for (let i = 0; i < 4; i++) this.noise(0.06, 0.16, 1800, i * 0.07, 2); break;
      case 'print': for (let i = 0; i < 10; i++) this.noise(0.05, 0.07, 900 + (i % 2) * 400, i * 0.09, 3); break;
      case 'whoosh': this.noise(0.45, 0.12, 700, 0, 0.4); this.tone(200, 0.4, 'sine', 0.05, 900); break;
      case 'surprise': this.tone(300, 0.28, 'square', 0.09, 1100); this.tone(1100, 0.12, 'square', 0.07, undefined, 0.28); break;
      case 'glitch':
        for (let i = 0; i < 6; i++) this.tone(100 + Math.random() * 1500, 0.04, 'square', 0.07, undefined, i * 0.035);
        this.noise(0.2, 0.08, 3000, 0, 0.3);
        break;
      case 'pop': this.tone(500, 0.07, 'sine', 0.1, 150); break;
      case 'win': [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.18, 'triangle', 0.12, undefined, i * 0.13)); break;
      case 'lose': [392, 330, 262, 196].forEach((f, i) => this.tone(f, 0.22, 'triangle', 0.11, undefined, i * 0.16)); break;
    }
  }

  /** Zumbido de oficina muy suave: dos tonos graves desafinados con un temblor lento. */
  private startAmbient(): void {
    if (this.ambientStarted || !this.ctx || !this.master) return;
    this.ambientStarted = true;
    const g = this.ctx.createGain();
    g.gain.value = 0; // updateDrone() lo sube solo si no hay música
    g.connect(this.master);
    this.ambientGain = g;
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.18;
    lfoGain.gain.value = 3;
    lfo.connect(lfoGain);
    [55, 82.6, 110.7].forEach((f, i) => {
      const o = this.ctx!.createOscillator();
      const og = this.ctx!.createGain();
      o.type = i === 2 ? 'triangle' : 'sine';
      o.frequency.value = f;
      og.gain.value = i === 2 ? 0.25 : 0.6;
      lfoGain.connect(o.frequency);
      o.connect(og).connect(g);
      o.start();
    });
    lfo.start();
    this.updateDrone();
  }
}

export const audio = new AudioEngine();

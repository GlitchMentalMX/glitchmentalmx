import { state } from './state';

// Todo el sonido se sintetiza con Web Audio: cero archivos de audio, cero
// descargas. Los navegadores móviles solo permiten audio tras un gesto del
// usuario, así que el contexto se crea (o reanuda) en unlock(), que se llama
// desde el primer toque.

export type SfxName =
  | 'tap' | 'step' | 'pick' | 'door' | 'deny' | 'bleep' | 'crunch' | 'print'
  | 'whoosh' | 'surprise' | 'win' | 'lose' | 'glitch' | 'select' | 'pop' | 'coin' | 'type';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientStarted = false;
  private lastStep = 0;

  /** Llamar desde un gesto del usuario (pointerdown / keydown). */
  unlock(): void {
    try {
      if (!this.ctx) {
        const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return;
        this.ctx = new Ctor();
        this.master = this.ctx.createGain();
        this.master.gain.value = state.meta.muted ? 0 : 0.8;
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      this.startAmbient();
    } catch {
      // Sin audio disponible: el juego sigue en silencio.
    }
  }

  get muted(): boolean {
    return state.meta.muted;
  }

  setMuted(m: boolean): void {
    state.setAudioPrefs({ muted: m });
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.8, this.ctx.currentTime, 0.05);
  }

  setAmbient(on: boolean): void {
    state.setAudioPrefs({ ambient: on });
    if (this.ambientGain && this.ctx) this.ambientGain.gain.setTargetAtTime(on ? 0.05 : 0, this.ctx.currentTime, 0.4);
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
    if (!this.ctx || state.meta.muted) return;
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
    g.gain.value = state.meta.ambient ? 0.05 : 0;
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
  }
}

export const audio = new AudioEngine();

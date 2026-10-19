#!/usr/bin/env python3
"""Convierte las pistas de Flow en bucles listos para el juego.

Uso: python3 scripts/make-music-loops.py <origen.m4a> <salida.m4a> [inicio_s=18] [duracion_s=140] [cruce_s=3]

- Toma el tramo [inicio, inicio+duracion] y lo pasa a mono.
- Para que el bucle sea continuo, el inicio empieza con la continuación natural
  del final (el audio que viene justo DESPUÉS del tramo) y se funde `cruce`
  segundos hacia el principio original. Así el empalme final→inicio no tiene salto.
- Iguala el volumen (RMS ≈ -19 dBFS) para que las dos pistas suenen parejo.
- Codifica a AAC mono 56 kb/s con afconvert (macOS), compatible con iPhone y Chrome.
Solo usa la biblioteca estándar de Python y afconvert: no instala nada.
"""
import aifc, array, math, os, subprocess, sys, sys as _sys, tempfile, wave

src, dst = sys.argv[1], sys.argv[2]
start = float(sys.argv[3]) if len(sys.argv) > 3 else 18.0
dur = float(sys.argv[4]) if len(sys.argv) > 4 else 140.0
xf = float(sys.argv[5]) if len(sys.argv) > 5 else 3.0

tmp = tempfile.mkdtemp()
wav_in = os.path.join(tmp, 'in.aiff')
wav_out = os.path.join(tmp, 'out.wav')
# AIFF porque el WAV de afconvert usa un formato 'extensible' que la biblioteca wave no lee.
subprocess.run(['afconvert', src, wav_in, '-f', 'AIFF', '-d', 'BEI16'], check=True)

with aifc.open(wav_in) as w:
    ch, sr, n = w.getnchannels(), w.getframerate(), w.getnframes()
    raw = array.array('h')
    raw.frombytes(w.readframes(n))
    if _sys.byteorder == 'little':
        raw.byteswap()

# A mono
mono = array.array('f', [0.0] * n)
for i in range(n):
    s = 0
    for c in range(ch):
        s += raw[i * ch + c]
    mono[i] = s / ch / 32768.0

a = int(start * sr)
X = int(xf * sr)
L = min(int(dur * sr), n - a - X)
seg = mono[a:a + L]
post = mono[a + L:a + L + X]  # lo que sigue naturalmente después del final del tramo
assert len(post) == X, 'No hay suficiente audio después del final para el cruce'
out = array.array('f', seg)
# El inicio del bucle empieza con la continuación natural del final (así el final
# empalma sin salto) y se funde hacia el principio original.
for i in range(X):
    t = i / X
    out[i] = post[i] * math.cos(t * math.pi / 2) + seg[i] * math.sin(t * math.pi / 2)

# Volumen parejo
rms = math.sqrt(sum(v * v for v in out) / len(out))
peak = max(abs(v) for v in out)
target = 10 ** (-19 / 20)
gain = target / rms
if peak * gain > 0.95:
    gain = 0.95 / peak
pcm = array.array('h', [max(-32768, min(32767, int(v * gain * 32767))) for v in out])
with wave.open(wav_out, 'wb') as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(sr)
    w.writeframes(pcm.tobytes())

subprocess.run(['afconvert', wav_out, dst, '-f', 'm4af', '-d', 'aac', '-b', '56000'], check=True)
print(f'{dst}: {L / sr:.1f} s, ganancia x{gain:.2f}, {os.path.getsize(dst) / 1024:.0f} KB')

# Sound-effects-only soundtrack, synced to the events reel.html records (render.js events -> sfx.json).
import json, sys, wave
import numpy as np

SR = 44100
SPLIT, S1, S2 = 5.6, 1.4, 1.12          # must match the time remap in reel.html
def u(a): return a / S1 if a <= SPLIT else SPLIT / S1 + (a - SPLIT) / S2
def speed(a): return S1 if a <= SPLIT else S2

ev = json.load(open('sfx.json'))
TOTAL = ev['total']
N = int(SR * TOTAL) + SR
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(11)

def secs(d): return np.arange(int(d * SR)) / SR

def band(x, lo, hi):
    """FFT band-pass with soft edges."""
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    g = 1 / (1 + (lo / np.maximum(f, 1)) ** 4) / (1 + (f / hi) ** 4)
    return np.fft.irfft(X * g, len(x))

def sweep(d, lo0, hi0, lo1, hi1, chunks=12):
    """Noise whose pass band glides from (lo0,hi0) to (lo1,hi1)."""
    n = int(d * SR); out = np.zeros(n); seg = n // chunks + 1
    win = np.hanning(2 * seg)
    for c in range(chunks):
        k = c / max(1, chunks - 1)
        s0 = max(0, c * seg - seg // 2); s1 = min(n, s0 + 2 * seg)
        part = band(rng.standard_normal(s1 - s0), lo0 + (lo1 - lo0) * k, hi0 + (hi1 - hi0) * k)
        out[s0:s1] += part * win[:s1 - s0]
    return out / (np.abs(out).max() + 1e-9)

def tone(f, d, dec, attack=0.002):
    t = secs(d)
    f = np.broadcast_to(f, t.shape) if np.ndim(f) else np.full(t.shape, f)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.minimum(1, t / attack) * np.exp(-t / dec)

def put(y, at, gain=1.0, pan=0.0):
    i0 = int(at * SR)
    if i0 >= N: return
    y = y[:N - i0] * gain
    L[i0:i0 + len(y)] += y * (1 - pan) ** 0.5
    R[i0:i0 + len(y)] += y * (1 + pan) ** 0.5

def fade(y, a=0.01, r=0.05):
    n = len(y); e = np.ones(n)
    na, nr = max(1, int(a * SR)), max(1, int(r * SR))
    e[:na] = np.linspace(0, 1, na); e[-nr:] *= np.linspace(1, 0, nr)
    return y * e

PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21]
def penta(i, base=880): return base * 2 ** (PENTA[i % len(PENTA)] / 12)

# ---------------- sound library ----------------
def s_tick(at, i=0, **_):
    f = 1900 + 160 * ((i * 7) % 5)
    y = tone(f, 0.03, 0.006) + 0.25 * band(rng.standard_normal(int(0.03 * SR)), 2000, 7000) * np.exp(-secs(0.03) / 0.004)
    put(y, at, 0.035, rng.uniform(-.3, .3))

def s_pop(at, i=0, big=0, **_):
    d = 0.25 if big else 0.16
    t = secs(d); top = (520 if big else 700) * 2 ** (PENTA[i % 6] / 12)
    f = top * (0.45 + 0.55 * (1 - np.exp(-t / 0.018)))
    y = tone(f, d, 0.09 if big else 0.05)
    if big: y += 0.6 * tone(90, 0.25, 0.08)
    put(y, at, 0.16 if big else 0.12, rng.uniform(-.25, .25))

def s_blip(at, i=0, g=1, low=0, **_):
    f = penta(i, 440 if low else 880)
    y = tone(f, 0.12, 0.035) + 0.3 * tone(f * 2, 0.12, 0.02)
    put(y, at, 0.07 * g, (i % 4 - 1.5) * 0.15)

def s_scratch(at, i=0, **_):
    y = fade(band(rng.standard_normal(int(0.08 * SR)), 1800, 6000), 0.004, 0.04)
    put(y / (np.abs(y).max() + 1e-9), at, 0.05, rng.uniform(-.3, .3))

def s_swipe(at, **_):
    put(fade(sweep(0.26, 700, 2000, 2500, 6000, 6), 0.02, 0.12), at, 0.045)

def s_click(at, **_):
    n = rng.standard_normal(int(0.012 * SR)) * np.exp(-secs(0.012) / 0.002)
    y = np.concatenate([n, np.zeros(int(0.018 * SR)), 0.6 * n]) + 0
    y[:len(tone(3200, 0.03, 0.004))] += 0.4 * tone(3200, 0.03, 0.004)[:len(y)]
    put(y, at, 0.08)

def s_thump(at, **_):
    t = secs(0.35)
    y = tone(45 + 70 * np.exp(-t / 0.03), 0.35, 0.12) + 0.15 * band(rng.standard_normal(len(t)), 80, 600) * np.exp(-t / 0.04)
    put(y, at, 0.22)

def s_rumble(at, **_):
    d = 1.1; t = secs(d)
    y = band(rng.standard_normal(len(t)), 30, 180) * np.sin(np.pi * np.minimum(1, t / d)) ** 1.5
    put(y / (np.abs(y).max() + 1e-9), at, 0.12); s_thump(at + 0.55)

def s_wind(at, d=1.5, **_):
    y = sweep(d, 200, 700, 400, 1200, 10) * np.sin(np.pi * secs(d) / d) ** 2
    put(y, at, 0.04, -0.3)

def s_rain(at, d=4, **_):
    t = secs(d); env = np.minimum(1, t / 0.5) * np.minimum(1, (d - t) / 0.6)
    y = band(rng.standard_normal(len(t)), 2500, 9000) * env
    put(y / (np.abs(y).max() + 1e-9), at, 0.018, -0.2)
    for k in range(int(d * 22)):
        put(tone(rng.uniform(2500, 5500), 0.03, 0.006), at + rng.uniform(0, d), 0.02, rng.uniform(-.6, .6))

def s_steps(at, d=3, **_):
    k = 0; x = 0.0
    while x < d:
        t = secs(0.12)
        y = tone(110 + 25 * (k % 2), 0.12, 0.03) + 0.5 * band(rng.standard_normal(len(t)), 300, 2500) * np.exp(-t / 0.015)
        put(y, at + x, 0.06, 0.15 if k % 2 else -0.15); x += 0.36; k += 1

def s_flutter(at, d=3, **_):
    t = secs(d)
    y = band(rng.standard_normal(len(t)), 300, 1800) * (0.5 + 0.5 * np.sin(2 * np.pi * 8.5 * t)) ** 2
    y *= np.minimum(1, t / 0.2) * np.minimum(1, (d - t) / 0.5)
    put(y / (np.abs(y).max() + 1e-9), at, 0.022, 0.35)

def s_shake(at, **_):
    for k in range(4): put(tone(70, 0.08, 0.025), at + k * 0.06, 0.12, (-1) ** k * 0.3)

def s_slide(at, **_):
    put(fade(sweep(0.3, 900, 2500, 1800, 5000, 6), 0.03, 0.15), at, 0.045, 0.4)
    put(tone(140, 0.15, 0.04), at + 0.22, 0.08)

def s_draw(at, d=0.8, **_):
    t = secs(d)
    y = band(rng.standard_normal(len(t)), 3000, 8000) * (0.7 + 0.3 * np.sin(2 * np.pi * 23 * t))
    put(fade(y / (np.abs(y).max() + 1e-9), 0.05, d * 0.5), at, 0.018)

def s_line(at, d=1, **_): s_draw(at, d * 0.8)

def s_logo(at, **_):
    put(tone(1320, 0.18, 0.05), at, 0.045, 0.5); put(tone(1980, 0.18, 0.05), at + 0.07, 0.035, 0.5)

def s_whirr(at, d=3, **_):
    for k in range(int(d * 11)): put(tone(2400 + 300 * (k % 3), 0.02, 0.004), at + k / 11, 0.03, 0.1)
    t = secs(d); put(np.sin(2 * np.pi * 110 * t) * np.sin(np.pi * t / d), at, 0.015)

def s_flip(at, **_):
    s_click(at); t = secs(0.6)
    put(band(rng.standard_normal(len(t)), 4000, 10000) * np.exp(-t / 0.2) * np.minimum(1, t / 0.05), at + 0.05, 0.02)

def s_rise(at, d=0.8, up=0, **_):
    t = secs(d); f = 300 * (2 if up else 1.6) ** (t / d) * (1.15 if up else 1)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.minimum(1, t / 0.05) * np.minimum(1, (d - t) / 0.15)
    put(y, at, 0.05)

def s_ding(at, hi=0, **_):
    base = 1568 if hi else 1318; d = 1.4; y = np.zeros(int(d * SR))
    for p, a, dec in [(1, 1, .9), (2.76, .35, .4), (5.4, .15, .2), (8.93, .06, .12)]: y += a * tone(base * p, d, dec)
    put(y, at, 0.09)

def s_sparkle(at, i=0, **_):
    for k in range(3): put(tone(3500 + 700 * ((i + k) % 3), 0.15, 0.04), at + k * 0.035, 0.03, rng.uniform(-.6, .6))

def s_grow(at, d=1.5, **_):
    t = secs(d)
    put(sweep(d, 150, 500, 400, 1600, 10) * np.minimum(1, t / 0.3) * np.minimum(1, (d - t) / 0.3), at, 0.03)
    for k in range(int(d * 20)): put(band(rng.standard_normal(200), 1000, 6000) * np.hanning(200), at + rng.uniform(0, d), 0.03)

def s_pulse(at, i=0, **_):
    t = secs(1.0); y = np.sin(2 * np.pi * 58 * t) * np.sin(np.pi * t) ** 2
    put(y, at, 0.12 - i * 0.03)

def s_chime(at, **_):
    for k, m in enumerate([0, 4, 7, 12]):
        f = 1046.5 * 2 ** (m / 12); d = 1.8; y = np.zeros(int(d * SR))
        for p, a, dec in [(1, 1, .9), (2.76, .25, .35), (5.4, .08, .15)]: y += a * tone(f * p, d, dec)
        put(y, at + k * 0.09, 0.06, (k - 1.5) * 0.25)

def s_count(at, d=1, **_):
    n = 16
    for k in range(n):
        x = k / n; tt = 1 - (1 - x) ** 0.5            # inverse of power2.out: ticks thin out as it settles
        put(tone(1500 + 60 * k, 0.025, 0.005), at + tt * d, 0.035, 0.2)

def s_swish(at, k=0, **_):
    # light airy "fwip" for scene transitions (replaces the heavy whoosh)
    d = 0.32
    y = fade(sweep(d, 1200, 3500, 3500, 9000, 8), 0.06, 0.18)
    put(y, at, 0.05, -0.3 if k % 2 else 0.3)
    t = secs(0.25); put(np.sin(2 * np.pi * np.cumsum(500 * 2 ** (t / 0.25)) / SR) * np.sin(np.pi * t / 0.25) ** 2, at + 0.05, 0.015)

LIB = {k[2:]: v for k, v in globals().items() if k.startswith('s_')}
for e in ev['events']:
    e = dict(e); typ = e.pop('type'); a = e.pop('at')
    if 'd' in e: e['d'] = e['d'] / speed(a)
    LIB[typ](u(a), **e)

# ---------------- master: small room reverb, gentle limiting ----------------
ir_t = secs(0.9); ir = rng.standard_normal(len(ir_t)) * np.exp(-ir_t / 0.25); ir /= np.sqrt((ir ** 2).sum())
def conv(x):
    n = len(x) + len(ir); m = 1 << (n - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(x, m) * np.fft.rfft(ir, m), m)[:len(x)]
L = L + 0.18 * conv(L); R = R + 0.18 * conv(R)
L, R = L[:int(TOTAL * SR)], R[:int(TOTAL * SR)]
pk = max(np.abs(L).max(), np.abs(R).max())
L, R = np.tanh(L / pk * 1.5) / np.tanh(1.5) * 0.9, np.tanh(R / pk * 1.5) / np.tanh(1.5) * 0.9
data = (np.stack([L, R], 1) * 32767).astype('<i2')
with wave.open(sys.argv[1] if len(sys.argv) > 1 else 'sfx.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())
print('ok', len(ev['events']), 'events')

import numpy as np, wave
SR = 44100; TOTAL = 47.6
N = int(SR * TOTAL); L = np.zeros(N); R = np.zeros(N)
t = np.arange(N) / SR
rng = np.random.default_rng(7)

def lp(x, a):  # one-pole lowpass
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)):
        acc += a * (x[i] - acc); y[i] = acc
    return y

# --- warm pad: chord progression (Am - F - C - G), soft saw-ish via few harmonics ---
def note(f): return 440 * 2 ** ((f - 69) / 12)
chords = [[57, 60, 64, 69], [53, 57, 60, 65], [48, 55, 60, 64], [55, 59, 62, 67]]
bar = 5.95
pad = np.zeros(N)
for k in range(int(TOTAL / bar) + 1):
    c = chords[k % 4]; s0 = k * bar
    i0, i1 = int(s0 * SR), min(N, int((s0 + bar + 1.5) * SR))
    tt = t[i0:i1] - s0
    env = np.minimum(1, tt / 1.6) * np.exp(-np.maximum(0, tt - bar) / 0.6)
    seg = np.zeros(i1 - i0)
    for m in c:
        f = note(m)
        for h, amp in [(1, 1), (2, .28), (3, .1)]:
            for det in (-0.12, 0.12):
                seg += amp * np.sin(2 * np.pi * f * h * (1 + det / 100) * tt + rng.uniform(0, 6))
    pad[i0:i1] += seg * env
pad *= 0.022 * (0.85 + 0.15 * np.sin(2 * np.pi * 0.1 * t))
# soft bass
bass = np.zeros(N)
for k in range(int(TOTAL / bar) + 1):
    f = note(chords[k % 4][0] - 12); s0 = k * bar
    i0, i1 = int(s0 * SR), min(N, int((s0 + bar) * SR)); tt = t[i0:i1] - s0
    bass[i0:i1] += np.sin(2 * np.pi * f * tt) * np.minimum(1, tt / .3) * np.exp(-tt / 4)
pad += bass * 0.06

# --- gentle plucks (arpeggio) for movement ---
pl = np.zeros(N)
step = bar / 8
for k in range(int(TOTAL / step)):
    c = chords[int(k * step / bar) % 4]
    m = c[[0, 2, 1, 3, 2, 3, 1, 2][k % 8]] + 12
    s0 = k * step; i0 = int(s0 * SR); i1 = min(N, i0 + int(1.2 * SR)); tt = t[i0:i1] - s0
    f = note(m)
    pl[i0:i1] += (np.sin(2*np.pi*f*tt) + .3*np.sin(4*np.pi*f*tt)) * np.exp(-tt / .28)
pl *= 0.035
fade_in = np.minimum(1, t / 2.0)
music = (pad + pl) * fade_in
L += music; R += music
# delay for space on plucks
d = int(0.27 * SR)
L[d:] += pl[:-d] * 0.35; R[2*d:] += pl[:-2*d] * 0.3

# --- whooshes on transitions ---
T = [5.6, 12.8, 16.9, 23.4, 29.6, 36.3, 42.9]
def whoosh(at, dur=0.9, gain=0.22):
    n = int(dur * SR); x = rng.standard_normal(n)
    tt = np.arange(n) / n
    a = 0.02 + 0.25 * np.sin(np.pi * tt) ** 2       # sweeping cutoff
    y = np.empty(n); acc = 0.0
    for i in range(n): acc += a[i] * (x[i] - acc); y[i] = acc
    env = np.sin(np.pi * tt) ** 1.5
    y *= env * gain / (np.abs(y).max() + 1e-9)
    i0 = int(at * SR)
    pan = np.linspace(-0.6, 0.6, n)
    L[i0:i0+n] += y * (1 - pan) / 1.4; R[i0:i0+n] += y * (1 + pan) / 1.4
for x in T: whoosh(x - 0.75)

# --- soft pops/ticks on key reveals ---
def pop(at, f=880, gain=0.12, dec=0.06):
    n = int(0.25 * SR); tt = np.arange(n) / SR
    fs = f * (1 + 1.5 * np.exp(-tt / 0.01))
    y = np.sin(2 * np.pi * np.cumsum(fs) / SR) * np.exp(-tt / dec) * gain
    i0 = int(at * SR); L[i0:i0+n] += y; R[i0:i0+n] += y
for i in range(8): pop(1.35 + i * 0.16, 700 + i * 40, 0.07, 0.04)          # X marks
for i in range(4): pop(5.6 + 2.0 + i * 0.32, 620 + i * 90, 0.09)           # icons
pop(5.6 + 3.6, 520, 0.12, 0.12); pop(5.6 + 4.95, 1040, 0.1, 0.1)           # pill
pop(16.9 + 1.1, 600, .08); pop(16.9 + 2.6, 700, .08)                       # cards
for i in range(4): pop(23.4 + 0.3 + i, 560 + i * 70, 0.09)                 # rows
for i in range(8): pop(29.6 + 1.0 + i * 0.2, 400 + i * 30, 0.05, 0.03)     # arches
pop(29.6 + 3.5, 1320, 0.13, 0.15); pop(29.6 + 3.62, 1760, 0.08, 0.15)      # check
pop(36.3 + 1.6, 900, 0.08); pop(36.3 + 1.75, 1100, 0.08)                   # leaves
# final shimmer on logo
pop(42.9 + 0.25, 440, 0.12, 0.6); pop(42.9 + 0.3, 660, 0.08, 0.6); pop(42.9 + 0.35, 880, 0.06, 0.8)

# master: fade out end, normalise
fo = np.clip((TOTAL - t) / 2.5, 0, 1); L *= fo; R *= fo
m = max(np.abs(L).max(), np.abs(R).max()); L *= 0.89 / m; R *= 0.89 / m
data = (np.stack([L, R], 1) * 32767).astype('<i2')
with wave.open('sound.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())
print('ok')

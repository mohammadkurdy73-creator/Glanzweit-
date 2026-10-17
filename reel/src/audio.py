import numpy as np, wave
import sys
SR = 44100
SPLIT, S1, S2 = 5.6, 1.4, 1.12          # must match the time remap in reel.html
def u(a): return a / S1 if a <= SPLIT else SPLIT / S1 + (a - SPLIT) / S2
TOTAL = u(47.6)
N = int(SR * TOTAL); L = np.zeros(N); R = np.zeros(N)
t = np.arange(N) / SR
rng = np.random.default_rng(7)

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
for x in T: whoosh(u(x - 0.75), 0.8)

# --- soft pops/ticks on key reveals ---
def pop(at, f=880, gain=0.12, dec=0.06):
    n = int(0.25 * SR); tt = np.arange(n) / SR
    fs = f * (1 + 1.5 * np.exp(-tt / 0.01))
    y = np.sin(2 * np.pi * np.cumsum(fs) / SR) * np.exp(-tt / dec) * gain
    i0 = int(u(at) * SR); n = min(n, N - i0); L[i0:i0+n] += y[:n]; R[i0:i0+n] += y[:n]
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

n = int(0.8 * SR); tt = np.arange(n) / SR
hit = np.sin(2 * np.pi * (55 + 60 * np.exp(-tt / 0.05)) * tt) * np.exp(-tt / 0.25) * 0.35
L[:n] += hit; R[:n] += hit

# master: fade out end, normalise
fo = np.clip((TOTAL - t) / 2.5, 0, 1); L *= fo; R *= fo
m = max(np.abs(L).max(), np.abs(R).max()); L *= 0.89 / m; R *= 0.89 / m
data = (np.stack([L, R], 1) * 32767).astype('<i2')
with wave.open(sys.argv[1] if len(sys.argv) > 1 else 'sfx.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())
print('ok')

"""Make the spectrogram masks in site/assets/spec/ from the site's audio clips.

Usage: python tools/make_spectrograms.py site/assets/audio/*.mp3
Needs numpy, scipy, Pillow and ffmpeg (to decode MP3 to WAV).

Each output is a white RGBA WebP whose alpha is the log-mel spectrogram
(80 mels, 40-9000 Hz, 68 dB range). CSS colours it through `mask`, and the
playhead is the CSS variable --p (see .spec in site/assets/site.css).
Clips are NOT trimmed, so the playhead stays in sync with the audio.
"""
import os, subprocess, sys, tempfile
import numpy as np
from PIL import Image
from scipy.io import wavfile
from scipy.signal import stft


def mel_fb(sr, n_fft, n_mels, fmin=40, fmax=9000):
    hz2mel = lambda f: 2595 * np.log10(1 + f / 700)
    mel2hz = lambda m: 700 * (10 ** (m / 2595) - 1)
    hz = mel2hz(np.linspace(hz2mel(fmin), hz2mel(fmax), n_mels + 2))
    bins = np.floor((n_fft + 1) * hz / sr).astype(int)
    fb = np.zeros((n_mels, n_fft // 2 + 1))
    for i in range(1, n_mels + 1):
        l, c, r = bins[i - 1], bins[i], bins[i + 1]
        if c > l: fb[i - 1, l:c] = (np.arange(l, c) - l) / (c - l)
        if r > c: fb[i - 1, c:r] = (r - np.arange(c, r)) / (r - c)
    return fb


def melspec(wav, n_mels=80):
    sr, x = wavfile.read(wav)
    x = x.astype(np.float32)
    if x.ndim > 1: x = x.mean(1)
    x /= np.abs(x).max() + 1e-9
    _, _, Z = stft(x, sr, nperseg=1024, noverlap=1024 - 220)
    M = mel_fb(sr, 1024, n_mels) @ (np.abs(Z) ** 2)
    D = 10 * np.log10(M + 1e-10); D -= D.max()
    return np.clip((D + 68) / 68, 0, 1)[::-1]  # low frequencies at the bottom


def render(src, out, W=1000, H=120):
    with tempfile.TemporaryDirectory() as t:
        wav = os.path.join(t, "a.wav")
        subprocess.run(["ffmpeg", "-loglevel", "error", "-i", src, "-ac", "1", wav], check=True)
        D = melspec(wav)
    a = np.clip((D - 0.30) / 0.45, 0, 1) ** 1.4
    img = Image.fromarray((a * 255).astype(np.uint8), "L").resize((W, H), Image.BICUBIC)
    Image.merge("RGBA", [Image.new("L", img.size, 255)] * 3 + [img]).save(out, "WEBP", quality=72, method=2)


if __name__ == "__main__":
    for f in sys.argv[1:]:
        name = os.path.splitext(os.path.basename(f))[0]
        render(f, f"site/assets/spec/spec-{name}.webp")
        print("wrote", name)

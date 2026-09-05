#!/usr/bin/env python3
"""Crop an illustration to a target aspect ratio without squashing it, keeping the people in frame.
Usage: smart_crop.py <src> <aspect w/h> <dst>
Horizontal crops pick the window with the most 'people energy' (skin tones plus edge detail),
so a wide scene cropped into a tall column keeps the person rather than the wall beside them.
Vertical crops keep the top of the frame (heads), trimming from the bottom first.
Called by hm_decks_v2.js, results cached under assets/crops."""
import sys, numpy as np
from PIL import Image, ImageFilter

def energy_columns(im):
    small = im.convert("RGB").resize((max(64, im.width // 4), max(64, im.height // 4)))
    a = np.asarray(small).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    # skin-ish tones (covers the illustration palette's range of complexions)
    skin = ((r > 90) & (r > g) & (g > b) & (r - b > 18) & (r - g > 6) & (r < 250)).astype(np.float32)
    # faces sit in the upper part of the frame: weight rows by height, heads count most
    hh = skin.shape[0]; rowW = np.linspace(1.6, 0.4, hh)[:, None]
    skin = skin * rowW
    grey = np.asarray(small.convert("L").filter(ImageFilter.FIND_EDGES)).astype(np.float32) / 255.0
    e = 8.0 * skin + 0.6 * grey * rowW
    col = e.sum(axis=0)
    k = max(3, small.width // 10); ker = np.ones(k) / k
    return np.convolve(col, ker, mode="same"), small.width

def main(src, aspect, dst):
    aspect = float(aspect)
    im = Image.open(src).convert("RGB")
    W, H = im.size
    cur = W / H
    if abs(cur - aspect) < 0.01:
        out = im
    elif cur > aspect:  # too wide: crop horizontally around the people
        cw = int(round(H * aspect))
        col, sw = energy_columns(im)
        win = max(1, int(round(cw / W * sw)))
        best, bx = -1, 0
        for x in range(0, sw - win + 1):
            v = col[x:x + win].sum()
            if v > best: best, bx = v, x
        x0 = int(round(bx / sw * W)); x0 = max(0, min(W - cw, x0))
        out = im.crop((x0, 0, x0 + cw, H))
    else:  # too tall: keep the top, trim the bottom first
        ch = int(round(W / aspect))
        excess = H - ch
        y0 = int(excess * 0.15)
        out = im.crop((0, y0, W, y0 + ch))
    if out.width > 1400:
        out = out.resize((1400, int(out.height * 1400 / out.width)), Image.LANCZOS)
    out.save(dst, quality=85, optimize=True)
    print(dst)

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3])

# -*- coding: utf-8 -*-
"""Extract the twelve HomeTest journey pages into journeys.json for journey_decks_gen.js.
Run from the HomeTest-TOM site folder (the pages, Assets/Personas and Assets/<Name> Story live there).
Writes journeys.json plus downscaled images into OUT/img. Then: NODE_PATH=$(npm root -g) node journey_decks_gen.js
Portraits are flattened to 500px JPEG on white; stage illustrations to 1400px JPEG.
"""
import io, re, os, json, html, sys
from PIL import Image
SRC = "."; OUT = sys.argv[1] if len(sys.argv) > 1 else "./_deckbuild"
os.makedirs(f"{OUT}/img", exist_ok=True)
COL = {"abdul":"FFB91D","adam":"C9A0E3","anita":"003087","catherine":"003087","devi":"FFB91D","hannah":"C9A0E3","joe":"5BC093","layla":"FFB91D","mark":"FFB91D","ruth":"003087","sarah":"003087","sean":"4527A0"}
GROUP = {"abdul":"Patient","devi":"Patient","layla":"Patient","mark":"Patient","sean":"Patient","sarah":"Commissioner","catherine":"Commissioner","anita":"Commissioner","ruth":"Commissioner","adam":"Clinician","hannah":"Clinician","joe":"Supplier"}
def runs(frag):
    frag = re.sub(r'<span class="hm-witness"[^>]*></span>', '', frag); frag = re.sub(r'<br\s*/?>', '\n', frag); out = []
    for part in re.split(r'(<strong>.*?</strong>)', frag, flags=re.S):
        if not part: continue
        b = part.startswith('<strong>'); txt = html.unescape(re.sub(r'<[^>]+>', '', part)); txt = re.sub(r'[ \t]+', ' ', txt)
        if txt: out.append({"text": txt, "bold": b})
    if out: out[0]["text"] = out[0]["text"].lstrip(); out[-1]["text"] = out[-1]["text"].rstrip()
    return out
def plain(frag): return "".join(r["text"] for r in runs(frag))
def grab(s, pat): m = re.search(pat, s, re.S); return m.group(1) if m else ""
def shrink(src, dst, maxw, flatten=False):
    im = Image.open(src).convert("RGBA")
    if flatten: bg = Image.new("RGBA", im.size, (255, 255, 255, 255)); bg.alpha_composite(im); im = bg
    im = im.convert("RGB")
    if im.width > maxw: im = im.resize((maxw, int(im.height * maxw / im.width)), Image.LANCZOS)
    im.save(dst, quality=85 if flatten else 82, optimize=True); return [im.width, im.height]
data = []
for f in sorted(os.listdir(SRC)):
    m = re.match(r'HomeTest Operating Model - (\w+) Journey\.html$', f)
    if not m: continue
    name = m.group(1); key = name.lower(); s = io.open(f, encoding="utf-8").read(); body = s[s.find('<!-- HERO -->'):]
    P = {"name": name, "key": key, "colour": COL[key], "group": GROUP[key]}
    P["hero_eyebrow"] = plain(grab(body, r'class="hero-eyebrow">(.*?)</div>')); P["hero_title"] = runs(grab(body, r'<h1 class="hero-title">(.*?)</h1>'))
    P["hero_strap"] = runs(grab(body, r'<p class="hero-strap">(.*?)</p>')); P["role"] = plain(grab(body, r'class="hero-portrait-role">(.*?)</div>')).replace("\n", " · ")
    port = grab(body, r'class="hero-portrait-circ">\s*<img src="([^"]+)"').replace("%20", " "); P["portrait"] = None
    if port and os.path.exists(port): dst = f"{OUT}/img/{key}-portrait.jpg"; P["portrait_wh"] = shrink(port, dst, 500, True); P["portrait"] = os.path.abspath(dst)
    P["ribbon"] = [{"label": plain(l), "sub": plain(su)} for l, su in re.findall(r'<div class="ribbon-label">(.*?)</div>\s*<div class="ribbon-substage">(.*?)</div>', body, re.S)]
    P["framing"] = [{"eyebrow": plain(a), "h": plain(b), "body": runs(c)} for a, b, c in re.findall(r'<div class="framing-tile-eyebrow">(.*?)</div>\s*<div class="framing-tile-h">(.*?)</div>\s*<div class="framing-tile-body">(.*?)</div>', body, re.S)]
    P["stages"] = []
    for i, blk in enumerate(re.findall(r'<div class="stage" id="stage-\d+">(.*?)(?=<div class="stage" id="stage-\d+">|<!-- OUTCOME -->)', body, re.S), 1):
        st = {"n": i, "eyebrow": plain(grab(blk, r'class="stage-eyebrow">(.*?)</div>')), "title": plain(grab(blk, r'<h2 class="stage-title">(.*?)</h2>')),
              "quote": plain(grab(blk, r'class="pull-quote-text">(.*?)</p>')), "attrib": plain(grab(blk, r'class="pull-quote-attribution">(.*?)</div>')),
              "under": runs(grab(blk, r'class="whats-happening-body">(.*?)</div>\s*</div>')), "old": runs(grab(blk, r'class="old-way-body">(.*?)</div>\s*</div>')),
              "care": runs(grab(blk, r'class="careteam-text">(.*?)</div>')), "image": None}
        img = grab(blk, r'class="stage-image"[^>]*><img src="([^"]+)"').replace("%20", " ")
        if img and os.path.exists(img): dst = f"{OUT}/img/{key}-stage{i}.jpg"; st["image_wh"] = shrink(img, dst, 1400); st["image"] = os.path.abspath(dst)
        P["stages"].append(st)
    P["outcome_eyebrow"] = plain(grab(body, r'class="outcome-eyebrow">(.*?)</div>')); P["outcome_title"] = plain(grab(body, r'<h2 class="outcome-title">(.*?)</h2>'))
    P["outcome_body"] = runs(grab(body, r'<p class="outcome-body">(.*?)</p>'))
    ms = grab(body, r'<div class="money-story"(.*?)</div>\s*</body>'); P["money"] = [runs(x) for x in re.findall(r'<p style="font-size:14\.5px[^"]*">(.*?)</p>', ms, re.S)]
    data.append(P); print(name, len(P["stages"]), "stages")
json.dump(data, io.open(f"{OUT}/journeys.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

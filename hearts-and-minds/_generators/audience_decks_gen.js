/* Audience decks: one pitch per room, in the operating model's own visual language.
   Content lives in audience_decks_content.js; the look lives in deck_kit.js.
   Usage: NODE_PATH=<node_modules> node audience_decks_gen.js [outDir] [portraitDir]
   Default outDir is ./out ; default portraitDir is the HomeTest site's Assets/Personas folder. */
const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const K = require('./deck_kit.js');
const { DECKS } = require('./audience_decks_content.js');
const { C, FONT, W, H, plain, runs, hFor, fitPt } = K;

const OUT = process.argv[2] || path.join(__dirname, 'out');
const PORTRAITS = process.argv[3] || path.join(__dirname, 'assets', 'portraits');
fs.mkdirSync(OUT, { recursive: true });
const STAMP = 'September 2026';
// portraits are cached at deck resolution (560px, flattened to white) so the decks stay a sensible size
const portraitPath = k => {
  for (const ext of ['.jpg', '.png']) { const p = path.join(PORTRAITS, k + ext); if (fs.existsSync(p)) return p; }
  return null;
};

const BOT = H - 0.62;
const centre = (top, h) => top + Math.max(0, (BOT - top - h) / 2);   // measured blocks sit centred, not stretched

function foot(deck) { return 'Hearts and Minds  ·  audience deck ' + deck.no + '  ·  ' + deck.audience; }

function portrait(s, key, x, y, d, ring) {
  s.addShape('ellipse', { x: x - 0.08, y: y - 0.08, w: d + 0.16, h: d + 0.16, fill: { color: ring }, line: { color: ring } });
  const p = portraitPath(key);
  if (p) s.addImage({ path: p, x, y, w: d, h: d, rounding: true, sizing: { type: 'cover', w: d, h: d } });
}

// ---------------------------------------------------------------- slide types
function titleSlide(pptx, deck) {
  const s = pptx.addSlide(); K.heroBg(s);
  K.logo(s, { right: W - 0.6, y: 0.5, h: 0.5 });
  s.addText(('Hearts and Minds  ·  ' + deck.audience + '  ·  ' + deck.no).toUpperCase(),
    { x: 0.75, y: 0.62, w: 9.4, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.gold, charSpacing: 2.8, margin: 0 });
  s.addShape('rect', { x: 0.75, y: 1.06, w: 0.9, h: 0.055, fill: { color: C.gold }, line: { color: C.gold } });
  const tPt = fitPt(deck.title, 2.1, 11.4, 46, 26), tH = Math.min(2.1, hFor(deck.title, tPt, 11.4, 0.1));
  s.addText(deck.title, { x: 0.75, y: 1.32, w: 11.4, h: tH, fontFace: FONT, fontSize: tPt, bold: true, color: C.white, margin: 0, charSpacing: -1.2, valign: 'top', fit: 'shrink' });
  const strapY = 1.32 + tH + 0.34, strapH = hFor(deck.strap, 14, 9.4, 0.1);
  s.addText(deck.strap, { x: 0.75, y: strapY, w: 9.4, h: strapH, fontFace: FONT, fontSize: 14, color: 'DCE7F0', valign: 'top', margin: 0, fit: 'shrink' });
  const sfH = hFor(deck.standfirst, 11.5, 10.9, 0.34), sfY = Math.min(BOT - sfH - 0.1, strapY + strapH + 0.42);
  K.card(s, { x: 0.75, y: sfY, w: 11.4, h: sfH, fill: '0A3D8F', line: '2C5FA8', accent: C.gold });
  s.addText(deck.standfirst, { x: 1.0, y: sfY + 0.14, w: 10.9, h: sfH - 0.24, fontFace: FONT, fontSize: 11.5, color: 'DCE7F0', valign: 'middle', margin: 0, fit: 'shrink' });
  K.footer(s, foot(deck), null, true);
  s.addNotes('Open on the promise, not the product. Read the standfirst aloud: it is the proof that this is a live service rather than a strategy document. ' + STAMP + '.');
}

function personaSlide(pptx, deck, sl, n) {
  const s = pptx.addSlide(); s.background = { color: C.white };
  const top = K.header(s, sl.eyebrow, sl.title, deck.accent);
  const nP = sl.people.length, cw = (W - 1.0 - (nP - 1) * 0.3) / nP;
  const cardH = Math.max.apply(null, sl.people.map(p => 1.62 + hFor(p.quote, 12, cw - 0.78, 0.12)));
  const bodyH = hFor(plain(sl.body), 13, W - 1.0, 0.1);
  const y0 = centre(top, cardH + 0.34 + bodyH);
  sl.people.forEach((p, i) => {
    const x = 0.5 + i * (cw + 0.3), y = y0;
    K.card(s, { x, y, w: cw, h: cardH, fill: C.bg, accent: deck.accent });
    portrait(s, p.key, x + 0.28, y + 0.36, 1.05, deck.accent);
    s.addText(p.name, { x: x + 1.55, y: y + 0.32, w: cw - 1.8, h: 0.4, fontFace: FONT, fontSize: 18, bold: true, color: C.navy, margin: 0 });
    s.addText(p.role, { x: x + 1.55, y: y + 0.72, w: cw - 1.8, h: 0.5, fontFace: FONT, fontSize: 10, bold: true, color: C.textSec, valign: 'top', margin: 0, fit: 'shrink' });
    const qy = y + 1.55, qh = cardH - 1.7;
    s.addShape('rect', { x: x + 0.28, y: qy, w: 0.07, h: qh, fill: { color: deck.accent }, line: { color: deck.accent } });
    s.addText('“' + p.quote + '”', { x: x + 0.46, y: qy - 0.04, w: cw - 0.78, h: qh + 0.08, fontFace: FONT, fontSize: 12, italic: true, color: C.text, valign: 'top', margin: 0, fit: 'shrink' });
  });
  s.addText(runs(sl.body, { fontFace: FONT, fontSize: 13, color: C.text }), { x: 0.5, y: y0 + cardH + 0.34, w: W - 1.0, h: bodyH, valign: 'top', margin: 0, fit: 'shrink' });
  K.footer(s, foot(deck), n, false); s.addNotes(sl.notes);
}

function statwallSlide(pptx, deck, sl, n) {
  const s = pptx.addSlide(); s.background = { color: C.white };
  const top = K.header(s, sl.eyebrow, sl.title, deck.accent);
  const nS = sl.stats.length, cw = (W - 1.0 - (nS - 1) * 0.28) / nS;
  const ch = Math.max.apply(null, sl.stats.map(st => 1.2 + hFor(st.small, 11.5, cw - 0.48, 0.1) + hFor(st.src, 8, cw - 0.48, 0.16)));
  const kh = hFor(sl.kicker, 13, W - 1.6, 0.34), y0 = centre(top, ch + 0.3 + kh);
  sl.stats.forEach((st, i) => {
    const x = 0.5 + i * (cw + 0.28), y = y0;
    K.card(s, { x, y, w: cw, h: ch, fill: C.wash, line: 'B8D3E6' });
    s.addShape('rect', { x, y, w: cw, h: 0.07, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText(st.big, { x: x + 0.24, y: y + 0.24, w: cw - 0.48, h: 0.85, fontFace: FONT, fontSize: 42, bold: true, color: C.navy, margin: 0, charSpacing: -1.5, fit: 'shrink' });
    s.addText(st.small, { x: x + 0.24, y: y + 1.14, w: cw - 0.48, h: ch - 1.62, fontFace: FONT, fontSize: 11.5, color: C.text, valign: 'top', margin: 0, fit: 'shrink' });
    s.addText(st.src, { x: x + 0.24, y: y + ch - 0.48, w: cw - 0.48, h: 0.4, fontFace: FONT, fontSize: 8, color: C.muted, valign: 'bottom', margin: 0, fit: 'shrink' });
  });
  const ky = y0 + ch + 0.3;
  K.card(s, { x: 0.5, y: ky, w: W - 1.0, h: kh, fill: C.cream, line: 'E6C96A' });
  s.addText(sl.kicker, { x: 0.8, y: ky + 0.12, w: W - 1.6, h: kh - 0.24, fontFace: FONT, fontSize: 13, bold: true, color: C.navy, valign: 'middle', margin: 0, fit: 'shrink' });
  K.footer(s, foot(deck), n, false); s.addNotes(sl.notes);
}

function stepsSlide(pptx, deck, sl, n) {
  const s = pptx.addSlide(); s.background = { color: C.white };
  const top = K.header(s, sl.eyebrow, sl.title, deck.accent);
  const nS = sl.steps.length, gap = 0.14, cw = (W - 1.0 - (nS - 1) * gap) / nS;
  const ch = Math.max.apply(null, sl.steps.map(st => 1.34 + hFor(st.h, 13, cw - 0.32, 0) + hFor(st.s, 10.5, cw - 0.32, 0.16)));
  const kh = hFor(sl.kicker, 13, W - 1.6, 0.34), y0 = centre(top, ch + 0.32 + kh);
  sl.steps.forEach((st, i) => {
    const x = 0.5 + i * (cw + gap), y = y0;
    K.card(s, { x, y, w: cw, h: ch, fill: C.bg, accent: deck.accent });
    s.addShape('ellipse', { x: x + (cw - 0.5) / 2, y: y + 0.26, w: 0.5, h: 0.5, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText(st.n, { x: x + (cw - 0.5) / 2, y: y + 0.26, w: 0.5, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
    s.addText(st.h, { x: x + 0.16, y: y + 0.86, w: cw - 0.32, h: 0.4, fontFace: FONT, fontSize: 13, bold: true, color: C.navy, align: 'center', margin: 0, fit: 'shrink' });
    s.addText(st.s, { x: x + 0.16, y: y + 1.28, w: cw - 0.32, h: ch - 1.44, fontFace: FONT, fontSize: 10.5, color: C.textSec, align: 'center', valign: 'top', margin: 0, fit: 'shrink' });
  });
  const ky = y0 + ch + 0.32;
  K.card(s, { x: 0.5, y: ky, w: W - 1.0, h: kh, fill: C.cream, line: 'E6C96A' });
  s.addText(sl.kicker, { x: 0.8, y: ky + 0.12, w: W - 1.6, h: kh - 0.24, fontFace: FONT, fontSize: 13, bold: true, color: C.navy, valign: 'middle', margin: 0, fit: 'shrink' });
  K.footer(s, foot(deck), n, false); s.addNotes(sl.notes);
}

const TONE = { blue: [C.blue, C.pale], green: [C.green, C.mint], amber: [C.amberDeep, C.cream], grey: [C.textSec, C.bg] };
function twocolSlide(pptx, deck, sl, n) {
  const s = pptx.addSlide(); s.background = { color: C.white };
  const top = K.header(s, sl.eyebrow, sl.title, deck.accent);
  const cw = (W - 1.0 - 0.3) / 2;
  const colH = Math.max.apply(null, [sl.left, sl.right].map(c => 0.72 + c.items.reduce((a, it) => a + hFor(it, 12, cw - 0.44, 0.14), 0)));
  const kh = hFor(sl.kicker, 13, W - 1.6, 0.34), y0 = centre(top, colH + 0.3 + kh), ky = y0 + colH + 0.3, ch = colH;
  [sl.left, sl.right].forEach((col, i) => {
    const x = 0.5 + i * (cw + 0.3), y = y0, [cap, body] = TONE[col.tone] || TONE.blue;
    s.addShape('rect', { x, y, w: cw, h: 0.42, fill: { color: cap }, line: { color: cap } });
    s.addText(col.h.toUpperCase(), { x: x + 0.2, y, w: cw - 0.4, h: 0.42, fontFace: FONT, fontSize: 10.5, bold: true, color: C.white, charSpacing: 1.8, valign: 'middle', margin: 0 });
    s.addShape('rect', { x, y: y + 0.42, w: cw, h: ch - 0.42, fill: { color: body }, line: { color: body } });
    const items = col.items.map(it => ({ text: it, options: { fontFace: FONT, fontSize: 12, color: C.text, bullet: { code: '25AA' }, paraSpaceAfter: 9 } }));
    s.addText(items, { x: x + 0.22, y: y + 0.56, w: cw - 0.44, h: ch - 0.72, valign: 'top', margin: 0, fit: 'shrink' });
  });
  K.card(s, { x: 0.5, y: ky, w: W - 1.0, h: kh, fill: C.cream, line: 'E6C96A' });
  s.addText(sl.kicker, { x: 0.8, y: ky + 0.1, w: W - 1.6, h: kh - 0.2, fontFace: FONT, fontSize: 13, bold: true, color: C.navy, valign: 'middle', margin: 0, fit: 'shrink' });
  K.footer(s, foot(deck), n, false); s.addNotes(sl.notes);
}

function cardsSlide(pptx, deck, sl, n) {
  const s = pptx.addSlide(); s.background = { color: C.white };
  const top = K.header(s, sl.eyebrow, sl.title, deck.accent);
  const nC = sl.cards.length, cols = nC <= 3 ? nC : 2, rows = Math.ceil(nC / cols);
  const cw = (W - 1.0 - (cols - 1) * 0.28) / cols;
  const kickH = sl.kicker ? hFor(sl.kicker, 12.5, W - 1.6, 0.3) : 0;
  const natural = Math.max.apply(null, sl.cards.map(c => 0.46 + hFor(c.h, 15, cw - 0.48, 0.06) + hFor(c.b, 11.5, cw - 0.48, 0.12)));
  const roomForRows = BOT - top - (sl.kicker ? kickH + 0.26 : 0) - (rows - 1) * 0.26;
  const ch = Math.min(natural, roomForRows / rows);
  const y0 = centre(top, ch * rows + (rows - 1) * 0.26 + (sl.kicker ? kickH + 0.26 : 0));
  sl.cards.forEach((c, i) => {
    const x = 0.5 + (i % cols) * (cw + 0.28), y = y0 + Math.floor(i / cols) * (ch + 0.26);
    K.card(s, { x, y, w: cw, h: ch, fill: sl.accentCards ? C.wash : C.bg, accent: sl.accentCards ? C.green : deck.accent });
    K.cardText(s, { x, y, w: cw, h: ch, h2: c.h, h2pt: 15, body: c.b, bodypt: 11.5 });
  });
  if (sl.kicker) {
    const ky = y0 + ch * rows + (rows - 1) * 0.26 + 0.26;
    K.card(s, { x: 0.5, y: ky, w: W - 1.0, h: kickH, fill: C.cream, line: 'E6C96A' });
    s.addText(sl.kicker, { x: 0.8, y: ky + 0.1, w: W - 1.6, h: kickH - 0.2, fontFace: FONT, fontSize: 12.5, bold: true, color: C.navy, valign: 'middle', margin: 0, fit: 'shrink' });
  }
  K.footer(s, foot(deck), n, false); s.addNotes(sl.notes);
}

function storySlide(pptx, deck, sl, n) {
  const s = pptx.addSlide(); s.background = { color: C.white };
  const top = K.header(s, sl.eyebrow, sl.title, deck.accent);
  const lx = 0.5, lw = 3.5, bottom = H - 0.62;
  portrait(s, sl.person, lx + 0.55, top + 0.24, 2.4, deck.accent);
  const qy = top + 3.0;
  s.addShape('rect', { x: lx, y: qy, w: 0.09, h: bottom - qy - 0.1, fill: { color: deck.accent }, line: { color: deck.accent } });
  s.addText('“' + sl.quote + '”', { x: lx + 0.26, y: qy, w: lw - 0.3, h: bottom - qy - 0.1, fontFace: FONT, fontSize: 13, italic: true, color: C.text, valign: 'top', margin: 0, fit: 'shrink' });
  const rx = 4.35, rw = W - 0.5 - rx;
  let y = top + 0.1;
  const gap = 0.2, avail = bottom - y - gap * (sl.paras.length - 1);
  const pts = sl.paras.map(p => plain(p));
  let pt = 13; while (pt > 9 && pts.reduce((a, x) => a + hFor(x, pt, rw, 0.08), 0) > avail) pt -= 0.5;
  sl.paras.forEach(p => {
    const h = hFor(plain(p), pt, rw, 0.08);
    s.addText(runs(p, { fontFace: FONT, fontSize: pt, color: C.text }), { x: rx, y, w: rw, h, valign: 'top', margin: 0, fit: 'shrink' });
    y += h + gap;
  });
  K.footer(s, foot(deck), n, false); s.addNotes(sl.notes);
}

function askSlide(pptx, deck, sl, n) {
  const s = pptx.addSlide(); s.background = { color: C.white };
  const top = K.header(s, sl.eyebrow, sl.title, deck.accent);
  const closeH = 0.9, bottom = H - 0.62 - closeH - 0.28;
  const nI = sl.items.length, cw = (W - 1.0 - (nI - 1) * 0.28) / nI;
  const natural = Math.max.apply(null, sl.items.map(it => 1.6 + hFor(it.b, 11.5, cw - 0.48, 0.1)));
  const ch = Math.min(natural, BOT - top - closeH - 0.42), y0 = centre(top, ch + 0.3 + closeH);
  sl.items.forEach((it, i) => {
    const x = 0.5 + i * (cw + 0.28), y = y0;
    K.card(s, { x, y, w: cw, h: ch, fill: C.bg, accent: deck.accent });
    s.addText(it.n, { x: x + 0.24, y: y + 0.14, w: 0.8, h: 0.72, fontFace: FONT, fontSize: 40, bold: true, color: deck.accent, margin: 0, charSpacing: -1 });
    s.addText(it.h, { x: x + 0.24, y: y + 0.92, w: cw - 0.48, h: 0.46, fontFace: FONT, fontSize: 15, bold: true, color: C.navy, valign: 'top', margin: 0, fit: 'shrink' });
    s.addText(it.b, { x: x + 0.24, y: y + 1.42, w: cw - 0.48, h: ch - 1.6, fontFace: FONT, fontSize: 11.5, color: C.text, valign: 'top', margin: 0, fit: 'shrink' });
  });
  const cy = y0 + ch + 0.3;
  s.addImage({ path: K.ASSET.bgBand, x: 0.5, y: cy, w: W - 1.0, h: closeH });
  s.addText(sl.close, { x: 0.85, y: cy + 0.1, w: W - 1.7, h: closeH - 0.2, fontFace: FONT, fontSize: 14, bold: true, color: C.white, valign: 'middle', margin: 0, fit: 'shrink' });
  K.footer(s, foot(deck), n, false); s.addNotes(sl.notes);
}

function closeSlide(pptx, deck, n) {
  const s = pptx.addSlide(); K.heroBg(s);
  K.logo(s, { right: W - 0.6, y: 0.5, h: 0.5 });
  s.addText(('Hearts and Minds  ·  ' + deck.audience).toUpperCase(), { x: 0.75, y: 0.62, w: 9.4, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.gold, charSpacing: 2.8, margin: 0 });
  s.addShape('rect', { x: 0.75, y: 1.06, w: 0.9, h: 0.055, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText(deck.title, { x: 0.75, y: 1.35, w: 11.4, h: 1.5, fontFace: FONT, fontSize: 38, bold: true, color: C.white, margin: 0, charSpacing: -1.2, valign: 'top', fit: 'shrink' });
  const faces = deck.slides.find(x => x.type === 'persona').people;
  faces.forEach((p, i) => {
    const d = 1.5, x = 0.85 + i * (d + 0.7);
    portrait(s, p.key, x, 3.3, d, C.gold);
    s.addText(p.name, { x: x - 0.25, y: 4.95, w: d + 0.5, h: 0.3, fontFace: FONT, fontSize: 14, bold: true, color: C.white, align: 'center', margin: 0 });
  });
  s.addText(deck.closeLine, { x: 0.85, y: 5.55, w: 11.2, h: 0.5, fontFace: FONT, fontSize: 17, bold: true, color: C.gold, margin: 0, valign: 'middle', fit: 'shrink' });
  s.addText('Commercial positions are agreed in principle and remain subject to the live procurement. Figures carry their source in the Hearts and Minds evidence register.',
    { x: 0.85, y: 6.05, w: 11.2, h: 0.44, fontFace: FONT, fontSize: 10, italic: true, color: '9FC2E8', margin: 0, valign: 'top' });
  K.footer(s, foot(deck), n, true);
  s.addNotes('Close on the faces and stop talking. If there is one line to leave in the room, it is the one under the portraits.');
}

const BUILDERS = { persona: personaSlide, statwall: statwallSlide, steps: stepsSlide, twocol: twocolSlide, cards: cardsSlide, story: storySlide, ask: askSlide };

(async () => {
  for (const deck of DECKS) {
    const pptx = new pptxgen(); pptx.layout = 'LAYOUT_WIDE';
    pptx.author = 'HomeTest Programme'; pptx.company = 'NHS England';
    pptx.title = 'HomeTest Hearts and Minds ' + deck.no + ': ' + deck.audience;
    titleSlide(pptx, deck);
    let n = 2;
    for (const sl of deck.slides) { const f = BUILDERS[sl.type]; if (!f) throw new Error('unknown slide type ' + sl.type); f(pptx, deck, sl, n++); }
    closeSlide(pptx, deck, n);
    const f = path.join(OUT, deck.file);
    await pptx.writeFile({ fileName: f });
    console.log('wrote', deck.file, n, 'slides');
  }
})().catch(e => { console.error(e); process.exit(1); });

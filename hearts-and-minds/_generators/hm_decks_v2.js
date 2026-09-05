/* Hearts and Minds decks, v2 build.
   The visual grammar is Deck No.1's (the commissioner deck): every slide leads with a picture, a face or a
   number. Half-slide scene illustrations, round portraits, cream quote cards, numbered step circles, big
   stat blocks, and a close on faces. Text carries the argument but never has a slide to itself.

   Usage:
     node hm_decks_v2.js audience <outDir>                  five audience decks from audience_decks_content.js
     node hm_decks_v2.js journeys <journeys.json> <outDir>  twelve journey decks from the extract
   Images: assets/scenes/<key>-<n>.jpg (stage illustrations), assets/bigportraits/<key>.jpg, assets/portraits/<key>.jpg */
const path = require('path');
const fs = require('fs');
const pptxgen = require('pptxgenjs');
const K = require('./deck_kit.js');
const { C, FONT, W, H, plain, runs, hFor, fitPt, logo } = K;
const sizeOf = f => { try { const b = fs.readFileSync(f); // png or jpeg dimensions
  if (b[0] === 0x89) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  let i = 2; while (i < b.length) { const m = b[i + 1]; const len = b.readUInt16BE(i + 2); if (m >= 0xC0 && m <= 0xC3) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]; i += 2 + len; } } catch (e) { } return [1, 1]; };
const aspect = f => { const [w, h] = sizeOf(f); return w / h; };

const A = path.join(__dirname, 'assets');
const scene = k => path.join(A, 'scenes', k + '.jpg');
const portrait = k => path.join(A, 'portraits', k + '.jpg');
const bigPortrait = k => path.join(A, 'bigportraits', k + '.jpg');
const exists = f => !!f && fs.existsSync(f);
const FIT = process.env.NOFIT ? undefined : 'shrink'; // QA: NOFIT=1 renders without shrink so overflow is visible

const VIOLET = '4527A0', LAV = 'F3EEFA', LILAC = 'F5F0FA', SKY = 'EAF2FA', MINT = 'E8F3EE', GREY = 'EEF1F4';
const SH = () => ({ type: 'outer', color: '0A1F3C', blur: 8, offset: 3, angle: 135, opacity: 0.16 });
const FOOT_Y = H - 0.42;
const T = (s, o) => Object.assign({ fontFace: FONT, margin: 0 }, o, { text: undefined });

function footer(s, label, n, dark, rng) {
  const col = dark ? '9FB6D9' : C.muted; const x0 = rng ? rng.x : 0.6, x1 = rng ? rng.x + rng.w : W - 0.6, wid = x1 - x0;
  const narrow = wid < 9;
  s.addText(label, { x: x0, y: FOOT_Y, w: narrow ? wid * 0.5 : 6.5, h: 0.3, fontFace: FONT, fontSize: 8, color: col, margin: 0, valign: 'middle', fit: FIT });
  s.addText(K.DISCLAIMER, { x: x0 + (narrow ? wid * 0.5 : 6.3), y: FOOT_Y, w: (narrow ? wid * 0.5 : wid - 6.3) - 0.5, h: 0.3, fontFace: FONT, fontSize: narrow ? 7 : 8, color: col, align: 'right', margin: 0, valign: 'middle', fit: FIT });
  if (n) s.addText(String(n), { x: x1 - 0.45, y: FOOT_Y, w: 0.45, h: 0.3, fontFace: FONT, fontSize: 8.5, bold: true, color: col, align: 'right', margin: 0, valign: 'middle' });
}
function eyebrow(s, txt, color, x, y, w) { s.addText(String(txt).toUpperCase(), { x, y, w, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color, charSpacing: 2.6, margin: 0, valign: 'middle' }); }
function heading(s, txt, x, y, w, maxH, color) {
  const pt = fitPt(txt, maxH, w, 30, 13, 0.05, true); const h = Math.min(maxH, hFor(txt, pt, w, 0.05, true));
  s.addText(txt, { x, y, w, h, fontFace: FONT, fontSize: pt, bold: true, color: color || C.navy, margin: 0, valign: 'top', fit: FIT }); return y + h;
}
function body(s, content, x, y, w, maxH, pt0, color, opts) {
  const txt = plain(content); const pt = fitPt(txt, maxH, w, pt0, 8, 0.06); const h = Math.min(maxH, hFor(txt, pt, w, 0.06));
  const base = Object.assign({ fontFace: FONT, fontSize: pt, color: color || C.text }, opts || {});
  const rs = Array.isArray(content) ? runs(content, base) : [{ text: txt, options: base }];
  s.addText(rs, { x, y, w, h, valign: 'top', margin: 0, fit: FIT, paraSpaceAfter: 0 }); return y + h;
}
/** Picture in a box, cover-cropped. */
/** Pre-crop to the exact box aspect with smart_crop.py (keeps the people in frame), then place 1:1. No stretching, ever. */
const { spawnSync } = require('child_process');
const CROPS = path.join(A, 'crops'); fs.mkdirSync(CROPS, { recursive: true });
function cropped(f, w, h) {
  const ar = (w / h).toFixed(3); const out = path.join(CROPS, path.basename(f).replace(/\.(jpe?g|png)$/i, '') + '-' + ar + '.jpg');
  if (!fs.existsSync(out)) { const r = spawnSync('python3', [path.join(__dirname, 'smart_crop.py'), f, ar, out]); if (r.status !== 0) { console.error(String(r.stderr)); return f; } }
  return out;
}
function pic(s, f, x, y, w, h) { s.addImage({ path: cropped(f, w, h), x, y, w, h }); }
/** Full-height picture column with the amber divider, on the left or right. Returns the content x-range. */
function column(s, f, side, w) {
  w = w || 5.2;
  if (side === 'right') { pic(s, f, W - w, 0, w, H); s.addShape('rect', { x: W - w - 0.18, y: 0, w: 0.18, h: H, fill: { color: C.amber }, line: { color: C.amber } }); return { x: 0.6, w: W - w - 0.18 - 1.05 }; }
  pic(s, f, 0, 0, w, H); s.addShape('rect', { x: w, y: 0, w: 0.18, h: H, fill: { color: C.amber }, line: { color: C.amber } }); return { x: w + 0.65, w: W - w - 0.65 - 0.6 };
}
function roundPortrait(s, k, x, y, d, ring) {
  if (ring) s.addShape('ellipse', { x: x - 0.05, y: y - 0.05, w: d + 0.1, h: d + 0.1, fill: { color: ring }, line: { color: ring } });
  if (exists(portrait(k))) s.addImage({ path: portrait(k), x, y, w: d, h: d, rounding: true });
  else s.addShape('ellipse', { x, y, w: d, h: d, fill: { color: C.pale }, line: { color: C.blue } });
}
/** White card with a coloured left rule and soft shadow, Deck No.1 style. */
function ruleCard(s, x, y, w, h, accent, fill) {
  s.addShape('rect', { x, y, w, h, fill: { color: fill || C.white }, line: { color: fill || 'E3E9F0', width: 0.75 }, shadow: SH() });
  s.addShape('rect', { x, y, w: 0.08, h, fill: { color: accent }, line: { color: accent } });
}
function cardBody(s, x, y, w, h, title, text, accent, titlePt, bodyPt) {
  const tp = fitPt(title, 0.9, w - 0.5, titlePt || 16, 11, 0.02, true); const th = Math.min(0.95, hFor(title, tp, w - 0.5, 0.02, true));
  s.addText(title, { x: x + 0.28, y: y + 0.2, w: w - 0.5, h: th, fontFace: FONT, fontSize: tp, bold: true, color: accent, margin: 0, valign: 'top', fit: FIT });
  body(s, text, x + 0.28, y + 0.2 + th + 0.08, w - 0.5, h - th - 0.5, bodyPt || 11.5, C.textSec);
}
/** Cream callout with amber frame. */
function callout(s, content, x, y, w, maxH, pt, italic) {
  const txt = plain(content); const p = fitPt(txt, maxH - 0.3, w - 0.5, pt || 13, 9.5, 0.05); const h = Math.min(maxH, hFor(txt, p, w - 0.5, 0.05) + 0.34);
  s.addShape('rect', { x, y, w, h, fill: { color: C.cream }, line: { color: C.amber, width: 1.25 }, shadow: SH() });
  const base = { fontFace: FONT, fontSize: p, color: C.text, italic: !!italic };
  s.addText(Array.isArray(content) ? runs(content, base) : [{ text: txt, options: base }], { x: x + 0.25, y: y + 0.12, w: w - 0.5, h: h - 0.24, valign: 'middle', margin: 0, fit: FIT });
  return y + h;
}
/** Solid colour block with a giant figure and a caption, like "4 to 6" and "6 wks" in Deck No.1. */
function bigBlock(s, x, y, w, h, fill, big, cap, sub) {
  s.addShape('rect', { x, y, w, h, fill: { color: fill }, line: { color: fill } });
  const bp = big.length > 6 ? 34 : big.length > 4 ? 44 : 56;
  s.addText(big, { x: x + 0.2, y: y + 0.25, w: w - 0.4, h: 1.15, fontFace: FONT, fontSize: bp, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0, fit: FIT });
  s.addText(cap, { x: x + 0.25, y: y + 1.45, w: w - 0.5, h: 0.7, fontFace: FONT, fontSize: 13.5, bold: true, color: C.white, align: 'center', valign: 'top', margin: 0, fit: FIT });
  if (sub) s.addText(sub, { x: x + 0.25, y: y + 2.2, w: w - 0.5, h: h - 2.4, fontFace: FONT, fontSize: 10.5, color: 'E6EFE9', align: 'center', valign: 'top', margin: 0, fit: FIT });
}
function numberCircle(s, n, x, y, d, fill) {
  s.addShape('ellipse', { x, y, w: d, h: d, fill: { color: fill || C.navy }, line: { color: fill || C.navy } });
  s.addText(String(n), { x, y, w: d, h: d, fontFace: FONT, fontSize: d > 0.6 ? 20 : 14, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
}
function faceRow(s, cast, x, y, wTotal, d, dark) {
  const n = cast.length, cell = wTotal / n;
  cast.forEach((c, i) => {
    const cx = x + i * cell + (cell - d) / 2;
    roundPortrait(s, c.key, cx, y, d, dark ? C.white : null);
    s.addText(c.name, { x: x + i * cell, y: y + d + 0.1, w: cell, h: 0.35, fontFace: FONT, fontSize: 15, bold: true, color: dark ? C.white : C.navy, align: 'center', margin: 0 });
    s.addText(c.role, { x: x + i * cell + 0.1, y: y + d + 0.45, w: cell - 0.2, h: 0.5, fontFace: FONT, fontSize: 10.5, color: dark ? 'CFE0F5' : C.textSec, align: 'center', valign: 'top', margin: 0, fit: FIT });
  });
}

/* ====================================================================== audience decks */
const CAST = {
  '02-clinician': [{ key: 'adam', name: 'Adam', role: 'the consultant holding the list' }, { key: 'hannah', name: 'Hannah', role: 'the GP holding the recall cycle' }, { key: 'mark', name: 'Mark', role: 'the patient on surveillance' }],
  '03-acute-trust': [{ key: 'catherine', name: 'Catherine', role: 'the commissioner of the pathway' }, { key: 'adam', name: 'Adam', role: 'the consultant of record' }, { key: 'mark', name: 'Mark', role: 'the man on the list' }],
  '04-platform': [{ key: 'priya', name: 'Priya', role: 'the product owner of the rails' }, { key: 'ngozi', name: 'Ngozi', role: 'the IG lead who says go' }, { key: 'abdul', name: 'Abdul', role: 'the patient the App reaches' }],
  '05-supplier': [{ key: 'joe', name: 'Joe', role: 'the supplier with a good test' }, { key: 'sarah', name: 'Sarah', role: 'the commissioner who calls off' }, { key: 'david', name: 'David', role: 'the commercial lead who sets the terms' }],
  '06-patient-public': [{ key: 'sean', name: 'Sean', role: 'the man the system kept missing' }, { key: 'layla', name: 'Layla', role: 'the mum with no spare half-day' }, { key: 'devi', name: 'Devi', role: 'the woman who needs a result, not a visit' }],
};
// one scene per slide, by deck id and slide index (title = 't', story slides carry their own)
const SCENES = {
  '02-clinician': { t: 'adam-3', 0: null, 1: 'hannah-2', 2: 'sean-4', 3: 'adam-4', 4: 'adam-6', 5: 'hannah-3', 6: 'adam-5', 7: 'hannah-6', 8: null },
  '03-acute-trust': { t: 'catherine-1', 0: null, 1: 'adam-2', 2: 'mark-1', 3: 'adam-4', 4: 'catherine-4', 5: 'mark-3', 6: null },
  '04-platform': { t: 'abdul-1', 0: null, 1: 'abdul-2', 2: 'joe-4', 3: 'joe-6', 4: 'devi-4', 5: null },
  '05-supplier': { t: 'joe-1', 0: null, 1: 'joe-6', 2: 'joe-4', 3: 'joe-5', 4: 'anita-5', 5: 'joe-2', 6: 'joe-3', 7: null },
  '06-patient-public': { t: 'layla-interlude', 0: null, 1: 'layla-4', 2: 'sean-4', 3: 'sean-3', 4: 'abdul-3', 5: 'devi-3', 6: null },
};
const TONE = { blue: C.blue, green: C.green, grey: '5B6770', amber: C.amberDeep, violet: VIOLET };
const STORY_TINT = { sean: [LAV, VIOLET], mark: [LAV, VIOLET], adam: [LILAC, '6A3FB5'], joe: [MINT, C.green], layla: [LAV, VIOLET], sarah: [SKY, C.blue], catherine: [SKY, C.blue] };

function audienceDeck(d, outDir) {
  const p = new pptxgen(); p.layout = 'LAYOUT_WIDE'; p.author = 'HomeTest Commercial'; p.title = `Hearts and Minds ${d.no} ${d.audience}: ${d.title}`;
  const label = `Hearts and Minds · audience deck ${d.no} · ${d.audience} · proof-of-concept draft · September 2026`;
  const cast = CAST[d.id], sc = SCENES[d.id]; let n = 1;

  // ---- title
  let s = p.addSlide(); s.background = { color: C.navy };
  column(s, scene(sc.t), 'right', 5.9);
  logo(s, { x: 0.6, y: 0.5, h: 0.5 });
  eyebrow(s, `Hearts and Minds · ${d.audience} · ${d.no}`, C.amber, 0.6, 1.55, 6.4);
  const tp = fitPt(d.title, 2.3, 6.3, 44, 28, 0.05, true);
  s.addText(d.title, { x: 0.6, y: 1.95, w: 6.3, h: hFor(d.title, tp, 6.3, 0.05, true), fontFace: FONT, fontSize: tp, bold: true, color: C.white, margin: 0, valign: 'top' });
  let y = 1.95 + hFor(d.title, tp, 6.3, 0.05, true) + 0.2;
  y = body(s, d.strap, 0.6, y, 6.2, 1.3, 15.5, 'CFE0F5') + 0.25;
  const sf = d.standfirst; const cut = sf.indexOf(':');
  body(s, cut > 0 && cut < 40 ? [{ text: sf.slice(0, cut + 1) + ' ', bold: true }, { text: sf.slice(cut + 1).trim() }] : sf, 0.6, y, 6.2, Math.max(0.6, 6.9 - y), 13.5, 'E8F0FA');
  // recolour the bold run to amber: pptxgenjs runs share colour, so add a small amber lead instead
  footer(s, label, null, true, { x: 0.6, w: W - 5.9 - 0.18 - 1.0 });
  s.addNotes(`Open on the promise, not the product. ${d.strap}`);

  d.slides.forEach((sl, i) => {
    s = p.addSlide(); s.background = { color: C.bg }; n++;
    const img = sc[i] ? scene(sc[i]) : null;
    if (sl.notes) s.addNotes(sl.notes);
    const B = { audience: d, slide: sl, cast, img, n, label };
    ({ persona: personaSlide, statwall: statwallSlide, steps: stepsSlide, twocol: twocolSlide, cards: cardsSlide, story: storySlide, ask: askSlide })[sl.type](s, B);
  });

  // ---- close
  s = p.addSlide(); s.background = { color: C.navy }; n++;
  logo(s, { right: W - 0.6, y: 0.5, h: 0.5 });
  eyebrow(s, `Hearts and Minds · ${d.audience}`, C.amber, 0.6, 0.6, 8);
  faceRow(s, cast, 1.4, 1.7, W - 2.8, 1.75, true);
  s.addText(d.closeLine, { x: 0.9, y: 4.75, w: W - 1.8, h: 1.1, fontFace: FONT, fontSize: fitPt(d.closeLine, 1.1, W - 1.8, 28, 20, 0.05), bold: true, color: C.gold, align: 'center', valign: 'middle', margin: 0, fit: FIT });
  s.addText('Built around people. Bought without pain. Live today.', { x: 0.9, y: 5.9, w: W - 1.8, h: 0.5, fontFace: FONT, fontSize: 15, color: 'CFE0F5', align: 'center', margin: 0 });
  footer(s, label, n, true);

  const out = path.join(outDir, d.file);
  return p.writeFile({ fileName: out }).then(() => out);
}

function personaSlide(s, B) {
  const { slide: sl, cast, n, label } = B; const people = sl.people;
  eyebrow(s, sl.eyebrow, C.blue, 0.6, 0.45, 12);
  let y = heading(s, sl.title, 0.6, 0.8, 12.1, 1.0) + 0.3;
  const bodyH = hFor(plain(sl.body), 14.5, 12.1, 0.06), faceH = people.length > 1 ? 0 : 1.75;
  const availRows = FOOT_Y - 0.2 - y - bodyH - 0.3 - faceH - 0.2;
  const rowH = Math.min(people.length > 1 ? 2.5 : 2.9, availRows / people.length - 0.1), d = Math.min(people.length > 1 ? 1.9 : 2.35, rowH - 0.45);
  people.forEach(pp => {
    roundPortrait(s, pp.key, 0.8, y, d);
    s.addText(pp.name, { x: 0.4, y: y + d + 0.05, w: d + 0.8, h: 0.3, fontFace: FONT, fontSize: 14, bold: true, color: C.navy, align: 'center', margin: 0 });
    const qx = d + 1.4, qw = W - qx - 0.6;
    const qp = fitPt(pp.quote, rowH - 0.55, qw - 0.5, people.length > 1 ? 16.5 : 18, 11, 0.05);
    s.addShape('rect', { x: qx, y, w: qw, h: rowH - 0.45, fill: { color: C.cream }, line: { color: C.amber, width: 1.25 }, shadow: SH() });
    s.addText('“' + pp.quote + '”', { x: qx + 0.3, y: y + 0.1, w: qw - 0.6, h: rowH - 0.65, fontFace: FONT, fontSize: qp, italic: true, color: C.text, valign: 'middle', margin: 0, fit: FIT });
    s.addText(pp.role, { x: qx + 0.3, y: y + rowH - 0.42, w: qw - 0.6, h: 0.3, fontFace: FONT, fontSize: 10.5, color: C.textSec, margin: 0 });
    y += rowH + 0.1;
  });
  y = body(s, sl.body, 0.6, y + 0.05, 12.1, bodyH, 14.5, C.textSec) + 0.2;
  const remain = FOOT_Y - 0.15 - y;
  if (people.length === 1 && remain > 1.2) faceRow(s, cast, 2.0, y + Math.max(0, (remain - 1.75) / 2), W - 4, Math.min(0.95, remain - 0.9));
  footer(s, label, n);
}

function statwallSlide(s, B) {
  const { slide: sl, img, n, label } = B; const st = sl.stats;
  const col = img ? column(s, img, 'right', 5.0) : { x: 0.6, w: W - 1.2 };
  eyebrow(s, sl.eyebrow, C.blue, col.x, 0.45, col.w);
  let y = heading(s, sl.title, col.x, 0.8, col.w, 1.1) + 0.2;
  // giant figure
  const big = st[0].big; const bigW = col.w * 0.55; const bp = Math.max(36, Math.min(80, Math.floor(bigW * 72 / (big.length * 0.78))));
  s.addText(big, { x: col.x - 0.05, y, w: bigW, h: 1.35, fontFace: FONT, fontSize: bp, bold: true, color: C.navy, margin: 0, valign: 'middle', fit: FIT });
  body(s, st[0].small, col.x + col.w * 0.55, y + 0.15, col.w * 0.45, 1.05, 14.5, C.textSec);
  s.addText(st[0].src, { x: col.x, y: y + 1.38, w: col.w, h: 0.25, fontFace: FONT, fontSize: 8.5, color: C.muted, margin: 0 });
  y += 1.75;
  // two supporting figures as rule cards
  const cw = (col.w - 0.3) / 2, ch = 1.65;
  [st[1], st[2]].forEach((t, i) => {
    const x = col.x + i * (cw + 0.3); ruleCard(s, x, y, cw, ch, i ? C.blue : C.green);
    s.addText(t.big, { x: x + 0.28, y: y + 0.12, w: cw - 0.4, h: 0.62, fontFace: FONT, fontSize: Math.min(30, Math.floor((cw - 0.4) * 72 / (t.big.length * 0.78))), bold: true, color: i ? C.blue : C.green, margin: 0, valign: 'middle', fit: FIT });
    body(s, t.small, x + 0.28, y + 0.78, cw - 0.5, 0.65, 12.5, C.textSec);
    s.addText(t.src, { x: x + 0.28, y: y + ch - 0.3, w: cw - 0.5, h: 0.22, fontFace: FONT, fontSize: 7.5, color: C.muted, margin: 0, fit: FIT });
  });
  y += ch + 0.3;
  callout(s, sl.kicker, col.x, y, col.w, FOOT_Y - 0.15 - y, 13, true);
  footer(s, label, n, false, col);
}

function stepsSlide(s, B) {
  const { slide: sl, img, n, label } = B; const steps = sl.steps;
  eyebrow(s, sl.eyebrow, C.blue, 0.6, 0.45, 12);
  let y = heading(s, sl.title, 0.6, 0.8, 12.1, 1.0) + 0.35;
  const cell = 12.1 / steps.length, d = 0.82;
  steps.forEach((st, i) => {
    const cx = 0.6 + i * cell;
    numberCircle(s, st.n, cx + (cell - d) / 2, y, d);
    if (i < steps.length - 1) s.addText('→', { x: cx + cell - 0.35, y: y + 0.12, w: 0.7, h: 0.6, fontFace: FONT, fontSize: 22, bold: true, color: C.amber, align: 'center', valign: 'middle', margin: 0 });
    const lp = fitPt(st.h, 0.45, cell - 0.1, 15, 11, 0.02, true); const lh = Math.max(0.4, hFor(st.h, lp, cell - 0.1, 0.02, true));
    s.addText(st.h, { x: cx, y: y + d + 0.12, w: cell, h: lh, fontFace: FONT, fontSize: lp, bold: true, color: C.navy, align: 'center', valign: 'top', margin: 0, fit: FIT });
    body(s, st.s, cx + 0.15, y + d + 0.15 + lh, cell - 0.3, 1.0, 12.5, C.textSec, { align: 'center' });
  });
  y += d + 1.85;
  const bandH = FOOT_Y - 0.2 - y;
  if (img) { const iw = Math.min(6.4, bandH * aspect(img)); pic(s, img, 0.6, y, iw, bandH); callout(s, sl.kicker, 0.6 + iw + 0.3, y + (bandH - Math.min(bandH, hFor(sl.kicker, 14, W - iw - 1.7, 0.4))) / 2, W - iw - 1.5, bandH, 14, true); }
  else callout(s, sl.kicker, 0.6, y, 12.1, bandH, 14, true);
  footer(s, label, n);
}

function twocolSlide(s, B) {
  const { slide: sl, img, n, label } = B;
  const col = img ? column(s, img, 'left', 4.6) : { x: 0.6, w: W - 1.2 };
  eyebrow(s, sl.eyebrow, C.blue, col.x, 0.45, col.w);
  let y = heading(s, sl.title, col.x, 0.8, col.w, 1.0) + 0.3;
  const cw = (col.w - 0.3) / 2;
  const kick = sl.kicker ? Math.min(1.1, hFor(sl.kicker, 12.5, col.w - 0.5, 0.05) + 0.34) : 0;
  const ch = FOOT_Y - 0.2 - y - (kick ? kick + 0.25 : 0);
  [sl.left, sl.right].forEach((c, i) => {
    const x = col.x + i * (cw + 0.3), tone = TONE[c.tone] || C.blue;
    s.addShape('rect', { x, y, w: cw, h: 0.5, fill: { color: tone }, line: { color: tone } });
    s.addText(c.h, { x: x + 0.2, y, w: cw - 0.4, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: C.white, valign: 'middle', margin: 0, fit: FIT });
    s.addShape('rect', { x, y: y + 0.5, w: cw, h: ch - 0.5, fill: { color: C.white }, line: { color: 'E3E9F0', width: 0.75 }, shadow: SH() });
    const avail = ch - 0.8, txt = c.items.join('\n');
    const pt = fitPt(txt, avail - c.items.length * 0.14, cw - 0.5, 15.5, 9.5, 0);
    s.addText(c.items.map(t => ({ text: t, options: { fontFace: FONT, fontSize: pt, color: C.text, bullet: { code: '25CF' }, paraSpaceAfter: 7 } })), { x: x + 0.15, y: y + 0.65, w: cw - 0.35, h: avail, valign: 'top', margin: 0, fit: FIT });
  });
  if (kick) callout(s, sl.kicker, col.x, y + ch + 0.25, col.w, kick, 13, true);
  footer(s, label, n, false, col);
}

function cardsSlide(s, B) {
  const { slide: sl, img, n, label } = B; const cards = sl.cards;
  const col = img ? column(s, img, 'right', 4.6) : { x: 0.6, w: W - 1.2 };
  eyebrow(s, sl.eyebrow, C.blue, col.x, 0.45, col.w);
  let y = heading(s, sl.title, col.x, 0.8, col.w, 1.05) + 0.3;
  const kick = sl.kicker ? Math.min(1.0, hFor(sl.kicker, 12.5, col.w - 0.5, 0.05) + 0.34) : 0;
  const areaH = FOOT_Y - 0.2 - y - (kick ? kick + 0.25 : 0);
  const cols = cards.length === 3 ? 3 : 2, rows = Math.ceil(cards.length / cols);
  const cw = (col.w - 0.3 * (cols - 1)) / cols, ch = (areaH - 0.25 * (rows - 1)) / rows;
  cards.forEach((c, i) => {
    const x = col.x + (i % cols) * (cw + 0.3), yy = y + Math.floor(i / cols) * (ch + 0.25), acc = i % 2 ? C.blue : C.green;
    ruleCard(s, x, yy, cw, ch, acc); cardBody(s, x, yy, cw, ch, c.h, c.b, acc, cols === 3 ? 19 : 18, cols === 3 ? 15 : 14.5);
  });
  if (kick) callout(s, sl.kicker, col.x, y + areaH + 0.25, col.w, kick, 13, true);
  footer(s, label, n, false, col);
}

function storySlide(s, B) {
  const { slide: sl, img, n, label } = B; const [tint, deep] = STORY_TINT[sl.person] || [SKY, C.blue];
  const imgW = 5.6; pic(s, img || scene(sl.person + '-1'), 0, 0, imgW, H);
  s.addShape('rect', { x: imgW, y: 0, w: W - imgW, h: H, fill: { color: tint }, line: { color: tint } });
  const x = imgW + 0.55, w = W - x - 0.6;
  eyebrow(s, sl.eyebrow, deep, x, 0.5, w);
  let y = heading(s, sl.title, x, 0.85, w, 1.25, deep) + 0.25;
  roundPortrait(s, sl.person, x, y, 0.8, deep);
  const nm = sl.person[0].toUpperCase() + sl.person.slice(1);
  s.addText(nm, { x: x + 0.95, y: y + 0.18, w: 3, h: 0.45, fontFace: FONT, fontSize: 15, bold: true, color: deep, valign: 'middle', margin: 0 });
  y += 1.05;
  const qH = Math.min(1.15, hFor(sl.quote, 14, w - 0.6, 0.05) + 0.4);
  const parasH = FOOT_Y - 0.25 - y - qH - 0.25;
  const txt = sl.paras.map(plain).join('\n'); const pt = fitPt(txt, parasH - sl.paras.length * 0.1, w, 15.5, 9.5, 0);
  const rs = []; sl.paras.forEach((pr, i) => pr.forEach((r, j) => rs.push({ text: r.text, options: { fontFace: FONT, fontSize: pt, color: C.text, bold: !!r.bold, breakLine: j === pr.length - 1 && i < sl.paras.length - 1, paraSpaceAfter: 6 } })));
  s.addText(rs, { x, y, w, h: parasH, valign: 'top', margin: 0, fit: FIT });
  y += parasH + 0.25;
  s.addShape('rect', { x, y, w, h: qH, fill: { color: deep }, line: { color: deep } });
  s.addText('“' + sl.quote + '”', { x: x + 0.3, y, w: w - 0.6, h: qH, fontFace: FONT, fontSize: fitPt(sl.quote, qH - 0.2, w - 0.6, 14, 10.5, 0.05), italic: true, bold: true, color: C.white, valign: 'middle', margin: 0, fit: FIT });
  footer(s, label, n, false, { x, w });
}

function askSlide(s, B) {
  const { slide: sl, cast, n, label } = B;
  eyebrow(s, sl.eyebrow, C.blue, 0.6, 0.45, 12);
  let y = heading(s, sl.title, 0.6, 0.8, 12.1, 1.0) + 0.35;
  const blockW = 3.6, area = W - 1.2 - blockW - 0.35, cw = (area - 0.5) / 3, ch = FOOT_Y - 0.25 - y;
  sl.items.forEach((it, i) => {
    const x = 0.6 + i * (cw + 0.25); ruleCard(s, x, y, cw, ch, i % 2 ? C.blue : C.green);
    numberCircle(s, it.n, x + 0.3, y + 0.25, 0.6);
    s.addText(it.h, { x: x + 0.3, y: y + 1.0, w: cw - 0.55, h: 0.8, fontFace: FONT, fontSize: fitPt(it.h, 0.8, cw - 0.55, 18, 13, 0.02), bold: true, color: C.navy, valign: 'top', margin: 0, fit: FIT });
    body(s, it.b, x + 0.3, y + 1.85, cw - 0.55, ch - 2.1, 14, C.textSec);
  });
  const bx = W - 0.6 - blockW;
  s.addShape('rect', { x: bx, y, w: blockW, h: ch, fill: { color: C.green }, line: { color: C.green } });
  s.addText(sl.close, { x: bx + 0.3, y: y + 0.3, w: blockW - 0.6, h: ch - 2.2, fontFace: FONT, fontSize: fitPt(sl.close, ch - 2.3, blockW - 0.6, 18, 12, 0.05), bold: true, color: C.white, valign: 'top', margin: 0, fit: FIT });
  const fd = 0.62, fx = bx + (blockW - cast.length * (fd + 0.2)) / 2;
  cast.forEach((c, i) => roundPortrait(s, c.key, fx + i * (fd + 0.2), y + ch - fd - 0.35, fd, C.white));
  footer(s, label, n);
}

/* ====================================================================== journey decks */
const JG = { Patient: [C.amberDeep, C.cream], Commissioner: [C.blue, SKY], Clinician: ['6A3FB5', LILAC], Supplier: [C.green, MINT] };

function journeyDeck(j, outDir) {
  const p = new pptxgen(); p.layout = 'LAYOUT_WIDE'; p.author = 'HomeTest Commercial'; p.title = `Hearts and Minds · ${j.name}'s journey`;
  const label = `Hearts and Minds · ${j.name}'s journey · HomeTest operating model · September 2026`;
  const [acc, tint] = JG[j.group] || [C.blue, SKY]; const N = j.stages.length; let n = 1;
  const stageImg = i => (j.stages[i] && j.stages[i].image && fs.existsSync(j.stages[i].image)) ? j.stages[i].image : null;
  const port = j.portrait;
  const shortTitle = i => j.stages[i].eyebrow.split(',')[0].trim();
  const subTitle = i => { const e = j.stages[i].eyebrow; const k = e.indexOf(','); return k > 0 ? e.slice(k + 1).trim() : (j.ribbon[i] ? j.ribbon[i].sub : ''); };

  // ---- title
  let s = p.addSlide(); s.background = { color: C.navy };
  const inter = scene(j.key + '-interlude'); const t1 = exists(inter) ? inter : (j.key === 'sarah' ? scene('sarah-hero') : null);
  if (t1) column(s, t1, 'right', 5.9); else if (exists(bigPortrait(j.key))) { s.addShape('rect', { x: W - 5.9, y: 0, w: 5.9, h: H, fill: { color: C.white }, line: { color: C.white } }); const ph = H - 0.45, pw = Math.min(5.9, ph); pic(s, bigPortrait(j.key), W - 5.9 + (5.9 - pw) / 2, H - ph, pw, ph); s.addShape('rect', { x: W - 6.08, y: 0, w: 0.18, h: H, fill: { color: C.amber }, line: { color: C.amber } }); }
  logo(s, { x: 0.6, y: 0.5, h: 0.5 });
  eyebrow(s, `Hearts and Minds · ${j.hero_eyebrow}`, C.amber, 0.6, 1.5, 6.4);
  s.addText(j.name + '.', { x: 0.6, y: 1.85, w: 6.3, h: 0.9, fontFace: FONT, fontSize: 48, bold: true, color: C.white, margin: 0, valign: 'middle' });
  const ht = plain(j.hero_title).replace(/\s*\n\s*/g, ' '); const tp = fitPt(ht, 1.5, 6.3, 34, 20, 0.05, true);
  let y = 2.8; s.addText(ht, { x: 0.6, y, w: 6.3, h: hFor(ht, tp, 6.3, 0.05, true), fontFace: FONT, fontSize: tp, bold: true, color: C.gold, margin: 0, valign: 'top' }); y += hFor(ht, tp, 6.3, 0.05, true) + 0.2;
  y = body(s, j.hero_strap, 0.6, y, 6.2, Math.min(1.5, 5.6 - y), 14, 'CFE0F5') + 0.2;
  if (port) { const d = 1.0, py = Math.max(y, 5.55); s.addImage({ path: port, x: 0.6, y: py, w: d, h: d, rounding: true }); s.addText(j.name, { x: 1.8, y: py + 0.08, w: 4.5, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: C.white, margin: 0 }); s.addText(j.role, { x: 1.8, y: py + 0.48, w: 4.9, h: 0.45, fontFace: FONT, fontSize: 11, color: 'CFE0F5', margin: 0, fit: FIT }); }
  footer(s, label, null, true, { x: 0.6, w: W - 5.9 - 0.18 - 1.0 });
  s.addNotes(`${j.name}'s story, told through the operating model. Open on the person, not the pathway.`);

  // ---- at a glance
  s = p.addSlide(); s.background = { color: C.bg }; n++;
  eyebrow(s, `${j.name}'s journey at a glance`, C.blue, 0.6, 0.45, 12);
  y = heading(s, plain(j.framing[0] ? j.framing[0].h : ht), 0.6, 0.8, 12.1, 1.0) + 0.35;
  const cell = 12.1 / N, d = 0.7;
  j.stages.forEach((st, i) => {
    const cx = 0.6 + i * cell; numberCircle(s, i + 1, cx + (cell - d) / 2, y, d, acc === C.amberDeep ? C.navy : acc);
    if (i < N - 1) s.addText('→', { x: cx + cell - 0.35, y: y + 0.1, w: 0.7, h: 0.6, fontFace: FONT, fontSize: 22, bold: true, color: C.amber, align: 'center', valign: 'middle', margin: 0 });
    const lp = fitPt(shortTitle(i), 0.45, cell - 0.1, 14, 10.5, 0.02, true); const lh = Math.max(0.4, hFor(shortTitle(i), lp, cell - 0.1, 0.02, true));
    s.addText(shortTitle(i), { x: cx, y: y + d + 0.12, w: cell, h: lh, fontFace: FONT, fontSize: lp, bold: true, color: C.navy, align: 'center', valign: 'top', margin: 0, fit: FIT });
    body(s, subTitle(i), cx + 0.1, y + d + 0.15 + lh, cell - 0.2, 0.6, 10, C.textSec, { align: 'center' });
  });
  y += d + 1.5;
  const tileH = FOOT_Y - 0.25 - y;
  if (port) { s.addImage({ path: port, x: 0.6, y: y + 0.1, w: 1.5, h: 1.5, rounding: true }); s.addText(j.name, { x: 0.3, y: y + 1.65, w: 2.1, h: 0.35, fontFace: FONT, fontSize: 14, bold: true, color: C.navy, align: 'center', margin: 0 }); s.addText(j.role, { x: 0.25, y: y + 2.0, w: 2.2, h: tileH - 2.05, fontFace: FONT, fontSize: 10, color: C.textSec, align: 'center', valign: 'top', margin: 0, fit: FIT }); }
  const fx = 2.75, fw = (W - fx - 0.6 - 0.3) / 2;
  (j.framing.slice(0, 2)).forEach((f, i) => {
    const x = fx + i * (fw + 0.3), a = i ? C.blue : C.green;
    if (i) { ruleCard(s, x, y, fw, tileH, a); } else { s.addShape('rect', { x, y, w: fw, h: tileH, fill: { color: C.cream }, line: { color: C.amber, width: 1.25 }, shadow: SH() }); }
    eyebrow(s, f.eyebrow, i ? C.blue : C.amberInk, x + 0.3, y + 0.2, fw - 0.6);
    const bodyTxt = plain(f.body); let hp = 20, bp = 14;
    while (hp > 12 && hFor(f.h, hp, fw - 0.6, 0.05, true) + hFor(bodyTxt, bp, fw - 0.6, 0.06) > tileH - 0.9) { hp -= 1; bp = Math.max(8, bp - 0.5); }
    const hh = hFor(f.h, hp, fw - 0.6, 0.05, true);
    s.addText(f.h, { x: x + 0.3, y: y + 0.55, w: fw - 0.6, h: hh, fontFace: FONT, fontSize: hp, bold: true, color: C.navy, valign: 'top', margin: 0 });
    body(s, f.body, x + 0.3, y + 0.55 + hh + 0.1, fw - 0.6, y + tileH - 0.25 - (y + 0.55 + hh + 0.1), bp, C.text);
  });
  footer(s, label, n);

  // ---- stages
  j.stages.forEach((st, i) => {
    s = p.addSlide(); s.background = { color: C.bg }; n++;
    const img = stageImg(i); let col;
    // text load decides the picture width: heavy stages get a narrower column so the type stays readable
    const load = plain(st.title).length + st.quote.length + Math.max(plain(st.under).length, plain(st.old).length) * 2 + plain(st.care).length;
    const IMGW = load > 2100 ? 4.0 : load > 1600 ? 4.6 : 5.3;
    const side = i % 2 ? 'right' : 'left';
    if (img) col = column(s, img, side, IMGW);
    else { const x0 = side === 'right' ? W - IMGW : 0; s.addShape('rect', { x: x0, y: 0, w: IMGW, h: H, fill: { color: tint }, line: { color: tint } }); s.addText(String(i + 1).padStart(2, '0'), { x: x0, y: 2.2, w: IMGW, h: 2.2, fontFace: FONT, fontSize: 110, bold: true, color: acc, align: 'center', valign: 'middle', margin: 0 }); s.addText('Illustration to follow', { x: x0, y: 4.5, w: IMGW, h: 0.4, fontFace: FONT, fontSize: 11, color: C.muted, align: 'center', margin: 0 }); if (port) s.addImage({ path: port, x: x0 + IMGW / 2 - 0.75, y: 5.2, w: 1.5, h: 1.5, rounding: true }); col = side === 'right' ? { x: 0.6, w: W - IMGW - 1.05 } : { x: IMGW + 0.65, w: W - IMGW - 1.25 }; }
    eyebrow(s, `${j.name}'s journey · stage ${i + 1} of ${N}`, C.blue, col.x, 0.45, col.w);
    let yy = 0.8;
    s.addText(String(i + 1).padStart(2, '0'), { x: col.x, y: yy - 0.05, w: 1.15, h: 0.95, fontFace: FONT, fontSize: 54, bold: true, color: C.amber, margin: 0, valign: 'top' });
    yy = heading(s, shortTitle(i), col.x + 1.2, yy, col.w - 1.2, 0.9, C.navy);
    const sub = subTitle(i); if (sub) { s.addText(sub, { x: col.x + 1.2, y: yy + 0.02, w: col.w - 1.2, h: 0.3, fontFace: FONT, fontSize: 11.5, italic: true, color: C.textSec, margin: 0, fit: FIT }); yy += 0.34; }
    yy = Math.max(yy, 1.85) + 0.15;
    // budget the remaining height: scale narrative, quote, panels and the care strip together until the stack fits
    const cw2 = col.w, pw = (col.w - 0.25) / 2, avail = FOOT_Y - 0.15 - yy - 0.45;
    let k = 1.0, narrPt, quotePt, panPt, carePt, narrH, quoteH, panH, careH;
    for (;;) {
      narrPt = 13.5 * k; quotePt = 12.5 * k; panPt = 12 * k; carePt = Math.max(8, 9.5 * k);
      narrH = hFor(st.title, narrPt, cw2, 0.06);
      quoteH = hFor(st.quote + '  ' + st.attrib, quotePt, cw2 - 0.5, 0.05) + 0.34;
      panH = 0.32 + 0.2 + Math.max(hFor(plain(st.under), panPt, pw - 0.28, 0.06), hFor(plain(st.old), panPt, pw - 0.28, 0.06));
      careH = Math.max(0.5, hFor('WHO ' + j.name.toUpperCase() + "'S CARE TEAM SEES  " + plain(st.care), carePt, cw2 - 0.3, 0.16));
      if (narrH + quoteH + panH + careH + 0.15 <= avail || k <= 0.6) break; k -= 0.04;
    }
    panH = Math.max(panH, avail - 0.15 - narrH - quoteH - careH); // panels take any slack
    yy = body(s, st.title, col.x, yy, cw2, narrH, narrPt, C.text) + 0.15;
    yy = callout(s, [{ text: '“' + st.quote + '”' }, { text: '  ' + st.attrib, bold: true }], col.x, yy, cw2, quoteH, quotePt, true) + 0.15;
    [['What the model is doing underneath', st.under, C.navy], ['The old way', st.old, '5B6770']].forEach(([lab, txt, fill], kk) => {
      const x = col.x + kk * (pw + 0.25);
      s.addShape('rect', { x, y: yy, w: pw, h: 0.32, fill: { color: fill }, line: { color: fill } });
      s.addText(lab.toUpperCase(), { x: x + 0.12, y: yy, w: pw - 0.24, h: 0.32, fontFace: FONT, fontSize: 8.5, bold: true, color: C.white, charSpacing: 1.4, valign: 'middle', margin: 0 });
      s.addShape('rect', { x, y: yy + 0.32, w: pw, h: panH - 0.32, fill: { color: C.white }, line: { color: 'E3E9F0', width: 0.75 }, shadow: SH() });
      body(s, txt, x + 0.14, yy + 0.42, pw - 0.28, panH - 0.55, panPt, C.text);
    });
    yy += panH + 0.15;
    s.addShape('rect', { x: col.x, y: yy, w: col.w, h: careH, fill: { color: C.mint }, line: { color: C.mint } });
    s.addText([{ text: `WHO ${j.name.toUpperCase()}'S CARE TEAM SEES  `, options: { fontFace: FONT, fontSize: 8.5, bold: true, color: C.green, charSpacing: 1.2 } }, { text: plain(st.care), options: { fontFace: FONT, fontSize: carePt, color: C.text } }], { x: col.x + 0.15, y: yy, w: col.w - 0.3, h: careH, valign: 'middle', margin: 0, fit: FIT });
    footer(s, label, n, false, col);
    s.addNotes(`Stage ${i + 1}: ${shortTitle(i)}. ${plain(st.under)}`);
  });

  // ---- outcome
  s = p.addSlide(); s.background = { color: C.bg }; n++;
  eyebrow(s, j.outcome_eyebrow || `${j.name}'s win`, C.blue, 0.6, 0.45, 12);
  const bw = 4.2, lw = W - 1.2 - bw - 0.35;
  y = heading(s, j.outcome_title, 0.6, 0.8, lw, 2.2) + 0.25;
  y = body(s, j.outcome_body, 0.6, y, lw, 1.6, 15, C.text) + 0.3;
  const lastImg = stageImg(N - 1);
  if (lastImg) { const ih = FOOT_Y - 0.25 - y; if (ih > 1.4) { const iw = Math.min(lw, ih * 1.78); pic(s, lastImg, 0.6, y, iw, ih); if (lw - iw > 2.2) callout(s, [{ text: j.framing[0] ? j.framing[0].h : '', bold: true }], 0.6 + iw + 0.3, y, lw - iw - 0.3, ih, 15, false); } }
  const bx = W - 0.6 - bw, bh = FOOT_Y - 0.25 - 0.8;
  s.addShape('rect', { x: bx, y: 0.8, w: bw, h: bh, fill: { color: C.green }, line: { color: C.green } });
  eyebrow(s, 'The money in this story', 'CDE8D8', bx + 0.3, 1.0, bw - 0.6);
  const money = (j.money && j.money.length) ? j.money : [[{ text: 'The commissioner pays for the activity that happens, not for the building it used to happen in.' }]];
  let my = 1.4; const perH = (bh - 0.9 - (port ? 1.3 : 0)) / money.length;
  money.forEach(m => { my = body(s, m, bx + 0.3, my, bw - 0.6, perH - 0.1, 13.5, C.white) + 0.12; });
  if (port) { s.addImage({ path: port, x: bx + 0.3, y: 0.8 + bh - 1.2, w: 0.9, h: 0.9, rounding: true }); s.addText(j.name, { x: bx + 1.35, y: 0.8 + bh - 1.1, w: bw - 1.6, h: 0.35, fontFace: FONT, fontSize: 14, bold: true, color: C.white, margin: 0 }); s.addText(j.role, { x: bx + 1.35, y: 0.8 + bh - 0.75, w: bw - 1.6, h: 0.4, fontFace: FONT, fontSize: 9.5, color: 'CDE8D8', margin: 0, fit: FIT }); }
  footer(s, label, n);

  // ---- close
  s = p.addSlide(); s.background = { color: C.navy }; n++;
  logo(s, { right: W - 0.6, y: 0.5, h: 0.5 });
  if (port) { s.addShape('ellipse', { x: W / 2 - 1.15, y: 1.5, w: 2.3, h: 2.3, fill: { color: C.white }, line: { color: C.white } }); s.addImage({ path: port, x: W / 2 - 1.1, y: 1.55, w: 2.2, h: 2.2, rounding: true }); }
  s.addText(j.name, { x: 0.6, y: 3.95, w: W - 1.2, h: 0.5, fontFace: FONT, fontSize: 24, bold: true, color: C.white, align: 'center', margin: 0 });
  s.addText(j.role, { x: 0.6, y: 4.45, w: W - 1.2, h: 0.35, fontFace: FONT, fontSize: 12, color: 'CFE0F5', align: 'center', margin: 0 });
  const tag = j.framing[0] ? j.framing[0].h : ht;
  s.addText(tag, { x: 1.2, y: 5.05, w: W - 2.4, h: 1.0, fontFace: FONT, fontSize: fitPt(tag, 1.0, W - 2.4, 26, 18, 0.05), bold: true, color: C.gold, align: 'center', valign: 'middle', margin: 0, fit: FIT });
  footer(s, label, n, true);

  const out = path.join(outDir, `hm-journey-${j.key}-v1.pptx`);
  return p.writeFile({ fileName: out }).then(() => out);
}


/* ====================================================================== overview: the whole cast, one deck */
function overviewDeck(data, outDir) {
  const p = new pptxgen(); p.layout = 'LAYOUT_WIDE'; p.author = 'HomeTest Commercial'; p.title = 'Hearts and Minds · the whole cast';
  const label = 'Hearts and Minds · the whole cast, one deck · HomeTest operating model · September 2026'; let n = 1;
  const order = ['Patient', 'Commissioner', 'Clinician', 'Supplier'];
  const cast = order.flatMap(g => data.filter(j => j.group === g));
  let s = p.addSlide(); s.background = { color: C.navy };
  logo(s, { x: 0.6, y: 0.5, h: 0.5 });
  eyebrow(s, 'Hearts and Minds · the whole cast', C.amber, 0.6, 1.3, 6);
  s.addText('Twelve people. One operating model.', { x: 0.6, y: 1.65, w: 6.4, h: 1.6, fontFace: FONT, fontSize: 38, bold: true, color: C.white, margin: 0, valign: 'top' });
  body(s, 'Every service in the model is designed around named people: the patients it must reach, the commissioners who buy it, the clinicians who order it and read the results, and the suppliers who make it work. This deck is one slide per person, each drawn from their full journey.', 0.6, 3.4, 6.2, 1.8, 15, 'CFE0F5');
  const cols = 4, d = 1.15, gx = 7.4, gw = W - gx - 0.6, cw = gw / cols;
  cast.forEach((j, i) => { const x = gx + (i % cols) * cw + (cw - d) / 2, y = 0.75 + Math.floor(i / cols) * 2.15; if (j.portrait) { s.addShape('ellipse', { x: x - 0.04, y: y - 0.04, w: d + 0.08, h: d + 0.08, fill: { color: C.white }, line: { color: C.white } }); s.addImage({ path: j.portrait, x, y, w: d, h: d, rounding: true }); } s.addText(j.name, { x: gx + (i % cols) * cw, y: y + d + 0.05, w: cw, h: 0.3, fontFace: FONT, fontSize: 13, bold: true, color: C.white, align: 'center', margin: 0 }); s.addText(j.group, { x: gx + (i % cols) * cw, y: y + d + 0.33, w: cw, h: 0.25, fontFace: FONT, fontSize: 9.5, color: C.gold, align: 'center', margin: 0 }); });
  footer(s, label, null, true, { x: 0.6, w: 6.4 });
  cast.forEach(j => {
    s = p.addSlide(); s.background = { color: C.bg }; n++;
    const [acc] = JG[j.group] || [C.blue];
    const imgs = j.stages.map(st => st.image).filter(f => f && fs.existsSync(f)); const inter = scene(j.key + '-interlude');
    const img = exists(inter) ? inter : (imgs[1] || imgs[0] || null);
    let col; if (img) col = column(s, img, 'left', 5.3); else { s.addShape('rect', { x: 0, y: 0, w: 5.3, h: H, fill: { color: (JG[j.group] || [0, SKY])[1] }, line: { color: (JG[j.group] || [0, SKY])[1] } }); if (j.portrait) s.addImage({ path: j.portrait, x: 1.4, y: 2.5, w: 2.5, h: 2.5, rounding: true }); col = { x: 5.95, w: W - 5.3 - 1.25 }; }
    eyebrow(s, `${j.group} · ${j.hero_eyebrow}`, C.blue, col.x, 0.45, col.w);
    if (j.portrait) s.addImage({ path: j.portrait, x: col.x, y: 0.85, w: 1.1, h: 1.1, rounding: true });
    s.addText(j.name, { x: col.x + 1.3, y: 0.8, w: col.w - 1.3, h: 0.6, fontFace: FONT, fontSize: 30, bold: true, color: C.navy, margin: 0, valign: 'middle' });
    s.addText(j.role, { x: col.x + 1.3, y: 1.4, w: col.w - 1.3, h: 0.5, fontFace: FONT, fontSize: 12, color: C.textSec, margin: 0, valign: 'top', fit: FIT });
    const ht = plain(j.hero_title).replace(/\s*\n\s*/g, ' ');
    let y = heading(s, ht, col.x, 2.15, col.w, 1.0, acc === C.amberDeep ? C.navy : acc) + 0.15;
    y = body(s, j.hero_strap, col.x, y, col.w, 1.4, 13.5, C.text) + 0.2;
    const N = j.stages.length, cell = col.w / N, dd = 0.55;
    j.stages.forEach((st, i) => { const cx = col.x + i * cell; numberCircle(s, i + 1, cx + (cell - dd) / 2, y, dd, C.navy); s.addText(st.eyebrow.split(',')[0].trim(), { x: cx, y: y + dd + 0.06, w: cell, h: 0.55, fontFace: FONT, fontSize: 10, bold: true, color: C.navy, align: 'center', valign: 'top', margin: 0, fit: FIT }); });
    y += dd + 0.7;
    if (j.framing[0]) callout(s, [{ text: j.framing[0].h, bold: true }, { text: '  ' + plain(j.framing[0].body) }], col.x, y, col.w, FOOT_Y - 0.2 - y, 12.5, false);
    footer(s, label, n, false, col);
    s.addNotes(`${j.name}: ${ht} ${plain(j.hero_strap)}`);
  });
  s = p.addSlide(); s.background = { color: C.navy }; n++;
  logo(s, { right: W - 0.6, y: 0.5, h: 0.5 });
  eyebrow(s, 'Hearts and Minds', C.amber, 0.6, 0.6, 8);
  cast.slice(0, 6).forEach((j, i) => { const cw2 = (W - 1.2) / 6, x = 0.6 + i * cw2 + (cw2 - 1.2) / 2; if (j.portrait) { s.addShape('ellipse', { x: x - 0.04, y: 1.66, w: 1.28, h: 1.28, fill: { color: C.white }, line: { color: C.white } }); s.addImage({ path: j.portrait, x, y: 1.7, w: 1.2, h: 1.2, rounding: true }); } s.addText(j.name, { x: 0.6 + i * cw2, y: 2.95, w: cw2, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: C.white, align: 'center', margin: 0 }); });
  cast.slice(6).forEach((j, i) => { const cw2 = (W - 1.2) / 6, x = 0.6 + i * cw2 + (cw2 - 1.2) / 2; if (j.portrait) { s.addShape('ellipse', { x: x - 0.04, y: 3.46, w: 1.28, h: 1.28, fill: { color: C.white }, line: { color: C.white } }); s.addImage({ path: j.portrait, x, y: 3.5, w: 1.2, h: 1.2, rounding: true }); } s.addText(j.name, { x: 0.6 + i * cw2, y: 4.75, w: cw2, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: C.white, align: 'center', margin: 0 }); });
  s.addText('Built around people. Bought without pain. Live today.', { x: 0.9, y: 5.5, w: W - 1.8, h: 0.9, fontFace: FONT, fontSize: 28, bold: true, color: C.gold, align: 'center', valign: 'middle', margin: 0 });
  footer(s, label, n, true);
  const out = path.join(outDir, 'hm-journey-overview-v1.pptx');
  return p.writeFile({ fileName: out }).then(() => out);
}

/* ====================================================================== main */
(async () => {
  const mode = process.argv[2];
  if (mode === 'audience') {
    const outDir = process.argv[3]; fs.mkdirSync(outDir, { recursive: true });
    const { DECKS } = require('./audience_decks_content.js');
    for (const d of DECKS) console.log('wrote', await audienceDeck(d, outDir));
  } else if (mode === 'journeys') {
    const data = JSON.parse(fs.readFileSync(process.argv[3], 'utf8')); const outDir = process.argv[4]; fs.mkdirSync(outDir, { recursive: true });
    for (const j of data) console.log('wrote', await journeyDeck(j, outDir));
    console.log('wrote', await overviewDeck(data, outDir));
  } else console.log('usage: node hm_decks_v2.js audience <outDir> | journeys <journeys.json> <outDir>');
})().catch(e => { console.error(e); process.exit(1); });

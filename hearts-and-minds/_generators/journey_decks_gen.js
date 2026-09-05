/* Journey decks: one NHS-styled deck per HomeTest Hearts and Minds journey, plus an overview of the cast.
   Reads journeys.json produced by journey_decks_extract.py (run that from the HomeTest-TOM site folder first).
   These are model artefacts: they carry a person's story as slides. The audience decks are a separate thing.
   Usage: NODE_PATH=$(npm root -g) node journey_decks_gen.js [buildDir]   (default: ./ , writes to ./out) */
const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const K = require('./deck_kit.js');
const { C, FONT, W, H, plain, runs, hFor, fitPt } = K;

const BUILD = process.argv[2] || __dirname;
const data = JSON.parse(fs.readFileSync(path.join(BUILD, 'journeys.json'), 'utf8'));
const OUT = path.join(BUILD, 'out'); fs.mkdirSync(OUT, { recursive: true });
const STAMP = '260905';
const accentOf = p => (p.colour === '003087' ? C.blue : p.colour);
const ringOf = p => (p.colour === '003087' ? C.gold : p.colour);
const FOOT = 'HomeTest Operating Model  ·  Hearts and Minds';

function portrait(slide, p, x, y, d, ring) {
  slide.addShape('ellipse', { x: x - 0.075, y: y - 0.075, w: d + 0.15, h: d + 0.15, fill: { color: ring }, line: { color: ring } });
  if (p.portrait) slide.addImage({ path: p.portrait, x, y, w: d, h: d, rounding: true, sizing: { type: 'cover', w: d, h: d } });
}

// ---------- slides
function titleSlide(pptx, p) {
  const s = pptx.addSlide(); K.heroBg(s);
  K.logo(s, { right: W - 0.6, y: 0.5, h: 0.5 });
  s.addText(('Hearts and Minds  ·  HomeTest Operating Model  ·  ' + p.group + ' journey').toUpperCase(),
    { x: 0.75, y: 0.62, w: 9.6, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.gold, charSpacing: 2.8, margin: 0 });
  s.addShape('rect', { x: 0.75, y: 1.06, w: 0.9, h: 0.055, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText(p.name + '.', { x: 0.75, y: 1.24, w: 7.8, h: 1.05, fontFace: FONT, fontSize: 56, bold: true, color: C.white, margin: 0, charSpacing: -1.2 });
  const titleTxt = plain(p.hero_title), tPt = fitPt(titleTxt, 1.75, 7.5, 24, 16);
  const tH = Math.min(1.85, hFor(titleTxt, tPt, 7.5, 0.1));
  s.addText(runs(p.hero_title, { fontFace: FONT, fontSize: tPt, color: C.white }), { x: 0.75, y: 2.34, w: 7.5, h: tH, valign: 'top', margin: 0, fit: 'shrink' });
  const sY = 2.34 + tH + 0.28, strapTxt = plain(p.hero_strap);
  const sPt = fitPt(strapTxt, 6.05 - sY, 7.5, 12, 9);
  const sH = Math.min(6.05 - sY, hFor(strapTxt, sPt, 7.5, 0.1));
  s.addText(runs(p.hero_strap, { fontFace: FONT, fontSize: sPt, color: 'DCE7F0' }), { x: 0.75, y: sY, w: 7.5, h: sH, valign: 'top', margin: 0, fit: 'shrink' });
  s.addText(p.hero_eyebrow, { x: 0.75, y: Math.min(6.4, sY + sH + 0.16), w: 7.5, h: 0.42, fontFace: FONT, fontSize: 10.5, italic: true, color: '9FC2E8', margin: 0, valign: 'top' });
  portrait(s, p, 9.5, 1.62, 2.9, ringOf(p));
  s.addText(p.name, { x: 8.95, y: 4.76, w: 4.0, h: 0.44, fontFace: FONT, fontSize: 19, bold: true, color: C.white, align: 'center', margin: 0 });
  s.addText(p.role, { x: 8.7, y: 5.2, w: 4.5, h: 0.72, fontFace: FONT, fontSize: 10.5, color: C.gold, align: 'center', valign: 'top', margin: 0, charSpacing: 0.6, fit: 'shrink' });
  K.footer(s, FOOT, null, true);
}

function stepStrip(slide, p, y, acc) {
  const n = p.ribbon.length, gap = 0.12, x0 = 0.5, w = (W - 1.0 - gap * (n - 1)) / n, h = 1.36;
  p.ribbon.forEach((r, i) => {
    const x = x0 + i * (w + gap);
    K.card(slide, { x, y, w, h, fill: C.bg, accent: acc });
    slide.addShape('ellipse', { x: x + 0.15, y: y + 0.22, w: 0.38, h: 0.38, fill: { color: C.navy }, line: { color: C.navy } });
    slide.addText(String(i + 1), { x: x + 0.15, y: y + 0.22, w: 0.38, h: 0.38, fontFace: FONT, fontSize: 11, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
    slide.addText(r.label, { x: x + 0.6, y: y + 0.18, w: w - 0.74, h: 0.46, fontFace: FONT, fontSize: 11, bold: true, color: C.navy, valign: 'middle', margin: 0, fit: 'shrink' });
    slide.addText(r.sub, { x: x + 0.15, y: y + 0.7, w: w - 0.3, h: h - 0.82, fontFace: FONT, fontSize: 9, color: C.textSec, margin: 0, valign: 'top', fit: 'shrink' });
  });
  return y + h;
}

function glanceSlide(pptx, p, pageNo) {
  const acc = accentOf(p), s = pptx.addSlide(); s.background = { color: C.white };
  const top = K.header(s, 'Hearts and Minds  ·  ' + p.group + ' journey', p.name + "’s journey at a glance", acc);
  const afterStrip = stepStrip(s, p, top + 0.06, acc);
  const y = afterStrip + 0.34, tw = (W - 1.0 - 0.3) / 2, maxTh = H - 0.62 - y;
  const th = Math.min(maxTh, Math.max.apply(null, p.framing.map(f => 0.66 + hFor(f.h, 15, tw - 0.48, 0.06) + hFor(plain(f.body), 11, tw - 0.48, 0.1))));
  p.framing.forEach((f, i) => {
    const x = 0.5 + i * (tw + 0.3);
    K.card(s, { x, y, w: tw, h: th, fill: i ? C.cream : C.wash, line: i ? 'E6C96A' : 'B8D3E6' });
    K.cardText(s, { x, y, w: tw, h: th, eyebrow: f.eyebrow, eyebrowColor: i ? C.amberInk : C.blue, h2: f.h, h2pt: 15, body: f.body, bodypt: 11 });
  });
  K.footer(s, p.name + '  ·  Hearts and Minds', pageNo, false);
}

function stageSlide(pptx, p, st, pageNo) {
  const acc = accentOf(p), s = pptx.addSlide(); s.background = { color: C.white };
  const top = K.header(s, 'Hearts and Minds  ·  ' + p.name + "’s journey  ·  stage " + st.n + ' of ' + p.stages.length, st.eyebrow, acc);
  const hasImg = !!st.image, lx = 0.5, lw = hasImg ? 5.35 : 5.0, bottom = H - 0.62;

  s.addText(String(st.n).padStart(2, '0'), { x: lx - 0.03, y: top - 0.06, w: 1.6, h: 0.92, fontFace: FONT, fontSize: 50, bold: true, color: acc, margin: 0, charSpacing: -1 });
  let y = top + 0.9;
  const titleMax = hasImg ? 1.3 : 1.85, quoteMax = hasImg ? 1.15 : 1.7;
  const tPt = fitPt(st.title, titleMax, lw, hasImg ? 15 : 17, 10.5);
  const tH = Math.min(titleMax, hFor(st.title, tPt, lw, 0.1));
  s.addText(st.title, { x: lx, y, w: lw, h: tH, fontFace: FONT, fontSize: tPt, bold: true, color: C.navy, valign: 'top', margin: 0, fit: 'shrink' });
  y += tH + 0.14;
  const qPt = fitPt(st.quote, quoteMax - 0.44, lw - 0.4, hasImg ? 11.5 : 12.5, 9);
  const qH = Math.min(quoteMax, hFor(st.quote, qPt, lw - 0.4, 0.56));
  s.addShape('rect', { x: lx, y, w: lw, h: qH, fill: { color: C.bg }, line: { color: C.bg } });
  s.addShape('rect', { x: lx, y, w: 0.09, h: qH, fill: { color: acc }, line: { color: acc } });
  s.addText('“' + st.quote + '”', { x: lx + 0.26, y: y + 0.07, w: lw - 0.42, h: qH - 0.42, fontFace: FONT, fontSize: qPt, italic: true, color: C.text, valign: 'top', margin: 0, fit: 'shrink' });
  s.addText(st.attrib, { x: lx + 0.26, y: y + qH - 0.35, w: lw - 0.42, h: 0.28, fontFace: FONT, fontSize: 9.5, bold: true, color: acc === C.amber ? C.amberInk : acc, margin: 0 });
  y += qH + 0.2;
  if (hasImg) {
    const boxW = lw, boxH = bottom - y, [iw, ih] = st.image_wh;
    if (boxH > 0.9) {
      const natural = boxW * ih / iw;
      if (natural <= boxH) s.addImage({ path: st.image, x: lx, y: bottom - natural, w: boxW, h: natural });
      else s.addImage({ path: st.image, x: lx, y, w: boxW, h: boxH, sizing: { type: 'cover', w: boxW, h: boxH } });
    }
  }

  const rx = hasImg ? 6.2 : 5.85, rw = W - 0.5 - rx, avail = bottom - top;
  let pt = 11, total;
  const calc = f => 0.3 * 3 + 0.14 * 2 + hFor(plain(st.under), f, rw) + hFor(plain(st.old), f, rw) + hFor(plain(st.care), f, rw);
  while ((total = calc(pt)) > avail && pt > 8.5) pt -= 0.5;
  let yy = top;
  yy = K.panel(s, rx, yy, rw, 'What the model is doing underneath', st.under, C.blue, C.pale, pt) + 0.14;
  yy = K.panel(s, rx, yy, rw, 'The old way', st.old, C.textSec, C.bg, pt) + 0.14;
  K.panel(s, rx, yy, rw, 'What the care team sees', st.care, C.green, C.mint, pt);

  s.addNotes(st.eyebrow + '\n\n' + st.title + '\n\nQuote: ' + st.quote + '\n\nWhat the model is doing underneath: ' + plain(st.under) + '\n\nThe old way: ' + plain(st.old) + '\n\nWhat the care team sees: ' + plain(st.care));
  K.footer(s, p.name + '  ·  Hearts and Minds', pageNo, false);
}

function outcomeSlide(pptx, p, pageNo) {
  const acc = accentOf(p), s = pptx.addSlide(); s.background = { color: C.white };
  const top = K.header(s, 'Hearts and Minds  ·  ' + p.name + "’s journey  ·  the outcome", p.outcome_eyebrow, acc);
  const bottom = H - 0.62, cw = W - 1.0;

  // stack: title, body, money panel. Every block measured, nothing overlaps.
  const tPt = fitPt(p.outcome_title, 1.15, cw, 22, 15);
  const tH = Math.min(1.2, hFor(p.outcome_title, tPt, cw, 0.08));
  let y = top + 0.06;
  s.addText(p.outcome_title, { x: 0.5, y, w: cw, h: tH, fontFace: FONT, fontSize: tPt, bold: true, color: C.navy, valign: 'top', margin: 0, fit: 'shrink' });
  y += tH + 0.22;

  const moneyTxt = p.money.map(plain).join('\n');
  const moneyNeed = 0.62 + hFor(moneyTxt, 11.5, cw - 0.6, 0.1) + 0.5;
  const bodyAvail = bottom - y - 0.28 - Math.min(moneyNeed, 3.0);
  const bPt = fitPt(plain(p.outcome_body), bodyAvail, cw, 12, 9.5);
  const bH = Math.min(bodyAvail, hFor(plain(p.outcome_body), bPt, cw, 0.08));
  s.addText(runs(p.outcome_body, { fontFace: FONT, fontSize: bPt, color: C.text }), { x: 0.5, y, w: cw, h: bH, valign: 'top', margin: 0, fit: 'shrink' });
  y += bH + 0.28;

  const mh = Math.min(bottom - y, Math.max(1.75, 0.55 + hFor(moneyTxt, 11.5, cw - 0.6, 0.12) + 0.46));
  K.card(s, { x: 0.5, y, w: cw, h: mh, fill: C.white, line: C.borderLt, accent: C.green });
  s.addText('THE MONEY IN THIS STORY', { x: 0.8, y: y + 0.19, w: 6, h: 0.28, fontFace: FONT, fontSize: 9.5, bold: true, color: C.green, charSpacing: 2, margin: 0 });
  const noteH = 0.42, mBodyAvail = mh - 0.55 - noteH;
  const mPt = fitPt(moneyTxt, mBodyAvail, cw - 0.6, 11.5, 8.5);
  const moneyRuns = [];
  p.money.forEach((para, i) => { runs(para, { fontFace: FONT, fontSize: mPt, color: C.textSec }).forEach(r => moneyRuns.push(r)); if (i < p.money.length - 1) moneyRuns.push({ text: '', options: { breakLine: true, fontSize: 6 } }); });
  s.addText(moneyRuns, { x: 0.8, y: y + 0.52, w: cw - 0.6, h: mBodyAvail, valign: 'top', margin: 0, fit: 'shrink', paraSpaceAfter: 5 });
  s.addText('Commercial positions are agreed in principle and remain subject to the live procurement. See the Money Loop and How Commissioners Buy pages of the operating model.',
    { x: 0.8, y: y + mh - noteH, w: cw - 0.6, h: noteH - 0.06, fontFace: FONT, fontSize: 8.5, italic: true, color: C.muted, margin: 0, valign: 'bottom' });
  K.footer(s, p.name + '  ·  Hearts and Minds', pageNo, false);
}

// ---------- overview deck
function overviewDeck(pptx) {
  const s = pptx.addSlide(); K.heroBg(s);
  K.logo(s, { right: W - 0.6, y: 0.5, h: 0.5 });
  s.addText('HEARTS AND MINDS  ·  HOMETEST OPERATING MODEL', { x: 0.75, y: 0.62, w: 9.6, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.gold, charSpacing: 2.8, margin: 0 });
  s.addShape('rect', { x: 0.75, y: 1.06, w: 0.9, h: 0.055, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText('Twelve people.\nOne operating model.', { x: 0.75, y: 1.3, w: 9, h: 2.1, fontFace: FONT, fontSize: 46, bold: true, color: C.white, margin: 0, charSpacing: -1.2 });
  s.addText('Each journey follows one person the HomeTest operating model has to work for: five patients, four commissioners, two clinicians and one supplier. The same platform, the same accredited register and the same commercial mechanics, seen from twelve seats. Every journey has its own deck; this one introduces the cast and gives each journey at a glance.',
    { x: 0.75, y: 3.5, w: 8.6, h: 1.6, fontFace: FONT, fontSize: 13, color: 'DCE7F0', valign: 'top', margin: 0 });
  data.forEach((p, i) => { const d = 0.78, x = 0.75 + i * 1.0; portrait(s, p, x, 5.35, d, ringOf(p)); s.addText(p.name, { x: x - 0.15, y: 6.2, w: d + 0.3, h: 0.25, fontFace: FONT, fontSize: 8.5, bold: true, color: C.white, align: 'center', margin: 0 }); });
  K.footer(s, FOOT, null, true);

  const groups = ['Patient', 'Commissioner', 'Clinician', 'Supplier'];
  const ordered = groups.flatMap(g => data.filter(p => p.group === g));
  let pageNo = 2;
  for (let k = 0; k < ordered.length; k += 6) {
    const sl = pptx.addSlide(); sl.background = { color: C.white };
    const top = K.header(sl, 'Hearts and Minds  ·  the cast', k === 0 ? 'The patients and the first commissioners' : 'The commissioners, the clinicians and the supplier', C.amber);
    ordered.slice(k, k + 6).forEach((p, i) => {
      const col = i % 3, row = Math.floor(i / 3), cw = (W - 1.0 - 0.5) / 3, ch = (H - 0.62 - top - 0.25) / 2;
      const x = 0.5 + col * (cw + 0.25), y = top + row * (ch + 0.25), acc = accentOf(p);
      K.card(sl, { x, y, w: cw, h: ch, fill: C.bg, accent: acc });
      portrait(sl, p, x + 0.22, y + 0.3, 0.95, ringOf(p));
      sl.addText(p.name, { x: x + 1.35, y: y + 0.26, w: cw - 1.55, h: 0.38, fontFace: FONT, fontSize: 16, bold: true, color: C.navy, margin: 0 });
      sl.addText(p.role, { x: x + 1.35, y: y + 0.64, w: cw - 1.55, h: 0.56, fontFace: FONT, fontSize: 9.5, bold: true, color: acc === C.amber ? C.amberInk : acc, valign: 'top', margin: 0, fit: 'shrink' });
      sl.addText(plain(p.hero_title).replace(/\n/g, ' '), { x: x + 0.22, y: y + 1.36, w: cw - 0.44, h: 0.5, fontFace: FONT, fontSize: 11, bold: true, color: C.text, valign: 'top', margin: 0, fit: 'shrink' });
      sl.addText(p.hero_eyebrow, { x: x + 0.22, y: y + 1.88, w: cw - 0.44, h: ch - 2.05, fontFace: FONT, fontSize: 9, color: C.textSec, valign: 'top', margin: 0, fit: 'shrink' });
    });
    K.footer(sl, 'The cast  ·  Hearts and Minds', pageNo++, false);
  }
  ordered.forEach(p => glanceSlide(pptx, p, pageNo++));
  return pageNo - 1;
}

(async () => {
  for (const p of data) {
    const pptx = new pptxgen(); pptx.layout = 'LAYOUT_WIDE';
    pptx.author = 'HomeTest Programme'; pptx.company = 'NHS England'; pptx.title = p.name + "’s story: HomeTest Hearts and Minds";
    titleSlide(pptx, p);
    let n = 2; glanceSlide(pptx, p, n++);
    for (const st of p.stages) stageSlide(pptx, p, st, n++);
    outcomeSlide(pptx, p, n++);
    const f = path.join(OUT, `HomeTest Hearts and Minds - ${p.name} ${STAMP}.pptx`);
    await pptx.writeFile({ fileName: f }); console.log('wrote', path.basename(f), n - 1, 'slides');
  }
  const pptx = new pptxgen(); pptx.layout = 'LAYOUT_WIDE'; pptx.title = 'HomeTest Hearts and Minds: the cast';
  const n = overviewDeck(pptx);
  const f = path.join(OUT, `HomeTest Hearts and Minds - Overview ${STAMP}.pptx`);
  await pptx.writeFile({ fileName: f }); console.log('wrote', path.basename(f), n, 'slides');
})().catch(e => { console.error(e); process.exit(1); });

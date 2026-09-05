/* Hearts and Minds deck kit.
   Shared palette, type, logo lockup, header, footer and panel helpers.
   Palette and font stack match the operating model HTML so the decks and the site feel like one thing.
   Used by journey_decks_gen.js and audience_decks_gen.js. */
const path = require('path');

const A = path.join(__dirname, 'assets');
const ASSET = { logo: path.join(A, 'nhs-logo.png'), bgHero: path.join(A, 'bg-hero.jpg'), bgBand: path.join(A, 'bg-band.jpg') };
const LOGO_RATIO = 259 / 202;

// site tokens (see the :root block on any operating model page)
const C = {
  navy: '003087', blue: '005EB8', deep: '001A4D', green: '006747', teal: '00A499',
  gold: 'FFD66B', amber: 'FFB91D', amberDeep: 'C9A227', amberInk: '8A6D1F',
  text: '212B32', textSec: '4C6272', muted: '7E8B97',
  border: 'D9DEE3', borderLt: 'EBEEF1', card: 'FFFFFF', bg: 'F8FAFC',
  pale: 'D5E8F0', wash: 'F4F8FC', cream: 'FFF9EC', mint: 'E8F3EE', white: 'FFFFFF',
};
const FONT = 'Segoe UI';
const W = 13.333, H = 7.5;
const DISCLAIMER = 'Commercial positions are agreed in principle and remain subject to the live procurement.';

// ---------- text helpers
const plain = rs => (Array.isArray(rs) ? rs.map(r => r.text).join('') : String(rs || ''));
const runs = (rs, base) => rs.map(r => ({ text: r.text, options: Object.assign({}, base, r.bold ? { bold: true } : {}) }));
// Conservative metrics: PowerPoint does not apply shrink-to-fit until a box is edited, so every box must be
// sized to hold its text as stored. Average advance taken as 0.55em (bold headings run wider, ~0.6em), line
// height 1.3, and word wrap loses part of most lines, so a further 8% is added.
const CHAR_W = 0.6, LINE_H = 1.3;
function estLines(txt, pt, widthIn, bold) {
  const cpl = Math.max(8, Math.floor((widthIn - 0.1) * 72 / (pt * (bold ? 0.68 : CHAR_W)) * 0.92));
  let n = 0; for (const para of String(txt).split('\n')) n += Math.max(1, Math.ceil(para.length / cpl));
  return n;
}
const hFor = (txt, pt, widthIn, pad = 0.22, bold) => estLines(txt, pt, widthIn, bold) * pt * LINE_H / 72 + pad;
function fitPt(txt, maxH, widthIn, start, min, pad = 0.1, bold) {
  let f = start; while (f > min && hFor(txt, f, widthIn, pad, bold) > maxH) f -= 0.5; return f;
}

// ---------- logo lockup: white rounded card behind the mark, so "England" (black) always reads
function logo(slide, opts) {
  const h = opts.h || 0.5, w = h * LOGO_RATIO, padX = h * 0.30, padY = h * 0.22;
  const cardW = w + padX * 2, cardH = h + padY * 2;
  const x = opts.right != null ? opts.right - cardW : opts.x, y = opts.y;
  slide.addShape('roundRect', { x, y, w: cardW, h: cardH, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.white } });
  slide.addImage({ path: ASSET.logo, x: x + padX, y: y + padY, w, h });
  return { w: cardW, h: cardH };
}

// ---------- chrome
function footer(slide, label, pageNo, dark) {
  const col = dark ? '9FC2E8' : C.muted;
  slide.addText(label, { x: 0.5, y: H - 0.44, w: 4.6, h: 0.3, fontFace: FONT, fontSize: 8.5, color: col, margin: 0, valign: 'middle' });
  slide.addText(DISCLAIMER, { x: 5.2, y: H - 0.44, w: W - 6.3, h: 0.3, fontFace: FONT, fontSize: 8, color: col, align: 'right', margin: 0, valign: 'middle' });
  if (pageNo) slide.addText(String(pageNo), { x: W - 0.95, y: H - 0.44, w: 0.45, h: 0.3, fontFace: FONT, fontSize: 8.5, bold: true, color: col, align: 'right', margin: 0, valign: 'middle' });
}
/** Navy band header with a gold accent rule. Returns the y at which content may start. */
function header(slide, eyebrow, title, accent) {
  const bandH = 1.02;
  slide.addImage({ path: ASSET.bgBand, x: 0, y: 0, w: W, h: bandH });
  slide.addShape('rect', { x: 0, y: bandH, w: W, h: 0.055, fill: { color: accent || C.gold }, line: { color: accent || C.gold } });
  slide.addText(String(eyebrow).toUpperCase(), { x: 0.55, y: 0.15, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 9.5, bold: true, color: C.gold, charSpacing: 2.4, margin: 0, valign: 'middle' });
  const pt = fitPt(title, 0.5, 10.4, 21, 14);
  slide.addText(title, { x: 0.55, y: 0.44, w: 10.4, h: 0.5, fontFace: FONT, fontSize: pt, bold: true, color: C.white, margin: 0, valign: 'middle', fit: 'shrink' });
  logo(slide, { right: W - 0.5, y: 0.19, h: 0.46 });
  return bandH + 0.055 + 0.22;
}
/** Full-bleed hero slide background (the site's journey hero gradient). */
function heroBg(slide) { slide.addImage({ path: ASSET.bgHero, x: 0, y: 0, w: W, h: H }); }

/** Labelled panel: coloured cap, tinted body. Returns the y below it. */
function panel(slide, x, y, w, label, body, headFill, bodyFill, pt) {
  const capH = 0.3, bodyH = hFor(plain(body), pt, w);
  slide.addShape('rect', { x, y, w, h: capH, fill: { color: headFill }, line: { color: headFill } });
  slide.addText(String(label).toUpperCase(), { x: x + 0.13, y, w: w - 0.26, h: capH, fontFace: FONT, fontSize: 8.5, bold: true, color: C.white, charSpacing: 1.5, valign: 'middle', margin: 0 });
  slide.addShape('rect', { x, y: y + capH, w, h: bodyH, fill: { color: bodyFill }, line: { color: bodyFill } });
  const content = Array.isArray(body) ? runs(body, { fontFace: FONT, fontSize: pt, color: C.text }) : [{ text: String(body), options: { fontFace: FONT, fontSize: pt, color: C.text } }];
  slide.addText(content, { x: x + 0.13, y: y + capH + 0.04, w: w - 0.26, h: bodyH - 0.06, valign: 'top', margin: 0, paraSpaceAfter: 0 });
  return y + capH + bodyH;
}

/** Card with a coloured top rule, in the site's card style. */
function card(slide, o) {
  slide.addShape('roundRect', { x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.1, fill: { color: o.fill || C.card }, line: { color: o.line || C.borderLt, width: 0.75 } });
  if (o.accent) slide.addShape('rect', { x: o.x, y: o.y, w: o.w, h: 0.07, fill: { color: o.accent }, line: { color: o.accent } });
}

/** Eyebrow + heading + body inside a card, sized to fit. */
function cardText(slide, o) {
  let y = o.y + 0.2;
  if (o.eyebrow) { slide.addText(o.eyebrow.toUpperCase(), { x: o.x + 0.24, y, w: o.w - 0.48, h: 0.26, fontFace: FONT, fontSize: 8.5, bold: true, color: o.eyebrowColor || C.blue, charSpacing: 1.6, margin: 0 }); y += 0.3; }
  if (o.h2) { const pt = fitPt(o.h2, 0.8, o.w - 0.48, o.h2pt || 15, 11); const hh = Math.min(0.85, hFor(o.h2, pt, o.w - 0.48, 0.06)); slide.addText(o.h2, { x: o.x + 0.24, y, w: o.w - 0.48, h: hh, fontFace: FONT, fontSize: pt, bold: true, color: C.navy, valign: 'top', margin: 0, fit: 'shrink' }); y += hh + 0.08; }
  if (o.body) {
    const avail = o.y + o.h - 0.2 - y, txt = plain(o.body);
    const pt = fitPt(txt, avail, o.w - 0.48, o.bodypt || 11, 8.5);
    const content = Array.isArray(o.body) ? runs(o.body, { fontFace: FONT, fontSize: pt, color: o.bodyColor || C.text }) : [{ text: txt, options: { fontFace: FONT, fontSize: pt, color: o.bodyColor || C.text } }];
    slide.addText(content, { x: o.x + 0.24, y, w: o.w - 0.48, h: avail, valign: 'top', margin: 0, fit: 'shrink' });
  }
}

module.exports = { C, FONT, W, H, ASSET, LOGO_RATIO, DISCLAIMER, plain, runs, estLines, hFor, fitPt, logo, footer, header, heroBg, panel, card, cardText };

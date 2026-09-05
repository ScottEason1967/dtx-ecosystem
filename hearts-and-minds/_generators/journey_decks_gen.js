const pptxgen = require('pptxgenjs');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync(__dirname + '/journeys.json', 'utf8'));
const OUT = __dirname + '/out'; fs.mkdirSync(OUT, { recursive: true });
const LOGO = '/sessions/quirky-zen-galileo/mnt/outputs/deckbuild/nhs_logo.png';
const NAVY='003087', BLUE='005EB8', GREEN='006747', AMBER='FFB91D', DARK='231F20', GREY='4C6272', MID='7E8B97', PALE='D5E8F0', LIGHT='F0F4F5', MINT='E8F3EE', CREAM='FFF3CD', SKY='7EC8E3';
const W=13.333, H=7.5, FONT='Arial';
const DISCLAIMER='Commercial positions are agreed in principle and remain subject to the live procurement.';
const paletteFor = p => ({ acc: p.colour === '003087' ? BLUE : p.colour, ring: p.colour === '003087' ? SKY : p.colour });

// ---------- helpers
function runs(rs, base) { return rs.map(r => ({ text: r.text, options: Object.assign({}, base, r.bold ? { bold: true } : {}) })); }
const plain = rs => rs.map(r => r.text).join('');
function estLines(txt, pt, widthIn) { const cpl = Math.max(10, Math.floor((widthIn - 0.25) * 72 / (pt * 0.5))); let n = 0; for (const para of txt.split('\n')) n += Math.max(1, Math.ceil(para.length / cpl)); return n; }
const hFor = (txt, pt, widthIn, pad = 0.22) => estLines(txt, pt, widthIn) * pt * 1.22 / 72 + pad;

function footer(slide, label, pageNo, dark) {
  slide.addText(label, { x: 0.5, y: H - 0.42, w: 3.4, h: 0.3, fontFace: FONT, fontSize: 8.5, color: dark ? SKY : MID, margin: 0 });
  slide.addText(DISCLAIMER, { x: 4.0, y: H - 0.42, w: W - 5.1, h: 0.3, fontFace: FONT, fontSize: 8, color: dark ? SKY : MID, align: 'right', margin: 0 });
  if (pageNo) slide.addText(String(pageNo), { x: W - 0.9, y: H - 0.42, w: 0.4, h: 0.3, fontFace: FONT, fontSize: 8.5, color: dark ? SKY : MID, align: 'right', margin: 0, bold: true });
}
function headerBand(slide, eyebrow, title, acc) {
  slide.addShape('rect', { x: 0, y: 0, w: W, h: 0.95, fill: { color: NAVY }, line: { color: NAVY } });
  slide.addShape('rect', { x: 0, y: 0.95, w: W, h: 0.06, fill: { color: acc }, line: { color: acc } });
  slide.addText(eyebrow.toUpperCase(), { x: 0.5, y: 0.14, w: 9.5, h: 0.28, fontFace: FONT, fontSize: 9.5, bold: true, color: SKY, charSpacing: 2, margin: 0 });
  slide.addText(title, { x: 0.5, y: 0.42, w: 10.5, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: 'FFFFFF', margin: 0 });
  slide.addImage({ path: LOGO, x: W - 1.55, y: 0.22, w: 1.05, h: 0.43 });
}
function portrait(slide, p, x, y, d, ring) {
  slide.addShape('ellipse', { x: x - 0.08, y: y - 0.08, w: d + 0.16, h: d + 0.16, fill: { color: ring }, line: { color: ring } });
  if (p.portrait) slide.addImage({ path: p.portrait, x, y, w: d, h: d, rounding: true, sizing: { type: 'cover', w: d, h: d } });
}
function stepStrip(slide, p, y, acc) {
  const n = p.ribbon.length, gap = 0.12, x0 = 0.5, wTot = W - 1.0, w = (wTot - gap * (n - 1)) / n, h = 1.35;
  p.ribbon.forEach((r, i) => {
    const x = x0 + i * (w + gap);
    slide.addShape('roundRect', { x, y, w, h, rectRadius: 0.08, fill: { color: LIGHT }, line: { color: 'DDE3E8', width: 0.75 } });
    slide.addShape('rect', { x, y, w, h: 0.06, fill: { color: acc }, line: { color: acc } });
    slide.addShape('ellipse', { x: x + 0.14, y: y + 0.2, w: 0.38, h: 0.38, fill: { color: NAVY }, line: { color: NAVY } });
    slide.addText(String(i + 1), { x: x + 0.14, y: y + 0.2, w: 0.38, h: 0.38, fontFace: FONT, fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle', margin: 0 });
    slide.addText(r.label, { x: x + 0.6, y: y + 0.16, w: w - 0.7, h: 0.46, fontFace: FONT, fontSize: 11, bold: true, color: NAVY, valign: 'middle', margin: 0, fit: 'shrink' });
    slide.addText(r.sub, { x: x + 0.14, y: y + 0.68, w: w - 0.28, h: h - 0.76, fontFace: FONT, fontSize: 9, color: GREY, margin: 0, valign: 'top', fit: 'shrink' });
  });
  return y + h;
}
function panel(slide, x, y, w, label, body, headFill, bodyFill, pt) {
  const hh = 0.3, bh = hFor(plain(body), pt, w);
  slide.addShape('rect', { x, y, w, h: hh, fill: { color: headFill }, line: { color: headFill } });
  slide.addText(label.toUpperCase(), { x: x + 0.12, y, w: w - 0.24, h: hh, fontFace: FONT, fontSize: 8.5, bold: true, color: 'FFFFFF', charSpacing: 1.5, valign: 'middle', margin: 0 });
  slide.addShape('rect', { x, y: y + hh, w, h: bh, fill: { color: bodyFill }, line: { color: bodyFill } });
  slide.addText(runs(body, { fontFace: FONT, fontSize: pt, color: DARK }), { x: x + 0.12, y: y + hh + 0.04, w: w - 0.24, h: bh - 0.06, valign: 'top', margin: 0, paraSpaceAfter: 0 });
  return y + hh + bh;
}

// ---------- slide builders
function titleSlide(pptx, p, deckLabel) {
  const { ring } = paletteFor(p);
  const s = pptx.addSlide(); s.background = { color: NAVY };
  s.addImage({ path: LOGO, x: W - 1.75, y: 0.4, w: 1.25, h: 0.51 });
  s.addText(deckLabel.toUpperCase(), { x: 0.7, y: 0.55, w: 10.2, h: 0.3, fontFace: FONT, fontSize: 10.5, bold: true, color: SKY, charSpacing: 3, margin: 0 });
  s.addShape('rect', { x: 0.7, y: 1.0, w: 0.9, h: 0.06, fill: { color: AMBER }, line: { color: AMBER } });
  s.addText(p.name + '.', { x: 0.7, y: 1.2, w: 8, h: 1.1, fontFace: FONT, fontSize: 60, bold: true, color: 'FFFFFF', margin: 0 });
  const htH = Math.min(1.9, hFor(plain(p.hero_title), 24, 7.6, 0.1));
  s.addText(runs(p.hero_title, { fontFace: FONT, fontSize: 24, color: 'FFFFFF' }), { x: 0.7, y: 2.35, w: 7.6, h: htH, valign: 'top', margin: 0, fit: 'shrink' });
  const stY = 2.35 + htH + 0.3, stH = Math.min(6.15 - stY, hFor(plain(p.hero_strap), 12, 7.6, 0.1));
  s.addText(runs(p.hero_strap, { fontFace: FONT, fontSize: 12, color: 'DCE7F0' }), { x: 0.7, y: stY, w: 7.6, h: stH, valign: 'top', margin: 0, fit: 'shrink' });
  s.addText(p.hero_eyebrow, { x: 0.7, y: stY + stH + 0.15, w: 7.6, h: 0.4, fontFace: FONT, fontSize: 10.5, italic: true, color: SKY, margin: 0 });
  portrait(s, p, 9.35, 1.55, 3.0, ring);
  s.addText(p.name, { x: 8.9, y: 4.75, w: 3.9, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: 'FFFFFF', align: 'center', margin: 0 });
  s.addText(p.role, { x: 8.7, y: 5.2, w: 4.3, h: 0.7, fontFace: FONT, fontSize: 11, color: AMBER, align: 'center', valign: 'top', margin: 0 });
  footer(s, 'HomeTest Operating Model  ·  Hearts and Minds', null, true);
}
function glanceSlide(pptx, p, pageNo) {
  const { acc } = paletteFor(p);
  const s = pptx.addSlide(); s.background = { color: 'FFFFFF' };
  headerBand(s, 'Hearts and Minds  ·  ' + p.group + ' journey', p.name + "'s journey at a glance", acc);
  const yEnd = stepStrip(s, p, 1.35, acc);
  const y = yEnd + 0.35, tw = (W - 1.0 - 0.3) / 2, th = H - 0.6 - y;
  p.framing.forEach((f, i) => {
    const x = 0.5 + i * (tw + 0.3);
    s.addShape('roundRect', { x, y, w: tw, h: th, rectRadius: 0.1, fill: { color: i ? CREAM : PALE }, line: { color: i ? 'E6C96A' : 'B8D3E6', width: 0.75 } });
    s.addText(f.eyebrow.toUpperCase(), { x: x + 0.25, y: y + 0.18, w: tw - 0.5, h: 0.28, fontFace: FONT, fontSize: 9, bold: true, color: i ? '8A6D1F' : BLUE, charSpacing: 1.5, margin: 0 });
    s.addText(f.h, { x: x + 0.25, y: y + 0.48, w: tw - 0.5, h: 0.75, fontFace: FONT, fontSize: 15, bold: true, color: NAVY, valign: 'top', margin: 0, fit: 'shrink' });
    s.addText(runs(f.body, { fontFace: FONT, fontSize: 11, color: DARK }), { x: x + 0.25, y: y + 1.28, w: tw - 0.5, h: th - 1.45, valign: 'top', margin: 0, fit: 'shrink' });
  });
  footer(s, p.name + '  ·  Hearts and Minds', pageNo, false);
}
function stageSlide(pptx, p, st, pageNo) {
  const { acc } = paletteFor(p);
  const s = pptx.addSlide(); s.background = { color: 'FFFFFF' };
  headerBand(s, 'Hearts and Minds  ·  ' + p.name + "'s journey  ·  stage " + st.n + ' of ' + p.stages.length, st.eyebrow, acc);
  // left column (image-aware): fonts sized so title + quote fit above a fixed picture box when there is a picture
  const hasImg = !!st.image;
  const lx = 0.5, lw = hasImg ? 5.35 : 5.0;
  s.addText(String(st.n).padStart(2, '0'), { x: lx - 0.03, y: 1.12, w: 1.6, h: 0.95, fontFace: FONT, fontSize: 52, bold: true, color: acc, margin: 0 });
  let y = 2.1;
  const fitPt = (txt, maxH, start, min, pad) => { let f = start; while (f > min && hFor(txt, f, lw - (pad || 0), 0.1) > maxH) f -= 0.5; return f; };
  const titleMax = hasImg ? 1.35 : 1.9, quoteMax = hasImg ? 1.05 : 1.6;
  const tPt = fitPt(st.title, titleMax, hasImg ? 15 : 17, 10.5);
  const tH = Math.min(titleMax, hFor(st.title, tPt, lw, 0.1));
  s.addText(st.title, { x: lx, y, w: lw, h: tH, fontFace: FONT, fontSize: tPt, bold: true, color: NAVY, valign: 'top', margin: 0, fit: 'shrink' });
  y += tH + 0.12;
  const qPt = fitPt(st.quote, quoteMax - 0.45, hasImg ? 11.5 : 12.5, 9, 0.4);
  const qH = Math.min(quoteMax, hFor(st.quote, qPt, lw - 0.4, 0.55));
  s.addShape('rect', { x: lx, y, w: lw, h: qH, fill: { color: LIGHT }, line: { color: LIGHT } });
  s.addShape('rect', { x: lx, y, w: 0.09, h: qH, fill: { color: acc }, line: { color: acc } });
  s.addText('\u201C' + st.quote + '\u201D', { x: lx + 0.25, y: y + 0.06, w: lw - 0.4, h: qH - 0.4, fontFace: FONT, fontSize: qPt, italic: true, color: DARK, valign: 'top', margin: 0, fit: 'shrink' });
  s.addText(st.attrib, { x: lx + 0.25, y: y + qH - 0.34, w: lw - 0.4, h: 0.28, fontFace: FONT, fontSize: 9.5, bold: true, color: acc === AMBER ? '8A6D1F' : acc, margin: 0 });
  y += qH + 0.18;
  if (hasImg) {
    const boxW = lw, boxH = H - 0.62 - y;
    const [iw, ih] = st.image_wh; let w = boxW, h = w * ih / iw; if (h > boxH) { h = boxH; w = h * iw / ih; }
    if (h > 0.8) s.addImage({ path: st.image, x: lx, y: H - 0.62 - h, w, h });
  }
  // right column: three panels, autoscaled
  const rx = hasImg ? 6.2 : 5.85, rw = W - 0.5 - rx, top = 1.2, avail = H - 0.62 - top;
  let pt = 11, total;
  const calc = f => 0.3 * 3 + 0.14 * 2 + hFor(plain(st.under), f, rw) + hFor(plain(st.old), f, rw) + hFor(plain(st.care), f, rw);
  while ((total = calc(pt)) > avail && pt > 8.5) pt -= 0.5;
  let yy = top;
  yy = panel(s, rx, yy, rw, 'What the model is doing underneath', st.under, BLUE, PALE, pt) + 0.14;
  yy = panel(s, rx, yy, rw, 'The old way', st.old, GREY, LIGHT, pt) + 0.14;
  yy = panel(s, rx, yy, rw, 'What the care team sees', st.care, GREEN, MINT, pt);
  s.addNotes(st.eyebrow + '\n\n' + st.title + '\n\nQuote: ' + st.quote + '\n\nWhat the model is doing underneath: ' + plain(st.under) + '\n\nThe old way: ' + plain(st.old) + '\n\nWhat the care team sees: ' + plain(st.care));
  footer(s, p.name + '  ·  Hearts and Minds', pageNo, false);
}
function outcomeSlide(pptx, p, pageNo) {
  const { acc } = paletteFor(p);
  const s = pptx.addSlide(); s.background = { color: 'FFFFFF' };
  headerBand(s, 'Hearts and Minds  ·  ' + p.name + "'s journey  ·  the outcome", p.outcome_eyebrow, acc);
  s.addText(p.outcome_title, { x: 0.5, y: 1.25, w: W - 1.0, h: 0.9, fontFace: FONT, fontSize: 22, bold: true, color: NAVY, valign: 'top', margin: 0, fit: 'shrink' });
  const oH = Math.min(2.2, hFor(plain(p.outcome_body), 12, W - 1.0, 0.1));
  s.addText(runs(p.outcome_body, { fontFace: FONT, fontSize: 12, color: DARK }), { x: 0.5, y: 2.2, w: W - 1.0, h: oH, valign: 'top', margin: 0, fit: 'shrink' });
  const my = 2.2 + oH + 0.3, needH = 0.55 + p.money.reduce((a, para) => a + hFor(plain(para), 11.5, W - 1.6, 0.12), 0) + 0.6, mh = Math.min(H - 0.62 - my, Math.max(1.9, needH));
  s.addShape('roundRect', { x: 0.5, y: my, w: W - 1.0, h: mh, rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: 'DDE3E8', width: 0.75 } });
  s.addShape('rect', { x: 0.5, y: my, w: W - 1.0, h: 0.08, fill: { color: GREEN }, line: { color: GREEN } });
  s.addText('THE MONEY IN THIS STORY', { x: 0.8, y: my + 0.2, w: 6, h: 0.3, fontFace: FONT, fontSize: 9.5, bold: true, color: GREEN, charSpacing: 2, margin: 0 });
  const moneyRuns = []; p.money.forEach((para, i) => { runs(para, { fontFace: FONT, fontSize: 11.5, color: GREY }).forEach(r => moneyRuns.push(r)); if (i < p.money.length - 1) moneyRuns.push({ text: '', options: { breakLine: true, fontSize: 6 } }); });
  s.addText(moneyRuns, { x: 0.8, y: my + 0.55, w: W - 1.6, h: mh - 1.05, valign: 'top', margin: 0, fit: 'shrink', paraSpaceAfter: 6 });
  s.addText('Commercial positions are agreed in principle and remain subject to the live procurement. See the Money Loop and How Commissioners Buy pages of the operating model.', { x: 0.8, y: my + mh - 0.45, w: W - 1.6, h: 0.35, fontFace: FONT, fontSize: 8.5, italic: true, color: MID, margin: 0 });
  footer(s, p.name + '  ·  Hearts and Minds', pageNo, false);
}

// ---------- per-persona decks
const STAMP = '260905';
(async () => {
  for (const p of data) {
    const pptx = new pptxgen(); pptx.layout = 'LAYOUT_WIDE'; pptx.author = 'HomeTest Programme'; pptx.company = 'NHS England'; pptx.title = p.name + "'s story: HomeTest Hearts and Minds";
    titleSlide(pptx, p, 'Hearts and Minds  ·  HomeTest Operating Model  ·  ' + p.group + ' journey');
    let n = 2; glanceSlide(pptx, p, n++);
    for (const st of p.stages) stageSlide(pptx, p, st, n++);
    outcomeSlide(pptx, p, n++);
    const f = `${OUT}/HomeTest Hearts and Minds - ${p.name} ${STAMP}.pptx`; await pptx.writeFile({ fileName: f }); console.log('wrote', f.split('/').pop(), n - 1, 'slides');
  }
  // ---------- overview deck
  const pptx = new pptxgen(); pptx.layout = 'LAYOUT_WIDE'; pptx.title = 'HomeTest Hearts and Minds: the cast';
  const s = pptx.addSlide(); s.background = { color: NAVY };
  s.addImage({ path: LOGO, x: W - 1.75, y: 0.4, w: 1.25, h: 0.51 });
  s.addText('HEARTS AND MINDS  ·  HOMETEST OPERATING MODEL', { x: 0.7, y: 0.55, w: 9, h: 0.3, fontFace: FONT, fontSize: 10.5, bold: true, color: SKY, charSpacing: 3, margin: 0 });
  s.addShape('rect', { x: 0.7, y: 1.0, w: 0.9, h: 0.06, fill: { color: AMBER }, line: { color: AMBER } });
  s.addText('Twelve people.\nOne operating model.', { x: 0.7, y: 1.2, w: 9, h: 2.2, fontFace: FONT, fontSize: 48, bold: true, color: 'FFFFFF', margin: 0 });
  s.addText('Each journey tells the story of one person the HomeTest operating model has to work for: five patients, four commissioners, two clinicians and one supplier. The same platform, the same accredited register and the same commercial mechanics, seen from twelve seats. Every journey has its own deck; this one introduces the cast and gives each journey at a glance.', { x: 0.7, y: 3.6, w: 8.6, h: 1.6, fontFace: FONT, fontSize: 13, color: 'DCE7F0', valign: 'top', margin: 0 });
  // cast portraits row
  data.forEach((p, i) => { const d = 0.78, x = 0.7 + i * 1.0; portrait(s, p, x, 5.35, d, paletteFor(p).ring); s.addText(p.name, { x: x - 0.15, y: 6.2, w: d + 0.3, h: 0.25, fontFace: FONT, fontSize: 8.5, bold: true, color: 'FFFFFF', align: 'center', margin: 0 }); });
  footer(s, 'HomeTest Operating Model  ·  Hearts and Minds', null, true);
  // cast slides, 6 per slide
  const groups = ['Patient', 'Commissioner', 'Clinician', 'Supplier'];
  const ordered = groups.flatMap(g => data.filter(p => p.group === g));
  let pageNo = 2;
  for (let k = 0; k < ordered.length; k += 6) {
    const sl = pptx.addSlide(); sl.background = { color: 'FFFFFF' }; headerBand(sl, 'Hearts and Minds  ·  the cast', k === 0 ? 'The patients and the first commissioners' : 'The commissioners, the clinicians and the supplier', AMBER);
    ordered.slice(k, k + 6).forEach((p, i) => {
      const col = i % 3, row = Math.floor(i / 3), cw = (W - 1.0 - 0.5) / 3, ch = 2.55, x = 0.5 + col * (cw + 0.25), y = 1.3 + row * (ch + 0.25), { acc, ring } = paletteFor(p);
      sl.addShape('roundRect', { x, y, w: cw, h: ch, rectRadius: 0.1, fill: { color: LIGHT }, line: { color: 'DDE3E8', width: 0.75 } });
      sl.addShape('rect', { x, y, w: cw, h: 0.07, fill: { color: acc }, line: { color: acc } });
      portrait(sl, p, x + 0.2, y + 0.3, 1.0, ring);
      sl.addText(p.name, { x: x + 1.4, y: y + 0.25, w: cw - 1.6, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: NAVY, margin: 0 });
      sl.addText(p.role, { x: x + 1.4, y: y + 0.65, w: cw - 1.6, h: 0.55, fontFace: FONT, fontSize: 9.5, color: acc === AMBER ? '8A6D1F' : acc, bold: true, valign: 'top', margin: 0, fit: 'shrink' });
      sl.addText(plain(p.hero_title).replace(/\n/g, ' '), { x: x + 0.2, y: y + 1.4, w: cw - 0.4, h: 0.5, fontFace: FONT, fontSize: 11, bold: true, color: DARK, valign: 'top', margin: 0, fit: 'shrink' });
      sl.addText(p.hero_eyebrow, { x: x + 0.2, y: y + 1.9, w: cw - 0.4, h: 0.55, fontFace: FONT, fontSize: 9, color: GREY, valign: 'top', margin: 0, fit: 'shrink' });
    });
    footer(sl, 'The cast  ·  Hearts and Minds', pageNo++, false);
  }
  for (const p of ordered) glanceSlide(pptx, p, pageNo++);
  const f = `${OUT}/HomeTest Hearts and Minds - Overview ${STAMP}.pptx`; await pptx.writeFile({ fileName: f }); console.log('wrote', f.split('/').pop(), pageNo - 1, 'slides');
})().catch(e => { console.error(e); process.exit(1); });

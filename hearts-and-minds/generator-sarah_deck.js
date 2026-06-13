const pptxgen = require("/tmp/node_modules/pptxgenjs");
const ECO = "/sessions/ecstatic-hopeful-clarke/mnt/NHS/dtx-ecosystem/";
const IMG = ECO + "operating-model/img/";
const PER = ECO + "assets/personas/";
const SEAN = ECO + "assets/sean story/";

const NAVY = "003087", BLUE = "005EB8", AMBER = "FFB91D", AMBERD = "9A6700",
      GREEN = "006747", VIOLET = "4527A0", VIOLETD = "2E1A5E",
      INK = "212B32", SEC = "4C6272", MUTED = "7E8B97", CREAM = "FFF9EC",
      BG = "F8FAFC", CARD = "FFFFFF", BORD = "E3E9F0";
const HF = "Trebuchet MS", BF = "Calibri";
const sh = () => ({ type: "outer", color: "0A1F3C", blur: 9, offset: 3, angle: 135, opacity: 0.18 });

let p = new pptxgen();
p.layout = "LAYOUT_16x9";
p.author = "HomeTest Commercial";
p.title = "Hearts and Minds - Commissioner deck No.1 (Sarah) - HomeTest";

function eyebrow(s, txt, color, x, y, w) {
  s.addText(txt, { x, y, w, h: 0.3, fontFace: HF, fontSize: 10.5, bold: true, color, charSpacing: 3, margin: 0 });
}
function foot(s, dark) {
  s.addText("Hearts and Minds · audience deck No.1 · Commissioner edition · proof-of-concept draft ⚑ · June 2026",
    { x: 0.5, y: 5.32, w: 9, h: 0.25, fontFace: BF, fontSize: 8, color: dark ? "9FB6D9" : MUTED, margin: 0 });
}

// ============ S1 TITLE ============
let s = p.addSlide();
s.background = { color: NAVY };
s.addImage({ path: IMG + "Sarah hero.png", x: 5.9, y: 0, w: 4.1, h: 5.625, sizing: { type: "cover", w: 4.1, h: 5.625 } });
s.addShape(p.shapes.RECTANGLE, { x: 5.7, y: 0, w: 0.2, h: 5.625, fill: { color: AMBER } });
eyebrow(s, "HEARTS AND MINDS · COMMISSIONER EDITION · No.1", AMBER, 0.55, 0.65, 5);
s.addText("Testing that finds the people your clinics can’t.", { x: 0.5, y: 1.15, w: 5.0, h: 1.95, fontFace: HF, fontSize: 34, bold: true, color: "FFFFFF", lineSpacing: 40 });
s.addText("HomeTest: patient-centric micro-sampling, at scale. 24/7 access through the NHS App — for the populations you commission for.", { x: 0.55, y: 3.25, w: 4.7, h: 0.85, fontFace: BF, fontSize: 14.5, color: "CFE0F5", margin: 0 });
s.addText([{ text: "Live today: ", options: { bold: true, color: AMBER } }, { text: "patient-initiated HIV testing through the NHS App, in Beta with two local authorities." }],
  { x: 0.55, y: 4.25, w: 4.7, h: 0.65, fontFace: BF, fontSize: 12.5, color: "E8F0FA", margin: 0 });
foot(s, true);
s.addNotes("Open on the promise, not the product. The one-line truth: clinic-based testing only reaches people who can get to clinics; this service reaches the rest, and it is live now, not a vision. Two LA areas in Beta gives instant credibility.");

// ============ S2 SARAH MIRROR ============
s = p.addSlide(); s.background = { color: BG };
s.addText("We build around people. Start with someone in your seat.", { x: 0.5, y: 0.45, w: 9, h: 0.65, fontFace: HF, fontSize: 26, bold: true, color: NAVY, margin: 0 });
s.addImage({ path: PER + "sarah.png", x: 0.7, y: 1.45, w: 1.7, h: 1.7, rounding: true });
s.addText("Sarah", { x: 0.55, y: 3.25, w: 2.0, h: 0.35, fontFace: HF, fontSize: 16, bold: true, color: NAVY, align: "center" });
s.addText("LA sexual health commissioner", { x: 0.4, y: 3.58, w: 2.3, h: 0.5, fontFace: BF, fontSize: 10.5, color: SEC, align: "center" });
s.addShape(p.shapes.RECTANGLE, { x: 2.9, y: 1.45, w: 6.5, h: 1.85, fill: { color: CREAM }, line: { color: AMBER, width: 1.25 }, shadow: sh() });
s.addText("“I need these services to save my budget, not strain it. Give me ready-made templates and a clear route to buy. I haven’t got the headcount to bespoke this for every supplier or every product.”",
  { x: 3.15, y: 1.6, w: 6.0, h: 1.55, fontFace: BF, fontSize: 14, italic: true, color: INK, valign: "middle", margin: 0 });
s.addText([
  { text: "Every service in this programme is designed around named people — the patients it must reach and the person who has to buy it. ", options: {} },
  { text: "Three of them carry today’s story.", options: { bold: true, color: NAVY } }
], { x: 2.9, y: 3.55, w: 6.5, h: 0.62, fontFace: BF, fontSize: 12.5, color: SEC, margin: 0 });
const trio = [["Sarah", "the buyer", PER + "sarah.png", BLUE], ["Sean", "the patient the system fails", PER + "sean.png", VIOLET], ["Errol", "where it all goes", IMG + "errol-portrait.png", GREEN]];
trio.forEach(([n, r, img, c], i) => {
  const x = 2.9 + i * 2.25;
  s.addImage({ path: img, x: x, y: 4.32, w: 0.62, h: 0.62, rounding: true });
  s.addText(n, { x: x + 0.7, y: 4.34, w: 1.55, h: 0.28, fontFace: HF, fontSize: 12, bold: true, color: c, margin: 0 });
  s.addText(r, { x: x + 0.7, y: 4.6, w: 1.55, h: 0.42, fontFace: BF, fontSize: 9, color: SEC, margin: 0 });
});
foot(s);
s.addNotes("The Hearts and Minds conceit, stated openly: we design around named people. Sarah IS the audience - acknowledge it with a smile; the quote usually lands because it is verbatim what commissioners say. Introduce the weave: Sean and Errol will return.");

// ============ S3 THE PROBLEM ============
s = p.addSlide(); s.background = { color: BG };
s.addText("The people testing misses are the people you most need to reach.", { x: 0.5, y: 0.45, w: 9, h: 0.95, fontFace: HF, fontSize: 25, bold: true, color: NAVY, margin: 0 });
s.addText([
  { text: "Clinic-hours testing reaches the people who can attend clinics. It quietly misses:", options: { breakLine: true } },
], { x: 0.55, y: 1.6, w: 5.3, h: 0.5, fontFace: BF, fontSize: 13.5, color: INK, margin: 0 });
const misses = [
  ["The time-poor", "Shift workers and single parents for whom a clinic slot costs half a day’s income. The bloods slip — not from neglect, from arithmetic."],
  ["The stigma-wary", "People who will do a test at their own kitchen table but will never sit in certain waiting rooms — whatever the condition."],
  ["The system-failed", "People with learning disabilities, serious mental illness, needle phobia — for whom the appointment itself is the wall."],
];
misses.forEach(([t, d], i) => {
  const y = 2.15 + i * 0.98;
  s.addShape(p.shapes.RECTANGLE, { x: 0.55, y, w: 5.3, h: 0.86, fill: { color: CARD }, line: { color: BORD, width: 0.75 }, shadow: sh() });
  s.addShape(p.shapes.RECTANGLE, { x: 0.55, y, w: 0.07, h: 0.86, fill: { color: BLUE } });
  s.addText(t, { x: 0.75, y: y + 0.07, w: 4.95, h: 0.27, fontFace: HF, fontSize: 12.5, bold: true, color: NAVY, margin: 0 });
  s.addText(d, { x: 0.75, y: y + 0.33, w: 4.95, h: 0.5, fontFace: BF, fontSize: 10, color: SEC, margin: 0 });
});
s.addShape(p.shapes.RECTANGLE, { x: 6.25, y: 1.6, w: 3.25, h: 3.5, fill: { color: NAVY }, shadow: sh() });
s.addText("DNA", { x: 6.25, y: 1.95, w: 3.25, h: 0.85, fontFace: HF, fontSize: 48, bold: true, color: AMBER, align: "center", margin: 0 });
s.addText("≠ disengaged", { x: 6.25, y: 2.8, w: 3.25, h: 0.5, fontFace: HF, fontSize: 22, bold: true, color: "FFFFFF", align: "center", margin: 0 });
s.addText("A “did not attend” code cannot tell would not from could not — and the could-nots are exactly who late diagnosis finds.", { x: 6.5, y: 3.5, w: 2.75, h: 1.3, fontFace: BF, fontSize: 11.5, color: "CFE0F5", align: "center", margin: 0 });
foot(s);
s.addNotes("Do not invent local statistics - invite hers. Ask: where do your late diagnoses come from? The answer is almost always the three groups on the left. The DNA card reframes non-attendance as system failure rather than patient failure - this is the deck's moral pivot and sets up Sean.");


// ============ S4A THE DEMAND WALL ============
s = p.addSlide(); s.background = { color: BG };
s.addText("The system you are buying against is running out of road.", { x: 0.5, y: 0.45, w: 9, h: 0.65, fontFace: HF, fontSize: 25, bold: true, color: NAVY, margin: 0 });
s.addText("1.25bn", { x: 0.55, y: 1.25, w: 3.4, h: 0.95, fontFace: HF, fontSize: 54, bold: true, color: NAVY, margin: 0 });
s.addText("NHS pathology test requests projected for 2025/26 — growing 5.5% every year. Phlebotomy services are under major strain, and every routine draw still assumes a building, a rota and a patient who can attend.", { x: 0.55, y: 2.25, w: 3.6, h: 1.6, fontFace: BF, fontSize: 12.5, color: SEC, margin: 0 });
const bars = [["2013/14", "730m", 730], ["2021/22", "1.12bn", 1120], ["2025/26", "1.25bn", 1250]];
bars.forEach(([yr, label, v], i) => {
  const h = (v / 1250) * 2.3, x = 4.7 + i * 1.55;
  s.addShape(p.shapes.RECTANGLE, { x, y: 3.65 - h, w: 1.1, h, fill: { color: i === 2 ? NAVY : "7FA8D9" } });
  s.addText(label, { x: x - 0.2, y: 3.65 - h - 0.36, w: 1.5, h: 0.3, fontFace: HF, fontSize: 13, bold: true, color: NAVY, align: "center", margin: 0 });
  s.addText(yr, { x: x - 0.2, y: 3.72, w: 1.5, h: 0.28, fontFace: BF, fontSize: 10, color: MUTED, align: "center", margin: 0 });
});
s.addText("TEST REQUESTS P.A.", { x: 4.7, y: 0.78, w: 2.2, h: 0.26, fontFace: HF, fontSize: 9.5, bold: true, color: MUTED, charSpacing: 2, margin: 0 });
s.addShape(p.shapes.RECTANGLE, { x: 0.55, y: 4.25, w: 8.95, h: 0.85, fill: { color: CREAM }, line: { color: AMBER, width: 1 } });
s.addText([{ text: "\u201cThe NHS App will transform how patients access care online and offline, 24 hours a day, and help people manage their own health as easily as they bank or shop online.\u201d ", options: { italic: true } }, { text: " \u2014 10 Year Health Plan for England, July 2025", options: { bold: true, color: AMBERD } }],
  { x: 0.8, y: 4.35, w: 8.45, h: 0.65, fontFace: BF, fontSize: 11, color: INK, valign: "middle", margin: 0 });
foot(s);
s.addNotes("National programme figures: 730m (2013/14), 1.12bn (2021/22), 1.25bn projected (2025/26), 5.5% annual growth. The point for Sarah: demand grows whether she buys or not - the question is whether the next tranche of tests needs buildings. The Plan quote anchors this as national policy direction, not vendor enthusiasm.");

// ============ S4 HOMETEST LIVE ============
s = p.addSlide(); s.background = { color: BG };
s.addImage({ path: SEAN + "sean-stage4.png", x: 6.15, y: 0, w: 3.85, h: 5.625, sizing: { type: "cover", w: 3.85, h: 5.625 } });
s.addShape(p.shapes.RECTANGLE, { x: 5.95, y: 0, w: 0.2, h: 5.625, fill: { color: AMBER } });
eyebrow(s, "HOMETEST · THE SERVICE", AMBERD, 0.55, 0.5, 5);
s.addText("Tests that come to the patient, not the other way round.", { x: 0.5, y: 0.85, w: 5.3, h: 1.15, fontFace: HF, fontSize: 25, bold: true, color: NAVY, margin: 0 });
s.addText("Kit through the door → sample to an accredited lab → result into the record, with the care pathway attached. Ordered by the patient, their clinician or their GP — one platform serving all three patterns.",
  { x: 0.55, y: 2.1, w: 5.1, h: 1.05, fontFace: BF, fontSize: 13, color: INK, margin: 0 });
const chips4 = [["Live now", "patient-initiated HIV testing through the NHS App, in Beta with two local authorities — the proof the platform works"],
                ["Coming through", "clinician-initiated PSA surveillance (prospective) and GP-initiated anaemia monitoring (in design) on the same rails"],
                ["Clinically wrapped", "UKAS-accredited labs, clinical safety case, IG executed before go-live — carried by the platform, every pathway"]];
chips4.forEach(([t, d], i) => {
  const y = 3.25 + i * 0.68;
  s.addShape(p.shapes.OVAL, { x: 0.55, y: y + 0.06, w: 0.16, h: 0.16, fill: { color: AMBER } });
  s.addText([{ text: t + " — ", options: { bold: true, color: NAVY } }, { text: d }],
    { x: 0.85, y, w: 4.85, h: 0.62, fontFace: BF, fontSize: 11, color: SEC, margin: 0 });
});
foot(s);
s.addNotes("The image is deliberate: a kit being handed over a real front door. HomeTest is the platform; HIV is the live proof, PSA surveillance and anaemia monitoring follow on the same rails. If asked which areas: two LA areas in the HIV Beta, happy to arrange a conversation with them.");

// ============ S5 THE JOURNEY ============
s = p.addSlide(); s.background = { color: BG };
s.addText("Five steps. One wrapper. Nothing for your team to assemble.", { x: 0.5, y: 0.45, w: 9, h: 0.65, fontFace: HF, fontSize: 25, bold: true, color: NAVY, margin: 0 });
const steps = [["1", "Ordered", "in the NHS App"], ["2", "Kit arrives", "through the door"], ["3", "Sample back", "by post"], ["4", "Lab reports", "UKAS-accredited"], ["5", "Result + care", "pathway attached"]];
steps.forEach(([n, t, d], i) => {
  const x = 0.55 + i * 1.85;
  s.addShape(p.shapes.OVAL, { x: x + 0.5, y: 1.45, w: 0.7, h: 0.7, fill: { color: NAVY }, shadow: sh() });
  s.addText(n, { x: x + 0.5, y: 1.45, w: 0.7, h: 0.7, fontFace: HF, fontSize: 22, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
  s.addText(t, { x: x - 0.05, y: 2.3, w: 1.8, h: 0.3, fontFace: HF, fontSize: 13, bold: true, color: NAVY, align: "center", margin: 0 });
  s.addText(d, { x: x - 0.05, y: 2.58, w: 1.8, h: 0.3, fontFace: BF, fontSize: 10, color: SEC, align: "center", margin: 0 });
  if (i < 4) s.addText("→", { x: x + 1.38, y: 1.55, w: 0.5, h: 0.5, fontFace: HF, fontSize: 20, bold: true, color: AMBER, align: "center", margin: 0 });
});
s.addShape(p.shapes.RECTANGLE, { x: 0.55, y: 3.15, w: 9.0, h: 0.95, fill: { color: CARD }, line: { color: BORD, width: 0.75 }, shadow: sh() });
s.addShape(p.shapes.RECTANGLE, { x: 0.55, y: 3.15, w: 0.07, h: 0.95, fill: { color: GREEN } });
s.addText([{ text: "The wrapper carries the hard part. ", options: { bold: true, color: GREEN } },
  { text: "Clinical safety (DCB0129/0160), information governance (DPIA, DSA, DPA executed before go-live) and the assurance gateway travel with the service — your team inherits them, it doesn’t build them." }],
  { x: 0.8, y: 3.27, w: 8.6, h: 0.75, fontFace: BF, fontSize: 12, color: SEC, valign: "middle", margin: 0 });
s.addShape(p.shapes.RECTANGLE, { x: 0.55, y: 4.3, w: 9.0, h: 0.8, fill: { color: "EAF2FB" }, line: { color: BLUE, width: 1 } });
s.addText([{ text: "Patient route choice preserved.  ", options: { bold: true, color: BLUE, fontSize: 13 } },
  { text: "Clinic routes stay open. This adds a front door; it closes none.", options: { color: SEC } }],
  { x: 0.8, y: 4.42, w: 8.6, h: 0.58, fontFace: BF, fontSize: 12, valign: "middle", margin: 0 });
foot(s);
s.addNotes("The wrapper line answers her quote from slide 2 - templates, not bespoke work. The choice banner pre-empts the equity objection: nobody is forced online; this widens access rather than narrowing it. That sentence matters to elected members.");


// ============ S5A UNIT ECONOMICS ============
s = p.addSlide(); s.background = { color: BG };
s.addText("You pay for completed tests. Not for buildings, rotas or empty slots.", { x: 0.5, y: 0.45, w: 9, h: 0.95, fontFace: HF, fontSize: 24, bold: true, color: NAVY, margin: 0 });
const econ = [
 ["Per completed test", "The live commercial pattern: payment follows a returned, lab-reported result. Activity you fund is activity that happened.", GREEN],
 ["The DNA asymmetry", "A missed appointment still costs the slot, the room and the rota. An unreturned kit doesn\u2019t burn a clinic minute \u2014 and the reminder to return it costs a message, not a booking.", GREEN],
 ["Zero estate", "Volume scales with kit-and-post logistics and lab capacity \u2014 not with waiting rooms. The next thousand tests need no building.", BLUE],
 ["Aggregated demand", "A national catalogue of quality-assured kits, comparable by price, with tiered pricing \u2014 every commissioner\u2019s volume pushes every commissioner\u2019s unit cost down.", BLUE],
];
econ.forEach(([t, d, c], i) => {
  const x = 0.55 + (i % 2) * 4.6, y = 1.55 + Math.floor(i / 2) * 1.72;
  s.addShape(p.shapes.RECTANGLE, { x, y, w: 4.35, h: 1.52, fill: { color: CARD }, line: { color: BORD, width: 0.75 }, shadow: sh() });
  s.addShape(p.shapes.RECTANGLE, { x, y, w: 0.09, h: 1.52, fill: { color: c } });
  s.addText(t, { x: x + 0.25, y: y + 0.12, w: 3.95, h: 0.38, fontFace: HF, fontSize: 16, bold: true, color: c, margin: 0 });
  s.addText(d, { x: x + 0.25, y: y + 0.52, w: 3.95, h: 0.92, fontFace: BF, fontSize: 10.5, color: SEC, margin: 0 });
});
s.addText("The Beta areas are generating the sexual-health unit economics now \u2014 early partners see them first.", { x: 0.55, y: 5.0, w: 9, h: 0.35, fontFace: BF, fontSize: 11.5, italic: true, color: GREEN, margin: 0 });
foot(s);
s.addNotes("This is the slide a finance colleague will photograph. Per-completed-test is how the live service is actually bought - not a proposal. The DNA asymmetry is the structural saving: her DNA rate currently buys empty rooms. Do not quote unit prices - the catalogue and Beta evidence carry that conversation later.");

// ============ S5B EFFICIENCY LEDGER ============
s = p.addSlide(); s.background = { color: BG };
s.addText("What stops costing you money.", { x: 0.5, y: 0.45, w: 9, h: 0.6, fontFace: HF, fontSize: 26, bold: true, color: NAVY, margin: 0 });
const ledger = [
 ["Procurement months", "One call-off on national terms replaces a locally designed procurement \u2014 and the headcount it consumes."],
 ["Duplicated assurance", "DPIA, DSA, clinical safety case and accreditation are carried once, nationally \u2014 not rebuilt by every commissioner, every time."],
 ["Routine phlebotomy slots", "Tests that never needed a building move to kit-and-post; clinic capacity returns to treatment and complex care."],
 ["DNA waste", "The could-not-attends stop costing empty rooms and start returning samples."],
];
ledger.forEach(([t, d], i) => {
  const y = 1.3 + i * 0.78;
  s.addShape(p.shapes.RECTANGLE, { x: 0.55, y, w: 6.0, h: 0.68, fill: { color: CARD }, line: { color: BORD, width: 0.75 }, shadow: sh() });
  s.addText("\u2212", { x: 0.7, y: y + 0.08, w: 0.4, h: 0.5, fontFace: HF, fontSize: 24, bold: true, color: GREEN, margin: 0 });
  s.addText([{ text: t + " \u2014 ", options: { bold: true, color: NAVY } }, { text: d }],
    { x: 1.15, y: y + 0.07, w: 5.3, h: 0.56, fontFace: BF, fontSize: 10, color: SEC, valign: "middle", margin: 0 });
});
s.addShape(p.shapes.RECTANGLE, { x: 6.85, y: 1.3, w: 2.65, h: 3.02, fill: { color: GREEN }, shadow: sh() });
s.addText("4\u20136", { x: 6.85, y: 1.6, w: 2.65, h: 0.85, fontFace: HF, fontSize: 44, bold: true, color: "FFFFFF", align: "center", margin: 0 });
s.addText("appointments saved per patient, per year", { x: 7.0, y: 2.5, w: 2.35, h: 0.6, fontFace: HF, fontSize: 12, bold: true, color: "D7F0E4", align: "center", margin: 0 });
s.addText("up to 6\u20138 on a fully digital journey \u2014 national home-first journey modelling. Lower delivery cost, lower CO\u2082, services working people can actually use.", { x: 7.0, y: 3.15, w: 2.35, h: 1.1, fontFace: BF, fontSize: 9.5, color: "D7F0E4", align: "center", margin: 0 });
s.addText("Structural savings first, cashable savings as volume moves \u2014 the ledger compounds with every pathway added.", { x: 0.55, y: 4.55, w: 6.0, h: 0.55, fontFace: BF, fontSize: 11.5, italic: true, color: NAVY, margin: 0 });
foot(s);
s.addNotes("Four structural lines plus the journey arithmetic. Be honest about cashable vs structural: capacity returned is real but realising cash needs pathway volume - which is exactly what the defined starter cohort in the close is for.");

// ============ S6 SEAN ============
s = p.addSlide(); s.background = { color: "F4F0FC" };
s.addImage({ path: SEAN + "sean-stage3.png", x: 0, y: 0, w: 3.85, h: 5.625, sizing: { type: "cover", w: 3.85, h: 5.625 } });
s.addShape(p.shapes.RECTANGLE, { x: 3.85, y: 0, w: 0.2, h: 5.625, fill: { color: VIOLET } });
eyebrow(s, "A REAL STORY, TOLD WITH HIS FAMILY’S BLESSING", VIOLET, 4.35, 0.5, 5.2);
s.addText("Sean, 46. The test was never the hard part. Everything before it was.", { x: 4.3, y: 0.85, w: 5.25, h: 1.3, fontFace: HF, fontSize: 22, bold: true, color: VIOLETD, margin: 0 });
s.addText("Sean has a learning disability; he is autistic and lives with OCD. For him the walls were attending (the journey, the waiting room, the strangers), understanding (advice at speed, nothing to take away in a form that works) and committing (the gap between agreeing in a room and a test actually happening). The system recorded each wall as his failure.",
  { x: 4.35, y: 2.2, w: 5.15, h: 1.55, fontFace: BF, fontSize: 12, color: INK, margin: 0 });
s.addText("The test that comes home changes all three: his own table, easy-read instructions, someone he trusts beside him.", { x: 4.35, y: 3.78, w: 5.15, h: 0.7, fontFace: BF, fontSize: 12, bold: true, color: VIOLET, margin: 0 });
s.addShape(p.shapes.RECTANGLE, { x: 4.35, y: 4.55, w: 5.15, h: 0.62, fill: { color: VIOLETD } });
s.addText("A journey designed so Sean can complete it is a calmer, clearer journey for every resident you serve.", { x: 4.55, y: 4.6, w: 4.8, h: 0.52, fontFace: BF, fontSize: 10.5, bold: true, color: "FFFFFF", valign: "middle", margin: 0 });
s.addText("Hearts and Minds \u00b7 audience deck No.1 \u00b7 proof-of-concept draft \u2691 \u00b7 June 2026", { x: 4.35, y: 5.32, w: 5.15, h: 0.25, fontFace: BF, fontSize: 8, color: MUTED, margin: 0 });
s.addNotes("Slow down here. Sean is real - a family member of someone on the programme, shared with their blessing. He is the answer to slide 3's DNA card. The curb-cut close is the policy point: inclusive design is not a side-quest, it is how the whole service gets better. This slide is why the deck is called Hearts and Minds.");

// ============ S7 BENEFITS ============
s = p.addSlide(); s.background = { color: BG };
s.addText("What this buys you.", { x: 0.5, y: 0.45, w: 9, h: 0.6, fontFace: HF, fontSize: 26, bold: true, color: NAVY, margin: 0 });
const bens = [["Reach", "Testing for the residents your clinics never see — the time-poor, the stigma-wary, the system-failed.", GREEN],
  ["Capacity", "Clinic and phlebotomy time concentrates on treatment and complex care — not routine bloods that never needed a building.", GREEN],
  ["−1 visit", "Per completed test: the journey that didn’t need a building, parking, or a waiting room.", GREEN],
  ["One wrapper", "Assurance, IG and clinical safety pre-carried. Templates, not bespoke work — budget saved, not strained.", BLUE]];
bens.forEach(([t, d, c], i) => {
  const x = 0.55 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.62;
  s.addShape(p.shapes.RECTANGLE, { x, y, w: 4.35, h: 1.42, fill: { color: CARD }, line: { color: BORD, width: 0.75 }, shadow: sh() });
  s.addShape(p.shapes.RECTANGLE, { x, y, w: 0.09, h: 1.42, fill: { color: c } });
  s.addText(t, { x: x + 0.25, y: y + 0.12, w: 3.95, h: 0.45, fontFace: HF, fontSize: 21, bold: true, color: c, margin: 0 });
  s.addText(d, { x: x + 0.25, y: y + 0.6, w: 3.95, h: 0.72, fontFace: BF, fontSize: 11, color: SEC, margin: 0 });
});
s.addText("“Save my budget, not strain it.” — that was the brief. This is the answer.", { x: 0.55, y: 4.62, w: 9, h: 0.4, fontFace: BF, fontSize: 13, italic: true, color: NAVY, margin: 0 });
foot(s);
s.addNotes("Keep claims qualitative and structural - the Beta exists to generate her numbers. If pressed for figures, the honest line: the Beta areas are measuring uptake and clinic displacement now, and we will share what they find.");

// ============ S8 ALONGSIDE ============
s = p.addSlide(); s.background = { color: BG };
eyebrow(s, "PROVIDED ALONGSIDE \u00b7 SAME RAILS, SAME WRAPPER, SAME RECORD", AMBERD, 0.55, 0.5, 8);
s.addText("HomeTest is the front door. Two sister services follow it.", { x: 0.5, y: 0.85, w: 9, h: 0.65, fontFace: HF, fontSize: 24, bold: true, color: NAVY, margin: 0 });
s.addShape(p.shapes.RECTANGLE, { x: 0.55, y: 1.7, w: 4.35, h: 2.75, fill: { color: CARD }, line: { color: BORD, width: 0.75 }, shadow: sh() });
s.addShape(p.shapes.RECTANGLE, { x: 0.55, y: 1.7, w: 4.35, h: 0.09, fill: { color: GREEN } });
s.addText("HealthStore", { x: 0.8, y: 1.85, w: 3.9, h: 0.4, fontFace: HF, fontSize: 18, bold: true, color: GREEN, margin: 0 });
s.addText("NHS-assured digital therapeutics, prescribed like medication \u2014 in COPD Alpha now. Published real-world results: 19% fewer GP appointments (COPD), 70% reduction in anxiety symptoms (digital sleep therapy), 40% fewer non-elective admissions under remote monitoring.", { x: 0.8, y: 2.3, w: 3.9, h: 1.7, fontFace: BF, fontSize: 10.5, color: SEC, margin: 0 });
s.addText("Sources: published RWE and trial data; ICB internal evaluation.", { x: 0.8, y: 4.05, w: 3.9, h: 0.3, fontFace: BF, fontSize: 8, color: MUTED, margin: 0 });
s.addShape(p.shapes.RECTANGLE, { x: 5.15, y: 1.7, w: 4.35, h: 2.75, fill: { color: CARD }, line: { color: BORD, width: 0.75 }, shadow: sh() });
s.addShape(p.shapes.RECTANGLE, { x: 5.15, y: 1.7, w: 4.35, h: 0.09, fill: { color: BLUE } });
s.addText("HealthSync", { x: 5.4, y: 1.85, w: 3.9, h: 0.4, fontFace: HF, fontSize: 18, bold: true, color: BLUE, margin: 0 });
s.addText("Consumer wearable and device data flowing into the NHS record with consent \u2014 monitoring between appointments instead of by appointment. In design; first configuration being shaped now.", { x: 5.4, y: 2.3, w: 3.9, h: 1.4, fontFace: BF, fontSize: 10.5, color: SEC, margin: 0 });
s.addText("Why it matters to a HomeTest buyer: the test tells you about a moment; the streams cover the months in between.", { x: 5.4, y: 3.7, w: 3.9, h: 0.65, fontFace: BF, fontSize: 10, italic: true, color: NAVY, margin: 0 });
s.addText("Nothing here changes the HomeTest decision \u2014 it compounds it. One front door, growing.", { x: 0.55, y: 4.7, w: 9, h: 0.4, fontFace: BF, fontSize: 12, bold: true, color: NAVY, margin: 0 });
foot(s);
s.addNotes("One slide, deliberately. This is a HomeTest pitch; the sisters exist to show the front door grows in value after she buys. The DTx stats are cited as in the national exec deck. Do not let the meeting drift here - Errol carries the destination emotionally on the next slide.");

// ============ S10 ERROL ============
s = p.addSlide(); s.background = { color: NAVY };
s.addImage({ path: IMG + "errol-hero.png", x: 6.0, y: 0, w: 4.0, h: 5.625, sizing: { type: "cover", w: 4.0, h: 5.625 } });
s.addShape(p.shapes.RECTANGLE, { x: 5.8, y: 0, w: 0.2, h: 5.625, fill: { color: AMBER } });
eyebrow(s, "WHERE IT ALL GOES · ONE STORY ACROSS ALL THREE", AMBER, 0.55, 0.5, 5.1);
s.addText("Errol. Intervention before crisis.", { x: 0.5, y: 0.9, w: 5.2, h: 1.0, fontFace: HF, fontSize: 27, bold: true, color: "FFFFFF", margin: 0 });
s.addText("His wearable flags the change weeks before the clinical event would have announced itself. The home diagnostic confirms it. The therapeutic supports the response.",
  { x: 0.55, y: 2.0, w: 5.05, h: 1.0, fontFace: BF, fontSize: 13, color: "E8F0FA", margin: 0 });
const streams = [["HealthSync", "the signal", "saw it coming"], ["HomeTest", "the diagnostic", "confirmed it at home"], ["HealthStore", "the therapeutic", "carried the response"]];
streams.forEach(([n, r, d], i) => {
  const y = 3.1 + i * 0.62;
  s.addShape(p.shapes.OVAL, { x: 0.55, y: y + 0.07, w: 0.14, h: 0.14, fill: { color: AMBER } });
  s.addText([{ text: n + " ", options: { bold: true, color: AMBER } }, { text: "— " + r + ", " + d }],
    { x: 0.82, y, w: 4.8, h: 0.5, fontFace: BF, fontSize: 12.5, color: "FFFFFF", margin: 0 });
});
s.addText("Three signal streams. One record. Clinical time freed for the patients who genuinely need to be in the room.",
  { x: 0.55, y: 4.95, w: 5.05, h: 0.55, fontFace: BF, fontSize: 11.5, bold: true, italic: true, color: "CFE0F5", margin: 0 });
s.addNotes("Errol is the category-4 story - the destination that makes the family coherent. Tell it in one breath: signal, test, treatment, no crisis. Then the kicker for a commissioner: every Errol is an admission that never happened.");

// ============ S11 EASY BUYING ============
s = p.addSlide(); s.background = { color: BG };
s.addText("And the buying is designed for your headcount, not against it.", { x: 0.5, y: 0.45, w: 9, h: 0.65, fontFace: HF, fontSize: 24, bold: true, color: NAVY, margin: 0 });
const buy = [["One front door", "configurations and suppliers pre-assured on a national catalogue"],
  ["National terms", "standard call-off templates — reviewed once by your legal and IG, not per supplier"],
  ["A call-off, not a procurement", "the integration, safety case and assurance were done before you walked in"]];
buy.forEach(([t, d], i) => {
  const y = 1.35 + i * 0.92;
  s.addShape(p.shapes.RECTANGLE, { x: 0.55, y, w: 6.1, h: 0.8, fill: { color: CARD }, line: { color: BORD, width: 0.75 }, shadow: sh() });
  s.addShape(p.shapes.RECTANGLE, { x: 0.55, y, w: 0.07, h: 0.8, fill: { color: NAVY } });
  s.addText(t, { x: 0.8, y: y + 0.08, w: 5.7, h: 0.3, fontFace: HF, fontSize: 13.5, bold: true, color: NAVY, margin: 0 });
  s.addText(d, { x: 0.8, y: y + 0.38, w: 5.7, h: 0.38, fontFace: BF, fontSize: 10.5, color: SEC, margin: 0 });
});
s.addShape(p.shapes.RECTANGLE, { x: 7.0, y: 1.35, w: 2.5, h: 2.64, fill: { color: GREEN }, shadow: sh() });
s.addText("6 wks", { x: 7.0, y: 1.7, w: 2.5, h: 0.8, fontFace: HF, fontSize: 38, bold: true, color: "FFFFFF", align: "center", margin: 0 });
s.addText("not eighteen months", { x: 7.0, y: 2.55, w: 2.5, h: 0.4, fontFace: HF, fontSize: 13, bold: true, color: "D7F0E4", align: "center", margin: 0 });
s.addText("the promise the model is built to keep", { x: 7.15, y: 3.0, w: 2.2, h: 0.7, fontFace: BF, fontSize: 10, color: "D7F0E4", align: "center", margin: 0 });
s.addText([{ text: "Status, honestly: ", options: { bold: true, color: AMBERD } },
  { text: "HIV is live in Beta today on interim arrangements; the national framework and wider catalogue build through 2026–27. Early partners shape it." }],
  { x: 0.55, y: 4.35, w: 8.95, h: 0.6, fontFace: BF, fontSize: 11.5, color: SEC, margin: 0 });
foot(s);
s.addNotes("Six weeks not eighteen months is the design target the model is built around - say it as ambition with a straight face, then the honesty line: today's route is interim arrangements that already work (the Beta proves it), and early partners get to shape the destination framework.");

// ============ S12 NEXT STEPS ============
s = p.addSlide(); s.background = { color: BG };
s.addText("What happens next.", { x: 0.5, y: 0.45, w: 9, h: 0.6, fontFace: HF, fontSize: 26, bold: true, color: NAVY, margin: 0 });
const next = [["1", "A scoping conversation", "Your population picture and testing gaps; our journey maps and Beta learning. One hour, no homework."],
  ["2", "The assurance pack", "Clinical safety case, IG framework and call-off shape — reviewed once with your legal and IG teams."],
  ["3", "A defined cohort to start", "Small, measured, reported — then expanded on evidence, not optimism."]];
next.forEach(([n, t, d], i) => {
  const x = 0.55 + i * 3.1;
  s.addShape(p.shapes.RECTANGLE, { x, y: 1.45, w: 2.85, h: 2.6, fill: { color: CARD }, line: { color: BORD, width: 0.75 }, shadow: sh() });
  s.addShape(p.shapes.OVAL, { x: x + 0.25, y: 1.7, w: 0.55, h: 0.55, fill: { color: NAVY } });
  s.addText(n, { x: x + 0.25, y: 1.7, w: 0.55, h: 0.55, fontFace: HF, fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
  s.addText(t, { x: x + 0.25, y: 2.4, w: 2.4, h: 0.6, fontFace: HF, fontSize: 14, bold: true, color: NAVY, margin: 0 });
  s.addText(d, { x: x + 0.25, y: 3.0, w: 2.4, h: 0.95, fontFace: BF, fontSize: 10.5, color: SEC, margin: 0 });
});
s.addText("The Beta areas took step one. Their residents are testing at home today.", { x: 0.55, y: 4.45, w: 9, h: 0.45, fontFace: BF, fontSize: 13, italic: true, color: GREEN, margin: 0 });
foot(s);
s.addNotes("The ask is deliberately small: one conversation. The closing line does the selling - two of her peers already moved.");

// ============ S13 CLOSE ============
s = p.addSlide(); s.background = { color: NAVY };
const trio2 = [["Sarah", "the buyer it saves time for", PER + "sarah.png"], ["Sean", "the patient it finally reaches", PER + "sean.png"], ["Errol", "the future it makes ordinary", IMG + "errol-portrait.png"]];
trio2.forEach(([n, r, img], i) => {
  const x = 1.3 + i * 2.6;
  s.addImage({ path: img, x: x + 0.45, y: 1.0, w: 1.5, h: 1.5, rounding: true });
  s.addText(n, { x, y: 2.6, w: 2.4, h: 0.4, fontFace: HF, fontSize: 17, bold: true, color: "FFFFFF", align: "center", margin: 0 });
  s.addText(r, { x, y: 3.0, w: 2.4, h: 0.4, fontFace: BF, fontSize: 10.5, color: "9FB6D9", align: "center", margin: 0 });
});
s.addText("Built around people. Bought without pain. Live today.", { x: 0.5, y: 3.95, w: 9, h: 0.55, fontFace: HF, fontSize: 21, bold: true, color: AMBER, align: "center", margin: 0 });
s.addText("Hearts and Minds · audience deck No.1 · Commissioner edition · proof of concept ⚑", { x: 0.5, y: 4.85, w: 9, h: 0.35, fontFace: BF, fontSize: 10, color: "9FB6D9", align: "center", margin: 0 });
s.addNotes("Close on the three faces and stop talking. The line under them is the whole programme in nine words.");

p.writeFile({ fileName: "/tmp/sarah-deck.pptx" }).then(() => console.log("deck written"));

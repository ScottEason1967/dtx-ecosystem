/* Audience decks: the content. Layout lives in audience_decks_gen.js, the look in deck_kit.js.
   These are pitches, not model documentation: one deck per room, built to be presented.
   Every figure here traces to the evidence register (hearts-and-minds/evidence.html) or to a named
   position on the operating model. Commercial positions are agreed in principle and subject to the
   live procurement; that health warning is on every slide footer and is not optional. */

// shorthand: b() marks a bold run inside a paragraph
const t = s => ({ text: s });
const b = s => ({ text: s, bold: true });

const DECKS = [

// ============================================================ 02 CLINICIANS
{
  id: '02-clinician', no: 'No.2', audience: 'Clinician edition',
  title: 'The test moves. The medicine does not.',
  closeLine: 'The venue moves. The medicine, and the accountability, stay where they are.',
  file: 'hm-deck-02-clinician-v1.pptx',
  strap: 'HomeTest takes routine and surveillance bloods out of the building and leaves every clinical decision exactly where it is: with you.',
  standfirst: 'Live today: patient-initiated HIV testing through the NHS App, in Private Beta with two local authority areas. Coming through: clinician-initiated PSA active surveillance, the board-selected acute use case.',
  accent: 'C9A0E3',
  slides: [
    { type: 'persona', eyebrow: 'We build around people. Two of them are you.',
      title: 'Adam holds a list that grows. Hannah holds a cycle that slips.',
      people: [
        { key: 'adam', name: 'Adam', role: 'Consultant urologist, PSA active surveillance', quote: 'The patients I worry about are the ones who stop coming. The list grows. My clinic does not.' },
        { key: 'hannah', name: 'Hannah', role: 'GP partner, primary-care monitoring', quote: 'Every quarter the same patients miss, get rebooked and miss again. It has nothing to do with the bloods.' }],
      body: [t('Every configuration in this programme is designed around named clinicians and named patients. These two carry the clinical case: one in secondary care holding a surveillance cohort, one in primary care holding a recall cycle. '), b('If the model does not work for them, it does not work.')],
      notes: 'Open by naming the room. Clinicians expect to be sold a product; instead show them we started from their workload. Adam and Hannah are composites built from the discovery work, not real individuals, and it is fine to say so. The point of the slide is that the design started with the clinical problem, not the technology.' },

    { type: 'statwall', eyebrow: 'The problem you already have',
      title: 'The appointment is the bottleneck. It was never the blood.',
      stats: [
        { big: '54%', small: 'of NHS outpatient activity in England is follow-up, much of it judged of limited clinical value.', src: 'GIRFT / NHS England outpatient improvement guide, 2024' },
        { big: '8.0m', small: 'outpatient appointments went unattended in 2023/24, of 135.4m booked, at around £120 each.', src: 'NHS Digital, Hospital Outpatient Activity 2023-24; NHS England DNA costings' },
        { big: '1.25bn', small: 'pathology test requests projected for 2025/26, up from 730m in 2013/14 and growing about 5.5% a year.', src: 'Programme analysis, 2026' }],
      kicker: 'The patients who miss are not the patients who need it least. They are the shift workers, the carers, the people for whom a clinic slot costs half a day of pay. The clinic-only model selects against them.',
      notes: 'Do not labour the numbers. The line that lands in a clinical room is the last one: non-attendance is a design problem, not a compliance problem. If someone challenges the 54%, it is GIRFT and it is their own figure.' },

    { type: 'steps', eyebrow: 'What actually happens',
      title: 'Five steps. Your order, their kitchen table, your record.',
      steps: [
        { n: '1', h: 'Ordered', s: 'From your system or the NHS App, on the cohort and cadence you set.' },
        { n: '2', h: 'Delivered', s: 'Kit through the door, with instructions written for the patient in front of you.' },
        { n: '3', h: 'Sampled', s: 'At home, at a time that fits the patient, and posted back.' },
        { n: '4', h: 'Analysed', s: 'At a UKAS-accredited laboratory, on the same assay platform as your in-clinic samples.' },
        { n: '5', h: 'Returned', s: 'Into the record you already use, in time for the decision you were going to make anyway.' }],
      kicker: 'One wrapper around all five: the assurance, the logistics, the notifications and the safety net are the platform’s job, not the clinic’s.',
      notes: 'Keep this quick. The only line that matters clinically is step 5: the result comes back into the record on time. If they ask about failed samples, that is the next slide but one.' },

    { type: 'twocol', eyebrow: 'The objection, answered first',
      title: 'What changes, and what does not.',
      left: { h: 'What changes', tone: 'blue', items: [
        'Where the sample is taken. Kitchen table, not phlebotomy chair.',
        'When it is taken. The patient’s time, not a slot in your week.',
        'Who carries the logistics, the reminders and the chasing. The platform does.',
        'How many people in your cohort actually complete the test.'] },
      right: { h: 'What does not change', tone: 'green', items: [
        'Who orders. The clinician, on the clinical indication.',
        'Who is accountable for the result and the decision that follows.',
        'The thresholds, the guideline pathway and the escalation route.',
        'The record. The result lands in the same place, with the same governance.'] },
      kicker: 'The kit changes the venue of the blood. It does not change the medicine, and it does not move clinical accountability anywhere.',
      notes: 'This is the slide the room came for. Say the kicker slowly. Most clinical resistance is a fear of accountability drifting to a supplier or an app; the honest answer is that it does not, and the design deliberately keeps it with them.' },

    { type: 'cards', eyebrow: 'What sits behind the kit',
      title: 'The assurance was done nationally, before anyone asked you to trust it.',
      cards: [
        { h: 'The company, once', b: 'Tier 1 assurance through the Master SCAL: corporate standing, cyber, information governance, clinical safety governance, plus financial standing added by the framework. Passed once, reused by every commissioner.' },
        { h: 'The test, per category', b: 'Tier 2 at the category gate: clinical evidence including non-inferiority, UKAS accreditation for the named test, MHRA-conformant kit, and API and journey conformance for that test.' },
        { h: 'The safety case', b: 'DCB0129 and DCB0160 executed before go-live for each configuration, with the hazard log and clinical safety officer named. IG artefacts, DPIA and data-sharing agreements executed before the first kit ships.' },
        { h: 'The clinical bar', b: 'Judged by a clinician panel, not by a procurement scorecard. A test category only opens when enough of the market can serve it; a category one laboratory could serve stays shut.' }],
      notes: 'The four cards are the answer to "who checked this". The last one is the one clinicians remember: the clinical bar is set by clinicians and a category does not open just because a single supplier is keen.' },

    { type: 'cards', eyebrow: 'The unhappy path',
      title: 'What happens when it does not go right.',
      cards: [
        { h: 'A sample that fails', b: 'Insufficient or degraded samples are detected at the laboratory, the patient is notified and a replacement kit is issued against the same order. The clinician sees the exception, not a silence.' },
        { h: 'A result that needs action', b: 'Results above the threshold you set route back through the escalation rule in the configuration, to the named clinical owner, in the timeframe the safety case specifies.' },
        { h: 'A patient who does not return the kit', b: 'Non-return surfaces as an exception on the cohort view with the recall date attached. Today, a missed appointment surfaces as nothing at all.' },
        { h: 'A supplier that fails', b: 'Performance is managed against the framework, with commercial recourse built into the contract; service credits are the worked example. The cohort moves to another accredited supplier on the register.' }],
      notes: 'Clinicians test a service by asking what happens when it breaks. Answer plainly. The fourth card is also the commercial answer: multi-supplier accreditation is what makes an exit possible without a re-procurement.' },

    { type: 'story', eyebrow: 'A clinician’s story', person: 'adam',
      title: 'Adam keeps more of his cohort in surveillance without his clinic growing.',
      quote: 'The patients I cannot see are still in surveillance. That is the whole point.',
      paras: [
        [b('The cohort. '), t('Men on active surveillance for low-risk prostate cancer, on a NICE NG131 monitoring cadence. Around 64,000 men are diagnosed with prostate cancer in the UK each year; roughly 6,500 a year choose active surveillance, with up to 5,000 more who could.')],
        [b('The change. '), t('The quarterly PSA happens at home. The trend arrives in the same place, on time, and Adam reviews it as he always did. Clinic time concentrates on the men whose numbers have moved.')],
        [b('The clinical accountability. '), t('Unmoved. Adam sets the cadence and the threshold, Adam reads the trend, Adam decides. The platform carries the kit, the laboratory and the exception list.')]],
      notes: 'Tell it as a working week, not a case study. If there is a urologist in the room, ask what proportion of their surveillance clinic is a normal result being read aloud.' },

    { type: 'cards', eyebrow: 'What you get back', title: 'Three things worth having.', accentCards: true,
      cards: [
        { h: 'Clinic time', b: 'Routine and surveillance bloods stop competing with treatment and complex care for the same room, the same nurse and the same hour.' },
        { h: 'A cohort that holds', b: 'Completion goes up in exactly the groups that miss appointments today, and non-completion becomes visible instead of silent.' },
        { h: 'An audit trail', b: 'Protocol, compliance against it and outcomes in one place, per cohort. What you can currently only estimate, you can show.' }],
      kicker: 'Honest limit: the Private Beta exists to produce these numbers. We are not asking you to accept a business case, we are asking you to help generate the evidence.',
      notes: 'Do not overclaim. Clinicians spot a business case dressed as a clinical claim instantly. The kicker buys credibility for everything else in the deck.' },

    { type: 'ask', eyebrow: 'What we need from clinicians',
      title: 'Three asks, none of them a procurement.',
      items: [
        { n: '1', h: 'Name the cohort', b: 'Which of your patients should be in this, and which should not. The eligibility rule is a clinical decision and we will not write it for you.' },
        { n: '2', h: 'Set the protocol', b: 'Cadence, thresholds and the escalation route. The platform can run annual, biannual, risk-stratified or symptom-led. It should not choose.' },
        { n: '3', h: 'Sit on the panel', b: 'The clinical bar for each test category is judged by clinicians. We need practising ones, not a proxy.' }],
      close: 'One conversation to start: your cohort, our journey maps and what the Beta is already showing.',
      notes: 'The ask is deliberately small and deliberately clinical. Nobody in this room is being asked to buy anything, and saying so releases the tension.' },
  ]
},

// ============================================================ 03 ACUTE TRUST
{
  id: '03-acute-trust', no: 'No.3', audience: 'Acute trust edition',
  title: 'Surveillance that does not need the building.',
  closeLine: 'One cohort. One protocol. One call-off. The capacity you get back is yours.',
  file: 'hm-deck-03-acute-trust-v1.pptx',
  strap: 'An NHS-to-NHS case: move routine surveillance and follow-up bloods out of outpatients, keep the clinical ownership in the Trust, and give the estate back to the patients who need to be in it.',
  standfirst: 'Royal Devon University Healthcare is the selected acute partner for PSA active surveillance, mobilising from June 2026. HIV self-testing is live in Private Beta with two local authority areas.',
  accent: '005EB8',
  slides: [
    { type: 'persona', eyebrow: 'Built around the people who carry it',
      title: 'A commissioner with a pathway to protect, a consultant with a list that grows.',
      people: [
        { key: 'catherine', name: 'Catherine', role: 'ICB commissioner, PSA active surveillance', quote: 'I commission the pathway, not each patient. I need it to hold across every Trust in my patch.' },
        { key: 'adam', name: 'Adam', role: 'Consultant urologist', quote: 'The monitoring caseload is real men on my list. The clinic cannot hold all of them in a room.' }],
      body: [t('The acute case has two buyers in the room: the commissioner who funds the pathway and the clinical service that runs it. '), b('This deck is written for the conversation where both are present.')],
      notes: 'Establish early that this is NHS to NHS. Nobody is selling the Trust a product; the Trust is being offered a way to move a cohort off its own estate while keeping the clinical relationship.' },

    { type: 'statwall', eyebrow: 'The pressure on the estate',
      title: 'The follow-up burden is the outpatient problem.',
      stats: [
        { big: '135.4m', small: 'outpatient appointments booked in England in 2023/24. Routine surveillance bloods need not be among them.', src: 'NHS England, Hospital Outpatient Activity 2023-24' },
        { big: '54%', small: 'of outpatient activity is follow-up; standardised and remote models could unlock one to two million slots.', src: 'GIRFT, Further Faster programme' },
        { big: '£120', small: 'the cost of a missed outpatient appointment, on 8.0m unattended appointments: roughly £1bn a year of clinical time.', src: 'NHS Digital 2023-24; NHS England DNA costings' }],
      kicker: 'A missed appointment still costs the slot, the room and the rota. An unreturned kit costs a kit. That asymmetry is the whole financial argument.',
      notes: 'The DNA asymmetry is the line a finance director writes down. Say it once, clearly, and move on.' },

    { type: 'cards', eyebrow: 'The starting cohort', title: 'PSA active surveillance: a defined group, an agreed cadence, a national configuration.',
      cards: [
        { h: 'The cohort', b: 'Men on active monitoring for low-risk prostate cancer. Around 64,000 men a year are diagnosed in the UK; roughly 6,500 choose active surveillance, with up to 5,000 more who could.' },
        { h: 'The cadence', b: 'The NICE NG131 monitoring schedule, unchanged. The platform runs the recall; the Trust sets the interval and the thresholds.' },
        { h: 'The status', b: 'Scored 35 out of 45 under the HomeTest Prioritisation Framework and endorsed in principle as the board-selected acute use case at the HomeTest Programme Board on 9 June 2026.' },
        { h: 'The proof', b: 'An acute partner is mobilising now. The first configuration is designed with a Trust, not designed for one and offered afterwards.' }],
      notes: 'If the Trust in the room is not a urology centre, name the pattern instead of the cohort: any routine surveillance blood on a fixed cadence fits this shape.' },

    { type: 'twocol', eyebrow: 'The division of labour',
      title: 'What moves off the Trust, and what stays inside it.',
      left: { h: 'Moves to the platform', tone: 'blue', items: [
        'Kit fulfilment, return logistics and the laboratory contract.',
        'Patient notifications, reminders and the recall schedule.',
        'Supplier assurance, clinical safety artefacts and information governance.',
        'The exception list: who has not completed, and when they were due.'] },
      right: { h: 'Stays with the Trust', tone: 'green', items: [
        'The clinical relationship with the patient, and the consultant of record.',
        'Eligibility, cadence, thresholds and the escalation rule.',
        'Reading the result and the decision that follows it.',
        'The cohort. These remain your patients throughout.'] },
      kicker: 'The Trust is not outsourcing a cohort. It is outsourcing the logistics of getting blood out of that cohort on time.',
      notes: 'Trusts fear losing sight of patients. The right of this slide is the reassurance; the kicker is the sentence to repeat if the conversation drifts.' },

    { type: 'cards', eyebrow: 'How the Trust buys it', title: 'A call-off, not a procurement.', accentCards: true,
      cards: [
        { h: 'Who buys', b: 'Local authority, Trust, ICB or pathology network, depending on where the budget for that cohort sits. Where a pathway crosses budgets, the buyer follows the budget holder.' },
        { h: 'How', b: 'Direct award or mini-competition against the accredited register, on published call-off terms. The assurance, integration and safety case were completed before you started.' },
        { h: 'Price', b: 'A cost per activity for each completed test, at or below a national maximum price that local competition can beat. Volume tiers are still open.' },
        { h: 'Status', b: 'Agreed in principle and being tested with buyers before the sourcing strategy is finalised. Good enough for planning, not a tender document.' }],
      notes: 'Be scrupulous about the last card. Overstating commercial certainty in an NHS-to-NHS conversation is how you lose the relationship later.' },

    { type: 'story', eyebrow: 'What it looks like for a patient on your list', person: 'mark',
      title: 'Mark, 65, on active surveillance. His consultant still reads the trend.',
      quote: 'The quarterly test is routine. Getting to the hospital for it never was.',
      paras: [
        [b('Before. '), t('A half-day for a fifteen-minute blood test: parking, the wait, the walk back. Three or four times a year, on a cadence he is expected to keep for years.')],
        [b('After. '), t('The kit arrives on schedule, the sample goes back by post, the result reaches Adam in time for the review that was going to happen anyway.')],
        [b('The Trust’s side of it. '), t('The surveillance cohort stops occupying phlebotomy slots that acute demand needs, and the men who quietly dropped out of the cadence become visible again.')]],
      notes: 'Mark is the patient the Trust already knows. The value to the Trust is in the third paragraph: capacity plus retention, not one or the other.' },

    { type: 'ask', eyebrow: 'What we are asking a Trust for',
      title: 'Three steps, in this order.',
      items: [
        { n: '1', h: 'Name one cohort', b: 'One surveillance or routine-monitoring group where the venue, not the test, is the problem. Small enough to run, big enough to measure.' },
        { n: '2', h: 'Agree the protocol', b: 'Your clinicians set eligibility, cadence, thresholds and escalation. We configure to it and execute the safety case against it.' },
        { n: '3', h: 'Run one call-off', b: 'On published terms against the accredited register, with the measurement built in from day one so the second cohort argues for itself.' }],
      close: 'The ask is one cohort and one conversation, not a transformation programme.',
      notes: 'Close on proportionality. Trusts are being asked for pilots constantly; the differentiator is that the assurance and the buying route already exist.' },
  ]
},

// ============================================================ 04 NATIONAL PLATFORM PARTNERS
{
  id: '04-platform', no: 'No.4', audience: 'National platform edition',
  title: 'One integration. Every test that follows.',
  closeLine: 'Consume what exists. Assure what does not. Integrate once.',
  file: 'hm-deck-04-national-platform-v1.pptx',
  strap: 'HomeTest rides the national rails rather than building beside them. What we need from the platform is stable interfaces; what the platform gets back is a high-frequency, clinically useful reason for people to open the App.',
  standfirst: 'NHS Login and NHS Notify integrations are live. HIV self-testing runs through the NHS App in Private Beta with two local authority areas.',
  accent: '00A499',
  slides: [
    { type: 'persona', eyebrow: 'Built around the people who run the rails',
      title: 'Priya keeps the connective tissue standing.',
      people: [
        { key: 'priya', name: 'Priya', role: 'Senior product manager, NHS England Digital', quote: 'I do not need another service building its own front door. I need the ones we have to carry more that is worth carrying.' },
        { key: 'ngozi', name: 'Ngozi', role: 'Information governance', quote: 'Controllership, lawful basis and the DPIA are settled before go-live, or there is no go-live.' }],
      body: [t('The platform view of a new service is usually a support burden. This one is designed the other way round: '), b('integrate once nationally, then reuse that integration for every test category that opens afterwards.')],
      notes: 'Platform teams are pitched at constantly. Lead with restraint: we are asking to consume, not to be given something new to run.' },

    { type: 'statwall', eyebrow: 'The front door already exists',
      title: 'The reach is there. The reason to open the App is what we add.',
      stats: [
        { big: '39m', small: 'people registered on the NHS App, with 62.3m logins in a single month.', src: 'NHS England, December 2025' },
        { big: '1.25bn', small: 'pathology test requests projected for 2025/26, growing about 5.5% a year: demand that will land somewhere.', src: 'Programme analysis, 2026' },
        { big: '3', small: 'foundation services consumed: NHS App as the patient surface, NHS Login for identity, NHS Notify for communications.', src: 'HomeTest operating model, Ecosystem: Consumed' }],
      kicker: 'A diagnostic result is a high-value reason to return to the App. Testing gives the front door something to be a front door for.',
      notes: 'The kicker is the persuasion. Platform partners measure engagement; a test result is a genuine reason to open an app, unlike most notifications.' },

    { type: 'twocol', eyebrow: 'The boundary, stated plainly',
      title: 'What we consume, and what we build.',
      left: { h: 'Consumed, owned by you', tone: 'blue', items: [
        'NHS App as the patient surface.',
        'NHS Login for identity and authentication.',
        'NHS Notify for patient communications.',
        'FHIR routing, and the record destinations that follow it.'] },
      right: { h: 'Built and run by HomeTest', tone: 'green', items: [
        'The supplier onboarding gateway and the accredited register.',
        'The pattern catalogue: initiation, fulfilment, result handling per configuration.',
        'Kit logistics, laboratory routing and the exception model.',
        'The commercial layer: call-offs, ceiling, levy and MI.'] },
      kicker: 'The line is deliberate. Where a national service exists we use it; where it does not, we build inside the framework rather than asking the platform to absorb new scope.',
      notes: 'Draw the line explicitly before they draw it for you. Platform teams respond well to a service that knows what it is not asking for.' },

    { type: 'cards', eyebrow: 'Why this integration is worth doing once',
      title: 'The gate model means the integration does not repeat per test.',
      cards: [
        { h: 'Integrate once', b: 'A supplier makes the one-off platform connection at Tier 1: connection agreement, HSCN, service management and incident routes. That is the only time the plumbing is built.' },
        { h: 'Conform per test', b: 'Tier 2 is API and journey conformance against published, versioned specifications for that test category, with performance evidence. Configuration, not new integration.' },
        { h: 'Grow by gates', b: 'New test categories open on a published roadmap at reopening windows, annual as the working assumption. The platform plans against a calendar, not a queue of requests.' },
        { h: 'Scale without estate', b: 'Volume scales with kit logistics and laboratory capacity. It does not scale with anything the platform has to house.' }],
      notes: 'This is the slide that answers "what will you keep asking us for". The answer is a calendar, not a stream of one-off requests.' },

    { type: 'cards', eyebrow: 'Governance and data',
      title: 'The information governance position, as it stands.',
      cards: [
        { h: 'Federated controllership', b: 'NHS England as controller for the foundation, the commissioner as controller for the testing purpose, the supplier as processor. Joint controller arrangements have been ruled out; the exact split per configuration is still being scoped.' },
        { h: 'Executed before go-live', b: 'DPIA, data-sharing and processing agreements are executed before the first kit ships, under the inherited IG artefact stack, with existing controllership intact.' },
        { h: 'Lawful basis', b: 'Private Beta is system delivery: data moved to enable care, with no NHS England analysis for its own purposes, so no legal Direction is required. Public Beta likely needs a Direction if that changes.' },
        { h: 'The record', b: 'The NHS holds the record. Results flow to the destination the configuration specifies, not into a supplier silo.' }],
      notes: 'Do not soften the open items. The Direction timing question is real and the platform IG team will already know it; showing you know it is what buys trust.' },

    { type: 'ask', eyebrow: 'What we need from the platform',
      title: 'Three things, none of them new scope.',
      items: [
        { n: '1', h: 'Stable, versioned interfaces', b: 'Published specifications we can hold suppliers to at Tier 2 conformance, with a deprecation policy we can plan around.' },
        { n: '2', h: 'Roadmap alignment', b: 'Our gate calendar set against yours, so a category opens when the platform can carry it rather than when a supplier is ready.' },
        { n: '3', h: 'A named counterpart', b: 'One person per foundation service for integration, incident routes and uptime, on the RACI that already exists in the model.' }],
      close: 'In return: a service that consumes what exists, brings its own assurance, and gives the front door a clinically useful reason to be opened.',
      notes: 'End on the trade. Platform partners are being asked for three specific, unglamorous things, and are getting engagement and a self-contained assurance model in return.' },
  ]
},

// ============================================================ 05 SUPPLIERS
{
  id: '05-supplier', no: 'No.5', audience: 'Supplier edition',
  title: 'Assured once. Sold many times.',
  closeLine: 'One assurance pass. Every commissioner in England, on the same terms.',
  file: 'hm-deck-05-supplier-v1.pptx',
  strap: 'One national framework, one assurance pass at company level, one approval per test category, and then every commissioner in England buying from the same register on the same terms.',
  standfirst: 'An open framework under the Procurement Act 2023, around £250m over its life, a term of up to five years (three plus one plus one), targeting go-live in Q1 2028. Agreed in principle and subject to the live procurement.',
  accent: '5BC093',
  slides: [
    { type: 'persona', eyebrow: 'Built around the supplier who has to make it work',
      title: 'Joe has the kit, the lab and the paperwork. What he does not have is a route.',
      people: [
        { key: 'joe', name: 'Joe', role: 'Self-sample diagnostics, twenty staff, two laboratories', quote: 'Every commissioner wants their own DPIA, their own contract, their own assurance pack. I pay to find out what they want, then I do it again next door.' }],
      body: [t('The market is fragmented and the cost of selling into it falls hardest on the suppliers the NHS most needs: the ones with a good test and a small commercial function. '), b('This framework is built to remove the repetition, not to remove the standard.')],
      notes: 'Say the quiet part first. Suppliers expect an NHS pitch to be about NHS needs; opening on their cost of sale buys attention for the rest of the deck.' },

    { type: 'statwall', eyebrow: 'The prize',
      title: 'A single national route into a growing market.',
      stats: [
        { big: '~£250m', small: 'the indicative value of the framework over its life, with a term of up to five years, three plus one plus one.', src: 'HomeTest commercial model, agreed in principle' },
        { big: 'Q1 2028', small: 'the targeted go-live for the enduring open framework under the Procurement Act 2023.', src: 'HomeTest commercial model, in principle and subject to procurement' },
        { big: '1.25bn', small: 'pathology test requests projected for 2025/26, growing about 5.5% a year. The demand is not in question.', src: 'Programme analysis, 2026' }],
      kicker: 'Live today, not a paper market: patient-initiated HIV self-testing is running in Private Beta with two local authority areas, and an acute partner is mobilising for PSA active surveillance.',
      notes: 'Suppliers have been burned by NHS frameworks that never opened. The kicker is the credibility line: there is a live service with real kits and real patients already.' },

    { type: 'cards', eyebrow: 'How you get in',
      title: 'Two tiers. The company once, then each test at its gate.',
      cards: [
        { h: 'Tier 1: framework entry', b: 'Company assurance, passed once. Corporate structure, technical and operational readiness including the one-off platform connection, cyber, information governance and clinical safety governance, mostly through the Master SCAL, plus financial standing added by the framework.' },
        { h: 'Tier 2: test approval', b: 'Per test category, when its gate is open. Clinical evidence including non-inferiority, UKAS accreditation for the named test, MHRA-conformant kit, and API and journey conformance for that category.' },
        { h: 'Reusable everywhere', b: 'Both approvals are reusable with every commissioner who calls off. The local body deploys; it does not re-assure you. One pass, not one per buyer.' },
        { h: 'Tier 1 does not expire', b: 'Miss a gate and you apply at the next one. Company approval stands; you are not sent back to the start of the queue.' }],
      notes: 'This is the core of the pitch. The sentence that matters commercially: the local body deploys and does not re-assure. That is the cost of sale disappearing.' },

    { type: 'steps', eyebrow: 'The gate model',
      title: 'Categories open on a published roadmap, not on request.',
      steps: [
        { n: '1', h: 'Roadmap publishes', s: 'Categories and gate dates land far enough ahead for a laboratory to book and win the accreditation it needs.' },
        { n: '2', h: 'Gate opens', s: 'The category joins the catalogue. Any supplier with Tier 1 can apply for one category or several.' },
        { n: '3', h: 'Suppliers accredit', s: 'A clinician panel judges the clinical bar; automated conformance takes the technical one.' },
        { n: '4', h: 'Register updates', s: 'The accredited register shows who can sell what. About three suppliers per test is the working floor.' },
        { n: '5', h: 'Commissioners call off', s: 'Local call-offs run against the register, at or below the national ceiling.' }],
      kicker: 'A category only one laboratory can serve does not open. It stays closed until competition can exist, which is also the guarantee that a gate you win is a market and not a monopoly you are bidding into.',
      notes: 'The kicker cuts both ways and suppliers know it: the floor of about three suppliers protects the NHS from lock-in and protects them from opening a category nobody can serve.' },

    { type: 'cards', eyebrow: 'How you get paid', title: 'Cost per activity, direct from the commissioner.', accentCards: true,
      cards: [
        { h: 'The payment', b: 'A cost per activity for each completed test, paid by the commissioner direct to the supplier that processed it. No intermediary taking a cut of the delivery.' },
        { h: 'The ceiling', b: 'A national maximum price per test, which local competition can beat. More accredited suppliers in a category means more price tension, and that is the design intent.' },
        { h: 'The levy', b: 'A levy on throughput funds the platform, with a share returned to NHS England for clinical validation, NHS App eligibility and pathway transformation. The route the levy takes back is still being resolved.' },
        { h: 'Demand', b: 'Aggregated national demand against one route, instead of a bespoke sale per commissioner. Volume tiers are still open.' }],
      notes: 'Be honest that the levy mechanism has open questions on nomenclature, VAT, legal and competition. Suppliers respect a straight answer and will find the gap anyway.' },

    { type: 'twocol', eyebrow: 'The deal, both ways',
      title: 'What you get, and what we hold you to.',
      left: { h: 'What you get', tone: 'green', items: [
        'One assurance pass, reusable with every commissioner.',
        'A published roadmap you can plan laboratory capacity against.',
        'A place on the accredited register, visible to every buyer.',
        'Routes in that suit your size: prime, consortium, NHS-led or partnering.'] },
      right: { h: 'What we hold you to', tone: 'blue', items: [
        'Clinical evidence, including non-inferiority for the named test.',
        'UKAS accreditation and MHRA conformity, maintained not just achieved.',
        'Conformance to the published API and journey specifications.',
        'Service performance, with commercial recourse in the contract; service credits are the worked example.'] },
      kicker: 'The standard does not move. What moves is how many times you have to prove you meet it.',
      notes: 'Suppliers hear "framework" and expect a race to the bottom on price with no floor on quality. The right-hand column is deliberately hard, and the kicker is the sentence to land.' },

    { type: 'story', eyebrow: 'A supplier’s story', person: 'joe',
      title: 'Joe is admitted once and reused everywhere.',
      quote: 'The old price of bidding for NHS work was paying to find out what was wanted. Now I read the criteria and decide whether I fit.',
      paras: [
        [b('Before. '), t('Three months of clarifications per commissioner, a bespoke DPIA each time, a clinical safety case rewritten for every deployment, and a pilot that ended without a route to scale.')],
        [b('Now. '), t('Company assurance once through the Master SCAL. Category approval when the gate opens. Every commissioner who calls off inherits that work rather than repeating it.')],
        [b('The commercial shape. '), t('Predictable volume against a published roadmap, payment per completed test, and a market with a floor of about three suppliers per category, so winning the category means winning a market rather than a monopoly.')]],
      notes: 'Joe is the composite supplier the framework is designed for. If the room is a large incumbent, the same slide reads as a warning that scale alone will not carry them past the clinical bar.' },

    { type: 'ask', eyebrow: 'What happens next',
      title: 'What we want from suppliers now, before the framework goes live.',
      items: [
        { n: '1', h: 'Tell us what breaks this', b: 'The assurance burden, the gate cadence, the ceiling, the levy. If it does not work commercially, we would rather hear it now than at tender.' },
        { n: '2', h: 'Tell us what you can serve', b: 'Which test categories you could accredit for, and how long the laboratory accreditation would take you. That shapes the roadmap.' },
        { n: '3', h: 'Come to the Supplier Forum', b: 'A standing forum with a monthly cadence: structured information sharing, non-evaluative and non-decision-making. Being in the room now is not an advantage at tender, and it is where the design gets tested.' }],
      close: 'Everything commercial here is agreed in principle and subject to the live procurement. Nothing in this conversation confers any advantage in it.',
      notes: 'The closing line is not a disclaimer, it is a probity requirement. Say it out loud in the room, every time.' },
  ]
},

// ============================================================ 06 PATIENT AND PUBLIC VOICE
{
  id: '06-patient-public', no: 'No.6', audience: 'Patient and public voice edition',
  title: 'A test that comes to you.',
  closeLine: 'The test of this service is who finally gets tested.',
  file: 'hm-deck-06-patient-public-voice-v1.pptx',
  strap: 'What HomeTest is, in plain terms: a test that arrives at your home, a sample you take yourself, a proper NHS laboratory, and a result that goes to the clinician who already looks after you.',
  standfirst: 'HIV self-testing is live now with two local authority areas. Other tests follow as they are approved. Nothing here replaces the care you already have.',
  accent: 'FFB91D',
  slides: [
    { type: 'persona', eyebrow: 'Who we designed this around',
      title: 'Five people, and what the current system asks of them.',
      people: [
        { key: 'sean', name: 'Sean', role: 'Every list since childhood, and still hard to reach', quote: 'Being on the register was never the problem. Everything between the register and the result was.' },
        { key: 'layla', name: 'Layla', role: 'Two part-time jobs, two kids, a six-month blood test', quote: 'I take the tablets every day. It is the blood test I keep missing.' }],
      body: [t('The service was designed around named people rather than an average patient: a man with a learning disability, a single parent on shifts, a woman on an at-risk register, a man on cancer surveillance, a man who would never sit in a sexual health clinic. '), b('If it does not work for them, it does not work.')],
      notes: 'This room will test whether patients were involved or invented. Be honest: these are composites drawn from discovery, except Sean, who is real and whose story is shared with his family’s blessing.' },

    { type: 'twocol', eyebrow: 'The problem, in plain terms',
      title: 'The test is easy. Getting to it is not.',
      left: { h: 'What the current model assumes', tone: 'grey', items: [
        'You can take time off, in working hours, without losing pay.',
        'You can get to the building, and wait when you arrive.',
        'A letter reaches you, and you can read and act on it.',
        'You are comfortable being seen walking into that particular clinic.'] },
      right: { h: 'What that means in practice', tone: 'amber', items: [
        'Around 8.0m outpatient appointments went unattended in 2023/24, of 135.4m booked.',
        'Around 15m general-practice appointments are missed each year.',
        '79.9% of people on the learning disability register had their annual health check in the year to March 2025.',
        'People with a learning disability die a median 19.5 years earlier than the general population.'] },
      kicker: 'Missing an appointment is usually a sign the appointment did not fit the life, not that the person did not care.',
      notes: 'Sources: NHS Digital 2023-24, NHS England, and the LeDeR annual report 2023 published 2025. The kicker is the reframe this audience most wants to hear said by the system rather than by them.' },

    { type: 'steps', eyebrow: 'What actually happens',
      title: 'Five steps, and none of them is a waiting room.',
      steps: [
        { n: '1', h: 'It is offered', s: 'Either your clinician arranges it, or you choose it yourself in the NHS App.' },
        { n: '2', h: 'It arrives', s: 'A kit through the door, with instructions written to be followed at home.' },
        { n: '3', h: 'You take it', s: 'In your own time, at your own table, with someone helping you if you want that.' },
        { n: '4', h: 'It is tested', s: 'At an accredited NHS laboratory, to exactly the same standard as a sample taken in clinic.' },
        { n: '5', h: 'The result comes back', s: 'To your health record and to you, with a clear route to a person if it needs one.' }],
      kicker: 'Nobody is required to use an app or to test at home. This is an extra door into the same service, not a replacement for the one that exists.',
      notes: 'The kicker is the single most important sentence in this deck for this audience. Say it early and repeat it at the end.' },

    { type: 'story', eyebrow: 'A real story, told with his family’s blessing', person: 'sean',
      title: 'Sean, 46. The test was never the hard part.',
      quote: 'I want to do this. I just need to know when.',
      paras: [
        [b('The walls. '), t('Sean has a learning disability, is autistic and lives with OCD. Attending was hard, understanding a standard letter was hard, and being in an unfamiliar room was hard. Any one of those was enough to end the process.')],
        [b('What changed. '), t('His own table, easy-read instructions, and the people who support him brought into the loop properly rather than by accident.')],
        [b('The wider point. '), t('A journey designed so Sean can finish it is a calmer, clearer journey for everyone. The adjustments that make it possible for him make it easier for people who would never ask for adjustments at all.')]],
      notes: 'Slow right down. Do not rush to the policy point. The curb-cut argument at the end is what turns an access story into a design principle.' },

    { type: 'cards', eyebrow: 'The questions this audience always asks',
      title: 'Straight answers.',
      cards: [
        { h: 'Who holds my information?', b: 'The NHS. The result goes into your NHS record. Suppliers process samples on the NHS’s instructions and do not own your data. The privacy assessments and data agreements are signed before any kit is sent.' },
        { h: 'Is the test as good?', b: 'The laboratory is UKAS accredited for that named test, the kit is MHRA conformant, and suppliers must show the home route is not inferior to the clinic route before the category opens.' },
        { h: 'What if I cannot do it myself?', b: 'Then you should not have to. Support from family or carers is part of the design, and the clinic route stays open. Nobody is removed from a service for not using the kit.' },
        { h: 'What if something is wrong?', b: 'Results that need action route to a named clinician on a defined timescale, with an escalation route built into the configuration before it goes live.' }],
      notes: 'These four come up in every patient and public voice session. Answer them before they are asked; the deck loses credibility if the audience has to drag the answers out.' },

    { type: 'cards', eyebrow: 'Being straight with you',
      title: 'What is not decided yet.',
      cards: [
        { h: 'Which tests, and when', b: 'HIV is live. PSA active surveillance is the selected acute case. A core sexual health panel is the leading candidate in discovery. Others are scored and sequenced, not promised.' },
        { h: 'How it will be bought', b: 'The framework, the payment mechanism and the price ceiling are agreed in principle and remain subject to a live procurement. Nothing commercial here is final.' },
        { h: 'Who pays for what', b: 'Patients pay nothing. Which NHS body funds which cohort is settled pathway by pathway, and for one cohort it is genuinely still open.' },
        { h: 'What we cannot yet prove', b: 'The Beta exists to produce evidence on uptake, completion and reach. We are not asking you to accept a business case built on assumption.' }],
      notes: 'This is the trust slide. A patient and public voice audience will forgive uncertainty and will not forgive discovering it later.' },

    { type: 'ask', eyebrow: 'What we are asking of you',
      title: 'Three things, and they are real asks.',
      items: [
        { n: '1', h: 'Tell us where it breaks', b: 'The step that will not work for the people you represent. We would rather redesign it now than defend it later.' },
        { n: '2', h: 'Test the materials', b: 'Instructions, easy-read versions, the App journey and the words used when a result is not what someone hoped. Written for people, checked by people.' },
        { n: '3', h: 'Hold us to the outcomes', b: 'Reach, completion and access for the groups the current model misses. Those are the measures we have put our name to.' }],
      close: 'The test of this service is not how many kits go out. It is who finally gets tested who would not have been.',
      notes: 'Close on the last line and stop. It is the promise the whole programme is accountable for, and it is the one this audience will hold us to.' },
  ]
},
];

module.exports = { DECKS, t, b };

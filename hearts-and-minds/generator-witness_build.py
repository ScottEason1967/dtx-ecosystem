# -*- coding: utf-8 -*-
import json

# ---------------- The evidence register: moment -> witness card ----------------
# say = first person, in character. stat = the evidence. source = citation + year.
M = {
 "abdul-a1": dict(who="Sarah", role="Commissioner", img="sarah",
   say="Somewhere out there are 4.2 million people, England-wide, with high blood pressure nobody has found. Abdul found his own — with his phone. That is a stroke I never have to commission.",
   stat="An estimated 4.2 million adults in England have undiagnosed high blood pressure; hypertension is implicated in around half of all heart attacks and strokes.",
   source="NHS England / Office for National Statistics, 2025", url="https://www.england.nhs.uk/north-west/2025/09/04/are-you-one-of-the-missing-millions-get-your-blood-pressure-checked-this-know-your-numbers-week/"),
 "abdul-a2": dict(who="Sarah", role="Commissioner", img="sarah",
   say="Eight million outpatient appointments were missed last year, and I paid for every empty room. A kit waiting on his kitchen table cannot be missed — only posted a day late.",
   stat="8.0 million outpatient appointments in England went unattended in 2023/24, of 135.4 million booked. NHS England costs a missed outpatient appointment at around £120 — roughly £1bn a year of clinical time.",
   source="NHS Digital, Hospital Outpatient Activity 2023-24; NHS England DNA costings", url="https://digital.nhs.uk/data-and-information/publications/statistical/hospital-outpatient-activity/2023-24"),
 "abdul-a3": dict(who="Priya", role="NHSE Platform", img="priya",
   say="Thirty-nine million people already carry the front door in their pocket. I don't have to build Abdul a platform — I have to plug the kit into the one he already uses.",
   stat="39 million people are registered on the NHS App, with 62.3 million logins in a single month.",
   source="NHS England, December 2025", url="https://www.england.nhs.uk/2025/12/record-numbers-using-nhs-app-to-manage-health/"),
 "abdul-a4": dict(who="Aisha", role="Clinical / CSG", img="aisha",
   say="Threshold alerts replace periodic reviews. My attention goes where the readings say — not where the diary says.",
   stat="Follow-up appointments account for 54% of NHS outpatient activity in England, much of it judged of limited clinical value.",
   source="GIRFT / NHS England outpatient improvement guide", url="https://gettingitrightfirsttime.co.uk/outpatients/"),

 "mark-a1": dict(who="Adam", role="Consultant urologist", img="adam",
   say="Prostate cancer is now the UK's most common cancer — more than sixty-four thousand men a year, and every one of them lands on a list like mine. The list grows. My clinic doesn't.",
   stat="64,000+ men diagnosed with prostate cancer in the UK per year (2022 data); around 6,500 a year choose active surveillance, with up to 5,000 more who could.",
   source="Prostate Cancer UK / NHS data, published 2025-26", url="https://prostatecanceruk.org/about-us/news-and-views/2026/01/prostate-most-common-cancer"),
 "mark-a2": dict(who="Catherine", role="Acute Trust commissioner", img="catherine",
   say="Follow-ups are fifty-four per cent of everything my outpatient budget buys. Mark's routine PSA is precisely the kind of follow-up that never needed a room.",
   stat="Follow-up appointments represent 54% of NHS outpatient activity; standardised templates and remote models could unlock 1–2 million slots.",
   source="GIRFT, Further Faster programme", url="https://gettingitrightfirsttime.co.uk/cross_cutting_theme/further-faster-programme/"),
 "mark-a3": dict(who="Joe", role="Supplier", img="joe",
   say="One and a quarter billion pathology requests this year, growing five and a half per cent annually. Buildings can't absorb that curve — kit out, post back, lab capacity where it's actually elastic.",
   stat="NHS pathology test requests projected at 1.25bn for 2025/26 (730m in 2013/14), growing ~5.5% a year.",
   source="NHS national programme analysis, 2026"),
 "mark-a4": dict(who="Aisha", role="Clinical / CSG", img="aisha",
   say="The silence is doing clinical work. Every result is reviewed in trend, and escalation happens when the line moves — safety is the review, not the appointment.",
   stat="England booked 135.4 million outpatient appointments in 2023/24; routine surveillance bloods need not be among them.",
   source="NHS England, Hospital Outpatient Activity 2023-24"),

 "layla-a1": dict(who="Anita", role="ICB / GP commissioner", img="anita",
   say="Fifteen million missed GP-practice appointments a year — £216 million — and the system writes DNA as if it were her fault. Layla wasn't refusing care. She was keeping her job.",
   stat="Around 15 million general-practice appointments are missed each year, costing the NHS £216m (average ~£30 per missed GP appointment).",
   source="NHS England, 2019", url="https://www.england.nhs.uk/2019/01/missed-gp-appointments-costing-nhs-millions/"),
 "layla-a2": dict(who="Hannah", role="GP", img="hannah",
   say="Iron-deficiency anaemia touches around eight per cent of adult women, and the monitoring is one blood tube on a six-month clock. The clock was never the problem. The clinic was.",
   stat="Iron deficiency anaemia prevalence in the UK is around 3% of adult men and 8% of adult women; guidelines monitor treatment response by FBC.",
   source="NICE clinical knowledge summary", url="https://www.nhs.uk/conditions/iron-deficiency-anaemia/"),
 "layla-a3": dict(who="Ngozi", role="Information Governance", img="ngozi",
   say="The result lands in her GP record, not in a silo — the same governance as any practice bloods. The kit changes the venue. It never changes the protections.",
   stat="DPIA, data-sharing and processing agreements are executed before go-live; the result flows to the GP record under the practice's existing controllership.",
   source="Service IG framework (executed pre-go-live)"),
 "layla-a4": dict(who="Anita", role="ICB / GP commissioner", img="anita",
   say="Three hundred and seven million general-practice appointments a year, and one in twenty missed. Take even the routine bloods out of that queue and my access targets can finally breathe.",
   stat="~307 million general-practice sessions are scheduled annually in England; around 5% are missed without enough notice to rebook.",
   source="NHS England, 2019", url="https://www.england.nhs.uk/2019/01/missed-gp-appointments-costing-nhs-millions/"),

 "sean-a1": dict(who="Hannah", role="GP", img="hannah",
   say="I run the annual health checks — uptake is nearly eighty per cent now. And still, people with a learning disability die a median nineteen and a half years younger than everyone else. The check exists because the gap is real. The bloods are where it stalls.",
   stat="79.9% of people on the learning disability register had an annual health check (March 2025); median age of death is 62.3 — about 19.5 years younger than the general population.",
   source="NHS England; LeDeR annual report 2023 (pub. 2025)", url="https://www.england.nhs.uk/learning-disabilities/improving-health/learning-from-lives-and-deaths/"),
 "sean-a2": dict(who="His brother", role="Family", img=None,
   say="Easy-read isn't a kindness we're asking for — it has been a legal duty since 2016. The Accessible Information Standard says information must work for the person it's about. For Sean, pictures work.",
   stat="The Accessible Information Standard has been a legal requirement for NHS and adult social care providers since 2016.",
   source="NHS England, Accessible Information Standard", url="https://www.england.nhs.uk/ourwork/accessibleinfo/"),
 "sean-a3": dict(who="Ngozi", role="Information Governance", img="ngozi",
   say="The reasonable-adjustment flag exists nationally so Sean's needs travel with his record. Honouring it at the ordering step is the difference between a policy and a practice.",
   stat="The Reasonable Adjustment Digital Flag is a national NHS record flag enabling adjustments to be known across services.",
   source="NHS England, Reasonable Adjustment Digital Flag", url="https://www.england.nhs.uk/learning-disabilities/improving-health/reasonable-adjustments/"),
 "sean-a4": dict(who="Sarah", role="Commissioner", img="sarah",
   say="Thirty-nine per cent of the deaths reviewed were judged avoidable. Avoidable is a commissioning word. Reach is the lever I hold — and this is what reach looks like.",
   stat="39% of reviewed deaths of people with a learning disability were assessed as avoidable (down from 46% in 2021).",
   source="LeDeR annual report 2023 (pub. 2025)", url="https://www.england.nhs.uk/learning-disabilities/improving-health/learning-from-lives-and-deaths/"),
 "errol-s1": dict(who="Priya", role="NHSE Platform", img="priya",
   say="Errol isn't doing anything special — and that's the design. Thirty-nine million people already log into the NHS App; his readings ride rails that were already there.",
   stat="39 million people are registered on the NHS App, with 62.3 million logins in a single month.",
   source="NHS England, December 2025", url="https://www.england.nhs.uk/2025/12/record-numbers-using-nhs-app-to-manage-health/"),
 "errol-s2": dict(who="Sarah", role="Commissioner", img="sarah",
   say="No appointment would ever have caught this — Errol felt fine. There are 4.2 million people in England walking around with high blood pressure nobody has found. This is how you find them.",
   stat="An estimated 4.2 million adults in England have undiagnosed high blood pressure; hypertension is implicated in around half of all heart attacks and strokes.",
   source="NHS England / Office for National Statistics, 2025", url="https://www.england.nhs.uk/north-west/2025/09/04/are-you-one-of-the-missing-millions-get-your-blood-pressure-checked-this-know-your-numbers-week/"),
 "errol-s3": dict(who="Joe", role="Supplier", img="joe",
   say="Kidney function, lipids, HbA1c — two days from signal to doorstep. Try booking that through a system processing one and a quarter billion requests a year.",
   stat="NHS pathology test requests projected at 1.25bn for 2025/26 (730m in 2013/14), growing ~5.5% a year.",
   source="NHS national programme analysis, 2026"),
 "errol-s4": dict(who="Ravi", role="Prescribing clinician", img="ravi",
   say="I prescribe the app the way I prescribe the tablets — and the evidence says it works: fewer appointments, better control, support that's there at 2am when I'm not.",
   stat="Real-world evaluations: 19% fewer GP appointments for DTx use in COPD; 70% reduction in anxiety symptoms with digital sleep therapy.",
   source="Published RWE (MyMHealth evaluation; Oxford Sleepio trial)"),
 "errol-s5": dict(who="Aisha", role="Clinical / CSG", img="aisha",
   say="Three signal streams, one record, and my attention goes where the data says. The old model would have given Errol two routine follow-ups and missed the thing that mattered.",
   stat="Follow-up appointments account for 54% of NHS outpatient activity in England, much of it judged of limited clinical value.",
   source="GIRFT / NHS England outpatient improvement guide", url="https://gettingitrightfirsttime.co.uk/outpatients/"),
 "errol-s6": dict(who="Sarah", role="Commissioner", img="sarah",
   say="Eighteen months, no crisis, no admission. Remote monitoring cut non-elective admissions by forty per cent in one ICB's evaluation. Every Errol is an admission I never have to buy.",
   stat="A 40% reduction in non-elective admissions was reported under remote monitoring in an ICB evaluation.",
   source="ICB remote-monitoring evaluation, cited in national programme analysis"),

 "marcus-s1": dict(who="Joe", role="Supplier", img="joe",
   say="I have sold into the NHS for years, and the evidence was never the barrier. Nineteen per cent fewer GP appointments, and a product can still die in pilot number twelve. Marcus needed a route, not another reference site.",
   stat="Real-world evaluations: 19% fewer GP appointments for DTx use in COPD; 70% reduction in anxiety symptoms with digital sleep therapy.",
   source="Published RWE (MyMHealth evaluation; Oxford Sleepio trial)"),
 "marcus-s2": dict(who="David", role="NHS Commercial", img="david",
   say="One assurance bar, national terms, prices on the catalogue. I would rather steward one front door than fifty side deals, and so would every supplier worth admitting.",
   stat="39 million people are registered on the NHS App, with 62.3 million logins in a single month.",
   source="NHS England, December 2025", url="https://www.england.nhs.uk/2025/12/record-numbers-using-nhs-app-to-manage-health/"),
 "marcus-s5": dict(who="Sarah", role="Commissioner", img="sarah",
   say="The first prescription looks small from the supplier side. From mine, remote support like this cut non-elective admissions by forty per cent in one evaluation. Every activation is risk coming off my book.",
   stat="A 40% reduction in non-elective admissions was reported under remote monitoring in an ICB evaluation.",
   source="ICB remote-monitoring evaluation, cited in national programme analysis"),
 "marcus-s6": dict(who="David", role="NHS Commercial", img="david",
   say="Admitted once, bought everywhere, with the evidence commitment running on. That is what a market looks like when the operating model does the work the pilots never could.",
   stat="Real-world evaluations: 19% fewer GP appointments for DTx use in COPD; 70% reduction in anxiety symptoms with digital sleep therapy.",
   source="Published RWE (MyMHealth evaluation; Oxford Sleepio trial)"),

 "ravi-s1": dict(who="Catherine", role="Acute Trust commissioner", img="catherine",
   say="Eight million outpatient appointments went unattended last year. A daytime rehab programme she cannot attend would simply have been more of them. The options on Ravi's desk fail her, and they cost me money doing it.",
   stat="8.0 million outpatient appointments in England went unattended in 2023/24, of 135.4 million booked. NHS England costs a missed outpatient appointment at around £120 — roughly £1bn a year of clinical time.",
   source="NHS Digital, Hospital Outpatient Activity 2023-24; NHS England DNA costings", url="https://digital.nhs.uk/data-and-information/publications/statistical/hospital-outpatient-activity/2023-24"),
 "ravi-s2": dict(who="Aisha", role="Clinical / CSG", img="aisha",
   say="What moved Ravi was not marketing, it was cover. A conditional recommendation with the safety case complete, and the evidence underneath it is real: fewer appointments, better control.",
   stat="Real-world evaluations: 19% fewer GP appointments for DTx use in COPD; 70% reduction in anxiety symptoms with digital sleep therapy.",
   source="Published RWE (MyMHealth evaluation; Oxford Sleepio trial)"),
 "ravi-s4": dict(who="Priya", role="NHSE Platform", img="priya",
   say="Ravi's cohort view exists because every prescription rides the same rails. Thirty-nine million people already log into the NHS App; his fifteen patients were never a special integration.",
   stat="39 million people are registered on the NHS App, with 62.3 million logins in a single month.",
   source="NHS England, December 2025", url="https://www.england.nhs.uk/2025/12/record-numbers-using-nhs-app-to-manage-health/"),
 "ravi-s5": dict(who="Catherine", role="Acute Trust commissioner", img="catherine",
   say="Two consultants prescribing within a month is not an anecdote to me. Follow-ups are fifty-four per cent of everything my outpatient budget buys, and this is the demand curve starting to bend.",
   stat="Follow-up appointments represent 54% of NHS outpatient activity; standardised templates and remote models could unlock 1–2 million slots.",
   source="GIRFT, Further Faster programme", url="https://gettingitrightfirsttime.co.uk/cross_cutting_theme/further-faster-programme/"),

 "sarah-s1": dict(who="David", role="NHS Commercial", img="david",
   say="Eighteen months and three procurements is the old price of a detection gap. The framework exists so that Sarah's question is which configuration, not which procurement.",
   stat="An estimated 4.2 million adults in England have undiagnosed high blood pressure; hypertension is implicated in around half of all heart attacks and strokes.",
   source="NHS England / Office for National Statistics, 2025", url="https://www.england.nhs.uk/north-west/2025/09/04/are-you-one-of-the-missing-millions-get-your-blood-pressure-checked-this-know-your-numbers-week/"),
 "sarah-s3": dict(who="Ngozi", role="Information Governance", img="ngozi",
   say="IG fit is a question Sarah answers before she buys, not after she deploys. The DPIA, sharing and processing agreements are inherited from the framework and executed before go-live, every time.",
   stat="DPIA, data-sharing and processing agreements are executed before go-live as part of the framework's inherited IG artefact stack.",
   source="Service IG framework (executed pre-go-live)"),
 "sarah-s5": dict(who="Priya", role="NHSE Platform", img="priya",
   say="One MI feed and one supplier-performance view, because the integration happened once, nationally. Her cohort walked in through a front door thirty-nine million people already use.",
   stat="39 million people are registered on the NHS App, with 62.3 million logins in a single month.",
   source="NHS England, December 2025", url="https://www.england.nhs.uk/2025/12/record-numbers-using-nhs-app-to-manage-health/"),
 "sarah-s6": dict(who="David", role="NHS Commercial", img="david",
   say="Detection up, admissions down, one set of numbers. Remote models cut non-elective admissions by forty per cent in one evaluation. That is the line I take to the next commissioner.",
   stat="A 40% reduction in non-elective admissions was reported under remote monitoring in an ICB evaluation.",
   source="ICB remote-monitoring evaluation, cited in national programme analysis"),
}

JS_TEMPLATE = r'''/* Hearts and Minds witness layer — first-person evidence cards.
   One witness per moment. Every stat carries its source. Generated 12 Jun 2026. */
(function(){
var IMG = "@@IMG@@";
var PERSONA = @@PERSONA@@;
var M = @@DATA@@;
var css = ".hm-witness{position:relative;display:inline-block;vertical-align:middle;margin-left:10px;}"+
".hmw-chip{width:38px;height:38px;border-radius:50%;border:2.5px solid #FFB91D;background:#fff;cursor:pointer;padding:0;overflow:hidden;box-shadow:0 3px 10px rgba(0,32,64,0.22);display:inline-flex;align-items:center;justify-content:center;transition:transform .15s ease;}"+
".hmw-chip:hover{transform:scale(1.12);}"+
".hmw-chip img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;}"+
".hmw-chip .hmw-init{font:800 15px 'Segoe UI',sans-serif;color:#003087;}"+
".hmw-card{position:absolute;top:46px;left:50%;transform:translateX(-50%);width:330px;max-width:82vw;background:#fff;border:1px solid #d6e2ef;border-top:4px solid #FFB91D;border-radius:12px;box-shadow:0 16px 40px rgba(0,32,64,0.25);padding:16px 18px;z-index:500;display:none;text-align:left;}"+
".hm-witness.open .hmw-card,.hm-witness:hover .hmw-card{display:block;}"+
".hmw-head{display:flex;align-items:center;gap:10px;margin-bottom:9px;}"+
".hmw-head img{width:34px;height:34px;border-radius:50%;object-fit:cover;object-position:top center;}"+
".hmw-name{font:800 13px 'Segoe UI',sans-serif;color:#003087;}"+
".hmw-role{font:700 9px 'Segoe UI',sans-serif;color:#7E8B97;letter-spacing:1px;text-transform:uppercase;}"+
".hmw-say{font:italic 600 13px 'Segoe UI',sans-serif;color:#212B32;line-height:1.5;margin-bottom:9px;}"+
".hmw-stat{font:600 11.5px 'Segoe UI',sans-serif;color:#4C6272;line-height:1.5;background:#F4F8FC;border-left:3px solid #005EB8;padding:8px 10px;border-radius:0 8px 8px 0;margin-bottom:8px;}"+
".hmw-src{font:600 9px 'Segoe UI',sans-serif;color:#7E8B97;letter-spacing:0.4px;}"+
".hmw-link{display:inline-block;margin-top:7px;font:800 10.5px 'Segoe UI',sans-serif;color:#005EB8;text-decoration:none;}";
var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
document.querySelectorAll(".hm-witness[data-moment]").forEach(function(el){
  var m = M[el.getAttribute("data-moment")]; if(!m) return;
  var chip = document.createElement("button"); chip.className = "hmw-chip";
  chip.setAttribute("aria-label", m.who + " — their view of this moment");
  chip.innerHTML = m.img ? '<img src="' + IMG + m.img + '.png" alt="' + m.who + '">' : '<span class="hmw-init">' + m.who.charAt(0) + '</span>';
  if (m.img) { var ci = chip.querySelector("img"); ci.addEventListener("error", function(){ chip.innerHTML = '<span class="hmw-init">' + m.who.charAt(0) + "</span>"; }); }
  var card = document.createElement("div"); card.className = "hmw-card";
  var link = (m.img && PERSONA[m.img]) ? '<a class="hmw-link" href="' + PERSONA[m.img] + '">' + m.who + "&rsquo;s page &rarr;</a>" : "";
  card.innerHTML = '<div class="hmw-head">' + (m.img ? '<img src="' + IMG + m.img + '.png" alt="" onerror="this.remove()">' : "") +
    '<div><div class="hmw-name">' + m.who + '</div><div class="hmw-role">' + m.role + "</div></div></div>" +
    '<div class="hmw-say">&ldquo;' + m.say + '&rdquo;</div>' +
    '<div class="hmw-stat">' + m.stat + '</div>' +
    '<div class="hmw-src">Source: ' + (m.url ? '<a href="' + m.url + '" target="_blank" rel="noopener" style="color:#005EB8;text-decoration:underline;">' + m.source + "</a>" : m.source) + "</div>" + link;
  el.appendChild(chip); el.appendChild(card);
  chip.addEventListener("click", function(e){ e.stopPropagation(); e.preventDefault();
    document.querySelectorAll(".hm-witness.open").forEach(function(o){ if(o!==el) o.classList.remove("open"); });
    el.classList.toggle("open"); });
});
document.addEventListener("click", function(){ document.querySelectorAll(".hm-witness.open").forEach(function(o){ o.classList.remove("open"); }); });
})();
'''

data_json = json.dumps(M, ensure_ascii=False)

HT_PERSONA = {p: "HomeTest Operating Model - Persona %s.html" % p.capitalize() for p in
              ["sarah","priya","aisha","adam","catherine","joe","anita","hannah","ngozi","david"]}
ECO_PERSONA = {p: "DTx OM - Persona %s.html" % p.capitalize() for p in
               ["sarah","priya","aisha","adam","catherine","joe","anita","hannah","ngozi","david"]}
ECO_PERSONA["ravi"] = "DTx OM - Persona HealthStore prescribing clinician.html"

# HomeTest output excludes eco-only stories (Errol, Marcus, Ravi, Sarah journeys)
ECO_ONLY = ("errol-", "marcus-", "ravi-", "sarah-")
ht_data_json = json.dumps({k: v for k, v in M.items() if not k.startswith(ECO_ONLY)}, ensure_ascii=False)

ht = JS_TEMPLATE.replace("@@IMG@@", "Assets/Personas/").replace("@@PERSONA@@", json.dumps(HT_PERSONA)).replace("@@DATA@@", ht_data_json)
eco = JS_TEMPLATE.replace("@@IMG@@", "../assets/personas/").replace("@@PERSONA@@", json.dumps(ECO_PERSONA)).replace("@@DATA@@", data_json)

open("/tmp/hm-witness-ht.js","w",encoding="utf-8").write(ht)
open("/tmp/hm-witness-eco.js","w",encoding="utf-8").write(eco)
print("witness JS built:", len(ht), len(eco))

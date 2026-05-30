# Digital Therapeutics Operating Model
## Architecture Decision Record and View-by-View Architectural Pass

**Version 1. 22 May 2026. Scott Eason.**

This document captures the architectural decisions for the Digital Therapeutics Operating Model (DTx OM) and the structural reasoning for each view that will sit inside it. The ADR section records locked-in decisions; subsequent design work references these. The View-by-View Pass records, for each view in the live HomeTest TOM, what holds at portfolio level, what has to change, and the branching pattern recommended.

---

## Part 1: Architecture Decision Record

### ADR-1. Naming

The artefact is the **Digital Therapeutics Operating Model** (DTx OM). It is not "the HomeTest TOM extended". The name signals portfolio scope, not programme scope. The name may shift to align with the new portfolio's brand once the post-DHSC/NHSE-merger structure settles, but the architectural intent does not change with the name.

### ADR-2. Structural anchors

The DTx OM extends the four structural anchors the live HomeTest TOM already carries. These are the load-bearing patterns and the basis on which cross-product reuse holds.

1. **The lifecycle pentagon.** SHAPE, ASSURE, CONTRACT, FULFIL, MEASURE. The product stable sits at the centre of the pentagon. HomeTest active on the live model; HealthStore and HealthSync already drawn in as greyed placeholders. Forward Flow arc (SHAPE round to MEASURE) and Feedback Loop arc (MEASURE back to SHAPE). Two responsibility arcs visible: Dynamic Market / Framework (covering ASSURE, CONTRACT, FULFIL) and NHSE Capability (covering MEASURE, SHAPE).

2. **The four-level inheritance.** Foundation (L1), Overlay (L2), Pattern (L3), Configuration (L4). The Anatomy view runs on this. Cross-product-ready by design.

3. **The Why Venn.** Patient, Commissioner, Supplier as three actors, with NHSE / platform as the envelope. Aisha (clinical), David (commercial), Ngozi (IG) framed as the three framework layers of the platform, not separate actors. Centre of Venn: "The service works. Trust. Clinical safety." Shape-agnostic to product.

4. **The Ecosystem five-category structure.** Built and run, Consumed, Regulated by, Contracted, Served. Universal at structural level. Entities inside each category vary per product.

### ADR-3. Multi-centred design

The DTx OM is multi-centred by deliberate design, not by oversight. Different views answer different questions and each carries the central construct that fits its question. The home page centres on WHY (with WHAT, WHEN, HOW, WHO around it). The lifecycle centres on the product stable plus purpose. The Why view centres on "the service works / trust / clinical safety" at the Venn intersection. The Anatomy view centres on Foundation as the base of inheritance. No single structural element is forced to be the universal spine.

### ADR-4. Branching discipline

Where content is genuinely shared across products, write it once at Foundation level and let products inherit. Where content is genuinely different, branch at the appropriate view via click-through, never inline-mixed. Default disposition is shared. Branching is the exception, used only when the alternative would force a misrepresentation.

Branching shapes available:

* **Hub-and-spoke.** Shared default page, click through to product-specific sub-pages. Used where sub-page content is substantial.
* **Tabbed lens.** Single page with shared structure, tabs per product. Used where parallel content invites direct comparison.
* **Inline-branched callouts.** Shared narrative, product-specific callouts where things diverge. Used where the view is mostly shared with localised differences.
* **Product toggle.** Site-level selector hiding/showing content tagged by product. Considered for later iteration only.

Per-view branching is settled in Part 2: View-by-View Pass.

### ADR-5. HealthSync in scope from day one

Every architectural decision is tested against HealthSync at design time. HealthSync content does not need to be populated at the same depth as HomeTest in the first iteration. The structure must accommodate it. Stubs and placeholders are acceptable; structural assumptions that exclude HealthSync are not.

HealthSync source mapping is its own piece of work and is a prerequisite to populating HealthSync content. Until primaries are in hand, HealthSync sits as structural placeholder only.

### ADR-6. Build approach: copy everything, build the portfolio frame around it

The DTx OM is built in a new folder (`Digital Therapeutics Operating Model\`). The existing HomeTest TOM at `NHS Commercial Model\Operating Model\` is never modified.

**Principle.** Take as much as we can from the existing HomeTest TOM. Treat what exists as the foundation. Build the portfolio frame around it. Quality bar is: as good and as robust as HomeTest, applied across products.

**Practically this means:**

* The entire HomeTest TOM page set copies across to the new folder (Index, Why, What hub, Anatomy, Ecosystem hub plus five category sub-pages, Lifecycle plus five stage v4 pages, Operational, Governance, Teamwork, Status, all nine persona pages). Files are renamed with a `DTx OM` prefix or equivalent so the originals stay untouched and the new files have distinct paths.
* The design system carries with the copy. CSS variables, font stack, colour tokens, NHS rebrand gradient, top-nav pattern, page wrapper conventions, asset references all come across intact.
* Mutation happens on the copies in the new folder. Where a page is structurally portfolio-ready (Why, Lifecycle, Anatomy, Index, What hub, Ecosystem hub), the copy mutates to portfolio level. The pattern stays; HomeTest-specific framing in the headline/hero gets lifted to portfolio level; HomeTest-specific content within the page becomes inline callouts or sub-page click-throughs.
* Where a page is HomeTest-specific in load-bearing ways (Operational, Teamwork, the Ecosystem cardinal sub-pages, the per-stage v4 pages, the HomeTest persona pages), the copy becomes the HomeTest overlay surface within the new structure. Above it, a portfolio-level hub page is added that frames the cross-product view and links down to per-product overlays. HomeTest content is preserved word-for-word; nothing brilliant is lost.
* HealthStore and HealthSync overlay surfaces are added alongside the HomeTest ones, at the depth their primaries support. HealthStore populated from KB 11/12 and E-drive SharePoint. HealthSync stubbed until primary-source mapping completes.
* Status becomes a unified product-tagged surface. Every existing HomeTest item keeps its content and gets a `Product=HomeTest` tag. HealthStore items added alongside as primaries surface them.

**What does not get built fresh.** Nothing structurally important. The existing TOM is the foundation. The portfolio frame builds around it.

### ADR-7. Filename convention

New build files use the prefix `DTx OM —` (em-replacement space dash space if needed for filesystem) or similar consistent marker that distinguishes them from the HomeTest TOM files. To be locked once first file is created. Suggested: `DTx OM - Index.html`, `DTx OM - Why.html`, etc.

### ADR-8. Source discipline

Primaries only. Knowledge Base is an index of primaries, not source. Work product (the existing HomeTest TOM, briefing notes, summaries, weeknotes) is never source truth. Synthesised content is never source truth. If a claim cannot be traced to a primary, it does not go in the DTx OM. If a claim contradicts a primary, the primary wins and the synthesised or work-product version gets corrected.

### ADR-9. Source attribution inside the artefact

No transcripts cited in any page or supporting document. No individuals named as the source of facts. No AI involvement surfaced. All work attributed to Scott Eason. Source separation upheld inside the artefact even though it is anchored on primaries underneath.

### ADR-10. Validation routes per product

**HomeTest.** Validates against the existing primary corpus that has already been worked through (transcripts, emails, SharePoint, KB 03, 04, 06, 08, 11, 14).

**HealthStore.** Needs a named validator for operational specifics and persona-level granularity. Likely Polly Bishop (deputising for Rachel Hope as SRO) or the Servita-side HealthStore commercial lead. To be confirmed.

**HealthSync.** Needs primary-source grounding from the start. Source mapping is its own piece of work before any HealthSync content is built. Stubs only until primaries are in hand.

### ADR-11. Ownership

The DTx OM is built as a portfolio-level artefact, intended to be inherited by whoever owns the new at-home / community portfolio (or whatever the post-DHSC/NHSE-merger structure names it). Not anchored on Scott or Rachel personally. Built to be handed over.

### ADR-12. Scope boundaries

The DTx OM does not cover:

* Strategic Finance Design (separate project).
* The HomeTest recommendation paper (existing workstream).
* The 27 May SLT Accountability Session prep (existing workstream).
* IG / DPIA process improvement (DPSP-wide discovery, separate).
* Programme-specific operational models as standalone deliverables. Programme-level operational models continue beneath the portfolio TOM.

Adjacent work is referenced where relevant; not absorbed.

---

## Part 2: View-by-View Architectural Pass

For each view: current shape in the live HomeTest TOM, what holds at portfolio level, what has to change, and the recommended branching pattern.

The seven views called out in the brief are Why, What/Anatomy, What/Ecosystem, When/Lifecycle, How/Operational, Who/Governance, Teamwork. Plus Status as an adjacent surface. Plus the Index page, which is the entry point and sets altitude for everything else. Total: nine views considered below.

### View 1. Index (home)

**Current shape.** Five-question quadrant with WHY as central circle. WHAT (top-left), WHEN (top-right), HOW (bottom-left), WHO (bottom-right). Hero section above the quadrant anchors on three HomeTest patient archetypes (Abdul CVKM, Mark PSA-AS, Layla HbA1c). Below the quadrant: a Status panel, a Teamwork panel, a "How to read the model" five-question explainer, and "The cast" (nine personas: three patients plus six operating roles).

**Holds at portfolio level.** The five-question quadrant. The WHY-at-centre framing for navigation. The how-to-read explainer. The cast section pattern. The Status and Teamwork panels as entry points to deeper surfaces.

**Has to change.** The hero anchors on three HomeTest patient archetypes and uses the line "Three patient archetypes, served by the same architecture, the same cast, the same overlays." For DTx OM the hero anchors on the product stable. New framing: "Three products, one operating model, the same architecture across all of them." Patient archetypes per product become accessible via click-through, not the headline. The cast section reflects cross-product personas where universal (Sarah, Aisha, Ngozi, David, Priya) and product-specific where not (Joe stays HomeTest; HealthStore needs a DTx supplier persona; HealthSync TBC).

**Branching pattern.** Inline-branched callouts on the home page itself. The shared portfolio narrative carries; product-specific notes surface inline where things diverge. Product-specific patient archetypes link out to per-product overlay pages.

### View 2. Why

**Current shape.** Three lenses (Purpose, Economics, Adoption). Three strategic questions (Route to market, Commercial viability, Supply chain at scale). "Same shape as existing NHS national models" precedent panel framing accreditation, listing, access. Venn of Patient + Commissioner + Supplier with NHSE / HomeTest as envelope. Centre of Venn: "The service works. Trust. Clinical safety." Aisha (clinical), David (commercial), Ngozi (IG) shown as the three layers of the platform, not separate actors.

**Holds at portfolio level.** The three-lens framework (Purpose, Economics, Adoption). The three strategic questions (they apply to every DTx product). The Venn geometry. The platform-envelope framing. The "same shape, new application" precedent argument generalises cleanly to any DTx national model.

**Has to change.** The envelope label currently reads "NHSE / HomeTest". For DTx OM it becomes "NHSE / Digital Therapeutics" or equivalent product-stable framing. The patient archetypes shown in the patient circle are HomeTest patients; become a portfolio-level patient framing with product-specific archetypes accessible via click. Lens content currently has HomeTest-specific examples in places (CVKM screening, PSA active surveillance); lift to portfolio level with product-specific notes inline.

**Branching pattern.** Inline-branched callouts. The Venn, the lenses, the strategic questions are shared portfolio content. Product-specific Purpose / Economics / Adoption notes surface inline.

### View 3. What hub

**Current shape.** Two-lens entry page with Anatomy and Ecosystem as the two click-throughs. Short framing copy. Lens cards with bulleted summaries.

**Holds at portfolio level.** The two-lens entry. The framing of "what it is composed of" vs "the world it sits in".

**Has to change.** Lens card copy needs portfolio-level framing. Internal bullets currently reference HomeTest specifics.

**Branching pattern.** Shared, no branching needed at this level. Branching happens inside Anatomy and Ecosystem sub-pages.

### View 4. What / Anatomy

**Current shape.** Four-level inheritance vocabulary (L1 Foundation, L2 Overlay, L3 Pattern, L4 Configuration). Visual stack diagram. Catalogue card showing foundation rows and overlay rows with HIV / PSA columns. North-stars section (Commissioner, Supplier, HomeTest). Patient mission callout. Deep-dive link.

**Holds at portfolio level.** The four-level inheritance is the load-bearing pattern. The visual stack. The catalogue concept (foundation rows and overlay rows; product / configuration columns). The north-stars pattern.

**Has to change.** The catalogue currently has HIV and PSA columns (configurations within HomeTest). For DTx OM, product columns become primary (HomeTest, HealthStore, HealthSync) and configurations sit at a sub-level inside each product. The north-stars currently include "HomeTest" as the third star; for DTx OM it becomes "NHSE Digital Therapeutics" or equivalent portfolio framing. The Overlay layer content currently reflects HomeTest overlay specifics (kits, lab, postal, results delivery); becomes one of three product overlays with HealthStore overlay (app provisioning, prescribing flow, in-app engagement, outcome capture) and HealthSync overlay (TBC) alongside.

**Branching pattern.** Tabbed lens or hub-and-spoke. The shared L1 Foundation is one shared page. The L2 Overlay layer branches per product, either via tabs on the same page or via three sub-pages. L3 Pattern is a catalogue spanning all products. L4 Configuration nests per product. Decide tabs vs hub-and-spoke once we sketch the first version. Lean: tabs for visual parallelism that invites direct comparison.

### View 5. What / Ecosystem

**Current shape.** Hub-and-spoke. HomeTest at the centre as Category 1 ("Built and run"). Four cardinals around it: Consumed (6 services: NHS Login, NHS Notify, NHS App, FHIR, FDP, SPR), Regulated by (8 bodies: PTT, CSG, EScAL, Caldicott, NHS Legal, NHS Commercial, ICO, CQC), Contracted (5 categories: Framework suppliers, Acute trust partnership, Royal Mail, Pathology labs, Advisory & capacity), Served (3 audiences: Commissioners, Patients, Initiating clinicians). Each cardinal has its own sub-page.

**Holds at portfolio level.** The five-category structure. The hub-and-spoke pattern. The "intelligent client" framing (the BAU team is small because most operating mass sits outside it).

**Has to change.** The centre becomes portfolio-level ("NHSE Digital Therapeutics" or similar) with HomeTest as one product instance rather than the centre itself. Entities inside each category are mostly HomeTest-specific today. Cross-product analysis:

* **Consumed.** Largely shared. NHS App, NHS Login, NHS Notify, FHIR, FDP, SPR are platform-wide. Each product consumes some subset.
* **Regulated by.** Largely shared. Regulators apply across products with product-specific exceptions (CSG hazard logs differ per product, etc.).
* **Contracted.** Heavily product-specific. Royal Mail and pathology labs are HomeTest-specific. HealthStore has NICE EVA suppliers / software vendors instead. HealthSync has TBC.
* **Served.** Shared at audience-type level (commissioners, patients, clinicians). Per-product notes inline where audience composition differs (e.g. HealthStore adds prescribing clinicians as an active audience, not just initiating).

**Branching pattern.** Hub-and-spoke. The hub page is portfolio-level. Each cardinal sub-page either holds shared content (for Consumed, Regulated, Served) or branches further into product-specific sub-pages (for Contracted).

### View 6. When / Lifecycle

**Current shape.** Pentagon. Five stages (SHAPE, ASSURE, CONTRACT, FULFIL, MEASURE) at the vertices. Forward Flow + Feedback Loop arcs. Dynamic Market / Framework arc (ASSURE round to FULFIL). NHSE Capability arc (MEASURE round to SHAPE). Centre: three patient portraits, Purpose label, mission line ("Better access, earlier detection, fairer outcomes: at scale"), Product Stable label, then three product logos (HomeTest at full opacity, HealthStore at 30%, HealthSync at 30%) with the caption "Model designed for reuse across products". Each stage opens into a v4 deep-dive page (SHAPE v4, ASSURE v4, etc.).

**Holds at portfolio level.** Almost everything. The pentagon. The five stages. Both responsibility arcs. The centre construct (product stable) is already drawn for three products.

**Has to change.** The greyed logos turn full-colour as HealthStore content lands. Per-stage detail pages (v4) currently are HomeTest-flavoured in places; need product-level overlay where genuine differences exist. For example: Assure stage handles DCB0129 / DCB0160 for both products but supplier admission machinery differs (framework admin route vs NICE EVA conditional onboarding); surface that inline within the Assure page rather than splitting. Status counters on each stage need product-tagging (currently aggregated HomeTest-only).

The patient portraits at the centre currently are HomeTest patients; replace with a product-stable framing where the patient images become a click-through to per-product patient archetypes.

**Branching pattern.** Shared spine. Per-stage pages use inline-branched callouts to surface product-specific divergence where genuine.

### View 7. How / Operational

**Current shape.** Seven swimlanes, one per actor (Sarah, Joe, Aisha, Priya, David, Ngozi, plus a dedicated IG lane). Stage-keyed columns (Find, Decide, Onboard, Go live, Operate). Foundation vs Overlay colour coding inside lanes. Approximately 106KB of HTML. The most HomeTest-specific view in the model.

**Holds at portfolio level.** The swimlane construct itself (the format works). The actor-based lane structure (some actors are universal: Sarah, Aisha, Ngozi, David, Priya all generalise). The Foundation vs Overlay colour coding pattern.

**Has to change.** Most things, structurally. HomeTest swimlanes are organised around HomeTest actor flows: Joe runs lab logistics, Aisha holds clinical safety on the HomeTest hazard log, etc. HealthStore's operational shape (prescribing, in-app engagement, outcome capture under NICE EVA conditional) is materially different from HomeTest's (kit, postal, lab). HealthSync's is TBC. Each product needs its own operational layout because the activities, the actors and the timing all differ.

**Branching pattern.** Hub-and-spoke. The Operational hub page shows the shared operational framing (lifecycle stages, actor archetypes, the Foundation vs Overlay colour-coding convention) and links to per-product operational pages. Each product gets its own swimlane page at the depth its primaries support. HomeTest swimlanes carry forward to the HomeTest operational page essentially as they exist today. HealthStore swimlanes are built fresh. HealthSync remains stub.

### View 8. Who / Governance

**Current shape.** Decision rights, RACI tables, escalation routes. Ten open governance questions pending SLT input. Foundation / Overlay / Pattern / Configuration colour-coded against R / A / C / I.

**Holds at portfolio level.** NHSE accountability framing. Decision-rights, RACI, escalation pattern. The colour-coding convention.

**Has to change.** Supplier admission governance varies per product (HomeTest framework admin route vs HealthStore NICE EVA conditional onboarding). Clinical safety governance shares the DCB instruments but per-product hazard logs and safety case reports differ (e.g. HealthStore Hazard Log v0.1 names Servita as co-manufacturer with NHS England — different role mix from HomeTest). Open governance questions are currently HomeTest-tagged; some are portfolio-wide, some HomeTest-specific. Each needs review and re-tagging.

**Branching pattern.** Inline-branched callouts. The accountability framing is shared. Per-product supplier admission and clinical safety governance surface inline where they differ. Open questions get product-tagged.

### View 9. Teamwork

**Current shape.** Eleven HomeTest BAU capabilities, each with what has to land to stand it up and what it does in steady state. 40 to 90 FTE order-of-magnitude. Named "HomeTest teamwork" in the nav. Sized to the working principle that NHSE is a coordinating function, not a buyer.

**Holds at portfolio level.** The capability-based framing. The "BAU operating team" concept. The FTE order-of-magnitude approach. The stand-up vs steady-state framing per capability. The "coordinating function" working principle.

**Has to change.** The existing page is preserved as the HomeTest teamwork overlay. A new Teamwork hub page is added above it at portfolio level: portfolio capability list (anticipated overlap with HomeTest's eleven is significant, probably 60% to 70%, because most BAU capabilities are platform-level: framework admin, supplier management, IG operations, clinical safety stewardship), portfolio FTE order-of-magnitude, the "coordinating function" working principle stated once for the portfolio. Per-product teamwork overlays sit below the hub: HomeTest (the existing eleven-capability page intact), HealthStore (built as its capability set comes into focus), HealthSync (stub).

**Branching pattern.** Hub-and-spoke. Portfolio Teamwork hub page links down to per-product overlays. The existing HomeTest content is preserved entirely as the HomeTest overlay.

### View 10. Status

**Current shape.** Two main groupings: Unresolved (72 items) and In progress (34 items). Unresolved categories: Governance accountability 10, Architectural positioning 4, Open Qs for SLT 3, Operating risks 8, Stage-specific decisions 26, Operational mechanism 21. In progress organised by lifecycle stage: SHAPE 9, ASSURE 6, CONTRACT 12, FULFIL 7, MEASURE 0. Home-page panel pulls live counts from the Status page via fetch.

**Holds at portfolio level.** The two-grouping structure (Unresolved / In progress). The category-based unresolved breakdown. The stage-based in-progress breakdown. The live-fetch home-page panel pattern.

**Has to change.** Every item needs product tagging. The Unresolved categories need to add product as a secondary axis so any item can be tagged HomeTest, HealthStore, HealthSync or Portfolio-wide. Filtering needs to support product-based views (show me HealthStore unresolved only). Counts will change once HealthStore items start landing. Existing HomeTest items get a Product=HomeTest tag during migration.

**Branching pattern.** Single unified surface with items tagged by product. Filterable. No per-product status pages — that fragments the working view and loses the cross-product visibility that's the whole point.

---

## Part 3: First iteration — copy everything across, then mutate the frame

The starting move is to copy the entire HomeTest TOM into the new folder, rename files with a `DTx OM` prefix (or equivalent), and then mutate the portfolio frame around the preserved content. Nothing in the original `Operating Model\` folder is touched.

### Step 1: Bulk copy and rename

Copy every file from `Operating Model\` to `Digital Therapeutics Operating Model\`. Rename each HTML file with the new prefix. Personas, lifecycle stage v4 pages, ecosystem cardinal sub-pages all copy across. Assets keep the same `../../Assets/` reference path (so portraits and logos still resolve). The HomeTest TOM source is untouched.

### Step 2: Portfolio frame on the structurally portable pages

Mutate the following pages to portfolio level, in this order, because they set altitude for everything else and preserve their value while doing it:

* **Index.** Hero shifts from three HomeTest patient archetypes to the product stable. Five-question quadrant stays. Cast section adapts to show universal personas plus product-specific layers. Status and Teamwork panels link to the new pages.
* **Lifecycle.** Pentagon and stages stay. Centre block already has the product stable; activate HealthStore from greyed to full-colour as HealthStore content lands. HealthSync stays greyed until source mapping completes. Per-stage v4 pages keep the HomeTest content and gain inline callouts where HealthStore genuinely differs (e.g. Assure handles DCB0129/0160 for both products but supplier admission differs; surface that inline).
* **Anatomy.** Four-level stack preserved. Catalogue mutates: product columns at L2 Overlay become primary (HomeTest, HealthStore, HealthSync); HIV / PSA / HbA1c sit at L4 Configuration within the HomeTest column. HealthStore overlay populated at L2 from primaries. HealthSync L2 stub with explicit "primary source pending" markers. HealthStore configurations (COPD Alpha) added at L4. North-stars updated to portfolio framing.
* **Why.** Lenses, strategic questions, Venn all stay. Envelope label changes from "NHSE / HomeTest" to "NHSE / Digital Therapeutics" or equivalent. Patient circle in the Venn shows portfolio-level patient framing with product-specific archetypes accessible via click. HomeTest-specific examples inside the lenses surface as inline callouts.
* **What hub.** Lens cards mutate to portfolio-level framing.
* **Ecosystem hub.** Centre shifts from HomeTest to NHSE/DTx. Five-category structure stays. Cardinals retain the same shape; their sub-pages (Built, Consumed, Regulated, Contracted, Served) keep HomeTest content as the HomeTest layer with HealthStore content added alongside where primaries support it.

### Step 3: HomeTest overlay treatment for HomeTest-specific pages

Operational, Teamwork, the per-stage v4 pages, the ecosystem cardinal sub-pages, the HomeTest persona pages all sit as the HomeTest overlay surface within the new structure. They preserve HomeTest content word-for-word. Above them, a portfolio-level hub page is added that frames the cross-product view and links down to the HomeTest overlay plus the HealthStore overlay and the HealthSync stub.

Specifically:

* **Operational.** Add an Operational hub page that frames the shared operational construct (lifecycle stages, actor archetypes, Foundation vs Overlay colour-coding convention). Existing Operational page becomes the HomeTest operational overlay, accessed from the hub. HealthStore operational overlay built fresh alongside, at the depth its primaries support. HealthSync operational stub.
* **Teamwork.** Add a Teamwork hub page at portfolio level (portfolio capability list, FTE order-of-magnitude at portfolio level, the "coordinating function" working principle). Existing Teamwork page becomes the HomeTest teamwork overlay, accessed from the hub. HealthStore teamwork overlay built as its capability set comes into focus. HealthSync stub.

### Step 4: Status as a unified product-tagged surface

Status page restructures to add product as a tagging axis. Every existing item keeps its content and gains a `Product=HomeTest` tag. Filter UI added to support product-based views. HealthStore items added as primaries surface them. Home-page Status panel updated to show portfolio totals with optional per-product filter.

### Step 5: Personas

Universal personas (Sarah, Aisha, Ngozi, David, Priya) copy across with portfolio-level framing applied to the page hero and product-specific notes inline where role detail varies. HomeTest-specific personas (Joe the kit supplier, Abdul, Mark, Layla) copy across with explicit "HomeTest configuration" framing. New personas added for HealthStore (DTx supplier, COPD patient archetype, prescribing clinician if confirmed from primaries) and HealthSync (TBC pending source mapping).

### Estimated work

The bulk copy and rename in step 1 is mechanical. Probably an hour including path checks.

Steps 2 to 4 are where the analytical work sits. Index, Lifecycle, Anatomy and Status are the four most load-bearing pages and take the longest to mutate well. Why, What hub, Ecosystem hub mutate faster because the patterns hold cleanly at portfolio level. Operational hub and Teamwork hub are new pages built above preserved content; medium effort.

Personas updated one at a time as new product overlays land.

Order-of-magnitude total for steps 1 through 4 (the structurally critical work): three to four days of focused work. Personas and per-stage v4 mutations add up to another two to three days. The HealthStore overlay content is the bottleneck after that, gated on primaries and validator availability.

### Quality bar

Every page in the new DTx OM is held to the same quality bar as the live HomeTest TOM. Where content can be lifted directly with framing adjustments, it is. Where content needs new material (HealthStore overlays, HealthSync stubs, portfolio hub pages), the same standard of evidence, structure and writing applies. The DTx OM is not a lighter-touch version of HomeTest TOM. It is the same standard, applied across products.

### Dependencies before the build starts

1. HealthStore primaries pulled into a working set. KB 11, KB 12, the E-drive SharePoint files (HealthStore Hazard Log v0.1, Clinical Safety Case Report v1.0, the Belostecinic teach-in materials), the £11m funding envelope confirmation, the five NICE EVA suppliers list, the COPD Alpha service detail, the 18-month roadmap to Commissioner Store v1.
2. Decision on filename convention. Suggested: `DTx OM - X.html`. Locked once first file is created.
3. Confirmation that the copy-everything-and-rename approach in step 1 is the right starting move.

---

*End of document. Version 1, 22 May 2026.*

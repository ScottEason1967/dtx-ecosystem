# Digital Therapeutics Operating Model
## First Iteration Handover

**22 May 2026. Scott Eason.**

The DTx OM first iteration is built. This document is the handover note for review.

---

## What is in the new folder

`NHS Commercial Model\Digital Therapeutics Operating Model\` contains 29 HTML files plus an `Architecture\` sub-folder with the ADR and this handover.

The HTML set:

- **Hub and navigation pages** (Index, Why, What hub, Anatomical, Ecosystem hub, Lifecycle, Operational, Governance, Status, Teamwork)
- **Ecosystem cardinal sub-pages** (Built, Consumed, Regulated, Contracted, Served)
- **Lifecycle stage v4 detail pages** (SHAPE, ASSURE, CONTRACT, FULFIL, MEASURE)
- **Personas** (Sarah, Aisha, Priya, David, Ngozi as universal; Joe as HomeTest supplier archetype; Abdul, Mark, Layla as HomeTest patient archetypes)

The original HomeTest TOM at `NHS Commercial Model\Operating Model\` is untouched. File timestamps confirm no modifications.

The design system carries across intact. CSS, fonts, colours, NHS rebrand gradient, top-nav pattern, asset references all match the live HomeTest TOM. The site renders consistently with the existing artefact.

## What was done in this iteration

### Step 1: Bulk copy and link rewrite

All 29 HTML files from the HomeTest TOM copied to the new folder with `DTx OM` prefix. Internal cross-links rewritten from HomeTest TOM filenames to DTx OM filenames. Assets path resolves via the existing `../../Assets/` convention. Original folder untouched.

### Step 2: Pages mutated to portfolio altitude

**Index.** Hero anchored on the product stable (HomeTest, HealthStore, HealthSync) rather than three HomeTest patient archetypes. Five-question quadrant retained. Cast section reframed around universal operating roles plus product-specific actors. Teamwork panel renamed. WHY caption lifted from "earlier detection" to "earlier action" for portfolio applicability.

**Why.** Hero sub paragraph names the three products. Venn envelope re-labelled from "NHSE / HomeTest" to "NHSE / Digital Therapeutics". Lens content lifted (testing-specific language broadened to digital therapeutics). Precedent panel updated. Adoption lens unchanged because it was already universal.

**Anatomical.** Hero intro now names the three products and the four-level inheritance. Persona strip body reframed. L1 Foundation language updated from "what HomeTest builds" to "what the platform builds" with explicit note about cross-product application. North star for HomeTest re-labelled "North star for the platform". L4 vocabulary updated to acknowledge configurations nest inside product overlays. Section heading 03 acknowledges the catalogue shows HomeTest configurations today with HealthStore and HealthSync columns to follow.

**What hub.** Lens cards updated to reflect portfolio scope. Both Anatomy and Ecosystem lenses now describe what the platform holds across all Digital Therapeutics products.

**Ecosystem hub.** Hero re-titled. Centre block re-labelled from "Built and run by HomeTest" to "Built and run by the platform". Cardinal descriptions noted that entities vary per product. BAU sizing note carries a portfolio-level reframe.

**Lifecycle.** Top nav and title aligned with the portfolio framing. Mission line in the centre of the pentagon lifted from "earlier detection" to "earlier action". Centre-hub future note honest about state: "HomeTest content populated today; HealthStore and HealthSync content as primaries land." Product stable in the centre of the pentagon was already structurally correct (HomeTest active, HealthStore and HealthSync greyed) and stays that way.

### Step 3: HomeTest-overlay treatment for HomeTest-specific pages

**Operational.** H1 marked as "HomeTest overlay" in subtitle. Sub-line explicitly frames the page as the HomeTest operational overlay within the Digital Therapeutics Operating Model, with a portfolio Operational hub page noted to sit above it (build deferred to next iteration). HomeTest swimlane content preserved word-for-word.

**Teamwork.** H1 marked similarly as the HomeTest overlay within the DTx OM. Top nav active label aligned. Header eyebrow reframed. Eleven HomeTest capabilities and FTE order-of-magnitude content preserved word-for-word.

### Step 4: Status surface acknowledgement

H1 carries an inline note: "All items shown today are HomeTest. Product tagging and per-product filtering added when HealthStore items land." Full product-tagging restructure (filter UI, secondary tagging axis) deferred to next iteration.

### Step 5: Personas

Universal personas (Sarah, Aisha, Priya, David, Ngozi) carry across unchanged. They work at portfolio level as-is. HomeTest-specific personas (Joe, Abdul, Mark, Layla) carry a small "HomeTest archetype" label in the eyebrow so it is explicit when read in DTx OM context that they are HomeTest examples.

### Universal mutations across all 29 files

Page titles standardised to "Digital Therapeutics Operating Model: [view]" form (or "[view]: Digital Therapeutics Operating Model" for personas and stage pages). Top nav "HomeTest teamwork" label replaced with "Teamwork" everywhere it appeared.

### Quality bar

Every page in the new DTx OM passes the same integrity checks: closing HTML / body / script tags intact, internal link targets resolve, tag open / close balance correct. The 532 internal links across the site all resolve to files inside the new folder. No broken hrefs.

## What is deferred to subsequent iterations

The first iteration was scoped (per ADR Part 3) to settle structure and lift the existing HomeTest TOM to portfolio altitude. The following are explicitly NOT done yet and sit as the next iteration:

1. **Anatomy catalogue restructure.** Today the catalogue shows HIV and PSA as column headers (HomeTest configurations). Next iteration restructures so HomeTest, HealthStore and HealthSync are the primary column headers, with HIV / PSA / HbA1c / COPD Alpha sitting as L4 configurations inside their parent product. Foundation rows stay shared.

2. **HealthStore overlay content.** Drawn from KB 11, KB 12, the E-drive SharePoint files (Hazard Log v0.1, Clinical Safety Case Report v1.0, Belostecinic teach-in), the £11m envelope confirmation, the five NICE EVA suppliers, COPD Alpha service detail and the 18-month roadmap. Populated when primaries are pulled into a working set. Requires a HealthStore-side validator.

3. **HealthSync content.** Stays as structural placeholder pending primary-source mapping. Source identification is its own piece of work.

4. **Portfolio Operational hub page.** New page that frames the shared operational construct (lifecycle stages, actor archetypes, Foundation vs Overlay colour-coding) and links down to per-product operational pages. Existing Operational page becomes accessible from the hub.

5. **Portfolio Teamwork hub page.** New page at portfolio capability level, linking down to per-product overlays. Existing Teamwork page becomes the HomeTest overlay.

6. **Status restructure with product tagging.** Add product as a secondary axis. Tag every existing item Product=HomeTest. Add HealthStore items as primaries surface them. Build filter UI for per-product views. Update home-page Status panel to handle filtered counts.

7. **Per-stage v4 page mutations.** SHAPE, ASSURE, CONTRACT, FULFIL, MEASURE detail pages currently carry HomeTest-specific content embedded in narrative. Inline-branched callouts to surface HomeTest-specific vs portfolio-shared content. Lower priority because the master Lifecycle view already carries the multi-product framing.

8. **HealthStore and HealthSync personas.** DTx supplier archetype, COPD patient archetype, prescribing clinician (if confirmed from primaries) for HealthStore. HealthSync personas pending source mapping.

9. **Ecosystem cardinal sub-pages.** Built / Consumed / Regulated / Contracted / Served sub-pages currently show HomeTest-specific entities. Restructure these to show portfolio-level entities with HomeTest-specific notes inline.

## Two operational housekeeping notes

A `.BROKEN-edits-snapshot` sidecar file sits next to `DTx OM - Index.html`. It captures the truncated state of the Index page that appeared during the first round of Edit tool calls (root cause not fully traced; symptom was reliable). The bulk-copy method I used after recovery produced a clean Index. The sidecar is inert. Filesystem permissions in the workspace prevented bash removal; the file can be deleted manually by selecting it in the folder.

The build approach lesson is saved as a persistent memory: for large HTML files with multiple mutations, default to an atomic Python script with file-integrity assertions rather than a sequence of Edit tool calls. This is now the pattern for every subsequent page-level mutation in the DTx OM build.

## How to view the site

Open `DTx OM - Index.html` in a browser. Navigation works end to end. All linked persona pages, sub-pages and stage detail pages resolve and render. Visual design matches the existing HomeTest TOM.

The site sits in the user's selected folder and can be served from there directly or pushed to GitHub Pages or other hosting when the time comes. The ADR captures hosting as one of the open decisions.

---

*Iteration 1 complete. Ready for review.*

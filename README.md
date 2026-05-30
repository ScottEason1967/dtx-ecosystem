# NHS DTx Ecosystem

The coordinated working environment for NHS Digital Therapeutics commercial and operational work.

This folder is the canonical source of truth for the DTx ecosystem artefacts. Three products in scope (HomeTest, HealthStore, HealthSync) and a stack of supporting artefacts that together describe what the programmes are, how they operate, what positions have been formally adopted, and how they are sold.

## Where to start

Open `index.html` in a browser. That is the front door. It links to every other artefact.

## Structure

```
dtx-ecosystem/
├── index.html                      The front door, the wayfinding entry point
├── ECOSYSTEM-BRIEF.md              Internal coordination brief (cardinal positions, working norms)
├── README.md                       This file
├── assets/                         Shared images and logos
│   ├── personas/                   Persona portrait PNGs
│   ├── illustrations/              Programme illustrations
│   └── *.svg, *.jpg                Logos and product icons
├── operating-model/                The DTx Operating Model (architectural reference + Map to 2030)
├── playbooks/                      Playbooks landing, product selector
│   ├── index.html
│   └── hometest.html               HomeTest playbook set
├── hometest/
│   └── commercial-playbook/        The HomeTest Commercial Playbook (live)
└── position-papers/                Nine formal position papers + index
```

## How the artefacts join up

Read `ECOSYSTEM-BRIEF.md` for the full rule. The short version: each artefact references the others; none re-states the others. The Position Papers are authoritative on positions. The Playbook is authoritative on operational mechanics. The DTx Operating Model is authoritative on architecture. The Map is authoritative on time and sequencing. The Hearts and Minds materials defer to the others.

## What is in each layer

**The Map to 2030.** Strategic front door. Where the DTx commercial journey is going and when. Lives at `operating-model/DTx OM - Map to 2030 v3.html`.

**The DTx Operating Model.** Architectural reference. Operational lanes, lifecycle stages, foundation chips, governance roles, personas and capabilities. Lives at `operating-model/index.html`.

**The Playbooks.** Operating manuals for the teams running each programme day-to-day. HomeTest Commercial is live; Clinical, IG, Platform, Engagement, Strategic Finance are on the roadmap for HomeTest. HealthStore and HealthSync playbooks come as those programmes mature. Live at `playbooks/index.html`.

**The Position Papers.** The formal positions adopted, each crystallising a single decision with rationale, reopen triggers and dependencies. Nine live papers at `position-papers/index.html`.

**Hearts and Minds materials.** Pitch decks and persuasion collateral, drawn from the OM's character work. In scoping; not yet built into this folder.

## Working norms

1. Read `ECOSYSTEM-BRIEF.md` before structural work on any artefact.
2. If a position changes, the Position Paper changes first. Other artefacts follow.
3. If unsure which artefact owns a piece of content, ask. Do not duplicate content into two artefacts.
4. Backups before structural edits.
5. No named individuals in artefacts. Functional descriptors only.

## Versioning

This folder uses stable filenames. No version numbers in filenames (other than legacy artefacts in the operating-model that will be migrated over time). Version history is captured in Git once the folder is published.

## Migrated from

This structure was created on 28 May 2026 by consolidating artefacts from the previous `NHS Commercial Model/` working folder. The old folder is preserved as an archive for reference. Any work going forward happens in this folder, not in the archive.

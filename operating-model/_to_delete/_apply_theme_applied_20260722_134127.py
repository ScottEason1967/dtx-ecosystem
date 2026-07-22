#!/usr/bin/env python3
# Theme fix for DTx persona pages: recolour journey buttons to each persona's
# cast-active colour, and add the persona-colour-cascade block to unthemed personas.
# Two-phase: compute + assert every file BEFORE writing anything (atomic-ish).
import sys, os, re

TARGET = sys.argv[1]

GOLD_SIG = ("background:#FFB91D;color:#003087;font-weight:800;font-size:13px;"
            "letter-spacing:0.3px;padding:10px 20px;border-radius:8px;")

def new_btn(bg, text):
    return (f"background:{bg};color:{text};font-weight:800;font-size:13px;"
            "letter-spacing:0.3px;padding:10px 20px;border-radius:8px;")

def cascade(deep, light, panelbg):
    return (
        "/* persona-colour-cascade */\n"
        f"  .amber-rule{{background:{light} !important;}}\n"
        f"  .h-title{{color:{deep} !important;}}\n"
        f"  .h-role{{color:{deep} !important;}}\n"
        f"  .h-quote{{border-left-color:{light} !important;}}\n"
        f"  .section-h{{color:{deep} !important;}}\n"
        f"  .where-panel{{background:{panelbg} !important;border-left-color:{light} !important;}}\n"
        f"  .where-panel .label{{color:{deep} !important;}}\n"
        f"  .where-list li::before{{background:{light} !important;}}\n"
        f"  .open-q-block{{border-left-color:{light} !important;}}\n"
        "  /* end persona-colour-cascade */\n  "
    )

# category cascade tones (deep title/role, light bar/accent, panel bg) - verbatim from exemplars
CLIN  = cascade("#5E35B2", "#C9A0E3", "#F2ECFA")   # Adam/Hannah
PURP  = cascade("#4527A0", "#4527A0", "#EDE7F6")   # Sean
GOLD  = cascade("#7A5A20", "#FFB91D", "#FFF5E0")   # Devi
GREEN = cascade("#2A7A4A", "#5BC093", "#E8F5EE")   # Joe

NAVRG = "/* nav-rg-reading-guide */"

# filename -> {'btn':(bg,text)|None, 'cascade':block|None, 'bar':(old,new)|None}
PLAN = {
 "DTx OM - Persona Abdul.html":                          {'btn':("#FFB91D","#231F20")},
 "DTx OM - Persona Mark.html":                           {'btn':("#FFB91D","#231F20")},
 "DTx OM - Persona Devi.html":                           {'btn':("#FFB91D","#231F20")},
 "DTx OM - Persona Sarah.html":                          {'btn':("#003087","#ffffff")},
 "DTx OM - Persona Catherine.html":                      {'btn':("#003087","#ffffff")},
 "DTx OM - Persona Anita.html":                          {'btn':("#003087","#ffffff")},
 "DTx OM - Persona Adam.html":                           {'btn':("#C9A0E3","#231F20")},
 "DTx OM - Persona Hannah.html":                         {'btn':("#C9A0E3","#231F20")},
 "DTx OM - Persona Joe.html":                            {'btn':("#5BC093","#ffffff")},
 "DTx OM - Persona HealthStore prescribing clinician.html": {'btn':("#C9A0E3","#231F20"), 'cascade':CLIN},
 "DTx OM - Persona HealthSync patient.html":             {'btn':("#4527A0","#ffffff"), 'cascade':PURP,
                                                          'bar':("#FFB91D","#4527A0")},
 "DTx OM - Persona HealthStore supplier.html":           {'btn':("#5BC093","#ffffff"), 'cascade':GREEN},
 "DTx OM - Persona HealthSync diabetes patient.html":    {'cascade':GOLD},
 "DTx OM - Persona HealthStore COPD patient.html":       {'cascade':GOLD},
 "DTx OM - Persona Tariq.html":                          {'cascade':GREEN},
}

BAR_TMPL = 'persona-accent-bar" style="height:4px;background:{c};width:100%;"'

pending = []   # (path, newcontent, notes)
errors = []

for fn, ops in PLAN.items():
    path = os.path.join(TARGET, fn)
    if not os.path.exists(path):
        errors.append(f"MISSING FILE: {fn}"); continue
    with open(path, encoding='utf-8') as f:
        s = f.read()
    orig = s
    notes = []
    div0 = (s.count('<div'), s.count('</div>'))

    if ops.get('btn'):
        bg, text = ops['btn']
        n = s.count(GOLD_SIG)
        if n != 1:
            errors.append(f"{fn}: expected 1 gold button sig, found {n}"); continue
        s = s.replace(GOLD_SIG, new_btn(bg, text))
        if new_btn(bg, text) not in s:
            errors.append(f"{fn}: new button colour not present after replace"); continue
        notes.append(f"button->{bg}/{text}")

    if ops.get('bar'):
        old_c, new_c = ops['bar']
        old_bar = BAR_TMPL.format(c=old_c); new_bar = BAR_TMPL.format(c=new_c)
        n = s.count(old_bar)
        if n != 1:
            errors.append(f"{fn}: expected 1 accent-bar {old_c}, found {n}"); continue
        s = s.replace(old_bar, new_bar)
        notes.append(f"accent-bar {old_c}->{new_c}")

    if ops.get('cascade'):
        if 'persona-colour-cascade' in s:
            errors.append(f"{fn}: cascade already present, refusing to double-insert"); continue
        if s.count(NAVRG) < 1:
            errors.append(f"{fn}: nav-rg marker not found, cannot place cascade"); continue
        # insert before first nav-rg marker
        idx = s.find(NAVRG)
        s = s[:idx] + ops['cascade'] + s[idx:]
        if s.count('/* persona-colour-cascade */') != 1 or s.count('/* end persona-colour-cascade */') != 1:
            errors.append(f"{fn}: cascade markers != 1 after insert"); continue
        notes.append("cascade+")

    # post-edit integrity
    div1 = (s.count('<div'), s.count('</div>'))
    if div1 != div0:
        errors.append(f"{fn}: div balance changed {div0}->{div1}"); continue
    if not s.rstrip().endswith('</html>'):
        errors.append(f"{fn}: does not end with </html>"); continue
    if '\x00' in s[-400:]:
        errors.append(f"{fn}: null byte in tail"); continue
    if s == orig:
        errors.append(f"{fn}: no change made (unexpected)"); continue
    pending.append((path, s, notes))

if errors:
    print("!! ABORTED - preconditions failed, NOTHING written:")
    for e in errors: print("   -", e)
    sys.exit(1)

for path, s, notes in pending:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(s)
    print(f"OK  {os.path.basename(path):52} {', '.join(notes)}")
print(f"\nWROTE {len(pending)} files, 0 errors.")

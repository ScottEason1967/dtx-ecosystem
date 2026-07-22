#!/usr/bin/env python3
# Round 2: Errol back to gold patient theme (page + his nav chip everywhere),
# and fix the stretched Reading-guide button on Errol and Mei (add align-items:center).
import sys, os, re, glob
TARGET = sys.argv[1]

PURP_CASCADE = """/* persona-colour-cascade */
  .amber-rule{background:#4527A0 !important;}
  .h-title{color:#4527A0 !important;}
  .h-role{color:#4527A0 !important;}
  .h-quote{border-left-color:#4527A0 !important;}
  .section-h{color:#4527A0 !important;}
  .where-panel{background:#EDE7F6 !important;border-left-color:#4527A0 !important;}
  .where-panel .label{color:#4527A0 !important;}
  .where-list li::before{background:#4527A0 !important;}
  .open-q-block{border-left-color:#4527A0 !important;}
  /* end persona-colour-cascade */"""
GOLD_CASCADE = """/* persona-colour-cascade */
  .amber-rule{background:#FFB91D !important;}
  .h-title{color:#7A5A20 !important;}
  .h-role{color:#7A5A20 !important;}
  .h-quote{border-left-color:#FFB91D !important;}
  .section-h{color:#7A5A20 !important;}
  .where-panel{background:#FFF5E0 !important;border-left-color:#FFB91D !important;}
  .where-panel .label{color:#7A5A20 !important;}
  .where-list li::before{background:#FFB91D !important;}
  .open-q-block{border-left-color:#FFB91D !important;}
  /* end persona-colour-cascade */"""
PURP_BTN = "background:#4527A0;color:#ffffff;font-weight:800;font-size:13px;letter-spacing:0.3px;padding:10px 20px;border-radius:8px;"
GOLD_BTN = "background:#FFB91D;color:#231F20;font-weight:800;font-size:13px;letter-spacing:0.3px;padding:10px 20px;border-radius:8px;"
PURP_BAR = 'persona-accent-bar" style="height:4px;background:#4527A0;width:100%;"'
GOLD_BAR = 'persona-accent-bar" style="height:4px;background:#FFB91D;width:100%;"'
NAVRULE   = ".topnav.topnav-secondary .nav-siblings{flex-wrap:nowrap;overflow-x:auto;justify-content:flex-end;}"
NAVRULE_C = ".topnav.topnav-secondary .nav-siblings{flex-wrap:nowrap;overflow-x:auto;justify-content:flex-end;align-items:center;}"
ERROL = "DTx OM - Persona HealthSync patient.html"
MEI   = "DTx OM - Persona HealthSync diabetes patient.html"
CAST_ERROL_RE = re.compile(r'(\.nav-siblings a\.cast-errol\.active\{background:)#4527A0;color:#ffffff;(\})')

errors=[]; pending=[]
for path in sorted(glob.glob(os.path.join(TARGET,'*.html'))):
    fn=os.path.basename(path)
    if 'bak' in fn.lower(): continue
    with open(path,encoding='utf-8') as f: s=f.read()
    orig=s; div0=s.count('<div'); notes=[]

    if CAST_ERROL_RE.search(s):
        s,n = CAST_ERROL_RE.subn(r'\g<1>#FFB91D;color:#231F20;\g<2>', s)
        notes.append(f"cast-errol->gold x{n}")

    if fn==ERROL:
        for name,old,new in [("cascade",PURP_CASCADE,GOLD_CASCADE),("button",PURP_BTN,GOLD_BTN),
                             ("bar",PURP_BAR,GOLD_BAR),("align",NAVRULE,NAVRULE_C)]:
            if s.count(old)!=1: errors.append(f"{fn}: {name} old-string count {s.count(old)} != 1"); break
            s=s.replace(old,new)
        else:
            notes.append("errol->gold+align")

    if fn==MEI:
        if s.count(NAVRULE)!=1: errors.append(f"{fn}: align navrule != 1")
        else: s=s.replace(NAVRULE,NAVRULE_C); notes.append("mei align")

    if not notes: continue
    if s.count('<div')!=div0: errors.append(f"{fn}: div count changed"); continue
    if not s.rstrip().endswith('</html>'): errors.append(f"{fn}: no </html>"); continue
    if '\x00' in s[-400:]: errors.append(f"{fn}: null tail"); continue
    if s==orig: errors.append(f"{fn}: no change despite notes"); continue
    pending.append((path,s,notes))

if errors:
    print("!! ABORTED - NOTHING written:")
    for e in errors: print("   -",e)
    sys.exit(1)
for path,s,notes in pending:
    open(path,'w',encoding='utf-8').write(s)
    print(f"OK {os.path.basename(path)[:48]:48} {', '.join(notes)}")
print(f"\nWROTE {len(pending)} files, 0 errors.")

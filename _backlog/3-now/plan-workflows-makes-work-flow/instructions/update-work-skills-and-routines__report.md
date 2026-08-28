# Sub-Agent REPORT (#worker)

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `update-work-skills-and-routines`

**Outcome:** `COMPLETED`

## Evidence

### Changes

| Goal | Outcome |
| ---- | ------- |
| Extract common routines from write-plan and write-milestone skills to the work domain | Done — 4 new routine files created |
| Update write-plan skill to load routines via `::READ` directives | Done — removed inline routines, added directives, updated all references |
| Update write-milestone skill to load routines via `::READ` directives | Done — removed inline routines, added directives, removed instruction file routine |
| Update work domain index with new routines section | Done — added Routines table entry for all 4 new routines |

#### Files changed

- `.agents/domains/work/routines/compose-work-scope.art` — **Created.** Extracted routine for composing work scope from write-plan skill.
- `.agents/domains/work/routines/compose-work-context.art` — **Created.** Extracted routine for composing work context from write-plan skill.
- `.agents/domains/work/routines/compose-work-operations.art` — **Created.** Extracted routine for composing work operations from write-plan skill.
- `.agents/domains/work/routines/compose-operating-instructions.art` — **Created.** Extracted routine for composing operating instructions from write-plan skill.
- `.agents/domains/work/index.md` — **Updated.** Added Routines section listing all 4 new routines.
- `.agents/skills/write-plan/SKILL.md` — **Updated.** Added `::READ` directives for 4 new routines; removed inline `Composing Plan Scope` and `Composing Plan Context` routines; updated all command references to use `Compose Work Scope` and `Compose Work Context`.
- `.agents/skills/write-milestone/SKILL.md` — **Updated.** Added `::READ` directives for 4 new routines; removed inline `Composing Plan Scope`, `Composing Plan Context`, and `Create or Update Instruction File` routines; updated all command references.

## Blockers

None.

## Verification

- `npm run lint:fix` — passed (auto-fixed formatting in index.md).
- `npm run lint` — all files pass Prettier code style.
- Commit passed pre-commit lint hook.
- Push successful to `origin/main`.

## Uncertain Matches

- The `Create or Update Instruction File` routine was removed from write-milestone per instruction ("No instructions file routine for milestones (phases will be added later)"). The step 9 in `Create OR Update Plan` was updated to reference generating instruction files generically rather than calling the removed routine.

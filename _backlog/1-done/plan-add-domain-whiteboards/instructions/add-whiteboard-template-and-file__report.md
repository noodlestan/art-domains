# Sub-Agent REPORT (#producer)

**Plan:** `add-domain-whiteboards`

**Iteration Id:** `add-whiteboard-template-and-file`

**Outcome:** `COMPLETED`

## Evidence

### Changes

| Goal                                                                                                                                           | Outcome                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Define how a whiteboard is presented — `whiteboard.tart` rendering every modelled section plus the full three-part `Instructions` constitution | Done — template renders all 7 sections and all 3 Instructions subsections; no unmodelled, contract, or domain-specific section rendered |
| Define where the whiteboard file lives — the `files/whiteboard.art` file convention                                                            | Done — naming pattern, template reference, and repository scoping note declared                                                         |

Verification: `npx prettier --write .agents/domains/whiteboards` clean; `npm run ci` green before commit and again inside the pre-commit hook. Final-verification checks confirmed: both files exist; the template renders `Facilitation`, `Participants`, `Attachments`, `Parking lot`, `Changes`, `Follow-ups`, and `Instructions`; zero occurrences of `Contracts`; `## Instructions` renders `Turn`, `Document Structure`, and `Goals`; every field-backed rendered section maps to a field in `structures/whiteboard.art` (`facilitation`, `participants`, `attachments`, `changes`, `follow-ups`) — `Parking lot` renders the canon subsections of the depended-upon `parking-lot` skill and `Instructions` is the constitution mandated by the iteration.

#### Files changed

- `.agents/domains/whiteboards/templates/whiteboard.tart` — new. Mirrors `plan.tart` syntax (`::TEMPLATE`, `::TEMPLATE::READ`, `::READ`, `::EXAMPLE … ::END`, `{{%…}}`). Renders header (`name`, `id`, `purpose`, `description`) then the seven base sections in order: Facilitation (`turn`, `goal`, tasks as checkboxes, working-agreements, participant-statuses, sentiment, `Done:`, `Expected final outline`), Participants (per participant: status, planning, goals, deliverables, optional expectations, attachment), Attachments (path + purpose, incl. resolved parking-lot archive), Parking lot (Actionable / Pending/Questions / Blockers), Changes (one bullet per turn), Follow-ups, and the full three-part Instructions constitution (Turn / Document Structure / Goals). Sentiment, `Done:`, and `Expected final outline` are marked optional late-emerging; `Expected final outline` is encoded as the first-class structural contract; no contract or domain-specific section is ever rendered.
- `.agents/domains/whiteboards/files/whiteboard.art` — new. Declares the whiteboard file convention mirroring `plans/files/plan.art`: Naming Pattern `whiteboard-{whiteboard.id}.md` (single-board repositories may use `whiteboard.md`, following the reference board), Template reference to `templates/whiteboard.tart`, and the placement note — the board lives in the workspace repository while participants' planning artefacts live in their own `checkouts/*` repositories and follow their own conventions; the board never stages them.

Commit: `ad95178` `build(domain-whiteboards): Add Whiteboard template and file convention.` — committed and pushed to `origin/building` (workspace root repository) per the commit's AUTONOMOUS policy.

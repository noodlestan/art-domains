# Instructions: `add-whiteboard-template-and-file`

**Plan:** `add-domain-whiteboards`

**Iteration Id:** `add-whiteboard-template-and-file`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-domain-whiteboards/instructions/add-whiteboard-template-and-file__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-whiteboard-template-and-file`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for all new files |
| `$PROJECT`   | Provided with prompt         | Backlog hosting this plan                    |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources under change                |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Agent modes and skills directory             |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-whiteboard-template-and-file`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Define how a whiteboard is presented and where the whiteboard file lives: the `whiteboard.tart` template rendering every modelled section plus the full three-part `Instructions` constitution, and the `files/whiteboard.art` file convention.

Every rendered section must already be modelled — nothing is rendered that the structure cannot hold — and no contract or domain-specific section is rendered.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `$DOMAINS/plans/templates/plan.tart` — template syntax: `::TEMPLATE`, `::READ`, `::EXAMPLE … ::END` blocks.
- `$DOMAINS/plans/files/plan.art` — file convention shape (naming pattern, template reference).
- `$DOMAINS/whiteboards/structures/whiteboard.art` — created in `add-whiteboard-structures`; the fields available to render.
- `$DOMAINS/whiteboards/domain.art` — created in `add-whiteboard-structures`.
- `$PROJECT/_backlog/3-now/plan-add-domain-whiteboards/plan__whiteboard-snapshot.md` — the reference board whose `## Instructions` constitution this template must reproduce.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
npm run ci # to verify build is green before starting
```

If any of these fail, resolve the issue before proceeding with implementation.

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the commit message following: the rules defined there.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npx prettier --write .agents/domains/whiteboards # format new .md/.art files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you create before committing.

---

## Changes

This iteration adds presentation and placement only: no new structures, no routines.

- Step 1 / 3 — Create `templates/whiteboard.tart`
- Step 2 / 3 — Create `files/whiteboard.art`
- Step 3 / 3 — Commit `build-whiteboard-template`

## Steps

### Step `1 / 3` — Create `templates/whiteboard.tart`

Create `$DOMAINS/whiteboards/templates/whiteboard.tart` using the `render-template` skill, mirroring the syntax of `$DOMAINS/plans/templates/plan.tart`.

Render, in order:

1. `## Facilitation` — `turn` (identifier or `FACILITATOR`), `goal`, `tasks` as checkboxes, `working-agreements`, `participant-statuses`, `sentiment` (one line per participant), `Done:` as a list of finished goals, and `Expected final outline`.
2. `## Participants` — one subsection per participant: `status`, `planning`, `goals`, `deliverables`, `expectations` (optional), `attachment`.
3. `## Attachments` — `path` plus purpose for each, including the resolved parking-lot archive.
4. `## Parking lot` — the canon subsections for actionable items, pending questions, and blockers.
5. `## Changes` — one entry per turn: participant, date, description.
6. `## Follow-ups` — deferred items.
7. `## Instructions` — the full three-part constitution below.

Rules the template must encode:

- Sections outside the base set are **late-emerging and optional** (sentiment, `Done:`, `Expected final outline`); never hardcode a contract or domain-specific section.
- `Expected final outline` is a first-class field: sections not listed in it are outside the agreed structure.
- Every rendered section must be modelled in `structures/whiteboard.art`. If a section has no field, do not render it.

The `## Instructions` section renders three subsections:

- `### Turn` — run `Routine: Validate Whiteboard` before any write; only the participant named in `turn` writes; stage workspace files only (board and attachments), leave your own turn unstaged for the next participant, or let the facilitator commit; update your own `sentiment` line only; append rather than rewrite; add exactly one succinct `changes` bullet (≤120 chars); keep a rolling `changes` window retaining at least one entry per active participant; update `turn` preserving fair turn-taking; and carry the standing instruction: _apply all updates to your content in order to maintain the whiteboard validated, and free of redundancies, duplications and obsolete historical facts — and provide feedback to other architects so that they update their content as well on their next turn_.
- `### Document Structure` — no section added or removed without approval; >100-line section → propose a move to an attachment; out-of-scope → `Follow-ups`; every `changes` bullet and parking-lot item ≤120 chars; never fix a settled statement by appending an italic note — rewrite the headline; resolved parking-lot items are annotated in place and archived at goal close; item grammar includes `Review request {from} – plan file: …` and `**One question most worth challenging:** …`.
- `### Goals` — goal shape (approval step first, end state last); all-participant approval; clean the `Actionable` parking lot before archiving the goal under `Done:`; out-of-scope → `Blocker` and `turn: FACILITATOR`.

Expected outcome: `whiteboard.tart` renders all seven sections and all three `Instructions` subsections, with no unmodelled section.

### Step `2 / 3` — Create `files/whiteboard.art`

Create `$DOMAINS/whiteboards/files/whiteboard.art` declaring the whiteboard file convention, mirroring `$DOMAINS/plans/files/plan.art`:

- **Naming Pattern** for a whiteboard file (e.g. `whiteboard-{name}.md`, following the reference board's `whiteboard.md`).
- **Template** reference to `$DOMAINS/whiteboards/templates/whiteboard.tart`.
- A placement note: the board lives in the workspace repository, while participants' planning artefacts live in their own `checkouts/*` repositories and follow their own conventions — the board never stages them.

Expected outcome: `files/whiteboard.art` declares naming pattern, template, and the repository scoping note.

### Step `3 / 3` — Commit `build-whiteboard-template`

Format the new files, verify, then commit.

---

#### Commit: `build-whiteboard-template`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domain-whiteboards): Add Whiteboard template and file convention.

- Add .agents/domains/whiteboards/templates/whiteboard.tart
- Add .agents/domains/whiteboards/files/whiteboard.art
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify `$DOMAINS/whiteboards/templates/whiteboard.tart` and `$DOMAINS/whiteboards/files/whiteboard.art` exist.
- Verify the template renders `Facilitation`, `Participants`, `Attachments`, `Parking lot`, `Changes`, `Follow-ups`, and `Instructions` — and does **not** render `Contracts` or any domain-specific section.
- Verify `## Instructions` renders all three subsections (`Turn`, `Document Structure`, `Goals`), not the Turn rules alone.
- Verify every rendered section has a matching field in `structures/whiteboard.art`.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

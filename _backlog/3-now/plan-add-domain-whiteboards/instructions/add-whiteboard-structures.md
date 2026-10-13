# Instructions: `add-whiteboard-structures`

**Plan:** `add-domain-whiteboards`

**Iteration Id:** `add-whiteboard-structures`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-domain-whiteboards/instructions/add-whiteboard-structures__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-whiteboard-structures`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

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
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-whiteboard-structures`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Create the Whiteboards domain data model: the `Whiteboard` structure and its nested `Facilitation` and `Participant` structures, the `Attachment` structure, the `Short Task`, `Change Entry`, and `Participant Status` types, and the domain scaffold (`domain.art` + `index.md`).

Model only the base components that close the loop — outline, goals, turn-taking, participants. No contract or domain-specific types: a whiteboard may decide dinner, not design APIs.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `$DOMAINS/domains/structures/domain.art` — `Structure: Domain`, the shape `domain.art` must follow (including `boundaries`).
- `$DOMAINS/plans/domain.art` — reference domain record: the format to mirror for purpose and boundaries.
- `$DOMAINS/plans/index.md` — reference domain index: the format to mirror for `whiteboards/index.md`.
- `$DOMAINS/plans/structures/plan.art` — how structures declare `Inherits` and `Shape`.
- `$PROJECT/_backlog/3-now/plan-add-domain-whiteboards/plan__whiteboard-snapshot.md` — the worked example this model is drawn from.

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

This iteration declares data only: no template, no routines, no behaviour.

- Step 1 / 7 — Create `types/participant-status.art`
- Step 2 / 7 — Create `types/short-task.art`
- Step 3 / 7 — Create `types/change-entry.art`
- Step 4 / 7 — Create `structures/participant.art` and `structures/attachment.art`
- Step 5 / 7 — Create `structures/facilitation.art`
- Step 6 / 7 — Create `structures/whiteboard.art`, `domain.art`, and `index.md`
- Step 7 / 7 — Commit `build-whiteboard-structures`

## Steps

### Step `1 / 7` — Create `types/participant-status.art`

Create `$DOMAINS/whiteboards/types/participant-status.art` declaring **Type: Participant Status** as a controlled `Enum(String)` list, with at least:

- `INTRODUCING` — The participant is still curating their record and attachment and is not fully engaged in the discussion.
- `READY` — The participant is participating in the discussion.
- `LEFT` — The participant has left the whiteboarding session and is no longer eligible to take turns.

Expected outcome: `participant-status.art` declares one enum with those three options and a one-line meaning each.

### Step `2 / 7` — Create `types/short-task.art`

Create `$DOMAINS/whiteboards/types/short-task.art` declaring **Type: Short Task** with `done` (Boolean) and `description` (NaturalExpression).

This type is reused for both the goal's task steps and the `done` goal entries (a done entry is a goal name plus its last step).

Expected outcome: `short-task.art` declares `done` and `description`.

### Step `3 / 7` — Create `types/change-entry.art`

Create `$DOMAINS/whiteboards/types/change-entry.art` declaring **Type: Change Entry** with `participant` (Identifier), `date` (Date), and `description` (NaturalExpression).

This is the unit behind the one-bullet-per-turn rule; the `changes` field is a list of these.

Expected outcome: `change-entry.art` declares the three fields.

### Step `4 / 7` — Create `structures/participant.art` and `structures/attachment.art`

Create `$DOMAINS/whiteboards/structures/participant.art` declaring **Structure: Participant** with:

- `planning` (Path) — the participant's own planning artefact.
- `goals`, `deliverables` (NaturalExpression).
- `expectations` (optional NaturalExpression).
- `status` (one of `%whiteboard.facilitation.participant-status`).
- `attachment` (Path) — the introduction attachment file.

Create `$DOMAINS/whiteboards/structures/attachment.art` declaring **Structure: Attachment** with `path` (Path) and `purpose` (NaturalExpression). It covers both participant introductions and the resolved parking-lot archive (`parking-lot--resolved.md`).

Expected outcome: both structures declare their `Inherits` and `Shape` following `$DOMAINS/plans/structures/plan.art`.

### Step `5 / 7` — Create `structures/facilitation.art`

Create `$DOMAINS/whiteboards/structures/facilitation.art` declaring **Structure: Facilitation** with:

- `turn` (Identifier of the participant expected to update next, **or** the special value `FACILITATOR`).
- `goal` (NaturalExpression).
- `tasks` (List(Type: Short Task)).
- `done` (List(Type: Short Task) — one entry per finished goal: goal name plus its last step).
- `expected-final-outline` (NaturalExpression — the board's own structural contract among participants).
- `participant-statuses` (List(EnumValue)).
- `working-agreements` (List(NaturalExpression)).
- `sentiment` (List(NaturalExpression) — one line per participant, self-authored, holding current state only).

Notes:

- `FACILITATOR` is a reserved `turn` value, not a participant: the scope rule sends blockers to `turn: FACILITATOR`, and it must resolve.
- Sentiment is first-person and overwritten each turn; never model it as history.

Expected outcome: `facilitation.art` declares all nine fields.

### Step `6 / 7` — Create `structures/whiteboard.art`, `domain.art`, and `index.md`

Create `$DOMAINS/whiteboards/structures/whiteboard.art` declaring **Structure: Whiteboard** with fields `id`, `purpose`, `description`, `facilitation`, `participants` (List(Structure: Participant)), `attachments` (List(Structure: Attachment)), `changes` (List(Type: Change Entry)), and `follow-ups` (List(NaturalExpression)).

Create `$DOMAINS/whiteboards/domain.art` mirroring `$DOMAINS/plans/domain.art`: purpose for the Whiteboards domain, plus `boundaries` ordered relationships stating — owns `whiteboards`; depends on the `parking-lot` skill; excludes `Structure: Plan` and the work-item model.

Render `$DOMAINS/whiteboards/index.md` with the `render-template` skill using `$DOMAINS/domains/templates/domain-index-file.tart` (the format of `$DOMAINS/plans/index.md`).

Notes:

- Render `index.md` from the template; do not hand-author its structure.
- Every path inside the new files must be a path variable or a `$DOMAINS`-relative reference — never a resolved absolute path.

Expected outcome: `whiteboards/` contains `structures/` (4 files), `types/` (3 files), `domain.art`, and `index.md`.

### Step `7 / 7` — Commit `build-whiteboard-structures`

Format the new files, verify, then commit.

---

#### Commit: `build-whiteboard-structures`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domain-whiteboards): Add Whiteboard structures and types.

- Add Whiteboard, Facilitation, Participant, and Attachment structures.
- Add Short Task, Change Entry, and Participant Status types.
- Add the domain scaffold: domain.art and index.md.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify `$DOMAINS/whiteboards/` contains `structures/whiteboard.art`, `structures/facilitation.art`, `structures/participant.art`, `structures/attachment.art`, `types/short-task.art`, `types/change-entry.art`, `types/participant-status.art`, `domain.art`, and `index.md`.
- Verify `participant-status.art` includes `LEFT` — the participant has left the session and is no longer eligible to take turns.
- Verify `facilitation.art` declares `turn` accepting `FACILITATOR`, plus `done` and `expected-final-outline`.
- Verify `whiteboard.art` declares `attachments`, `changes`, and `follow-ups` — no section rendered later may be unmodelled.
- Verify no `Contract`, `contract-status`, plans, or work-item fields exist anywhere in the domain.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

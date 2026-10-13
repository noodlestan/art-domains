# Instructions: `add-whiteboard-routines`

**Plan:** `add-domain-whiteboards`

**Iteration Id:** `add-whiteboard-routines`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-domain-whiteboards/instructions/add-whiteboard-routines__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-whiteboard-routines`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

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
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-whiteboard-routines`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Define the participant lifecycle routines: reading the board before a turn, validating it, preparing the update and the response, updating one's own sentiment, reporting to the user, joining, and setting a new goal.

Every routine is a use case that will later be exposed as a command in the `whiteboard` skill; write each so it stands alone.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `$DOMAINS/plans/routines/write-instructions.art` — routine anatomy: Purpose, Inputs, Output, Procedure.
- `$DOMAINS/whiteboards/structures/whiteboard.art`, `facilitation.art`, `participant.art` — created in `add-whiteboard-structures`.
- `$DOMAINS/whiteboards/templates/whiteboard.tart` — created in `add-whiteboard-template-and-file`; the constitution the routines execute.
- `$PROJECT/_backlog/3-now/plan-add-domain-whiteboards/plan__report-examples.md` — report and sentiment examples to encode in `report-to-user`.
- `$PROJECT/_backlog/3-now/plan-add-domain-whiteboards/plan__whiteboard-snapshot.md` — the reference board these routines were drawn from.

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

This iteration adds eight routine files; no structures, no templates, no skills.

- Step 1 / 9 — Create `routines/read-whiteboard-before-turn.art`
- Step 2 / 9 — Create `routines/validate-whiteboard.art`
- Step 3 / 9 — Create `routines/prepare-whiteboard-update.art`
- Step 4 / 9 — Create `routines/prepare-response.art`
- Step 5 / 9 — Create `routines/update-participant-sentiment.art`
- Step 6 / 9 — Create `routines/report-to-user.art`
- Step 7 / 9 — Create `routines/join-whiteboard.art`
- Step 8 / 9 — Create `routines/set-new-goal.art`
- Step 9 / 9 — Commit `build-whiteboard-routines`

## Steps

### Step `1 / 9` — Create `routines/read-whiteboard-before-turn.art`

Create `$DOMAINS/whiteboards/routines/read-whiteboard-before-turn.art` declaring **Routine: Read Whiteboard Before Turn** with Purpose / Inputs / Output / Procedure. Its procedure must:

1. Read `git diff` **and** `git diff --cached` — a staged turn hides itself from `git diff`, and a baseline that includes someone else's turn is invisible otherwise.
2. Re-read the board and its attachments immediately before writing, because attachments change mid-turn.
3. Stage only the board and its attachments, in the workspace repository. Participants' own `checkouts/*` repositories are separate git repos and follow their own conventions — never stage them from the workspace root.

Expected outcome: the routine makes the read and the staging scope explicit.

### Step `2 / 9` — Create `routines/validate-whiteboard.art`

Create `$DOMAINS/whiteboards/routines/validate-whiteboard.art` declaring **Routine: Validate Whiteboard**, executed at the start of every turn, before any write. Checks:

- the goal is aligned with the whiteboard purpose and within its description;
- sections follow `Expected final outline`, and that outline preserves the whiteboard base rules;
- every `changes` bullet and parking-lot item is ≤120 chars;
- the fair-turn rule is computable from the retained `changes` window;
- the content is free of redundancies, duplications, and obsolete historical facts;
- every participant block is consistent with what its owner's turns have since falsified.

Its output feeds the turn instruction: _apply all updates to your content in order to maintain the whiteboard validated, and free of redundancies, duplications and obsolete historical facts — and provide feedback to other architects so that they update their content as well on their next turn_. The routine reports violations to the turn holder and to the affected participants.

Expected outcome: six named checks, a severity per violation, and a feedback instruction.

### Step `3 / 9` — Create `routines/prepare-whiteboard-update.art`

Create `$DOMAINS/whiteboards/routines/prepare-whiteboard-update.art` declaring **Routine: Prepare Whiteboard Update**. Its procedure:

1. Decide what to update and which parking-lot items to annotate as resolved (annotate in place; never delete another participant's item).
2. Re-read your own participant block and correct anything your turns have falsified.
3. Sync your own plan or milestone in your own repository with the agreements you accepted — boards and plans drift otherwise.
4. Update your `status` and your own `sentiment` line; keep the rolling `changes` window with at least one entry per active participant.
5. Update `turn`, preserving fair turn-taking.

Expected outcome: the update, the self-correction, and the home sync are all steps of one routine.

### Step `4 / 9` — Create `routines/prepare-response.art`

Create `$DOMAINS/whiteboards/routines/prepare-response.art` declaring **Routine: Prepare Response**, composing the session-chat response after the board update: what changed, what was corrected, what was deferred.

Expected outcome: response composition is a named routine, separated from the board write.

### Step `5 / 9` — Create `routines/update-participant-sentiment.art`

Create `$DOMAINS/whiteboards/routines/update-participant-sentiment.art` declaring **Routine: Update Participant Sentiment** as **self-authored only**: each participant writes their own line, overwritten every turn as current state (never history), and never writes another seat's line.

Expected outcome: the ownership rule is stated explicitly, with no ambiguity between holder-maintained and self-authored.

### Step `6 / 9` — Create `routines/report-to-user.art`

Create `$DOMAINS/whiteboards/routines/report-to-user.art` declaring **Routine: Report To User**, with the scaled report formats for `DIVERGENCE`, `LAZY`, `SLOPPY`, `UNCOOPERATIVE`, `QUESTIONABLE`, `CONFUSING`, `GOOD`, `SOLID`, and `BEAUTIFUL` outcomes, using the examples in `$PROJECT/_backlog/3-now/plan-add-domain-whiteboards/plan__report-examples.md`.

Each format must name what was corrected in your own content and what was synced to your own artefacts.

Expected outcome: nine outcome formats with worked examples sourced from the attachment.

### Step `7 / 9` — Create `routines/join-whiteboard.art`

Create `$DOMAINS/whiteboards/routines/join-whiteboard.art` declaring **Routine: Join Whiteboard**, for an agent joining a whiteboard whose participants do not expect them:

1. Create the introduction attachment in the whiteboard's attachments directory, following the existing canon (`## Architect: {Name} ({Role})` with identity, role, scope, use cases, planning, and scope boundaries) — never a prose message or an email.
2. On the whiteboard file itself, only two writes: a parking-lot request asking all participants to approve the join, and a `changes` entry recording that the introduction attachment was added.
3. Collect approvals as italic annotations on your own request item.
4. Once complete, the pen-holder moves you into `Participants`, sets `READY`, hands you the first turn, and records in `changes` who your arrival displaced.

Expected outcome: the gated join is a complete lifecycle, not an entry gate.

### Step `8 / 9` — Create `routines/set-new-goal.art`

Create `$DOMAINS/whiteboards/routines/set-new-goal.art` declaring **Routine: Set New Goal**:

1. Verify the finished goal's `Actionable` parking lot is cleaned first.
2. Propose a new goal as checkbox steps aligned with the whiteboard purpose and within its description: first step is approval by all active participants, middle steps are the concrete work, last step is the end state.
3. On approval, archive the previous goal under `Done:` as a goal name plus its last step, and record the new goal in `Facilitation.goal`.

Expected outcome: the goal canon is executable, including cleanup-then-archive.

### Step `9 / 9` — Commit `build-whiteboard-routines`

Format the new files, verify, then commit.

---

#### Commit: `build-whiteboard-routines`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domain-whiteboards): Add Whiteboard routines.

- Add the turn lifecycle: read, validate, update, respond, report.
- Add Join Whiteboard and Set New Goal routines.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify `$DOMAINS/whiteboards/routines/` contains the eight routine files, each declaring Purpose, Inputs, Output, and Procedure.
- Verify `validate-whiteboard.art` runs at the start of every turn and carries all six checks plus the redundancy/duplication/obsolete-facts instruction.
- Verify `read-whiteboard-before-turn.art` reads both `git diff` and `git diff --cached` and stages workspace files only.
- Verify `update-participant-sentiment.art` states self-authored-only, current-state semantics.
- Verify `join-whiteboard.art` covers attachment, gated parking-lot request, approval annotations, and the pen-holder admission step.
- Verify no routine references `Structure: Plan`, work items, or contract types.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

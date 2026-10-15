# Instructions: `integrate-message-board-into-whiteboards`

**Plan:** `add-messages-domain`

**Iteration Id:** `integrate-message-board-into-whiteboards`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-messages-domain/instructions/integrate-message-board-into-whiteboards__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `integrate-message-board-into-whiteboards`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for all new files |
| `$PROJECT`   | Provided with prompt         | Backlog hosting this plan                    |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Whiteboards resources under change           |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Whiteboard skill under change                |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `integrate-message-board-into-whiteboards`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Route Whiteboards inter-participant messaging through message boards and stop parking-lot items from carrying messages: model the message board parallel to the parking lot — ahead of it in structure, template, and routine logic — and classify every item as a message or a parking-lot item, routing each accordingly.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `../plan__messages-spec.md` — the domain spec; read `## Integration` in full — every classification rule and both actionable-item examples are normative — and follow its `## Conventions`.
- `$DOMAINS/whiteboards/index.md` — the domain being changed: all resources in scope.
- `$DOMAINS/whiteboards/structures/whiteboard.art` — the structure to modify.
- `$DOMAINS/whiteboards/templates/whiteboard.tart` — the template to modify: Whiteboard Structure outline, Turn, and Document Structure instructions.
- `$DOMAINS/whiteboards/routines/generate-whiteboard-updates.art` — the routine to modify with the classification logic.
- `$DOMAINS/whiteboards/routines/validate-whiteboard.art` — the routine to modify with the message checks.
- `$SKILLS/whiteboard/SKILL.md` — the skill to modify so take-turn routes through the `messaging` commands.

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
npx prettier --write .agents/domains/whiteboards .agents/skills/whiteboard # format modified files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you modify before committing.

---

## Changes

This iteration modifies the existing Whiteboards domain only: no new whiteboard resources; the message board section references the messages domain built by the previous iterations.

- Step 1 / 7 — Modify `structures/whiteboard.art`
- Step 2 / 7 — Modify `templates/whiteboard.tart`
- Step 3 / 7 — Modify `routines/generate-whiteboard-updates.art`
- Step 4 / 7 — Modify `routines/validate-whiteboard.art`
- Step 5 / 7 — Modify `$SKILLS/whiteboard/SKILL.md`
- Step 6 / 7 — Regenerate `whiteboards/index.md`
- Step 7 / 7 — Commit `integrate-message-board-whiteboards`

## Steps

### Step `1 / 7` — Modify `structures/whiteboard.art`

Modify `$DOMAINS/whiteboards/structures/whiteboard.art` to add a `message-board` field to the whiteboard shape, ahead of the parking-lot modelling — the `.message-board` comes before parking-lot in structures, templates, and routine logic. Reference the messages domain types — do not redeclare them.

Expected outcome: the whiteboard shape carries `message-board` before any parking-lot element.

### Step `2 / 7` — Modify `templates/whiteboard.tart`

Modify `$DOMAINS/whiteboards/templates/whiteboard.tart`:

- render `## Message board` before `## Parking lot`, and add it to the Whiteboard Structure outline ahead of `h2. Parking lot`.
- rewrite the Turn and Document Structure instructions to classify every item, transcribing the spec's rules from `./plan__messages-spec.md`, `## Integration`:
  - a message has a sender and a receiver, is typed `ASK`/`INFORM`/`REQUEST`/`ANSWER`/`REPORT`, is discarded after processed by the receiver, never lands in — or is removed from — the parking lot, and is written to the message board following its rules — example: line length limit.
  - a parking-lot item has an owner, no sender, and an async outcome:
    - actionable — removed when captured somewhere else AND the whiteboard is not pending on the outcome. Examples: "`ART-JS` – Write plan instructions for participants to review" kept until plan is authored and shared with whiteboard; "`ART_MD` - Archive previous milestone to reduce noise" kept until milestone is archived.
    - pending — eventually have an owner; not actionable yet; tracked until they become actionable or are superseded.
    - blockers — eventually have an owner; identify what is blocked by the item.
  - deduplicate and compress other related items.

Expected outcome: the template renders the message board ahead of the parking lot and every send/receive instruction classifies items per the spec.

### Step `3 / 7` — Modify `routines/generate-whiteboard-updates.art`

Modify `$DOMAINS/whiteboards/routines/generate-whiteboard-updates.art` so each send/receive update is classified as a message or a parking-lot item and routed accordingly: messages never enter `%whiteboard.parking-lot` — they go to the message board; parking-lot items go to the parking lot, deduplicated and compressed.

Expected outcome: the routine's procedure contains the classification and routing logic.

### Step `4 / 7` — Modify `routines/validate-whiteboard.art`

Modify `$DOMAINS/whiteboards/routines/validate-whiteboard.art` to detect: messages sitting in the parking lot — a violation — and stale messages left on the board after being processed.

Expected outcome: validation reports both issue classes.

### Step `5 / 7` — Modify `$SKILLS/whiteboard/SKILL.md`

Modify `$SKILLS/whiteboard/SKILL.md` so take-turn and related commands route send/receive through the `messaging` skill's commands — each invocation preceded by its `::READ` directive.

Expected outcome: the whiteboard skill no longer instructs writing messages into the parking lot.

### Step `6 / 7` — Regenerate `whiteboards/index.md`

Regenerate `$DOMAINS/whiteboards/index.md` with `Routine: Build Domain Index` so the changed resources and the message board are reflected.

#### Commit: `integrate-message-board-whiteboards`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
integrate(domain-messages): Route Whiteboards messaging through message boards.

- Render the message board ahead of the parking lot; classify every item.
- Messages carry sender/receiver and are discarded after processed.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify the message board renders ahead of the parking lot in structure, template, and routine logic.
- Verify both actionable-item examples from the spec appear in the template instructions.
- Verify no routine or skill instruction still routes messages into the parking lot.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

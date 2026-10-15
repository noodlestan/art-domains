# Instructions: `add-message-structures-and-types`

**Plan:** `add-messages-domain`

**Iteration Id:** `add-message-structures-and-types`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-messages-domain/instructions/add-message-structures-and-types__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-message-structures-and-types`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for all new files |
| `$PROJECT`   | Provided with prompt         | Backlog hosting this plan                    |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources under change                |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-message-structures-and-types`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Model the messaging data so boards can hold messages and every message can be typed by its response expectation: add the Message Type and Message types, then the Message Board structure that uses them.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `../plan__messages-spec.md` — the domain spec; read `## Structures` and `## Types` in full — field names and the OpenEnum values are normative — and follow its `## Conventions`.
- `$DOMAINS/plans/structures/plan.art` — reference structure: how structures declare `## Uses`, `Inherits`, and `Shape`.
- `$DOMAINS/whiteboards/structures/whiteboard.art` — reference structure: the format to mirror for the Message Board.
- `$DOMAINS/whiteboards/types/change-entry.art` — reference type: the format to mirror for Message and Message Type.

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
npx prettier --write .agents/domains/messages # format new .md/.art files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you create before committing.

---

## Changes

This iteration declares data only: types first, then the structure that uses them.

- Step 1 / 4 — Create `types/message-type.art`
- Step 2 / 4 — Create `types/message.art`
- Step 3 / 4 — Create `structures/message-board.art`
- Step 4 / 4 — Commit `build-message-structures`

## Steps

### Step `1 / 4` — Create `types/message-type.art`

Create `$DOMAINS/messages/types/message-type.art` declaring **Type: Message Type** as a `Primitive: OpenEnum` with the spec's values and semantics:

- `ASK` — expects a response.
- `REQUEST` — may expect a response.
- `INFORM` — may expect an acknowledgement.
- `ANSWER` — alias of `INFORM` for responses to `ASK`.
- `REPORT` — alias of `INFORM` for responses to `REQUEST`.

Expected outcome: an OpenEnum carrying all five values with their meanings.

### Step `2 / 4` — Create `types/message.art`

Create `$DOMAINS/messages/types/message.art` declaring **Type: Message** with:

- `from` — sender.
- `to` — receiver.
- `type` — Type: Message Type.
- `timestamp` — when the message was written.
- `content` — the message body.
- `medium` — path to a message file, or an artefact carrying a message board.

Expected outcome: the six fields, with `medium` modelling both media.

### Step `3 / 4` — Create `structures/message-board.art`

Create `$DOMAINS/messages/structures/message-board.art` declaring **Structure: Message Board**, with `## Uses` ::READ directives for Type: Message and Type: Message Type, and:

- Inherits: `name`, `purpose`, `description`.
- Shape: `id` — kebab-case; `messages` — List(Type: Message); `instructions` — List(NaturalExpression) — custom instructions to observe when reading from or writing to the board.

Expected outcome: the structure uses both types and mirrors the reference format.

#### Commit: `build-message-structures`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domain-messages): Add Message Board structure and message types.

- Add Message Board with messages and board instructions.
- Add Message and Message Type (ASK, REQUEST, INFORM, ANSWER, REPORT).
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify Message Type carries exactly the five spec values, and Message carries all six fields including `medium`.
- Verify the Message Board structure declares `## Uses` ::READ directives for the types it references.
- Verify examples carry no assumption that messages are about plans.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

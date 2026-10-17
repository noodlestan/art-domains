# Instructions: `add-message-routines`

**Plan:** `add-messages-domain`

**Iteration Id:** `add-message-routines`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `./add-message-routines__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-message-routines`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

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
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-message-routines`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Define the messaging lifecycle so inboxes are found, messages processed and acted upon, and writes respect medium availability and response cleanup: add the four routines — identify inboxes, process messages, write message, read message. Every routine takes data in and always returns data out; none writes to files or responds in the session chat — that belongs to the skill commands.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `../plan__messages-spec.md` — the domain spec; read `## Routines` in full — every availability rule, path rule, fallback, and cleanup rule is normative — and follow its `## Conventions`.
- `$DOMAINS/plans/routines/draft-iterations.art` — reference routine: the standard format with Purpose, Inputs, Output, and Procedure to mirror.
- `$DOMAINS/whiteboards/routines/generate-whiteboard-updates.art` — reference routine: data-in/data-out discipline without file writes.

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

This iteration adds data-transforming routines only: no templates yet — the medium templates they reference arrive in a later iteration.

- Step 1 / 5 — Create `routines/identify-inboxes.art`
- Step 2 / 5 — Create `routines/process-messages.art`
- Step 3 / 5 — Create `routines/write-message.art`
- Step 4 / 5 — Create `routines/read-message.art`
- Step 5 / 5 — Commit `build-message-routines`

## Steps

### Step `1 / 5` — Create `routines/identify-inboxes.art`

Create `$DOMAINS/messages/routines/identify-inboxes.art` declaring **Routine: Identify Inboxes** following the reference routine format:

- Purpose: find where incoming messages wait.
- Inputs: the current working context.
- Output: `%inboxes` — the artefacts in context carrying a message board.
- Procedure: scan the context for artefacts carrying a message board — an inbox — and return them.

Expected outcome: the routine always returns `%inboxes`, even when empty.

### Step `2 / 5` — Create `routines/process-messages.art`

Create `$DOMAINS/messages/routines/process-messages.art` declaring **Routine: Process Messages**:

- Purpose: extract the waiting messages from the inboxes.
- Inputs: `%inboxes`.
- Output: `%messages` — the incoming messages, each typed per Type: Message Type.
- Procedure: with each inbox, read its message board and return its messages.

Expected outcome: the routine always returns `%messages`, even when empty.

### Step `3 / 5` — Create `routines/write-message.art`

Create `$DOMAINS/messages/routines/write-message.art` declaring **Routine: Write Message**. Transcribe every rule from `./plan__messages-spec.md`, `## Routines`, `### Routine: Write Message`, preserving:

- inputs `%message`, `%bypass-clean-check`, `%response-to` — optional.
- medium availability: board turn-gate, checkout clean-check, medium-file clean-check, bypass flag.
- long messages: decide the path on the recipient's side from the current context; if there is no obvious path, read the recipient's relevant instructions — example `_guide`; dirty checkout without bypass means unavailable.
- available: write to the medium, stage and commit per the medium's rules; if the write was impeded for some reason then the medium is unavailable.
- unavailable: park short messages at the top of the actionable column of the writer's own parking lot.
- response cleanup: purge the incoming board message; integrate, keep as attachment, or delete incoming file messages — integrate contents without citing the message as source.
- Output: the outcome of the write — where the message landed, or that the medium was unavailable and the message was parked.

Expected outcome: the routine transforms and returns data only — it never writes to a file or responds in the session chat; its Procedure covers every spec rule.

### Step `4 / 5` — Create `routines/read-message.art`

Create `$DOMAINS/messages/routines/read-message.art` declaring **Routine: Read Message**:

- inputs `%message` and `%medium`.
- Purpose: act on one incoming message and prepare the reply.
- Procedure: take action on the message — convert to an own parking-lot item, synchronously update resources, or attach to an artefact/purge; reply through Routine: Write Message with `%response-to`; response length rules — over 1000 characters goes to a file, under 200 characters to the incoming board — default to same as incoming message —, in between the writer decides, compressing or filing and adding detail when it helps the recipient.
- Output: the action taken and the reply outcome.

Expected outcome: the routine invokes Routine: Write Message for replies and always returns its outcome.

#### Commit: `build-message-routines`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domain-messages): Add message routines.

- Add identify-inboxes, process-messages, read-message, write-message.
- Routines transform data only; commands own session-chat writes.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify every routine declares clear Inputs and an Output, and that every Procedure path returns something.
- Verify no routine writes to files directly or responds in the session chat.
- Verify examples carry no assumption that messages are about plans — plans may only appear as an example.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

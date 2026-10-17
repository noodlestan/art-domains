# Instructions: `add-message-templates`

**Plan:** `add-messages-domain`

**Iteration Id:** `add-message-templates`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `./add-message-templates__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-message-templates`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

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
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-message-templates`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Define how a message board and a long message are presented, and where long-message files live: add the message board template, the message template, and the message file convention. The message-board section renders ahead of any parking-lot section when embedded in an artefact.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `../plan__messages-spec.md` — the domain spec; read `## Templates` and `## Files` in full and follow its `## Conventions`.
- `$DOMAINS/whiteboards/templates/whiteboard.tart` — reference template: the `::TEMPLATE`/`::EXAMPLE` directive format to mirror.
- `$DOMAINS/whiteboards/files/whiteboard.art` — reference file convention: naming pattern, template reference, and scoping to mirror.

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

This iteration adds presentation only: templates render the message board and message shapes declared by the structures and types of a later iteration.

- Step 1 / 4 — Create `templates/message-board.tart`
- Step 2 / 4 — Create `templates/message.tart`
- Step 3 / 4 — Create `files/message.art`
- Step 4 / 4 — Commit `build-message-templates`

## Steps

### Step `1 / 4` — Create `templates/message-board.tart`

Create `$DOMAINS/messages/templates/message-board.tart` rendering a message board following the reference template's directive format:

- identity — name, purpose, description.
- messages — each message rendered from Type: Message: from, to, type, timestamp, content.
- the board's own instructions — custom instructions to observe when reading from or writing to the board.
- a rule: when a message board is embedded in an artefact, its section renders ahead of any parking-lot section.
- examples must not assume messages are about plans — plans may only appear as an example.

Expected outcome: the template renders a full message board and states the ahead-of-parking-lot rule.

### Step `2 / 4` — Create `templates/message.tart`

Create `$DOMAINS/messages/templates/message.tart` rendering a long message written to a file: from, to, type, timestamp, content, and its medium path.

Expected outcome: the template renders one long message per file.

### Step `3 / 4` — Create `files/message.art`

Create `$DOMAINS/messages/files/message.art` declaring **File: Message** following the reference file convention:

- naming pattern `message-{message.id}.md`.
- template reference to `$DOMAINS/messages/templates/message.tart`.
- medium-availability scoping — workspace-vs-`checkouts/*`.

Expected outcome: the file convention mirrors the reference format.

#### Commit: `build-message-templates`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domain-messages): Add message board and message templates.

- Add message-board.tart and message.tart.
- Add the message file convention for long messages.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify `message-board.tart` renders identity, messages, and board instructions, and states the ahead-of-parking-lot rule.
- Verify examples carry no assumption that messages are about plans.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

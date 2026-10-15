# Instructions: `scaffold-messages-domain`

**Plan:** `add-messages-domain`

**Iteration Id:** `scaffold-messages-domain`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-messages-domain/instructions/scaffold-messages-domain__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `scaffold-messages-domain`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

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
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `scaffold-messages-domain`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Establish the Messages domain's identity and boundaries so every later layer lands in a registered home: add `domain.art` with the domain purpose and boundaries, add the domain definitions — message, message board, medium, inbox — and register `Domain: Messages` in the domains listing.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `../plan__messages-spec.md` — the domain spec; read `## Definitions` in full and follow its `## Conventions`.
- `$DOMAINS/domains/structures/domain.art` — `Structure: Domain`, the shape `domain.art` must follow.
- `$DOMAINS/plans/domain.art` — reference domain record: the format to mirror for purpose and boundaries.
- `$DOMAINS/whiteboards/definitions/index.art` — reference definitions file: the format to mirror for the messages definitions.
- `$DOMAINS/plans/index.md` — reference domain index: the format to mirror for `messages/index.md` (do not generate the index yet — the domain has no resources besides definitions until later iterations; register the domain in `$DOMAINS/index.md` only).

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

This iteration declares the domain scaffold and its definitions only: no structures, no routines, no behaviour.

- Step 1 / 4 — Create `domain.art`
- Step 2 / 4 — Create `definitions/index.art`
- Step 3 / 4 — Register `Domain: Messages` in `$DOMAINS/index.md`
- Step 4 / 4 — Commit `build-messages-domain-scaffold`

## Steps

### Step `1 / 4` — Create `domain.art`

Create `$DOMAINS/messages/domain.art` declaring **Domain: Messages** following `Structure: Domain`, with:

- purpose — provide an effective, low-noise tool for agents to send persisted messages to other agents.
- boundaries — messages are short-lived and discarded once processed; no plans or work-item assumptions; commands own session-chat writes and responses; the message board comes ahead of the parking lot when embedded in other domains.

Expected outcome: `domain.art` declares the domain with purpose and boundaries, consistent with `./plan__messages-spec.md`.

### Step `2 / 4` — Create `definitions/index.art`

Create `$DOMAINS/messages/definitions/index.art` declaring the four definitions from `./plan__messages-spec.md`, `## Definitions`, one section each, with their exact semantics:

- **Message** — short-lived sender-to-receiver communication, discarded once processed; contents integrated, never cited as source.
- **Message Board** — artefact or artefact section carrying short messages with its own instructions; default medium for short messages.
- **Medium** — where a message is written: a message board (short) or a file (long).
- **Inbox** — an artefact in the current context carrying a message board.

Expected outcome: four definitions, each preserving the spec's semantics verbatim.

### Step `3 / 4` — Register `Domain: Messages` in `$DOMAINS/index.md`

Modify `$DOMAINS/index.md` to list `Domain: Messages` with its path `$DOMAINS/messages/index.md` and a one-line purpose, following the existing entries' format.

Expected outcome: the domains listing includes Domain: Messages.

#### Commit: `build-messages-domain-scaffold`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domain-messages): Add Messages domain scaffold.

- Add domain.art with purpose and boundaries, and the domain definitions.
- Register Domain: Messages in the domains listing.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that `$DOMAINS/messages/domain.art` declares purpose and boundaries, and that `definitions/index.art` carries all four definitions from the spec.
- Verify that `Domain: Messages` appears in `$DOMAINS/index.md`.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

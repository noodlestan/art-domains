# Instructions: `add-messaging-skill-and-commands`

**Plan:** `add-messages-domain`

**Iteration Id:** `add-messaging-skill-and-commands`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-messages-domain/instructions/add-messaging-skill-and-commands__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-messaging-skill-and-commands`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for all new files |
| `$PROJECT`   | Provided with prompt         | Backlog hosting this plan                    |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Agent modes and skills directory             |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources referenced by the skill     |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-messaging-skill-and-commands`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Give every agent one entry point to send and read messages: add the `messaging` skill, allowed to ALL agent modes, whose commands declare their inputs, invoke the domain routines — each routine call preceded by its `::READ` directive — capture their outputs, and perform all session-chat writes and responses. Register the skill everywhere agent skills are listed.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `../plan__messages-spec.md` — the domain spec; read `## Skill` in full — including the command inputs and the "commands own session-chat writes" rule — and follow its `## Conventions`.
- `$SKILLS/whiteboard/SKILL.md` — reference skill: front-matter, allowed agent modes, mandatory reading, and command format to mirror.
- `$SKILLS/update-skills/SKILL.md` — procedure to list `messaging` in the skills listing.
- `$SKILLS/update-agents/SKILL.md` — procedure to allow `messaging` in the agent modes.

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
npx prettier --write .agents/skills/messaging # format new .md files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you create before committing.

---

## Changes

This iteration adds the skill and its commands only: the routines they invoke are created by a later iteration — declare the invocations, do not implement them.

- Step 1 / 6 — Create `messaging/SKILL.md`
- Step 2 / 6 — Add command `write a message`
- Step 3 / 6 — Add command `read incoming messages`
- Step 4 / 6 — List `messaging` in `$SKILLS/index.md`
- Step 5 / 6 — Allow `messaging` in all agent modes
- Step 6 / 6 — Commit `build-messaging-skill`

## Steps

### Step `1 / 6` — Create `messaging/SKILL.md`

Create `$SKILLS/messaging/SKILL.md` with front-matter — name `messaging`, description "Use to send and read persisted messages to and from other agents." — following the reference skill's format. Include:

- **Allowed Agent Modes:** ALL.
- Definitions: message, message board, medium, inbox — pointing to `$DOMAINS/messages/definitions/index.art`.
- A `## Mandatory Reading` section listing `$DOMAINS/messages/index.md`.
- The rule: the actual writes/responses in session chat happen in commands only; routines take data in and return data out. Every routine call in a command is preceded by its `::READ` directive.

Expected outcome: the skill file onboards all agents and declares the two commands below.

### Step `2 / 6` — Add command `write a message`

Add the command `write a message` to `$SKILLS/messaging/SKILL.md`:

- inputs: `%message`, `%medium`, `%bypass-clean-check` — boolean —, `%response-to` — optional incoming message
- procedure: `::READ` and invoke Routine: Write Message with the inputs, capturing its outputs; the command composes the session-chat response — never the routine.

### Step `3 / 6` — Add command `read incoming messages`

Add the command `read incoming messages` to `$SKILLS/messaging/SKILL.md`:

- procedure: `::READ` and invoke Routine: Identify Inboxes, then Routine: Process Messages, then Routine: Read Message per incoming message; the command reports and responds in session chat.

### Step `4 / 6` — List `messaging` in `$SKILLS/index.md`

Follow the `update-skills` procedure to list the `messaging` skill in `$SKILLS/index.md` with its purpose.

### Step `5 / 6` — Allow `messaging` in all agent modes

Follow the `update-agents` procedure to allow `messaging` in the agent-modes index, the Codex agent files, and `$WORKSPACE/opencode.json` — all agent modes.

#### Commit: `build-messaging-skill`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domain-messages): Add the messaging skill with commands.

- Expose write-message and read-messages commands for all agent modes.
- Commands own session-chat writes; routines only transform data.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that both commands declare their inputs and that every routine invocation in a command is preceded by its `::READ` directive.
- Verify that no command performs file writes through a routine — routines only transform data; the command composes the session-chat response.
- Verify that `messaging` is listed in `$SKILLS/index.md` and allowed in all agent modes.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

# Instructions: `add-whiteboard-commands-and-skills`

**Plan:** `add-domain-whiteboards`

**Iteration Id:** `add-whiteboard-commands-and-skills`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-domain-whiteboards/instructions/add-whiteboard-commands-and-skills__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-whiteboard-commands-and-skills`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

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
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-whiteboard-commands-and-skills`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Expose the whiteboard as **one** skill, `whiteboard`, whose commands cover every use-case routine. There are not four skills — the commands live inside the skill, each with user-said triggers and, where the routine should run unaided, an automatic trigger.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `$SKILLS/parking-lot/SKILL.md` — skill anatomy to mirror: front-matter, `## Allowed Agent Modes`, `## Processes`, `## Commands` with `**Triggers:**` and `**Procedure:**`.
- `$DOMAINS/whiteboards/routines/` — the eight routines created in `add-whiteboard-routines`; each use case becomes a command.
- `$DOMAINS/whiteboards/templates/whiteboard.tart` — the constitution the commands execute.

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
npx prettier --write .agents/skills/whiteboard # format new .md files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you create before committing.

---

## Changes

This iteration adds one skill file; no domain files change.

- Step 1 / 3 — Create `skills/whiteboard/SKILL.md` (front-matter, allowed modes, processes)
- Step 2 / 3 — Add the commands and their triggers
- Step 3 / 3 — Commit `build-whiteboard-skill`

## Steps

### Step `1 / 3` — Create `skills/whiteboard/SKILL.md` (front-matter, allowed modes, processes)

Create `$SKILLS/whiteboard/SKILL.md`, mirroring `$SKILLS/parking-lot/SKILL.md`:

```markdown
---
name: whiteboard
description: Use to run a shared whiteboard where participants take turns updating it, agree goals, and track parked items.
---

# Skill: Whiteboard

## Definitions

… a whiteboard, a turn, a participant, the parking lot section …

## Allowed Agent Modes

ALL

## Processes

### Process for Taking a Turn

1. Execute **Read Whiteboard Before Turn**.
2. Execute **Validate Whiteboard**.
3. Execute **Prepare Whiteboard Update**.
4. Execute **Prepare Response**.
```

Rules:

- `Allowed Agent Modes` is **ALL** — participation is cross-domain by design, matching how `parking-lot` grants access.
- Each `## Processes` entry delegates to a routine by name; do not restate the routine's procedure inside the skill.

Expected outcome: `$SKILLS/whiteboard/SKILL.md` exists with front-matter, definitions, `ALL` access, and the turn process.

### Step `2 / 3` — Add the commands and their triggers

Append a `## Commands` section to `$SKILLS/whiteboard/SKILL.md` with one `### Command:` entry per use case, each carrying `**Triggers:**` and `**Procedure:**`:

| Command               | Procedure (routine)            | Triggers                                                                              |
| --------------------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| `init-whiteboard`     | create a whiteboard at a path  | user says `init whiteboard`, `new whiteboard {path}`                                  |
| `invite-participant`  | invite with skill context      | user says `invite {participant} to whiteboard`                                        |
| `join-whiteboard`     | `Routine: Join Whiteboard`     | user says `join {path}`; agent joins a board whose participants do not expect them    |
| `take-turn`           | the four `## Processes` steps  | user says `take turn`, `your turn`; **automatic** when it is `turn` and a turn is due |
| `validate-whiteboard` | `Routine: Validate Whiteboard` | user says `validate whiteboard`; **automatic** at the start of every turn             |
| `set-new-goal`        | `Routine: Set New Goal`        | user says `set new goal`, `new goal`; **automatic** when the current goal is `DONE`   |

Rules:

- Every use-case routine from `$DOMAINS/whiteboards/routines/` must be reachable from at least one command.
- Automatic triggers are stated explicitly (as in `agent-architect`'s trigger lists), not implied.

Expected outcome: six commands, each delegating to a routine, with both phrasing and automatic triggers.

### Step `3 / 3` — Commit `build-whiteboard-skill`

Format the new file, verify, then commit.

---

#### Commit: `build-whiteboard-skill`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domain-whiteboards): Add the whiteboard skill with commands.

- Expose init, invite, join, take-turn, validate, set-new-goal commands.
- Declare user-said and automatic command triggers.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify `$SKILLS/whiteboard/SKILL.md` exists with front-matter `name: whiteboard`.
- Verify `## Allowed Agent Modes` reads `ALL`.
- Verify all six commands exist and each `**Procedure:**` names a routine in `$DOMAINS/whiteboards/routines/`.
- Verify `take-turn`, `validate-whiteboard`, and `set-new-goal` declare automatic triggers.
- Verify no separate `init-whiteboard/`, `invite-participant/`, `join-whiteboard/`, or `take-turn/` skill directories were created — there is exactly one skill.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

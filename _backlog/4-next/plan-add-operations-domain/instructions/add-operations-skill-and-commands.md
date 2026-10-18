# Instructions: `add-operations-skill-and-commands`

**Plan:** `add-operations-domain`

**Iteration Id:** `add-operations-skill-and-commands`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-operations-domain/instructions/add-operations-skill-and-commands__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse: happy face + up to 3 bullet points (done `add-operations-skill-and-commands`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for all new files |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Agent modes and skills directory             |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources referenced by the skill     |

## Working Agreements

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user expects a light confirmation: a happy face and up to 3 bullet points. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Give every agent one entry point to register operating instructions on an artefact: add the `operations` skill, allowed to ALL agent modes, whose command declares its inputs, invokes Routine: Register Operating Instructions, captures its outputs, and composes the session-chat response. Register the skill everywhere agent skills are listed.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `$PROJECT/_backlog/4-next/plan-add-operations-domain/plan__operations-spec.md` — the domain spec; read `## Skill` in full — including the command inputs and the "commands own session-chat writes" rule — and follow its `## Conventions`.
- `$SKILLS/write-plan/SKILL.md` — reference skill: front-matter, allowed agent modes, mandatory reading, and command format to mirror.
- `$SKILLS/update-skills/SKILL.md` — procedure to list `operations` in the skills listing.
- `$SKILLS/update-agents/SKILL.md` — procedure to allow `operations` in the agent modes.

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
npx prettier --write .agents/skills/operations # format new .md files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you create before committing.

---

## Changes

- Step 1 / 6 — Create `operations/SKILL.md`
- Step 2 / 6 — Add command `add {operation} instructions to {artefact}`
- Step 3 / 6 — List `operations` in `$SKILLS/index.md`
- Step 4 / 6 — Allow `operations` in all agent modes
- Step 5 / 6 — Create instruction file for the skill
- Step 6 / 6 — Commit `build-operations-skill`

## Steps

### Step `1 / 6` — Create `operations/SKILL.md`

Create `$SKILLS/operations/SKILL.md` with front-matter — name `operations`, description "Use to register operating instructions on an artefact." — following the reference skill's format. Include:

- **Allowed Agent Modes:** ALL.
- Definitions: operating instruction, operating instructions, relevantFor, consuming context, flat-file convention, override, command list — pointing to `$DOMAINS/operations/definitions/index.art`.
- A `## Mandatory Reading` section listing `$DOMAINS/operations/index.md`.
- The rule: the actual writes/responses in session chat happen in commands only; routines take data in and return data out. Every routine call in a command is preceded by its `::READ` directive.

Expected outcome: the skill file onboards all agents and declares the command below.

### Step `2 / 6` — Add command `add {operation} instructions to {artefact}`

Add the command to `$SKILLS/operations/SKILL.md`:

- inputs: `%instructions` — Identifier or NaturalExpression — can be a package, a specific path, or instructions derived from context; `%artefact` — Path or NaturalExpression — where to add the instructions, e.g. "the guide's Operating Instructions section"
- procedure: `::READ` and invoke Routine: Register Operating Instructions with the inputs, capturing its outputs; the command composes the session-chat response — never the routine.

### Step `3 / 6` — List `operations` in `$SKILLS/index.md`

Follow the `update-skills` procedure to list the `operations` skill in `$SKILLS/index.md` with its purpose.

### Step `4 / 6` — Allow `operations` in all agent modes

Follow the `update-agents` procedure to allow `operations` in the agent-modes index, the Codex agent files, and `$WORKSPACE/opencode.json` — all agent modes.

### Step `5 / 6` — Create instruction file for the skill

Create `$SKILLS/operations/SKILL.md` content verifying it follows the reference skill's format and includes the mandatory reading and the command declaration.

#### Commit: `build-operations-skill`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(domain-operations): Add operations skill with commands.

- Expose add-instructions command for all agent modes.
- Commands own session-chat writes; routines only transform data.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that both commands declare their inputs and that every routine invocation in a command is preceded by its `::READ` directive.
- Verify that no command performs file writes through a routine — routines only transform data; the command composes the session-chat response.
- Verify that `operations` is listed in `$SKILLS/index.md` and allowed in all agent modes.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

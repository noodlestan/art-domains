# Instructions: `review-refactor-agent-modes`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `review-refactor-agent-modes`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute this instruction. Your mode must be `worker` before you start changing files.

These are your instructions.

- RULE: If at any point you are instructed to **REPORT A BLOCKER** execute the instruction in the "## How to Report Back" section and STOP processing any other instructions.

## Path Variables

| Variable     | Resolved Path                | Purpose                     |
| ------------ | ---------------------------- | --------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root directory.   |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources directory. |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Skills resources directory. |

## Working Agreements

1. This instruction is self-contained. Use this file and its mandatory reading; do not rely on session memory.
2. The report is self-contained and must contain evidence, changes, verification, blockers, and feedback.
3. Keep the final chat report terse; the report file carries the full trail.

## Goals

Review and refactor agent modes and the delegate-plan skill to ensure correct skill links and aligned conventions.

## Mandatory Reading

- `$SKILLS/agent-architect/SKILL.md`
- `$SKILLS/agent-planner/SKILL.md`
- `$SKILLS/agent-delegator/SKILL.md`
- `$SKILLS/agent-worker/SKILL.md`
- `$SKILLS/delegate-plan/SKILL.md`
- `$DOMAINS/work/workflows/planning-work/workflow.art`
- `$DOMAINS/work/workflows/delegating-work/workflow.art`
- `$DOMAINS/plans/definitions/index.md`

## Operating Instructions

### Writing Commit Message

Follow the commit message conventions defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

### Setting Up

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
```

### Verifying Completion

Run from the `$WORKSPACE` root:

```bash
npm run lint:fix # autofix formatting issues
npm run lint # report remaining issues
```

## Changes

### Step 1: Review agent modes

Verify each agent mode links to the correct required skills:

- **architect** — Required skills: `write-plan`, `write-milestone`. Verify skill alignment references planning-work workflow. Verify mandatory reading includes plan and roadmap domains.
- **planner** — Required skills: `write-plan`. Verify skill alignment references planning-work workflow. Verify mandatory reading includes plan domain.
- **delegator** — Required skills: `delegate-plan`. Verify skill alignment references delegating-work workflow. Verify mandatory reading includes delegating-work workflow and plan definitions.
- **worker** — Required skills: `agent-worker`. Verify skill alignment references executing-work workflow.

Fix any stale references, missing `::READ` directives, or incorrect skill links.

#### Commit: `review-agent-modes`

```
build(skills): Review and fix agent mode skill links and mandatory reading

- Fix architect skill alignment and mandatory reading
- Fix planner skill alignment and mandatory reading
- Fix delegator skill alignment and mandatory reading
- Fix worker skill alignment and mandatory reading
```

### Step 2: Refactor delegate-plan skill

Extract routines from inline procedures:

- Create `$SKILLS/delegate-plan/procedures/prepare-delegation.art` from "Before executing" + Step 1
- Create `$SKILLS/delegate-plan/procedures/delegate-instructions.art` from Step 2

Rewrite commands:

- `Command: Delegate Plan(s)` — delegates to Routine: Delegate Instructions
- `Command: Record Delegation` — replaces Step 3 + Integrate Delegation
- Remove `Command: Delegate Plans` and `Command: Integrate Delegation`

#### Commit: `refactor-delegate-plan`

```
refactor(skills): Refactor delegate-plan skill to match write-plan standards

- Extract prepare-delegation and delegate-instructions routines
- Rewrite Delegate Plan(s) to delegate to routine
- Add Record Delegation command replacing Step 3 + Integrate Delegation
- Remove Delegate Plans and Integrate Delegation commands
```

## Verifying

Run from $WORKSPACE root:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other formatting issues
```

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the **render-template** skill with the `$DOMAINS/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements.

Thank you for your service.

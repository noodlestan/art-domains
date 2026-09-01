# Instructions: `rewrite-delegate-plan`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `rewrite-delegate-plan`

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

Streamline delegation interactions by moving routines to canon locations, removing task references, and simplifying commands.

## Mandatory Reading

- `$SKILLS/delegate-plan/SKILL.md`
- `$SKILLS/delegate-plan/procedures/prepare-delegation.art`
- `$SKILLS/delegate-plan/procedures/delegate-instructions.art`
- `$DOMAINS/plans/routines/integrate-plan-upstream.art` (canon syntax reference)

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

### Step 1: Move routines to canon locations and rewrite

1. Move `$SKILLS/delegate-plan/procedures/prepare-delegation.art` to `$DOMAINS/plans/routines/prepare-delegation.art`
2. Move `$SKILLS/delegate-plan/procedures/delegate-instructions.art` to `$DOMAINS/plans/routines/delegate-instructions.art`
3. Delete `$SKILLS/delegate-plan/procedures/` directory

4. Rewrite `$DOMAINS/plans/routines/prepare-delegation.art`:
   - Add inputs `%maybe-plan` and `%maybe-instructions`
   - If `%instructions` provided, load them, resolve the plan file, load it
   - Verify that the iteration the plan refers to is marked as READY and all commits are AUTHORED
   - ::READ and execute routine validate-plan
   - If problems ALERT the user and STOP processing instructions

5. Rewrite `$DOMAINS/plans/routines/delegate-instructions.art`:
   - Add input `%instructions`
   - Execute what STEP2 currently says: launch worker agents, relay questions/answers, handle blocked tasks
   - Nothing else

#### Commit: `rewrite-delegate-plan`

```
refactor(skills): Rewrite delegate-plan skill to match write-plan standards

- Move prepare-delegation and delegate-instructions to plans/routines/
- Remove all task references from routines
- Rename h1 to Delegate Plan, simplify Delegate Plan command
- Add Delegate Instructions command for targeted delegation
- Flatten all commands, invoke routines with ::READ pattern
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

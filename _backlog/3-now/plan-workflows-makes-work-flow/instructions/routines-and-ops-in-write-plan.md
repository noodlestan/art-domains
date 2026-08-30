# Instructions: `routines-and-ops-in-write-plan`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `routines-and-ops-in-write-plan`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute this instruction. Your mode must be `worker` before you start changing files.

These are your instructions. They include a section at the end on how to report back to requester.

- RULE: If at any point you are instructed to **REPORT A BLOCKER** execute the instruction in the "## How to Report Back" section and STOP processing any other instructions.

## Path Variables

| Variable     | Resolved Path                | Purpose                     |
| ------------ | ---------------------------- | --------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root directory.   |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources directory. |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Skills resources directory. |

## Working Agreements

The plan workflow runs on three working agreements:

1. This instruction is self-contained. Use this file and its mandatory reading; do not rely on session memory.
2. The report is self-contained and must contain evidence, changes, verification, blockers, and feedback.
3. Keep the final chat report terse; the report file carries the full trail.

## Goals

Bring the `write-plan` skill and its delegated routines up to the standard set by the `Create Plan`, `Convert to Plan`, and `Validate Plan` commands: details abstracted to `$DOMAINS/plans/routines/`, commands simplified to input → delegation → autonomous save vs interactive present, and routines passing the whole `%plan`/`%iteration` to templates (never `%work-item.{field}`).

## Mandatory Reading

- `$SKILLS/write-plan/SKILL.md` — The skill being updated.
- `$DOMAINS/plans/routines/create-or-update-plan.art` — Plan routine to fix.
- `$DOMAINS/plans/routines/validate-plan.md` — Validation routine to complete.
- `$DOMAINS/plans/templates/instructions.tart` — Instruction template to fix.
- `$DOMAINS/work/routines/validate-work-item.art` — Work-item validation routine (draft).

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

## Operating Instructions

### Writing Commit Message

Commit message pattern: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up 3 bullet points, max 100 chars each.

Allowed values for commit Type, Scope, and valid Type–Scope associations are defined in `$WORKSPACE/knowledge/conventions/writing-commit-message.art`, along with examples, and rules.

RULE: Do not invent commit types or scopes or assume a combination is valid. Always read the "Writing Commit Message" guide first.

### Setting Up

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
```

Run from the `$PROJECT` root:

```bash
npm run ci # to verify there are no pre-existing failures.
```

### Verifying Completion

Run from the `$PROJECT` root:

```bash
npm run lint:fix # autofix formatting issues
npm run lint # report remaining issues
npm run workspace sanity # to check git status across all repos
```

## Changes

### Step 1: Add work routines

Add new work routines for upstream/downstream integration and recomposition. Fix existing work routines.

- Add `recompose-work-item.art`, `compact-work-item.art`, `integrate-work-upstream.art`, `integrate-work-downstream.art`, `validate-work-item.art`.
- Fix `compose-work-scope.art`, `compose-work-context.art`, `compose-work-operations.art`, `compose-operating-instructions.art`, `compose-path-variables.art`.
- Fix `create-or-update-work-item.art` broken Workflow read and variable names.
- Update `work-item-abstract.art`, `workflow.art`, `work-item-context.tart`.

#### Commit: `add-work-routines`

```
build(workflows-make-work-flow): Add new work routines for upstream/downstream integration and recomposition

- Add recompose-work-item, compact-work-item, integrate-work-upstream, integrate-work-downstream, validate-work-item routines
- Fix compose-work-scope, compose-work-context, compose-work-operations, compose-operating-instructions, compose-path-variables routines
- Fix create-or-update-work-item routine broken Workflow read and variable names
- Update work-item-abstract.art with full field definitions
- Update workflow.art and work-item-context.tart for new operations model
```

### Step 2: Add plan routines

Add plan routines for plan lifecycle and validation.

- Add `create-or-update-plan.art`, `draft-iterations.art`, `plan-iterations.art`, `write-instructions.art`.
- Add `validate-plan.md`, `validate-instructions.art`, `compact-plan.art`.
- Add `integrate-plan-upstream.art`, `integrate-plan-instructions.art`, `integrate-plan-reports.art`.
- Remove `create-or-update-instructions.art` (superseded by `write-instructions` + `instructions.tart`).
- Update `plan.art`, `instructions.tart`, `plan.tart`, `milestone.art`.

#### Commit: `add-plan-routines`

```
build(workflows-make-work-flow): Add plan routines for plan lifecycle and validation

- Add create-or-update-plan, draft-iterations, plan-iterations, write-instructions routines
- Add validate-plan, validate-instructions, compact-plan routines
- Add integrate-plan-upstream, integrate-plan-instructions, integrate-plan-reports routines
- Remove create-or-update-instructions (superseded by write-instructions + instructions.tart)
- Update plan.art, instructions.tart, plan.tart, milestone.art for new structure
```

### Step 3: Rewrite write-plan skill

Rewrite write-plan skill with routine-delegating commands.

- Replace inline procedures with routine delegation for Create Plan, Validate Plan, Write Instructions.
- Add commands: Add Iteration Drafts, Plan Iterations, Integrate Upstream, Integrate Plan Instructions, Compact Plan.
- Add Command: Review or Save Plan to centralise render/save/present pattern.
- Fix all commands to use autonomous/interactive presentation modes.
- Remove WIP commands and stale inline routines.

#### Commit: `rewrite-write-plan-skill`

```
build(workflows-make-work-flow): Rewrite write-plan skill with routine-delegating commands

- Replace inline procedures with routine delegation for Create Plan, Validate Plan, Write Instructions
- Add commands: Add Iteration Drafts, Plan Iterations, Integrate Upstream, Integrate Plan Instructions, Compact Plan
- Add Command: Review or Save Plan to centralise render/save/present pattern
- Fix all commands to use autonomous/interactive presentation modes
- Remove WIP commands and stale inline routines
```

### Step 4: Update agent-architect and agent-planner

Update agent-architect and agent-planner skills to reference new routines.

- Update agent-architect to reference new work routines for Work Graph and Work Table commands.
- Update agent-planner to reference new plan routines for planning workflow.
- Remove stale references to deleted routines.

#### Commit: `update-agent-architect-and-planner`

```
build(workflows-make-work-flow): Update agent-architect and agent-planner skills

- Update agent-architect to reference new work routines for Work Graph and Work Table commands
- Update agent-planner to reference new plan routines for planning workflow
- Remove stale references to deleted routines
```

## Verifying

Execute from $WORKSPACE root:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other formatting issues
```

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing this instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the **render-template** skill with the `$DOMAINS/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-{%plan.id}/instructions/{%iteration.id}__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `%iteration.id`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

Thank you for your service.

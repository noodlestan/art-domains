# Instructions: `fix-broken-references`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `fix-broken-references`

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

Fix broken `.md` references that should point to `.art` files, and rename 2 routine files from `.md` to `.art`.

## Mandatory Reading

- `$DOMAINS/plans/routines/validate-plan.md`
- `$DOMAINS/roadmaps/routines/validate-milestone.md`

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

### Step 1: Rename routine files from .md to .art

Rename the following files:
- `domains/plans/routines/validate-plan.md` → `domains/plans/routines/validate-plan.art`
- `domains/roadmaps/routines/validate-milestone.md` → `domains/roadmaps/routines/validate-milestone.art`

#### Commit: `rename-routines-md-to-art`

```
renames(domains): Rename 2 routines from `.md` to `.art` extension

- Rename plans/routines/validate-plan.md to .art
- Rename roadmaps/routines/validate-milestone.md to .art
```

### Step 2: Fix broken references

Update all references from `.md` to `.art`:

- `domains/plans/routines/create-or-update-plan.art`: change `validate-plan.md` → `validate-plan.art`
- `domains/roadmaps/routines/create-or-update-milestone.art`: change `validate-milestone.md` → `validate-milestone.art`
- `domains/_artificials/fundamentals.md`: change `create-or-update-plan.md` → `create-or-update-plan.art`
- `skills/agent-backlog-manager/SKILL.md`: change `create-work-graph.md` → `create-work-graph.art`, `create-work-table.md` → `create-work-table.art`
- `skills/agent-delegator/SKILL.md`: change `create-work-graph.md` → `create-work-graph.art`, `create-work-table.md` → `create-work-table.art`
- `skills/agent-architect/SKILL.md`: change `create-work-graph.md` → `create-work-graph.art`, `create-work-table.md` → `create-work-table.art`
- `skills/agent-planner/SKILL.md`: change `create-work-graph.md` → `create-work-graph.art`, `create-work-table.md` → `create-work-table.art`
- `skills/write-plan/SKILL.md`: change `validate-plan.md` → `validate-plan.art`
- `skills/write-milestone/SKILL.md`: change `validate-milestone.md` → `validate-milestone.art`

#### Commit: `fix-references-md-to-art`

```
refs(domains): Fix broken references using `.md` extension where it should be `.art`

- Fix create-or-update-plan.art reference to validate-plan.md → .art
- Fix fundamentals.md reference to create-or-update-plan.md → .art
- Fix create-work-graph.md references in 4 agent skills → .art
- Fix create-work-table.md references in 4 agent skills → .art
- Fix write-plan/SKILL.md reference to validate-plan.md → .art
- Fix write-milestone/SKILL.md reference to validate-milestone.md → .art
- Fix create-or-update-milestone.art reference to validate-milestone.md → .art
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

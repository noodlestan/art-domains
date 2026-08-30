# Instructions: `routines-and-ops-in-write-milestone`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `routines-and-ops-in-write-milestone`

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

Bring the `write-milestone` skill up to the same standard as `write-plan`: details abstracted to `$DOMAINS/roadmaps/routines/`, commands simplified to input → delegation → autonomous save vs interactive present, and routines passing the whole `%milestone` to templates (never `%work-item.{field}`).

Key differences from plans: milestones have phases instead of iterations, and no instructions files — downstream is just work items.

## Mandatory Reading

- `$SKILLS/write-milestone/SKILL.md` — The skill being updated.
- `$SKILLS/write-plan/SKILL.md` — Reference for the pattern to follow.
- `$DOMAINS/roadmaps/structures/milestone.art` — Milestone structure.
- `$DOMAINS/roadmaps/templates/milestone.tart` — Milestone template.
- `$DOMAINS/work/routines/recompose-work-item.art` — Abstract recompose routine.
- `$DOMAINS/work/routines/validate-work-item.art` — Abstract validation routine.

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

### Step 1: Add roadmap routines

Add new roadmaps routines for milestone lifecycle and validation.

- Add `create-or-update-milestone.art` — delegates to Recompose Work Item + Validate Milestone.
- Add `validate-milestone.md` — validates phases (ordered, items belong to phase, phases table lists all known items), refs, paths.
- Add `compact-milestone.art` — reduces verbosity, keeps essential info.
- Add `integrate-milestone-upstream.art` — analyses drift between upstream and milestone.
- Add `integrate-milestone-downstream.art` — integrates findings from downstream work items.

Key validation rules for milestones:
- Phases must be ordered by index.
- Each work item must belong to a phase.
- The phases table must list all known items.
- Phases table and items table must be consistent.

#### Commit: `add-milestone-routines`

```
build(workflows-make-work-flow): Add roadmaps routines for milestone lifecycle and validation

- Add create-or-update-milestone, validate-milestone, compact-milestone routines
- Add integrate-milestone-upstream, integrate-milestone-downstream routines
- Validate phases ordering, item-to-phase assignment, and phases table completeness
- Reuse abstract work routines (recompose-work-item, validate-work-item)
```

### Step 2: Rewrite write-milestone skill

Rewrite write-milestone skill with routine-delegating commands.

- Replace inline procedures with routine delegation for Create Milestone, Validate Milestone.
- Add commands: Integrate Milestone Upstream, Integrate Milestone Downstream, Compact Milestone.
- Add Command: Review or Save Milestone to centralise render/save/present pattern.
- Fix all commands to use autonomous/interactive presentation modes.
- Remove stale inline routines and references to plan structures.

#### Commit: `rewrite-write-milestone-skill`

```
build(workflows-make-work-flow): Rewrite write-milestone skill with routine-delegating commands

- Replace inline procedures with routine delegation for Create Milestone, Validate Milestone
- Add commands: Integrate Milestone Upstream, Integrate Milestone Downstream, Compact Milestone
- Add Command: Review or Save Milestone to centralise render/save/present pattern
- Fix all commands to use autonomous/interactive presentation modes
- Remove stale inline routines and references to plan structures
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

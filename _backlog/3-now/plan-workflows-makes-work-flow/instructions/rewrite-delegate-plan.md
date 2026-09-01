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
- `$DOMAINS/plans/routines/integrate-plan-upstream.art` (canon routine syntax reference)
- `$DOMAINS/plans/routines/validate-plan.art` (validation routine invoked by prepare-delegation)

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

### Step 1: Move routines to canon locations

1. Move `$SKILLS/delegate-plan/procedures/prepare-delegation.art` to `$DOMAINS/plans/routines/prepare-delegation.art`
2. Move `$SKILLS/delegate-plan/procedures/delegate-instructions.art` to `$DOMAINS/plans/routines/delegate-instructions.art`
3. Delete `$SKILLS/delegate-plan/procedures/` directory

#### Commit: `rewrite-delegation-routines`

```
refactor(domains): Rewrite delegation routines in plans domain

- Move prepare-delegation and delegate-instructions to plans/routines/
- Rewrite prepare-delegation with %maybe-plan and %maybe-instructions inputs
- Verify iteration READY and commits AUTHORED, validate plan, ALERT on problems
- Rewrite delegate-instructions with %instructions input, keep worker launch and relay
- Remove all task references from both routines
```

### Step 2: Rewrite `$DOMAINS/plans/routines/prepare-delegation.art`

Use canon routine syntax (reference: `$DOMAINS/plans/routines/integrate-plan-upstream.art`):

- Keep `# Module` header and `## Routine: Prepare Delegation` heading
- Add **Inputs:** `%maybe-plan` and `%maybe-instructions`
- Add **Output:** `%plan` — the plan to delegate
- Replace the "### Before executing" task-file RULEs with:
  - If `%instructions` provided: load them, resolve the plan file, load it
  - Verify that the iteration the plan refers to is marked as `READY` and all commits are `AUTHORED`
  - ::READ `$DOMAINS/plans/routines/validate-plan.art` and execute **Routine: Validate Plan** with `%plan`
  - If problems ALERT the user and STOP processing instructions
- Keep Step 1: Set execution state (mark plan as WORKING per Plan Record rules)
- Remove all task references (`task-{task.id}/task.md`, `specifications/{specification.id}.md`)

### Step 3: Rewrite `$DOMAINS/plans/routines/delegate-instructions.art`

- Add **Inputs:** `%instructions`
- Keep only the Step 2 content: launch a `worker` agent per instruction file, pass the implementation instruction as stored, do not modify prompts
- Keep sub-agent interaction: relay questions/answers verbatim, do not interpret
- Keep blocked tasks handling: update task to Blocked, add blocker to plan, continue remaining tasks in batch
- Remove task references where they refer to old task files; use plan/instruction terminology

### Step 4: Rewrite `$SKILLS/delegate-plan/SKILL.md`

- Rename h1 from `Skill: Execute Plan` to `Skill: Delegate Plan`
- Update Routines section: ::READ `$DOMAINS/plans/routines/prepare-delegation.art` and `$DOMAINS/plans/routines/delegate-instructions.art`
- Simplify `Command: Delegate Plan` — 1 input `%plan`, discard `%maybe-guide`, multi-plan logic, and mode branches
- Add `Command: Delegate Instructions` — with instructions, execute prepare-delegation to identify plan and validate; if problem ALERT and STOP; if no problem execute Delegate Instructions, report blocker or success, confirm commits, check pushed, check report file, check plan updated; present unstaged files and table with commit id, policy, hash, pushed
- Flatten all commands, no bolds
- All invocations preceded by `::READ` routine file
- Invoke routines using "With input execute **Routine: ...** to ..."
- Keep Success Criteria (all READY instruction files executed via delegation, plan record reflects only status-level progress, no task content duplicated)

#### Commit: `rewrite-delegate-skill`

```
refactor(skills): Rewrite delegate-plan skill to match write-plan standards

- Rename h1 to Delegate Plan
- Simplify Delegate Plan command to single %plan input
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
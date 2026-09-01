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
- `$DOMAINS/plans/routines/integrate-plan-upstream.art` — canon routine syntax reference
- `$DOMAINS/plans/routines/validate-plan.art` — validation routine invoked by prepare-delegation

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

The two delegation routines currently live inside the skill at `$SKILLS/delegate-plan/procedures/`. Routines belong in the domain, not in the skill — the skill should only reference them. Move both files to `$DOMAINS/plans/routines/` so they sit next to the other plan routines (`integrate-plan-upstream.art`, `validate-plan.art`, `write-instructions.art`).

1. Move `$SKILLS/delegate-plan/procedures/prepare-delegation.art` to `$DOMAINS/plans/routines/prepare-delegation.art`
2. Move `$SKILLS/delegate-plan/procedures/delegate-instructions.art` to `$DOMAINS/plans/routines/delegate-instructions.art`
3. Delete the now-empty `$SKILLS/delegate-plan/procedures/` directory

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

The routine must follow the canon routine syntax used across the plans domain. Study `$DOMAINS/plans/routines/integrate-plan-upstream.art` before writing: it opens with a `# Module` header, declares its inputs and output, and walks a numbered `**Procedure:**` that reads other routines with `::READ` and executes them with the "Execute the **Routine: ...** with `%input` to ..." phrasing.

The rewritten routine keeps the `# Module` header and the `## Routine: Prepare Delegation` heading, and declares its interface like this:

```art
## Routine: Prepare Delegation

**Purpose:** Validate delegation prerequisites and set execution state.

**Inputs:**

- `%maybe-plan` — An existing plan record or a starting point for a new one.
- `%maybe-instructions` — Specific instruction files to delegate.

**Output:**

- `%plan` — The plan to delegate.
```

The current "### Before executing" section is full of task-file rules that no longer apply (`task-{task.id}/task.md`, `specifications/{specification.id}.md`). Remove every task reference. Replace the section with the validation flow:

- If `%instructions` are provided, load them, resolve the plan file they belong to, and load it.
- Verify that the iteration the plan refers to is marked as `READY` and that all commits are `AUTHORED`.
- ::READ `$DOMAINS/plans/routines/validate-plan.art` and execute the **Routine: Validate Plan** with `%plan` to identify `%updates` to correct stale statuses, broken refs, and unresolvable paths.
- If problems are found, STOP and ALERT USER — do not proceed to delegation.

Keep the existing Step 1: Set execution state, which marks the plan as WORKING as per Plan Record rules.

### Step 3: Rewrite `$DOMAINS/plans/routines/delegate-instructions.art`

This routine is the execution half of delegation. It declares a single input:

```art
## Routine: Delegate Instructions

**Purpose:** Execute delegations by launching worker agents with instruction files.

**Inputs:**

- `%instructions` — The instruction files to delegate.
```

Keep only the current Step 2 content — the routine does nothing else:

- For each instruction file, launch a `worker` agent and pass the implementation instruction as stored in the instruction file. Do not modify prompts.
- Sub-agent interaction: relay questions verbatim, relay answers verbatim, do not interpret.
- Blocked tasks: update the task to "Blocked", add the blocker to the plan, and continue the remaining tasks in the batch.

Remove task references where they refer to old task files; use plan and instruction terminology instead.

### Step 4: Rewrite `$SKILLS/delegate-plan/SKILL.md`

The skill becomes a thin shell over the two domain routines, matching the shape of `$SKILLS/write-plan/SKILL.md`.

- Rename the h1 from `Skill: Execute Plan` to `Skill: Delegate Plan`.
- Update the Routines section so both `::READ` directives point at the new canon locations:

```markdown
## Routines

::READ `$DOMAINS/plans/routines/prepare-delegation.art` — Validate delegation prerequisites and set execution state.

::READ `$DOMAINS/plans/routines/delegate-instructions.art` — Execute delegations by launching worker agents with instruction files.
```

- Simplify `Command: Delegate Plan` to a single input `%plan`. Discard `%maybe-guide`, the multi-plan logic, and the `%mode` branches — the command just reads the routine and executes it:

```markdown
**Procedure:**

1. ::READ `$DOMAINS/plans/routines/prepare-delegation.art`.
2. Execute the **Routine: Prepare Delegation** with `%plan` to validate delegation prerequisites and set execution state.
3. ::READ `$DOMAINS/plans/routines/delegate-instructions.art`.
4. Execute the **Routine: Delegate Instructions** with `%plan` to launch worker agents with the instruction files.
```

- Add `Command: Delegate Instructions` for targeted delegation: with `%instructions`, execute prepare-delegation to identify the plan and validate; if problems are found, STOP and ALERT USER; if no problems, execute Delegate Instructions, report blocker or success, confirm commits were made, check they were pushed, check the report file, check the plan was updated; present unstaged files and a table with commit id, policy, hash, pushed.
- Flatten all commands — no bolds in command bodies.
- Every routine invocation must be preceded by `::READ` of the routine file.
- Keep the Success Criteria: all READY instruction files are executed via delegation, the plan record reflects only status-level progress, and no task content is duplicated into the plan record.

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
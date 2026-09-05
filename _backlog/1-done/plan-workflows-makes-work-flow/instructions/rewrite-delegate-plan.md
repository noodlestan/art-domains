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
refactor(workflows-make-work-flow): Rewrite delegation routines in plans domain

- Move prepare-delegation and delegate-instructions to plans/routines/
- Rewrite prepare-delegation with %maybe-plan and %maybe-instructions inputs
- Verify iteration READY and commits AUTHORED, validate plan, ALERT on problems
- Rewrite delegate-instructions with %instructions input, keep worker launch and outcome identification
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

Keep only the Step 2 content — the routine does nothing else:

```md
**Procedure:**

1. Launch a `worker` sub-agent and pass the implementation `%instructions` as stored in the instruction file. Do not modify prompts.
2. When the sub-agent completes, identify:
   1. Delegation outcome: successful or did it report a BLOCKER?
   2. Commits made.
   3. Uncommitted files.
   4. The delegation report file created by the sub-agent and whether it was committed or not.
   5. Evidence and Feedback sections in the delegation report.
   6. Updates made to plan file.
```

### Step 4: Rewrite `$SKILLS/delegate-plan/SKILL.md`

The skill becomes a thin shell over the two domain routines, matching the shape of `$SKILLS/write-plan/SKILL.md`.

- Rename the h1 from `Skill: Execute Plan` to `Skill: Delegate Plan`.
- Update the Routines section so both `::READ` directives point at the new canon locations.

```markdown
## Routines

::READ `$DOMAINS/plans/routines/prepare-delegation.art` — Validate delegation prerequisites and set execution state.

::READ `$DOMAINS/plans/routines/delegate-instructions.art` — Execute delegations by launching worker agents with instruction files.
```

Keep the Success Criteria: all READY instruction files are executed via delegation, the plan record reflects only status-level progress, and no content from delegation reports - other than feedback - was duplicated in the plan record.

Every routine invocation must be preceded by `::READ` of the routine file.

- Simplify `Command: Delegate Plan` to a single input `%plan`. Discard `%maybe-guide`, the multi-plan logic, and the `%mode` branches — the command just reads the routine and executes it:

```md
**Procedure:**

1. ::READ `$DOMAINS/plans/routines/prepare-delegation.art`.
2. Execute the **Routine: Prepare Delegation** with `%plan` to validate delegation prerequisites and set execution state.
3. Identify next delegatable `%iterations` within the plan:
   1. The next delegatable iteration is either the first one, or follows iterations which are all DONE
   2. Marked as READY, has an instructions file, all commits are AUTHORED
4. With each READY `%iteration` in `%iterations`
   1. Execute **Command: Delegate Instructions**
   2. If the delegation did not complete successfully, STOP and ALERT USER.
   3. If `%mode` is `autonomous`, go back to step 3: Identify next delegatable `%iterations` within the plan.
```

- Add `Command: Delegate Instructions` for targeted delegation with inputs `%instructions` and `%mode`.

```md
**Procedure:**

1. ::READ `$DOMAINS/plans/routines/prepare-delegation.art`.
2. Execute the **Routine: Prepare Delegation** with `%instructions` to identify the plan and validate delegation prerequisites.
3. If issues are found, STOP and ALERT USER.
4. Otherwise:
   1. ::READ `$DOMAINS/plans/routines/delegate-instructions.art`.
   2. Execute the **Routine: Delegate Instructions** with `%instructions` to launch worker agents with the instruction files.
   3. If the delegation did not complete successfully, STOP and ALERT USER.
   4. Otherwise:
      1. If `%mode` is `autonomous`:
         1. Execute the **Command: Record Delegation** with `%instructions`.
      2. Otherwise:
         1. Present the outcome to the user, including:
            - outcome: success or blocker
            - commits: table of commits made: "repository path", "hash", "policy", "message", "pushed?"
            - report: path to report file if one was created
            - instructions: path to delegated instructions file
            - plan: path to plan file
            - git status: whether there are uncommitted files in any of the repositories
```

- Rewrite `Command: Record Delegation` with inputs `%maybe-instructions` and `%maybe-report`.

Use the following pseudo code, complete it, use canon syntax and idioms.

```pseudo
**Procedure:**

resolve input to `%instructions` and its owning `%plan`
identify:
   1. Delegation outcome: successful or did it report a BLOCKER?
   2. Commits made.
   3. Uncommitted files.
   4. The delegation report file created by the sub-agent and whether it was committed or not.
   5. Evidence and Feedback sections in the delegation report.
   6. Updates made to plan file.
Determine the delta, i.e., what still needs to be committed and updated.
If the delegation reported a BLOCKER or an inconsistency is found (other than stale statuses in the plan file), STOP and ALERT USER.
Otherwise, perform all operations that apply:
   1. in the plan:
      1. update iteration status to DONE, both in its section and eventual tables that list iterations with statuses.
      2. update commit statuses to COMMITTED, both in their sections and eventual tables that list commits with statuses.
   2. stage uncommitted artefacts, such as the delegation report, and eventual source code not committed by agent
   3. commit "integrate({scope}): iteration `{iteration.id}` DONE".

```

#### Commit: `rewrite-delegate-skill`

```
refactor(workflows-make-work-flow): Rewrite delegate-plan skill to match write-plan standards

- Rename h1 to Delegate Plan
- Simplify Delegate Plan command to single %plan input
- Add Delegate Instructions command for targeted delegation
- Rewrite Record Delegation command with %maybe-instructions and %maybe-report inputs
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

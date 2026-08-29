# Instructions: `iteration-commit-nesting`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `iteration-commit-nesting`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute this instruction. Your mode must be `worker` before you start changing files.

These are your instructions. They include a section at the end on how to report back to requester.

- RULE: If at any point you are instructed to **REPORT A BLOCKER** execute the instruction in the "## How to Report Back" section and STOP processing any other instructions.

## Path Variables

| Variable     | Resolved Path                | Purpose                     |
| ------------ | ---------------------------- | --------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root directory.   |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources directory. |

## Working Agreements

The plan workflow runs on three working agreements:

1. This instruction is self-contained. Use this file and its mandatory reading; do not rely on session memory.
2. The report is self-contained and must contain evidence, changes, verification, blockers, and feedback.
3. Keep the final chat report terse; the report file carries the full trail.

## Goals

Add a notes field to Type: Commit and create a commit template for rendering commits in plans and iterations.

## Mandatory Reading

- `$DOMAINS/commits/types/commit.art` — Current commit type to extend.
- `$DOMAINS/commits/index.md` — Commits domain index.
- `$DOMAINS/plans/templates/plan.tart` — Plan template to update.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

## Setting Up

From `$WORKSPACE/`:

```bash
npm ci # to install dependencies.
```

## Changes

### Step 1: Add notes field to Type: Commit

Update `$DOMAINS/commits/types/commit.art` to add a `notes` field to the shape.

- `notes` — NaturalBlock. Bullet-point list of observations made by the user during or after execution.

### Step 2: Create Template: Commit

Create `$DOMAINS/commits/templates/commit.tart` with:

```md
::TEMPLATE::READ (Type: Commit) FROM `$DOMAINS/commits/types/commit.art`

#### Commits:

::TEMPLATE With each `%commit` in `%commits` — List (Type: Commit) — render a table with columns "ID", "Repository / Checkout / Branch", "Policy", "Hash", and "Status"

::EXAMPLE

| ID                             | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ------------------------------ | --------------------------------- | ------------ | --------- | ----------- |
| `add-work-domain-and-refactor` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `5a6b120` | `COMMITTED` |

::END

::TEMPLATE(Commits) With each `%commit` in `%commits` — List (Type: Commit) — render an H5 section with format:

##### Commit: {{%commit.id}}

**Repository:** {{repository.name}}

**Message:**

{{commit.message}}

::END(Commits)
```

### Step 3: Update Plan Template

Update `$DOMAINS/plans/templates/plan.tart` to render the commits template before `::END(Iterations)`.

Add:

```md
::TEMPLATE With `%iteration.commits` as `%commits` render the `$DOMAINS/commits/templates/commit.tart` template.
```

### Step 4: Update Commits Index

Update `$DOMAINS/commits/index.md` to add the new Template: Commit.


### Step 5: Commit

**Policy:** BLOCKED — commit will be executed but not pushed. It will be reviewed by humans before pushing.

Commit `add-commit-template` with message:

```
build(domains): Create template for rendering commits.

- Add `notes` field to Type: Commit.
- Add "Template: Commit"
- Update "Template: Plan" to render the commits template before `::END(Iterations)`.
- Update Domain: Commits index with new Template.
```

Push the commit.


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
3. Use the **render-template** skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-{%plan.id}/instructions/{%iteration.id}__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Include an "Uncertain Matches" section in the report listing any files where you were unsure whether a match should be intervened — these were not changed.
6. Generate the response and send it back to the delegator.
7. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `%commit.id`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

Thank you for your service.



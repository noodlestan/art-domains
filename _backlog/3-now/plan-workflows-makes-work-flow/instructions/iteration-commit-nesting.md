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

**Notes:**

{{commit.notes}}

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

## Verifying

Execute from $WORKSPACE root:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other formatting issues
```

## How to Report Back

Render `$DOMAINS/plans/templates/instructions-report.tart` to produce the report. Write it next to this instruction file as `iteration-commit-nesting__report.md`.

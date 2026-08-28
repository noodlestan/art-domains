# Instructions: `update-stale-references`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `update-stale-references`

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

Update stale workflow and stage references in `.agents/` files to match renamed workflows and stages.

## Changes

### Step 1: Update workflow name references

Replace:
- "Workflow: Planning" => "Workflow: Planning Work"
- "Workflow: Implementing" => "Workflow: Executing Work"
- "Workflow: Engineering" => "Workflow: Executing Work"
- "Delivery Workflow" => "Workflow: Executing Work"

### Step 2: Update workflow stage name references

Replace stale stage names with new names.

### Step 3: Update file path references

Update renamed paths:
- `work/types/workflow-stage.art` to `work/structures/workflow-stage.art`
- `engineering/workflows/engineering.art` => `work/workflows/executing-work/workflow.art`
- `plans/workflows/planning.art` => `work/workflows/planning-work/workflow.art`

### Step 4: Remove engineering domain files

Remove:
- `$DOMAINS/engineering/domain.art`
- `$DOMAINS/engineering/index.md`

## Verifying

Execute from $WORKSPACE root:

```bash
npm run lint:fix
npm run lint
```

## How to Report Back

Write report as `update-stale-references__report.md`.

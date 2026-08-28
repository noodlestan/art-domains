# Instructions: `migration-prompts`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `migration-prompts`

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

Generate prompts for architects and planners working on other sessions to update their plans according to new structures.

## Changes

### Step 1: Generate Milestone Migration Prompt

Create a prompt for milestone migration with instructions on:
- Updating milestone structure references
- Updating template references
- Updating workflow references

### Step 2: Generate Plan Migration Prompt

Create a prompt for plan migration with instructions on:
- Updating plan structure references
- Updating template references
- Updating workflow references
- Updating iteration and commit references

## Verifying

Execute from $WORKSPACE root:

```bash
npm run lint:fix
npm run lint
```

## How to Report Back

Write report as `migration-prompts__report.md`.

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

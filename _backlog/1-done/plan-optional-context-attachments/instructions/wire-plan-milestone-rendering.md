# Instructions: `wire-plan-milestone-rendering`

**Plan:** `optional-context-attachments`

**Iteration Id:** `wire-plan-milestone-rendering`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-optional-context-attachments/instructions/wire-plan-milestone-rendering__report.md`.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse: happy face + up to 3 bullet points — done `wire-plan-milestone-rendering`, wired both templates, thumbs up. The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                                        |
| ------------ | ---------------------------- | ---------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root; commit from here.              |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain templates and structures being changed. |

## Working Agreements

The plan workflow runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user expects a light confirmation: a happy face and up to 3 bullet points. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Render the summary unconditionally and the context conditionally in both `plan.tart` and `milestone.tart`, expose `has-context-file` as a rendered `**Has Context File:**` field, and repoint the migrate routines that read the removed `work-item-context.tart`. When `has-context-file` is TRUE the full context is rendered ONLY into the separate `plan__context.md` / `milestone__context.md` attachment (referenced via the Attachments list) — the main file stays lean and does not also inline it.

## Mandatory Reading

- Template: `$DOMAINS/plans/templates/plan.tart` — plan template being rewired (context render is at line ~31).
- Template: `$DOMAINS/milestones/templates/milestone.tart` — milestone template being rewired (context render is at line ~31).
- Structure: `$DOMAINS/plans/structures/plan.art` — plan structure gaining the inherited field.
- Structure: `$DOMAINS/milestones/structures/milestone.art` — milestone structure gaining the inherited field.
- Templates: `$DOMAINS/work/templates/work-item-summary.tart`, `work-item-context-attachment.tart`, `work-item-context-section.tart` — produced by the previous iteration.
- Conventions: `$WORKSPACE/knowledge/conventions/writing-commit-message.art` — commit message rules.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions

### Setting Up

**Instructions:** Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
```

### Writing Commit Message

**Instructions:**

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the message following: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up to 3 bullet points, max 100 chars each.

### Verifying Completion

**Instructions:** Run from the `$WORKSPACE` root:

```bash
npm run ci # lint, build and test
```

---

## Changes

- Step 1 / 4 — Declare `has-context-file` on the plan and milestone structures
- Step 2 / 4 — Rewire `plan.tart`
- Step 3 / 4 — Rewire `milestone.tart` and repoint the migrate routines
- Step 4 / 4 — Commit `wire-plan-milestone-rendering`

## Steps

### Step `1 / 4` — Declare `has-context-file` on the plan and milestone structures

Document the inherited field on both structures so it is discoverable.

- In `$DOMAINS/plans/structures/plan.art`, add `has-context-file` to the **Inherits:** list (e.g. after `status`): a one-line description "Boolean. Whether the plan carries a context attachment (`plan__context.md`). Example: `FALSE`."
- In `$DOMAINS/milestones/structures/milestone.art`, add the equivalent `has-context-file` entry to its **Inherits:** list.

### Step `2 / 4` — Rewire `plan.tart`

- In `$DOMAINS/plans/templates/plan.tart`:
  - Immediately after the `**Template:**` field (line ~17), insert:

```md
**Has Context File:** `{{%plan.has-context-file}}`
```

- Replace the single directive at line ~31 (`::TEMPLATE With "Plan" as the `%kind`and`%plan`as the`%work-item` render the $DOMAINS/work/templates/work-item-context.tart template.`) with:
  1. An unconditional render of the summary: `::TEMPLATE With "Plan" as the `%kind`and`%plan`as the`%work-item` render the $DOMAINS/work/templates/work-item-summary.tart template.`
  2. A conditional context render:
     - `::TEMPLATE If \`%plan.has-context-file\` is TRUE, render the full context into the separate attachment file \`plan-{%plan.id}/plan\_\_context.md\` using the $DOMAINS/work/templates/work-item-context-attachment.tart template; the main file only references it via the Attachments list (do NOT inline it).`
     - `::TEMPLATE If \`%plan.has-context-file\` is FALSE, with "Plan" as the \`%kind\` and \`%plan\` as the \`%work-item\` render the $DOMAINS/work/templates/work-item-context-section.tart template inline.`

### Step `3 / 4` — Rewire `milestone.tart` and repoint the migrate routines

- In `$DOMAINS/milestones/templates/milestone.tart`, apply the same two edits as Step 2 (insert `**Has Context File:**` after `**Template:**` at line ~17; replace the line ~31 context render with the unconditional summary + the TRUE→attachment / FALSE→section conditional, using `%milestone` and saving to `milestone-{%milestone.id}/milestone__context.md`).
- Repoint `$DOMAINS/plans/routines/migrate-plan.art` (the `::READ ... work-item-context.tart` step, ~line 30) to `$DOMAINS/work/templates/work-item-summary.tart` and `$DOMAINS/work/templates/work-item-context-section.tart`.
- Repoint `$DOMAINS/milestones/routines/migrate-milestone.art` (the equivalent step, ~line 31) the same way.

### Step `4 / 4` — Commit `wire-plan-milestone-rendering`

---

#### Commit: `wire-plan-milestone-rendering`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(context-attachments): Render summary always and context conditionally in plan and milestone

- Declare has-context-file on the plan and milestone structures.
- Render Has Context File after Template in both templates.
- Replace the inline context render with summary + conditional attachment/section; repoint migrate routines.
```

---

## Final Verification

**Instructions:**

- Verify that the commit has been executed (not pushed) according to the commit's policy.
- Verify that `plan.tart` and `milestone.tart` each render `**Has Context File:**` immediately after `**Template:**`.
- Verify that both templates render `work-item-summary.tart` unconditionally and the attachment/section conditionally (TRUE → `__context.md` attachment only; FALSE → inline section).
- Verify that `grep -rn 'work-item-context\.tart' $DOMAINS` still returns no matches (migrate routines repointed).
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

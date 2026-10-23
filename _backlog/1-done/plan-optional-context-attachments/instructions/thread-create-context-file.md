# Instructions: `thread-create-context-file`

**Plan:** `optional-context-attachments`

**Iteration Id:** `thread-create-context-file`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-optional-context-attachments/instructions/thread-create-context-file__report.md`.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse: happy face + up to 3 bullet points — done `thread-create-context-file`, threaded the input, thumbs up. The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                      | Purpose                                                             |
| ------------ | ---------------------------------- | ------------------------------------------------------------------- |
| `$WORKSPACE` | Current working directory          | Workspace root; commit from here.                                   |
| `$PROJECT`   | `$WORKSPACE/checkouts/art-domains` | Art Domains checkout (holds the skills dir reference in docs only). |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains`       | Domain routines being changed.                                      |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`        | `write-plan` and `write-milestone` skills.                          |

## Working Agreements

The plan workflow runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user expects a light confirmation: a happy face and up to 3 bullet points. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Let authors choose a context attachment at creation time via a `%create-context-file` input, persist the choice as `has-context-file` on the work item (and keep it through refinement), and extend the Review-or-Save commands to render and save the `plan__context.md` / `milestone__context.md` attachment when the flag is set. `compose-work-context.art` keeps composing context unconditionally — the flag only controls where that context is rendered.

## Mandatory Reading

- Skill: `$SKILLS/write-plan/SKILL.md` — `Create Plan`, `Convert to Plan`, and `Review or Save Plan` commands.
- Skill: `$SKILLS/write-milestone/SKILL.md` — `Create Milestone`, `Convert to Milestone`, and `Review or Save Milestone` commands.
- Routine: `$DOMAINS/plans/routines/create-or-update-plan.art` — plan creation entry point.
- Routine: `$DOMAINS/milestones/routines/create-or-update-milestone.art` — milestone creation entry point.
- Routine: `$DOMAINS/work/routines/create-or-update-work-item.art` — composes the work item (calls `compose-work-context.art` at step 4).
- Routine: `$DOMAINS/work/routines/recompose-work-item.art` — refreshes a work item on refine (calls `compose-work-context.art` at step 4).
- Routine: `$DOMAINS/work/routines/compose-work-context.art` — composes context; MUST keep running unchanged.
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

- Step 1 / 4 — Thread `%create-context-file` through the work-item and create/recompose routines
- Step 2 / 4 — Add the input + save-attachment to the `write-plan` skill
- Step 3 / 4 — Add the input + save-attachment to the `write-milestone` skill
- Step 4 / 4 — Commit `thread-create-context-file`

## Steps

### Step `1 / 4` — Thread `%create-context-file` through the routines

Persist the choice on the work item and keep it through refinement.

- In `$DOMAINS/work/routines/create-or-update-work-item.art`:
  - Add an input: `- \`%create-context-file\` — Boolean. Whether the work item carries a context attachment (\`plan|milestone\_\_context.md\`). Defaults to \`FALSE\`.`
  - In the field-generation step (step 8) or the compose step (step 9), set `has-context-file` on the generated `%work-item` from `%create-context-file`.
- In `$DOMAINS/work/routines/recompose-work-item.art`:
  - Ensure `has-context-file` is carried through the refresh (the refresh recomposes context but must NOT drop the flag). Add a note/step so the existing `has-context-file` value is preserved when `%create-context-file` is not explicitly provided.
- In `$DOMAINS/plans/routines/create-or-update-plan.art`:
  - Add the `%create-context-file` input and pass it to the **Routine: Create OR Update Work Item** invocation (step 2).
- In `$DOMAINS/milestones/routines/create-or-update-milestone.art`:
  - Add the `%create-context-file` input and pass it into the **Routine: Recompose Work Item** path (so it reaches `create-or-update-work-item.art` / the composed milestone).

### Step `2 / 4` — Add the input + save-attachment to the `write-plan` skill

- In `$SKILLS/write-plan/SKILL.md`:
  - **Create Plan** command: add an input `- \`%create-context-file\` — Boolean. Whether to render the context into a separate \`plan\_\_context.md\` attachment. Defaults to \`FALSE\`.` and pass it to the **Routine: Create OR Update Plan**.
  - **Convert to Plan** command: pass `%create-context-file` through to **Create Plan**.
  - **Review or Save Plan** command (autonomous branch), after rendering `plan.md`: add a step — `If \`%plan.has-context-file\` is TRUE, use the \`render-template\` skill to render \`$DOMAINS/work/templates/work-item-context-attachment.tart\` and save it to \`plan-{%plan.id}/plan\_\_context.md\`.` When FALSE, no attachment file is written.

### Step `3 / 4` — Add the input + save-attachment to the `write-milestone` skill

- In `$SKILLS/write-milestone/SKILL.md`, mirror Step 2:
  - **Create Milestone**: add `%create-context-file` and pass it to the **Routine: Create or Update Milestone**.
  - **Convert to Milestone**: pass it through.
  - **Review or Save Milestone** (autonomous branch), after rendering `milestone.md`: add — `If \`%milestone.has-context-file\` is TRUE, render the attachment template and save it to \`milestone-{%milestone.id}/milestone\_\_context.md\`.`

### Step `4 / 4` — Commit `thread-create-context-file`

---

#### Commit: `thread-create-context-file`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(context-attachments): Thread create-context-file through plan and milestone creation

- Add %create-context-file to the write-plan and write-milestone create/save commands.
- Persist has-context-file through the plan, milestone, and work create/recompose routines.
- Render and save the plan__context.md / milestone__context.md attachment when enabled.
```

---

## Final Verification

**Instructions:**

- Verify that the commit has been executed (not pushed) according to the commit's policy.
- Verify that `write-plan` and `write-milestone` expose `%create-context-file` on their create/convert commands and save the `__context.md` attachment in Review-or-Save when the flag is TRUE.
- Verify that `create-or-update-work-item.art` sets `has-context-file`, and `recompose-work-item.art` preserves it.
- Verify that `compose-work-context.art` is still invoked (unchanged) from both the create and recompose paths.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

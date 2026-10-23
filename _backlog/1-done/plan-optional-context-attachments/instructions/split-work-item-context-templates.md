# Instructions: `split-work-item-context-templates`

**Plan:** `optional-context-attachments`

**Iteration Id:** `split-work-item-context-templates`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-optional-context-attachments/instructions/split-work-item-context-templates__report.md`.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse: happy face + up to 3 bullet points — done `split-work-item-context-templates`, created the three templates, thumbs up. The full trail lives in the report file; never repeat it in chat.

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

Split the monolithic `$DOMAINS/work/templates/work-item-context.tart` into a reusable always-inline summary template, a full-context attachment template, and a compact inline section template; add the `has-context-file` Boolean to the abstract work item; and repoint every reader of the removed template so no references dangle. Context composition (`compose-work-context.art`) is NOT touched.

## Mandatory Reading

- Structure: `$DOMAINS/work/structures/work-item-abstract.art` — abstract work item gaining `has-context-file`.
- Template: `$DOMAINS/work/templates/work-item-context.tart` — the template being split; its section order defines what each new template contains.
- Routine: `$DOMAINS/work/routines/compose-work-context.art` — composes context; MUST keep running unchanged (do not modify it).
- Routine: `$DOMAINS/work/routines/validate-work-item.art` — reads the context template; must be repointed.
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

- Step 1 / 8 — Add `has-context-file` to the abstract work item
- Step 2 / 8 — Create `work-item-summary.tart`
- Step 3 / 8 — Create `work-item-context-attachment.tart`
- Step 4 / 8 — Create `work-item-context-section.tart`
- Step 5 / 8 — Remove `work-item-context.tart`
- Step 6 / 8 — Repoint `validate-work-item.art`
- Step 7 / 8 — Update the domain index listings
- Step 8 / 8 — Commit `split-work-item-context-templates`

## Steps

### Step `1 / 8` — Add `has-context-file` to the abstract work item

Declare the new Boolean on the abstract structure so plans and milestones inherit it.

- Open `$DOMAINS/work/structures/work-item-abstract.art`.
- In the **Shape:** section, add a new entry next to `attachments` (keep it near the other identity/summary fields):

```md
- `has-context-file` — Boolean. Whether the work item carries a context attachment rendered into a separate `plan|milestone__context.md` file. When FALSE the context is rendered inline as a compact section. Example: `FALSE`.
```

### Step `2 / 8` — Create `work-item-summary.tart`

The always-inline skeleton of every plan/milestone file.

- Create `$DOMAINS/work/templates/work-item-summary.tart`.
- Copy the `::TEMPLATE` preamble (the first five `::TEMPLATE` lines of `work-item-context.tart`) and the `::TEMPLATE::READ` directives needed by the sections you carry over.
- Carry over these H2 sections **verbatim** from `work-item-context.tart` (they are the non-`## Context` sections): `## Path Variables`, `## Summary`, `## Attachments`, `## Scope`, `## Execution Context`.
- Keep every `::TEMPLATE`, `::EXAMPLE`, and `::END` directive intact and parameterised on `%kind` and `%work-item`.
- NOTE: `## Scope` and `## Execution Context` live here (always inline) so the main file stays coherent whether or not the context is extracted.

### Step `3 / 8` — Create `work-item-context-attachment.tart`

The full context, rendered into the standalone `plan__context.md` / `milestone__context.md`.

- Create `$DOMAINS/work/templates/work-item-context-attachment.tart`.
- Copy the `::TEMPLATE` preamble and the `::TEMPLATE::READ` directives for the context types (Path Ref, Work Scope Resource, Upstream Work Context, Skill Context, Domain, Workflow, Operation, Knowledge Context).
- First content line is the document title:

```md
# {{%kind}}: {{%work-item.name}} (Context)
```

- Then render these as **H2** sections (promote the current `### ` subsections of `## Context` to `## `, and do NOT keep a `## Context` wrapper — the whole document is the context): `## Upstream Work`, `## Required Skills`, `## Domains`, `## Resource Kinds in Scope`, `## Workflows`, `## Workflow Operations`, `## Knowledge`.
- Keep the tables/`::READ`-directive rendering of each subsection exactly as it is today (this is the FULL-fidelity version).

### Step `4 / 8` — Create `work-item-context-section.tart`

The compact, bullet-only inline variant used when `has-context-file` is FALSE.

- Create `$DOMAINS/work/templates/work-item-context-section.tart`.
- Same preamble; same H2 sections as the attachment template **except**: omit `## Workflow Operations` entirely.
- Each section renders ONLY a bullet list in the form `- {name} – \`path\``— no tables, no prose, no`::READ`directives, no`::EXAMPLE`:
  - `## Upstream Work` — one bullet per `%work-item.context.upstream` (name + path).
  - `## Required Skills` — one bullet per `%work-item.context.required-skills` (skill id + path).
  - `## Domains` — one bullet per `%work-item.domains` (domain name + index path).
  - `## Resource Kinds in Scope` — one bullet per distinct kind in `%work-item.scope` (kind + structure record path).
  - `## Workflows` — one bullet per `%work-item.workflows` (workflow name + path).
  - `## Knowledge` — one bullet per `%work-item.context.knowledge` (resource name + path).

### Step `5 / 8` — Remove `work-item-context.tart`

- `git rm $DOMAINS/work/templates/work-item-context.tart` so history follows the removal.

### Step `6 / 8` — Repoint `validate-work-item.art`

- Open `$DOMAINS/work/routines/validate-work-item.art`.
- Find the step that does `::READ \`$DOMAINS/work/templates/work-item-context.tart\` and use the template to ...`.
- Repoint it to the templates that now render the inline work item: `$DOMAINS/work/templates/work-item-summary.tart` and `$DOMAINS/work/templates/work-item-context-section.tart`.

### Step `7 / 8` — Update the domain index listings

- `$DOMAINS/work/index.md` — in the **Templates** table: remove the `Template: Work Item Context` row; add three rows for `Template: Work Item Summary`, `Template: Work Item Context Attachment`, and `Template: Work Item Context Section` with `./templates/...` paths and terse purposes.
- `$DOMAINS/domains/index.md` — update the `Template: Work Item Context` row (near line 214) to reference the new templates instead of `./domains/work/templates/work-item-context.tart`.

### Step `8 / 8` — Commit `split-work-item-context-templates`

---

#### Commit: `split-work-item-context-templates`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(domain-work): Split work item context into summary, attachment, and section templates

- Add has-context-file to the abstract work item structure.
- Create work-item-summary, work-item-context-attachment, work-item-context-section; drop the monolith.
- Repoint validate-work-item and the domain index listings at the new templates.
```

---

## Final Verification

**Instructions:**

- Verify that the commit has been executed (not pushed) according to the commit's policy.
- Verify that `$DOMAINS/work/templates/` contains `work-item-summary.tart`, `work-item-context-attachment.tart`, and `work-item-context-section.tart`, and no longer contains `work-item-context.tart`.
- Verify that `grep -rn 'work-item-context\.tart' $DOMAINS` returns no matches.
- Verify that `$DOMAINS/work/structures/work-item-abstract.art` declares `has-context-file`.
- Verify that `$DOMAINS/work/routines/compose-work-context.art` is unchanged (`git diff` shows no edit to it).
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.

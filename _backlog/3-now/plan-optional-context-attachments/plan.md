# Plan: Add Optional Context Attachments to Plans/Milestones

**ID:** `optional-context-attachments`

**Status:** `READY`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Move the heavyweight `## Context` block — Upstream Work, Required Skills, Domains, Resource Kinds in Scope, Workflows, Workflow Operations, and Knowledge — out of every plan and milestone record into an optional attachment file, so the main plan/milestone file stays lean while the full context remains available on demand.

**Description:** Today `plan.tart` and `milestone.tart` render the whole `work-item-context.tart` template inline, so every plan and milestone carries a large `## Context` section. This plan makes that context optional: a work item either inlines a compact context section or references a separate `plan|milestone__context.md` attachment (titled `# Plan: {name} (Context)`, with each context block as an `## h2` section). A new boolean field `has-context-file` on the abstract work item records the choice, and the plan/milestone templates render the summary always and the context conditionally. Context is still always _composed_ during planning — `$DOMAINS/work/routines/compose-work-context.art` keeps running where it does today; only its _rendering_ becomes conditional.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path                      | Purpose                                                         |
| ------------ | ---------------------------------- | --------------------------------------------------------------- |
| `$WORKSPACE` | Current working directory          | Workspace root — the `.agents` domain codebase lives here.      |
| `$PROJECT`   | `$WORKSPACE/checkouts/art-domains` | Art Domains checkout — this plan file is filed here.            |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains`       | Domain resources changed by this plan.                          |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`        | `write-plan` and `write-milestone` skills changed by this plan. |

## Summary

Introduce an opt-in `has-context-file` flag on the abstract work item. Split the monolithic `work-item-context.tart` into a reusable summary template, a full-context attachment template, and a compact inline section template. Render the summary unconditionally and the context conditionally in both `plan.tart` and `milestone.tart`, thread a `%create-context-file` input through the create/write routines so the choice is persisted, and render + save the `plan|milestone__context.md` attachment when the flag is set.

## Context

### Upstream Work

| Kind        | Path                                | Role                                                            |
| ----------- | ----------------------------------- | --------------------------------------------------------------- |
| Parking Lot | `$PROJECT/_backlog/_parking-lot.md` | Tracks short-term actionables, pending questions, and blockers. |

### Required Skills

- `write-plan` — Generates plans from sources and context. Required for Drafting, Refining.
- `render-template` — Renders plan, milestone, and context artefacts. Required for Refining.

### Domains

| Domain / Path                                     | Description                                                                        |
| ------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Work `$DOMAINS/work/index.md`             | Owns the work-item abstract structure, the context template, and compose routines. |
| Domain: Plans `$DOMAINS/plans/index.md`           | Plan structure, template, and lifecycle routines.                                  |
| Domain: Milestones `$DOMAINS/milestones/index.md` | Milestone structure, template, and lifecycle routines.                             |

### Workflows

| Workflow / Path                                                                | Purpose                                             |
| ------------------------------------------------------------------------------ | --------------------------------------------------- |
| Workflow: Planning Work `$DOMAINS/work/workflows/planning-work/workflow.art`   | Contextualising, drafting, and refining work items. |
| Workflow: Executing Work `$DOMAINS/work/workflows/executing-work/workflow.art` | Setting up, verifying, and committing work.         |

### Knowledge

::READ `$DOMAINS/work/structures/work-item-abstract.art` (Structure) — Abstract work-item model gaining the `has-context-file` field. Relevant for Drafting, Refining.
::READ `$DOMAINS/work/templates/work-item-context.tart` (Template) — The template being split. Relevant for Drafting.
::READ `$DOMAINS/work/routines/compose-work-context.art` (Routine) — Composes context; must keep running unchanged. Relevant for Drafting.
::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Commit message rules for the iteration commits. Relevant for Writing Commit Message.

## Scope

This plan changes only `$DOMAINS` (the `.agents` domain codebase) and the two planning skills under `$SKILLS`. No product code is touched; `$PROJECT` is only the filing location of this plan.

### (Scope) Repository: Workspace

**Record:** `$WORKSPACE/_records/repositories/workspace.art` (workspace meta-repo, remote `noodlestan/workspace`)

**Role:** Owns the `.agents` domain codebase and skills changed by this plan.

**Changes:**

- Add `has-context-file` to `$DOMAINS/work/structures/work-item-abstract.art`.
- Split `$DOMAINS/work/templates/work-item-context.tart` and create the summary, context-attachment, and context-section templates.
- Render the summary and conditional context in `$DOMAINS/plans/templates/plan.tart` and `$DOMAINS/milestones/templates/milestone.tart`.
- Thread `%create-context-file` through the plan, milestone, and work create/recompose routines and the two skills.
- Repoint the `work-item-context.tart` references in the migrate/validate routines and the domain index listings.

**Dependencies:**

- None. `$DOMAINS` is self-contained; iterations land in order 1 → 2 → 3.

## Execution Context

Domain-code changes are coordinated from `$WORKSPACE` and land in the **workspace** repo (`.agents/...`, remote `noodlestan/workspace`) on branch `main`. The plan file itself lives in, and is committed from, the **art-domains** checkout (`$PROJECT`, remote `noodlestan/art-domains`) on branch `main`. The two are separate git repositories; iteration commit blueprints below target the workspace repo.

---

## Items:

| Iteration / Instructions                     | Status  |
| -------------------------------------------- | ------- |
| Iteration: Split Work Item Context Templates | `READY` |
| Iteration: Wire Plan And Milestone Rendering | `READY` |
| Iteration: Thread Create Context File Input  | `READY` |

### Iteration: Split Work Item Context Templates

**Id:** `split-work-item-context-templates`

**Status:** `READY`

**Purpose:** Break the monolithic work-item context into a reusable summary template, a full-context attachment template, and a compact inline section template, and record the choice on the work item with a new `has-context-file` field.

**Description:** Add the `has-context-file` Boolean to the abstract work item, split `$DOMAINS/work/templates/work-item-context.tart` into `work-item-summary.tart` (Path Variables, Summary, Attachments) and `work-item-context-attachment.tart` (the full context rendered into the standalone `plan|milestone__context.md`), add the compact `work-item-context-section.tart`, remove the original, and repoint the references that read it.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/split-work-item-context-templates.md`

**Changes:**

- Add `has-context-file` — Boolean — to the **Shape** section of `$DOMAINS/work/structures/work-item-abstract.art`, indicating whether the work item carries a context attachment. Example value `FALSE`.
- Create `$DOMAINS/work/templates/work-item-summary.tart` rendering the always-inline main-file skeleton — **Path Variables**, **Summary**, **Attachments**, **Scope**, and **Execution Context** (the non-`## Context` sections of the current `work-item-context.tart`), keeping the same `::TEMPLATE` preamble and `%kind` / `%work-item` parameters.
- Create `$DOMAINS/work/templates/work-item-context-attachment.tart` rendering the full context as `## h2` sections — **Upstream Work**, **Required Skills**, **Domains**, **Resource Kinds in Scope**, **Workflows**, **Workflow Operations**, and **Knowledge** — titled `# {Plan|Milestone}: {name} (Context)`; used to render the standalone `plan|milestone__context.md`. Scope and Execution Context are NOT part of the attachment.
- Create `$DOMAINS/work/templates/work-item-context-section.tart`, based on `work-item-context-attachment.tart`, where **Upstream Work**, **Required Skills**, **Domains**, **Resource Kinds in Scope**, **Workflows**, and **Knowledge** each render only a bullet list of `- {name} – \`path\`` and nothing else; **Workflow Operations** is omitted.
- Remove `$DOMAINS/work/templates/work-item-context.tart` (superseded by the split).
- Repoint `$DOMAINS/work/routines/validate-work-item.art` (the `::READ ... work-item-context.tart` step) to the new `work-item-summary.tart` and `work-item-context-section.tart`.
- Update the Templates table in `$DOMAINS/work/index.md` to list the three new templates and drop the `Work Item Context` row.
- Update the Work Item Context row in `$DOMAINS/domains/index.md` to reference the new templates.

**Dependencies:**

- None.

**Don't Change:**

- `$DOMAINS/work/routines/compose-work-context.art` — context composition keeps running where it is invoked; only rendering becomes conditional.

#### Commits:

| ID                                  | Repository / Checkout / Branch    | Policy   | Hash | Status     |
| ----------------------------------- | --------------------------------- | -------- | ---- | ---------- |
| `split-work-item-context-templates` | Workspace / `$WORKSPACE` / `main` | `NOPUSH` | —    | `AUTHORED` |

**Message:**

```
build(domain-work): Split work item context into summary, attachment, and section templates

- Add has-context-file to the abstract work item structure.
- Create work-item-summary, work-item-context-attachment, work-item-context-section; drop the monolith.
- Repoint validate-work-item and the domain index listings at the new templates.
```

### Iteration: Wire Plan And Milestone Rendering

**Id:** `wire-plan-milestone-rendering`

**Status:** `READY`

**Purpose:** Render the summary unconditionally and the context conditionally in both plan and milestone, and expose the `has-context-file` choice as a rendered record field.

**Description:** Declare the inherited `has-context-file` on the plan and milestone structures, render `**Has Context File:**` right after `**Template:**` in both templates, replace the single `work-item-context.tart` render with an unconditional `work-item-summary.tart` render plus a conditional context render, and repoint the migrate routines that read the removed template.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/wire-plan-milestone-rendering.md`

**Changes:**

- In `$DOMAINS/plans/structures/plan.art`, add `has-context-file` to the **Inherits** list.
- In `$DOMAINS/milestones/structures/milestone.art`, add `has-context-file` to the **Inherits** list.
- In `$DOMAINS/plans/templates/plan.tart`, render `**Has Context File:** {{%plan.has-context-file}}` immediately after the `**Template:**` field; replace the `work-item-context.tart` render directive with: render `$DOMAINS/work/templates/work-item-summary.tart` unconditionally, then if `%plan.has-context-file` is TRUE render `$DOMAINS/work/templates/work-item-context-attachment.tart` (persisted to `plan__context.md`), else render `$DOMAINS/work/templates/work-item-context-section.tart` inline.
- In `$DOMAINS/milestones/templates/milestone.tart`, apply the same two changes (`**Has Context File:**` after `**Template:**`; unconditional summary + conditional context).
- Repoint `$DOMAINS/plans/routines/migrate-plan.art` and `$DOMAINS/milestones/routines/migrate-milestone.art` from `work-item-context.tart` to the new `work-item-summary.tart` and `work-item-context-section.tart` (they read it "for the context and scope sections").

**Dependencies:**

- Iteration `split-work-item-context-templates` — the new templates and the `has-context-file` field must exist before they are wired.

**Don't Change:**

- The `**Skill:**`, `**Purpose:**`, and `**Description:**` field order in both templates — only `**Has Context File:**` is inserted after `**Template:**`.

#### Commits:

| ID                              | Repository / Checkout / Branch    | Policy   | Hash | Status     |
| ------------------------------- | --------------------------------- | -------- | ---- | ---------- |
| `wire-plan-milestone-rendering` | Workspace / `$WORKSPACE` / `main` | `NOPUSH` | —    | `AUTHORED` |

**Message:**

```
build(context-attachments): Render summary always and context conditionally in plan and milestone

- Declare has-context-file on the plan and milestone structures.
- Render Has Context File after Template in both templates.
- Replace the inline context render with summary + conditional attachment/section.
- Repoint the plan and milestone migrate routines.
```

### Iteration: Thread Create Context File Input

**Id:** `thread-create-context-file`

**Status:** `READY`

**Purpose:** Let authors choose a context attachment at creation time, persist the choice on the work item, and render + save the `plan|milestone__context.md` file when it is enabled.

**Description:** Add a `%create-context-file` input to the `write-plan` and `write-milestone` skills, carry it through the create/recompose routines so `has-context-file` is set and survives refinement, and extend the Review-or-Save commands to render `work-item-context-attachment.tart` into the attachment file when the flag is set.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/thread-create-context-file.md`

**Changes:**

- In `$SKILLS/write-plan/SKILL.md`, add a `%create-context-file` input to the **Create Plan** and **Convert to Plan** commands and pass it to the routine; in **Review or Save Plan**, when `%plan.has-context-file` is TRUE, render `$DOMAINS/work/templates/work-item-context-attachment.tart` and save it to `plan-{%plan.id}/plan__context.md`.
- In `$SKILLS/write-milestone/SKILL.md`, add a `%create-context-file` input to the **Create Milestone** and **Convert to Milestone** commands and pass it to the routine; in **Review or Save Milestone**, when `%milestone.has-context-file` is TRUE, render the attachment template and save it to `milestone-{%milestone.id}/milestone__context.md`.
- In `$DOMAINS/plans/routines/create-or-update-plan.art`, accept `%create-context-file` and pass it to the work-item routine.
- In `$DOMAINS/milestones/routines/create-or-update-milestone.art`, accept `%create-context-file` and pass it through `recompose-work-item`.
- In `$DOMAINS/work/routines/create-or-update-work-item.art`, accept `%create-context-file` and set `has-context-file` on the composed `%work-item`.
- In `$DOMAINS/work/routines/recompose-work-item.art`, carry `has-context-file` through the refresh so refinement does not drop it.

**Dependencies:**

- Iteration `wire-plan-milestone-rendering` — the conditional templates must be in place for the save step to render the attachment.

**Don't Change:**

- `$DOMAINS/work/routines/compose-work-context.art` — it keeps composing context unconditionally; `has-context-file` only controls where that context is rendered.

#### Commits:

| ID                           | Repository / Checkout / Branch    | Policy   | Hash | Status     |
| ---------------------------- | --------------------------------- | -------- | ---- | ---------- |
| `thread-create-context-file` | Workspace / `$WORKSPACE` / `main` | `NOPUSH` | —    | `AUTHORED` |

**Message:**

```
build(context-attachments): Thread create-context-file through plan and milestone creation

- Add %create-context-file to the write-plan and write-milestone create/save commands.
- Persist has-context-file through the plan, milestone, and work create/recompose routines.
- Render and save the plan__context.md / milestone__context.md attachment when enabled.
```

---

## Work

### Next

Execute `split-work-item-context-templates` first — the other two iterations depend on the new templates and the `has-context-file` field existing.

### Blockers

- None. All design decisions are confirmed (see Coordination → Decisions).

---

## Operating Instructions

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write a message following: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up 3 bullet points, max 100 chars each.

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
```

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:**

1. `$DOMAINS/work/templates/` contains `work-item-summary.tart`, `work-item-context-attachment.tart`, and `work-item-context-section.tart`, and no longer contains `work-item-context.tart`.
2. `grep -rn 'work-item-context\.tart' $DOMAINS` returns no matches.
3. `work-item-abstract.art` declares `has-context-file`; `plan.art` and `milestone.art` inherit it.
4. `plan.tart` and `milestone.tart` render `**Has Context File:**` after `**Template:**`, render `work-item-summary.tart` unconditionally, and render the attachment/section conditionally.
5. `write-plan` and `write-milestone` expose `%create-context-file` and save `plan__context.md` / `milestone__context.md` when it is TRUE.
6. `compose-work-context.art` is still invoked from the create/recompose routines (unchanged).

---

## Coordination

### Not In Scope

- **Changing how context is composed** — `compose-work-context.art` keeps running where it is invoked; only rendering is made conditional.
- **`$DOMAINS/plans/routines/write-instructions.art`** — instruction files are unchanged; whether instructions should link the context attachment is a possible follow-up.
- **Validating the attachment in `validate-plan.art` / `validate-milestone.art`** — asserting `plan__context.md` exists when the flag is set is a possible follow-up.

### Evidence

- The three new templates exist and the monolith is gone, verifiable by `ls $DOMAINS/work/templates/`.
- No dangling `work-item-context.tart` references remain, verifiable by the `grep` in Verifying Completion.
- Both `plan.tart` and `milestone.tart` render the summary and the conditional context, verifiable by inspecting the render directives.

### Findings

- `work-item-context.tart` is referenced not only by `plan.tart` and `milestone.tart` but also by `migrate-plan.art`, `migrate-milestone.art`, `validate-work-item.art`, and the `work/index.md` and `domains/index.md` listings — the split must repoint all of them or leave dangling references.
- Context is composed by `create-or-update-work-item.art` (via `compose-work-context.art`) and, on the milestone path, by `recompose-work-item.art`; persisting `has-context-file` requires touching both the create and the recompose paths so refinement does not drop it.
- The `.agents` domain codebase is versioned in the workspace repo, while the plan backlog lives in the art-domains checkout — implementation and plan-file commits are cross-repo.

### Decisions

- **`**Has Context File:**` label uses "Context"** — the field is `has-context-file` and the attachment is `__context.md`, so the rendered label is `**Has Context File:**`, not "Content". (Confirmed.)
- **Declare in the structures, render in the templates** — `has-context-file` is added to the **Inherits** lists of `plan.art` and `milestone.art`; the `**Has Context File:**` field is rendered in `plan.tart` and `milestone.tart` immediately after `**Template:**`. Structures do not render. (Confirmed.)
- **The TRUE branch renders ONLY into the separate `plan__context.md`** — to keep the main file lean, the full context is persisted to the attachment by the save routine and referenced via the Attachments list; `plan.md` does not also inline it. (Confirmed.)
- **`work-item-context.tart` is removed on split** — the monolith is superseded and every reader (`validate-work-item.art`, `migrate-plan.art`, `migrate-milestone.art`, and the `work/index.md` + `domains/index.md` listings) is repointed. (Confirmed.)
- **Scope and Execution Context stay inline via `work-item-summary.tart`** — they are not part of the `## Context` block and not in the attachment's section list, so they live in the always-inline summary template to keep the main file coherent in both modes.
- **Implementation commits target the workspace repo** — `.agents/domains/...` is versioned in `noodlestan/workspace`, not the art-domains checkout. (Confirmed.)

### Knowledge to Update

- `$DOMAINS/work/index.md` and `$DOMAINS/domains/index.md` — template listings updated as part of iteration 1.

### Follow Ups

- Have `validate-plan.art` / `validate-milestone.art` assert the `__context.md` attachment exists when `has-context-file` is TRUE.
- Decide whether implementation instructions should link the context attachment.

### Feedback

- None yet.

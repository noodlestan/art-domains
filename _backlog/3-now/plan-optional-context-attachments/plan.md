# Plan: Add Optional Context Attachments to Plans/Milestones

**ID:** `optional-context-attachments`

**Status:** `DRAFT`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Move the heavyweight `## Context` block — Upstream Work, Required Skills, Domains, Resource Kinds in Scope, Workflows, Workflow Operations, and Knowledge — out of every plan and milestone record into an optional attachment file, so the main plan/milestone file stays lean while the full context remains available on demand.

**Description:** Today `plan.tart` and `milestone.tart` render the whole `work-item-context.tart` template inline, so every plan and milestone carries a large `## Context` section. This plan makes that context optional: a work item either inlines a compact context section or references a separate `plan|milestone__context.md` attachment (titled `# Plan: {name} (Context)`, with each context block as an `## h2` section). A new boolean field `has-context-file` on the abstract work item records the choice, and the plan/milestone templates render either the compact section or the full context based on it. Context is still always _composed_ during planning — `compose-work-context.art` keeps running where it does today; only its _rendering_ becomes conditional.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Changes

- Add a `has-context-file` Boolean field to Structure: Work Item (Abstract) — whether the work item carries a context attachment.
- Add a `%create-context-file` input to the `write-plan` and `write-milestone` skills, and carry it through the create/write routines across the plan, milestone, and work domains so the choice reaches the point where the plan/milestone is created and is persisted.
- Split `$DOMAINS/work/templates/work-item-context.tart` into two templates:
  - `$DOMAINS/work/templates/work-item-summary.tart` — Path Variables, Summary, and Attachments only.
  - `$DOMAINS/work/templates/work-item-context-attachment.tart` — the full context, rendered into the `plan|milestone__context.md` attachment.
- Add a new template `$DOMAINS/work/templates/work-item-context-section.tart`, based on `work-item-context-attachment.tart`, where Upstream Work, Required Skills, Domains, Resource Kinds in Scope, Workflows, and Knowledge each contain only a bullet list of `- {name} – `path``; Workflow Operations is omitted.
- Render the boolean `**Has Context File:** TRUE/FALSE` in `plan.art` and `milestone.art` right after the `**Template:**` field.
- Render `work-item-summary.tart` unconditionally in both `plan.tart` and `milestone.tart`.
- Render the context conditionally in both `plan.tart` and `milestone.tart`: when `has-context-file` is TRUE render `work-item-context-attachment.tart`; when FALSE render `work-item-context-section.tart`.
- Keep `$DOMAINS/work/routines/compose-work-context.art` running where it is currently invoked — context composition is unchanged; only rendering becomes conditional.

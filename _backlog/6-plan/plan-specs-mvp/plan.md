# Plan: Specs MVP

**ID:** `specs-mvp`

**Status:** `DRAFT`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Integrate specification structures into the plan workflow by connecting `Type: Spec (Abstract)` into the plan structure and template for specification-driven planning.

**Description:** Make specs first-class resources in the plan scope: add an optional `specs` field to the plan structure, render spec references in the plan template's context section, and support spec references through the work item abstract model.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path                | Purpose                                   |
| ------------ | ---------------------------- | ----------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root directory                  |
| `$PROJECT`   | Provided with prompt         | Where work execution is taking place.     |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources directory (changes here) |

## Summary

Integrate specification-driven planning into the plan structure and template so that plans can attach and render specs as first-class resources in their scope.

## Context

### Upstream Work

| Kind                  | Path                                                         | Role                                                            |
| --------------------- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| Parking Lot           | `$PROJECT/_roadmap/_parking-lot.md`                          | Tracks short-term actionables, pending questions, and blockers. |
| Architecture Briefing | `_roadmap/_architect.md`                                     | Workspace principles, NFRs, milestones.                         |
| Milestone             | `$PROJECT/_roadmap/3-now/milestone-hello-world/milestone.md` | Coordinates this plan within the Art Domains roadmap.           |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                           | Description                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md` | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |
| Domain: Specs `$DOMAINS/specs/index.md` | Spec production, provenance, and spec-driven planning resources.                   |

### Knowledge

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Plan record fields and statuses. Relevant for Planning Work Item.
::READ `$DOMAINS/plans/templates/plan.tart` (Template) — Plan document layout to extend with a spec section. Relevant for Planning Work Item.
::READ `$DOMAINS/specs/types/spec.art` (Type) — `Type: Spec (Abstract)` to connect into the plan structure. Relevant for Planning Work Item.
::READ `$DOMAINS/work/structures/work-item-abstract.art` (Structure) — Work item abstract to support spec references. Relevant for Planning Work Item.

## Scope

Update `$DOMAINS/plans/` and `$DOMAINS/specs/` directories: add a spec reference field to `plan.art`, render spec references in `plan.tart`, and support spec references through the work item abstract model.

## Work

### Next

Delegate the first `DRAFT` iteration: `integrate-specs-into-plan-structure`.

### Blockers

- None.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/ops/setting-up.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
npm run ci # to verify build is green before starting
```

If any of these fail, resolve the issue before proceeding with implementation.

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/ops/writing-commit-message.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the commit message following: the rules defined there.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/ops/verifying-completion.art`.

**Instructions:** (From `$PROJECT/_guide.md`)

Run from the package directory:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other issues (prettier, eslint, tsc --noEmit)
npm run build
npm run test
```

All steps MUST pass. No `it.todo()` tests may remain.

---

## Items:

| Iteration / Instructions                       | Status  |
| ---------------------------------------------- | ------- |
| Iteration: Integrate Specs Into Plan Structure | `DRAFT` |

### Iteration: Integrate Specs Into Plan Structure

**Id:** `integrate-specs-into-plan-structure`

**Status:** `DRAFT`

**Purpose:** Connect `Type: Spec (Abstract)` into the plan structure and template for specification-driven planning.

**Description:** Add an optional `specs` field to the plan structure, render spec references in the plan template's context section, and support spec references through the work item abstract model.

**Instructions:** `./plan-specs-mvp/instructions/integrate-specs-into-plan-structure.md`

**Changes:**

- Add spec reference field to `$DOMAINS/plans/structures/plan.art`.
- Update `$DOMAINS/plans/templates/plan.tart` to render a spec section.
- Add a spec context type if needed for linking specs to plans.
- Update `$DOMAINS/work/structures/work-item-abstract.art` to support spec references.

**Dependencies:**

- None.

---

## Coordination

### Not In Scope

- None.

### Evidence

- None.

### Findings

- None.

### Decisions

- None.

### Knowledge to Update

- `$DOMAINS/plans/structures/plan.art` — optional `specs` field.
- `$DOMAINS/plans/templates/plan.tart` — spec section rendering.
- `$DOMAINS/work/structures/work-item-abstract.art` — spec reference support.

### Follow Ups

- None.

### Feedback

- None.

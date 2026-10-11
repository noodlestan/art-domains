# Plan: Streamline Operating Instructions

**ID:** `streamline-operating-instructions`

**Status:** `DRAFT`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Stop operating instructions from leaking across workflow phases, and let installed packages contribute operating instructions without copying their text into every guide and plan.

**Description:** Two defects in how operating instructions reach work items. (a) Noise: `%plan.operations` is the union of the operations of every declared workflow, and both `plan.tart` and `instructions.tart` render that whole union — so planning-phase instructions such as `Writing Commit Message` are rendered into worker instruction files. (b) Blind spot: only `%knowledge`, `%scope`, and `%upstream` are scanned, so a routine in `$DOMAINS/` or in an installed package cannot contribute operating instructions unless a project guide links it, and the scan does not recurse beyond the linked file.

## Mandatory Reading

::READ `$DOMAINS/work/routines/compose-operating-instructions.art` (Routine) — Scans knowledge, scope, and upstream for `## Operating Instructions:` declarations.

---

## Path Variables

| Variable     | Resolved Path                | Purpose                                         |
| ------------ | ---------------------------- | ----------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root directory                        |
| `$PROJECT`   | Provided with prompt         | Where work execution is taking place.           |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources under change.                  |
| `$GUIDE`     | `$PROJECT/_guide.md`         | Project guide declaring operating instructions. |

## Summary

Make operating instructions phase-scoped and package-contributable: add an explicit relevance signal and match on it, publish operating instructions as one flat file per package registered through a scanned guide section, and document the discovery contract.

## Design Rationale

The plan currently has this shape:

> A _plan_ is a one-off artefact that **emits** steps, iterations, and commit blueprints.

The shape this plan moves toward:

> A _resource_ is a reusable artefact that **declares** the operating instructions a workflow operation needs, and a plan **discovers** it.

Under the inverted shape the plan stops being a generation target and becomes a **projection of discovered fragments**. The groundwork is already paid for: workflows → operations → operating instructions is a working pipeline, guides are already the advertisement surface for resources, and `Type: Knowledge Context` already carries an `operations` field tagging relevance.

Two constraints keep the inversion affordable, and they are why this plan carries links rather than recursing the scan:

- **Context budget.** Every discovered fragment costs tokens in every plan and in every instruction file. Carrying links and materialising text only where it is executed is what keeps discovery affordable.
- **Not every operation deserves a fragment.** Publishing `## Operating Instructions: Writing Commit Message` from a package would re-manufacture the noise defect this plan fixes.

## Context

### Upstream Work

| Kind        | Path                                                          | Role                                                            |
| ----------- | ------------------------------------------------------------- | --------------------------------------------------------------- |
| Parking Lot | `$PROJECT/_backlog/_parking-lot.md`                           | Tracks short-term actionables, pending questions, and blockers. |
| Milestone   | `$PROJECT/_roadmap/4-next/milestone-domains-one/milestone.md` | Coordinates this plan within the Art Domains roadmap.           |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                             | Description                                                                   |
| ----------------------------------------- | ----------------------------------------------------------------------------- |
| Domain: Work `$DOMAINS/work/index.md`     | Work-item model: workflows, operations, operating instructions, and routines. |
| Domain: Plans `$DOMAINS/plans/index.md`   | Planning lifecycle, plan and instruction templates.                           |
| Domain: Guides `$DOMAINS/guides/index.md` | Guide generation and the guide as the advertisement surface for resources.    |

### Knowledge

::READ `$DOMAINS/work/types/operating-instructions.art` (Type) — Record shape carrying `name`, `workflow`, `operation`, `instructions`, `source`, `definition`. Relevant for Planning Work Item.
::READ `$DOMAINS/work/structures/operation.art` (Structure) — Operation shape carrying `workflow` and `definition`. Relevant for Planning Work Item.
::READ `$DOMAINS/work/routines/read-work-guides.art` (Routine) — Produces `%knowledge`; scans only Recommended Reading, Records Management, Knowledge, Workflows, Conventions. Relevant for Planning Work Item.
::READ `$DOMAINS/work/routines/compose-work-operations.art` (Routine) — Enumerates the union of operations across all `%workflows`. Relevant for Planning Work Item.
::READ `$DOMAINS/work/templates/operating-instructions.tart` (Template) — Renders operating instructions per operation; owns `%render-metadata`. Relevant for Planning Work Item.
::READ `$DOMAINS/plans/templates/instructions.tart` (Template) — Renders instruction files with `%render-metadata = FALSE`. Relevant for Planning Work Item.
::READ `$DOMAINS/plans/templates/plan.tart` (Template) — Renders plans with `%render-metadata = TRUE`. Relevant for Planning Work Item.

## Scope

Change `$DOMAINS/work/` (types, routines, templates) and `$DOMAINS/plans/templates/`, plus the project guides that declare operating instructions. Publish a flat operating-instructions file convention for packages.

Explicitly out of scope: making `compose-operating-instructions` recurse through `::READ` directives — it re-opens the noise problem at scale — and any package of routines or operating instructions under `@noodlestan/conventions`.

### Constraints

Invariants the iterations must respect. Each is verified against the current sources listed.

- **Do not add a `workflow` field.** `workflow` already exists on both `Type: Operating Instructions` (`$DOMAINS/work/types/operating-instructions.art`) and `Structure: Operation` (`$DOMAINS/work/structures/operation.art`). The relevance signal must reuse it, not duplicate it.
- **The relevance vocabulary is controlled.** Its values name an existing workflow or operation. A free-text label such as `planning` is not acceptable — it cannot be matched deterministically.
- **A relevance signal is a precondition, not a follow-up.** Publishing an operating-instructions fragment for an operation without a relevance signal re-manufactures the noise defect this plan exists to remove.
- **Both renderers must carry links.** `instructions.tart` renders with `%render-metadata = FALSE`, but `plan.tart` renders the same section with `%render-metadata = TRUE` and full prose. Link-not-fragment must hold in both, or plans regain the context cost the flat-file convention exists to avoid.
- **Guide sections are a closed list.** `Routine: Read Work Guides` step 5.1 scans exactly Recommended Reading, Records Management, Knowledge, Workflows, and Conventions. Listing each resource file individually in the guide is not an alternative mechanism — it is the current one, and it is what makes guides bloat.
- **A relevance signal revisits a prior removal.** `Type: Operating Instructions` carried a `stage` field, since removed in `$PROJECT/_backlog/0-archive/2026-08-25-plan-workflows-makes-work-flow`. Any equivalent signal must be introduced deliberately, with that removal understood.

## Work

### Next

Delegate the first `DRAFT` iteration: `qualify-operating-instruction-relevance`.

### Blockers

- **Open decision — commit conventions at execution time.** A tension in the current model: instruction files carry commit steps, and `Writing Commit Message` belongs to `Workflow: Planning Work`, yet a worker executing a commit step needs the conventions. Resolve before refining iteration 1, choosing one of:
  1. Declare a distinct execution-phase commit operation under `Workflow: Executing Work` (hangs off `Finalizing Execution`) with its own operating instructions, keeping the planning-phase one for planners.
  2. Mark the planning-phase instructions as relevant to both workflows, accepting the duplication.
  3. Have instruction files reference the conventions by link instead of inlining them.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
```

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write a message following: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up 3 bullet points, max 100 chars each.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm run ci # lint, build and test
```

---

## Items:

| Iteration / Instructions                             | Status  |
| ---------------------------------------------------- | ------- |
| Iteration: Qualify Operating Instruction Relevance   | `DRAFT` |
| Iteration: Publish Package Operating Instructions    | `DRAFT` |
| Iteration: Verify Discovery Contract And Document It | `DRAFT` |

### Iteration: Qualify Operating Instruction Relevance

**Id:** `qualify-operating-instruction-relevance`

**Status:** `DRAFT`

**Purpose:** Make operating instructions phase-scoped so planning-phase instructions stop being rendered into execution-phase artefacts.

**Description:** Add a relevance signal to `Type: Operating Instructions`, match on it in `Routine: Compose Operating Instructions`, and filter what `operating-instructions.tart` renders according to the consuming artefact. Blocked by the open decision above.

**Instructions:** `./plan-streamline-operating-instructions/instructions/qualify-operating-instruction-relevance.md`

**Changes:**

- Extend `$DOMAINS/work/types/operating-instructions.art` with a relevance signal whose values are controlled by existing workflow or operation names — no free-text vocabulary.
- Update `$DOMAINS/work/routines/compose-operating-instructions.art` step 5 to populate the signal and to match on workflow plus relevance, not on operation name alone.
- Update `$DOMAINS/work/templates/operating-instructions.tart` so the rendered set can be scoped by the consuming artefact.
- Update `$DOMAINS/plans/templates/plan.tart` and `$DOMAINS/plans/templates/instructions.tart` to pass the scoped operation sets.
- Correct the stale `.../workflows/{workflow}/ops/{operation}.art` paths in `Type: Operating Instructions.definition` and in `operating-instructions.tart` examples to the actual `.../workflows/{workflow}/{operation}/operation.art` layout.

**Dependencies:**

- Open decision in the Blockers section above.

### Iteration: Publish Package Operating Instructions

**Id:** `publish-package-operating-instructions`

**Status:** `DRAFT`

**Purpose:** Let an installed package contribute operating instructions through a single flat file registered in a scanned guide section, carrying links rather than duplicated text.

**Description:** Pilot the flat-file convention with one guide: move `Setting Up`, `Verifying Step`, and `Verifying Completion` out of the guide prose into a package flat file, register it where `read-work-guides` actually scans, and keep the guide's declarations as pointers.

**Instructions:** `./plan-streamline-operating-instructions/instructions/publish-package-operating-instructions.md`

**Changes:**

- Define the flat-file convention: one `art/operating-instructions.md` per package, with one `## Operating Instructions: {Operation}` fragment per operation.
- Create the `@noodlestan/tooling-art` package in `noodlestan/workspace-tooling` holding only operating instructions.
- Register the package file in the guide under a section that `read-work-guides.art` step 5.1 actually scans — Recommended Reading, Records Management, Knowledge, Workflows, or Conventions.
- Keep `### Operating Instructions: {Operation}` declarations in the guide, with the instructions body pointing at the package file instead of inlining prose.
- Surface the package version next to the link in the guide to make version skew visible.

**Dependencies:**

- Iteration `qualify-operating-instruction-relevance`.

### Iteration: Verify Discovery Contract And Document It

**Id:** `verify-discovery-contract-and-document-it`

**Status:** `DRAFT`

**Purpose:** Prove both defects are closed, and write the discovery contract down so packages know how to contribute.

**Description:** Re-run planning end-to-end, confirm the plan carries links while instruction files carry only execution-relevant instructions, and document the contract in the guides domain.

**Instructions:** `./plan-streamline-operating-instructions/instructions/verify-discovery-contract-and-document-it.md`

**Changes:**

- Verify `write-plan` still discovers operating instructions through the guide → `%knowledge` → `compose-operating-instructions` pipeline after the package registration.
- Verify `instructions.tart` materializes only the execution-relevant set, and that `Writing Commit Message` no longer leaks into instruction files.
- Document the discovery contract in `$DOMAINS/guides/`: which guide sections are scanned, the one-level non-recursive scan, and the flat-file package convention.
- Apply the convention to the remaining project guides that duplicate `Setting Up` / `Verifying Step` / `Verifying Completion`.

**Dependencies:**

- Iteration `publish-package-operating-instructions`.

---

## Coordination

### Not In Scope

- Recursing `compose-operating-instructions` through `::READ` directives.
- Any `@noodlestan/conventions` package of routines or operating instructions.
- Conventions-specific adoption planning routines.

### Evidence

- None.

### Findings

- The root cause of the noise defect is not name matching alone. `%plan.operations` is the union of the operations of every workflow declared on the plan, and both `plan.tart` and `instructions.tart` render that entire union. The `workflow` qualifier already exists on the model and is simply never used to filter.
- `Routine: Read Work Guides` step 5.1 scans exactly five section names. Any registration mechanism that adds a new guide section is invisible to discovery.

### Decisions

- Operating instructions are published as one flat file per package, not by recursing the scan and not by listing every resource file in the guide.

### Knowledge to Update

- `$DOMAINS/work/types/operating-instructions.art` — relevance signal, corrected `definition` path examples.
- `$DOMAINS/work/routines/compose-operating-instructions.art` — workflow-qualified matching.
- `$DOMAINS/work/templates/operating-instructions.tart` — scoping input, corrected example paths.
- `$DOMAINS/guides/` — the operating-instructions discovery contract.

### Follow Ups

- Decide whether registration stays a manual guide edit or becomes a deterministic install-time step.

### Feedback

- None.

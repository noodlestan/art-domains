# Plan: Add Operations Domain

**ID:** `add-operations-domain`

**Status:** `READY`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Model reusable operations, its distribution, discoverability, and selection.

**Description:** Insufficient modelling of operations, coupling by workflow name, and no effective filter in place — caused writing-commit instructions to show up in artefacts where commit messages were already authored and read-only.

**Context:** Two defects in how operating instructions reach work items. (a) Noise: `%plan.operations` is the union of the operations of every declared workflow, and both `plan.tart` and `instructions.tart` render that whole union — so planning-phase instructions such as `Writing Commit Message` are rendered into worker instruction files even when the worker cannot act on them. (b) Blind spot: only `%knowledge`, `%scope`, and `%upstream` are scanned, so a routine in `$DOMAINS/` or in an installed package cannot contribute operating instructions unless a project guide links it, and the scan does not recurse beyond the linked file. The fix is a `relevantFor` relevance signal on each operating instruction — values drawn from existing workflow and operation names — that `compose-operating-instructions` matches against the consuming artefact's workflows and operations, so only matching instructions are selected. This also resolves the commit-conventions question: `Writing Commit Message` (which is an operating instruction in shape, not a convention) declares `relevantFor: [Planning Work, Writing Commit Message]` and is filtered out of execution-phase instruction files because the commits are already authored there. Additionally, generic tooling instructions (Setting Up, Verifying Step, Verifying Completion) are published as a flat file per package with placeholder defaults and a project-side override mechanism (`**CommandList**`), so they are discoverable and selectable without being copied into every guide.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path                | Purpose                                            |
| ------------ | ---------------------------- | -------------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root directory; hosts the domain source. |
| `$PROJECT`   | Provided with prompt         | Where this plan and its backlogs live.             |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources under change.                     |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Agent modes and skills directory.                  |

## Summary

Create a standalone Operations domain that owns operating instructions — their definition, the `relevantFor` relevance signal, the operation structure, the compose and read routines, the rendering template, and a flat-file convention with placeholder defaults and project-side overrides — then integrate it into Work, Plans, and Whiteboards so every consumer passes a consuming context and selects only relevant instructions. Built top-down (index and definitions, types and structures, routines, templates and files, integration) and consolidated bottom-up in a final review pass.

## Attachments

- `./plan__operations-spec.md` (Reference) — Structured spec for the whole domain per resource kind — Definitions, Routines, Structures, Types, Templates, Files, Integration — plus the `## Conventions` review criteria applied in the final review pass.

## Context

| Kind        | Path                                                          | Role                                                            |
| ----------- | ------------------------------------------------------------- | --------------------------------------------------------------- |
| Parking Lot | `$PROJECT/_backlog/_parking-lot.md`                           | Tracks short-term actionables, pending questions, and blockers. |
| Milestone   | `$PROJECT/_roadmap/4-next/milestone-domains-one/milestone.md` | Coordinates this plan within the Art Domains roadmap.           |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                                       | Description                                                                |
| --------------------------------------------------- | -------------------------------------------------------------------------- |
| Domain: Work `$DOMAINS/work/index.md`               | Current home of operating-instructions resources; source of the migration. |
| Domain: Plans `$DOMAINS/plans/index.md`             | Consumer: passes consuming context to the operating-instructions template. |
| Domain: Whiteboards `$DOMAINS/whiteboards/index.md` | Consumer: carries operating instructions for inter-participant messaging.  |
| Domain: Guides `$DOMAINS/guides/index.md`           | Consumer: project guides declare and override operating instructions.      |

### Workflows

| Workflow / Path                                                                | Purpose                                             |
| ------------------------------------------------------------------------------ | --------------------------------------------------- |
| Workflow: Planning Work `$DOMAINS/work/workflows/planning-work/workflow.art`   | Contextualising, drafting, and refining work items. |
| Workflow: Executing Work `$DOMAINS/work/workflows/executing-work/workflow.art` | Setting up, verifying, and committing work.         |

### Knowledge

::READ `$DOMAINS/work/types/operating-instructions.art` (Type) — Current home of the operating-instructions type; gains the `relevantFor` field. Relevant for Planning Work Item.
::READ `$DOMAINS/work/routines/compose-operating-instructions.art` (Routine) — Current home of the compose routine; gains `relevantFor` matching. Relevant for Planning Work Item.
::READ `$DOMAINS/work/routines/read-work-guides.art` (Routine) — Produces `%knowledge`; scans Recommended Reading, Records Management, Knowledge, Workflows, Conventions. Relevant for Planning Work Item.
::READ `$DOMAINS/work/routines/compose-work-operations.art` (Routine) — Enumerates the union of operations across all `%workflows`. Relevant for Planning Work Item.
::READ `$DOMAINS/work/templates/operating-instructions.tart` (Template) — Current home of the rendering template; gains consuming-context input. Relevant for Planning Work Item.
::READ `$DOMAINS/plans/templates/plan.tart` (Template) — Renders plans with `%render-metadata = TRUE`; passes consuming context. Relevant for Planning Work Item.
::READ `$DOMAINS/plans/templates/instructions.tart` (Template) — Renders instruction files with `%render-metadata = FALSE`; passes consuming context. Relevant for Planning Work Item.
::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Operating Instruction) — An operating instruction in shape (not a convention); declares `relevantFor: [Planning Work, Writing Commit Message]` and is filtered out of execution-phase artefacts. Relevant for Planning Work Item.

## Scope

Add a new `$DOMAINS/operations/` domain — `domain.art`, a definitions file, types (`Operating Instructions` with `relevantFor`, `Operating Instruction`), structures (`Operation`), templates (`operating-instructions.tart` with consuming context), routines (`compose-operating-instructions`, `read-work-guides`, `compose-work-operations`), and a flat-file convention with placeholder defaults and project-side override — then integrate into Domain: Work, Plans, and Whiteboards by consuming the Operations domain.

### Constraints

- **Do not add a `workflow` field.** `workflow` already exists on both `Type: Operating Instructions` (`$DOMAINS/work/types/operating-instructions.art`) and `Structure: Operation` (`$DOMAINS/work/structures/operation.art`). The `relevantFor` relevance signal must reuse its vocabulary (existing workflow and operation names), not duplicate it.
- **The relevance vocabulary is controlled.** Its values name an existing workflow or operation. A free-text label such as `planning` is not acceptable — it cannot be matched deterministically.
- **A relevance signal is a precondition, not a follow-up.** Publishing an operating-instructions fragment for an operation without a relevance signal re-manufactures the noise defect this plan exists to remove.
- **Both renderers must carry links.** `instructions.tart` renders with `%render-metadata = FALSE`, but `plan.tart` renders the same section with `%render-metadata = TRUE` and full prose. Link-not-fragment must hold in both, or plans regain the context cost the flat-file convention exists to avoid.
- **Guide sections are a closed list.** `Routine: Read Work Guides` step 5.1 scans exactly Recommended Reading, Records Management, Knowledge, Workflows, and Conventions. Listing each resource file individually in the guide is not an alternative mechanism — it is the current one, and it is what makes guides bloat.
- **Flat-file convention with placeholders.** Published instructions carry a default with placeholder defaults (`%command-list`, `%setup-commands`); the guide overrides with project-specific command lists via `**CommandList**`. No per-project copies to maintain.
- **`writing-commit-message.art` is an operating instruction.** It is filed under `knowledge/conventions/` but is an operating instruction in shape and kind. It declares `relevantFor: [Planning Work, Writing Commit Message]` and is filtered out of execution-phase artefacts.
- **Operations are just classified instructions.** The Operations domain knows about no other domain — they are just classified instructions (with placeholder defaults). It does not assume `Structure: Plan`, the work-item model, or any specific consuming domain. Consumers (Work, Plans, Whiteboards, Guides) depend on Operations; Operations depends on nothing.

## Work

### Next

All 7 iterations are `READY` with commit blueprints (`NOPUSH` policy, `AUTHORED` status). Next: Write Instructions to generate self-contained instruction files, then validate for delegation.

### Blockers

- None.

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

| Iteration / Instructions                       | Status  |
| ---------------------------------------------- | ------- |
| Iteration: Scaffold Operations Domain          | `READY` |
| Iteration: Add Operations Skill and Commands   | `READY` |
| Iteration: Add Operations Types and Structure  | `READY` |
| Iteration: Add Operations Routines             | `READY` |
| Iteration: Add Operations Templates and File   | `READY` |
| Iteration: Review Operations Domain Bottom-up  | `READY` |
| Iteration: Integrate Operations into Consumers | `READY` |

### Iteration: Scaffold Operations Domain

**Id:** `scaffold-operations-domain`

**Status:** `READY`

**Purpose:** Establish the domain's identity and boundaries so every later layer lands in a registered home.

**Description:** Add the Operations domain scaffold with its purpose, boundaries, and definitions, and register the domain in the domains listing.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/scaffold-operations-domain.md`

**Changes:**

- Add `$DOMAINS/operations/domain.art` — purpose: model reusable operations, its distribution, discoverability, and selection; boundaries: operating instructions are selected, not accumulated; no plans or work-item assumptions; guide sections are a closed list; flat-file convention with placeholder defaults and project-side override.
- Add `$DOMAINS/operations/definitions/index.art` — definitions: operating instruction, operating instructions, relevantFor, consuming context, flat-file convention, override, command list.
- Modify `$DOMAINS/index.md` — list `Domain: Operations` and its resources (`update-domains`).

**Dependencies:**

- None.

#### Commits:

| ID                           | Repository / Checkout / Branch    | Policy   | Hash | Status     |
| ---------------------------- | --------------------------------- | -------- | ---- | ---------- |
| `scaffold-operations-domain` | Workspace / `$WORKSPACE` / `main` | `NOPUSH` | —    | `AUTHORED` |

##### Commit: scaffold-operations-domain

**Repository:** Workspace

**Message:**

```
build(domain-operations): Scaffold Domain: Operations.

- Add domain.art with purpose and boundaries, and the domain definitions.
- Register Domain: Operations in the domains listing.
```

### Iteration: Add Operations Skill and Commands

**Id:** `add-operations-skill-and-commands`

**Status:** `READY`

**Purpose:** Give every agent one entry point to register operating instructions on an artefact, with commands owning every session-chat write and response.

**Description:** Add one `operations` skill, allowed to all agent modes, whose command declares its inputs, invokes Routine: Register Operating Instructions, captures its outputs, and composes the session-chat response. Register the skill everywhere agent skills are listed.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-operations-skill-and-commands.md`

**Changes:**

- Add `$SKILLS/operations/SKILL.md` — front-matter, definitions, `ALL` allowed agent modes, mandatory reading, and the command below.
- Add command `add {operation} instructions to {artefact}` — inputs `%instructions` (Identifier or NaturalExpression), `%artefact` (Path or NaturalExpression); invokes Routine: Register Operating Instructions capturing its outputs; the command composes the session-chat response.
- Modify `$SKILLS/index.md` — list `operations` (`update-skills`).
- Modify the agent-modes index, the Codex agent files, and `$WORKSPACE/opencode.json` — allow `operations` in all agent modes (`update-agents`).

**Dependencies:**

- Iteration `scaffold-operations-domain`.

#### Commits:

| ID                       | Repository / Checkout / Branch    | Policy   | Hash | Status     |
| ------------------------ | --------------------------------- | -------- | ---- | ---------- |
| `build-operations-skill` | Workspace / `$WORKSPACE` / `main` | `NOPUSH` | —    | `AUTHORED` |

##### Commit: build-operations-skill

**Repository:** Workspace

**Message:**

```
build(domain-operations): Add operations skill with commands.

- Expose add-instructions command for all agent modes.
- Commands own session-chat writes; routines only transform data.
```

### Iteration: Add Operations Types and Structure

**Id:** `add-operations-types-and-structure`

**Status:** `READY`

**Purpose:** Model the operating-instructions data so each instruction can declare what it is relevant for, and the operation structure can carry its workflow.

**Description:** Add the `Operating Instructions` type (with `relevantFor`), the `Operating Instruction` type, and the `Operation` structure to the Operations domain, migrating from the Work domain.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-operations-types-and-structure.md`

**Changes:**

- Add `$DOMAINS/operations/types/operating-instructions.art` — the type, migrated from `$DOMAINS/work/types/operating-instructions.art`, with the `relevantFor` field added (values from existing workflow/operation names; reuses the `workflow` field's vocabulary, not a duplicate).
- Add `$DOMAINS/operations/types/operating-instruction.art` — a single operating instruction record.
- Add `$DOMAINS/operations/structures/operation.art` — the operation structure, migrated from `$DOMAINS/work/structures/operation.art`.
- Repoint all references from `$DOMAINS/work/types/operating-instructions.art` and `$DOMAINS/work/structures/operation.art` to their new Operations-domain paths.

**Dependencies:**

- Iteration `add-operations-templates-and-file`.

#### Commits:

| ID                       | Repository / Checkout / Branch    | Policy   | Hash | Status     |
| ------------------------ | --------------------------------- | -------- | ---- | ---------- |
| `build-operations-types` | Workspace / `$WORKSPACE` / `main` | `NOPUSH` | —    | `AUTHORED` |

##### Commit: build-operations-types

**Repository:** Workspace

**Message:**

```
build(domain-operations): Add operating-instructions type and operation structure.

- Add Operating Instruction type with relevantFor field.
- Add Operation structure with workflow and definition.
```

### Iteration: Add Operations Routines

**Id:** `add-operations-routines`

**Status:** `READY`

**Purpose:** Define the operating-instructions lifecycle so instructions are composed, matched by relevance, and read from guides.

**Description:** Add the compose, read, and enumerate routines to the Operations domain, migrating from the Work domain, with `relevantFor` matching in `compose-operating-instructions`.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-operations-routines.md`

**Changes:**

- Add `$DOMAINS/operations/routines/compose-operating-instructions.art` — migrated from `$DOMAINS/work/routines/compose-operating-instructions.art`, updated to populate `relevantFor` on each instruction and match on `relevantFor` against the consuming artefact's workflows and operations.
- Add `$DOMAINS/operations/routines/read-work-guides.art` — migrated from `$DOMAINS/work/routines/read-work-guides.art`.
- Add `$DOMAINS/operations/routines/compose-work-operations.art` — migrated from `$DOMAINS/work/routines/compose-work-operations.art`.
- Add `$DOMAINS/operations/routines/register-operating-instructions.art` — registers operating instructions on an artefact: input `%instructions` (package, path, or context-derived) and `%artefact` (where to add, e.g. "the guide's Operating Instructions section"); resolves the source, reads the artefact, adds or merges the operating instructions section, applies any project-side override; deduplicates and compresses if the operation already exists.
- Repoint all references from `$DOMAINS/work/routines/` to their new Operations-domain paths.

**Dependencies:**

- Iteration `add-operations-skill-and-commands`.

#### Commits:

| ID                          | Repository / Checkout / Branch    | Policy   | Hash | Status     |
| --------------------------- | --------------------------------- | -------- | ---- | ---------- |
| `build-operations-routines` | Workspace / `$WORKSPACE` / `main` | `NOPUSH` | —    | `AUTHORED` |

##### Commit: build-operations-routines

**Repository:** Workspace

**Message:**

```
build(domain-operations): Add operating-instructions routines.

- Add compose-operating-instructions with relevantFor matching.
- Add read-work-guides and compose-work-operations.
- Add register-operating-instructions routine.
```

### Iteration: Add Operations Templates and File

**Id:** `add-operations-templates-and-file`

**Status:** `READY`

**Purpose:** Define how operating instructions are presented and where long-instruction files live, with placeholder defaults and project-side override.

**Description:** Add the operating-instructions template with consuming-context input and matching, the flat-file convention with placeholder defaults and `**CommandList**` override, and the `workspace-tooling` package with default command lists.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-operations-templates-and-file.md`

**Changes:**

- Add `$DOMAINS/operations/templates/operating-instructions.tart` — migrated from `$DOMAINS/work/templates/operating-instructions.tart`, updated to accept a consuming-context input and render only instructions whose `relevantFor` matches. Published instructions carry placeholder defaults (`%command-list`, `%setup-commands`); the guide overrides with project-specific command lists via `**CommandList**`.
- Add `$DOMAINS/operations/files/operating-instructions.art` — flat-file convention: one `art/operating-instructions.md` per package, with one `## Operating Instructions: {Operation}` fragment per operation, placeholder defaults, and `**CommandList**` override mechanism.
- Update `$DOMAINS/plans/templates/plan.tart` and `$DOMAINS/plans/templates/instructions.tart` to pass the consuming context to the operating-instructions template.
- Create the `@noodlestan/tooling-art` package in `noodlestan/workspace-tooling` holding default command lists (Setting Up, Verifying Step, Verifying Completion) with placeholder defaults, overridable in project/package `_guide`.

**Dependencies:**

- Iteration `add-operations-routines`.

#### Commits:

| ID                           | Repository / Checkout / Branch    | Policy   | Hash | Status     |
| ---------------------------- | --------------------------------- | -------- | ---- | ---------- |
| `build-operations-templates` | Workspace / `$WORKSPACE` / `main` | `NOPUSH` | —    | `AUTHORED` |

##### Commit: build-operations-templates

**Repository:** Workspace

**Message:**

```
build(domain-operations): Add operating-instructions template and flat-file convention.

- Add operating-instructions.tart with consuming-context input and matching.
- Add flat-file convention with placeholder defaults and CommandList override.
- Create workspace-tooling package with default command lists.
```

### Iteration: Review Operations Domain Bottom-up

**Id:** `review-operations-domain-bottom-up`

**Status:** `READY`

**Purpose:** Consolidate the domain after the first top-down pass so every layer agrees bottom-up.

**Description:** Walk the resources bottom-up — refine types, structures, templates and files, routines, then the skill commands and the domain artefacts — applying the review conventions to every layer, and trickle all changes up to the routine-invocation format in the skill commands and finally to `domain.art` and the domain index. Executed by the stakeholder and the architect in session, not delegated — hence no instructions file and no report.

**Instructions Mode:** `INSTRUCTIONS_INLINED_IN_ITERATION`

**Instructions:**

- Execute all the changes listed above.
- Present for user review.

**Changes:**

- Apply the review conventions to every resource: `::READ` directives reference all resources used in file; routine format with clear Inputs and Outputs; no routine writes to files directly; every routine always returns something; examples carry no assumption that operations are about plans — plans may only appear as an example.
- Refine `$DOMAINS/operations/types/` — `operating-instructions.art` (with `relevantFor`) and `operating-instruction.art`; then `$DOMAINS/operations/structures/` — `operation.art`; then `$DOMAINS/operations/templates/` — `operating-instructions.tart`; then `$DOMAINS/operations/files/` — `operating-instructions.art`; then `$DOMAINS/operations/routines/` — `compose-operating-instructions.art`, `read-work-guides.art`, `compose-work-operations.art`.
- Trickle all changes up to the routine-invocation format in skill commands — each routine call preceded by its `::READ` directive — in `$SKILLS/write-plan/SKILL.md` and `$SKILLS/write-milestone/SKILL.md`.
- Update `$DOMAINS/operations/domain.art` — final purpose, boundaries, and summary; regenerate `$DOMAINS/operations/index.md` with `Routine: Build Domain Index`; top up `$DOMAINS/index.md` with the finished resource list.
- Repair references broken by the review; run `npm run ci`.

**Dependencies:**

- Iteration `add-operations-types-and-structure`.

#### Commits:

| ID                         | Repository / Checkout / Branch    | Policy     | Hash | Status     |
| -------------------------- | --------------------------------- | ---------- | ---- | ---------- |
| `review-operations-domain` | Workspace / `$WORKSPACE` / `main` | `NOCOMMIT` | —    | `AUTHORED` |

##### Commit: review-operations-domain

**Repository:** Workspace

**Message:**

```
refactor(domain-operations): Review Operations domain bottom-up.

- Refine templates, types, structures, routines, and the operations skill.
- Update domain.art and regenerate the domain index.
```

### Iteration: Integrate Operations into Consumers

**Id:** `integrate-operations-into-consumers`

**Status:** `READY`

**Purpose:** Route all operating-instructions consumption through the Operations domain so every consumer passes a consuming context and selects only relevant instructions.

**Description:** Update Work, Plans, and Whiteboards to consume the Operations domain instead of the Work domain's operating-instructions resources, with `relevantFor` matching at every point.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/integrate-operations-into-consumers.md`

**Changes:**

- Update `$DOMAINS/work/index.md` — remove operating-instructions resources from Work domain listings (moved to Operations).
- Update `$DOMAINS/plans/index.md` and `$DOMAINS/plans/templates/plan.tart` — consume from `$DOMAINS/operations/` instead of `$DOMAINS/work/`.
- Update `$DOMAINS/whiteboards/index.md` and `$DOMAINS/whiteboards/templates/whiteboard.tart` — consume from `$DOMAINS/operations/`.
- Update `$DOMAINS/guides/` — project guides register and override operating instructions via the flat-file convention.
- Repoint all references from `$DOMAINS/work/types/operating-instructions.art`, `$DOMAINS/work/routines/compose-operating-instructions.art`, `$DOMAINS/work/routines/read-work-guides.art`, `$DOMAINS/work/routines/compose-work-operations.art`, and `$DOMAINS/work/templates/operating-instructions.tart` to their new `$DOMAINS/operations/` paths.

**Dependencies:**

- Iteration `review-operations-domain-bottom-up`.

#### Commits:

| ID                               | Repository / Checkout / Branch    | Policy   | Hash | Status     |
| -------------------------------- | --------------------------------- | -------- | ---- | ---------- |
| `integrate-operations-consumers` | Workspace / `$WORKSPACE` / `main` | `NOPUSH` | —    | `AUTHORED` |

##### Commit: integrate-operations-consumers

**Repository:** Workspace

**Message:**

```
build(domain-operations): Integrate Operations into consumers.

- Repoint Work, Plans, Whiteboards, and Guides to consume from Operations.
- Update index listings and repoint all migrated references.
```

---

## Coordination

### Not In Scope

- **Recursing `compose-operating-instructions` through `::READ` directives** — it re-opens the noise problem at scale.
- **Any `@noodlestan/conventions` package of routines or operating instructions** — conventions packages are a separate mechanism.
- **Migrating existing project guides** — only one guide is piloted in this plan; the rest are a follow-up.

### Evidence

- `$DOMAINS/work/templates/operating-instructions.tart` renders the union of all declared workflows' operations, evidence that the filtering is missing.
- `Routine: Read Work Guides` step 5.1 scans exactly five section names. Any registration mechanism that adds a new guide section is invisible to discovery.

### Findings

- Operating instructions are coupled by workflow name: `%plan.operations` is the union of all declared workflows' operations, and both templates render that entire union.
- `writing-commit-message.art` is an operating instruction in shape and kind, filed under `knowledge/conventions/`. It declares `relevantFor: [Planning Work, Writing Commit Message]` and is filtered out of execution-phase artefacts.

### Decisions

- One `relevantFor` field on `Type: Operating Instructions`, values from existing workflow/operation names; `compose-operating-instructions` matches on it against the consuming artefact's workflows and operations.
- Operating instructions are published as one flat file per package with placeholder defaults and project-side override (`**CommandList**`), not by recursing the scan and not by listing every resource file in the guide.
- `writing-commit-message.art` is an operating instruction, not a convention — it participates in the `relevantFor` filtering like all others.
- Built top-down (index and definitions, types and structures, routines, templates and files, integration) and consolidated bottom-up in a final review pass.

### Knowledge to Update

- `$DOMAINS/operations/` — new domain: `domain.art`, `definitions/index.art`, types, structures, routines, templates, files.
- `$DOMAINS/work/` — remove migrated operating-instructions resources; update index.
- `$DOMAINS/plans/` — `plan.tart`, `instructions.tart` pass consuming context.
- `$DOMAINS/guides/` — the operating-instructions discovery contract.
- `$DOMAINS/index.md` — add `Domain: Operations`.
- `$SKILLS/index.md` and agent modes — if an operations skill is added.

### Follow Ups

- Decide whether registration stays a manual guide edit or becomes a deterministic install-time step.
- Apply the flat-file convention to remaining project guides that duplicate `Setting Up` / `Verifying Step` / `Verifying Completion`.

### Feedback

- None.
